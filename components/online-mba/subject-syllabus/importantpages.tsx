"use client";

import React from "react";

const LEFT_LINKS: { label: string; href: string }[] = [
  { label: "Coupons for Online MBA", href: "#" },
  { label: "Online MBA Eligibility & Duration", href: "#" },
  { label: "Online MBA Admission Procedure", href: "#" },
  { label: "Online MBA Education Loan/EMI", href: "#" },
  { label: "Job Opportunity after Online MBA", href: "#" },
];

const RIGHT_LINKS: { label: string; href: string }[] = [
  { label: "Online MBA Program Overview", href: "#" },
  { label: "Online MBA Program Fees", href: "#" },
  { label: "Online MBA Top Specializations", href: "#" },
  { label: "Online MBA Worth It?", href: "#" },
];

export default function ImportantPages() {
  const rows = Math.max(LEFT_LINKS.length, RIGHT_LINKS.length);

  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
      <div className="mx-auto max-w-5xl rounded-xl border border-slate-200 overflow-hidden">
        <div className="bg-red-500 px-6 py-4">
          <h3 className="text-center text-sm font-bold text-white sm:text-base">
            Important Online MBA Pages
          </h3>
        </div>

        <div>
          {Array.from({ length: rows }).map((_, i) => {
            const left = LEFT_LINKS[i];
            const right = RIGHT_LINKS[i];

            return (
              <div
                key={i}
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  i !== rows - 1 ? "border-b border-slate-200" : ""
                }`}
              >
                <div
                  className={`px-6 py-5 bg-red-50/40 border-b sm:border-b-0 sm:border-r border-slate-200`}
                >
                  {left ? (
                    <a
                      href={left.href}
                      className="text-sm font-semibold text-red-500 underline decoration-red-200 underline-offset-2 hover:text-red-600 hover:decoration-red-400 transition-colors sm:text-base"
                    >
                      {left.label}
                    </a>
                  ) : (
                    <span className="text-sm text-slate-400 sm:text-base">
                      &ndash;
                    </span>
                  )}
                </div>

                <div className="px-6 py-5">
                  {right ? (
                    <a
                      href={right.href}
                      className="text-sm font-semibold text-red-500 underline decoration-red-200 underline-offset-2 hover:text-red-600 hover:decoration-red-400 transition-colors sm:text-base"
                    >
                      {right.label}
                    </a>
                  ) : (
                    <span className="text-sm text-slate-400 sm:text-base">
                      &ndash;
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}