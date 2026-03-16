import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
    if (!isDemoMode) {
      return NextResponse.json(
        { error: "Seeding only available in demo mode" },
        { status: 403 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Dynamically import all seed data
    const { DEMO_DATA } = await import("@/lib/data/demo-data");
    const { TASKS_SEED } = await import("@/lib/data/tasks-seed");
    const { BEHAVIORAL_INDICATORS } = await import("@/lib/data/indicators-seed");
    const { COMPASS_QUALITIES } = await import("@/lib/data/compass-qualities");

    const results: Record<string, string> = {};
    const counts: Record<string, number> = {};

    // ═══════════════════════════════════════════════════════════════════
    // PHASE 1: DELETE in reverse FK order (idempotent clean slate)
    // ═══════════════════════════════════════════════════════════════════
    const deleteOrder = [
      "compass_responses",
      "compass_cycles",
      "dotmlpf_analyses",
      "capability_gaps",
      "idp_records",
      "behavioral_observations",
      "metl_designations",
      "training_events",
      "personnel",
      "organizations",
      // Reference tables — delete demo rows only
      "tasks_master",
      "behavioral_indicators",
      "compass_qualities",
    ];

    for (const table of deleteOrder) {
      // For demo data tables, delete rows with de00* UUID prefix
      // For reference tables, delete all (they'll be re-seeded)
      const isRefTable = ["tasks_master", "behavioral_indicators", "compass_qualities"].includes(table);
      if (isRefTable) {
        const { error } = await supabase.from(table).delete().neq("id", "");
        if (error) results[`delete_${table}`] = `Error: ${error.message}`;
      } else {
        // UUID range query: all UUIDs starting with de00xxxx
        const { error } = await supabase
          .from(table)
          .delete()
          .gte("id", "de000000-0000-0000-0000-000000000000")
          .lte("id", "de00ffff-ffff-ffff-ffff-ffffffffffff");
        if (error) results[`delete_${table}`] = `Error: ${error.message}`;
      }
    }

    // ═══════════════════════════════════════════════════════════════════
    // PHASE 2: INSERT in correct FK order
    // ═══════════════════════════════════════════════════════════════════

    // 1. Reference tables (no FK dependencies)
    if (TASKS_SEED?.length) {
      const { error } = await supabase.from("tasks_master").upsert(
        TASKS_SEED.map((t) => ({ ...t, is_active: true })),
        { onConflict: "id" }
      );
      counts.tasks_master = TASKS_SEED.length;
      if (error) results.tasks_master = `Error: ${error.message}`;
    }

    if (BEHAVIORAL_INDICATORS?.length) {
      const { error } = await supabase.from("behavioral_indicators").upsert(BEHAVIORAL_INDICATORS, { onConflict: "id" });
      counts.behavioral_indicators = BEHAVIORAL_INDICATORS.length;
      if (error) results.behavioral_indicators = `Error: ${error.message}`;
    }

    if (COMPASS_QUALITIES?.length) {
      const { error } = await supabase.from("compass_qualities").upsert(COMPASS_QUALITIES, { onConflict: "id" });
      counts.compass_qualities = COMPASS_QUALITIES.length;
      if (error) results.compass_qualities = `Error: ${error.message}`;
    }

    // 2. Organizations (parent FK: parent_org_id → organizations)
    if (DEMO_DATA.organizations?.length) {
      const { error } = await supabase.from("organizations").upsert(DEMO_DATA.organizations, { onConflict: "uic" });
      counts.organizations = DEMO_DATA.organizations.length;
      if (error) results.organizations = `Error: ${error.message}`;
    }

    // 3. Personnel (FK: org_id → organizations)
    if (DEMO_DATA.personnel?.length) {
      const { error } = await supabase.from("personnel").upsert(DEMO_DATA.personnel, { onConflict: "id" });
      counts.personnel = DEMO_DATA.personnel.length;
      if (error) results.personnel = `Error: ${error.message}`;
    }

    // 4. Training Events (FK: org_id → organizations, task_id → tasks_master, evaluator_id → personnel)
    if (DEMO_DATA.training_events?.length) {
      const { error } = await supabase.from("training_events").upsert(DEMO_DATA.training_events, { onConflict: "id" });
      counts.training_events = DEMO_DATA.training_events.length;
      if (error) results.training_events = `Error: ${error.message}`;
    }

    // 5. METL Designations (FK: org_id → organizations, task_id → tasks_master)
    if (DEMO_DATA.metl_designations?.length) {
      const { error } = await supabase.from("metl_designations").upsert(DEMO_DATA.metl_designations, { onConflict: "id" });
      counts.metl_designations = DEMO_DATA.metl_designations.length;
      if (error) results.metl_designations = `Error: ${error.message}`;
    }

    // 6. Behavioral Observations (FK: subject_id/observer_id → personnel, org_id → organizations)
    if (DEMO_DATA.behavioral_observations?.length) {
      const { error } = await supabase.from("behavioral_observations").upsert(DEMO_DATA.behavioral_observations, { onConflict: "id" });
      counts.behavioral_observations = DEMO_DATA.behavioral_observations.length;
      if (error) results.behavioral_observations = `Error: ${error.message}`;
    }

    // 7. Capability Gaps (FK: assigned_to/created_by → personnel)
    if (DEMO_DATA.capability_gaps?.length) {
      const { error } = await supabase.from("capability_gaps").upsert(DEMO_DATA.capability_gaps, { onConflict: "id" });
      counts.capability_gaps = DEMO_DATA.capability_gaps.length;
      if (error) results.capability_gaps = `Error: ${error.message}`;
    }

    // 8. DOTMLPF Analyses (FK: gap_id → capability_gaps, analyst_id → personnel)
    if (DEMO_DATA.dotmlpf_analyses?.length) {
      const { error } = await supabase.from("dotmlpf_analyses").upsert(DEMO_DATA.dotmlpf_analyses, { onConflict: "id" });
      counts.dotmlpf_analyses = DEMO_DATA.dotmlpf_analyses.length;
      if (error) results.dotmlpf_analyses = `Error: ${error.message}`;
    }

    // 9. IDP Records (FK: personnel_id/supervisor_id → personnel, source_compass_id → compass_cycles)
    // Insert IDPs before compass to avoid FK issues with source_compass_id
    // Actually, IDPs reference compass cycles, so compass must go first
    // But compass_cycles reference personnel, which is already inserted

    // 9a. Compass Cycles (FK: subject_id/initiated_by → personnel)
    if (DEMO_DATA.compass_cycles?.length) {
      const { error } = await supabase.from("compass_cycles").upsert(DEMO_DATA.compass_cycles, { onConflict: "id" });
      counts.compass_cycles = DEMO_DATA.compass_cycles.length;
      if (error) results.compass_cycles = `Error: ${error.message}`;
    }

    // 9b. Compass Responses (FK: cycle_id → compass_cycles)
    if (DEMO_DATA.compass_responses?.length) {
      const { error } = await supabase.from("compass_responses").upsert(DEMO_DATA.compass_responses, { onConflict: "id" });
      counts.compass_responses = DEMO_DATA.compass_responses.length;
      if (error) results.compass_responses = `Error: ${error.message}`;
    }

    // 9c. IDP Records (FK: source_compass_id → compass_cycles)
    if (DEMO_DATA.idp_records?.length) {
      const { error } = await supabase.from("idp_records").upsert(DEMO_DATA.idp_records, { onConflict: "id" });
      counts.idp_records = DEMO_DATA.idp_records.length;
      if (error) results.idp_records = `Error: ${error.message}`;
    }

    // ═══════════════════════════════════════════════════════════════════
    // PHASE 3: Create demo auth user + user_profile for RLS access
    // ═══════════════════════════════════════════════════════════════════
    const DEMO_EMAIL = "demo@chc-ecosystem.mil";
    const DEMO_PASSWORD = "DemoAccess2026!";

    try {
      // Check if demo user already exists
      const { data: listData } = await supabase.auth.admin.listUsers();
      const existingDemo = listData?.users?.find((u) => u.email === DEMO_EMAIL);

      let demoUserId: string;
      if (existingDemo) {
        demoUserId = existingDemo.id;
        // Update password in case it changed
        await supabase.auth.admin.updateUserById(demoUserId, { password: DEMO_PASSWORD });
      } else {
        const { data: newUser, error: userError } = await supabase.auth.admin.createUser({
          email: DEMO_EMAIL,
          password: DEMO_PASSWORD,
          email_confirm: true,
        });
        if (userError) throw userError;
        demoUserId = newUser.user.id;
      }

      // Upsert user_profile linking demo user to corps org
      const corpsOrgId = DEMO_DATA.organizations[0]?.id;
      const corpsChId = DEMO_DATA.personnel[0]?.id;
      const { error: profileError } = await supabase.from("user_profiles").upsert(
        {
          id: demoUserId,
          personnel_id: corpsChId,
          org_id: corpsOrgId,
          role: "admin",
          display_name: "Demo Admin (III Corps CH)",
          is_demo: true,
        },
        { onConflict: "id" }
      );
      if (profileError) {
        results.demo_user = `Error: ${profileError.message}`;
      } else {
        results.demo_user = `Created (${DEMO_EMAIL})`;
      }
    } catch (authErr) {
      results.demo_user = `Error: ${authErr instanceof Error ? authErr.message : "Unknown"}`;
    }

    // ═══════════════════════════════════════════════════════════════════
    // PHASE 4: Return detailed counts
    // ═══════════════════════════════════════════════════════════════════
    const hasErrors = Object.values(results).some((v) => v.startsWith("Error"));

    // Build success messages for tables without errors
    for (const [table, count] of Object.entries(counts)) {
      if (!results[table]) {
        results[table] = `${count} seeded`;
      }
    }

    const totalRecords = Object.values(counts).reduce((sum, n) => sum + n, 0);

    return NextResponse.json({
      message: hasErrors
        ? "Seeded with some errors — check results"
        : `Demo data seeded successfully (${totalRecords} total records)`,
      results,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Seed failed: " + (error instanceof Error ? error.message : "Unknown error") },
      { status: 500 }
    );
  }
}
