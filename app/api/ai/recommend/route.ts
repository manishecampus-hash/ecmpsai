import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextResponse } from "next/server";
import { ECAMPUS_RECOMMEND_PROMPT } from "@/lib/system-prompt";

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY not configured" },
      { status: 500 },
    );
  }

  const body = await req.json();
  const { goal, budget, education, experience } = body;

  const result = await generateText({
    model: openai("gpt-4o-mini"),
    system: ECAMPUS_RECOMMEND_PROMPT,
    prompt: `
Student Goal: ${goal}
Budget: ${budget}
Education: ${education}
Experience: ${experience}

Respond in valid JSON only:
{
  "recommendedDegrees": ["MBA", "MCA"],
  "careerPath": ["Role1", "Role2", "Role3"],
  "salaryGrowth": "₹4L → ₹12L",
  "reasoning": "Short explanation in 2 lines",
  "topUniversities": ["Amity", "LPU"]
}
`,
  });

  const data = JSON.parse(result.text);
  return NextResponse.json(data);
}
