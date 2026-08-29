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
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 font-[Inter]">
        {/* Main Heading & Subheading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl leading-snug">
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

        {/* Desktop & Mobile Steps Flow */}
        {stepsList && stepsList.length > 0 && (
          <div className="relative mx-auto max-w-6xl">
            {/* Desktop Timeline Connection Header (Hidden on Mobile) */}
            <div className="relative hidden lg:block mb-8">
              {/* Connected Gray Line */}
              <div className="absolute top-1/2 left-[8%] right-[8%] -translate-y-1/2 h-[2px] bg-slate-200 z-0" />

              {/* Connected Number Circles Grid */}
              <div className="relative z-10 grid grid-cols-5 gap-6">
                {stepsList.map((step: any, index: number) => (
                  <div key={index} className="flex flex-col items-center justify-center relative">
                    {/* Circle Badge */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ee2c3c] text-base font-bold text-white shadow-md">
                      {step.number}
                    </div>

                    {/* Intermediate Dot between steps */}
                    {index < stepsList.length - 1 && (
                      <span className="absolute right-[-14px] top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-[#ee2c3c] border-2 border-white shadow-xs z-10" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {stepsList.map((step: any, index: number) => {
                const Icon = step.icon;

                return (
                  <div
                    key={index}
                    className="relative flex flex-col items-center rounded-2xl border border-slate-200/90 bg-white p-5 text-center shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-md min-h-[290px]"
                  >
                    {/* Mobile Step Badge (Shown on Mobile) */}
                    <div className="lg:hidden mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#ee2c3c] text-sm font-bold text-white">
                      {step.number}
                    </div>

                    {/* Icon Container */}
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-[#ee2c3c]">
                      <Icon className="h-7 w-7" strokeWidth={1.8} />
                    </div>

                    {/* Step Title */}
                    <h3 className="mb-2 text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {step.title}
                    </h3>

                    {/* Red Divider Line */}
                    <div className="mb-3 h-[2px] w-7 rounded-full bg-[#ee2c3c]" />

                    {/* Step Description */}
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500 font-normal">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Alert Note */}
        {note && (
          <div className="mx-auto mt-8 flex max-w-4xl items-center gap-3 rounded-2xl border border-red-200/60 bg-[#fff5f5] px-5 py-3.5 text-slate-700">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ee2c3c] text-white">
              <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <div
              className="text-xs sm:text-sm font-medium leading-relaxed"
              dangerouslySetInnerHTML={{ __html: note }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
