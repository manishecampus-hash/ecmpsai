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

export default function EligibilityDurationFAQ({
  university,
}: FAQSectionProps) {
  const sdData = university?.details?.supportDesk || {};

  const defaultFaqs: FAQItem[] = [
    {
      question: "What is the eligibility criteria for an Online MBA?",
      answer:
        "You need 3 years of graduation from a recognized university, college, or institution, with a bachelor's degree from any discipline. General category candidates typically need more than 50% marks, while SC/ST/OBC/PWD category candidates need more than 45% marks.",
    },
    {
      question: "Is work experience mandatory for an Online MBA?",
      answer:
        "No, work experience is not mandatory for most Online MBA programmes, though having it can be useful in understanding concepts or accessing better opportunities. Some universities may require it, so it's best to check individual admission criteria.",
    },
    {
      question: "Do I need CAT, MAT, GMAT, or CUET PG scores for an Online MBA?",
      answer:
        "An Online MBA generally doesn't require CAT/MAT/NMAT/GMAT/SNAP/CUET PG scores. However, some international universities may still require standardized test scores, so it's advisable to check with your chosen university.",
    },
    {
      question: "What is the duration of an Online MBA course?",
      answer:
        "The duration of an Online MBA is typically 2 years, though this can vary by university, program plan, and study mode. Some universities offer accelerated 1-year programs, while others allow a flexible schedule of up to 4 years to complete the course.",
    },
    {
      question: "Can I complete an Online MBA faster than 2 years?",
      answer:
        "Yes, a few universities offer accelerated 1-year management programs, typically PG certificates or international university MBAs that aren't bound by UGC-DEB norms. Availability depends on the specific university and programme structure.",
    },
    {
      question: "How is the Online MBA curriculum structured?",
      answer:
        "The curriculum is structured as a series of semesters or modules covering core areas like management, leadership, finance, marketing, and business strategy, designed to fit around the schedules of working professionals.",
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
      id="eligibility-duration-faq"
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
                Eligibility &amp; Duration{" "}
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