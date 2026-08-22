"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What job roles can I pursue after completing the Online DBA?",
    answer:
      "Graduates can pursue roles such as C-level Executive, Organizational Manager, Economist, Entrepreneur, Consultant, Professor, and positions within government agencies, among others.",
  },
  {
    question: "What is the average salary after completing the program?",
    answer:
      "Average salaries vary by role — ranging from around INR 4 LPA for academic roles like Professor up to INR 18 LPA for C-level Executive positions, based on the roles listed for Golden Gate University graduates.",
  },
  {
    question:
      "Which companies hire Golden Gate University Online DBA graduates?",
    answer:
      "Some of the major active hiring partners include Deloitte, EY, IBM, and Nestle, along with many other organizations across industries.",
  },
  {
    question: 'Can I use the "Dr." title after completing this program?',
    answer:
      'Yes, an Online DBA is a doctorate-level program, and graduates are entitled to use the "Dr." title along with the highest scholarly distinction associated with the degree.',
  },
  {
    question: "Is this program suitable for becoming a university professor?",
    answer:
      "Yes, completing the Online DBA opens up opportunities to work as a University Professor, in addition to industry roles like R&D Lab professional or start-up mentor.",
  },
  {
    question: "Do I need prior industry experience to get these job roles?",
    answer:
      "Most senior roles like C-level Executive or Organizational Manager typically expect relevant professional experience. The DBA strengthens your qualifications and credibility for such roles alongside your existing experience.",
  },
  {
    question: "Can this DBA help me start my own business?",
    answer:
      "Yes, many graduates use the program's research and strategic management foundation to pursue entrepreneurship, with the degree supporting roles like start-up mentor and entrepreneur.",
  },
  {
    question: "Are salary figures guaranteed after graduation?",
    answer:
      "The salary figures shared are average packages reported for these roles and are not guaranteed. Actual compensation depends on factors like experience, industry, location, and employer.",
  },
];

export default function JobRolesFAQ() {
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
            Job Roles
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
