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
- **Phases**: 7 phases aligned to course topics

## Skills Overview

All skills are located in the `skills/` folder:

### sim-create
Creates new crisis management simulations with 7 phases aligned to course topics:
1. Cybersecurity & AI Threats
2. Data, Privacy, Surveillance, & Misinformation
3. Economic Security
4. Political & Societal Security
5. Health & Biosecurity
6. Environmental Security
7. Disaster Management

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
Generates a single-page web application for running simulations in class:
- Overview tab with simulation summary, timeline, team list
- Phase tabs (1-7) with inject list, interactive map, team leaderboard
- Response submission form for teams
- Facilitator controls (password-protected)
- State persistence via LocalStorage
- No server required - just open HTML in browser

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
      INJECTS.csv              # Inject format
      ACTIONS.csv              # Action catalog format
  sim-inject/
    SKILL.md
    assets/templates/
      INJECTS.csv
  sim-respond/
    SKILL.md
    assets/templates/
      REPORT.md
  sim-web/
    SKILL.md
    assets/templates/
      index.html               # Main page template
      facilitator.html         # Facilitator controls
      phase.html               # Phase page template
      data.js                  # Data structure template
      css/styles.css           # Stylesheet
      js/config.js             # Configuration
      js/canvas-client.js      # Canvas LMS integration
examples/                      # Example inject CSVs
  nyc_crisis_injects.csv
  covid_sim_geospatial_injects.csv
  covid_sim_media_injects.csv
simulations/                          # Generated simulations
  [simulation-name]/
    sim_overview.md
    phase_[1-7]_overview.md
    actions.csv
    injects_phase_[1-7].csv
    web/                       # Generated website
      index.html
      facilitator.html
      phase-[1-7].html
      data.js
      css/
      js/
findings.md                    # Research and discoveries
progress.md                    # Session log and test results
```

## Example Simulations

Example inject files are in `examples/`:
- **NYC Crisis Management** (`nyc_crisis_injects.csv`): Superstorm Sandy scenario with multi-day timeline
- **COVID-19 Misinformation/Disinformation** (`covid_sim_geospatial_injects.csv`, `covid_sim_media_injects.csv`): Media and geospatial injects

Generated simulations are stored in `simulations/`:
- **Seattle Metro Crisis** (`simulations/seattle-metro-crisis/`): Multi-phase regional crisis scenario
