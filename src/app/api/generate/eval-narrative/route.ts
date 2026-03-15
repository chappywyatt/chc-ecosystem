import { NextRequest, NextResponse } from "next/server";

const SAMPLE = `EVALUATION NARRATIVE — FOUR-PILLAR FRAMEWORK

CHARACTER:
- Demonstrates unwavering personal integrity and spiritual depth that models the Army Ethic for all Soldiers
- Consistently exemplifies Army Values in garrison and field environments, earning trust at every echelon
- Maintains an active devotional life that sustains ministry effectiveness through high-OPTEMPO periods

COMPETENCE:
- Delivers doctrinally sound worship services adapted to tactical environments with minimal preparation time
- Provides timely, accurate staff products including the RS Annex that enhance commander decision-making
- Conducts pastoral counseling resulting in measurable improvement in unit spiritual fitness indicators

CONNECTION:
- Maintains exceptional visibility across the formation, consistently present in motor pools, ranges, and training areas
- Soldiers at all ranks seek counsel freely, demonstrating the high trust and approachability essential to effective ministry
- Represents the Chaplain Corps with distinction in joint and interagency engagements

CONSTITUTIONAL FIDELITY:
- Ensures equitable religious support for all faith groups including minority traditions requiring external coordination
- Proactively identifies and resolves schedule conflicts with religious observance requirements

[Sample — configure ANTHROPIC_API_KEY for AI-generated narratives from actual observation data]`;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ content: SAMPLE, source: "sample" });
    }

    const body = await request.json().catch(() => ({}));

    const prompt = `Generate a four-pillar evaluation narrative for an Army chaplain per AR 623-3.
Organize by Character, Competence, Connection, and Constitutional Fidelity.
Use specific behavioral bullet comments. Each bullet should reference observable actions.
${body.subjectData ? `Subject data: ${JSON.stringify(body.subjectData)}` : ""}`;

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

    if (!response.ok) return NextResponse.json({ content: SAMPLE, source: "sample" });
    const data = await response.json();
    return NextResponse.json({ content: data.content?.[0]?.text ?? SAMPLE, source: "ai" });
  } catch {
    return NextResponse.json({ content: SAMPLE, source: "sample" });
  }
}
