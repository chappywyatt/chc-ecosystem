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

    // Dynamically import demo data
    const { DEMO_DATA } = await import("@/lib/data/demo-data");

    const results: Record<string, string> = {};

    // Seed in order of dependencies
    // 1. Organizations
    if (DEMO_DATA.organizations?.length) {
      const { error } = await supabase.from("organizations").upsert(DEMO_DATA.organizations, { onConflict: "uic" });
      results.organizations = error ? `Error: ${error.message}` : `${DEMO_DATA.organizations.length} seeded`;
    }

    // 2. Personnel
    if (DEMO_DATA.personnel?.length) {
      const { error } = await supabase.from("personnel").upsert(DEMO_DATA.personnel, { onConflict: "id" });
      results.personnel = error ? `Error: ${error.message}` : `${DEMO_DATA.personnel.length} seeded`;
    }

    // 3. Tasks (from seed data)
    const { TASKS_SEED } = await import("@/lib/data/tasks-seed");
    if (TASKS_SEED?.length) {
      const { error } = await supabase.from("tasks_master").upsert(
        TASKS_SEED.map((t) => ({ ...t, is_active: true })),
        { onConflict: "id" }
      );
      results.tasks = error ? `Error: ${error.message}` : `${TASKS_SEED.length} seeded`;
    }

    // 4. Training Events
    if (DEMO_DATA.training_events?.length) {
      const { error } = await supabase.from("training_events").upsert(DEMO_DATA.training_events, { onConflict: "id" });
      results.training_events = error ? `Error: ${error.message}` : `${DEMO_DATA.training_events.length} seeded`;
    }

    // 5. Behavioral Observations
    if (DEMO_DATA.behavioral_observations?.length) {
      const { error } = await supabase.from("behavioral_observations").upsert(DEMO_DATA.behavioral_observations, { onConflict: "id" });
      results.observations = error ? `Error: ${error.message}` : `${DEMO_DATA.behavioral_observations.length} seeded`;
    }

    // 6. Compass Cycles
    if (DEMO_DATA.compass_cycles?.length) {
      const { error } = await supabase.from("compass_cycles").upsert(DEMO_DATA.compass_cycles, { onConflict: "id" });
      results.compass_cycles = error ? `Error: ${error.message}` : `${DEMO_DATA.compass_cycles.length} seeded`;
    }

    // 7. Compass Responses
    if (DEMO_DATA.compass_responses?.length) {
      const { error } = await supabase.from("compass_responses").upsert(DEMO_DATA.compass_responses, { onConflict: "id" });
      results.compass_responses = error ? `Error: ${error.message}` : `${DEMO_DATA.compass_responses.length} seeded`;
    }

    // 8. Capability Gaps
    if (DEMO_DATA.capability_gaps?.length) {
      const { error } = await supabase.from("capability_gaps").upsert(DEMO_DATA.capability_gaps, { onConflict: "id" });
      results.capability_gaps = error ? `Error: ${error.message}` : `${DEMO_DATA.capability_gaps.length} seeded`;
    }

    // 9. DOTMLPF Analyses
    if (DEMO_DATA.dotmlpf_analyses?.length) {
      const { error } = await supabase.from("dotmlpf_analyses").upsert(DEMO_DATA.dotmlpf_analyses, { onConflict: "id" });
      results.dotmlpf_analyses = error ? `Error: ${error.message}` : `${DEMO_DATA.dotmlpf_analyses.length} seeded`;
    }

    // 10. IDP Records
    if (DEMO_DATA.idp_records?.length) {
      const { error } = await supabase.from("idp_records").upsert(DEMO_DATA.idp_records, { onConflict: "id" });
      results.idp_records = error ? `Error: ${error.message}` : `${DEMO_DATA.idp_records.length} seeded`;
    }

    // Seed behavioral indicators
    const { BEHAVIORAL_INDICATORS } = await import("@/lib/data/indicators-seed");
    if (BEHAVIORAL_INDICATORS?.length) {
      const { error } = await supabase.from("behavioral_indicators").upsert(BEHAVIORAL_INDICATORS, { onConflict: "id" });
      results.indicators = error ? `Error: ${error.message}` : `${BEHAVIORAL_INDICATORS.length} seeded`;
    }

    // Seed compass qualities
    const { COMPASS_QUALITIES } = await import("@/lib/data/compass-qualities");
    if (COMPASS_QUALITIES?.length) {
      const { error } = await supabase.from("compass_qualities").upsert(COMPASS_QUALITIES, { onConflict: "id" });
      results.qualities = error ? `Error: ${error.message}` : `${COMPASS_QUALITIES.length} seeded`;
    }

    const hasErrors = Object.values(results).some((v) => v.startsWith("Error"));

    return NextResponse.json({
      message: hasErrors ? "Seeded with some errors" : "Demo data seeded successfully",
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
