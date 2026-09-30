"use client";

import React, { useState } from "react";
import { ChevronDown, MessageSquare, CircleHelp } from "lucide-react";
import HighlightedText from "./HighlightedText";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  university?: any;
}

export default function FAQSection({ university }: FAQSectionProps) {
  const universityName = university?.name || "IIM K";
  const sdData = university?.details?.supportDesk || {};

  // Premium baseline data fallback if university.faqs is not populated
  const defaultFaqs: FAQItem[] = [
    {
      question: `What type of certification will I receive upon completing a program at ${universityName}?`,
      answer: `Upon successful completion of the academic criteria, you will receive an official Executive Certificate from ${universityName}. You will also receive prestigious Executive Alumni Status, granting you lifelong networking opportunities and access to restricted institutional portals.`,
    },
    {
      question:
        "Are these programs completely online, or are there on-campus immersions?",
      answer:
        "Most strategic modules are delivered live via interactive virtual classrooms. Depending on the specific cohort outline, an optional or mandatory 2-to-3 day on-campus networking residency is hosted at the university campus to meet professors and peers.",
    },
    {
      question: "What is the assessment criteria and grading scheme?",
      answer:
        "Evaluations are continuous and structured around real-world projects, case study assignments, periodic quizzes, and a final capstone submission. A minimum of 75% attendance is standard across modules to qualify for certification.",
    },
    {
      question: "Are there flexible corporate fee EMI options available?",
      answer:
        "Yes, standard corporate payment plans, split installment milestones, and low-cost or no-cost EMI options are offered through allied banking partners to distribute the tuition comfortably across your learning timeframe.",
    },
  ];

  // Defensive execution to guarantee a valid array structure loops over cleanly
  const rawFaqs =
    sdData.faqs && sdData.faqs.length > 0
      ? sdData.faqs
      : university?.faqs &&
          Array.isArray(university.faqs) &&
          university.faqs.length > 0
        ? university.faqs
        : [];

  if (!rawFaqs || rawFaqs.length === 0) {
    return null;
  }

  const [openIndexes, setOpenIndexes] = useState<number[]>(
    rawFaqs.length > 0 ? [0] : []
  );

  const toggleFAQ = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index],
    );
  };

  return (
    /* ============================================================
        FAQ SECTION
        Maintains structural padding and clean slate aesthetics
       ============================================================ */
    <section
      id="faq"
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 text-left font-sans"
    >
      {/* FAQ Grid Wrapper layout split */}
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        {/* LEFT COLUMN: Structural Visual Prompt Header (Span 4) */}
        <div className="lg:col-span-4 lg:sticky lg:top-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <CircleHelp className="h-3.5 w-3.5 text-red-500" />
            {sdData.badge || "Support Desk"}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl text-left lg:text-3xl">
            {sdData.heading ? (
              <HighlightedText text={sdData.heading} />
            ) : (
              <>
                Frequently Asked <span className="text-red-500">Questions</span>
              </>
            )}
          </h2>

          {/* Helpful Support Context Info Card */}
          <div className="mt-8 hidden rounded-2xl bg-slate-50 p-5 border border-slate-100 lg:block">
            <div className="flex items-center gap-3 text-slate-700">
              <MessageSquare className="h-5 w-5 text-red-500" />
              <span className="text-sm font-bold">
                {sdData.doubtsTitle || "Still have doubts?"}
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-500 leading-relaxed">
              {sdData.doubtsDesc ||
                "Connect with our professional academic program advisors directly for personalized roadmap assistance."}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: FAQ Accordion matching Home Page */}
        <div className="w-full !mb-0 space-y-3 lg:col-span-8 lg:space-y-3">
          {rawFaqs.map((faq: FAQItem, index: number) => {
            const isOpen = openIndexes.includes(index);

            return (
              <div
                key={faq.question || index}
                className="rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.06)] transition-all duration-300 hover:shadow-[0_4px_12px_rgba(15,23,42,0.1)] sm:rounded-2xl"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-start justify-between gap-3 p-4 text-left active:bg-slate-50 sm:p-5"
                >
                  <h3 className="flex-1 text-base font-semibold leading-snug tracking-[-0.3px] text-slate-950 sm:text-lg">
                    {/^\d+\.\s*/.test(faq.question) ? faq.question : `${index + 1}. ${faq.question}`}
                  </h3>

                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 transition-all duration-300 sm:h-9 sm:w-9 ${
                      isOpen ? "rotate-180 bg-red-50" : ""
                    }`}
                  >
                    <ChevronDown className="h-4 w-4 text-red-500 sm:h-5 sm:w-5" />
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-4 text-sm leading-6 text-slate-600 sm:px-5 sm:pb-5 sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}