"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Faq {
  question: string;
  answer: string;
}

const faqs: Faq[] = [
  {
    question:
      "Does Golden Gate University guarantee placement after the Online DBA?",
    answer:
      "Placement is not guaranteed, but the university's strong placement partner network significantly increases exposure to relevant job and internship opportunities across industries.",
  },
  {
    question: "Which companies hire from Golden Gate University?",
    answer:
      "Partners include well-known global companies such as Accenture, Amazon, American Express, Deloitte, EY, HCL, ICICI Bank, Infosys, ITC, JP Morgan Chase, KPMG, L&T, Mahindra & Mahindra, and Microsoft, among others.",
  },
  {
    question: "How is the average salary hike calculated?",
    answer:
      "The average salary hike reflects the typical increase students report in compensation after completing the program, based on outcomes shared by past graduates.",
  },
  {
    question: "Are placement opportunities only for full-time students?",
    answer:
      "Placement support is generally available to all enrolled students, including working professionals, though the format of support may vary based on your enrollment type.",
  },
  {
    question: "Does the university help with interview preparation?",
    answer:
      "Yes, students typically get support around interview readiness as part of placement assistance, which contributes to the reported increase in interview opportunities.",
  },
  {
    question: "Can I request placement support in a specific industry?",
    answer:
      "You can share your industry preference with the placement or admissions team, who can guide you toward relevant partner companies and opportunities where possible.",
  },
  {
    question: "Is placement support available after graduation as well?",
    answer:
      "Many programs extend some level of alumni career support after graduation. Check with our admissions team for specifics on post-graduation placement assistance.",
  },
  {
    question: "How often is the placement partner list updated?",
    answer:
      "The university continues to build and expand its placement relationships over time, so the list of active hiring partners may grow or change periodically.",
  },
];

export default function PlacementPartnersFAQ() {
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
            Placement Partners
            <span className="text-red-500"> FAQs</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Common questions about hiring partners, placement support, and
            career outcomes at Golden Gate University.
          </p>
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
