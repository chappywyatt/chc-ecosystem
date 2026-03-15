import { NextRequest, NextResponse } from "next/server";

const SAMPLE = `RELIGIOUS SUPPORT COMMANDER'S BRIEF

CLASSIFICATION: UNCLASSIFIED

BLUF: The UMT is postured to support all phases of the upcoming operation.
Two readiness concerns require command attention.

1. UMT STATUS
   - Chaplains: 3/3 present for duty (100% fill)
   - RAS: 2/3 present (1 TDY to CHBOLC, returns 15 APR)
   - Equipment: Green — all UMT sets complete

2. WORSHIP & MINISTRY
   - Weekly attendance: 127 (avg over past month)
   - Counseling sessions this quarter: 43
   - Crisis interventions: 2 (both resolved, follow-up ongoing)

3. TRAINING READINESS
   - Tasks trained to standard: 8/12 (67%)
   - Priority training needed: CP Integration (16-BN-3802), MASCAL RS (16-BN-3807)
   - Next external evaluation: CTC Rotation 26-04

4. CONCERNS REQUIRING COMMAND ATTENTION
   a. Ramadan support: 4 Muslim Soldiers require meal schedule accommodation
      (20 MAR - 18 APR). Coordinating with DFAC.
   b. Memorial ceremony preparation: Recommend rehearsal NLT 48 hrs prior
      to any anticipated requirement.

5. UPCOMING RS EVENTS
   - Easter services: 20 APR (coordinate release time)
   - Strong Bonds event: 26-27 APR (12 couples registered)
   - Pre-deployment spiritual readiness training: 05 MAY

RECOMMENDATION: Approve modified meal schedule for Ramadan observance;
allocate training time for MASCAL RS rehearsal.

[Sample — configure ANTHROPIC_API_KEY for AI-generated briefs from actual ecosystem data]`;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return NextResponse.json({ content: SAMPLE, source: "sample" });

    const body = await request.json().catch(() => ({}));
    const prompt = `Generate a Commander's RS Brief in military briefing format per FM 6-0.
Include: BLUF, UMT Status, Worship & Ministry metrics, Training Readiness,
Concerns Requiring Command Attention, Upcoming RS Events, and Recommendation.
${body.orgData ? `Organization data: ${JSON.stringify(body.orgData)}` : ""}`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 3000, messages: [{ role: "user", content: prompt }] }),
    });

    if (!response.ok) return NextResponse.json({ content: SAMPLE, source: "sample" });
    const data = await response.json();
    return NextResponse.json({ content: data.content?.[0]?.text ?? SAMPLE, source: "ai" });
  } catch {
    return NextResponse.json({ content: SAMPLE, source: "sample" });
  }
}
