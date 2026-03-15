/**
 * Comprehensive Demo Dataset — 1st Cavalry Division UMT
 *
 * Deterministic seed data for the CHC Digital Ecosystem.
 * All IDs use the format "demo-xxxx-xxxx-xxxx-xxxxxxxxxxxx".
 */

export const DEMO_DATA = {
  // ═══════════════════════════════════════════════════════════════════════════
  // ORGANIZATIONS (13) — 1 Division, 4 Brigades, 8 Battalions
  // ═══════════════════════════════════════════════════════════════════════════
  organizations: [
    // ── Division ──────────────────────────────────────────────────
    {
      id: "demo-0001-0000-0000-000000000001",
      name: "1st Cavalry Division UMT",
      uic: "W0V5AA",
      echelon: "division",
      compo: "active",
      installation: "Fort Cavazos",
      parent_org_id: null,
    },

    // ── Brigades ──────────────────────────────────────────────────
    {
      id: "demo-0002-0000-0000-000000000001",
      name: "1st Armored Brigade Combat Team (1 ABCT), 1CD",
      uic: "W0V6AA",
      echelon: "brigade",
      compo: "active",
      installation: "Fort Cavazos",
      parent_org_id: "demo-0001-0000-0000-000000000001",
    },
    {
      id: "demo-0002-0000-0000-000000000002",
      name: "2nd Armored Brigade Combat Team (2 ABCT), 1CD",
      uic: "W0V7AA",
      echelon: "brigade",
      compo: "active",
      installation: "Fort Cavazos",
      parent_org_id: "demo-0001-0000-0000-000000000001",
    },
    {
      id: "demo-0002-0000-0000-000000000003",
      name: "3rd Armored Brigade Combat Team (3 ABCT), 1CD",
      uic: "W0V8AA",
      echelon: "brigade",
      compo: "active",
      installation: "Fort Cavazos",
      parent_org_id: "demo-0001-0000-0000-000000000001",
    },
    {
      id: "demo-0002-0000-0000-000000000004",
      name: "Division Artillery (DIVARTY), 1CD",
      uic: "W0V9AA",
      echelon: "brigade",
      compo: "active",
      installation: "Fort Cavazos",
      parent_org_id: "demo-0001-0000-0000-000000000001",
    },

    // ── Battalions — 1 ABCT ──────────────────────────────────────
    {
      id: "demo-0003-0001-0000-000000000001",
      name: "2-5 Cavalry (2-5 CAV), 1 ABCT",
      uic: "W0V6BA",
      echelon: "battalion",
      compo: "active",
      installation: "Fort Cavazos",
      parent_org_id: "demo-0002-0000-0000-000000000001",
    },
    {
      id: "demo-0003-0001-0000-000000000002",
      name: "1-12 Cavalry (1-12 CAV), 1 ABCT",
      uic: "W0V6CA",
      echelon: "battalion",
      compo: "active",
      installation: "Fort Cavazos",
      parent_org_id: "demo-0002-0000-0000-000000000001",
    },

    // ── Battalions — 2 ABCT ──────────────────────────────────────
    {
      id: "demo-0003-0002-0000-000000000001",
      name: "1-5 Cavalry (1-5 CAV), 2 ABCT",
      uic: "W0V7BA",
      echelon: "battalion",
      compo: "active",
      installation: "Fort Cavazos",
      parent_org_id: "demo-0002-0000-0000-000000000002",
    },
    {
      id: "demo-0003-0002-0000-000000000002",
      name: "4-9 Cavalry (4-9 CAV), 2 ABCT",
      uic: "W0V7CA",
      echelon: "battalion",
      compo: "active",
      installation: "Fort Cavazos",
      parent_org_id: "demo-0002-0000-0000-000000000002",
    },

    // ── Battalions — 3 ABCT ──────────────────────────────────────
    {
      id: "demo-0003-0003-0000-000000000001",
      name: "3-8 Cavalry (3-8 CAV), 3 ABCT",
      uic: "W0V8BA",
      echelon: "battalion",
      compo: "active",
      installation: "Fort Cavazos",
      parent_org_id: "demo-0002-0000-0000-000000000003",
    },
    {
      id: "demo-0003-0003-0000-000000000002",
      name: "1-7 Cavalry (1-7 CAV), 3 ABCT",
      uic: "W0V8CA",
      echelon: "battalion",
      compo: "active",
      installation: "Fort Cavazos",
      parent_org_id: "demo-0002-0000-0000-000000000003",
    },

    // ── Battalions — DIVARTY ─────────────────────────────────────
    {
      id: "demo-0003-0004-0000-000000000001",
      name: "3-82 Field Artillery (3-82 FA), DIVARTY",
      uic: "W0V9BA",
      echelon: "battalion",
      compo: "active",
      installation: "Fort Cavazos",
      parent_org_id: "demo-0002-0000-0000-000000000004",
    },
    {
      id: "demo-0003-0004-0000-000000000002",
      name: "2-82 Field Artillery (2-82 FA), DIVARTY",
      uic: "W0V9CA",
      echelon: "battalion",
      compo: "active",
      installation: "Fort Cavazos",
      parent_org_id: "demo-0002-0000-0000-000000000004",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // PERSONNEL (16) — mix of 56A (Chaplain) and 56M (Religious Affairs Specialist)
  // ═══════════════════════════════════════════════════════════════════════════
  personnel: [
    // ── Division ──────────────────────────────────────────────────
    {
      id: "demo-1000-0000-0000-000000000001",
      rank: "COL",
      last_name: "Richardson",
      first_name: "David",
      middle_initial: "M",
      mos: "56A",
      duty_position: "Division Chaplain",
      org_id: "demo-0001-0000-0000-000000000001",
      duty_status: "present",
      email: "david.m.richardson.mil@army.mil",
    },
    {
      id: "demo-1000-0000-0000-000000000002",
      rank: "SGM",
      last_name: "Torres",
      first_name: "Miguel",
      middle_initial: "A",
      mos: "56M",
      duty_position: "Division RAS NCOIC",
      org_id: "demo-0001-0000-0000-000000000001",
      duty_status: "present",
      email: "miguel.a.torres.mil@army.mil",
    },

    // ── 1 ABCT ────────────────────────────────────────────────────
    {
      id: "demo-1000-0001-0000-000000000001",
      rank: "LTC",
      last_name: "Park",
      first_name: "James",
      middle_initial: "H",
      mos: "56A",
      duty_position: "Brigade Chaplain",
      org_id: "demo-0002-0000-0000-000000000001",
      duty_status: "present",
      email: "james.h.park.mil@army.mil",
    },

    // ── 2 ABCT ────────────────────────────────────────────────────
    {
      id: "demo-1000-0002-0000-000000000001",
      rank: "MAJ",
      last_name: "Williams",
      first_name: "Sarah",
      middle_initial: "E",
      mos: "56A",
      duty_position: "Brigade Chaplain",
      org_id: "demo-0002-0000-0000-000000000002",
      duty_status: "present",
      email: "sarah.e.williams.mil@army.mil",
    },

    // ── 3 ABCT ────────────────────────────────────────────────────
    {
      id: "demo-1000-0003-0000-000000000001",
      rank: "MAJ",
      last_name: "Okafor",
      first_name: "Emmanuel",
      middle_initial: "C",
      mos: "56A",
      duty_position: "Brigade Chaplain",
      org_id: "demo-0002-0000-0000-000000000003",
      duty_status: "tdy",
      email: "emmanuel.c.okafor.mil@army.mil",
    },

    // ── DIVARTY ───────────────────────────────────────────────────
    {
      id: "demo-1000-0004-0000-000000000001",
      rank: "LTC",
      last_name: "Brennan",
      first_name: "Michael",
      middle_initial: "T",
      mos: "56A",
      duty_position: "Brigade Chaplain",
      org_id: "demo-0002-0000-0000-000000000004",
      duty_status: "present",
      email: "michael.t.brennan.mil@army.mil",
    },

    // ── Battalion Chaplains & RAS ─────────────────────────────────
    // 2-5 CAV (1 ABCT)
    {
      id: "demo-1000-0001-0001-000000000001",
      rank: "CPT",
      last_name: "Kim",
      first_name: "Daniel",
      middle_initial: "S",
      mos: "56A",
      duty_position: "Battalion Chaplain",
      org_id: "demo-0003-0001-0000-000000000001",
      duty_status: "present",
      email: "daniel.s.kim.mil@army.mil",
    },
    {
      id: "demo-1000-0001-0001-000000000002",
      rank: "SSG",
      last_name: "Garcia",
      first_name: "Roberto",
      middle_initial: "L",
      mos: "56M",
      duty_position: "Battalion RAS NCOIC",
      org_id: "demo-0003-0001-0000-000000000001",
      duty_status: "present",
      email: "roberto.l.garcia.mil@army.mil",
    },
    // 1-12 CAV (1 ABCT)
    {
      id: "demo-1000-0001-0002-000000000001",
      rank: "CPT",
      last_name: "Mensah",
      first_name: "Kwame",
      middle_initial: "B",
      mos: "56A",
      duty_position: "Battalion Chaplain",
      org_id: "demo-0003-0001-0000-000000000002",
      duty_status: "present",
      email: "kwame.b.mensah.mil@army.mil",
    },

    // 1-5 CAV (2 ABCT)
    {
      id: "demo-1000-0002-0001-000000000001",
      rank: "CPT",
      last_name: "Nguyen",
      first_name: "Thomas",
      middle_initial: "V",
      mos: "56A",
      duty_position: "Battalion Chaplain",
      org_id: "demo-0003-0002-0000-000000000001",
      duty_status: "present",
      email: "thomas.v.nguyen.mil@army.mil",
    },
    {
      id: "demo-1000-0002-0001-000000000002",
      rank: "SFC",
      last_name: "Jackson",
      first_name: "Marcus",
      middle_initial: "D",
      mos: "56M",
      duty_position: "Battalion RAS NCOIC",
      org_id: "demo-0003-0002-0000-000000000001",
      duty_status: "present",
      email: "marcus.d.jackson.mil@army.mil",
    },

    // 3-8 CAV (3 ABCT)
    {
      id: "demo-1000-0003-0001-000000000001",
      rank: "CPT",
      last_name: "Patel",
      first_name: "Arjun",
      middle_initial: "R",
      mos: "56A",
      duty_position: "Battalion Chaplain",
      org_id: "demo-0003-0003-0000-000000000001",
      duty_status: "deployed",
      email: "arjun.r.patel.mil@army.mil",
    },

    // 3-82 FA (DIVARTY)
    {
      id: "demo-1000-0004-0001-000000000001",
      rank: "CPT",
      last_name: "Henderson",
      first_name: "Rachel",
      middle_initial: "N",
      mos: "56A",
      duty_position: "Battalion Chaplain",
      org_id: "demo-0003-0004-0000-000000000001",
      duty_status: "present",
      email: "rachel.n.henderson.mil@army.mil",
    },
    {
      id: "demo-1000-0004-0001-000000000002",
      rank: "SSG",
      last_name: "Alvarez",
      first_name: "Carlos",
      middle_initial: "J",
      mos: "56M",
      duty_position: "Battalion RAS NCOIC",
      org_id: "demo-0003-0004-0000-000000000001",
      duty_status: "present",
      email: "carlos.j.alvarez.mil@army.mil",
    },

    // 2-82 FA (DIVARTY)
    {
      id: "demo-1000-0004-0002-000000000001",
      rank: "CPT",
      last_name: "Brooks",
      first_name: "Jonathan",
      middle_initial: "W",
      mos: "56A",
      duty_position: "Battalion Chaplain",
      org_id: "demo-0003-0004-0000-000000000002",
      duty_status: "present",
      email: "jonathan.w.brooks.mil@army.mil",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // TRAINING EVENTS (12)
  // ═══════════════════════════════════════════════════════════════════════════
  training_events: [
    {
      id: "demo-2000-0000-0000-000000000001",
      task_id: "16-BN-3801",
      title: "Provide Religious Support to a Battalion — 2-5 CAV",
      org_id: "demo-0003-0001-0000-000000000001",
      date: "2025-10-14",
      context: "garrison",
      rating: "T",
      attendee_ids: [
        "demo-1000-0001-0001-000000000001",
        "demo-1000-0001-0001-000000000002",
      ],
      evaluator_id: "demo-1000-0001-0000-000000000001",
      comments:
        "UMT demonstrated full-spectrum religious support across the battalion footprint. Strong synchronization with S3 operations.",
    },
    {
      id: "demo-2000-0000-0000-000000000002",
      task_id: "16-BN-3802",
      title: "Provide Religious Support in a DSCA Environment — 1-12 CAV",
      org_id: "demo-0003-0001-0000-000000000002",
      date: "2025-11-03",
      context: "stx",
      rating: "P",
      attendee_ids: ["demo-1000-0001-0002-000000000001"],
      evaluator_id: "demo-1000-0001-0000-000000000001",
      comments:
        "Chaplain coordinated effectively with local clergy. Needs improvement on mass-casualty triage spiritual support protocols.",
    },
    {
      id: "demo-2000-0000-0000-000000000003",
      task_id: "16-BN-3807",
      title: "Conduct Battlefield Circulation — 1-5 CAV",
      org_id: "demo-0003-0002-0000-000000000001",
      date: "2025-11-18",
      context: "ftx",
      rating: "T",
      attendee_ids: [
        "demo-1000-0002-0001-000000000001",
        "demo-1000-0002-0001-000000000002",
      ],
      evaluator_id: "demo-1000-0002-0000-000000000001",
      comments:
        "UMT reached 100% of dispersed elements within 48 hours. Excellent pattern of ministry presence during night operations.",
    },
    {
      id: "demo-2000-0000-0000-000000000004",
      task_id: "16-BDE-4000",
      title: "Plan and Synchronize Brigade RS Operations — 1 ABCT",
      org_id: "demo-0002-0000-0000-000000000001",
      date: "2025-12-02",
      context: "garrison",
      rating: "T",
      attendee_ids: [
        "demo-1000-0001-0000-000000000001",
        "demo-1000-0001-0001-000000000001",
        "demo-1000-0001-0002-000000000001",
      ],
      evaluator_id: "demo-1000-0000-0000-000000000001",
      comments:
        "Annex Q fully synchronized with brigade OPLAN. All subordinate UMTs integrated into the planning timeline.",
    },
    {
      id: "demo-2000-0000-0000-000000000005",
      task_id: "16-BN-3801",
      title: "Provide Religious Support to a Battalion — 4-9 CAV",
      org_id: "demo-0003-0002-0000-000000000002",
      date: "2025-12-15",
      context: "garrison",
      rating: "P",
      attendee_ids: ["demo-1000-0002-0001-000000000001"],
      evaluator_id: "demo-1000-0002-0000-000000000001",
      comments:
        "Chaplain provided adequate coverage but scheduling conflicts limited worship attendance. Recommend de-conflicting with battalion training calendar.",
    },
    {
      id: "demo-2000-0000-0000-000000000006",
      task_id: "16-5-2002",
      title: "Conduct Strong Bonds Program — 3-82 FA",
      org_id: "demo-0003-0004-0000-000000000001",
      date: "2026-01-10",
      context: "garrison",
      rating: "T",
      attendee_ids: [
        "demo-1000-0004-0001-000000000001",
        "demo-1000-0004-0001-000000000002",
      ],
      evaluator_id: "demo-1000-0004-0000-000000000001",
      comments:
        "Outstanding program execution with 94% participant satisfaction. Pre/post survey data shows measurable relationship skill improvement.",
    },
    {
      id: "demo-2000-0000-0000-000000000007",
      task_id: "16-BN-3807",
      title: "Conduct Battlefield Circulation — 3-8 CAV",
      org_id: "demo-0003-0003-0000-000000000001",
      date: "2026-01-22",
      context: "ctc",
      rating: "T-",
      attendee_ids: ["demo-1000-0003-0001-000000000001"],
      evaluator_id: "demo-1000-0003-0000-000000000001",
      comments:
        "Chaplain maintained presence but vehicle maintenance issues limited mobility during the rotation. Coordination with S4 for dedicated transport needed.",
    },
    {
      id: "demo-2000-0000-0000-000000000008",
      task_id: "16-BN-3801",
      title: "Provide Religious Support to a Battalion — 3-8 CAV (NTC)",
      org_id: "demo-0003-0003-0000-000000000001",
      date: "2026-01-28",
      context: "ctc",
      rating: "P",
      attendee_ids: ["demo-1000-0003-0001-000000000001"],
      evaluator_id: "demo-1000-0003-0000-000000000001",
      comments:
        "Chaplain adapted to austere environment. Worship services conducted at three separate locations. Need to improve counseling space availability in the field.",
    },
    {
      id: "demo-2000-0000-0000-000000000009",
      task_id: "16-BDE-4000",
      title: "Plan and Synchronize Brigade RS Operations — DIVARTY",
      org_id: "demo-0002-0000-0000-000000000004",
      date: "2026-02-05",
      context: "garrison",
      rating: "T-",
      attendee_ids: [
        "demo-1000-0004-0000-000000000001",
        "demo-1000-0004-0001-000000000001",
        "demo-1000-0004-0002-000000000001",
      ],
      evaluator_id: "demo-1000-0000-0000-000000000001",
      comments:
        "RS annex completed but lacked integration with fires targeting meeting schedule. Chaplain needs to attend all BDE syncs to maintain visibility.",
    },
    {
      id: "demo-2000-0000-0000-000000000010",
      task_id: "16-BN-3802",
      title: "Provide RS in a DSCA Environment — 2-82 FA",
      org_id: "demo-0003-0004-0000-000000000002",
      date: "2026-02-20",
      context: "stx",
      rating: "P-",
      attendee_ids: ["demo-1000-0004-0002-000000000001"],
      evaluator_id: "demo-1000-0004-0000-000000000001",
      comments:
        "Chaplain struggled with civilian agency coordination protocols. Recommend additional DSCA-specific training before next exercise.",
    },
    {
      id: "demo-2000-0000-0000-000000000011",
      task_id: "16-5-2002",
      title: "Conduct Strong Bonds Program — 2-5 CAV",
      org_id: "demo-0003-0001-0000-000000000001",
      date: "2026-03-01",
      context: "garrison",
      rating: "U",
      attendee_ids: [
        "demo-1000-0001-0001-000000000001",
        "demo-1000-0001-0001-000000000002",
      ],
      evaluator_id: "demo-1000-0001-0000-000000000001",
      comments:
        "Program canceled day-of due to range conflict. No risk mitigation or backup plan was in place. Reschedule with S3 coordination required.",
    },
    {
      id: "demo-2000-0000-0000-000000000012",
      task_id: "16-BN-3801",
      title: "Provide Religious Support to a Battalion — 1-5 CAV",
      org_id: "demo-0003-0002-0000-000000000001",
      date: "2026-03-10",
      context: "ftx",
      rating: "U",
      attendee_ids: [
        "demo-1000-0002-0001-000000000001",
        "demo-1000-0002-0001-000000000002",
      ],
      evaluator_id: "demo-1000-0002-0000-000000000001",
      comments:
        "UMT was not integrated into the FTX planning process. No RS annex submitted. Chaplain arrived late to the field and missed initial operations.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // BEHAVIORAL OBSERVATIONS (6)
  // ═══════════════════════════════════════════════════════════════════════════
  behavioral_observations: [
    // ── Observation 1: CPT Kim (2-5 CAV) observed by LTC Park ─────
    {
      id: "demo-3000-0000-0000-000000000001",
      subject_id: "demo-1000-0001-0001-000000000001",
      observer_id: "demo-1000-0001-0000-000000000001",
      date: "2026-01-15",
      echelon_setting: "brigade",
      context: "garrison",
      ratings: {
        "CH-1.1": { rating: 5, notes: "Consistent devotional life observed across multiple visits" },
        "CH-1.2": { rating: 4, notes: "Strong theological depth in counseling sessions" },
        "CH-2.1": { rating: 4 },
        "CH-3.1": { rating: 5, notes: "Exemplary consistency between stated values and actions" },
        "CH-4.1": { rating: 4 },
        "CO-1.1": { rating: 4, notes: "Worship services well-prepared and relevant" },
        "CO-2.1": { rating: 3, notes: "Teaching content solid but delivery could be more engaging" },
        "CO-3.1": { rating: 5, notes: "Exceptional pastoral care — Soldiers consistently seek him out" },
        "CO-4.1": { rating: 4 },
        "CO-5.1": { rating: 4 },
        "CN-1.1": { rating: 5, notes: "Consistently present in motor pools and company areas" },
        "CN-2.1": { rating: 4 },
        "CN-3.1": { rating: 4 },
        "CF-1.1": { rating: 5, notes: "Proactively ensures free exercise for all faith groups" },
        "CF-2.1": { rating: 4 },
      },
      word_picture: {
        strengths: [
          {
            indicator_id: "CH-1.1",
            behavior_text: "Maintains a regular, visible prayer/devotional life that sustains personal ministry capacity",
            pillar: "character",
            sub_dimension: "Spirituality",
            rating: 5,
          },
          {
            indicator_id: "CO-3.1",
            behavior_text: "Provides responsive pastoral counseling using evidence-based approaches within scope of practice",
            pillar: "competence",
            sub_dimension: "Counseling/Care",
            rating: 5,
          },
          {
            indicator_id: "CN-1.1",
            behavior_text: "Maintains consistent presence in unit work areas, training areas, and living quarters",
            pillar: "connection",
            sub_dimension: "Visibility",
            rating: 5,
          },
        ],
        development_needs: [
          {
            indicator_id: "CO-2.1",
            behavior_text: "Develops and delivers resilience training aligned with unit needs",
            pillar: "competence",
            sub_dimension: "Teaching",
            rating: 3,
          },
        ],
        pillar_averages: {
          character: 4.4,
          competence: 4.0,
          connection: 4.3,
          constitutional: 4.5,
        },
        summary_narrative:
          "CPT Kim is a highly effective battalion chaplain whose greatest strengths are in pastoral care and visible ministry presence. Soldiers throughout 2-5 CAV know him by name and seek him out proactively. His teaching delivery could benefit from additional professional development, but content quality is strong. He models spiritual discipline and authenticity that earns trust across the formation.",
      },
    },

    // ── Observation 2: CPT Kim (2-5 CAV) — by COL Richardson ──────
    {
      id: "demo-3000-0000-0000-000000000002",
      subject_id: "demo-1000-0001-0001-000000000001",
      observer_id: "demo-1000-0000-0000-000000000001",
      date: "2026-02-28",
      echelon_setting: "division",
      context: "garrison",
      ratings: {
        "CH-1.1": { rating: 5 },
        "CH-1.3": { rating: 4 },
        "CH-2.2": { rating: 4, notes: "Appropriate referrals to behavioral health" },
        "CH-3.2": { rating: 5 },
        "CH-4.2": { rating: 4 },
        "CO-1.2": { rating: 4 },
        "CO-2.2": { rating: 4, notes: "Improved since last observation — more engaging facilitation" },
        "CO-3.2": { rating: 5 },
        "CO-4.2": { rating: 3, notes: "Tactical movement planning needs work at battalion level" },
        "CO-5.2": { rating: 4 },
        "CN-1.2": { rating: 5, notes: "Present during all battalion PT sessions" },
        "CN-2.2": { rating: 5 },
        "CN-4.1": { rating: 4 },
        "CF-1.2": { rating: 4 },
        "CF-2.2": { rating: 4 },
      },
      word_picture: {
        strengths: [
          {
            indicator_id: "CH-3.2",
            behavior_text: "Communicates honestly even when the message is unpopular or difficult",
            pillar: "character",
            sub_dimension: "Authenticity",
            rating: 5,
          },
          {
            indicator_id: "CO-3.2",
            behavior_text: "Maintains confidentiality and makes timely referrals",
            pillar: "competence",
            sub_dimension: "Counseling/Care",
            rating: 5,
          },
          {
            indicator_id: "CN-2.2",
            behavior_text: "Uses appropriate warmth to put people at ease",
            pillar: "connection",
            sub_dimension: "Affability",
            rating: 5,
          },
        ],
        development_needs: [
          {
            indicator_id: "CO-4.2",
            behavior_text: "Operates effectively in field environments and integrates UMT into tactical planning",
            pillar: "competence",
            sub_dimension: "Soldiering",
            rating: 3,
          },
        ],
        pillar_averages: {
          character: 4.4,
          competence: 4.0,
          connection: 4.7,
          constitutional: 4.0,
        },
        summary_narrative:
          "CPT Kim continues to demonstrate strong ministry skills, particularly in counseling and interpersonal connection. His teaching has noticeably improved. Tactical field skills remain his primary growth area. He should prioritize participating in tactical planning events and improving his MDMP integration. Overall trajectory is positive.",
      },
    },

    // ── Observation 3: CPT Nguyen (1-5 CAV) ──────────────────────
    {
      id: "demo-3000-0000-0000-000000000003",
      subject_id: "demo-1000-0002-0001-000000000001",
      observer_id: "demo-1000-0002-0000-000000000001",
      date: "2026-01-08",
      echelon_setting: "brigade",
      context: "ftx",
      ratings: {
        "CH-1.1": { rating: 3, notes: "Devotional practice inconsistent during field operations" },
        "CH-1.5": { rating: 3 },
        "CH-2.1": { rating: 4 },
        "CH-3.1": { rating: 4 },
        "CH-4.1": { rating: 5, notes: "Exemplary Army Values in all interactions" },
        "CO-1.1": { rating: 3, notes: "Field worship services lacked preparation" },
        "CO-2.1": { rating: 4 },
        "CO-3.1": { rating: 4 },
        "CO-4.1": { rating: 5, notes: "Outstanding tactical proficiency; best in the brigade" },
        "CO-5.1": { rating: 5, notes: "RS annex was the best product in the brigade" },
        "CN-1.1": { rating: 2, notes: "Limited visibility outside the TOC during the FTX" },
        "CN-2.1": { rating: 3 },
        "CN-3.1": { rating: 3, notes: "Response times to ministry requests need improvement" },
        "CF-1.1": { rating: 4 },
        "CF-2.1": { rating: 4 },
      },
      word_picture: {
        strengths: [
          {
            indicator_id: "CO-4.1",
            behavior_text: "Demonstrates tactical proficiency appropriate to echelon",
            pillar: "competence",
            sub_dimension: "Soldiering",
            rating: 5,
          },
          {
            indicator_id: "CO-5.1",
            behavior_text: "Produces timely, accurate staff products including the Religious Support Annex",
            pillar: "competence",
            sub_dimension: "Staffing",
            rating: 5,
          },
          {
            indicator_id: "CH-4.1",
            behavior_text: "Consistently demonstrates the seven Army Values in daily conduct",
            pillar: "character",
            sub_dimension: "Army Values",
            rating: 5,
          },
        ],
        development_needs: [
          {
            indicator_id: "CN-1.1",
            behavior_text: "Maintains consistent presence in unit work areas, training areas, and living quarters",
            pillar: "connection",
            sub_dimension: "Visibility",
            rating: 2,
          },
          {
            indicator_id: "CH-1.1",
            behavior_text: "Maintains a regular, visible prayer/devotional life",
            pillar: "character",
            sub_dimension: "Spirituality",
            rating: 3,
          },
        ],
        pillar_averages: {
          character: 3.8,
          competence: 4.2,
          connection: 2.7,
          constitutional: 4.0,
        },
        summary_narrative:
          "CPT Nguyen is tactically and administratively the strongest chaplain in 2 ABCT. His military competence is outstanding. However, he tends to spend too much time in the TOC doing staff work and not enough time visiting Soldiers in their positions. His ministry presence and visibility need significant improvement. Personal spiritual disciplines also weaken under field conditions.",
      },
    },

    // ── Observation 4: CPT Henderson (3-82 FA) ────────────────────
    {
      id: "demo-3000-0000-0000-000000000004",
      subject_id: "demo-1000-0004-0001-000000000001",
      observer_id: "demo-1000-0004-0000-000000000001",
      date: "2026-02-10",
      echelon_setting: "brigade",
      context: "garrison",
      ratings: {
        "CH-1.1": { rating: 4 },
        "CH-1.2": { rating: 4 },
        "CH-2.1": { rating: 5, notes: "Actively seeks 360-degree feedback from the entire UMT" },
        "CH-2.3": { rating: 5 },
        "CH-3.1": { rating: 4 },
        "CH-4.1": { rating: 4 },
        "CO-1.1": { rating: 5, notes: "Chapel services have grown 40% since her arrival" },
        "CO-2.1": { rating: 5, notes: "Strong Bonds program rated #1 in the division" },
        "CO-3.1": { rating: 4 },
        "CO-4.1": { rating: 3, notes: "ACFT score meets standard but room for improvement" },
        "CN-1.1": { rating: 4 },
        "CN-2.1": { rating: 5, notes: "Soldiers of all ranks approach freely" },
        "CN-3.1": { rating: 5, notes: "Available 24/7 with multiple contact channels" },
        "CF-1.1": { rating: 4 },
        "CF-2.1": { rating: 4 },
      },
      word_picture: {
        strengths: [
          {
            indicator_id: "CO-1.1",
            behavior_text: "Delivers worship services that are biblically grounded and relevant",
            pillar: "competence",
            sub_dimension: "Preaching",
            rating: 5,
          },
          {
            indicator_id: "CO-2.1",
            behavior_text: "Develops and delivers strong-bonds and resilience training aligned with unit needs",
            pillar: "competence",
            sub_dimension: "Teaching",
            rating: 5,
          },
          {
            indicator_id: "CH-2.1",
            behavior_text: "Actively seeks and incorporates feedback from subordinates, peers, and superiors",
            pillar: "character",
            sub_dimension: "Humility",
            rating: 5,
          },
        ],
        development_needs: [
          {
            indicator_id: "CO-4.1",
            behavior_text: "Demonstrates tactical proficiency appropriate to echelon",
            pillar: "competence",
            sub_dimension: "Soldiering",
            rating: 3,
          },
        ],
        pillar_averages: {
          character: 4.3,
          competence: 4.2,
          connection: 4.7,
          constitutional: 4.0,
        },
        summary_narrative:
          "CPT Henderson is an exceptional ministry leader whose preaching, teaching, and relational skills are the best in DIVARTY. Her Strong Bonds program has become a model for the division. She is approachable, responsive, and genuinely humble. Physical fitness and tactical proficiency are areas for continued growth, but she meets all standards and is on a strong developmental trajectory.",
      },
    },

    // ── Observation 5: SSG Garcia (2-5 CAV) ───────────────────────
    {
      id: "demo-3000-0000-0000-000000000005",
      subject_id: "demo-1000-0001-0001-000000000002",
      observer_id: "demo-1000-0001-0001-000000000001",
      date: "2026-02-14",
      echelon_setting: "battalion",
      context: "garrison",
      ratings: {
        "CH-4.1": { rating: 5, notes: "Models Army Values daily" },
        "CH-4.2": { rating: 4 },
        "CH-5.1": { rating: 4 },
        "CH-5.2": { rating: 5, notes: "Exceptional composure under pressure during crisis response" },
        "CO-4.1": { rating: 5, notes: "Tactical skills well above grade" },
        "CO-4.2": { rating: 5 },
        "CO-5.1": { rating: 4 },
        "CO-5.2": { rating: 4 },
        "CO-6.1": { rating: 3, notes: "Needs development in supervising junior enlisted" },
        "CN-1.1": { rating: 5 },
        "CN-1.2": { rating: 5, notes: "Soldiers in every company know him by name" },
        "CN-2.1": { rating: 4 },
        "CN-4.1": { rating: 5, notes: "Projects professional bearing at all times" },
        "CN-5.1": { rating: 4 },
        "CF-1.1": { rating: 4 },
      },
      word_picture: {
        strengths: [
          {
            indicator_id: "CO-4.1",
            behavior_text: "Demonstrates tactical proficiency appropriate to echelon",
            pillar: "competence",
            sub_dimension: "Soldiering",
            rating: 5,
          },
          {
            indicator_id: "CN-1.2",
            behavior_text: "Visits Soldiers in barracks, hospitals, and confinement facilities",
            pillar: "connection",
            sub_dimension: "Visibility",
            rating: 5,
          },
          {
            indicator_id: "CH-5.2",
            behavior_text: "Manages time effectively and demonstrates composure under pressure",
            pillar: "character",
            sub_dimension: "Discipline",
            rating: 5,
          },
        ],
        development_needs: [
          {
            indicator_id: "CO-6.1",
            behavior_text: "Sets clear expectations and holds team members accountable",
            pillar: "competence",
            sub_dimension: "Leading",
            rating: 3,
          },
        ],
        pillar_averages: {
          character: 4.5,
          competence: 4.2,
          connection: 4.7,
          constitutional: 4.0,
        },
        summary_narrative:
          "SSG Garcia is an outstanding Religious Affairs Specialist who excels in tactical operations and Soldier engagement. His visibility throughout the battalion is exemplary. He needs to develop his leadership skills as he prepares for SFC responsibilities, particularly in holding junior Soldiers accountable and providing structured mentorship.",
      },
    },

    // ── Observation 6: CPT Patel (3-8 CAV) ────────────────────────
    {
      id: "demo-3000-0000-0000-000000000006",
      subject_id: "demo-1000-0003-0001-000000000001",
      observer_id: "demo-1000-0003-0000-000000000001",
      date: "2026-03-05",
      echelon_setting: "brigade",
      context: "ctc",
      ratings: {
        "CH-1.1": { rating: 4 },
        "CH-1.5": { rating: 5, notes: "Maintained spiritual resilience throughout NTC rotation" },
        "CH-2.1": { rating: 3, notes: "Could be more receptive to AAR feedback" },
        "CH-3.1": { rating: 4 },
        "CH-4.1": { rating: 4 },
        "CO-1.1": { rating: 4 },
        "CO-2.1": { rating: 3 },
        "CO-3.1": { rating: 4 },
        "CO-4.1": { rating: 4 },
        "CO-5.1": { rating: 2, notes: "RS annex was late and incomplete during the rotation" },
        "CN-1.1": { rating: 3, notes: "Vehicle issues limited circulation but showed initiative to mitigate" },
        "CN-2.1": { rating: 4 },
        "CN-3.1": { rating: 3 },
        "CN-5.1": { rating: 5, notes: "Exceptional resilience during extended field operations" },
        "CF-1.1": { rating: 4 },
      },
      word_picture: {
        strengths: [
          {
            indicator_id: "CH-1.5",
            behavior_text: "Models spiritual resilience during high-stress or high-OPTEMPO periods",
            pillar: "character",
            sub_dimension: "Spirituality",
            rating: 5,
          },
          {
            indicator_id: "CN-5.1",
            behavior_text: "Continues effective ministry during extended operations and deployments",
            pillar: "connection",
            sub_dimension: "Resilience",
            rating: 5,
          },
        ],
        development_needs: [
          {
            indicator_id: "CO-5.1",
            behavior_text: "Produces timely, accurate staff products including the Religious Support Annex",
            pillar: "competence",
            sub_dimension: "Staffing",
            rating: 2,
          },
          {
            indicator_id: "CH-2.1",
            behavior_text: "Actively seeks and incorporates feedback from subordinates, peers, and superiors",
            pillar: "character",
            sub_dimension: "Humility",
            rating: 3,
          },
        ],
        pillar_averages: {
          character: 4.0,
          competence: 3.4,
          connection: 3.8,
          constitutional: 4.0,
        },
        summary_narrative:
          "CPT Patel demonstrated strong spiritual resilience and personal endurance during the NTC rotation, but his administrative and staff skills were lacking. The RS annex was incomplete and late, which degraded brigade-level synchronization. He also needs to be more receptive to feedback during AARs. His ministry presence was limited by vehicle issues, though he showed initiative in finding alternative transportation.",
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // CAPABILITY GAPS (4)
  // ═══════════════════════════════════════════════════════════════════════════
  capability_gaps: [
    {
      id: "demo-4000-0000-0000-000000000001",
      title: "BN Command Post Integration",
      description:
        "UMTs at battalion level are not consistently integrated into the command post battle rhythm. Chaplains miss key syncs, do not receive updated operational graphics, and RS operations are frequently de-synchronized from maneuver timelines.",
      severity: "critical",
      status: "under_analysis",
      domains: ["training", "doctrine"],
      org_id: "demo-0001-0000-0000-000000000001",
      identified_date: "2025-11-15",
      identified_by: "demo-1000-0000-0000-000000000001",
      source_event_ids: [
        "demo-2000-0000-0000-000000000007",
        "demo-2000-0000-0000-000000000012",
      ],
    },
    {
      id: "demo-4000-0000-0000-000000000002",
      title: "Corps RS Planning Standardization",
      description:
        "There is no standardized planning methodology for religious support operations at corps echelon and above. Each division UMT uses different formats, timelines, and synchronization tools, making cross-division coordination during large-scale combat operations inefficient.",
      severity: "significant",
      status: "identified",
      domains: ["organization", "training", "doctrine"],
      org_id: "demo-0001-0000-0000-000000000001",
      identified_date: "2025-12-01",
      identified_by: "demo-1000-0000-0000-000000000001",
      source_event_ids: [],
    },
    {
      id: "demo-4000-0000-0000-000000000003",
      title: "56M Force Protection Training",
      description:
        "Religious Affairs Specialists lack standardized force protection training for UMT operations in contested environments. Current training does not adequately prepare 56M personnel for providing security during field worship services or battlefield circulation in LSCO scenarios.",
      severity: "moderate",
      status: "documented",
      domains: ["training", "personnel"],
      org_id: "demo-0001-0000-0000-000000000001",
      identified_date: "2026-01-10",
      identified_by: "demo-1000-0000-0000-000000000002",
      solution_pathway: "dcr",
      source_event_ids: ["demo-2000-0000-0000-000000000007"],
    },
    {
      id: "demo-4000-0000-0000-000000000004",
      title: "Spiritual Readiness Assessment Tools",
      description:
        "The division lacks standardized digital tools for measuring and tracking spiritual readiness across the formation. Current assessments rely on ad-hoc surveys and manual data collection, limiting the ability to identify trends and allocate RS resources effectively.",
      severity: "moderate",
      status: "identified",
      domains: ["materiel", "training"],
      org_id: "demo-0001-0000-0000-000000000001",
      identified_date: "2026-02-01",
      identified_by: "demo-1000-0000-0000-000000000001",
      source_event_ids: [],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // DOTMLPF ANALYSES (3)
  // ═══════════════════════════════════════════════════════════════════════════
  dotmlpf_analyses: [
    // ── Gap 1 (BN CP Integration) — Training Domain ───────────────
    {
      id: "demo-5000-0000-0000-000000000001",
      capability_gap_id: "demo-4000-0000-0000-000000000001",
      domain: "training",
      status: "complete",
      current_state:
        "Battalion UMTs receive no formal training on integrating into the BN TOC battle rhythm. CCC and CHBOLC cover RS planning at a conceptual level but do not include practical TOC integration exercises. Unit-level training is inconsistent and depends on individual BN Chaplain initiative.",
      desired_state:
        "All battalion chaplains are trained and certified on BN TOC battle rhythm integration prior to assuming duties. UMTs participate in all key BN syncs (MDMP, targeting, OPT) and produce RS products synchronized with BN timelines. Integration is evaluated as part of METL assessment.",
      gap_assessment:
        "The gap is primarily a training deficiency. Chaplains are not receiving hands-on TOC integration training at the institutional level, and units are not evaluating UMT integration as part of collective training assessments. The result is UMTs operating in isolation from the maneuver plan.",
      recommended_action:
        "Develop a POI for BN TOC integration and include it in CCC Phase II. Add UMT TOC integration as an evaluated task during all battalion-level STX and FTX events. Request USACHCS add a 3-day TOC integration practicum to resident CCC.",
      confidence_level: "high",
      analyst_id: "demo-1000-0000-0000-000000000001",
      completed_date: "2026-02-15",
    },
    // ── Gap 1 (BN CP Integration) — Doctrine Domain ──────────────
    {
      id: "demo-5000-0000-0000-000000000002",
      capability_gap_id: "demo-4000-0000-0000-000000000001",
      domain: "doctrine",
      status: "complete",
      current_state:
        "FM 3-83 addresses RS planning and synchronization at the conceptual level but does not provide specific TTP for UMT integration into the BN battle rhythm. ATP 1-05.02 covers UMT operations but lacks detailed guidance on TOC procedures, battle tracking, and running estimate maintenance for chaplains.",
      desired_state:
        "Doctrinal publications provide clear, step-by-step TTP for UMT integration into the BN TOC, including specific products, timelines, and responsibilities. A standardized UMT running estimate template is available in ATP 1-05.02.",
      gap_assessment:
        "Current doctrine assumes chaplains understand TOC procedures through general officer education but does not codify specific UMT roles in the BN battle rhythm. This creates inconsistency across the force and allows chaplains to operate outside the maneuver planning process without accountability.",
      recommended_action:
        "Submit a DA Form 2028 recommending update to ATP 1-05.02 to include a new chapter on UMT TOC integration. Develop a UMT running estimate template as an appendix. Coordinate with USACHCS Doctrine Division for inclusion in next revision cycle.",
      confidence_level: "high",
      analyst_id: "demo-1000-0000-0000-000000000001",
      completed_date: "2026-02-20",
    },
    // ── Gap 3 (56M Force Protection) — Training Domain ────────────
    {
      id: "demo-5000-0000-0000-000000000003",
      capability_gap_id: "demo-4000-0000-0000-000000000003",
      domain: "training",
      status: "complete",
      current_state:
        "56M AIT provides basic soldier skills and combatives but does not include scenario-based force protection training specific to UMT operations. At unit level, RAS personnel train on individual weapons qualification and general force protection tasks but lack UMT-specific security protocols for worship services, battlefield circulation, and counseling site security.",
      desired_state:
        "All 56M personnel receive UMT-specific force protection training during AIT and sustain proficiency through unit-level training. Training includes security planning for worship services, movement security during battlefield circulation, and site security for counseling operations in both garrison and field environments.",
      gap_assessment:
        "The training gap exists at both institutional and operational levels. AIT does not address the unique security requirements of UMT operations, and units lack standardized training plans for UMT-specific force protection. The gap is compounded in LSCO scenarios where UMTs operate in contested areas without dedicated security elements.",
      recommended_action:
        "Develop a DCR to add UMT Force Protection Lane to 56M AIT. Create a standardized UMT Force Protection Training Plan for units to execute quarterly. Coordinate with USACHCS to develop an exportable training package.",
      confidence_level: "medium",
      analyst_id: "demo-1000-0000-0000-000000000002",
      completed_date: "2026-03-01",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // IDP RECORDS (2)
  // ═══════════════════════════════════════════════════════════════════════════
  idp_records: [
    // ── Active IDP: CPT Kim (2-5 CAV) ─────────────────────────────
    {
      id: "demo-6000-0000-0000-000000000001",
      subject_id: "demo-1000-0001-0001-000000000001",
      mentor_id: "demo-1000-0001-0000-000000000001",
      status: "active",
      created_date: "2025-10-01",
      last_updated: "2026-02-28",
      period: "FY26",
      strengths_to_maximize: [
        "Pastoral counseling — consistently rated 5/5 by observers; Soldiers proactively seek him out for care",
        "Ministry visibility — present in motor pools, company areas, and PT formations daily",
        "Authenticity — actions consistently match stated values, building deep trust across the formation",
      ],
      needs_to_mitigate: [
        "Teaching delivery — content is strong but facilitation style needs to be more dynamic and interactive",
        "Tactical proficiency — needs improvement in MDMP integration and field movement planning",
        "Staff product timeliness — RS annex submissions have been late in 2 of last 4 exercises",
      ],
      professional_goals: [
        {
          what: "Complete the Advanced Facilitator Course to improve teaching and training delivery",
          why: "Teaching is a core competency and current delivery style does not maximize Soldier engagement during resilience training",
          how: "Enroll in the next available AFC offering at Fort Cavazos; practice facilitation techniques during weekly Bible study",
          when: "NLT 30 Jun 2026",
          support: "BDE Chaplain to approve TDY funding and provide feedback on practice sessions",
        },
        {
          what: "Achieve T rating on 16-BN-3801 during next battalion FTX",
          why: "Previous P rating indicated gaps in RS synchronization with BN operations",
          how: "Attend all BN MDMP sessions, produce RS annex NLT D-5, coordinate battle circulation plan with S3",
          when: "Next scheduled FTX (estimated Apr 2026)",
          support: "BN S3 to include UMT in all planning sessions; BDE Chaplain to observe and evaluate",
        },
      ],
      personal_goals: [
        {
          what: "Complete Doctor of Ministry coursework (Year 2 of 3)",
          why: "Advanced theological education deepens pastoral care effectiveness and prepares for senior chaplain responsibilities",
          how: "Complete two intensive residency sessions and four online courses through seminary distance program",
          when: "Academic year completion by Aug 2026",
          support: "Command approval for two weeks permissive TDY for residency intensives",
        },
        {
          what: "Pass ACFT with a score of 500+ in all events",
          why: "Physical fitness directly supports ability to conduct battlefield circulation and models Soldier discipline",
          how: "Follow structured ACFT training plan 5 days per week; work with BN Master Fitness Trainer on weak events",
          when: "Next record ACFT (estimated May 2026)",
          support: "BN MFT to provide individualized training plan",
        },
      ],
    },

    // ── Completed IDP: CPT Henderson (3-82 FA) ────────────────────
    {
      id: "demo-6000-0000-0000-000000000002",
      subject_id: "demo-1000-0004-0001-000000000001",
      mentor_id: "demo-1000-0004-0000-000000000001",
      status: "completed",
      created_date: "2025-04-01",
      last_updated: "2025-12-15",
      completed_date: "2025-12-15",
      period: "FY25",
      strengths_to_maximize: [
        "Preaching excellence — worship attendance grew 40% during her tenure; sermons are biblically grounded and contextually relevant",
        "Strong Bonds program design — her curriculum was adopted as the division model",
        "Humility and feedback integration — consistently seeks input from all ranks and implements it visibly",
      ],
      needs_to_mitigate: [
        "Physical fitness — ACFT score meets standard but is below average for peer group",
        "Tactical field operations — limited experience in extended field operations beyond STX level",
        "Time management during high-OPTEMPO periods — tendency to overcommit and not delegate",
      ],
      professional_goals: [
        {
          what: "Design and deliver a division-level Strong Bonds curriculum",
          why: "No standardized Strong Bonds curriculum existed at division level; her battalion program showed measurable results",
          how: "Analyze best practices from all BN programs, develop standardized facilitator guide, pilot with two battalions, refine based on feedback",
          when: "NLT 30 Sep 2025",
          support: "Division Chaplain to approve pilot program and provide feedback; DIVARTY Chaplain to coordinate across battalions",
        },
        {
          what: "Earn Master Resilience Trainer certification",
          why: "MRT certification enables delivery of higher-quality resilience training and qualifies her to train other UMT members",
          how: "Attend the 10-day MRT course at Fort Jackson; practice delivery in unit setting for 90 days post-course",
          when: "NLT 31 Aug 2025",
          support: "BDE Chaplain to approve TDY; S1 to process enrollment",
        },
      ],
      personal_goals: [
        {
          what: "Improve ACFT score to 540+ total",
          why: "Higher physical fitness improves credibility and field endurance for upcoming deployment cycle",
          how: "Train with BN PT program plus additional cardio 3x/week; work with dietitian on nutrition plan",
          when: "NLT record ACFT Nov 2025",
          support: "BN MFT and unit dietitian support",
        },
        {
          what: "Complete Clinical Pastoral Education (CPE) unit",
          why: "CPE enhances pastoral counseling skills and is a prerequisite for future board certification",
          how: "Enroll in CPE program through Fort Cavazos hospital; complete 400 hours of supervised clinical ministry",
          when: "NLT 15 Dec 2025",
          support: "Command approval for weekly CPE sessions; hospital chaplain supervisor",
        },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPASS CYCLES (1 completed)
  // ═══════════════════════════════════════════════════════════════════════════
  compass_cycles: [
    {
      id: "demo-7000-0000-0000-000000000001",
      subject_id: "demo-1000-0001-0001-000000000001",
      status: "closed",
      assessment_period: "FY26-Q1",
      created_date: "2025-10-01",
      closed_date: "2025-12-20",
      org_id: "demo-0003-0001-0000-000000000001",
      initiated_by: "demo-1000-0001-0000-000000000001",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPASS RESPONSES (5 for the single cycle)
  // ═══════════════════════════════════════════════════════════════════════════
  compass_responses: [
    // ── Self-assessment ───────────────────────────────────────────
    {
      id: "demo-8000-0000-0000-000000000001",
      cycle_id: "demo-7000-0000-0000-000000000001",
      respondent_id: "demo-1000-0001-0001-000000000001",
      respondent_relationship: "self",
      is_complete: true,
      completed_date: "2025-10-15",
      ratings: {
        spirituality: 4,
        humility: 4,
        authenticity: 5,
        army_values: 4,
        empathy: 5,
        discipline: 4,
        preaching: 4,
        teaching: 3,
        counseling: 5,
        soldiering: 3,
        staffing: 3,
        leading: 4,
        visibility: 5,
        affability: 4,
        accessibility: 4,
        bearing: 4,
        confidence: 4,
        resilience: 4,
      },
    },

    // ── Subordinate 1 (SSG Garcia) ────────────────────────────────
    {
      id: "demo-8000-0000-0000-000000000002",
      cycle_id: "demo-7000-0000-0000-000000000001",
      respondent_id: "demo-1000-0001-0001-000000000002",
      respondent_relationship: "subordinate",
      is_complete: true,
      completed_date: "2025-10-22",
      ratings: {
        spirituality: 5,
        humility: 4,
        authenticity: 5,
        army_values: 5,
        empathy: 5,
        discipline: 4,
        preaching: 4,
        teaching: 3,
        counseling: 5,
        soldiering: 3,
        staffing: 4,
        leading: 4,
        visibility: 5,
        affability: 5,
        accessibility: 5,
        bearing: 4,
        confidence: 4,
        resilience: 4,
      },
    },

    // ── Subordinate 2 (CPT Mensah, peer BN CH acting as 2nd sub) ──
    {
      id: "demo-8000-0000-0000-000000000003",
      cycle_id: "demo-7000-0000-0000-000000000001",
      respondent_id: "demo-1000-0001-0002-000000000001",
      respondent_relationship: "subordinate",
      is_complete: true,
      completed_date: "2025-10-25",
      ratings: {
        spirituality: 5,
        humility: 3,
        authenticity: 4,
        army_values: 4,
        empathy: 4,
        discipline: 4,
        preaching: 5,
        teaching: 3,
        counseling: 4,
        soldiering: 3,
        staffing: 3,
        leading: 3,
        visibility: 4,
        affability: 4,
        accessibility: 4,
        bearing: 4,
        confidence: 3,
        resilience: 4,
      },
    },

    // ── Peer (CPT Nguyen, 1-5 CAV) ───────────────────────────────
    {
      id: "demo-8000-0000-0000-000000000004",
      cycle_id: "demo-7000-0000-0000-000000000001",
      respondent_id: "demo-1000-0002-0001-000000000001",
      respondent_relationship: "peer",
      is_complete: true,
      completed_date: "2025-11-01",
      ratings: {
        spirituality: 5,
        humility: 4,
        authenticity: 5,
        army_values: 4,
        empathy: 5,
        discipline: 3,
        preaching: 4,
        teaching: 4,
        counseling: 5,
        soldiering: 3,
        staffing: 3,
        leading: 4,
        visibility: 5,
        affability: 5,
        accessibility: 4,
        bearing: 4,
        confidence: 4,
        resilience: 5,
      },
    },

    // ── Superior (LTC Park, 1 ABCT BDE CH) ───────────────────────
    {
      id: "demo-8000-0000-0000-000000000005",
      cycle_id: "demo-7000-0000-0000-000000000001",
      respondent_id: "demo-1000-0001-0000-000000000001",
      respondent_relationship: "superior",
      is_complete: true,
      completed_date: "2025-11-10",
      ratings: {
        spirituality: 5,
        humility: 4,
        authenticity: 5,
        army_values: 4,
        empathy: 4,
        discipline: 4,
        preaching: 4,
        teaching: 3,
        counseling: 5,
        soldiering: 3,
        staffing: 3,
        leading: 4,
        visibility: 5,
        affability: 4,
        accessibility: 4,
        bearing: 5,
        confidence: 4,
        resilience: 4,
      },
    },
  ],
};
