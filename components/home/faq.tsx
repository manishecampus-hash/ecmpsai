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
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <Section className="w-full bg-white pt-3 pb-13 lg:pb-5">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16 font-[Inter]">
        {/* FAQ Grid Wrapper with 2-Column Layout */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* LEFT COLUMN: Header & Support Desk Info (Span 4) */}
          <div className="lg:col-span-4 lg:sticky lg:top-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <Handshake className="h-3.5 w-3.5 text-red-500" />
              FAQ
            </span>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-3xl">
              Frequently Asked <span className="text-red-500">Questions</span>
            </h2>

            {/* Support Desk Info Card - Hidden on mobile */}
            <div className="mt-8 hidden rounded-2xl bg-slate-50 p-5 border border-slate-100 lg:block">
              <div className="flex items-center gap-3 text-slate-700">
                <MessageSquare className="h-5 w-5 text-red-500" />
                <span className="text-sm font-bold">Still have doubts?</span>
              </div>
              <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                Connect with our professional academic program advisors directly
                for personalized roadmap assistance.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: FAQ Accordion (Span 8) */}
          <div className="space-y-4 lg:col-span-8">
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
    </Section>
  );
}