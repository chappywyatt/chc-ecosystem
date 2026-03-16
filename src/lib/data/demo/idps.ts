/**
 * ═══════════════════════════════════════════════════════════════════════════
 * INDIVIDUAL DEVELOPMENT PLANS (IDPs)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * 10 IDP records linked to Compass cycles, Gauge observations, or standalone.
 * Goals use CHAP-T.A.L.K.S. format: What / Why / How / When / Support
 *
 * ID scheme: demo-6000-0000-0000-{12-digit seq}
 */

import { PER } from "./personnel";

// ── Helper for sequential IDP IDs ────────────────────────────────────────
const iid = (n: number) => `de006000-0000-0000-0000-${String(n).padStart(12, "0")}`;

export const IDP_RECORDS = [
  // ═══════════════════════════════════════════════════════════════════════
  // 1. Active — CPT Kim (2-5 CAV), linked to Compass Cycle 2
  //    Focus: staffing/soldiering gap
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: iid(1),
    personnel_id: PER.CD_2_5_CAV_CH,
    supervisor_id: PER.CD_1ABCT_CH,
    status: "active",
    created_date: "2026-01-05",
    source_compass_id: "de007000-0000-0000-0000-000000000002",
    source_observation_ids: [],
    strengths_to_maximize: [
      "Exceptional empathy and counseling — consistently rated 4-5 across all respondents",
      "Strong character foundation in spirituality and authenticity",
      "Deep rapport with Soldiers; subordinates trust and confide readily",
    ],
    needs_to_mitigate: [
      "Staffing — rated 2-3 by peers and superiors; needs to develop staff processes and battle rhythm integration",
      "Soldiering — physical fitness and tactical competence lagging behind peers",
      "Administrative discipline — RAS reporting and UMT operations planning need improvement",
    ],
    professional_goals: [
      {
        what: "Complete Army staff officer common core competencies self-study and attend the next Division-level staff integration exercise",
        why: "Compass feedback from 8 of 8 non-self respondents identified staffing as a development area; staff credibility directly impacts UMT effectiveness at BN level",
        how: "Enroll in ALMS staff officer courses (MDMP, Military Briefing); shadow 1ABCT S3 during next BDE FTX; develop and brief monthly UMT status report to BN XO",
        when: "NLT 30 Jun 2026",
        support: "BDE CH to introduce to BDE S3 for mentorship; BN XO to include in weekly battle rhythm meetings",
      },
      {
        what: "Achieve a minimum ACFT score of 500 and complete Soldier tasks on warrior skills Level 1 checklist",
        why: "Soldiering competence is foundational to credibility with combat arms Soldiers; current physical fitness is below BN average",
        how: "Join BN PT program 4x/week; complete all warrior tasks at next quarterly training; request assessment from BN master fitness trainer",
        when: "NLT 31 May 2026",
        support: "BN CSM to pair with a PT mentor; RAS NCO to schedule warrior task certification lane",
      },
      {
        what: "Develop and implement a standardized UMT operations SOP for 2-5 CAV",
        why: "Lack of documented UMT procedures contributes to ad-hoc staffing and missed reporting deadlines",
        how: "Review 1ABCT UMT SOP template; draft BN-specific SOP with input from RAS NCO; route through BN S3 for approval",
        when: "NLT 15 Apr 2026",
        support: "BDE CH to provide 1ABCT SOP template; peer BN chaplains to review draft",
      },
    ],
    personal_goals: [
      {
        what: "Establish a weekly Sabbath practice with protected family time and personal spiritual renewal",
        why: "Sustained ministry output requires intentional rest; current pace risks burnout and impacts family relationships",
        how: "Block one day per week on calendar; communicate boundary to BN leadership; engage in personal retreat quarterly",
        when: "NLT 01 Apr 2026",
        support: "BDE CH to advocate for protected Sabbath time with BN CDR; spouse to co-plan family rhythm",
      },
    ],
    followup_1_date: "2026-03-15",
    followup_1_notes: "On track with ALMS courses — completed MDMP module. BN XO now includes CH Kim in weekly syncs. PT scores improving; ran 500+ on practice ACFT. UMT SOP draft in progress.",
    followup_1_completed: true,
    followup_2_date: "2026-06-15",
    followup_2_notes: null,
    followup_2_completed: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 2. Active — MAJ Odom (1AD 1BCT), linked to Compass Cycle 4
  //    Focus: connection development
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: iid(2),
    personnel_id: PER.AD_1BCT_CH,
    supervisor_id: PER.AD_DIV_CH,
    status: "active",
    created_date: "2026-03-01",
    source_compass_id: "de007000-0000-0000-0000-000000000004",
    source_observation_ids: [],
    strengths_to_maximize: [
      "Outstanding competence in preaching, teaching, and soldiering — rated 4-5 consistently",
      "Strong discipline and staff operations; recognized as a technically proficient chaplain",
      "High resilience and confidence; leads well under pressure",
    ],
    needs_to_mitigate: [
      "Visibility — rated 2-3; subordinates and peers report difficulty finding BDE CH during duty hours",
      "Affability — rated 2-3; perceived as approachable only in formal settings",
      "Accessibility — rated 2-3; BN chaplains feel disconnected from BDE-level pastoral care and mentorship",
    ],
    professional_goals: [
      {
        what: "Implement a BDE CH circulation plan with scheduled visits to each BN UMT at least twice monthly",
        why: "Compass data shows visibility rated 2-3 across all non-self respondents; subordinate BN chaplains need regular face-to-face mentorship",
        how: "Create a monthly battle rhythm calendar with BN visits; coordinate with each BN S3 for visit windows; document visits in UMT tracker",
        when: "NLT 15 Apr 2026",
        support: "DIV CH to review circulation plan and hold accountable at monthly sync; BDE XO to include in BDE battle rhythm",
      },
      {
        what: "Host monthly informal BDE UMT fellowship meals and quarterly off-site team building events",
        why: "Affability and accessibility gaps suggest subordinates do not feel personally connected; informal settings build trust",
        how: "Schedule monthly lunch with all BDE UMT members; plan quarterly off-post event; initiate regular one-on-one check-ins with each BN CH",
        when: "NLT 30 Apr 2026",
        support: "DIV CH to model informal engagement; BDE NCO to assist with logistics",
      },
    ],
    personal_goals: [
      {
        what: "Complete a peer mentoring relationship with a chaplain outside the division for personal accountability",
        why: "Strong competence without connection can lead to isolation; external peer provides objective feedback on relational growth",
        how: "Identify a trusted peer from CHBOLC or CAS3 cohort; schedule biweekly phone calls; share Compass results for accountability",
        when: "NLT 30 Apr 2026",
        support: "DIV CH to recommend potential peer mentors from Corps network",
      },
      {
        what: "Read and reflect on two books focused on pastoral presence and relational leadership",
        why: "Developing connection requires both behavioral change and deeper understanding of relational theology in military ministry",
        how: "Read 'The Contemplative Pastor' (Peterson) and 'Canoeing the Mountains' (Bolsinger); journal reflections; discuss insights with mentor",
        when: "NLT 30 Jun 2026",
        support: "DIV CH to discuss key takeaways during monthly mentorship sessions",
      },
    ],
    followup_1_date: "2026-05-01",
    followup_1_notes: null,
    followup_1_completed: false,
    followup_2_date: "2026-07-01",
    followup_2_notes: null,
    followup_2_completed: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 3. Active — CPT Ogundimu (1-18 INF), linked to Compass Cycle 5
  //    Focus: new chaplain baseline development
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: iid(3),
    personnel_id: PER.ID_1_18_INF_CH,
    supervisor_id: PER.ID_2ABCT_CH,
    status: "active",
    created_date: "2026-03-12",
    source_compass_id: "de007000-0000-0000-0000-000000000005",
    source_observation_ids: [],
    strengths_to_maximize: [
      "Genuine humility and willingness to learn — rated highly by peers",
      "Strong empathy and counseling instincts; Soldiers naturally seek out CH Ogundimu",
      "Solid character foundation in spirituality and Army values",
    ],
    needs_to_mitigate: [
      "Preaching and teaching — rated 2-3; sermon preparation and delivery need structured development",
      "Staffing and soldiering — rated 2 across most respondents; basic staff competencies underdeveloped",
      "Confidence and bearing — rated 2-3; needs experience-based growth in professional presence",
    ],
    professional_goals: [
      {
        what: "Complete a structured sermon development program with BDE CH mentorship and preach at minimum two BN-level services per month",
        why: "Preaching is a core chaplain competency; baseline assessment shows need for deliberate practice with feedback",
        how: "Use the Haddon Robinson homiletical method; submit sermon outlines to BDE CH for review 72 hours prior; record and self-assess each sermon",
        when: "NLT 30 Sep 2026",
        support: "BDE CH to provide feedback on sermon recordings; connect with DIV CH for advanced homiletics mentoring",
      },
      {
        what: "Complete all ALMS staff officer common core courses and attend BDE-level MDMP exercise as an observer",
        why: "Staff competency is foundational for a BN-level chaplain to integrate into the operations process",
        how: "Enroll in ALMS self-paced courses; request BDE S3 observer slot for next MDMP exercise; develop UMT Annex F input template",
        when: "NLT 31 Jul 2026",
        support: "BDE CH to coordinate BDE MDMP observation; BN XO to include in planning meetings",
      },
      {
        what: "Pass the ACFT with a minimum score of 500 and complete 12-mile ruck march within standard",
        why: "Physical readiness underpins soldiering credibility in an infantry battalion; current fitness below BN average",
        how: "Join BN morning PT 5x/week; follow progressive ruck plan; request ACFT diagnostic monthly",
        when: "NLT 30 Jun 2026",
        support: "BN CSM to pair with fitness mentor; RAS NCO to accompany on ruck training",
      },
    ],
    personal_goals: [
      {
        what: "Establish a personal Rule of Life including daily devotion, weekly Sabbath, and monthly retreat day",
        why: "A new chaplain's first assignment is high-risk for spiritual burnout; intentional spiritual rhythms sustain long-term ministry",
        how: "Draft a personal Rule of Life document; share with mentor for accountability; track adherence weekly",
        when: "NLT 15 Apr 2026",
        support: "BDE CH to share own Rule of Life as a model; connect with installation chaplain for retreat space",
      },
      {
        what: "Build a peer support network with at least three other junior chaplains for mutual encouragement",
        why: "Isolation compounds the challenges of a first assignment; peer relationships provide perspective and resilience",
        how: "Identify 2-3 peers from CHBOLC class; schedule monthly video calls; attend one CHC professional development event",
        when: "NLT 31 May 2026",
        support: "BDE CH to facilitate introductions to other 1ID junior chaplains",
      },
    ],
    followup_1_date: "2026-05-15",
    followup_1_notes: null,
    followup_1_completed: false,
    followup_2_date: "2026-08-15",
    followup_2_notes: null,
    followup_2_completed: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 4. Active — CPT Nakamura (4-9 CAV), linked to Compass Cycle 1
  //    Focus: address self-overrating pattern
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: iid(4),
    personnel_id: PER.CD_4_9_CAV_CH,
    supervisor_id: PER.CD_2ABCT_CH,
    status: "active",
    created_date: "2026-01-10",
    source_compass_id: "de007000-0000-0000-0000-000000000001",
    source_observation_ids: [],
    strengths_to_maximize: [
      "Excellent visibility and affability — consistently rated 4-5 by all respondent groups",
      "Strong counseling skills; regarded as a compassionate and effective pastoral care provider",
      "High empathy and Army values alignment across all feedback sources",
    ],
    needs_to_mitigate: [
      "Self-awareness gap — self-ratings averaged 4.7 while others averaged 3.7; indicates potential blind spots",
      "Staffing and soldiering — consistently rated 3 by peers and superiors; room for growth",
      "Teaching — rated 3 by most non-self respondents; needs deliberate improvement in educational ministry",
    ],
    professional_goals: [
      {
        what: "Conduct a self-awareness deepening exercise using Compass results and develop an accurate self-assessment framework",
        why: "A 1.0-point gap between self-rating and others' ratings across 18 qualities suggests blind spots that could limit growth",
        how: "Review Compass data with BDE CH in structured debrief; identify top 3 overrated qualities; solicit real-time feedback from RAS NCO weekly; journal self-observations",
        when: "NLT 30 Apr 2026",
        support: "BDE CH to conduct formal Compass debrief; RAS NCO to provide candid weekly feedback",
      },
      {
        what: "Develop and deliver a 4-part religious education series for the BN with formal evaluation from attendees",
        why: "Teaching was rated 3 by most respondents; deliberate practice with structured feedback will close the gap",
        how: "Design curriculum using TRADOC adult learning principles; pilot with BN leadership; collect written evaluations; revise based on feedback",
        when: "NLT 31 May 2026",
        support: "BDE CH to review curriculum outline; BN S1 to support scheduling and attendance tracking",
      },
    ],
    personal_goals: [
      {
        what: "Engage in a 360-degree feedback practice with family members and close friends outside the military",
        why: "Self-overrating may extend beyond professional life; personal feedback supports holistic self-awareness",
        how: "Ask spouse and two trusted friends to provide honest feedback on relational patterns; discuss findings with mentor",
        when: "NLT 30 Apr 2026",
        support: "BDE CH to recommend resources on self-awareness and emotional intelligence for chaplains",
      },
    ],
    followup_1_date: "2026-03-15",
    followup_1_notes: "Completed initial Compass debrief with BDE CH. Nakamura acknowledged the self-rating gap and identified teaching, staffing, and discipline as priority areas. Weekly feedback from RAS NCO initiated. RE series outline drafted.",
    followup_1_completed: true,
    followup_2_date: "2026-06-01",
    followup_2_notes: null,
    followup_2_completed: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 5. Active — CPT (6-9 CAV CH), linked to observation
  //    Focus: developing performer
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: iid(5),
    personnel_id: PER.CD_6_9_CAV_CH,
    supervisor_id: PER.CD_3ABCT_CH,
    status: "active",
    created_date: "2026-01-20",
    source_compass_id: null,
    source_observation_ids: ["de003000-0000-0000-0000-000000000005"],
    strengths_to_maximize: [
      "Strong pastoral presence during field exercises — observed engaging Soldiers at every opportunity",
      "Authentic preaching style that resonates with junior enlisted Soldiers",
      "Willingness to seek feedback and implement corrections quickly",
    ],
    needs_to_mitigate: [
      "Worship service planning — observation noted inconsistent liturgical preparation and late coordination",
      "UMT integration into training cycle — needs to improve proactive planning vs. reactive scheduling",
      "Written communication — after-action reports and religious support estimates need improvement",
    ],
    professional_goals: [
      {
        what: "Develop a standardized worship service preparation timeline and execute it for 8 consecutive services",
        why: "Observation identified inconsistent liturgical preparation; reliable worship planning builds unit trust and demonstrates competence",
        how: "Create a 7-day worship preparation checklist; coordinate support requirements NLT Wednesday each week; debrief each service with RAS NCO",
        when: "NLT 31 May 2026",
        support: "BDE CH to review checklist template and observe two services for feedback",
      },
      {
        what: "Submit UMT training calendar inputs to BN S3 for the next two training cycles, aligned with the ARFORGEN model",
        why: "Proactive planning demonstrates staff competence and ensures religious support is integrated, not an afterthought",
        how: "Attend BN training meetings; coordinate with BDE UMT for collective training requirements; submit inputs NLT 30 days prior to each cycle",
        when: "NLT 30 Apr 2026",
        support: "BDE CH to review first submission; BN S3 to provide feedback on format and timeliness",
      },
      {
        what: "Complete two formal religious support estimates and one after-action report using approved DA formats",
        why: "Written staff products are a core competency; current quality is below expectations for a BN chaplain",
        how: "Use ADRP 1-05 templates; submit drafts to BDE CH for red-pen review; revise and resubmit until approved",
        when: "NLT 30 Jun 2026",
        support: "BDE CH to provide exemplar products; BDE NCO to review formatting",
      },
    ],
    personal_goals: [
      {
        what: "Read two professional development books on military chaplaincy and discuss with a peer study group",
        why: "Continued professional reading deepens doctrinal understanding and pastoral effectiveness",
        how: "Select from CHC recommended reading list; complete one book per quarter; organize discussion with 3ABCT BN chaplains",
        when: "NLT 30 Sep 2026",
        support: "BDE CH to recommend titles and facilitate group discussion",
      },
    ],
    followup_1_date: "2026-04-15",
    followup_1_notes: null,
    followup_1_completed: false,
    followup_2_date: "2026-07-15",
    followup_2_notes: null,
    followup_2_completed: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 6. Active — SGT (2-5 CAV NCO), linked to observation
  //    Focus: RAS development
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: iid(6),
    personnel_id: PER.CD_2_5_CAV_NCO,
    supervisor_id: PER.CD_1ABCT_NCO,
    status: "active",
    created_date: "2026-02-01",
    source_compass_id: null,
    source_observation_ids: ["de003000-0000-0000-0000-000000000014"],
    strengths_to_maximize: [
      "Strong rapport with Soldiers at the squad and platoon level — trusted and approachable",
      "Consistent physical fitness; leads from the front in PT and field environments",
      "Reliable execution of chaplain-directed tasks; dependable and mission-focused",
    ],
    needs_to_mitigate: [
      "UMT administrative management — observation noted gaps in supply accountability and report timeliness",
      "Independent initiative — tends to wait for chaplain direction rather than anticipating needs",
      "Professional military education — has not yet completed all required NCO DLC courses",
    ],
    professional_goals: [
      {
        what: "Complete Distributed Leader Course (DLC) II and register for the next available BLC class",
        why: "Professional military education is a non-negotiable requirement for NCO advancement and credibility",
        how: "Enroll in DLC II on ALMS immediately; complete within 60 days; submit BLC registration through S1",
        when: "NLT 31 May 2026",
        support: "BDE NCO to monitor DLC progress; BN S1 to prioritize BLC slot",
      },
      {
        what: "Develop and maintain a UMT property book and monthly supply accountability report",
        why: "Observation identified supply accountability gaps; an accurate property book is essential for deployment readiness",
        how: "Conduct 100% inventory with chaplain; create digital property book; submit monthly status to BDE NCO",
        when: "NLT 15 Apr 2026",
        support: "BDE NCO to provide property book template; BN S4 to assist with hand-receipt procedures",
      },
      {
        what: "Brief the UMT weekly status report to the BN XO independently for 4 consecutive weeks",
        why: "Developing the ability to represent the UMT in staff settings builds confidence and demonstrates initiative",
        how: "Shadow chaplain for 2 weeks; prepare and deliver brief independently for 4 weeks; collect feedback each time",
        when: "NLT 30 Apr 2026",
        support: "Chaplain to provide initial coaching and attend first solo brief; BDE NCO to review brief format",
      },
    ],
    personal_goals: [
      {
        what: "Complete an online college course toward an associate degree in religious studies or a related field",
        why: "Educational advancement supports long-term career growth and broadens understanding of the RAS mission",
        how: "Research TA-eligible programs; enroll in one course for Summer term; maintain minimum B grade",
        when: "NLT 30 Sep 2026",
        support: "BDE NCO to connect with Education Center; chaplain to support schedule flexibility for study time",
      },
    ],
    followup_1_date: "2026-04-01",
    followup_1_notes: null,
    followup_1_completed: false,
    followup_2_date: "2026-07-01",
    followup_2_notes: null,
    followup_2_completed: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 7. Completed — CPT (1-9 CAV CH), FY25, both follow-ups done
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: iid(7),
    personnel_id: PER.CD_1_9_CAV_CH,
    supervisor_id: PER.CD_2ABCT_CH,
    status: "completed",
    created_date: "2024-11-01",
    source_compass_id: null,
    source_observation_ids: [],
    strengths_to_maximize: [
      "Authentic and consistent character — peers and superiors consistently affirm integrity",
      "Strong counseling skills with demonstrated effectiveness in crisis interventions",
      "Natural leader among peer BN chaplains; sought out for advice and collaboration",
    ],
    needs_to_mitigate: [
      "Preaching depth — feedback indicated sermons were engaging but lacked theological substance",
      "Time management — tendency to overcommit led to missed deadlines on staff products",
      "Delegation — attempted to do everything personally rather than empowering RAS NCO",
    ],
    professional_goals: [
      {
        what: "Complete a structured homiletics self-study program and deliver 12 theologically substantive sermons",
        why: "Preaching is the most visible chaplain competency; depth of content directly impacts spiritual readiness",
        how: "Study Bryan Chapell's 'Christ-Centered Preaching'; submit sermon manuscripts to BDE CH for review quarterly; track congregation feedback",
        when: "NLT 30 Sep 2025",
        support: "BDE CH to review manuscripts; DIV CH to observe one sermon per quarter",
      },
      {
        what: "Implement a personal task management system and achieve 100% on-time delivery of staff products for two consecutive quarters",
        why: "Missed deadlines erode credibility with the staff; systematic time management supports sustained performance",
        how: "Adopt a digital task management tool; review weekly with RAS NCO; track all deadlines with BN S3",
        when: "NLT 30 Jun 2025",
        support: "RAS NCO to serve as accountability partner; BDE CH to monitor deadline compliance",
      },
    ],
    personal_goals: [
      {
        what: "Attend a 3-day personal spiritual retreat focused on pastoral identity and calling",
        why: "Overcommitment stems partly from unclear boundaries between identity and role; retreat provides space for reflection",
        how: "Register for a retreat through the installation chaplain office; block schedule 90 days in advance",
        when: "NLT 31 Jul 2025",
        support: "BDE CH to approve absence and cover BN duties; installation chaplain to recommend retreat options",
      },
    ],
    followup_1_date: "2025-03-15",
    followup_1_notes: "Excellent progress. Completed 6 of 12 sermon manuscripts with BDE CH review. Adopted Microsoft To-Do for task management — BN S3 confirmed 100% on-time delivery for Q2. Retreat scheduled for July. Delegation improving; RAS NCO now handles all supply and logistics independently.",
    followup_1_completed: true,
    followup_2_date: "2025-09-15",
    followup_2_notes: "All goals met or exceeded. Completed 14 sermon manuscripts (exceeded target). On-time delivery maintained for Q3 and Q4. Retreat completed in July — reported significant renewal. BDE CH rates this IDP as fully successful. Recommend next IDP focus on preparing for CAS3 and BDE-level responsibilities.",
    followup_2_completed: true,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 8. Completed — CPT (1-6 INF CH, 1AD), FY25, both follow-ups done
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: iid(8),
    personnel_id: PER.AD_1_6_INF_CH,
    supervisor_id: PER.AD_1BCT_CH,
    status: "completed",
    created_date: "2024-10-15",
    source_compass_id: null,
    source_observation_ids: [],
    strengths_to_maximize: [
      "Outstanding soldiering — physical fitness and tactical competence among the best in the BCT",
      "Strong visibility and accessibility; Soldiers at all levels know and trust the chaplain",
      "Resilient under pressure; performed exceptionally during NTC rotation",
    ],
    needs_to_mitigate: [
      "Teaching ministry — religious education program was minimal; needed structured curriculum",
      "Staffing — religious support estimate writing needed refinement; format and content gaps",
      "Peer mentoring — tended to operate independently rather than collaborating with adjacent BN chaplains",
    ],
    professional_goals: [
      {
        what: "Develop and execute a quarterly religious education program with at least 4 classes per quarter",
        why: "Teaching is a core chaplain competency; a structured program builds spiritual depth across the formation",
        how: "Design curriculum aligned with Army spiritual readiness themes; coordinate with BN S1 for scheduling; collect participant feedback",
        when: "NLT 30 Sep 2025",
        support: "BDE CH to review curriculum; BN CDR to support protected time for religious education",
      },
      {
        what: "Complete three religious support estimates using the approved DA format and receive satisfactory rating from BDE CH",
        why: "Staff writing competency is essential for BDE-level readiness; current products do not meet standard",
        how: "Use ADRP 1-05 template; submit drafts to BDE CH for review; incorporate feedback and resubmit",
        when: "NLT 30 Jun 2025",
        support: "BDE CH to provide exemplar RSE; BDE NCO to review administrative formatting",
      },
      {
        what: "Initiate and lead a monthly BCT chaplain professional development session",
        why: "Peer collaboration multiplies the effectiveness of all UMTs in the BCT and develops the leadership ability needed for future BDE-level responsibilities",
        how: "Propose concept to BDE CH; develop rotating topic schedule; host at different BN locations monthly",
        when: "NLT 28 Feb 2025",
        support: "BDE CH to endorse and attend; peer BN chaplains to co-facilitate sessions",
      },
    ],
    personal_goals: [
      {
        what: "Complete a graduate-level course in pastoral counseling through a distance education program",
        why: "Advanced counseling education strengthens clinical competency and prepares for potential CPE residency",
        how: "Enroll in an accredited online pastoral counseling course; complete assignments on schedule; discuss application with mentor",
        when: "NLT 31 Aug 2025",
        support: "BDE CH to support schedule flexibility; Education Center to process TA application",
      },
    ],
    followup_1_date: "2025-03-01",
    followup_1_notes: "Strong start. RE program launched with 5 classes in Q1 — Soldier feedback positive. First RSE submitted and returned with minor corrections. Monthly PD session launched in February with 100% attendance from BCT chaplains. Graduate course enrolled; first module complete.",
    followup_1_completed: true,
    followup_2_date: "2025-08-30",
    followup_2_notes: "All goals achieved. RE program completed 16 classes across FY25 (exceeded 12 target). Three RSEs completed with satisfactory rating on final two. Monthly PD sessions continued through August — now self-sustaining with rotating facilitation. Graduate course completed with A grade. BDE CH recommends consideration for BDE-level position at next assignment cycle.",
    followup_2_completed: true,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 9. Draft — CPT (3-8 CAV CH), just started
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: iid(9),
    personnel_id: PER.CD_3_8_CAV_CH,
    supervisor_id: PER.CD_3ABCT_CH,
    status: "draft",
    created_date: "2026-03-10",
    source_compass_id: null,
    source_observation_ids: [],
    strengths_to_maximize: [
      "Strong character and spiritual depth — respected by peers for consistent authenticity",
      "Good rapport with BN leadership; CDR and CSM actively support UMT initiatives",
      "Effective counselor with a growing reputation for crisis intervention competence",
    ],
    needs_to_mitigate: [
      "Leading — needs to develop ability to lead collective UMT training and multi-UMT operations",
      "Visibility outside the BN — rarely interacts with adjacent units or higher HQ",
      "Professional writing — staff products and counseling documentation need improvement",
    ],
    professional_goals: [
      {
        what: "Plan and execute one collective UMT training event at the BDE level involving at least 3 BN UMTs",
        why: "Leading multi-UMT operations is a critical skill for progression to BDE chaplain; current experience is limited to single-UMT operations",
        how: "Coordinate with BDE CH to identify a training window; develop training plan and OPORD; execute and conduct AAR",
        when: "NLT 30 Jun 2026",
        support: "BDE CH to approve concept and mentor through planning process; peer BN chaplains to participate",
      },
      {
        what: "Attend at least two BDE or DIV-level events per quarter to increase visibility with senior leaders",
        why: "Broader visibility demonstrates initiative and builds the professional network needed for future assignments",
        how: "Coordinate with BDE CH for event calendar; attend BDE prayer breakfasts, DIV chaplain conferences, and installation events",
        when: "NLT 30 Sep 2026",
        support: "BDE CH to include in BDE event invitations; BN CDR to support absence from BN for development events",
      },
    ],
    personal_goals: [
      {
        what: "Establish a monthly personal development reading habit focused on leadership and military history",
        why: "Broad reading develops the intellectual depth needed for senior chaplain roles and improves written communication",
        how: "Select one book per month from the Army Chief of Staff professional reading list; write a one-page reflection for each",
        when: "NLT 30 Sep 2026",
        support: "BDE CH to discuss monthly reading during mentorship sessions",
      },
    ],
    followup_1_date: null,
    followup_1_notes: null,
    followup_1_completed: false,
    followup_2_date: null,
    followup_2_notes: null,
    followup_2_completed: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 10. Active — SGT (1-6 INF NCO, 1AD), NCO development
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: iid(10),
    personnel_id: PER.AD_1_6_INF_NCO,
    supervisor_id: PER.AD_1BCT_NCO,
    status: "active",
    created_date: "2026-01-15",
    source_compass_id: null,
    source_observation_ids: [],
    strengths_to_maximize: [
      "Exceptional Soldier care — recognized by BN CSM for going above and beyond in supporting Soldiers in crisis",
      "Strong physical fitness; consistently scores 560+ on ACFT",
      "Positive attitude and willingness to take on additional responsibilities",
    ],
    needs_to_mitigate: [
      "Technical RAS skills — needs to develop proficiency in DTMS religious support tracking and reporting",
      "NCO leadership presence — tends to defer to the chaplain in all situations rather than owning the RAS role",
      "Written communication — counseling summaries and administrative reports need improvement in clarity and format",
    ],
    professional_goals: [
      {
        what: "Achieve proficiency in DTMS religious support module and produce accurate monthly reports for 3 consecutive months",
        why: "DTMS tracking is a core RAS function; accurate reporting enables the BDE and DIV to make informed resourcing decisions",
        how: "Complete DTMS online training; shadow BDE NCO during monthly report compilation; produce reports independently with BDE NCO review",
        when: "NLT 30 Jun 2026",
        support: "BDE NCO to provide DTMS training and review first three reports; BN S3 to grant system access",
      },
      {
        what: "Lead the UMT setup and operations for one BN-level field exercise independently",
        why: "Demonstrating independent UMT field operations leadership builds confidence and prepares for future assignments at higher echelons",
        how: "Plan UMT support for next BN FTX; coordinate logistics, positioning, and schedule; brief chaplain on plan and execute; conduct AAR",
        when: "NLT 31 May 2026",
        support: "Chaplain to approve plan and observe execution; BDE NCO to assist with planning template",
      },
      {
        what: "Complete a formal writing improvement course and submit 4 counseling summary reports meeting DA standard",
        why: "Clear written communication is essential for NCO advancement and ensures accurate documentation of pastoral care activities",
        how: "Enroll in Army Skillport writing course; use approved DA counseling format; submit drafts to chaplain and BDE NCO for review",
        when: "NLT 30 Jun 2026",
        support: "Chaplain to review and provide feedback on each report; BDE NCO to provide exemplar counseling summaries",
      },
    ],
    personal_goals: [
      {
        what: "Complete DLC II and submit application for the next available BLC class date",
        why: "PME completion is required for promotion eligibility and demonstrates commitment to the NCO professional development track",
        how: "Enroll in DLC II on ALMS; dedicate 1 hour daily to coursework; submit BLC application through S1 upon DLC completion",
        when: "NLT 30 Apr 2026",
        support: "BDE NCO to monitor progress weekly; BN S1 to prioritize BLC slot allocation",
      },
      {
        what: "Develop a personal financial plan and complete the Army Financial Readiness Program",
        why: "Financial stability supports focus on the mission and reduces personal stress that can impact duty performance",
        how: "Schedule appointment with installation ACS Financial Readiness counselor; complete the online financial readiness course; create a monthly budget",
        when: "NLT 31 May 2026",
        support: "Chaplain to make referral to ACS; BDE NCO to share resources on NCO financial planning",
      },
    ],
    followup_1_date: "2026-04-15",
    followup_1_notes: null,
    followup_1_completed: false,
    followup_2_date: "2026-07-15",
    followup_2_notes: null,
    followup_2_completed: false,
  },
];
