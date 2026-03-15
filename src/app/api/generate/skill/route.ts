import { NextRequest, NextResponse } from "next/server";
import { SKILLS, SAMPLE_RESPONSES } from "@/lib/data/skill-definitions";

export async function POST(request: NextRequest) {
  try {
    const { skillId, userMessage } = await request.json();

    const skill = SKILLS.find((s) => s.id === skillId);
    if (!skill) {
      return NextResponse.json({ error: "Unknown skill" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      const sample = SAMPLE_RESPONSES[skillId] || SAMPLE_RESPONSES["default"] || "";
      return NextResponse.json({
        content: sample,
        source: "sample",
      });
    }

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
        system: skill.systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!response.ok) {
      const sample = SAMPLE_RESPONSES[skillId] || SAMPLE_RESPONSES["default"] || "";
      return NextResponse.json({ content: sample, source: "sample" });
    }

    const data = await response.json();
    return NextResponse.json({
      content: data.content?.[0]?.text ?? "No response generated.",
      source: "ai",
    });
  } catch (error) {
    console.error("Skill generation error:", error);
    return NextResponse.json({
      content: SAMPLE_RESPONSES["default"],
      source: "sample",
    });
  }
}
