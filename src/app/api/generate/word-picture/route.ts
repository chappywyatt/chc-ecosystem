import { NextRequest, NextResponse } from "next/server";

const SAMPLE_WORD_PICTURE = `BEHAVIORAL WORD PICTURE — COMPREHENSIVE NARRATIVE
============================================================

OVERALL ASSESSMENT:
This individual demonstrates consistent performance across the four
pillars of chaplain leadership. Behavioral observations indicate
strength in ministry competencies with development opportunities
in staff-level military skills.

CHARACTER:
Maintains a visible, authentic faith life that models spiritual
resilience for Soldiers and families. Demonstrates strong Army
Values integration, consistently holding self and others accountable
to ethical standards. Empathetic listening is a notable strength,
with Soldiers reporting high comfort levels in seeking counsel.
Development area: Administrative discipline in meeting report
deadlines needs focused attention.

COMPETENCE:
Ministry skills (preaching, teaching, counseling) are consistently
rated above standard, with particular strength in pastoral care
during crisis situations. Field worship services are well-organized
and adapted to tactical conditions. Staffing skills show growth
potential — recommend focused mentorship on MDMP integration and
Religious Support Annex development.

CONNECTION:
High visibility in unit areas with consistent presence during
training events and critical periods. Soldiers at all ranks
report easy access to the UMT. Professional bearing and confidence
in staff settings are developing — recommend increased participation
in command-level briefings to build confidence.

RECOMMENDATION:
Continue leveraging ministry strengths while deliberately developing
military staff competencies. IDP should focus on MDMP participation,
staff writing, and confidence in senior-leader engagements.

============================================================
NOTE: This is a SAMPLE word picture. Configure ANTHROPIC_API_KEY
for AI-generated narratives based on actual observation data.
============================================================`;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        content: SAMPLE_WORD_PICTURE,
        source: "sample",
        message: "ANTHROPIC_API_KEY not configured. Returning sample word picture.",
      });
    }

    const body = await request.json().catch(() => ({}));

    const prompt = `You are a senior Army chaplain writing a behavioral word picture for a subordinate chaplain's evaluation support.

Generate a comprehensive word picture narrative organized by the four pillars:
- CHARACTER (Spirituality, Humility, Authenticity, Army Values, Empathy, Discipline)
- COMPETENCE (Preaching, Teaching, Counseling/Care, Soldiering, Staffing, Leading)
- CONNECTION (Visibility, Affability, Accessibility, Bearing, Confidence, Resilience)
- CONSTITUTIONAL FIDELITY (Plurality, Equality of Access, Freedom OF/FROM Religion)

${body.observationData ? `Based on this observation data: ${JSON.stringify(body.observationData)}` : "Generate a representative example."}

Use specific behavioral language. Identify strengths and development needs.
Include a recommendation section. Write in third person.
The narrative should be suitable for a CHAP-T.A.L.K.S. counseling session.`;

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
        content: SAMPLE_WORD_PICTURE,
        source: "sample",
        message: "AI generation failed. Returning sample.",
      });
    }

    const data = await response.json();
    const content = data.content?.[0]?.text ?? SAMPLE_WORD_PICTURE;
    return NextResponse.json({ content, source: "ai" });
  } catch (error) {
    console.error("Word picture generation error:", error);
    return NextResponse.json({
      content: SAMPLE_WORD_PICTURE,
      source: "sample",
    });
  }
}
