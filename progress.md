# Progress Log

## 2026-02-05: Phase 1 Update Cycle (sim_time 0:30)

### Canvas Fetch
- Fetched 12 submissions (5 unsubmitted/skipped) via `uv run --with requests --with html2text`
- Teams that submitted: Acadia, Banff (2 attempts), Denali, Glacier, Jasper, Redwood, Sequoia, Shenandoah, Yellowstone, Yoho, Zion
- Teams with NO submission: Arches (CISA), Bryce (AEP), Olympic (Shentel), Yosemite (United Way)

### Inject State Changes (18 → 25 injects)
| Inject | Old State | New State | Reason |
|--------|-----------|-----------|--------|
| 1 (Data Exfil) | open | partially_resolved | Denali isolated network (A1), stopped bleeding but 47GB already gone |
| 2 (Telecom) | open | partially_resolved | VT isolation cut source, but malware already spread; Shentel hasn't acted |
| 3 (Hospital Records) | open | partially_resolved | Glacier: backups (A3), transfers (A9), prescriptions (A15) - patients safe, systems still down |
| 4 (Power Grid) | open | partially_resolved | Jasper: generators (A16), coordinated SCADA isolation - AEP hasn't responded |
| 7 (County Systems) | open | partially_resolved | Yellowstone: rumor control (A31), funded Shentel routing ($300K transfer) |
| 8 (Env Monitoring) | open | partially_resolved | Yoho+Redwood: field checks (A21, A32), manual monitoring partial coverage |
| 9 (Media Rumors) | partially_resolved | **resolved** | Acadia+Sequoia: joint A4+A31 = comprehensive public communication |
| 10 (Hotlines) | open | **resolved** | Zion: A10+A23+A36+A13 = 4 actions deploying full community response |
| 11 (Pentagon) | open | partially_resolved | Denali: notified partners (A24), but full breach report still pending |
| 18 (Coal Ash) | open | partially_resolved | Yoho: manual inspection shows normal levels, but no continuous monitoring |

### New Injects (0:30)
| ID | Incident | Severity | Why |
|----|----------|----------|-----|
| 19 | Hospital Generators Half Fuel | 5 | Consequence of power outage + time |
| 20 | VT Campus Blackout | 3 | Consequence of Denali's network isolation (A1) |
| 21 | Patient Records on Dark Web | 5 | Escalation of unaddressed ransomware (Inject 12) |
| 22 | CISA Team Denied Access | 3 | Consequence of isolation + no coordination |
| 23 | Elderly Patient Dies | 5 | Escalation of unaddressed Inject 17 |
| 24 | Water Treatment Fluctuating | 5 | Escalation of unaddressed Inject 15 |
| 25 | Suspicious Vehicle at Substation | 3 | New development - physical recon |

### Score Updates
| Team | Old Score | New Score | Points From |
|------|-----------|-----------|-------------|
| Denali | 0 | 134 | Inject 1 (75 strong partial), 2 (15 indirect), 11 (44 moderate partial) |
| Zion | 0 | 75 | Inject 10 (75 resolved) |
| Glacier | 0 | 75 | Inject 3 (75) |
| Jasper | 0 | 75 | Inject 4 (75) |
| Yoho | 0 | 80 | Inject 8 (30 collab), 18 (50) |
| Acadia | 23 | 45 | Inject 9 resolved remainder (22) |
| Sequoia | 23 | 45 | Inject 9 resolved remainder (22) |
| Yellowstone | 0 | 38 | Inject 7 (38) |
| Redwood | 0 | 30 | Inject 8 (30 collab) |

### Budget Changes
- Acadia: $19.9M → $19.7M (A4 $100K + $100K transfer to Sequoia)
- Denali: $8M → $7.5M (A1 $500K)
- Glacier: $50M → $49.15M (A3+A9+A15 = $850K)
- Jasper: $10M → $9.6M (A16 $300K + $100K transfer to Bryce)
- Bryce: $40M → $40.1M (received $100K from Jasper)
- Olympic: $15M → $15.3M (received $300K from Yellowstone)
- Sequoia: $2.925M → $2.85M (A31+A4 = $175K, +$100K transfer from Acadia)
- Shenandoah: $14.8M → $14.6M (A17 $200K)
- Yellowstone: $12M → $11.625M (A31 $75K + $300K transfer to Olympic)
- Yoho: $8M → $7.75M (A21+A32 = $250K)
- Zion: $2M → $1.75M (A10+A23+A36 = $250K)

### Trust Changes
- Arches: 6→5 (ignored critical injects)
- Bryce: 5→4 (ignored critical grid attack)
- Olympic: 5→4 (ignored critical telecom issues)
- Banff: 7→8 (proactive social media communication)
- Glacier: 7→9 (comprehensive patient care response)
- Jasper: 7→8 (creative SCADA isolation coordination)
- Redwood: 6→7 (collaboration with DEQ)
- Sequoia: 7→8 (effective rumor control)
- Shenandoah: 6→7 (collaboration with Sheriff)
- Yellowstone: 6→7 (proactive rumor control)
- Yoho: 5→6 (collaboration + field deployment)
- Zion: 9→12 (4 trust-building actions deployed)
- Acadia: 7→8 (collaboration on resolved inject)

### Custom Action Evaluations
| Team | Action | Result |
|------|--------|--------|
| Banff | Sheriff social media about 911 delays | **Approved** - feasible, $0, good community reach |
| Jasper | Isolate SCADA systems ($100K) | **Approved with modification** - Jasper coordinates, AEP must execute |
| Shenandoah | Sheriff traffic control ($200K) | **Approved** - incorporated into A17, no extra cost |
| Yellowstone | A26 via Shentel ($300K transfer) | **Approved with modification** - catalog action funded by Yellowstone, Shentel executes |
| Zion | Pastoral messaging ($0) | **Approved** - perfect use of faith network resources |

### Current Status (sim_time 0:30)
- **Open injects:** 14 (6 original + 1 from 0:15 + 7 new at 0:30)
- **Partially resolved:** 9
- **Resolved:** 2
- **Total:** 25

### Web Dashboard
- Updated `docs/data/phase_1_injects.csv` and `docs/data/phase_1_roles.csv`

---

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
