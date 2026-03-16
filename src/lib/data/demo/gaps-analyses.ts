/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CAPABILITY GAPS & DOTMLPF ANALYSES — III Armored Corps
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * 10 Capability Gaps identified across the corps RS enterprise
 * 6 DOTMLPF Analyses completed for the highest-priority gaps
 *
 * ID Schemes:
 *   Gaps:     demo-4000-0000-0000-{12-digit seq}
 *   Analyses: demo-5000-0000-0000-{12-digit seq}
 */

import { PER } from "./personnel";

// ── Capability Gaps ──────────────────────────────────────────────────────

export const CAPABILITY_GAPS = [
  // ── 1. BN Command Post Integration Deficiency ─────────────────────────
  {
    id: "de004000-0000-0000-0000-000000000001",
    title: "BN Command Post Integration Deficiency",
    description:
      "Battalion UMTs are not integrated into command post battle rhythm events, resulting in chaplains being excluded from the MDMP and unable to provide timely RS input to commanders. Multiple NTC rotations have revealed that BN chaplains receive operational orders too late to synchronize RS coverage with maneuver plans.",
    operational_impact:
      "Soldiers in decisive action rotations go without RS coverage during critical phases because UMT movement and positioning are not coordinated with the maneuver plan. This degrades unit cohesion and spiritual readiness at the point of greatest need.",
    severity: "critical" as const,
    status: "under_analysis" as const,
    dotmlpf_domains: ["training", "organization"] as const,
    affected_echelons: ["battalion", "brigade"] as const,
    affected_compos: ["active"] as const,
    source_type: "oct_observation" as const,
    source_description:
      "NTC 26-02 and 26-04 rotation AARs; OC/T observations across three 1CD ABCT rotations identified consistent UMT exclusion from CP operations.",
    proposed_solution:
      "Revise BN battle rhythm SOP to include UMT in all MDMP working groups. Develop standardized UMT integration checklist for CP operations. Conduct quarterly UMT-specific CP integration training.",
    solution_pathway: "training_revision" as const,
    assigned_to: PER.CD_DIV_CH,
    doctrinal_references: [],
    source_ids: [],
  },

  // ── 2. Inadequate Corps-Level RS Planning Doctrine ────────────────────
  {
    id: "de004000-0000-0000-0000-000000000002",
    title: "Inadequate Corps-Level RS Planning Doctrine",
    description:
      "Current FM 16-1 guidance does not adequately address corps-level religious support planning for large-scale combat operations involving three or more divisions. The corps chaplain section lacks doctrinal frameworks for prioritizing RS resources across multiple simultaneous division operations and phasing RS support across extended frontages.",
    operational_impact:
      "During Warfighter Exercise 26-01, the corps chaplain section was unable to produce a synchronized RS annex that effectively allocated RS coverage across all three divisions, resulting in ad hoc coordination and gaps in coverage for the supporting effort division.",
    severity: "significant" as const,
    status: "documented" as const,
    dotmlpf_domains: ["doctrine"] as const,
    affected_echelons: ["corps", "division"] as const,
    affected_compos: ["active"] as const,
    source_type: "cer_trend" as const,
    source_description:
      "WFX 26-01 AAR; corps chaplain section CER trend analysis across three consecutive WFX events showing consistent shortfall in corps-level RS planning products.",
    proposed_solution:
      "Develop corps-level RS planning annex template and submit doctrine change recommendation (DCR) to USACHCS for FM 16-1 revision. Interim solution: publish III Corps RS planning SOP with corps-specific planning considerations.",
    solution_pathway: "dcr" as const,
    assigned_to: PER.CORPS_DEPUTY,
    doctrinal_references: [],
    source_ids: [],
  },

  // ── 3. 56M Force Protection Training Gap ──────────────────────────────
  {
    id: "de004000-0000-0000-0000-000000000003",
    title: "56M Force Protection Training Gap",
    description:
      "Religious Affairs Specialists (56M) across the corps lack standardized force protection training for LSCO environments. Current 56M NCOES curriculum emphasizes stability operations FP procedures but does not address threat-appropriate security measures for high-intensity combat. BN-level 56M NCOs are not proficient in tactical convoy operations, hasty defensive positions, or CP security integration.",
    operational_impact:
      "UMTs operating forward in NTC decisive action rotations have experienced simulated casualties at rates significantly higher than other staff elements due to inadequate tactical movement techniques and position selection.",
    severity: "significant" as const,
    status: "identified" as const,
    dotmlpf_domains: ["training"] as const,
    affected_echelons: ["battalion", "brigade"] as const,
    affected_compos: ["active"] as const,
    source_type: "oct_observation" as const,
    source_description:
      "NTC OC/T trend data compiled across FY25 rotations; CALL Newsletter 25-07 on UMT survivability in LSCO.",
    proposed_solution:
      "Develop 56M LSCO force protection training package for integration into pre-CTC gunnery density. Coordinate with USACHCS to update 56M NCOES POI with LSCO-specific FP modules.",
    solution_pathway: "training_revision" as const,
    assigned_to: PER.CORPS_SGM,
    doctrinal_references: [],
    source_ids: [],
  },

  // ── 4. Religious Area Analysis Capability ─────────────────────────────
  {
    id: "de004000-0000-0000-0000-000000000004",
    title: "Religious Area Analysis Capability",
    description:
      "Division and brigade UMTs lack training and tools to conduct systematic Religious Area Analysis (RAA) that integrates with the intelligence preparation of the battlefield (IPB) process. Chaplains are producing narrative-only religious assessments that do not conform to doctrinal graphic overlay standards and cannot be integrated into the COP.",
    operational_impact:
      "Commanders are not receiving actionable religious terrain analysis during the IPB process, reducing their ability to anticipate population-centric considerations during operations and potentially creating friction with local religious communities in the area of operations.",
    severity: "moderate" as const,
    status: "under_analysis" as const,
    dotmlpf_domains: ["training", "doctrine"] as const,
    affected_echelons: ["brigade", "division"] as const,
    affected_compos: ["active"] as const,
    source_type: "compass_trend" as const,
    source_description:
      "COMPASS assessment data from 1AD BDE UMTs showing low proficiency in RAA task completion; corroborated by WFX 26-01 observations.",
    proposed_solution:
      "Develop standardized RAA template and overlay SOP aligned with ATP 2-01.3 IPB methodology. Conduct division-level RAA training event during next STAFFEX window.",
    solution_pathway: "multiple" as const,
    assigned_to: PER.AD_DIV_CH,
    doctrinal_references: [],
    source_ids: [],
  },

  // ── 5. Spiritual Readiness Assessment Standardization ─────────────────
  {
    id: "de004000-0000-0000-0000-000000000005",
    title: "Spiritual Readiness Assessment Standardization",
    description:
      "There is no standardized methodology for assessing and reporting spiritual readiness across the corps. Each division uses different metrics and reporting formats, making it impossible to aggregate data at the corps level for trend analysis. The absence of a common assessment framework prevents the corps chaplain section from identifying systemic spiritual readiness issues across the formation.",
    operational_impact:
      "The corps commander receives inconsistent and non-comparable spiritual readiness data from subordinate divisions, limiting the ability to prioritize RS resources and identify units at greatest risk for morale and cohesion degradation prior to deployment.",
    severity: "moderate" as const,
    status: "identified" as const,
    dotmlpf_domains: ["doctrine", "policy"] as const,
    affected_echelons: ["battalion", "brigade", "division", "corps"] as const,
    affected_compos: ["active"] as const,
    source_type: "gauge_trend" as const,
    source_description:
      "Corps RS gauge data review revealing incompatible metrics across three divisions; 1ID Division Chaplain initiated analysis following FY25 SRF-A data review.",
    proposed_solution:
      "Develop III Corps Spiritual Readiness Assessment SOP establishing common metrics, collection methodology, and reporting format. Submit policy recommendation to OCCH for Army-wide standardization consideration.",
    solution_pathway: "policy_change" as const,
    assigned_to: PER.ID_DIV_CH,
    doctrinal_references: [],
    source_ids: [],
  },

  // ── 6. CTOF Management in Dispersed Operations ────────────────────────
  {
    id: "de004000-0000-0000-0000-000000000006",
    title: "CTOF Management in Dispersed Operations",
    description:
      "UMTs are unable to effectively manage the Chaplain's Toolkit of Faith (CTOF) during dispersed operations across extended frontages. Current CTOF configuration assumes centralized BN operations with regular resupply access. In LSCO scenarios requiring company-level dispersion over 50+ km frontages, UMTs cannot carry sufficient ecclesiastical supplies and RS materials to provide comprehensive coverage.",
    operational_impact:
      "During NTC rotation 26-04, 1CD 3ABCT UMTs were unable to conduct worship services at two of five company positions due to insufficient communion elements and worship materials, requiring Soldiers to travel to the BN trains area and increasing exposure to simulated enemy fires.",
    severity: "significant" as const,
    status: "documented" as const,
    dotmlpf_domains: ["training", "materiel"] as const,
    affected_echelons: ["battalion", "brigade"] as const,
    affected_compos: ["active"] as const,
    source_type: "oct_observation" as const,
    source_description:
      "NTC 26-04 AAR; 1CD 3ABCT BDE UMT after-action observations on CTOF distribution challenges in dispersed decisive action.",
    proposed_solution:
      "Develop dispersed-operations CTOF configuration guide with modular packing lists scaled to company, platoon, and BN echelons. Submit materiel change request for lightweight, field-expedient communion kits suitable for distribution to company-level elements.",
    solution_pathway: "multiple" as const,
    assigned_to: PER.CD_DIV_CH,
    doctrinal_references: [],
    source_ids: [],
  },

  // ── 7. Division-Level Religious Liaison with POLAD ────────────────────
  {
    id: "de004000-0000-0000-0000-000000000007",
    title: "Division-Level Religious Liaison with POLAD",
    description:
      "Division chaplain sections lack established procedures for coordinating with the Political Advisor (POLAD) and Civil Affairs elements on religious engagement activities. There is no doctrinal framework for deconflicting religious leader engagement (RLE) activities between the chaplain section, POLAD, and CA teams, leading to duplicated efforts and potential messaging inconsistencies.",
    operational_impact:
      "During combined exercises with allied partners, 1AD experienced instances where the division chaplain and POLAD independently engaged the same religious leaders with uncoordinated messaging, creating confusion among host-nation counterparts and undermining U.S. credibility in the religious engagement space.",
    severity: "moderate" as const,
    status: "identified" as const,
    dotmlpf_domains: ["training", "leadership_education"] as const,
    affected_echelons: ["division"] as const,
    affected_compos: ["active"] as const,
    source_type: "cer_trend" as const,
    source_description:
      "1AD CER from Exercise Iron Focus 25; corroborated by CALL best practices report on RLE coordination in MNF environments.",
    proposed_solution:
      "Develop division-level RLE coordination SOP integrating chaplain section, POLAD, and CA equities. Include RLE deconfliction procedures in division-level MDMP training. Recommend CGSC elective on religious engagement coordination.",
    solution_pathway: "multiple" as const,
    assigned_to: PER.AD_DIV_DEPUTY,
    doctrinal_references: [],
    source_ids: [],
  },

  // ── 8. Mass Casualty RS Coordination Across BCTs ──────────────────────
  {
    id: "de004000-0000-0000-0000-000000000008",
    title: "Mass Casualty RS Coordination Across BCTs",
    description:
      "The corps lacks a standardized framework for coordinating religious support during mass casualty (MASCAL) events that span multiple BCTs or cross division boundaries. Current MASCAL SOPs address medical evacuation and triage but do not include provisions for UMT surge operations, casualty notification ministry, or RS handoff procedures between units when casualties are evacuated across unit boundaries.",
    operational_impact:
      "During WFX 26-01, a simulated MASCAL event affecting elements of two different BCTs resulted in no UMT coverage at the Role 2 facility for over four hours because neither BCT's RS plan accounted for cross-boundary RS coordination. Simulated KIA notification ministry was delayed by 12+ hours due to lack of procedures.",
    severity: "critical" as const,
    status: "in_progress" as const,
    dotmlpf_domains: ["training", "organization"] as const,
    affected_echelons: ["battalion", "brigade", "division"] as const,
    affected_compos: ["active"] as const,
    source_type: "cer_trend" as const,
    source_description:
      "WFX 26-01 AAR critical finding; validated by NTC 26-02 observations; identified as corps-level systemic issue by Corps Chaplain Section trend analysis.",
    proposed_solution:
      "Develop corps-level MASCAL RS coordination SOP with cross-boundary handoff procedures. Integrate UMT MASCAL rehearsals into division and corps MASCAL exercises. Establish RS liaison procedures at Role 2 and Role 3 medical facilities.",
    solution_pathway: "multiple" as const,
    assigned_to: PER.CORPS_CH,
    doctrinal_references: [],
    source_ids: [],
  },

  // ── 9. Signature Management During Worship in LSCO ────────────────────
  {
    id: "de004000-0000-0000-0000-000000000009",
    title: "Signature Management During Worship in LSCO",
    description:
      "UMTs conducting worship services and RS activities in LSCO environments are creating detectable electromagnetic and physical signatures that compromise unit tactical positions. Chaplains are not trained on signature management techniques specific to RS activities, including the electromagnetic signature of amplified worship, thermal signatures of gathered personnel, and pattern-of-life indicators created by predictable worship schedules.",
    operational_impact:
      "NTC OC/Ts have assessed that UMT-conducted worship services created signature patterns that would be detectable by peer-threat ISR capabilities, potentially compromising BN assembly area locations and creating targeting opportunities for adversary long-range precision fires.",
    severity: "significant" as const,
    status: "identified" as const,
    dotmlpf_domains: ["training", "doctrine"] as const,
    affected_echelons: ["battalion", "brigade"] as const,
    affected_compos: ["active"] as const,
    source_type: "oct_observation" as const,
    source_description:
      "NTC OC/T observations across FY25-26 rotations; TRADOC peer-threat signature analysis brief to USACHCS, March 2025.",
    proposed_solution:
      "Develop UMT signature management TTP guide addressing worship service OPSEC in LSCO. Integrate signature management training into pre-CTC UMT certification lane. Update FM 16-1 to address signature considerations for RS operations.",
    solution_pathway: "multiple" as const,
    assigned_to: PER.CD_1ABCT_CH,
    doctrinal_references: [],
    source_ids: [],
  },

  // ── 10. Religious Logistics Resupply Chain Continuity ──────────────────
  {
    id: "de004000-0000-0000-0000-000000000010",
    title: "Religious Logistics Resupply Chain Continuity",
    description:
      "The sustainment enterprise does not account for religious supplies (communion elements, worship materials, ecclesiastical items) in Class I or Class X resupply planning. UMTs rely on informal procurement channels and personal purchase to maintain RS material stocks. There is no established demand signal process for religious supplies through the standard Army logistics system, resulting in stockage gaps during extended field operations.",
    operational_impact:
      "Multiple BN UMTs across the corps have reported exhausting RS consumable supplies within 72 hours of entering field operations with no established resupply mechanism, forcing chaplains to either cease certain worship practices or divert tactical logistics assets for RS material procurement.",
    severity: "moderate" as const,
    status: "identified" as const,
    dotmlpf_domains: ["training", "materiel"] as const,
    affected_echelons: ["battalion", "brigade"] as const,
    affected_compos: ["active"] as const,
    source_type: "readiness_gap" as const,
    source_description:
      "1AD Sustainment BDE RS logistics survey; corroborated by 1CD and 1ID UMT readiness reports showing Class X shortfalls during FY25 CTC rotations.",
    proposed_solution:
      "Coordinate with G4/S4 channels to establish RS material demand signal process. Develop RS logistics annex template for inclusion in sustainment orders. Identify Class X items for inclusion in unit basic load calculations.",
    solution_pathway: "multiple" as const,
    assigned_to: PER.AD_SUST_CH,
    doctrinal_references: [],
    source_ids: [],
  },
];

// ── DOTMLPF Analyses ─────────────────────────────────────────────────────

export const DOTMLPF_ANALYSES = [
  // ── Gap 1: BN CP Integration — Training Domain ────────────────────────
  {
    id: "de005000-0000-0000-0000-000000000001",
    gap_id: "de004000-0000-0000-0000-000000000001",
    domain: "training" as const,
    current_state:
      "BN UMTs receive no formal training on CP integration procedures during CHBOLC, CCC, or unit-level training. Chaplains are expected to self-integrate into the CP battle rhythm but lack understanding of the MDMP timeline, staff running estimate requirements, and how to provide RS input to OPORD Annex F (formerly Annex Q). Most BN chaplains attend planning meetings as observers rather than contributing staff officers.",
    desired_state:
      "BN UMTs are fully integrated into CP battle rhythm events as contributing staff members. Chaplains produce RS running estimates, provide RS input during COA development, and publish RS synchronization matrices that are incorporated into the BN OPORD. UMTs complete CP integration certification prior to CTC rotations.",
    gap_assessment:
      "The training gap stems from the absence of a BN-level CP integration training program within institutional and unit training frameworks. CHBOLC addresses MDMP participation at a conceptual level but does not provide hands-on CP integration repetitions. Unit-level training rarely includes UMT-specific lanes during STAFFEX or CPX events, leaving chaplains to develop CP integration skills through on-the-job experience with inconsistent results.",
    recommended_action:
      "Develop a 40-hour BN UMT CP Integration Training Package for delivery at division level during pre-CTC train-up. Coordinate with USACHCS to integrate practical CP exercises into CHBOLC Phase 3 and CH-CCC curricula. Publish a UMT CP Integration Smartcard covering battle rhythm events, running estimate templates, and OPORD input timelines.",
    data_source: "NTC 26-02 and 26-04 AAR observations; CALL CTC Trends FY25; 1CD Division Chaplain Section assessment",
    confidence_level: "high" as const,
    analyst_id: PER.CD_DIV_DEPUTY,
  },

  // ── Gap 1: BN CP Integration — Organization Domain ────────────────────
  {
    id: "de005000-0000-0000-0000-000000000002",
    gap_id: "de004000-0000-0000-0000-000000000001",
    domain: "organization" as const,
    current_state:
      "BN UMTs are organizationally assigned to the BN HHC but not formally designated as members of the BN staff planning cell. TOE does not specify UMT placement within the CP layout or designate the UMT as a mandatory participant in planning working groups. BN XOs and S3s inconsistently include UMTs in CP personnel tracking and shift schedules.",
    desired_state:
      "BN UMTs are formally designated as special staff members with specified roles in the BN planning cell. TOE or MTOE documentation reflects UMT integration into CP operations. BN SOP templates include UMT as mandatory participants in specified working groups (targeting, civil-military, fires, sustainment sync).",
    gap_assessment:
      "The organizational gap is secondary to the training gap but reinforces it. Without formal organizational designation as CP staff members, UMT inclusion depends entirely on individual BN commander preferences. This creates inconsistent integration across the formation and means UMT exclusion from CP operations is a structural norm rather than an exception requiring correction.",
    recommended_action:
      "Publish III Corps policy letter directing all subordinate BNs to include UMTs as designated participants in specified MDMP working groups. Coordinate with HQDA DAMO-FMF to evaluate MTOE modification adding UMT to BN staff planning cell. Develop model BN SOP language for UMT CP integration as a near-term organizational solution.",
    data_source: "1CD Division Chaplain Section BN UMT survey; NTC OC/T organizational assessments; FM 6-0 staff integration analysis",
    confidence_level: "medium" as const,
    analyst_id: PER.CD_DIV_CH,
  },

  // ── Gap 2: Corps RS Planning — Doctrine Domain ────────────────────────
  {
    id: "de005000-0000-0000-0000-000000000003",
    gap_id: "de004000-0000-0000-0000-000000000002",
    domain: "doctrine" as const,
    current_state:
      "FM 16-1 (Religious Support) addresses RS planning primarily at division level and below. Corps-level RS planning guidance consists of a single paragraph referencing the need to synchronize RS across subordinate units without providing methodology, templates, or decision frameworks. ATP 1-05.01 and ATP 1-05.02 similarly lack corps-echelon planning specificity. The corps chaplain section relies on locally developed products that vary with each staff rotation.",
    desired_state:
      "Published doctrine provides corps-level RS planning methodology including: RS resource allocation framework for multi-division operations, RS synchronization matrix template scalable to corps-level frontages, RS priority of support decision matrix aligned with corps decisive-shaping-sustaining framework, and RS assessment criteria for evaluating coverage across the corps area of operations.",
    gap_assessment:
      "The doctrinal gap is foundational — without published corps-level RS planning doctrine, each corps chaplain section develops ad hoc planning products that lack consistency and are not transferable between staff rotations. WFX observations confirm that the absence of doctrinal frameworks results in RS planning that is reactive rather than deliberate at corps echelon, with RS coverage gaps consistently appearing in the supporting effort area.",
    recommended_action:
      "Submit a Doctrine Change Recommendation (DCR) to USACHCS proposing a new chapter or appendix to FM 16-1 addressing corps-level RS planning. In the interim, develop and publish a III Corps RS Planning SOP that serves as a proof-of-concept for the proposed doctrinal change. Coordinate with FORSCOM Chaplain to validate the approach across other corps-level formations.",
    data_source: "WFX 26-01 AAR; FM 16-1 / ATP 1-05.01 / ATP 1-05.02 doctrinal review; FORSCOM Chaplain guidance memorandum",
    confidence_level: "high" as const,
    analyst_id: PER.CORPS_DEPUTY,
  },

  // ── Gap 6: CTOF Dispersed Ops — Training Domain ───────────────────────
  {
    id: "de005000-0000-0000-0000-000000000004",
    gap_id: "de004000-0000-0000-0000-000000000006",
    domain: "training" as const,
    current_state:
      "UMTs receive CTOF familiarization during CHBOLC but training assumes a single BN-centric operating environment where the chaplain maintains all ecclesiastical supplies at one location. There is no training on CTOF distribution planning for dispersed operations, modular packing configurations for multi-site coverage, or pre-positioning techniques for extended field operations across wide frontages.",
    desired_state:
      "UMTs are trained on CTOF management for dispersed operations including: modular CTOF packing lists scaled to company/platoon/BN echelons, pre-positioning and caching techniques for RS materials along planned movement corridors, consumption rate planning for extended field operations, and coordination procedures for RS material resupply through standard logistics channels.",
    gap_assessment:
      "The training gap is significant because LSCO doctrine requires BN-level dispersion across frontages that exceed a single UMT's ability to provide RS coverage from a central location. Current CTOF training does not prepare chaplains to plan for decentralized RS delivery. NTC observations show that UMTs who attempted to distribute materials to company positions did so without planning frameworks, resulting in uneven distribution and early exhaustion of supplies at some locations.",
    recommended_action:
      "Develop a CTOF Dispersed Operations Training Module for inclusion in division-level pre-CTC UMT training. Create modular CTOF packing list templates for company, platoon, and BN configurations. Coordinate with USACHCS to update CHBOLC CTOF training to include dispersed operations scenarios.",
    data_source: "NTC 26-04 AAR; 1CD 3ABCT BDE UMT observations; USACHCS CTOF program of instruction review",
    confidence_level: "high" as const,
    analyst_id: PER.CD_3ABCT_CH,
  },

  // ── Gap 6: CTOF Dispersed Ops — Materiel Domain ───────────────────────
  {
    id: "de005000-0000-0000-0000-000000000005",
    gap_id: "de004000-0000-0000-0000-000000000006",
    domain: "materiel" as const,
    current_state:
      "The standard CTOF is configured as a single container system designed for BN-level centralized operations. The kit weighs approximately 45 lbs and is not designed for subdivision into smaller packages. Communion elements, worship bulletins, and ecclesiastical supplies are packaged in bulk formats that cannot be easily portioned for distribution to dispersed company positions. There is no lightweight, field-expedient alternative for forward-positioned RS materials.",
    desired_state:
      "A modular CTOF system is available that allows chaplains to configure RS material packages at company and platoon scale. Individual worship kits weighing under 10 lbs are available for pre-positioning at company positions. Communion elements are available in individual or fire-team-sized pre-packaged portions suitable for distribution through Class I resupply channels.",
    gap_assessment:
      "The materiel gap directly compounds the training gap. Even with improved planning, UMTs cannot effectively distribute RS materials to dispersed positions because the physical configuration of the CTOF does not support modular breakdown. The bulk packaging of consumable RS supplies (communion wafers, juice, candles) requires the chaplain to manually portion materials in field conditions, which is time-consuming and wasteful.",
    recommended_action:
      "Submit a materiel change request to PEO Soldier for development of a modular CTOF system with nested sub-kits at company and platoon scale. In the interim, develop a locally-produced modular CTOF insert system using commercial off-the-shelf containers. Coordinate with the DLA for individual-portion communion element procurement.",
    data_source: "CTOF technical specifications review; NTC 26-04 UMT logistics observations; PEO Soldier equipment catalog analysis",
    confidence_level: "medium" as const,
    analyst_id: PER.CD_DIV_CH,
  },

  // ── Gap 8: MASCAL RS Coordination — Training Domain ───────────────────
  {
    id: "de005000-0000-0000-0000-000000000006",
    gap_id: "de004000-0000-0000-0000-000000000008",
    domain: "training" as const,
    current_state:
      "UMTs do not participate in MASCAL rehearsals at any echelon. MASCAL exercises focus on medical triage, evacuation, and surgical procedures but do not include RS roles such as ministry of presence at collection points, casualty notification coordination, or memorial affairs spiritual support. BDE and BN UMTs have no trained procedures for RS surge operations when casualties exceed a single UMT's capacity, and there are no rehearsed handoff procedures for RS continuity when casualties cross unit boundaries.",
    desired_state:
      "UMTs are integrated into all MASCAL rehearsals from BN through corps level. UMTs have rehearsed RS surge procedures including cross-boundary RS coordination, RS coverage at Role 1 through Role 3 medical facilities, and casualty notification ministry handoff procedures. Division and corps chaplain sections maintain RS MASCAL response plans that can be activated within 30 minutes of a MASCAL declaration.",
    gap_assessment:
      "The training gap is critical because MASCAL events create the highest-demand RS scenarios and current training does not prepare UMTs for these situations. WFX 26-01 demonstrated that without rehearsed procedures, UMTs default to their organic unit coverage and do not self-coordinate cross-boundary RS support. The absence of UMT integration in medical MASCAL exercises means that RS considerations are not incorporated into triage and evacuation planning, resulting in casualties being evacuated to facilities without RS coverage.",
    recommended_action:
      "Direct all subordinate units to integrate UMTs into existing MASCAL rehearsal programs. Develop a corps-level RS MASCAL Response SOP with specific trigger points, notification procedures, and cross-boundary coordination requirements. Conduct a corps-level RS MASCAL tabletop exercise within 90 days to validate procedures before integration into the next WFX cycle.",
    data_source: "WFX 26-01 critical AAR finding; NTC 26-02 MASCAL exercise observations; MEDCOM MASCAL exercise participation data",
    confidence_level: "high" as const,
    analyst_id: PER.CORPS_DEPUTY,
  },
];
