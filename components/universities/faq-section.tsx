"use client";

import React from "react";
import { HelpCircle, ChevronUp, MessageSquare, CircleHelp } from "lucide-react";
import HighlightedText from "./HighlightedText";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  university?: any;
}

export default function FAQSection({ university }: FAQSectionProps) {
  const universityName = university?.name || "IIM K";
  const sdData = university?.details?.supportDesk || {};

  // Premium baseline data fallback if university.faqs is not populated
  const defaultFaqs: FAQItem[] = [
    {
      question: `What type of certification will I receive upon completing a program at ${universityName}?`,
      answer: `Upon successful completion of the academic criteria, you will receive an official Executive Certificate from ${universityName}. You will also receive prestigious Executive Alumni Status, granting you lifelong networking opportunities and access to restricted institutional portals.`,
    },
    {
      question:
        "Are these programs completely online, or are there on-campus immersions?",
      answer:
        "Most strategic modules are delivered live via interactive virtual classrooms. Depending on the specific cohort outline, an optional or mandatory 2-to-3 day on-campus networking residency is hosted at the university campus to meet professors and peers.",
    },
    {
      question: "What is the assessment criteria and grading scheme?",
      answer:
        "Evaluations are continuous and structured around real-world projects, case study assignments, periodic quizzes, and a final capstone submission. A minimum of 75% attendance is standard across modules to qualify for certification.",
    },
    {
      question: "Are there flexible corporate fee EMI options available?",
      answer:
        "Yes, standard corporate payment plans, split installment milestones, and low-cost or no-cost EMI options are offered through allied banking partners to distribute the tuition comfortably across your learning timeframe.",
    },
  ];

  // Defensive execution to guarantee a valid array structure loops over cleanly
  const rawFaqs =
    sdData.faqs && sdData.faqs.length > 0
      ? sdData.faqs
      : university?.faqs &&
          Array.isArray(university.faqs) &&
          university.faqs.length > 0
        ? university.faqs
        : [];

  if (!rawFaqs || rawFaqs.length === 0) {
    return null;
  }

  return (
    /* ============================================================
        FAQ SECTION
        Maintains structural padding and clean slate aesthetics
       ============================================================ */
    <section
      id="faq"
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 text-left"
    >
      {/* FAQ Grid Wrapper layout split */}
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        {/* LEFT COLUMN: Structural Visual Prompt Header (Span 4) */}
        <div className="lg:col-span-4 lg:sticky lg:top-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <CircleHelp className="h-3.5 w-3.5 text-red-500" />
            {sdData.badge || "Support Desk"}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl text-left lg:text-3xl">
            {sdData.heading ? (
              <HighlightedText text={sdData.heading} />
            ) : (
              <>
                Frequently Asked <span className="text-red-500">Questions</span>
              </>
            )}
          </h2>

          {/* Helpful Support Context Info Card */}
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

        {/* RIGHT COLUMN: Always-Expanded FAQ Matrix (Span 8) */}
        <div className="space-y-4 lg:col-span-8">
          {rawFaqs.map((faq: FAQItem, index: number) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-red-200 bg-red-50/10 shadow-sm"
            >
              {/* Header */}
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

              {/* Always visible content body */}
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