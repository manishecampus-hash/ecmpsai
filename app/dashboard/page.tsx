"use client";

import { useEffect, useState } from "react";
import { Gift, Copy, Check } from "lucide-react";
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
  // Synchronous initialization from localStorage so initial render immediately knows if user already spun
  const [student, setStudent] = useState<StudentProfile>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem("ecampus_student");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [wonReward, setWonReward] = useState<SpinWheelReward | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const saved = localStorage.getItem("ecampus_student");
      const parsed = saved ? JSON.parse(saved) : null;
      return parsed?.spinReward || null;
    } catch {
      return null;
    }
  });

  // True if user already completed or skipped the spin before this session
  const [hasCompletedSpinPrior, setHasCompletedSpinPrior] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      const saved = localStorage.getItem("ecampus_student");
      const parsed = saved ? JSON.parse(saved) : null;
      return Boolean(parsed?.spinReward || parsed?.spinSkipped);
    } catch {
      return false;
    }
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [spinWheelOpen, setSpinWheelOpen] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [bannerCopied, setBannerCopied] = useState(false);

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

  const handleCopyRewardBanner = async () => {
    if (!wonReward) return;
    try {
      await navigator.clipboard.writeText(wonReward.couponCode);
      setBannerCopied(true);
      setTimeout(() => setBannerCopied(false), 2000);
    } catch {}
  };

  const isUserCompletedSpin = Boolean(
    hasCompletedSpinPrior || wonReward || student.spinReward || student.spinSkipped
  );

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
          {/* Active Scholarship Reward Banner — displays whenever user logs in if reward is won */}
          {wonReward && (
            <div className="relative overflow-hidden rounded-2xl border border-red-200 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 p-4 text-white shadow-md sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm ring-1 ring-white/30">
                    <Gift className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-red-100">
                        Scholarship Reward Unlocked
                      </span>
                      <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white">
                        100% Verified
                      </span>
                    </div>
                    <p className="mt-0.5 text-base font-bold sm:text-lg">
                      You won a <span className="underline decoration-white/40">{wonReward.label}</span> scholarship discount!
                    </p>
                    <p className="text-xs text-red-100">
                      Apply code during university admission checkout or share with your academic advisor.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 self-start sm:self-center">
                  <div className="flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-3.5 py-2 backdrop-blur-sm">
                    <span className="text-xs font-medium text-red-100">Code:</span>
                    <span className="font-mono text-base font-extrabold tracking-wider text-white">
                      {wonReward.couponCode}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyRewardBanner}
                    className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-white px-3.5 text-xs font-bold text-red-600 shadow-sm transition hover:bg-red-50 active:scale-95"
                  >
                    {bannerCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span>{bannerCopied ? "Copied" : "Copy Code"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          <WelcomeBanner student={student} onResumeSelected={setResumeFile} />
          <StatsCards />
          <Recommendations student={student} />
          <Milestones />
        </main>
      </div>

      {/* The gift launcher is completely HIDDEN for users who have already spun or skipped */}
      {!isUserCompletedSpin && (
        <GiftFab onClick={() => setSpinWheelOpen(true)} />
      )}

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
