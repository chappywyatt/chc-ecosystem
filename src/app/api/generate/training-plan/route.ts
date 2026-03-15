import { NextRequest, NextResponse } from "next/server";

const SAMPLE_TRAINING_PLAN = `UNIT TRAINING PLAN — RELIGIOUS SUPPORT READINESS
============================================================

1. TRAINING ASSESSMENT SUMMARY

   Current Force Proficiency: Data pending
   Tasks Evaluated: 0
   Overall T/P Rate: N/A

2. PRIORITY TRAINING TASKS

   Priority 1 (Critical — Below 40% T/P):
   - No tasks currently below threshold

   Priority 2 (Significant — Below 60% T/P):
   - No tasks currently below threshold

   Priority 3 (Sustainment — Above 60% T/P):
   - All evaluated tasks meeting standard

3. T&EO GAP TASKS (No Formal T&EO Available)
   These tasks require training but lack standardized T&EO:
   - Coordinate with USACHCS for T&EO development
   - Use doctrinal references as interim assessment criteria

4. RECOMMENDED TRAINING CALENDAR

   Quarter 1:
   - Focus: Critical collective tasks at battalion level
   - Method: STX with internal evaluation

   Quarter 2:
   - Focus: Individual task proficiency (56A and 56M)
   - Method: Hands-on training with buddy evaluation

   Quarter 3:
   - Focus: Brigade-level coordination tasks
   - Method: CPX integrated with unit WFX

   Quarter 4:
   - Focus: Assessment and certification
   - Method: External evaluation at CTC rotation

5. RESOURCE REQUIREMENTS
   - Training time: 40 hours per quarter
   - Facilities: Chapel, field site, CP mock-up
   - Personnel: OC/T support for external evaluation

============================================================
NOTE: This is a SAMPLE training plan. Configure
ANTHROPIC_API_KEY for AI-generated content based on
actual readiness data.
============================================================`;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        content: SAMPLE_TRAINING_PLAN,
        source: "sample",
        message: "ANTHROPIC_API_KEY not configured. Returning sample training plan.",
      });
    }

    const prompt = `You are a military training officer for the Army Chaplain Corps.

Generate a unit training plan that prioritizes tasks based on readiness data.
Include:
1. Training assessment summary
2. Priority training tasks ranked by proficiency gap
3. T&EO gap tasks that need standards development
4. Recommended quarterly training calendar
5. Resource requirements

Use formal military writing style. Be specific about tasks, echelons, and training methods.
Reference FM 7-0, AR 350-1, and FORSCOM BFT MOI for training guidance.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 3000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      return NextResponse.json({
        content: SAMPLE_TRAINING_PLAN,
        source: "sample",
        message: "AI generation failed. Returning sample.",
      });
    }

    const data = await response.json();
    const content = data.content?.[0]?.text ?? SAMPLE_TRAINING_PLAN;
    return NextResponse.json({ content, source: "ai" });
  } catch (error) {
    console.error("Training plan generation error:", error);
    return NextResponse.json({
      content: SAMPLE_TRAINING_PLAN,
      source: "sample",
    });
  }
}
