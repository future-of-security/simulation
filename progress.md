# Progress Log

## 2026-02-12: Phase 2 — Rumors Spread (Data, Privacy, Surveillance, & Misinformation)

### Phase Start
- **Real time start:** 12:38
- **Sim time 0:00 = 12:38 real time**
- Phase duration: 60 minutes (ends ~13:38)
- Escalation checkpoints: 0:10 (12:48), 0:15 (12:53), 0:20 (12:58)

### Initial State
- 5 open injects (IDs 1-5), all severity 4-5
- 15 teams active, roles shuffled from Phase 1
- Budgets and trust carry over from Phase 1

### Escalation Triggers
| Trigger | Deadline | Real Time |
|---------|----------|-----------|
| No deepfake debunking | 0:15 | 12:53 |
| No patient notification | 0:15 | 12:53 |
| No counter to fake alerts | 0:10 | 12:48 |
| No surveillance response | 0:15 | 12:53 |
| No attribution response | 0:20 | 12:58 |

### Update Cycle 1 (sim_time 0:15)

#### Canvas Fetch
- Fetched 4 submissions (12 unsubmitted/skipped)
- Teams that submitted: Acadia, Arches, Banff, Glacier
- Teams with NO submission: Bryce, Denali, Jasper, Olympic, Redwood, Sequoia, Shenandoah, Yellowstone, Yoho, Yosemite, Zion

#### Inject State Changes (5 → 7 injects)
| Inject | Old State | New State | Reason |
|--------|-----------|-----------|--------|
| 1 (Deepfake Video) | open | partially_resolved | Glacier: A1 deepfake analysis ($500K) + A20 intelligence sharing ($0). Arches: A2 official video rebuttal ($200K). Video debunked with forensic evidence, rebuttal distributed. Still spreading in low-internet coalfield communities. |
| 2 (Spoofed Portal) | open | partially_resolved | Acadia: A4 HIPAA breach notification ($1M), A5 credit monitoring ($500K), A6 patient hotline ($250K). Strong victim support but fake portal still active — no takedown initiated. |
| 3 (Infrastructure Misinfo) | open | partially_resolved | Banff: A10 fake alert detection/blocking ($400K), A3 platform takedown requests ($100K). Collab with Redwood on rumor tracking dashboard. Spoofed texts intercepted but I-81 signs still compromised, boil order screenshot still viral. |
| 4 (Surveillance) | open | open (ESCALATED) | No teams responded. ACLU filed emergency injunction (→ Inject 6). |
| 5 (Attribution) | open | open | No response yet. Deadline 0:20 approaching. |

#### New Injects (0:15)
| ID | Incident | Severity | Why |
|----|----------|----------|-----|
| 6 | ACLU Files Emergency Injunction Against Surveillance | 5 | Escalation of unaddressed Inject 4 — court freezes surveillance data |
| 7 | Panic Buying Empties Shelves Across Region | 3 | Consequence of Inject 3 — fake alerts triggered panic before Banff's blocking came online |

#### Escalation Status
| Trigger | Status |
|---------|--------|
| Deepfake debunking by 0:15 | PREVENTED — Glacier (A1) + Arches (A2) |
| Patient notification by 0:15 | PREVENTED — Acadia (A4) |
| Counter fake alerts by 0:10 | PREVENTED — Banff (A10, A3) |
| Surveillance response by 0:15 | TRIGGERED — No response → Inject 6 |
| Attribution response by 0:20 | PENDING — No response yet |

#### Score Updates
| Team | Old Score | New Score | Points From |
|------|-----------|-----------|-------------|
| Acadia | 0 | 88 | Inject 2 partial (175×50% = 88, single team) |
| Glacier | 0 | 53 | Inject 1 partial (175×50%×60% = 53, 2-team collab with Arches) |
| Arches | 0 | 53 | Inject 1 partial (175×50%×60% = 53, 2-team collab with Glacier) |
| Banff | 0 | 53 | Inject 3 partial (175×50%×60% = 53, 2-team collab with Redwood) |
| Redwood | 0 | 53 | Inject 3 partial (175×50%×60% = 53, 2-team collab with Banff) |

#### Budget Changes
| Team | Old Budget | New Budget | Spent On |
|------|-----------|-----------|----------|
| Acadia | $19.7M | $17.95M | A4 ($1M) + A5 ($500K) + A6 ($250K) |
| Arches | $15M | $14.8M | A2 ($200K) |
| Banff | $7.8M | $7.3M | A10 ($400K) + A3 ($100K) |
| Glacier | $49.15M | $48.65M | A1 ($500K) + A20 ($0) |

#### Trust Changes
| Team | Old Trust | New Trust | Reason |
|------|-----------|-----------|--------|
| Acadia | 8 | 11 | A4 (+1), A5 (+1), A6 (+1) = +3 (capped) |
| Arches | 5 | 7 | A2 (+2, timely rebuttal) |
| Banff | 8 | 9 | A10 (0), A3 (0), collab bonus (+1) |
| Glacier | 9 | 11 | A1 (+1), A20 (+1) = +2 |
| Redwood | 7 | 8 | Collaboration bonus (+1) |
| Olympic | 4 | 3 | Ignored critical Inject 4, escalated to ACLU injunction (-1) |
| Sequoia | 8 | 7 | Ignored critical Inject 4, escalated (-1) |
| Shenandoah | 7 | 6 | Ignored critical Inject 4, escalated (-1) |

#### Current Status (sim_time 0:15)
- **Open injects:** 4 (Inject 4, 5, 6, 7)
- **Partially resolved:** 3 (Inject 1, 2, 3)
- **Total:** 7

### Update Cycle 2 (sim_time 0:25)

#### Canvas Fetch
- Fetched 6 new submissions (6 unsubmitted/skipped)
- New teams: Jasper, Olympic, Redwood, Sequoia, Shenandoah, Yellowstone
- Teams still without submission: Bryce, Denali, Yoho, Yosemite, Zion

#### Inject State Changes (7 injects)
| Inject | Old State | New State | Reason |
|--------|-----------|-----------|--------|
| 3 (Infrastructure Misinfo) | partially_resolved | partially_resolved (improved) | Redwood: A9 multilingual alerts ($150K), A21 rumor tracking ($150K), A20 intel sharing. Jasper: custom channel blocking ($100K). Highway signs partially contained, but nav apps/boil order still circulating. |
| 4 (Surveillance) | open | partially_resolved | Olympic: A12 disclosure ($0), A16 Hispanic liaison ($75K), A14 warrant ($100K), A15 evidence destruction (BLOCKED by court order). Sequoia: A7 counter-disinfo ($300K), A9 multilingual ($150K), A12 disclosure. Shenandoah: A13 review board ($50K), A16 liaison ($75K), A8 church campaign ($75K). Comprehensive 3-team response. |
| 5 (Attribution) | open | partially_resolved | Yellowstone: A19 breach assessment ($200K). Assessment started but no public communication yet. |
| 6 (ACLU Injunction) | open | partially_resolved | Olympic's disclosure + warrant, Sequoia's counter-disinfo, Shenandoah's review board address ACLU concerns. Court order still in effect but narrative improving. |
| 7 (Panic Buying) | open | open | No teams directly addressed. Shelves still empty, fuel shortages worsening. |

#### Escalation Status
| Trigger | Status |
|---------|--------|
| Attribution response by 0:20 | PREVENTED — Yellowstone (A19) submitted at ~0:17 |

#### Notable Events
- **Olympic attempted A15 (Warrant-Free Evidence Destruction) but BLOCKED by ACLU court order** from Inject 6. The court order freezing surveillance data was filed at 0:15; Olympic's attempt to destroy evidence at ~0:21 was too late. Data remains frozen pending judicial review.
- **Olympic transferred $100K to Sequoia** (warrant costs) and **$75K to Shenandoah** (Hispanic liaison funding).
- **Jasper's custom action approved:** "Block compromised infrastructure channels" ($100K) — AEP has authority over power infrastructure feeding highway sign systems.

#### Score Updates
| Team | Old Score | New Score | Points From |
|------|-----------|-----------|-------------|
| Olympic | 0 | 75 | Inject 4 partial (35, 3-team) + Inject 6 partial (40, 3-team) |
| Sequoia | 0 | 75 | Inject 4 partial (35, 3-team) + Inject 6 partial (40, 3-team) |
| Shenandoah | 0 | 75 | Inject 4 partial (35, 3-team) + Inject 6 partial (40, 3-team) |
| Yellowstone | 0 | 88 | Inject 5 partial (88, single team) |
| Jasper | 0 | 35 | Inject 3 (35, 3rd team joining partially_resolved inject) |

#### Budget Changes
| Team | Old Budget | New Budget | Spent On |
|------|-----------|-----------|----------|
| Jasper | $9.6M | $9.5M | Custom: block channels ($100K) |
| Olympic | $15.3M | $15.125M | A16 ($75K) + A14 ($100K) via transfers |
| Redwood | $25M | $24.7M | A9 ($150K) + A21 ($150K) |
| Sequoia | $2.85M | $2.5M | A7 ($300K) + A9 ($150K), received $100K from Olympic |
| Shenandoah | $14.6M | $14.55M | A13 ($50K) + A8 ($75K), received $75K from Olympic for A16 |
| Yellowstone | $11.625M | $11.425M | A19 ($200K) |

#### Trust Changes
| Team | Old Trust | New Trust | Reason |
|------|-----------|-----------|--------|
| Olympic | 3 | 6 | A12 (+2 transparent disclosure), A16 (+1), A14 (0), collab (+1) = +3 capped |
| Sequoia | 7 | 10 | A7 (+1), A9 (+1), A12 (+2), A20 (+1), collab (+1) = +3 capped |
| Shenandoah | 6 | 9 | A13 (+1), A16 (+1), A8 (+2), A20 (+1), collab (+1) = +3 capped |
| Redwood | 8 | 11 | A9 (+1), A20 (+1), A21 (0), collab (+1) = +3 capped |
| Yellowstone | 7 | 8 | A19 (0), collab (+1) |
| Jasper | 8 | 9 | Custom action (0), collab (+1) |

#### Current Status (sim_time 0:25)
- **Open injects:** 1 (Inject 7: Panic Buying)
- **Partially resolved:** 6 (Injects 1, 2, 3, 4, 5, 6)
- **Total:** 7
- **Teams submitted:** 10 of 15
- **Teams remaining:** Bryce, Denali, Yoho, Yosemite, Zion

### Update Cycle 3 (sim_time 0:35)

#### Canvas Fetch
- Fetched 6 new submissions
- New first-time teams: Denali, Yosemite, Bryce, Yoho
- Second attempts: Shenandoah (attempt 2), Arches (attempt 2)
- **All 15 teams have now submitted** (14 with at least 1 attempt; Zion is the only team with no submission)

#### Inject State Changes (7 injects)
| Inject | Old State | New State | Reason |
|--------|-----------|-----------|--------|
| 1 (Deepfake) | partially_resolved | **RESOLVED** | Denali (actual official in deepfake): A2 official statement ($200K), A7 counter-disinfo ($300K), A11 community meeting ($100K), A12 surveillance disclosure, A20 intel sharing. Arches attempt 2: A3 platform takedown ($100K). Yoho: funded Arches ($100K) and Denali ($200K). Combined with Glacier A1 + Arches A2 from cycle 1 = comprehensive resolution. |
| 2 (Spoofed Portal) | partially_resolved | **RESOLVED** | Yosemite (CISA): A3 platform takedown ($100K), A10 network blocking ($400K), A20 intel sharing. Collaborated with Zion and Acadia. Critical gap (takedown + blocking) now filled. Combined with Acadia's A4/A5/A6 from cycle 1. |
| 4 (Surveillance) | partially_resolved | **RESOLVED** | Denali: A12 (reprimanded Sheriff), A11 (community meeting), A7 (counter-disinfo). Governor's direct authority adds legitimacy to Olympic/Sequoia/Shenandoah's response from cycle 2. 4-team comprehensive resolution. |
| 5 (Attribution) | partially_resolved | partially_resolved (improved) | Bryce: A19 assessment ($200K), custom Systems Security Review ($100K), A20 intel sharing. Joins Yellowstone. 2 teams assessing but still no public communication. |
| 6 (ACLU Injunction) | partially_resolved | **RESOLVED** | Denali's government-level accountability completes the response. ACLU agrees to 30-day stay. National media narrative shifts positive. |
| 7 (Panic Buying) | open | open (worsening) | Still no direct response. Fuel shortages affecting emergency vehicles. Third altercation at grocery store. |

#### Notable Events
- **Denali addressed 3 injects simultaneously** — deepfake (A2, A7, A11), surveillance (A12, A11), and ACLU (A12). Highest single-cycle contribution of the phase.
- **Yoho addressed wrong inject** — VDOT tackled the deepfake (Inject 1) instead of foreign attribution (Inject 5, their visible inject). Transferred $300K to fund Arches and Denali.
- **Arches attempt 2** added A3 platform takedown request for deepfake.
- **Shenandoah attempt 2** added A24 Victim Advocacy Program ($200K) for surveillance/breach victims.
- **Bryce custom action approved:** Systems Security Review ($100K) — DEQ reviewing monitoring system vulnerabilities.
- **Olympic's A15 (evidence destruction) remains blocked** by court order from Inject 6.

#### Score Updates (partial→resolved upgrades)
| Team | Old Score | New Score | Points From |
|------|-----------|-----------|-------------|
| Denali | 0 | 220 | Inject 1 resolved (70, 3-team 40%) + Inject 4 resolved (70, 4-team 40%) + Inject 6 resolved (80, 4-team 40%) |
| Yosemite | 0 | 105 | Inject 2 resolved (105, 2-team 60%) |
| Acadia | 88 | 105 | Inject 2 upgrade partial→resolved (+17) |
| Glacier | 53 | 70 | Inject 1 upgrade partial→resolved (+17) |
| Arches | 53 | 70 | Inject 1 upgrade partial→resolved (+17) |
| Olympic | 75 | 150 | Inject 4 upgrade (+35) + Inject 6 upgrade (+40) |
| Sequoia | 75 | 150 | Inject 4 upgrade (+35) + Inject 6 upgrade (+40) |
| Shenandoah | 75 | 150 | Inject 4 upgrade (+35) + Inject 6 upgrade (+40) |
| Bryce | 0 | 53 | Inject 5 partial (53, 2-team 60%) |
| Yoho | 0 | 35 | Inject 1 funding support (half-rate collaboration) |

#### Budget Changes
| Team | Old Budget | New Budget | Spent On |
|------|-----------|-----------|----------|
| Denali | $7.5M | $7.1M | A2 ($200K) + A7 ($300K) + A11 ($100K), received $200K from Yoho |
| Yosemite | $6M | $5.5M | A3 ($100K) + A10 ($400K) |
| Bryce | $40.1M | $39.8M | A19 ($200K) + custom ($100K) |
| Yoho | $7.75M | $7.45M | Transfers: $100K to Arches + $200K to Denali |
| Arches | $14.8M | $14.8M | A3 ($100K), received $100K from Yoho (net zero) |
| Shenandoah | $14.55M | $14.35M | A24 ($200K) |

#### Trust Changes
| Team | Old Trust | New Trust | Reason |
|------|-----------|-----------|--------|
| Denali | 8 | 11 | A2 (+2), A7 (+1), A11 (+1), A12 (+2), A20 (+1), collab (+1) = +3 capped |
| Yosemite | 8 | 10 | A20 (+1), collab (+1) = +2 |
| Bryce | 4 | 6 | A20 (+1), collab (+1) = +2 |
| Arches | 7 | 8 | A3 (0), collab (+1) = +1 |
| Yoho | 6 | 7 | Collab (+1) = +1 |
| Shenandoah | 9 | 10 | A24 (+1) = +1 |

#### Current Status (sim_time 0:35)
- **Resolved:** 4 (Injects 1, 2, 4, 6)
- **Partially resolved:** 2 (Injects 3, 5)
- **Open:** 1 (Inject 7: Panic Buying)
- **Total:** 7
- **Teams submitted:** 14 of 15 (Zion has not submitted)
- **Phase time remaining:** ~25 minutes

#### Leaderboard (sim_time 0:35)
| Rank | Team | Score | Trust |
|------|------|-------|-------|
| 1 | Denali | 220 | 11 |
| 2 | Olympic | 150 | 6 |
| 2 | Sequoia | 150 | 10 |
| 2 | Shenandoah | 150 | 10 |
| 5 | Acadia | 105 | 11 |
| 5 | Yosemite | 105 | 10 |
| 7 | Yellowstone | 88 | 8 |
| 8 | Arches | 70 | 8 |
| 8 | Glacier | 70 | 11 |
| 10 | Banff | 53 | 9 |
| 10 | Bryce | 53 | 6 |
| 10 | Redwood | 53 | 11 |
| 13 | Jasper | 35 | 9 |
| 13 | Yoho | 35 | 7 |
| 15 | Zion | 0 | 12 |

### Update Cycle 4 (sim_time 0:36–0:46, per submitted_at timestamps)

#### Canvas Fetch
- 0 new submissions from Canvas (4 already fetched in interrupted cycles)
- Processed 4 previously-read but unprocessed submissions:
  - Zion attempt 1 (submitted 0:43)
  - Banff attempt 2 (submitted 0:36)
  - Sequoia attempt 2 (submitted 0:43)
  - Arches attempt 3 (submitted 0:46)
- **All 15 teams have now submitted.** Only 1 unsubmitted group remains on Canvas.

#### Inject State Changes
| Inject | Old State | New State | Reason |
|--------|-----------|-----------|--------|
| 3 (Infrastructure Misinfo) | partially_resolved | **RESOLVED** | Banff attempt 2: A3 takedown for boil water screenshot ($100K), A20 alerted VDOT. Zion: A8 church campaign ($75K), A22 community info centers ($100K), custom Deepfake & Scam Toolkit ($15K). 5-team comprehensive resolution (Banff, Redwood, Jasper, Zion + Arches indirect). |

#### Notable Events
- **Zion finally submitted** (attempt 1, 0:43) — addressed 3 injects simultaneously (Deepfake, Misinfo, Surveillance) with A8 church campaign, A22 community centers, custom toolkit. Late but impactful.
- **Zion custom action approved:** Deepfake & Scam One-Page Toolkit ($15K) — simple PDF distributed through church networks to help rural residents identify fake portals/alerts. Very cost-effective.
- **Arches attempt 3** added A7 Counter-Disinformation Campaign ($300K) — multi-platform fact-check across TV, website, push alerts, and social media.
- **Banff attempt 2** specifically targeted the persistent boil water screenshot with a second A3 takedown and alerted VDOT about highway signs (A20).
- **Sequoia attempt 2** continued coordination on ACLU response with A20.

#### Score Updates (Inject 3 partial→resolved upgrade)
| Team | Old Score | New Score | Points From |
|------|-----------|-----------|-------------|
| Zion | 0 | 70 | Inject 3 resolved (70, 5-team 40%) |
| Banff | 53 | 70 | Inject 3 upgrade (+17) |
| Redwood | 53 | 70 | Inject 3 upgrade (+17) |
| Jasper | 35 | 70 | Inject 3 upgrade (+35) |

#### Budget Changes
| Team | Old Budget | New Budget | Spent On |
|------|-----------|-----------|----------|
| Zion | $1.75M | $1.56M | A8 ($75K) + A22 ($100K) + custom toolkit ($15K) |
| Banff | $7.3M | $7.2M | A3 ($100K) |
| Arches | $14.8M | $14.5M | A7 ($300K) |

#### Trust Changes
| Team | Old Trust | New Trust | Reason |
|------|-----------|-----------|--------|
| Zion | 12 | 15 | A8 (+2), A22 (+1), A20 (+1), custom (+1), collab (+1) = +3 capped |
| Banff | 9 | 10 | A20 (+1) |
| Arches | 8 | 10 | A7 (+1), collab (+1) = +2 |
| Sequoia | 10 | 11 | A20 (+1) |

#### Current Status (sim_time 0:46)
- **Resolved:** 5 (Injects 1, 2, 3, 4, 6)
- **Partially resolved:** 1 (Inject 5: Attribution)
- **Open:** 1 (Inject 7: Panic Buying — unaddressed all phase)
- **Total:** 7

#### Final Leaderboard (Phase 2)
| Rank | Team | Score | Trust | Budget |
|------|------|-------|-------|--------|
| 1 | Denali | 220 | 11 | $7.1M |
| 2 | Olympic | 150 | 6 | $15.125M |
| 2 | Sequoia | 150 | 11 | $2.5M |
| 2 | Shenandoah | 150 | 10 | $14.35M |
| 5 | Acadia | 105 | 11 | $17.95M |
| 5 | Yosemite | 105 | 10 | $5.5M |
| 7 | Yellowstone | 88 | 8 | $11.425M |
| 8 | Arches | 70 | 10 | $14.5M |
| 8 | Banff | 70 | 10 | $7.2M |
| 8 | Glacier | 70 | 11 | $48.65M |
| 8 | Jasper | 70 | 9 | $9.5M |
| 8 | Redwood | 70 | 11 | $24.7M |
| 8 | Zion | 70 | 15 | $1.56M |
| 14 | Bryce | 53 | 6 | $39.8M |
| 15 | Yoho | 35 | 7 | $7.45M |

#### Note for Future Cycles
- Use `submitted_at` timestamp from each report as the action time, not the Canvas fetch time.

---

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
