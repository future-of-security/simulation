# [Simulation Title]

## Summary

[1-2 paragraphs: What is the crisis? Where does it take place? What is at stake?]

## Parameters

- **Students**: ~60
- **Teams**: 15 teams named after national parks (4 students each)
- **Duration**: 60 minutes max per phase

## Setting

**Location:** [City/Region/Country]

**Population:** [X]

**Key Communities:**
- [Community 1] - [description]
- [Community 2] - [description]

**Key Infrastructure:**
- [Infrastructure 1] - [description]
- [Infrastructure 2] - [description]

## Timeline

| Phase | Topic | Title | In-Simulation Time |
|-------|-------|-------|-------------------|
| 1 | Cybersecurity & AI Threats | [Title] | [e.g., Day 1-2] |
| 2 | Data, Privacy, Surveillance, & Misinformation | [Title] | [e.g., Day 3-5] |
| 3 | Economic Security | [Title] | [e.g., Day 6-10] |
| 4 | Political & Societal Security | [Title] | [e.g., Day 11-15] |
| 5 | Health, Environmental, & Biosecurity | [Title] | [e.g., Day 16-25] |
| 6 | Disaster Management | [Title] | [e.g., Day 26-35] |

## Phase Summaries

### Phase 1: [Title]
[Brief narrative]

### Phase 2: [Title]
[Brief narrative]

(Continue for all 6 phases)

## Teams (15 National Parks)

Teams are randomly assigned different roles each phase. See `phase_#/roles.csv` for each phase's role assignments.

**Team Names:** Acadia, Arches, Banff, Bryce, Denali, Glacier, Jasper, Olympic, Redwood, Sequoia, Shenandoah, Yellowstone, Yoho, Yosemite, Zion

**Available Roles:** (15 roles that rotate among teams)
1. [Role 1] - [Sector]
2. [Role 2] - [Sector]
3. [Role 3] - [Sector]
(List all 15 roles)

## Global Constraints

### Actions
- **Budget limits actions:** Teams are limited by their budget—choose wisely
- **Action delays:** Some actions take time to be effective (see sim_actions.csv)

### Information
- **Base intel:** Teams see injects relevant to their role
- **Delayed information:** Some action outcomes revealed after delay period

### Authority

| Action Type | Requires Approval From |
|-------------|------------------------|
| [Action type] | [Role name] |
| [Action type] | [Role name] |

### Trust & Reputation
- **Starting trust:** Each role has a starting trust score (1-10)
- **Trust effects:**
  | Trust Level | Effect |
  |-------------|--------|
  | 8-10 | Actions cost 20% less, community cooperation |
  | 5-7 | Normal effectiveness |
  | 3-4 | Actions cost 25% more, community resistance |
  | 1-2 | Actions may fail (25% chance), protests |

### Scoring

| Metric | Points | Description |
|--------|--------|-------------|
| Inject resolved | +100 | Fully resolved an incident |
| Inject partially resolved | +50 | Mitigated but not fully solved |
| Vulnerable population protected | +25 | Per 100 people assisted |
| Critical service restored | +150 | Per major system brought online |
| Budget remaining | +10 | Per $1M remaining at end |
| Trust maintained/gained | +50 | Per point above starting trust |
| Cross-team coordination bonus | +75 | Per successful joint action |

*Note: No penalty points—teams earn points for successes.*

## Cascading Mechanics

| Phase | Key Decisions | Affects |
|-------|--------------|---------|
| 1 | [Decision area] | [Later phase impact] |
| 2 | [Decision area] | [Later phase impact] |
(Continue for all phases)

## Files

- Simulation overview: `sim_overview.md`
- Phase overviews: `phase_#/overview.md` (1-6)
- Phase roles (initial): `phase_#/roles_init.csv` (1-6)
- Phase roles (working): `phase_#/roles.csv` (1-6)
- Phase actions: `phase_#/actions.csv` (1-6)
- Injects (initial): `phase_#/injects_init.csv` (1-6)
- Injects (working): `phase_#/injects.csv` (1-6)
