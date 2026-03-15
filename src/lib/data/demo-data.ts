/**
 * CHC Digital Ecosystem — Demo Dataset
 * 1st Cavalry Division (1CD) — Fort Cavazos
 */

// Deterministic UUIDs for demo data
const ORG = {
  div: "demo-0001-0001-0001-000000000001",
  bde1: "demo-0001-0001-0001-000000000010",
  bde2: "demo-0001-0001-0001-000000000020",
  bde3: "demo-0001-0001-0001-000000000030",
  divarty: "demo-0001-0001-0001-000000000040",
  bn1a: "demo-0001-0001-0001-000000000011",
  bn1b: "demo-0001-0001-0001-000000000012",
  bn2a: "demo-0001-0001-0001-000000000021",
  bn2b: "demo-0001-0001-0001-000000000022",
  bn3a: "demo-0001-0001-0001-000000000031",
  bn3b: "demo-0001-0001-0001-000000000032",
  bn4a: "demo-0001-0001-0001-000000000041",
  bn4b: "demo-0001-0001-0001-000000000042",
};

const PER = {
  divCh: "demo-0002-0001-0001-000000000001",
  divRas: "demo-0002-0001-0001-000000000002",
  bde1Ch: "demo-0002-0001-0001-000000000010",
  bde2Ch: "demo-0002-0001-0001-000000000020",
  bde3Ch: "demo-0002-0001-0001-000000000030",
  divartyCh: "demo-0002-0001-0001-000000000040",
  bn1aCh: "demo-0002-0001-0001-000000000011",
  bn1aRas: "demo-0002-0001-0001-000000000012",
  bn1bCh: "demo-0002-0001-0001-000000000013",
  bn2aCh: "demo-0002-0001-0001-000000000021",
  bn2aRas: "demo-0002-0001-0001-000000000022",
  bn2bCh: "demo-0002-0001-0001-000000000023",
  bn3aCh: "demo-0002-0001-0001-000000000031",
  bn3aRas: "demo-0002-0001-0001-000000000032",
  bn3bCh: "demo-0002-0001-0001-000000000033",
  bn4aRas: "demo-0002-0001-0001-000000000041",
};

const EVT = {
  e1: "demo-0003-0001-0001-000000000001",
  e2: "demo-0003-0001-0001-000000000002",
  e3: "demo-0003-0001-0001-000000000003",
  e4: "demo-0003-0001-0001-000000000004",
  e5: "demo-0003-0001-0001-000000000005",
  e6: "demo-0003-0001-0001-000000000006",
  e7: "demo-0003-0001-0001-000000000007",
  e8: "demo-0003-0001-0001-000000000008",
  e9: "demo-0003-0001-0001-000000000009",
  e10: "demo-0003-0001-0001-000000000010",
  e11: "demo-0003-0001-0001-000000000011",
  e12: "demo-0003-0001-0001-000000000012",
};

const OBS = {
  o1: "demo-0004-0001-0001-000000000001",
  o2: "demo-0004-0001-0001-000000000002",
  o3: "demo-0004-0001-0001-000000000003",
  o4: "demo-0004-0001-0001-000000000004",
  o5: "demo-0004-0001-0001-000000000005",
  o6: "demo-0004-0001-0001-000000000006",
};

const GAP = {
  g1: "demo-0005-0001-0001-000000000001",
  g2: "demo-0005-0001-0001-000000000002",
  g3: "demo-0005-0001-0001-000000000003",
  g4: "demo-0005-0001-0001-000000000004",
};

const ANA = {
  a1: "demo-0006-0001-0001-000000000001",
  a2: "demo-0006-0001-0001-000000000002",
  a3: "demo-0006-0001-0001-000000000003",
};

const IDP_ID = {
  i1: "demo-0007-0001-0001-000000000001",
  i2: "demo-0007-0001-0001-000000000002",
};

const CYC = "demo-0008-0001-0001-000000000001";
const CR = {
  r1: "demo-0009-0001-0001-000000000001",
  r2: "demo-0009-0001-0001-000000000002",
  r3: "demo-0009-0001-0001-000000000003",
  r4: "demo-0009-0001-0001-000000000004",
  r5: "demo-0009-0001-0001-000000000005",
};

export const DEMO_DATA = {
  organizations: [
    { id: ORG.div, uic: "W0V5AA", name: "1st Cavalry Division UMT", echelon: "division", parent_org_id: null, compo: "active", installation: "Fort Cavazos", is_active: true },
    { id: ORG.bde1, uic: "W0V6AA", name: "1st ABCT UMT (Ironhorse)", echelon: "brigade", parent_org_id: ORG.div, compo: "active", installation: "Fort Cavazos", is_active: true },
    { id: ORG.bde2, uic: "W0V7AA", name: "2nd ABCT UMT (Black Jack)", echelon: "brigade", parent_org_id: ORG.div, compo: "active", installation: "Fort Cavazos", is_active: true },
    { id: ORG.bde3, uic: "W0V8AA", name: "3rd ABCT UMT (Greywolf)", echelon: "brigade", parent_org_id: ORG.div, compo: "active", installation: "Fort Cavazos", is_active: true },
    { id: ORG.divarty, uic: "W0V9AA", name: "DIVARTY UMT", echelon: "brigade", parent_org_id: ORG.div, compo: "active", installation: "Fort Cavazos", is_active: true },
    { id: ORG.bn1a, uic: "W1V1AA", name: "1-12 CAV BN UMT", echelon: "battalion", parent_org_id: ORG.bde1, compo: "active", installation: "Fort Cavazos", is_active: true },
    { id: ORG.bn1b, uic: "W1V2AA", name: "2-5 CAV BN UMT", echelon: "battalion", parent_org_id: ORG.bde1, compo: "active", installation: "Fort Cavazos", is_active: true },
    { id: ORG.bn2a, uic: "W2V1AA", name: "1-5 CAV BN UMT", echelon: "battalion", parent_org_id: ORG.bde2, compo: "active", installation: "Fort Cavazos", is_active: true },
    { id: ORG.bn2b, uic: "W2V2AA", name: "1-8 CAV BN UMT", echelon: "battalion", parent_org_id: ORG.bde2, compo: "active", installation: "Fort Cavazos", is_active: true },
    { id: ORG.bn3a, uic: "W3V1AA", name: "3-8 CAV BN UMT", echelon: "battalion", parent_org_id: ORG.bde3, compo: "active", installation: "Fort Cavazos", is_active: true },
    { id: ORG.bn3b, uic: "W3V2AA", name: "1-3 CAV BN UMT", echelon: "battalion", parent_org_id: ORG.bde3, compo: "active", installation: "Fort Cavazos", is_active: true },
    { id: ORG.bn4a, uic: "W4V1AA", name: "2-82 FA BN UMT", echelon: "battalion", parent_org_id: ORG.divarty, compo: "active", installation: "Fort Cavazos", is_active: true },
    { id: ORG.bn4b, uic: "W4V2AA", name: "3-16 FA BN UMT", echelon: "battalion", parent_org_id: ORG.divarty, compo: "active", installation: "Fort Cavazos", is_active: true },
  ],

  personnel: [
    { id: PER.divCh, org_id: ORG.div, rank: "COL", last_name: "Richardson", first_name: "James", mos: "56A", position_title: "Division Chaplain", duty_status: "present", is_active: true },
    { id: PER.divRas, org_id: ORG.div, rank: "SGM", last_name: "Torres", first_name: "Maria", mos: "56M", position_title: "Division RAS NCOIC", duty_status: "present", is_active: true },
    { id: PER.bde1Ch, org_id: ORG.bde1, rank: "LTC", last_name: "Washington", first_name: "David", mos: "56A", position_title: "1st ABCT Chaplain", duty_status: "present", is_active: true },
    { id: PER.bde2Ch, org_id: ORG.bde2, rank: "MAJ", last_name: "Kim", first_name: "Sarah", mos: "56A", position_title: "2nd ABCT Chaplain", duty_status: "present", is_active: true },
    { id: PER.bde3Ch, org_id: ORG.bde3, rank: "MAJ", last_name: "Okonkwo", first_name: "Emmanuel", mos: "56A", position_title: "3rd ABCT Chaplain", duty_status: "tdy", is_active: true },
    { id: PER.divartyCh, org_id: ORG.divarty, rank: "MAJ", last_name: "Martinez", first_name: "Carlos", mos: "56A", position_title: "DIVARTY Chaplain", duty_status: "present", is_active: true },
    { id: PER.bn1aCh, org_id: ORG.bn1a, rank: "CPT", last_name: "Williams", first_name: "Michael", mos: "56A", position_title: "BN Chaplain", duty_status: "present", is_active: true },
    { id: PER.bn1aRas, org_id: ORG.bn1a, rank: "SSG", last_name: "Johnson", first_name: "Robert", mos: "56M", position_title: "BN RAS NCOIC", duty_status: "present", is_active: true },
    { id: PER.bn1bCh, org_id: ORG.bn1b, rank: "CPT", last_name: "Chen", first_name: "David", mos: "56A", position_title: "BN Chaplain", duty_status: "present", is_active: true },
    { id: PER.bn2aCh, org_id: ORG.bn2a, rank: "CPT", last_name: "Brooks", first_name: "Amanda", mos: "56A", position_title: "BN Chaplain", duty_status: "present", is_active: true },
    { id: PER.bn2aRas, org_id: ORG.bn2a, rank: "SFC", last_name: "Davis", first_name: "Marcus", mos: "56M", position_title: "BN RAS NCOIC", duty_status: "present", is_active: true },
    { id: PER.bn2bCh, org_id: ORG.bn2b, rank: "1LT", last_name: "Patel", first_name: "Ananya", mos: "56A", position_title: "BN Chaplain", duty_status: "present", is_active: true },
    { id: PER.bn3aCh, org_id: ORG.bn3a, rank: "CPT", last_name: "Jackson", first_name: "Terrence", mos: "56A", position_title: "BN Chaplain", duty_status: "present", is_active: true },
    { id: PER.bn3aRas, org_id: ORG.bn3a, rank: "SGT", last_name: "Lopez", first_name: "Sofia", mos: "56M", position_title: "BN RAS", duty_status: "deployed", is_active: true },
    { id: PER.bn3bCh, org_id: ORG.bn3b, rank: "CPT", last_name: "Anderson", first_name: "Eric", mos: "56A", position_title: "BN Chaplain", duty_status: "present", is_active: true },
    { id: PER.bn4aRas, org_id: ORG.bn4a, rank: "SSG", last_name: "Miller", first_name: "Jason", mos: "56M", position_title: "BN RAS NCOIC", duty_status: "present", is_active: true },
  ],

  training_events: [
    { id: EVT.e1, org_id: ORG.bn1a, task_id: "16-BN-3801", date: "2025-10-15", location: "Fort Cavazos", context: "garrison", rating: "T", attendee_ids: [PER.bn1aCh, PER.bn1aRas] },
    { id: EVT.e2, org_id: ORG.bn1a, task_id: "16-BN-3802", date: "2025-11-03", location: "Fort Cavazos", context: "stx", rating: "P", attendee_ids: [PER.bn1aCh, PER.bn1aRas] },
    { id: EVT.e3, org_id: ORG.bn1b, task_id: "16-BN-3801", date: "2025-11-12", location: "Fort Cavazos", context: "garrison", rating: "T", attendee_ids: [PER.bn1bCh] },
    { id: EVT.e4, org_id: ORG.bn2a, task_id: "16-BN-3807", date: "2025-12-01", location: "NTC", context: "ctc", rating: "T_minus", attendee_ids: [PER.bn2aCh, PER.bn2aRas] },
    { id: EVT.e5, org_id: ORG.bn2a, task_id: "16-BN-3801", date: "2025-12-10", location: "NTC", context: "ctc", rating: "T", attendee_ids: [PER.bn2aCh, PER.bn2aRas] },
    { id: EVT.e6, org_id: ORG.bn2b, task_id: "16-BN-3802", date: "2026-01-08", location: "Fort Cavazos", context: "garrison", rating: "U", attendee_ids: [PER.bn2bCh] },
    { id: EVT.e7, org_id: ORG.bn3a, task_id: "16-BN-3801", date: "2026-01-15", location: "Fort Cavazos", context: "ftx", rating: "P", attendee_ids: [PER.bn3aCh, PER.bn3aRas] },
    { id: EVT.e8, org_id: ORG.bn3a, task_id: "16-5-2002", date: "2026-01-22", location: "Fort Cavazos", context: "garrison", rating: "T", attendee_ids: [PER.bn3aCh] },
    { id: EVT.e9, org_id: ORG.bn3b, task_id: "16-BN-3802", date: "2026-02-05", location: "Fort Cavazos", context: "stx", rating: "P_minus", attendee_ids: [PER.bn3bCh] },
    { id: EVT.e10, org_id: ORG.bde1, task_id: "16-BDE-4000", date: "2026-02-12", location: "Fort Cavazos", context: "cpx", rating: "P", attendee_ids: [PER.bde1Ch, PER.bn1aCh, PER.bn1bCh] },
    { id: EVT.e11, org_id: ORG.bn1a, task_id: "16-BN-3807", date: "2026-02-20", location: "Fort Cavazos", context: "stx", rating: "T_minus", attendee_ids: [PER.bn1aCh, PER.bn1aRas] },
    { id: EVT.e12, org_id: ORG.bn2a, task_id: "16-BN-3802", date: "2026-03-01", location: "Fort Cavazos", context: "garrison", rating: "U", attendee_ids: [PER.bn2aCh] },
  ],

  behavioral_observations: [
    { id: OBS.o1, subject_id: PER.bn1aCh, observer_id: PER.bde1Ch, org_id: ORG.bn1a, observation_date: "2025-12-15", context: "Garrison observation", echelon_setting: "battalion",
      ratings: { "CH-1.1": { rating: 5, notes: "Excellent devotional life" }, "CH-1.2": { rating: 4 }, "CH-2.1": { rating: 4 }, "CH-3.1": { rating: 5 }, "CH-4.1": { rating: 4 }, "CO-1.1": { rating: 5, notes: "Outstanding preaching" }, "CO-3.1": { rating: 4 }, "CO-5.1": { rating: 3, notes: "Needs improvement on staff products" }, "CO-5.2": { rating: 2, notes: "RS Annex late" }, "CN-1.1": { rating: 5 }, "CN-2.1": { rating: 5, notes: "Soldiers seek out freely" }, "CF-1.1": { rating: 4 } },
      word_picture: { strengths: [{ indicator_id: "CH-1.1", behavior_text: "Maintains a regular, visible prayer/devotional life", pillar: "character", sub_dimension: "Spirituality", rating: 5 }, { indicator_id: "CO-1.1", behavior_text: "Delivers worship services that are biblically grounded", pillar: "competence", sub_dimension: "Preaching", rating: 5 }, { indicator_id: "CN-1.1", behavior_text: "Maintains consistent presence in unit work areas", pillar: "connection", sub_dimension: "Visibility", rating: 5 }], development_needs: [{ indicator_id: "CO-5.2", behavior_text: "Develops and maintains the Religious Support Annex", pillar: "competence", sub_dimension: "Staffing", rating: 2 }], pillar_averages: { character: 4.4, competence: 3.5, connection: 5.0, constitutional: 4.0 }, summary_narrative: "CPT Williams demonstrates exceptional strength in Character and Connection pillars. His spiritual depth, authentic relationships, and visibility across the formation are clear strengths. Ministry competencies (preaching, counseling) rate above standard. Development focus: military staff skills, particularly RS Annex timeliness and staff product quality. Recommend MDMP integration mentorship from BDE chaplain." } },
    { id: OBS.o2, subject_id: PER.bn2aCh, observer_id: PER.bde2Ch, org_id: ORG.bn2a, observation_date: "2026-01-10", context: "Post-CTC observation", echelon_setting: "battalion",
      ratings: { "CH-1.1": { rating: 4 }, "CH-4.1": { rating: 5 }, "CH-5.1": { rating: 5 }, "CO-1.1": { rating: 4 }, "CO-4.1": { rating: 5, notes: "Outstanding tactical proficiency" }, "CO-5.1": { rating: 4 }, "CO-5.5": { rating: 4 }, "CN-1.1": { rating: 4 }, "CN-5.1": { rating: 3 }, "CF-1.1": { rating: 5 }, "CF-2.1": { rating: 5 } },
      word_picture: { strengths: [{ indicator_id: "CH-5.1", behavior_text: "Actively listens to Soldiers' concerns", pillar: "character", sub_dimension: "Empathy", rating: 5 }, { indicator_id: "CO-4.1", behavior_text: "Demonstrates tactical proficiency", pillar: "competence", sub_dimension: "Soldiering", rating: 5 }, { indicator_id: "CF-1.1", behavior_text: "Provides religious support to all Soldiers", pillar: "constitutional", sub_dimension: "Plurality in Practice", rating: 5 }], development_needs: [{ indicator_id: "CN-5.1", behavior_text: "Speaks with authority in staff meetings", pillar: "connection", sub_dimension: "Confidence", rating: 3 }], pillar_averages: { character: 4.7, competence: 4.3, connection: 3.5, constitutional: 5.0 }, summary_narrative: "CPT Brooks is an exceptionally well-rounded chaplain with particular strength in Character and Constitutional Fidelity. Outstanding tactical proficiency and empathetic care. Growth area: building confidence in staff-level engagements. Ready for increased responsibility." } },
    { id: OBS.o3, subject_id: PER.bn1aCh, observer_id: PER.bde1Ch, org_id: ORG.bn1a, observation_date: "2026-02-20", context: "STX observation", echelon_setting: "battalion",
      ratings: { "CH-1.1": { rating: 5 }, "CH-3.1": { rating: 5 }, "CO-1.4": { rating: 4 }, "CO-4.1": { rating: 4 }, "CO-5.1": { rating: 4, notes: "Improvement noted" }, "CO-5.2": { rating: 3, notes: "RS Annex on time this cycle" }, "CN-1.1": { rating: 5 }, "CN-6.1": { rating: 4 }, "CF-1.1": { rating: 4 } },
      word_picture: { pillar_averages: { character: 5.0, competence: 3.8, connection: 4.5, constitutional: 4.0 }, summary_narrative: "Follow-up observation shows improvement in staffing competency. RS Annex submitted on time. Continued strength in Character and Connection. Trajectory positive." } },
    { id: OBS.o4, subject_id: PER.bn3aCh, observer_id: PER.bde3Ch, org_id: ORG.bn3a, observation_date: "2026-01-25", context: "FTX observation", echelon_setting: "battalion",
      ratings: { "CH-1.1": { rating: 3 }, "CH-6.1": { rating: 4 }, "CO-1.1": { rating: 3 }, "CO-4.1": { rating: 3 }, "CO-5.1": { rating: 2 }, "CN-1.1": { rating: 3 }, "CN-2.1": { rating: 4 }, "CF-1.1": { rating: 3 } },
      word_picture: { pillar_averages: { character: 3.5, competence: 2.8, connection: 3.5, constitutional: 3.0 }, summary_narrative: "CPT Jackson meets the standard in most areas but shows development needs in military competencies, particularly staff work. Recommend focused mentorship on MDMP and RS planning." } },
    { id: OBS.o5, subject_id: PER.bn1aRas, observer_id: PER.bn1aCh, org_id: ORG.bn1a, observation_date: "2026-02-10", context: "Garrison observation", echelon_setting: "battalion",
      ratings: { "CH-4.1": { rating: 5 }, "CH-6.1": { rating: 5 }, "CO-4.1": { rating: 5 }, "CO-4.2": { rating: 4 }, "CN-1.1": { rating: 4 }, "CN-4.1": { rating: 5, notes: "Sharp military appearance" }, "CF-2.1": { rating: 4 } },
      word_picture: { pillar_averages: { character: 5.0, competence: 4.5, connection: 4.5, constitutional: 4.0 }, summary_narrative: "SSG Johnson is an outstanding RAS demonstrating excellence in soldiering skills and military bearing. Strong in all pillars with exceptional discipline and tactical proficiency." } },
    { id: OBS.o6, subject_id: PER.bn2bCh, observer_id: PER.bde2Ch, org_id: ORG.bn2b, observation_date: "2026-03-01", context: "Initial assessment", echelon_setting: "battalion",
      ratings: { "CH-1.1": { rating: 3 }, "CH-2.1": { rating: 4 }, "CO-1.1": { rating: 3 }, "CO-5.1": { rating: 2 }, "CO-6.1": { rating: 2 }, "CN-1.1": { rating: 3 }, "CN-5.1": { rating: 2 }, "CF-1.1": { rating: 3 } },
      word_picture: { pillar_averages: { character: 3.5, competence: 2.3, connection: 2.5, constitutional: 3.0 }, summary_narrative: "1LT Patel is a new chaplain showing expected development needs for a junior officer. Strengths in humility and willingness to learn. Needs focused development in staffing, leading, and confidence. Recommend close mentorship by BDE chaplain." } },
  ],

  capability_gaps: [
    { id: GAP.g1, title: "BN Command Post Integration", description: "Battalion UMTs are insufficiently trained to integrate RS operations into the command post battle rhythm during decisive action.", operational_impact: "RS considerations are not systematically included in MDMP, resulting in religious support that is reactive rather than proactive during operations.", doctrinal_references: ["FM 3-83", "FM 6-0", "ATP 1-05.01"], source_type: "readiness_gap", dotmlpf_domains: ["training", "doctrine"], severity: "critical", status: "under_analysis", solution_pathway: "training_revision", affected_echelons: ["battalion"], affected_compos: ["active"] },
    { id: GAP.g2, title: "Corps RS Planning Standardization", description: "No standardized T&EO exists for Corps-level RS planning and synchronization.", operational_impact: "Corps UMTs lack standardized training and evaluation criteria for multi-division RS coordination during LSCO.", doctrinal_references: ["FM 3-83"], source_type: "teo_analysis", dotmlpf_domains: ["organization", "training", "doctrine"], severity: "significant", status: "identified", solution_pathway: "pending_analysis", affected_echelons: ["corps"], affected_compos: ["active"] },
    { id: GAP.g3, title: "56M Force Protection Training", description: "RAS personnel lack formal T&EO for force protection tasks specific to UMT operations.", operational_impact: "Inconsistent force protection competency among RAS puts UMT survivability at risk during combat operations.", doctrinal_references: ["FM 3-83", "STP 21-1-SMCT"], source_type: "teo_analysis", dotmlpf_domains: ["training", "personnel"], severity: "moderate", status: "documented", solution_pathway: "dcr", affected_echelons: ["battalion", "brigade"], affected_compos: ["active", "arng"] },
    { id: GAP.g4, title: "Spiritual Readiness Assessment Tools", description: "No standardized digital tools exist for assessing and tracking unit-level spiritual readiness.", operational_impact: "Commanders lack objective data on spiritual climate, limiting ability to resource RS programs and prevent spiritual injuries.", doctrinal_references: ["AR 165-1", "AR 600-63"], source_type: "other", dotmlpf_domains: ["materiel", "training"], severity: "moderate", status: "identified", solution_pathway: "pending_analysis", affected_echelons: ["battalion", "brigade", "division"], affected_compos: ["active", "arng", "usar"] },
  ],

  dotmlpf_analyses: [
    { id: ANA.a1, gap_id: GAP.g1, domain: "training", current_state: "BN UMTs receive limited CP integration training during CTC rotations. No dedicated home-station training program exists.", desired_state: "All BN UMTs complete CP integration training annually with hands-on MDMP participation and RS Annex development.", gap_assessment: "Training gap: 57% of BN UMTs rated Untrained on 16-BN-3802. No home-station training pathway exists.", recommended_action: "Develop a BN CP Integration Training Package with 3-day STX and integrate into BFT-AT requirements.", confidence_level: "high", data_source: "Readiness Tracker T/P/U data" },
    { id: ANA.a2, gap_id: GAP.g1, domain: "doctrine", current_state: "FM 3-83 addresses RS planning in general terms but does not provide specific TTP for BN-level CP integration.", desired_state: "Updated ATP with specific TTP for UMT CP integration during all warfighting functions.", gap_assessment: "Doctrinal gap: no ATP-level publication addresses BN UMT CP operations in sufficient detail.", recommended_action: "Submit doctrinal update request to USACHCS for ATP 1-05.xx revision.", confidence_level: "high", data_source: "T&EO analysis; FM 3-83 review" },
    { id: ANA.a3, gap_id: GAP.g3, domain: "training", current_state: "56M force protection training conducted ad hoc during AIT and unit-level training. No formal T&EO exists.", desired_state: "Formal individual task T&EO for 56M force protection with standardized conditions, standards, and performance measures.", gap_assessment: "No standardized assessment exists for 56M force protection competencies.", recommended_action: "Develop 805D-56M-5002 T&EO with TRADOC and integrate into AIT POI revision.", confidence_level: "medium", data_source: "T&EO analysis; AIT POI review" },
  ],

  idp_records: [
    { id: IDP_ID.i1, personnel_id: PER.bn1aCh, supervisor_id: PER.bde1Ch, created_date: "2026-01-05", status: "active",
      professional_goals: [
        { what: "Improve RS Annex writing to meet standard", why: "Required competency for brigade-level assignment readiness", how: "Shadow BDE UMT during next CPX; complete CGSC staff writing module", when: "NLT end of Q3 FY26", support: "BDE chaplain mentorship; access to example annexes" },
        { what: "Complete MDMP facilitator training", why: "Full participation in planning process enhances RS integration", how: "Lead RS input for next battalion OPORD", when: "Next FTX cycle", support: "S3 planning cell inclusion" },
      ],
      personal_goals: [
        { what: "Establish weekly peer accountability partnership", why: "Prevent isolation and burnout during high-OPTEMPO period", how: "Identify and covenant with peer chaplain for weekly check-in", when: "Begin immediately", support: "BDE chaplain facilitation" },
      ],
      strengths_to_maximize: ["Spiritual depth and devotional modeling", "Exceptional pastoral care and crisis counseling", "Outstanding unit visibility and accessibility"],
      needs_to_mitigate: ["Staff writing and MDMP integration", "RS Annex timeliness"],
      reflection_notes: { grateful_for: "Strong relationship with BN commander and S3", growth: "Staff officer skills developing through focused mentorship" },
      followup_1_date: "2026-01-06", followup_1_completed: true, followup_1_notes: "Confirmed understanding of goals. Chaplain motivated.",
      followup_2_date: "2026-02-05", followup_2_completed: true, followup_2_notes: "RS Annex submitted on time for STX. Progress on MDMP participation noted." },
    { id: IDP_ID.i2, personnel_id: PER.bn2aCh, supervisor_id: PER.bde2Ch, created_date: "2025-09-15", status: "completed",
      professional_goals: [
        { what: "Lead Strong Bonds event independently", why: "Develop program management capability", how: "Plan and execute battalion Strong Bonds weekend", when: "Q1 FY26", support: "BDE funding and logistics support" },
      ],
      personal_goals: [
        { what: "Complete ACFT at 550+ score", why: "Model physical fitness standard for the UMT", how: "Consistent PT plan with BN PT schedule", when: "By March 2026", support: "Access to gym facilities" },
      ],
      strengths_to_maximize: ["Tactical proficiency and field ministry", "Empathetic care under stress"],
      needs_to_mitigate: ["Confidence in staff-level briefings"],
      reflection_notes: {},
      followup_1_date: "2025-09-16", followup_1_completed: true,
      followup_2_date: "2025-10-15", followup_2_completed: true },
  ],

  compass_cycles: [
    { id: CYC, subject_id: PER.bn1aCh, initiated_by: PER.bde1Ch, assessment_period: "FY26-Q1", status: "closed", min_respondents_per_role: 1 },
  ],

  compass_responses: [
    { id: CR.r1, cycle_id: CYC, respondent_role: "self", respondent_token: "demo-self-token-000000000000000000000000000000000001", is_complete: true, submitted_at: "2025-12-20T10:00:00Z",
      ratings: { spirituality: 4, humility: 3, authenticity: 4, army_values: 4, empathy: 4, discipline: 3, preaching: 4, teaching: 3, counseling: 4, soldiering: 3, staffing: 2, leading: 3, visibility: 5, affability: 4, accessibility: 4, bearing: 3, confidence: 3, resilience: 4 }, comments: {} },
    { id: CR.r2, cycle_id: CYC, respondent_role: "subordinate", respondent_token: "demo-sub1-token-000000000000000000000000000000000002", is_complete: true, submitted_at: "2025-12-22T14:00:00Z",
      ratings: { spirituality: 5, humility: 4, authenticity: 5, army_values: 5, empathy: 5, discipline: 4, preaching: 5, teaching: 4, counseling: 5, soldiering: 4, staffing: 3, leading: 4, visibility: 5, affability: 5, accessibility: 5, bearing: 4, confidence: 4, resilience: 5 }, comments: {} },
    { id: CR.r3, cycle_id: CYC, respondent_role: "subordinate", respondent_token: "demo-sub2-token-000000000000000000000000000000000003", is_complete: true, submitted_at: "2025-12-23T09:00:00Z",
      ratings: { spirituality: 5, humility: 5, authenticity: 5, army_values: 4, empathy: 5, discipline: 4, preaching: 4, teaching: 4, counseling: 5, soldiering: 3, staffing: 2, leading: 3, visibility: 5, affability: 5, accessibility: 5, bearing: 4, confidence: 3, resilience: 4 }, comments: {} },
    { id: CR.r4, cycle_id: CYC, respondent_role: "peer", respondent_token: "demo-peer-token-000000000000000000000000000000000004", is_complete: true, submitted_at: "2025-12-24T11:00:00Z",
      ratings: { spirituality: 4, humility: 4, authenticity: 4, army_values: 4, empathy: 4, discipline: 3, preaching: 4, teaching: 3, counseling: 4, soldiering: 3, staffing: 3, leading: 3, visibility: 4, affability: 4, accessibility: 4, bearing: 3, confidence: 3, resilience: 4 }, comments: {} },
    { id: CR.r5, cycle_id: CYC, respondent_role: "superior", respondent_token: "demo-supr-token-000000000000000000000000000000000005", is_complete: true, submitted_at: "2025-12-25T08:00:00Z",
      ratings: { spirituality: 5, humility: 4, authenticity: 5, army_values: 5, empathy: 4, discipline: 4, preaching: 5, teaching: 4, counseling: 4, soldiering: 4, staffing: 2, leading: 3, visibility: 5, affability: 4, accessibility: 4, bearing: 4, confidence: 3, resilience: 4 }, comments: { staffing: "Needs focused development on staff writing", leading: "Growing — give more leadership opportunities" } },
  ],
};
