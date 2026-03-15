import { NextRequest, NextResponse } from "next/server";

const SAMPLE = `INDIVIDUAL DEVELOPMENT PLAN (CHAP-T.A.L.K.S. FORMAT)

STRENGTHS TO MAXIMIZE:
1. Pastoral care and crisis counseling — consistently rated above standard
2. Worship leadership — adapts effectively to field and garrison environments
3. Character and authenticity — models spiritual resilience for the formation

NEEDS TO MITIGATE:
1. Staff writing and MDMP integration
2. Multi-echelon coordination during exercises
3. Confidence in senior-leader briefings

PROFESSIONAL GOAL 1:
What: Improve RS Annex writing to standard
Why: Required competency for brigade-level assignment readiness
How: Shadow BDE UMT during next CPX; complete staff writing course
When: NLT end of Q3 FY26
Support: BDE chaplain mentorship; access to example annexes

PROFESSIONAL GOAL 2:
What: Develop MDMP facilitation skills
Why: Full participation in planning process enhances RS integration
How: Lead RS input for next OPORD; attend planning workshop
When: Next FTX cycle
Support: S3 planning cell inclusion; mentor feedback

PERSONAL GOAL 1:
What: Establish sustainable self-care routine
Why: Prevent burnout during upcoming deployment cycle
How: Weekly peer accountability, quarterly retreat
When: Begin immediately, sustain through deployment
Support: Peer chaplain partnership; retreat funding

FOLLOW-UP SCHEDULE:
- 1-Day Follow-up: Confirm understanding and commitment
- 1-Week Follow-up: Review initial progress on Goal 1
- 1-Month Follow-up: Comprehensive progress review

[Sample — configure ANTHROPIC_API_KEY for AI-generated IDPs from actual assessment data]`;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return NextResponse.json({ content: SAMPLE, source: "sample" });

    const body = await request.json().catch(() => ({}));
    const prompt = `Generate an Individual Development Plan using the CHAP-T.A.L.K.S. format.
Include: Strengths to Maximize, Needs to Mitigate, 2-3 Professional Goals (What/Why/How/When/Support),
1-2 Personal Goals, and Follow-up Schedule.
${body.assessmentData ? `Assessment data: ${JSON.stringify(body.assessmentData)}` : ""}`;

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
