# Southwest Virginia Cascading Crisis

## Summary

An AI-enhanced cyber attack targets Southwest Virginia's interconnected systems—starting with Virginia Tech's research networks and spreading to Carilion Clinic's regional healthcare system. What begins as a sophisticated cyber intrusion rapidly cascades through this rural Appalachian region, exposing vulnerabilities in healthcare delivery, economic stability, and community resilience.

As the attack disrupts hospital systems and university operations, misinformation spreads through tight-knit communities. Coal operations halt, supply chains fail, and political tensions rise between state authorities and local leaders who feel abandoned. The crisis tests whether a rural region with limited resources can respond to a 21st-century threat while preserving community trust and protecting its most vulnerable residents.

## Parameters

- **Students**: ~60
- **Teams**: 15 teams named after national parks (4 students each)
- **Duration**: 60 minutes max per phase

## Setting

**Location:** Southwest Virginia (New River Valley, Roanoke Valley, and coalfield counties)

**Population:** ~300,000 across the region

**Key Communities:**
- **Blacksburg** - Home to Virginia Tech (30,000 students + staff)
- **Roanoke** - Regional hub, Carilion Clinic headquarters (100,000 pop)
- **Radford** - Radford University, manufacturing
- **Bristol** - Border city (VA/TN), commercial center
- **Wytheville** - I-81/I-77 junction, distribution hub
- **Wise/Norton** - Coal country, UVA-Wise campus
- **Abingdon** - Tourism, arts, county seat

**Key Infrastructure:**
- Virginia Tech Campus - Research networks, data centers, emergency ops
- Carilion Roanoke Memorial - Level 1 trauma center, regional hub
- Carilion New River Valley - Community hospital serving Blacksburg area
- AEP Power Grid - Regional power distribution
- I-81 Corridor - Primary transportation artery
- Shentel Fiber Network - Regional internet/telecom backbone
- Regional 911 Center - Emergency dispatch for multiple counties
- Food City Distribution - Regional food supply hub, Abingdon
- Coalfield water systems - Rural water treatment facilities

## Timeline

| Phase | Topic | Title | In-Simulation Time |
|-------|-------|-------|-------------------|
| 1 | Cybersecurity & AI Threats | "System Breach" | Day 1-2: Attack on VT and Carilion systems |
| 2 | Data, Privacy, Surveillance, & Misinformation | "Rumors Spread" | Day 3-5: Disinfo in close-knit communities |
| 3 | Economic Security | "Supply Lines Cut" | Day 6-10: Coal shutdown, food/fuel shortages |
| 4 | Political & Societal Security | "Forgotten Country" | Day 11-15: Rural vs state tensions, protests |
| 5 | Health, Environmental, & Biosecurity | "Hidden Damage" | Day 16-25: Hospital collapse, coal ash, water contamination |
| 6 | Disaster Management | "Mountain Resilience" | Day 26-35: Recovery and long-term decisions |

## Phase Summaries

### Phase 1: System Breach (Cybersecurity & AI Threats)
AI-enhanced malware infiltrates Virginia Tech's research networks, using machine learning to evade detection. The attack spreads to Carilion Clinic's electronic health records and medical devices through shared network connections. Rural clinics lose access to patient records. Teams must contain the spread while maintaining critical healthcare services.

### Phase 2: Rumors Spread (Data, Privacy, Surveillance, & Misinformation)
With systems down and official communication limited, rumors spread rapidly through churches, community centers, and social media. Deepfake videos of local officials circulate. Some residents believe the attack is a government cover-up; others blame Virginia Tech researchers. Stolen patient data appears online. Teams must establish trusted communication while countering AI-generated disinformation.

### Phase 3: Supply Lines Cut (Economic Security)
Extended disruptions halt coal mining operations—the economic backbone of several counties. Food City distribution center operates on backup systems with limited inventory. Pharmacies can't verify prescriptions. Gas stations run low on fuel. Unemployment claims spike. Teams must prioritize economic stabilization while resources remain scarce.

### Phase 4: Forgotten Country (Political & Societal Security)
Frustration boils over as rural communities feel state response prioritizes Roanoke over coalfield counties. A protest in Wise County blocks I-81. Conspiracy theories about the attack's origins fuel social divisions. Local officials challenge state authority. AI-generated political content deepens polarization. Teams must navigate political tensions while maintaining unified response.

### Phase 5: Hidden Damage (Health, Environmental, & Biosecurity)
Carilion's rural clinics, already understaffed, face critical shortages. Dialysis patients must travel hours for treatment. Medication supplies run low and overdose calls increase 40%. Meanwhile, environmental monitoring systems—offline since the attack—reveal concerning data. Coal ash pond sensors in Wise County show potential breaches. Water treatment facilities operated on manual backup with unknown impacts. A cluster of respiratory illness emerges in a coal community, and mining operations restart without proper monitoring. Teams must triage healthcare while assessing environmental damage and managing public communication about risks.

### Phase 6: Mountain Resilience (Disaster Management)
Recovery decisions shape the region's future. Federal disaster assistance is contested—does a cyber attack qualify? Communities debate rebuilding vulnerable systems versus investing in resilience. Brain drain accelerates as young people leave. Teams must balance immediate recovery with long-term transformation of a region already facing economic transition.

## Roles (15 Teams - National Parks)

See `sim_roles.csv` for team definitions (name, role, sector, starting budget, starting trust).

## Global Constraints

### Actions
- **Budget limits actions:** Teams are limited by their budget—choose wisely
- **Action delays:** Some actions take time to be effective (e.g., 1-4 hours; see sim_actions.csv)

### Information
- **Base intel:** Teams see injects relevant to their role
- **Delayed information:** Some action outcomes revealed after delay period

### Authority

| Action Type | Requires Approval From |
|-------------|------------------------|
| National Guard request | Governor's SW Virginia Liaison |
| Federal emergency declaration | Governor's SW Virginia Liaison + CISA Regional Coordinator |
| Hospital mutual aid activation | Carilion Clinic System |
| Road closures / detours | VDOT SW Region |
| Environmental emergency | VA DEQ SW Regional Office + Governor's SW Virginia Liaison |
| Emergency broadcast | Governor's SW Virginia Liaison or SW Virginia EMA |
| Evacuation orders | SW Virginia EMA + Montgomery County Government |
| Telecom emergency rerouting | Shentel Communications |

### Trust & Reputation
- **Starting trust:** Each team starts with trust score shown in role table (1-10)
- **Trust effects:**
  | Trust Level | Effect |
  |-------------|--------|
  | 8-10 | Actions cost 20% less, community cooperation, faster approvals |
  | 5-7 | Normal effectiveness |
  | 3-4 | Actions cost 25% more, community resistance, media scrutiny |
  | 1-2 | Actions may fail (25% chance), protests, delayed responses |

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

*Note: No penalty points—teams earn points for successes, not punished for failures.*

## Cascading Mechanics

| Phase | Key Decisions | Affects |
|-------|--------------|---------|
| 1 | Speed vs. thoroughness of cyber response | Phase 2 data breach severity |
| 2 | Transparency vs. controlling narrative | Phase 4 political tensions |
| 3 | Urban vs. rural resource allocation | Phase 5 healthcare disparities |
| 4 | State vs. local authority balance | Phase 6 recovery funding |
| 5 | Triage + environmental transparency | Phase 6 community trust, long-term health costs |

## Regional Context

**Why Southwest Virginia:**
- Rural healthcare challenges already acute (hospital closures, provider shortages)
- Economic transition from coal creates underlying stress
- Strong community bonds but also insularity
- Limited redundancy in critical systems
- Distance from state capital creates coordination challenges
- Appalachian culture values self-reliance but also mutual aid

**Vulnerable Populations:**
- Elderly in remote hollows without internet/cell service
- Patients dependent on dialysis, oxygen, refrigerated medications
- Opioid recovery community requiring daily treatment
- Low-income families without transportation
- Non-English speaking communities (growing Hispanic population)

## Files

- Team roles: `sim_roles.csv`
- Action catalog: `sim_actions.csv`
- Phase overviews: `phase_#_overview.md` (1-6)
- Injects (initial): `phase_#_injects_init.csv` (1-6)
- Injects (working): `phase_#_injects.csv` (1-6)
