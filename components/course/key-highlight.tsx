"use client";

import React from "react";
import { Check } from "lucide-react";
import HighlightedText from "@/components/universities/HighlightedText";

export default function KeyHighlights({ data }: { data?: any }) {
  const heading = data?.heading || data?.title;

  if (!heading || typeof heading !== "string" || !heading.trim()) {
    return null;
  }

  const list = data?.list || data?.items || [];
  if (!Array.isArray(list) || list.length === 0) {
    return null;
  }

  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-black">
      <div className="max-w-6xl mx-auto font-[Inter]">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {heading.includes("*") ? (
              <HighlightedText text={heading} className="text-red-500" />
            ) : heading.includes("India") ? (
              <>
                {heading.split("India")[0]}
                <span className="text-red-500">India</span>
                {heading.split("India")[1]}
              </>
            ) : (
              heading
            )}
          </h2>
        </div>

        {/* Highlights List */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {list.map((h: any, i: number) => {
            const title = h.title || h.heading;
            const text = h.text || h.description || h.detail;
            if (!title && !text) return null;

            return (
              <div
                key={i}
                className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-[0_18px_40px_-22px_rgba(238,44,60,0.4)]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#ee2c3c] ring-1 ring-red-100 transition-colors group-hover:bg-[#ee2c3c] group-hover:text-white">
                  <Check className="h-5 w-5" strokeWidth={2.5} />
                </div>

                <div className="min-w-0">
                  {title && (
                    <h3 className="text-[15px] font-bold leading-snug text-slate-900 sm:text-base">
                      {title}
                    </h3>
                  )}
                  {text && (
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                      {text}
                    </p>
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
