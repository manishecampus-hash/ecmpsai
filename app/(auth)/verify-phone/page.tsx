"use client";

import { Suspense, useState, useEffect, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldAlert,
  Smartphone,
  ArrowRight,
  RotateCw,
  Loader2,
  CheckCircle2,
  LogOut,
  ChevronDown,
  Lock,
  User,
  GraduationCap,
  MapPin,
  AlertCircle,
  Mail,
  Gift,
  Check,
  MessageSquare,
  Calendar,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { courseOptions } from "@/data/course-options";
import { indianStates } from "@/data/indian-states";
import { AIAdvisorModal, type AdvisorAnswers } from "@/components/layout/ai-advisor-modal";
import { performLogout } from "@/components/auth/auth-context";

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

function VerifyPhoneContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/dashboard";

  const [step, setStep] = useState<"phone" | "otp" | "details">("phone");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  // Profile details state (if not filled earlier during signup)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [state, setState] = useState("");
  const [dob, setDob] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [showReferral, setShowReferral] = useState(false);
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);

  // Advisor questionnaire
  const [showAdvisor, setShowAdvisor] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<any>(null);

  // Check auth status
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.replace("/login");
        } else if (data.permissions?.can_access_app) {
          router.replace(returnUrl);
        } else if (data.user) {
          if (data.user.full_name) setName(data.user.full_name);
          if (data.user.email) setEmail(data.user.email);
          if (data.user.state) setState(data.user.state);
          if (data.user.dob) setDob(data.user.dob);
          if (data.user.course) setCourse(data.user.course);
        }
      })
      .catch(() => {});
  }, [router, returnUrl]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ecampus_student");
      if (saved) {
        const student = JSON.parse(saved);
        if (student) {
          setCurrentStudent(student);
          if (student.name) setName(student.name);
          if (student.email) setEmail(student.email);
          if (student.state) setState(student.state);
          if (student.dob) setDob(student.dob);
          if (student.course) setCourse(student.course);
          else if (student.coursesInterested?.length) setCourse(student.coursesInterested[0]);
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const selectedCountry =
    countryCodes.find((c) => c.code === countryCode) || countryCodes[0];
  const fullPhone = `${countryCode}${phone}`;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!/^\d{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/phone/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhone }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || data.message || "Failed to send code");
      }

      setChallengeId(data.challenge_id);
      setResendCooldown(data.resend_cooldown || 30);
      setStep("otp");
    } catch (err: any) {
      setError(err.message || "Something went wrong sending code.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/phone/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: fullPhone,
          code: otp,
          challenge_id: challengeId,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || data.message || "Verification failed");
      }

      const updatedStudent = data.student || {
        ...(currentStudent || {}),
        phone: fullPhone,
        status: "ACTIVE",
      };

      setCurrentStudent(updatedStudent);
      localStorage.setItem("ecampus_student", JSON.stringify(updatedStudent));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("ecampus-auth-change"));
      }

      // Check if questions were filled earlier during signup
      if (!data.hasProfileDetails || !updatedStudent.name?.trim() || !updatedStudent.state?.trim()) {
        setStep("details");
      } else if (!data.hasAdvisorProfile || !updatedStudent.advisorProfile?.highestQualification) {
        setShowAdvisor(true);
      } else {
        router.replace(returnUrl);
      }
    } catch (err: any) {
      setError(err.message || "Incorrect verification code.");
    } finally {
      setLoading(false);
    }
  };

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
      email: email.trim().toLowerCase() || currentStudent?.email || undefined,
      phone: fullPhone || currentStudent?.phone,
      coursesInterested: course ? [course] : (currentStudent?.coursesInterested || []),
      course: course || currentStudent?.course || undefined,
      state: state || currentStudent?.state || undefined,
      dob: dob || currentStudent?.dob || undefined,
      referralCode: referralCode.trim() || undefined,
      whatsappOptIn,
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

    if (!studentPayload.advisorProfile?.highestQualification) {
      setShowAdvisor(true);
    } else {
      router.replace(returnUrl);
    }
  };

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
    router.replace(returnUrl);
  };

  const handleLogout = async () => {
    await performLogout("/login");
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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 sm:p-6">
      <div className={`w-full overflow-hidden rounded-[28px] sm:rounded-[32px] bg-white shadow-xl border border-slate-200/80 ${step === "details" ? "max-w-[530px]" : "max-w-md"}`}>
        {/* Top decorative split red & green accent border */}
        <div className="flex h-1.5 w-full overflow-hidden shrink-0">
          <div className="w-1/2 bg-[#DC2626]" />
          <div className="w-1/2 bg-[#10B981]" />
        </div>
        <div className="p-7 sm:p-9">
          {step !== "details" ? (
          <>
            {/* Brand Accent */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-rose-50 border border-rose-100 text-red-600 mb-4 shadow-xs">
                <Lock className="h-6 w-6" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-semibold mb-2">
                <ShieldAlert className="h-3.5 w-3.5 text-amber-600" />
                <span>Mandatory Security Step</span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {step === "phone" ? "Verify Your Phone Number" : "Enter Verification Code"}
              </h1>

              <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs">
                {step === "phone"
                  ? "Every eCampus account must have exactly one verified mobile number to access personalized counseling and university portals."
                  : `Enter the 6-digit verification code sent to ${fullPhone}`}
              </p>
            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700">
                {error}
              </div>
            )}

            {step === "phone" ? (
              <form onSubmit={handleSendOtp} className="mt-6 flex flex-col gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Mobile Number
                  </label>
                  <div className="flex h-12 items-center rounded-2xl border border-slate-200 bg-white shadow-xs focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-500/10 hover:border-slate-300 transition-all">
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

                    <input
                      type="tel"
                      inputMode="numeric"
                      autoFocus
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                      }
                      required
                      className="min-w-0 flex-1 bg-transparent px-3 text-sm font-medium tracking-wide text-slate-900 outline-none placeholder:text-slate-400 placeholder:font-normal placeholder:tracking-normal"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading || phone.length < 10}
                  className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-sm font-semibold text-white shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending SMS OTP...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Verification Code</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="mt-6 flex flex-col items-center gap-4">
                <div className="w-full flex justify-center py-2">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(val) => setOtp(val)}
                    autoFocus
                  >
                    <InputOTPGroup className="gap-2 sm:gap-2.5">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="h-12 w-10 sm:h-12 sm:w-11 rounded-xl border border-slate-200 bg-slate-50 text-lg font-bold text-slate-900 first:rounded-xl first:border last:rounded-xl shadow-xs"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <div className="flex items-center justify-between w-full text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setOtp("");
                      setStep("phone");
                    }}
                    className="font-semibold text-slate-600 hover:text-slate-900 hover:underline cursor-pointer"
                  >
                    ← Change number
                  </button>

                  {resendCooldown > 0 ? (
                    <span className="text-slate-400">Resend in {resendCooldown}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="font-semibold text-red-600 hover:text-red-700 hover:underline cursor-pointer"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-sm font-semibold text-white shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify & Continue</span>
                      <CheckCircle2 className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </>
        ) : (
          /* STEP: Complete Your Profile - Exact Reference UI */
          <div className="flex flex-col">
            {/* Header Branding */}
            <div className="flex flex-col items-center text-center">
              <img
                src="/image/logo.png"
                alt="eCampus"
                className="h-7 sm:h-8 w-auto object-contain mx-auto"
              />

              {/* Eyebrow badge */}
              <div className="mt-3.5 inline-flex items-center gap-1.5 rounded-full bg-[#FFF1F2] px-3.5 py-1 text-xs font-bold text-[#E11D48] tracking-wide">
                <Sparkles className="h-3.5 w-3.5 text-[#E11D48] fill-[#E11D48]/25" />
                <span>Almost Done!</span>
              </div>

              {/* Title */}
              <h2 className="mt-2 text-2xl sm:text-[28px] font-bold tracking-tight text-[#0F172A]">
                Complete Your Profile
              </h2>
            </div>

            {/* Status Banner */}
            <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#065F46] shadow-2xs">
              <ShieldCheck className="h-4.5 w-4.5 text-[#059669] shrink-0" />
              <span>Mobile verified successfully!</span>
            </div>

            {error && (
              <div className="mt-3.5 flex items-start gap-2.5 rounded-xl p-3 text-xs bg-red-50 border border-red-200 text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleDetailsSubmit} className="mt-4 flex flex-col gap-3.5 sm:gap-4">
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

                {/* Email Address */}
                <div>
                  <label className="mb-1.5 block text-xs sm:text-[13px] font-semibold text-[#1E293B]">
                    Email Address <span className="text-[#DC2626] font-medium">*</span>
                  </label>
                  <div className="relative flex h-[50px] sm:h-[54px] w-full items-center rounded-2xl border border-slate-300 bg-white px-3.5 sm:px-4 shadow-2xs transition-all hover:border-slate-400 focus-within:border-[#818CF8] focus-within:ring-4 focus-within:ring-indigo-500/10 overflow-hidden">
                    <Mail className="h-5 w-5 text-slate-400 shrink-0 mr-2.5 pointer-events-none stroke-[1.8]" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-full w-full min-w-0 flex-1 !border-0 !border-none !rounded-none !bg-transparent text-sm sm:text-base font-medium text-slate-900 !outline-none !shadow-none !ring-0 focus:!border-0 focus:!border-none focus:!rounded-none focus:!bg-transparent focus:!shadow-none focus:!ring-0 focus:!outline-none placeholder:text-slate-400 placeholder:font-normal"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                {/* Your State */}
                <div>
                  <label className="mb-1.5 block text-xs sm:text-[13px] font-semibold text-[#1E293B]">
                    Your State
                  </label>
                  <div className="relative flex h-[50px] sm:h-[54px] w-full items-center justify-between rounded-2xl border border-slate-300 bg-white px-3.5 sm:px-4 shadow-2xs transition-all hover:border-slate-400 focus-within:border-[#818CF8] focus-within:ring-4 focus-within:ring-indigo-500/10 overflow-hidden">
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="h-full w-full !border-0 !border-none !rounded-none !bg-transparent text-sm sm:text-base font-medium text-slate-900 !outline-none !shadow-none !ring-0 cursor-pointer appearance-none"
                    >
                      <option value="">Select your state</option>
                      {indianStates.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="h-4.5 w-4.5 text-slate-400 shrink-0 pointer-events-none" />
                  </div>
                </div>

                {/* Date of Birth Calendar */}
                <div>
                  <label className="mb-1.5 block text-xs sm:text-[13px] font-semibold text-[#1E293B]">
                    Date of Birth
                  </label>
                  <div className="relative flex h-[50px] sm:h-[54px] w-full items-center rounded-2xl border border-slate-300 bg-white px-3.5 sm:px-4 shadow-2xs transition-all hover:border-slate-400 focus-within:border-[#818CF8] focus-within:ring-4 focus-within:ring-indigo-500/10 cursor-pointer overflow-hidden">
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
                    <Gift className="h-4 w-4 text-[#DC2626] shrink-0" />
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
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-colors ${
                    whatsappOptIn
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
                disabled={loading || !name.trim()}
                className="group mt-2 flex h-13 sm:h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#F87171] to-[#FB7185] hover:from-[#EF4444] hover:to-[#F43F5E] text-sm sm:text-base font-bold tracking-normal text-white shadow-[0_8px_20px_rgba(248,113,113,0.38)] hover:shadow-[0_10px_24px_rgba(248,113,113,0.48)] transition-all active:scale-[0.99] disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Saving Profile...</span>
                  </>
                ) : (
                  <>
                    <span>Complete & Explore Universities</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </Button>
            </form>

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
        )}

        <div className="mt-7 pt-4 border-t border-slate-100 flex items-center justify-center">
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Log out and exit</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);
}

export default function VerifyPhonePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
            <p className="text-sm font-semibold text-slate-600">Loading Verification…</p>
          </div>
        </div>
      }
    >
      <VerifyPhoneContent />
    </Suspense>
  );
}
