/**
 * C³ Compass Quality Definitions
 *
 * 18 qualities mapped to the three C³ pillars (Character, Competence, Connection)
 * per the CHAP-T.A.L.K.S. Handbook and Chaplain Evaluation Redesign v0.1.
 *
 * Each quality spans Ministry and Military domains within its pillar.
 */

export interface CompassQuality {
  id: string;
  pillar: "character" | "competence" | "connection";
  domain: "ministry" | "military";
  name: string;
  description: string;
  sort_order: number;
}

export const COMPASS_QUALITIES: CompassQuality[] = [
  // ── CHARACTER — Ministry ──────────────────────────────────
  {
    id: "spirituality",
    pillar: "character",
    domain: "ministry",
    name: "Spirituality",
    description:
      "Maintains a vibrant personal faith life that sustains ministry capacity. Demonstrates theological depth, spiritual maturity, and a visible devotional practice that models spiritual resilience for Soldiers and families.",
    sort_order: 1,
  },
  {
    id: "humility",
    pillar: "character",
    domain: "ministry",
    name: "Humility",
    description:
      "Seeks and incorporates feedback from others. Acknowledges personal limitations, credits team accomplishments, and demonstrates a teachable spirit that fosters trust and collaboration across the UMT.",
    sort_order: 2,
  },
  {
    id: "authenticity",
    pillar: "character",
    domain: "ministry",
    name: "Authenticity",
    description:
      "Actions are consistent with stated values and beliefs in all settings. Communicates honestly, follows through on commitments, and maintains personal integrity in financial, relational, and professional conduct.",
    sort_order: 3,
  },

  // ── CHARACTER — Military ──────────────────────────────────
  {
    id: "army_values",
    pillar: "character",
    domain: "military",
    name: "Army Values",
    description:
      "Consistently demonstrates the seven Army Values (LDRSHIP) in daily conduct and decision-making. Holds self and subordinates accountable to ethical standards and provides moral courage in advising the commander.",
    sort_order: 4,
  },
  {
    id: "empathy",
    pillar: "character",
    domain: "military",
    name: "Empathy",
    description:
      "Actively listens to Soldiers' concerns without rushing to judgment. Recognizes and responds to signs of distress, grief, or spiritual injury. Demonstrates genuine care that extends beyond professional obligation.",
    sort_order: 5,
  },
  {
    id: "discipline",
    pillar: "character",
    domain: "military",
    name: "Discipline",
    description:
      "Meets or exceeds all Army standards for appearance, fitness, and readiness. Manages time effectively, maintains administrative deadlines, and demonstrates composure under pressure in high-OPTEMPO environments.",
    sort_order: 6,
  },

  // ── COMPETENCE — Ministry ─────────────────────────────────
  {
    id: "preaching",
    pillar: "competence",
    domain: "ministry",
    name: "Preaching",
    description:
      "Delivers worship services and sermons that are biblically grounded and relevant to the military context. Adapts worship style to diverse audiences and provides worship opportunities under field conditions with minimal resources.",
    sort_order: 7,
  },
  {
    id: "teaching",
    pillar: "competence",
    domain: "ministry",
    name: "Teaching",
    description:
      "Develops and delivers strong-bonds, spiritual readiness, and resilience training aligned with unit needs. Facilitates professional development for subordinate UMT members and creates educational materials for diverse faith audiences.",
    sort_order: 8,
  },
  {
    id: "counseling",
    pillar: "competence",
    domain: "ministry",
    name: "Counseling/Care",
    description:
      "Provides pastoral counseling using evidence-based approaches within scope of practice. Maintains confidentiality, makes timely referrals, conducts crisis intervention, and supports family ministry programs.",
    sort_order: 9,
  },

  // ── COMPETENCE — Military ─────────────────────────────────
  {
    id: "soldiering",
    pillar: "competence",
    domain: "military",
    name: "Soldiering",
    description:
      "Demonstrates tactical proficiency appropriate to echelon. Operates effectively in field environments, integrates UMT operations into tactical planning, and maintains deployability readiness including ACFT standards.",
    sort_order: 10,
  },
  {
    id: "staffing",
    pillar: "competence",
    domain: "military",
    name: "Staffing",
    description:
      "Produces timely, accurate staff products including the Religious Support Annex. Conducts religious area analysis, manages UMT resources, and participates actively in MDMP/TLP as a primary staff officer.",
    sort_order: 11,
  },
  {
    id: "leading",
    pillar: "competence",
    domain: "military",
    name: "Leading",
    description:
      "Sets clear expectations and holds UMT members accountable. Develops subordinates through deliberate mentorship, makes sound decisions balancing ministry and mission, and advocates for UMT resourcing.",
    sort_order: 12,
  },

  // ── CONNECTION — Ministry ─────────────────────────────────
  {
    id: "visibility",
    pillar: "connection",
    domain: "ministry",
    name: "Visibility",
    description:
      "Maintains consistent presence in unit work areas, training areas, and living quarters. Visits Soldiers in barracks, hospitals, and confinement facilities. Is present during high-stress unit events and deployment operations.",
    sort_order: 13,
  },
  {
    id: "affability",
    pillar: "connection",
    domain: "ministry",
    name: "Affability",
    description:
      "Soldiers at all ranks approach freely and without appointment. Uses appropriate warmth to put people at ease. Remembers personal details and follows up on previous conversations. Communicates across cultural differences.",
    sort_order: 14,
  },
  {
    id: "accessibility",
    pillar: "connection",
    domain: "ministry",
    name: "Accessibility",
    description:
      "Responds promptly to ministry requests regardless of time or duty status. Provides multiple contact channels, schedules around unit operations, and ensures coverage for dispersed elements and after-hours needs.",
    sort_order: 15,
  },

  // ── CONNECTION — Military ─────────────────────────────────
  {
    id: "bearing",
    pillar: "connection",
    domain: "military",
    name: "Bearing",
    description:
      "Presents a professional military appearance that commands respect. Projects calm authority during crises, conducts ceremonies with dignity, and represents the Chaplain Corps positively in joint and community settings.",
    sort_order: 16,
  },
  {
    id: "confidence",
    pillar: "connection",
    domain: "military",
    name: "Confidence",
    description:
      "Speaks with authority on religious affairs in staff meetings. Engages senior leaders without intimidation, takes initiative on religious-support needs, and leads worship and ceremonies with assurance.",
    sort_order: 17,
  },
  {
    id: "resilience",
    pillar: "connection",
    domain: "military",
    name: "Resilience",
    description:
      "Continues effective ministry during extended operations and deployments. Recovers from setbacks without loss of effectiveness, maintains healthy coping strategies, and adapts when conditions change rapidly.",
    sort_order: 18,
  },
];

export const PILLAR_QUALITY_MAP = {
  character: COMPASS_QUALITIES.filter((q) => q.pillar === "character"),
  competence: COMPASS_QUALITIES.filter((q) => q.pillar === "competence"),
  connection: COMPASS_QUALITIES.filter((q) => q.pillar === "connection"),
};

export function getQualityById(id: string): CompassQuality | undefined {
  return COMPASS_QUALITIES.find((q) => q.id === id);
}
