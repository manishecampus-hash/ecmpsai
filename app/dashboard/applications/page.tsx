"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowUpRight, CalendarDays, CheckCircle2, Compass, GraduationCap, Sparkles } from "lucide-react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import UniImage from "@/components/ui/uniImage";
import type { StudentProfile } from "../types";
import { APPLIED_EVENT, readApplied, type AppliedProgram } from "../components/applications/applied-store";

// My Applications: everything applied to with "1-Click Apply" (directly or by the agent's AI Apply).
// Green border = applied; red border = couldn't apply / already applied.
// Frontend only for now: read from applied-store until the backend is connected.

const formatDate = (ms: number) => new Date(ms).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function ApplicationsPage() {
  const [student, setStudent] = useState<StudentProfile>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [applied, setApplied] = useState<AppliedProgram[] | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ecampus_student");
      if (saved) setStudent(JSON.parse(saved));
    } catch {
      // No saved profile.
    }
    const sync = () => setApplied(readApplied());
    sync();
    window.addEventListener(APPLIED_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(APPLIED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const count = applied?.filter((a) => a.status === "applied").length ?? 0;

  return (
    <div className="flex h-screen overflow-hidden bg-[#f9fafb]">
      <Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar student={student} onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        <main className="flex min-w-0 flex-1 flex-col overflow-y-auto p-4 pb-28 sm:p-6 sm:pb-24">
          <PageHeading count={count} />

          {applied &&
            (applied.length > 0 ? (
              <ul aria-label="Your applications" className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
                {applied.map((a) => (
                  <ApplicationCard key={a.id} application={a} />
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-14 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <GraduationCap className="h-6 w-6" />
                </span>
                <p className="mt-4 text-base font-bold text-gray-900">No applications yet</p>
                <p className="mt-1 max-w-sm text-sm text-gray-500">Find a program you like and tap 1-Click Apply — it&apos;ll show up here.</p>
                <Link
                  href="/dashboard/matcher"
                  className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-red-700"
                >
                  Find programs <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
        </main>
      </div>
    </div>
  );
}

function PageHeading({ count }: { count: number }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="flex items-start gap-3.5">
        <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-700">
          <GraduationCap className="h-5 w-5" strokeWidth={1.8} />
        </span>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1.5">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-[28px]">My Applications</h1>
          <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-semibold tabular-nums text-gray-600">
            {count} {count === 1 ? "application" : "applications"}
          </span>
        </div>
      </div>
      <Link
        href="/dashboard/matcher"
        className="group inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
      >
        <Compass className="h-4 w-4" /> Explore programs
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

function ApplicationCard({ application: a }: { application: AppliedProgram }) {
  const ok = a.status === "applied";
  return (
    <li
      className={`group flex flex-col overflow-hidden rounded-xl border-2 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg motion-safe:animate-fade-in ${
        ok ? "border-emerald-400/70 hover:shadow-emerald-100/80" : "border-red-400/70 hover:shadow-red-100/80"
      }`}
    >
      <div className="relative h-20 bg-gray-100 sm:h-24">
        {a.image && <UniImage src={a.image} alt={a.university} className="object-cover transition-transform duration-300 group-hover:scale-[1.04]" />}
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span
          className={`absolute left-2 top-2 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold shadow-sm ${
            ok ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {ok ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
          {ok ? "Applied" : a.note ?? "Couldn't apply"}
        </span>
        {a.viaAI && (
          <span title="Applied by AI Apply" className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-md bg-white/95 text-gray-700 shadow-sm">
            <Sparkles className="h-3 w-3" />
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <p className="truncate text-[10.5px] font-bold uppercase tracking-wide text-gray-500">{a.university}</p>
        <p title={a.program} className="mt-1 line-clamp-2 text-[13px] font-semibold leading-snug text-gray-900">
          {a.program}
        </p>
        <p className="mt-auto flex items-center gap-1 pt-2 text-[11px] text-gray-400">
          <CalendarDays className="h-3 w-3" />
          {formatDate(a.appliedAt)}
        </p>
      </div>
    </li>
  );
}
