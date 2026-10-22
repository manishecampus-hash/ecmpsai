"use client";

import { useEffect, useState } from "react";
import { ClipboardCheck, Gift, Landmark, Zap } from "lucide-react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import AiChat, { type ChatSuggestion } from "../../search/components/ai-chat";
import type { StudentProfile } from "../types";

const COUNSELOR_SUGGESTIONS: ChatSuggestion[] = [
  { icon: Zap, text: "Compare MBA vs MCA ROI" },
  { icon: Landmark, text: "Find NAAC A++ Colleges" },
  { icon: ClipboardCheck, text: "Check EMI options" },
  { icon: Gift, text: "Which scholarships can I apply for?" },
];

const liveBadge = (
  <span className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-600">
    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
    Live
  </span>
);

export default function MyChatPage() {
  const [student, setStudent] = useState<StudentProfile>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ecampus_student");
    if (saved) setStudent(JSON.parse(saved));
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f9fafb]">
      <Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar student={student} onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Same chat as /search — history, streaming answers and saved threads — as the student's "My Chat" */}
        <main className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
          <AiChat
            embedded
            title="My Chat"
            titleBadge={liveBadge}
            subtitle="Ask about programs, fees, scholarships and admissions."
            placeholder="Ask anything about college..."
            suggestions={COUNSELOR_SUGGESTIONS}
          />
        </main>
      </div>
    </div>
  );
}
