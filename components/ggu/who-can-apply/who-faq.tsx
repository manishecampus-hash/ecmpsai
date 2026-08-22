"use client";
import { Handshake, ChevronDown } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "Who is eligible to apply for the GGU Doctorate program?",
    answer:
      "Candidates who hold a Master's degree (or equivalent PG qualification) from a UGC-recognized university, with a minimum of 55% aggregate marks (50% for reserved categories, as per university norms), are eligible to apply.",
  },
  {
    id: "faq-2",
    question: "Is work experience mandatory for admission?",
    answer:
      "Work experience is not mandatory for all specializations, but candidates with relevant professional experience may receive preference during evaluation for certain research-focused tracks. Please check the specific specialization page for details.",
  },
  {
    id: "faq-3",
    question: "Is there an age limit to apply?",
    answer:
      "There is no upper age limit to apply for this doctorate program. It is open to working professionals, entrepreneurs, and academics at any career stage.",
  },
  {
    id: "faq-4",
    question: "Can working professionals apply for this program?",
    answer:
      "Yes. The program is designed for working professionals, with flexible online delivery, weekend sessions, and recorded lectures so candidates can continue their careers while pursuing the doctorate.",
  },
  {
    id: "faq-5",
    question: "Do I need to appear for an entrance exam?",
    answer:
      "Most candidates are admitted based on their academic profile and a personal interview/interaction with the doctoral committee. An entrance test may be required only in specific cases as determined by the university.",
  },
  {
    id: "faq-6",
    question: "What documents are required for the application?",
    answer:
      "You will typically need your Master's degree certificate and mark sheets, a valid photo ID, a passport-size photograph, and a brief statement of purpose or research interest. The admissions team will guide you through the exact list.",
  },
];

export default function WhoFaq() {
  // All FAQs remain open at all times

  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="w-full bg-white px-4 pt-12 pb-12 sm:px-6 lg:px-8 lg:pb-0"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-8">
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-black sm:text-3xl md:text-4xl">
            Frequently Asked
            <span className="text-red-500"> Questions</span>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="mx-auto max-w-4xl space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = true;

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white shadow-[0_6px_18px_rgba(15,23,42,0.08)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(15,23,42,0.12)]"
              >
                <div
                  aria-expanded={isOpen}
                  aria-controls={`${item.id}-panel`}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <h3 className="text-[18px] font-semibold leading-[1.3] tracking-[-0.3px] text-slate-950 pr-4">
                    {item.question}
                  </h3>

                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 transition-all duration-300 ${
                      isOpen ? "rotate-180 bg-red-50" : ""
                    }`}
                  >
                    <ChevronDown className="h-5 w-5 text-red-500" />
                  </div>
                </div>

                <div
                  id={`${item.id}-panel`}
                  role="region"
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[14px] leading-6 text-slate-600">
                      {item.answer}
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
