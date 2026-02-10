# Phase 1: System Breach

**Course Topic:** Cybersecurity & AI Threats

**Time Period:** Day 1-2 of crisis (60 minutes real-time)

---

## Context

At 2:47 AM on a Monday morning, Virginia Tech's Security Operations Center detects anomalous network traffic originating from research servers in the College of Engineering. Within hours, the intrusion spreads—not through brute force, but through adaptive behavior that evades each defensive measure. By dawn, the malware has jumped to Carilion Clinic's network through a shared research partnership connection.

The attack uses machine learning to identify and exploit vulnerabilities in real-time. When defenders block one pathway, it finds another. Carilion's electronic health records become inaccessible. Rural clinics in the coalfields—connected to Carilion's central systems—lose access to patient histories, medication records, and lab results. A dialysis clinic in Wise County cannot verify patient treatment protocols.

By noon, the scope becomes clear: this isn't a ransomware attack seeking payment. The malware is designed to cause maximum disruption while gathering data. Virginia Tech's research databases—including sensitive defense-related projects—may be compromised. Patient data for 200,000+ regional residents is at risk. And the attack is still spreading, probing AEP's power grid connections and the regional 911 system.

---

## Crisis Engine Analysis

### What just changed unexpectedly?
An AI-enhanced cyber attack has simultaneously compromised the region's academic research hub and healthcare system. Unlike conventional attacks, this malware learns from defensive responses, making traditional incident response playbooks ineffective. The shared network connections that enable regional collaboration have become attack vectors.

### Which system is now stressed?
- [x] Infrastructure: Healthcare IT systems failing, power grid being probed
- [x] Information: Uncertainty about attack scope, patient data at risk
- [ ] Economy: Not yet primary (becomes critical in Phase 3)
- [x] Health: Hospital systems degraded, rural clinics cut off
- [x] Governance: Multi-jurisdictional coordination required

Healthcare IT is the primary stressed system. Carilion serves as the region's only Level 1 trauma center and operates most rural clinics. Without electronic records, providers must work from memory or paper backups that may not exist.

### Who experiences immediate harm?
- [x] Individuals: Patients whose care depends on accessible records, especially those with complex conditions
- [x] Vulnerable communities: Rural elderly, dialysis patients, those on multiple medications
- [x] Institutions: Virginia Tech (research/reputation), Carilion (operations), rural clinics (survival)
- [ ] Cross-border populations: Not yet (Bristol TN connection emerges later)

### What decision must be made within limited time?
**Containment vs. Continuity:** Teams must choose between aggressive network isolation (stopping the spread but shutting down more services) versus maintaining degraded operations (risking further compromise but keeping some care available).

**Deadline:** By mid-morning (~10:00), if the attack isn't contained, it will reach AEP's grid control systems, potentially causing regional power outages that compound the healthcare crisis.

### What future risk is created by this decision?
- **If aggressive isolation:** Extended healthcare outages will force patient transfers, some to facilities hours away. Deaths may result from delayed care.
- **If maintaining operations:** Attack may compromise more data, spread further. Stolen patient data will fuel Phase 2 misinformation. Evidence for attribution may be destroyed.

### Who makes the decision, and who is left out?
- **Decision makers:** Denali (Virginia Tech), Glacier (Carilion), Arches (CISA), Bryce (AEP)
- **Stakeholders excluded:** Rural patients, community health workers, local officials in coalfield counties
- **Why this matters:** Technical decisions made in Blacksburg and Roanoke will determine outcomes for patients in Wise, Dickenson, and Buchanan counties who have no voice in the response.

---

## Team Roles This Phase

**All 15 teams are active in every phase.** Each team has meaningful work regardless of the phase theme.

| Team | Role | Primary Focus This Phase |
|------|------|--------------------------|
| Acadia | Governor's SW Virginia Liaison | Coordinate state response, authorize resources, balance regional priorities |
| Arches | CISA Regional Coordinator | Lead technical analysis, federal coordination, advise on containment |
| Banff | SW Virginia Sheriff's Coalition | Secure critical infrastructure, investigate suspicious activity, manage public order |
| Bryce | AEP Appalachian Power | Protect grid systems, assess exposure, prepare backup power |
| Denali | Virginia Tech Crisis Response | Contain campus intrusion, preserve evidence, protect research data |
| Glacier | Carilion Clinic System | Maintain patient care, implement backups, coordinate rural clinics |
| Jasper | SW Virginia EMA | Activate EOC, establish backup comms, coordinate multi-county response |
| Olympic | Shentel Communications | Assess telecom damage, prioritize restoration, coordinate with ISPs |
| Redwood | Food City / Regional Supply | Assess supply chain impacts, protect inventory systems, coordinate logistics |
| Sequoia | WDBJ7 News | Provide accurate information, counter rumors, coordinate messaging |
| Shenandoah | VDOT SW Region | Manage traffic system failures, support emergency transport, coordinate detours |
| Yellowstone | Montgomery County Government | Activate local operations, coordinate with Blacksburg, support campus response |
| Yoho | VA DEQ | Monitor environmental systems, assess sensor failures, coordinate with utilities |
| Yosemite | United Way SW Virginia | Identify vulnerable populations, prepare support resources, coordinate volunteers |
| Zion | Appalachian Faith & Community | Check on isolated residents, establish trusted communication, support vulnerable |

### Team-Specific Objectives

**Acadia - Governor's Liaison:**
- Assess need for state emergency declaration
- Coordinate with Richmond on resources
- Ensure coalfield counties are not forgotten

**Arches - CISA:**
- Analyze malware, identify AI components
- Coordinate with FBI on attribution
- Advise on containment strategy

**Banff - Sheriff's Coalition:**
- Secure Virginia Tech and Carilion facilities
- Investigate reports of suspicious vehicles near infrastructure
- Coordinate with state police on criminal investigation

**Bryce - AEP:**
- Isolate grid control systems from compromised networks
- Assess power infrastructure exposure
- Prepare backup power for critical facilities

**Denali - Virginia Tech:**
- Contain malware spread on campus
- Preserve forensic evidence
- Protect sensitive research data

**Glacier - Carilion:**
- Maintain critical patient care
- Implement paper-based backup procedures
- Coordinate with rural clinics

**Jasper - SW Virginia EMA:**
- Activate emergency operations center
- Establish backup communications
- Coordinate multi-county response

**Olympic - Shentel Communications:**
- Assess telecom infrastructure status
- Prioritize network restoration for emergency services
- Coordinate with other ISPs on regional connectivity

**Redwood - Food City:**
- Assess inventory system damage and data integrity
- Identify supply chain vulnerabilities from network outage
- Coordinate with VDOT on delivery logistics

**Sequoia - WDBJ7:**
- Provide accurate public information
- Counter emerging rumors on social media
- Coordinate with officials on messaging

**Shenandoah - VDOT:**
- Address highway message sign failures
- Support emergency vehicle routing
- Coordinate manual traffic control at critical intersections

**Yellowstone - Montgomery County:**
- Activate local emergency operations
- Coordinate with Blacksburg town government
- Support Virginia Tech campus response

**Yoho - VA DEQ:**
- Investigate environmental sensor failures in Wise County
- Assess whether monitoring gaps create compliance risks
- Coordinate with water treatment facilities on manual operations

**Yosemite - United Way:**
- Identify vulnerable populations needing welfare checks
- Prepare shelter/support resources
- Coordinate volunteer networks for community outreach

**Zion - Faith & Community Network:**
- Check on isolated residents via church networks
- Establish trusted community communication channels
- Support vulnerable populations in rural hollows

---

## Injects

Injects are stored in `phase_1_injects.csv`

### Mandatory Injects (25 total)

| Category | Count | Description |
|----------|-------|-------------|
| Initial Disruption | 6 | Network intrusions, system failures, access loss |
| Escalation | 5 | Attack spreading, new systems compromised |
| Opportunity | 4 | Chances to contain, coordinate, or gather intel |
| Information | 6 | Threat intelligence, status reports, public concerns |
| Resource | 4 | Equipment needs, personnel, budget decisions |

### Escalation Triggers

| Trigger Condition | Escalation Inject |
|-------------------|-------------------|
| No VT containment by 08:00 | Attack spreads to additional research partners |
| No Carilion backup procedures by 08:00 | Patient safety incident at rural clinic |
| No public communication by 08:00 | Rumors spread that "hospital is closed" |
| No grid isolation by 10:00 | Power fluctuations in Wise County |
| Teams don't share threat intel | Attack exploits information gaps |

---

## Constraints

### Time Constraints
- Phase duration: 60 minutes real-time = 48 hours simulated
- Critical decision deadline: ~08:00 sim-time (containment vs. continuity)
- Escalation trigger: ~10:00 sim-time (grid compromise if not contained)

### Budget Constraints
- Starting budgets as listed in sim_overview.md
- Emergency cybersecurity contractors cost 2x normal rates
- Federal reimbursement requires proper documentation

### Resource Constraints
- Cybersecurity experts: Limited (VT + CISA primary, few local resources)
- Hospital backup systems: Paper-based, incomplete records
- Rural clinic capacity: Already strained pre-crisis

### Information Constraints
- Known: Attack is ongoing, VT and Carilion affected
- Unknown: Attacker identity, full scope, attack objectives
- Unreliable: Initial damage assessments, system status reports

### Political/Legal Constraints
- HIPAA requirements complicate information sharing
- Research data may have federal classification issues
- Media attention level: MEDIUM, rising quickly

### Ethical Boundaries
- Patient privacy during crisis response
- Transparency vs. preventing panic
- Resource allocation between urban Roanoke and rural coalfields

---

## Technology Layer

### How AI/Technology Accelerates Harm
- Malware uses ML to evade signature-based detection
- Attack adapts to defensive responses faster than humans can react
- Automated systems fail simultaneously across connected networks
- Rural areas lack technical expertise to respond independently

### How AI/Technology Creates Asymmetry
- Attackers can probe thousands of vulnerabilities while defenders protect one-by-one
- Small attack team impacts 300,000 people through automation
- Urban centers have more cyber expertise than rural areas
- Sophisticated tools (possibly state-developed) used against civilian infrastructure

### How AI/Technology Enables Response
- AI-assisted threat hunting could identify attack patterns
- Automated network isolation could contain spread
- Telemedicine could support rural clinics (if networks restored)
- Virginia Tech's AI research capabilities are an asset

---

## Cascading Effects

### From Previous Phase
N/A - This is Phase 1

### To Next Phase
- **Data compromised:** Stolen patient data will appear in Phase 2, fueling privacy crisis
- **Communication established/failed:** Sets tone for Phase 2 information environment
- **Rural clinic status:** Determines healthcare and environmental response baseline for Phase 5
- **Trust built/lost:** Affects community cooperation in later phases

### Branching Scenarios

| If participants... | Then in next phase... |
|--------------------|----------------------|
| Contain quickly with transparency | Phase 2: Moderate disinfo, data breach limited |
| Contain quickly, poor communication | Phase 2: Severe rumors, "what are they hiding?" |
| Slow containment, good communication | Phase 2: More data stolen, but community trusts response |
| Slow containment, poor communication | Phase 2: Severe data breach + distrust crisis |
| Neglect rural clinics | Phase 5: Healthcare collapse and undetected environmental damage in coalfields |

---

## Facilitator Notes

### Key Learning Objectives
1. Understand how AI enhances cyber attack capabilities (adaptive malware)
2. Experience tension between containment and service continuity
3. Recognize urban-rural disparities in cyber resilience
4. See how interconnected systems create cascading vulnerabilities

### Common Participant Mistakes
- **Tech tunnel vision:** Focus only on the cyber problem, ignore patient impacts
- **Urban bias:** Prioritize Roanoke/Blacksburg, neglect coalfield counties
- **Information silos:** Don't share threat intelligence across organizations
- **Underestimate cascades:** Treat as isolated IT problem, not regional crisis

### Discussion Points for Debrief
- How did the AI-enhanced nature of the attack change your response?
- Who was affected by your decisions but had no voice in making them?
- What would you have done differently knowing what happens in later phases?
- How did geographic distance affect your situational awareness?

### Adjustment Levers
- **Easier:** Slower attack spread, clearer threat intelligence
- **Harder:** Faster escalation, more fog of war, conflicting reports
- **More coordination pressure:** Add cross-organization dependencies
- **More ethical tension:** Add injects about specific patients at risk
