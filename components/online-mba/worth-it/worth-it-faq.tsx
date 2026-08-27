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

export default function WorthItFAQ({ university }: FAQSectionProps) {
  const sdData = university?.details?.supportDesk || {};

  const defaultFaqs: FAQItem[] = [
    {
      question: "Is an online MBA really worth it?",
      answer:
        "Yes, an online MBA can be a valuable investment depending on your personal goals, career aspirations, and learning preferences. It offers convenience, global reach, lower costs, and the ability to study while working, along with strong long-term career growth.",
    },
    {
      question: "Does an online MBA increase earning potential?",
      answer:
        "Yes, as per GMAC (Graduate Management Admission Council), MBA graduates typically earn a 77% higher median salary compared to bachelor's degree holders, along with stronger promotion rates and long-term career mobility.",
    },
    {
      question: "Can I study for an online MBA while working full-time?",
      answer:
        "Yes, online MBA programs are designed for working professionals. You can maintain your current employment while pursuing your studies through recorded sessions and scheduled live classes that fit around your work commitments.",
    },
    {
      question: "Is an online MBA cheaper than a regular MBA?",
      answer:
        "Generally, yes. Online MBA programs usually cost less than their conventional on-campus equivalents, since students save on transportation, residence, and general living costs alongside the tuition fee itself.",
    },
    {
      question: "What skills does an online MBA help you develop?",
      answer:
        "An online MBA helps develop essential leadership abilities and managerial competencies, along with specialized skills in areas like finance, marketing, or data analytics, depending on your chosen academic focus.",
    },
    {
      question: "What is the future scope of online MBA programs?",
      answer:
        "The future of online MBA programs includes deeper integration with emerging technologies like VR and AI, personalized learning, a focus on sustainability and ethical leadership, virtual learning spaces, and global teamwork with real-world industry partnerships.",
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
      id="worth-it-faq"
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
                Worth It <span className="text-red-500">FAQs</span>
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