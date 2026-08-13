"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

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
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-white">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Frequently Asked <span className="text-red-500">Questions</span>
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
