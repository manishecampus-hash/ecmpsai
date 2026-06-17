import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextRequest } from "next/server";
import { ECAMPUS_CHAT_PROMPT } from "@/lib/system-prompt";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({
          error: "OPENAI_API_KEY not configured",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const body = await req.json();
    const messages = body?.messages as
      | { role: "user" | "assistant"; content: string }[]
      | undefined;
    const query = body?.query?.trim();

    if (!query) {
      return new Response(
        JSON.stringify({
          error: "Query is required",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const result = streamText({
      model: openai(process.env.OPENAI_MODEL || "gpt-4o-mini"),

      system: ECAMPUS_CHAT_PROMPT,

      // prompt: query,
      messages: messages ?? [{ role: "user", content: query }],
      maxOutputTokens: 2000,

      temperature: 0.5,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("AI chat error:", error);

    return new Response(
      JSON.stringify({
        error: "AI answer failed. Please try again.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
