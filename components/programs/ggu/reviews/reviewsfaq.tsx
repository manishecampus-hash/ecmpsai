"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "Are the reviews on this page from verified students?",
    answer:
      "Yes, reviews are collected from current students and alumni of the Online DBA program at Golden Gate University, reflecting their genuine experience with the program.",
  },
  {
    question: "How is the overall rating calculated?",
    answer:
      "The overall rating is an average of individual star ratings submitted by reviewers, along with a breakdown showing what percentage of reviewers gave each star rating.",
  },
  {
    question: "Can I leave a review after completing the program?",
    answer:
      "Yes, students and alumni are welcome to share their experience. Reach out to our admissions team to learn how you can submit a review after graduation.",
  },
  {
    question: "What do students typically mention in their reviews?",
    answer:
      "Common themes include flexibility for working professionals, the practical nature of case studies and assessments, faculty and supervisor support, and career outcomes after graduation.",
  },
  {
    question: "Are negative reviews shown as well?",
    answer:
      "Yes, the rating breakdown reflects the full range of feedback received, including lower ratings, to give prospective students a balanced and honest picture.",
  },
  {
    question: "Can I contact a reviewer to ask about their experience?",
    answer:
      "Direct contact with reviewers isn't available, but our admissions team can connect you with alumni ambassadors or answer specific questions about the student experience.",
  },
  {
    question: "Do reviews affect the program's accreditation or ranking?",
    answer:
      "Reviews reflect student experience and satisfaction, but the program's accreditation is independently maintained through the Western Association of Schools and Colleges (WASC).",
  },
  {
    question: "How often are new reviews added?",
    answer:
      "Reviews are updated periodically as new students complete the program and share their feedback. Check back regularly to see the latest experiences from graduates.",
  },
];

export default function GGUReviewsFAQ() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-white">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Reviews <span className="text-red-500">FAQs</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Common questions about student reviews and ratings for the Online
            DBA program at Golden Gate University.
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
            Have a question about student reviews?{" "}
            <a href="#" className="text-red-600 font-medium hover:underline">
              Contact our admissions team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
