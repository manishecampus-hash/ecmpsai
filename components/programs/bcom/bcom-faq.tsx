"use client";

import React, { useState } from "react";
import { Handshake, ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is the online B.Com degree valid?",
    answer:
      "Yes, a UGC-entitled online B.Com degree is valid and equivalent to a regular degree as per applicable university guidelines.",
  },
  {
    question: "Who can apply for this program?",
    answer:
      "Students who have completed 10+2 or equivalent qualification from a recognized board can apply for an online B.Com program.",
  },
  {
    question: "Can working professionals pursue this course?",
    answer:
      "Yes, the online format is flexible and suitable for students, freshers, entrepreneurs, and working professionals who want to study without leaving their current routine.",
  },
  {
    question: "What is the duration of an online B.Com program?",
    answer:
      "Most online B.Com programs are completed in 3 years, divided into 6 semesters. Some universities may provide extended duration as per their academic policy.",
  },
  {
    question: "What subjects are covered in online B.Com?",
    answer:
      "The program usually covers financial accounting, business law, economics, taxation, auditing, corporate accounting, cost accounting, management, and banking-related subjects.",
  },
  {
    question: "What career options are available after online B.Com?",
    answer:
      "Graduates can explore roles in accounting, finance, banking, taxation, auditing, business operations, insurance, and corporate administration.",
  },
  {
    question: "Can I pursue CA, CS, CMA, or MBA after online B.Com?",
    answer:
      "Yes, after completing a valid online B.Com degree, learners can pursue higher education and professional programs such as MBA, CA, CS, CMA, M.Com, or other eligible postgraduate courses.",
  },
  {
    question: "Are online exams conducted for this program?",
    answer:
      "Many universities conduct online proctored examinations, while some may follow hybrid or center-based exam models. The exact exam format depends on the university.",
  },
];

export default function BComFAQ() {
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
    <section className="w-full bg-white px-4 pt-12 pb-14 sm:px-6 sm:pb-4 lg:px-8 lg:pb-3">
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
    </section>
  );
}
