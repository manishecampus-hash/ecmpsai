"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Smartphone,
  Mail,
  Lock,
  LogOut,
  Pencil,
  RotateCw,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  KeyRound,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { performLogoutAll } from "@/components/auth/auth-context";

export default function SettingsPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [activeSessions, setActiveSessions] = useState(1);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Phone Change State
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [phoneStep, setPhoneStep] = useState<"input" | "verify">("input");
  const [newPhoneOtp, setNewPhoneOtp] = useState("");
  const [oldPhoneOtp, setOldPhoneOtp] = useState("");
  const [requiresOldOtp, setRequiresOldOtp] = useState(false);
  const [phoneActionLoading, setPhoneActionLoading] = useState(false);

  // Email Verify State
  const [emailInput, setEmailInput] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [emailStep, setEmailStep] = useState<"idle" | "sent">("idle");
  const [emailActionLoading, setEmailActionLoading] = useState(false);

  // Password State
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  const fetchUserData = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (!data.authenticated) {
        router.push("/login?returnUrl=/settings");
        return;
      }
      setUser(data.user);
      setActiveSessions(data.active_sessions_count || 1);
      setEmailInput(data.user.email || "");
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // 1. Phone Change Handlers
  const handleStartPhoneChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setPhoneActionLoading(true);

    try {
      const res = await fetch("/api/auth/phone/change/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          new_phone: newPhone,
          current_password: currentPassword || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to initiate phone change.");
      }

      setRequiresOldOtp(data.requires_old_otp);
      setPhoneStep("verify");
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setPhoneActionLoading(false);
    }
  };

  const handleVerifyPhoneChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setPhoneActionLoading(true);

    try {
      const res = await fetch("/api/auth/phone/change/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          new_phone: newPhone,
          new_code: newPhoneOtp,
          old_code: requiresOldOtp ? oldPhoneOtp : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Phone verification failed.");
      }

      setFeedback({ type: "success", message: "Phone number updated successfully!" });
      setShowPhoneModal(false);
      setPhoneStep("input");
      setNewPhone("");
      setNewPhoneOtp("");
      setOldPhoneOtp("");
      fetchUserData();
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setPhoneActionLoading(false);
    }
  };

  // 2. Email Verification Handlers
  const handleSendEmailVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setEmailActionLoading(true);

    try {
      const res = await fetch("/api/auth/email/verify/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to send email verification.");
      }

      setEmailStep("sent");
      setFeedback({ type: "success", message: "Verification code sent to your email." });
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setEmailActionLoading(false);
    }
  };

  const handleConfirmEmailVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setEmailActionLoading(true);

    try {
      const res = await fetch("/api/auth/email/verify/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput, code: emailOtp }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Invalid email verification code.");
      }

      setEmailStep("idle");
      setEmailOtp("");
      setFeedback({ type: "success", message: "Email successfully verified!" });
      fetchUserData();
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setEmailActionLoading(false);
    }
  };

  // 3. Logout All Sessions
  const handleLogoutAll = async () => {
    if (!confirm("Are you sure you want to log out of all devices? You will be returned to the login screen.")) {
      return;
    }

    await performLogoutAll("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-7 w-7 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Account & Security Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your verified primary phone number, login credentials, and active device sessions.
          </p>
        </div>

        {/* Global Feedback Alert */}
        {feedback && (
          <div
            className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-medium ${
              feedback.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-red-600 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* 1. Primary Identity Card (PHONE) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200/80">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-slate-900">Primary Identity: Phone Number</h2>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <Check className="h-3 w-3" /> Verified
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Your phone number is your mandatory primary account identifier.
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setShowPhoneModal(true);
                setPhoneStep("input");
              }}
              className="rounded-xl border-slate-200 hover:bg-slate-50 text-xs font-semibold"
            >
              <Pencil className="h-3.5 w-3.5 mr-1.5" />
              Change Phone
            </Button>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
            <span className="font-medium text-slate-600">Linked Number:</span>
            <span className="font-mono font-semibold text-slate-900 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200/60">
              {user?.phone_e164 || "Not connected"}
            </span>
          </div>
        </div>

        {/* 2. Secondary Login Method: EMAIL */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200/80">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-slate-900">Secondary Login: Email Address</h2>
                {user?.email_verified_at ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <Check className="h-3 w-3" /> Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                    Pending Verification
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Optional recovery and login method.
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            {emailStep === "idle" ? (
              <form onSubmit={handleSendEmailVerify} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                />
                <Button
                  type="submit"
                  disabled={emailActionLoading || !emailInput}
                  className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-5"
                >
                  {emailActionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify Email"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleConfirmEmailVerify} className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="6-digit code"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  className="w-full sm:w-44 h-11 px-3.5 rounded-xl border border-slate-200 text-center tracking-widest font-mono font-bold text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                />
                <Button
                  type="submit"
                  disabled={emailActionLoading || emailOtp.length !== 6}
                  className="w-full sm:w-auto rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-5"
                >
                  {emailActionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm Code"}
                </Button>
                <button
                  type="button"
                  onClick={() => setEmailStep("idle")}
                  className="text-xs text-slate-500 hover:underline"
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 3. Session & Security Management */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900">Active Sessions & Devices</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Currently active on <strong className="text-slate-800">{activeSessions}</strong> device{activeSessions > 1 ? "s" : ""}.
                </p>
              </div>
            </div>

            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogoutAll}
              className="rounded-xl text-xs font-semibold bg-rose-50 text-red-700 hover:bg-rose-100 border border-red-200"
            >
              <LogOut className="h-3.5 w-3.5 mr-1.5" />
              Log Out All Devices
            </Button>
          </div>
        </div>
      </div>

      {/* Change Phone Modal */}
      {showPhoneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Change Phone Number</h3>
              <button
                type="button"
                onClick={() => setShowPhoneModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              For security, swapping your primary identity requires verification of your new phone number.
            </p>

            {phoneStep === "input" ? (
              <form onSubmit={handleStartPhoneChange} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    New Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 9811122233"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    required
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Account Password (if set)
                  </label>
                  <input
                    type="password"
                    placeholder="Current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowPhoneModal(false)}
                    className="rounded-xl text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={phoneActionLoading || !newPhone}
                    className="rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
                  >
                    {phoneActionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Codes"}
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyPhoneChange} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    OTP sent to New Phone ({newPhone})
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="6-digit code"
                    value={newPhoneOtp}
                    onChange={(e) => setNewPhoneOtp(e.target.value)}
                    required
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-center tracking-widest font-mono text-sm outline-none focus:border-red-500"
                  />
                </div>

                {requiresOldOtp && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      OTP sent to Current Phone ({user?.phone_e164})
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="6-digit code"
                      value={oldPhoneOtp}
                      onChange={(e) => setOldPhoneOtp(e.target.value)}
                      required
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-center tracking-widest font-mono text-sm outline-none focus:border-red-500"
                    />
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setPhoneStep("input")}
                    className="rounded-xl text-xs"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={phoneActionLoading || newPhoneOtp.length !== 6}
                    className="rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
                  >
                    {phoneActionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm Swap"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
