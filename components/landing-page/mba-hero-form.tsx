"use client";

import React from "react";
import LeadFormCard from "@/components/form/lead-form-card";

/**
 * Inline application form for landing-page heroes (MBA & DBA).
 * Same fields & submission as the popup; `courses` sets the course dropdown options.
 * `compact` (DBA): a narrower, shorter card on desktop so the next section shows on the first screen.
 */
export default function MbaHeroForm({ courses, compact = false }: { courses?: string[]; compact?: boolean }) {
  return (
    <LeadFormCard
      courses={courses}
      compact={compact}
      className={`mx-auto max-w-[440px] lg:ml-auto lg:mr-0 ${compact ? "lg:max-w-[390px]" : ""}`}
    />
  );
}
