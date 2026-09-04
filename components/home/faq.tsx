"use client";

import { Handshake, ChevronDown, MessageSquare } from "lucide-react";
import React, { useState } from "react";
import { Section } from "../ui/section";

const faqs = [
  {
    question: "1. What is eCampus Edu?",
    answer:
      "eCampusEdu is a trusted online education platform that helps students and working professionals discover, compare, and apply to online degree, distance education, executive education, and certification programs from leading universities in India and abroad",
  },
  {
    question: "2. How do I choose the right course on eCampus Edu?",
    answer:
      "You can explore programs based on your career goals, budget, educational background, specialization, and preferred learning format. Our academic counselors can also help you select the most suitable program.",
  },
  {
    question: "3. Are the universities listed on eCampus Edu recognized?",
    answer:
      "Yes. eCampusEdu partners with recognized universities and institutions. Students can verify approvals such as UGC, AICTE, DEB, NAAC accreditation, and international accreditations based on the specific university and program.",
  },
  {
    question: "4. Can working professionals pursue these programs?",
    answer:
      "Absolutely. Most programs featured on eCampus Edu are designed for working professionals and offer flexible schedules, live online classes, recorded lectures, weekend sessions, and self-paced learning options.",
  },
  {
    question: "5. Does eCampusEdu provide admission assistance?",
    answer:
      "Yes. Our team assists students throughout the admission process, including program selection, eligibility verification, application submission, document support, and enrollment guidance.",
  },
];

export default function FAQ() {
  const [openIndexes, setOpenIndexes] = useState<number[]>(
    faqs.map((_, index) => index),
  );

  const toggleFAQ = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index],
    );
  };

  return (
    <Section className="!m-0 !mt-0 !mb-0 !p-0 !pt-0 !pb-0 w-full bg-white">
      <div className="mx-auto w-full max-w-7xl !m-0 mx-auto px-4 sm:px-6 lg:px-16 font-[Inter] !pb-0 !mb-0">
        {/* FAQ Grid Wrapper */}
        <div className="grid gap-6 !mb-0 lg:grid-cols-12 lg:items-start">
          
          {/* LEFT COLUMN: Header & Support Desk Info */}
          <div className="flex flex-col items-center text-center lg:col-span-4 lg:sticky lg:top-8 lg:items-start lg:text-left">
            
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/60 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900">
              <Handshake className="h-3.5 w-3.5 text-red-500" />
              FAQ
            </span>

            <h2 className="mt-2 text-2xl font-extrabold leading-tight tracking-[-0.5px] text-gray-900 sm:text-3xl lg:text-4xl">
              Frequently Asked{" "}
              <span className="text-red-500">Questions</span>
            </h2>

            {/* Support Desk Info Card */}
            <div className="mt-6 hidden w-full rounded-2xl border border-slate-100 bg-slate-50 p-5 lg:block">
              <div className="flex items-center gap-3 text-slate-700">
                <MessageSquare className="h-5 w-5 flex-shrink-0 text-red-500" />
                <span className="text-sm font-bold">
                  Still have doubts?
                </span>
              </div>

              <p className="mt-2 text-xs leading-relaxed text-gray-500">
                Connect with our professional academic program advisors
                directly for personalized roadmap assistance.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: FAQ Accordion */}
          <div className="w-full !mb-0 space-y-3 lg:col-span-8 lg:space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndexes.includes(index);

              return (
                <div
                  key={faq.question}
                  className="rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.06)] transition-all duration-300 hover:shadow-[0_4px_12px_rgba(15,23,42,0.1)] sm:rounded-2xl"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-start justify-between gap-3 p-4 text-left active:bg-slate-50 sm:p-5"
                  >
                    <h3 className="flex-1 text-base font-semibold leading-snug tracking-[-0.3px] text-slate-950 sm:text-lg">
                      {faq.question}
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
      </div>
    </Section>
  );
}