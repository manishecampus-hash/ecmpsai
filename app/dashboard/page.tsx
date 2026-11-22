"use client";

import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";
import WelcomeBanner from "./components/welcome-banner";
import Recommendations from "./components/recommendations";
import SpinWheelModal from "./components/spin-wheel/spin-wheel-modal";
import ResumeScanScreen from "./components/resume-scan/resume-scan-screen";
import type { SpinWheelReward } from "./components/spin-wheel/data";
import type { StudentProfile } from "./types";

export default function DashboardPage() {
  // Start empty on both the server and the first browser render (reading localStorage here made the two differ —
  // a hydration error on the avatar letter and the reward chip); the mount effect below fills these in.
  const [student, setStudent] = useState<StudentProfile>({});
  const [wonReward, setWonReward] = useState<SpinWheelReward | null>(null);
  // True if user already completed or skipped the spin before this session
  const [hasCompletedSpinPrior, setHasCompletedSpinPrior] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [spinWheelOpen, setSpinWheelOpen] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  useEffect(() => {
    let openTimer: NodeJS.Timeout | null = null;
    let isCancelled = false;

    // 1. Read existing local student record
    const saved = localStorage.getItem("ecampus_student");
    let parsed: StudentProfile = {};
    if (saved) {
      try {
        parsed = JSON.parse(saved);
        setStudent(parsed);
        if (parsed.spinReward) {
          setWonReward(parsed.spinReward);
        }
      } catch {}
    }

    const alreadySpunLocally = Boolean(parsed.spinReward || parsed.spinSkipped);
    if (alreadySpunLocally) {
      setHasCompletedSpinPrior(true);
      setSpinWheelOpen(false);
      return;
    }

    // 2. Query database collection (/api/auth/me) BEFORE scheduling wheel popup
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (isCancelled) return;

        if (data?.authenticated && data?.user) {
          const u = data.user;
          const userReward = u.spinReward || null;
          const userSkipped = Boolean(u.spinSkipped);

          if (userReward) {
            setWonReward(userReward);
          }

          // If database collection shows user has already spun or skipped, HIDE IT COMPLETELY
          if (userReward || userSkipped) {
            setHasCompletedSpinPrior(true);
            setSpinWheelOpen(false);
          } else {
            // First time user who has never spun: open the welcome spin wheel
            openTimer = setTimeout(() => {
              if (!isCancelled) {
                setSpinWheelOpen(true);
              }
            }, 600);
          }

          setStudent((prev) => {
            const nextStudent: StudentProfile = {
              ...prev,
              name: u.full_name || prev.name,
              email: u.email || prev.email,
              phone: u.phone_e164 || prev.phone,
              state: u.state || prev.state,
              course: u.course || prev.course,
              coursesInterested: u.coursesInterested || prev.coursesInterested,
              advisorProfile: u.advisorProfile || prev.advisorProfile,
              spinReward: userReward || prev.spinReward,
              spinSkipped: userSkipped || prev.spinSkipped,
            };
            localStorage.setItem("ecampus_student", JSON.stringify(nextStudent));
            return nextStudent;
          });
        } else {
          // Guest view without prior spin record
          if (!alreadySpunLocally) {
            openTimer = setTimeout(() => {
              if (!isCancelled) {
                setSpinWheelOpen(true);
              }
            }, 600);
          }
        }
      })
      .catch(() => {
        if (!isCancelled && !alreadySpunLocally) {
          openTimer = setTimeout(() => {
            if (!isCancelled) {
              setSpinWheelOpen(true);
            }
          }, 800);
        }
      });

    return () => {
      isCancelled = true;
      if (openTimer) clearTimeout(openTimer);
    };
  }, []);

  // Keep the banner's profile progress in sync if the profile is edited in another tab
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "ecampus_student" && e.newValue) {
        try {
          const updated = JSON.parse(e.newValue);
          setStudent(updated);
          if (updated.spinReward) {
            setWonReward(updated.spinReward);
            setHasCompletedSpinPrior(true);
          }
          if (updated.spinSkipped) {
            setHasCompletedSpinPrior(true);
          }
        } catch {}
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Save the win immediately to localStorage and persist to database (users collection)
  const handleRewardWon = async (reward: SpinWheelReward) => {
    setWonReward(reward);
    const raw = localStorage.getItem("ecampus_student");
    const current: StudentProfile = raw ? JSON.parse(raw) : {};
    const next: StudentProfile = { ...current, spinReward: reward, spinSkipped: false };
    localStorage.setItem("ecampus_student", JSON.stringify(next));
    setStudent(next);

    try {
      await fetch("/api/auth/spin-reward", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reward,
          phone: current.phone,
          email: current.email,
          userId: current.id,
        }),
      });
    } catch (err) {
      console.error("Failed to store spin reward in collection:", err);
    }
  };

  // User skipped spinning via cross icon or skip button — persist to collection and prevent re-appearance
  const handleSkipSpin = async () => {
    setSpinWheelOpen(false);
    setHasCompletedSpinPrior(true);
    const raw = localStorage.getItem("ecampus_student");
    const current: StudentProfile = raw ? JSON.parse(raw) : {};
    const next: StudentProfile = { ...current, spinSkipped: true };
    localStorage.setItem("ecampus_student", JSON.stringify(next));
    setStudent(next);

    try {
      await fetch("/api/auth/spin-reward", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skipped: true,
          phone: current.phone,
          email: current.email,
          userId: current.id,
        }),
      });
    } catch (err) {
      console.error("Failed to store spin skip in collection:", err);
    }
  };

  const handleCloseModal = () => {
    setSpinWheelOpen(false);
    if (wonReward || student.spinReward || student.spinSkipped) {
      setHasCompletedSpinPrior(true);
    }
  };

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
          {/* "Scholarship Reward Unlocked" banner, Milestones and KPI cards removed from the overview.
              The won code is still shown in the top bar. */}
          <WelcomeBanner student={student} onResumeSelected={setResumeFile} />
          <Recommendations student={student} />
        </main>
      </div>

      {/* The spin wheel modal is completely HIDDEN for users who have already spun */}
      {!hasCompletedSpinPrior && (
        <SpinWheelModal
          isOpen={spinWheelOpen}
          onClose={handleCloseModal}
          onRewardWon={handleRewardWon}
          onSkip={handleSkipSpin}
        />
      )}

      <ResumeScanScreen file={resumeFile} onClose={() => setResumeFile(null)} />
    </div>
  );
}
