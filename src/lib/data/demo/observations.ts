/**
 * ═══════════════════════════════════════════════════════════════════════════
 * BEHAVIORAL OBSERVATIONS — 25 observations across III Armored Corps
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Distribution:
 *   6 × 1CD BN chaplains by BDE chaplains
 *   4 × NTC/JRTC OC/T observations (CTC rotations)
 *   3 × BDE chaplains by DIV chaplains (1 per division)
 *   4 × BN RAS by supervisory NCOs
 *   3 × BDE chaplains by Corps chaplain
 *   3 × Self-observations (CER self-assessment)
 *   2 × DIVARTY/ACB/SUST BDE chaplains
 *
 * Performance Profiles:
 *   3 "strong" (4s-5s), 5 "solid" (3s-4s), 3 "developing" (2s-3s), 1 "struggling"
 */

import { ORG } from "./organizations";
import { PER } from "./personnel";

const oid = (n: number) => `demo-3000-0000-0000-${String(n).padStart(12, "0")}`;

// Helper to build a ratings object from compact notation
type R = { rating: number; notes?: string };
const r = (rating: number, notes?: string): R => notes ? { rating, notes } : { rating };

// Helper to build word_picture strength/need entries
const s = (id: string, text: string, pillar: string, sub: string, rating: number) => ({
  indicator_id: id, behavior_text: text, pillar, sub_dimension: sub, rating,
});

export const BEHAVIORAL_OBSERVATIONS = [
  // ═══════════════════════════════════════════════════════════════════════
  // 1–6: 1CD BN Chaplains by BDE Chaplains
  // ═══════════════════════════════════════════════════════════════════════

  // Obs 1: CPT Kim (2-5 CAV) by MAJ Okonkwo (1ABCT) — STRONG
  {
    id: oid(1),
    subject_id: PER.CD_2_5_CAV_CH,
    observer_id: PER.CD_1ABCT_CH,
    org_id: ORG.BDE_1CD_1ABCT,
    observation_date: "2026-01-15",
    context: "garrison",
    echelon_setting: "brigade",
    training_event_id: null,
    ratings: {
      "CH-1.1": r(5, "Consistent devotional life observed across multiple visits"),
      "CH-1.2": r(4, "Strong theological depth in counseling sessions"),
      "CH-1.3": r(5), "CH-2.1": r(4), "CH-2.2": r(4),
      "CH-3.1": r(5, "Exemplary consistency between stated values and actions"),
      "CH-3.2": r(4), "CH-4.1": r(4), "CH-4.2": r(5),
      "CH-5.1": r(5, "Genuinely listens; Soldiers seek him proactively"),
      "CH-5.2": r(4), "CH-6.1": r(4), "CH-6.2": r(4),
      "CO-1.1": r(4, "Worship well-prepared and contextually relevant"),
      "CO-1.2": r(4), "CO-2.1": r(3, "Content solid but delivery needs more engagement"),
      "CO-3.1": r(5, "Exceptional pastoral care — #1 referral source in BN"),
      "CO-3.2": r(5), "CO-4.1": r(4), "CO-4.2": r(3, "Tactical movement planning needs work"),
      "CO-5.1": r(4), "CO-5.2": r(4), "CO-6.1": r(4),
      "CN-1.1": r(5, "Present in motor pools and company areas daily"),
      "CN-1.2": r(5), "CN-2.1": r(4), "CN-2.2": r(5),
      "CN-3.1": r(4), "CN-4.1": r(4), "CN-5.1": r(4),
      "CF-1.1": r(5, "Proactively ensures free exercise for all faith groups"),
      "CF-1.2": r(4), "CF-2.1": r(4), "CF-2.2": r(4),
    },
    word_picture: {
      strengths: [
        s("CH-1.1", "Maintains a regular, visible prayer/devotional life that sustains personal ministry capacity", "character", "Spirituality", 5),
        s("CO-3.1", "Provides responsive pastoral counseling using evidence-based approaches within scope of practice", "competence", "Counseling/Care", 5),
        s("CN-1.1", "Maintains consistent presence in unit work areas, training areas, and living quarters", "connection", "Visibility", 5),
      ],
      development_needs: [
        s("CO-2.1", "Develops and delivers resilience training aligned with unit needs", "competence", "Teaching", 3),
        s("CO-4.2", "Operates effectively in field environments and integrates UMT into tactical planning", "competence", "Soldiering", 3),
      ],
      pillar_averages: { character: 4.4, competence: 4.0, connection: 4.4, constitutional: 4.3 },
      summary_narrative: "CPT Kim is a highly effective battalion chaplain whose greatest strengths are in pastoral care and visible ministry presence. Soldiers throughout 2-5 CAV know him by name and seek him out proactively. His teaching delivery could benefit from additional professional development, but content quality is strong. He models spiritual discipline and authenticity that earns trust across the formation.",
    },
  },

  // Obs 2: CPT Thompson (1-7 CAV) by MAJ Okonkwo (1ABCT) — SOLID
  {
    id: oid(2),
    subject_id: PER.CD_1_7_CAV_CH,
    observer_id: PER.CD_1ABCT_CH,
    org_id: ORG.BDE_1CD_1ABCT,
    observation_date: "2026-01-20",
    context: "garrison",
    echelon_setting: "brigade",
    training_event_id: null,
    ratings: {
      "CH-1.1": r(4), "CH-1.2": r(3), "CH-2.1": r(4, "Receptive to feedback during counseling reviews"),
      "CH-3.1": r(4), "CH-4.1": r(4), "CH-5.1": r(3), "CH-6.1": r(4),
      "CO-1.1": r(3, "Worship services adequate but lack creative engagement"),
      "CO-2.1": r(4, "Strong Bonds facilitation skills developing well"),
      "CO-3.1": r(4), "CO-4.1": r(4, "Good tactical awareness for field ops"),
      "CO-5.1": r(3), "CO-6.1": r(3),
      "CN-1.1": r(4), "CN-2.1": r(3), "CN-3.1": r(4),
      "CN-4.1": r(4), "CN-5.1": r(3),
      "CF-1.1": r(4), "CF-2.1": r(3),
    },
    word_picture: {
      strengths: [
        s("CH-2.1", "Actively seeks and incorporates feedback from subordinates, peers, and superiors", "character", "Humility", 4),
        s("CO-4.1", "Demonstrates tactical proficiency appropriate to echelon", "competence", "Soldiering", 4),
      ],
      development_needs: [
        s("CO-1.1", "Delivers worship services that are biblically grounded and relevant to the military context", "competence", "Preaching", 3),
        s("CO-6.1", "Sets clear expectations and holds UMT members accountable", "competence", "Leading", 3),
      ],
      pillar_averages: { character: 3.8, competence: 3.5, connection: 3.6, constitutional: 3.5 },
      summary_narrative: "CPT Thompson is a solid chaplain who is growing into his role at 1-7 CAV. He is tactically proficient and receptive to feedback, which positions him well for continued development. His worship services need more intentional preparation and creativity. He should focus on developing his leadership of the UMT and establishing clearer expectations for his RAS.",
    },
  },

  // Obs 3: CPT Nakamura (4-9 CAV) by MAJ Foster (2ABCT) — SOLID
  {
    id: oid(3),
    subject_id: PER.CD_4_9_CAV_CH,
    observer_id: PER.CD_2ABCT_CH,
    org_id: ORG.BDE_1CD_2ABCT,
    observation_date: "2025-11-20",
    context: "ctc",
    echelon_setting: "brigade",
    training_event_id: null,
    ratings: {
      "CH-1.1": r(4), "CH-1.5": r(4, "Maintained devotional rhythm during NTC rotation"),
      "CH-2.1": r(3), "CH-3.1": r(4), "CH-4.1": r(4), "CH-5.1": r(4),
      "CH-6.1": r(3, "Time management slipped during high-OPTEMPO phases"),
      "CO-1.1": r(4), "CO-2.1": r(3), "CO-3.1": r(4),
      "CO-4.1": r(3, "Land nav during NTC movement was marginal"),
      "CO-5.1": r(4, "RS annex submitted on time and accurate"),
      "CO-6.1": r(3),
      "CN-1.1": r(3, "Visibility dropped during force-on-force phase"),
      "CN-2.1": r(4), "CN-3.1": r(3), "CN-4.1": r(4), "CN-5.1": r(4),
      "CF-1.1": r(4), "CF-2.1": r(3),
    },
    word_picture: {
      strengths: [
        s("CO-5.1", "Produces timely, accurate staff products including the Religious Support Annex", "competence", "Staffing", 4),
        s("CH-1.5", "Models spiritual resilience during high-stress or high-OPTEMPO periods", "character", "Spirituality", 4),
      ],
      development_needs: [
        s("CN-1.1", "Maintains consistent presence in unit work areas, training areas, and living quarters", "connection", "Visibility", 3),
        s("CO-4.1", "Demonstrates tactical proficiency appropriate to echelon", "competence", "Soldiering", 3),
      ],
      pillar_averages: { character: 3.7, competence: 3.5, connection: 3.6, constitutional: 3.5 },
      summary_narrative: "CPT Nakamura performed adequately during the NTC rotation but showed gaps in visibility and tactical proficiency during the force-on-force phase. His staff work was a bright spot — RS annex was among the best in the BDE. He needs to prioritize getting out of the TOC during field operations and improving his land navigation skills for independent movement.",
    },
  },

  // Obs 4: CPT Nguyen (1-5 CAV) by MAJ Foster (2ABCT) — SOLID
  {
    id: oid(4),
    subject_id: PER.CD_1_5_CAV_CH,
    observer_id: PER.CD_2ABCT_CH,
    org_id: ORG.BDE_1CD_2ABCT,
    observation_date: "2025-11-22",
    context: "ctc",
    echelon_setting: "brigade",
    training_event_id: null,
    ratings: {
      "CH-1.1": r(3, "Devotional practice inconsistent during field operations"),
      "CH-1.5": r(3), "CH-2.1": r(4), "CH-3.1": r(4),
      "CH-4.1": r(5, "Exemplary Army Values in all interactions"),
      "CH-5.1": r(3), "CH-6.1": r(4),
      "CO-1.1": r(3, "Field worship services lacked preparation"),
      "CO-2.1": r(4), "CO-3.1": r(4),
      "CO-4.1": r(5, "Outstanding tactical proficiency — best in the brigade"),
      "CO-5.1": r(5, "RS annex was the best product in the brigade"),
      "CO-6.1": r(4),
      "CN-1.1": r(2, "Limited visibility outside the TOC during the FTX"),
      "CN-2.1": r(3), "CN-3.1": r(3, "Response times to ministry requests need improvement"),
      "CN-4.1": r(4), "CN-5.1": r(4),
      "CF-1.1": r(4), "CF-2.1": r(4),
    },
    word_picture: {
      strengths: [
        s("CO-4.1", "Demonstrates tactical proficiency appropriate to echelon", "competence", "Soldiering", 5),
        s("CO-5.1", "Produces timely, accurate staff products including the Religious Support Annex", "competence", "Staffing", 5),
        s("CH-4.1", "Consistently demonstrates the seven Army Values in daily conduct", "character", "Army Values", 5),
      ],
      development_needs: [
        s("CN-1.1", "Maintains consistent presence in unit work areas, training areas, and living quarters", "connection", "Visibility", 2),
        s("CH-1.1", "Maintains a regular, visible prayer/devotional life", "character", "Spirituality", 3),
      ],
      pillar_averages: { character: 3.7, competence: 4.2, connection: 3.2, constitutional: 4.0 },
      summary_narrative: "CPT Nguyen is tactically and administratively the strongest chaplain in 2 ABCT. His military competence is outstanding. However, he tends to spend too much time in the TOC doing staff work and not enough time visiting Soldiers in their positions. His ministry presence and visibility need significant improvement. Personal spiritual disciplines also weaken under field conditions.",
    },
  },

  // Obs 5: CPT Patel (6-9 CAV) by MAJ Okafor (3ABCT) — DEVELOPING
  {
    id: oid(5),
    subject_id: PER.CD_6_9_CAV_CH,
    observer_id: PER.CD_3ABCT_CH,
    org_id: ORG.BDE_1CD_3ABCT,
    observation_date: "2026-02-10",
    context: "garrison",
    echelon_setting: "brigade",
    training_event_id: null,
    ratings: {
      "CH-1.1": r(3), "CH-1.2": r(2, "Theological responses sometimes lack depth"),
      "CH-2.1": r(3), "CH-3.1": r(3), "CH-4.1": r(3), "CH-5.1": r(3),
      "CH-6.1": r(2, "Missed two deadlines for RS product submissions"),
      "CO-1.1": r(3), "CO-2.1": r(2, "Training delivery is unstructured and hard to follow"),
      "CO-3.1": r(3), "CO-4.1": r(3), "CO-5.1": r(2, "RS annex was incomplete and late"),
      "CO-6.1": r(3),
      "CN-1.1": r(3), "CN-2.1": r(3), "CN-3.1": r(2, "Soldiers report difficulty reaching him after hours"),
      "CN-4.1": r(3), "CN-5.1": r(3),
      "CF-1.1": r(3), "CF-2.1": r(3),
    },
    word_picture: {
      strengths: [
        s("CO-4.1", "Demonstrates tactical proficiency appropriate to echelon", "competence", "Soldiering", 3),
        s("CH-5.1", "Actively listens to Soldiers' concerns without rushing to judgment", "character", "Empathy", 3),
      ],
      development_needs: [
        s("CO-5.1", "Produces timely, accurate staff products including the Religious Support Annex", "competence", "Staffing", 2),
        s("CO-2.1", "Develops and delivers resilience training aligned with unit needs", "competence", "Teaching", 2),
        s("CH-6.1", "Meets or exceeds all Army standards for appearance, fitness, and readiness", "character", "Discipline", 2),
      ],
      pillar_averages: { character: 2.7, competence: 2.7, connection: 2.8, constitutional: 3.0 },
      summary_narrative: "CPT Patel is a developing chaplain who needs focused mentorship in multiple areas. His staff products are consistently late or incomplete, and his training delivery lacks structure. He shows empathy and willingness to engage but needs to develop professional discipline and time management. A structured IDP with specific milestones is recommended.",
    },
  },

  // Obs 6: CPT Abebe (3-8 CAV) by MAJ Okafor (3ABCT) — DEVELOPING
  {
    id: oid(6),
    subject_id: PER.CD_3_8_CAV_CH,
    observer_id: PER.CD_3ABCT_CH,
    org_id: ORG.BDE_1CD_3ABCT,
    observation_date: "2026-02-12",
    context: "stx",
    echelon_setting: "brigade",
    training_event_id: null,
    ratings: {
      "CH-1.1": r(3), "CH-1.5": r(4, "Maintained spiritual resilience throughout exercise"),
      "CH-2.1": r(2, "Resistant to AAR feedback"), "CH-3.1": r(3),
      "CH-4.1": r(3), "CH-5.1": r(3), "CH-6.1": r(3),
      "CO-1.1": r(3), "CO-2.1": r(2), "CO-3.1": r(3),
      "CO-4.1": r(3), "CO-5.1": r(2, "Failed to produce RS running estimate during STX"),
      "CO-6.1": r(2, "Unclear expectations for SPC Price"),
      "CN-1.1": r(3, "Vehicle issues limited circulation but showed initiative"),
      "CN-2.1": r(3), "CN-3.1": r(3), "CN-5.1": r(4, "Resilient under stress"),
      "CF-1.1": r(3), "CF-2.1": r(3),
    },
    word_picture: {
      strengths: [
        s("CH-1.5", "Models spiritual resilience during high-stress or high-OPTEMPO periods", "character", "Spirituality", 4),
        s("CN-5.1", "Continues effective ministry during extended operations and deployments", "connection", "Resilience", 4),
      ],
      development_needs: [
        s("CO-5.1", "Produces timely, accurate staff products", "competence", "Staffing", 2),
        s("CH-2.1", "Actively seeks and incorporates feedback", "character", "Humility", 2),
        s("CO-6.1", "Sets clear expectations and holds team members accountable", "competence", "Leading", 2),
      ],
      pillar_averages: { character: 3.0, competence: 2.5, connection: 3.2, constitutional: 3.0 },
      summary_narrative: "CPT Abebe demonstrated strong spiritual resilience during the STX but his administrative and leadership skills are concerning. He failed to produce key staff products and provides unclear guidance to his RAS. He is also resistant to feedback during AARs, which limits his growth trajectory. Immediate mentorship on staff processes and receptivity to feedback is critical.",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 7–10: NTC/JRTC OC/T Observations
  // ═══════════════════════════════════════════════════════════════════════

  // Obs 7: CPT Nakamura (4-9 CAV) NTC OC/T — SOLID
  {
    id: oid(7),
    subject_id: PER.CD_4_9_CAV_CH,
    observer_id: PER.CORPS_DEPUTY,
    org_id: ORG.BN_4_9_CAV,
    observation_date: "2025-11-18",
    context: "ctc",
    echelon_setting: "battalion",
    training_event_id: null,
    ratings: {
      "CH-1.1": r(4), "CH-2.1": r(3), "CH-3.1": r(4), "CH-4.1": r(4),
      "CH-5.1": r(4, "Effective crisis response during simulated MASCAL"),
      "CH-6.1": r(3),
      "CO-1.1": r(3, "Field worship conducted but attendance was low — poor advertising"),
      "CO-2.1": r(3), "CO-3.1": r(4, "Counseling response during MASCAL was exemplary"),
      "CO-4.1": r(3), "CO-5.1": r(4), "CO-6.1": r(3),
      "CN-1.1": r(3), "CN-2.1": r(4), "CN-3.1": r(3),
      "CN-4.1": r(4, "Professional bearing maintained throughout rotation"),
      "CN-5.1": r(4),
      "CF-1.1": r(4), "CF-2.1": r(3),
    },
    word_picture: {
      strengths: [
        s("CH-5.1", "Recognizes and responds to signs of distress, grief, or spiritual injury", "character", "Empathy", 4),
        s("CO-3.1", "Provides responsive pastoral counseling using evidence-based approaches", "competence", "Counseling/Care", 4),
      ],
      development_needs: [
        s("CO-1.1", "Delivers worship services that are biblically grounded and relevant", "competence", "Preaching", 3),
        s("CN-1.1", "Maintains consistent presence in unit work areas", "connection", "Visibility", 3),
      ],
      pillar_averages: { character: 3.7, competence: 3.3, connection: 3.6, constitutional: 3.5 },
      summary_narrative: "OC/T assessment: CPT Nakamura's MASCAL response was the highlight of his NTC performance — his crisis counseling was timely and effective. However, his general visibility across the battlespace was inconsistent. Field worship services were poorly publicized resulting in low attendance. Recommend focus on proactive ministry presence and worship service coordination with BN operations.",
    },
  },

  // Obs 8: CPT Nguyen (1-5 CAV) NTC OC/T — SOLID
  {
    id: oid(8),
    subject_id: PER.CD_1_5_CAV_CH,
    observer_id: PER.CORPS_DEPUTY,
    org_id: ORG.BN_1_5_CAV,
    observation_date: "2025-11-19",
    context: "ctc",
    echelon_setting: "battalion",
    training_event_id: null,
    ratings: {
      "CH-1.1": r(3), "CH-2.1": r(4), "CH-3.1": r(4), "CH-4.1": r(5),
      "CH-5.1": r(3), "CH-6.1": r(4),
      "CO-1.1": r(3), "CO-2.1": r(3),
      "CO-3.1": r(3, "Counseling was competent but felt transactional"),
      "CO-4.1": r(5, "Best tactical chaplain observed this rotation"),
      "CO-5.1": r(5, "RS annex and running estimate were textbook quality"),
      "CO-6.1": r(4),
      "CN-1.1": r(2, "Spent 80% of time in TOC — worst visibility in BDE"),
      "CN-2.1": r(2, "Soldiers in line companies reported never seeing the chaplain"),
      "CN-3.1": r(3), "CN-4.1": r(4), "CN-5.1": r(4),
      "CF-1.1": r(4), "CF-2.1": r(4),
    },
    word_picture: {
      strengths: [
        s("CO-4.1", "Demonstrates tactical proficiency appropriate to echelon", "competence", "Soldiering", 5),
        s("CO-5.1", "Produces timely, accurate staff products", "competence", "Staffing", 5),
      ],
      development_needs: [
        s("CN-1.1", "Maintains consistent presence in unit work areas", "connection", "Visibility", 2),
        s("CN-2.1", "Soldiers at all ranks approach freely and without appointment", "connection", "Affability", 2),
      ],
      pillar_averages: { character: 3.8, competence: 3.8, connection: 3.0, constitutional: 4.0 },
      summary_narrative: "OC/T assessment: CPT Nguyen is the most tactically competent chaplain observed during this rotation — his staff products were textbook quality. However, his extreme focus on staff work came at the severe expense of ministry presence. Soldiers in forward companies reported never seeing the chaplain during the 14-day rotation. This is a significant ministry gap that must be addressed before his next CTC event.",
    },
  },

  // Obs 9: CPT Mitchell (1-6 INF) NTC OC/T — SOLID
  {
    id: oid(9),
    subject_id: PER.AD_1_6_INF_CH,
    observer_id: PER.CORPS_DEPUTY,
    org_id: ORG.BN_1_6_INF,
    observation_date: "2026-01-22",
    context: "ctc",
    echelon_setting: "battalion",
    training_event_id: null,
    ratings: {
      "CH-1.1": r(4), "CH-2.1": r(4), "CH-3.1": r(3), "CH-4.1": r(4),
      "CH-5.1": r(4), "CH-6.1": r(3),
      "CO-1.1": r(4, "Field worship was creative and well-attended"),
      "CO-2.1": r(3), "CO-3.1": r(4), "CO-4.1": r(3, "Movement planning needs improvement"),
      "CO-5.1": r(3), "CO-6.1": r(4),
      "CN-1.1": r(4, "Good presence across the battlespace"),
      "CN-2.1": r(4), "CN-3.1": r(4), "CN-4.1": r(3), "CN-5.1": r(4),
      "CF-1.1": r(4), "CF-2.1": r(4),
    },
    word_picture: {
      strengths: [
        s("CO-1.1", "Delivers worship services that are biblically grounded and relevant", "competence", "Preaching", 4),
        s("CN-1.1", "Maintains consistent presence in unit work areas", "connection", "Visibility", 4),
      ],
      development_needs: [
        s("CO-4.1", "Demonstrates tactical proficiency appropriate to echelon", "competence", "Soldiering", 3),
        s("CO-5.1", "Produces timely, accurate staff products", "competence", "Staffing", 3),
      ],
      pillar_averages: { character: 3.7, competence: 3.5, connection: 3.8, constitutional: 4.0 },
      summary_narrative: "OC/T assessment: CPT Mitchell demonstrated strong ministry presence and creative worship delivery during the 1AD NTC rotation. His visibility across the BN AO was consistently good. He needs to improve his tactical movement planning and staff product timeliness — the RS annex was 24 hours late. Overall a solid performer with clear growth areas.",
    },
  },

  // Obs 10: CPT Ogundimu (1-18 INF) JRTC OC/T — SOLID
  {
    id: oid(10),
    subject_id: PER.ID_1_18_INF_CH,
    observer_id: PER.CORPS_DEPUTY,
    org_id: ORG.BN_1_18_INF,
    observation_date: "2026-03-12",
    context: "ctc",
    echelon_setting: "battalion",
    training_event_id: null,
    ratings: {
      "CH-1.1": r(3), "CH-2.1": r(4, "Very receptive to OC/T feedback"),
      "CH-3.1": r(3), "CH-4.1": r(4), "CH-5.1": r(4), "CH-6.1": r(3),
      "CO-1.1": r(3), "CO-2.1": r(3), "CO-3.1": r(4),
      "CO-4.1": r(3, "New to position — tactical skills developing"),
      "CO-5.1": r(3), "CO-6.1": r(3),
      "CN-1.1": r(4, "Made deliberate effort to visit every platoon position"),
      "CN-2.1": r(4), "CN-3.1": r(3), "CN-4.1": r(3), "CN-5.1": r(3),
      "CF-1.1": r(4), "CF-2.1": r(3),
    },
    word_picture: {
      strengths: [
        s("CN-1.1", "Maintains consistent presence in unit work areas", "connection", "Visibility", 4),
        s("CH-2.1", "Actively seeks and incorporates feedback", "character", "Humility", 4),
      ],
      development_needs: [
        s("CO-4.1", "Demonstrates tactical proficiency appropriate to echelon", "competence", "Soldiering", 3),
        s("CH-1.1", "Maintains a regular, visible prayer/devotional life", "character", "Spirituality", 3),
      ],
      pillar_averages: { character: 3.5, competence: 3.2, connection: 3.4, constitutional: 3.5 },
      summary_narrative: "OC/T assessment: CPT Ogundimu is new to his position and this was his first JRTC rotation. He showed strong initiative in visiting every platoon position and was very receptive to coaching. His tactical and staff skills are still developing, which is expected for his experience level. His baseline is solid and he has strong potential for growth with continued mentorship.",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 11–13: BDE Chaplains by DIV Chaplains (1 per division)
  // ═══════════════════════════════════════════════════════════════════════

  // Obs 11: MAJ Okonkwo (1CD 1ABCT) by LTC Park (1CD) — STRONG
  {
    id: oid(11),
    subject_id: PER.CD_1ABCT_CH,
    observer_id: PER.CD_DIV_CH,
    org_id: ORG.DIV_1CD,
    observation_date: "2026-02-20",
    context: "garrison",
    echelon_setting: "division",
    training_event_id: null,
    ratings: {
      "CH-1.1": r(5), "CH-1.2": r(4), "CH-2.1": r(5, "Models teachable spirit for subordinate chaplains"),
      "CH-2.3": r(4), "CH-3.1": r(5), "CH-3.2": r(4),
      "CH-4.1": r(5), "CH-4.2": r(4), "CH-5.1": r(4), "CH-5.2": r(4),
      "CH-6.1": r(5, "Impeccable time management and standards compliance"),
      "CO-1.1": r(4), "CO-1.2": r(4), "CO-2.1": r(5, "BDE-level training program is the model for the division"),
      "CO-3.1": r(4), "CO-3.2": r(5),
      "CO-4.1": r(4), "CO-5.1": r(5, "Best RS annex production in the division"),
      "CO-5.2": r(4), "CO-6.1": r(5, "Develops subordinate chaplains through deliberate mentorship"),
      "CO-6.2": r(4),
      "CN-1.1": r(4), "CN-2.1": r(5), "CN-3.1": r(4),
      "CN-4.1": r(5), "CN-5.1": r(5),
      "CF-1.1": r(5), "CF-1.2": r(4), "CF-2.1": r(5), "CF-2.2": r(4),
    },
    word_picture: {
      strengths: [
        s("CO-6.1", "Sets clear expectations and holds UMT members accountable", "competence", "Leading", 5),
        s("CO-5.1", "Produces timely, accurate staff products", "competence", "Staffing", 5),
        s("CH-6.1", "Meets or exceeds all Army standards for appearance, fitness, and readiness", "character", "Discipline", 5),
        s("CF-2.1", "Coordinates religious accommodation for all faith groups", "constitutional", "Accommodation", 5),
      ],
      development_needs: [],
      pillar_averages: { character: 4.5, competence: 4.5, connection: 4.6, constitutional: 4.5 },
      summary_narrative: "MAJ Okonkwo is the strongest brigade chaplain in 1CD and a model for the division. His mentorship of subordinate chaplains is deliberate and effective — every BN chaplain in 1ABCT has shown measurable improvement. His staff products are consistently the best in the division, and his constitutional fidelity practices should be replicated across the formation. He is ready for battalion command or a key division staff position.",
    },
  },

  // Obs 12: MAJ Odom (1AD 1BCT) by LTC Grant (1AD) — STRONG
  {
    id: oid(12),
    subject_id: PER.AD_1BCT_CH,
    observer_id: PER.AD_DIV_CH,
    org_id: ORG.DIV_1AD,
    observation_date: "2026-02-05",
    context: "garrison",
    echelon_setting: "division",
    training_event_id: null,
    ratings: {
      "CH-1.1": r(4), "CH-2.1": r(4), "CH-3.1": r(5, "Integrity is his hallmark"),
      "CH-4.1": r(5), "CH-5.1": r(3, "Could be more emotionally attuned"),
      "CH-6.1": r(5),
      "CO-1.1": r(5, "Worship services consistently excellent"),
      "CO-2.1": r(5), "CO-3.1": r(4), "CO-4.1": r(5, "Former infantry officer — superb tactical skills"),
      "CO-5.1": r(5), "CO-6.1": r(4),
      "CN-1.1": r(3, "Tends to stay in the BDE HQ too much"),
      "CN-2.1": r(3, "Perceived as distant by junior Soldiers"),
      "CN-3.1": r(3), "CN-4.1": r(5), "CN-5.1": r(4),
      "CF-1.1": r(4), "CF-2.1": r(4),
    },
    word_picture: {
      strengths: [
        s("CO-4.1", "Demonstrates tactical proficiency appropriate to echelon", "competence", "Soldiering", 5),
        s("CO-1.1", "Delivers worship services that are biblically grounded and relevant", "competence", "Preaching", 5),
        s("CH-3.1", "Actions are consistent with stated values and beliefs", "character", "Authenticity", 5),
      ],
      development_needs: [
        s("CN-1.1", "Maintains consistent presence in unit work areas", "connection", "Visibility", 3),
        s("CN-2.1", "Soldiers at all ranks approach freely", "connection", "Affability", 3),
      ],
      pillar_averages: { character: 4.3, competence: 4.7, connection: 3.6, constitutional: 4.0 },
      summary_narrative: "MAJ Odom is a supremely competent chaplain whose tactical background and staff skills are the best in the division. His worship services are exceptional and his integrity is unquestioned. However, he struggles with relational warmth and accessibility — junior Soldiers perceive him as distant and unapproachable. Focused development on interpersonal connection and visibility in subordinate unit areas would make him a complete leader.",
    },
  },

  // Obs 13: MAJ Schaefer (1ID 2ABCT) by LTC Carter (1ID) — SOLID
  {
    id: oid(13),
    subject_id: PER.ID_2ABCT_CH,
    observer_id: PER.ID_DIV_CH,
    org_id: ORG.DIV_1ID,
    observation_date: "2026-03-01",
    context: "garrison",
    echelon_setting: "division",
    training_event_id: null,
    ratings: {
      "CH-1.1": r(4), "CH-2.1": r(4), "CH-3.1": r(4), "CH-4.1": r(4),
      "CH-5.1": r(4), "CH-6.1": r(3),
      "CO-1.1": r(4), "CO-2.1": r(4), "CO-3.1": r(3), "CO-4.1": r(3),
      "CO-5.1": r(4), "CO-6.1": r(4),
      "CN-1.1": r(4), "CN-2.1": r(4), "CN-3.1": r(3), "CN-4.1": r(4), "CN-5.1": r(3),
      "CF-1.1": r(4), "CF-2.1": r(4),
    },
    word_picture: {
      strengths: [
        s("CH-5.1", "Actively listens to Soldiers' concerns", "character", "Empathy", 4),
        s("CO-6.1", "Sets clear expectations and holds UMT members accountable", "competence", "Leading", 4),
      ],
      development_needs: [
        s("CH-6.1", "Meets Army standards for fitness and readiness", "character", "Discipline", 3),
        s("CO-3.1", "Provides responsive pastoral counseling", "competence", "Counseling/Care", 3),
      ],
      pillar_averages: { character: 3.8, competence: 3.7, connection: 3.6, constitutional: 4.0 },
      summary_narrative: "MAJ Schaefer is a dependable brigade chaplain who provides consistent leadership to the 2ABCT UMT. He is well-rounded with no critical deficiencies but also no standout strengths. His counseling skills and physical fitness should be areas of focus for the next development cycle. He is preparing his BDE well for the upcoming JRTC rotation.",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 14–17: BN RAS by Supervisory NCOs
  // ═══════════════════════════════════════════════════════════════════════

  // Obs 14: SGT Garcia (2-5 CAV) by SSG Ramirez (1ABCT)
  {
    id: oid(14),
    subject_id: PER.CD_2_5_CAV_NCO,
    observer_id: PER.CD_1ABCT_NCO,
    org_id: ORG.BDE_1CD_1ABCT,
    observation_date: "2026-02-14",
    context: "garrison",
    echelon_setting: "battalion",
    training_event_id: null,
    ratings: {
      "CH-4.1": r(5, "Models Army Values daily"), "CH-4.2": r(4),
      "CH-5.1": r(4), "CH-5.2": r(5, "Exceptional composure during crisis"),
      "CH-6.1": r(5), "CH-6.2": r(4),
      "CO-4.1": r(5, "Tactical skills well above grade"), "CO-4.2": r(5),
      "CO-5.1": r(4), "CO-5.2": r(4),
      "CO-6.1": r(3, "Needs development in supervising junior enlisted"),
      "CN-1.1": r(5), "CN-1.2": r(5, "Every company knows him by name"),
      "CN-2.1": r(4), "CN-4.1": r(5, "Projects professional bearing at all times"),
      "CN-5.1": r(4),
      "CF-1.1": r(4),
    },
    word_picture: {
      strengths: [
        s("CO-4.1", "Demonstrates tactical proficiency appropriate to echelon", "competence", "Soldiering", 5),
        s("CN-1.2", "Visits Soldiers in barracks, hospitals, and confinement facilities", "connection", "Visibility", 5),
        s("CH-5.2", "Demonstrates composure under pressure", "character", "Empathy", 5),
      ],
      development_needs: [
        s("CO-6.1", "Sets clear expectations and holds team members accountable", "competence", "Leading", 3),
      ],
      pillar_averages: { character: 4.5, competence: 4.3, connection: 4.6, constitutional: 4.0 },
      summary_narrative: "SGT Garcia is an outstanding RAS who excels in tactical operations and Soldier engagement. His visibility throughout the battalion is exemplary — every company knows him by name. He needs to develop leadership skills as he prepares for SSG responsibilities, particularly in holding junior Soldiers accountable and providing structured mentorship.",
    },
  },

  // Obs 15: SGT Davis (4-9 CAV) by SSG Achebe (2ABCT)
  {
    id: oid(15),
    subject_id: PER.CD_4_9_CAV_NCO,
    observer_id: PER.CD_2ABCT_NCO,
    org_id: ORG.BDE_1CD_2ABCT,
    observation_date: "2025-12-05",
    context: "ctc",
    echelon_setting: "battalion",
    training_event_id: null,
    ratings: {
      "CH-4.1": r(4), "CH-4.2": r(4), "CH-5.1": r(3), "CH-6.1": r(4),
      "CO-4.1": r(4, "Solid performance during NTC"), "CO-4.2": r(3),
      "CO-5.1": r(3), "CO-5.2": r(3),
      "CO-6.1": r(3),
      "CN-1.1": r(4), "CN-2.1": r(3), "CN-4.1": r(4), "CN-5.1": r(4),
      "CF-1.1": r(3),
    },
    word_picture: {
      strengths: [
        s("CO-4.1", "Demonstrates tactical proficiency appropriate to echelon", "competence", "Soldiering", 4),
        s("CN-5.1", "Continues effective ministry during extended operations", "connection", "Resilience", 4),
      ],
      development_needs: [
        s("CO-5.1", "Produces timely, accurate staff products", "competence", "Staffing", 3),
        s("CH-5.1", "Actively listens to Soldiers' concerns", "character", "Empathy", 3),
      ],
      pillar_averages: { character: 3.8, competence: 3.3, connection: 3.8, constitutional: 3.0 },
      summary_narrative: "SGT Davis performed solidly during the NTC rotation with good tactical skills and resilience. His administrative skills need development — CTOF management and supply tracking were inconsistent. He should focus on improving his staff processes and developing deeper empathetic listening skills.",
    },
  },

  // Obs 16: SGT Ramos (1-6 INF, 1AD) by SSG Gutierrez (1BCT)
  {
    id: oid(16),
    subject_id: PER.AD_1_6_INF_NCO,
    observer_id: PER.AD_1BCT_NCO,
    org_id: ORG.BDE_1AD_1BCT,
    observation_date: "2026-01-28",
    context: "ctc",
    echelon_setting: "battalion",
    training_event_id: null,
    ratings: {
      "CH-4.1": r(4), "CH-5.1": r(4), "CH-6.1": r(4),
      "CO-4.1": r(4), "CO-4.2": r(4, "Strong vehicle maintenance during NTC"),
      "CO-5.1": r(4), "CO-6.1": r(3),
      "CN-1.1": r(4), "CN-2.1": r(4), "CN-4.1": r(4), "CN-5.1": r(4),
      "CF-1.1": r(4),
    },
    word_picture: {
      strengths: [
        s("CO-4.2", "Operates effectively in field environments", "competence", "Soldiering", 4),
        s("CN-2.1", "Soldiers at all ranks approach freely", "connection", "Affability", 4),
      ],
      development_needs: [
        s("CO-6.1", "Sets clear expectations and holds team members accountable", "competence", "Leading", 3),
      ],
      pillar_averages: { character: 4.0, competence: 3.8, connection: 4.0, constitutional: 4.0 },
      summary_narrative: "SGT Ramos is a reliable RAS who performed well during the 1AD NTC rotation. His vehicle maintenance ensured the UMT had mobility throughout the exercise. He is approachable and builds good rapport with Soldiers. Leadership development should be the focus of his next IDP as he progresses toward SSG responsibilities.",
    },
  },

  // Obs 17: SGT Sullivan (1-18 INF, 1ID) by SSG Baptiste (2ABCT)
  {
    id: oid(17),
    subject_id: PER.ID_1_18_INF_NCO,
    observer_id: PER.ID_2ABCT_NCO,
    org_id: ORG.BDE_1ID_2ABCT,
    observation_date: "2026-03-14",
    context: "ctc",
    echelon_setting: "battalion",
    training_event_id: null,
    ratings: {
      "CH-4.1": r(4), "CH-5.1": r(3), "CH-6.1": r(3),
      "CO-4.1": r(3, "First JRTC rotation — developing field skills"),
      "CO-5.1": r(3), "CO-6.1": r(3),
      "CN-1.1": r(4, "Made effort to visit every position"),
      "CN-2.1": r(3), "CN-4.1": r(3), "CN-5.1": r(3),
      "CF-1.1": r(3),
    },
    word_picture: {
      strengths: [
        s("CN-1.1", "Maintains consistent presence in unit work areas", "connection", "Visibility", 4),
        s("CH-4.1", "Consistently demonstrates Army Values", "character", "Army Values", 4),
      ],
      development_needs: [
        s("CO-4.1", "Demonstrates tactical proficiency", "competence", "Soldiering", 3),
        s("CH-6.1", "Meets Army standards for appearance, fitness, and readiness", "character", "Discipline", 3),
      ],
      pillar_averages: { character: 3.3, competence: 3.0, connection: 3.3, constitutional: 3.0 },
      summary_narrative: "SGT Sullivan is a young NCO on his first JRTC rotation. He showed initiative in visiting Soldier positions but his field skills and administrative competencies are still developing. He would benefit from pairing with an experienced SSG for mentorship. His attitude and Army Values are solid — the tactical competence will come with experience.",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 18–20: BDE Chaplains by Corps Chaplain
  // ═══════════════════════════════════════════════════════════════════════

  // Obs 18: MAJ Foster (1CD 2ABCT) by COL Richardson — SOLID
  {
    id: oid(18),
    subject_id: PER.CD_2ABCT_CH,
    observer_id: PER.CORPS_CH,
    org_id: ORG.III_AC,
    observation_date: "2025-12-15",
    context: "ctc",
    echelon_setting: "corps",
    training_event_id: null,
    ratings: {
      "CH-1.1": r(4), "CH-2.1": r(4), "CH-3.1": r(4), "CH-4.1": r(4),
      "CH-5.1": r(4), "CH-6.1": r(4),
      "CO-1.1": r(3), "CO-2.1": r(4), "CO-3.1": r(4),
      "CO-4.1": r(4), "CO-5.1": r(4), "CO-6.1": r(4, "Effective oversight of 5 BN UMTs during NTC"),
      "CN-1.1": r(4), "CN-2.1": r(4), "CN-3.1": r(3), "CN-4.1": r(4), "CN-5.1": r(4),
      "CF-1.1": r(4), "CF-2.1": r(4),
    },
    word_picture: {
      strengths: [
        s("CO-6.1", "Sets clear expectations and holds UMT members accountable", "competence", "Leading", 4),
        s("CH-2.1", "Actively seeks and incorporates feedback", "character", "Humility", 4),
      ],
      development_needs: [
        s("CO-1.1", "Delivers worship services that are biblically grounded", "competence", "Preaching", 3),
      ],
      pillar_averages: { character: 4.0, competence: 3.8, connection: 3.8, constitutional: 4.0 },
      summary_narrative: "MAJ Foster effectively led 2ABCT's UMT section through the NTC rotation. His coordination of 5 BN UMTs was smooth and he maintained good oversight during the force-on-force phase. His personal worship delivery could be stronger — he relies too heavily on subordinate chaplains for preaching. Overall a solid brigade chaplain who is growing in his role.",
    },
  },

  // Obs 19: MAJ Singh (1AD 3BCT) by COL Richardson — DEVELOPING
  {
    id: oid(19),
    subject_id: PER.AD_3BCT_CH,
    observer_id: PER.CORPS_CH,
    org_id: ORG.III_AC,
    observation_date: "2026-01-30",
    context: "garrison",
    echelon_setting: "corps",
    training_event_id: null,
    ratings: {
      "CH-1.1": r(3), "CH-2.1": r(2, "Defensive when receiving feedback from peers"),
      "CH-3.1": r(3), "CH-4.1": r(3), "CH-5.1": r(3), "CH-6.1": r(3),
      "CO-1.1": r(3), "CO-2.1": r(3), "CO-3.1": r(3),
      "CO-4.1": r(3), "CO-5.1": r(2, "BDE RS products consistently late"),
      "CO-6.1": r(2, "Subordinate chaplains report unclear guidance"),
      "CN-1.1": r(3), "CN-2.1": r(3), "CN-3.1": r(2, "Difficult to reach after duty hours"),
      "CN-4.1": r(3), "CN-5.1": r(3),
      "CF-1.1": r(3), "CF-2.1": r(3),
    },
    word_picture: {
      strengths: [
        s("CO-3.1", "Provides responsive pastoral counseling", "competence", "Counseling/Care", 3),
      ],
      development_needs: [
        s("CO-5.1", "Produces timely, accurate staff products", "competence", "Staffing", 2),
        s("CO-6.1", "Sets clear expectations and holds UMT members accountable", "competence", "Leading", 2),
        s("CH-2.1", "Actively seeks and incorporates feedback", "character", "Humility", 2),
      ],
      pillar_averages: { character: 2.8, competence: 2.7, connection: 2.8, constitutional: 3.0 },
      summary_narrative: "MAJ Singh is a developing brigade chaplain who needs significant improvement in staff processes and leadership of his UMT section. His subordinate chaplains report unclear guidance and inconsistent expectations. He is defensive when receiving feedback, which limits his growth. Immediate mentorship from the division chaplain is recommended, with monthly check-ins on specific improvement metrics.",
    },
  },

  // Obs 20: MAJ Whitfield (3CR) by COL Richardson — STRUGGLING
  {
    id: oid(20),
    subject_id: PER.CR3_BDE_CH,
    observer_id: PER.CORPS_CH,
    org_id: ORG.III_AC,
    observation_date: "2026-02-25",
    context: "garrison",
    echelon_setting: "corps",
    training_event_id: null,
    ratings: {
      "CH-1.1": r(3), "CH-2.1": r(2, "Does not seek or incorporate feedback"),
      "CH-3.1": r(2, "Inconsistency between stated priorities and actual time allocation"),
      "CH-4.1": r(3), "CH-5.1": r(3), "CH-6.1": r(2, "Multiple missed deadlines and late arrivals"),
      "CO-1.1": r(3), "CO-2.1": r(2, "Training programs are outdated and not unit-specific"),
      "CO-3.1": r(3), "CO-4.1": r(2, "Failed land nav during BDE evaluation"),
      "CO-5.1": r(2, "RS annex rejected twice by regimental S3"),
      "CO-6.1": r(2, "Squadron chaplains not receiving mentorship or oversight"),
      "CN-1.1": r(2, "Rarely seen outside regimental HQ"),
      "CN-2.1": r(3), "CN-3.1": r(2, "Soldiers report not knowing how to reach the chaplain"),
      "CN-4.1": r(3), "CN-5.1": r(2, "Shows signs of burnout without seeking help"),
      "CF-1.1": r(3), "CF-2.1": r(3),
    },
    word_picture: {
      strengths: [
        s("CO-3.1", "Provides responsive pastoral counseling", "competence", "Counseling/Care", 3),
      ],
      development_needs: [
        s("CO-5.1", "Produces timely, accurate staff products", "competence", "Staffing", 2),
        s("CO-6.1", "Sets clear expectations and holds UMT members accountable", "competence", "Leading", 2),
        s("CN-1.1", "Maintains consistent presence in unit work areas", "connection", "Visibility", 2),
        s("CH-6.1", "Meets Army standards for appearance, fitness, and readiness", "character", "Discipline", 2),
      ],
      pillar_averages: { character: 2.5, competence: 2.3, connection: 2.4, constitutional: 3.0 },
      summary_narrative: "MAJ Whitfield is struggling in his role as regimental chaplain. Multiple areas require immediate attention: staff product quality, leadership of subordinate UMTs, physical presence in the formation, and personal discipline. He shows signs of burnout but has not sought help. The Corps Chaplain has directed a comprehensive IDP with bi-weekly check-ins and consideration for a developmental reassignment if improvement is not demonstrated within 90 days.",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 21–23: Self-Observations (CER Self-Assessment)
  // ═══════════════════════════════════════════════════════════════════════

  // Obs 21: CPT Kim self-assessment
  {
    id: oid(21),
    subject_id: PER.CD_2_5_CAV_CH,
    observer_id: PER.CD_2_5_CAV_CH,
    org_id: ORG.BN_2_5_CAV,
    observation_date: "2026-01-10",
    context: "garrison",
    echelon_setting: "battalion",
    training_event_id: null,
    ratings: {
      "CH-1.1": r(4), "CH-1.2": r(4), "CH-2.1": r(4), "CH-3.1": r(5),
      "CH-4.1": r(4), "CH-5.1": r(5), "CH-6.1": r(4),
      "CO-1.1": r(4), "CO-2.1": r(3, "I know my teaching needs work"),
      "CO-3.1": r(5), "CO-4.1": r(3, "I struggle with tactical planning integration"),
      "CO-5.1": r(3), "CO-6.1": r(4),
      "CN-1.1": r(5), "CN-2.1": r(4), "CN-3.1": r(4),
      "CN-4.1": r(4), "CN-5.1": r(4),
      "CF-1.1": r(5), "CF-2.1": r(4),
    },
    word_picture: {
      strengths: [
        s("CO-3.1", "Provides responsive pastoral counseling", "competence", "Counseling/Care", 5),
        s("CN-1.1", "Maintains consistent presence in unit work areas", "connection", "Visibility", 5),
      ],
      development_needs: [
        s("CO-2.1", "Develops and delivers resilience training", "competence", "Teaching", 3),
        s("CO-4.1", "Demonstrates tactical proficiency", "competence", "Soldiering", 3),
      ],
      pillar_averages: { character: 4.3, competence: 3.7, connection: 4.2, constitutional: 4.5 },
      summary_narrative: "Self-assessment: I believe my strongest areas are pastoral care and ministry presence — Soldiers know they can find me and trust me with their concerns. I recognize that my teaching delivery and tactical integration need significant improvement. I am pursuing additional training in both areas and am committed to achieving a T rating on my next FTX evaluation.",
    },
  },

  // Obs 22: MAJ Odom self-assessment
  {
    id: oid(22),
    subject_id: PER.AD_1BCT_CH,
    observer_id: PER.AD_1BCT_CH,
    org_id: ORG.BDE_1AD_1BCT,
    observation_date: "2026-01-20",
    context: "garrison",
    echelon_setting: "brigade",
    training_event_id: null,
    ratings: {
      "CH-1.1": r(4), "CH-2.1": r(4), "CH-3.1": r(5), "CH-4.1": r(5),
      "CH-5.1": r(4), "CH-6.1": r(5),
      "CO-1.1": r(5), "CO-2.1": r(5), "CO-3.1": r(4), "CO-4.1": r(5),
      "CO-5.1": r(5), "CO-6.1": r(4),
      "CN-1.1": r(4, "I think I am visible but recognize I could do more"),
      "CN-2.1": r(4), "CN-3.1": r(4), "CN-4.1": r(5), "CN-5.1": r(5),
      "CF-1.1": r(4), "CF-2.1": r(4),
    },
    word_picture: {
      strengths: [
        s("CO-4.1", "Demonstrates tactical proficiency", "competence", "Soldiering", 5),
        s("CO-5.1", "Produces timely, accurate staff products", "competence", "Staffing", 5),
      ],
      development_needs: [
        s("CN-1.1", "Maintains consistent presence in unit work areas", "connection", "Visibility", 4),
      ],
      pillar_averages: { character: 4.5, competence: 4.7, connection: 4.4, constitutional: 4.0 },
      summary_narrative: "Self-assessment: I consider my greatest strengths to be in competence — tactical skills, staff work, and worship delivery. I acknowledge that I tend to over-focus on the staff and operational side and could improve my interpersonal warmth and visibility in subordinate unit areas. I am working with my mentor to develop specific goals for improving my connection pillar.",
    },
  },

  // Obs 23: CPT Ogundimu self-assessment
  {
    id: oid(23),
    subject_id: PER.ID_1_18_INF_CH,
    observer_id: PER.ID_1_18_INF_CH,
    org_id: ORG.BN_1_18_INF,
    observation_date: "2026-03-05",
    context: "garrison",
    echelon_setting: "battalion",
    training_event_id: null,
    ratings: {
      "CH-1.1": r(3), "CH-2.1": r(4, "I actively seek feedback from my BDE CH"),
      "CH-3.1": r(3), "CH-4.1": r(4), "CH-5.1": r(4), "CH-6.1": r(3),
      "CO-1.1": r(3), "CO-2.1": r(3), "CO-3.1": r(3),
      "CO-4.1": r(2, "I know my tactical skills need the most work"),
      "CO-5.1": r(3), "CO-6.1": r(3),
      "CN-1.1": r(4), "CN-2.1": r(4), "CN-3.1": r(3),
      "CN-4.1": r(3), "CN-5.1": r(3),
      "CF-1.1": r(3), "CF-2.1": r(3),
    },
    word_picture: {
      strengths: [
        s("CH-2.1", "Actively seeks and incorporates feedback", "character", "Humility", 4),
        s("CN-1.1", "Maintains consistent presence in unit work areas", "connection", "Visibility", 4),
      ],
      development_needs: [
        s("CO-4.1", "Demonstrates tactical proficiency", "competence", "Soldiering", 2),
        s("CH-1.1", "Maintains a regular prayer/devotional life", "character", "Spirituality", 3),
      ],
      pillar_averages: { character: 3.5, competence: 2.8, connection: 3.4, constitutional: 3.0 },
      summary_narrative: "Self-assessment: As a new chaplain, I recognize I have significant growth areas, especially in tactical proficiency and staff product quality. My greatest strength is my willingness to learn and my commitment to being present with Soldiers. I am grateful for the mentorship of MAJ Schaefer and am committed to an aggressive development plan for FY26.",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 24–25: DIVARTY/ACB/SUST BDE Chaplain Observations
  // ═══════════════════════════════════════════════════════════════════════

  // Obs 24: MAJ Brennan (1CD DIVARTY) by LTC Park (1CD DIV)
  {
    id: oid(24),
    subject_id: PER.CD_DIVARTY_CH,
    observer_id: PER.CD_DIV_CH,
    org_id: ORG.DIV_1CD,
    observation_date: "2026-02-18",
    context: "garrison",
    echelon_setting: "division",
    training_event_id: null,
    ratings: {
      "CH-1.1": r(4), "CH-2.1": r(4), "CH-3.1": r(4), "CH-4.1": r(4),
      "CH-5.1": r(4), "CH-6.1": r(4),
      "CO-1.1": r(4), "CO-2.1": r(3), "CO-3.1": r(4),
      "CO-4.1": r(3, "Limited field experience as a DIVARTY chaplain"),
      "CO-5.1": r(4), "CO-6.1": r(4),
      "CN-1.1": r(4), "CN-2.1": r(4), "CN-3.1": r(4), "CN-4.1": r(4), "CN-5.1": r(4),
      "CF-1.1": r(4), "CF-2.1": r(4),
    },
    word_picture: {
      strengths: [
        s("CN-3.1", "Responds promptly to ministry requests", "connection", "Accessibility", 4),
        s("CO-5.1", "Produces timely, accurate staff products", "competence", "Staffing", 4),
      ],
      development_needs: [
        s("CO-4.1", "Demonstrates tactical proficiency", "competence", "Soldiering", 3),
        s("CO-2.1", "Develops and delivers training aligned with unit needs", "competence", "Teaching", 3),
      ],
      pillar_averages: { character: 4.0, competence: 3.7, connection: 4.0, constitutional: 4.0 },
      summary_narrative: "MAJ Brennan is a steady brigade chaplain who provides consistent, reliable ministry to the DIVARTY formation. He is accessible and produces good staff products. His teaching skills and field experience could be strengthened — he should seek opportunities for FTX participation with the firing batteries to build tactical credibility. Overall a solid performer meeting expectations.",
    },
  },

  // Obs 25: MAJ Boateng (1AD SUST) by LTC Grant (1AD DIV)
  {
    id: oid(25),
    subject_id: PER.AD_SUST_CH,
    observer_id: PER.AD_DIV_CH,
    org_id: ORG.DIV_1AD,
    observation_date: "2026-03-05",
    context: "garrison",
    echelon_setting: "division",
    training_event_id: null,
    ratings: {
      "CH-1.1": r(4), "CH-2.1": r(3), "CH-3.1": r(4), "CH-4.1": r(4),
      "CH-5.1": r(5, "Exceptional sensitivity to Soldier needs during deployment prep"),
      "CH-6.1": r(3),
      "CO-1.1": r(4), "CO-2.1": r(4, "Creative resilience training for logistics Soldiers"),
      "CO-3.1": r(5, "Outstanding counselor — referral of choice for the BDE commander"),
      "CO-4.1": r(3), "CO-5.1": r(3), "CO-6.1": r(3),
      "CN-1.1": r(4), "CN-2.1": r(5, "Most approachable chaplain in the division"),
      "CN-3.1": r(4), "CN-4.1": r(3), "CN-5.1": r(4),
      "CF-1.1": r(4), "CF-2.1": r(3),
    },
    word_picture: {
      strengths: [
        s("CO-3.1", "Provides responsive pastoral counseling", "competence", "Counseling/Care", 5),
        s("CH-5.1", "Recognizes and responds to signs of distress", "character", "Empathy", 5),
        s("CN-2.1", "Soldiers at all ranks approach freely", "connection", "Affability", 5),
      ],
      development_needs: [
        s("CO-5.1", "Produces timely, accurate staff products", "competence", "Staffing", 3),
        s("CO-6.1", "Sets clear expectations for UMT members", "competence", "Leading", 3),
      ],
      pillar_averages: { character: 3.8, competence: 3.7, connection: 4.0, constitutional: 3.5 },
      summary_narrative: "MAJ Boateng is a gifted pastoral counselor and the most approachable chaplain in 1AD. His empathy and relational warmth are exceptional — the BDE commander considers him the referral of choice for Soldiers in crisis. His administrative and leadership skills lag behind his ministry skills. He needs to improve staff product timeliness and provide clearer direction to his RAS. A strong ministry leader who needs to grow in military competence.",
    },
  },
];
