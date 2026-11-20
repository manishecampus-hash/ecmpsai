"use client";

import React from "react";
import LeadFormCard from "@/components/form/lead-form-card";

/**
 * Inline application form for landing-page heroes (MBA & DBA).
 * Same fields & submission as the popup; `courses` sets the course dropdown options.
 */
export default function MbaHeroForm({ courses }: { courses?: string[] }) {
  return <LeadFormCard courses={courses} className="mx-auto max-w-[440px] lg:ml-auto lg:mr-0" />;
}
