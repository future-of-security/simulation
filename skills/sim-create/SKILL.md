---
name: sim-create
description: Create the story and structure for crisis management simulations. Generates simulation overview, phase narratives, team roles, and action catalogs. Use sim-inject to generate the injects.
---

# Simulation Create

Create the story and structure for crisis management simulations (overview, phases, roles, actions).

**Note:** This skill creates the scenario framework. Use **sim-inject** to generate the injects.

## Simulation Parameters

- **Students**: ~60 per session
- **Teams**: 15 teams (4 students each), named after national parks
- **Duration**: 60 minutes max per phase
- **Phases**: 7 phases aligned to course topics

## Team Names (National Parks)

Teams are identified by their national park name (no numeric IDs):

| Team | Team | Team |
|------|------|------|
| Acadia | Glacier | Sequoia |
| Arches | Jasper | Shenandoah |
| Banff | Olympic | Yellowstone |
| Bryce | Redwood | Yoho |
| Denali | Zion | Yosemite |

## Simulation Phases

| Phase | Topic |
|-------|-------|
| 1 | Cybersecurity & AI Threats |
| 2 | Data, Privacy, Surveillance, & Misinformation |
| 3 | Economic Security |
| 4 | Political & Societal Security |
| 5 | Health & Biosecurity |
| 6 | Environmental Security |
| 7 | Disaster Management |

## Templates

- `assets/templates/SIM_OVERVIEW.md` - Simulation overview
- `assets/templates/SIM_ROLES.csv` - Team roles table
- `assets/templates/SIM_PHASE.md` - Phase template
- `assets/templates/SIM_ACTIONS.csv` - Action catalog format

(Inject template is in sim-inject skill)

## Workflow

### Step 1: Gather Requirements
- Scenario theme and geographic scope
- Key infrastructure and institutions
- Vulnerable populations

### Step 2: Define Setting
- Location and population
- Key communities
- Key infrastructure (no IDs needed, just descriptions)

### Step 3: Define 15 Roles
Define 15 roles that will rotate among teams each phase:
- Role name (e.g., "Governor's Liaison", "Hospital System")
- Sector (Government, Healthcare, Utilities, etc.)
- Typical starting budget for this role
- Typical starting trust score (1-10)

### Step 4: Create Simulation Overview
**`sim_overview.md`** (from SIM_OVERVIEW.md):
- Summary of the crisis scenario
- Setting details (no infrastructure IDs)
- Timeline across 7 phases
- Phase summaries (brief narrative for each)
- List of 15 available roles (teams assigned randomly each phase)
- Global constraints (actions, information, authority, trust)
- Cascading mechanics (how early decisions affect later phases)

### Step 5: Generate Phase Overviews and Roles
For each phase, create a `phase_#/` subfolder under the simulation directory and generate:

**`phase_#/overview.md`:**
- Phase title and topic
- Narrative situation
- Key challenges
- Role-specific objectives (2-3 per role)
- Connections to previous/next phases

**`phase_#/roles_init.csv`** and **`phase_#/roles.csv`:**
- Randomly assign 15 teams to 15 roles for this phase
- Each team gets a different role than previous phase (when possible)
- Columns: team, role, sector, budget, trust, score

**`phase_#/responses/`** — empty directory for team response reports (used by sim-canvas)

**Random Role Assignment:**
- Shuffle team-role assignments each phase
- Budget/trust may vary based on role and phase context
- Score starts at 0 for each phase
- sim-inject updates `phase_#/roles.csv` based on team actions (budget, trust, score)

**CRITICAL: All Roles Active in Every Phase**

Every role has meaningful work regardless of phase theme:

| Phase Theme | How Non-Primary Roles Participate |
|-------------|----------------------------------|
| Cybersecurity | Non-tech roles handle consequences: patient impacts, public fear, logistics |
| Misinformation | All roles face disinfo about their sector; stakeholder pressure |
| Economic | All roles face budget impacts; supply chain affects everyone |
| Political | All roles have stakeholders with opinions; protests affect operations |
| Health | Non-health roles support logistics, communication, resource allocation |
| Environmental | All facilities affected; public health is cross-sector |
| Disaster Mgmt | Recovery involves all sectors; funding decisions are cross-cutting |

### Step 6: Create Per-Phase Action Catalogs
For each phase, create `phase_#/actions.csv` with actions tailored to that phase's theme:

`action_id, action_name, available_to, cost, delay_mins, requires_approval, trust_impact, description`

Each phase should include:
- **Universal actions** that apply across all phases (communication, intelligence sharing, EOC activation, volunteer networks)
- **Phase-specific actions** relevant to the current theme (e.g., network isolation for cyber, rumor control for misinformation, supply chain rerouting for economic)

Action IDs restart at A1 for each phase (they are phase-local).

| Phase | Example Phase-Specific Actions |
|-------|-------------------------------|
| 1 (Cyber) | Network isolation, forensic investigation, grid hardening, backup activation |
| 2 (Misinfo) | Deepfake detection, trusted messenger campaigns, platform coordination |
| 3 (Economic) | Supply chain rerouting, emergency unemployment, price controls |
| 4 (Political) | Mediation services, emergency governance, protest management |
| 5 (Health) | Triage protocols, medication airlifts, mental health crisis teams |
| 6 (Environmental) | Hazmat containment, water testing, environmental monitoring |
| 7 (Disaster) | Rebuilding contracts, relocation assistance, resilience investment |

### Step 7: Generate Injects (Use sim-inject)

After creating the story framework, use **sim-inject** to generate initial injects:

```
Use sim-inject to create initial injects for phase X based on:
- sim_overview.md
- phase_#/roles.csv
- phase_#/overview.md
- phase_#/actions.csv
```

## Output Files

```
simulations/<sim>/
├── sim_overview.md              # Simulation overview (one per sim)
├── phase_1/
│   ├── overview.md              # Phase narrative
│   ├── roles_init.csv           # Initial role assignments (backup)
│   ├── roles.csv                # Working roles (updated by sim-inject)
│   ├── actions.csv              # Action catalog for this phase
│   ├── injects_init.csv         # Initial injects (created by sim-inject)
│   ├── injects.csv              # Working injects (created by sim-inject)
│   └── responses/               # Team response reports (from sim-canvas)
├── phase_2/
│   └── ...
└── ...
```

| File | Description |
|------|-------------|
| `sim_overview.md` | Simulation overview (setting, timeline, constraints) — in simulation root |
| `phase_#/overview.md` | Phase narratives (1-7) |
| `phase_#/roles_init.csv` | Initial role assignments (backup) |
| `phase_#/roles.csv` | Working roles file (budget/trust updated by sim-inject) |
| `phase_#/actions.csv` | Action catalog for this phase (tailored to phase theme) |
| `phase_#/injects_init.csv` | Initial injects backup - created by sim-inject |
| `phase_#/injects.csv` | Working injects file - created by sim-inject |

## Constraint Types

### Actions
- **Action delays**: Some actions take time to be effective (e.g., 5 minutes)
- **Approval chains**: Some actions require sign-off from other roles
- **Budget limits actions**: Teams naturally limited by their budget

### Information
- **Delayed information**: Some action outcomes revealed after delay period

### Authority
- **Approval requirements**: High-impact actions need approval

### Trust & Reputation
- **Trust score (1-10)**: Affects costs and effectiveness
- **Low trust (1-4)**: Actions cost more, may fail
- **High trust (8-10)**: Actions cost less, bonus actions

### Score

- **Score**: Points earned by resolving injects
- Starts at 0 for each phase
- Earned from `points_resolve` column when inject state changes to `resolved`
- Partial points (50%) for `partially_resolved` injects
- sim-inject updates score in `roles.csv`

## Action CSV Columns

`action_id, action_name, available_to, cost, delay_mins, requires_approval, trust_impact, description`

| Column | Description |
|--------|-------------|
| action_id | Unique identifier (A1, A2, etc.) |
| action_name | Short name |
| available_to | Role names who can use this (Governor's Liaison;Hospital System or ALL) |
| cost | Dollar cost |
| delay_mins | Minutes until effect (0 = immediate, 5 = takes 5 minutes) |
| requires_approval | Role name required to approve, or NONE |
| trust_impact | Change to trust score (-2 to +2) |
| description | What the action does |
