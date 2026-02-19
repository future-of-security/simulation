# update_cycle.ps1 — Fetch Canvas submissions and launch Claude to process them
#
# Usage:
#   .\scripts\update_cycle.ps1 <phase> <assignment-url> [simulation] [interval]
#
# Example:
#   .\scripts\update_cycle.ps1 2 https://canvas.vt.edu/courses/223104/assignments/2679626
#   .\scripts\update_cycle.ps1 3 https://canvas.vt.edu/courses/223104/assignments/2680001 virginia-cascading-crisis 180
#
# What it does:
#   1. Checks prerequisites (uv, token, url)
#   2. Fetches new submissions from Canvas
#   3. Launches Claude Code to evaluate responses and update the simulation
#   4. If interval is set, waits and repeats from step 2
#
# Press Ctrl+C to stop the loop.

param(
    [Parameter(Mandatory=$true, Position=0)]
    [string]$Phase,

    [Parameter(Mandatory=$true, Position=1)]
    [string]$AssignmentUrl,

    [Parameter(Position=2)]
    [string]$Simulation = "virginia-cascading-crisis",

    [Parameter(Position=3)]
    [int]$Interval = 0  # seconds between runs; 0 = run once
)

$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $RepoRoot

# --- Parse assignment URL ---
# Expected format: https://<host>/courses/<course_id>/assignments/<assignment_id>
if ($AssignmentUrl -match '^(https?://[^/]+)/courses/(\d+)/assignments/(\d+)') {
    $BaseUrl      = $Matches[1]
    $CourseId     = $Matches[2]
    $AssignmentId = $Matches[3]
} else {
    Write-Host "ERROR: Could not parse assignment URL." -ForegroundColor Red
    Write-Host "Expected format: https://canvas.vt.edu/courses/223104/assignments/2679626"
    exit 1
}

# --- Paths ---
$SimDir       = "simulations/$Simulation"
$DocsDir      = "docs"
$PhaseDir     = "$SimDir/phase_$Phase"
$CanvasScript = "skills/sim-canvas/scripts/fetch_canvas_submissions.py"
$TokenFile    = "skills/sim-canvas/references/token"
$UrlFile      = "skills/sim-canvas/references/url"

# --- Prerequisite checks ---
Write-Host "=== Checking prerequisites ==="

# Check uv
if (-not (Get-Command uv -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: uv is not installed." -ForegroundColor Red
    Write-Host "Install it from: https://docs.astral.sh/uv/getting-started/installation/"
    Write-Host "  powershell -ExecutionPolicy ByPass -c `"irm https://astral.sh/uv/install.ps1 | iex`""
    exit 1
}
Write-Host "  uv: $(uv --version)"

# Check claude
if (-not (Get-Command claude -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: claude (Claude Code CLI) is not installed." -ForegroundColor Red
    Write-Host "Install it from: https://docs.anthropic.com/en/docs/claude-code"
    exit 1
}
Write-Host "  claude: found"

# Check token
if (-not (Test-Path $TokenFile)) {
    Write-Host "Canvas API token not found at $TokenFile" -ForegroundColor Yellow
    Write-Host "Get your token from Canvas > Account > Settings > New Access Token"
    $Token = Read-Host "Paste your token"
    Set-Content -Path $TokenFile -Value $Token -NoNewline
    Write-Host "  Token saved to $TokenFile"
} else {
    Write-Host "  token: found"
}

# Save url
Set-Content -Path $UrlFile -Value $AssignmentUrl -NoNewline
Write-Host "  url: $AssignmentUrl"

# Check phase directory
if (-not (Test-Path $PhaseDir -PathType Container)) {
    Write-Host "ERROR: Phase directory not found: $PhaseDir" -ForegroundColor Red
    Write-Host "Create the phase first with sim-create."
    exit 1
}
Write-Host "  phase dir: $PhaseDir"
Write-Host "  parsed: base=$BaseUrl course=$CourseId assignment=$AssignmentId"

# Record phase start time (only on first run — don't overwrite)
$StartFile = "$PhaseDir/phase_start"
if (-not (Test-Path $StartFile)) {
    $StartTime = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
    Set-Content -Path $StartFile -Value $StartTime -NoNewline
    Write-Host "  phase started: $StartTime (saved to $StartFile)"
} else {
    $StartTime = (Get-Content $StartFile).Trim()
    Write-Host "  phase started: $StartTime (from $StartFile)"
}
Write-Host ""

# --- Cycle function ---
function Run-Cycle {
    param([int]$CycleNum)

    Write-Host "========================================="
    Write-Host "=== Cycle $CycleNum — $(Get-Date -Format 'HH:mm:ss') ==="
    Write-Host "========================================="

    # Count files before fetch
    $ResponseDir = "$PhaseDir/responses"
    $BeforeCount = @(Get-ChildItem -Path $ResponseDir -Filter "*.md" -ErrorAction SilentlyContinue).Count

    # Fetch submissions
    Write-Host "=== Fetching submissions from Canvas ==="
    Write-Host "  Phase: $Phase | Assignment: $AssignmentId | Simulation: $Simulation"
    Write-Host ""

    uv run --with requests --with html2text `
        $CanvasScript `
        --base-url $BaseUrl `
        --course-id $CourseId `
        --assignment-id $AssignmentId `
        --one-per-group --name-by-group --phase $Phase `
        --only-new --all-attempts --check-template `
        --out-dir $ResponseDir

    # Count files after fetch
    $AfterCount = @(Get-ChildItem -Path $ResponseDir -Filter "*.md" -ErrorAction SilentlyContinue).Count
    $NewCount = $AfterCount - $BeforeCount

    if ($NewCount -le 0) {
        Write-Host "  No new submissions. Skipping Claude."
        return
    }

    Write-Host "  $NewCount new submission(s) found."
    Write-Host ""

    # Launch Claude to process
    Write-Host "=== Launching Claude Code to process submissions ==="
    Write-Host ""

    $Prompt = @"
Process new submissions for the simulation update cycle.

Phase: $Phase
Simulation: $Simulation
Phase dir: $PhaseDir
Phase start: $StartTime

Steps:
1. Read new (unprocessed) response .md files from $PhaseDir/responses/ — skip files already logged in progress.md
2. Evaluate actions against injects + $PhaseDir/actions.csv
3. Update $PhaseDir/injects.csv — state changes with [UPDATE H:MM] explanations + new injects
4. Update $PhaseDir/roles.csv — budget, trust, score
5. Copy both CSVs to $DocsDir/phase_$Phase/
6. Update progress.md with full accounting
7. Commit and push
"@

    claude -p $Prompt
    git push
}

# --- Run ---
if ($Interval -eq 0) {
    Run-Cycle -CycleNum 1
} else {
    Write-Host "=== Continuous mode: interval=${Interval}s (Ctrl+C to stop) ==="
    Write-Host ""
    $Cycle = 1
    while ($true) {
        Run-Cycle -CycleNum $Cycle
        $Cycle++
        Write-Host ""
        Write-Host "=== Waiting ${Interval}s before next cycle (Ctrl+C to stop) ==="
        Start-Sleep -Seconds $Interval
    }
}
