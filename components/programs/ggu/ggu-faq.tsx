"use client";

import React, { useState } from "react";
import { Handshake, ChevronDown } from "lucide-react";
import { Section } from "././../../ui/section"; // Ensure this import path is correct for your project

const faqs = [
  {
    question: "Is the Golden Gate University Online DBA valid?",
    answer:
      "Yes, the Online DBA from Golden Gate University is offered through its AACSB-accredited Edward S. Ageno School of Business and holds full recognition equivalent to an on-campus doctoral degree.",
  },
  {
    question: "Who can apply for this program?",
    answer:
      "Applicants typically need a master's degree (such as an MBA) along with several years of relevant professional or managerial experience to be eligible for the DBA program.",
  },
  {
    question: "Can working professionals pursue this course?",
    answer:
      "Yes, the program is specifically designed for working executives and senior professionals, with a flexible online format built around their schedules.",
  },
  {
    question: "What is the duration of the Online DBA program?",
    answer:
      "The Online DBA is typically completed in 2-3 years, structured across 6 semesters covering coursework, comprehensive exams, and dissertation research.",
  },
  {
    question: "What subjects are covered in the Online DBA?",
    answer:
      "The program usually covers advanced research methods, organizational theory, strategic leadership, corporate finance, global business strategy, and dissertation-focused research seminars.",
  },
  {
    question: "What career options are available after the Online DBA?",
    answer:
      "Graduates can pursue senior roles such as CEO, CFO, Chief Strategy Officer, management consultant, corporate governance director, or transition into academia and research.",
  },
  {
    question: "Is a dissertation mandatory for this program?",
    answer:
      "Yes, candidates must complete an original dissertation involving applied business research, including a proposal defense and a final dissertation defense.",
  },
  {
    question: "Are online exams and defenses conducted virtually?",
    answer:
      "Comprehensive examinations and dissertation defenses are typically conducted online, though some milestones may follow a hybrid format depending on university policy.",
  },
];

export default function GGUDoctorateFAQ() {
  // Maintaining the same "all open" logic as the reference, or change to [] if you prefer single toggle
  const [openIndexes, setOpenIndexes] = useState<number[]>(
    faqs.map((_, index) => index),
  );

  const toggleFAQ = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <Section
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="w-full bg-white px-4 pt-12 pb-24 sm:px-6 lg:pb-32 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <Handshake className="h-3.5 w-3.5 text-red-500" />
            FAQ
          </span>

          <h2 className="mt-3 text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl md:text-4xl">
            Frequently Asked <span className="text-red-500">Questions</span>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="mx-auto max-w-4xl space-y-4">
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
                  <h3 className="text-[18px] font-semibold leading-[1.3] tracking-[-0.3px] text-slate-950 pr-4">
                    {faq.question}
                  </h3>

                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 transition-all duration-300 ${
                      isOpen ? "rotate-180 bg-red-50" : ""
                    }`}
                  >
                    <ChevronDown className="h-5 w-5 text-red-500" />
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
                    <p className="px-5 pb-5 text-[14px] leading-6 text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
