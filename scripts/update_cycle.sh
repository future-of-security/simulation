#!/usr/bin/env bash
# update_cycle.sh — Fetch Canvas submissions and launch Claude to process them
#
# Usage:
#   ./scripts/update_cycle.sh <phase> <assignment-url> [simulation] [interval]
#
# Example:
#   ./scripts/update_cycle.sh 2 https://canvas.vt.edu/courses/223104/assignments/2679626
#   ./scripts/update_cycle.sh 3 https://canvas.vt.edu/courses/223104/assignments/2680001 virginia-cascading-crisis 180
#
# What it does:
#   1. Checks prerequisites (uv, token, url)
#   2. Fetches new submissions from Canvas
#   3. Launches Claude Code to evaluate responses and update the simulation
#   4. If interval is set, waits and repeats from step 2
#
# Press Ctrl+C to stop the loop.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

# --- Arguments ---
PHASE="${1:-}"
ASSIGNMENT_URL="${2:-}"
SIM="${3:-virginia-cascading-crisis}"
INTERVAL="${4:-}"  # seconds between runs; empty = run once

# --- Usage ---
if [ -z "$PHASE" ] || [ -z "$ASSIGNMENT_URL" ]; then
  echo "Usage: ./scripts/update_cycle.sh <phase> <assignment-url> [simulation] [interval]"
  echo ""
  echo "  phase           Phase number (e.g., 2, 3)"
  echo "  assignment-url  Canvas assignment URL"
  echo "                  e.g. https://canvas.vt.edu/courses/223104/assignments/2679626"
  echo "  simulation      Simulation name (default: virginia-cascading-crisis)"
  echo "  interval        Seconds between runs (omit for single run)"
  exit 1
fi

# --- Parse assignment URL ---
# Expected format: https://<host>/courses/<course_id>/assignments/<assignment_id>
if [[ "$ASSIGNMENT_URL" =~ ^(https?://[^/]+)/courses/([0-9]+)/assignments/([0-9]+) ]]; then
  BASE_URL="${BASH_REMATCH[1]}"
  COURSE_ID="${BASH_REMATCH[2]}"
  ASSIGNMENT_ID="${BASH_REMATCH[3]}"
else
  echo "ERROR: Could not parse assignment URL."
  echo "Expected format: https://canvas.vt.edu/courses/223104/assignments/2679626"
  exit 1
fi

# --- Paths ---
SIM_DIR="simulations/$SIM"
DOCS_DIR="docs"
PHASE_DIR="$SIM_DIR/phase_$PHASE"
CANVAS_SCRIPT="skills/sim-canvas/scripts/fetch_canvas_submissions.py"
TOKEN_FILE="skills/sim-canvas/references/token"
URL_FILE="skills/sim-canvas/references/url"

# --- Prerequisite checks ---
echo "=== Checking prerequisites ==="

# Check uv
if ! command -v uv &>/dev/null; then
  echo "ERROR: uv is not installed."
  echo "Install it from: https://docs.astral.sh/uv/getting-started/installation/"
  echo "  curl -LsSf https://astral.sh/uv/install.sh | sh"
  exit 1
fi
echo "  uv: $(uv --version)"

# Check claude
if ! command -v claude &>/dev/null; then
  echo "ERROR: claude (Claude Code CLI) is not installed."
  echo "Install it from: https://docs.anthropic.com/en/docs/claude-code"
  exit 1
fi
echo "  claude: found"

# Check token
if [ ! -f "$TOKEN_FILE" ]; then
  echo "ERROR: Canvas API token not found at $TOKEN_FILE"
  echo "Get your token from Canvas > Account > Settings > New Access Token"
  read -rp "Paste your token: " TOKEN
  echo "$TOKEN" > "$TOKEN_FILE"
  echo "  Token saved to $TOKEN_FILE"
else
  echo "  token: found"
fi

# Save url
echo "$ASSIGNMENT_URL" > "$URL_FILE"
echo "  url: $ASSIGNMENT_URL"

# Check phase directory
if [ ! -d "$PHASE_DIR" ]; then
  echo "ERROR: Phase directory not found: $PHASE_DIR"
  echo "Create the phase first with sim-create."
  exit 1
fi
echo "  phase dir: $PHASE_DIR"
echo "  parsed: base=$BASE_URL course=$COURSE_ID assignment=$ASSIGNMENT_ID"

# Record phase start time (only on first run — don't overwrite)
START_FILE="$PHASE_DIR/phase_start"
if [ ! -f "$START_FILE" ]; then
  START_TIME="$(date -u '+%Y-%m-%dT%H:%M:%SZ')"
  echo -n "$START_TIME" > "$START_FILE"
  echo "  phase started: $START_TIME (saved to $START_FILE)"
else
  START_TIME="$(cat "$START_FILE")"
  echo "  phase started: $START_TIME (from $START_FILE)"
fi
echo ""

CYCLE=1

run_cycle() {
  echo "========================================="
  echo "=== Cycle $CYCLE — $(date '+%H:%M:%S') ==="
  echo "========================================="

  # Count files before fetch
  RESPONSE_DIR="$PHASE_DIR/responses"
  BEFORE_COUNT=$(find "$RESPONSE_DIR" -maxdepth 1 -name "*.md" 2>/dev/null | wc -l)

  # --- Fetch submissions ---
  echo "=== Fetching submissions from Canvas ==="
  echo "  Phase: $PHASE | Assignment: $ASSIGNMENT_ID | Simulation: $SIM"
  echo ""

  uv run --with requests --with html2text \
    "$CANVAS_SCRIPT" \
    --base-url "$BASE_URL" \
    --course-id "$COURSE_ID" \
    --assignment-id "$ASSIGNMENT_ID" \
    --one-per-group --name-by-group --phase "$PHASE" \
    --only-new --all-attempts --check-template \
    --out-dir "$RESPONSE_DIR"

  # Count files after fetch
  AFTER_COUNT=$(find "$RESPONSE_DIR" -maxdepth 1 -name "*.md" 2>/dev/null | wc -l)
  NEW_COUNT=$((AFTER_COUNT - BEFORE_COUNT))

  if [ "$NEW_COUNT" -le 0 ]; then
    echo "  No new submissions. Skipping Claude."
    return
  fi

  echo "  $NEW_COUNT new submission(s) found."
  echo ""

  # --- Launch Claude to process ---
  echo "=== Launching Claude Code to process submissions ==="
  echo ""

  PROMPT="Process new submissions for the simulation update cycle.

Phase: $PHASE
Simulation: $SIM
Phase dir: $PHASE_DIR
Phase start: $START_TIME

Steps:
1. Read new (unprocessed) response .md files from $PHASE_DIR/responses/ — skip files already logged in progress.md
2. Evaluate actions against injects + $PHASE_DIR/actions.csv
3. Update $PHASE_DIR/injects.csv — state changes with [UPDATE H:MM] explanations + new injects
4. Update $PHASE_DIR/roles.csv — budget, trust, score
5. Copy both CSVs to $DOCS_DIR/phase_$PHASE/
6. Update progress.md with full accounting
7. Commit and push"

  claude -p "$PROMPT"
  git push
}

# --- Run ---
if [ -z "$INTERVAL" ]; then
  # Single run
  run_cycle
else
  echo "=== Continuous mode: interval=${INTERVAL}s (Ctrl+C to stop) ==="
  echo ""
  while true; do
    run_cycle
    CYCLE=$((CYCLE + 1))
    echo ""
    echo "=== Waiting ${INTERVAL}s before next cycle (Ctrl+C to stop) ==="
    sleep "$INTERVAL"
  done
fi
