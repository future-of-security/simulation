\n## 2026-02-04\n- Confirmed skill-creator scripts available at C:/Users/hlz/.codex/skills/.system/skill-creator/scripts (init_skill.py, generate_openai_yaml.py, quick_validate.py).\n
\n## 2026-02-04\n- sim-respond SKILL.md provides a concise, workflow-based structure to mirror for sim-canvas.\n- sim-canvas SKILL.md is still template TODOs and needs full rewrite.\n
\n## 2026-02-04\n- Canvas submissions endpoint supports include[]=group to add group_id/group_name and grouped=true to group by student groups.\n
\n## 2026-02-04\n- Canvas submissions API supports include[]=group (adds group_id/group_name) and grouped=true to group submissions by student groups. Sources: canvas.instructure.com and other Canvas API mirrors.\n

## 2026-02-19
- Added a two-agent runtime design under `scripts/`: `agent_fetch.sh` (Canvas polling + queue), `agent_evaluate.sh` (locked evaluator worker), and `agent_run.sh` (supervisor).
- Chosen control model: poll every 60s, single evaluator with queue + `flock`, and Codex CLI (`codex exec`) for update-cycle execution.
- Runtime state is per phase in `simulations/<sim>/phase_<N>/agent_state/` with `pending.queue`, `evaluator.lock`, and fetch/eval logs.

## 2026-02-21
- `sim-create` workflow confirmed for phase generation: create `phase_#/overview.md`, `roles_init.csv` + `roles.csv`, `actions.csv`, `injects_init.csv` + `injects.csv`, and `responses/.gitignore` under simulation folder.
- Existing active simulation is `simulations/virginia-cascading-crisis/` with Phase 3 complete and Phase 4 expected next.
- Phase 3 files establish content/format baseline for continuation into Phase 4 Political & Societal Security.
- Phase 4 in `sim_overview.md` is predefined as **"Forgotten Country"** (Day 11-15), focused on rural-vs-state tension, protests, and polarization.
- Phase 4 budget/trust should carry from current `phase_3/roles.csv` values; scores reset to 0 for new phase setup.
- `docs/phase_#/index.html` pattern is static per phase with only `PHASE_NUM` and title changing; data files are loaded from `docs/phase_#/`.
- Dashboard availability is controlled by `docs/js/app.js` `CONFIG.phases`: Phase 4 is currently `available: false`, so adding `docs/phase_4/` alone won’t make it clickable from the dashboard.
- Phase 4 role rotation implemented as a 1-step shift of Phase 3 role assignments to guarantee no team repeats its Phase 3 role while keeping one-to-one role coverage.
- Created `phase_start` for Phase 4 because `scripts/update_cycle.sh`/`.ps1` read it.
