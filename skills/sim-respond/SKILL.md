---
name: sim-respond
description: Generate response reports for crisis management simulations. Use to test/mimic student teams responding to injects. Agents role-play as teams, select injects, collaborate with other teams, and produce structured response reports.
---

# Simulation Respond

Generate response reports that mimic how student teams respond to crisis injects.

## Purpose

- **Primary use**: Students fill out response reports during live simulation
- **Testing use**: Agents role-play as teams to test simulation flow before class

## Inputs

- `sim_overview.md` - Team roles, budgets, constraints (in simulation root)
- `phase_#/overview.md` - Current situation
- `phase_#/roles.csv` - Team-to-role assignments for this phase
- `phase_#/injects.csv` - Active incidents
- `phase_#/actions.csv` - Available actions with costs

## How to Respond

### 0. Identify Your Role
- Look up your team in `roles.csv` to find your assigned role
- Your role determines which actions you can take and which injects you see
- Include your role at the top of your response report

### 1. Select Injects
- Pick injects where your **role** is in `visible_to`
- Prioritize by severity (5 = critical) and time limit
- Can respond to multiple related injects

### 2. Collaborate
- Identify teams who have resources or authority you need
- Coordinate actions to avoid duplication
- Document who you worked with

### 3. Take Catalog Actions
- Choose actions from `actions.csv` where your **role** is in `available_to`
- Consider costs vs. budget
- Explain why you chose each action (brief)

### 4. Propose Custom Actions (Optional)
If the action catalog doesn't have what you need, propose your own:
- **Describe the action** clearly
- **Estimate cost** (be realistic)
- **Expected effect** (what you hope will happen)
- **Time needed** (how long until it takes effect)
- **Risks** (what could go wrong)
- **Justify** why your team can do this

The facilitator (sim-inject) will evaluate feasibility and may:
- Approve as proposed
- Approve with modifications (adjusted cost/time/effect)
- Partially approve (works but not as well as hoped)
- Deny (explain why it's not feasible)

### 5. Track Resources
- Record action costs (from `actions.csv` cost column)
- Record any budget transfers to other teams (with purpose)
- Calculate remaining budget: starting budget - action costs - transfers out + transfers in
- Be accurate — the facilitator uses your reported numbers to update the simulation

**Budget Transfers:**
Teams can transfer funds to other teams to enable actions they can't take themselves. For example, a county government might fund a telecom company to execute emergency routing. Document transfers clearly:
- From team, To team, Amount, Purpose
- The receiving team must still take the action in their own report

## Report Template

Use `assets/templates/REPORT.md` - designed to be:
- **Quick to fill out** (students submit responses throughout the 60-min phase)
- **Informative enough** for facilitator to evaluate and for sim-inject to generate follow-up injects

## Key Sections

| Section | What to Include |
|---------|----------------|
| Team & Role | Team name and assigned role for this phase |
| Incidents Addressed | Incident titles from dashboard |
| Situation Summary | 1-2 sentences on the problem |
| Collaboration | Which teams, what you did together |
| Actions Taken (catalog) | Action ID, name, cost, brief rationale |
| Proposed Custom Actions | Action description, est. cost, expected effect, time, risks, justification |
| Transfers | Budget moves between teams (From, To, Amount, Purpose) |
| Remaining Budget | Single number |
| Outcomes & Next Steps | Expected results, needs, risks |

## For Testing (Agent Role-Play)

When mimicking student responses:
- Stay in character as the assigned team
- Make realistic decisions given constraints
- Don't be perfect—students make suboptimal choices under pressure
- Show collaboration attempts (some may fail)
- Leave some problems unresolved (realistic)
