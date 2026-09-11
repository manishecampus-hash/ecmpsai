"use client";

import React from "react";
import {
  MapPin,
  Globe,
  GraduationCap,
  Clock3,
  Award,
  ArrowRight,
} from "lucide-react";

import { universities } from "@/data/universities";

interface UniversityProgramsProps {
  onApplyClick?: (universityName: string) => void;
}

/* ============================================================
   ONLY DBA UNIVERSITIES
============================================================ */

const dbaUniversitySlugs = [
  "rushford-business-school",
  "edgewood-university",
  "esgci",
  "ssbm",
  "golden-gate-university",
];

/* ============================================================
   FILTER ONLY DBA UNIVERSITIES
============================================================ */

const dbaUniversities = universities.filter((university) =>
  dbaUniversitySlugs.includes(university.slug)
);

export default function UniversityPrograms({
  onApplyClick,
}: UniversityProgramsProps) {
  return (
    <section className="relative z-10 w-full overflow-hidden bg-white !m-0 !p-0">
      {/* Background Subtle Auras */}
      <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-red-50/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-red-50/40 blur-3xl" />

      {/* Main Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 font-sans sm:px-6 sm:py-18 lg:px-8 lg:py-20">
        {/* ================= HEADING ================= */}
        <div className="mx-auto max-w-3xl mb-10 sm:mb-12 lg:mb-14 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            Programs From Top <span className="text-red-600 font-extrabold">Online Universities</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Explore globally accredited Doctor of Business Administration programs curated for working executives and business leaders.
          </p>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-red-500 shadow-[0_2px_8px_rgba(239,68,68,0.35)]" />
        </div>

        {/* ================= UNIVERSITY GRID ================= */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dbaUniversities.map((university) => {
            const LocationIcon = university.locationIcon === "Globe" ? Globe : MapPin;

            return (
              <article
                key={university.slug}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
              >
                {/* IMAGE AREA */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100 sm:h-48">
                  <img
                    src={university.image}
                    alt={university.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

                  {/* Online DBA Chip */}
                  <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-red-600 shadow-xs backdrop-blur-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                    Online DBA
                  </div>
                </div>

                {/* CARD CONTENT */}
                <div className="flex flex-1 flex-col p-5">
                  {/* University Name */}
                  <h3 className="m-0 text-base font-bold leading-snug text-slate-900 group-hover:text-red-600 line-clamp-2 min-h-[48px] transition-colors sm:text-lg">
                    {university.name}
                  </h3>

                  {/* META DETAILS */}
                  <div className="mt-4 space-y-2.5 text-xs sm:text-[13px] font-medium text-slate-600">
                    {/* Location */}
                    <div className="flex items-center gap-2">
                      <LocationIcon className="h-4 w-4 shrink-0 text-red-500" strokeWidth={2.2} />
                      <span className="truncate">{university.location}</span>
                      <span className="text-slate-300">•</span>
                      <span className="truncate">{university.region}</span>
                    </div>

                    {/* Program Type */}
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 shrink-0 text-red-500" strokeWidth={2.2} />
                      <span>Doctorate • DBA</span>
                    </div>

                    {/* Learning Format */}
                    <div className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4 shrink-0 text-red-500" strokeWidth={2.2} />
                      <span>Flexible Online Learning</span>
                    </div>

                    {/* Accreditation */}
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 shrink-0 text-red-500" strokeWidth={2.2} />
                      <span className="truncate">University Recognized Program</span>
                    </div>
                  </div>

                  {/* APPLY BUTTON */}
                  <div className="mt-auto pt-6">
                    <button
                      type="button"
                      onClick={() => onApplyClick?.(university.name)}
                      className="group/btn flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-xs sm:text-sm font-bold text-white shadow-xs transition-all duration-200 hover:from-red-700 hover:to-red-600 hover:shadow-md active:translate-y-0"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}