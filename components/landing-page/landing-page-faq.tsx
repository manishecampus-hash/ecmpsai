"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import HighlightedTitle from "./highlighted-title";

export interface FaqItemData {
  id: string;
  question: string;
  answer: string;
}

export interface LandingPageFaqData {
  sectionHeading?: string;
  faqs?: FaqItemData[];
}

interface LandingPageFaqProps {
  faqSection?: LandingPageFaqData;
}

export function LandingPageFaq({ faqSection }: LandingPageFaqProps) {
  const faqs = faqSection?.faqs || [];
  const [openIndexes, setOpenIndexes] = useState<number[]>(
    faqs.map((_, index) => index)
  );

  if (!faqs || faqs.length === 0) return null;

  const sectionHeading =
    faqSection?.sectionHeading || "Frequently Asked Questions";

  const toggleFAQ = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="relative w-full overflow-hidden bg-white border-b border-slate-100 !m-0 !p-0">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 font-sans sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl mb-12 sm:mb-14 lg:mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
            <HighlightedTitle text={sectionHeading} fallbackLastWord={true} />
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Find quick answers to common questions about eligibility, curriculum, recognition, and learning format.
          </p>
          <div className="mx-auto mt-4 h-1.5 w-14 rounded-full bg-red-500 shadow-[0_2px_8px_rgba(239,68,68,0.35)]" />
        </div>

        {/* FAQ Accordion */}
        <div className="mx-auto max-w-4xl space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndexes.includes(index);

            return (
              <div
                key={faq.id || index}
                className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xs transition-all duration-200 hover:border-slate-300 hover:shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between p-5 text-left cursor-pointer sm:p-6"
                >
                  <h3 className="pr-4 text-base font-bold leading-snug text-slate-900 sm:text-lg">
                    {faq.question}
                  </h3>

                  <div
                    className={`flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-xl bg-slate-100 transition-all duration-200 ${
                      isOpen ? "rotate-180 bg-red-50 text-red-600 border border-red-100/60" : "text-slate-500"
                    }`}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 px-5 pb-6 pt-4 text-sm leading-relaxed text-slate-600 sm:px-6 sm:text-[15px]">
                    {faq.answer.startsWith("<") ? (
                      <div
                        className="space-y-2.5 leading-relaxed [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    ) : (
                      <p className="whitespace-pre-line leading-relaxed m-0">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LandingPageFaq;
