"use client";

import { useState, useEffect } from "react";
import { X, ArrowLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
}

const countryCodes = [
  { code: "+91", flag: "🇮🇳", name: "IN" },
  { code: "+1", flag: "🇺🇸", name: "US" },
  { code: "+44", flag: "🇬🇧", name: "GB" },
  { code: "+61", flag: "🇦🇺", name: "AU" },
  { code: "+971", flag: "🇦🇪", name: "AE" },
  { code: "+65", flag: "🇸🇬", name: "SG" },
  { code: "+60", flag: "🇲🇾", name: "MY" },
  { code: "+49", flag: "🇩🇪", name: "DE" },
  { code: "+33", flag: "🇫🇷", name: "FR" },
  { code: "+81", flag: "🇯🇵", name: "JP" },
];

type Step = "phone" | "otp" | "email";

export function SignupModal({
  isOpen,
  onClose,
  onSwitchToLogin,
}: SignupModalProps) {
  const [step, setStep] = useState<Step>("phone");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  if (!isOpen) return null;

  const selectedCountry = countryCodes.find((c) => c.code === countryCode)!;
  const fullPhone = `${countryCode}${phone}`;

  const handlePhoneContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!/^\d{7,15}$/.test(phone)) {
      setError("Please enter a valid phone number.");
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
      if (!data.success) throw new Error(data.message || "Failed to send OTP");
      setResendCooldown(30);
      setStep("otp");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!/^\d{6}$/.test(otp)) {
      setError("Enter the 6-digit OTP.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhone, otp }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Verification failed");
      localStorage.setItem(
        "ecampus_student",
        JSON.stringify({ phone: fullPhone }),
      );
      window.dispatchEvent(new Event("ecampus-auth-change"));
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhone }),
      });
      const data = await res.json();
      if (!data.success)
        throw new Error(data.message || "Failed to resend OTP");
      setResendCooldown(30);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL ||
        "http://localhost:5000";
      const res = await fetch(`${apiUrl}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Signup failed");
      }
      localStorage.setItem("ecampus_student", JSON.stringify({ name, email }));
      window.dispatchEvent(new Event("ecampus-auth-change"));
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step === "otp") {
      setOtp("");
      setStep("phone");
    } else {
      setStep("phone");
    }
    setError("");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex"
          style={{ minHeight: "420px", maxHeight: "90vh" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── RIGHT PANEL ── */}
          <div className="flex-1 flex flex-col p-8 md:p-10 overflow-y-auto">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-6">
              {step !== "phone" ? (
                <button
                  onClick={handleBack}
                  className="text-gray-500 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              ) : (
                <div />
              )}
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Heading */}
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Welcome! Sign up or Login
            </h2>
            <p className="text-sm text-gray-500 mb-8">
              {step === "phone" && "Enter your phone number to get started"}
              {step === "otp" && `Enter the OTP sent to ${fullPhone}`}
              {step === "email" && "Continue with your email address"}
            </p>

            {/* Error */}
            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
                {error}
              </div>
            )}

            {step === "phone" && (
              <form
                onSubmit={handlePhoneContinue}
                className="flex flex-col gap-5"
              >
                {/* Phone row */}
                {/* Phone row */}
                <div className="w-full max-w-md mx-auto flex items-center border border-gray-200 overflow-hidden bg-gray-50 transition">
                  {/* Country picker */}
                  <div className="relative flex items-center border-r border-gray-200 px-3 py-3 gap-1 cursor-pointer ">
                    <span className="text-base">{selectedCountry.flag}</span>
                    <span className="text-sm font-medium text-gray-700">
                      {selectedCountry.code}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full"
                    >
                      {countryCodes.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.code} ({c.name})
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Number input */}
                  <input
                    type="tel"
                    placeholder="mobile Number"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, ""))
                    }
                    maxLength={15}
                    required
                    className="flex-1 px-4 py-3 text-sm bg-transparent outline-none placeholder-gray-400"
                  />
                </div>

                {/* OR divider */}
                <div className="flex items-center gap-3 text-gray-400 text-xs">
                  <div className="flex-1 h-px bg-gray-200" />
                  or
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Switch to email */}
                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setError("");
                  }}
                  className="text-sm font-semibold underline underline-offset-2  text-center transition"
                >
                  Sign up / Login with Email
                </button>

                {/* Continue */}
                <Button
                  type="submit"
                  disabled={loading || phone.length < 7}
                  className="flex w-1/2 mx-auto items-center justify-center bg-gray-500 hover:bg-gray-600 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-full py-3 text-sm font-semibold transition-all mt-2"
                >
                  {loading ? "Sending OTP..." : "Continue"}
                </Button>
              </form>
            )}

            {step === "otp" && (
              <form onSubmit={handleOtpVerify} className="flex flex-col gap-5">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  maxLength={6}
                  required
                  className="w-full px-4 py-3 text-center text-lg tracking-widest font-semibold border border-gray-200 rounded-xl bg-gray-50 focus:outline-none  focus:bg-white transition placeholder-gray-400"
                />

                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendCooldown > 0 || loading}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 disabled:text-gray-400 text-center transition"
                >
                  {resendCooldown > 0
                    ? `Resend OTP in ${resendCooldown}s`
                    : "Resend OTP"}
                </button>

                <Button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-full py-3 text-sm font-semibold transition-all mt-2"
                >
                  {loading ? "Verifying..." : "Verify & Continue"}
                </Button>
              </form>
            )}

            {step === "email" && (
              <form
                onSubmit={handleEmailContinue}
                className="flex flex-col gap-4"
              >
                {/* Name */}
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition placeholder-gray-400"
                />
                {/* Email */}
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition placeholder-gray-400"
                />
                {/* Password */}
                <input
                  type="password"
                  placeholder="Password (min. 8 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:bg-white transition placeholder-gray-400"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-full py-3 text-sm font-semibold transition-all mt-1"
                >
                  {loading ? "Creating account..." : "Continue"}
                </Button>
              </form>
            )}

            {/* Terms */}
            <p className="mt-6 text-xs text-gray-400 text-center leading-relaxed">
              By continuing, you agree to our{" "}
              <a href="/terms" className=" hover:underline">
                Terms of Use
              </a>{" "}
              &amp;{" "}
              <a href="/privacy" className=" hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
