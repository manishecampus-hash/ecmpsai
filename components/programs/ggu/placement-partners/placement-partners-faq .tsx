"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

interface Faq {
  question: string;
  answer: string;
}

const faqs: Faq[] = [
  {
    question:
      "Does Golden Gate University guarantee placement after the Online DBA?",
    answer:
      "Placement is not guaranteed, but the university's strong placement partner network significantly increases exposure to relevant job and internship opportunities across industries.",
  },
  {
    question: "Which companies hire from Golden Gate University?",
    answer:
      "Partners include well-known global companies such as Accenture, Amazon, American Express, Deloitte, EY, HCL, ICICI Bank, Infosys, ITC, JP Morgan Chase, KPMG, L&T, Mahindra & Mahindra, and Microsoft, among others.",
  },
  {
    question: "How is the average salary hike calculated?",
    answer:
      "The average salary hike reflects the typical increase students report in compensation after completing the program, based on outcomes shared by past graduates.",
  },
  {
    question: "Are placement opportunities only for full-time students?",
    answer:
      "Placement support is generally available to all enrolled students, including working professionals, though the format of support may vary based on your enrollment type.",
  },
  {
    question: "Does the university help with interview preparation?",
    answer:
      "Yes, students typically get support around interview readiness as part of placement assistance, which contributes to the reported increase in interview opportunities.",
  },
  {
    question: "Can I request placement support in a specific industry?",
    answer:
      "You can share your industry preference with the placement or admissions team, who can guide you toward relevant partner companies and opportunities where possible.",
  },
  {
    question: "Is placement support available after graduation as well?",
    answer:
      "Many programs extend some level of alumni career support after graduation. Check with our admissions team for specifics on post-graduation placement assistance.",
  },
  {
    question: "How often is the placement partner list updated?",
    answer:
      "The university continues to build and expand its placement relationships over time, so the list of active hiring partners may grow or change periodically.",
  },
];

export default function PlacementPartnersFAQ() {
  const [openFaq, setOpenFaq] = useState<number>(0);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-white">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Placement Partners <span className="text-red-500">FAQs</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Common questions about hiring partners, placement support, and
            career outcomes at Golden Gate University.
          </p>
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
            Have a question about placements?{" "}
            <a href="#" className="text-red-600 font-medium hover:underline">
              Contact our admissions team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
