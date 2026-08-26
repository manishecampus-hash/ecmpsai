"use client";

import React from "react";
import { HelpCircle, ChevronUp, MessageSquare, CircleHelp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  university?: any;
}

export default function ProgramFeesFAQ({ university }: FAQSectionProps) {
  const sdData = university?.details?.supportDesk || {};

  const defaultFaqs: FAQItem[] = [
    {
      question: "What is the fee range for an Online MBA?",
      answer:
        "The online MBA full program fees are around INR 30,000 to INR 5 lakhs, nationally and internationally, and totally depend on the university, course specialization, facilities, and accreditations.",
    },
    {
      question: "What is included in the Online MBA program fee?",
      answer:
        "The program fee typically includes admission fees, examination fees, and registration fees, along with the core tuition fee, which can be paid semester-wise, yearly, or annually.",
    },
    {
      question: "Can I pay the Online MBA fees in installments?",
      answer:
        "Yes, most universities allow flexible payment cycles, including a one-time payment option, semester-wise payments, annual payments, and low-cost EMI options through banking partners.",
    },
    {
      question: "Which university offers the cheapest Online MBA?",
      answer:
        "Among popular options, SRM University and Sikkim Manipal University offer Online MBA programmes starting around INR 1.10 lakhs, making them some of the more affordable choices compared to premium universities that charge INR 4 lakhs and above.",
    },
    {
      question: "Are there any additional charges besides the course fee?",
      answer:
        "Yes, some universities charge additional one-time registration fees and per-semester exam fees separately from the core tuition. It's best to check the detailed fee structure of each university before enrolling.",
    },
    {
      question: "Is EMI available for Online MBA program fees?",
      answer:
        "Yes, low-cost EMI options are available, letting you pay the program fee in manageable monthly installments starting from around ₹6,776/month, depending on the university and total course fee.",
    },
  ];

  const rawFaqs =
    sdData.faqs && sdData.faqs.length > 0
      ? sdData.faqs
      : university?.faqs &&
          Array.isArray(university.faqs) &&
          university.faqs.length > 0
        ? university.faqs
        : defaultFaqs;

  if (!rawFaqs || rawFaqs.length === 0) {
    return null;
  }

  return (
    <section
      id="program-fees-faq"
      className="font-sans mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 text-left"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-4 lg:sticky lg:top-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <CircleHelp className="h-3.5 w-3.5 text-red-500" />
            {sdData.badge || "Support Desk"}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl text-left lg:text-3xl">
            {sdData.heading || (
              <>
                Program Fees <span className="text-red-500">FAQs</span>
              </>
            )}
          </h2>

          <div className="mt-8 hidden rounded-2xl bg-slate-50 p-5 border border-slate-100 lg:block">
            <div className="flex items-center gap-3 text-slate-700">
              <MessageSquare className="h-5 w-5 text-red-500" />
              <span className="text-sm font-bold">
                {sdData.doubtsTitle || "Still have doubts?"}
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-500 leading-relaxed">
              {sdData.doubtsDesc ||
                "Connect with our professional academic program advisors directly for personalized roadmap assistance."}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4 lg:col-span-8">
          {rawFaqs.map((faq: FAQItem, index: number) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-red-200 bg-red-50/10 shadow-sm"
            >
              <div className="flex w-full items-start justify-between p-5 text-left">
                <div className="flex gap-3.5 pr-4">
                  <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                  <span className="text-base font-bold text-gray-900 sm:text-lg">
                    {faq.question}
                  </span>
                </div>
                <div className="mt-1 shrink-0 rounded-lg bg-slate-50 p-1 text-slate-500 border border-slate-100">
                  <ChevronUp className="h-4 w-4" />
                </div>
              </div>

              <div className="border-t border-slate-100/80 p-5 pt-0 text-sm text-gray-600 leading-relaxed sm:text-base">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}