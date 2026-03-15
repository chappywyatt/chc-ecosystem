import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from("training_events")
      .select("id, org_id, task_id, date, location, context, rating, external_evaluator, lessons_learned, created_at")
      .order("date", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const rows = data ?? [];
    if (rows.length === 0) {
      return new NextResponse("No training data available for export.", {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }

    const headers = ["ID", "Org ID", "Task ID", "Date", "Location", "Context", "Rating", "External Evaluator", "Lessons Learned", "Created At"];
    const csvRows = [
      headers.join(","),
      ...rows.map((r) =>
        [
          r.id,
          r.org_id,
          r.task_id,
          r.date,
          `"${(r.location ?? "").replace(/"/g, '""')}"`,
          r.context,
          r.rating ?? "",
          `"${(r.external_evaluator ?? "").replace(/"/g, '""')}"`,
          `"${(r.lessons_learned ?? "").replace(/"/g, '""')}"`,
          r.created_at,
        ].join(",")
      ),
    ];

    // Audit log
    await supabase.from("audit_log").insert({
      action: "export",
      table_name: "training_events",
      new_values: { row_count: rows.length, format: "csv" },
    }).then(() => {});

    return new NextResponse(csvRows.join("\n"), {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="training-data-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
