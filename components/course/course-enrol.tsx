"use client";

import React from "react";
import HighlightedText from "@/components/universities/HighlightedText";
import {
  Building2,
  UserPlus,
  FileText,
  Upload,
  BadgeCheck,
  CheckCircle2
} from "lucide-react";

export default function CourseEnrol({ data }: { data?: any }) {
  const heading = data?.heading || data?.title;

  if (!heading || typeof heading !== "string" || !heading.trim()) {
    return null;
  }

  const subHeading = data?.subHeading || data?.subheading || data?.description;
  const note = data?.note;

  const rawSteps = data?.steps || data?.list;
  const stepsList = Array.isArray(rawSteps) && rawSteps.length > 0
    ? rawSteps.map((item: any, i: number) => ({
        number: `0${i + 1}`,
        title: item.title,
        description: item.description,
        icon: [Building2, UserPlus, FileText, Upload, BadgeCheck][i % 5] || FileText
      }))
    : [];

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 font-sans text-black sm:py-16">
      <div className="mx-auto max-w-6xl px-4 font-[Inter] sm:px-6 lg:px-8">
        {/* Main Heading & Subheading */}
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <h2 className="text-[23px] font-bold leading-snug tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {heading.includes("*") ? (
              <HighlightedText text={heading} className="text-[#ee2c3c]" />
            ) : heading.includes("Online MBA") ? (
              <>
                {heading.split("Online MBA")[0]}
                <span className="text-[#ee2c3c]">Online MBA</span>
                {heading.split("Online MBA")[1]}
              </>
            ) : (
              heading
            )}
          </h2>

          {subHeading && (
            <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
              {subHeading}
            </p>
          )}
        </div>

        {/* Steps — horizontal timeline on desktop, vertical timeline on mobile */}
        {stepsList && stepsList.length > 0 && (
          <div
            className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-red-100 bg-red-50/50 px-4 py-6 sm:px-6 sm:py-8"
            style={{
              backgroundImage: "radial-gradient(rgba(238,44,60,0.12) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          >
            <div className="relative">
              {/* Desktop connector running through the step markers */}
              <div
                aria-hidden
                className="absolute top-[23px] hidden border-t-2 border-dashed border-red-300 lg:block"
                style={{
                  left: `${50 / stepsList.length}%`,
                  right: `${50 / stepsList.length}%`,
                }}
              />

              {/* One column per step on desktop, however many steps the data has */}
              <style>{`
                @media (min-width: 1024px) {
                  .__enrol-steps { grid-template-columns: repeat(${stepsList.length}, minmax(0, 1fr)); }
                }
              `}</style>

              <ol className="__enrol-steps grid grid-cols-1 gap-5">
                {stepsList.map((step: any, index: number) => {
                  const Icon = step.icon;
                  const isLast = index === stepsList.length - 1;

                  return (
                    <li key={index} className="relative flex gap-4 lg:flex-col lg:items-center lg:gap-0">
                      {/* Mobile vertical connector */}
                      {!isLast && (
                        <span
                          aria-hidden
                          className="absolute left-[23px] top-12 -bottom-5 border-l-2 border-dashed border-red-300 lg:hidden"
                        />
                      )}

                      {/* Step number box */}
                      <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ee2c3c] text-base font-extrabold tabular-nums text-white shadow-lg shadow-red-500/30 ring-4 ring-white">
                        {step.number}
                      </span>

                      {/* Card */}
                      <div className="group relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_18px_40px_-20px_rgba(238,44,60,0.45)] lg:mt-5 lg:w-full lg:items-center lg:pb-14 lg:text-center">
                        {/* Big background number */}
                        <span
                          aria-hidden
                          className="pointer-events-none absolute right-3 top-2 select-none text-[72px] font-black leading-none tabular-nums text-red-100/70 transition-colors duration-300 group-hover:text-red-100 lg:-bottom-5 lg:-right-1 lg:top-auto lg:text-[88px]"
                        >
                          {step.number}
                        </span>

                        <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#ee2c3c] ring-1 ring-red-100 transition-colors group-hover:bg-[#ee2c3c] group-hover:text-white">
                          <Icon className="h-6 w-6" strokeWidth={1.8} />
                        </div>

                        <h3 className="relative mb-2 text-sm font-bold leading-snug text-slate-900 sm:text-base">
                          {step.title}
                        </h3>

                        <p className="relative text-xs font-normal leading-relaxed text-slate-600 sm:text-sm">
                          {step.description}
                        </p>

                        {/* Hover accent line */}
                        <span
                          aria-hidden
                          className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#ee2c3c] transition-transform duration-300 group-hover:scale-x-100"
                        />
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        )}

        {/* Bottom Alert Note */}
        {note && (
          <div className="mx-auto mt-10 flex max-w-4xl items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50/70 px-5 py-4 text-slate-700">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
              <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <div
              className="text-sm font-medium leading-relaxed text-slate-700"
              dangerouslySetInnerHTML={{ __html: note }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
