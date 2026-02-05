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
- `sim_overview.md` - Simulation context and constraints
- `phase_#_roles.csv` - Team roles for this phase
- `phase_#_overview.md` - Phase narrative and challenges

### Workflow

1. **Read the scenario** - Understand the setting, teams, and phase theme
2. **Identify key incidents** - What problems arise from the phase narrative?
3. **Assign to teams** - Which teams should see each inject?
4. **All injects at time 0:00** - Initial injects all happen at simulation start
5. **Balance distribution** - Ensure every team is involved (via visible_to)
6. **Output CSV** - Create `phase_#_injects_init.csv` and `phase_#_injects.csv`

### Target: 10 initial injects per phase
- All at sim_time `0:00` (players see them at start)
- All 15 teams must be involved (use multiple teams in visible_to)
- Mix of severities (1-5)
- Some require collaboration

---

## Mode 2: Response Processing (Update Cycle)

Called by facilitator every 5 minutes during simulation. This is an **update operation**, not just appending.

### Inputs
- `sim_overview.md` - Simulation context
- `phase_#_roles.csv` - Current team roles, budgets, trust
- `phase_#_overview.md` - Current phase situation
- `phase_#_injects.csv` - Current inject list
- `responses/*.md` - Team response reports (if any)

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

### Workflow

#### Step 1: Read Response Reports (if any)
Extract from each report:
- Injects addressed (by ID)
- Catalog actions taken (with Action IDs)
- **Proposed custom actions** (with cost estimates, expected effects)
- Collaborations
- Resources spent

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

#### Step 4: Update Inject States & Check Consistency

**Direct Resolution:**
Update `state` column in `phase_#_injects.csv` for addressed injects.

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
Update `phase_#_roles.csv` based on team actions:

| Change Type | How to Update |
|-------------|---------------|
| **Budget spent** | Subtract action costs and transfers from team's budget |
| **Budget received** | Add transfers received to team's budget |
| **Trust gained** | Add trust_impact from successful actions (+1 to +2) |
| **Trust lost** | Subtract trust_impact from failed actions or poor decisions (-1 to -2) |
| **Custom action cost** | Deduct approved custom action costs |
| **Score earned** | Add `points_resolve` from resolved injects (see below) |

**Score Calculation:**

| Resolution | Points Awarded |
|------------|----------------|
| **Resolved** | Full `points_resolve` value |
| **Partially Resolved** | 50% of `points_resolve` value |
| **Failed/Open** | 0 points |

When multiple teams collaborate to resolve an inject, split points:

- 2 teams: 60% each (rewards collaboration)
- 3+ teams: 40% each

**Trust Modifiers:**
- Successful collaboration: +1 trust
- Failed public communication: -1 to -2 trust
- Ignored critical inject: -1 trust
- Creative solution approved: +1 trust
- Action backfired: -1 trust

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
| phase | Phase number (1-7) |
| sim_time | HH:MM format, chronological |
| incident | Short title |
| description | Problem description (not solution) |
| location | Place name |
| severity | 1-5 (5 = critical) |
| visible_to | Role names (semicolon-separated) or ALL |
| time_limit | Minutes to respond (e.g., 10 = 10 minutes, 30 = 30 min) |
| state | open / resolved / partially_resolved |
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
- Every team has 3-5 injects per phase
- Work spread across timeline
- No team has 0 injects

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
- Higher points for harder injects

---

## Output

### Mode 1 Output (Initial Creation)
Create two files:
- `phase_#_injects_init.csv` - Backup of initial injects (never modified)
- `phase_#_injects.csv` - Working copy (updated during simulation)

### Mode 2 Output (Response Processing)
Update two files:

**`phase_#_injects.csv`:**
- Change `state` column for resolved/partially_resolved injects
- Append new injects at the end of the file

**`phase_#_roles.csv`:**
- Update `budget` column based on spending and transfers
- Update `trust` column based on action outcomes
- Update `score` column based on resolved injects (points_resolve)

```text
simulations/[simulation-name]/
├── sim_overview.md
├── sim_actions.csv
├── phase_1_overview.md
├── phase_1_roles_init.csv     # Initial role assignments (backup)
├── phase_1_roles.csv          # Working roles (budget/trust updated)
├── phase_1_injects_init.csv   # Initial injects (backup)
├── phase_1_injects.csv        # Working injects (updated in place)
└── responses/
    └── [team reports]
```

**Update process:**
1. Read `phase_#_injects.csv` and `phase_#_roles.csv`
2. Update inject states for addressed injects
3. Update team budgets (subtract costs, apply transfers)
4. Update team trust (apply trust_impact from actions)
5. Update team scores (add points_resolve from resolved injects)
6. Append new consequence/escalation injects
7. Write back to both files

---

## Example: Response Processing

**Input:** Team Denali report says they isolated infected servers and notified CISA.

**Evaluation:**
- Inject #1 (Unusual Traffic) → `partially_resolved` (stopped spread, but data already gone)
- Inject #33 (Classified Research Stolen) → `open` (isolation doesn't recover data)

**Update `phase_1_injects.csv`:**
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
