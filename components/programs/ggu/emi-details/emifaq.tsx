"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How is EMI calculated for an education loan?",
    answer:
      "EMI is calculated using the loan amount, interest rate, and tenure through the standard reducing-balance formula. As you repay, a larger portion of each EMI goes toward the principal and a smaller portion toward interest over time.",
  },
  {
    question: "Does the EMI change if I prepay part of the loan?",
    answer:
      "Yes. Prepaying a portion of the principal reduces the outstanding balance, which either lowers your future EMI or shortens the remaining tenure, depending on what the lender allows and what you choose.",
  },
  {
    question: "Is there a moratorium period before EMI payments start?",
    answer:
      "Many education loans offer a moratorium period, usually covering the course duration plus a few months after completion, during which repayment may be deferred or only simple interest is charged. Terms vary by lender.",
  },
  {
    question: "What factors affect my EMI amount?",
    answer:
      "Your EMI depends primarily on the loan amount, interest rate, and repayment tenure. A longer tenure lowers the EMI but increases total interest paid, while a shorter tenure raises the EMI but reduces overall interest cost.",
  },
  {
    question: "Can I change my loan tenure after the loan is sanctioned?",
    answer:
      "Some lenders allow tenure changes through refinancing or a formal request, which can affect your EMI amount. Check with your lender about their specific policy on tenure modification.",
  },
  {
    question: "Is the EMI calculator's result the exact amount I'll pay?",
    answer:
      "The calculator gives an indicative estimate based on the amount, rate, and tenure you enter. The actual EMI may differ slightly due to processing fees, insurance, rate resets, or rounding applied by the lender.",
  },
  {
    question: "What happens if I miss an EMI payment?",
    answer:
      "Missing an EMI can lead to late payment charges, additional interest, and an impact on your credit score. If you expect difficulty paying, it's best to contact your lender in advance to discuss available options.",
  },
  {
    question: "Should I choose a fixed or floating interest rate for EMI?",
    answer:
      "A fixed rate keeps your EMI constant throughout the tenure, offering predictability. A floating rate can rise or fall with market conditions, which may lower costs over time but adds some uncertainty to your EMI.",
  },
];

export default function EmiFAQ() {
  // All FAQs are open by default
  const [openIndexes, setOpenIndexes] = useState<number[]>(
    faqs.map((_, index) => index),
  );

  const toggleFAQ = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <section
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="w-full bg-white px-4 py-8 sm:px-6 lg:px-8 lg:py-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* ================= SECTION HEADER ================= */}

        <div className="mx-auto mb-8 max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-red-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#ff3b4d]">
            Frequently Asked Questions
          </span>

          <h2 className="mt-1 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            EMI <span className="text-red-500">FAQs</span>
          </h2>
        </div>

        {/* ================= FAQ ACCORDION ================= */}

        <div className="mx-auto max-w-4xl space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndexes.includes(index);

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                  isOpen
                    ? "border-red-100 shadow-[0_8px_28px_rgba(255,59,77,0.08)]"
                    : "border-slate-200 shadow-[0_5px_18px_rgba(15,23,42,0.06)] hover:border-red-100 hover:shadow-[0_8px_24px_rgba(15,23,42,0.09)]"
                }`}
              >
                {/* ================= QUESTION ================= */}

                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-5 p-5 text-left sm:p-6"
                >
                  <h3 className="pr-2 text-[16px] font-semibold leading-[1.4] tracking-[-0.2px] text-[#0f1f3d] sm:text-[17px]">
                    {faq.question}
                  </h3>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen ? "rotate-180 bg-red-50" : "bg-slate-50"
                    }`}
                  >
                    <ChevronDown
                      className={`h-5 w-5 transition-colors duration-300 ${
                        isOpen ? "text-[#ff3b4d]" : "text-slate-500"
                      }`}
                    />
                  </span>
                </button>

                {/* ================= ANSWER ================= */}

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-red-50 px-5 pb-6 pt-4 sm:px-6">
                      <p className="text-[14px] leading-7 text-slate-600 sm:text-[15px]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= BOTTOM NOTE ================= */}

        <div className="mx-auto mt-8 max-w-4xl rounded-xl border border-red-100 bg-red-50/50 px-5 py-4 text-center">
          <p className="text-[13px] leading-6 text-slate-600">
            Still have questions about your EMI or loan repayment? Reach out to
            your lender for details specific to your loan terms.
          </p>
        </div>
      </div>
    </section>
  );
}
