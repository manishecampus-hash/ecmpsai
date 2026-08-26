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

export default function TopSpecializationsFAQ({
  university,
}: FAQSectionProps) {
  const sdData = university?.details?.supportDesk || {};

  const defaultFaqs: FAQItem[] = [
    {
      question: "What are the top specializations in an Online MBA?",
      answer:
        "Popular Online MBA specializations include Finance Management, Marketing Management, HR Management, Operations Management, Business Analytics, IT Management, Digital Marketing, and Data Science, among others.",
    },
    {
      question: "Can I choose more than one specialization in an Online MBA?",
      answer:
        "Yes, several universities offer dual specialization options, such as Logistics And Supply Chain (Dual) or Hospital Administration & Healthcare (Dual), allowing you to combine two areas of expertise in a single programme.",
    },
    {
      question: "Which Online MBA specialization has the best career scope?",
      answer:
        "Specializations like Business Analytics, Digital Marketing, Data Science, and Finance Management are currently in high demand and generally offer strong career growth and placement opportunities across industries.",
    },
    {
      question: "Is Data Science a good specialization for an Online MBA?",
      answer:
        "Yes, Data Science is one of the most sought-after Online MBA specializations, combining business fundamentals with analytical and technical skills that are valuable across sectors like tech, finance, and retail.",
    },
    {
      question: "Can I switch my specialization after starting an Online MBA?",
      answer:
        "Switching specializations mid-programme depends on the university's policies. Some universities may allow a change within the first semester, while others require you to complete the programme in your chosen specialization.",
    },
    {
      question: "How do I choose the right Online MBA specialization for me?",
      answer:
        "It's best to choose a specialization aligned with your current work experience, career goals, and industry interest—whether that's core management areas like Finance and Marketing, or emerging fields like Fintech and Business Analytics.",
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
      id="top-specializations-faq"
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
                Top Specializations{" "}
                <span className="text-red-500">FAQs</span>
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