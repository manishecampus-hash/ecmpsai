"use client";

import React from "react";
import { ApplicationForm } from "@/components/form/common-form";

/**
 * Inline application form for landing-page heroes (MBA & DBA).
 * Same fields & submission as the popup; `courses` sets the course dropdown options.
 */
export default function MbaHeroForm({ courses }: { courses?: string[] }) {
  return (
    <div className="relative mx-auto w-full max-w-[440px] lg:ml-auto lg:mr-0">
      <div className="relative overflow-hidden rounded-[22px] bg-white shadow-[0_24px_60px_-24px_rgba(15,23,42,0.35)] ring-1 ring-slate-200">
        <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-amber-400" />
        <ApplicationForm
          variant="assured"
          courses={courses}
          coursePlaceholder={courses?.length ? "Choose Specialisation" : undefined}
        />
      </div>
    </div>
  );
}
