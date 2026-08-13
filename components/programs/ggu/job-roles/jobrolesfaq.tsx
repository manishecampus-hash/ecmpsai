"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

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
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-white">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Job Roles <span className="text-red-500">FAQs</span>
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
            Have a question about career outcomes?{" "}
            <a href="#" className="text-red-600 font-medium hover:underline">
              Contact our admissions team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
