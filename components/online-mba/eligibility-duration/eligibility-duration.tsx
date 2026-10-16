"use client";

import React from "react";
import HighlightedText from "@/components/universities/HighlightedText";
import { Check, Clock3, GraduationCap } from "lucide-react";

const DEFAULT_ELIGIBILITY_POINTS: string[] = [
  "3 years of Graduation from any recognized university/college/institution",
  "A bachelor’s degree from any discipline is acceptable.",
  "For the General category, one must have more than 50% marks, while for the SC/ST/OBC/PWD category, one must have more than 45% marks.",
  "It's not mandatory to have any work experience, but having it must be useful in understanding or getting the best opportunities (some universities may require it).",
  "An online MBA doesn’t require CAT/MAT/NMAT/GMAT/SNAP/CUET PG scores. (Some international universities require)",
];

interface SubEligibilityDurationProps {
  data?: any;
  title?: string;
}

export default function SubEligibilityDuration({ data, title }: SubEligibilityDurationProps) {
  const heading = data?.heading || title || "Online MBA Eligibility & Duration";
  const description =
    data?.description ||
    "For enrolling in the Online MBA course, there is a specific eligibility criterion you must follow. Most universities have the same; there is a general criterion, which you must read thoroughly before choosing the right university.";

  const pointsList = data?.points
    ? typeof data.points === "string"
      ? data.points.split("\n").map((s: string) => s.trim()).filter(Boolean)
      : Array.isArray(data.points)
      ? data.points
      : DEFAULT_ELIGIBILITY_POINTS
    : DEFAULT_ELIGIBILITY_POINTS;

  const durationTitle = data?.durationTitle || "Duration of the Online MBA Course";
  const durationDescription =
    data?.durationDescription ||
    "The duration of the online MBA course is 2 years, which is subject to the university, program plan, and study mode. A few universities offer accelerated 1-year management programs (typically PG certificates or international university MBAs not bound by UGC-DEB norms), while others offer a flexible schedule where you can complete a 4-year program at most. Online MBA programs cater to working professionals to help them find balance in their personal and professional lives. The curriculum is structured as a series of semesters or modules covering management, leadership, finance, marketing, and business strategy.";

  const durationHeading = durationTitle.includes("Online MBA") ? (
    <>
      {durationTitle.split("Online MBA")[0]}
      <span className="text-red-500">Online MBA</span>
      {durationTitle.split("Online MBA")[1]}
    </>
  ) : (
    durationTitle
  );

  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
      <h2 className="text-center text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
        {heading.includes("*") ? (
          <HighlightedText text={heading} className="text-[#ee2c3c]" />
        ) : heading.includes("Online MBA") ? (
          <>
            <span className="text-red-500">Online MBA</span> {heading.replace("Online MBA", "").trim()}
          </>
        ) : (
          heading
        )}
      </h2>

      <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-slate-600 sm:text-base">{description}</p>

      {/* Eligibility and duration side by side (stacked on phones) */}
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {/* Eligibility */}
        <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <div className="flex items-center gap-3 border-b border-red-100 bg-red-50/60 px-5 py-4 sm:px-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#ee2c3c] shadow-sm ring-1 ring-red-100">
              <GraduationCap className="h-5 w-5" strokeWidth={2} />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#ee2c3c]">Who can apply</p>
              <h3 className="text-lg font-bold text-gray-900">Eligibility Criteria</h3>
            </div>
          </div>
          <div className="flex-1 px-5 py-5 sm:px-6">
            <ul className="space-y-2.5">
              {pointsList.map((point: string, idx: number) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-transparent bg-slate-50/70 px-3.5 py-3 transition-colors hover:border-red-100 hover:bg-red-50/40"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600 ring-1 ring-green-200">
                    <Check className="h-3 w-3" strokeWidth={3.5} />
                  </span>
                  <span className="text-sm font-medium leading-relaxed text-slate-700 sm:text-[15px]">{String(point).replace(/^\s*[*•\-–]+\s*/, "")}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Duration */}
        <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <div className="flex items-center gap-3 border-b border-red-100 bg-red-50/60 px-5 py-4 sm:px-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#ee2c3c] shadow-sm ring-1 ring-red-100">
              <Clock3 className="h-5 w-5" strokeWidth={2} />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#ee2c3c]">How long it takes</p>
              <h3 className="text-lg font-bold text-gray-900">{durationHeading}</h3>
            </div>
          </div>
          <p className="flex-1 px-5 py-5 text-sm leading-relaxed text-slate-600 sm:px-6 sm:text-[15px]">{durationDescription}</p>
        </div>
      </div>
    </section>
  );
}
