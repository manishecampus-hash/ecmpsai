"use client";

import React from "react";
import {
  Globe,
  LogIn,
  ClipboardCheck,
  UserPlus,
  Wallet,
  Calculator,
  ArrowUpRight,
} from "lucide-react";

const defaultSteps = [
  {
    number: "01",
    title: "Open the university webpage",
    description:
      "Open the university/college/institute webpage where you wish to take admission.",
    icon: Globe,
  },
  {
    number: "02",
    title: "Log in with your account",
    description: "Log in with the account, or create one if you don't have it yet.",
    icon: LogIn,
  },
  {
    number: "03",
    title: "Choose the Online MBA program",
    description:
      "Choose the \"Online MBA\" program and add the credentials that are required.",
    icon: ClipboardCheck,
  },
  {
    number: "04",
    title: "Register and proceed to payment",
    description: "Register yourself there and move to the payment section.",
    icon: UserPlus,
  },
  {
    number: "05",
    title: "Pay fees & get confirmation",
    description:
      "Pay the reliable charges and obtain the confirmation on your phone or email.",
    icon: Wallet,
  },
];

interface MbaAdmissionProcedureProps {
  data?: any;
  title?: string;
}

export default function MbaAdmissionProcedure({ data, title }: MbaAdmissionProcedureProps) {
  const heading = data?.heading || title || "Online MBA Admission Procedure";
  const list = data?.list && Array.isArray(data.list) && data.list.length > 0
    ? data.list
    : defaultSteps;

  const ICONS = [Globe, LogIn, ClipboardCheck, UserPlus, Wallet];

  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
          {heading.includes("Online MBA") ? (
            <>
              <span className="text-red-500">Online MBA</span>
              {heading.split("Online MBA")[1] || " Admission Procedure"}
            </>
          ) : (
            heading
          )}
        </h2>
      </div>

      {/* ROI calculator callout */}
      <a
        href="https://collegevidya.com/tool/online-university-roi-calculator/"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-start gap-3 rounded-xl border border-red-100 bg-red-50/60 px-5 py-4 transition-colors hover:bg-red-50"
      >
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
          <Calculator className="h-4 w-4" strokeWidth={2} />
        </span>
        <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
          Choose the university for admission by checking their return on investment through the{" "}
          <span className="font-semibold text-red-500 underline decoration-red-200 underline-offset-2 group-hover:decoration-red-400">
            Online University ROI Calculator
          </span>
          <ArrowUpRight className="ml-1 inline h-4 w-4 text-red-500" />
        </p>
      </a>

      {/* Intro text */}
      <p className="mt-6 max-w-4xl text-sm leading-relaxed text-slate-600 sm:text-base">
        There is an admission procedure, which a student must read about in detail before taking admission:
      </p>

      {/* Steps panel */}
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] overflow-hidden max-w-4xl">
        {list.map((step: any, i: number) => {
          const Icon = step.icon || ICONS[i % ICONS.length];
          const stepNumber = step.number || `0${i + 1}`;

          return (
            <div
              key={i}
              className={`group flex flex-col sm:flex-row gap-4 sm:gap-6 px-5 py-6 sm:px-8 transition-colors hover:bg-red-50/40 ${
                i !== list.length - 1 ? "border-b border-slate-100" : ""
              }`}
            >
              <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-start sm:gap-2">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500 text-white shadow-lg shadow-red-500/30 transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-red-500">
                  Step {stepNumber}
                </span>
              </div>

              <div className="flex-1 sm:border-l sm:border-slate-100 sm:pl-6">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}