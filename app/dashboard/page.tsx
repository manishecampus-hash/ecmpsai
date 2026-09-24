"use client";

import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";
import WelcomeBanner from "./components/welcome-banner";
import StatsCards from "./components/stats-cards";
import Recommendations from "./components/recommendations";
import Milestones from "./components/milestones";
import SpinWheelModal from "./components/spin-wheel/spin-wheel-modal";
import GiftFab from "./components/spin-wheel/gift-fab";
import ResumeScanScreen from "./components/resume-scan/resume-scan-screen";
import type { SpinWheelReward } from "./components/spin-wheel/data";
import type { StudentProfile } from "./types";

export default function DashboardPage() {
  const [student, setStudent] = useState<StudentProfile>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [spinWheelOpen, setSpinWheelOpen] = useState(false);
  const [wonReward, setWonReward] = useState<SpinWheelReward | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

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
          wonReward={wonReward}
        />

        <main className="flex min-w-0 flex-1 flex-col gap-5 overflow-y-auto p-4 sm:p-6">
          <WelcomeBanner student={student} onResumeSelected={setResumeFile} />
          <StatsCards />
          <Recommendations />
          <Milestones />
        </main>
      </div>

      <GiftFab onClick={() => setSpinWheelOpen(true)} />

      <SpinWheelModal
        isOpen={spinWheelOpen}
        onClose={() => setSpinWheelOpen(false)}
        onRewardWon={setWonReward}
      />

      <ResumeScanScreen file={resumeFile} onClose={() => setResumeFile(null)} />
    </div>
  );
}
