"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Smartphone,
  Mail,
  ArrowRight,
  ArrowLeft,
  RotateCw,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  User,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { courseOptions } from "@/data/course-options";
import { indianStates } from "@/data/indian-states";
import { AIAdvisorModal, type AdvisorAnswers } from "@/components/layout/ai-advisor-modal";

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

type SignupStep = "identifier" | "otp" | "details";

export default function SignupPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"mobile" | "email">("mobile");
  const [step, setStep] = useState<SignupStep>("identifier");

  // Identifier state
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  // Details state
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [state, setState] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);

  // Advisor questionnaire
  const [showAdvisor, setShowAdvisor] = useState(false);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fullPhone = `${countryCode}${phone.trim()}`;

  // Check if already authenticated
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ecampus_student");
      if (saved) {
        const student = JSON.parse(saved);
        if (student && (student.id || student.phone || student.email)) {
          router.replace("/dashboard");
        }
      }
    } catch {}
  }, [router]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "mobile" && !/^\d{10}$/.test(phone.trim())) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (mode === "email" && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "mobile"
            ? { phone: fullPhone }
            : { mode: "email", email: email.trim().toLowerCase() }
        ),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to send verification code.");
      }

      setChallengeId(data.challenge_id || "");
      setResendCooldown(data.resend_cooldown || 30);
      setStep("otp");
    } catch (err: any) {
      setError(err.message || "Failed to send code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (overrideOtp?: string) => {
    setError("");
    const code = (overrideOtp || otp).trim();

    if (!/^\d{6}$/.test(code)) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "mobile"
            ? { phone: fullPhone, otp: code, challenge_id: challengeId }
            : { email: email.trim().toLowerCase(), otp: code, challenge_id: challengeId }
        ),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid OTP code. Please check and try again.");
      }

      // CRITICAL CHECK: If account was already made and questions already answered, do NOT ask again!
      if ((data.isExistingUser || data.hasProfileDetails) && data.hasProfileDetails && data.hasAdvisorProfile && data.student) {
        localStorage.setItem("ecampus_student", JSON.stringify(data.student));
        window.dispatchEvent(new Event("ecampus-auth-change"));
        router.push("/dashboard");
        return;
      }

      // Pre-fill whatever exists
      if (data.student) {
        if (data.student.name) setName(data.student.name);
        if (data.student.email && !email) setEmail(data.student.email);
        if (data.student.state) setState(data.student.state);
        if (data.student.course) setCourse(data.student.course);
        else if (data.student.coursesInterested?.length) setCourse(data.student.coursesInterested[0]);

        if (data.hasProfileDetails && !data.hasAdvisorProfile) {
          localStorage.setItem("ecampus_student", JSON.stringify(data.student));
          window.dispatchEvent(new Event("ecampus-auth-change"));
          setShowAdvisor(true);
          return;
        }
      }

      setStep("details");
    } catch (err: any) {
      setError(err.message || "Verification failed. Please try again.");
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

    if (mode === "mobile" && !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (mode === "email" && !/^\d{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);

    const rawPrev = localStorage.getItem("ecampus_student");
    const prevData = rawPrev ? JSON.parse(rawPrev) : {};

    const studentPayload = {
      ...prevData,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: fullPhone,
      coursesInterested: course ? [course] : (prevData.coursesInterested || []),
      course: course || prevData.course || undefined,
      state: state || prevData.state || undefined,
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
        body: JSON.stringify(studentPayload),
      });
    } catch {}

    localStorage.setItem("ecampus_student", JSON.stringify(studentPayload));
    window.dispatchEvent(new Event("ecampus-auth-change"));
    setLoading(false);

    // Proceed to advisor modal
    setShowAdvisor(true);
  };

  const finishOnboarding = async (answers?: AdvisorAnswers) => {
    if (answers) {
      const raw = localStorage.getItem("ecampus_student");
      const current = raw ? JSON.parse(raw) : {};
      const updated = { ...current, advisorProfile: answers };
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-red-100/50 rounded-full blur-3xl opacity-70" />
      <div className="pointer-events-none absolute -bottom-40 right-10 w-[400px] h-[300px] bg-amber-100/40 rounded-full blur-3xl opacity-60" />

      {/* Top Logo & Title */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10 px-4">
        <Link href="/" className="inline-block relative w-36 h-12 mb-3">
          <Image
            src="/image/logo.png"
            alt="eCampus Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold tracking-wide uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Join eCampus
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Create your free account
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Discover top online UGC degrees, compare fees, and talk to AI counselors
        </p>
      </div>

      {/* Main Card */}
      <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-[460px] px-4 relative z-10">
        <div className="overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-100">
          <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500" />

          <div className="p-7 sm:p-8">
            {error && (
              <div className="mb-5 flex items-start gap-2.5 rounded-2xl p-3.5 text-xs bg-red-50 border border-red-200 text-red-700 leading-relaxed">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* STEP 1: IDENTIFIER INPUT */}
            {step === "identifier" && (
              <>
                <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl mb-6">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("mobile");
                      setError("");
                    }}
                    className={`flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                      mode === "mobile"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    Mobile Number
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("email");
                      setError("");
                    }}
                    className={`flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                      mode === "email"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Email
                  </button>
                </div>

                <form onSubmit={handleSendOtp} className="space-y-4">
                  {mode === "mobile" ? (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Mobile Number
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
                  ) : (
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
                  )}

                  <Button
                    type="submit"
                    disabled={loading || (mode === "mobile" ? phone.length !== 10 : !email.trim())}
                    className="w-full h-11 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold text-sm shadow-md shadow-red-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending verification code…
                      </>
                    ) : (
                      <>
                        Continue with OTP
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </>
            )}

            {/* STEP 2: OTP VERIFICATION */}
            {step === "otp" && (
              <div className="space-y-5">
                <div className="text-center">
                  <p className="text-xs text-slate-500">
                    Enter the 6-digit verification code sent to
                  </p>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    {mode === "mobile" ? `${countryCode} ${phone}` : email}
                  </p>
                </div>

                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(val) => {
                      setOtp(val);
                      if (val.length === 6) handleVerifyOtp(val);
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
                  onClick={() => handleVerifyOtp()}
                  disabled={loading || otp.length !== 6}
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
                      setStep("identifier");
                      setOtp("");
                      setError("");
                    }}
                    className="text-slate-600 hover:underline flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    Change {mode}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleSendOtp(e)}
                    disabled={resendCooldown > 0 || loading}
                    className="flex items-center gap-1 font-semibold text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RotateCw className="w-3 h-3" />
                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: DETAILS FORM */}
            {step === "details" && (
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

                {mode === "mobile" ? (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full h-11 pl-10 pr-4 rounded-2xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/15 shadow-xs"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        type="tel"
                        inputMode="numeric"
                        placeholder="10-digit mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        required
                        className="w-full h-11 pl-10 pr-4 rounded-2xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/15 shadow-xs"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Interested Course
                  </label>
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
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
                    State / Region
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
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
                      Complete Setup & Continue
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            )}


          </div>
        </div>

        <div className="mt-5 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}