---
name: sim-canvas
description: Fetch and archive Canvas assignment submissions as markdown files. Use when pulling student submissions from a Canvas assignment via the Canvas API, converting online text and attachment metadata into per-student .md files for simulations or response processing.
---

# Sim Canvas

Fetch student submissions from a Canvas assignment and save them as Markdown files suitable for simulation workflows.

## Quick Start

1. Save the assignment URL to `skills/sim-canvas/references/url`.
2. Save your Canvas token to `skills/sim-canvas/references/token`.
3. Run the fetch script (use `uv run` with dependencies since no system Python may be installed):

```powershell
uv run --with requests --with html2text `
  skills/sim-canvas/scripts/fetch_canvas_submissions.py `
  --base-url https://canvas.vt.edu `
  --course-id 223104 --assignment-id 2653674 `
  --one-per-group --name-by-group --phase 1 `
  --only-new --all-attempts --check-template `
  --out-dir simulations/virginia-cascading-crisis/phase_1/responses
```

4. Review generated `.md` files in the output directory.

**Known issue:** The `--assignment-url` flag does not work due to a regex bug in `parse_assignment_url()` (uses `\\d+` instead of `\d+`). Always use explicit `--base-url`, `--course-id`, and `--assignment-id` instead.

## Workflow

### 1. Identify the Assignment
- Provide IDs explicitly or let the script derive them from `references/url`.
- If unsure, consult `references/canvas_api.md` for API discovery hints.

### 2. Fetch Submissions
- Use `scripts/fetch_canvas_submissions.py`.
- The script paginates automatically and pulls:
  - User identity
  - Submission history (latest attempt)
  - Attachments (if any)

### 3. Convert to Markdown
- The script converts HTML submissions to Markdown and writes only the student-entered content by default.
- Attachments are downloaded only when `--download-attachments` is used.

### 4. Save Files
- Output files are named with Canvas user IDs and a sanitized student name.
- Each file contains:
  - YAML-style metadata header
  - Submission content
  - Attachment list (if any)

## Options and Behavior

- Default behavior skips unsubmitted students.
- Use `--include-unsubmitted` to create placeholder files.
- Use `--download-attachments` to download attached files into an `attachments/` subfolder.
- Use `--assignment-url` or `--url-file` to point to the assignment URL.
- Use `--token` or `--token-file` to provide the API token.
- Use `--skip-students` (comma-separated) or `--skip-file` to skip test users.
- Use `--check-template` to validate submissions against a Markdown template.
- Use `--template-path` to override the default template (`skills/sim-respond/assets/templates/REPORT.md`).
- Use `--one-per-group` to keep a single submission per Canvas group (for group assignments).
- Use `--grouped` to request grouped submissions directly from Canvas.
- Use `--all-attempts` to save every attempt in the submission history.
- Use `--only-new` to skip attempts that already exist in the output folder.
- Use `--name-by-group --phase <#>` to name files as `<group>_phase<#>_<suffix>.md`.

## Dependencies

- Required: `requests`
- Optional: `html2text` (for cleaner HTML-to-Markdown conversion)

If `html2text` is missing, the script falls back to a minimal HTML strip.

**Running without system Python:** Use `uv run --with requests --with html2text` to run the script in an isolated environment. This is the recommended approach when no system Python is available.

## Resources

### scripts/
- `fetch_canvas_submissions.py` — Fetch submissions and write Markdown files.

### references/
- `canvas_api.md` — Quick reference for Canvas submissions endpoints and parameters.
