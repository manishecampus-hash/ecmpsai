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
            className="prose prose-slate mx-auto mb-2 max-w-4xl text-center text-base leading-relaxed text-slate-600 sm:text-[17px]"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        ) : null}

        {list && Array.isArray(list) && list.length > 0 && (
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((item: any, i: number) => {
              const itemTitle = typeof item === "string" ? "" : (item.title || item.heading || "");
              const itemText = typeof item === "string" ? item : (item.text || item.description || item.detail || "");

              return (
                <li
                  key={i}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_18px_40px_-20px_rgba(238,44,60,0.4)] sm:p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-sm font-extrabold tabular-nums text-[#ee2c3c] ring-1 ring-red-100 transition-colors group-hover:bg-[#ee2c3c] group-hover:text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {itemTitle ? (
                      <strong className="text-base font-bold leading-snug text-slate-900">
                        {itemTitle}
                      </strong>
                    ) : (
                      <CheckBubble />
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {itemText}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

function CheckBubble() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
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
