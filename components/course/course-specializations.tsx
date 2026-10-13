"use client";

import React from "react";
import HighlightedText from "@/components/universities/HighlightedText";
import { Check } from "lucide-react";

export default function CourseSpecializations({ data }: { data?: any }) {
  const heading = data?.heading || data?.title;

  if (!heading || typeof heading !== "string" || !heading.trim()) {
    return null;
  }

  const cardTitle = data?.subHeading || data?.subheading || data?.description || "Popular Specializations";

  // Normalize items list
  const items: Array<{ key: string; value: string }> =
    Array.isArray(data?.items) && data.items.length > 0
      ? data.items
      : Array.isArray(data?.list) && data.list.length > 0
      ? data.list.map((item: any) => ({
          key: item.key || item.specialization || item.name || item.label || "",
          value: item.value || item.about || item.description || item.text || item.fees || ""
        }))
      : [];

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-10 font-sans text-black sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-5xl font-[Inter]">
        {/* Main Heading */}
        <div className="mb-8 text-center sm:mb-10">
          <h2 className="text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {heading.includes("*") ? (
              <HighlightedText text={heading} className="text-[#ee2c3c]" />
            ) : heading.includes("Specializations") ? (
              <>
                {heading.split("Specializations")[0]}
                <span className="text-[#ee2c3c]">Specializations</span>
                {heading.split("Specializations")[1]}
              </>
            ) : (
              heading
            )}
          </h2>
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_40px_-24px_rgba(15,23,42,0.18)]">
          <TableCaption>{cardTitle}</TableCaption>

          <div className="divide-y divide-slate-100">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="group grid grid-cols-1 items-start gap-2 px-5 py-4 transition-colors hover:bg-red-50/40 sm:px-7 sm:py-5 md:grid-cols-12 md:gap-6"
              >
                {/* Key / title */}
                <div className="flex items-center gap-3 md:col-span-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-xs font-bold text-[#ee2c3c] ring-1 ring-red-100 transition-colors group-hover:bg-[#ee2c3c] group-hover:text-white">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-sm font-bold leading-snug text-slate-900 sm:text-base">
                    {item.key}
                  </h4>
                </div>

                {/* Value / description */}
                <div className="flex items-start gap-2.5 md:col-span-8">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <p className="text-sm font-normal leading-relaxed text-slate-600">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TableCaption({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4 sm:px-7">
      <span className="h-5 w-1 shrink-0 rounded-full bg-[#ee2c3c]" />
      <h3 className="text-sm font-semibold leading-snug text-slate-800 sm:text-base">{children}</h3>
    </div>
  );
}
