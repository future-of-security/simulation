---
name: sim-web
description: Manage the Crisis Simulation Dashboard. Three modes - generate (full site from templates), update (copy latest CSV data), or close (mark phase completed).
---

# Simulation Web

Manage the Crisis Simulation Dashboard. Called directly or invoked by other skills (sim-inject, sim-close).

## Three Modes

### Mode 1: Generate — Build the full website
Create the dashboard from scratch using templates. Use when setting up a new simulation or adding a new phase.

### Mode 2: Update — Refresh data files
Copy updated CSVs to the phase subfolder in `docs/`. Use after each sim-inject update cycle. This is the most common operation.

### Mode 3: Close — Mark a phase as completed
Mark a phase as completed on the dashboard. Use when closing a phase via sim-close.

---

## Mode 1: Generate

Build the full dashboard site from templates. Run once per simulation setup, or when adding a new phase page.

### Inputs
- Simulation directory (e.g., `simulations/virginia-cascading-crisis/`)
- Phase number(s) to make available

### Steps

1. **Copy templates** from `assets/templates/` to `docs/`:
   - `index.html`, `help.html`, `css/styles.css`, `js/app.js`
   - For each available phase, create `docs/phase_N/index.html` from `phase.html` template (set `PHASE_NUM`)

2. **Copy shared data** to `docs/`:
   - `sim_overview.md` (directly in `docs/`, no subfolder)

3. **Copy phase data files** to `docs/phase_N/`:
   - `overview.md`
   - `roles.csv`
   - `injects.csv`
   - `actions.csv`

4. **Configure phases** in `docs/js/app.js`:
   - Set `available: true` for active phases
   - Set `completed: true` for finished phases
   - Set Canvas URL if applicable

---

## Mode 2: Update

Copy the latest simulation data to the phase subfolder. **This is the simplest and most frequent operation** — just copy two files.

### Inputs
- Simulation directory
- Phase number

### Steps

Copy these files from the simulation's phase subfolder to `docs/phase_N/`:

```
simulations/<sim>/phase_N/injects.csv  →  docs/phase_N/injects.csv
simulations/<sim>/phase_N/roles.csv    →  docs/phase_N/roles.csv
```

That's it. The dashboard loads data dynamically — refreshing the browser shows the updated state.

### When to Run
- After every sim-inject update cycle (sim-inject calls this automatically)
- After manually editing roles or injects CSVs

---

## Mode 3: Close

Mark a phase as completed on the dashboard. Since data is stored per-phase in `docs/phase_N/`, no file removal is needed.

### Inputs
- Phase number to close

### Steps

**Update `docs/js/app.js`** — change the phase config entry:
```javascript
// Before
{ num: 1, title: "Cybersecurity & AI Threats", available: true },
// After
{ num: 1, title: "Cybersecurity & AI Threats", completed: true },
```

The phase card on the index page will now show "Completed" with a green style. Phase data files stay in `docs/phase_N/` — they are harmless and isolated.

---

## Architecture

```
docs/
  index.html           # Overview page with phases grid
  help.html            # Player help & rules page
  sim_overview.md      # Simulation title and summary
  css/
    styles.css         # All dashboard styles
  js/
    app.js             # Dynamic data loader
  phase_1/
    index.html         # Phase 1 detail page
    overview.md
    roles.csv          # Phase 1 teams (copied by Mode 2)
    injects.csv        # Phase 1 incidents (copied by Mode 2)
    actions.csv        # Phase 1 action catalog
  phase_2/
    index.html         # Phase 2 detail page (when available)
    overview.md
    roles.csv
    injects.csv
    actions.csv
  ...
```

## Phase States

Phases are configured in `docs/js/app.js`:

```javascript
const CONFIG = {
  canvasUrl: "",
  phases: [
    { num: 1, title: "Cybersecurity & AI Threats", available: true },
    { num: 2, title: "Data, Privacy, Surveillance, & Misinformation", available: false },
    ...
  ]
};
```

| State | Config | Card Appearance |
|-------|--------|----------------|
| Available | `available: true` | Blue hover, clickable, links to `phase_N/` |
| Completed | `completed: true` | Green border/background, "Completed" label, clickable (links to `phase_N/`) |
| Locked | neither flag | Dimmed, "Coming Soon" |

## Data Sources

The dashboard loads data dynamically at runtime via JavaScript fetch():

| File | Loaded From | Purpose |
|------|-------------|---------|
| `sim_overview.md` | Index (local) / phase pages (`../`) | Title from `# heading`, summary from `## Summary` section |
| `phase_N/overview.md` | Phase page (local) | Phase context from `## Context` section |
| `phase_N/roles.csv` | Phase page (local) | Teams table (team, role, sector, budget, trust, score) |
| `phase_N/injects.csv` | Phase page (local) | Incidents table (id, incident, description, severity, etc.) |
| `phase_N/actions.csv` | Phase page (local) | Action catalog for this phase |

## CSV Formats

### Roles CSV (roles.csv)

```csv
team,role,sector,budget,trust,score
Acadia,State Emergency Director,Government,$100K,5,0
Glacier,Hospital Administrator,Healthcare,$50K,7,75
...
```

### Injects CSV (injects.csv)

```csv
id,phase,sim_time,incident,description,location,severity,visible_to,time_limit,state,points_resolve
1,1,0:00,Data Breach Detected,47GB transferred to unknown IP...,Blacksburg,5,Denali;Arches,10,open,150
...
```

## Severity Mapping

| Value | Label | Badge Color |
|-------|-------|-------------|
| 5 | Critical | Red (#DC2626) |
| 4 | High | Orange (#F59E0B) |
| 3 | Medium | Yellow (#EAB308) |
| 2 | Low | Green (#22C55E) |
| 1 | Info | Blue (#3B82F6) |

## State Mapping

| State | Dot Color | Label | Visibility |
|-------|-----------|-------|------------|
| open | Gray | Pending | Shown |
| hidden | — | — | Filtered out (escalation injects not yet triggered) |
| in_progress | Blue | In Progress | Shown |
| escalated | Red | Escalated | Shown |
| resolved | Green | Resolved | Hidden by default, toggle to show |
| partially_resolved | Yellow | Partial | Shown |

## Templates

Source templates in `assets/templates/`:
- `index.html` — Main page template
- `help.html` — Player help & rules page
- `phase.html` — Phase page template (copied to `phase_N/index.html`)
- `css/styles.css` — Stylesheet
- `js/app.js` — Application logic

Used only by Mode 1 (Generate). Mode 2 and Mode 3 work with the existing `docs/` files.
