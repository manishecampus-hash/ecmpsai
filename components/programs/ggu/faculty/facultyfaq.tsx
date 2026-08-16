"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Faq {
  question: string;
  answer: string;
}

const faqs: Faq[] = [
  {
    question: "Who teaches the Online DBA program at Golden Gate University?",
    answer:
      "The program is taught by a mix of academic leaders and industry veterans with real-world experience in finance, marketing, data science, leadership, and business research.",
  },
  {
    question:
      "Do faculty members have industry experience, or are they purely academic?",
    answer:
      "Most faculty bring a combination of academic credentials and senior industry experience, having worked in leadership roles at organizations before moving into teaching and research.",
  },
  {
    question: "Will I have direct access to faculty during the program?",
    answer:
      "Yes, students interact directly with faculty through live sessions, coursework, and — during the research and ECTS tracks — one-on-one supervision for the dissertation.",
  },
  {
    question: "Can I choose my dissertation supervisor?",
    answer:
      "Supervisor assignment typically considers your research area and specialization. You can share your preference with the program office, and they'll help match you appropriately.",
  },
  {
    question: "Are faculty available for one-on-one guidance outside of class?",
    answer:
      "Yes, faculty generally offer office hours or scheduled check-ins, especially during the research and dissertation stages of the program.",
  },
  {
    question: "Do faculty change from cohort to cohort?",
    answer:
      "Core faculty remain fairly consistent, though specific course instructors may vary by intake based on availability and specialization needs.",
  },
  {
    question: "How can I learn more about a specific faculty member?",
    answer:
      'Click "View More" on any faculty card to see their full background, or reach out to our admissions team for more details on a specific professor.',
  },
  {
    question: "Are faculty involved in placement or career guidance?",
    answer:
      "While placement support primarily comes from the placement team, many faculty — especially those with industry backgrounds — provide mentorship and career guidance where relevant.",
  },
];

export default function FacultyFAQ() {
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
            Faculty
            <span className="text-red-500"> FAQs</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Common questions about the professors and mentors teaching the
            Online DBA program at Golden Gate University.
          </p>
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
