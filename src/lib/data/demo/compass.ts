/**
 * ═══════════════════════════════════════════════════════════════════════════
 * COMPASS — 360-Degree Feedback Cycles & Responses
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * 5 Compass cycles with 9 responses each (45 total responses):
 *   1 self + 3 subordinate + 3 peer + 2 superior = 9 per cycle
 *
 * 18 quality keys across 3 domains:
 *   Character:  spirituality, humility, authenticity, army_values, empathy, discipline
 *   Competence: preaching, teaching, counseling, soldiering, staffing, leading
 *   Connection: visibility, affability, accessibility, bearing, confidence, resilience
 *
 * ID schemes:
 *   Cycles:    demo-7000-0000-0000-{12-digit seq}
 *   Responses: demo-8000-0000-0000-{12-digit seq}
 */

import { PER } from "./personnel";

// ── Helpers ───────────────────────────────────────────────────────────────
const cid = (n: number) => `de007000-0000-0000-0000-${String(n).padStart(12, "0")}`;
const rid = (n: number) => `de008000-0000-0000-0000-${String(n).padStart(12, "0")}`;

// ═══════════════════════════════════════════════════════════════════════════
// COMPASS CYCLES
// ═══════════════════════════════════════════════════════════════════════════

export const COMPASS_CYCLES = [
  // ── Cycle 1: CPT Nakamura (4-9 CAV) — Strong performer, slight self-overrating
  {
    id: cid(1),
    subject_id: PER.CD_4_9_CAV_CH,
    initiated_by: PER.CD_2ABCT_CH,
    assessment_period: "FY26-Q1",
    status: "closed",
    opens_at: "2025-10-15T00:00:00Z",
    closes_at: "2025-12-20T00:00:00Z",
  },

  // ── Cycle 2: CPT Kim (2-5 CAV) — Developing, staffing/soldiering gap
  {
    id: cid(2),
    subject_id: PER.CD_2_5_CAV_CH,
    initiated_by: PER.CD_1ABCT_CH,
    assessment_period: "FY26-Q1",
    status: "closed",
    opens_at: "2025-10-20T00:00:00Z",
    closes_at: "2025-12-22T00:00:00Z",
  },

  // ── Cycle 3: MAJ Okafor (3ABCT BDE) — Strong overall, accessibility gap
  {
    id: cid(3),
    subject_id: PER.CD_3ABCT_CH,
    initiated_by: PER.CD_DIV_CH,
    assessment_period: "FY26-Q1",
    status: "closed",
    opens_at: "2025-10-18T00:00:00Z",
    closes_at: "2025-12-19T00:00:00Z",
  },

  // ── Cycle 4: MAJ Odom (1AD 1BCT) — Strong competence, developing connection
  {
    id: cid(4),
    subject_id: PER.AD_1BCT_CH,
    initiated_by: PER.AD_DIV_CH,
    assessment_period: "FY26-Q2",
    status: "reviewed",
    opens_at: "2026-01-10T00:00:00Z",
    closes_at: "2026-03-12T00:00:00Z",
  },

  // ── Cycle 5: CPT Ogundimu (1-18 INF) — New to position, baseline
  {
    id: cid(5),
    subject_id: PER.ID_1_18_INF_CH,
    initiated_by: PER.ID_2ABCT_CH,
    assessment_period: "FY26-Q2",
    status: "reviewed",
    opens_at: "2026-01-15T00:00:00Z",
    closes_at: "2026-03-10T00:00:00Z",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// COMPASS RESPONSES
// ═══════════════════════════════════════════════════════════════════════════

export const COMPASS_RESPONSES = [
  // ─────────────────────────────────────────────────────────────────────────
  // CYCLE 1 — CPT Nakamura (4-9 CAV, 2ABCT) — Strong, slight self-overrating
  // Self rates high (4s-5s), others rate slightly lower (3s-4s, some 5s)
  // ─────────────────────────────────────────────────────────────────────────

  // C1 — Self
  {
    id: rid(1),
    cycle_id: cid(1),
    respondent_role: "self",
    respondent_token: "demo-token-8000-0001-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2025-11-05T00:00:00Z",
    ratings: {
      spirituality: 5, humility: 4, authenticity: 5,
      army_values: 5, empathy: 5, discipline: 4,
      preaching: 5, teaching: 4, counseling: 5,
      soldiering: 4, staffing: 4, leading: 5,
      visibility: 5, affability: 5, accessibility: 5,
      bearing: 5, confidence: 5, resilience: 4,
    },
  },

  // C1 — Subordinate 1: RAS NCO at 4-9 CAV
  {
    id: rid(2),
    cycle_id: cid(1),
    respondent_role: "subordinate",
    respondent_token: "demo-token-8000-0002-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2025-11-10T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 3, authenticity: 4,
      army_values: 4, empathy: 4, discipline: 3,
      preaching: 4, teaching: 3, counseling: 4,
      soldiering: 3, staffing: 3, leading: 4,
      visibility: 4, affability: 4, accessibility: 4,
      bearing: 4, confidence: 4, resilience: 3,
    },
  },

  // C1 — Subordinate 2: Peer BN CH from 1-5 CAV (same BDE)
  {
    id: rid(3),
    cycle_id: cid(1),
    respondent_role: "subordinate",
    respondent_token: "demo-token-8000-0003-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2025-11-12T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 4, authenticity: 4,
      army_values: 4, empathy: 5, discipline: 3,
      preaching: 4, teaching: 3, counseling: 5,
      soldiering: 3, staffing: 3, leading: 4,
      visibility: 5, affability: 4, accessibility: 4,
      bearing: 4, confidence: 4, resilience: 4,
    },
  },

  // C1 — Subordinate 3: Peer BN CH from 1-8 CAV (same BDE)
  {
    id: rid(4),
    cycle_id: cid(1),
    respondent_role: "subordinate",
    respondent_token: "demo-token-8000-0004-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2025-11-14T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 3, authenticity: 4,
      army_values: 4, empathy: 4, discipline: 4,
      preaching: 3, teaching: 4, counseling: 4,
      soldiering: 3, staffing: 3, leading: 3,
      visibility: 4, affability: 4, accessibility: 3,
      bearing: 4, confidence: 3, resilience: 4,
    },
  },

  // C1 — Peer 1: BN CH from 1-9 CAV (same BDE)
  {
    id: rid(5),
    cycle_id: cid(1),
    respondent_role: "peer",
    respondent_token: "demo-token-8000-0005-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2025-11-08T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 3, authenticity: 4,
      army_values: 4, empathy: 4, discipline: 3,
      preaching: 4, teaching: 3, counseling: 4,
      soldiering: 4, staffing: 3, leading: 4,
      visibility: 5, affability: 4, accessibility: 4,
      bearing: 4, confidence: 4, resilience: 3,
    },
  },

  // C1 — Peer 2: BN CH from 3-16 FA (same BDE)
  {
    id: rid(6),
    cycle_id: cid(1),
    respondent_role: "peer",
    respondent_token: "demo-token-8000-0006-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2025-11-11T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 4, authenticity: 3,
      army_values: 4, empathy: 5, discipline: 3,
      preaching: 4, teaching: 3, counseling: 5,
      soldiering: 3, staffing: 3, leading: 4,
      visibility: 4, affability: 5, accessibility: 4,
      bearing: 3, confidence: 4, resilience: 4,
    },
  },

  // C1 — Peer 3: BN CH from 1-7 CAV (adjacent 1ABCT)
  {
    id: rid(7),
    cycle_id: cid(1),
    respondent_role: "peer",
    respondent_token: "demo-token-8000-0007-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2025-11-15T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 3, authenticity: 4,
      army_values: 5, empathy: 4, discipline: 3,
      preaching: 4, teaching: 4, counseling: 4,
      soldiering: 3, staffing: 4, leading: 4,
      visibility: 4, affability: 4, accessibility: 4,
      bearing: 4, confidence: 4, resilience: 3,
    },
  },

  // C1 — Superior 1: BDE CH (2ABCT)
  {
    id: rid(8),
    cycle_id: cid(1),
    respondent_role: "superior",
    respondent_token: "demo-token-8000-0008-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2025-12-01T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 3, authenticity: 4,
      army_values: 4, empathy: 4, discipline: 4,
      preaching: 4, teaching: 3, counseling: 4,
      soldiering: 3, staffing: 3, leading: 4,
      visibility: 5, affability: 4, accessibility: 4,
      bearing: 4, confidence: 4, resilience: 4,
    },
  },

  // C1 — Superior 2: DIV CH (1CD)
  {
    id: rid(9),
    cycle_id: cid(1),
    respondent_role: "superior",
    respondent_token: "demo-token-8000-0009-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2025-12-05T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 3, authenticity: 4,
      army_values: 4, empathy: 4, discipline: 3,
      preaching: 4, teaching: 3, counseling: 5,
      soldiering: 3, staffing: 3, leading: 4,
      visibility: 5, affability: 4, accessibility: 3,
      bearing: 4, confidence: 4, resilience: 4,
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CYCLE 2 — CPT Kim (2-5 CAV, 1ABCT) — Strong character, weak staffing/soldiering
  // ─────────────────────────────────────────────────────────────────────────

  // C2 — Self
  {
    id: rid(10),
    cycle_id: cid(2),
    respondent_role: "self",
    respondent_token: "demo-token-8000-0010-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2025-11-08T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 4, authenticity: 5,
      army_values: 5, empathy: 5, discipline: 4,
      preaching: 4, teaching: 4, counseling: 5,
      soldiering: 3, staffing: 3, leading: 4,
      visibility: 4, affability: 4, accessibility: 4,
      bearing: 4, confidence: 4, resilience: 4,
    },
  },

  // C2 — Subordinate 1: RAS NCO at 2-5 CAV
  {
    id: rid(11),
    cycle_id: cid(2),
    respondent_role: "subordinate",
    respondent_token: "demo-token-8000-0011-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2025-11-12T00:00:00Z",
    ratings: {
      spirituality: 5, humility: 4, authenticity: 5,
      army_values: 5, empathy: 5, discipline: 4,
      preaching: 4, teaching: 3, counseling: 5,
      soldiering: 2, staffing: 2, leading: 3,
      visibility: 4, affability: 4, accessibility: 4,
      bearing: 4, confidence: 3, resilience: 4,
    },
  },

  // C2 — Subordinate 2: BN CH from 1-7 CAV (same 1ABCT)
  {
    id: rid(12),
    cycle_id: cid(2),
    respondent_role: "subordinate",
    respondent_token: "demo-token-8000-0012-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2025-11-14T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 5, authenticity: 4,
      army_values: 4, empathy: 5, discipline: 3,
      preaching: 4, teaching: 3, counseling: 4,
      soldiering: 2, staffing: 2, leading: 3,
      visibility: 4, affability: 5, accessibility: 4,
      bearing: 3, confidence: 3, resilience: 4,
    },
  },

  // C2 — Subordinate 3: BN CH from 2-8 CAV (same 1ABCT)
  {
    id: rid(13),
    cycle_id: cid(2),
    respondent_role: "subordinate",
    respondent_token: "demo-token-8000-0013-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2025-11-15T00:00:00Z",
    ratings: {
      spirituality: 5, humility: 4, authenticity: 5,
      army_values: 5, empathy: 4, discipline: 4,
      preaching: 3, teaching: 3, counseling: 5,
      soldiering: 2, staffing: 3, leading: 3,
      visibility: 3, affability: 4, accessibility: 4,
      bearing: 4, confidence: 3, resilience: 3,
    },
  },

  // C2 — Peer 1: BN CH from 2-12 CAV (same 1ABCT)
  {
    id: rid(14),
    cycle_id: cid(2),
    respondent_role: "peer",
    respondent_token: "demo-token-8000-0014-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2025-11-10T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 4, authenticity: 4,
      army_values: 5, empathy: 5, discipline: 3,
      preaching: 4, teaching: 4, counseling: 4,
      soldiering: 3, staffing: 2, leading: 3,
      visibility: 4, affability: 4, accessibility: 4,
      bearing: 3, confidence: 3, resilience: 4,
    },
  },

  // C2 — Peer 2: BN CH from 1-82 FA (same 1ABCT)
  {
    id: rid(15),
    cycle_id: cid(2),
    respondent_role: "peer",
    respondent_token: "demo-token-8000-0015-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2025-11-13T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 5, authenticity: 4,
      army_values: 4, empathy: 4, discipline: 3,
      preaching: 3, teaching: 3, counseling: 5,
      soldiering: 2, staffing: 2, leading: 3,
      visibility: 3, affability: 4, accessibility: 3,
      bearing: 3, confidence: 3, resilience: 4,
    },
  },

  // C2 — Peer 3: BN CH from 6-9 CAV (adjacent 3ABCT)
  {
    id: rid(16),
    cycle_id: cid(2),
    respondent_role: "peer",
    respondent_token: "demo-token-8000-0016-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2025-11-16T00:00:00Z",
    ratings: {
      spirituality: 5, humility: 4, authenticity: 5,
      army_values: 4, empathy: 5, discipline: 3,
      preaching: 4, teaching: 3, counseling: 4,
      soldiering: 2, staffing: 3, leading: 3,
      visibility: 4, affability: 4, accessibility: 4,
      bearing: 3, confidence: 3, resilience: 3,
    },
  },

  // C2 — Superior 1: BDE CH (1ABCT)
  {
    id: rid(17),
    cycle_id: cid(2),
    respondent_role: "superior",
    respondent_token: "demo-token-8000-0017-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2025-12-03T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 4, authenticity: 5,
      army_values: 5, empathy: 5, discipline: 3,
      preaching: 4, teaching: 3, counseling: 5,
      soldiering: 2, staffing: 2, leading: 3,
      visibility: 4, affability: 4, accessibility: 4,
      bearing: 3, confidence: 3, resilience: 4,
    },
  },

  // C2 — Superior 2: DIV CH (1CD)
  {
    id: rid(18),
    cycle_id: cid(2),
    respondent_role: "superior",
    respondent_token: "demo-token-8000-0018-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2025-12-08T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 4, authenticity: 4,
      army_values: 5, empathy: 4, discipline: 3,
      preaching: 4, teaching: 3, counseling: 4,
      soldiering: 3, staffing: 2, leading: 3,
      visibility: 3, affability: 4, accessibility: 3,
      bearing: 3, confidence: 3, resilience: 4,
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CYCLE 3 — MAJ Okafor (3ABCT BDE CH) — Strong overall, accessibility gap
  // Strong across board (4s), but accessibility only 2-3
  // ─────────────────────────────────────────────────────────────────────────

  // C3 — Self
  {
    id: rid(19),
    cycle_id: cid(3),
    respondent_role: "self",
    respondent_token: "demo-token-8000-0019-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2025-11-06T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 4, authenticity: 5,
      army_values: 5, empathy: 4, discipline: 4,
      preaching: 5, teaching: 4, counseling: 4,
      soldiering: 4, staffing: 4, leading: 5,
      visibility: 5, affability: 4, accessibility: 4,
      bearing: 5, confidence: 5, resilience: 4,
    },
  },

  // C3 — Subordinate 1: RAS NCO at 3ABCT
  {
    id: rid(20),
    cycle_id: cid(3),
    respondent_role: "subordinate",
    respondent_token: "demo-token-8000-0020-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2025-11-12T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 4, authenticity: 4,
      army_values: 4, empathy: 4, discipline: 4,
      preaching: 4, teaching: 4, counseling: 4,
      soldiering: 4, staffing: 4, leading: 4,
      visibility: 4, affability: 4, accessibility: 2,
      bearing: 4, confidence: 4, resilience: 4,
    },
  },

  // C3 — Subordinate 2: BN CH from 6-9 CAV (3ABCT)
  {
    id: rid(21),
    cycle_id: cid(3),
    respondent_role: "subordinate",
    respondent_token: "demo-token-8000-0021-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2025-11-14T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 4, authenticity: 4,
      army_values: 5, empathy: 4, discipline: 4,
      preaching: 5, teaching: 4, counseling: 4,
      soldiering: 4, staffing: 4, leading: 4,
      visibility: 4, affability: 4, accessibility: 2,
      bearing: 4, confidence: 4, resilience: 5,
    },
  },

  // C3 — Subordinate 3: BN CH from 2-7 CAV (3ABCT)
  {
    id: rid(22),
    cycle_id: cid(3),
    respondent_role: "subordinate",
    respondent_token: "demo-token-8000-0022-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2025-11-15T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 3, authenticity: 4,
      army_values: 4, empathy: 4, discipline: 4,
      preaching: 4, teaching: 4, counseling: 5,
      soldiering: 4, staffing: 4, leading: 4,
      visibility: 4, affability: 4, accessibility: 3,
      bearing: 4, confidence: 5, resilience: 4,
    },
  },

  // C3 — Peer 1: BN CH from 3-8 CAV (3ABCT)
  {
    id: rid(23),
    cycle_id: cid(3),
    respondent_role: "peer",
    respondent_token: "demo-token-8000-0023-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2025-11-10T00:00:00Z",
    ratings: {
      spirituality: 5, humility: 4, authenticity: 4,
      army_values: 4, empathy: 4, discipline: 4,
      preaching: 4, teaching: 5, counseling: 4,
      soldiering: 4, staffing: 4, leading: 5,
      visibility: 4, affability: 4, accessibility: 2,
      bearing: 4, confidence: 4, resilience: 4,
    },
  },

  // C3 — Peer 2: BN CH from 1-12 CAV (3ABCT)
  {
    id: rid(24),
    cycle_id: cid(3),
    respondent_role: "peer",
    respondent_token: "demo-token-8000-0024-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2025-11-13T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 4, authenticity: 5,
      army_values: 4, empathy: 5, discipline: 4,
      preaching: 4, teaching: 4, counseling: 4,
      soldiering: 4, staffing: 4, leading: 4,
      visibility: 5, affability: 4, accessibility: 3,
      bearing: 5, confidence: 4, resilience: 4,
    },
  },

  // C3 — Peer 3: BN CH from 2-82 FA (3ABCT)
  {
    id: rid(25),
    cycle_id: cid(3),
    respondent_role: "peer",
    respondent_token: "demo-token-8000-0025-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2025-11-16T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 4, authenticity: 4,
      army_values: 5, empathy: 4, discipline: 5,
      preaching: 4, teaching: 4, counseling: 4,
      soldiering: 5, staffing: 4, leading: 4,
      visibility: 4, affability: 5, accessibility: 2,
      bearing: 4, confidence: 4, resilience: 5,
    },
  },

  // C3 — Superior 1: DIV CH (1CD)
  {
    id: rid(26),
    cycle_id: cid(3),
    respondent_role: "superior",
    respondent_token: "demo-token-8000-0026-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2025-12-02T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 4, authenticity: 4,
      army_values: 4, empathy: 4, discipline: 4,
      preaching: 4, teaching: 4, counseling: 4,
      soldiering: 4, staffing: 5, leading: 4,
      visibility: 4, affability: 4, accessibility: 3,
      bearing: 4, confidence: 4, resilience: 4,
    },
  },

  // C3 — Superior 2: DIV Deputy CH (1CD)
  {
    id: rid(27),
    cycle_id: cid(3),
    respondent_role: "superior",
    respondent_token: "demo-token-8000-0027-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2025-12-06T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 4, authenticity: 4,
      army_values: 5, empathy: 4, discipline: 4,
      preaching: 5, teaching: 4, counseling: 4,
      soldiering: 4, staffing: 4, leading: 5,
      visibility: 4, affability: 4, accessibility: 2,
      bearing: 5, confidence: 5, resilience: 4,
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CYCLE 4 — MAJ Odom (1AD 1BCT BDE CH) — Strong competence, developing connection
  // High competence (4-5), lower connection (2-3)
  // ─────────────────────────────────────────────────────────────────────────

  // C4 — Self
  {
    id: rid(28),
    cycle_id: cid(4),
    respondent_role: "self",
    respondent_token: "demo-token-8000-0028-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2026-01-25T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 4, authenticity: 4,
      army_values: 5, empathy: 4, discipline: 5,
      preaching: 5, teaching: 5, counseling: 4,
      soldiering: 5, staffing: 5, leading: 5,
      visibility: 4, affability: 3, accessibility: 3,
      bearing: 5, confidence: 5, resilience: 5,
    },
  },

  // C4 — Subordinate 1: RAS NCO at 1AD 1BCT
  {
    id: rid(29),
    cycle_id: cid(4),
    respondent_role: "subordinate",
    respondent_token: "demo-token-8000-0029-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2026-02-01T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 3, authenticity: 4,
      army_values: 4, empathy: 3, discipline: 5,
      preaching: 5, teaching: 4, counseling: 4,
      soldiering: 5, staffing: 5, leading: 4,
      visibility: 2, affability: 2, accessibility: 2,
      bearing: 4, confidence: 5, resilience: 4,
    },
  },

  // C4 — Subordinate 2: BN CH from 1-6 INF (1AD 1BCT)
  {
    id: rid(30),
    cycle_id: cid(4),
    respondent_role: "subordinate",
    respondent_token: "demo-token-8000-0030-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2026-02-03T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 3, authenticity: 3,
      army_values: 5, empathy: 3, discipline: 4,
      preaching: 4, teaching: 5, counseling: 4,
      soldiering: 5, staffing: 4, leading: 5,
      visibility: 3, affability: 2, accessibility: 2,
      bearing: 4, confidence: 4, resilience: 5,
    },
  },

  // C4 — Subordinate 3: BN CH from 1-35 AR (1AD 1BCT)
  {
    id: rid(31),
    cycle_id: cid(4),
    respondent_role: "subordinate",
    respondent_token: "demo-token-8000-0031-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2026-02-05T00:00:00Z",
    ratings: {
      spirituality: 3, humility: 3, authenticity: 4,
      army_values: 4, empathy: 3, discipline: 5,
      preaching: 4, teaching: 4, counseling: 4,
      soldiering: 4, staffing: 5, leading: 4,
      visibility: 2, affability: 3, accessibility: 2,
      bearing: 5, confidence: 4, resilience: 4,
    },
  },

  // C4 — Peer 1: BN CH from 1-36 INF (1AD 1BCT)
  {
    id: rid(32),
    cycle_id: cid(4),
    respondent_role: "peer",
    respondent_token: "demo-token-8000-0032-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2026-01-30T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 3, authenticity: 4,
      army_values: 5, empathy: 3, discipline: 4,
      preaching: 5, teaching: 4, counseling: 4,
      soldiering: 5, staffing: 4, leading: 5,
      visibility: 3, affability: 2, accessibility: 3,
      bearing: 4, confidence: 5, resilience: 4,
    },
  },

  // C4 — Peer 2: BN CH from 4-1 FA (1AD 1BCT)
  {
    id: rid(33),
    cycle_id: cid(4),
    respondent_role: "peer",
    respondent_token: "demo-token-8000-0033-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2026-02-02T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 4, authenticity: 3,
      army_values: 4, empathy: 3, discipline: 5,
      preaching: 4, teaching: 5, counseling: 3,
      soldiering: 4, staffing: 5, leading: 4,
      visibility: 2, affability: 3, accessibility: 2,
      bearing: 5, confidence: 4, resilience: 5,
    },
  },

  // C4 — Peer 3: BDE CH from 1AD 2BCT (adjacent)
  {
    id: rid(34),
    cycle_id: cid(4),
    respondent_role: "peer",
    respondent_token: "demo-token-8000-0034-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2026-02-06T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 3, authenticity: 4,
      army_values: 4, empathy: 3, discipline: 4,
      preaching: 5, teaching: 4, counseling: 4,
      soldiering: 5, staffing: 4, leading: 4,
      visibility: 3, affability: 2, accessibility: 3,
      bearing: 4, confidence: 5, resilience: 4,
    },
  },

  // C4 — Superior 1: DIV CH (1AD)
  {
    id: rid(35),
    cycle_id: cid(4),
    respondent_role: "superior",
    respondent_token: "demo-token-8000-0035-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2026-02-20T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 3, authenticity: 4,
      army_values: 4, empathy: 3, discipline: 5,
      preaching: 5, teaching: 5, counseling: 4,
      soldiering: 5, staffing: 5, leading: 5,
      visibility: 2, affability: 3, accessibility: 2,
      bearing: 5, confidence: 5, resilience: 5,
    },
  },

  // C4 — Superior 2: DIV Deputy CH (1AD)
  {
    id: rid(36),
    cycle_id: cid(4),
    respondent_role: "superior",
    respondent_token: "demo-token-8000-0036-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2026-02-25T00:00:00Z",
    ratings: {
      spirituality: 3, humility: 3, authenticity: 4,
      army_values: 5, empathy: 3, discipline: 4,
      preaching: 4, teaching: 4, counseling: 4,
      soldiering: 4, staffing: 5, leading: 4,
      visibility: 3, affability: 2, accessibility: 3,
      bearing: 4, confidence: 4, resilience: 4,
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CYCLE 5 — CPT Ogundimu (1-18 INF, 1ID 2ABCT) — New to position, baseline
  // Mixed across the board (2-4), representing a new chaplain's baseline
  // ─────────────────────────────────────────────────────────────────────────

  // C5 — Self
  {
    id: rid(37),
    cycle_id: cid(5),
    respondent_role: "self",
    respondent_token: "demo-token-8000-0037-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2026-01-28T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 4, authenticity: 3,
      army_values: 4, empathy: 4, discipline: 3,
      preaching: 3, teaching: 3, counseling: 3,
      soldiering: 3, staffing: 2, leading: 3,
      visibility: 3, affability: 3, accessibility: 3,
      bearing: 3, confidence: 3, resilience: 3,
    },
  },

  // C5 — Subordinate 1: RAS NCO at 1-18 INF
  {
    id: rid(38),
    cycle_id: cid(5),
    respondent_role: "subordinate",
    respondent_token: "demo-token-8000-0038-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2026-02-02T00:00:00Z",
    ratings: {
      spirituality: 3, humility: 4, authenticity: 3,
      army_values: 3, empathy: 4, discipline: 2,
      preaching: 3, teaching: 2, counseling: 3,
      soldiering: 2, staffing: 2, leading: 2,
      visibility: 3, affability: 4, accessibility: 3,
      bearing: 2, confidence: 2, resilience: 3,
    },
  },

  // C5 — Subordinate 2: BN CH from 1-26 INF (1ID 2ABCT)
  {
    id: rid(39),
    cycle_id: cid(5),
    respondent_role: "subordinate",
    respondent_token: "demo-token-8000-0039-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2026-02-04T00:00:00Z",
    ratings: {
      spirituality: 3, humility: 3, authenticity: 3,
      army_values: 4, empathy: 3, discipline: 3,
      preaching: 2, teaching: 3, counseling: 3,
      soldiering: 2, staffing: 2, leading: 3,
      visibility: 3, affability: 3, accessibility: 3,
      bearing: 3, confidence: 2, resilience: 3,
    },
  },

  // C5 — Subordinate 3: BN CH from 1-4 CAV (1ID 2ABCT)
  {
    id: rid(40),
    cycle_id: cid(5),
    respondent_role: "subordinate",
    respondent_token: "demo-token-8000-0040-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2026-02-06T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 3, authenticity: 3,
      army_values: 3, empathy: 4, discipline: 2,
      preaching: 3, teaching: 2, counseling: 4,
      soldiering: 2, staffing: 2, leading: 2,
      visibility: 2, affability: 3, accessibility: 3,
      bearing: 3, confidence: 2, resilience: 2,
    },
  },

  // C5 — Peer 1: BN CH from 1-7 FA (1ID 2ABCT)
  {
    id: rid(41),
    cycle_id: cid(5),
    respondent_role: "peer",
    respondent_token: "demo-token-8000-0041-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2026-02-01T00:00:00Z",
    ratings: {
      spirituality: 3, humility: 4, authenticity: 3,
      army_values: 4, empathy: 3, discipline: 3,
      preaching: 3, teaching: 3, counseling: 3,
      soldiering: 2, staffing: 3, leading: 3,
      visibility: 3, affability: 3, accessibility: 2,
      bearing: 3, confidence: 3, resilience: 3,
    },
  },

  // C5 — Peer 2: BN CH from 2-34 AR (1ID 1ABCT, adjacent)
  {
    id: rid(42),
    cycle_id: cid(5),
    respondent_role: "peer",
    respondent_token: "demo-token-8000-0042-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2026-02-05T00:00:00Z",
    ratings: {
      spirituality: 4, humility: 3, authenticity: 4,
      army_values: 3, empathy: 3, discipline: 2,
      preaching: 2, teaching: 2, counseling: 3,
      soldiering: 3, staffing: 2, leading: 2,
      visibility: 3, affability: 3, accessibility: 3,
      bearing: 2, confidence: 3, resilience: 3,
    },
  },

  // C5 — Peer 3: BN CH from 1-63 AR (1ID 1ABCT, adjacent)
  {
    id: rid(43),
    cycle_id: cid(5),
    respondent_role: "peer",
    respondent_token: "demo-token-8000-0043-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2026-02-07T00:00:00Z",
    ratings: {
      spirituality: 3, humility: 3, authenticity: 3,
      army_values: 4, empathy: 4, discipline: 3,
      preaching: 3, teaching: 3, counseling: 4,
      soldiering: 2, staffing: 2, leading: 3,
      visibility: 2, affability: 3, accessibility: 2,
      bearing: 3, confidence: 2, resilience: 3,
    },
  },

  // C5 — Superior 1: BDE CH (1ID 2ABCT)
  {
    id: rid(44),
    cycle_id: cid(5),
    respondent_role: "superior",
    respondent_token: "demo-token-8000-0044-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2026-02-20T00:00:00Z",
    ratings: {
      spirituality: 3, humility: 3, authenticity: 3,
      army_values: 4, empathy: 3, discipline: 3,
      preaching: 3, teaching: 2, counseling: 3,
      soldiering: 2, staffing: 2, leading: 2,
      visibility: 3, affability: 3, accessibility: 3,
      bearing: 3, confidence: 2, resilience: 3,
    },
  },

  // C5 — Superior 2: DIV CH (1ID)
  {
    id: rid(45),
    cycle_id: cid(5),
    respondent_role: "superior",
    respondent_token: "demo-token-8000-0045-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    is_complete: true,
    submitted_at: "2026-02-25T00:00:00Z",
    ratings: {
      spirituality: 3, humility: 4, authenticity: 3,
      army_values: 3, empathy: 3, discipline: 2,
      preaching: 2, teaching: 3, counseling: 3,
      soldiering: 2, staffing: 2, leading: 3,
      visibility: 2, affability: 3, accessibility: 2,
      bearing: 3, confidence: 3, resilience: 2,
    },
  },
];
