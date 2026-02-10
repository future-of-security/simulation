# Simulation Skills

This project provides Claude Code skills for creating and running scenario-driven role-playing crisis management simulations. It is developed for the [Future of Security](https://future-of-security.github.io/) course.

## Session Management (Planning with Files)

Use persistent markdown files to maintain context across sessions:

| File | Purpose |
|------|---------|
| `findings.md` | Research, discoveries, extracted information |
| `progress.md` | Session log, test results, work history |

### Key Rules
1. **Create plan before complex tasks** (3+ steps)
2. **2-action rule**: Save findings after every 2 research/exploration operations
3. **Log ALL errors** - they prevent repetition
4. **Never repeat failures** - mutate approach instead
5. **Verify completion** before stopping

### When to Use
- Multi-step tasks, research, building projects
- Work spanning many tool calls
- Skip for: simple questions, single-file edits, quick lookups

## Purpose

The skills in this project enable instructors and facilitators to:
- Create realistic crisis scenarios (e.g., natural disasters, cyber incidents, public health emergencies)
- Generate and manage dynamic "injects" (events/incidents that participants must respond to)
- Process and evaluate participant responses
- Evolve the simulation based on player actions

## Simulation Parameters

- **Students**: ~60 per session
- **Teams**: 15 teams (4 students each), named after national parks
- **Duration**: 60 minutes max per phase
- **Phases**: 6 phases aligned to course topics

## Skills Overview

All skills are located in the `skills/` folder:

### sim-create
Creates new crisis management simulations with 6 phases aligned to course topics:
1. Cybersecurity & AI Threats
2. Data, Privacy, Surveillance, & Misinformation
3. Economic Security
4. Political & Societal Security
5. Health, Environmental, & Biosecurity
6. Disaster Management

Uses the Crisis Engine logic: **Trigger → System Stress → Human Impact → Decision Under Constraint → Cascading Effects**

### sim-inject
Creates and updates injects during simulation. Injects are incidents that participants must address, with attributes including:
- Incident description
- Potential participants/responders
- Severity and location
- Current state (open, resolved, partially_resolved)

### sim-respond
Processes participant response reports and advances the simulation:
- Evaluates player responses against active injects
- Provides feedback on actions taken
- Updates inject states based on player decisions
- Generates new injects to maintain simulation complexity

### sim-web
Generates a static web application for running simulations in class:
- Index page with simulation overview and phase navigation
- Phase pages with incidents, teams, and action catalog
- Filter incidents by role, filter actions by role
- Sortable tables and modal details
- No server required - just open HTML in browser

### sim-close
Closes a completed simulation phase:
- Marks the phase as "Completed" on the web dashboard (green card) via sim-web Mode 3
- No file moves needed — phase files already live in `phase_#/` subfolders from creation

### sim-canvas
Fetches student response submissions from Canvas LMS:
- Pulls submissions via Canvas API
- Converts HTML to Markdown
- Saves to `responses/` folder for processing by sim-inject
- Supports group assignments with `--one-per-group`
- Names files as `<team>_phase<#>_attempt_<#>.md`
- Can validate against REPORT.md template with `--check-template`

## File Structure

```
.claude/
  skills -> ../skills/        # Symlink for Claude Code
.codex/
  skills -> ../skills/        # Symlink for Codex
.gemini/
  skills -> ../skills/        # Symlink for Gemini
skills/
  sim-create/
    SKILL.md
    assets/templates/
      SIM_OVERVIEW.md          # Overall simulation structure
      SIM_PHASE.md             # Phase template
      SIM_ROLES.csv            # Team roles format
      SIM_ACTIONS.csv          # Action catalog format
  sim-inject/
    SKILL.md
    assets/templates/
      INJECTS.csv              # Inject format
  sim-respond/
    SKILL.md
    assets/templates/
      REPORT.md                # Team response template
  sim-web/
    SKILL.md
    assets/templates/
      index.html               # Main page template
      phase.html               # Phase page template
      css/styles.css           # Stylesheet
      js/app.js                # Application logic
  sim-close/
    SKILL.md                     # Archive completed phases
  sim-canvas/
    SKILL.md
    scripts/
      fetch_canvas_submissions.py  # Fetch submissions from Canvas
    references/
      canvas_api.md            # Canvas API reference
      token                    # Canvas API token (gitignored)
      url                      # Assignment URL
examples/                      # Example inject CSVs
  nyc_crisis_injects.csv
  covid_sim_geospatial_injects.csv
  covid_sim_media_injects.csv
simulations/                   # Generated simulations
  [simulation-name]/
    sim_overview.md
    phase_#/                   # Each phase in its own subfolder
      overview.md
      roles.csv                # Team-to-role assignments
      roles_init.csv           # Initial roles (backup)
      actions.csv              # Action catalog for this phase
      injects.csv              # Active injects (updated)
      injects_init.csv         # Initial injects (backup)
      responses/               # Team response reports
        .gitignore             # Excludes student data from git
findings.md                    # Research and discoveries
progress.md                    # Session log and test results
```

## Example Simulations

Example inject files are in `examples/`:
- **NYC Crisis Management** (`nyc_crisis_injects.csv`): Superstorm Sandy scenario with multi-day timeline
- **COVID-19 Misinformation/Disinformation** (`covid_sim_geospatial_injects.csv`, `covid_sim_media_injects.csv`): Media and geospatial injects

Generated simulations are stored in `simulations/`:
- **Seattle Metro Crisis** (`simulations/seattle-metro-crisis/`): Multi-phase regional crisis scenario
- **Virginia Cascading Crisis** (`simulations/virginia-cascading-crisis/`): Active simulation (Phase 1)

## Environment Notes

- **No system Python installed.** Use `uv run --with <deps>` to run Python scripts.
- **Canvas URL parsing bug:** `parse_assignment_url()` has a regex bug. Always use explicit `--base-url`, `--course-id`, `--assignment-id` instead of `--assignment-url`.
- **Canvas credentials:** Token in `skills/sim-canvas/references/token`, base URL is `https://canvas.vt.edu`, course ID `223104`.

## Update Cycle Workflow

During a live simulation phase, the facilitator runs update cycles:

1. **Fetch** submissions from Canvas: `uv run --with requests --with html2text skills/sim-canvas/scripts/fetch_canvas_submissions.py --base-url https://canvas.vt.edu --course-id 223104 --assignment-id <id> --one-per-group --name-by-group --phase <N> --only-new --all-attempts --check-template --out-dir simulations/<sim>/phase_N/responses`
2. **Read** new (unprocessed) response `.md` files from `phase_N/responses/` — skip files already logged in `progress.md`
3. **Evaluate** actions against injects + `phase_N/actions.csv`
4. **Update** `phase_N/injects.csv` — state changes with `[UPDATE H:MM]` explanations + new injects
5. **Update** `phase_N/roles.csv` — budget, trust, score
6. **Copy** both CSVs to `docs/phase_N/`
7. **Update** `progress.md` with full accounting
