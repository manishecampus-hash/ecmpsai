import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { ECAMPUS_SEARCH_PROMPT } from "@/lib/system-prompt";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.trim();

    // ── Input validation ──────────────────────────────────────────
    if (!query) {
      return NextResponse.json(
        { error: "Query parameter 'q' is required." },
        { status: 400 },
      );
    }

    if (query.length > 300) {
      return NextResponse.json(
        { error: "Query too long. Max 300 characters." },
        { status: 400 },
      );
    }

    // ── Config guard ──────────────────────────────────────────────
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not set.");
      return NextResponse.json(
        { error: "Service misconfigured." },
        { status: 503 },
      );
    }

    // Instantiate client dynamically inside the request handler to avoid build crashes
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // ── OpenAI call ───────────────────────────────────────────────
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: ECAMPUS_SEARCH_PROMPT,
        },
        {
          role: "user",
          // Append a reminder so the model never asks for clarification
          content: `${query}\n\n[Important: Answer this directly. Do not ask for clarification.]`,
        },
      ],
      max_tokens: 800,
      temperature: 0.4,
    });

    const content = response.choices[0]?.message?.content ?? "";

    // ── Response with cache headers ───────────────────────────────
    return NextResponse.json(
      { result: content },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
        },
      },
    );
  } catch (error: unknown) {
    // ── Typed OpenAI error handling ───────────────────────────────
    if (error instanceof OpenAI.APIError) {
      console.error(`OpenAI API error ${error.status}: ${error.message}`);

      if (error.status === 429) {
        return NextResponse.json(
          { error: "Rate limit reached. Please try again shortly." },
          { status: 429 },
        );
      }

      return NextResponse.json(
        { error: "AI service error. Please try again." },
        { status: 502 },
      );
    }

    console.error("Unexpected search error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
