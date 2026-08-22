"use client";
import { Handshake, ChevronDown } from "lucide-react";
import { useState } from "react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: "general" | "specialization";
}

const FAQ_ITEMS: FaqItem[] = [
  // Specialization-Specific FAQs
  {
    id: "faq-spec-1",
    question: "What specializations are offered in the Doctorate program?",
    answer:
      "GGU offers multiple specializations including Business Administration, Information Technology, Organizational Psychology, Finance, and Management. Each specialization has dedicated faculty and tailored coursework aligned with industry needs and research trends.",
    category: "specialization",
  },
  {
    id: "faq-spec-2",
    question: "Can I switch my specialization after admission?",
    answer:
      "Specialization changes are possible within the first semester, subject to academic advisor approval and availability of seats. However, changing specialization may impact your research timeline and course completion schedule. Discuss this with the doctoral committee for guidance.",
    category: "specialization",
  },
  {
    id: "faq-spec-3",
    question: "Do I need a Master's degree in the same specialization?",
    answer:
      "While it's preferable to have a Master's in a related field, candidates from diverse backgrounds are encouraged to apply. If your Master's is in a different field, you may need to complete some foundational coursework during your first year.",
    category: "specialization",
  },
  {
    id: "faq-spec-4",
    question: "How much research is involved in each specialization?",
    answer:
      "All specializations require original research contributing to your field of study. Research intensity varies—some specializations emphasize empirical research, while others focus on theoretical or applied research. Your research advisor will guide you in defining your research scope.",
    category: "specialization",
  },
  {
    id: "faq-spec-5",
    question: "Are there industry collaborations within specializations?",
    answer:
      "Yes, many specializations have industry partnerships and collaborations with leading organizations. These connections provide research opportunities, internship placements, and networking with professionals in your field. Details are available on each specialization's dedicated page.",
    category: "specialization",
  },
  {
    id: "faq-spec-6",
    question: "What is the typical duration for each specialization?",
    answer:
      "Most specializations require 3-5 years of full-time study or 4-7 years for part-time candidates. The timeline depends on your research progress, thesis completion, and whether you're attending full-time or part-time while working.",
    category: "specialization",
  },
  {
    id: "faq-spec-7",
    question: "How are courses structured within each specialization?",
    answer:
      "Courses are organized into core courses (foundational), specialization courses (focused on your domain), and electives (flexible choices). You'll also engage in research seminars, dissertation colloquiums, and guided independent study projects tailored to your specialization.",
    category: "specialization",
  },
  {
    id: "faq-spec-8",
    question: "Will I get a specialization mentioned on my degree certificate?",
    answer:
      "Yes, your doctorate degree certificate will clearly mention your specialization, helping employers and academic institutions identify your area of expertise and research focus.",
    category: "specialization",
  },
];

export default function SpecializationFaq() {
  const [openItems, setOpenItems] = useState<string[]>(
    FAQ_ITEMS.map((item) => item.id),
  );

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const specializationFaqs = FAQ_ITEMS.filter(
    (item) => item.category === "specialization",
  );

  const renderFaqSection = (items: FaqItem[], title: string) => (
    <div className="mt-12">
      <div className="space-y-4">
        {items.map((item) => {
          const isOpen = openItems.includes(item.id);

          return (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white shadow-[0_6px_18px_rgba(15,23,42,0.08)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(15,23,42,0.12)]"
            >
              <button
                onClick={() => toggleItem(item.id)}
                aria-expanded={isOpen}
                aria-controls={`${item.id}-panel`}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50/50 transition-colors"
              >
                <h4 className="text-[18px] font-semibold leading-[1.3] tracking-[-0.3px] text-slate-950 pr-4">
                  {item.question}
                </h4>

                <div
                  className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 transition-all duration-300 ${
                    isOpen ? "rotate-180 bg-red-50" : ""
                  }`}
                >
                  <ChevronDown className="h-5 w-5 text-red-500" />
                </div>
              </button>

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
  );

  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="w-full bg-white px-4 pt-2 pb-12 sm:px-6 lg:px-8 lg:pb-0"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-8">
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-black sm:text-3xl md:text-4xl">
            Frequently Asked
            <span className="text-red-500"> Questions</span>
          </h2>
        </div>

        {/* FAQ Sections */}
        <div className="mx-auto max-w-4xl">
          {renderFaqSection(specializationFaqs, "Specializations")}
        </div>
      </div>
    </div>
  );
}
