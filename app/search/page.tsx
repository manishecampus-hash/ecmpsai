// app/search/page.tsx
"use client";

import { Suspense } from "react";
import AiChat from "./components/ai-chat";
import { Loader2 } from "lucide-react";

// ChatGPT-style AI chat — the chat itself lives in ./components/ai-chat so the
// dashboard's My Chat can reuse it.
export default function SearchResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
        </div>
      }
    >
      <AiChat />
    </Suspense>
  );
}
