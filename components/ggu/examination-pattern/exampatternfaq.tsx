"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What types of assessments are used in the Online DBA program?",
    answer:
      "Golden Gate University uses a mix of written tests, case studies, talks and presentations, and hands-on assessments to evaluate students beyond just memorization of theory.",
  },
  {
    question: "Are all courses assessed the same way?",
    answer:
      "No. Assessment weightage and format can vary by course and track — some courses may lean more on written tests, while others emphasize case studies or presentations.",
  },
  {
    question: "How are case studies evaluated?",
    answer:
      "Case studies assess how well you can analyze a real-world business scenario and apply academic concepts and frameworks to reach practical, well-reasoned decisions.",
  },
  {
    question: "Do I need to give live presentations or talks?",
    answer:
      "Yes, talks and presentations are part of the assessment pattern. They evaluate your communication skills and how deeply you understand your coursework and research.",
  },
  {
    question: "What are hands-on assessments?",
    answer:
      "Hands-on assessments are applied, practice-based evaluations that test your confidence and ability to use academic ideas directly in real-life business situations.",
  },
  {
    question: "Are exams held online or in-person?",
    answer:
      "As an Online DBA, assessments are designed to be completed remotely wherever possible. Our admissions team can share specifics for any course that may require additional formats.",
  },
  {
    question: "How is the dissertation stage assessed differently?",
    answer:
      "The dissertation stage under the ECTS Track is assessed through milestones like the written proposal defence and the final written dissertation and oral defence, rather than regular tests.",
  },
  {
    question: "What happens if I don't pass an assessment?",
    answer:
      "Policies on reattempts or remediation vary by course. Reach out to our admissions or academic support team for guidance specific to your situation.",
  },
];

export default function ExamPatternFAQ() {
  const [openIndexes, setOpenIndexes] = useState<number[]>(
    faqs.map((_, index) => index),
  );

  const toggleFAQ = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="w-full bg-white px-4 pt-12 pb-12 sm:px-6 lg:px-8 lg:pb-0"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-8">
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-black sm:text-3xl md:text-4xl">
            Exam Pattern
            <span className="text-red-500"> FAQs</span>
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
    </div>
  );
}
