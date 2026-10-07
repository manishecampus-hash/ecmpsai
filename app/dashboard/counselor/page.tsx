"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import CounselorPanel from "../components/counselor-panel";
import type { StudentProfile } from "../types";

export default function CounselorPage() {
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

        {/* Extra bottom padding keeps the chat's Send button clear of the floating WhatsApp button */}
        <main className="flex min-w-0 flex-1 flex-col overflow-y-auto p-4 pb-28 sm:p-6 sm:pb-24">
          <div className="mb-5">
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">AI Counselor Sara</h1>
            <p className="mt-1 text-sm text-gray-500">
              Chat with Sara about programs, fees, scholarships and admissions.
            </p>
          </div>

          {/* Chat fills the remaining height */}
          <div className="mx-auto flex min-h-[480px] w-full max-w-4xl flex-1">
            <div className="w-full">
              <CounselorPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
