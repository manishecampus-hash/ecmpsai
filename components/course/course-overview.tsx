"use client";

import React from "react";
import HighlightedText from "@/components/universities/HighlightedText";

export default function CourseOverview({ data }: { data?: any }) {
  const heading = data?.heading || data?.title;

  if (!heading || typeof heading !== "string" || !heading.trim()) {
    return null;
  }

  const description = data?.description || "";
  const tabs = data?.tabs || [];

  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-black">
      <div className="max-w-6xl mx-auto font-[Inter]">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {heading.includes("*") ? (
              <HighlightedText text={heading} className="text-[#ee2c3c]" />
            ) : heading.includes("Overview") ? (
              <>
                {heading.split("Overview")[0]}
                <span className="text-[#ee2c3c]">Overview</span>
                {heading.split("Overview")[1]}
              </>
            ) : (
              heading
            )}
          </h2>
        </div>

        {/* HTML Description */}
        {description ? (
          <div 
            className="text-slate-600 leading-relaxed text-base sm:text-lg prose prose-slate max-w-none mb-6"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        ) : null}

        {/* Dynamic Tabs Checklist if present */}
        {tabs && Array.isArray(tabs) && tabs.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tabs.map((tab: any, i: number) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="inline-block rounded bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-600 uppercase mb-1">
                  {tab.label}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{tab.heading}</h3>
                {tab.subtext && <p className="text-xs text-slate-500 mt-0.5">{tab.subtext}</p>}
                {tab.points && Array.isArray(tab.points) && (
                  <ul className="mt-2 space-y-1">
                    {tab.points.map((pt: string, j: number) => (
                      <li key={j} className="flex items-start gap-1.5 text-xs text-slate-600">
                        <span className="text-green-500 font-bold">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
