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

export default function CareerScopeFAQ({ university }: FAQSectionProps) {
  const sdData = university?.details?.supportDesk || {};

  const defaultFaqs: FAQItem[] = [
    {
      question: "What job roles can I get after an Online MBA?",
      answer:
        "After an Online MBA, you can pursue roles like Portfolio Manager, Consultant, Business Development Manager, Finance Manager, Marketing Manager, Project Manager, Management Consultant, Investment Banker, and Business Operations Manager, among others.",
    },
    {
      question: "What is the salary range after completing an Online MBA?",
      answer:
        "Salaries vary by role and experience, ranging from around 2.2 LPA to over 52 LPA. For instance, an Investment Banker can earn between 2.4 LPA to 52.3 LPA, while a Finance Manager typically earns 3.5 LPA to 37 LPA.",
    },
    {
      question: "Which companies hire Online MBA graduates?",
      answer:
        "Top MNCs like ICICI Lombard, Mphasis, Airtel, IndiaMART, NIIT, Coforge, Amazon, Accenture, EY, and Genpact are among the companies known to hire Online MBA graduates with competitive salary packages.",
    },
    {
      question: "Is an Online MBA degree valued the same as a regular MBA by employers?",
      answer:
        "Employers generally value an Online MBA from a recognized and accredited university similarly to a regular MBA, focusing more on the university's reputation, your skills, and relevant work experience rather than the mode of study alone.",
    },
    {
      question: "Where does the salary data for Online MBA job roles come from?",
      answer:
        "The salary figures are estimated and sourced from platforms like Naukri and Glassdoor. Actual packages may vary based on your experience, specialization, negotiation, and the hiring company.",
    },
    {
      question: "Which Online MBA specialization offers the highest salary potential?",
      answer:
        "Roles like Investment Banker and Management Consultant tend to show the widest salary range and highest upper limits, making Finance and Consulting-focused specializations attractive for higher earning potential.",
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
      id="career-scope-faq"
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
                Career Scope <span className="text-red-500">FAQs</span>
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