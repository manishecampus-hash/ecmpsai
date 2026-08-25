"use client";

import React from "react";

type Reason = {
  title: string;
  detail: string;
};

const REASONS: Reason[] = [
  {
    title: "Flexible learning",
    detail:
      "Study when and where it works for you through live or recorded classes and self-paced coursework.",
  },
  {
    title: "Learn while you earn",
    detail:
      "Many working professionals continue their jobs while studying and apply new management concepts directly at work.",
  },
  {
    title: "More affordable",
    detail:
      "Online MBA programmes can cost less than traditional on-campus options, while also reducing relocation and hostel expenses.",
  },
  {
    title: "Build your network",
    detail:
      "Virtual events, peer discussions, alumni communities, mentors and collaborative projects can help expand your professional network.",
  },
  {
    title: "Career growth",
    detail:
      "An MBA can help professionals build management knowledge and prepare for leadership, strategy and other higher-responsibility roles.",
  },
];

export default function WhyChooseOnlineMBA() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-8 font-sans text-black sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl font-[Inter]">
        {/* Header */}
        <div className="mb-6 text-center sm:mb-8">
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            Why Choose an <span className="text-[#ee2c3c]">Online MBA?</span>
          </h2>
        </div>

        {/* Introduction */}
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            An Online MBA gives working professionals the flexibility to
            continue learning without putting their careers on hold. You can
            study around your schedule while building valuable business and
            management skills.
          </p>

          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            From flexible learning and affordability to career growth, here
            are some of the main reasons professionals choose an Online MBA.
          </p>
        </div>

        {/* Reasons */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50 px-6 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <BriefcaseIcon />
              </span>

              <div>
                <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                  Benefits for Working Professionals
                </h3>
                <p className="mt-0.5 text-sm text-slate-500">
                  Learn without stepping away from your career
                </p>
              </div>
            </div>
          </div>

          <ul className="divide-y divide-slate-100">
            {REASONS.map((reason, index) => (
              <li
                key={reason.title}
                className="group flex items-start gap-4 px-6 py-5 transition-colors hover:bg-red-50/30 sm:px-8"
              >
                {/* Number */}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50 text-xs font-bold text-red-500">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 sm:text-base">
                    {reason.title}
                  </h4>

                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {reason.detail}
                  </p>
                </div>

                <span className="ml-auto mt-1 hidden h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500 sm:flex">
                  <CheckIcon />
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Summary */}
        <div className="mt-6 rounded-xl border border-red-100 bg-red-50/60 px-5 py-5 text-center sm:px-8">
          <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
            <span className="font-bold text-slate-900">
              The bottom line:
            </span>{" "}
            An Online MBA can be a practical way to strengthen your management
            skills and work towards career growth without putting everything
            else in your professional life on pause.
          </p>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="7"
        width="18"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M3 12h18M10 12v2h4v-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}