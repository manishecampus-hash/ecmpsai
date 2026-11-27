"use client";

import React from "react";
import { ApplicationForm, type LeadData } from "@/components/form/common-form";

/**
 * The site's inline lead form: the shared ApplicationForm in its card (white, soft shadow,
 * red → amber top accent). Used in landing-page heroes, blog / news sidebars, etc.
 * `courses` sets the dropdown options for the programme the page is about.
 * `compact` makes the form shorter on desktop (see ApplicationForm).
 */
export default function LeadFormCard({
  courses,
  onSubmit,
  className = "",
  compact = false,
}: {
  courses?: string[];
  onSubmit?: (data: LeadData) => void;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative overflow-hidden rounded-[22px] bg-white shadow-[0_24px_60px_-24px_rgba(15,23,42,0.35)] ring-1 ring-slate-200">
        <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-amber-400" />
        <ApplicationForm courses={courses} onSubmit={onSubmit} compact={compact} />
      </div>
    </div>
  );
}
