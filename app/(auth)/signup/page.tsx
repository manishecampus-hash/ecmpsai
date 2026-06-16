"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Chrome, ArrowRight, RefreshCw, CheckCircle } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Step = "input" | "otp" | "success";

// ─── Component ───────────────────────────────────────────────────────────────
export default function SignupPage() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("input");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0); // Seconds before resend is allowed

  // ─── Step 1: Send OTP to email via /api/auth/send-otp ────────────────────
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to send OTP. Please try again.");
        return;
      }

      // OTP sent successfully — move to OTP entry step
      setStep("otp");
      startResendCooldown();
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // ─── Step 2: Verify OTP via /api/auth/verify-otp ─────────────────────────
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("Please enter the full 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Incorrect OTP. Please try again.");
        return;
      }

      // Save student info to localStorage
      const student = {
        email: email.trim(),
        joinedAt: new Date().toISOString(),
      };
      localStorage.setItem("ecampus_student", JSON.stringify(student));

      // Notify rest of app that auth state changed
      window.dispatchEvent(new Event("ecampus-auth-change"));

      setStep("success");

      // Redirect to home after short delay
      setTimeout(() => router.push("/"), 1500);
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // ─── Resend OTP (with 30s cooldown) ──────────────────────────────────────
  const handleResend = async () => {
    if (resendCooldown > 0) return;

    setError("");
    setOtp("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Could not resend OTP.");
        return;
      }

      startResendCooldown();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Start 30-second countdown to prevent OTP spam
  const startResendCooldown = () => {
    setResendCooldown(30);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">eCampus</h1>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">

          {/* ── Success screen ── */}
          {step === "success" && (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <CheckCircle className="w-14 h-14 text-green-500" />
              <h2 className="text-xl font-semibold text-slate-900">You're in!</h2>
              <p className="text-sm text-slate-500">Redirecting to dashboard…</p>
            </div>
          )}

          {step !== "success" && (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Create your account</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {step === "input"
                    ? "Enter your email — we'll send you a one-time code."
                    : `Enter the 6-digit code sent to ${email}`}
                </p>
              </div>

              {/* Google sign-in */}
              {step === "input" && (
                <>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2.5 w-full h-11 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors mb-5"
                  >
                    <Chrome className="w-4 h-4 text-slate-500" />
                    Continue with Google
                  </button>

                  <div className="relative my-5">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-slate-200" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-white px-3 text-slate-400 uppercase tracking-wide">or with email</span>
                    </div>
                  </div>
                </>
              )}

              {/* Error banner */}
              {error && (
                <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600 text-center">
                  {error}
                </div>
              )}

              {/* ── Step 1: Email input ── */}
              {step === "input" && (
                <form onSubmit={handleSendOTP} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 transition"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 w-full h-11 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-semibold transition-colors"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending OTP…
                      </>
                    ) : (
                      <>Send OTP <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </form>
              )}

              {/* ── Step 2: OTP input ── */}
              {step === "otp" && (
                <form onSubmit={handleVerifyOTP} className="space-y-4">

                  {/* Sent-to banner with option to change email */}
                  <div className="px-4 py-3 rounded-lg bg-indigo-50 border border-indigo-100 text-sm text-indigo-700 text-center">
                    OTP sent to <strong>{email}</strong>
                    <button
                      type="button"
                      onClick={() => { setStep("input"); setOtp(""); setError(""); }}
                      className="ml-2 text-indigo-400 underline text-xs"
                    >
                      Change
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Enter 6-digit OTP
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="••••••"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      required
                      autoFocus
                      className="w-full h-12 px-4 rounded-lg border border-slate-300 bg-white text-slate-900 text-2xl text-center tracking-[0.5em] placeholder:text-slate-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 transition"
                    />
                    <p className="mt-1.5 text-xs text-slate-400">Check your inbox (and spam folder).</p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="flex items-center justify-center gap-2 w-full h-11 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-semibold transition-colors"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Verifying…
                      </>
                    ) : (
                      <>Verify & Continue <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>

                  {/* Resend with cooldown timer */}
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resendCooldown > 0 || loading}
                    className="flex items-center justify-center gap-1.5 w-full text-sm text-slate-500 hover:text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
                  </button>
                </form>
              )}

              <p className="text-xs text-slate-500 text-center mt-5">
                By continuing, you agree to our{" "}
                <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a> and{" "}
                <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
              </p>
            </>
          )}

          {step !== "success" && (
            <p className="text-center text-sm text-slate-500 mt-5">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
                Sign in
              </Link>
            </p>
          )}
        </div>

        <p className="text-center text-xs text-slate-400 mt-5">
          © 2025 eCampus. All rights reserved.
        </p>
      </div>
    </div>
  );
}