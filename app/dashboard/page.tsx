"use client";

import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";
import WelcomeBanner from "./components/welcome-banner";
import StatsCards from "./components/stats-cards";
import Recommendations from "./components/recommendations";
import Milestones from "./components/milestones";
import type { StudentProfile } from "./types";

export default function DashboardPage() {
  const [student, setStudent] = useState<StudentProfile>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ecampus_student");
    if (saved) setStudent(JSON.parse(saved));
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f9fafb]">
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar
          student={student}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="flex min-w-0 flex-1 flex-col gap-5 overflow-y-auto p-4 sm:p-6">
          <WelcomeBanner student={student} />
          <StatsCards />
          <Recommendations />
          <Milestones />
        </main>
      </div>
    </div>
  );
}
