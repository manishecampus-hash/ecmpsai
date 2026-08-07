"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "What types of assessments are used in the Online DBA program?",
    answer:
      "Golden Gate University uses a mix of written tests, case studies, talks and presentations, and hands-on assessments to evaluate students beyond just memorization of theory.",
  },
  {
    question: "Are all courses assessed the same way?",
    answer:
      "No. Assessment weightage and format can vary by course and track — some courses may lean more on written tests, while others emphasize case studies or presentations.",
  },
  {
    question: "How are case studies evaluated?",
    answer:
      "Case studies assess how well you can analyze a real-world business scenario and apply academic concepts and frameworks to reach practical, well-reasoned decisions.",
  },
  {
    question: "Do I need to give live presentations or talks?",
    answer:
      "Yes, talks and presentations are part of the assessment pattern. They evaluate your communication skills and how deeply you understand your coursework and research.",
  },
  {
    question: "What are hands-on assessments?",
    answer:
      "Hands-on assessments are applied, practice-based evaluations that test your confidence and ability to use academic ideas directly in real-life business situations.",
  },
  {
    question: "Are exams held online or in-person?",
    answer:
      "As an Online DBA, assessments are designed to be completed remotely wherever possible. Our admissions team can share specifics for any course that may require additional formats.",
  },
  {
    question: "How is the dissertation stage assessed differently?",
    answer:
      "The dissertation stage under the ECTS Track is assessed through milestones like the written proposal defence and the final written dissertation and oral defence, rather than regular tests.",
  },
  {
    question: "What happens if I don't pass an assessment?",
    answer:
      "Policies on reattempts or remediation vary by course. Reach out to our admissions or academic support team for guidance specific to your situation.",
  },
];

export default function ExamPatternFAQ() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-white">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Exam Pattern <span className="text-red-500">FAQs</span>
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

        {/* Contact strip */}
        <div className="mt-10 rounded-xl border border-red-200 bg-red-50 p-5 sm:p-6 text-center">
          <p className="text-sm text-slate-700">
            Have a question about assessments?{" "}
            <a href="#" className="text-red-600 font-medium hover:underline">
              Contact our admissions team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
