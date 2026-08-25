"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Frequently Asked Questions — Online MBA
 * Same accordion pattern as the GGU DBA FAQ, re-aligned to the site's
 * shared container (max-w-4xl, text-3xl md:text-4xl heading, red-500
 * accent) used across the other Online MBA sections.
 */

const faqs = [
  {
    question: "Is an online MBA valid in India?",
    answer:
      "Yes, as long as the university is recognized by the UGC and approved by the Distance Education Bureau (UGC-DEB). Once approved, the degree carries the same standing as a regular MBA.",
  },
  {
    question: "What is the eligibility for an online MBA?",
    answer:
      "You need a Bachelor's degree from a recognized university with a minimum of 50% aggregate marks. Most universities don't require an entrance exam score for admission.",
  },
  {
    question: "How long does an online MBA take to complete?",
    answer:
      "An online MBA typically runs for 2 years, split into 4 semesters. UGC-DEB mandates a 2-year minimum, though most universities allow up to 4 years if you need to pause and resume.",
  },
  {
    question: "How much does an online MBA cost in India?",
    answer:
      "Fees generally range from ₹30,000 to ₹5,00,000 for the full 2-year program, depending on the university and the specialization you choose.",
  },
  {
    question: "Can working professionals pursue an online MBA?",
    answer:
      "Yes, it's built for exactly that. Classes are self-paced or scheduled around live sessions, so you can continue working full-time while completing the degree.",
  },
  {
    question: "Which specializations can I choose in an online MBA?",
    answer:
      "Indian universities offer 95+ specializations, with popular options including HR, Finance, Marketing, Operations, Business Analytics, Data Science, and IT — plus dual-specialization options at many universities.",
  },
  {
    question: "Will employers accept an online MBA degree?",
    answer:
      "Most employers do, especially from UGC-DEB-approved and NAAC-accredited universities. They tend to weigh the university's reputation, accreditation, and the skills you've gained alongside the degree itself.",
  },
  {
    question: "Is an entrance exam required for admission?",
    answer:
      "No, most online MBA programs offer direct admission based on your qualifying degree and marks, without requiring an entrance exam score.",
  },
];

export default function OnlineMBAFAQ() {
  const [openIndexes, setOpenIndexes] = useState<number[]>(
    faqs.map((_, index) => index),
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
        Frequently Asked <span className="text-[#ee2c3c]">Questions</span>
      </h2>
      <p className="mt-4 text-slate-500 leading-relaxed">
        Quick answers to the questions most people ask before starting an
        online MBA.
      </p>

      <div className="mt-6 space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndexes.includes(index);

          return (
            <div
              key={faq.question}
              className="rounded-2xl border border-slate-200 bg-white shadow-[0_6px_18px_rgba(15,23,42,0.08)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(15,23,42,0.12)]"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <h3 className="text-[16px] md:text-[18px] font-semibold leading-[1.3] tracking-[-0.3px] text-slate-950 pr-4">
                  {faq.question}
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
                    {faq.answer}
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