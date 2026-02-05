---
name: sim-close
description: Close a completed simulation phase. Marks the phase as completed on the web dashboard. Phase files already live in their phase_#/ subfolder so no file moves are needed.
---

# Simulation Close

Close a completed simulation phase and mark it on the web dashboard.

## When to Use

- After a phase is fully complete (all update cycles done, debrief finished)
- Before starting the next phase with sim-create / sim-inject

## Inputs

- Phase number to close (e.g., 1)

## Workflow

### Step 1: Call sim-web (Mode 3: Close)

Invoke **sim-web** to mark the phase as completed on the dashboard:
- sim-web changes `available: true` to `completed: true` in `docs/js/app.js`

Phase data files in `docs/phase_#/` are left in place — they are isolated per phase and do no harm. The index page shows the phase card as "Completed" (green).

### Step 2: Clean Up Responses

Remove `responses/.canvas_fetch_index.json` from the phase folder (resets fetch tracking for the next phase):

```
simulations/<sim>/phase_#/responses/.canvas_fetch_index.json
```

### Step 3: Verify

- Confirm web dashboard shows the phase as "Completed"
- Confirm the responses index file is cleaned

That's it. Since all phase files are already organized in `phase_#/` subfolders from creation, no file moves are needed.

---

## Role Rotation Note

Roles rotate each phase. When a phase is closed:

- The `phase_#/roles.csv` has final scores, budgets, and trust
- The next phase gets a **fresh** `phase_(#+1)/roles.csv` from sim-create with new role assignments
- Scores reset to 0 for the new phase
- Trust and budget may carry over or reset depending on simulation design

---

## Output

After closing phase N, the structure is unchanged (files already in place):

```
simulations/<sim>/
├── sim_overview.md
├── phase_N/
│   ├── overview.md
│   ├── roles.csv                (final scores, budgets, trust)
│   ├── roles_init.csv
│   ├── injects.csv              (all injects with final states)
│   ├── injects_init.csv
│   ├── actions.csv
│   └── responses/
│       └── *_phaseN_*.md
└── phase_N+1/                   (ready for next phase)
```

The web dashboard now shows phase N as "Completed" (green card).
