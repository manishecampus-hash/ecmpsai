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
      <div className="fixed inset-0 z-50 bg-black/30" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-sm bg-white rounded-3xl shadow-lg overflow-hidden"
          style={{ minHeight: "auto" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col p-6">
            {/* Heading with close button */}
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-3">
                {step !== "phone" && (
                  <button
                    onClick={handleBack}
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <h2 className="text-lg font-semibold text-black">
                  {step === "phone" && "Welcome"}
                  {step === "otp" && "Enter OTP"}
                  {step === "email" && "Create Account"}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-black transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-gray-600 mb-3">
              {step === "phone" && "Enter your phone number"}
              {step === "otp" && `OTP sent to ${fullPhone}`}
              {step === "email" && "Complete your details"}
            </p>

            {/* Error */}
            {error && (
              <div className="mb-3 px-3 py-2 bg-white border border-gray-300 text-gray-900 text-xs rounded-xl">
                {error}
              </div>
            )}

            {step === "phone" && (
              <form
                onSubmit={handlePhoneContinue}
                className="flex flex-col gap-3"
              >
                {/* Phone row */}
                <div className="flex items-center border border-gray-300 rounded-2xl">
                  {/* Country picker */}
                  <div className="relative flex items-center border-r border-gray-300 px-2 py-2 gap-1 cursor-pointer">
                    <span className="text-sm">{selectedCountry.flag}</span>
                    <span className="text-xs font-medium text-black">
                      {selectedCountry.code}
                    </span>
                    <ChevronDown className="w-3 h-3 text-gray-600" />
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
                    placeholder="Mobile number"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, ""))
                    }
                    maxLength={15}
                    required
                    className="flex-1 px-3 py-2 text-sm bg-white outline-none placeholder-gray-500"
                  />
                </div>

                {/* OR divider */}
                <div className="flex items-center gap-2 text-gray-600 text-xs">
                  <div className="flex-1 h-px bg-gray-300" />
                  or
                  <div className="flex-1 h-px bg-gray-300" />
                </div>

                {/* Switch to email */}
                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setError("");
                  }}
                  className="text-xs font-medium text-gray-700 hover:text-black text-center transition"
                >
                  Sign up with email
                </button>

                {/* Continue */}
                <Button
                  type="submit"
                  disabled={loading || phone.length < 7}
                  className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-600 text-white text-sm font-medium py-2 rounded-2xl transition-all"
                >
                  {loading ? "Sending..." : "Continue"}
                </Button>
              </form>
            )}

            {step === "otp" && (
              <form onSubmit={handleOtpVerify} className="flex flex-col gap-3">
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
                  className="w-full px-3 py-2 text-center text-sm tracking-widest font-semibold border border-gray-300 rounded-2xl focus:outline-none focus:border-black transition placeholder-gray-500"
                />

                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendCooldown > 0 || loading}
                  className="text-xs font-medium text-gray-700 hover:text-black disabled:text-gray-400 text-center transition"
                >
                  {resendCooldown > 0
                    ? `Resend in ${resendCooldown}s`
                    : "Resend OTP"}
                </button>

                <Button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-600 text-white text-sm font-medium py-2 rounded-2xl transition-all"
                >
                  {loading ? "Verifying..." : "Continue"}
                </Button>
              </form>
            )}

            {step === "email" && (
              <form
                onSubmit={handleEmailContinue}
                className="flex flex-col gap-3"
              >
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:border-black transition placeholder-gray-500"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:border-black transition placeholder-gray-500"
                />
                <input
                  type="password"
                  placeholder="Password (min. 8 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:border-black transition placeholder-gray-500"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black hover:bg-gray-800 text-white text-sm font-medium py-2 rounded-2xl transition-all"
                >
                  {loading ? "Creating..." : "Continue"}
                </Button>
              </form>
            )}

            {/* Terms */}
            <p className="mt-4 text-xs text-gray-600 text-center leading-relaxed">
              By continuing, you agree to our{" "}
              <a href="/terms" className="hover:underline">
                Terms
              </a>{" "}
              &{" "}
              <a href="/privacy" className="hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
