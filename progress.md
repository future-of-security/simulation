# Progress Log

## 2026-02-05: Score Tracking and Sortable Tables

### Completed

- [x] Added `score` column to roles CSV format (team tracking file)
  - Updated `skills/sim-create/SKILL.md` to document score column
  - Updated `skills/sim-create/assets/templates/SIM_ROLES.csv`
  - Score starts at 0, earned from `points_resolve` when injects resolved
- [x] Updated `skills/sim-inject/SKILL.md` with score calculation rules:
  - Full points for `resolved` injects
  - 50% points for `partially_resolved` injects
  - Collaborative scoring: 60% each for 2 teams, 40% each for 3+ teams
- [x] Added sorting functionality to sim-web dashboard:
  - Teams table: sortable by Name, Role, Budget, Trust, Score (default: Score desc)
  - Incidents table: sortable by Title, Severity, Time Limit, State (default: Severity desc)
  - Click column header to sort, click again to reverse direction
  - Visual indicators (arrows) show current sort column and direction
- [x] Updated all template files:
  - `skills/sim-web/assets/templates/js/app.js` - sorting logic
  - `skills/sim-web/assets/templates/phase.html` - sortable headers
  - `skills/sim-web/assets/templates/css/styles.css` - sort indicator styles
- [x] Updated docs/ deployment:
  - `docs/js/app.js` - sorting logic
  - `docs/phase_1.html` - sortable headers
  - `docs/css/styles.css` - sort indicator styles
  - `docs/data/phase_1_roles.csv` - added score column
- [x] Updated simulation data files:
  - `simulations/virginia-cascading-crisis/phase_1_roles.csv`
  - `simulations/virginia-cascading-crisis/phase_1_roles_init.csv`

### File Format Changes

Roles CSV now has 6 columns:

```csv
team,role,sector,budget,trust,score
Acadia,Governor's Liaison,State Executive,$20M,6,0
```

---

## 2026-02-04: sim-web v4 - Multi-Page Dynamic Dashboard

### Completed
- [x] Restructured sim-web to multi-page architecture:
  - `docs/index.html` - Overview page with simulation title, summary, and phases grid
  - `docs/phase_1.html` - Phase detail page with teams table and incidents table
- [x] Created dynamic data loading via JavaScript (no hardcoded data):
  - Fetches `data/sim_overview.md` for title and summary
  - Fetches `data/phase_N_roles.csv` for teams
  - Fetches `data/phase_N_injects.csv` for incidents
- [x] Added CSS styles for phases grid and phase cards
- [x] Updated `docs/js/app.js` with page type detection and dual initialization
- [x] Data files deployed to `docs/data/`:
  - `sim_overview.md`
  - `phase_1_roles.csv`
  - `phase_1_injects.csv`

### Architecture
```
docs/
  index.html        → Overview + phases grid (7 phases listed)
  phase_1.html      → Phase 1 detail with teams/incidents tables
  css/styles.css    → All styles including phases grid
  js/app.js         → Dynamic CSV/MD loader, page detection
  data/
    sim_overview.md      → Copied from simulation
    phase_1_roles.csv    → Copied from simulation
    phase_1_injects.csv  → Copied from simulation
```

### Features
- Page auto-detects type (index vs phase) based on DOM elements
- CSV parser handles quoted fields with commas and escaped quotes
- Phases show "Available" or "Coming Soon" status
- Phase 1 is available, phases 2-7 are locked (coming soon)
- To update data: copy updated CSV/MD files to `docs/data/` and refresh

---

## 2026-01-30: sim-web v3 - Canvas LMS Integration

### Completed
- [x] Redesigned sim-web for Canvas LMS integration (no custom database needed)
- [x] Updated to 14 teams named after national parks:
  - Acadia, Arches, Bryce, Denali, Glacier, Jasper, Olympic
  - Redwood, Sequoia, Shenandoah, Yellowstone, Yoho, Yosemite, Zion
- [x] Created/updated templates:
  - `index.html` - Home page with prominent leaderboard grid
  - `phase.html` - Phase pages with inject list, map, compact leaderboard
  - `facilitator.html` - Setup guide, phase control, manual score entry
- [x] Created Canvas integration:
  - `js/config.js` - Configuration with 14 teams, Canvas settings
  - `js/canvas-client.js` - Canvas API client for fetching grades
- [x] Removed Supabase-related files (no longer needed):
  - Deleted `js/supabase-client.js`
  - Deleted `js/app.js`
  - Deleted `report.html`
  - Deleted `schema.sql`

### Architecture (Canvas Integration)
```
Pages:
  index.html       → Overview + full leaderboard grid (14 teams)
  phase-1.html     → Phase 1 with inject list, map, compact leaderboard
  ...
  phase-7.html     → Phase 7
  facilitator.html → Setup guide, phase control, manual scores

Backend: Canvas LMS
  - Students submit responses as Canvas assignments
  - Facilitator grades in Canvas
  - Website fetches grades via Canvas API (optional proxy)
  - Manual score entry as fallback
```

### Workflow
1. **Setup**: Create Canvas assignments and groups matching team names
2. **During class**: Students view injects on website, submit responses in Canvas
3. **Grading**: Facilitator grades in Canvas SpeedGrader
4. **Leaderboard**: Website auto-fetches grades and displays rankings

### Pending
- [x] Update sim-create templates to use 14 teams instead of 15
- [x] Generate sample Seattle Metro Crisis website with Canvas templates

### Sample Website Generated
Generated `samples/seattle-metro-crisis/web/` with:
- `index.html` - Home page with leaderboard and phase list
- `phase-1.html` - Phase 1: Port Under Siege (Cybersecurity)
- `facilitator.html` - Setup guide, phase control, manual scores
- `data.js` - Simulation data (46 injects across 7 phases)
- `js/config.js` - 14 national park teams, Canvas settings
- `js/canvas-client.js` - Canvas API integration
- `css/styles.css` - Shared styles

To test: Open `index.html` in a browser. Use facilitator page (password: cascadia2026) to control phases and enter scores manually.

---

## 2026-01-30: sim-web Redesigned (Multi-page + Server-side)

### Completed
- [x] Redesigned sim-web skill for multi-page architecture with server-side storage
- [x] Created new page templates:
  - `index.html` - Overview page with phase list
  - `phase.html` - Phase page template with inject claiming
  - `report.html` - Collaborative report writing page
- [x] Created shared assets:
  - `css/styles.css` - Comprehensive styling
  - `js/config.js` - Backend configuration
  - `js/supabase-client.js` - Supabase REST + real-time client
  - `js/app.js` - Main application logic
- [x] Created database schema:
  - `schema.sql` - Full Supabase schema with real-time enabled

### New Architecture
```
Pages:
  index.html       → Overview + phase list
  phase-1.html     → Phase 1 with inject list, map, leaderboard
  ...
  phase-7.html     → Phase 7
  report.html      → Collaborative report writing
  facilitator.html → Admin controls (pending)

Backend: Supabase (recommended)
  - Real-time updates via WebSocket
  - PostgreSQL database
  - Free tier available
```

### Inject Claiming Flow
1. **Unclaimed inject**: Shows "Claim" button
2. **Team A claims**: Inject shows "Claimed by Team A"
3. **Team B sees**: "Join" button appears
4. **Team B joins**: Both teams notified
5. **Collaboration**: Both redirected to `report.html?inject=X`
6. **Report**: Collaborative editing with real-time sync

### Database Tables
- `game_state` - Current phase, timestamps
- `teams` - Team info, budget, trust, score
- `inject_claims` - Who is working on what
- `responses` - Submitted reports
- `inject_overrides` - Facilitator changes
- `activity_log` - Audit trail

### Setup Steps (for user)
1. Create Supabase project at supabase.com
2. Run `schema.sql` in SQL editor
3. Copy URL + anon key to `config.js`
4. Deploy HTML files (GitHub Pages, Netlify, etc.)

### Pending
- [ ] Create `facilitator.html` template
- [ ] Generate actual pages for Seattle Metro Crisis sample
- [ ] Test real-time collaboration

---

## 2026-01-30: sim-web Skill Created (v1 - Single Page)

### Completed
- [x] Created initial single-page version (superseded by multi-page design)
- [x] Generated working prototype for Seattle Metro Crisis
  - `samples/seattle-metro-crisis/web/index.html`
  - `samples/seattle-metro-crisis/web/data.js`

---

## 2026-01-30: Sample Simulation Created

### Completed
- [x] Updated CLAUDE.md with planning-with-files principles
- [x] Updated sim-create SKILL.md for 15 teams, 75 min
- [x] Created sample simulation: `samples/seattle-metro-crisis/`
  - 15 roles, 7 regions, 7 phases
  - 40 actions, 54 injects
  - Full constraint system

### Notes
- Duration: 10 min per phase (phases 1-6), 15 min for phase 7 = 75 min total
- Some roles require activation (National Guard, FEMA)
- Facilitator password should be changed before classroom use
\n## 2026-02-04\n- Error: init_skill.py failed because Python module 'yaml' is missing (ModuleNotFoundError).\n
\n## 2026-02-04\n- Error: fetch_canvas_submissions.py reported missing assignment identifiers when using --assignment-url (fallback to explicit course/assignment IDs worked).\n
