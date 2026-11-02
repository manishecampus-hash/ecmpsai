"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import type { StudentProfile } from "../types";
import ProfileProgress from "../components/profile-progress";
import { describeAdvisorProfile, getCourseOptions, type QualificationId } from "@/components/layout/onboarding-options";
import { AIAdvisorModal, type AdvisorAnswers } from "@/components/layout/ai-advisor-modal";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  EASE_OUT,
  backdropMotion,
  collapse,
  dialogMotion,
  fadeUp,
  staggerContainer,
  staggerItem,
} from "../components/motion";
import {
  Camera,
  Check,
  Mail,
  Phone,
  CalendarDays,
  Calendar,
  BadgeCheck,
  MapPin,
  Target,
  Compass,
  Layers,
  IndianRupee,
  FileCheck2,
  Wallet,
  Sparkles,
  Settings,
  GraduationCap,
  Award,
  Lock,
  CheckCircle2,
  ShieldAlert,
  Loader2,
  X,
  Pencil,
  RotateCw,
  ArrowRight,
} from "lucide-react";

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={staggerItem}
      className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
    >
      <h2 className="text-base font-bold text-gray-900">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
      <div className="mt-4">{children}</div>
    </motion.div>
  );
}

// Icon per answer row on the "Academic & Career Goals" card
const ADVISOR_ROW_ICONS: Record<string, typeof Target> = {
  qualification: GraduationCap,
  course: Layers,
  budget: IndianRupee,
  salary: Wallet,
  category: Award,
  goal: Target,
  focus: Compass,
  format: Layers,
};

// Tile columns for the goals card, by number of answers (full class names so Tailwind keeps them)
const GOAL_GRID_COLS: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 xl:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
};

export default function ProfilePage() {
  const [student, setStudent] = useState<StudentProfile>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [editing, setEditing] = useState(false);
  const [formName, setFormName] = useState("");
  const [formState, setFormState] = useState("");
  const [formDob, setFormDob] = useState("");
  const [savedFlash, setSavedFlash] = useState(false);
  const [savedFlashMessage, setSavedFlashMessage] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Questionnaire / AI Advisor modal state
  const [advisorModalOpen, setAdvisorModalOpen] = useState(false);
  const [advisorModalStep, setAdvisorModalStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Email Change & Re-verification modal state
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailModalStep, setEmailModalStep] = useState<"input" | "otp" | "success">("input");
  const [targetEmail, setTargetEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailCooldown, setEmailCooldown] = useState(0);

  // Load student profile & sync with backend /api/auth/me
  useEffect(() => {
    const saved = localStorage.getItem("ecampus_student");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setStudent(parsed);
        setFormName(parsed.name || "");
        setFormState(parsed.state || "");
        setFormDob(parsed.dob || "");
      } catch (err) {
        console.error("Failed to parse saved student data:", err);
      }
    }

    // Always fetch latest account verification status from database
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setStudent((prev) => {
            const updated: StudentProfile = {
              ...prev,
              name: data.user.full_name || prev.name,
              email: data.user.email || prev.email,
              email_verified_at: data.user.email_verified_at,
              phone: data.user.phone_e164 || prev.phone,
              phone_verified_at: data.user.phone_verified_at,
              state: data.user.state || prev.state,
              dob: data.user.dob || prev.dob,
              course: data.user.course || prev.course,
              advisorProfile: data.user.advisorProfile || prev.advisorProfile,
            };
            localStorage.setItem("ecampus_student", JSON.stringify(updated));
            return updated;
          });
          if (data.user.full_name) setFormName(data.user.full_name);
          if (data.user.state) setFormState(data.user.state);
          if (data.user.dob) setFormDob(data.user.dob);
        }
      })
      .catch(() => {});
  }, []);

  // Cooldown countdown timer for OTP resend
  useEffect(() => {
    if (emailCooldown <= 0) return;
    const interval = setInterval(() => {
      setEmailCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [emailCooldown]);

  const goalRows = describeAdvisorProfile(student.advisorProfile).map((row) => ({
    ...row,
    icon: ADVISOR_ROW_ICONS[row.key] ?? Target,
  }));

  const displayName = student.name?.trim() || "Student";
  const initial = displayName.charAt(0).toUpperCase();

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    const updatedStudent: StudentProfile = {
      ...student,
      name: formName.trim(),
      state: formState.trim() || undefined,
      dob: formDob.trim() || undefined,
    };

    try {
      await fetch("/api/auth/register-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName.trim(),
          state: formState.trim() || "",
          dob: formDob.trim() || "",
          phone: student.phone,
        }),
      });
    } catch (saveErr) {
      console.error("Failed to persist profile details to backend:", saveErr);
    } finally {
      setSavingProfile(false);
    }

    setStudent(updatedStudent);
    localStorage.setItem("ecampus_student", JSON.stringify(updatedStudent));
    window.dispatchEvent(new Event("ecampus-auth-change"));
    setEditing(false);
    setSavedFlashMessage("Profile updated successfully.");
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2500);
  };

  const openAdvisorModal = (targetStep: 1 | 2 | 3 | 4 | 5 = 1) => {
    setAdvisorModalStep(targetStep);
    setAdvisorModalOpen(true);
  };

  const handleUpdateAdvisorProfile = async (answers: AdvisorAnswers) => {
    setAdvisorModalOpen(false);

    const q = answers.highestQualification as QualificationId;
    const course = getCourseOptions(q).find((c) => c.id === answers.coursePreference);
    const courseName = course?.name || answers.coursePreference || student.course;

    const updatedStudent: StudentProfile = {
      ...student,
      advisorProfile: answers,
      course: courseName,
      coursesInterested: courseName ? [courseName] : student.coursesInterested,
    };

    setStudent(updatedStudent);
    localStorage.setItem("ecampus_student", JSON.stringify(updatedStudent));
    window.dispatchEvent(new Event("ecampus-auth-change"));

    try {
      await fetch("/api/auth/register-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: student.name?.trim() || "Student",
          phone: student.phone,
          email: student.email,
          state: student.state,
          advisorProfile: answers,
          course: courseName,
          coursesInterested: courseName ? [courseName] : student.coursesInterested,
        }),
      });
    } catch (saveErr) {
      console.error("Failed persisting updated advisor questions:", saveErr);
    }

    setSavedFlashMessage("Your questionnaire choices have been updated successfully.");
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 3000);
  };

  const handleCancelEdit = () => {
    setFormName(student.name || "");
    setFormState(student.state || "");
    setFormDob(student.dob || "");
    setEditing(false);
  };

  const openEmailModal = (initialEmail?: string) => {
    setTargetEmail(initialEmail || student.email || "");
    setOtpCode("");
    setEmailError("");
    setEmailModalStep("input");
    setEmailModalOpen(true);
  };

  const handleSendEmailOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setEmailError("");
    const clean = targetEmail.trim().toLowerCase();
    if (!clean || !/^\S+@\S+\.\S+$/.test(clean)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailLoading(true);
    try {
      const res = await fetch("/api/auth/email/change", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: clean }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || data.message || "Failed to send verification code.");
      }

      setChallengeId(data.challenge_id || "");
      setEmailCooldown(data.resend_cooldown || 30);
      setEmailModalStep("otp");
    } catch (err: any) {
      setEmailError(err.message || "Failed to send verification code. Please try again.");
    } finally {
      setEmailLoading(false);
    }
  };

  const handleVerifyEmailOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setEmailError("");
    const clean = targetEmail.trim().toLowerCase();
    const cleanOtp = otpCode.trim();
    if (!/^\d{6}$/.test(cleanOtp)) {
      setEmailError("Please enter the complete 6-digit verification code.");
      return;
    }

    setEmailLoading(true);
    try {
      const res = await fetch("/api/auth/email/change/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: clean,
          code: cleanOtp,
          challenge_id: challengeId,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || data.message || "Invalid or expired verification code.");
      }

      const updatedStudent: StudentProfile = {
        ...student,
        email: clean,
        email_verified_at: new Date().toISOString(),
      };
      setStudent(updatedStudent);
      localStorage.setItem("ecampus_student", JSON.stringify(updatedStudent));
      window.dispatchEvent(new Event("ecampus-auth-change"));

      setEmailModalStep("success");
      setTimeout(() => {
        setEmailModalOpen(false);
      }, 1800);
    } catch (err: any) {
      setEmailError(err.message || "Verification failed. Check the code and try again.");
    } finally {
      setEmailLoading(false);
    }
  };

  const isEmailVerified = Boolean(student.email && student.email_verified_at);

  return (
    <MotionConfig reducedMotion="user">
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

          <main className="flex min-w-0 flex-1 flex-col overflow-y-auto p-4 sm:p-6">
            <motion.div {...fadeUp(0)} className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  Profile
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Your personal, academic, and verification details. Mobile is your primary login identity.
                </p>
              </div>
              <Link
                href="/dashboard/settings"
                className="flex flex-shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-[0.97]"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </Link>
            </motion.div>

            <motion.div
              variants={staggerContainer(0.08, 0.06)}
              initial="enter"
              animate="center"
              className="w-full space-y-5"
            >
              <motion.div
                variants={staggerItem}
                className="rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 via-rose-50 to-white p-5 sm:p-6"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="relative flex-shrink-0">
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.15 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600 text-2xl font-bold text-white shadow-sm"
                    >
                      {initial}
                    </motion.span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      aria-label="Change profile photo"
                      className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-900 text-white shadow-sm transition hover:scale-110 hover:bg-gray-700 active:scale-95"
                    >
                      <Camera className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <h2 className="text-lg font-bold text-gray-900">
                        {displayName}
                      </h2>
                      {isEmailVerified && (
                        <BadgeCheck
                          className="h-[18px] w-[18px] text-blue-500"
                          aria-label="Verified student"
                        />
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {student.coursesInterested?.length
                        ? student.coursesInterested[0]
                        : student.course || "General Studies"}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-red-600 shadow-sm">
                        Scholar Level 1
                      </span>
                      {student.state && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          {student.state}
                        </span>
                      )}
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {!editing && (
                      <motion.button
                        key="edit-profile"
                        type="button"
                        onClick={() => setEditing(true)}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.18 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex-shrink-0 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
                      >
                        Edit Profile
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-5 max-w-xl">
                  <ProfileProgress student={student} label="Profile Completion" delay={0.3} />
                </div>
              </motion.div>

              <motion.div
                variants={staggerContainer(0.07)}
                className="grid grid-cols-1 gap-5 lg:grid-cols-2"
              >
                {/* Academic & Career Goals */}
                <motion.div
                  variants={staggerItem}
                  className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2"
                >
                  <motion.span
                    aria-hidden
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.35 }}
                    className="absolute inset-x-0 top-0 h-1 origin-left bg-red-600"
                  />
                  <motion.span
                    aria-hidden
                    animate={{ scale: [1, 1.12, 1], opacity: [0.55, 0.8, 0.55] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-red-100 blur-3xl"
                  />

                  <div className="relative flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-start gap-3.5">
                      <span className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-md shadow-red-500/30">
                        <motion.span
                          aria-hidden
                          animate={{ scale: [1, 1.45], opacity: [0.5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.8, ease: "easeOut" }}
                          className="absolute inset-0 rounded-xl border-2 border-red-400"
                        />
                        <Target className="h-5 w-5" strokeWidth={2} />
                      </span>
                      <div>
                        <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                          Your Choices
                        </h2>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Captured from your initial signup questionnaire — powers your course recommendations.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {goalRows.length > 0 && (
                        <span className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                          <span className="relative flex h-2 w-2">
                            <motion.span
                              aria-hidden
                              animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                              className="absolute inset-0 rounded-full bg-red-500"
                            />
                            <span className="relative h-2 w-2 rounded-full bg-red-600" />
                          </span>
                          AI Advisor · {goalRows.length} answers
                        </span>
                      )}

                      <motion.button
                        type="button"
                        onClick={() => openAdvisorModal(1)}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-1.5 text-xs font-semibold text-red-700 shadow-xs transition hover:bg-red-100 hover:border-red-300 active:scale-95"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        <span>{goalRows.length > 0 ? "Edit Choices" : "Answer Questions"}</span>
                      </motion.button>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {savedFlash && savedFlashMessage && (
                      <motion.div key="saved-choices" {...collapse} className="mt-4 overflow-hidden">
                        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3.5 py-2.5 text-xs font-semibold text-emerald-700 border border-emerald-100">
                          <Check className="h-4 w-4 flex-shrink-0" />
                          <span>{savedFlashMessage}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {goalRows.length > 0 ? (
                    <motion.div
                      variants={staggerContainer(0.07, 0.25)}
                      className={`relative mt-5 grid grid-cols-1 gap-3 ${GOAL_GRID_COLS[goalRows.length] ?? "sm:grid-cols-2 lg:grid-cols-3"}`}
                    >
                      {goalRows.map((row, i) => {
                        const stepForKey: Record<string, 1 | 2 | 3 | 4 | 5> = {
                          qualification: 1,
                          course: 2,
                          budget: 3,
                          salary: 4,
                          category: 5,
                        };
                        const targetStep = stepForKey[row.key] || 1;
                        return (
                          <motion.div key={row.label} variants={staggerItem}>
                            <button
                              type="button"
                              onClick={() => openAdvisorModal(targetStep)}
                              className="group relative h-full w-full text-left overflow-hidden rounded-xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-300 hover:shadow-[0_14px_30px_-18px_rgba(238,44,60,0.45)] focus:outline-none focus:ring-2 focus:ring-red-500/20"
                            >
                              <span
                                aria-hidden
                                className="pointer-events-none absolute -bottom-4 -right-1 select-none text-[72px] font-black leading-none tabular-nums text-red-100/60 transition-colors duration-300 group-hover:text-red-100"
                              >
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <div className="relative flex items-center justify-between">
                                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600 ring-1 ring-red-100 transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white">
                                  <row.icon className="h-4 w-4" strokeWidth={1.9} />
                                </span>
                                <span className="flex items-center gap-1 rounded-md bg-red-50/70 px-2 py-0.5 text-[11px] font-semibold text-red-600 opacity-80 group-hover:opacity-100 group-hover:bg-red-100 transition-all">
                                  <Pencil className="h-2.5 w-2.5" />
                                  Edit
                                </span>
                              </div>
                              <p className="relative mt-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                                {row.label}
                              </p>
                              <p className="relative mt-1 break-words text-sm font-bold leading-snug text-gray-900">
                                {row.value}
                              </p>
                            </button>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  ) : (
                    <div className="relative mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-dashed border-red-200 bg-red-50/40 p-4">
                      <div className="flex items-center gap-3">
                        <Sparkles className="h-5 w-5 flex-shrink-0 text-red-500" />
                        <p className="text-sm text-gray-600">
                          Complete the initial questions from the signup questionnaire to personalize your matches with your qualification, course interest, budget, and salary goals.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => openAdvisorModal(1)}
                        className="flex-shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-red-700 active:scale-95"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        <span>Answer Questions</span>
                      </button>
                    </div>
                  )}
                </motion.div>

                {/* Personal Information */}
                <SectionCard title="Personal Information">
                  <AnimatePresence mode="wait" initial={false}>
                    {editing ? (
                      <motion.div
                        key="edit"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: EASE_OUT } }}
                        exit={{ opacity: 0, y: -4, transition: { duration: 0.15 } }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="mb-1.5 block text-xs font-semibold text-gray-500">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                          />
                        </div>

                        {/* Mobile Number (Locked / Primary) */}
                        <div>
                          <div className="mb-1.5 flex items-center justify-between">
                            <label className="block text-xs font-semibold text-gray-500">
                              Primary Mobile Number
                            </label>
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
                              <Lock className="h-3 w-3" />
                              Primary Login ID
                            </span>
                          </div>
                          <div className="relative">
                            <input
                              type="tel"
                              disabled
                              value={student.phone || "Not linked"}
                              className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-500 outline-none"
                            />
                            <Lock className="absolute right-3.5 top-3 h-4 w-4 text-gray-400" />
                          </div>
                          <p className="mt-1 text-[11px] text-gray-400">
                            Mobile number is your primary account anchor and cannot be changed here.
                          </p>
                        </div>

                        {/* Email Address (Changeable via OTP) */}
                        <div>
                          <div className="mb-1.5 flex items-center justify-between">
                            <label className="block text-xs font-semibold text-gray-500">
                              Email Address
                            </label>
                            <button
                              type="button"
                              onClick={() => openEmailModal(student.email)}
                              className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline"
                            >
                              {student.email ? "Change / Re-verify" : "Add Email"}
                            </button>
                          </div>
                          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700">
                            <span className="truncate">{student.email || "No email linked"}</span>
                            {isEmailVerified ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                                <CheckCircle2 className="h-3 w-3" />
                                Verified
                              </span>
                            ) : student.email ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                                <ShieldAlert className="h-3 w-3" />
                                Unverified
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-1 text-[11px] text-gray-400">
                            Email updates require 6-digit OTP verification.
                          </p>
                        </div>

                        <div>
                          <label className="mb-1.5 block text-xs font-semibold text-gray-500">
                            State / Location
                          </label>
                          <input
                            type="text"
                            value={formState}
                            onChange={(e) => setFormState(e.target.value)}
                            placeholder="e.g. Maharashtra"
                            className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                          />
                        </div>

                        <div>
                          <div className="mb-1.5 flex items-center justify-between">
                            <label className="block text-xs font-semibold text-gray-500">
                              Date of Birth
                            </label>
                            <span className="text-[11px] font-normal text-gray-400">Optional</span>
                          </div>
                          <input
                            type="date"
                            value={formDob}
                            onChange={(e) => setFormDob(e.target.value)}
                            max={new Date().toISOString().split("T")[0]}
                            min="1940-01-01"
                            className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 cursor-pointer"
                          />
                        </div>

                        <div className="flex gap-2.5 pt-1">
                          <button
                            type="button"
                            disabled={savingProfile}
                            onClick={handleSaveProfile}
                            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 active:scale-[0.98] disabled:opacity-60"
                          >
                            {savingProfile && <Loader2 className="h-4 w-4 animate-spin" />}
                            <span>Save Changes</span>
                          </button>
                          <button
                            type="button"
                            disabled={savingProfile}
                            onClick={handleCancelEdit}
                            className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
                          >
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="view"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: EASE_OUT } }}
                        exit={{ opacity: 0, y: -4, transition: { duration: 0.15 } }}
                        className="space-y-4"
                      >
                        <AnimatePresence initial={false}>
                          {savedFlash && (
                            <motion.div key="saved" {...collapse} className="overflow-hidden">
                              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3.5 py-2.5 text-sm font-medium text-emerald-700">
                                <Check className="h-4 w-4 flex-shrink-0" />
                                Profile updated successfully.
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Email Row with Verification & Change Option */}
                        <div className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-gray-50/70 p-3.5 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white text-gray-500 shadow-xs">
                              <Mail className="h-4 w-4" />
                            </span>
                            <div>
                              <p className="text-xs text-gray-500">Email Address</p>
                              <p className="text-sm font-medium text-gray-900">
                                {student.email || "Not linked"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            {isEmailVerified ? (
                              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                                <CheckCircle2 className="h-3 w-3" />
                                Verified
                              </span>
                            ) : student.email ? (
                              <button
                                type="button"
                                onClick={() => openEmailModal(student.email)}
                                className="inline-flex items-center gap-1 rounded-lg bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white shadow-xs hover:bg-amber-600 active:scale-95"
                              >
                                <ShieldAlert className="h-3 w-3" />
                                Verify Now
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => openEmailModal("")}
                                className="rounded-lg bg-red-600 px-2.5 py-1 text-xs font-semibold text-white shadow-xs hover:bg-red-700"
                              >
                                Add Email
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => openEmailModal(student.email)}
                              className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-xs hover:bg-gray-50 hover:text-gray-900 active:scale-95"
                              title="Change email address"
                            >
                              <Pencil className="h-3 w-3 text-gray-400" />
                              <span>{student.email ? "Change" : "Add"}</span>
                            </button>
                          </div>
                        </div>

                        {/* Phone Row (Primary Mobile) */}
                        <div className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-gray-50/70 p-3.5 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white text-gray-500 shadow-xs">
                              <Phone className="h-4 w-4" />
                            </span>
                            <div>
                              <p className="text-xs text-gray-500">Mobile Number (Primary)</p>
                              <p className="text-sm font-medium text-gray-900">
                                {student.phone || "Not linked"}
                              </p>
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1 self-start rounded-full border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 sm:self-center">
                            <Lock className="h-3 w-3" />
                            Primary Login ID
                          </span>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-3 px-1 text-sm">
                          <MapPin className="h-4 w-4 flex-shrink-0 text-gray-400" />
                          <span className="text-gray-500">Location</span>
                          <span className="ml-auto font-medium text-gray-900">
                            {student.state || "Not added yet"}
                          </span>
                        </div>

                        {/* Date of Birth */}
                        <div className="flex items-center gap-3 px-1 text-sm">
                          <Calendar className="h-4 w-4 flex-shrink-0 text-gray-400" />
                          <span className="text-gray-500">Date of Birth</span>
                          <span className="ml-auto font-medium text-gray-900">
                            {student.dob || "Not added yet"}
                          </span>
                        </div>

                        {/* Member Since */}
                        <div className="flex items-center gap-3 px-1 text-sm">
                          <CalendarDays className="h-4 w-4 flex-shrink-0 text-gray-400" />
                          <span className="text-gray-500">Member Since</span>
                          <span className="ml-auto font-medium text-gray-900">
                            {student.joinedAt
                              ? new Date(student.joinedAt).toLocaleDateString("en-IN", {
                                  month: "long",
                                  year: "numeric",
                                })
                              : "2026"}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </SectionCard>

                {/* Verification & Trust */}
                <SectionCard title="Verification & Trust">
                  <div className="divide-y divide-gray-50">
                    {[
                      {
                        icon: Phone,
                        title: "Primary Mobile Number",
                        verified: Boolean(student.phone),
                        note: "Primary authentication identity",
                        badge: "Verified (Primary)",
                      },
                      {
                        icon: Mail,
                        title: "Email Address",
                        verified: isEmailVerified,
                        note: isEmailVerified
                          ? "Verified for account alerts & notices"
                          : student.email
                          ? "Email OTP verification pending"
                          : "No email address linked yet",
                        badge: isEmailVerified ? "Verified" : "Pending",
                        canAction: !isEmailVerified,
                      },
                      {
                        icon: FileCheck2,
                        title: "Identity Documents",
                        verified: false,
                        note: "12th marksheet pending OCR verification",
                        badge: "Pending",
                      },
                    ].map((row) => (
                      <div
                        key={row.title}
                        className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0"
                      >
                        <span
                          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${
                            row.verified
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-amber-50 text-amber-600"
                          }`}
                        >
                          <row.icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-gray-900">
                            {row.title}
                          </p>
                          {row.note && (
                            <p className="text-xs text-gray-500">{row.note}</p>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {row.canAction && (
                            <button
                              type="button"
                              onClick={() => openEmailModal(student.email)}
                              className="rounded-lg bg-red-600 px-2.5 py-1 text-xs font-semibold text-white shadow-xs hover:bg-red-700"
                            >
                              Verify
                            </button>
                          )}
                          <span
                            className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                              row.verified
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-amber-50 text-amber-600"
                            }`}
                          >
                            {row.badge}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </motion.div>
            </motion.div>
          </main>
        </div>

        {/* Change & Re-verify Email Modal */}
        <AnimatePresence>
          {emailModalOpen && (
            <motion.div
              key="email-modal-backdrop"
              {...backdropMotion}
              className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0a1428]/70 p-4 backdrop-blur-sm"
              onClick={() => setEmailModalOpen(false)}
            >
              <motion.div
                {...dialogMotion}
                role="dialog"
                aria-modal="true"
                className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setEmailModalOpen(false)}
                  aria-label="Close modal"
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
                >
                  <X className="h-4 w-4" />
                </button>

                {emailModalStep === "input" && (
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                        <Mail className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-gray-900">
                          {student.email ? "Change Email Address" : "Link Email Address"}
                        </h3>
                        <p className="text-xs text-gray-500">
                          Mobile remains your primary identity
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-gray-600">
                      Enter the email address you want to link. We will send a 6-digit OTP code to verify ownership.
                    </p>

                    {emailError && (
                      <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-700">
                        {emailError}
                      </div>
                    )}

                    <form onSubmit={handleSendEmailOtp} className="mt-4 space-y-4">
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-gray-700">
                          Email Address
                        </label>
                        <input
                          type="email"
                          autoFocus
                          placeholder="e.g. name@example.com"
                          value={targetEmail}
                          onChange={(e) => setTargetEmail(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                        />
                      </div>

                      <div className="flex items-center gap-2.5 pt-1">
                        <button
                          type="button"
                          onClick={() => setEmailModalOpen(false)}
                          className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={emailLoading}
                          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 active:scale-[0.98] disabled:opacity-60"
                        >
                          {emailLoading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Sending OTP...</span>
                            </>
                          ) : (
                            <>
                              <span>Send Code</span>
                              <ArrowRight className="h-4 w-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {emailModalStep === "otp" && (
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                        <CheckCircle2 className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-gray-900">
                          Verify Email Code
                        </h3>
                        <p className="text-xs text-gray-500">
                          Sent to <span className="font-semibold text-gray-700">{targetEmail}</span>
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-gray-600">
                      Enter the 6-digit one-time code sent to your email to verify and link it.
                    </p>

                    {emailError && (
                      <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-700">
                        {emailError}
                      </div>
                    )}

                    <form onSubmit={handleVerifyEmailOtp} className="mt-4 space-y-4">
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-gray-700">
                          6-Digit Verification Code
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          autoFocus
                          placeholder="••••••"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                          className="w-full text-center tracking-[0.4em] font-mono text-xl rounded-xl border border-gray-200 px-3.5 py-2.5 text-gray-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <button
                          type="button"
                          onClick={() => setEmailModalStep("input")}
                          className="text-gray-500 hover:text-gray-900 hover:underline"
                        >
                          Change Email
                        </button>

                        <button
                          type="button"
                          disabled={emailCooldown > 0 || emailLoading}
                          onClick={() => handleSendEmailOtp()}
                          className="font-medium text-red-600 hover:text-red-700 hover:underline disabled:opacity-50 disabled:no-underline"
                        >
                          {emailCooldown > 0 ? `Resend in ${emailCooldown}s` : "Resend Code"}
                        </button>
                      </div>

                      <div className="flex items-center gap-2.5 pt-1">
                        <button
                          type="button"
                          onClick={() => setEmailModalOpen(false)}
                          className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={emailLoading || otpCode.trim().length !== 6}
                          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 active:scale-[0.98] disabled:opacity-60"
                        >
                          {emailLoading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Verifying...</span>
                            </>
                          ) : (
                            <>
                              <Check className="h-4 w-4" />
                              <span>Verify & Save</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {emailModalStep === "success" && (
                  <div className="py-4 text-center">
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <Check className="h-7 w-7" />
                    </span>
                    <h3 className="mt-3 text-base font-bold text-gray-900">
                      Email Verified Successfully!
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      <span className="font-semibold text-gray-700">{targetEmail}</span> is now linked and verified on your account.
                    </p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit AI Advisor Questionnaire Modal */}
        <AnimatePresence>
          {advisorModalOpen && (
            <AIAdvisorModal
              onClose={() => setAdvisorModalOpen(false)}
              onComplete={handleUpdateAdvisorProfile}
              initialAnswers={student.advisorProfile as any}
              initialStep={advisorModalStep}
              isEditing={true}
            />
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
