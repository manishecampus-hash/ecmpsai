"use client";

import { Sparkles, UploadCloud, FileEdit } from "lucide-react";
import type { StudentProfile } from "../types";

export default function WelcomeBanner({ student }: { student: StudentProfile }) {
  const firstName = (student.name?.trim().split(" ")[0]) || "Rahul";

  return (
    <div className="rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 via-rose-50 to-white p-5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
         
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-red-600 shadow-sm">
              AI Scholar Level 2
            </span>
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-500 shadow-sm">
              Target: Tech Product &amp; Management 2026
            </span>
          </div>


          <h1 className="mt-3 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
            Welcome, {firstName}!{" "}

            Your AI Academic Twin is{" "}
            <span className="text-red-600">72% calibrated</span>.
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">
            Complete 2 missing data points to unlock ₹25,000 in direct
            university scholarships and verified career outcome simulations.
          </p>

          <div className="mt-4 max-w-xl">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-medium text-gray-500">
                AI Twin Sync Progress
              </span>
              <span className="font-semibold text-red-600">72% Completed</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full bg-red-500"
                style={{ width: "72%" }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-shrink-0 flex-col gap-2.5 sm:flex-row lg:flex-col">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
          >
            <UploadCloud className="h-4 w-4" />
            Auto-Fill with LinkedIn / Resume AI
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <FileEdit className="h-4 w-4" />
            Complete Profile (2 mins)
          </button>
        </div>
      </div>
    </div>
  );
}
