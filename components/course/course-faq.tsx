"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import HighlightedText from "@/components/universities/HighlightedText";

export default function CourseFAQ({ data }: { data?: any }) {
  const heading = data?.heading || data?.title;

  if (!heading || typeof heading !== "string" || !heading.trim()) {
    return null;
  }

  const rawList = data?.faqs || data?.list || data?.questions;
  const list = Array.isArray(rawList) && rawList.length > 0 ? rawList : null;

  if (!list || list.length === 0) {
    return null;
  }

  const [openIndexes, setOpenIndexes] = useState<number[]>(
    list.map((_, index) => index),
  );

  const toggleFAQ = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <section
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="max-w-4xl mx-auto px-4 py-10"
    >
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 text-center">
        {heading.includes("*") ? (
          <HighlightedText text={heading} className="text-[#ee2c3c]" />
        ) : heading.includes("Questions") ? (
          <>
            {heading.split("Questions")[0]}
            <span className="text-[#ee2c3c]">Questions</span>
            {heading.split("Questions")[1]}
          </>
        ) : (
          heading
        )}
      </h2>
      <p className="mt-4 text-slate-500 text-center leading-relaxed">
        Quick answers to the questions most people ask.
      </p>

      <div className="mt-6 space-y-4">
        {list.map((faq: any, index: number) => {
          const question = faq.question || faq.q || faq.title;
          const answer = faq.answer || faq.a || faq.desc || faq.text;
          if (!question) return null;

          const isOpen = openIndexes.includes(index);

          return (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white shadow-[0_6px_18px_rgba(15,23,42,0.08)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(15,23,42,0.12)]"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <h3 className="text-[16px] md:text-[18px] font-semibold leading-[1.3] tracking-[-0.3px] text-slate-950 pr-4">
                  {question}
                </h3>

                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 transition-all duration-300 ${
                    isOpen ? "rotate-180 bg-red-50" : ""
                  }`}
                >
                  <ChevronDown className="h-5 w-5 text-red-500" />
                </div>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-[14px] leading-6 text-slate-600">
                    {answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
