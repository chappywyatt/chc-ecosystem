/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TRAINING EVENTS — 85 events, Oct 2025 – Mar 2026
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Key scenarios:
 *   1CD 2ABCT NTC Rotation 26-02 (Nov 2025)
 *   1CD 1ABCT home station JRTC prep (Dec 2025 – Feb 2026)
 *   1CD 3ABCT garrison training cycle
 *   1CD Division Warfighter Exercise (Feb 2026)
 *   1AD 1BCT NTC rotation (Jan 2026)
 *   1AD 3BCT home station training
 *   1ID 2ABCT JRTC rotation (Mar 2026)
 *   1ID 1ABCT garrison training
 *   3CR squadron FTXs
 *   Corps MCT (Jan 2026)
 *
 * Ratings: ~25% T, ~25% T-, ~25% P, ~15% P-, ~10% U
 */

import { ORG } from "./organizations";
import { PER } from "./personnel";

const eid = (n: number) => `demo-2000-0000-0000-${String(n).padStart(12, "0")}`;

// Helper for compact event creation
interface TrainingEvent {
  id: string;
  task_id: string;
  title: string;
  org_id: string;
  date: string;
  location: string;
  context: string;
  rating: string;
  attendee_ids: string[];
  evaluator_id: string;
  lessons_learned: string;
  products: { name: string; type: string; url: string }[];
  qualifiers: { dayNight: string; mopp: string; extEval: boolean };
  metl_linked: boolean;
}

const ev = (
  n: number, task_id: string, title: string, org_id: string, date: string,
  location: string, context: string, rating: string,
  attendee_ids: string[], evaluator_id: string, lessons_learned: string,
  products: { name: string; type: string; url: string }[],
  qualifiers: { dayNight: string; mopp: string; extEval: boolean },
  metl_linked = true,
): TrainingEvent => ({
  id: eid(n), task_id, title, org_id, date, location, context, rating,
  attendee_ids, evaluator_id, lessons_learned, products, qualifiers, metl_linked,
});

const prod = (name: string, type: string) => ({ name, type, url: `/demo/products/${type}-${name.toLowerCase().replace(/\s+/g, "-")}.pdf` });

export const TRAINING_EVENTS: TrainingEvent[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // 1CD 2ABCT "Blackjack" NTC Rotation 26-02 (Nov 2025, Fort Irwin)
  // ═══════════════════════════════════════════════════════════════════════
  ev(1, "16-BN-3801", "Provide RS to a Battalion — 4-9 CAV (NTC)", ORG.BN_4_9_CAV, "2025-11-05",
    "The Box, NTC Fort Irwin", "ctc", "T-",
    [PER.CD_4_9_CAV_CH, PER.CD_4_9_CAV_NCO], PER.CD_2ABCT_CH,
    "SUSTAIN: UMT maintained 85% BN coverage during force-on-force phase. Worship services conducted at 3 locations. IMPROVE: RS annex synchronization with BN movement plan was 6 hours late. Need to integrate UMT into BN planning cycle earlier.",
    [prod("NTC RS Annex 4-9 CAV", "annex_q"), prod("NTC AAR 4-9 CAV", "aar")],
    { dayNight: "day", mopp: "none", extEval: true }),

  ev(2, "16-BN-3807", "Conduct MASCAL RS Operations — 4-9 CAV (NTC)", ORG.BN_4_9_CAV, "2025-11-08",
    "The Box, NTC Fort Irwin", "ctc", "T",
    [PER.CD_4_9_CAV_CH, PER.CD_4_9_CAV_NCO], PER.CD_2ABCT_CH,
    "SUSTAIN: Chaplain response to simulated MASCAL was within 15 minutes. Counseling during triage was exemplary. IMPROVE: RAS needs to pre-position CTOF supplies at the aid station before the event, not after notification.",
    [prod("MASCAL AAR 4-9 CAV", "aar"), prod("MASCAL Running Estimate", "running_estimate")],
    { dayNight: "night", mopp: "none", extEval: true }),

  ev(3, "16-BN-3801", "Provide RS to a Battalion — 1-5 CAV (NTC)", ORG.BN_1_5_CAV, "2025-11-06",
    "The Box, NTC Fort Irwin", "ctc", "P",
    [PER.CD_1_5_CAV_CH, PER.CD_1_5_CAV_NCO], PER.CD_2ABCT_CH,
    "SUSTAIN: RS annex was the best product in the BDE — textbook quality. Staff integration excellent. IMPROVE: Chaplain spent 80% of time in TOC. Forward companies reported zero chaplain visits during the 14-day rotation. Visibility is critical.",
    [prod("NTC RS Annex 1-5 CAV", "annex_q"), prod("NTC AAR 1-5 CAV", "aar")],
    { dayNight: "day", mopp: "none", extEval: true }),

  ev(4, "16-BN-3802", "Integrate UMT into CP — 1-8 CAV (NTC)", ORG.BN_1_8_CAV, "2025-11-07",
    "The Box, NTC Fort Irwin", "ctc", "T-",
    [PER.CD_1_8_CAV_CH, PER.CD_1_8_CAV_NCO], PER.CD_2ABCT_CH,
    "SUSTAIN: UMT was present at all BN syncs and maintained running estimate. IMPROVE: Running estimate needs to include more detailed religious demographics for the AO. RAS should track CTOF status on the COP.",
    [prod("CP Integration AAR", "aar"), prod("RS Running Estimate 1-8 CAV", "running_estimate")],
    { dayNight: "day", mopp: "none", extEval: true }),

  ev(5, "16-BN-3801", "Provide RS to a Battalion — 1-9 CAV (NTC)", ORG.BN_1_9_CAV, "2025-11-10",
    "The Box, NTC Fort Irwin", "ctc", "T",
    [PER.CD_1_9_CAV_CH, PER.CD_1_9_CAV_NCO], PER.CD_2ABCT_CH,
    "SUSTAIN: Outstanding ministry presence — chaplain visited every platoon position within 72 hours. Strong Bonds mini-session conducted during operational pause. IMPROVE: CTOF resupply plan was not coordinated with S4. Need dedicated logistics lane.",
    [prod("NTC RS Annex 1-9 CAV", "annex_q"), prod("NTC AAR 1-9 CAV", "aar"), prod("Strong Bonds Brief", "briefing")],
    { dayNight: "day", mopp: "none", extEval: true }),

  ev(6, "16-BDE-4000", "Coordinate BDE RS Operations — 2ABCT (NTC)", ORG.BDE_1CD_2ABCT, "2025-11-12",
    "NTC, Fort Irwin, CA", "ctc", "T-",
    [PER.CD_2ABCT_CH, PER.CD_2ABCT_NCO, PER.CD_4_9_CAV_CH, PER.CD_1_5_CAV_CH, PER.CD_1_8_CAV_CH, PER.CD_1_9_CAV_CH, PER.CD_3_16_FA_CH],
    PER.CD_DIV_CH,
    "SUSTAIN: BDE chaplain effectively synchronized 5 BN UMTs during the rotation. BDE RS sync matrix was updated daily. IMPROVE: Cross-BN RS coverage plan was not established for the transition phase. Need contingency plans for UMT displacement.",
    [prod("BDE RS Sync Matrix NTC", "sync_matrix"), prod("BDE RS AAR NTC", "aar"), prod("BDE Annex Q NTC", "annex_q")],
    { dayNight: "day", mopp: "none", extEval: true }),

  ev(7, "16-BN-3804", "Conduct RSA Operations — 3-16 FA (NTC)", ORG.BN_3_16_FA, "2025-11-09",
    "The Box, NTC Fort Irwin", "ctc", "P-",
    [PER.CD_3_16_FA_CH, PER.CD_3_16_FA_NCO], PER.CD_2ABCT_CH,
    "SUSTAIN: Field worship conducted under austere conditions with good Soldier participation. IMPROVE: RSA site was established in an exposed position with poor signature management. No security plan for the worship site. Force protection coordination with S2/S3 was absent.",
    [prod("RSA AAR 3-16 FA", "aar")],
    { dayNight: "day", mopp: "none", extEval: true }),

  // ═══════════════════════════════════════════════════════════════════════
  // 1CD 1ABCT "Ironhorse" Home Station BFT Prep (Dec 2025 – Feb 2026)
  // ═══════════════════════════════════════════════════════════════════════
  ev(8, "16-BN-3801", "Provide RS to a Battalion — 2-5 CAV", ORG.BN_2_5_CAV, "2025-12-03",
    "Bldg 4919, Fort Cavazos", "garrison", "T",
    [PER.CD_2_5_CAV_CH, PER.CD_2_5_CAV_NCO], PER.CD_1ABCT_CH,
    "SUSTAIN: Full-spectrum RS across the battalion footprint. Strong synchronization with S3 ops calendar. IMPROVE: Need to establish dedicated counseling space in the BN area — currently using a shared conference room.",
    [prod("RS Schedule 2-5 CAV", "briefing"), prod("RS Assessment", "running_estimate")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(9, "16-BN-3802", "Integrate UMT into CP — 1-7 CAV", ORG.BN_1_7_CAV, "2025-12-10",
    "1ABCT TOC, Fort Cavazos", "home_station", "P",
    [PER.CD_1_7_CAV_CH, PER.CD_1_7_CAV_NCO], PER.CD_1ABCT_CH,
    "SUSTAIN: Chaplain attended all MDMP sessions and provided religious area input. IMPROVE: RS annex was submitted 24 hours late. Running estimate template needs standardization across the BDE.",
    [prod("RS Annex 1-7 CAV", "annex_q"), prod("AAR CP Integration", "aar")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(10, "16-BN-3807", "Conduct MASCAL RS Operations — 2-8 CAV", ORG.BN_2_8_CAV, "2025-12-15",
    "TA 5, Fort Cavazos", "stx", "T-",
    [PER.CD_2_8_CAV_CH, PER.CD_2_8_CAV_NCO], PER.CD_1ABCT_CH,
    "SUSTAIN: UMT response time to MASCAL notification was under 20 minutes. Pastoral triage was methodical. IMPROVE: Need to rehearse CTOF setup under time pressure. RAS fumbled equipment setup during the lane.",
    [prod("MASCAL AAR 2-8 CAV", "aar"), prod("MASCAL Checklist", "running_estimate")],
    { dayNight: "night", mopp: "mopp2", extEval: false }),

  ev(11, "16-5-2002", "Conduct Strong Bonds Program — 2-5 CAV", ORG.BN_2_5_CAV, "2026-01-10",
    "DIV Chapel, Fort Cavazos", "garrison", "T",
    [PER.CD_2_5_CAV_CH, PER.CD_2_5_CAV_NCO], PER.CD_1ABCT_CH,
    "SUSTAIN: 94% participant satisfaction. Pre/post survey data shows measurable relationship skill improvement. Logistics were flawless. IMPROVE: Need Spanish-language materials for the next iteration — 15% of participants struggled with English-only curriculum.",
    [prod("Strong Bonds AAR 2-5 CAV", "aar"), prod("SB Facilitator Guide", "briefing")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(12, "16-BN-3801", "Provide RS to a Battalion — 2-12 CAV", ORG.BN_2_12_CAV, "2026-01-15",
    "Bldg 4919, Fort Cavazos", "garrison", "P-",
    [PER.CD_2_12_CAV_CH, PER.CD_2_12_CAV_NCO], PER.CD_1ABCT_CH,
    "SUSTAIN: Chaplain established good rapport with the new BN commander. IMPROVE: RS schedule was not de-conflicted with training calendar — 3 worship services canceled due to range conflicts. Need earlier coordination with S3.",
    [prod("RS Schedule 2-12 CAV", "briefing")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(13, "16-BN-3804", "Conduct RSA Operations — 2-5 CAV (STX)", ORG.BN_2_5_CAV, "2026-01-25",
    "TA 7, Fort Cavazos", "stx", "T-",
    [PER.CD_2_5_CAV_CH, PER.CD_2_5_CAV_NCO], PER.CD_1ABCT_CH,
    "SUSTAIN: RSA was well-positioned with good cover and concealment. Worship attendance was strong. IMPROVE: RSA tear-down took too long — need to practice rapid displacement drill.",
    [prod("RSA Operations AAR", "aar"), prod("RSA Site Plan", "running_estimate")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(14, "16-BDE-4000", "Coordinate BDE RS Operations — 1ABCT", ORG.BDE_1CD_1ABCT, "2026-02-01",
    "1ABCT TOC, Fort Cavazos", "home_station", "T",
    [PER.CD_1ABCT_CH, PER.CD_1ABCT_NCO, PER.CD_1_7_CAV_CH, PER.CD_2_5_CAV_CH, PER.CD_2_8_CAV_CH, PER.CD_2_12_CAV_CH],
    PER.CD_DIV_CH,
    "SUSTAIN: Annex Q fully synchronized with BDE OPLAN. All subordinate UMTs integrated into planning timeline. BDE chaplain's mentorship of BN chaplains is exemplary. IMPROVE: Need to exercise the RS plan under night conditions before JRTC.",
    [prod("BDE Annex Q 1ABCT", "annex_q"), prod("BDE RS Sync Matrix", "sync_matrix"), prod("BDE RS Brief", "briefing")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(15, "16-BN-0001", "Provide UMT Training — 1-82 FA", ORG.BN_1_82_FA, "2026-02-10",
    "Bldg 4919, Fort Cavazos", "garrison", "P",
    [PER.CD_1_82_FA_NCO], PER.CD_1ABCT_CH,
    "SUSTAIN: RAS demonstrated competence in CTOF management training. IMPROVE: Chaplain was TDY at CHBOLC — RAS conducted training alone. Need backup plan when CH is unavailable.",
    [prod("UMT Training AAR", "aar")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(16, "16-BN-3801", "Provide RS to a Battalion — 1-7 CAV (FTX)", ORG.BN_1_7_CAV, "2026-02-20",
    "TA 5, Fort Cavazos", "ftx", "T-",
    [PER.CD_1_7_CAV_CH, PER.CD_1_7_CAV_NCO], PER.CD_1ABCT_CH,
    "SUSTAIN: UMT reached 90% of BN elements within 48 hours. Night worship service was well-attended. IMPROVE: Counseling space in the field was not established until D+3. Need to include RSA in the initial occupation plan.",
    [prod("FTX RS AAR 1-7 CAV", "aar"), prod("FTX RS Annex", "annex_q")],
    { dayNight: "night", mopp: "none", extEval: false }),

  // ═══════════════════════════════════════════════════════════════════════
  // 1CD 3ABCT "Greywolf" Garrison Training Cycle
  // ═══════════════════════════════════════════════════════════════════════
  ev(17, "16-BN-3801", "Provide RS to a Battalion — 6-9 CAV", ORG.BN_6_9_CAV, "2025-10-14",
    "Bldg 4919, Fort Cavazos", "garrison", "P-",
    [PER.CD_6_9_CAV_CH, PER.CD_6_9_CAV_NCO], PER.CD_3ABCT_CH,
    "SUSTAIN: Chaplain made effort to visit all companies. IMPROVE: RS schedule not published until D-2. Worship service preparation was inadequate — sermon notes were incomplete. Need more deliberate planning.",
    [prod("RS Schedule 6-9 CAV", "briefing")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(18, "16-BN-3802", "Integrate UMT into CP — 2-7 CAV", ORG.BN_2_7_CAV, "2025-10-22",
    "3ABCT TOC, Fort Cavazos", "garrison", "P",
    [PER.CD_2_7_CAV_CH, PER.CD_2_7_CAV_NCO], PER.CD_3ABCT_CH,
    "SUSTAIN: Chaplain attended MDMP and provided quality religious area analysis. IMPROVE: RS running estimate was not maintained after the initial input. Need daily updates tied to the BN battle rhythm.",
    [prod("RS Annex 2-7 CAV", "annex_q"), prod("RS Running Estimate", "running_estimate")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(19, "16-BN-3801", "Provide RS to a Battalion — 3-8 CAV", ORG.BN_3_8_CAV, "2025-11-05",
    "Bldg 4919, Fort Cavazos", "garrison", "P-",
    [PER.CD_3_8_CAV_CH, PER.CD_3_8_CAV_NCO], PER.CD_3ABCT_CH,
    "SUSTAIN: Chaplain showed genuine care for Soldiers during counseling. IMPROVE: Multiple administrative deadlines missed. RS annex not submitted. SPC Price needs direct supervision and mentorship — he is too new to work independently.",
    [prod("RS AAR 3-8 CAV", "aar")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(20, "16-5-2001", "Conduct Moral Leadership Training — 1-12 CAV", ORG.BN_1_12_CAV, "2025-11-15",
    "DIV Chapel, Fort Cavazos", "garrison", "T-",
    [PER.CD_1_12_CAV_NCO], PER.CD_3ABCT_CH,
    "SUSTAIN: Training content was relevant and well-received by the audience. SGT Santos delivered effectively in the chaplain's absence. IMPROVE: Chaplain was TDY — need continuity plan for recurring training events.",
    [prod("MLT Lesson Plan", "briefing"), prod("MLT AAR", "aar")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(21, "16-BN-3804", "Conduct RSA Operations — 6-9 CAV (STX)", ORG.BN_6_9_CAV, "2026-01-10",
    "TA 7, Fort Cavazos", "stx", "U",
    [PER.CD_6_9_CAV_CH, PER.CD_6_9_CAV_NCO], PER.CD_3ABCT_CH,
    "SUSTAIN: Chaplain showed initiative in attempting to set up RSA. IMPROVE: RSA site selection violated METT-TC analysis — exposed position on a ridgeline with no cover. No security coordination with the BN S3. Equipment accountability was poor — CTOF items missing after ENDEX.",
    [prod("RSA STX AAR", "aar")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(22, "16-BN-3801", "Provide RS to a Battalion — 2-82 FA", ORG.BN_2_82_FA, "2026-01-20",
    "Bldg 4919, Fort Cavazos", "garrison", "T-",
    [PER.CD_2_82_FA_CH, PER.CD_2_82_FA_NCO], PER.CD_3ABCT_CH,
    "SUSTAIN: Chapel program growing — attendance up 25% since CPT Hoffman's arrival. Counseling availability is excellent. IMPROVE: Need to expand beyond Sunday worship — weekday devotional opportunities should be offered for shift workers.",
    [prod("RS Assessment 2-82 FA", "running_estimate"), prod("Worship Attendance Report", "briefing")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(23, "16-BDE-4001", "Supervise BDE UMT Training — 3ABCT", ORG.BDE_1CD_3ABCT, "2026-02-15",
    "3ABCT TOC, Fort Cavazos", "garrison", "P",
    [PER.CD_3ABCT_NCO, PER.CD_6_9_CAV_CH, PER.CD_2_7_CAV_CH, PER.CD_3_8_CAV_CH, PER.CD_1_12_CAV_CH, PER.CD_2_82_FA_CH],
    PER.CD_DIV_CH,
    "SUSTAIN: BDE RAS NCOIC managed the training event effectively in the BDE chaplain's absence (TDY). IMPROVE: BDE chaplain's TDY to CH-CCC during training cycle created a leadership vacuum. Two BN chaplains (6-9 CAV, 3-8 CAV) need intensive mentorship that is not occurring.",
    [prod("BDE UMT Training AAR", "aar"), prod("BDE Training Schedule", "briefing")],
    { dayNight: "day", mopp: "none", extEval: false }),

  // ═══════════════════════════════════════════════════════════════════════
  // 1CD Division Warfighter Exercise (Feb 2026)
  // ═══════════════════════════════════════════════════════════════════════
  ev(24, "71-DIV-4240", "Division WFX — 1CD RS Operations", ORG.DIV_1CD, "2026-02-22",
    "DIV Main CP, Fort Cavazos", "wfx", "T-",
    [PER.CD_DIV_CH, PER.CD_DIV_NCO, PER.CD_DIV_DEPUTY, PER.CD_DIV_OPS,
     PER.CD_1ABCT_CH, PER.CD_2ABCT_CH, PER.CD_3ABCT_NCO, PER.CD_DIVARTY_CH,
     PER.CD_AIRCAV_CH, PER.CD_SUST_CH, PER.ATTACHED_CH_1],
    PER.CORPS_CH,
    "SUSTAIN: Division RS cell maintained effective synchronization across 3 ABCTs. RS running estimate updated every 6 hours. Attached chaplain (FORSCOM aug) integrated smoothly. IMPROVE: Cross-BDE RS coverage during transition was uncoordinated. DIVARTY UMT was not included in the fires targeting meeting. Recommend adding RS input to the DIV targeting process.",
    [prod("DIV WFX RS Annex", "annex_q"), prod("DIV RS Sync Matrix", "sync_matrix"), prod("DIV WFX AAR", "aar"), prod("DIV RS Running Estimate", "running_estimate")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(25, "16-BDE-4800", "Conduct RS Staff Operations — 1CD WFX", ORG.DIV_1CD, "2026-02-24",
    "DIV Main CP, Fort Cavazos", "wfx", "P",
    [PER.CD_DIV_CH, PER.CD_DIV_DEPUTY, PER.CD_DIV_OPS], PER.CORPS_CH,
    "SUSTAIN: Deputy chaplain managed the RS cell effectively during 24-hour operations. IMPROVE: RS input to the MDMP was provided late during COA analysis. Need to establish a dedicated RS analyst for the WFX planning cycle.",
    [prod("WFX RS Staff AAR", "aar"), prod("RS Input to MDMP", "briefing")],
    { dayNight: "night", mopp: "none", extEval: false }),

  // ═══════════════════════════════════════════════════════════════════════
  // 1CD DIVARTY, AirCav, Sustainment — Garrison
  // ═══════════════════════════════════════════════════════════════════════
  ev(26, "16-BDE-4000", "Coordinate BDE RS Operations — DIVARTY", ORG.BDE_1CD_DIVARTY, "2025-12-05",
    "DIV Chapel, Fort Cavazos", "garrison", "T-",
    [PER.CD_DIVARTY_CH, PER.CD_DIVARTY_NCO], PER.CD_DIV_CH,
    "SUSTAIN: RS annex completed and synchronized with fires training schedule. IMPROVE: Chaplain needs to attend all BDE syncs — missed the targeting meeting twice this month.",
    [prod("DIVARTY RS Annex", "annex_q"), prod("DIVARTY AAR", "aar")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(27, "16-5-2002", "Conduct Strong Bonds Program — Air Cav BDE", ORG.BDE_1CD_AIRCAV, "2026-01-18",
    "DIV Chapel, Fort Cavazos", "garrison", "T",
    [PER.CD_AIRCAV_CH, PER.CD_AIRCAV_NCO], PER.CD_DIV_CH,
    "SUSTAIN: 97% satisfaction rate. Aviation-specific scenario integration was excellent. IMPROVE: Need to offer weekend option for aircrew who can't attend weekday sessions.",
    [prod("SB AAR Air Cav", "aar"), prod("SB Facilitator Guide Air Cav", "briefing")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(28, "16-BDE-4300", "Establish BDE RS Continuity — Sust BDE", ORG.BDE_1CD_SUST, "2026-02-05",
    "Bldg 4919, Fort Cavazos", "garrison", "P",
    [PER.CD_SUST_CH], PER.CD_DIV_CH,
    "SUSTAIN: Chaplain maintained effective RS coverage across dispersed sustainment units. IMPROVE: RAS NCOIC was on leave — no designated replacement. Need to establish a coverage plan for BDE RAS absence.",
    [prod("SUST BDE RS Assessment", "running_estimate")],
    { dayNight: "day", mopp: "none", extEval: false }),

  // ═══════════════════════════════════════════════════════════════════════
  // 1AD 1BCT "Ready First" NTC Rotation (Jan 2026)
  // ═══════════════════════════════════════════════════════════════════════
  ev(29, "16-BN-3801", "Provide RS to a Battalion — 1-6 INF (NTC)", ORG.BN_1_6_INF, "2026-01-15",
    "The Box, NTC Fort Irwin", "ctc", "T",
    [PER.AD_1_6_INF_CH, PER.AD_1_6_INF_NCO], PER.AD_1BCT_CH,
    "SUSTAIN: Outstanding ministry presence — chaplain visited every platoon within 48 hours. Creative field worship using terrain for a natural amphitheater. IMPROVE: RS running estimate updates lagged by 12 hours during high-tempo phases.",
    [prod("NTC RS Annex 1-6 INF", "annex_q"), prod("NTC AAR 1-6 INF", "aar")],
    { dayNight: "day", mopp: "none", extEval: true }),

  ev(30, "16-BN-3801", "Provide RS to a Battalion — 1-35 AR (NTC)", ORG.BN_1_35_AR, "2026-01-16",
    "The Box, NTC Fort Irwin", "ctc", "T-",
    [PER.AD_1_35_AR_CH, PER.AD_1_35_AR_NCO], PER.AD_1BCT_CH,
    "SUSTAIN: RS annex was well-synchronized with the armor BN's maneuver plan. IMPROVE: Chaplain needs to improve physical conditioning for dismounted operations in the NTC terrain. RAS vehicle maintenance was deferred too long.",
    [prod("NTC RS Annex 1-35 AR", "annex_q"), prod("NTC AAR 1-35 AR", "aar")],
    { dayNight: "day", mopp: "none", extEval: true }),

  ev(31, "16-BN-3807", "Conduct MASCAL RS Ops — 1-36 INF (NTC)", ORG.BN_1_36_INF, "2026-01-18",
    "The Box, NTC Fort Irwin", "ctc", "T",
    [PER.AD_1_36_INF_CH, PER.AD_1_36_INF_NCO], PER.AD_1BCT_CH,
    "SUSTAIN: MASCAL response was the best evaluated during the rotation. Chaplain was at the CCP within 8 minutes. IMPROVE: Post-MASCAL counseling space was not designated in advance. Recommend pre-designating a debrief area.",
    [prod("MASCAL AAR 1-36 INF", "aar"), prod("MASCAL Checklist", "running_estimate")],
    { dayNight: "night", mopp: "mopp2", extEval: true }),

  ev(32, "16-BN-3804", "Conduct RSA Operations — 4-1 FA (NTC)", ORG.BN_4_1_FA, "2026-01-20",
    "The Box, NTC Fort Irwin", "ctc", "P-",
    [PER.AD_4_1_FA_NCO], PER.AD_1BCT_CH,
    "SUSTAIN: SPC Ortiz showed initiative conducting RSA setup solo while CH was on leave. IMPROVE: RSA site was too close to firing positions — noise made worship impossible. Chaplain absence during NTC is a significant readiness concern.",
    [prod("RSA AAR 4-1 FA", "aar")],
    { dayNight: "day", mopp: "none", extEval: true }),

  ev(33, "16-BDE-4000", "Coordinate BDE RS Operations — 1AD 1BCT (NTC)", ORG.BDE_1AD_1BCT, "2026-01-22",
    "NTC, Fort Irwin, CA", "ctc", "T-",
    [PER.AD_1BCT_CH, PER.AD_1BCT_NCO, PER.AD_1_6_INF_CH, PER.AD_1_35_AR_CH, PER.AD_1_36_INF_CH, PER.ATTACHED_NCO_1],
    PER.AD_DIV_CH,
    "SUSTAIN: BDE chaplain maintained effective C2 of 4 BN UMTs plus ARNG augmentee. RS sync matrix was a model product. IMPROVE: One BN chaplain was on leave during NTC — this should have been flagged as a readiness issue during pre-deployment checks.",
    [prod("BDE RS Sync Matrix 1AD 1BCT", "sync_matrix"), prod("BDE NTC AAR", "aar"), prod("BDE Annex Q NTC", "annex_q")],
    { dayNight: "day", mopp: "none", extEval: true }),

  // ═══════════════════════════════════════════════════════════════════════
  // 1AD 2BCT "Strike" and 3BCT "Bulldog" Home Station
  // ═══════════════════════════════════════════════════════════════════════
  ev(34, "16-BN-3801", "Provide RS to a Battalion — 1-1 AD", ORG.BN_1_1_AD, "2025-10-20",
    "Biggs AAF, Fort Bliss", "garrison", "T",
    [PER.AD_1_1_AD_CH, PER.AD_1_1_AD_NCO], PER.AD_2BCT_CH,
    "SUSTAIN: Excellent RS coverage with creative outreach to reconnaissance platoons. IMPROVE: Need to coordinate RS for night shift elements on the airfield.",
    [prod("RS Assessment 1-1 AD", "running_estimate")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(35, "16-BN-3802", "Integrate UMT into CP — 1-37 AR", ORG.BN_1_37_AR, "2025-11-10",
    "BDE TOC, Fort Bliss", "home_station", "T-",
    [PER.AD_1_37_AR_CH, PER.AD_1_37_AR_NCO], PER.AD_2BCT_CH,
    "SUSTAIN: UMT present at all planning meetings. Running estimate maintained. IMPROVE: RS input to the OPORD was generic — needs to be tailored to the specific operational environment.",
    [prod("RS Annex 1-37 AR", "annex_q"), prod("RS Running Estimate", "running_estimate")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(36, "16-5-2002", "Conduct Strong Bonds Program — 6-1 CAV", ORG.BN_6_1_CAV, "2025-12-08",
    "Biggs AAF Chapel, Fort Bliss", "garrison", "T",
    [PER.AD_6_1_CAV_CH, PER.AD_6_1_CAV_NCO], PER.AD_2BCT_CH,
    "SUSTAIN: Program was well-organized with strong unit participation. Pre/post surveys showed significant improvement. IMPROVE: Consider offering a second session for Soldiers who could not attend due to duty requirements.",
    [prod("SB AAR 6-1 CAV", "aar"), prod("SB Survey Results", "briefing")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(37, "16-BN-3801", "Provide RS to a Battalion — 2-3 FA", ORG.BN_2_3_FA, "2026-01-05",
    "McGregor Range, Fort Bliss", "garrison", "P",
    [PER.AD_2_3_FA_CH, PER.AD_2_3_FA_NCO], PER.AD_2BCT_CH,
    "SUSTAIN: Chaplain adapted RS schedule to firing schedule effectively. IMPROVE: Limited presence in the battery areas during live fire — need to improve circulation plan around the firing timeline.",
    [prod("RS Schedule 2-3 FA", "briefing")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(38, "16-BN-3801", "Provide RS to a Battalion — 4-6 INF", ORG.BN_4_6_INF, "2025-10-28",
    "Dona Ana Range Complex, Fort Bliss", "garrison", "T-",
    [PER.AD_4_6_INF_CH, PER.AD_4_6_INF_NCO], PER.AD_3BCT_CH,
    "SUSTAIN: Good rapport with the infantry Soldiers. Regular presence at PT formations. IMPROVE: Need to establish religious support for remote training detachments at Dona Ana.",
    [prod("RS Assessment 4-6 INF", "running_estimate")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(39, "16-BN-3804", "Conduct RSA Operations — 1-77 AR (FTX)", ORG.BN_1_77_AR, "2025-11-20",
    "McGregor Range, Fort Bliss", "ftx", "P",
    [PER.AD_1_77_AR_NCO], PER.AD_3BCT_CH,
    "SUSTAIN: RAS conducted RSA operations solo while chaplain was TDY to CH-CCC. Site selection was appropriate. IMPROVE: RSA was understaffed — need to coordinate augmentation when CH is unavailable.",
    [prod("RSA AAR 1-77 AR", "aar")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(40, "16-BN-3801", "Provide RS to a Battalion — 6-6 CAV", ORG.BN_6_6_CAV, "2025-12-12",
    "Dona Ana Range Complex, Fort Bliss", "ftx", "T",
    [PER.AD_6_6_CAV_CH, PER.AD_6_6_CAV_NCO], PER.AD_3BCT_CH,
    "SUSTAIN: Exceptional ministry presence during the FTX. Chaplain conducted services at 4 locations. IMPROVE: CTOF accountability was inconsistent — items missing from layout at ENDEX.",
    [prod("FTX RS AAR 6-6 CAV", "aar"), prod("RS Annex 6-6 CAV", "annex_q")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(41, "16-5-2001", "Conduct Moral Leadership Training — 4-27 FA", ORG.BN_4_27_FA, "2026-01-22",
    "Biggs AAF Chapel, Fort Bliss", "garrison", "T-",
    [PER.AD_4_27_FA_CH, PER.AD_4_27_FA_NCO, PER.LT_1AD_3BCT_CH], PER.AD_3BCT_CH,
    "SUSTAIN: 1LT Akinyemi co-facilitated effectively with CPT Fernandez. Content was relevant. IMPROVE: Need to develop scenario-based exercises rather than lecture-only format.",
    [prod("MLT AAR 4-27 FA", "aar"), prod("MLT Lesson Plan", "briefing")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(42, "16-BDE-4000", "Coordinate BDE RS Operations — 3BCT", ORG.BDE_1AD_3BCT, "2026-02-10",
    "BDE TOC, Fort Bliss", "home_station", "P-",
    [PER.AD_3BCT_CH, PER.AD_3BCT_NCO, PER.AD_4_6_INF_CH, PER.AD_6_6_CAV_CH, PER.AD_4_27_FA_CH],
    PER.AD_DIV_CH,
    "SUSTAIN: BDE chaplain attempted to coordinate all BN UMTs. IMPROVE: RS sync matrix was incomplete — two BNs were not included. BDE chaplain's guidance to subordinates was unclear, creating confusion about reporting requirements.",
    [prod("BDE RS Brief 3BCT", "briefing"), prod("BDE AAR 3BCT", "aar")],
    { dayNight: "day", mopp: "none", extEval: false }),

  // ═══════════════════════════════════════════════════════════════════════
  // 1AD DIVARTY, CAB, Sustainment
  // ═══════════════════════════════════════════════════════════════════════
  ev(43, "16-BDE-4000", "Coordinate BDE RS Operations — 1AD DIVARTY", ORG.BDE_1AD_DIVARTY, "2026-01-08",
    "BDE TOC, Fort Bliss", "garrison", "T",
    [PER.AD_DIVARTY_CH, PER.AD_DIVARTY_NCO], PER.AD_DIV_CH,
    "SUSTAIN: Effective coordination of RS across fires BDE. Integration with targeting meeting was excellent. IMPROVE: Need to develop RS plan for deployed THAAD/Patriot crews.",
    [prod("DIVARTY RS Annex", "annex_q"), prod("DIVARTY RS AAR", "aar")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(44, "16-5-2002", "Conduct Strong Bonds — 1AD CAB", ORG.BDE_1AD_CAB, "2026-02-15",
    "Biggs AAF Chapel, Fort Bliss", "garrison", "T-",
    [PER.AD_CAB_CH, PER.AD_CAB_NCO], PER.AD_DIV_CH,
    "SUSTAIN: Aviation-specific scenarios resonated with aircrew families. High participation rate. IMPROVE: Need follow-up program for couples who identified significant stressors during the workshop.",
    [prod("SB AAR CAB", "aar"), prod("SB Follow-up Plan", "briefing")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(45, "16-BDE-4300", "Establish BDE RS Continuity — 1AD Sust", ORG.BDE_1AD_SUST, "2026-03-01",
    "Biggs AAF, Fort Bliss", "garrison", "T",
    [PER.AD_SUST_CH, PER.AD_SUST_NCO], PER.AD_DIV_CH,
    "SUSTAIN: Outstanding counseling support during deployment preparation. BDE CDR commended the chaplain's responsiveness. IMPROVE: Need to formalize the RS coverage plan for rear detachment operations.",
    [prod("SUST BDE RS Continuity Plan", "running_estimate"), prod("RS AAR Sust BDE", "aar")],
    { dayNight: "day", mopp: "none", extEval: false }),

  // ═══════════════════════════════════════════════════════════════════════
  // 1ID 1ABCT "Devil" Garrison Training
  // ═══════════════════════════════════════════════════════════════════════
  ev(46, "16-BN-3801", "Provide RS to a Battalion — 2-34 AR", ORG.BN_2_34_AR, "2025-10-15",
    "Riley Chapel, Fort Riley", "garrison", "T",
    [PER.ID_2_34_AR_CH, PER.ID_2_34_AR_NCO], PER.ID_1ABCT_CH,
    "SUSTAIN: Chaplain established excellent RS rhythm with the BN. Weekly Bible study has 30+ regular attendees. IMPROVE: Need to expand ministry footprint beyond the chapel — visit motor pools and ranges more frequently.",
    [prod("RS Assessment 2-34 AR", "running_estimate"), prod("Ministry Schedule", "briefing")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(47, "16-BN-3801", "Provide RS to a Battalion — 1-63 AR", ORG.BN_1_63_AR, "2025-11-01",
    "TA 12, Fort Riley", "stx", "T-",
    [PER.ID_1_63_AR_CH, PER.ID_1_63_AR_NCO], PER.ID_1ABCT_CH,
    "SUSTAIN: Field worship conducted at two locations during the STX. Good integration with the training plan. IMPROVE: RS running estimate not maintained during the exercise. Need to assign this as a primary RAS task.",
    [prod("STX RS AAR 1-63 AR", "aar"), prod("RS Annex 1-63 AR", "annex_q")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(48, "16-BN-3802", "Integrate UMT into CP — 5-4 CAV", ORG.BN_5_4_CAV, "2025-11-18",
    "TA 12, Fort Riley", "stx", "P",
    [PER.ID_5_4_CAV_CH, PER.ID_5_4_CAV_NCO], PER.ID_1ABCT_CH,
    "SUSTAIN: Chaplain attended all planning sessions. Good coordination with BN S1 on personnel status. IMPROVE: RS annex needs to include more detail on religious demographics of the AO. Running estimate format needs standardization.",
    [prod("CP Integration AAR 5-4 CAV", "aar"), prod("RS Annex 5-4 CAV", "annex_q")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(49, "16-5-2002", "Conduct Strong Bonds Program — 1-5 FA", ORG.BN_1_5_FA, "2025-12-10",
    "Riley Chapel, Fort Riley", "garrison", "T",
    [PER.ID_1_5_FA_CH, PER.ID_1_5_FA_NCO], PER.ID_1ABCT_CH,
    "SUSTAIN: Program was well-organized with excellent pre-event marketing. 100% of couples completed post-surveys. IMPROVE: Consider adding a Spanish-language option for future iterations.",
    [prod("SB AAR 1-5 FA", "aar"), prod("SB Survey Results", "briefing")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(50, "16-BDE-4000", "Coordinate BDE RS Operations — 1ID 1ABCT", ORG.BDE_1ID_1ABCT, "2026-01-20",
    "TA 12, Fort Riley", "home_station", "T",
    [PER.ID_1ABCT_CH, PER.ID_1ABCT_NCO, PER.ID_2_34_AR_CH, PER.ID_1_63_AR_CH, PER.ID_5_4_CAV_CH, PER.ID_1_5_FA_CH],
    PER.ID_DIV_CH,
    "SUSTAIN: BDE RS sync matrix is the model for the division. All BN UMTs are well-integrated. BDE chaplain's mentorship program is producing results. IMPROVE: Need to exercise the RS plan under field conditions before next CTC rotation.",
    [prod("BDE Annex Q 1ID 1ABCT", "annex_q"), prod("BDE RS Sync Matrix", "sync_matrix"), prod("BDE RS AAR", "aar")],
    { dayNight: "day", mopp: "none", extEval: false }),

  // ═══════════════════════════════════════════════════════════════════════
  // 1ID 2ABCT "Dagger" JRTC Rotation (Mar 2026)
  // ═══════════════════════════════════════════════════════════════════════
  ev(51, "16-BN-3801", "Provide RS to a Battalion — 1-18 INF (JRTC)", ORG.BN_1_18_INF, "2026-03-08",
    "JRTC, Fort Johnson, LA", "ctc", "P",
    [PER.ID_1_18_INF_CH, PER.ID_1_18_INF_NCO], PER.ID_2ABCT_CH,
    "SUSTAIN: Chaplain made deliberate effort to visit every platoon position. Humility and willingness to learn from OC/T was notable. IMPROVE: Tactical skills still developing — movement planning was inefficient. RS annex was submitted 8 hours late.",
    [prod("JRTC RS Annex 1-18 INF", "annex_q"), prod("JRTC AAR 1-18 INF", "aar")],
    { dayNight: "day", mopp: "none", extEval: true }),

  ev(52, "16-BN-3801", "Provide RS to a Battalion — 1-26 INF (JRTC)", ORG.BN_1_26_INF, "2026-03-09",
    "JRTC, Fort Johnson, LA", "ctc", "T-",
    [PER.ID_1_26_INF_CH, PER.ID_1_26_INF_NCO], PER.ID_2ABCT_CH,
    "SUSTAIN: Field worship was creative and well-attended. RS annex was synchronized with maneuver plan. IMPROVE: CTOF supplies ran short on D+7 — need to coordinate resupply through BN S4 earlier.",
    [prod("JRTC RS Annex 1-26 INF", "annex_q"), prod("JRTC AAR 1-26 INF", "aar")],
    { dayNight: "day", mopp: "none", extEval: true }),

  ev(53, "16-BN-3807", "Conduct MASCAL RS Ops — 1-4 CAV (JRTC)", ORG.BN_1_4_CAV, "2026-03-11",
    "JRTC, Fort Johnson, LA", "ctc", "T",
    [PER.ID_1_4_CAV_CH, PER.ID_1_4_CAV_NCO], PER.ID_2ABCT_CH,
    "SUSTAIN: MASCAL response was exemplary — chaplain at CCP within 10 minutes. Crisis counseling was compassionate and effective. IMPROVE: Post-MASCAL debrief for the UMT was not conducted. Recommend establishing an immediate after-action debrief protocol.",
    [prod("JRTC MASCAL AAR 1-4 CAV", "aar"), prod("MASCAL Running Estimate", "running_estimate")],
    { dayNight: "night", mopp: "none", extEval: true }),

  ev(54, "16-BN-3801", "Provide RS to a Battalion — 1-7 FA (JRTC)", ORG.BN_1_7_FA, "2026-03-10",
    "JRTC, Fort Johnson, LA", "ctc", "P-",
    [PER.ID_1_7_FA_NCO], PER.ID_2ABCT_CH,
    "SUSTAIN: RAS maintained RS presence despite chaplain being TDY. SGT Kim showed initiative. IMPROVE: Battalion had no chaplain during JRTC — 1LT Ruiz was still at CHBOLC follow-on. This is a readiness failure at the BDE level.",
    [prod("JRTC AAR 1-7 FA", "aar")],
    { dayNight: "day", mopp: "none", extEval: true }),

  ev(55, "16-BDE-4000", "Coordinate BDE RS Operations — 1ID 2ABCT (JRTC)", ORG.BDE_1ID_2ABCT, "2026-03-13",
    "JRTC, Fort Johnson, LA", "ctc", "P",
    [PER.ID_2ABCT_CH, PER.ID_2ABCT_NCO, PER.ID_1_18_INF_CH, PER.ID_1_26_INF_CH, PER.ID_1_4_CAV_CH],
    PER.ID_DIV_CH,
    "SUSTAIN: BDE chaplain maintained good oversight of 4 BN UMTs. Cross-BN coverage plan was executed when 1-7 FA had no chaplain. IMPROVE: One BN without a chaplain during JRTC is a significant gap. BDE must flag readiness issues earlier in the pre-deployment timeline.",
    [prod("BDE JRTC RS Sync Matrix", "sync_matrix"), prod("BDE JRTC AAR", "aar"), prod("BDE Annex Q JRTC", "annex_q")],
    { dayNight: "day", mopp: "none", extEval: true }),

  // ═══════════════════════════════════════════════════════════════════════
  // 1ID DIVARTY, CAB, Sustainment — Garrison
  // ═══════════════════════════════════════════════════════════════════════
  ev(56, "16-BDE-4000", "Coordinate BDE RS Ops — 1ID DIVARTY", ORG.BDE_1ID_DIVARTY, "2025-12-01",
    "Riley Chapel, Fort Riley", "garrison", "T-",
    [PER.ID_DIVARTY_CH, PER.ID_DIVARTY_NCO], PER.ID_DIV_CH,
    "SUSTAIN: RS well-integrated with DIVARTY training schedule. IMPROVE: Need to establish RS outreach for geographically dispersed THAAD units.",
    [prod("DIVARTY RS Annex 1ID", "annex_q")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(57, "16-5-2002", "Conduct Strong Bonds — 1ID CAB", ORG.BDE_1ID_CAB, "2026-02-20",
    "Riley Chapel, Fort Riley", "garrison", "T",
    [PER.ID_CAB_CH, PER.ID_CAB_NCO], PER.ID_DIV_CH,
    "SUSTAIN: Aviation-specific family readiness scenarios were highly effective. Outstanding coordination with FRG leadership. IMPROVE: Need evening option for dual-military couples.",
    [prod("SB AAR 1ID CAB", "aar")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(58, "16-BDE-4300", "Establish BDE RS Continuity — 1ID Sust", ORG.BDE_1ID_SUST, "2026-01-15",
    "Riley Chapel, Fort Riley", "garrison", "P",
    [PER.ID_SUST_CH, PER.ID_SUST_NCO], PER.ID_DIV_CH,
    "SUSTAIN: Chaplain maintained RS coverage across the dispersed sustainment formation. IMPROVE: Need formalized RS handoff procedures for incoming/outgoing personnel.",
    [prod("SUST BDE RS Plan 1ID", "running_estimate")],
    { dayNight: "day", mopp: "none", extEval: false }),

  // ═══════════════════════════════════════════════════════════════════════
  // 3CR Squadron FTXs
  // ═══════════════════════════════════════════════════════════════════════
  ev(59, "16-BN-3801", "Provide RS to Squadron — 3CR 1st Sqdn (FTX)", ORG.BN_3CR_1SQ, "2025-11-08",
    "TA 5, Fort Cavazos", "ftx", "T",
    [PER.CR3_1SQ_CH, PER.CR3_1SQ_NCO], PER.CR3_BDE_CH,
    "SUSTAIN: Excellent ministry presence across a wide AO. Chaplain reached all troop positions. IMPROVE: RSA teardown was slow — need to rehearse rapid displacement procedures.",
    [prod("FTX RS AAR 3CR 1SQ", "aar"), prod("RS Annex 3CR 1SQ", "annex_q")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(60, "16-BN-3801", "Provide RS to Squadron — 3CR 2nd Sqdn (FTX)", ORG.BN_3CR_2SQ, "2025-11-10",
    "TA 7, Fort Cavazos", "ftx", "T-",
    [PER.CR3_2SQ_CH, PER.CR3_2SQ_NCO, PER.LT_3CR_CH], PER.CR3_BDE_CH,
    "SUSTAIN: 1LT Njoku integrated well into the squadron UMT for the exercise. Good teamwork. IMPROVE: Communication between the two chaplains needs improvement — overlapping coverage in some areas while others were unvisited.",
    [prod("FTX RS AAR 3CR 2SQ", "aar"), prod("RS Running Estimate 3CR 2SQ", "running_estimate")],
    { dayNight: "night", mopp: "none", extEval: false }),

  ev(61, "16-BDE-4000", "Coordinate Regimental RS Operations — 3CR", ORG.BDE_3CR, "2025-12-15",
    "Bldg 4919, Fort Cavazos", "garrison", "P-",
    [PER.CR3_BDE_CH, PER.CR3_BDE_NCO, PER.CR3_1SQ_CH, PER.CR3_2SQ_CH], PER.CORPS_CH,
    "SUSTAIN: Squadron chaplains are performing well. IMPROVE: Regimental chaplain's RS annex was rejected by the S3 — incomplete and not synchronized with the regimental training plan. Need significant improvement in staff product quality.",
    [prod("3CR RS AAR", "aar")],
    { dayNight: "day", mopp: "none", extEval: false }),

  // ═══════════════════════════════════════════════════════════════════════
  // Corps MCT (Jan 2026)
  // ═══════════════════════════════════════════════════════════════════════
  ev(62, "16-BDE-6305", "Corps RS Staff Integration — MCT", ORG.III_AC, "2026-01-12",
    "DIV Main CP, Fort Cavazos", "ltp", "T-",
    [PER.CORPS_CH, PER.CORPS_SGM, PER.CORPS_DEPUTY, PER.CORPS_OPS,
     PER.CD_DIV_CH, PER.AD_DIV_CH, PER.ID_DIV_CH],
    PER.CORPS_CH,
    "SUSTAIN: All three division chaplains participated in the MCT. Corps RS running estimate was maintained continuously. IMPROVE: RS input to the targeting process was not integrated — corps RS cell needs representation at the targeting board.",
    [prod("Corps MCT RS AAR", "aar"), prod("Corps RS Running Estimate", "running_estimate"), prod("Corps RS Sync Matrix", "sync_matrix")],
    { dayNight: "day", mopp: "none", extEval: false }),

  // ═══════════════════════════════════════════════════════════════════════
  // Corps Separate BDEs — Training Events
  // ═══════════════════════════════════════════════════════════════════════
  ev(63, "16-BDE-4000", "Coordinate BDE RS Ops — 13th ACSC", ORG.BDE_13TH_ACSC, "2025-12-10",
    "Bldg 4919, Fort Cavazos", "garrison", "T",
    [PER.ACSC_CH, PER.ACSC_NCO], PER.CORPS_DEPUTY,
    "SUSTAIN: RS well-integrated with sustainment operations. Chaplain's outreach to warehouse and motor pool Soldiers was exemplary. IMPROVE: Need RS plan for deployed sustainment elements.",
    [prod("13th ACSC RS Annex", "annex_q"), prod("13th ACSC RS AAR", "aar")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(64, "16-BDE-4000", "Coordinate BDE RS Ops — 36th EB", ORG.BDE_36TH_EB, "2026-01-25",
    "Bldg 4919, Fort Cavazos", "garrison", "T-",
    [PER.EB36_CH, PER.EB36_NCO], PER.CORPS_DEPUTY,
    "SUSTAIN: Good integration with engineer training cycle. Field worship during sapper exercises was creative. IMPROVE: Need to coordinate RS for geographically dispersed construction platoons.",
    [prod("36th EB RS Annex", "annex_q")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(65, "16-BDE-4000", "Coordinate BDE RS Ops — 504th MIB", ORG.BDE_504TH_MIB, "2026-02-08",
    "Bldg 4919, Fort Cavazos", "garrison", "P",
    [PER.MIB504_CH, PER.MIB504_NCO], PER.CORPS_DEPUTY,
    "SUSTAIN: Chaplain maintained good rapport with MI Soldiers despite classification barriers. IMPROVE: Need to develop RS approach for SCIF-based personnel who cannot leave their work areas easily.",
    [prod("504th MIB RS AAR", "aar")],
    { dayNight: "day", mopp: "none", extEval: false }),

  // ═══════════════════════════════════════════════════════════════════════
  // Individual Training Events (805D tasks)
  // ═══════════════════════════════════════════════════════════════════════
  ev(66, "805D-56A-6000", "Perform Chaplain Duties — CPT Kim", ORG.BN_2_5_CAV, "2025-10-20",
    "Bldg 4919, Fort Cavazos", "garrison", "T",
    [PER.CD_2_5_CAV_CH], PER.CD_1ABCT_CH,
    "SUSTAIN: CPT Kim consistently performs all chaplain duties to standard. Pastoral care is his strongest area. IMPROVE: Need to develop RS planning skills for upcoming JRTC rotation.",
    [prod("Individual Assessment CPT Kim", "briefing")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(67, "805D-56A-6203", "Provide Unit Advisement — MAJ Okonkwo", ORG.BDE_1CD_1ABCT, "2025-11-15",
    "1ABCT TOC, Fort Cavazos", "garrison", "T",
    [PER.CD_1ABCT_CH], PER.CD_DIV_CH,
    "SUSTAIN: MAJ Okonkwo's command advisement is the model for the division. Commander relies heavily on his RS input. IMPROVE: Need to document advisement sessions for continuity purposes.",
    [prod("Advisement Assessment MAJ Okonkwo", "briefing")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(68, "805D-56M-5000", "Perform RAS Duties — SGT Garcia", ORG.BN_2_5_CAV, "2025-12-01",
    "Bldg 4919, Fort Cavazos", "garrison", "T",
    [PER.CD_2_5_CAV_NCO], PER.CD_1ABCT_NCO,
    "SUSTAIN: SGT Garcia is the standard-bearer for RAS performance in the BDE. Tactical skills, visibility, and professionalism are all outstanding. IMPROVE: Needs to develop leadership skills for future SSG responsibilities.",
    [prod("Individual Assessment SGT Garcia", "briefing")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(69, "805D-56A-6000", "Perform Chaplain Duties — CPT Henderson", ORG.BN_1_9_CAV, "2026-01-05",
    "Bldg 4919, Fort Cavazos", "garrison", "T-",
    [PER.CD_1_9_CAV_CH], PER.CD_2ABCT_CH,
    "SUSTAIN: CPT Henderson's worship services continue to grow attendance. Pastoral care and approachability are excellent. IMPROVE: Physical fitness and tactical field skills need targeted improvement before next CTC rotation.",
    [prod("Individual Assessment CPT Henderson", "briefing")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(70, "805D-56M-5001", "Manage CTOF Operations — SGT Davis", ORG.BN_4_9_CAV, "2025-12-15",
    "Bldg 4919, Fort Cavazos", "garrison", "P",
    [PER.CD_4_9_CAV_NCO], PER.CD_2ABCT_NCO,
    "SUSTAIN: SGT Davis maintains adequate CTOF accountability in garrison. IMPROVE: NTC performance showed CTOF management breaks down under field conditions. Need additional reps before next CTC.",
    [prod("CTOF Assessment SGT Davis", "briefing")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(71, "805D-56A-6000", "Perform Chaplain Duties — CPT Mitchell", ORG.BN_1_6_INF, "2026-02-01",
    "BDE TOC, Fort Bliss", "garrison", "T",
    [PER.AD_1_6_INF_CH], PER.AD_1BCT_CH,
    "SUSTAIN: CPT Mitchell demonstrated strong overall chaplain performance during the NTC rotation and garrison period. Ministry presence is excellent. IMPROVE: Staff product timeliness needs continued focus.",
    [prod("Individual Assessment CPT Mitchell", "briefing")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(72, "805D-56A-6000", "Perform Chaplain Duties — CPT Ogundimu", ORG.BN_1_18_INF, "2026-02-15",
    "Riley Chapel, Fort Riley", "garrison", "P",
    [PER.ID_1_18_INF_CH], PER.ID_2ABCT_CH,
    "SUSTAIN: CPT Ogundimu is new but shows strong potential. Humility and willingness to learn are outstanding. IMPROVE: Tactical skills, staff products, and counseling confidence all need deliberate development. Baseline assessment — expect improvement.",
    [prod("Individual Assessment CPT Ogundimu", "briefing")],
    { dayNight: "day", mopp: "none", extEval: false }),

  // ═══════════════════════════════════════════════════════════════════════
  // Additional Events to reach 85 total
  // ═══════════════════════════════════════════════════════════════════════
  ev(73, "16-BN-3801", "Provide RS to a Battalion — 2-8 CAV (FTX)", ORG.BN_2_8_CAV, "2026-02-15",
    "TA 5, Fort Cavazos", "ftx", "T-",
    [PER.CD_2_8_CAV_CH, PER.CD_2_8_CAV_NCO], PER.CD_1ABCT_CH,
    "SUSTAIN: Good ministry presence during 72-hour FTX. Night worship service was well-attended. IMPROVE: RSA site needs better OPSEC consideration for the JRTC rotation.",
    [prod("FTX AAR 2-8 CAV", "aar")],
    { dayNight: "night", mopp: "none", extEval: false }),

  ev(74, "16-BN-0001", "Provide UMT Training — 2-5 CAV", ORG.BN_2_5_CAV, "2025-10-28",
    "DIV Chapel, Fort Cavazos", "garrison", "T",
    [PER.CD_2_5_CAV_CH, PER.CD_2_5_CAV_NCO], PER.CD_1ABCT_CH,
    "SUSTAIN: Comprehensive UMT training covering all collective tasks. RAS demonstrated competence in all lanes. IMPROVE: Need to include night iteration for the RSA lane.",
    [prod("UMT Training AAR 2-5 CAV", "aar"), prod("UMT Training Schedule", "briefing")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(75, "16-BN-3801", "Provide RS to a Battalion — 1-12 CAV", ORG.BN_1_12_CAV, "2026-03-01",
    "Bldg 4919, Fort Cavazos", "garrison", "U",
    [PER.CD_1_12_CAV_NCO], PER.CD_3ABCT_CH,
    "SUSTAIN: SGT Santos maintained minimal RS coverage. IMPROVE: Chaplain absent TDY for 6 weeks (Battle Staff Course) with no replacement plan. BN effectively had no chaplain coverage. This is a readiness failure.",
    [],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(76, "16-BDE-4800", "Conduct BDE RS Assessment — 1CD 2ABCT", ORG.BDE_1CD_2ABCT, "2026-03-05",
    "2ABCT TOC, Fort Cavazos", "garrison", "T",
    [PER.CD_2ABCT_CH, PER.CD_2ABCT_NCO], PER.CD_DIV_CH,
    "SUSTAIN: Post-NTC assessment shows all BN UMTs improved. BDE chaplain's AAR process was thorough. IMPROVE: Need to formalize lessons learned into a BDE RS SOP before the next CTC rotation.",
    [prod("BDE RS Assessment 2ABCT", "briefing"), prod("Post-NTC Lessons Learned", "aar")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(77, "16-BN-3801", "Provide RS to a Battalion — 1-37 AR (FTX)", ORG.BN_1_37_AR, "2026-02-25",
    "McGregor Range, Fort Bliss", "ftx", "T-",
    [PER.AD_1_37_AR_CH, PER.AD_1_37_AR_NCO], PER.AD_2BCT_CH,
    "SUSTAIN: Effective field ministry during 96-hour exercise. IMPROVE: Vehicle positioning during the FTX was too far from the main body — limited rapid response capability.",
    [prod("FTX AAR 1-37 AR", "aar"), prod("RS Annex 1-37 AR FTX", "annex_q")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(78, "16-BN-3801", "Provide RS to a Battalion — 4-6 INF (FTX)", ORG.BN_4_6_INF, "2026-03-08",
    "Dona Ana Range Complex, Fort Bliss", "ftx", "P",
    [PER.AD_4_6_INF_CH, PER.AD_4_6_INF_NCO], PER.AD_3BCT_CH,
    "SUSTAIN: Chaplain maintained presence despite austere conditions. IMPROVE: RS annex was not coordinated with the BN S3 — resulted in scheduling conflicts with ranges.",
    [prod("FTX AAR 4-6 INF", "aar")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(79, "16-BN-3801", "Provide RS to a Battalion — 5-4 CAV (FTX)", ORG.BN_5_4_CAV, "2026-02-05",
    "TA 12, Fort Riley", "ftx", "P",
    [PER.ID_5_4_CAV_CH, PER.ID_5_4_CAV_NCO], PER.ID_1ABCT_CH,
    "SUSTAIN: Good teamwork between chaplain and RAS. IMPROVE: Limited BFC — chaplain stayed at the TOC too much. Need to push out to troop positions.",
    [prod("FTX AAR 5-4 CAV", "aar")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(80, "16-5-2001", "Conduct Moral Leadership Training — 2-34 AR", ORG.BN_2_34_AR, "2026-01-10",
    "Riley Chapel, Fort Riley", "garrison", "T",
    [PER.ID_2_34_AR_CH, PER.ID_2_34_AR_NCO], PER.ID_1ABCT_CH,
    "SUSTAIN: Excellent ethical decision-making scenarios relevant to armor operations. High engagement from junior leaders. IMPROVE: Should expand to include senior NCO-specific scenarios.",
    [prod("MLT AAR 2-34 AR", "aar"), prod("MLT Lesson Plan", "briefing")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(81, "16-BN-3801", "Provide RS to a Battalion — 1-82 FA (STX)", ORG.BN_1_82_FA, "2026-03-05",
    "TA 5, Fort Cavazos", "stx", "U",
    [PER.CD_1_82_FA_NCO], PER.CD_1ABCT_CH,
    "SUSTAIN: SGT Hassan showed initiative. IMPROVE: No chaplain present — CPT Robinson still at CHBOLC. RAS cannot provide full-spectrum RS alone. BDE needs to establish cross-BN coverage plan.",
    [],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(82, "16-BN-3802", "Integrate UMT into CP — 1-1 AD (CPX)", ORG.BN_1_1_AD, "2026-03-01",
    "BDE TOC, Fort Bliss", "cpx", "T",
    [PER.AD_1_1_AD_CH, PER.AD_1_1_AD_NCO], PER.AD_2BCT_CH,
    "SUSTAIN: UMT fully integrated into BN CPX battle rhythm. RS running estimate updated every 4 hours. IMPROVE: Need to improve RS input to the targeting process — chaplain should attend the fires cell briefing.",
    [prod("CPX AAR 1-1 AD", "aar"), prod("RS Running Estimate CPX", "running_estimate")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(83, "805D-56A-6000", "Perform Chaplain Duties — CPT Patel", ORG.BN_6_9_CAV, "2025-12-15",
    "Bldg 4919, Fort Cavazos", "garrison", "P-",
    [PER.CD_6_9_CAV_CH], PER.CD_3ABCT_CH,
    "SUSTAIN: CPT Patel shows empathy and genuine care. IMPROVE: Multiple areas need development — staff products, teaching delivery, time management. Recommend comprehensive IDP with monthly mentor sessions.",
    [prod("Individual Assessment CPT Patel", "briefing")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(84, "805D-56A-6203", "Provide Unit Advisement — MAJ Foster", ORG.BDE_1CD_2ABCT, "2026-01-20",
    "2ABCT TOC, Fort Cavazos", "garrison", "T-",
    [PER.CD_2ABCT_CH], PER.CD_DIV_CH,
    "SUSTAIN: MAJ Foster's post-NTC advisement to the BDE CDR was well-received. IMPROVE: Need to document RS advisement themes for continuity during PCS cycle.",
    [prod("Advisement Assessment MAJ Foster", "briefing")],
    { dayNight: "day", mopp: "none", extEval: false }),

  ev(85, "16-BDE-4000", "Coordinate BDE RS Ops — 1ID 2ABCT (Pre-JRTC)", ORG.BDE_1ID_2ABCT, "2026-02-28",
    "Riley Chapel, Fort Riley", "home_station", "T-",
    [PER.ID_2ABCT_CH, PER.ID_2ABCT_NCO, PER.ID_1_18_INF_CH, PER.ID_1_26_INF_CH, PER.ID_1_4_CAV_CH, PER.ID_1_7_FA_NCO],
    PER.ID_DIV_CH,
    "SUSTAIN: BDE RS sync matrix rehearsed and validated. Cross-BN coverage plan established for 1-7 FA (no chaplain). IMPROVE: Need to exercise the entire plan under field conditions — this was classroom-only.",
    [prod("Pre-JRTC RS Sync Matrix 2ABCT", "sync_matrix"), prod("Pre-JRTC RS Brief", "briefing"), prod("Pre-JRTC AAR", "aar")],
    { dayNight: "day", mopp: "none", extEval: false }),
];
