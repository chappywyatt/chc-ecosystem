/**
 * Behavioral Indicators for the CHC Behavioral Sustainment Gauge
 *
 * Organized by the four-pillar C³ framework from the CHAP-T.A.L.K.S. Handbook
 * and Chaplain Evaluation Redesign v0.1:
 *
 *   CHARACTER    — Who the chaplain IS (green #1B5E20)
 *   COMPETENCE   — What the chaplain DOES (blue #0D47A1)
 *   CONNECTION   — How the chaplain RELATES (orange #E65100)
 *   CONSTITUTIONAL FIDELITY — How the chaplain PROTECTS (purple #4A148C)
 *
 * Each indicator:
 *   id             — Unique code: CH=Character, CO=Competence, CN=Connection, CF=Constitutional
 *   pillar         — character | competence | connection | constitutional
 *   sub_dimension  — The quality within the pillar (e.g., Spirituality, Preaching)
 *   domain         — ministry | military
 *   behavior_text  — Specific, observable behavior statement
 *   indicator_type — R=Required (must demonstrate), E=Expected (should demonstrate)
 *   echelon_minimum — Lowest echelon where this behavior is observable/expected
 *   doctrinal_source — AR/ADP/FM reference
 *   sort_order     — Display ordering within sub-dimension
 */

export interface BehavioralIndicator {
  id: string;
  pillar: "character" | "competence" | "connection" | "constitutional";
  sub_dimension: string;
  domain: "ministry" | "military";
  behavior_text: string;
  indicator_type: "R" | "E";
  echelon_minimum: string;
  doctrinal_source: string;
  sort_order: number;
}

export const BEHAVIORAL_INDICATORS: BehavioralIndicator[] = [
  // ═══════════════════════════════════════════════════════════════
  // CHARACTER — Who the chaplain IS (#1B5E20)
  // ═══════════════════════════════════════════════════════════════

  // ── Spirituality (Ministry) ────────────────────────────────
  {
    id: "CH-1.1",
    pillar: "character",
    sub_dimension: "Spirituality",
    domain: "ministry",
    behavior_text:
      "Maintains a regular, visible prayer/devotional life that sustains personal ministry capacity",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "ADP 6-22; CHAP-T.A.L.K.S. Handbook",
    sort_order: 1,
  },
  {
    id: "CH-1.2",
    pillar: "character",
    sub_dimension: "Spirituality",
    domain: "ministry",
    behavior_text:
      "Demonstrates theological depth when discussing spiritual matters with Soldiers and leaders",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1; ADP 6-22",
    sort_order: 2,
  },
  {
    id: "CH-1.3",
    pillar: "character",
    sub_dimension: "Spirituality",
    domain: "ministry",
    behavior_text:
      "Integrates personal faith commitments with professional responsibilities without imposing beliefs",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1",
    sort_order: 3,
  },
  {
    id: "CH-1.4",
    pillar: "character",
    sub_dimension: "Spirituality",
    domain: "ministry",
    behavior_text:
      "Seeks continuing spiritual formation through retreats, education, or mentorship",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "CHAP-T.A.L.K.S. Handbook",
    sort_order: 4,
  },
  {
    id: "CH-1.5",
    pillar: "character",
    sub_dimension: "Spirituality",
    domain: "ministry",
    behavior_text:
      "Models spiritual resilience during high-stress or high-OPTEMPO periods",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "ADP 6-22; FM 3-83",
    sort_order: 5,
  },

  // ── Humility (Ministry) ────────────────────────────────────
  {
    id: "CH-2.1",
    pillar: "character",
    sub_dimension: "Humility",
    domain: "ministry",
    behavior_text:
      "Actively seeks and incorporates feedback from subordinates, peers, and superiors",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "ADP 6-22",
    sort_order: 6,
  },
  {
    id: "CH-2.2",
    pillar: "character",
    sub_dimension: "Humility",
    domain: "ministry",
    behavior_text:
      "Acknowledges personal limitations and seeks assistance or referral when appropriate",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1; ADP 6-22",
    sort_order: 7,
  },
  {
    id: "CH-2.3",
    pillar: "character",
    sub_dimension: "Humility",
    domain: "ministry",
    behavior_text:
      "Credits team members and UMT partners for shared accomplishments",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "ADP 6-22",
    sort_order: 8,
  },
  {
    id: "CH-2.4",
    pillar: "character",
    sub_dimension: "Humility",
    domain: "ministry",
    behavior_text:
      "Demonstrates willingness to learn from those of different faith traditions",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1",
    sort_order: 9,
  },
  {
    id: "CH-2.5",
    pillar: "character",
    sub_dimension: "Humility",
    domain: "ministry",
    behavior_text:
      "Accepts correction or counseling without defensiveness and takes corrective action",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "ADP 6-22",
    sort_order: 10,
  },

  // ── Authenticity (Ministry) ────────────────────────────────
  {
    id: "CH-3.1",
    pillar: "character",
    sub_dimension: "Authenticity",
    domain: "ministry",
    behavior_text:
      "Actions in garrison and field environments are consistent with stated values and beliefs",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "ADP 6-22",
    sort_order: 11,
  },
  {
    id: "CH-3.2",
    pillar: "character",
    sub_dimension: "Authenticity",
    domain: "ministry",
    behavior_text:
      "Communicates honestly even when the message is unpopular or difficult",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "ADP 6-22",
    sort_order: 12,
  },
  {
    id: "CH-3.3",
    pillar: "character",
    sub_dimension: "Authenticity",
    domain: "ministry",
    behavior_text:
      "Maintains appropriate vulnerability that builds trust without compromising authority",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "CHAP-T.A.L.K.S. Handbook",
    sort_order: 13,
  },
  {
    id: "CH-3.4",
    pillar: "character",
    sub_dimension: "Authenticity",
    domain: "ministry",
    behavior_text:
      "Follows through on commitments and promises made to Soldiers and families",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "ADP 6-22",
    sort_order: 14,
  },
  {
    id: "CH-3.5",
    pillar: "character",
    sub_dimension: "Authenticity",
    domain: "ministry",
    behavior_text:
      "Maintains personal integrity in financial, relational, and professional conduct",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1; ADP 6-22",
    sort_order: 15,
  },

  // ── Army Values (Military) ─────────────────────────────────
  {
    id: "CH-4.1",
    pillar: "character",
    sub_dimension: "Army Values",
    domain: "military",
    behavior_text:
      "Consistently demonstrates the seven Army Values in daily conduct and decision-making",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "ADP 6-22",
    sort_order: 16,
  },
  {
    id: "CH-4.2",
    pillar: "character",
    sub_dimension: "Army Values",
    domain: "military",
    behavior_text:
      "Holds self and subordinates accountable to ethical standards without favoritism",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "ADP 6-22",
    sort_order: 17,
  },
  {
    id: "CH-4.3",
    pillar: "character",
    sub_dimension: "Army Values",
    domain: "military",
    behavior_text:
      "Identifies and addresses ethical issues before they become disciplinary problems",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "ADP 6-22",
    sort_order: 18,
  },
  {
    id: "CH-4.4",
    pillar: "character",
    sub_dimension: "Army Values",
    domain: "military",
    behavior_text:
      "Provides moral courage by advising the commander on ethical dimensions of operations",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "FM 3-83; ADP 6-22",
    sort_order: 19,
  },
  {
    id: "CH-4.5",
    pillar: "character",
    sub_dimension: "Army Values",
    domain: "military",
    behavior_text:
      "Participates in and supports the unit's SHARP and EO programs as a trusted agent",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1; AR 600-20",
    sort_order: 20,
  },

  // ── Empathy (Military) ─────────────────────────────────────
  {
    id: "CH-5.1",
    pillar: "character",
    sub_dimension: "Empathy",
    domain: "military",
    behavior_text:
      "Actively listens to Soldiers' concerns without rushing to solutions or judgment",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "ADP 6-22",
    sort_order: 21,
  },
  {
    id: "CH-5.2",
    pillar: "character",
    sub_dimension: "Empathy",
    domain: "military",
    behavior_text:
      "Recognizes and responds to signs of distress, grief, or spiritual injury in Soldiers and families",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "FM 3-83; ADP 6-22",
    sort_order: 22,
  },
  {
    id: "CH-5.3",
    pillar: "character",
    sub_dimension: "Empathy",
    domain: "military",
    behavior_text:
      "Adapts communication style to the cultural and generational context of the audience",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "ADP 6-22",
    sort_order: 23,
  },
  {
    id: "CH-5.4",
    pillar: "character",
    sub_dimension: "Empathy",
    domain: "military",
    behavior_text:
      "Demonstrates genuine care for Soldiers beyond professional obligation during personal crises",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "ADP 6-22; AR 165-1",
    sort_order: 24,
  },
  {
    id: "CH-5.5",
    pillar: "character",
    sub_dimension: "Empathy",
    domain: "military",
    behavior_text:
      "Maintains emotional awareness without absorbing others' trauma (compassion without burnout)",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "CHAP-T.A.L.K.S. Handbook",
    sort_order: 25,
  },

  // ── Discipline (Military) ──────────────────────────────────
  {
    id: "CH-6.1",
    pillar: "character",
    sub_dimension: "Discipline",
    domain: "military",
    behavior_text:
      "Meets or exceeds all Army standards for personal appearance, fitness, and readiness",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "ADP 6-22; AR 670-1",
    sort_order: 26,
  },
  {
    id: "CH-6.2",
    pillar: "character",
    sub_dimension: "Discipline",
    domain: "military",
    behavior_text:
      "Maintains administrative deadlines for reports, evaluations, and counseling requirements",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 623-3; ADP 6-22",
    sort_order: 27,
  },
  {
    id: "CH-6.3",
    pillar: "character",
    sub_dimension: "Discipline",
    domain: "military",
    behavior_text:
      "Manages time effectively across competing ministry, military, and family responsibilities",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "ADP 6-22",
    sort_order: 28,
  },
  {
    id: "CH-6.4",
    pillar: "character",
    sub_dimension: "Discipline",
    domain: "military",
    behavior_text:
      "Completes required military and professional education on schedule",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1; AR 600-3",
    sort_order: 29,
  },
  {
    id: "CH-6.5",
    pillar: "character",
    sub_dimension: "Discipline",
    domain: "military",
    behavior_text:
      "Maintains composure and professionalism under pressure in high-OPTEMPO environments",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "ADP 6-22",
    sort_order: 30,
  },

  // ═══════════════════════════════════════════════════════════════
  // COMPETENCE — What the chaplain DOES (#0D47A1)
  // ═══════════════════════════════════════════════════════════════

  // ── Preaching (Ministry) ───────────────────────────────────
  {
    id: "CO-1.1",
    pillar: "competence",
    sub_dimension: "Preaching",
    domain: "ministry",
    behavior_text:
      "Delivers worship services and sermons that are biblically grounded and relevant to the military context",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1",
    sort_order: 31,
  },
  {
    id: "CO-1.2",
    pillar: "competence",
    sub_dimension: "Preaching",
    domain: "ministry",
    behavior_text:
      "Prepares and delivers memorial ceremonies, invocations, and benedictions with appropriate gravity",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1; FM 3-83",
    sort_order: 32,
  },
  {
    id: "CO-1.3",
    pillar: "competence",
    sub_dimension: "Preaching",
    domain: "ministry",
    behavior_text:
      "Adapts worship style and content to diverse audiences (field vs. garrison, joint vs. single-service)",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1",
    sort_order: 33,
  },
  {
    id: "CO-1.4",
    pillar: "competence",
    sub_dimension: "Preaching",
    domain: "ministry",
    behavior_text:
      "Provides worship opportunities under field conditions with minimal resources and setup time",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "FM 3-83",
    sort_order: 34,
  },
  {
    id: "CO-1.5",
    pillar: "competence",
    sub_dimension: "Preaching",
    domain: "ministry",
    behavior_text:
      "Communicates complex theological concepts in plain language accessible to diverse educational backgrounds",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "CHAP-T.A.L.K.S. Handbook",
    sort_order: 35,
  },

  // ── Teaching (Ministry) ────────────────────────────────────
  {
    id: "CO-2.1",
    pillar: "competence",
    sub_dimension: "Teaching",
    domain: "ministry",
    behavior_text:
      "Develops and delivers strong-bonds or spiritual readiness training aligned with unit needs",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1; FM 3-83",
    sort_order: 36,
  },
  {
    id: "CO-2.2",
    pillar: "competence",
    sub_dimension: "Teaching",
    domain: "ministry",
    behavior_text:
      "Instructs unit personnel on suicide prevention, resilience, and spiritual fitness",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1; AR 600-63",
    sort_order: 37,
  },
  {
    id: "CO-2.3",
    pillar: "competence",
    sub_dimension: "Teaching",
    domain: "ministry",
    behavior_text:
      "Facilitates professional development sessions for subordinate UMT members",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1",
    sort_order: 38,
  },
  {
    id: "CO-2.4",
    pillar: "competence",
    sub_dimension: "Teaching",
    domain: "ministry",
    behavior_text:
      "Creates educational materials that address faith-group-specific and interfaith audiences",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1",
    sort_order: 39,
  },
  {
    id: "CO-2.5",
    pillar: "competence",
    sub_dimension: "Teaching",
    domain: "ministry",
    behavior_text:
      "Mentors junior chaplains and RAS on ministry techniques and professional growth",
    indicator_type: "R",
    echelon_minimum: "brigade",
    doctrinal_source: "AR 165-1; AR 600-3",
    sort_order: 40,
  },

  // ── Counseling/Care (Ministry) ─────────────────────────────
  {
    id: "CO-3.1",
    pillar: "competence",
    sub_dimension: "Counseling/Care",
    domain: "ministry",
    behavior_text:
      "Provides pastoral counseling using evidence-based approaches within scope of practice",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1",
    sort_order: 41,
  },
  {
    id: "CO-3.2",
    pillar: "competence",
    sub_dimension: "Counseling/Care",
    domain: "ministry",
    behavior_text:
      "Maintains appropriate confidentiality boundaries per AR 165-1 privileged communication provisions",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1",
    sort_order: 42,
  },
  {
    id: "CO-3.3",
    pillar: "competence",
    sub_dimension: "Counseling/Care",
    domain: "ministry",
    behavior_text:
      "Makes timely and appropriate referrals to behavioral health, MFLC, or community resources",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1; FM 3-83",
    sort_order: 43,
  },
  {
    id: "CO-3.4",
    pillar: "competence",
    sub_dimension: "Counseling/Care",
    domain: "ministry",
    behavior_text:
      "Conducts crisis intervention with Soldiers in acute distress, including suicide intervention",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1; AR 600-63",
    sort_order: 44,
  },
  {
    id: "CO-3.5",
    pillar: "competence",
    sub_dimension: "Counseling/Care",
    domain: "ministry",
    behavior_text:
      "Provides family-support ministry including marriage enrichment and family readiness programs",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1",
    sort_order: 45,
  },

  // ── Soldiering (Military) ──────────────────────────────────
  {
    id: "CO-4.1",
    pillar: "competence",
    sub_dimension: "Soldiering",
    domain: "military",
    behavior_text:
      "Demonstrates tactical proficiency appropriate to echelon (land navigation, convoy ops, field hygiene)",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "FM 3-83; STP 21-1-SMCT",
    sort_order: 46,
  },
  {
    id: "CO-4.2",
    pillar: "competence",
    sub_dimension: "Soldiering",
    domain: "military",
    behavior_text:
      "Operates effectively in the field with minimal logistical support and maintains UMT equipment readiness",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "FM 3-83",
    sort_order: 47,
  },
  {
    id: "CO-4.3",
    pillar: "competence",
    sub_dimension: "Soldiering",
    domain: "military",
    behavior_text:
      "Integrates UMT operations into unit tactical planning and execution without disrupting operations",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "FM 3-83; FM 6-0",
    sort_order: 48,
  },
  {
    id: "CO-4.4",
    pillar: "competence",
    sub_dimension: "Soldiering",
    domain: "military",
    behavior_text:
      "Meets or exceeds ACFT standards and maintains deployability readiness",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 350-1; FM 7-22",
    sort_order: 49,
  },
  {
    id: "CO-4.5",
    pillar: "competence",
    sub_dimension: "Soldiering",
    domain: "military",
    behavior_text:
      "Employs mission command systems to track and coordinate UMT activities in tactical environments",
    indicator_type: "E",
    echelon_minimum: "brigade",
    doctrinal_source: "FM 3-83; FM 6-0",
    sort_order: 50,
  },

  // ── Staffing (Military) ────────────────────────────────────
  {
    id: "CO-5.1",
    pillar: "competence",
    sub_dimension: "Staffing",
    domain: "military",
    behavior_text:
      "Produces timely, accurate staff products (annexes, estimates, reports) that meet commander requirements",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "FM 3-83; FM 6-0",
    sort_order: 51,
  },
  {
    id: "CO-5.2",
    pillar: "competence",
    sub_dimension: "Staffing",
    domain: "military",
    behavior_text:
      "Develops and maintains the Religious Support Annex (Annex F) for OPLANs and OPORDs",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "FM 3-83; FM 6-0",
    sort_order: 52,
  },
  {
    id: "CO-5.3",
    pillar: "competence",
    sub_dimension: "Staffing",
    domain: "military",
    behavior_text:
      "Conducts religious area analysis and provides area religious support estimates to the commander",
    indicator_type: "R",
    echelon_minimum: "brigade",
    doctrinal_source: "FM 3-83",
    sort_order: 53,
  },
  {
    id: "CO-5.4",
    pillar: "competence",
    sub_dimension: "Staffing",
    domain: "military",
    behavior_text:
      "Manages UMT budget, supply, and accountability with zero deficiencies on command inspections",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1",
    sort_order: 54,
  },
  {
    id: "CO-5.5",
    pillar: "competence",
    sub_dimension: "Staffing",
    domain: "military",
    behavior_text:
      "Participates actively in MDMP/TLP as a primary staff officer, contributing religious-support considerations",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "FM 3-83; FM 6-0; ADP 5-0",
    sort_order: 55,
  },

  // ── Leading (Military) ─────────────────────────────────────
  {
    id: "CO-6.1",
    pillar: "competence",
    sub_dimension: "Leading",
    domain: "military",
    behavior_text:
      "Sets clear expectations and holds UMT members accountable for performance standards",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "ADP 6-22",
    sort_order: 56,
  },
  {
    id: "CO-6.2",
    pillar: "competence",
    sub_dimension: "Leading",
    domain: "military",
    behavior_text:
      "Develops subordinate chaplains and RAS through deliberate counseling and mentorship",
    indicator_type: "R",
    echelon_minimum: "brigade",
    doctrinal_source: "ADP 6-22; AR 623-3",
    sort_order: 57,
  },
  {
    id: "CO-6.3",
    pillar: "competence",
    sub_dimension: "Leading",
    domain: "military",
    behavior_text:
      "Makes sound, timely decisions that balance ministry effectiveness with mission requirements",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "ADP 6-22; FM 6-0",
    sort_order: 58,
  },
  {
    id: "CO-6.4",
    pillar: "competence",
    sub_dimension: "Leading",
    domain: "military",
    behavior_text:
      "Coordinates multi-echelon religious support during exercises and deployments",
    indicator_type: "E",
    echelon_minimum: "brigade",
    doctrinal_source: "FM 3-83",
    sort_order: 59,
  },
  {
    id: "CO-6.5",
    pillar: "competence",
    sub_dimension: "Leading",
    domain: "military",
    behavior_text:
      "Advocates effectively for UMT resourcing and personnel requirements within the command structure",
    indicator_type: "E",
    echelon_minimum: "brigade",
    doctrinal_source: "AR 165-1; FM 3-83",
    sort_order: 60,
  },

  // ═══════════════════════════════════════════════════════════════
  // CONNECTION — How the chaplain RELATES (#E65100)
  // ═══════════════════════════════════════════════════════════════

  // ── Visibility (Ministry) ──────────────────────────────────
  {
    id: "CN-1.1",
    pillar: "connection",
    sub_dimension: "Visibility",
    domain: "ministry",
    behavior_text:
      "Maintains consistent presence in unit work areas, motor pools, and training areas during duty hours",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "FM 3-83; CHAP-T.A.L.K.S. Handbook",
    sort_order: 61,
  },
  {
    id: "CN-1.2",
    pillar: "connection",
    sub_dimension: "Visibility",
    domain: "ministry",
    behavior_text:
      "Visits Soldiers in barracks, hospitals, and confinement facilities on a regular schedule",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1",
    sort_order: 62,
  },
  {
    id: "CN-1.3",
    pillar: "connection",
    sub_dimension: "Visibility",
    domain: "ministry",
    behavior_text:
      "Attends unit social events, unit runs, and informal gatherings to build relational presence",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "CHAP-T.A.L.K.S. Handbook",
    sort_order: 63,
  },
  {
    id: "CN-1.4",
    pillar: "connection",
    sub_dimension: "Visibility",
    domain: "ministry",
    behavior_text:
      "Is present and visible during high-stress unit events (deployment, redeployment, casualty operations)",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "FM 3-83",
    sort_order: 64,
  },
  {
    id: "CN-1.5",
    pillar: "connection",
    sub_dimension: "Visibility",
    domain: "ministry",
    behavior_text:
      "Maintains visibility with family readiness groups and rear detachment operations during deployments",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1",
    sort_order: 65,
  },

  // ── Affability (Ministry) ──────────────────────────────────
  {
    id: "CN-2.1",
    pillar: "connection",
    sub_dimension: "Affability",
    domain: "ministry",
    behavior_text:
      "Soldiers at all ranks approach the chaplain freely and without appointment for informal conversations",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "CHAP-T.A.L.K.S. Handbook",
    sort_order: 66,
  },
  {
    id: "CN-2.2",
    pillar: "connection",
    sub_dimension: "Affability",
    domain: "ministry",
    behavior_text:
      "Uses appropriate humor and warmth to put people at ease in stressful situations",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "CHAP-T.A.L.K.S. Handbook",
    sort_order: 67,
  },
  {
    id: "CN-2.3",
    pillar: "connection",
    sub_dimension: "Affability",
    domain: "ministry",
    behavior_text:
      "Remembers personal details about Soldiers and families and follows up on previous conversations",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "CHAP-T.A.L.K.S. Handbook",
    sort_order: 68,
  },
  {
    id: "CN-2.4",
    pillar: "connection",
    sub_dimension: "Affability",
    domain: "ministry",
    behavior_text:
      "Communicates empathetically across cultural, ethnic, and generational differences",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "ADP 6-22; AR 165-1",
    sort_order: 69,
  },
  {
    id: "CN-2.5",
    pillar: "connection",
    sub_dimension: "Affability",
    domain: "ministry",
    behavior_text:
      "Maintains professional warmth that balances approachability with appropriate boundaries",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "CHAP-T.A.L.K.S. Handbook",
    sort_order: 70,
  },

  // ── Accessibility (Ministry) ───────────────────────────────
  {
    id: "CN-3.1",
    pillar: "connection",
    sub_dimension: "Accessibility",
    domain: "ministry",
    behavior_text:
      "Responds promptly to requests for ministry support regardless of time of day or duty status",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1",
    sort_order: 71,
  },
  {
    id: "CN-3.2",
    pillar: "connection",
    sub_dimension: "Accessibility",
    domain: "ministry",
    behavior_text:
      "Provides multiple channels for Soldiers to reach the UMT (in-person, phone, digital)",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1",
    sort_order: 72,
  },
  {
    id: "CN-3.3",
    pillar: "connection",
    sub_dimension: "Accessibility",
    domain: "ministry",
    behavior_text:
      "Schedules office hours and worship times around unit training schedules, not personal convenience",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1",
    sort_order: 73,
  },
  {
    id: "CN-3.4",
    pillar: "connection",
    sub_dimension: "Accessibility",
    domain: "ministry",
    behavior_text:
      "Ensures religious support is available to geographically dispersed elements and tenant units",
    indicator_type: "E",
    echelon_minimum: "brigade",
    doctrinal_source: "AR 165-1; FM 3-83",
    sort_order: 74,
  },
  {
    id: "CN-3.5",
    pillar: "connection",
    sub_dimension: "Accessibility",
    domain: "ministry",
    behavior_text:
      "Maintains ministry presence during non-duty hours for critical pastoral needs",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1",
    sort_order: 75,
  },

  // ── Bearing (Military) ─────────────────────────────────────
  {
    id: "CN-4.1",
    pillar: "connection",
    sub_dimension: "Bearing",
    domain: "military",
    behavior_text:
      "Presents a professional military appearance that commands respect from Soldiers and leaders",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "ADP 6-22; AR 670-1",
    sort_order: 76,
  },
  {
    id: "CN-4.2",
    pillar: "connection",
    sub_dimension: "Bearing",
    domain: "military",
    behavior_text:
      "Projects calm authority during crisis situations that reassures others",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "ADP 6-22",
    sort_order: 77,
  },
  {
    id: "CN-4.3",
    pillar: "connection",
    sub_dimension: "Bearing",
    domain: "military",
    behavior_text:
      "Conducts ceremonies and rituals with appropriate dignity, gravity, and poise",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1; ADP 6-22",
    sort_order: 78,
  },
  {
    id: "CN-4.4",
    pillar: "connection",
    sub_dimension: "Bearing",
    domain: "military",
    behavior_text:
      "Represents the Chaplain Corps positively in joint, interagency, and community settings",
    indicator_type: "E",
    echelon_minimum: "brigade",
    doctrinal_source: "AR 165-1; ADP 6-22",
    sort_order: 79,
  },
  {
    id: "CN-4.5",
    pillar: "connection",
    sub_dimension: "Bearing",
    domain: "military",
    behavior_text:
      "Maintains appropriate verbal and non-verbal communication that reflects rank and position",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "ADP 6-22",
    sort_order: 80,
  },

  // ── Confidence (Military) ──────────────────────────────────
  {
    id: "CN-5.1",
    pillar: "connection",
    sub_dimension: "Confidence",
    domain: "military",
    behavior_text:
      "Speaks with authority on religious affairs in staff meetings and commander briefings",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "FM 3-83; ADP 6-22",
    sort_order: 81,
  },
  {
    id: "CN-5.2",
    pillar: "connection",
    sub_dimension: "Confidence",
    domain: "military",
    behavior_text:
      "Engages senior leaders without intimidation, providing candid spiritual and ethical counsel",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "ADP 6-22; FM 3-83",
    sort_order: 82,
  },
  {
    id: "CN-5.3",
    pillar: "connection",
    sub_dimension: "Confidence",
    domain: "military",
    behavior_text:
      "Takes initiative to address religious-support needs without waiting for direction",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "ADP 6-22",
    sort_order: 83,
  },
  {
    id: "CN-5.4",
    pillar: "connection",
    sub_dimension: "Confidence",
    domain: "military",
    behavior_text:
      "Presents briefings and proposals that are clear, concise, and well-supported with data",
    indicator_type: "E",
    echelon_minimum: "brigade",
    doctrinal_source: "FM 6-0; ADP 6-22",
    sort_order: 84,
  },
  {
    id: "CN-5.5",
    pillar: "connection",
    sub_dimension: "Confidence",
    domain: "military",
    behavior_text:
      "Leads worship, ceremonies, and training with assurance that inspires trust in the UMT",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1; CHAP-T.A.L.K.S. Handbook",
    sort_order: 85,
  },

  // ── Resilience (Military) ──────────────────────────────────
  {
    id: "CN-6.1",
    pillar: "connection",
    sub_dimension: "Resilience",
    domain: "military",
    behavior_text:
      "Continues effective ministry performance during extended field operations and deployments",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "FM 3-83; ADP 6-22",
    sort_order: 86,
  },
  {
    id: "CN-6.2",
    pillar: "connection",
    sub_dimension: "Resilience",
    domain: "military",
    behavior_text:
      "Recovers from setbacks, failed initiatives, or criticism without loss of effectiveness",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "ADP 6-22",
    sort_order: 87,
  },
  {
    id: "CN-6.3",
    pillar: "connection",
    sub_dimension: "Resilience",
    domain: "military",
    behavior_text:
      "Maintains healthy personal coping strategies and models work-life balance for subordinates",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "CHAP-T.A.L.K.S. Handbook",
    sort_order: 88,
  },
  {
    id: "CN-6.4",
    pillar: "connection",
    sub_dimension: "Resilience",
    domain: "military",
    behavior_text:
      "Adapts ministry approach when initial plans fail or conditions change rapidly",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "FM 3-83; ADP 6-22",
    sort_order: 89,
  },
  {
    id: "CN-6.5",
    pillar: "connection",
    sub_dimension: "Resilience",
    domain: "military",
    behavior_text:
      "Processes vicarious trauma through appropriate channels while maintaining ministry availability",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "CHAP-T.A.L.K.S. Handbook",
    sort_order: 90,
  },

  // ═══════════════════════════════════════════════════════════════
  // CONSTITUTIONAL FIDELITY — How the chaplain PROTECTS (#4A148C)
  // ═══════════════════════════════════════════════════════════════

  // ── Plurality in Practice ──────────────────────────────────
  {
    id: "CF-1.1",
    pillar: "constitutional",
    sub_dimension: "Plurality in Practice",
    domain: "ministry",
    behavior_text:
      "Provides or ensures religious support to all Soldiers regardless of faith tradition or no faith",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1",
    sort_order: 91,
  },
  {
    id: "CF-1.2",
    pillar: "constitutional",
    sub_dimension: "Plurality in Practice",
    domain: "ministry",
    behavior_text:
      "Coordinates coverage for faith groups the chaplain cannot personally serve",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1; FM 3-83",
    sort_order: 92,
  },
  {
    id: "CF-1.3",
    pillar: "constitutional",
    sub_dimension: "Plurality in Practice",
    domain: "ministry",
    behavior_text:
      "Advocates for minority faith group accommodation with the same energy as majority groups",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1",
    sort_order: 93,
  },
  {
    id: "CF-1.4",
    pillar: "constitutional",
    sub_dimension: "Plurality in Practice",
    domain: "ministry",
    behavior_text:
      "Demonstrates respect for all faith traditions in conversation and practice, not merely tolerance",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1; CHAP-T.A.L.K.S. Handbook",
    sort_order: 94,
  },
  {
    id: "CF-1.5",
    pillar: "constitutional",
    sub_dimension: "Plurality in Practice",
    domain: "ministry",
    behavior_text:
      "Develops and maintains a pluralistic worship and program schedule that reflects unit demographics",
    indicator_type: "E",
    echelon_minimum: "brigade",
    doctrinal_source: "AR 165-1",
    sort_order: 95,
  },

  // ── Equality of Access ─────────────────────────────────────
  {
    id: "CF-2.1",
    pillar: "constitutional",
    sub_dimension: "Equality of Access",
    domain: "military",
    behavior_text:
      "Ensures religious support resources (facilities, time, budget) are distributed equitably across faith groups",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1",
    sort_order: 96,
  },
  {
    id: "CF-2.2",
    pillar: "constitutional",
    sub_dimension: "Equality of Access",
    domain: "military",
    behavior_text:
      "Removes barriers that prevent Soldiers from attending services or observing religious practices",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1; AR 600-20",
    sort_order: 97,
  },
  {
    id: "CF-2.3",
    pillar: "constitutional",
    sub_dimension: "Equality of Access",
    domain: "military",
    behavior_text:
      "Advocates with the command for protected worship time on the unit training calendar",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1",
    sort_order: 98,
  },
  {
    id: "CF-2.4",
    pillar: "constitutional",
    sub_dimension: "Equality of Access",
    domain: "military",
    behavior_text:
      "Ensures dietary accommodation requests for religious observance are processed and supported",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1; AR 30-22",
    sort_order: 99,
  },
  {
    id: "CF-2.5",
    pillar: "constitutional",
    sub_dimension: "Equality of Access",
    domain: "military",
    behavior_text:
      "Provides equal quality of care, counsel, and attention to Soldiers regardless of their beliefs",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1",
    sort_order: 100,
  },

  // ── Freedom OF Religion ────────────────────────────────────
  {
    id: "CF-3.1",
    pillar: "constitutional",
    sub_dimension: "Freedom OF Religion",
    domain: "military",
    behavior_text:
      "Proactively identifies and resolves conflicts between unit schedules and Soldiers' religious obligations",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1; AR 600-20",
    sort_order: 101,
  },
  {
    id: "CF-3.2",
    pillar: "constitutional",
    sub_dimension: "Freedom OF Religion",
    domain: "military",
    behavior_text:
      "Supports religious accommodation requests (grooming, headwear, observance) through proper channels",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1; AR 600-20",
    sort_order: 102,
  },
  {
    id: "CF-3.3",
    pillar: "constitutional",
    sub_dimension: "Freedom OF Religion",
    domain: "military",
    behavior_text:
      "Educates commanders on the legal requirements for religious accommodation under DoD policy",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1; DoDI 1300.17",
    sort_order: 103,
  },
  {
    id: "CF-3.4",
    pillar: "constitutional",
    sub_dimension: "Freedom OF Religion",
    domain: "military",
    behavior_text:
      "Protects Soldiers' right to practice (or not practice) religion without coercion or reprisal",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1; U.S. Constitution",
    sort_order: 104,
  },
  {
    id: "CF-3.5",
    pillar: "constitutional",
    sub_dimension: "Freedom OF Religion",
    domain: "military",
    behavior_text:
      "Documents and reports instances where religious exercise is improperly restricted",
    indicator_type: "E",
    echelon_minimum: "brigade",
    doctrinal_source: "AR 165-1",
    sort_order: 105,
  },

  // ── Freedom FROM Religion ──────────────────────────────────
  {
    id: "CF-4.1",
    pillar: "constitutional",
    sub_dimension: "Freedom FROM Religion",
    domain: "military",
    behavior_text:
      "Ensures no Soldier is compelled to attend worship, prayer, or religious programming",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1; U.S. Constitution",
    sort_order: 106,
  },
  {
    id: "CF-4.2",
    pillar: "constitutional",
    sub_dimension: "Freedom FROM Religion",
    domain: "military",
    behavior_text:
      "Separates mandatory unit events from optional religious content by clear announcement",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1",
    sort_order: 107,
  },
  {
    id: "CF-4.3",
    pillar: "constitutional",
    sub_dimension: "Freedom FROM Religion",
    domain: "military",
    behavior_text:
      "Refrains from proselytizing in official capacity or leveraging rank for religious influence",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1; AR 600-20",
    sort_order: 108,
  },
  {
    id: "CF-4.4",
    pillar: "constitutional",
    sub_dimension: "Freedom FROM Religion",
    domain: "military",
    behavior_text:
      "Respects the boundary between personal faith expression and official endorsement",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1; DoDI 1300.17",
    sort_order: 109,
  },
  {
    id: "CF-4.5",
    pillar: "constitutional",
    sub_dimension: "Freedom FROM Religion",
    domain: "military",
    behavior_text:
      "Provides non-religious alternatives for Soldiers who seek care without spiritual content",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1",
    sort_order: 110,
  },

  // ── Referral & Accommodation ───────────────────────────────
  {
    id: "CF-5.1",
    pillar: "constitutional",
    sub_dimension: "Referral & Accommodation",
    domain: "ministry",
    behavior_text:
      "Maintains a current referral network of chaplains from diverse faith traditions within the area",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1; FM 3-83",
    sort_order: 111,
  },
  {
    id: "CF-5.2",
    pillar: "constitutional",
    sub_dimension: "Referral & Accommodation",
    domain: "ministry",
    behavior_text:
      "Processes religious accommodation requests within prescribed timelines and follows up",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1; AR 600-20",
    sort_order: 112,
  },
  {
    id: "CF-5.3",
    pillar: "constitutional",
    sub_dimension: "Referral & Accommodation",
    domain: "ministry",
    behavior_text:
      "Connects Soldiers with civilian religious leaders when military chaplains cannot provide required rites",
    indicator_type: "E",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1",
    sort_order: 113,
  },
  {
    id: "CF-5.4",
    pillar: "constitutional",
    sub_dimension: "Referral & Accommodation",
    domain: "ministry",
    behavior_text:
      "Ensures referrals are warm hand-offs, not bureaucratic deflection — follows up on each referral",
    indicator_type: "R",
    echelon_minimum: "battalion",
    doctrinal_source: "AR 165-1; CHAP-T.A.L.K.S. Handbook",
    sort_order: 114,
  },
  {
    id: "CF-5.5",
    pillar: "constitutional",
    sub_dimension: "Referral & Accommodation",
    domain: "ministry",
    behavior_text:
      "Documents accommodation outcomes and reports unresolved cases through the chaplain chain",
    indicator_type: "E",
    echelon_minimum: "brigade",
    doctrinal_source: "AR 165-1",
    sort_order: 115,
  },
];

// ── Utility helpers ────────────────────────────────────────────

export const PILLAR_COLORS = {
  character: "#1B5E20",
  competence: "#0D47A1",
  connection: "#E65100",
  constitutional: "#4A148C",
} as const;

export const PILLAR_LABELS = {
  character: "Character",
  competence: "Competence",
  connection: "Connection",
  constitutional: "Constitutional Fidelity",
} as const;

export function getIndicatorsByPillar(pillar: string): BehavioralIndicator[] {
  return BEHAVIORAL_INDICATORS.filter((i) => i.pillar === pillar).sort(
    (a, b) => a.sort_order - b.sort_order
  );
}

export function getSubDimensions(
  pillar: string
): { name: string; domain: string; indicators: BehavioralIndicator[] }[] {
  const pillarIndicators = getIndicatorsByPillar(pillar);
  const groups = new Map<string, BehavioralIndicator[]>();

  for (const ind of pillarIndicators) {
    const key = `${ind.sub_dimension}|${ind.domain}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(ind);
  }

  return Array.from(groups.entries()).map(([key, indicators]) => {
    const [name, domain] = key.split("|");
    return { name, domain, indicators };
  });
}

export function getIndicatorsForEchelon(
  echelon: string
): BehavioralIndicator[] {
  const echelonOrder = [
    "team", "squad", "platoon", "company",
    "battalion", "brigade", "division", "corps", "theater",
  ];
  const echelonIdx = echelonOrder.indexOf(echelon);
  if (echelonIdx === -1) return BEHAVIORAL_INDICATORS;

  return BEHAVIORAL_INDICATORS.filter((i) => {
    const minIdx = echelonOrder.indexOf(i.echelon_minimum);
    return minIdx <= echelonIdx;
  });
}
