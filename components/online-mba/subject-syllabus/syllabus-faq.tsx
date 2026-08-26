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

export default function FAQSection({ university }: FAQSectionProps) {
  const sdData = university?.details?.supportDesk || {};

  // Premium baseline data fallback if university.faqs is not populated
  const defaultFaqs: FAQItem[] = [
    {
      question: "What subjects does an online MBA syllabus cover?",
      answer:
        "The subject syllabus of an Online MBA typically covers core areas like Marketing Management, Financial Management, Human Resource Management, Operations, Business Analytics, and Strategic Management.",
    },
    {
      question: "What is the duration of an online MBA programme?",
      answer:
        "An Online MBA generally has a minimum duration of 2 years, divided into 4 semesters. Many universities also allow additional time, often up to 4 years, to complete the programme.",
    },
    {
      question: "Who is eligible to apply for an online MBA?",
      answer:
        "Candidates need a Bachelor's degree from a recognized university, institution, or college. Most universities also require at least 50% aggregate marks at the undergraduate level, though work experience is usually not mandatory.",
    },
    {
      question: "Is an online MBA degree valid and recognized?",
      answer:
        "Yes, an Online MBA is valid when offered by a properly recognized university that meets applicable regulatory requirements. Always check for approvals such as UGC-DEB, UGC, NAAC, and AICTE in India, or WES, AACSB, and AMBA for universities abroad.",
    },
    {
      question: "What specializations can I choose in an online MBA?",
      answer:
        "Most online MBA programmes offer specializations such as Digital Marketing, Finance, Human Resources, Analytics & Data Science, FinTech, General Management, Project Management, Supply Chain Management, and Retail Management, among others.",
    },
    {
      question: "How do I apply for an online MBA programme?",
      answer:
        "You can apply by visiting the official university website, registering and logging in to the admission portal, filling out the application form, uploading the required documents, and completing the payment to receive your admission confirmation.",
    },
    {
      question: "Are EMI or education loan options available for an online MBA?",
      answer:
        "Yes, most universities offer flexible corporate fee EMI options, split installment milestones, and education loan tie-ups with banking partners to help you manage the tuition fee comfortably across your learning timeframe.",
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
        : defaultFaqs;

  if (!rawFaqs || rawFaqs.length === 0) {
    return null;
  }

  return (
    /* ============================================================
        FAQ SECTION
        Maintains structural padding and clean slate aesthetics
       ============================================================ */
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-black">
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
              sdData.heading
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