"use client";

import React from "react";
import HighlightedText from "@/components/universities/HighlightedText";

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
    <section className="relative mx-auto w-full max-w-5xl px-4 py-10 font-sans text-black sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl font-[Inter]">
        {/* Main Heading */}
        <div className="mb-8 text-center">
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

        {/* Card Container */}
        <div className="overflow-hidden rounded-2xl border border-red-100/60 bg-white shadow-sm">
          {/* Header Bar */}
          <div className="bg-[#ee2c3c] px-6 py-3.5 text-center">
            <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
              {cardTitle}
            </h3>
          </div>

          {/* Key-Value Rows List */}
          <div className="divide-y divide-red-100/40">
            {items.map((item, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 p-5 sm:px-8 sm:py-5 items-start transition-colors ${
                  idx % 2 === 0 ? "bg-white" : "bg-[#fff8f8]"
                }`}
              >
                {/* Left Column: Key/Title */}
                <div className="md:col-span-4 lg:col-span-4">
                  <h4 className="text-sm sm:text-base font-bold text-[#ee2c3c] leading-snug">
                    {item.key}
                  </h4>
                </div>

                {/* Right Column: Checkmark + Value/Description */}
                <div className="md:col-span-8 lg:col-span-8 flex items-start gap-3">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center text-xs font-bold text-red-400">
                    ✓
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
