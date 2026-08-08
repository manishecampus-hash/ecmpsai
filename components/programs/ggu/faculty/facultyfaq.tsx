"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

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
  const [openFaq, setOpenFaq] = useState<number>(0);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-white">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Faculty <span className="text-red-500">FAQs</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Common questions about the professors and mentors teaching the
            Online DBA program at Golden Gate University.
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
            Have a question about our faculty?{" "}
            <a href="#" className="text-red-600 font-medium hover:underline">
              Contact our admissions team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
