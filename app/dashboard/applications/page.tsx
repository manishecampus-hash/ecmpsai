"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MotionConfig, motion } from "framer-motion";
import { CheckCircle2, Compass, GraduationCap } from "lucide-react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import ApplicationDetail from "../components/applications/application-detail";
import ApplicationsEmpty from "../components/applications/applications-empty";
import { fadeUp } from "../components/motion";
import type { StudentProfile } from "../types";
import {
  readSubmittedApplications,
  type SubmittedApplication,
} from "@/components/application-flow/submitted-applications";

export default function ApplicationsPage() {
  const [student, setStudent] = useState<StudentProfile>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // null until read from this browser, so the empty state never flashes first
  const [applications, setApplications] = useState<SubmittedApplication[] | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("ecampus_student");
    if (saved) setStudent(JSON.parse(saved));
    const list = readSubmittedApplications();
    setApplications(list);
    setSelectedId(list[0]?.applicationId ?? null);
  }, []);

  const selected = applications?.find((a) => a.applicationId === selectedId) ?? applications?.[0];

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex h-screen overflow-hidden bg-[#f9fafb]">
        <Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Topbar student={student} onOpenMobileMenu={() => setMobileMenuOpen(true)} />

          <main className="flex min-w-0 flex-1 flex-col overflow-y-auto p-4 pb-28 sm:p-6 sm:pb-24">
            <motion.div {...fadeUp(0)} className="mb-5 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h1 className="flex items-center gap-2.5 text-xl font-bold text-gray-900 sm:text-2xl">
                  My Applications
                  {applications && applications.length > 0 && (
                    <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-bold text-red-600">
                      {applications.length}
                    </span>
                  )}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Track your application status, payment and next steps in one place.
                </p>
              </div>
              <Link
                href="/dashboard/matcher"
                className="flex flex-shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-[0.97]"
              >
                <Compass className="h-4 w-4" />
                <span className="hidden sm:inline">Explore programs</span>
              </Link>
            </motion.div>

            {applications === null ? null : selected ? (
              <>
                {applications.length > 1 && (
                  <motion.div {...fadeUp(0.05)} className="-mx-4 mb-5 flex gap-2.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
                    {applications.map((app) => {
                      const active = app.applicationId === selected.applicationId;
                      return (
                        <button
                          key={app.applicationId}
                          type="button"
                          onClick={() => setSelectedId(app.applicationId)}
                          aria-pressed={active}
                          className={`flex min-w-[240px] max-w-[300px] flex-shrink-0 items-center gap-3 rounded-xl border bg-white p-2.5 pr-4 text-left transition ${
                            active
                              ? "border-red-200 shadow-sm ring-2 ring-red-100"
                              : "border-gray-100 hover:border-gray-200 hover:shadow-sm"
                          }`}
                        >
                          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-50 ring-1 ring-gray-100">
                            {app.program.universityLogo ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={app.program.universityLogo} alt="" className="h-full w-full object-contain p-1" />
                            ) : (
                              <GraduationCap className="h-5 w-5 text-red-500" />
                            )}
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-bold text-gray-900">{app.program.programName}</span>
                            <span className="flex items-center gap-1 truncate text-xs text-gray-500">
                              <CheckCircle2 className="h-3 w-3 flex-shrink-0 text-emerald-500" />
                              {app.program.universityName}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
                <ApplicationDetail key={selected.applicationId} application={selected} />
              </>
            ) : (
              <ApplicationsEmpty />
            )}
          </main>
        </div>
      </div>
    </MotionConfig>
  );
}
