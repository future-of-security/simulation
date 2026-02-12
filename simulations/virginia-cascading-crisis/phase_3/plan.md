# Phase 3: Economic Security — Creation Plan

## Context
Phase 2 ("Rumors Spread") is closed. Phase 3 ("Supply Lines Cut") covers Days 6-10 of the Virginia Cascading Crisis, focusing on economic collapse from the extended cyber attack. Key carryover: Inject 7 (Panic Buying) was partially resolved — supply chain still recovering. Budget and trust carry from Phase 2 final; score resets to 0.

## Files to Create
All under `simulations/virginia-cascading-crisis/phase_3/`:
1. `overview.md` — Phase narrative, challenges, role objectives
2. `roles_init.csv` + `roles.csv` — Rotated role assignments with carryover budget/trust
3. `actions.csv` — ~35 actions, minimum 3 per role
4. `injects_init.csv` + `injects.csv` — 8 initial injects
5. `responses/.gitignore` — Exclude student data

Copy to `docs/phase_3/`:
6. `index.html` (from Phase 2 template, change PHASE_NUM to 3)
7. `overview.md`, `roles.csv`, `injects.csv`, `actions.csv`

Do NOT change `docs/js/app.js` — Phase 3 stays locked on dashboard.

---

## Role Rotation

| Team | P1 Role | P2 Role | **P3 Role** |
|------|---------|---------|-------------|
| Acadia | Governor's Liaison | Carilion Clinic | **United Way SW Virginia** |
| Arches | CISA Coordinator | WDBJ7 News | **AEP Appalachian Power** |
| Banff | Sheriff's Coalition | Shentel Comms | **Montgomery County Gov** |
| Bryce | AEP Power | VA DEQ | **Shentel Communications** |
| Denali | Virginia Tech | Governor's Liaison | **Sheriff's Coalition** |
| Glacier | Carilion Clinic | Virginia Tech | **VA DEQ SW Regional** |
| Jasper | SW VA EMA | AEP Power | **WDBJ7 News** |
| Olympic | Shentel Comms | Sheriff's Coalition | **Virginia Tech Crisis** |
| Redwood | Food City | SW VA EMA | **Governor's Liaison** |
| Sequoia | WDBJ7 News | Montgomery County | **VDOT SW Region** |
| Shenandoah | VDOT | United Way | **Carilion Clinic System** |
| Yellowstone | Montgomery County | Food City | **CISA Coordinator** |
| Yoho | VA DEQ | VDOT | **Faith & Community Network** |
| Yosemite | United Way | CISA Coordinator | **SW Virginia EMA** |
| Zion | Faith Network | Faith Network | **Food City / Supply Chain** |

No team repeats a role. Zion finally gets a new role (was stuck on Faith for 2 phases).

## Budget & Trust (carry from Phase 2 final, score reset to 0)

| Team | Budget | Trust | P3 Role |
|------|--------|-------|---------|
| Acadia | $17.95M | 11 | United Way SW Virginia |
| Arches | $15M | 10 | AEP Appalachian Power |
| Banff | $7.2M | 10 | Montgomery County Gov |
| Bryce | $39.8M | 7 | Shentel Communications |
| Denali | $6.9M | 12 | Sheriff's Coalition |
| Glacier | $48.65M | 11 | VA DEQ SW Regional |
| Jasper | $9.5M | 11 | WDBJ7 News |
| Olympic | $14.625M | 7 | Virginia Tech Crisis |
| Redwood | $24.5M | 14 | Governor's Liaison |
| Sequoia | $2.5M | 11 | VDOT SW Region |
| Shenandoah | $14.55M | 10 | Carilion Clinic |
| Yellowstone | $11.025M | 10 | CISA Coordinator |
| Yoho | $7.3M | 9 | Faith & Community |
| Yosemite | $5.5M | 10 | SW Virginia EMA |
| Zion | $1.56M | 15 | Food City / Supply |

## Phase 3 Narrative
"Supply Lines Cut" — Extended cyber disruptions cascade into economic failure:
- Coal mining halted (2000+ miners idle)
- Food City distribution on backup with limited inventory
- Pharmacies can't verify prescriptions; dialysis supplies running low
- Gas stations empty; emergency vehicles affected
- Small businesses can't process payments (200+ closures)
- Unemployment spiking; young people leaving region
- FEMA disputes whether cyber attack qualifies for disaster relief
- Key decision: urban vs rural resource allocation (affects Phase 5 healthcare)

## Action Catalog (~35 actions)
Minimum 3 dedicated actions per role. Organized by theme:

**Economic Stabilization (Governor, Montgomery, CISA):**
- A1: Emergency Economic Stimulus ($500K) — Governor + Montgomery County
- A2: Federal Disaster Assistance Request ($0) — Governor + CISA
- A3: Emergency Price Controls ($0) — Governor + Food City (+1/-1 trust)
- A15: Small Business Emergency Loans ($1M) — Montgomery + Governor
- A17: Tax Deferment Program ($0) — Montgomery County

**Supply Chain & Food (Food City, EMA, Faith, United Way):**
- A12: Emergency Resupply Convoy ($500K) — Food City + EMA + VDOT
- A13: Food Desert Mobile Markets ($200K) — Food City + United Way + Faith (+2 trust)
- A14: Purchase Limit Enforcement ($50K) — Food City + Sheriff
- A20: Emergency Supply Distribution ($300K) — EMA + Food City

**Energy & Fuel (AEP, VDOT, Sheriff):**
- A9: Priority Power Restoration ($1M) — AEP + VDOT
- A10: Emergency Rate Relief ($200K) — AEP + Governor (+2 trust)
- A11: Generator Distribution ($300K) — AEP + EMA
- A4: Anti-Looting & Security Patrols ($200K) — Sheriff + VDOT
- A5: Fuel Convoy Escort ($150K) — Sheriff + VDOT

**Healthcare (Carilion, United Way):**
- A6: Emergency Prescription Override ($300K) — Carilion + Governor
- A7: Medical Supply Chain Bypass ($500K) — Carilion + EMA
- A8: Community Health Clinic Expansion ($400K) — Carilion + United Way

**Communications & Tech (Shentel, WDBJ7, VT):**
- A18: Emergency Communication Network ($400K) — Shentel + CISA
- A19: Free Internet/Payment Restoration ($200K) — Shentel
- A23: Technical Assistance for Businesses ($150K) — VT + Shentel
- A25: Economic Recovery Campaign ($200K) — WDBJ7 + Governor
- A26: Job Board & Resource Guide ($100K) — WDBJ7 + VT
- A39: Business Spotlight Program ($50K) — WDBJ7 + Montgomery

**Environmental (DEQ):**
- A27: Coal Ash Emergency Assessment ($200K) — DEQ + AEP
- A28: Water System Emergency Repair ($500K) — DEQ + Montgomery
- A29: Environmental Compliance Suspension ($0) — DEQ + Governor (+1/-1)

**Community & Humanitarian (Faith, United Way, VT):**
- A30: Emergency Financial Assistance ($250K) — United Way + Faith
- A31: Job Retraining Program ($300K) — United Way + VT
- A32: Community Mutual Aid Network ($100K) — Faith + United Way (+2)
- A33: Church Feeding Program ($75K) — Faith + Food City (+2)
- A16: Emergency Housing Assistance ($300K) — Montgomery + United Way

**Cross-Cutting:**
- A21: Emergency Transportation Network ($250K) — EMA + VDOT
- A22: Economic Impact Assessment ($100K) — VT + Governor
- A24: Student Volunteer Workforce ($50K) — VT + EMA
- A34: Intelligence Sharing ($0) — ALL (+1)
- A35: Supply Route Optimization ($150K) — VDOT + EMA
- A36: Financial System Security Audit ($300K) — CISA + Shentel
- A37: Critical Infrastructure Resilience Grant ($0, federal) — CISA + AEP + DEQ
- A38: Business Security Detail ($100K) — Sheriff + Montgomery

**Per-role count (excl A34):**
Governor: 8 | CISA: 4 | Sheriff: 4 | AEP: 5 | VT: 5 | Carilion: 3 | EMA: 6 | Shentel: 4 | Food City: 4 | WDBJ7: 3 | VDOT: 5 | Montgomery: 7 | DEQ: 4 | United Way: 6 | Faith: 4

All roles >= 3.

## Initial Injects (8)

1. **Coal Mining Operations Halted** — sev 5, 15min
   Three major mines idle after cyber damage to control systems. 2000+ miners without income. Coal ash containment systems running on manual. Coalfield counties face immediate economic crisis.
   Visible: AEP, Governor, Montgomery County, Sheriff, DEQ

2. **Pharmacy & Medical Supply Chain Collapse** — sev 5, 15min
   Prescription verification systems down. Dialysis supplies critically low at Carilion facilities. Opioid recovery patients missing daily medication doses. Rural pharmacies closing.
   Visible: Carilion, Food City, United Way, Faith

3. **Fuel Shortage Reaches Critical** — sev 4, 10min
   Gas stations empty across region. School buses stopped. Emergency vehicles on reserve fuel. Fuel hoarding creating dangerous storage situations in residential areas.
   Visible: VDOT, AEP, Sheriff, EMA, DEQ

4. **Small Business Mass Closure Wave** — sev 4, 10min
   200+ businesses can't process card payments. Payroll missed for 5000+ workers. Downtown Blacksburg and Roanoke storefronts shuttering. Cash-only economy creating chaos.
   Visible: Montgomery County, Shentel, WDBJ7, CISA

5. **Regional Food Distribution Breakdown** — sev 4, 10min
   Food City warehouse on backup power with 48hr inventory. Rural stores empty. No refrigeration for perishables. Carryover from Phase 2 panic buying — supply chain never fully recovered.
   Visible: Food City, EMA, Faith, United Way, Sheriff

6. **Brain Drain & Community Exodus** — sev 3, 20min
   VT students transferring mid-semester. Young families planning to relocate. Hospital staff fielding out-of-state job offers. "Is Southwest Virginia dying?" editorial goes viral.
   Visible: VT, Governor, WDBJ7, Carilion

7. **Federal Disaster Qualification Disputed** — sev 4, 15min
   FEMA regional office rules cyber attack doesn't qualify for Stafford Act disaster relief. Congressional delegation split on emergency legislation. $50M in federal aid frozen pending legal determination.
   Visible: CISA, Governor, DEQ, VT

8. **Payment Systems Down Across Region** — sev 4, 10min
   Banks and ATMs offline. Food City registers cash-only. VDOT toll systems down. County tax/utility payments suspended. Economic activity at standstill.
   Visible: Shentel, Montgomery County, VDOT, CISA

**Per-role inject count:** All roles have 2-3 initial injects (escalation injects during play will add more).
**Points:** 175 per inject (equal opportunity, same as Phase 2).

## Escalation Triggers
| Trigger | Deadline | Consequence |
|---------|----------|-------------|
| No coal mine response | 0:15 | Mine collapse risk from unmaintained ventilation |
| No pharmacy response | 0:15 | Dialysis patient emergency — ambulance runs to Roanoke |
| No fuel response | 0:10 | Fire department can't respond to house fire |
| No food distribution response | 0:10 | Altercation at food distribution site |
| No federal qualification response | 0:20 | Congressional hearing announced |

## Verification
- Count actions per role: all >= 3
- Count injects per role: all >= 2
- No team repeats a role from Phase 1 or 2
- Budget/trust match Phase 2 final values
- Score starts at 0
- docs/phase_3/ has all data files but app.js NOT updated (phase stays locked)
