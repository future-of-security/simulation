---
name: sim-inject
description: Generate and manage injects for crisis simulations. Use to (1) create initial injects for a phase, or (2) process team response reports and generate follow-up injects.
---

# Simulation Inject

Generate and manage injects (incidents/events) for crisis simulations.

## Two Modes

### Mode 1: Initial Inject Creation
Create the starting set of injects for a phase. Called after sim-create generates the story.

### Mode 2: Response Processing
Process team response reports, update inject states, and generate follow-up injects.

---

## Mode 1: Initial Inject Creation

### Inputs
- `sim_overview.md` - Simulation context and constraints (in simulation root)
- `phase_#/roles.csv` - Team roles for this phase
- `phase_#/overview.md` - Phase narrative and challenges

### Workflow

1. **Read the scenario** - Understand the setting, teams, and phase theme
2. **Identify key incidents** - What problems arise from the phase narrative?
3. **Assign to teams** - Which teams should see each inject?
4. **All injects at time 0:00** - Initial injects all happen at simulation start
5. **Balance distribution** - Ensure every team is involved (via visible_to)
6. **Output CSV** - Create `phase_#/injects_init.csv` and `phase_#/injects.csv`

### Target: 5 initial injects + escalation injects per phase
- **5 initial injects** at sim_time `0:00` (players see them at start)
- Each initial inject requires collaboration of exactly **3 teams** (5 × 3 = all 15 teams)
- Every team appears in exactly one initial inject — no team left out, no team overloaded
- All initial injects have the **same `points_resolve`** value (equal scoring opportunity)
- **Escalation injects** start with state `hidden` (invisible on dashboard) and fire at later sim_times when initial injects are not addressed by their deadline — change state from `hidden` to `open` to trigger them
- Escalation inject scores vary by severity (see Scoring section)

---

## Mode 2: Response Processing (Update Cycle)

Called by facilitator during simulation. This is an **update operation**, not just appending.

### Inputs
- `sim_overview.md` - Simulation context (in simulation root)
- `phase_#/roles.csv` - Current team roles, budgets, trust
- `phase_#/overview.md` - Current phase situation
- `phase_#/injects.csv` - Current inject list
- `phase_#/actions.csv` - Action catalog for this phase (to validate team actions and costs)
- `phase_#/responses/*.md` - Team response reports (fetched from Canvas via sim-canvas)

### Time Tracking

Use the `submitted_at` YAML frontmatter timestamp from each response report to determine when that team's actions were taken. Convert UTC to local time, then subtract the phase start time to get sim_time.

**Per-report timing:**
- Each response `.md` file has a `submitted_at:` field (e.g., `2026-02-12T17:51:26Z`)
- Convert to local time and calculate offset from phase start
- Use this as the sim_time for that team's actions (e.g., if phase started at 12:38 and report submitted at 12:51, actions happened at sim_time 0:13)
- This matters for escalation triggers — a team that submits at 0:09 beats a 0:10 deadline

**Update cycle timing:**
- The update cycle's sim_time is the latest `submitted_at` among all reports in the batch
- New consequence/escalation injects use this cycle sim_time
- Example: if reports came in at 0:13, 0:16, and 0:21, the cycle sim_time is 0:21

### Key Principle: UPDATE, Don't Just Append

Each update cycle should:
1. **Update existing inject states** - Mark resolved/partially_resolved
2. **Resolve indirect dependencies** - If inject A caused inject B, resolving A may resolve B
3. **Check logical consistency** - No contradictions, proper cause-effect ordering
4. **Then add new injects** - Consequences, escalations, new developments

### Critical Rule: NEVER DELETE Injects

**Injects are NEVER deleted from the CSV.** When an inject is resolved:
- Change the `state` column to `resolved` or `partially_resolved`
- Keep the inject row in the file
- The web dashboard filters out resolved injects from the active view
- Historical record is preserved for scoring and debrief

| Situation | What to Do |
|-----------|------------|
| Inject fully resolved | Set `state` to `resolved` |
| Inject partially addressed | Set `state` to `partially_resolved` |
| Inject made worse | Keep `state` as `open`, add escalation inject |
| Inject superseded by new event | Set `state` to `resolved`, add new inject |
| Escalation trigger fires | Change `state` from `hidden` to `open` |
| Escalation no longer relevant | Keep `state` as `hidden` (never shown) |

### Workflow

#### Step 1: Read Response Reports (if any)
Extract from each report:
- **`submitted_at` timestamp** — use this (not the fetch time) as the sim_time for the team's actions
- Injects addressed (by title or ID)
- Catalog actions taken (with Action IDs) — validate against `actions.csv` for correct costs and `available_to` eligibility
- **Proposed custom actions** (with cost estimates, expected effects)
- Collaborations (which teams worked together)
- Budget transfers (from/to/amount/purpose)
- Resources spent (calculate: starting budget - action costs - transfers out + transfers in)
- **Disputes & feedback** (optional section) — teams may flag evaluations they find unreasonable

**Also note which teams did NOT submit** — their injects remain unaddressed and may escalate.

**Processing disputes:** If a team's report includes a "Disputes & Feedback" section, review each item. If the dispute is valid (e.g., a miscalculation, misattributed action, or unfair custom action ruling), correct the affected inject/role values in this cycle's update. Log the correction in `progress.md` with a note like "Dispute from [Team]: [issue] — corrected." If the dispute is not valid, note why in `progress.md` but do not change values.

**Skip already-processed submissions:** Before reading response files, check `progress.md` for submissions processed in prior update cycles. Only process response files that are new since the last cycle. The `--only-new` flag on sim-canvas fetches only new attempts, but if old files still exist in the responses folder, match filenames against the teams+attempts already logged in `progress.md` and skip them.

#### Step 2: Evaluate Custom Actions

Teams may propose actions not in the catalog. Evaluate each proposed action:

| Factor | Questions to Consider |
|--------|----------------------|
| **Feasibility** | Can this team realistically do this? Do they have authority/resources? |
| **Cost Estimate** | Is their estimate reasonable? Adjust if too low/high. |
| **Time Needed** | Is their time estimate realistic? |
| **Effectiveness** | Will this actually help solve the problem? |
| **Side Effects** | What unintended consequences might occur? |

**Evaluation Outcomes:**
| Result | Description |
|--------|-------------|
| **Approved** | Action proceeds as proposed |
| **Approved with modifications** | Action proceeds but cost/time/effect adjusted |
| **Partially effective** | Action helps but not as much as team hoped |
| **Denied** | Action not feasible (explain why in inject) |
| **Backfires** | Action makes things worse |

**Example Custom Action Evaluation:**
- *Proposed:* "Requisition school buses for patient transport" ($50K, 2 hours)
- *Evaluation:* Feasible if team coordinates with Yellowstone (county). Cost reasonable. But buses lack medical equipment - can only transport stable patients.
- *Result:* Approved with modification - works for non-critical patients only

#### Step 3: Evaluate Catalog Actions & Inject Resolution

| Evaluation | Criteria | New State |
|------------|----------|-----------|
| **Resolved** | Actions solve the problem | `resolved` |
| **Partially Resolved** | Actions help but incomplete | `partially_resolved` |
| **Failed** | Actions ineffective | `open` |
| **Made Worse** | Actions backfired | `open` (escalate) |

For unaddressed injects:
- Time expired (sim_time + time_limit passed) → escalate
- Time remaining → stays `open`

**Teams That Did Not Submit:**

Some teams may not submit a response in a given cycle. Handle as follows:
- Their injects remain `open` (no state change without action)
- Apply -1 trust if they had severity 4-5 injects visible to them
- If another team transferred budget to a non-responding team, the funded action is "pending" — do not credit the action until the receiving team confirms
- Consider generating escalation injects that pressure idle teams to act

#### Step 4: Update Inject States & Check Consistency

**Direct Resolution:**
Update `state` column in `phase_#/injects.csv` for addressed injects.

**Indirect Resolution:**
Some injects are consequences of others. When root cause is resolved, check if dependent injects should also resolve:

| Root Cause Resolved | Check These Dependent Injects |
|---------------------|-------------------------------|
| Network attack contained | Downstream system failures may recover |
| Hospital systems restored | Patient care injects may resolve |
| Grid stabilized | Power-dependent injects may resolve |
| Coordination established | Authority conflict injects may resolve |

**Consistency Checks:**

| Check | What to Verify | Fix If Wrong |
|-------|----------------|--------------|
| **No contradictions** | Resolved inject shouldn't have open consequences that require it | Resolve dependent injects or reopen root |
| **Cause before effect** | New injects referencing events must follow those events | Adjust sim_time or reword |
| **Team involvement** | All 15 teams should have active work | Add injects for idle teams |
| **Severity progression** | Unaddressed injects should escalate over time | Increase severity or add escalation inject |
| **State consistency** | Resolved injects stay resolved unless reopened by new event | Don't silently unresolve |

#### Step 5: Update Team Roles
Update `phase_#/roles.csv` based on team actions:

| Change Type | How to Update |
|-------------|---------------|
| **Budget spent (solo)** | Subtract full action cost from team's budget |
| **Budget spent (collaborative)** | Split action cost equally among collaborating teams (see below) |
| **Budget transferred out** | Subtract transfer amount from sending team |
| **Budget transferred in** | Add transfer amount to receiving team |
| **Trust gained** | Add trust_impact from successful actions (+1 to +2) |
| **Trust lost** | Subtract trust_impact from failed actions or poor decisions (-1 to -2) |
| **Custom action cost** | Deduct approved custom action costs |
| **Score earned** | Add `points_resolve` from resolved injects (see below) |

**Collaborative Action Cost Splitting:**

When multiple teams collaborate on the **same catalog action** targeting the same inject, they split the cost equally:

| Collaboration | Cost per Team |
|---------------|---------------|
| 2 teams | 50% each |
| 3 teams | 33% each |
| 4+ teams | Equal split |

- Both/all teams must document the collaboration in their response reports
- If teams take the same action **independently** on different injects (or without coordinating), each pays the full cost
- The split applies to catalog actions only — custom action costs are evaluated per proposal

**Example:** Action A1 (Network Isolation, $500K) — if VT and Carilion collaborate to isolate their shared network segment, each pays $250K. If they each independently isolate their own networks, each pays $500K.

**Budget Transfers Between Teams:**

Teams may transfer budget to other teams to fund actions they cannot take themselves (e.g., a county government funding a telecom company's emergency routing). When processing transfers:

1. Verify the transfer is documented in the sending team's report
2. Subtract from sender's budget, add to receiver's budget
3. The receiving team must still take the action — the transfer alone doesn't resolve anything
4. If the receiving team did not submit a response, the action is "pending execution" and the inject remains open

**Score Calculation:**

| Resolution | Points Awarded |
|------------|----------------|
| **Resolved** | Full `points_resolve` value |
| **Partially Resolved** | 25-50% of `points_resolve` value (see contribution level) |
| **Failed/Open** | 0 points |

**Contribution Level for Partial Resolution:**

Not all partial resolutions are equal. Assess how much the team's actions actually accomplished:

| Contribution | % of points_resolve | Example |
|-------------|---------------------|---------|
| **Strong partial** (50%) | Directly addressed the inject, solved most of the problem | Hospital activated backups, transferred patients — care maintained but systems still down |
| **Moderate partial** (25-35%) | Helped but didn't address root cause, or only took preliminary step | Sent a notification when a full report was demanded; indirect action that helped at the margins |
| **Indirect/secondary** (10-20%) | Team's action on a *different* inject had a side effect that helped this one | Network isolation at VT happened to cut attack source for the telecom backbone, but backbone team needs to do the real containment |

**Collaboration Split:**

When multiple teams collaborate to resolve an inject, split points:

- 2 teams: 60% each (rewards collaboration)
- 3+ teams: 40% each

**When collaborators didn't submit:** If Team A claims collaboration with Team B but Team B didn't submit a response, only credit Team A for their own contribution. Do not give Team A the full solo credit for what would normally be a joint effort — their contribution may be limited without the collaborator's actions.

**Invited team credit:** When Team A's report says they collaborated with Team B on a specific inject (inviting B to help), and Team B's own report confirms the collaboration, Team B receives credit for that inject — even if Team B's report focuses on a different inject. Cross-reference both teams' collaboration sections. The collaboration must be specific (naming the inject or describing the work) and plausible for the invited team's role. If only one side claims collaboration (unconfirmed), do not credit the other team.

**Upgrading partial → resolved:** When an inject upgrades from `partially_resolved` to `resolved` in a later cycle, award the difference between total points and already-awarded points.

**Trust Modifiers** (each point = 10% on the dashboard):
- Successful collaboration: +10% trust
- Failed public communication: -10% to -20% trust
- Ignored critical inject (severity 4-5): -10% trust
- Creative solution approved: +10% trust
- Action backfired: -10% trust
- **Team did not submit response:** -10% trust (per update cycle with no submission, applied to severity 4+ injects visible to them)

**Trust Change Cap:** Limit trust changes to +30% or -30% per update cycle to prevent runaway scores. Multiple small trust-building actions in a single update cycle should be consolidated.

**Storage vs Display:** Trust is stored as an integer in `roles.csv` (e.g., 11) and displayed as a percentage on the dashboard (110%). Each +1 in the CSV = +10% displayed. The `trust_impact` values in `actions.csv` use the integer scale (e.g., +1 means +10%).

#### Step 6: Generate Follow-up Injects

**A. Consequence Injects** (from team actions)
| Action Type | Possible Consequence |
|-------------|---------------------|
| Large expenditure | Budget strain elsewhere |
| System isolation | Side effects, disruption |
| Public statement | Media/public reaction |
| Federal request | Strings attached |
| Successful collaboration | New opportunity |
| **Custom action approved** | New capability or resource available |
| **Custom action denied/failed** | Team frustration, wasted resources |
| **Custom action backfired** | New problem created |

**B. Escalation Injects** (from inaction)
- Severity increases
- Problem spreads
- Secondary effects
- Public notices

**C. New Developments**
- Maintain ~15-20 open injects
- Add twists aligned with phase
- Reward good teamwork and creative solutions
- Logical consequences for poor coordination

---

## Inject CSV Format

`id, phase, sim_time, incident, description, location, severity, visible_to, time_limit, state, points_resolve`

| Column | Description |
|--------|-------------|
| id | Unique number |
| phase | Phase number (1-6) |
| sim_time | HH:MM format, chronological |
| incident | Short title |
| description | Problem description (not solution) |
| location | Place name |
| severity | 1-5 (5 = critical) |
| visible_to | Role names (semicolon-separated) or ALL |
| time_limit | Minutes to respond (e.g., 10 = 10 minutes, 30 = 30 min) |
| state | open / hidden / resolved / partially_resolved |
| points_resolve | Points for resolution |

### CSV Formatting
- **Quote fields with commas**: `"text, with comma"`
- **Escape quotes**: `"He said ""hello"""`

---

## Inject Design Rules

### Incidents, Not States
Injects must be **specific events that just happened**, not descriptions of ongoing conditions.

| Type | Example | Problem |
|------|---------|---------|
| ❌ State | "Agencies unable to coordinate" | Describes condition, not actionable |
| ❌ State | "No common operating picture" | What should teams DO about this? |
| ✓ Incident | "Governor demands single point of contact in 30 min" | Forces teams to act |
| ✓ Incident | "Sheriff and EMA director clash over authority" | Specific conflict to resolve |

**Test:** Can teams take a concrete action in response? If the inject just describes "things are bad," rewrite it as a specific event that forces a decision.

### Content: Problems, Not Solutions
- Present problems requiring decisions
- Never tell teams what to do
- Create dilemmas with tradeoffs
- Require cross-team collaboration

**Good:** "Ambulances en route told hospital may divert. Nearest alternative 60+ miles."
**Bad:** "EMA recommends activating EOC" (tells them what to do)

### Chronological Order
- Order by sim_time
- Causes before effects
- Simultaneous events OK

### Team Distribution
- **Initial injects:** Each team appears in exactly 1 of 5 initial injects (3 teams per inject)
- **Escalation injects:** Visible to relevant teams (may overlap with initial assignments or involve new teams)
- **Follow-up injects:** Generated during simulation, distributed to keep all teams engaged
- No team should have 0 active injects at any point during the phase

### Active Participation Across All Phases
Every team must have meaningful work in EVERY phase, regardless of phase theme.

| Phase Theme | How to Involve All Teams |
|-------------|-------------------------|
| Cybersecurity | Non-tech teams deal with consequences (patients, public fear, logistics) |
| Misinformation | Tech teams see disinfo about their systems; all teams have public-facing issues |
| Economic | Healthcare/emergency teams face budget impacts; supply chain affects everyone |
| Political | All teams have stakeholders with political opinions; protests affect operations |
| Health | Non-health teams support logistics, communication, resource allocation |
| Environmental | All teams have facilities/operations affected; public health crosses sectors |
| Disaster Mgmt | Recovery decisions involve all sectors; funding/rebuilding is cross-cutting |

**Engagement Strategies:**
- Create cross-sector dependencies (healthcare needs transport, tech needs security)
- Give "low-activity" teams stakeholder pressure (their constituents demand action)
- Use collaboration requirements (solving inject X requires teams A, B, and C)
- Rotate spotlight - teams less active early get critical injects later in phase

### Scoring
- `points_resolve` only (no penalties)
- **Initial injects (equal opportunity):** All 5 initial injects have the same `points_resolve` value so every team starts with equal scoring potential. Severity indicates urgency/danger for narrative purposes but must not create scoring inequality between teams.
- **Escalation and follow-up injects (severity-based):** Injects added during the simulation have scores based on severity:

| Severity | points_resolve |
|----------|----------------|
| 5 (Critical) | 150 |
| 4 (High) | 125 |
| 3 (Medium) | 100 |
| 2 (Low) | 75 |
| 1 (Info) | 50 |

- Aim to keep cumulative point opportunities balanced across teams throughout the phase.

---

## Output

### Mode 1 Output (Initial Creation)
Create two files in the phase subfolder:
- `phase_#/injects_init.csv` - Backup of initial injects (never modified)
- `phase_#/injects.csv` - Working copy (updated during simulation)

### Mode 2 Output (Response Processing)
Update two files in the phase subfolder:

**`phase_#/injects.csv`:**
- Change `state` column for resolved/partially_resolved injects
- Append `[UPDATE H:MM]` notes to the `description` field explaining **why** the state changed (e.g., which team acted, what actions were taken, what remains unresolved)
- Append new injects at the end of the file with sequential IDs continuing from the highest existing ID

**`phase_#/roles.csv`:**
- Update `budget` column based on spending and transfers
- Update `trust` column based on action outcomes
- Update `score` column based on resolved injects (points_resolve)

**Inject ID Assignment:**
- New injects get sequential IDs continuing from the highest existing ID
- Example: If the current max ID is 18, new injects start at 19, 20, 21, etc.
- IDs are never reused — even if an inject is resolved, its ID remains reserved

**Description Update Convention:**
- When changing an inject's state, append an `[UPDATE H:MM]` block to the description
- Format: `[UPDATE 0:30] Team X took action Y (action_id). Result: description of what happened and what remains.`
- Multiple updates accumulate chronologically in the description
- This provides a built-in audit trail visible on the web dashboard

```text
simulations/[simulation-name]/
├── sim_overview.md
├── phase_1/
│   ├── overview.md
│   ├── actions.csv
│   ├── roles_init.csv             # Initial role assignments (backup)
│   ├── roles.csv                  # Working roles (budget/trust updated)
│   ├── injects_init.csv           # Initial injects (backup)
│   ├── injects.csv                # Working injects (updated in place)
│   └── responses/
│       └── [team reports]
└── ...
```

**Update process:**
1. Read `phase_#/injects.csv` and `phase_#/roles.csv`
2. Update inject states for addressed injects
3. Update team budgets (subtract costs, apply transfers)
4. Update team trust (apply trust_impact from actions)
5. Update team scores (add points_resolve from resolved injects)
6. Append new consequence/escalation injects
7. Write back to both files
8. **Call sim-web (Mode 2: Update)** — copy the updated `phase_#/injects.csv` and `phase_#/roles.csv` to `docs/phase_#/`

---

## Example: Response Processing

**Input:** Team Denali report says they isolated infected servers and notified CISA.

**Evaluation:**
- Inject #1 (Unusual Traffic) → `partially_resolved` (stopped spread, but data already gone)
- Inject #33 (Classified Research Stolen) → `open` (isolation doesn't recover data)

**Update `phase_1/injects.csv`:**
1. Change inject #1 state from `open` to `partially_resolved`
2. Append new consequence injects:

```csv
46,1,13:00,Server Isolation Disrupts Research,"VT researchers locked out of systems. Three grant deadlines in 48 hours.",Blacksburg,3,Virginia Tech Crisis Response,2,open,75
47,1,13:00,CISA Demands Full Access,"Federal team arriving, requesting admin credentials to all university systems.",Blacksburg,3,Virginia Tech Crisis Response;Governor's SW Virginia Liaison;CISA Regional Coordinator,2,open,75
48,1,13:15,Student Records Inaccessible,"Registrar cannot process grades or verify enrollment. Graduation certification at risk.",Blacksburg,4,Virginia Tech Crisis Response;Montgomery County Government,2,open,100
```

---

## Reference Examples

The `examples/` folder contains sample inject files for inspiration (note: different CSV format):

| File | Scenario | Key Features |
|------|----------|--------------|
| `nyc_crisis_injects.csv` | Superstorm Sandy hitting NYC | Multi-day timeline, cascading infrastructure failures |
| `covid_sim_geospatial_injects.csv` | COVID-19 pandemic | Location-based spread, healthcare system stress |
| `covid_sim_media_injects.csv` | COVID-19 misinformation | Media narratives, public trust dynamics |

Use these for inject ideas and realistic crisis scenarios, but convert to the standard CSV format above.
