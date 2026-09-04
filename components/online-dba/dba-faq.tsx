"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "1. What is an Online DBA?",
    answer:
      "An Online DBA (Doctor of Business Administration) is an advanced doctoral-level business program designed for experienced professionals who want to strengthen their strategic, leadership, research, and business decision-making capabilities through flexible online learning.",
  },
  {
    question: "2. Who is eligible for an Online DBA?",
    answer:
      "Eligibility requirements vary by university, but most Online DBA programs require a postgraduate degree or equivalent qualification along with relevant professional or managerial experience. Students should check the specific eligibility criteria of their chosen university.",
  },
  {
    question: "3. Can working professionals pursue an Online DBA?",
    answer:
      "Yes. Online DBA programs are particularly suitable for working professionals because they offer flexible learning formats, online classes, recorded sessions, and research-based learning that can be managed alongside professional responsibilities.",
  },
  {
    question: "4. How long does an Online DBA take to complete?",
    answer:
      "The duration depends on the university and program structure. Most Online DBA programs generally take around 3 to 5 years, including coursework, research, and the doctoral thesis or dissertation.",
  },
  {
    question: "5. What career opportunities are available after an Online DBA?",
    answer:
      "An Online DBA can support career growth into senior leadership, executive management, consulting, strategy, entrepreneurship, academic roles, research, and specialized business advisory positions.",
  },
  {
    question: "6. Is an Online DBA equivalent to a PhD?",
    answer:
      "Both are doctoral-level qualifications, but their focus can differ. A PhD generally emphasizes academic and theoretical research, while a DBA is typically more practice-oriented and focuses on applying advanced research to real-world business and organizational challenges.",
  },
  {
    question: "7. Can I choose a specialization in an Online DBA?",
    answer:
      "Yes. Depending on the university, students may be able to pursue areas such as Finance, Marketing, Human Resource Management, Business Analytics, Leadership, Strategy, Entrepreneurship, or other specialized business disciplines.",
  },
  {
    question: "8. How can I choose the right Online DBA university?",
    answer:
      "Compare the university's recognition, program curriculum, eligibility requirements, duration, research structure, specialization options, faculty, learning format, fees, and career support before making your decision.",
  },
];

export default function DBAFAQ() {
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
      className="w-full bg-white px-4 pt-6 pb-12 sm:px-6 sm:pt-8 sm:pb-16 lg:px-8 lg:pt-10 lg:pb-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-5">
          <h2 className="mt-1 text-[23px] font-bold tracking-tight text-black sm:text-3xl md:text-4xl">
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