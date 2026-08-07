"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    question:
      "How many courses do I need to complete in the Specialization Track?",
    answer:
      "You need to choose 6 courses from the Specialization Track, selecting from areas like Finance, Leadership, Business Analytics, Marketing, General Management, International Management, Data Science, and Supply Chain Management.",
  },
  {
    question: "Can I mix courses from different specialization areas?",
    answer:
      "Yes. The 6 courses you choose from the Specialization Track don't have to come from a single area — you can combine courses across Finance, Analytics, Marketing, and other tracks based on your interests and career goals.",
  },
  {
    question: "Is the Research Track mandatory for all students?",
    answer:
      "Yes, the Research Track is a core part of the Online DBA and covers Research Design, Business Statistics, qualitative and quantitative methodology, academic research foundations, and literature review.",
  },
  {
    question: "What does the ECTS Track involve?",
    answer:
      "The ECTS Track covers your dissertation journey — reflection and supervisor meeting minutes, report writing, your written dissertation and oral defence, doctoral residency, and the written proposal defence.",
  },
  {
    question: "How long does it take to complete the full curriculum?",
    answer:
      "Program duration depends on your pace through the Business Management, Specialization, and Research tracks, followed by the dissertation stage under the ECTS Track. Our admissions team can walk you through a typical timeline.",
  },
  {
    question: "Are the Business Management Track courses fixed for everyone?",
    answer:
      "Yes, the Business Management Track — covering Managerial Skills, Managerial Economics, Cutting Edge Leadership, Financial Reporting, Strategic Management, and International Business Environment — is a required foundation for all students.",
  },
  {
    question:
      "Do I get support during the dissertation and oral defence stage?",
    answer:
      "Yes, you'll work closely with a supervisor throughout the ECTS Track, with structured checkpoints like proposal defence and oral defence to guide you toward successful completion.",
  },
  {
    question: "How is this DBA different from other Online DBA programs?",
    answer:
      "While the overall structure of Business Management, Specialization, Research, and ECTS tracks is common across many DBA programs, Golden Gate University's curriculum, faculty, and course content are tailored to its own academic standards and specialization offerings.",
  },
];

export default function SyllabusFAQ() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-white">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Syllabus & Curriculum <span className="text-red-500">FAQs</span>
          </h1>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className={`rounded-2xl bg-slate-50 border transition-colors duration-200 ${
                  isOpen ? "border-red-200" : "border-slate-100"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {faq.question}
                  </span>
                  <span
                    className={`flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "bg-red-500 border-red-500 rotate-45"
                        : "bg-white border-slate-200"
                    }`}
                  >
                    <Plus
                      className={`h-4 w-4 transition-colors duration-300 ${
                        isOpen ? "text-white" : "text-slate-900"
                      }`}
                    />
                  </span>
                </button>
                <div
                  className={`grid overflow-hidden transition-all duration-200 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-5 text-sm text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
