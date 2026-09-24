"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import type { StudentProfile } from "../types";
import {
  Camera,
  Check,
  Mail,
  Phone,
  CalendarDays,
  BadgeCheck,
  MapPin,
  Target,
  Compass,
  Layers,
  IndianRupee,
  FileCheck2,
  Landmark,
  Wallet,
  CheckCircle2,
  Sparkles,
  Settings,
} from "lucide-react";

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

export default function ProfilePage() {
  const [student, setStudent] = useState<StudentProfile>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [editing, setEditing] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formState, setFormState] = useState("");
  const [savedFlash, setSavedFlash] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("ecampus_student");
    if (saved) {
      const parsed = JSON.parse(saved);
      setStudent(parsed);
      setFormName(parsed.name || "");
      setFormEmail(parsed.email || "");
      setFormPhone(parsed.phone || "");
      setFormState(parsed.state || "");
    }
  }, []);

  const displayName = student.name?.trim() || "Rahul Kumar";
  const initial = displayName.charAt(0).toUpperCase();

  const profileFieldsFilled = [
    student.name,
    student.email,
    student.phone,
    student.state,
    student.coursesInterested?.length ? "yes" : "",
    student.advisorProfile?.goal,
  ].filter(Boolean).length;
  const profileCompletion = Math.round((profileFieldsFilled / 6) * 100);

  const handleSaveProfile = () => {
    const next: StudentProfile = {
      ...student,
      name: formName.trim(),
      email: formEmail.trim(),
      phone: formPhone.trim(),
      state: formState.trim() || undefined,
    };
    setStudent(next);
    localStorage.setItem("ecampus_student", JSON.stringify(next));
    setEditing(false);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2500);
  };

  const handleCancelEdit = () => {
    setFormName(student.name || "");
    setFormEmail(student.email || "");
    setFormPhone(student.phone || "");
    setFormState(student.state || "");
    setEditing(false);
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
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Profile
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Your personal, academic, and verification details.
              </p>
            </div>
            <Link
              href="/dashboard/settings"
              className="flex flex-shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
          </div>

          <div className="w-full space-y-5">
            <div className="rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 via-rose-50 to-white p-5 sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="relative flex-shrink-0">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600 text-2xl font-bold text-white shadow-sm">
                    {initial}
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="Change profile photo"
                    className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-900 text-white shadow-sm transition hover:bg-gray-700"
                  >
                    <Camera className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <h2 className="text-lg font-bold text-gray-900">
                      {displayName}
                    </h2>
                    {student.email && (
                      <BadgeCheck
                        className="h-[18px] w-[18px] text-blue-500"
                        aria-label="Verified student"
                      />
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    {student.coursesInterested?.length
                      ? student.coursesInterested[0]
                      : "B.Tech CS"}{" "}
                    · Cohort &apos;26
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-red-600 shadow-sm">
                      Scholar Level 1
                    </span>
                    {student.state && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        {student.state}
                      </span>
                    )}
                  </div>
                </div>

                {!editing && (
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="flex-shrink-0 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              <div className="mt-5 max-w-xl">
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="font-medium text-gray-500">
                    Profile Completion
                  </span>
                  <span className="font-semibold text-red-600">
                    {profileCompletion}% Completed
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-red-500 transition-all"
                    style={{ width: `${profileCompletion}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick stats — same figures shown on the main dashboard, surfaced here for a single-glance account summary */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Landmark, iconClass: "bg-red-50 text-red-500", label: "AI Matches", value: "14" },
                { icon: Wallet, iconClass: "bg-emerald-50 text-emerald-500", label: "Scholarship", value: "₹10,000" },
                { icon: CheckCircle2, iconClass: "bg-blue-50 text-blue-500", label: "App Readiness", value: "88%" },
                { icon: Sparkles, iconClass: "bg-amber-50 text-amber-600", label: "AI Readiness", value: "94/100" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-gray-100 bg-white p-3.5 shadow-sm sm:p-4"
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${s.iconClass}`}
                  >
                    <s.icon className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <p className="mt-2 text-base font-bold text-gray-900">
                    {s.value}
                  </p>
                  <p className="text-[11px] text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
               <SectionCard title="Interested Programs">
                {student.coursesInterested?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {student.coursesInterested.map((c) => (
                      <span
                        key={c}
                        className="rounded-full bg-red-50 px-3.5 py-1.5 text-sm font-medium text-red-600"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    No programs added yet. Use the AI Degree Matcher to discover
                    courses tailored to you.
                  </p>
                )}
              </SectionCard>
              <SectionCard title="Personal Information">
                {editing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-gray-500">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-gray-500">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-gray-500">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        maxLength={10}
                        value={formPhone}
                        onChange={(e) =>
                          setFormPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                        }
                        className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-gray-500">
                        State / Location
                      </label>
                      <input
                        type="text"
                        value={formState}
                        onChange={(e) => setFormState(e.target.value)}
                        placeholder="e.g. Maharashtra"
                        className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                      />
                    </div>
                    <div className="flex gap-2.5">
                      <button
                        type="button"
                        onClick={handleSaveProfile}
                        className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {savedFlash && (
                      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3.5 py-2.5 text-sm font-medium text-emerald-700">
                        <Check className="h-4 w-4 flex-shrink-0" />
                        Profile updated successfully.
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 flex-shrink-0 text-gray-400" />
                      <span className="text-gray-500">Email</span>
                      <span className="ml-auto font-medium text-gray-900">
                        {student.email || "Not added yet"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-4 w-4 flex-shrink-0 text-gray-400" />
                      <span className="text-gray-500">Phone</span>
                      <span className="ml-auto font-medium text-gray-900">
                        {student.phone || "Not added yet"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 flex-shrink-0 text-gray-400" />
                      <span className="text-gray-500">Location</span>
                      <span className="ml-auto font-medium text-gray-900">
                        {student.state || "Not added yet"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <CalendarDays className="h-4 w-4 flex-shrink-0 text-gray-400" />
                      <span className="text-gray-500">Member Since</span>
                      <span className="ml-auto font-medium text-gray-900">
                        {student.joinedAt
                          ? new Date(student.joinedAt).toLocaleDateString("en-IN", {
                              month: "long",
                              year: "numeric",
                            })
                          : "2026"}
                      </span>
                    </div>
                  </div>
                )}
              </SectionCard>

              <SectionCard
                title="Academic & Career Goals"
                description="Captured from your AI Advisor questionnaire — powers your course matches."
              >
                {student.advisorProfile ? (
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    {[
                      { icon: Target, label: "Primary Goal", value: student.advisorProfile.goal },
                      { icon: Compass, label: "Focus Area", value: student.advisorProfile.focusArea },
                      { icon: Layers, label: "Preferred Format", value: student.advisorProfile.format },
                      { icon: IndianRupee, label: "Budget Range", value: student.advisorProfile.budget },
                    ]
                      .filter((row) => row.value)
                      .map((row) => (
                        <div
                          key={row.label}
                          className="flex items-start gap-3 rounded-xl bg-gray-50 px-3.5 py-3"
                        >
                          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white text-red-600 shadow-sm">
                            <row.icon className="h-4 w-4" strokeWidth={1.8} />
                          </span>
                          <div className="min-w-0">
                            <p className="text-[11px] font-medium text-gray-400">
                              {row.label}
                            </p>
                            <p className="truncate text-sm font-semibold text-gray-900">
                              {row.value}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3.5">
                    <Sparkles className="h-5 w-5 flex-shrink-0 text-red-500" />
                    <p className="text-sm text-gray-600">
                      Complete the AI Advisor questionnaire from your dashboard
                      to personalize this section with your goals.
                    </p>
                  </div>
                )}
              </SectionCard>

             

              <SectionCard title="Verification & Trust">
                <div className="divide-y divide-gray-50">
                  {[
                    {
                      icon: Mail,
                      title: "Email Address",
                      verified: Boolean(student.email),
                    },
                    {
                      icon: Phone,
                      title: "Phone Number",
                      verified: Boolean(student.phone),
                    },
                    {
                      icon: FileCheck2,
                      title: "Identity Documents",
                      verified: false,
                      note: "12th marksheet pending OCR verification",
                    },
                  ].map((row) => (
                    <div
                      key={row.title}
                      className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                    >
                      <span
                        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${
                          row.verified
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        <row.icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-900">
                          {row.title}
                        </p>
                        {row.note && !row.verified && (
                          <p className="text-xs text-gray-500">{row.note}</p>
                        )}
                      </div>
                      <span
                        className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          row.verified
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {row.verified ? "Verified" : "Pending"}
                      </span>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
