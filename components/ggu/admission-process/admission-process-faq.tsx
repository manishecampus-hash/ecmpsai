"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question:
      "What are the steps in the Golden Gate University admission process?",
    answer:
      "The admission process generally includes submitting the online application, uploading academic and professional documents, completing the admission review, receiving the offer letter, and confirming enrollment by paying the required fee.",
  },
  {
    question:
      "Which documents are required for admission to the Online DBA program?",
    answer:
      "Applicants are usually required to submit academic transcripts, degree certificates, a government-issued ID, an updated resume or CV, and any additional documents requested by the admissions team during the review process.",
  },
  {
    question:
      "How do I submit my application for Golden Gate University Online DBA?",
    answer:
      "You can complete the application online by filling in your personal, academic, and professional details and uploading the required supporting documents through the university admission portal.",
  },
  {
    question: "Is work experience mandatory for the admission process?",
    answer:
      "Professional work experience is generally preferred for the Online DBA program because the curriculum is designed for working professionals and experienced managers seeking advanced leadership and research skills.",
  },
  {
    question: "What happens after I submit my admission application?",
    answer:
      "After submission, the admissions team verifies your documents, evaluates your academic and professional background, and contacts you if any additional information or clarification is needed before a final decision is made.",
  },
  {
    question: "How will I know if my admission has been approved?",
    answer:
      "Once the evaluation is complete, you will receive an official admission decision by email, along with further instructions for enrollment, fee payment, and access to the student onboarding process.",
  },
  {
    question:
      "Can international students apply through the same admission process?",
    answer:
      "Yes, international applicants can apply through the same online admission process, but they may also need to provide credential evaluations or other country-specific documentation as requested by the university.",
  },
  {
    question:
      "When should I start the admission process for the upcoming intake?",
    answer:
      "It is recommended to begin the admission process as early as possible so you have enough time to gather documents, complete verification requirements, explore scholarship or EMI options, and secure your seat for the preferred intake.",
  },
];

export default function AdmissionFAQ() {
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
            Frequently Asked
            <span className="text-red-500"> Questions</span>
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
