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
          {/* ── LEFT PANEL ── */}
          <div
            className="hidden md:flex w-5/12 flex-col justify-between p-8 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, #fff7f5 0%, #fde8e0 60%, #f9d0c4 100%)",
            }}
          >
            {/* Floating badges */}
            <div className="flex flex-col gap-3 z-10">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 w-fit shadow-sm text-xs font-semibold text-gray-700">
                <span className="text-indigo-500">🎓</span> University Explore
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 w-fit shadow-sm text-xs font-semibold text-gray-700">
                <span className="text-green-500">📈</span> Career Growth
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 w-fit shadow-sm text-xs font-semibold text-gray-700">
                <span className="text-yellow-500">🏅</span> Scholarships
              </div>
            </div>

            {/* Illustration — rocket/student SVG */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center">
              <svg
                viewBox="0 0 220 280"
                className="w-52"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse cx="110" cy="180" rx="28" ry="70" fill="#e05c3a" />
                <ellipse
                  cx="110"
                  cy="115"
                  rx="28"
                  ry="45"
                  fill="#fff"
                  stroke="#e05c3a"
                  strokeWidth="2"
                />
                <path d="M82 120 Q110 60 138 120 Z" fill="#e05c3a" />
                <circle
                  cx="110"
                  cy="130"
                  r="14"
                  fill="#c8e6fa"
                  stroke="#e05c3a"
                  strokeWidth="2"
                />
                <circle cx="110" cy="128" r="10" fill="#f5c6a0" />
                <circle cx="106" cy="126" r="1.5" fill="#333" />
                <circle cx="114" cy="126" r="1.5" fill="#333" />
                <path
                  d="M106 132 Q110 136 114 132"
                  stroke="#c0725a"
                  strokeWidth="1.2"
                  fill="none"
                  strokeLinecap="round"
                />
                <rect
                  x="101"
                  y="116"
                  width="18"
                  height="3"
                  rx="1"
                  fill="#3730a3"
                />
                <polygon points="110,108 118,116 102,116" fill="#3730a3" />
                <line
                  x1="118"
                  y1="116"
                  x2="122"
                  y2="119"
                  stroke="#3730a3"
                  strokeWidth="1.5"
                />
                <circle cx="122" cy="120" r="2" fill="#fbbf24" />
                <path
                  d="M82 175 Q60 185 65 210 Q80 200 82 185 Z"
                  fill="#e05c3a"
                  opacity="0.8"
                />
                <path
                  d="M138 175 Q160 185 155 210 Q140 200 138 185 Z"
                  fill="#e05c3a"
                  opacity="0.8"
                />
                <ellipse
                  cx="110"
                  cy="252"
                  rx="12"
                  ry="18"
                  fill="#fbbf24"
                  opacity="0.9"
                />
                <ellipse
                  cx="104"
                  cy="256"
                  rx="7"
                  ry="14"
                  fill="#f97316"
                  opacity="0.8"
                />
                <ellipse
                  cx="116"
                  cy="256"
                  rx="7"
                  ry="14"
                  fill="#f97316"
                  opacity="0.8"
                />
                <ellipse
                  cx="110"
                  cy="260"
                  rx="5"
                  ry="10"
                  fill="#fff"
                  opacity="0.5"
                />
                <path
                  d="M82 165 Q68 155 65 145"
                  stroke="#f5c6a0"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="64" cy="143" r="5" fill="#f5c6a0" />
                <path
                  d="M138 165 Q152 155 155 145"
                  stroke="#f5c6a0"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="156" cy="143" r="5" fill="#f5c6a0" />
              </svg>
            </div>
          </div>

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
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-400 focus-within:bg-white transition">
                  {/* Country picker */}
                  <div className="relative flex items-center border-r border-gray-200 px-3 py-3 gap-1 cursor-pointer bg-gray-50">
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
                    placeholder="Phone Number"
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
                  className="text-sm font-semibold text-indigo-600 underline underline-offset-2 hover:text-indigo-800 text-center transition"
                >
                  Sign up / Login with Email
                </button>

                {/* Continue */}
                <Button
                  type="submit"
                  disabled={loading || phone.length < 7}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-full py-3 text-sm font-semibold transition-all mt-2"
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
                  className="w-full px-4 py-3 text-center text-lg tracking-widest font-semibold border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition placeholder-gray-400"
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
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition placeholder-gray-400"
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
              <a href="/terms" className="text-indigo-500 hover:underline">
                Terms of Use
              </a>{" "}
              &amp;{" "}
              <a href="/privacy" className="text-indigo-500 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
