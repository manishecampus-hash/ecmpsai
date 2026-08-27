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
        {/* Heading - Original Alignment */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
         

          <h2 className="text-[26px] leading-tight font-bold tracking-tight text-gray-900 sm:text-4xl md:text-[42px]">
            How do I enroll for an
            <span className="text-red-500"> Online MBA course?</span>
          </h2>

          <p className="mt-5 text-sm leading-relaxed text-slate-500 sm:text-base">
            Follow these 5 quick and simple steps to begin your Online MBA
            journey.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="relative hidden lg:block">
          {/* Connecting Line */}
          <div className="absolute left-[10%] right-[10%] top-[38px] h-[2px] bg-slate-200" />

          <div className="relative grid grid-cols-5 gap-5">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative flex flex-col items-center"
                >
                  {/* Step Number */}
                  <div className="relative z-10 flex h-[76px] w-[76px] items-center justify-center rounded-full border border-red-200 bg-white p-1 shadow-sm">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-red-500 text-[27px] font-bold text-white">
                      {step.number}
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  {index !== steps.length - 1 && (
                    <span className="absolute right-[-12px] top-[32px] z-10 h-3 w-3 rounded-full border-2 border-white bg-red-500" />
                  )}

                  {/* Step Card */}
                  <div className="mt-5 flex min-h-[330px] w-full flex-col items-center rounded-2xl border border-slate-200 bg-white px-4 py-6 text-center shadow-[0_8px_25px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-md">
                    {/* Icon */}
                    <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-red-50 text-red-500">
                      <Icon className="h-9 w-9" strokeWidth={1.7} />
                    </div>

                    {/* Title */}
                    <h3 className="mt-5 text-[16px] font-bold leading-snug text-slate-900 xl:text-[17px]">
                      {step.title}
                    </h3>

                    {/* Red Line */}
                    <div className="mt-4 h-[2px] w-9 rounded-full bg-red-500" />

                    {/* Description */}
                    <p className="mt-4 text-[13px] leading-[1.65] text-slate-600 xl:text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet */}
        <div className="relative lg:hidden">
          <div className="absolute bottom-8 left-[29px] top-8 w-[2px] bg-slate-200 sm:left-[35px]" />

          <div className="relative space-y-5">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative flex gap-4 sm:gap-5"
                >
                  {/* Number */}
                  <div className="relative z-10 flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full border border-red-200 bg-white p-1 shadow-sm sm:h-[72px] sm:w-[72px]">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-red-500 text-xl font-bold text-white sm:text-2xl">
                      {step.number}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>

                      <div>
                        <h3 className="text-base font-bold leading-snug text-slate-900 sm:text-lg">
                          {step.title}
                        </h3>

                        <div className="mt-3 h-[2px] w-8 rounded-full bg-red-500" />

                        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Note - Original Alignment */}
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