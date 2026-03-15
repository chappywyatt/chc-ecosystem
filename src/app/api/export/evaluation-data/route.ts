import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from("behavioral_observations")
      .select("id, subject_id, observer_id, org_id, observation_date, context, echelon_setting, overall_notes, created_at")
      .order("observation_date", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const rows = data ?? [];
    if (rows.length === 0) {
      return new NextResponse("No evaluation data available for export.", {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }

    const headers = ["ID", "Subject ID", "Observer ID", "Org ID", "Date", "Context", "Echelon", "Notes", "Created At"];
    const csvRows = [
      headers.join(","),
      ...rows.map((r) =>
        [
          r.id,
          r.subject_id,
          r.observer_id,
          r.org_id,
          r.observation_date,
          `"${(r.context ?? "").replace(/"/g, '""')}"`,
          r.echelon_setting,
          `"${(r.overall_notes ?? "").replace(/"/g, '""')}"`,
          r.created_at,
        ].join(",")
      ),
    ];

    await supabase.from("audit_log").insert({
      action: "export",
      table_name: "behavioral_observations",
      new_values: { row_count: rows.length, format: "csv" },
    }).then(() => {});

    return new NextResponse(csvRows.join("\n"), {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="evaluation-data-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
