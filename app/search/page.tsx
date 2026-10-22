// app/search/page.tsx
"use client";

import AiChat from "./components/ai-chat";

// ChatGPT-style AI chat — the chat itself lives in ./components/ai-chat so the
// dashboard's My Chat can reuse it.
export default function SearchResultsPage() {
  return <AiChat />;
}
