"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export function FloatingAI() {
  return (
    <Link
      href="/search?q=ai"
      className="hidden md:flex fixed bottom-8 right-8 z-50 items-center gap-2 px-5 py-3 rounded-full text-white font-semibold text-sm shadow-2xl shadow-indigo-500/30 transition-all hover:scale-105 hover:shadow-indigo-500/50"
      style={{
        background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
      }}
    >
      <Sparkles className="w-4 h-4 animate-pulse" />
      Ask eCampus AI
    </Link>
  );
}
