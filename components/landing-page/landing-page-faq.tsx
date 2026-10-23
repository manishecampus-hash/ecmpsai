"use client";

import React, { useState } from "react";
import { ArrowRight, ChevronDown, Handshake, MessageSquare } from "lucide-react";
import ApplyNowModal from "@/components/form/apply-now-modal";
import HighlightedTitle from "./highlighted-title";
import { LpSection } from "./lp-ui";

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
  /** Options for the Apply form's course dropdown on this page */
  formCourses?: string[];
}

// Same look as the home page FAQ: heading + help card on the left, accordion on the right.
export function LandingPageFaq({ faqSection, formCourses }: LandingPageFaqProps) {
  const faqs = faqSection?.faqs || [];
  // First answer open; the rest open on click
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);
  const [applyOpen, setApplyOpen] = useState(false);

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

  const helpCard = (
    <div className="w-full rounded-2xl border border-slate-100 bg-slate-50 p-5 text-left">
      <div className="flex items-center gap-3 text-slate-700">
        <MessageSquare className="h-5 w-5 flex-shrink-0 text-red-500" />
        <span className="text-sm font-bold">Still have doubts?</span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-gray-500">
        Connect with our professional academic program advisors directly for personalized roadmap assistance.
      </p>
      <button
        type="button"
        onClick={() => setApplyOpen(true)}
        className="group mt-4 inline-flex h-10 items-center gap-2 rounded-xl bg-red-50 px-4 text-sm font-semibold text-red-700 transition-colors hover:bg-red-600 hover:text-white"
      >
        Talk to a Counsellor
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );

  return (
    <LpSection className="border-t border-slate-100">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
        {/* LEFT COLUMN: header & help card */}
        <div className="flex flex-col items-center text-center lg:sticky lg:top-24 lg:col-span-4 lg:items-start lg:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/60 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900">
            <Handshake className="h-3.5 w-3.5 text-red-500" />
            FAQ
          </span>

          <h2 className="mt-2 text-2xl font-extrabold leading-tight tracking-[-0.5px] text-gray-900 sm:text-3xl lg:text-4xl">
            <HighlightedTitle text={sectionHeading} fallbackLastWord highlightClassName="text-red-500" />
          </h2>

          <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
            Quick answers about eligibility, curriculum, recognition and learning format.
          </p>

          <div className="mt-6 hidden w-full lg:block">{helpCard}</div>
        </div>

        {/* RIGHT COLUMN: accordion */}
        <div className="w-full space-y-3 lg:col-span-8">
          {faqs.map((faq, index) => {
            const isOpen = openIndexes.includes(index);
            return (
              <div
                key={faq.id || index}
                className="rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.06)] transition-all duration-300 hover:shadow-[0_4px_12px_rgba(15,23,42,0.1)] sm:rounded-2xl"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-3 p-4 text-left active:bg-slate-50 sm:p-5"
                >
                  <h3 className="flex-1 text-base font-semibold leading-snug tracking-[-0.3px] text-slate-950 sm:text-lg">
                    {faq.question}
                  </h3>
                  <span
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 sm:h-9 sm:w-9 ${
                      isOpen ? "rotate-180 bg-red-50" : "bg-slate-100"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4 text-red-500 sm:h-5 sm:w-5" />
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-4 text-sm leading-6 text-slate-600 sm:px-5 sm:pb-5 sm:text-base">
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

        {/* Help card sits under the questions on small screens */}
        <div className="lg:hidden">{helpCard}</div>
      </div>

      <ApplyNowModal isOpen={applyOpen} onClose={() => setApplyOpen(false)} courses={formCourses} />
    </LpSection>
  );
}

export default LandingPageFaq;
