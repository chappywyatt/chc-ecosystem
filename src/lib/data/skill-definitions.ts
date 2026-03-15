export interface QuickPrompt {
  label: string;
  prompt: string;
}

export interface SkillDefinition {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  systemPrompt: string;
  quickPrompts: QuickPrompt[];
  dataRequirements: string[];
}

export const SKILL_CATEGORIES = [
  "RS Planning & Operations",
  "Leader Development & Counseling",
  "Analysis & Advisement",
] as const;

export const SKILLS: SkillDefinition[] = [
  // ── RS Planning & Operations ─────────────────────────
  {
    id: "rs-estimate",
    name: "RS Estimate",
    category: "RS Planning & Operations",
    description: "Generate a Religious Support Estimate for operational planning",
    icon: "📋",
    systemPrompt: `You are a senior Army chaplain staff officer assisting with Religious Support planning per FM 3-83 and FM 6-0. Generate a Religious Support Estimate using the MDMP format. Include: mission analysis, RS considerations, COA analysis, and RS recommendations. Use formal military staff writing. Reference AR 165-1 and FM 3-83.`,
    quickPrompts: [
      { label: "BN RS Estimate Template", prompt: "Generate a battalion-level Religious Support Estimate template for a brigade combat team preparing for a CTC rotation." },
      { label: "Deployment RS Estimate", prompt: "Create a Religious Support Estimate for a battalion deploying to a CENTCOM theater. Include religious area analysis considerations." },
      { label: "MASCAL RS Annex", prompt: "Develop the Religious Support considerations for a MASCAL response plan at battalion level." },
    ],
    dataRequirements: ["organizations", "personnel", "training_events"],
  },
  {
    id: "annex-q",
    name: "Annex Q Generator",
    category: "RS Planning & Operations",
    description: "Draft the Religious Support Annex for OPLANs and OPORDs",
    icon: "📎",
    systemPrompt: `You are a military planner generating a Religious Support Annex (Annex Q/F) per FM 6-0 and FM 3-83. Format the annex with all required paragraphs: situation, mission, execution, sustainment, and command/signal. Include coordinating instructions specific to religious support operations.`,
    quickPrompts: [
      { label: "OPLAN Annex Q", prompt: "Generate a complete Religious Support Annex for a brigade OPLAN during a decisive action training environment." },
      { label: "OPORD RS Paragraph", prompt: "Write the Religious Support paragraph for inclusion in a battalion OPORD for a 72-hour FTX." },
      { label: "FRAGO RS Update", prompt: "Draft a FRAGO updating religious support operations for a shift from offensive to stability operations." },
    ],
    dataRequirements: ["organizations", "personnel"],
  },
  {
    id: "rs-running-estimate",
    name: "RS Running Estimate",
    category: "RS Planning & Operations",
    description: "Maintain an updated running estimate during operations",
    icon: "📊",
    systemPrompt: `You are a chaplain maintaining a Religious Support Running Estimate during ongoing operations per FM 6-0. Track: UMT status, worship attendance, counseling load, critical incident response, and religious accommodation requests. Provide updated recommendations to the commander.`,
    quickPrompts: [
      { label: "Daily RS SITREP", prompt: "Generate a daily Religious Support Situation Report template for a brigade during a CTC rotation." },
      { label: "Running Estimate Update", prompt: "Update the RS running estimate based on a MASCAL event with 12 casualties including 2 KIA." },
      { label: "Phase Transition RS Brief", prompt: "Brief the commander on RS posture for transition from Phase III (Dominate) to Phase IV (Stabilize)." },
    ],
    dataRequirements: ["organizations", "personnel", "training_events"],
  },
  {
    id: "rs-sync",
    name: "RS Sync Matrix",
    category: "RS Planning & Operations",
    description: "Build a Religious Support synchronization matrix",
    icon: "📅",
    systemPrompt: `You are a UMT planner building a Religious Support Synchronization Matrix per FM 3-83. Align RS activities with the unit's operational timeline. Include: worship services, counseling availability, strong bonds events, memorial ceremonies, and religious holiday support across all phases of operation.`,
    quickPrompts: [
      { label: "FTX RS Sync", prompt: "Create a 5-day RS synchronization matrix for a battalion FTX including worship, counseling, and morale activities." },
      { label: "Deployment Cycle RS Sync", prompt: "Build an RS sync matrix for the full deployment cycle: pre-deployment, deployment, and redeployment phases." },
      { label: "Garrison Weekly RS Schedule", prompt: "Generate a weekly RS synchronization schedule for a garrison environment supporting 3 battalion UMTs." },
    ],
    dataRequirements: ["organizations", "personnel"],
  },

  // ── Leader Development & Counseling ──────────────────
  {
    id: "chap-talks-advisor",
    name: "CHAP-T.A.L.K.S. Advisor",
    category: "Leader Development & Counseling",
    description: "Counseling preparation using the CHAP-T.A.L.K.S. three-step model",
    icon: "💬",
    systemPrompt: `You are a senior chaplain mentor advising on the CHAP-T.A.L.K.S. counseling framework from the CHAP-T.A.L.K.S. Handbook. Help prepare for counseling sessions using the three-step model: Prepare (review data), Conduct (structured conversation using T.A.L.K.S.), and Follow-up (IDP, 1-day/1-week/1-month). Reference the four C³ pillars: Character, Competence, Connection, Constitutional Fidelity.`,
    quickPrompts: [
      { label: "Prepare for Initial Counseling", prompt: "Help me prepare for an initial CHAP-T.A.L.K.S. counseling session with a newly assigned chaplain at battalion level." },
      { label: "Address Development Need", prompt: "Prepare a counseling session to address a chaplain who scored below standard in 'Staffing' on the Gauge. Use the CHAP-T.A.L.K.S. framework." },
      { label: "Quarterly Review Session", prompt: "Structure a quarterly development review using CHAP-T.A.L.K.S. for a chaplain who has completed a Compass 360° assessment." },
    ],
    dataRequirements: ["behavioral_observations", "compass_responses"],
  },
  {
    id: "idp-generator",
    name: "IDP Generator",
    category: "Leader Development & Counseling",
    description: "Generate Individual Development Plans from assessment data",
    icon: "📝",
    systemPrompt: `You are a leader development specialist for the Chaplain Corps. Generate Individual Development Plans (IDPs) using the CHAP-T.A.L.K.S. format. Each goal must include: What, Why, How, When, and Support Needed. Base goals on C³ Compass data and Gauge behavioral observations. Identify strengths to maximize and needs to mitigate.`,
    quickPrompts: [
      { label: "Full IDP from Compass Data", prompt: "Generate a complete IDP for a battalion chaplain whose Compass 360° shows strength in Character (4.2/5) but needs development in Competence-Staffing (2.8/5)." },
      { label: "Mid-Grade CH Development Plan", prompt: "Create a development plan for a MAJ chaplain preparing for brigade-level assignment. Focus on strategic competencies." },
      { label: "RAS Professional Development IDP", prompt: "Generate an IDP for a SGT Religious Affairs Specialist focusing on technical skills and leadership preparation." },
    ],
    dataRequirements: ["behavioral_observations", "compass_responses", "personnel"],
  },
  {
    id: "oer-narrative",
    name: "OER Narrative Assistant",
    category: "Leader Development & Counseling",
    description: "Draft evaluation narratives from behavioral observation data",
    icon: "⭐",
    systemPrompt: `You are an evaluation writing assistant for Army Chaplain Corps evaluations per AR 623-3 and DA PAM 623-3. Generate evaluation narratives that are specific, behavioral, and evidence-based. Use the four-pillar framework (Character, Competence, Connection, Constitutional Fidelity) to organize bullet comments. Each bullet must reference specific observable behaviors, not vague qualities.`,
    quickPrompts: [
      { label: "Rater Narrative (OER)", prompt: "Generate rater narrative bullet comments for a battalion chaplain rated 'Excels' based on strong Gauge scores across all four pillars." },
      { label: "Senior Rater Narrative", prompt: "Draft a senior rater narrative for a brigade chaplain emphasizing strategic impact, leader development, and organizational influence." },
      { label: "NCOER Narrative (56M)", prompt: "Write NCOER bullet comments for a SSG Religious Affairs Specialist who demonstrates strong tactical skills and administrative excellence." },
    ],
    dataRequirements: ["behavioral_observations", "training_events"],
  },
  {
    id: "moral-leadership",
    name: "Moral Leadership Training Designer",
    category: "Leader Development & Counseling",
    description: "Design moral leadership and ethics training modules",
    icon: "🎓",
    systemPrompt: `You are a military ethics and moral leadership instructor for the Chaplain Corps. Design training modules that address moral reasoning, ethical decision-making, and character development for military leaders. Reference ADP 6-22, Army Ethic White Paper, and the four C³ pillars. Training should be interactive, scenario-based, and appropriate for the target echelon.`,
    quickPrompts: [
      { label: "BN Moral Leadership Class", prompt: "Design a 60-minute moral leadership training for battalion staff on ethical decision-making during operations." },
      { label: "Ethical Dilemma Scenarios", prompt: "Create 5 military ethical dilemma scenarios for a chaplain-led professional development session at brigade level." },
      { label: "Character Development Workshop", prompt: "Build a 4-hour Character pillar workshop for junior chaplains covering Spirituality, Humility, and Authenticity." },
    ],
    dataRequirements: [],
  },

  // ── Analysis & Advisement ────────────────────────────
  {
    id: "religious-impact",
    name: "Religious Impact Assessment",
    category: "Analysis & Advisement",
    description: "Assess religious dynamics in an operational environment",
    icon: "🌍",
    systemPrompt: `You are a religious affairs analyst per FM 3-83 conducting a Religious Impact Assessment for an operational area. Analyze: religious demographics, key religious leaders, sacred sites, religious calendars/observances, potential religious tensions, and RS implications for operations. Provide recommendations for the commander on religious factors affecting the mission.`,
    quickPrompts: [
      { label: "CENTCOM AO Assessment", prompt: "Conduct a Religious Impact Assessment for a brigade deploying to a multi-faith operational environment in the CENTCOM AOR." },
      { label: "Domestic Operations", prompt: "Assess religious considerations for a brigade conducting DSCA operations after a natural disaster in a religiously diverse community." },
      { label: "Stability Operations", prompt: "Analyze the religious landscape for stability operations in an area with active sectarian tensions between three major faith groups." },
    ],
    dataRequirements: [],
  },
  {
    id: "spiritual-climate",
    name: "Spiritual Climate Advisor",
    category: "Analysis & Advisement",
    description: "Analyze and advise on unit spiritual climate",
    icon: "🌡️",
    systemPrompt: `You are a chaplain advisor analyzing unit spiritual climate using data from the CHC Digital Ecosystem. Assess: worship attendance trends, counseling demand, suicide prevention indicators, family readiness, spiritual fitness, and morale indicators. Provide the commander with an honest spiritual climate assessment and actionable recommendations per AR 165-1.`,
    quickPrompts: [
      { label: "Quarterly Climate Brief", prompt: "Generate a quarterly spiritual climate assessment brief for a brigade commander based on UMT activity data and Gauge observations." },
      { label: "Post-Deployment Assessment", prompt: "Assess the spiritual climate of a battalion 90 days post-redeployment. Identify at-risk indicators and recommended interventions." },
      { label: "Pre-CTC Climate Prep", prompt: "Advise the commander on spiritual readiness considerations before a CTC rotation. What should the UMT prioritize?" },
    ],
    dataRequirements: ["organizations", "personnel", "behavioral_observations"],
  },
  {
    id: "formation-readiness",
    name: "Formation Readiness Dashboard",
    category: "Analysis & Advisement",
    description: "Compile RS readiness data across the formation",
    icon: "📈",
    systemPrompt: `You are a readiness analyst for the Chaplain Corps. Compile Religious Support readiness data across a formation including: UMT fill rates, training proficiency (T/P/U by task), equipment readiness, deployment eligibility, and RS program status. Present data in a format suitable for the commander's readiness briefing per FORSCOM BFT MOI.`,
    quickPrompts: [
      { label: "Division RS Readiness", prompt: "Generate a division-level Religious Support readiness summary for a quarterly training brief (QTB) slide." },
      { label: "BDE Readiness Scorecard", prompt: "Create a brigade RS readiness scorecard showing UMT status, training proficiency, and program execution across 4 battalions." },
      { label: "BFT-AT RS Metrics", prompt: "Compile the RS metrics required for the BFT Annual Training submission including all enduring capability assessments." },
    ],
    dataRequirements: ["organizations", "personnel", "training_events"],
  },
  {
    id: "commander-brief",
    name: "Commander's Brief Builder",
    category: "Analysis & Advisement",
    description: "Build formatted briefings for command audiences",
    icon: "🎯",
    systemPrompt: `You are a military briefing specialist for the Chaplain Corps. Build clear, concise briefings formatted for command audiences. Include: bottom-line-up-front (BLUF), situation, key findings, recommendations, and decision points. Use military briefing format per FM 6-0. Tailor formality and detail to the audience echelon.`,
    quickPrompts: [
      { label: "BN Commander RS Brief", prompt: "Build a 10-minute RS brief for a battalion commander covering UMT status, program highlights, and upcoming RS requirements." },
      { label: "BDE CDR Decision Brief", prompt: "Prepare a decision brief for the brigade commander on religious accommodation requests requiring command action." },
      { label: "DIV CDR Quarterly Update", prompt: "Create a division-level quarterly RS update brief covering readiness, leader development, and capability gap status across the formation." },
    ],
    dataRequirements: ["organizations", "personnel", "training_events", "capability_gaps"],
  },
];

export function getSkillById(id: string): SkillDefinition | undefined {
  return SKILLS.find((s) => s.id === id);
}

export function getSkillsByCategory(category: string): SkillDefinition[] {
  return SKILLS.filter((s) => s.category === category);
}

export const SAMPLE_RESPONSES: Record<string, string> = {
  "rs-estimate": "RELIGIOUS SUPPORT ESTIMATE\n\n1. SITUATION\na. Area of Interest: The battalion AO encompasses approximately 200 sq km...\nb. Religious Demographics: Predominantly Muslim population (85%), with Christian minority (10%) and other faiths (5%)...\n\n2. MISSION\nProvide religious support to all assigned and attached personnel during Operation DECISIVE EDGE...\n\n3. RS CONSIDERATIONS\n- Friday Jumu'ah prayer accommodations for Muslim Soldiers\n- Sunday worship services in field conditions\n- Counseling support pre-positioned at aid station\n- Memorial ceremony preparation protocols\n\n4. RECOMMENDATION\nThe UMT recommends forward positioning at the BSA with split-team operations to support dispersed companies...\n\n[Sample response — configure ANTHROPIC_API_KEY for AI-generated content]",
  "default": "This AI skill is ready to assist you. Configure ANTHROPIC_API_KEY in .env.local to enable AI-generated responses.\n\nIn the meantime, use the quick-prompt buttons above to see sample outputs for this skill.\n\n[Sample response — configure ANTHROPIC_API_KEY for AI-generated content]",
};
