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
  MapPin,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { courseOptions } from "@/data/course-options";
import { indianStates } from "@/data/indian-states";
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
  const [coursesOpen, setCoursesOpen] = useState(false);

  const [state, setState] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const [stateOpen, setStateOpen] = useState(false);

  const [referralCode, setReferralCode] = useState("");
  const [showReferral, setShowReferral] = useState(false);
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);
  const [showAdvisor, setShowAdvisor] = useState(false);

  const coursesRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    if (!coursesOpen && !stateOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        coursesRef.current &&
        !coursesRef.current.contains(event.target as Node)
      ) {
        setCoursesOpen(false);
      }
      if (
        stateRef.current &&
        !stateRef.current.contains(event.target as Node)
      ) {
        setStateOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [coursesOpen, stateOpen]);

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

    const student = {
      name: name.trim(),
      email: email.trim(),
      phone: fullPhone,
      coursesInterested: course ? [course] : [],
      course: course || undefined,
      state: state || undefined,
      referralCode: referralCode.trim() || undefined,
      whatsappOptIn,
      joinedAt: new Date().toISOString(),
    };

    try {
      await fetch("/api/auth/register-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });
    } catch (saveErr) {
      console.error("Failed saving to web_users database:", saveErr);
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

  const filteredCourses = courseOptions.filter((c) =>
    c.toLowerCase().includes(courseSearch.toLowerCase().trim()),
  );

  const filteredStates = indianStates.filter((s) =>
    s.toLowerCase().includes(stateSearch.toLowerCase().trim()),
  );

  const activeIdentifier = mode === "email" ? email : fullPhone;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto overscroll-contain">
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
            className={`relative z-10 w-full overflow-hidden rounded-3xl bg-white shadow-[0_25px_70px_rgba(0,0,0,0.22)] border border-slate-100 my-auto ${
              step === "details" ? "max-w-[480px]" : "max-w-[410px]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top decorative vibrant gradient accent */}
            <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500" />

            {/* Top Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3.5 top-4.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100/80 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Top Back Button (Only on OTP step) */}
            {step === "otp" && (
              <button
                type="button"
                onClick={handleBack}
                aria-label="Back"
                className="absolute left-3.5 top-4.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100/80 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}

            {/* Modal Content */}
            <div className="px-6 py-6 sm:px-7 sm:py-7">
              {/* Header Branding */}
              <div className="flex flex-col items-center text-center">
                <img
                  src="/image/logo.png"
                  alt="eCampus"
                  className="h-7 w-auto object-contain"
                />

                {/* Eyebrow badge */}
                <div className="mt-3.5 inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-[11px] font-semibold text-rose-600 border border-rose-100/80">
                  <Sparkles className="h-3 w-3" />
                  <span>
                    {step === "details"
                      ? "Almost Done!"
                      : step === "otp"
                      ? "Security Verification"
                      : "India's Leading Higher Ed Platform"}
                  </span>
                </div>

                {/* Title */}
                <h2 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  {step === "details"
                    ? "Complete Your Profile"
                    : step === "otp"
                    ? "Enter Verification Code"
                    : mode === "email"
                    ? "Sign up with Email"
                    : "Welcome to eCampus"}
                </h2>

                {/* Subtitle */}
                <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-[320px] leading-relaxed">
                  {step === "details" ? (
                    "Tell us about your learning goals to get personalized university & scholarship matches."
                  ) : step === "otp" ? (
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
                  ) : (
                    "Explore top UGC & AICTE approved online programs with verified comparisons."
                  )}
                </p>
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
                  <div className="flex items-center rounded-2xl bg-slate-100/90 p-1 border border-slate-200/60 shadow-xs">
                    <button
                      type="button"
                      onClick={() => handleModeChange("mobile")}
                      className={`relative flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-all ${
                        mode === "mobile"
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      <Smartphone className={`h-3.5 w-3.5 ${mode === "mobile" ? "text-red-600" : "text-slate-400"}`} />
                      <span>Mobile Number</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleModeChange("email")}
                      className={`relative flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-all ${
                        mode === "email"
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      <Mail className={`h-3.5 w-3.5 ${mode === "email" ? "text-red-600" : "text-slate-400"}`} />
                      <span>Email</span>
                    </button>
                  </div>

                  {/* Form Container */}
                  <div className="mt-4">
                    {mode === "mobile" ? (
                      <form onSubmit={handlePhoneContinue} className="flex flex-col gap-3.5">
                        <div>
                          <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                            Mobile Number
                          </label>
                          <div className="group flex h-12 items-center rounded-2xl border border-slate-200 bg-white shadow-xs transition-all focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-500/10 hover:border-slate-300">
                            {/* Country Picker */}
                            <div className="relative flex shrink-0 items-center gap-1.5 border-r border-slate-200 px-3 text-slate-700">
                              <span className="text-base leading-none">
                                {selectedCountry.flag}
                              </span>
                              <span className="text-xs sm:text-sm font-semibold text-slate-900">
                                {selectedCountry.code}
                              </span>
                              <ChevronDown className="h-3 w-3 text-slate-400" />
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
                              placeholder="10-digit mobile number"
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
                              className="min-w-0 flex-1 bg-transparent px-3 text-sm font-medium tracking-wide text-slate-900 outline-none placeholder:text-slate-400 placeholder:font-normal placeholder:tracking-normal"
                            />

                            {phone.length > 0 && (
                              <button
                                type="button"
                                onClick={() => setPhone("")}
                                className="mr-3 text-slate-400 hover:text-slate-600 text-xs"
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
                          className="group mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 via-[#ee2c3c] to-rose-600 text-sm font-semibold text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/30 hover:brightness-105 active:scale-[0.99] disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Sending OTP...</span>
                            </>
                          ) : (
                            <>
                              <span>Get OTP</span>
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </>
                          )}
                        </Button>
                      </form>
                    ) : (
                      <form onSubmit={handleEmailStepContinue} className="flex flex-col gap-3.5">
                        <div>
                          <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                            Email Address
                          </label>
                          <div className="relative flex h-12 items-center rounded-2xl border border-slate-200 bg-white shadow-xs transition-all focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-500/10 hover:border-slate-300">
                            <Mail className="absolute left-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                            <input
                              type="email"
                              inputMode="email"
                              autoFocus
                              autoComplete="email"
                              placeholder="name@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="h-full w-full rounded-2xl bg-transparent pl-10 pr-3.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 placeholder:font-normal"
                            />
                            {email.length > 0 && (
                              <button
                                type="button"
                                onClick={() => setEmail("")}
                                className="mr-3 text-slate-400 hover:text-slate-600 text-xs"
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
                          className="group mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 via-[#ee2c3c] to-rose-600 text-sm font-semibold text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/30 hover:brightness-105 active:scale-[0.99] disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Sending Code...</span>
                            </>
                          ) : (
                            <>
                              <span>Continue with Email</span>
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </div>

                  {/* Trust Highlights Strip */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-around text-center">
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      <span>100% Free & Safe</span>
                    </div>
                    <span className="h-3 w-px bg-slate-200" />
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                      <GraduationCap className="h-3.5 w-3.5 text-red-600" />
                      <span>UGC Recognized</span>
                    </div>
                    <span className="h-3 w-px bg-slate-200" />
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                      <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                      <span>Instant Advice</span>
                    </div>
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
                <form onSubmit={handleDetailsSubmit} className="mt-4 flex flex-col gap-3.5">
                  {/* Verified Banner */}
                  <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200/80 px-3 py-2 text-xs font-semibold text-emerald-800">
                    <BadgeCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>
                      {mode === "mobile" ? "Mobile" : "Email"} verified successfully! Complete your profile.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Full Name */}
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-slate-700">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative flex h-11 items-center rounded-xl border border-slate-200 bg-white shadow-xs focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-500/10">
                        <User className="absolute left-3 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          autoFocus
                          placeholder="Your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="h-full w-full rounded-xl bg-transparent pl-9 pr-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 placeholder:font-normal"
                        />
                      </div>
                    </div>

                    {/* Secondary Contact (Email if registered by mobile, or Phone if registered by email) */}
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <label className="block text-xs font-semibold text-slate-700">
                          {mode === "mobile" ? "Email Address" : "Mobile Number"}{" "}
                          <span className="text-red-500">*</span>
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
                        <div className="relative flex h-11 items-center rounded-xl border border-slate-200 bg-white shadow-xs focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-500/10">
                          <Mail className="absolute left-3 h-4 w-4 text-slate-400" />
                          <input
                            type="email"
                            inputMode="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-full w-full rounded-xl bg-transparent pl-9 pr-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 placeholder:font-normal"
                          />
                        </div>
                      ) : (
                        <div className="relative flex h-11 items-center rounded-xl border border-slate-200 bg-white shadow-xs focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-500/10">
                          {/* Country Code Dropdown */}
                          <div className="relative flex shrink-0 items-center gap-1 border-r border-slate-200 px-2.5 text-slate-700">
                            <span className="text-sm leading-none">{selectedCountry.flag}</span>
                            <span className="text-xs font-semibold text-slate-800">{selectedCountry.code}</span>
                            <ChevronDown className="h-3 w-3 text-slate-400" />
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
                            className="h-full min-w-0 flex-1 bg-transparent px-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 placeholder:font-normal disabled:text-slate-500"
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
                              className="mr-2 inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-red-600 underline shrink-0"
                            >
                              Change
                            </button>
                          ) : phone.length === 10 ? (
                            <div className="mr-1.5 shrink-0">
                              <button
                                type="button"
                                disabled={phoneLoading}
                                onClick={() => handleSendPhoneVerification()}
                                className="inline-flex h-8 items-center justify-center gap-1 rounded-lg bg-red-600 hover:bg-red-700 px-2.5 text-xs font-semibold text-white shadow-xs transition-colors disabled:opacity-50"
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Course Selection */}
                    <div ref={coursesRef} className="relative">
                      <label className="mb-1 block text-xs font-semibold text-slate-700">
                        Course Interested
                      </label>
                      <button
                        type="button"
                        onClick={() => setCoursesOpen((v) => !v)}
                        className="flex h-11 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 text-left text-sm font-medium shadow-xs focus:border-red-500 focus:ring-4 focus:ring-red-500/10 hover:border-slate-300"
                      >
                        <span className={course ? "truncate text-slate-900" : "text-slate-400 font-normal"}>
                          {course || "Select degree/course"}
                        </span>
                        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${coursesOpen ? "rotate-180" : ""}`} />
                      </button>

                      {coursesOpen && (
                        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl flex flex-col p-1.5">
                          <div className="relative p-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                            <input
                              type="text"
                              placeholder="Search course..."
                              value={courseSearch}
                              onChange={(e) => setCourseSearch(e.target.value)}
                              className="h-8 w-full rounded-lg bg-slate-50 pl-8 pr-2 text-xs font-medium text-slate-900 outline-none border border-slate-200 focus:border-red-500 focus:bg-white"
                            />
                          </div>
                          <div className="overflow-y-auto max-h-40 mt-1">
                            {filteredCourses.length > 0 ? (
                              filteredCourses.map((opt) => {
                                const selected = course === opt;
                                return (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => {
                                      setCourse(opt);
                                      setCoursesOpen(false);
                                      setCourseSearch("");
                                    }}
                                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition-colors ${
                                      selected
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
                              <p className="p-2 text-center text-xs text-slate-400">No courses match</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* State Selection */}
                    <div ref={stateRef} className="relative">
                      <label className="mb-1 block text-xs font-semibold text-slate-700">
                        Your State
                      </label>
                      <button
                        type="button"
                        onClick={() => setStateOpen((v) => !v)}
                        className="flex h-11 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 text-left text-sm font-medium shadow-xs focus:border-red-500 focus:ring-4 focus:ring-red-500/10 hover:border-slate-300"
                      >
                        <span className={state ? "truncate text-slate-900" : "text-slate-400 font-normal"}>
                          {state || "Select your state"}
                        </span>
                        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${stateOpen ? "rotate-180" : ""}`} />
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
                              className="h-8 w-full rounded-lg bg-slate-50 pl-8 pr-2 text-xs font-medium text-slate-900 outline-none border border-slate-200 focus:border-red-500 focus:bg-white"
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
                                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition-colors ${
                                      selected
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
                  </div>

                  {/* Referral Code Accordion */}
                  <div>
                    {!showReferral ? (
                      <button
                        type="button"
                        onClick={() => setShowReferral(true)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 hover:underline"
                      >
                        <Gift className="h-3.5 w-3.5" />
                        <span>Have a referral or coupon code?</span>
                      </button>
                    ) : (
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-slate-700">
                          Referral Code
                        </label>
                        <div className="flex h-11 items-center rounded-xl border border-slate-200 bg-white px-3 shadow-xs focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-500/10">
                          <input
                            type="text"
                            placeholder="Enter code (optional)"
                            value={referralCode}
                            onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                            className="h-full w-full bg-transparent text-sm font-semibold tracking-wider uppercase text-slate-900 outline-none placeholder:text-slate-400 placeholder:font-normal placeholder:normal-case"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* WhatsApp Opt-in Card */}
                  <label className="flex items-center gap-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 p-3 cursor-pointer transition-colors hover:bg-emerald-50">
                    <input
                      type="checkbox"
                      checked={whatsappOptIn}
                      onChange={(e) => setWhatsappOptIn(e.target.checked)}
                      className="h-4 w-4 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600"
                    />
                    <div className="flex-1 text-xs">
                      <span className="font-semibold text-emerald-950 flex items-center gap-1">
                        <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
                        Get updates on WhatsApp
                      </span>
                      <p className="text-[11px] text-emerald-700/80 mt-0.5">
                        Receive university brochures, EMI options & counseling alerts.
                      </p>
                    </div>
                  </label>

                  {/* Finish Profile CTA */}
                  <Button
                    type="submit"
                    disabled={loading || phoneLoading}
                    className="group mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 via-[#ee2c3c] to-rose-600 text-sm font-semibold text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/30 hover:brightness-105 active:scale-[0.99] disabled:opacity-50"
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

              {/* Bottom Footer: Login Switcher & Legal */}
              <div className="mt-5 pt-3 text-center">
                <p className="text-xs text-slate-500">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      if (onSwitchToLogin) {
                        onSwitchToLogin();
                      } else {
                        onClose();
                        router.push("/login");
                      }
                    }}
                    className="font-semibold text-red-600 hover:text-red-700 hover:underline"
                  >
                    Log In
                  </button>
                </p>

                <p className="mt-2 text-[11px] text-slate-400 leading-relaxed">
                  By continuing, you agree to our{" "}
                  <a
                    href="/terms"
                    className="underline hover:text-slate-600 transition-colors"
                  >
                    Terms
                  </a>{" "}
                  &{" "}
                  <a
                    href="/privacy"
                    className="underline hover:text-slate-600 transition-colors"
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