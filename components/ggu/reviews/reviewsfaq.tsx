"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Are the reviews on this page from verified students?",
    answer:
      "Yes, reviews are collected from current students and alumni of the Online DBA program at Golden Gate University, reflecting their genuine experience with the program.",
  },
  {
    question: "How is the overall rating calculated?",
    answer:
      "The overall rating is an average of individual star ratings submitted by reviewers, along with a breakdown showing what percentage of reviewers gave each star rating.",
  },
  {
    question: "Can I leave a review after completing the program?",
    answer:
      "Yes, students and alumni are welcome to share their experience. Reach out to our admissions team to learn how you can submit a review after graduation.",
  },
  {
    question: "What do students typically mention in their reviews?",
    answer:
      "Common themes include flexibility for working professionals, the practical nature of case studies and assessments, faculty and supervisor support, and career outcomes after graduation.",
  },
  {
    question: "Are negative reviews shown as well?",
    answer:
      "Yes, the rating breakdown reflects the full range of feedback received, including lower ratings, to give prospective students a balanced and honest picture.",
  },
  {
    question: "Can I contact a reviewer to ask about their experience?",
    answer:
      "Direct contact with reviewers isn't available, but our admissions team can connect you with alumni ambassadors or answer specific questions about the student experience.",
  },
  {
    question: "Do reviews affect the program's accreditation or ranking?",
    answer:
      "Reviews reflect student experience and satisfaction, but the program's accreditation is independently maintained through the Western Association of Schools and Colleges (WASC).",
  },
  {
    question: "How often are new reviews added?",
    answer:
      "Reviews are updated periodically as new students complete the program and share their feedback. Check back regularly to see the latest experiences from graduates.",
  },
];

export default function GGUReviewsFAQ() {
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
            Reviews
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
