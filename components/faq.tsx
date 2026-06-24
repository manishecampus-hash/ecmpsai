"use client";

import { Handshake, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { Section } from "./ui/section";

const faqs = [
  {
    question: "1. What is eCampusApp?",
    answer:
      "eCampusApp is a trusted online education platform that helps students and working professionals discover, compare, and apply to online degree, distance education, executive education, and certification programs from leading universities in India and abroad",
  },
  {
    question: "2. How do I choose the right course on eCampusApp?",
    answer:
      "You can explore programs based on your career goals, budget, educational background, specialization, and preferred learning format. Our academic counselors can also help you select the most suitable program.",
  },
  {
    question: "3. Are the universities listed on eCampusApp recognized?",
    answer:
      "Yes. eCampusApp partners with recognized universities and institutions. Students can verify approvals such as UGC, AICTE, DEB, NAAC accreditation, and international accreditations based on the specific university and program.",
  },
  {
    question: "4. Can working professionals pursue these programs?",
    answer:
      "Absolutely. Most programs featured on eCampusApp are designed for working professionals and offer flexible schedules, live online classes, recorded lectures, weekend sessions, and self-paced learning options.",
  },
  {
    question: "5. Does eCampusApp provide admission assistance?",
    answer:
      "Yes. Our team assists students throughout the admission process, including program selection, eligibility verification, application submission, document support, and enrollment guidance.",
  },
  {
    question: "6. What types of programs are available on eCampusApp?",
    answer:
      "eCampusApp offers a wide range of programs, including Online MBA, DBA, BBA, BCA, MCA, M.Com, Executive Education, Professional Certifications, Data Science, Artificial Intelligence, Digital Marketing, and other career-focused courses.",
  },
  {
    question: "7. Can I compare multiple universities before applying?",
    answer:
      "Yes. eCampusApp allows students to compare universities, fees, curriculum, specializations, accreditations, learning formats, and career opportunities to make informed decisions",
  },
  {
    question:
      "8. Why should I choose eCampusApp for higher education guidance?",
    answer:
      "eCampusApp simplifies the education journey by providing expert counseling, university comparisons, admission support, access to top institutions, and personalized guidance to help learners achieve their academic and professional goals.",
  },
];

export default function FAQ() {
  const [openIndexes, setOpenIndexes] = useState<number[]>(
    faqs.map((_, index) => index),
  );

  const toggleFAQ = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <Section className="w-full bg-white pt-12 pb-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-7xl text-center mb-10 font-[Inter]">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <Handshake className="h-3.5 w-3.5 text-red-500" />
            FAQ
          </span>
          <h2 className="mt-2 text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl md:text-4xl">
            Frequently Asked <span className="text-red-500">Questions</span>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="mx-auto max-w-7xl space-y-4">
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
    </Section>
  );
}
