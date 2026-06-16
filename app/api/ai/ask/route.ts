import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextResponse } from "next/server";
import { ECAMPUS_ASK_PROMPT } from "@/lib/system-prompt";

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY not configured" },
        { status: 500 },
      );
    }

    const { query } = await req.json();

    if (!query?.trim()) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 },
      );
    }

    const result = await generateText({
      model: openai(process.env.OPENAI_MODEL || "gpt-4o-mini"),
      system: ECAMPUS_ASK_PROMPT,
      prompt: `User asked: ${query}`,
    });

    return NextResponse.json({ answer: result.text });
  } catch (error) {
    console.error("AI ask error:", error);

    return NextResponse.json(
      { error: "AI answer failed. Please try again." },
      { status: 500 },
    );
  }
}
