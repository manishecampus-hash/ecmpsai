"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is IGNOU better than an online university?",
    answer:
      "IGNOU is a well-established open and distance learning university, while online universities offer a more digitally focused learning experience. The better option depends on your preferred learning format, program, flexibility, budget, career goals, and the recognition of the specific program.",
  },
  {
    question: "Is an online degree valid in India?",
    answer:
      "Yes, degrees offered through recognized universities in online mode can be valid in India when the university and specific program meet the applicable UGC and regulatory requirements. Students should verify the current recognition status before enrolling.",
  },
  {
    question: "What is the difference between IGNOU and online universities?",
    answer:
      "IGNOU primarily follows an open and distance learning model, while online universities generally deliver education through digital platforms with online classes, recorded lectures, assessments, study material, and virtual student support. The exact experience varies by university and program.",
  },
  {
    question:
      "Which is better for working professionals: IGNOU or an online university?",
    answer:
      "Both options can work well for working professionals. Online universities may provide a more structured digital learning experience with online classes, recorded lectures, and virtual support, while IGNOU can offer flexibility through its open and distance learning model.",
  },
  {
    question: "Is an IGNOU degree accepted for jobs and higher studies?",
    answer:
      "IGNOU degrees can be used for employment and further education, subject to the eligibility requirements of the employer, institution, or applicable regulatory body. Students should check the requirements related to their specific career or higher-study goal.",
  },
  {
    question: "Are online university degrees accepted for government jobs?",
    answer:
      "Eligibility depends on the specific recruitment notification and the recognition status of the university and program. Candidates should always check the latest official recruitment requirements before applying.",
  },
  {
    question: "Which option is more flexible: IGNOU or an online university?",
    answer:
      "Both options offer flexibility, but in different ways. IGNOU generally follows an open and distance learning structure, while online universities commonly provide digital classes, recorded content, online assessments, and structured academic schedules.",
  },
  {
    question: "How should I choose between IGNOU and an online university?",
    answer:
      "Compare the factors that matter most to your goals, including university recognition, curriculum, learning format, academic support, examination pattern, flexibility, fees, student services, and career relevance. A side-by-side comparison can help you make a more informed decision.",
  },
];

export default function IgnouOnlineFAQ() {
  // All FAQs are open by default
  const [openIndexes, setOpenIndexes] = useState<number[]>(
    faqs.map((_, index) => index),
  );

  const toggleFAQ = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <section
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="w-full bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* ================= SECTION HEADER ================= */}

        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-red-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#ff3b4d]">
            Frequently Asked Questions
          </span>

          <h2 className="mt-4 text-[28px] font-extrabold tracking-[-0.8px] text-[#0f1f3d] sm:text-4xl md:text-[42px]">
            IGNOU vs Online Universities
            <span className="text-[#ff3b4d]"> FAQs</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-slate-500 sm:text-[16px]">
            Get answers to the most common questions before choosing between
            IGNOU and an online university.
          </p>
        </div>

        {/* ================= FAQ ACCORDION ================= */}

        <div className="mx-auto max-w-4xl space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndexes.includes(index);

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                  isOpen
                    ? "border-red-100 shadow-[0_8px_28px_rgba(255,59,77,0.08)]"
                    : "border-slate-200 shadow-[0_5px_18px_rgba(15,23,42,0.06)] hover:border-red-100 hover:shadow-[0_8px_24px_rgba(15,23,42,0.09)]"
                }`}
              >
                {/* ================= QUESTION ================= */}

                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-5 p-5 text-left sm:p-6"
                >
                  <h3 className="pr-2 text-[16px] font-semibold leading-[1.4] tracking-[-0.2px] text-[#0f1f3d] sm:text-[17px]">
                    {faq.question}
                  </h3>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen ? "rotate-180 bg-red-50" : "bg-slate-50"
                    }`}
                  >
                    <ChevronDown
                      className={`h-5 w-5 transition-colors duration-300 ${
                        isOpen ? "text-[#ff3b4d]" : "text-slate-500"
                      }`}
                    />
                  </span>
                </button>

                {/* ================= ANSWER ================= */}

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-red-50 px-5 pb-6 pt-4 sm:px-6">
                      <p className="text-[14px] leading-7 text-slate-600 sm:text-[15px]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= BOTTOM NOTE ================= */}

        <div className="mx-auto mt-8 max-w-4xl rounded-xl border border-red-100 bg-red-50/50 px-5 py-4 text-center">
          <p className="text-[13px] leading-6 text-slate-600">
            Still confused about which option is right for you? Compare
            universities based on your career goals, learning preferences,
            flexibility, and program requirements before making a decision.
          </p>
        </div>
      </div>
    </section>
  );
}
