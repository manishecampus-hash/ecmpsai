"use client";

import React from "react";
import { MessageSquare, CircleHelp } from "lucide-react";

export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
}

export interface SubHeaderFaqSectionProps {
  faqs?: FAQItem[];
  title?: string;
}

export default function SubHeaderFaqSection({ faqs, title }: SubHeaderFaqSectionProps) {
  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
    return null;
  }

  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-black">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-4 lg:sticky lg:top-8">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#ee2c3c]">
            <CircleHelp className="h-3.5 w-3.5" />
            Support Desk
          </span>
          <h2 className="mt-3 text-left text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl">
            {title ? (
              <>
                {title} <span className="text-[#ee2c3c]">FAQs</span>
              </>
            ) : (
              <>
                Frequently Asked <span className="text-[#ee2c3c]">Questions</span>
              </>
            )}
          </h2>

          <div className="mt-8 hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] lg:block">
            <div className="flex items-center gap-3 text-slate-800">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#ee2c3c] ring-1 ring-red-100">
                <MessageSquare className="h-4 w-4" />
              </span>
              <span className="text-sm font-bold">Still have doubts?</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              Connect with our professional academic program advisors directly for personalized roadmap assistance.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-3 lg:col-span-8">
          {faqs.map((faq: FAQItem, index: number) => (
            <div
              key={faq.id || index}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-colors duration-300 hover:border-red-200 sm:p-6"
            >
              <div className="flex items-start gap-3.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-xs font-extrabold tabular-nums text-[#ee2c3c] ring-1 ring-red-100 transition-colors group-hover:bg-[#ee2c3c] group-hover:text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="pt-1 text-base font-bold leading-snug text-slate-900 sm:text-[17px]">
                    {faq.question}
                  </h3>
                  <div
                    className="prose prose-slate mt-2.5 max-w-none text-sm leading-relaxed text-slate-600 sm:text-[15px]"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
