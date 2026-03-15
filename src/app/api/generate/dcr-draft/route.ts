import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SAMPLE_DCR = `DOTMLPF-P CHANGE RECOMMENDATION (DCR)
============================================================

1. CAPABILITY GAP IDENTIFICATION

   a. Gap Title: [Title from gap record]
   b. Description: [Description from gap record]
   c. Operational Impact: [Operational impact from gap record]
   d. Severity: [Severity level]
   e. Source: [Source type and description]

2. DOCTRINAL REFERENCES
   - FM 3-83, Religious Support
   - AR 165-1, Army Chaplain Corps Activities
   - ADP 6-22, Army Leadership

3. DOTMLPF-P ANALYSIS

   a. DOCTRINE
      Current State: Current doctrine partially addresses this capability area.
      Desired State: Updated doctrine that reflects current operational requirements.
      Gap: Existing publications do not adequately address the identified capability requirement.
      Recommendation: Update relevant field manuals and training publications.

   b. ORGANIZATION
      Current State: Current organizational structure provides baseline capability.
      Desired State: Modified force structure that enables full capability.
      Gap: Authorization gaps at identified echelons limit capability.
      Recommendation: Modify MTOE to authorize required positions.

   c. TRAINING
      Current State: Limited institutional and unit training exists.
      Desired State: Comprehensive training program with T&EO standards.
      Gap: Proficiency data indicates significant training shortfalls.
      Recommendation: Develop new T&EO and integrate into BFT training calendar.

4. RECOMMENDED CHANGES
   [Generated recommendations based on analysis]

5. RISK ASSESSMENT
   Without the recommended changes, the Chaplain Corps will continue to experience
   degraded capability in this area, impacting readiness and operational effectiveness.

6. COORDINATION
   This DCR requires coordination with USACHCS, CDID, OCCH, and affected commands.

============================================================
NOTE: This is a SAMPLE DCR generated without AI assistance.
Configure ANTHROPIC_API_KEY for AI-generated content tailored
to the specific gap analysis data.
============================================================`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { gapId } = body;

    const apiKey = process.env.ANTHROPIC_API_KEY;

    // If no API key, return sample
    if (!apiKey) {
      return NextResponse.json({
        content: SAMPLE_DCR,
        source: "sample",
        message: "ANTHROPIC_API_KEY not configured. Returning sample DCR.",
      });
    }

    // Fetch gap and analysis data from Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let gapData = null;
    let analyses: unknown[] = [];

    if (gapId) {
      const { data: gap } = await supabase
        .from("capability_gaps")
        .select("*")
        .eq("id", gapId)
        .single();
      gapData = gap;

      const { data: analysisData } = await supabase
        .from("dotmlpf_analyses")
        .select("*")
        .eq("gap_id", gapId);
      analyses = analysisData ?? [];
    }

    // Build prompt
    const prompt = `You are a military staff officer specializing in DOTMLPF-P Change Recommendations for the Army Chaplain Corps.

Generate a formal DOTMLPF-P Change Recommendation (DCR) based on the following capability gap analysis data.

Format the DCR per the ACIDS Process Guide template with numbered sections.
Use formal military writing style. Be specific and actionable.

GAP DATA:
${gapData ? JSON.stringify(gapData, null, 2) : "No specific gap data provided."}

DOTMLPF-P ANALYSES:
${analyses.length > 0 ? JSON.stringify(analyses, null, 2) : "No domain analyses provided."}

Generate the complete DCR document.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic API error:", err);
      return NextResponse.json({
        content: SAMPLE_DCR,
        source: "sample",
        message: "AI generation failed. Returning sample DCR.",
      });
    }

    const data = await response.json();
    const content = data.content?.[0]?.text ?? SAMPLE_DCR;

    return NextResponse.json({ content, source: "ai" });
  } catch (error) {
    console.error("DCR generation error:", error);
    return NextResponse.json({
      content: SAMPLE_DCR,
      source: "sample",
      message: "Generation error. Returning sample DCR.",
    });
  }
}
