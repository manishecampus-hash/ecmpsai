"use client";

import React from "react";
import {
  Building2,
  UserPlus,
  FileText,
  Upload,
  BadgeCheck,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Visit an Online University",
    description:
      "Visit the official website of your preferred university offering an Online MBA programme.",
    icon: Building2,
  },
  {
    number: "02",
    title: "Register & Log In",
    description:
      "Create your account by registering yourself and log in to the university admission portal.",
    icon: UserPlus,
  },
  {
    number: "03",
    title: "Fill the Application Form",
    description:
      "Complete the application form and select your preferred Online MBA course or specialisation.",
    icon: FileText,
  },
  {
    number: "04",
    title: "Upload Required Details",
    description:
      "Add all the required personal and academic details and upload the necessary documents.",
    icon: Upload,
  },
  {
    number: "05",
    title: "Pay & Get Confirmation",
    description:
      "Complete the payment process and receive your admission confirmation via email and phone.",
    icon: BadgeCheck,
  },
];

export default function MBAEnrol() {
  return (
    <section className="font-sans relative w-full overflow-hidden bg-white py-14 text-black">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          

          <h2 className="text-[26px] leading-tight font-bold tracking-tight text-gray-900 sm:text-4xl md:text-[42px]">
            How do I enroll for an
            <span className="text-red-500"> Online MBA course?</span>
          </h2>

          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-red-400 to-red-500" />

          <p className="mt-5 text-sm leading-relaxed text-slate-500 sm:text-base">
            Follow these 5 quick and simple steps to begin your Online MBA
            journey.
          </p>
        </div>

        {/* Steps panel */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] overflow-hidden max-w-4xl mx-auto">
          {steps.map((step, i) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className={`group flex flex-col sm:flex-row gap-4 sm:gap-6 px-5 py-6 sm:px-8 transition-colors hover:bg-red-50/40 ${
                  i !== steps.length - 1 ? "border-b border-slate-100" : ""
                }`}
              >
                {/* Icon + step number */}
                <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-start sm:gap-2">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500 text-white shadow-lg shadow-red-500/30 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-red-500">
                    Step {step.number}
                  </span>
                </div>

                {/* Content */}
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

        {/* Bottom note */}
        <div className="mx-auto mt-6 flex max-w-4xl items-start gap-3 rounded-2xl border border-red-100 bg-red-50/70 px-5 py-4 sm:mt-8">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
            <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            Once your application is submitted successfully, the university
            will share further admission updates with you.
          </p>
        </div>
      </div>
    </section>
  );
}