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
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {list.map((h: any, i: number) => {
            const title = h.title || h.heading;
            const text = h.text || h.description || h.detail;
            if (!title && !text) return null;

            return (
              <div key={i} className="flex items-start gap-3">
                <div className="h-9 w-9 shrink-0 text-red-500 flex items-center justify-center">
                  <Check className="h-5 w-5" />
                </div>

                <div>
                  {title && (
                    <h3 className="text-sm font-bold text-slate-900">
                      {title}
                    </h3>
                  )}
                  {text && (
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
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
