/**
 * ═══════════════════════════════════════════════════════════════════════════
 * METL DESIGNATIONS — III Armored Corps Complete Hierarchy
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ~362 METL designations across all 66 organizations:
 *   37 battalions × ~6 tasks  = ~222 entries
 *   25 brigades  × ~5 tasks  = ~125 entries
 *    3 divisions × 4 tasks   =   12 entries
 *    1 corps     × 3 tasks   =    3 entries
 *
 * Valid Task IDs:
 *   BN:   16-BN-3801, 16-BN-3802, 16-BN-3804, 16-BN-3807, 16-BN-0001,
 *         16-5-2001, 16-5-2002
 *   BDE:  16-BDE-4000, 16-BDE-4001, 16-BDE-4800, 16-BDE-6305, 16-BDE-4300
 *   DIV:  71-DIV-4240
 *   Corps: 71-DIV-4240
 *
 * ID Scheme: demo-9000-0000-0000-{12-digit sequential}
 * All designated FY26 start: 2025-10-01
 */

import { ORG } from "./organizations";

// ── Sequential ID helper ─────────────────────────────────────────────────
let _seq = 0;
const mid = () => `demo-9000-0000-0000-${String(++_seq).padStart(12, "0")}`;

// ── Standard designated date ─────────────────────────────────────────────
const FY26 = "2025-10-01";

// ═══════════════════════════════════════════════════════════════════════════
// HELPER: generate METL entries for each echelon type
// ═══════════════════════════════════════════════════════════════════════════

type MetlEntry = {
  id: string;
  org_id: string;
  task_id: string;
  designated_date: string;
  rationale: string;
};

// ── BN METL generator (6 tasks per BN) ──────────────────────────────────
function bnMetl(orgId: string, variant: number): MetlEntry[] {
  // Each BN gets 6 tasks from the BN pool, with slight variation
  const allTasks: { task_id: string; rationales: string[] }[] = [
    {
      task_id: "16-BN-3801",
      rationales: [
        "Core RS task aligned with BDE OPLAN requirements",
        "Foundational UMT task for BN-level RS operations",
        "Essential for NTC rotation certification gate",
      ],
    },
    {
      task_id: "16-BN-3802",
      rationales: [
        "Required for NTC certification gate",
        "Critical BN RS planning task per FM 16-1",
        "Supports BDE RS synchronization requirements",
      ],
    },
    {
      task_id: "16-BN-3804",
      rationales: [
        "Supports division RS assessment requirements",
        "Key readiness reporting task for BN UMT",
        "Required for quarterly RS readiness assessment",
      ],
    },
    {
      task_id: "16-BN-3807",
      rationales: [
        "Essential for LSCO RS operations per corps OPLAN",
        "Addresses critical LSCO capability requirement",
        "Required for decisive action training environment certification",
      ],
    },
    {
      task_id: "16-BN-0001",
      rationales: [
        "Baseline BN UMT administrative task for RS program management",
        "Fundamental RS program management task",
        "Required for annual UMT program evaluation",
      ],
    },
    {
      task_id: "16-5-2001",
      rationales: [
        "Supports joint RS interoperability requirements",
        "Enables UMT integration with maneuver staff planning",
        "Aligned with corps interoperability training objectives",
      ],
    },
    {
      task_id: "16-5-2002",
      rationales: [
        "Critical for RS continuity during sustained operations",
        "Supports sustained operations RS coverage requirements",
        "Required for extended field operations RS sustainment",
      ],
    },
  ];

  // Select 6 tasks — drop one task based on variant to create diversity
  const skipIndex = variant % 7;
  const selected = allTasks.filter((_, i) => i !== skipIndex);
  // Take exactly 6
  const tasks = selected.slice(0, 6);

  return tasks.map((t) => ({
    id: mid(),
    org_id: orgId,
    task_id: t.task_id,
    designated_date: FY26,
    rationale: t.rationales[variant % t.rationales.length],
  }));
}

// ── BDE METL generator (5 tasks per BDE, some get 6) ────────────────────
function bdeMetl(orgId: string, variant: number, count: number = 5): MetlEntry[] {
  const allTasks: { task_id: string; rationales: string[] }[] = [
    {
      task_id: "16-BDE-4000",
      rationales: [
        "Core BDE RS synchronization task per division OPLAN",
        "Primary BDE-level RS planning and coordination task",
        "Required for BDE RS program assessment",
      ],
    },
    {
      task_id: "16-BDE-4001",
      rationales: [
        "Required for CTC rotation RS certification",
        "Essential for BDE RS operations during decisive action",
        "Supports division RS synchronization requirements",
      ],
    },
    {
      task_id: "16-BDE-4800",
      rationales: [
        "Supports BDE commander's RS assessment program",
        "Key BDE-level RS readiness assessment task",
        "Enables systematic RS readiness reporting to division",
      ],
    },
    {
      task_id: "16-BDE-6305",
      rationales: [
        "Critical for multi-domain operations RS integration",
        "Addresses MDO-specific RS coordination requirements",
        "Aligned with corps MDO training guidance",
      ],
    },
    {
      task_id: "16-BDE-4300",
      rationales: [
        "Essential for RS sustainment during extended operations",
        "Supports BDE RS logistics and sustainment planning",
        "Required for field operations RS continuity",
      ],
    },
  ];

  const tasks = allTasks.slice(0, count);

  return tasks.map((t) => ({
    id: mid(),
    org_id: orgId,
    task_id: t.task_id,
    designated_date: FY26,
    rationale: t.rationales[variant % t.rationales.length],
  }));
}

// ── DIV METL generator (4 tasks) ────────────────────────────────────────
function divMetl(orgId: string, variant: number): MetlEntry[] {
  const tasks: { task_id: string; rationale: string }[] = [
    {
      task_id: "71-DIV-4240",
      rationale: variant === 0
        ? "Primary division-level RS synchronization task for LSCO"
        : variant === 1
          ? "Core division RS coordination task aligned with corps OPLAN"
          : "Essential division RS management task per FM 16-1",
    },
    {
      task_id: "16-BDE-4000",
      rationale: variant === 0
        ? "Oversight of subordinate BDE RS program synchronization"
        : variant === 1
          ? "Division-level supervision of BDE RS planning and execution"
          : "Enables division assessment of subordinate BDE RS programs",
    },
    {
      task_id: "16-BDE-4001",
      rationale: variant === 0
        ? "Division oversight of BDE CTC RS certification standards"
        : variant === 1
          ? "Ensures subordinate BDE RS operations meet certification standards"
          : "Division-level validation of BDE RS operational readiness",
    },
    {
      task_id: "16-BDE-4800",
      rationale: variant === 0
        ? "Division RS assessment program oversight across subordinate BDEs"
        : variant === 1
          ? "Aggregation and analysis of BDE-level RS readiness data"
          : "Supports division commander's RS readiness common operating picture",
    },
  ];

  return tasks.map((t) => ({
    id: mid(),
    org_id: orgId,
    task_id: t.task_id,
    designated_date: FY26,
    rationale: t.rationale,
  }));
}

// ── Corps METL (3 tasks) ────────────────────────────────────────────────
function corpsMetl(orgId: string): MetlEntry[] {
  return [
    {
      id: mid(),
      org_id: orgId,
      task_id: "71-DIV-4240",
      designated_date: FY26,
      rationale: "Corps-level RS synchronization across three divisions and separate brigades for LSCO",
    },
    {
      id: mid(),
      org_id: orgId,
      task_id: "16-BDE-4000",
      designated_date: FY26,
      rationale: "Corps oversight of subordinate unit RS program planning and execution",
    },
    {
      id: mid(),
      org_id: orgId,
      task_id: "16-BDE-4001",
      designated_date: FY26,
      rationale: "Corps-level validation of RS operations readiness across the formation",
    },
  ];
}

// ═══════════════════════════════════════════════════════════════════════════
// METL DESIGNATIONS — Full Corps Hierarchy
// ═══════════════════════════════════════════════════════════════════════════

export const METL_DESIGNATIONS: MetlEntry[] = [
  // ─── CORPS ─────────────────────────────────────────────────────────────
  ...corpsMetl(ORG.III_AC),

  // ─── 1CD DIVISION ──────────────────────────────────────────────────────
  ...divMetl(ORG.DIV_1CD, 0),

  // 1CD Brigades
  ...bdeMetl(ORG.BDE_1CD_1ABCT, 0, 5),
  ...bdeMetl(ORG.BDE_1CD_2ABCT, 1, 5),
  ...bdeMetl(ORG.BDE_1CD_3ABCT, 2, 5),
  ...bdeMetl(ORG.BDE_1CD_DIVARTY, 0, 6),
  ...bdeMetl(ORG.BDE_1CD_AIRCAV, 1, 6),
  ...bdeMetl(ORG.BDE_1CD_SUST, 2, 5),

  // 1CD 1ABCT Battalions (5 BNs)
  ...bnMetl(ORG.BN_1_7_CAV, 0),
  ...bnMetl(ORG.BN_2_5_CAV, 1),
  ...bnMetl(ORG.BN_2_8_CAV, 2),
  ...bnMetl(ORG.BN_2_12_CAV, 3),
  ...bnMetl(ORG.BN_1_82_FA, 4),

  // 1CD 2ABCT Battalions (5 BNs)
  ...bnMetl(ORG.BN_4_9_CAV, 5),
  ...bnMetl(ORG.BN_1_5_CAV, 6),
  ...bnMetl(ORG.BN_1_8_CAV, 0),
  ...bnMetl(ORG.BN_1_9_CAV, 1),
  ...bnMetl(ORG.BN_3_16_FA, 2),

  // 1CD 3ABCT Battalions (5 BNs)
  ...bnMetl(ORG.BN_6_9_CAV, 3),
  ...bnMetl(ORG.BN_2_7_CAV, 4),
  ...bnMetl(ORG.BN_3_8_CAV, 5),
  ...bnMetl(ORG.BN_1_12_CAV, 6),
  ...bnMetl(ORG.BN_2_82_FA, 0),

  // ─── 1AD DIVISION ──────────────────────────────────────────────────────
  ...divMetl(ORG.DIV_1AD, 1),

  // 1AD Brigades
  ...bdeMetl(ORG.BDE_1AD_1BCT, 0, 5),
  ...bdeMetl(ORG.BDE_1AD_2BCT, 1, 5),
  ...bdeMetl(ORG.BDE_1AD_3BCT, 2, 5),
  ...bdeMetl(ORG.BDE_1AD_DIVARTY, 0, 6),
  ...bdeMetl(ORG.BDE_1AD_CAB, 1, 6),
  ...bdeMetl(ORG.BDE_1AD_SUST, 2, 5),

  // 1AD 1BCT Battalions (4 BNs)
  ...bnMetl(ORG.BN_1_6_INF, 1),
  ...bnMetl(ORG.BN_1_35_AR, 2),
  ...bnMetl(ORG.BN_1_36_INF, 3),
  ...bnMetl(ORG.BN_4_1_FA, 4),

  // 1AD 2BCT Battalions (4 BNs)
  ...bnMetl(ORG.BN_1_1_AD, 5),
  ...bnMetl(ORG.BN_1_37_AR, 6),
  ...bnMetl(ORG.BN_6_1_CAV, 0),
  ...bnMetl(ORG.BN_2_3_FA, 1),

  // 1AD 3BCT Battalions (4 BNs)
  ...bnMetl(ORG.BN_4_6_INF, 2),
  ...bnMetl(ORG.BN_1_77_AR, 3),
  ...bnMetl(ORG.BN_6_6_CAV, 4),
  ...bnMetl(ORG.BN_4_27_FA, 5),

  // ─── 1ID DIVISION ──────────────────────────────────────────────────────
  ...divMetl(ORG.DIV_1ID, 2),

  // 1ID Brigades
  ...bdeMetl(ORG.BDE_1ID_1ABCT, 0, 5),
  ...bdeMetl(ORG.BDE_1ID_2ABCT, 1, 5),
  ...bdeMetl(ORG.BDE_1ID_DIVARTY, 2, 6),
  ...bdeMetl(ORG.BDE_1ID_CAB, 0, 6),
  ...bdeMetl(ORG.BDE_1ID_SUST, 1, 5),

  // 1ID 1ABCT Battalions (4 BNs)
  ...bnMetl(ORG.BN_2_34_AR, 6),
  ...bnMetl(ORG.BN_1_63_AR, 0),
  ...bnMetl(ORG.BN_5_4_CAV, 1),
  ...bnMetl(ORG.BN_1_5_FA, 2),

  // 1ID 2ABCT Battalions (4 BNs)
  ...bnMetl(ORG.BN_1_18_INF, 3),
  ...bnMetl(ORG.BN_1_26_INF, 4),
  ...bnMetl(ORG.BN_1_4_CAV, 5),
  ...bnMetl(ORG.BN_1_7_FA, 6),

  // ─── CORPS SEPARATE BRIGADES ───────────────────────────────────────────

  // 3CR (BDE-level)
  ...bdeMetl(ORG.BDE_3CR, 0, 5),

  // 3CR Squadrons (BN-level)
  ...bnMetl(ORG.BN_3CR_1SQ, 0),
  ...bnMetl(ORG.BN_3CR_2SQ, 1),

  // Corps Separate — Full data BDEs
  ...bdeMetl(ORG.BDE_13TH_ACSC, 1, 5),
  ...bdeMetl(ORG.BDE_36TH_EB, 2, 5),
  ...bdeMetl(ORG.BDE_504TH_MIB, 0, 5),

  // Corps Separate — Org-only BDEs (still get METL)
  ...bdeMetl(ORG.BDE_89TH_MPB, 1, 5),
  ...bdeMetl(ORG.BDE_11TH_CSB, 2, 5),
  ...bdeMetl(ORG.BDE_1ST_MEDBDE, 0, 5),
  ...bdeMetl(ORG.BDE_75TH_FAB, 1, 5),
];
