\n## 2026-02-04\n- Confirmed skill-creator scripts available at C:/Users/hlz/.codex/skills/.system/skill-creator/scripts (init_skill.py, generate_openai_yaml.py, quick_validate.py).\n
\n## 2026-02-04\n- sim-respond SKILL.md provides a concise, workflow-based structure to mirror for sim-canvas.\n- sim-canvas SKILL.md is still template TODOs and needs full rewrite.\n
\n## 2026-02-04\n- Canvas submissions endpoint supports include[]=group to add group_id/group_name and grouped=true to group by student groups.\n
\n## 2026-02-04\n- Canvas submissions API supports include[]=group (adds group_id/group_name) and grouped=true to group submissions by student groups. Sources: canvas.instructure.com and other Canvas API mirrors.\n

## 2026-02-19
- Added a two-agent runtime design under `scripts/`: `agent_fetch.sh` (Canvas polling + queue), `agent_evaluate.sh` (locked evaluator worker), and `agent_run.sh` (supervisor).
- Chosen control model: poll every 60s, single evaluator with queue + `flock`, and Codex CLI (`codex exec`) for update-cycle execution.
- Runtime state is per phase in `simulations/<sim>/phase_<N>/agent_state/` with `pending.queue`, `evaluator.lock`, and fetch/eval logs.
