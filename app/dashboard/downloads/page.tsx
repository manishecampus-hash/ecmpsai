"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  CircleDashed,
  Clock3,
  Compass,
  FileCheck2,
  FileText,
  FolderDown,
  GraduationCap,
  Lock,
  ReceiptText,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { EASE_OUT, collapse, fadeUp } from "../components/motion";
import type { StudentProfile } from "../types";
import { readSubmittedApplications, type SubmittedApplication } from "@/components/application-flow/submitted-applications";

// My Downloads: every file a student needs after applying, grouped by application — the program brochure,
// the seat block payment receipt, the submitted application and the offer letter — plus the documents the
// university still needs before it issues the offer letter.
// Brochures come from the university API (saved with the application); offer letters are issued by the
// university after document verification (no API yet), so until a link arrives the row shows it's on its way.

type Kind = "brochure" | "receipt" | "application" | "offer";
type Filter = "all" | "brochure" | "records" | "offer";

const TABS: { id: Filter; label: string; kinds: Kind[] }[] = [
  { id: "all", label: "All files", kinds: ["brochure", "receipt", "application", "offer"] },
  { id: "brochure", label: "Brochures", kinds: ["brochure"] },
  { id: "records", label: "Receipts & forms", kinds: ["receipt", "application"] },
  { id: "offer", label: "Offer letters", kinds: ["offer"] },
];

const FOCUS = "focus-visible:underline focus-visible:underline-offset-4";

const formatDate = (value: string) => new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function DownloadsPage() {
  const [student, setStudent] = useState<StudentProfile>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [applications, setApplications] = useState<SubmittedApplication[] | null>(null);
  const [tab, setTab] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("ecampus_student");
    if (saved) setStudent(JSON.parse(saved));
    setApplications(readSubmittedApplications());
  }, []);

  const apps = applications ?? [];
  const n = apps.length;
  const counts: Record<Filter, number> = { all: n * 4, brochure: n, records: n * 2, offer: n };
  const stats = {
    // receipts and application forms are always ready; brochures and offer letters only once there's a file
    ready: n * 2 + apps.filter((a) => a.program.brochureUrl).length + apps.filter((a) => a.offerLetterUrl).length,
    awaiting: apps.filter((a) => !a.offerLetterUrl).length,
    toSubmit: apps.reduce((sum, a) => sum + (a.program.documents?.length ?? 0), 0),
  };

  const q = query.trim().toLowerCase();
  const shown = useMemo(
    () =>
      (applications ?? []).filter(
        (a) => !q || a.program.programName.toLowerCase().includes(q) || a.program.universityName.toLowerCase().includes(q),
      ),
    [applications, q],
  );
  const kinds = TABS.find((t) => t.id === tab)!.kinds;

  return (
    <div className="flex h-screen overflow-hidden bg-[#f9fafb]">
      <Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar student={student} onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        <main className="min-w-0 flex-1 overflow-y-auto p-4 pb-28 sm:p-6 sm:pb-24">
          <div className="mx-auto max-w-[1100px]">
            {/* Heading */}
            <motion.div {...fadeUp()}>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">My Downloads</h1>
                {n > 0 && <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">{counts.all} files</span>}
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Brochures, receipts, application forms and offer letters for the programs you&apos;ve applied to.
              </p>
            </motion.div>

            {applications === null ? null : n === 0 ? (
              <EmptyState />
            ) : (
              <>
                {/* At a glance */}
                <motion.dl {...fadeUp(0.04)} className="mt-5 grid gap-3 sm:grid-cols-3">
                  <Stat icon={CheckCircle2} tone="emerald" label="Ready to download" value={stats.ready} note="files" />
                  <Stat icon={Clock3} tone="amber" label="Awaiting the university" value={stats.awaiting} note={stats.awaiting === 1 ? "offer letter" : "offer letters"} />
                  <Stat icon={FileCheck2} tone="red" label="Documents to submit" value={stats.toSubmit} note="for verification" />
                </motion.dl>

                <div className="mt-6">
                  <div className="min-w-0">
                    {/* Tabs + search */}
                    <motion.div {...fadeUp(0.08)} className="flex flex-col gap-3 border-b border-gray-200 lg:flex-row lg:items-end lg:justify-between">
                      <div role="tablist" aria-label="File type" className="-mb-px flex gap-5 overflow-x-auto [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden">
                        {TABS.map((t) => {
                          const on = tab === t.id;
                          return (
                            <button
                              key={t.id}
                              type="button"
                              role="tab"
                              aria-selected={on}
                              onClick={() => setTab(t.id)}
                              className={`relative flex flex-shrink-0 items-center gap-2 pb-3 text-sm font-semibold transition-colors ${
                                on ? "text-gray-900" : "text-gray-500 hover:text-gray-800"
                              }`}
                            >
                              {t.label}
                              <span className={`rounded-full px-1.5 py-px text-[11px] tabular-nums transition-colors ${on ? "bg-red-50 text-red-700" : "bg-gray-100 text-gray-500"}`}>
                                {counts[t.id]}
                              </span>
                              {on && (
                                <motion.span
                                  layoutId="downloads-tab"
                                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                                  className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-red-600"
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                      <label className="relative mb-3 block w-full lg:w-64">
                        <span className="sr-only">Search by program or university</span>
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden />
                        <input
                          type="search"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Search program or university"
                          className="h-9 w-full rounded-[10px] border border-gray-200 bg-white pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white"
                        />
                      </label>
                    </motion.div>

                    {/* One card per application */}
                    <div className="mt-5 space-y-4">
                      <AnimatePresence initial={false}>
                        {shown.map((app, i) => (
                          <motion.section
                            key={app.applicationId}
                            layout
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT, delay: Math.min(i, 5) * 0.05 } }}
                            exit={{ opacity: 0, transition: { duration: 0.15 } }}
                            aria-label={`${app.program.programName} at ${app.program.universityName}`}
                            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                          >
                            <ProgramHeader app={app} />
                            <ul className="divide-y divide-gray-100">
                              {kinds.map((kind) => (
                                <FileRow key={kind} kind={kind} app={app} />
                              ))}
                            </ul>
                            {tab === "all" && <DocumentsChecklist app={app} />}
                          </motion.section>
                        ))}
                      </AnimatePresence>

                      {shown.length === 0 && (
                        <p className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-10 text-center text-sm text-gray-500">
                          No files match &ldquo;{query}&rdquo;.
                        </p>
                      )}
                    </div>
                  </div>

                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

const TONES = {
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  red: "bg-red-50 text-red-600",
} as const;

function Stat({ icon: Icon, tone, label, value, note }: { icon: LucideIcon; tone: keyof typeof TONES; label: string; value: number; note: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] ${TONES[tone]}`}>
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <div className="min-w-0">
        <dt className="text-xs font-medium text-gray-500">{label}</dt>
        <dd className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold tabular-nums text-gray-900">{value}</span>
          <span className="truncate text-xs text-gray-500">{note}</span>
        </dd>
      </div>
    </div>
  );
}

function ProgramHeader({ app }: { app: SubmittedApplication }) {
  const { program } = app;
  return (
    <div className="flex items-center gap-3.5 border-b border-gray-100 bg-gray-50/60 px-4 py-3.5 sm:px-5">
      <span className="flex h-11 w-14 flex-shrink-0 items-center justify-center rounded-[10px] border border-gray-200 bg-white p-1.5">
        {program.universityLogo ? (
          <img src={program.universityLogo} alt="" className="max-h-full max-w-full object-contain" />
        ) : (
          <GraduationCap className="h-5 w-5 text-gray-400" aria-hidden />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-[15px] font-bold text-gray-900">{program.programName}</h2>
        <p className="truncate text-xs text-gray-500">
          {program.universityName}
          {program.durationLabel ? ` · ${program.durationLabel}` : ""}
        </p>
      </div>
      <dl className="hidden flex-shrink-0 text-right sm:block">
        <dt className="sr-only">Application number</dt>
        <dd className="font-mono text-xs text-gray-700">{app.applicationId}</dd>
        <dt className="sr-only">Applied on</dt>
        <dd className="mt-0.5 text-[11px] text-gray-400">Applied {formatDate(app.payment.paidAt)}</dd>
      </dl>
    </div>
  );
}

// What each file row says and links to
function fileInfo(kind: Kind, app: SubmittedApplication) {
  const { program } = app;
  switch (kind) {
    case "brochure":
      return {
        name: "Program brochure",
        description: "Course structure, fees, eligibility and specialisations",
        url: program.brochureUrl,
        external: true,
        fallback: { label: "University page", href: `/${program.slug}` },
      };
    case "receipt":
      return {
        name: "Seat block payment receipt",
        description: `₹${app.payment.amount.toLocaleString("en-IN")} paid on ${formatDate(app.payment.paidAt)} · ${app.payment.paymentId}`,
        url: "/dashboard/receipts",
        external: false,
        action: "View receipt",
      };
    case "application":
      return {
        name: "Application form",
        description: `The details you submitted · application no. ${app.applicationId}`,
        url: `/dashboard/applications?id=${encodeURIComponent(app.applicationId)}`,
        external: false,
        action: "View",
      };
    case "offer":
      return {
        name: "Offer letter",
        description: app.offerLetterUrl
          ? "Issued by the university · keep it safe for enrolment"
          : "Issued by the university after document verification",
        url: app.offerLetterUrl,
        external: true,
      };
  }
}

function FileRow({ kind, app }: { kind: Kind; app: SubmittedApplication }) {
  const info = fileInfo(kind, app);
  const ready = Boolean(info.url);
  const Icon = kind === "receipt" ? ReceiptText : kind === "application" ? FileText : kind === "offer" ? ShieldCheck : FileText;
  const label = `${info.name} for ${app.program.programName} at ${app.program.universityName}`;

  return (
    <li className="group flex flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3.5 transition-colors hover:bg-gray-50/70 sm:flex-nowrap sm:px-5">
      <span className={`relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] ${ready ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-400"}`}>
        <Icon className="h-5 w-5" aria-hidden />
        {info.external && (
          <span className="absolute -bottom-1 rounded bg-white px-1 text-[8px] font-bold leading-[12px] tracking-wide text-red-600 shadow-sm ring-1 ring-red-100">
            PDF
          </span>
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-900">{info.name}</p>
        <p className="truncate text-xs text-gray-500">{info.description}</p>
      </div>

      <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
        <Status kind={kind} ready={ready} />
        {ready && info.external ? (
          <a
            href={info.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Download ${label}`}
            className="inline-flex h-9 items-center gap-1.5 rounded-[10px] bg-red-600 px-3.5 text-xs font-semibold text-white shadow-sm transition hover:bg-red-700 active:scale-[0.98]"
          >
            <ArrowDownToLine className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
            Download
          </a>
        ) : ready ? (
          <Link
            href={info.url!}
            aria-label={`${info.action} — ${label}`}
            className="inline-flex h-9 items-center gap-1.5 rounded-[10px] border border-gray-200 bg-white px-3.5 text-xs font-semibold text-gray-700 transition hover:border-red-200 hover:text-red-700"
          >
            {info.action}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        ) : info.fallback ? (
          <Link
            href={info.fallback.href}
            className="inline-flex h-9 items-center gap-1.5 rounded-[10px] border border-gray-200 bg-white px-3.5 text-xs font-semibold text-gray-700 transition hover:border-red-200 hover:text-red-700"
          >
            {info.fallback.label}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex h-9 cursor-not-allowed items-center gap-1.5 rounded-[10px] border border-gray-200 bg-gray-50 px-3.5 text-xs font-semibold text-gray-400"
          >
            <Lock className="h-3.5 w-3.5" aria-hidden />
            Download
          </span>
        )}
      </div>
    </li>
  );
}

function Status({ kind, ready }: { kind: Kind; ready: boolean }) {
  if (ready) {
    const text = kind === "offer" ? "Issued" : kind === "receipt" ? "Paid" : kind === "application" ? "Submitted" : "Available";
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
        {text}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
      <Clock3 className="h-3.5 w-3.5" aria-hidden />
      {kind === "offer" ? "Awaiting university" : "On university page"}
    </span>
  );
}

// What the university still needs, from its process flow — collapsed by default to keep the card short
function DocumentsChecklist({ app }: { app: SubmittedApplication }) {
  const [open, setOpen] = useState(false);
  const docs = app.program.documents ?? [];
  if (docs.length === 0) return null;
  return (
    <div className="border-t border-gray-100 bg-[#fffafa]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left sm:px-5"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <FileCheck2 className="h-4 w-4 text-red-600" aria-hidden />
          Documents to submit
          <span className="rounded-full bg-red-50 px-1.5 py-px text-[11px] font-semibold tabular-nums text-red-700">{docs.length}</span>
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="docs" {...collapse} className="overflow-hidden">
            <ul className="grid gap-2 px-4 pb-4 sm:grid-cols-2 sm:px-5">
              {docs.map((d) => (
                <li key={d.title} className="flex items-start gap-2.5 rounded-[10px] border border-gray-100 bg-white p-3">
                  <CircleDashed className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-300" aria-hidden />
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold text-gray-800">{d.title}</span>
                    {d.description && <span className="mt-0.5 block text-[11px] leading-snug text-gray-500">{d.description}</span>}
                  </span>
                </li>
              ))}
            </ul>
            <p className="px-4 pb-4 text-[11px] text-gray-500 sm:px-5">
              Share these with your counsellor in{" "}
              <Link href="/dashboard/mychat" className={`font-semibold text-red-600 hover:text-red-700 ${FOCUS}`}>
                My Chat
              </Link>
              . They&apos;re checked by the university before the offer letter is issued.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EmptyState() {
  return (
    <motion.section {...fadeUp(0.05)} className="mt-6 rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-[10px] bg-red-50 text-red-600">
        <FolderDown className="h-6 w-6" aria-hidden />
      </span>
      <h2 className="mt-4 text-base font-bold text-gray-900">No downloads yet</h2>
      <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">
        When you apply to a program, its brochure, your payment receipt, application form and offer letter will all be kept here.
      </p>
      <ul className="mx-auto mt-6 grid max-w-xl gap-2 text-left sm:grid-cols-2">
        {[
          { icon: FileText, label: "Program brochure" },
          { icon: ReceiptText, label: "Payment receipt" },
          { icon: FileCheck2, label: "Application form" },
          { icon: ShieldCheck, label: "Offer letter" },
        ].map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2.5 rounded-[10px] border border-dashed border-gray-200 px-3 py-2.5 text-xs font-medium text-gray-500">
            <Icon className="h-4 w-4 text-gray-400" aria-hidden />
            {label}
          </li>
        ))}
      </ul>
      <Link
        href="/dashboard/matcher"
        className="mt-6 inline-flex items-center gap-2 rounded-[10px] bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
      >
        <Compass className="h-4 w-4" aria-hidden />
        Explore programs
      </Link>
    </motion.section>
  );
}
