"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Building2, CalendarDays, CheckCircle2, Compass, GraduationCap } from "lucide-react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import ApplicationDetail from "../components/applications/application-detail";
import ApplicationsEmpty from "../components/applications/applications-empty";
import type { StudentProfile } from "../types";
import { readSubmittedApplications, type SubmittedApplication } from "@/components/application-flow/submitted-applications";
import { formatINR, formatLongDate } from "@/components/application-flow/options";

export default function ApplicationsPage() {
  const router = useRouter();
  const [student, setStudent] = useState<StudentProfile>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [applications, setApplications] = useState<SubmittedApplication[] | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("ecampus_student");
    if (saved) setStudent(JSON.parse(saved));
    const list = readSubmittedApplications();
    setApplications(list);
    const requested = new URLSearchParams(window.location.search).get("id");
    setSelectedId(list.some((a) => a.applicationId === requested) ? requested : null);
    const syncSelection = () => {
      const id = new URLSearchParams(window.location.search).get("id");
      setSelectedId(list.some((a) => a.applicationId === id) ? id : null);
    };
    window.addEventListener("popstate", syncSelection);
    return () => window.removeEventListener("popstate", syncSelection);
  }, []);

  const selected = applications?.find((a) => a.applicationId === selectedId);
  const openApplication = (id: string) => {
    setSelectedId(id);
    router.push(`/dashboard/applications?id=${encodeURIComponent(id)}`, { scroll: false });
  };
  const showList = () => {
    setSelectedId(null);
    router.push("/dashboard/applications", { scroll: false });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f9fafb]">
      <Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar student={student} onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        <main className="flex min-w-0 flex-1 flex-col overflow-y-auto p-4 pb-28 sm:p-6 sm:pb-24">
          {selected ? (
            <>
              <button onClick={showList} className="mb-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-red-600">
                <ArrowLeft className="h-4 w-4" /> All applications
              </button>
              <ApplicationDetail key={selected.applicationId} application={selected} />
            </>
          ) : applications === null ? null : applications.length === 0 ? (
            <>
              <PageHeading count={0} />
              <ApplicationsEmpty />
            </>
          ) : (
            <>
              <PageHeading count={applications.length} />
              <section aria-label="Your applications" className="grid gap-5 lg:grid-cols-2">
                {applications.map((application) => (
                  <ApplicationCard key={application.applicationId} application={application} onOpen={() => openApplication(application.applicationId)} />
                ))}
              </section>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3.5">
                <p className="text-xs text-gray-500">Need to apply to another program?</p>
                <Link href="/dashboard/matcher" className="inline-flex items-center gap-2 text-xs font-semibold text-red-600 hover:text-red-700"><Compass className="h-4 w-4" /> Explore programs</Link>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function PageHeading({ count }: { count: number }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4 border-b border-gray-200 pb-5">
      <div className="flex items-start gap-3.5">
        <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-700">
          <GraduationCap className="h-5 w-5" strokeWidth={1.8} />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">Student dashboard</p>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-[28px]">My Applications</h1>
            <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-semibold tabular-nums text-gray-600">{count} {count === 1 ? "application" : "applications"}</span>
          </div>
          <p className="mt-1.5 text-sm text-gray-500">Review your submissions and follow each application’s progress.</p>
        </div>
      </div>
      <Link href="/dashboard/matcher" className="group inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-700">
        <Compass className="h-4 w-4" /> Explore programs <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

function ApplicationCard({ application, onOpen }: { application: SubmittedApplication; onOpen: () => void }) {
  const { program, payment, applicationId } = application;
  return (
    <button onClick={onOpen} className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white text-left shadow-sm transition hover:border-gray-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500">
      <div className="relative h-40 overflow-hidden bg-gray-100 sm:h-44">
        {program.image ? (
          <div aria-hidden className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.02]" style={{ backgroundImage: `url("${program.image}")` }} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            {program.universityLogo ? <img src={program.universityLogo} alt="" className="max-h-20 max-w-[180px] object-contain" /> : <GraduationCap className="h-10 w-10 text-gray-300" />}
          </div>
        )}
        {program.image && <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />}
        {program.image && <span className="absolute bottom-4 left-5 right-5 truncate text-base font-semibold text-white sm:text-lg">{program.universityName}</span>}
        <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-emerald-700 shadow-sm">
          <CheckCircle2 className="h-3.5 w-3.5" /> Paid
        </span>
      </div>
      <span className="flex flex-1 flex-col p-5 sm:p-6">
        {!program.image && <span className="mb-2 flex items-center gap-1.5 text-xs font-medium text-gray-500"><Building2 className="h-3.5 w-3.5" />{program.universityName}</span>}
        <span className="min-h-[56px] text-lg font-bold leading-7 text-gray-900 transition group-hover:text-red-700 sm:text-xl">{program.programName}</span>
        <span className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-gray-400" />Submitted {formatLongDate(payment.paidAt)}</span>
          {program.durationLabel && <span className="border-l border-gray-200 pl-5">{program.durationLabel}</span>}
        </span>
        <span className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-4">
          <span className="min-w-0"><span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">Application number</span><span className="mt-1 block truncate font-mono text-xs text-gray-700">{applicationId}</span></span>
          <span className="flex items-center gap-3">
            <span className="text-right"><span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">Seat block paid</span><span className="mt-1 block text-base font-bold text-gray-900">{formatINR(payment.amount)}</span></span>
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition group-hover:border-red-200 group-hover:bg-red-50 group-hover:text-red-600"><ArrowUpRight className="h-4 w-4" /></span>
          </span>
        </span>
      </span>
    </button>
  );
}
