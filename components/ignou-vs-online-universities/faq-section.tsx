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
      className="w-full bg-white px-4 py-8 sm:px-6 lg:px-8 lg:py-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* ================= SECTION HEADER ================= */}

        <div className="mx-auto mb-8 max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#ff3b4d] sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.15em]">
            Frequently Asked Questions
          </span>

          <h2 className="mt-3 text-[22px] font-bold leading-tight tracking-tight text-gray-900 sm:mt-1 sm:text-3xl md:text-4xl">
            IGNOU vs Online Universities{" "}
            <span className="text-red-500">FAQs</span>
          </h2>
        </div>

        {/* ================= FAQ ACCORDION ================= */}

        <div className="mx-auto max-w-4xl space-y-3 sm:space-y-4">
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
                  className="flex w-full items-center justify-between gap-3 p-4 text-left sm:gap-5 sm:p-6"
                >
                  <h3 className="pr-1 text-[14.5px] font-semibold leading-[1.4] tracking-[-0.1px] text-[#0f1f3d] sm:pr-2 sm:text-[17px] sm:tracking-[-0.2px]">
                    {faq.question}
                  </h3>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 sm:h-9 sm:w-9 ${
                      isOpen ? "rotate-180 bg-red-50" : "bg-slate-50"
                    }`}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-colors duration-300 sm:h-5 sm:w-5 ${
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
                    <div className="border-t border-red-50 px-4 pb-5 pt-3 sm:px-6 sm:pb-6 sm:pt-4">
                      <p className="text-[13.5px] leading-6 text-slate-600 sm:text-[15px] sm:leading-7">
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

        <div className="mx-auto mt-8 max-w-4xl rounded-xl border border-red-100 bg-red-50/50 px-4 py-4 text-center sm:px-5">
          <p className="text-[12.5px] leading-6 text-slate-600 sm:text-[13px]">
            Still confused about which option is right for you? Compare
            universities based on your career goals, learning preferences,
            flexibility, and program requirements before making a decision.
          </p>
        </div>
      </div>
    </section>
  );
}
