"use client";

import React from "react";
import { Calculator, ArrowUpRight, Wallet } from "lucide-react";

export default function EducationLoans() {
  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
          Education Loan/EMI for{" "}
          <span className="text-red-500">Online MBA</span>
        </h2>
      </div>

      {/* Body text */}
      <div className="max-w-4xl">
        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
          Educated college and university students and banking-bank-connected
          individuals are increasingly switching towards the &ldquo;EMI&rdquo;
          (Equated Monthly Installment) option to finance their higher
          education. The escalating cost of professional classes,
          particularly management programs like an MBA, has made
          EMI-powered payment models an appealing and affordable solution
          for several learners. By allowing students to pay the total
          expense in smaller monthly amounts, students make greater
          payments of the total cost, enabling them to pay more money for
          higher education.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
          Online EMI services have attracted particular interest for MBA
          course participation because they mitigate the pressing cost loss
          from the student and working citizens. Today, the majority of
          universities and educational systems partner with banks and
          financial organizations to provide mobile installment plans, which
          have low interest rates, no-cost EMI features, or extended payback
          periods. This system enables students to start their studies
          without being able to postpone their application because of
          financial constraints. Consequently, skilled people who might not
          have much savings can still pursue quality education in
          management and enhance their job prospects.
        </p>
      </div>

      {/* EMI calculator callout */}
      <a
        href="https://collegevidya.com/tool/education-loan-emi-calculator/"
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-6 flex max-w-4xl items-start gap-3 rounded-xl border border-red-100 bg-red-50/60 px-5 py-4 transition-colors hover:bg-red-50"
      >
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
          <Calculator className="h-4 w-4" strokeWidth={2} />
        </span>
        <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
          Also, you can calculate your EMI for the online MBA course through
          the{" "}
          <span className="font-semibold text-red-500 underline decoration-red-200 underline-offset-2 group-hover:decoration-red-400">
            Education Loan EMI Calculator
          </span>
          <ArrowUpRight className="ml-1 inline h-4 w-4 text-red-500" />
        </p>
      </a>

      {/* Highlight strip */}
      <div className="mt-6 flex max-w-4xl items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
          <Wallet className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
          <span className="font-semibold text-slate-900">Good to know:</span>{" "}
          Most universities partner with banking and financial institutions
          to offer low interest rates, no-cost EMI options, and extended
          payback periods — so you don&apos;t have to postpone your
          admission due to financial constraints.
        </p>
      </div>
    </section>
  );
}