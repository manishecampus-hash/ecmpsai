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

export default function CouponsFAQ({ university }: FAQSectionProps) {
  const sdData = university?.details?.supportDesk || {};

  const defaultFaqs: FAQItem[] = [
    {
      question: "How do I apply a coupon code for an Online MBA course?",
      answer:
        "Simply click the \"Apply Code\" button next to the coupon you want to use. This copies the code to your clipboard, which you can then paste at checkout on the university's admission portal to avail the discount.",
    },
    {
      question: "Are these Online MBA coupon codes valid for all universities?",
      answer:
        "No, each coupon code is specific to a particular university, such as Alliance University, DY Patil, UPES, or LPU Online. Make sure you use the code that matches the university you're enrolling in.",
    },
    {
      question: "Is there a limit on how many times a coupon can be used?",
      answer:
        "Coupon availability and usage limits can vary and may be revised at any time. The \"people used today\" count reflects current usage, but it's best to apply the code as soon as possible to avoid missing out.",
    },
    {
      question: "Can I combine multiple coupon codes on one course?",
      answer:
        "Generally, only one coupon code can be applied per course enrollment. Combining multiple discounts is usually not supported by universities' admission portals.",
    },
    {
      question: "Do these coupons expire?",
      answer:
        "Yes, coupon codes and discount amounts are subject to change or expiry based on the university's ongoing offers. Always check the applied discount at checkout to confirm it's still active before completing your payment.",
    },
    {
      question: "Will the coupon discount be applied automatically at checkout?",
      answer:
        "Not always. In most cases, you'll need to manually enter or paste the coupon code in the designated field during the payment or checkout process for the discount to reflect on your total fee.",
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
      id="coupons-faq"
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
                Coupons <span className="text-red-500">FAQs</span>
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