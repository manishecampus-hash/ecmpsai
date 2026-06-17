"use client";

import { Handshake, ChevronDown, TrendingUp } from "lucide-react";
import React, { useState } from "react";
import { Section } from "./ui/section";

const faqs = [
  {
    question: "Is an online degree or certification valid?",
    answer:
      "Yes, any UGC-entitled or globally accredited online degree is completely valid and holds equivalent academic value to a regular on-campus program as per standard university regulations.",
  },
  {
    question: "Who is eligible to apply for these programs?",
    answer:
      "Eligibility criteria vary by course. Generally, undergraduate programs require a 10+2 passing certificate, while postgraduate or executive diplomas require a valid bachelor's degree from a recognized institution.",
  },
  {
    question: "Can working professionals easily balance these courses?",
    answer:
      "Absolutely. The online curriculum is tailored for working professionals, corporate executives, and freshers, providing self-paced learning dashboards and flexible weekend schedules.",
  },
  {
    question: "What is the typical duration of the online programs?",
    answer:
      "Undergraduate degrees generally span 3 years (6 semesters), postgraduate degrees take 2 years (4 semesters), and specialized professional certifications range from 3 to 12 months.",
  },
  {
    question: "How are academic examinations conducted?",
    answer:
      "Most universities utilize online proctored examination setups, allowing you to take tests securely from home. A few courses may offer optional center-based evaluations depending on university guidelines.",
  },
  {
    question: "What career support or services do learners receive?",
    answer:
      "Learners gain access to placement assistance modules, dedicated resume-building workshops, industry mentorship programs, mock interviews, and virtual career fairs with hiring partners.",
  },
  {
    question:
      "Can I pursue regular higher education after completing an online course?",
    answer:
      "Yes, since the degrees are fully recognized by statutory regulatory bodies, you can seamlessly apply for further on-campus programs, global universities, or government sector job examinations.",
  },
  {
    question: "What kind of study materials and learning support are provided?",
    answer:
      "You receive full access to a state-of-the-art Learning Management System (LMS) containing recorded video lectures, live interactive doubt-solving sessions, e-books, and discussion forums.",
  },
];

export default function FAQ() {
  // All FAQs open by default
  const [openIndexes, setOpenIndexes] = useState<number[]>(
    faqs.map((_, index) => index),
  );

  const toggleFAQ = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <Section className="w-full bg-white px-4 pt-12 pb-24 sm:px-6 lg:pb-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}

        <div className="mb-10 text-center">
          <div className="mb-5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-gray-600 text-xs font-semibold tracking-wide uppercase">
            <TrendingUp size={11} />
            FAQ
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Frequently Asked Questions{" "}
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
