"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

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
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-white">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Coupons <span className="text-red-500">FAQs</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Common questions about applying discounts and coupon codes for the
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
            Have a question about discounts?{" "}
            <a href="#" className="text-red-600 font-medium hover:underline">
              Contact our admissions team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
