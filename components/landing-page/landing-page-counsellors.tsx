"use client";

import React from "react";
import { BriefcaseBusiness, UserRound, Star } from "lucide-react";
import HighlightedTitle from "./highlighted-title";

export interface CounsellorItem {
  id: string;
  name: string;
  image: string;
  rating: string;
  experience: string;
  students: string;
}

export interface LandingPageCounsellorsData {
  sectionHeading?: string;
  counsellors?: CounsellorItem[];
}

interface LandingPageCounsellorsProps {
  counsellorsSection?: LandingPageCounsellorsData;
}

export function LandingPageCounsellors({
  counsellorsSection,
}: LandingPageCounsellorsProps) {
  if (
    !counsellorsSection ||
    !counsellorsSection.counsellors ||
    counsellorsSection.counsellors.length === 0
  )
    return null;

  const sectionHeading =
    counsellorsSection.sectionHeading || "Meet Our Counsellors";
  const counsellors = counsellorsSection.counsellors;

  return (
    <section className="relative w-full overflow-hidden bg-slate-50/60 !m-0 !p-0">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 font-sans sm:px-6 sm:py-18 lg:px-8 lg:py-20">
        {/* ================= HEADING ================= */}
        <div className="mx-auto max-w-3xl mb-10 sm:mb-12 lg:mb-14 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            <HighlightedTitle text={sectionHeading} fallbackLastWord={true} />
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Connect with experienced academic advisors and career mentors dedicated to guiding your doctoral journey.
          </p>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-red-500 shadow-[0_2px_8px_rgba(239,68,68,0.35)]" />
        </div>

        {/* ================= COUNSELLOR GRID ================= */}
        <div
          className={`grid gap-6 ${
            counsellors.length === 1
              ? "max-w-sm mx-auto grid-cols-1"
              : counsellors.length === 2
              ? "max-w-2xl mx-auto grid-cols-1 sm:grid-cols-2"
              : counsellors.length === 3
              ? "max-w-5xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {counsellors.map((c) => (
            <article
              key={c.id || c.name}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
            >
              {/* PHOTO */}
              <div className="relative h-52 w-full overflow-hidden rounded-xl bg-slate-100 sm:h-56">
                <img
                  src={c.image || "/dba/counsellor-1.png"}
                  alt={c.name}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent" />
              </div>

              {/* CONTENT */}
              <div className="flex flex-1 flex-col px-1.5 pb-2 pt-3.5">
                {/* NAME + RATING */}
                <div className="flex items-start justify-between gap-2 min-h-[44px]">
                  <h3 className="m-0 text-base font-bold leading-snug text-slate-900 group-hover:text-red-600 transition-colors">
                    {c.name}
                  </h3>

                  <div className="flex shrink-0 items-center gap-1 rounded-full border border-amber-200/70 bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-800">
                    <Star
                      className="h-3 w-3 fill-amber-500 text-amber-500"
                      strokeWidth={1.8}
                    />
                    <span>{c.rating}</span>
                  </div>
                </div>

                {/* EXPERIENCE */}
                <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-600">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-red-50 text-red-600">
                    <BriefcaseBusiness className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </div>
                  <span className="truncate">{c.experience}</span>
                </div>

                {/* STUDENTS */}
                <div className="mt-2.5 flex items-center gap-2 text-xs font-medium text-slate-600">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-red-50 text-red-600">
                    <UserRound className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </div>
                  <span className="truncate">{c.students}</span>
                </div>
              </div>

              {/* Bottom hover accent line */}
              <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-red-500 transition-all duration-300 group-hover:w-2/3" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LandingPageCounsellors;
