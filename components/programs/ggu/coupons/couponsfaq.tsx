"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I apply a coupon code to my application?",
    answer:
      "You can enter your coupon code during the financial enrollment step of the admission process, or share it with our admissions team so it's applied before you complete payment.",
  },
  {
    question: "Can I combine multiple coupon codes or discounts?",
    answer:
      "No, only one coupon code can be applied per application, and discounts generally cannot be combined with other ongoing scholarships or offers unless explicitly stated.",
  },
  {
    question: "Do coupon codes expire?",
    answer:
      "Yes, each coupon has its own validity — some are tied to an application window, others to alumni or referral status. Check the validity details on each coupon before applying.",
  },
  {
    question:
      "Am I eligible for the alumni discount if I studied at a different GGU campus?",
    answer:
      "The alumni discount applies to verified Golden Gate University alumni. Reach out to our admissions team with your alumni details to confirm eligibility across campuses or programs.",
  },
  {
    question: "How does the referral discount work?",
    answer:
      "A current GGU Online DBA student can refer you during your application. Once verified, you receive a flat discount on your enrollment fee — this can typically be used once per applicant.",
  },
  {
    question: "Is the zero-fee EMI available on all payment plans?",
    answer:
      "The zero-processing-fee offer is valid on select EMI plans, generally in the 6 to 24 month range, through specific partner banks. Longer-tenure plans may carry standard processing fees.",
  },
  {
    question:
      "Can I get a coupon code if I don't fall into any listed category?",
    answer:
      "Reach out to our admissions team — they can advise on any general offers or upcoming promotions that may apply to your situation even outside the listed categories.",
  },
  {
    question: "What proof do I need for the military or corporate discount?",
    answer:
      "Military and veteran applicants need valid service verification, while corporate partner discounts require a valid employer ID. These are checked during the document review step.",
  },
];

export default function GGUCouponsFAQ() {
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
            Coupons
            <span className="text-red-500"> FAQs</span>
          </h2>
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
