"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ArrowLeft,
  ArrowRight,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  RotateCw,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldAlert,
  User,
  UserPlus,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { courseOptions } from "@/data/course-options";
import { indianStates } from "@/data/indian-states";
import { AIAdvisorModal, type AdvisorAnswers } from "@/components/layout/ai-advisor-modal";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup?: () => void;
}

const countryCodes = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "US / Canada" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
];

type LoginFlowStep = "auth" | "verify-phone" | "details";
type LoginMode = "mobile" | "email";
type EmailAuthType = "otp" | "password";

export function LoginModal({
  isOpen,
  onClose,
  onSwitchToSignup,
}: LoginModalProps) {
  const router = useRouter();

  // Multi-step progressive flow
  const [step, setStep] = useState<LoginFlowStep>("auth");
  const [mode, setMode] = useState<LoginMode>("mobile");
  const [emailAuthType, setEmailAuthType] = useState<EmailAuthType>("otp");

  // Mobile state (Primary login)
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileOtp, setMobileOtp] = useState("");
  const [mobileChallengeId, setMobileChallengeId] = useState("");
  const [mobileCooldown, setMobileCooldown] = useState(0);

  // Email state (Secondary login)
  const [email, setEmail] = useState("");
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [emailChallengeId, setEmailChallengeId] = useState("");
  const [emailCooldown, setEmailCooldown] = useState(0);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Mandatory phone verification state (for email users without verified mobile)
  const [verifyPhoneCountryCode, setVerifyPhoneCountryCode] = useState("+91");
  const [verifyPhoneNumber, setVerifyPhoneNumber] = useState("");
  const [verifyPhoneOtpSent, setVerifyPhoneOtpSent] = useState(false);
  const [verifyPhoneOtp, setVerifyPhoneOtp] = useState("");
  const [verifyPhoneChallengeId, setVerifyPhoneChallengeId] = useState("");
  const [verifyPhoneCooldown, setVerifyPhoneCooldown] = useState(0);

  // Missing questions / details state
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [state, setState] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);

  // Advisor modal state
  const [showAdvisor, setShowAdvisor] = useState(false);

  // Staged student data
  const [currentStudent, setCurrentStudent] = useState<any>(null);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [accountNotFound, setAccountNotFound] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Cooldown timers
  useEffect(() => {
    if (mobileCooldown <= 0) return;
    const t = setTimeout(() => setMobileCooldown((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [mobileCooldown]);

  useEffect(() => {
    if (emailCooldown <= 0) return;
    const t = setTimeout(() => setEmailCooldown((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [emailCooldown]);

  useEffect(() => {
    if (verifyPhoneCooldown <= 0) return;
    const t = setTimeout(() => setVerifyPhoneCooldown((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [verifyPhoneCooldown]);

  // Reset errors when mode changes
  useEffect(() => {
    setError("");
    setAccountNotFound(false);
  }, [mode, emailAuthType, step]);

  if (!isOpen) return null;

  const fullPhone = `${countryCode}${phone.trim()}`;
  const fullVerifyPhone = `${verifyPhoneCountryCode}${verifyPhoneNumber.trim()}`;

  // Complete the flow and land on dashboard
  const finalizeLogin = (student: any) => {
    setIsSuccess(true);
    setSuccessMessage(`Welcome back${student.name ? `, ${student.name.split(" ")[0]}` : ""}!`);

    localStorage.setItem("ecampus_student", JSON.stringify(student));
    window.dispatchEvent(new Event("ecampus-auth-change"));

    setTimeout(() => {
      onClose();
      setIsSuccess(false);
      setStep("auth");
      router.push("/dashboard");
    }, 1000);
  };

  // Evaluate the next step after an authentication action
  const evaluateNextStep = (data: {
    student: any;
    phone_required?: boolean;
    hasProfileDetails: boolean;
    hasAdvisorProfile: boolean;
  }) => {
    const student = data.student || {};
    setCurrentStudent(student);

    // Save whatever authenticated credentials we have so far
    localStorage.setItem("ecampus_student", JSON.stringify(student));
    window.dispatchEvent(new Event("ecampus-auth-change"));

    // Pre-populate fields
    if (student.name) setName(student.name);
    if (student.state) setState(student.state);
    if (student.course) setCourse(student.course);
    else if (student.coursesInterested?.length) setCourse(student.coursesInterested[0]);

    // 1. MANDATORY CHECK: Is phone verification required?
    if (data.phone_required || !student.phone || student.status === "PENDING_PHONE_VERIFICATION") {
      setStep("verify-phone");
      return;
    }

    // 2. CHECK: Are profile questions (Name, State, Course) filled?
    if (!data.hasProfileDetails || !student.name?.trim() || !student.state?.trim()) {
      setStep("details");
      return;
    }

    // 3. CHECK: Is AI Advisor questionnaire filled?
    if (!data.hasAdvisorProfile || !student.advisorProfile?.highestQualification) {
      setShowAdvisor(true);
      return;
    }

    // 4. All prerequisites are satisfied -> Land on dashboard immediately without re-asking!
    finalizeLogin(student);
  };

  // ── Primary: Send Mobile OTP ──
  const handleSendMobileOtp = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setAccountNotFound(false);

    if (!/^\d{10}$/.test(phone.trim())) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "send-otp",
          identifier: fullPhone,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.not_found || res.status === 404) {
          setAccountNotFound(true);
          setError(data.message || "You haven't signed up with this mobile number yet. Please sign up first.");
          return;
        }
        throw new Error(data.message || data.error?.message || "Failed to send verification code.");
      }

      setMobileChallengeId(data.challenge_id || "");
      setMobileCooldown(data.resend_cooldown || 30);
      setMobileOtpSent(true);
    } catch (err: any) {
      setError(err.message || "Failed to send code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Primary: Verify Mobile OTP ──
  const handleVerifyMobileOtp = async (overrideOtp?: string) => {
    setError("");
    const code = (overrideOtp || mobileOtp).trim();

    if (!/^\d{6}$/.test(code)) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify-otp",
          identifier: fullPhone,
          otp: code,
          challenge_id: mobileChallengeId,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.not_found || res.status === 404) {
          setAccountNotFound(true);
          setError(data.message || "You haven't signed up with this mobile number yet. Please sign up first.");
          return;
        }
        throw new Error(data.message || data.error?.message || "Invalid OTP code. Please check and try again.");
      }

      evaluateNextStep(data);
    } catch (err: any) {
      setError(err.message || "Login failed. Please verify your OTP code.");
    } finally {
      setLoading(false);
    }
  };

  // ── Secondary: Send Email OTP ──
  const handleSendEmailOtp = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setAccountNotFound(false);

    const normalizedEmail = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "send-otp",
          identifier: normalizedEmail,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.not_found || res.status === 404) {
          setAccountNotFound(true);
          setError(data.message || "You haven't signed up with this email yet. Please sign up first.");
          return;
        }
        throw new Error(data.message || data.error?.message || "Failed to send login code.");
      }

      setEmailChallengeId(data.challenge_id || "");
      setEmailCooldown(data.resend_cooldown || 30);
      setEmailOtpSent(true);
    } catch (err: any) {
      setError(err.message || "Failed to send code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Secondary: Verify Email OTP ──
  const handleVerifyEmailOtp = async (overrideOtp?: string) => {
    setError("");
    const code = (overrideOtp || emailOtp).trim();

    if (!/^\d{6}$/.test(code)) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify-otp",
          identifier: email.trim().toLowerCase(),
          otp: code,
          challenge_id: emailChallengeId,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.not_found || res.status === 404) {
          setAccountNotFound(true);
          setError(data.message || "You haven't signed up with this email yet. Please sign up first.");
          return;
        }
        throw new Error(data.message || data.error?.message || "Invalid code. Please try again.");
      }

      evaluateNextStep(data);
    } catch (err: any) {
      setError(err.message || "Login failed. Please check the code and try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Secondary: Password Login ──
  const handlePasswordLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setAccountNotFound(false);

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "password",
          email: normalizedEmail,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.not_found || res.status === 404) {
          setAccountNotFound(true);
          setError(data.message || "You haven't signed up with this email yet. Please sign up first.");
          return;
        }
        throw new Error(data.error?.message || data.message || "Invalid email or password.");
      }

      evaluateNextStep(data);
    } catch (err: any) {
      setError(err.message || "Login failed. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // ── MANDATORY PHONE VERIFICATION: Send OTP ──
  const handleSendVerifyPhoneOtp = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!/^\d{10}$/.test(verifyPhoneNumber.trim())) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/phone/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: fullVerifyPhone,
          email: currentStudent?.email || email.trim().toLowerCase(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || data.message || "Failed to send code to mobile.");
      }

      setVerifyPhoneChallengeId(data.challenge_id || "");
      setVerifyPhoneCooldown(data.resend_cooldown || 30);
      setVerifyPhoneOtpSent(true);
    } catch (err: any) {
      setError(err.message || "Failed to send code to mobile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── MANDATORY PHONE VERIFICATION: Verify OTP ──
  const handleVerifyPhoneCode = async (overrideOtp?: string) => {
    setError("");
    const code = (overrideOtp || verifyPhoneOtp).trim();

    if (!/^\d{6}$/.test(code)) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/phone/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: fullVerifyPhone,
          code,
          challenge_id: verifyPhoneChallengeId,
          email: currentStudent?.email || email.trim().toLowerCase(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || data.message || "Invalid OTP code. Please check and try again.");
      }

      // Update student with verified phone
      const updatedStudent = {
        ...(currentStudent || {}),
        phone: fullVerifyPhone,
        status: "ACTIVE",
      };
      setCurrentStudent(updatedStudent);
      localStorage.setItem("ecampus_student", JSON.stringify(updatedStudent));
      window.dispatchEvent(new Event("ecampus-auth-change"));

      // Check if questions are filled
      if (!data.hasProfileDetails || !updatedStudent.name?.trim() || !updatedStudent.state?.trim()) {
        setStep("details");
      } else if (!data.hasAdvisorProfile || !updatedStudent.advisorProfile?.highestQualification) {
        setShowAdvisor(true);
      } else {
        finalizeLogin(updatedStudent);
      }
    } catch (err: any) {
      setError(err.message || "Mobile verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── SUBMIT DETAILS (if not filled earlier) ──
  const handleDetailsSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    setLoading(true);

    const studentPayload = {
      ...(currentStudent || {}),
      name: name.trim(),
      email: currentStudent?.email || email.trim().toLowerCase(),
      phone: currentStudent?.phone || fullVerifyPhone || fullPhone,
      coursesInterested: course ? [course] : (currentStudent?.coursesInterested || []),
      course: course || currentStudent?.course || undefined,
      state: state || currentStudent?.state || undefined,
      referralCode: referralCode.trim() || undefined,
      whatsappOptIn,
      joinedAt: currentStudent?.joinedAt || new Date().toISOString(),
      status: "ACTIVE",
    };

    try {
      await fetch("/api/auth/register-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentPayload),
      });
    } catch {}

    setCurrentStudent(studentPayload);
    localStorage.setItem("ecampus_student", JSON.stringify(studentPayload));
    window.dispatchEvent(new Event("ecampus-auth-change"));
    setLoading(false);

    // If advisor profile questions not filled earlier, show advisor modal
    if (!studentPayload.advisorProfile?.highestQualification) {
      setShowAdvisor(true);
    } else {
      finalizeLogin(studentPayload);
    }
  };

  // ── COMPLETE ADVISOR MODAL ──
  const finishAdvisorOnboarding = async (answers?: AdvisorAnswers) => {
    const raw = localStorage.getItem("ecampus_student");
    const current = raw ? JSON.parse(raw) : (currentStudent || {});

    let updated = current;
    if (answers) {
      updated = { ...current, advisorProfile: answers };
      localStorage.setItem("ecampus_student", JSON.stringify(updated));
      window.dispatchEvent(new Event("ecampus-auth-change"));

      try {
        await fetch("/api/auth/register-details", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        });
      } catch {}
    }

    setShowAdvisor(false);
    finalizeLogin(updated);
  };

  if (showAdvisor) {
    return (
      <AIAdvisorModal
        onClose={() => finishAdvisorOnboarding()}
        onComplete={(answers) => finishAdvisorOnboarding(answers)}
      />
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div data-auth-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto overscroll-contain">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className={`relative z-10 w-full overflow-hidden rounded-3xl bg-white shadow-[0_25px_70px_rgba(0,0,0,0.22)] border border-slate-100 my-auto ${
              step === "details" ? "max-w-[460px]" : "max-w-[420px]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top vibrant gradient accent */}
            <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3.5 top-4.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100/80 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Back button */}
            {step === "auth" && ((mode === "mobile" && mobileOtpSent) || (mode === "email" && emailOtpSent)) && !isSuccess && (
              <button
                type="button"
                onClick={() => {
                  setMobileOtpSent(false);
                  setEmailOtpSent(false);
                  setMobileOtp("");
                  setEmailOtp("");
                  setError("");
                }}
                aria-label="Back"
                className="absolute left-3.5 top-4.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100/80 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}

            <div className="p-6 sm:p-7">
              {/* Success Screen */}
              {isSuccess ? (
                <div className="py-8 flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/60 mb-4">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{successMessage}</h3>
                  <p className="mt-1 text-sm text-slate-500">Redirecting to your student dashboard…</p>
                </div>
              ) : (
                <>
                  {/* STEP 1: AUTH SCREEN */}
                  {step === "auth" && (
                    <>
                      <div className="text-center mb-5">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold tracking-wide uppercase mb-2">
                          <Sparkles className="w-3.5 h-3.5" />
                          Student Portal
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Log in to eCampus</h2>
                        <p className="text-xs text-slate-500 mt-1">
                          Phone number is your primary key. Log in below to access your applications.
                        </p>
                      </div>

                      {/* Mode switcher tabs (Mobile is Primary) */}
                      {!mobileOtpSent && !emailOtpSent && (
                        <div className="grid grid-cols-2 p-1 bg-slate-100/90 rounded-2xl mb-5">
                          <button
                            type="button"
                            onClick={() => {
                              setMode("mobile");
                              setError("");
                            }}
                            className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-xl transition-all ${
                              mode === "mobile"
                                ? "bg-white text-slate-900 shadow-sm"
                                : "text-slate-500 hover:text-slate-800"
                            }`}
                          >
                            <Smartphone className="w-3.5 h-3.5 text-red-600" />
                            <span>Mobile OTP (Primary)</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setMode("email");
                              setError("");
                            }}
                            className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-xl transition-all ${
                              mode === "email"
                                ? "bg-white text-slate-900 shadow-sm"
                                : "text-slate-500 hover:text-slate-800"
                            }`}
                          >
                            <Mail className="w-3.5 h-3.5" />
                            Email
                          </button>
                        </div>
                      )}

                      {/* Prompt when user has not signed up */}
                      {accountNotFound && (
                        <div className="mb-5 rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 via-amber-50/90 to-orange-50/70 p-4 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-xs">
                              <UserPlus className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h3 className="text-sm font-bold text-amber-950">
                                  Account Not Found
                                </h3>
                                <span className="text-[10px] font-semibold text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded-full border border-amber-200 uppercase tracking-wider">
                                  Signup First
                                </span>
                              </div>
                              <p className="mt-1 text-xs text-amber-900 leading-relaxed font-medium">
                                {error || "You haven't signed up with this number or email yet. Please sign up first to access eCampus."}
                              </p>
                              <div className="mt-3.5 flex flex-wrap items-center gap-2">
                                <Button
                                  type="button"
                                  onClick={() => {
                                    if (onSwitchToSignup) {
                                      onClose();
                                      onSwitchToSignup();
                                    } else {
                                      onClose();
                                      router.push("/signup");
                                    }
                                  }}
                                  className="h-9 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-md shadow-red-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
                                >
                                  <UserPlus className="h-3.5 w-3.5" />
                                  <span>Sign Up First</span>
                                  <ArrowRight className="h-3.5 w-3.5 ml-0.5" />
                                </Button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setAccountNotFound(false);
                                    setError("");
                                  }}
                                  className="h-9 px-3 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-amber-100/70 transition-colors"
                                >
                                  Change Number / Email
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Standard Error banner (only shown if not an unregistered account prompt) */}
                      {error && !accountNotFound && (
                        <div className="mb-4 flex items-start gap-2.5 rounded-2xl p-3 text-xs leading-relaxed bg-red-50 border border-red-200 text-red-700">
                          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-inherit" />
                          <div className="flex-1">
                            <span>{error}</span>
                          </div>
                        </div>
                      )}

                      {/* Mobile OTP Form */}
                      {mode === "mobile" && (
                        <>
                          {!mobileOtpSent ? (
                            <form onSubmit={handleSendMobileOtp} className="space-y-4">
                              <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                  Registered Mobile Number
                                </label>
                                <div className="flex rounded-2xl border border-slate-200 bg-white shadow-xs focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/15 transition-all overflow-hidden">
                                  <select
                                    value={countryCode}
                                    onChange={(e) => setCountryCode(e.target.value)}
                                    className="bg-slate-50 px-3 py-3 text-xs font-semibold text-slate-700 border-r border-slate-200 outline-none cursor-pointer"
                                  >
                                    {countryCodes.map((c) => (
                                      <option key={c.code} value={c.code}>
                                        {c.flag} {c.code}
                                      </option>
                                    ))}
                                  </select>
                                  <input
                                    type="tel"
                                    inputMode="numeric"
                                    placeholder="Enter 10-digit number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                                    autoFocus
                                    required
                                    className="flex-1 px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                                  />
                                </div>
                              </div>

                              <Button
                                type="submit"
                                disabled={loading || phone.length !== 10}
                                className="w-full h-11 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold text-sm shadow-md shadow-red-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                              >
                                {loading ? (
                                  <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Sending OTP…
                                  </>
                                ) : (
                                  <>
                                    Get Login OTP
                                    <ArrowRight className="w-4 h-4" />
                                  </>
                                )}
                              </Button>
                            </form>
                          ) : (
                            <div className="space-y-5">
                              <div className="text-center">
                                <p className="text-xs text-slate-500">
                                  Enter the 6-digit verification code sent to
                                </p>
                                <p className="text-sm font-bold text-slate-900 mt-0.5">
                                  {countryCode} {phone}
                                </p>
                              </div>

                              <div className="flex justify-center">
                                <InputOTP
                                  maxLength={6}
                                  value={mobileOtp}
                                  onChange={(val) => {
                                    setMobileOtp(val);
                                    if (val.length === 6) handleVerifyMobileOtp(val);
                                  }}
                                >
                                  <InputOTPGroup className="gap-2">
                                    {[0, 1, 2, 3, 4, 5].map((idx) => (
                                      <InputOTPSlot
                                        key={idx}
                                        index={idx}
                                        className="h-12 w-11 rounded-xl border border-slate-200 text-lg font-bold text-slate-900 shadow-xs focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                      />
                                    ))}
                                  </InputOTPGroup>
                                </InputOTP>
                              </div>

                              <Button
                                type="button"
                                onClick={() => handleVerifyMobileOtp()}
                                disabled={loading || mobileOtp.length !== 6}
                                className="w-full h-11 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold text-sm shadow-md shadow-red-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                              >
                                {loading ? (
                                  <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Verifying…
                                  </>
                                ) : (
                              <>
                                Verify & Log In
                                <ArrowRight className="w-4 h-4" />
                              </>
                            )}
                          </Button>

                          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                            <button
                              type="button"
                              onClick={() => {
                                setMobileOtpSent(false);
                                setMobileOtp("");
                                setError("");
                              }}
                              className="text-slate-600 hover:underline"
                            >
                              Change number
                            </button>
                            <button
                              type="button"
                              onClick={(e) => handleSendMobileOtp(e)}
                              disabled={mobileCooldown > 0 || loading}
                              className="flex items-center gap-1 font-semibold text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <RotateCw className="w-3 h-3" />
                              {mobileCooldown > 0 ? `Resend in ${mobileCooldown}s` : "Resend OTP"}
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Email Login Form */}
                  {mode === "email" && (
                    <>
                      {!emailOtpSent && (
                        <div className="flex justify-end gap-3 mb-3 text-xs">
                          <button
                            type="button"
                            onClick={() => setEmailAuthType("otp")}
                            className={`font-semibold transition-colors ${
                              emailAuthType === "otp"
                                ? "text-red-600 underline"
                                : "text-slate-400 hover:text-slate-600"
                            }`}
                          >
                            Login with OTP
                          </button>
                          <span className="text-slate-300">|</span>
                          <button
                            type="button"
                            onClick={() => setEmailAuthType("password")}
                            className={`font-semibold transition-colors ${
                              emailAuthType === "password"
                                ? "text-red-600 underline"
                                : "text-slate-400 hover:text-slate-600"
                            }`}
                          >
                            Login with Password
                          </button>
                        </div>
                      )}

                      {emailAuthType === "otp" && !emailOtpSent && (
                        <form onSubmit={handleSendEmailOtp} className="space-y-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                              Registered Email Address
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                              <input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                                required
                                className="w-full h-11 pl-10 pr-4 rounded-2xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/15 shadow-xs transition-all"
                              />
                            </div>
                          </div>

                          <Button
                            type="submit"
                            disabled={loading || !email.trim()}
                            className="w-full h-11 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold text-sm shadow-md shadow-red-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            {loading ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Sending code…
                              </>
                            ) : (
                              <>
                                Send Login Code
                                <ArrowRight className="w-4 h-4" />
                              </>
                            )}
                          </Button>
                        </form>
                      )}

                      {emailAuthType === "otp" && emailOtpSent && (
                        <div className="space-y-5">
                          <div className="text-center">
                            <p className="text-xs text-slate-500">
                              Enter the 6-digit code sent to
                            </p>
                            <p className="text-sm font-bold text-slate-900 mt-0.5">
                              {email}
                            </p>
                          </div>

                          <div className="flex justify-center">
                            <InputOTP
                              maxLength={6}
                              value={emailOtp}
                              onChange={(val) => {
                                setEmailOtp(val);
                                if (val.length === 6) handleVerifyEmailOtp(val);
                              }}
                            >
                              <InputOTPGroup className="gap-2">
                                {[0, 1, 2, 3, 4, 5].map((idx) => (
                                  <InputOTPSlot
                                    key={idx}
                                    index={idx}
                                    className="h-12 w-11 rounded-xl border border-slate-200 text-lg font-bold text-slate-900 shadow-xs focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                  />
                                ))}
                              </InputOTPGroup>
                            </InputOTP>
                          </div>

                          <Button
                            type="button"
                            onClick={() => handleVerifyEmailOtp()}
                            disabled={loading || emailOtp.length !== 6}
                            className="w-full h-11 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold text-sm shadow-md shadow-red-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            {loading ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Verifying…
                              </>
                            ) : (
                              <>
                                Verify & Continue
                                <ArrowRight className="w-4 h-4" />
                              </>
                            )}
                          </Button>

                          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                            <button
                              type="button"
                              onClick={() => {
                                setEmailOtpSent(false);
                                setEmailOtp("");
                                setError("");
                              }}
                              className="text-slate-600 hover:underline"
                            >
                              Change email
                            </button>
                            <button
                              type="button"
                              onClick={(e) => handleSendEmailOtp(e)}
                              disabled={emailCooldown > 0 || loading}
                              className="flex items-center gap-1 font-semibold text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <RotateCw className="w-3 h-3" />
                              {emailCooldown > 0 ? `Resend in ${emailCooldown}s` : "Resend code"}
                            </button>
                          </div>
                        </div>
                      )}

                      {emailAuthType === "password" && (
                        <form onSubmit={handlePasswordLogin} className="space-y-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                              Email Address
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                              <input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                                required
                                className="w-full h-11 pl-10 pr-4 rounded-2xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/15 shadow-xs transition-all"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                              Password
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                              <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full h-11 pl-10 pr-11 rounded-2xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/15 shadow-xs transition-all"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                              >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>

                          <Button
                            type="submit"
                            disabled={loading || !email.trim() || !password}
                            className="w-full h-11 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold text-sm shadow-md shadow-red-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            {loading ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Logging in…
                              </>
                            ) : (
                              <>
                                Log In
                                <ArrowRight className="w-4 h-4" />
                              </>
                            )}
                          </Button>
                        </form>
                      )}
                    </>
                  )}

                  {/* Switch to Sign Up */}
                  <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                    <p className="text-xs text-slate-500">
                      Don't have an eCampus account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          if (onSwitchToSignup) onSwitchToSignup();
                        }}
                        className="font-bold text-red-600 hover:text-red-700 hover:underline transition-colors ml-0.5"
                      >
                        Sign up now
                      </button>
                    </p>
                  </div>
                </>
              )}

              {/* STEP 2: MANDATORY MOBILE PHONE VERIFICATION */}
              {step === "verify-phone" && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold mb-2">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                      Mandatory Verification
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Verify Your Mobile Number</h2>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                      All accounts must be verified with a mobile number to access counselor chats, degree applications, and your student dashboard.
                    </p>
                  </div>

                  {error && (
                    <div className="flex items-start gap-2.5 rounded-2xl p-3 text-xs bg-red-50 border border-red-200 text-red-700">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  {!verifyPhoneOtpSent ? (
                    <form onSubmit={handleSendVerifyPhoneOtp} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Enter Mobile Number
                        </label>
                        <div className="flex rounded-2xl border border-slate-200 bg-white shadow-xs focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/15 transition-all overflow-hidden">
                          <select
                            value={verifyPhoneCountryCode}
                            onChange={(e) => setVerifyPhoneCountryCode(e.target.value)}
                            className="bg-slate-50 px-3 py-3 text-xs font-semibold text-slate-700 border-r border-slate-200 outline-none cursor-pointer"
                          >
                            {countryCodes.map((c) => (
                              <option key={c.code} value={c.code}>
                                {c.flag} {c.code}
                              </option>
                            ))}
                          </select>
                          <input
                            type="tel"
                            inputMode="numeric"
                            placeholder="Enter 10-digit number"
                            value={verifyPhoneNumber}
                            onChange={(e) => setVerifyPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                            autoFocus
                            required
                            className="flex-1 px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={loading || verifyPhoneNumber.length !== 10}
                        className="w-full h-11 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold text-sm shadow-md shadow-red-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending SMS OTP…
                          </>
                        ) : (
                          <>
                            Send Mobile OTP
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  ) : (
                    <div className="space-y-5">
                      <div className="text-center">
                        <p className="text-xs text-slate-500">Enter the 6-digit code sent to</p>
                        <p className="text-sm font-bold text-slate-900 mt-0.5">{verifyPhoneCountryCode} {verifyPhoneNumber}</p>
                      </div>

                      <div className="flex justify-center">
                        <InputOTP
                          maxLength={6}
                          value={verifyPhoneOtp}
                          onChange={(val) => {
                            setVerifyPhoneOtp(val);
                            if (val.length === 6) handleVerifyPhoneCode(val);
                          }}
                        >
                          <InputOTPGroup className="gap-2">
                            {[0, 1, 2, 3, 4, 5].map((idx) => (
                              <InputOTPSlot
                                key={idx}
                                index={idx}
                                className="h-12 w-11 rounded-xl border border-slate-200 text-lg font-bold text-slate-900 shadow-xs focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                              />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </div>

                      <Button
                        type="button"
                        onClick={() => handleVerifyPhoneCode()}
                        disabled={loading || verifyPhoneOtp.length !== 6}
                        className="w-full h-11 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold text-sm shadow-md shadow-red-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Verifying…
                          </>
                        ) : (
                          <>
                            Verify & Continue
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </Button>

                      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setVerifyPhoneOtpSent(false);
                            setVerifyPhoneOtp("");
                            setError("");
                          }}
                          className="text-slate-600 hover:underline"
                        >
                          Change number
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleSendVerifyPhoneOtp(e)}
                          disabled={verifyPhoneCooldown > 0 || loading}
                          className="flex items-center gap-1 font-semibold text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <RotateCw className="w-3 h-3" />
                          {verifyPhoneCooldown > 0 ? `Resend in ${verifyPhoneCooldown}s` : "Resend OTP"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: MISSING PROFILE DETAILS (if not filled during signup) */}
              {step === "details" && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold uppercase mb-2">
                      <GraduationCap className="w-3.5 h-3.5" />
                      Complete Profile
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Almost there!</h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Please provide your name, course, and state to personalize your degree recommendations.
                    </p>
                  </div>

                  {error && (
                    <div className="flex items-start gap-2.5 rounded-2xl p-3 text-xs bg-red-50 border border-red-200 text-red-700">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleDetailsSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="e.g. Rahul Sharma"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          autoFocus
                          className="w-full h-11 pl-10 pr-4 rounded-2xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/15 shadow-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Interested Course *
                      </label>
                      <select
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        required
                        className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 bg-white text-slate-900 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/15 shadow-xs cursor-pointer"
                      >
                        <option value="">Select a course (e.g. Online MBA)</option>
                        {courseOptions.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        State / Region *
                      </label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        className="w-full h-11 px-3.5 rounded-2xl border border-slate-200 bg-white text-slate-900 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/15 shadow-xs cursor-pointer"
                      >
                        <option value="">Select your state</option>
                        {indianStates.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="pt-1">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={whatsappOptIn}
                          onChange={(e) => setWhatsappOptIn(e.target.checked)}
                          className="mt-0.5 rounded border-slate-300 text-red-600 focus:ring-red-500 cursor-pointer"
                        />
                        <span className="text-xs text-slate-600">
                          Receive admission notifications and counselor updates on WhatsApp
                        </span>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-11 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold text-sm shadow-md shadow-red-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving…
                        </>
                      ) : (
                        <>
                          Continue to Dashboard
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>
  );
}
