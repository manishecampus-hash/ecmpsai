"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { LpHeading, LpSection } from "./lp-ui";

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
  // First answer open; the rest open on click
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

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
    <LpSection tone="muted">
      <LpHeading
        heading={sectionHeading}
        description="Find quick answers to common questions about eligibility, curriculum, recognition, and learning format."
      />

      <div className="mx-auto max-w-4xl space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndexes.includes(index);
          return (
            <div
              key={faq.id || index}
              className={`overflow-hidden rounded-2xl border bg-white transition-colors ${isOpen ? "border-red-100" : "border-slate-200 hover:border-slate-300"}`}
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
              >
                <h3 className="text-[15px] font-bold leading-snug text-slate-900 sm:text-base">{faq.question}</h3>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                    isOpen ? "rotate-180 bg-red-50 text-red-600" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                </span>
              </button>

              <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <div className="border-t border-slate-100 px-5 pb-5 pt-3 text-sm leading-relaxed text-slate-600 sm:px-6 sm:text-[15px]">
                    {faq.answer.startsWith("<") ? (
                      <div
                        className="space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    ) : (
                      <p className="whitespace-pre-line">{faq.answer}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </LpSection>
  );
}

export default LandingPageFaq;
