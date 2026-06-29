import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextRequest } from "next/server";
import { ECAMPUS_CHAT_PROMPT } from "@/lib/system-prompt";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "OPENAI_API_KEY not configured" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const body = await req.json();
    const messages = body?.messages as
      | { role: "user" | "assistant"; content: string }[]
      | undefined;
    const query = body?.query?.trim();

    if (!query) {
      return new Response(JSON.stringify({ error: "Query is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = streamText({
      model: openai(process.env.OPENAI_MODEL || "gpt-4o-mini"),
      system: ECAMPUS_CHAT_PROMPT,
      messages: messages ?? [{ role: "user", content: query }],
      maxOutputTokens: 2000,
      temperature: 0.5,
    });

    // ✅ REPLACE result.toTextStreamResponse() WITH THIS:
    return result.toTextStreamResponse({
      headers: {
        "X-Accel-Buffering": "no",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("AI chat error:", error);
    return new Response(
      JSON.stringify({ error: "AI answer failed. Please try again." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
