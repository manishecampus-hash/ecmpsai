"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import type { StudentProfile } from "../types";
import {
  Bell,
  ShieldCheck,
  SlidersHorizontal,
  Gift,
  LifeBuoy,
  LogOut,
  Copy,
  Check,
  Mail,
  Phone,
  Laptop,
  ExternalLink,
  ChevronRight,
  X,
} from "lucide-react";

type TabId = "notifications" | "security" | "preferences" | "rewards" | "support";

const TABS: { id: TabId; label: string; icon: typeof Bell }[] = [
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Account & Security", icon: ShieldCheck },
  { id: "preferences", label: "Preferences", icon: SlidersHorizontal },
  { id: "rewards", label: "Rewards & Referrals", icon: Gift },
  { id: "support", label: "Help & Support", icon: LifeBuoy },
];

type NotificationPrefs = {
  scholarshipAlerts: boolean;
  whatsappUpdates: boolean;
  counselorMessages: boolean;
  marketingEmails: boolean;
};

const DEFAULT_PREFS: NotificationPrefs = {
  scholarshipAlerts: true,
  whatsappUpdates: true,
  counselorMessages: true,
  marketingEmails: false,
};

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
        checked ? "bg-red-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-base font-bold text-gray-900">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const [student, setStudent] = useState<StudentProfile>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("notifications");

  const [prefs, setPrefs] = useState<NotificationPrefs>(DEFAULT_PREFS);
  const [referralCopied, setReferralCopied] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ecampus_student");
    if (saved) setStudent(JSON.parse(saved));
    const savedPrefs = localStorage.getItem("ecampus_notification_prefs");
    if (savedPrefs) setPrefs(JSON.parse(savedPrefs));
  }, []);

  const referralCode = student.referralCode || "ECAMP-RAHUL26";

  const persistPrefs = (next: NotificationPrefs) => {
    setPrefs(next);
    localStorage.setItem("ecampus_notification_prefs", JSON.stringify(next));
  };

  const handleCopyReferral = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setReferralCopied(true);
      setTimeout(() => setReferralCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — nothing more to do here.
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ecampus_student");
    router.push("/");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f9fafb]">
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar
          student={student}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="flex min-w-0 flex-1 flex-col overflow-y-auto p-4 sm:p-6">
          <div className="mb-5">
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Settings
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your notifications, security, and account preferences.
            </p>
          </div>

          {/* Horizontal tab bar */}
          <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-2 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-1.5 overflow-x-auto">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? "bg-red-50 text-red-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px] flex-shrink-0" strokeWidth={1.8} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setLogoutConfirmOpen(true)}
              className="flex flex-shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
            >
              <LogOut className="h-[18px] w-[18px] flex-shrink-0" strokeWidth={1.8} />
              Log Out
            </button>
          </div>

          {/* Content — spans the full page width */}
          <div className="w-full space-y-5">
            {activeTab === "notifications" && (
              <SectionCard
                title="Notification Preferences"
                description="Choose what you'd like to be notified about."
              >
                <div className="divide-y divide-gray-50">
                  {[
                    {
                      key: "scholarshipAlerts" as const,
                      title: "Scholarship & Match Alerts",
                      desc: "New university matches and scholarship pre-approvals.",
                    },
                    {
                      key: "whatsappUpdates" as const,
                      title: "WhatsApp & SMS Updates",
                      desc: "Application status and deadline reminders on WhatsApp.",
                    },
                    {
                      key: "counselorMessages" as const,
                      title: "Counselor Messages",
                      desc: "Get notified when Sara or your advisor sends a message.",
                    },
                    {
                      key: "marketingEmails" as const,
                      title: "Marketing & Promotional Emails",
                      desc: "Offers, events, and eCampus product updates.",
                    },
                  ].map((row) => (
                    <div
                      key={row.key}
                      className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900">
                          {row.title}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500">{row.desc}</p>
                      </div>
                      <Toggle
                        checked={prefs[row.key]}
                        onChange={(v) => persistPrefs({ ...prefs, [row.key]: v })}
                        label={row.title}
                      />
                    </div>
                  ))}
                </div>
              </SectionCard>
            )}

            {activeTab === "security" && (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <SectionCard
                  title="Change Password"
                  description="Use a strong password you don't use elsewhere."
                >
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-gray-500">
                        Current Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-gray-500">
                          New Password
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-gray-500">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
                    >
                      Update Password
                    </button>
                  </div>
                </SectionCard>

                <div className="space-y-5">
                  <SectionCard title="Two-Factor Authentication">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          Secure your account with 2FA
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500">
                          We will send a one-time code to your phone when you sign in.
                        </p>
                      </div>
                      <Toggle checked={false} onChange={() => {}} label="Two-factor authentication" />
                    </div>
                  </SectionCard>

                  <SectionCard title="Active Sessions">
                    <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3.5">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <Laptop className="h-[18px] w-[18px]" strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-900">
                          This Device
                        </p>
                        <p className="text-xs text-gray-500">
                          Windows · Chrome · Active now
                        </p>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">
                        Current
                      </span>
                    </div>
                  </SectionCard>
                </div>
              </div>
            )}

            {activeTab === "preferences" && (
              <SectionCard
                title="App Preferences"
                description="Customize how eCampus looks and talks to you."
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-500">
                      Preferred Language
                    </label>
                    <select className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100">
                      <option>English</option>
                      <option>Hindi</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-500">
                      Preferred Contact Method
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["Email", "WhatsApp", "SMS"].map((m, i) => (
                        <button
                          key={m}
                          type="button"
                          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                            i === 0
                              ? "bg-red-600 text-white"
                              : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-500">
                      Theme
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white"
                      >
                        Light
                      </button>
                      <button
                        type="button"
                        disabled
                        className="cursor-not-allowed rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-300"
                      >
                        Dark · Coming Soon
                      </button>
                    </div>
                  </div>
                </div>
              </SectionCard>
            )}

            {activeTab === "rewards" && (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <SectionCard title="Your Referral Code">
                  <p className="text-sm text-gray-500">
                    Share your code with friends — you both earn ₹1,000 in
                    scholarship credit when they apply.
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-dashed border-red-200 bg-red-50/50 px-4 py-3.5">
                    <span className="font-mono text-sm font-bold text-red-600">
                      {referralCode}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyReferral}
                      className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
                    >
                      {referralCopied ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                      {referralCopied ? "Copied" : "Copy Code"}
                    </button>
                  </div>
                </SectionCard>

                <SectionCard title="Scholarship Coupons">
                  <div className="flex items-center gap-3 rounded-xl bg-amber-50 px-4 py-3.5">
                    <Gift className="h-5 w-5 flex-shrink-0 text-amber-600" />
                    <p className="text-sm text-gray-700">
                      Spin the reward wheel from your dashboard to unlock
                      instant scholarship coupons.
                    </p>
                  </div>
                </SectionCard>
              </div>
            )}

            {activeTab === "support" && (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <SectionCard title="Help Center">
                  <div className="space-y-2.5">
                    {[
                      "How do I track my application status?",
                      "How are scholarships calculated?",
                      "How do I update my documents?",
                    ].map((q) => (
                      <div
                        key={q}
                        className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-50"
                      >
                        {q}
                        <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-400" />
                      </div>
                    ))}
                  </div>
                  <a
                    href="https://www.ecampusapp.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:underline"
                  >
                    Visit Help Center
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </SectionCard>

                <div className="space-y-5">
                  <SectionCard title="Contact Support">
                    <p className="text-sm text-gray-500">
                      Our team typically replies within 24 hours.
                    </p>
                    <div className="mt-3 flex flex-col gap-2.5 sm:flex-row">
                      <a
                        href="mailto:support@ecampusapp.com"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
                      >
                        <Mail className="h-4 w-4" />
                        support@ecampusapp.com
                      </a>
                      <a
                        href="tel:+911800123456"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                      >
                        <Phone className="h-4 w-4" />
                        1800-123-456
                      </a>
                    </div>
                  </SectionCard>

                  <p className="text-center text-xs text-gray-400">
                    eCampus Student Dashboard · Version 1.0.0
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {logoutConfirmOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0a1428]/70 p-4 backdrop-blur-sm"
          onClick={() => setLogoutConfirmOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLogoutConfirmOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <LogOut className="h-5 w-5" />
            </span>
            <h3 className="mt-3 text-base font-bold text-gray-900">
              Log out of eCampus?
            </h3>
            <p className="mt-1.5 text-sm text-gray-500">
              You will need to sign in again to access your dashboard.
            </p>
            <div className="mt-5 flex gap-2.5">
              <button
                type="button"
                onClick={() => setLogoutConfirmOpen(false)}
                className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
