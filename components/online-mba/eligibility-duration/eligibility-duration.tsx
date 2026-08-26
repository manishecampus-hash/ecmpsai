"use client";

import React from "react";

const ELIGIBILITY_POINTS: string[] = [
  "3 years of Graduation from any recognized university/college/institution",
  "A bachelor’s degree from any discipline is acceptable.",
  "For the General category, one must have more than 50% marks, while for the SC/ST/OBC/PWD category, one must have more than 45% marks.",
  "It's not mandatory to have any work experience, but having it must be useful in understanding or getting the best opportunities (some universities may require it).",
  "An online MBA doesn’t require CAT/MAT/NMAT/GMAT/SNAP/CUET PG scores. (Some international universities require)",
];

export default function SubEligibilityDuration() {
  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
      {/* Eligibility */}
      <div className="max-w-4xl">
        <h2 className="text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
          <span className="text-red-500">Online MBA</span> Eligibility &amp;
          Duration
        </h2>

        <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
          For enrolling in the Online MBA course, there is a specific
          eligibility criterion you must follow. Most universities have the
          same; there is a general criterion, which you must read thoroughly
          before choosing the right university.
        </p>

        <ul className="mt-5 space-y-3">
          {ELIGIBILITY_POINTS.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
              <span className="text-sm leading-relaxed text-slate-600 sm:text-base">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Duration */}
      <div className="mt-10 max-w-4xl">
        <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
          Duration of the <span className="text-red-500">Online MBA</span>{" "}
          Course
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          The duration of the online MBA course is 2 years, which is subject
          to the university, program plan, and study mode. A few universities
          offer accelerated 1-year management programs (typically PG
          certificates or international university MBAs not bound by
          UGC-DEB norms), while others offer a flexible schedule where you
          can complete a 4-year program at most. Online MBA programs cater
          to working professionals to help them find balance in their
          personal and professional lives. The curriculum is structured as a
          series of semesters or modules covering management, leadership,
          finance, marketing, and business strategy.
        </p>
      </div>
    </section>
  );
}