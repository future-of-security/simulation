---
name: sim-web
description: Generate a multi-page Crisis Simulation Dashboard for facilitators to monitor teams and incidents. Use when users want to create a web interface for running simulations.
---

# Simulation Web Generator

Generate a multi-page Crisis Simulation Dashboard with dynamic data loading from CSV and MD files.

## Architecture

```
docs/
  index.html           # Overview page with phases grid
  phase_1.html         # Phase 1 detail page
  phase_2.html         # Phase 2 detail page (when available)
  ...
  css/
    styles.css         # All dashboard styles
  js/
    app.js             # Dynamic data loader
  data/
    sim_overview.md    # Simulation title and summary
    phase_1_roles.csv  # Phase 1 teams
    phase_1_injects.csv # Phase 1 incidents
    ...
```

## Page Designs

### Index Page (Overview)

```
┌─────────────────────────────────────────────────────────────────┐
│  Crisis Simulation Dashboard                                     │
│  Real-time monitoring and response coordination                  │
├─────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Simulation Overview                                        │  │
│  │ Summary text from sim_overview.md                          │  │
│  └───────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│  Phases                                                          │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐             │
│  │ PHASE 1      │ │ PHASE 2      │ │ PHASE 3      │  ...        │
│  │ Cybersecurity│ │ Data Privacy │ │ Economic     │             │
│  │ Available    │ │ Coming Soon  │ │ Coming Soon  │             │
│  └──────────────┘ └──────────────┘ └──────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

**Components:**
- Header with title and subtitle
- Overview card with simulation summary (from `## Summary` section of sim_overview.md)
- Phases grid showing all 7 phases with availability status

### Phase Page (Detail)

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back to Overview                                              │
│  Phase 1: Cybersecurity & AI Threats                            │
│  Virginia Cascading Crisis Simulation                            │
├─────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Situation                                                  │  │
│  │ At 2:47 AM, Virginia Tech's SOC detects anomalous network │  │
│  │ traffic... (narrative context from phase_N_overview.md)   │  │
│  └───────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Current Status                                             │  │
│  │ [15 Teams] [Budget $671K] [10 Incidents] [50% Trust]      │  │
│  │                                                            │  │
│  │ Assignment Submission          [Open Canvas Assignment]    │  │
│  └───────────────────────────────────────────────────────────┘  │
├────────────────────────────┬────────────────────────────────────┤
│  Teams                     │  Active Incidents                  │
│  ┌────────────────────┐    │  ┌──────────────────────────────┐  │
│  │ Name │Role │$│Trust│    │  │Title│Desc│Sev│Time│State│Who│  │
│  │ ─────┼─────┼─┼─────│    │  │─────┼────┼───┼────┼─────┼───│  │
│  │ ...  │...  │ │ ... │    │  │ ... │... │...│... │ ... │...│  │
│  └────────────────────┘    │  └──────────────────────────────┘  │
└────────────────────────────┴────────────────────────────────────┘
```

**Components:**
- Back link to overview
- Phase header with number, title, and simulation name
- Context card with narrative situation (from `## Context` section of phase_N_overview.md)
- Stats card with team count, budget, incidents, trust + Canvas link
- Two-column layout: Teams table (left) + Incidents table (right)

## Data Sources

The dashboard loads data dynamically at runtime via JavaScript fetch():

| File | Purpose |
|------|---------|
| `data/sim_overview.md` | Title from `# heading`, summary from `## Summary` section |
| `data/phase_N_overview.md` | Phase context from `## Context` section |
| `data/phase_N_roles.csv` | Teams table (team, role, sector, budget, trust) |
| `data/phase_N_injects.csv` | Incidents table (id, incident, description, severity, etc.) |

**To update data:** Copy updated CSV/MD files to `docs/data/` and refresh the browser.

## CSV Formats

### Roles CSV (phase_N_roles.csv)

```csv
team,role,sector,budget,trust
Acadia,State Emergency Director,Government,$100K,5
Glacier,Hospital Administrator,Healthcare,$50K,7
...
```

### Injects CSV (phase_N_injects.csv)

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

| State | Dot Color | Label |
|-------|-----------|-------|
| open | Gray | Pending |
| in_progress | Blue | In Progress |
| escalated | Red | Escalated |
| resolved | Green | Resolved |
| partially_resolved | Yellow | Partial |

## Phase Configuration

Phases are configured in `js/app.js`:

```javascript
const CONFIG = {
  canvasUrl: "",  // Set Canvas assignment URL
  phases: [
    { num: 1, title: "Cybersecurity & AI Threats", available: true },
    { num: 2, title: "Data, Privacy, Surveillance, & Misinformation", available: false },
    { num: 3, title: "Economic Security", available: false },
    { num: 4, title: "Political & Societal Security", available: false },
    { num: 5, title: "Health & Biosecurity", available: false },
    { num: 6, title: "Environmental Security", available: false },
    { num: 7, title: "Disaster Management", available: false }
  ]
};
```

To enable a phase:
1. Set `available: true` in the config
2. Add the phase_N_overview.md, phase_N_roles.csv, and phase_N_injects.csv to `docs/data/`
3. Create phase_N.html (copy from phase_1.html, change PHASE_NUM)

## Workflow

### Step 1: Copy Data Files
Copy simulation data files to `docs/data/`:
- `sim_overview.md`
- `phase_1_overview.md`
- `phase_1_roles.csv`
- `phase_1_injects.csv`

### Step 2: Configure Phases
Edit `js/app.js` to set:
- Canvas URL (optional)
- Phase availability

### Step 3: Create Phase Pages
For each available phase, create `phase_N.html`:
```html
<script>
  const PHASE_NUM = N;  // Set phase number
</script>
<script src="js/app.js"></script>
```

### Step 4: Deploy
Deploy `docs/` folder to GitHub Pages or any static host.

## Styling Guidelines

### Colors
- **Background**: White (#FFFFFF) and Light Gray (#F9FAFB)
- **Text**: Dark Gray (#111827) and Medium Gray (#6B7280)
- **Borders**: Light Gray (#E5E7EB)
- **Accent**: Blue (#3B82F6) for buttons and links
- **Available**: Green (#22C55E)
- **Locked**: Gray (#9CA3AF)

### Typography
- **Title**: 24px, Bold, Dark Gray
- **Subtitle**: 14px, Regular, Medium Gray
- **Phase Number**: 12px, Semibold, Blue, Uppercase
- **Phase Title**: 16px, Semibold, Dark Gray
- **Table Headers**: 12px, Medium, Medium Gray, Uppercase
- **Table Cells**: 14px, Regular, Dark Gray

### Cards
- White background
- 1px border (#E5E7EB)
- 8px border radius
- 20-24px padding

### Phase Cards
- Hover: Blue border, subtle shadow, slight lift
- Locked: 60% opacity, no hover effect

### Tables
- No outer borders
- Light gray dividers between rows
- Hover state on rows (light gray background)
- Scrollable with max-height

## Interactive Features

### Current
- Click phase cards to navigate to phase detail
- Back link returns to overview
- Tables scroll independently
- Hover states on cards and table rows

### Future Enhancements
- Real-time updates via polling
- Incident claiming by teams
- Phase progression controls
- Facilitator admin panel
