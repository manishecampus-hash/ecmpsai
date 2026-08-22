"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question:
      "How many courses do I need to complete in the Specialization Track?",
    answer:
      "You need to choose 6 courses from the Specialization Track, selecting from areas like Finance, Leadership, Business Analytics, Marketing, General Management, International Management, Data Science, and Supply Chain Management.",
  },
  {
    question: "Can I mix courses from different specialization areas?",
    answer:
      "Yes. The 6 courses you choose from the Specialization Track don't have to come from a single area — you can combine courses across Finance, Analytics, Marketing, and other tracks based on your interests and career goals.",
  },
  {
    question: "Is the Research Track mandatory for all students?",
    answer:
      "Yes, the Research Track is a core part of the Online DBA and covers Research Design, Business Statistics, qualitative and quantitative methodology, academic research foundations, and literature review.",
  },
  {
    question: "What does the ECTS Track involve?",
    answer:
      "The ECTS Track covers your dissertation journey — reflection and supervisor meeting minutes, report writing, your written dissertation and oral defence, doctoral residency, and the written proposal defence.",
  },
  {
    question: "How long does it take to complete the full curriculum?",
    answer:
      "Program duration depends on your pace through the Business Management, Specialization, and Research tracks, followed by the dissertation stage under the ECTS Track. Our admissions team can walk you through a typical timeline.",
  },
  {
    question: "Are the Business Management Track courses fixed for everyone?",
    answer:
      "Yes, the Business Management Track — covering Managerial Skills, Managerial Economics, Cutting Edge Leadership, Financial Reporting, Strategic Management, and International Business Environment — is a required foundation for all students.",
  },
  {
    question:
      "Do I get support during the dissertation and oral defence stage?",
    answer:
      "Yes, you'll work closely with a supervisor throughout the ECTS Track, with structured checkpoints like proposal defence and oral defence to guide you toward successful completion.",
  },
  {
    question: "How is this DBA different from other Online DBA programs?",
    answer:
      "While the overall structure of Business Management, Specialization, Research, and ECTS tracks is common across many DBA programs, Golden Gate University's curriculum, faculty, and course content are tailored to its own academic standards and specialization offerings.",
  },
];

export default function SyllabusFAQ() {
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
            Syllabus & Curriculum
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
