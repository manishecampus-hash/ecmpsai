"use client";

import React from "react";
import HighlightedText from "@/components/universities/HighlightedText";

export default function Professionals({ data }: { data?: any }) {
  const heading = data?.heading || data?.title;

  // If title is not present, hide the section
  if (!heading || typeof heading !== "string" || !heading.trim()) {
    return null;
  }

  const description = data?.description || data?.subtext || "";
  const list = data?.list || data?.points || data?.bullets || [];

  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-black">
      <div className="max-w-6xl mx-auto font-[Inter]">
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {heading.includes("*") ? (
              <HighlightedText text={heading} className="text-[#ee2c3c]" />
            ) : heading.includes("Professionals") ? (
              <>
                {heading.split("Professionals")[0]}
                <span className="text-[#ee2c3c]">Professionals</span>
                {heading.split("Professionals")[1]}
              </>
            ) : (
              heading
            )}
          </h2>
        </div>

        {description ? (
          <div 
            className="mx-auto max-w-5xl text-center text-slate-600 leading-relaxed text-base sm:text-lg mb-6 prose prose-slate"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        ) : null}

        {list && Array.isArray(list) && list.length > 0 && (
          <div className="mt-6 rounded-2xl border border-slate-200 shadow-sm bg-white p-6">
            <ul className="space-y-4">
              {list.map((item: any, i: number) => {
                const itemTitle = typeof item === "string" ? "" : (item.title || item.heading || "");
                const itemText = typeof item === "string" ? item : (item.text || item.description || item.detail || "");

                return (
                  <li key={i} className="flex items-start gap-3">
                    <CheckBubble />
                    <span className="text-sm md:text-[15px] text-slate-600 leading-relaxed">
                      {itemTitle && (
                        <strong className="font-bold text-slate-900 mr-1.5">
                          {itemTitle}
                        </strong>
                      )}
                      {itemText}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function CheckBubble() {
  return (
    <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path
          d="M20 6L9 17l-5-5"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
