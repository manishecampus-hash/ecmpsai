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
      "What does the total fee for the Rushford Online DBA/Doctorate include?",
    answer:
      "The total fees mentioned represent the complete cost of the program, covering tuition and academic delivery across the Business Management, Specialization, Research, and ECTS tracks.",
  },
  {
    question: "Can I pay the fees yearly instead of all at once?",
    answer:
      "Yes, the total program fee can be paid on a yearly basis, allowing you to spread your payments across the duration of the program instead of a single upfront payment.",
  },
  {
    question: "Is a semester-wise payment option available?",
    answer:
      "Yes, semester-wise payment is available as an alternative to yearly payments, giving you more flexibility to manage your fee payments in smaller, more frequent instalments.",
  },
  {
    question: "Are EMI facilities available for the program fees?",
    answer:
      "Yes, EMI facilities are easily accessible for this program, allowing you to convert your fee payment into manageable monthly instalments through partner banks or financing options.",
  },
  {
    question: "Do EMI plans come with any processing fees?",
    answer:
      "EMI plans may carry standard processing fees depending on the tenure and partner bank selected. Our admissions team can walk you through the specific terms for each plan.",
  },
  {
    question: "Does the total fee vary based on the specialization I choose?",
    answer:
      "The core fee structure remains consistent across specializations, since the program follows a fixed track structure. Reach out to admissions for confirmation specific to your chosen specialization.",
  },
  {
    question: "Are there any additional charges beyond the listed fee?",
    answer:
      "The listed fee represents the total cost of the program. Any additional charges, if applicable, would be communicated clearly by the admissions team before enrollment.",
  },
  {
    question: "Who can I contact for help choosing a payment plan?",
    answer:
      "Our admissions team can guide you through the yearly, semester-wise, and EMI options available and help you choose the plan that best fits your financial situation.",
  },
];

export default function FeesStructureFAQ() {
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
            Fees Structure
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
