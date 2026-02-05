#!/usr/bin/env python
import argparse
import os
import re
import sys
from datetime import datetime
from pathlib import Path
from urllib.parse import urlparse

import requests

try:
    import html2text  # type: ignore
except Exception:  # pragma: no cover
    html2text = None


def sanitize_filename(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r"[^a-z0-9]+", "_", value)
    value = re.sub(r"_+", "_", value).strip("_")
    return value or "student"


def html_to_markdown(html: str) -> str:
    if not html:
        return ""
    if html2text is None:
        # Minimal fallback: strip tags and normalize whitespace
        text = re.sub(r"<[^>]+>", " ", html)
        text = re.sub(r"\s+", " ", text)
        return text.strip()
    converter = html2text.HTML2Text()
    converter.ignore_links = False
    converter.body_width = 0
    return converter.handle(html).strip()


def next_link_from_header(link_header: str) -> str | None:
    if not link_header:
        return None
    parts = [p.strip() for p in link_header.split(",")]
    for part in parts:
        match = re.match(r"<([^>]+)>;\s*rel=\"next\"", part)
        if match:
            return match.group(1)
    return None


def load_text_file(path: Path) -> str | None:
    if path.exists():
        return path.read_text(encoding="utf-8").strip()
    return None


def parse_assignment_url(url: str) -> tuple[str, str, str] | None:
    cleaned = url.strip()
    parsed = urlparse(cleaned)
    if not parsed.scheme or not parsed.netloc:
        match = re.search(r"/courses/(\\d+)/assignments/(\\d+)", cleaned)
        if not match:
            return None
        base_url = ""
        course_id, assignment_id = match.group(1), match.group(2)
        return base_url, course_id, assignment_id
    match = re.search(r"/courses/(\\d+)/assignments/(\\d+)", parsed.path)
    if not match:
        return None
    base_url = f"{parsed.scheme}://{parsed.netloc}"
    course_id, assignment_id = match.group(1), match.group(2)
    return base_url, course_id, assignment_id


def parse_submitted_at(value: str | None) -> datetime | None:
    if not value:
        return None
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return None


def normalize_submissions(raw: list) -> list[dict]:
    normalized: list[dict] = []
    for item in raw:
        if isinstance(item, dict) and isinstance(item.get("submissions"), list):
            group = item.get("group")
            for sub in item.get("submissions", []):
                if group:
                    sub.setdefault("group", group)
                    sub.setdefault("group_id", group.get("id"))
                    sub.setdefault("group_name", group.get("name"))
                normalized.append(sub)
        else:
            normalized.append(item)
    return normalized


def load_skip_list(path: Path, inline: str | None) -> set[str]:
    items: set[str] = set()
    if path.exists():
        for line in path.read_text(encoding="utf-8").splitlines():
            value = line.strip()
            if value:
                items.add(value.lower())
    if inline:
        for part in inline.split(","):
            value = part.strip()
            if value:
                items.add(value.lower())
    if not items:
        items.add("test student")
    return items


def should_skip_user(user: dict, skip_list: set[str]) -> bool:
    if not skip_list:
        return False
    candidates = [
        user.get("name"),
        user.get("sortable_name"),
        user.get("login_id"),
        user.get("sis_user_id"),
        str(user.get("id") or ""),
    ]
    for candidate in candidates:
        if not candidate:
            continue
        lowered = str(candidate).lower()
        for skip in skip_list:
            if skip and skip in lowered:
                return True
    return False


def pick_one_per_group(submissions: list[dict]) -> list[dict]:
    grouped: dict[str, dict] = {}
    for submission in submissions:
        group = submission.get("group") or {}
        group_id = submission.get("group_id") or group.get("id")
        if not group_id:
            user_id = (submission.get("user") or {}).get("id") or submission.get("user_id")
            group_id = f"user:{user_id or 'unknown'}"
        key = str(group_id)

        current = grouped.get(key)
        if not current:
            grouped[key] = submission
            continue

        current_state = (current.get("workflow_state") or "").lower()
        candidate_state = (submission.get("workflow_state") or "").lower()
        if current_state == "unsubmitted" and candidate_state != "unsubmitted":
            grouped[key] = submission
            continue

        current_time = parse_submitted_at(current.get("submitted_at"))
        candidate_time = parse_submitted_at(submission.get("submitted_at"))
        if current_time and candidate_time and candidate_time > current_time:
            grouped[key] = submission
            continue

    return list(grouped.values())


def canvas_get_all(url: str, headers: dict, params: dict | None = None):
    items = []
    next_url = url
    while next_url:
        resp = requests.get(next_url, headers=headers, params=params, timeout=60)
        if resp.status_code >= 400:
            raise RuntimeError(f"Canvas API error {resp.status_code}: {resp.text}")
        items.extend(resp.json())
        next_url = next_link_from_header(resp.headers.get("Link", ""))
        params = None  # Only apply params on first request
    return items


def build_markdown(submission: dict, course_id: str, assignment_id: str) -> str:
    user = submission.get("user", {})
    group = submission.get("group") or {}
    history = submission.get("submission_history") or []
    current = history[-1] if history else submission
    body_html = current.get("body") or ""
    body_md = html_to_markdown(body_html)

    metadata = {
        "submitted_at": current.get("submitted_at"),
        "attempt": current.get("attempt"),
        "workflow_state": current.get("workflow_state"),
        "group_name": submission.get("group_name") or group.get("name"),
        "group_id": submission.get("group_id") or group.get("id"),
    }

    lines = ["---"]
    for key, value in metadata.items():
        if value is None:
            continue
        lines.append(f"{key}: {value}")
    lines.append("---")
    lines.append("")
    if body_md.strip():
        lines.append(body_md.strip())
    return "\n".join(lines).strip()


def build_markdown_for_attempt(submission: dict, attempt: dict, course_id: str, assignment_id: str) -> str:
    merged = dict(submission)
    merged["submission_history"] = [attempt]
    return build_markdown(merged, course_id, assignment_id)


def extract_template_requirements(template_text: str) -> dict:
    headings = []
    for line in template_text.splitlines():
        if line.startswith("## "):
            headings.append(line[3:].strip())
    return {
        "headings": headings,
        "labels": ["**Team:**", "**Phase:**"],
    }


def check_template_compliance(body_md: str, template_text: str) -> list[str]:
    requirements = extract_template_requirements(template_text)
    missing = []
    lowered = body_md.lower()

    for heading in requirements["headings"]:
        if f"## {heading}".lower() not in lowered:
            missing.append(f"Missing section: {heading}")

    for label in requirements["labels"]:
        if label.lower() not in lowered:
            missing.append(f"Missing label: {label}")

    return missing


def load_existing_attempts(out_dir: Path) -> set[tuple[str, str]]:
    index_path = out_dir / ".canvas_fetch_index.json"
    if not index_path.exists():
        return set()
    try:
        import json

        data = json.loads(index_path.read_text(encoding="utf-8"))
        items = data.get("attempts", [])
        return {(str(item[0]), str(item[1])) for item in items if len(item) == 2}
    except Exception:
        return set()


def save_attempt_index(out_dir: Path, attempts: set[tuple[str, str]]):
    index_path = out_dir / ".canvas_fetch_index.json"
    import json

    payload = {"attempts": sorted(list(attempts))}
    index_path.write_text(json.dumps(payload, indent=2), encoding="utf-8")


def build_suffix(attempt: dict) -> str:
    attempt_number = attempt.get("attempt")
    if attempt_number is not None:
        return f"attempt_{attempt_number}"
    submitted_at = attempt.get("submitted_at")
    parsed = parse_submitted_at(submitted_at) if submitted_at else None
    if parsed:
        return parsed.strftime("submitted_%Y%m%d_%H%M%S")
    return "attempt_unknown"


def download_attachments(attachments: list, dest_dir: Path, headers: dict):
    dest_dir.mkdir(parents=True, exist_ok=True)
    for attachment in attachments:
        url = attachment.get("url") or attachment.get("download_url")
        if not url:
            continue
        filename = attachment.get("filename") or "attachment"
        safe_name = sanitize_filename(filename)
        ext = Path(filename).suffix
        out_path = dest_dir / f"{safe_name}{ext}"
        resp = requests.get(url, headers=headers, timeout=60)
        if resp.status_code >= 400:
            raise RuntimeError(f"Attachment download failed {resp.status_code}: {resp.text}")
        out_path.write_bytes(resp.content)


def main():
    script_dir = Path(__file__).resolve().parent
    default_token_file = script_dir.parent / "references" / "token"
    default_url_file = script_dir.parent / "references" / "url"
    default_skip_file = script_dir.parent / "references" / "skip_students"
    default_template_file = (
        script_dir.parent.parent / "sim-respond" / "assets" / "templates" / "REPORT.md"
    )

    parser = argparse.ArgumentParser(description="Fetch Canvas submissions and save as Markdown files.")
    parser.add_argument("--base-url", default=os.environ.get("CANVAS_BASE_URL"), help="Canvas base URL")
    parser.add_argument("--token", default=os.environ.get("CANVAS_TOKEN"), help="Canvas API token")
    parser.add_argument("--course-id", help="Canvas course ID")
    parser.add_argument("--assignment-id", help="Canvas assignment ID")
    parser.add_argument("--assignment-url", help="Canvas assignment URL (used to derive IDs)")
    parser.add_argument("--url-file", default=str(default_url_file), help="File containing assignment URL")
    parser.add_argument("--token-file", default=str(default_token_file), help="File containing Canvas API token")
    parser.add_argument("--skip-file", default=str(default_skip_file), help="File containing skip-list values")
    parser.add_argument("--skip-students", help="Comma-separated skip-list values")
    parser.add_argument("--template-path", default=str(default_template_file), help="Markdown template to check")
    parser.add_argument("--check-template", action="store_true", help="Check template compliance")
    parser.add_argument("--one-per-group", action="store_true", help="Keep only one submission per group")
    parser.add_argument("--grouped", action="store_true", help="Request grouped submissions from Canvas")
    parser.add_argument("--all-attempts", action="store_true", help="Save all attempts in submission history")
    parser.add_argument("--only-new", action="store_true", help="Save only attempts not previously fetched")
    parser.add_argument("--phase", help="Phase number for naming (used with --name-by-group)")
    parser.add_argument("--name-by-group", action="store_true", help="Name files as <group>_phase<phase>_<suffix>.md")
    parser.add_argument("--out-dir", required=True, help="Output directory for markdown files")
    parser.add_argument("--include-unsubmitted", action="store_true", help="Include unsubmitted students")
    parser.add_argument("--download-attachments", action="store_true", help="Download attachments")

    args = parser.parse_args()

    token = args.token
    if not token:
        token = load_text_file(Path(args.token_file))

    assignment_url = args.assignment_url
    if not assignment_url:
        assignment_url = load_text_file(Path(args.url_file))

    derived_base_url = None
    derived_course_id = None
    derived_assignment_id = None
    if assignment_url:
        parsed = parse_assignment_url(assignment_url)
        if parsed:
            derived_base_url, derived_course_id, derived_assignment_id = parsed

    base_url = args.base_url or derived_base_url
    course_id = str(args.course_id or derived_course_id or "").strip()
    assignment_id = str(args.assignment_id or derived_assignment_id or "").strip()

    if not base_url or not token:
        raise SystemExit("Missing Canvas credentials. Provide --base-url/--token or set CANVAS_BASE_URL/CANVAS_TOKEN.")
    if not course_id or not assignment_id:
        raise SystemExit("Missing assignment identifiers. Provide --course-id/--assignment-id or --assignment-url.")

    base_url = base_url.rstrip("/")

    headers = {"Authorization": f"Bearer {token}"}

    submissions_url = f"{base_url}/api/v1/courses/{course_id}/assignments/{assignment_id}/submissions"
    params = {
        "per_page": 100,
        "include[]": ["user", "submission_history", "attachments", "group"],
    }
    if args.grouped or args.one_per_group:
        params["grouped"] = "true"

    submissions = normalize_submissions(canvas_get_all(submissions_url, headers=headers, params=params))
    if args.one_per_group and not args.all_attempts:
        submissions = pick_one_per_group(submissions)

    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    attachment_dir = out_dir / "attachments"
    skip_list = load_skip_list(Path(args.skip_file), args.skip_students)
    template_text = None
    if args.check_template:
        template_text = load_text_file(Path(args.template_path))
        if not template_text:
            raise SystemExit(f"Template file not found: {args.template_path}")
    seen_attempts: set[tuple[str, str]] = set()
    if args.only_new:
        seen_attempts = load_existing_attempts(out_dir)
    updated_attempts = set(seen_attempts)
    if args.name_by_group and not args.phase:
        raise SystemExit("Missing --phase. Required when using --name-by-group.")

    saved = 0
    skipped = 0

    for submission in submissions:
        history = submission.get("submission_history") or []
        attempts = history if args.all_attempts and history else [history[-1]] if history else [submission]

        for attempt in attempts:
            workflow_state = attempt.get("workflow_state")
            if workflow_state in ("unsubmitted", None) and not args.include_unsubmitted:
                skipped += 1
                continue

            group = submission.get("group") or {}
            group_id = submission.get("group_id") or group.get("id")
            attempt_id = attempt.get("attempt") or attempt.get("submitted_at")
            if args.only_new and group_id and attempt_id:
                key = (str(group_id), str(attempt_id))
                if key in seen_attempts:
                    continue

            user = submission.get("user", {})
            if should_skip_user(user, skip_list):
                skipped += 1
                continue
            user_id = user.get("id") or "unknown"
            name = user.get("name") or user.get("sortable_name") or "student"

            if args.name_by_group:
                group_name = submission.get("group_name") or group.get("name") or "group"
                base = sanitize_filename(group_name)
                suffix = build_suffix(attempt)
                filename = f"{base}_phase{args.phase}_{suffix}.md"
            else:
                filename = f"{user_id}_{sanitize_filename(name)}.md"

            markdown = build_markdown_for_attempt(submission, attempt, course_id, assignment_id)
            if args.check_template and template_text is not None:
                missing = check_template_compliance(markdown, template_text)
                markdown += "\n## Template Compliance\n\n"
                if missing:
                    markdown += "\n".join(f"- {item}" for item in missing)
                else:
                    markdown += "- All required sections and labels present."
                markdown += "\n"
            (out_dir / filename).write_text(markdown, encoding="utf-8")
            saved += 1
            if args.only_new and group_id and attempt_id:
                updated_attempts.add((str(group_id), str(attempt_id)))

            if args.download_attachments:
                attachments = attempt.get("attachments") or []
                if attachments:
                    download_attachments(attachments, attachment_dir / str(user_id), headers)

    if args.only_new:
        save_attempt_index(out_dir, updated_attempts)

    print(f"Saved {saved} submissions to {out_dir}")
    if skipped:
        print(f"Skipped {skipped} unsubmitted entries")


if __name__ == "__main__":
    main()
