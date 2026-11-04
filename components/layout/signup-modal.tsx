"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Check,
  BadgeCheck,
  Smartphone,
  Mail,
  User,
  Sparkles,
  RotateCw,
  Loader2,
  ShieldCheck,
  Pencil,
  Search,
  MessageSquare,
  Gift,
  GraduationCap,
  CheckCircle2,
  Lock,
  Calendar,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { indianStates } from "@/data/indian-states";
import { courseOptions } from "@/data/course-options";
import { AIAdvisorModal, type AdvisorAnswers } from "@/components/layout/ai-advisor-modal";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
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

type Step = "phone" | "otp" | "details";
type SignupMode = "mobile" | "email";

export function SignupModal({
  isOpen,
  onClose,
  onSwitchToLogin,
}: SignupModalProps) {
  const router = useRouter();

  const [step, setStep] = useState<Step>("phone");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [mode, setMode] = useState<SignupMode>("mobile");

  // ── Phone verification on details step (for email signup mode) ──
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState("");
  const [phoneChallengeId, setPhoneChallengeId] = useState("");
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [phoneCooldown, setPhoneCooldown] = useState(0);

  // ── Details step state ──
  const [course, setCourse] = useState("");
  const [courseSearch, setCourseSearch] = useState("");
  const [courseOpen, setCourseOpen] = useState(false);
  const courseRef = useRef<HTMLDivElement>(null);
  const [dob, setDob] = useState("");

  const [state, setState] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const [stateOpen, setStateOpen] = useState(false);
  const stateRef = useRef<HTMLDivElement>(null);

  const [referralCode, setReferralCode] = useState("");
  const [showReferral, setShowReferral] = useState(false);
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);
  const [showAdvisor, setShowAdvisor] = useState(false);

  // Close dropdowns on outside click
  useEffect(() => {
    if (!stateOpen && !courseOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        stateRef.current &&
        !stateRef.current.contains(event.target as Node)
      ) {
        setStateOpen(false);
      }
      if (
        courseRef.current &&
        !courseRef.current.contains(event.target as Node)
      ) {
        setCourseOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [stateOpen, courseOpen]);

  // Resend OTP countdown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  // Phone OTP cooldown timer on details step
  useEffect(() => {
    if (phoneCooldown <= 0) return;
    const t = setTimeout(() => setPhoneCooldown((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [phoneCooldown]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep("phone");
      setError("");
    }
  }, [isOpen]);

  // Reset errors when step changes
  useEffect(() => {
    setError("");
  }, [step, mode]);

  if (!isOpen) return null;

  const selectedCountry =
    countryCodes.find((c) => c.code === countryCode) || countryCodes[0];
  const fullPhone = `${countryCode}${phone}`;

  const handleModeChange = (nextMode: SignupMode) => {
    setMode(nextMode);
    setError("");
    setPhoneVerified(false);
    setPhoneOtpSent(false);
    setPhoneOtp("");
    setPhoneError("");
  };

  const handlePhoneContinue = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!/^\d{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: fullPhone,
          email: `${fullPhone}@otp.ecampus`,
          name: "",
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to send verification code");
      }

      setResendCooldown(30);
      setStep("otp");
    } catch (err: any) {
      setError(err.message || "Something went wrong while sending code.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailStepContinue = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "email",
          email: normalizedEmail,
          name: "",
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to send verification code");
      }

      setResendCooldown(30);
      setStep("otp");
    } catch (err: any) {
      setError(err.message || "Something went wrong while sending code.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    setError("");

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const payload =
        mode === "email"
          ? { email: email.trim().toLowerCase(), otp }
          : { phone: fullPhone, otp };

      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Invalid OTP code. Please try again.");
      }

      // CRITICAL REQUIREMENT:
      // If user account is already made and already has answers to questions, do not ask them again!
      if ((data.isExistingUser || data.hasProfileDetails) && data.hasProfileDetails && data.hasAdvisorProfile && data.student) {
        localStorage.setItem("ecampus_student", JSON.stringify(data.student));
        window.dispatchEvent(new Event("ecampus-auth-change"));
        onClose();
        router.push("/dashboard");
        return;
      }

      // Pre-fill whatever answers the system already has on record
      if (data.student) {
        if (data.student.name) setName(data.student.name);
        if (data.student.email && !email) setEmail(data.student.email);
        if (data.student.state) setState(data.student.state);
        if (data.student.dob) setDob(data.student.dob);
        if (data.student.course) setCourse(data.student.course);
        else if (data.student.coursesInterested?.length) setCourse(data.student.coursesInterested[0]);

        // If user already answered profile details but only lacks advisor questions, skip straight to advisor
        if (data.hasProfileDetails && !data.hasAdvisorProfile) {
          localStorage.setItem("ecampus_student", JSON.stringify(data.student));
          window.dispatchEvent(new Event("ecampus-auth-change"));
          setShowAdvisor(true);
          return;
        }
      }

      if (mode === "mobile") {
        setPhoneVerified(true);
      } else {
        setPhoneVerified(false);
        setPhoneOtpSent(false);
        setPhoneOtp("");
        setPhoneError("");
      }

      setStep("details");
    } catch (err: any) {
      setError(err.message || "Verification failed. Check the code and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendPhoneVerification = async (): Promise<boolean> => {
    setPhoneError("");
    setError("");

    if (!/^\d{10}$/.test(phone)) {
      setPhoneError("Please enter a valid 10-digit mobile number.");
      return false;
    }

    setPhoneLoading(true);
    try {
      const res = await fetch("/api/auth/phone/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: fullPhone,
          email: email.trim().toLowerCase(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || data.message || "Failed to send code to mobile.");
      }

      setPhoneChallengeId(data.challenge_id || "");
      setPhoneCooldown(data.resend_cooldown || 30);
      setPhoneOtpSent(true);
      return true;
    } catch (err: any) {
      setPhoneError(err.message || "Failed to send code to mobile.");
      return false;
    } finally {
      setPhoneLoading(false);
    }
  };

  const handleVerifyPhoneCode = async (overrideOtp?: string): Promise<boolean> => {
    setPhoneError("");
    setError("");

    const codeToVerify = (overrideOtp || phoneOtp).trim();
    if (!/^\d{6}$/.test(codeToVerify)) {
      setPhoneError("Please enter the complete 6-digit OTP.");
      return false;
    }

    setPhoneLoading(true);
    try {
      const res = await fetch("/api/auth/phone/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: fullPhone,
          code: codeToVerify,
          challenge_id: phoneChallengeId,
          email: email.trim().toLowerCase(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || data.message || "Invalid OTP code. Please check and try again.");
      }

      setPhoneVerified(true);
      setPhoneOtpSent(false);
      setPhoneOtp("");
      return true;
    } catch (err: any) {
      setPhoneError(err.message || "Phone verification failed. Please try again.");
      return false;
    } finally {
      setPhoneLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0 || loading) return;

    setError("");
    setLoading(true);

    try {
      const payload =
        mode === "email"
          ? { email: email.trim().toLowerCase() }
          : { phone: fullPhone };

      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to resend code");
      }

      setResendCooldown(30);
    } catch (err: any) {
      setError(err.message || "Something went wrong while resending code.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setOtp("");
    setStep("phone");
    setError("");
  };

  const handleDetailsSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setPhoneError("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (mode === "mobile") {
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        setError("Please enter a valid email address.");
        return;
      }
    } else {
      // mode === "email"
      if (!/^\d{10}$/.test(phone)) {
        setError("Please enter a valid 10-digit mobile number.");
        return;
      }

      if (!phoneVerified) {
        if (!phoneOtpSent) {
          const sent = await handleSendPhoneVerification();
          if (sent) {
            setError("We've sent an OTP to verify your mobile number. Enter the 6-digit code below.");
          }
          return;
        } else if (phoneOtp.length === 6) {
          const verified = await handleVerifyPhoneCode();
          if (!verified) return;
        } else {
          setPhoneError("Please enter the 6-digit OTP code sent to your mobile.");
          return;
        }
      }
    }

    setLoading(true);

    const rawPrev = localStorage.getItem("ecampus_student");
    const prevData = rawPrev ? JSON.parse(rawPrev) : {};

    const student = {
      ...prevData,
      name: name.trim(),
      email: email.trim(),
      phone: fullPhone,
      coursesInterested: course ? [course] : (prevData.coursesInterested || []),
      course: course || prevData.course || undefined,
      state: state || prevData.state || undefined,
      dob: dob || prevData.dob || undefined,
      referralCode: referralCode.trim() || prevData.referralCode || undefined,
      whatsappOptIn,
      joinedAt: prevData.joinedAt || new Date().toISOString(),
      ...(prevData.spinReward ? { spinReward: prevData.spinReward } : {}),
      ...(prevData.spinSkipped ? { spinSkipped: true } : {}),
    };

    try {
      await fetch("/api/auth/register-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });
    } catch (saveErr) {
      console.error("Failed saving registration details:", saveErr);
    } finally {
      setLoading(false);
    }

    localStorage.setItem("ecampus_student", JSON.stringify(student));
    window.dispatchEvent(new Event("ecampus-auth-change"));

    setShowAdvisor(true);
  };

  const finishOnboarding = async (answers?: AdvisorAnswers) => {
    if (answers) {
      const raw = localStorage.getItem("ecampus_student");
      const student = raw ? JSON.parse(raw) : {};
      const updated = { ...student, advisorProfile: answers };
      localStorage.setItem("ecampus_student", JSON.stringify(updated));
      window.dispatchEvent(new Event("ecampus-auth-change"));

      try {
        await fetch("/api/auth/register-details", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        });
      } catch (err) {
        console.error("Failed updating advisor answers:", err);
      }
    }

    setShowAdvisor(false);
    onClose();
    router.push("/dashboard");
  };

  if (showAdvisor) {
    return (
      <AIAdvisorModal
        onClose={() => finishOnboarding()}
        onComplete={(answers) => finishOnboarding(answers)}
      />
    );
  }

  const filteredStates = indianStates.filter((s) =>
    s.toLowerCase().includes(stateSearch.toLowerCase().trim()),
  );

  const filteredCourses = courseOptions.filter((c) =>
    c.toLowerCase().includes(courseSearch.toLowerCase().trim()),
  );

  const activeIdentifier = mode === "email" ? email : fullPhone;

  return (
    <AnimatePresence>
      {isOpen && (
        <div data-auth-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto overscroll-contain">
          {/* Backdrop with smooth blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className={`relative z-10 w-full overflow-hidden rounded-[28px] sm:rounded-[32px] bg-white shadow-[0_25px_70px_rgba(0,0,0,0.28)] border border-slate-100 my-auto ${step === "details" ? "max-w-[530px]" : "max-w-[480px] sm:max-w-[500px]"
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top decorative gradient accent bar */}
            <div className="h-2 w-full bg-gradient-to-r from-[#DC2626] via-[#EA580C] to-[#FB923C] shrink-0" />

            {/* Top Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 sm:right-5 top-4 sm:top-5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#F1F5F9] text-[#64748B] transition-colors hover:bg-slate-200 hover:text-slate-800 cursor-pointer"
            >
              <X className="h-4 w-4 stroke-[2.2]" />
            </button>

            {/* Top Back Button (Only on OTP step) */}
            {step === "otp" && (
              <button
                type="button"
                onClick={handleBack}
                aria-label="Back"
                className="absolute left-4 sm:left-5 top-4 sm:top-5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#F1F5F9] text-[#64748B] transition-colors hover:bg-slate-200 hover:text-slate-800 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4 stroke-[2.2]" />
              </button>
            )}

            {/* Modal Content */}
            <div className="px-6 py-6 sm:px-8 sm:py-8">
              {/* Header Branding */}
              <div className="flex flex-col items-center text-center">
                <img
                  src="/image/logo.png"
                  alt="eCampus"
                  className="h-8 sm:h-9 w-auto object-contain mx-auto"
                />

                {/* Eyebrow badge (Only on details & otp steps) */}
                {step === "details" && (
                  <div className="mt-3.5 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold bg-[#FFF1F2] text-[#E11D48]">
                    <Sparkles className="h-3.5 w-3.5 text-[#E11D48] fill-[#E11D48]/25" />
                    <span>Almost Done!</span>
                  </div>
                )}
                {step === "otp" && (
                  <div className="mt-3.5 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold bg-rose-50 text-rose-600 border border-rose-100/80 shadow-2xs">
                    <Sparkles className="h-3.5 w-3.5 text-rose-600 fill-rose-600/25" />
                    <span>Security Verification</span>
                  </div>
                )}

                {/* Title */}
                <h2 className={`font-bold tracking-tight text-[#0D1527] ${step === "phone" ? "mt-3.5 mb-1 text-[26px] sm:text-[30px]" : "mt-2 text-2xl sm:text-[26px]"}`}>
                  {step === "details"
                    ? "Complete Your Profile"
                    : step === "otp"
                      ? "Enter Verification Code"
                      : "Login/ Sign Up"}
                </h2>

                {/* Subtitle (Shown on OTP step) */}
                {step === "otp" && (
                  <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-[320px] leading-relaxed">
                    <span className="inline-flex items-center justify-center gap-1 flex-wrap">
                      <span>Code sent to</span>
                      <span className="font-semibold text-slate-800">
                        {activeIdentifier}
                      </span>
                      <button
                        type="button"
                        onClick={handleBack}
                        className="inline-flex items-center gap-0.5 text-xs font-semibold text-red-600 hover:text-red-700 hover:underline ml-0.5"
                      >
                        <Pencil className="h-3 w-3" />
                        Edit
                      </button>
                    </span>
                  </p>
                )}
              </div>

              {/* Error Banner */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50/90 px-3.5 py-2.5 text-xs font-medium text-red-700 shadow-xs"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-red-600 shrink-0" />
                  <span className="flex-1">{error}</span>
                </motion.div>
              )}

              {/* STEP 1: Phone / Email Input */}
              {step === "phone" && (
                <div className="mt-5">
                  {/* Segmented Mode Selector */}
                  <div className="grid grid-cols-2 p-1.5 sm:p-2 rounded-2xl bg-[#F0F4F8] mb-6">
                    <button
                      type="button"
                      onClick={() => handleModeChange("mobile")}
                      className={`relative flex h-12 sm:h-13 items-center justify-center gap-2 rounded-xl sm:rounded-[14px] px-2.5 sm:px-3 text-xs sm:text-[13.5px] font-bold transition-all cursor-pointer whitespace-nowrap ${mode === "mobile"
                          ? "bg-white text-[#0F172A] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                          : "text-slate-600 hover:text-slate-900"
                        }`}
                    >
                      <Smartphone className={`h-4.5 w-4.5 shrink-0 ${mode === "mobile" ? "text-[#DC2626]" : "text-slate-500"}`} />
                      <span className="whitespace-nowrap">Mobile OTP (Primary)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleModeChange("email")}
                      className={`relative flex h-12 sm:h-13 items-center justify-center gap-2 rounded-xl sm:rounded-[14px] px-2.5 sm:px-3 text-xs sm:text-[13.5px] font-bold transition-all cursor-pointer whitespace-nowrap ${mode === "email"
                          ? "bg-white text-[#0F172A] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                          : "text-slate-600 hover:text-slate-900"
                        }`}
                    >
                      <Mail className={`h-4.5 w-4.5 shrink-0 ${mode === "email" ? "text-[#DC2626]" : "text-slate-500"}`} />
                      <span className="whitespace-nowrap">Email</span>
                    </button>
                  </div>

                  {/* Form Container */}
                  <div>
                    {mode === "mobile" ? (
                      <form onSubmit={handlePhoneContinue} className="flex flex-col gap-4">
                        <div>
                          <label className="mb-2 block text-xs sm:text-[13px] font-semibold text-[#1E293B]">
                            Registered Mobile Number
                          </label>
                          <div className="relative flex h-[54px] sm:h-[58px] items-center rounded-2xl border border-slate-300 bg-white shadow-2xs transition-all hover:border-slate-400 focus-within:border-[#818CF8] focus-within:ring-4 focus-within:ring-indigo-500/10 overflow-hidden">
                            {/* Country Picker (seamless left section with divider, NO inner box) */}
                            <div className="relative flex shrink-0 items-center gap-2 border-r border-slate-200 px-4 sm:px-4.5 h-full text-slate-800 select-none cursor-pointer hover:bg-slate-50/70 transition-colors">
                              <span className="text-xl sm:text-2xl leading-none">
                                {selectedCountry.flag}
                              </span>
                              <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                                {selectedCountry.code}
                              </span>
                              <ChevronDown className="h-4 w-4 text-slate-400" />
                              <select
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                              >
                                {countryCodes.map((c) => (
                                  <option key={c.code} value={c.code}>
                                    {c.flag} {c.code} ({c.name})
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Phone Input */}
                            <input
                              type="tel"
                              inputMode="numeric"
                              autoFocus
                              placeholder="Enter 10-digit number"
                              value={phone}
                              onChange={(e) =>
                                setPhone(
                                  e.target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 10),
                                )
                              }
                              maxLength={10}
                              required
                              className="h-full min-w-0 flex-1 !border-0 !border-none !rounded-none !bg-transparent px-4 sm:px-5 text-base sm:text-[16px] font-medium text-slate-900 !outline-none !shadow-none !ring-0 focus:!border-0 focus:!border-none focus:!rounded-none focus:!bg-transparent focus:!shadow-none focus:!ring-0 focus:!outline-none placeholder:text-slate-400 placeholder:font-normal"
                            />

                            {phone.length > 0 && (
                              <button
                                type="button"
                                onClick={() => setPhone("")}
                                className="mr-3.5 flex h-5.5 w-5.5 items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors cursor-pointer shrink-0"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          disabled={loading || phone.length < 10}
                          className="relative group mt-1.5 flex h-12.5 sm:h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#F87171] to-[#FB7185] hover:from-[#EF4444] hover:to-[#F43F5E] text-sm sm:text-base font-bold tracking-normal text-white shadow-[0_8px_20px_rgba(248,113,113,0.38)] hover:shadow-[0_10px_24px_rgba(248,113,113,0.48)] transition-all active:scale-[0.99] disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed cursor-pointer"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Sending OTP…</span>
                            </>
                          ) : (
                            <>
                              <span>Get Login OTP</span>
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </>
                          )}
                        </Button>
                      </form>
                    ) : (
                      <form onSubmit={handleEmailStepContinue} className="flex flex-col gap-4">
                        <div>
                          <label className="mb-2 block text-xs sm:text-[13px] font-semibold text-[#1E293B]">
                            Registered Email Address
                          </label>
                          <div className="relative flex h-14 sm:h-[58px] items-center rounded-2xl border border-slate-300 bg-white shadow-2xs transition-all hover:border-slate-400 focus-within:border-[#818CF8] focus-within:ring-4 focus-within:ring-indigo-500/10 overflow-hidden">
                            <div className="flex shrink-0 items-center justify-center border-r border-slate-200 px-4 h-full text-slate-400">
                              <Mail className="h-5 w-5" />
                            </div>

                            <input
                              type="email"
                              inputMode="email"
                              autoFocus
                              autoComplete="email"
                              placeholder="Enter your email address"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="h-full min-w-0 flex-1 !border-0 !border-none !rounded-none !bg-transparent px-4 text-base sm:text-[16px] font-medium text-slate-900 !outline-none !shadow-none !ring-0 focus:!border-0 focus:!border-none focus:!rounded-none focus:!bg-transparent focus:!shadow-none focus:!ring-0 focus:!outline-none placeholder:text-slate-400 placeholder:font-normal"
                            />
                            {email.length > 0 && (
                              <button
                                type="button"
                                onClick={() => setEmail("")}
                                className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors cursor-pointer shrink-0"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          disabled={loading || !email}
                          className="relative group mt-1.5 flex h-12.5 sm:h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#F87171] to-[#FB7185] hover:from-[#EF4444] hover:to-[#F43F5E] text-sm sm:text-base font-bold tracking-normal text-white shadow-[0_8px_20px_rgba(248,113,113,0.38)] hover:shadow-[0_10px_24px_rgba(248,113,113,0.48)] transition-all active:scale-[0.99] disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed cursor-pointer"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Sending Code…</span>
                            </>
                          ) : (
                            <>
                              <span>Get Login OTP</span>
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2: OTP Verification */}
              {step === "otp" && (
                <div className="mt-5">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-50 to-red-100 border border-rose-200/60 text-red-600 shadow-xs">
                    <ShieldCheck className="h-6 w-6" />
                  </div>

                  <form onSubmit={handleOtpVerify} className="mt-4 flex flex-col items-center gap-4">
                    {/* OTP Pin Input */}
                    <div className="w-full flex justify-center py-1">
                      <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={(value) => {
                          setOtp(value);
                          if (value.length === 6) {
                            setError("");
                          }
                        }}
                        autoFocus
                      >
                        <InputOTPGroup className="gap-2 sm:gap-2.5">
                          {[0, 1, 2, 3, 4, 5].map((index) => (
                            <InputOTPSlot
                              key={index}
                              index={index}
                              className="h-12 w-10 sm:h-12 sm:w-11 rounded-xl border border-slate-200 bg-slate-50/60 text-lg sm:text-xl font-bold text-slate-900 transition-all focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 first:rounded-xl first:border last:rounded-xl shadow-xs"
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    {/* Resend OTP Bar */}
                    <div className="flex items-center justify-center gap-2 text-xs">
                      {resendCooldown > 0 ? (
                        <span className="text-slate-400 font-medium">
                          Resend code in{" "}
                          <span className="font-semibold text-slate-700">
                            {resendCooldown}s
                          </span>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          disabled={loading}
                          className="inline-flex items-center gap-1 font-semibold text-red-600 hover:text-red-700 hover:underline transition-colors disabled:opacity-50"
                        >
                          <RotateCw className="h-3 w-3" />
                          <span>Resend OTP Code</span>
                        </button>
                      )}
                    </div>

                    {/* Verify Action Button */}
                    <Button
                      type="submit"
                      disabled={loading || otp.length !== 6}
                      className="group mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 via-[#ee2c3c] to-rose-600 text-sm font-semibold text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/30 hover:brightness-105 active:scale-[0.99] disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <>
                          <span>Verify & Proceed</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              )}

              {/* STEP 3: Details Onboarding */}
              {step === "details" && (
                <form onSubmit={handleDetailsSubmit} className="mt-4 flex flex-col gap-3.5 sm:gap-4">
                  {/* Verified Banner */}
                  <div className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 px-4 py-2.5 text-xs sm:text-[13px] font-semibold text-emerald-800 shadow-2xs">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 stroke-[2.2]" />
                    <span>Mobile verified successfully!</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    {/* Full Name */}
                    <div>
                      <label className="mb-1.5 block text-xs sm:text-[13px] font-semibold text-[#1E293B]">
                        Full Name <span className="text-[#DC2626] font-medium">*</span>
                      </label>
                      <div className="relative flex h-[50px] sm:h-[54px] w-full items-center rounded-2xl border border-slate-300 bg-white px-3.5 sm:px-4 shadow-2xs transition-all hover:border-slate-400 focus-within:border-[#818CF8] focus-within:ring-4 focus-within:ring-indigo-500/10 overflow-hidden">
                        <User className="h-5 w-5 text-slate-400 shrink-0 mr-2.5 pointer-events-none stroke-[1.8]" />
                        <input
                          type="text"
                          placeholder="Your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="h-full w-full min-w-0 flex-1 !border-0 !border-none !rounded-none !bg-transparent text-sm sm:text-base font-medium text-slate-900 !outline-none !shadow-none !ring-0 focus:!border-0 focus:!border-none focus:!rounded-none focus:!bg-transparent focus:!shadow-none focus:!ring-0 focus:!outline-none placeholder:text-slate-400 placeholder:font-normal"
                        />
                      </div>
                    </div>

                    {/* Secondary Contact (Email if registered by mobile, or Phone if registered by email) */}
                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <label className="block text-xs sm:text-[13px] font-semibold text-[#1E293B]">
                          {mode === "mobile" ? "Email Address" : "Mobile Number"}{" "}
                          <span className="text-[#DC2626] font-medium">*</span>
                        </label>
                        {mode === "email" && phoneVerified && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <Check className="h-3 w-3" />
                            Verified
                          </span>
                        )}
                        {mode === "email" && !phoneVerified && phoneOtpSent && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            <ShieldCheck className="h-3 w-3" />
                            OTP Sent
                          </span>
                        )}
                      </div>

                      {mode === "mobile" ? (
                        <div className="relative flex h-[50px] sm:h-[54px] w-full items-center rounded-2xl border border-slate-300 bg-white px-3.5 sm:px-4 shadow-2xs transition-all hover:border-slate-400 focus-within:border-[#818CF8] focus-within:ring-4 focus-within:ring-indigo-500/10 overflow-hidden">
                          <Mail className="h-5 w-5 text-slate-400 shrink-0 mr-2.5 pointer-events-none stroke-[1.8]" />
                          <input
                            type="email"
                            inputMode="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-full w-full min-w-0 flex-1 !border-0 !border-none !rounded-none !bg-transparent text-sm sm:text-base font-medium text-slate-900 !outline-none !shadow-none !ring-0 focus:!border-0 focus:!border-none focus:!rounded-none focus:!bg-transparent focus:!shadow-none focus:!ring-0 focus:!outline-none placeholder:text-slate-400 placeholder:font-normal"
                          />
                        </div>
                      ) : (
                        <div className="relative flex h-[50px] sm:h-[54px] items-center rounded-2xl border border-slate-300 bg-white shadow-2xs transition-all hover:border-slate-400 focus-within:border-[#818CF8] focus-within:ring-4 focus-within:ring-indigo-500/10 overflow-hidden">
                          {/* Country Code Dropdown */}
                          <div className="relative flex shrink-0 items-center gap-1.5 border-r border-slate-200 px-3 h-full text-slate-800 select-none cursor-pointer hover:bg-slate-50/70 transition-colors">
                            <span className="text-base leading-none">{selectedCountry.flag}</span>
                            <span className="text-xs sm:text-sm font-bold text-slate-900">{selectedCountry.code}</span>
                            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                            <select
                              value={countryCode}
                              disabled={phoneVerified}
                              onChange={(e) => {
                                setCountryCode(e.target.value);
                                if (phoneVerified) {
                                  setPhoneVerified(false);
                                  setPhoneOtpSent(false);
                                  setPhoneOtp("");
                                }
                              }}
                              className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
                            >
                              {countryCodes.map((c) => (
                                <option key={c.code} value={c.code}>
                                  {c.flag} {c.code} ({c.name})
                                </option>
                              ))}
                            </select>
                          </div>

                          <input
                            type="tel"
                            inputMode="numeric"
                            placeholder="10-digit number"
                            value={phone}
                            disabled={phoneVerified}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                              setPhone(val);
                              if (phoneVerified) {
                                setPhoneVerified(false);
                                setPhoneOtpSent(false);
                                setPhoneOtp("");
                              }
                            }}
                            required
                            className="h-full min-w-0 flex-1 !border-0 !border-none !rounded-none !bg-transparent px-3 text-sm sm:text-base font-medium text-slate-900 !outline-none !shadow-none !ring-0 focus:!border-0 focus:!border-none focus:!rounded-none focus:!bg-transparent focus:!shadow-none focus:!ring-0 focus:!outline-none placeholder:text-slate-400 placeholder:font-normal disabled:text-slate-500"
                          />

                          {/* Action inside input: Verify button or Change link */}
                          {phoneVerified ? (
                            <button
                              type="button"
                              onClick={() => {
                                setPhoneVerified(false);
                                setPhoneOtpSent(false);
                                setPhoneOtp("");
                              }}
                              className="mr-3 inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-red-600 underline shrink-0 cursor-pointer"
                            >
                              Change
                            </button>
                          ) : phone.length === 10 ? (
                            <div className="mr-2 shrink-0">
                              <button
                                type="button"
                                disabled={phoneLoading}
                                onClick={() => handleSendPhoneVerification()}
                                className="inline-flex h-8 items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-[#F87171] to-[#FB7185] hover:from-[#EF4444] hover:to-[#F43F5E] px-3 text-xs font-bold text-white shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
                              >
                                {phoneLoading ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : phoneOtpSent ? (
                                  "Resend"
                                ) : (
                                  "Verify"
                                )}
                              </button>
                            </div>
                          ) : null}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Inline Phone OTP verification card: Rendered when user inputs phone and OTP is sent */}
                  {mode === "email" && phoneOtpSent && !phoneVerified && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -4 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -4 }}
                      className="overflow-hidden rounded-2xl border border-red-200/90 bg-gradient-to-b from-red-50/70 to-white p-3.5 shadow-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100 text-red-600 shrink-0">
                            <ShieldCheck className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-900">
                              Verify Mobile Number
                            </p>
                            <p className="text-[11px] text-slate-500">
                              Enter 6-digit OTP sent to{" "}
                              <span className="font-semibold text-slate-700">
                                {countryCode} {phone}
                              </span>
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setPhoneOtpSent(false);
                            setPhoneOtp("");
                            setPhoneError("");
                          }}
                          className="text-[11px] font-medium text-slate-500 hover:text-slate-800 underline"
                        >
                          Change number
                        </button>
                      </div>

                      {/* OTP Slots & Verify CTA */}
                      <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
                        <InputOTP
                          maxLength={6}
                          value={phoneOtp}
                          onChange={(val) => {
                            setPhoneOtp(val);
                            setPhoneError("");
                            if (val.length === 6) {
                              setTimeout(() => {
                                handleVerifyPhoneCode(val);
                              }, 100);
                            }
                          }}
                        >
                          <InputOTPGroup className="gap-1 sm:gap-1.5">
                            <InputOTPSlot index={0} className="h-10 w-9 sm:w-10 rounded-xl border-slate-300 bg-white text-sm font-bold shadow-xs" />
                            <InputOTPSlot index={1} className="h-10 w-9 sm:w-10 rounded-xl border-slate-300 bg-white text-sm font-bold shadow-xs" />
                            <InputOTPSlot index={2} className="h-10 w-9 sm:w-10 rounded-xl border-slate-300 bg-white text-sm font-bold shadow-xs" />
                            <InputOTPSlot index={3} className="h-10 w-9 sm:w-10 rounded-xl border-slate-300 bg-white text-sm font-bold shadow-xs" />
                            <InputOTPSlot index={4} className="h-10 w-9 sm:w-10 rounded-xl border-slate-300 bg-white text-sm font-bold shadow-xs" />
                            <InputOTPSlot index={5} className="h-10 w-9 sm:w-10 rounded-xl border-slate-300 bg-white text-sm font-bold shadow-xs" />
                          </InputOTPGroup>
                        </InputOTP>

                        <Button
                          type="button"
                          disabled={phoneOtp.length !== 6 || phoneLoading}
                          onClick={() => handleVerifyPhoneCode(phoneOtp)}
                          className="h-10 rounded-xl bg-red-600 hover:bg-red-700 px-4 text-xs font-semibold text-white shadow-xs shrink-0"
                        >
                          {phoneLoading ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            "Verify Code"
                          )}
                        </Button>
                      </div>

                      {/* Cooldown & Resend */}
                      <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500">
                        <span>Didn't receive the OTP?</span>
                        <button
                          type="button"
                          disabled={phoneCooldown > 0 || phoneLoading}
                          onClick={() => handleSendPhoneVerification()}
                          className="font-semibold text-red-600 hover:text-red-700 disabled:text-slate-400 disabled:cursor-not-allowed"
                        >
                          {phoneCooldown > 0 ? `Resend in ${phoneCooldown}s` : "Resend OTP"}
                        </button>
                      </div>

                      {phoneError && (
                        <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-red-100/90 px-2.5 py-1.5 text-[11px] font-medium text-red-700">
                          <span className="h-1 w-1 rounded-full bg-red-600 shrink-0" />
                          <span>{phoneError}</span>
                        </div>
                      )}
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    {/* Your State (Left column) */}
                    <div ref={stateRef} className="relative">
                      <label className="mb-1.5 block text-xs sm:text-[13px] font-semibold text-[#1E293B]">
                        Your State
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setStateOpen((v) => !v);
                        }}
                        className="flex h-[50px] sm:h-[54px] w-full items-center justify-between rounded-2xl border border-slate-300 bg-white px-3.5 sm:px-4 text-left text-sm sm:text-base font-medium shadow-2xs transition-all hover:border-slate-400 focus:border-[#818CF8] focus:ring-4 focus:ring-indigo-500/10 cursor-pointer"
                      >
                        <span className={state ? "truncate text-slate-900 font-medium" : "text-slate-400 font-normal"}>
                          {state || "Select your state"}
                        </span>
                        <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform shrink-0 ${stateOpen ? "rotate-180" : ""}`} />
                      </button>

                      {stateOpen && (
                        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl flex flex-col p-1.5">
                          <div className="relative p-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                            <input
                              type="text"
                              placeholder="Search state..."
                              value={stateSearch}
                              onChange={(e) => setStateSearch(e.target.value)}
                              className="h-9 w-full !rounded-xl !bg-slate-50 pl-8 pr-3 text-xs font-medium text-slate-900 !outline-none !border !border-slate-200 focus:!border-[#818CF8] focus:!bg-white focus:!ring-2 focus:!ring-indigo-500/20"
                            />
                          </div>
                          <div className="overflow-y-auto max-h-40 mt-1">
                            {filteredStates.length > 0 ? (
                              filteredStates.map((opt) => {
                                const selected = state === opt;
                                return (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => {
                                      setState(opt);
                                      setStateOpen(false);
                                      setStateSearch("");
                                    }}
                                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition-colors cursor-pointer ${selected
                                        ? "bg-red-50 text-red-600 font-semibold"
                                        : "text-slate-700 hover:bg-slate-50"
                                      }`}
                                  >
                                    <span>{opt}</span>
                                    {selected && <Check className="h-3.5 w-3.5 text-red-600" />}
                                  </button>
                                );
                              })
                            ) : (
                              <p className="p-2 text-center text-xs text-slate-400">No states match</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Date of Birth Calendar (Right column) */}
                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <label className="text-xs sm:text-[13px] font-semibold text-[#1E293B]">
                          Date of Birth
                        </label>
                        <span className="text-[11px] font-normal text-slate-400">Optional</span>
                      </div>
                      <div className="relative flex h-[50px] sm:h-[54px] w-full items-center rounded-2xl border border-slate-300 bg-white px-3.5 sm:px-4 shadow-2xs transition-all hover:border-slate-400 focus-within:border-[#818CF8] focus-within:ring-4 focus-within:ring-indigo-500/10 cursor-pointer overflow-hidden">
                        <Calendar className="mr-2.5 h-5 w-5 text-slate-400 shrink-0 pointer-events-none stroke-[1.8]" />
                        <input
                          type="date"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          max={new Date().toISOString().split("T")[0]}
                          min="1940-01-01"
                          placeholder="dd/mm/yyyy"
                          className="h-full w-full min-w-0 flex-1 !border-0 !border-none !rounded-none !bg-transparent text-sm sm:text-base font-medium text-slate-900 !outline-none !shadow-none !ring-0 focus:!border-0 focus:!border-none focus:!rounded-none focus:!bg-transparent focus:!shadow-none focus:!ring-0 focus:!outline-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Referral Code Accordion */}
                  <div className="pt-0.5">
                    {!showReferral ? (
                      <button
                        type="button"
                        onClick={() => setShowReferral(true)}
                        className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-[#DC2626] hover:text-[#B91C1C] hover:underline cursor-pointer transition-colors"
                      >
                        <Gift className="h-4 w-4 text-[#DC2626]" />
                        <span>Have a referral or coupon code?</span>
                      </button>
                    ) : (
                      <div>
                        <label className="mb-1.5 block text-xs sm:text-[13px] font-semibold text-[#1E293B]">
                          Referral Code
                        </label>
                        <div className="flex h-[50px] sm:h-[54px] items-center rounded-2xl border border-slate-300 bg-white px-3.5 sm:px-4 shadow-2xs transition-all hover:border-slate-400 focus-within:border-[#818CF8] focus-within:ring-4 focus-within:ring-indigo-500/10 overflow-hidden">
                          <input
                            type="text"
                            placeholder="Enter code (optional)"
                            value={referralCode}
                            onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                            className="h-full w-full min-w-0 flex-1 !border-0 !border-none !rounded-none !bg-transparent text-sm sm:text-base font-semibold tracking-wider uppercase text-slate-900 !outline-none !shadow-none !ring-0 focus:!border-0 focus:!border-none focus:!rounded-none focus:!bg-transparent focus:!shadow-none focus:!ring-0 focus:!outline-none placeholder:text-slate-400 placeholder:font-normal placeholder:normal-case"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* WhatsApp Opt-in Card */}
                  <div
                    onClick={() => setWhatsappOptIn(!whatsappOptIn)}
                    className="flex items-center gap-3.5 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] p-3.5 sm:p-4 cursor-pointer select-none transition-colors hover:bg-[#EAFBF0]"
                  >
                    {/* Custom Green Checkbox */}
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-colors ${whatsappOptIn
                          ? "bg-[#059669] text-white shadow-2xs"
                          : "border-2 border-slate-300 bg-white"
                        }`}
                    >
                      {whatsappOptIn && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-[#0F172A]">
                        <MessageSquare className="h-4 w-4 text-[#059669] shrink-0" />
                        <span>Get updates on WhatsApp</span>
                      </div>
                      <p className="mt-0.5 text-[11px] sm:text-xs leading-relaxed text-[#065F46]/80">
                        Receive university brochures, EMI options & counseling alerts.
                      </p>
                    </div>
                  </div>

                  {/* Finish Profile CTA */}
                  <Button
                    type="submit"
                    disabled={loading || phoneLoading}
                    className="group mt-2 flex h-13 sm:h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#F87171] to-[#FB7185] hover:from-[#EF4444] hover:to-[#F43F5E] text-sm sm:text-base font-bold tracking-normal text-white shadow-[0_8px_20px_rgba(248,113,113,0.38)] hover:shadow-[0_10px_24px_rgba(248,113,113,0.48)] transition-all active:scale-[0.99] disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Saving Profile...</span>
                      </>
                    ) : mode === "email" && !phoneVerified ? (
                      <>
                        {phoneLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Verifying Mobile...</span>
                          </>
                        ) : phoneOtpSent ? (
                          <>
                            <ShieldCheck className="h-4 w-4" />
                            <span>Enter OTP & Complete</span>
                          </>
                        ) : (
                          <>
                            <span>Verify Mobile & Complete</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <span>Complete & Explore Universities</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </Button>
                </form>
              )}

              {/* Bottom Footer: Legal */}
              <div className="mt-4 sm:mt-5 text-center">
                <p className="text-xs text-slate-500 leading-relaxed">
                  By continuing, you agree to our{" "}
                  <a
                    href="/terms"
                    className="underline hover:text-slate-800 transition-colors"
                  >
                    Terms
                  </a>{" "}
                  &{" "}
                  <a
                    href="/privacy"
                    className="underline hover:text-slate-800 transition-colors"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}