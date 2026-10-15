"use client";

import React, { useState } from "react";
import HighlightedText from "@/components/universities/HighlightedText";
import { motion } from "framer-motion";
import { ArrowRight, BadgePercent, CalendarClock, Calculator, CreditCard, GraduationCap, Lightbulb, Percent, Wallet } from "lucide-react";

// Benefits named in the page's own "good to know" note
const BENEFITS = [
  { icon: Percent, title: "Low interest rates", text: "Bank-partnered plans keep borrowing affordable." },
  { icon: BadgePercent, title: "No-cost EMI", text: "Split fees into monthly instalments at no extra cost." },
  { icon: CalendarClock, title: "Extended payback", text: "Longer repayment periods ease the monthly burden." },
];

const HOW_IT_WORKS = [
  { icon: GraduationCap, title: "Choose your program", text: "Pick the university and course." },
  { icon: CreditCard, title: "Select an EMI plan", text: "Choose tenure and instalment." },
  { icon: Wallet, title: "Pay monthly", text: "Study while you pay in parts." },
];

interface EducationLoansProps {
  data?: any;
  title?: string;
}

export default function EducationLoans({ data, title }: EducationLoansProps) {
  const [expanded, setExpanded] = useState(false);
  const heading = data?.heading || title || "Education Loan/EMI for Online MBA";
  const bodyParagraph1 =
    data?.bodyParagraph1 ||
    "Educated college and university students and banking-bank-connected individuals are increasingly switching towards the 'EMI' (Equated Monthly Installment) option to finance their higher education. The escalating cost of professional classes, particularly management programs like an MBA, has made EMI-powered payment models an appealing and affordable solution for several learners.";
  const bodyParagraph2 =
    data?.bodyParagraph2 ||
    "Online EMI services have attracted particular interest for MBA course participation because they mitigate the pressing cost loss from the student and working citizens. Today, the majority of universities and educational systems partner with banks and financial organizations to provide mobile installment plans, which have low interest rates, no-cost EMI features, or extended payback periods.";

  const highlightNote =
    data?.highlightNote ||
    "Most universities partner with banking and financial institutions to offer low interest rates, no-cost EMI options, and extended payback periods — so you don't have to postpone your admission due to financial constraints.";

  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
      <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#ee2c3c]">
        <Wallet className="h-3.5 w-3.5" /> Flexible payment options
      </p>
      <h2 className="text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
        {heading.includes("*") ? (
          <HighlightedText text={heading} className="text-[#ee2c3c]" />
        ) : heading.includes("Online MBA") ? (
          <>
            {heading.split("Online MBA")[0]}
            <span className="text-[#ee2c3c]">Online MBA</span>
            {heading.split("Online MBA")[1]}
          </>
        ) : (
          heading
        )}
      </h2>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-5">
          {/* Body */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 pl-6 sm:p-7 sm:pl-8">
            <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-[#ee2c3c]" />
            <div className={expanded ? "" : "line-clamp-5"}>
              <p className="text-[15px] font-medium leading-relaxed text-slate-800 sm:text-base">{bodyParagraph1}</p>
              {expanded && <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-[15px]">{bodyParagraph2}</p>}
            </div>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="mt-3 text-sm font-bold text-[#ee2c3c] hover:underline"
            >
              {expanded ? "Read less" : "Read more"}
            </button>
          </div>

          {/* Benefits */}
          <div className="grid gap-3 sm:grid-cols-3">
            {BENEFITS.map(({ icon: Icon, title: t, text }) => (
              <div
                key={t}
                className="group flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:block transition-all duration-300 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-[0_14px_30px_-20px_rgba(238,44,60,0.5)]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#ee2c3c] ring-1 ring-red-100 transition-colors group-hover:bg-[#ee2c3c] group-hover:text-white">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <div className="min-w-0">
                  <p className="text-[15px] font-bold text-slate-900 sm:mt-3">{t}</p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-slate-500 sm:mt-1">{text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* How EMI works */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">How EMI works</p>
            <ol className="relative mt-4 grid gap-5 sm:grid-cols-3 sm:gap-4">
              <span aria-hidden className="absolute left-[16%] right-[16%] top-5 hidden border-t-2 border-dashed border-red-200 sm:block" />
              {HOW_IT_WORKS.map(({ icon: Icon, title: t, text }, i) => (
                <li key={t} className="relative flex items-start gap-3 sm:flex-col sm:items-center sm:text-center">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#ee2c3c] ring-2 ring-red-200">
                    <Icon className="h-[18px] w-[18px]" />
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ee2c3c] text-[9px] font-bold text-white">{i + 1}</span>
                  </span>
                  <div className="sm:mt-1">
                    <p className="text-sm font-bold text-slate-900">{t}</p>
                    <p className="mt-0.5 text-[13px] text-slate-500">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Side panel */}
        <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
          <div className="overflow-hidden rounded-2xl border border-red-100 bg-gradient-to-b from-red-50 to-white p-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ee2c3c] text-white shadow-[0_10px_20px_-8px_rgba(238,44,60,0.6)]">
              <Calculator className="h-6 w-6" strokeWidth={2} />
            </span>
            <p className="mt-4 text-lg font-bold text-slate-900">Education Loan EMI Calculator</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">Also, you can calculate your EMI for the course before you apply.</p>

            {/* Fee splitting into monthly instalments */}
            <div className="mt-4 rounded-xl border border-red-100 bg-white p-3">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                <span>Total fee</span>
                <span>12 monthly instalments</span>
              </div>
              <div className="mt-2 flex h-7 items-end gap-1">
                {Array.from({ length: 12 }, (_, i) => (
                  <motion.span
                    key={i}
                    initial={{ scaleY: 0.2, opacity: 0.4 }}
                    whileInView={{ scaleY: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                    className="h-full flex-1 origin-bottom rounded-sm bg-gradient-to-t from-[#ee2c3c] to-rose-300"
                  />
                ))}
              </div>
            </div>
            <a
              href="/tools"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#ee2c3c] text-sm font-bold text-white shadow-[0_10px_20px_-10px_rgba(238,44,60,0.8)] transition hover:bg-[#d92233]"
            >
              Calculate your EMI
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Lightbulb className="h-4 w-4 text-[#ee2c3c]" /> Good to know
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{highlightNote}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
