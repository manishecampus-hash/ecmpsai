"use client";

import React from "react";
import { Workflow, CheckCircle2 } from "lucide-react";

interface ProcessSection {
  university?: any;
}

interface AdmissionStep {
  title: string;
  description: string;
}

const ADMISSION_STEPS: AdmissionStep[] = [
  {
    title: "Visit the Website",
    description:
      "Navigate to the official portal and head directly to your chosen program's admissions page.",
  },
  {
    title: "Click Apply Now",
    description:
      "Select the registration link to quickly initialize your online applicant dashboard profile.",
  },
  {
    title: "Fill Your Details",
    description:
      "Input your accurate personal identity details, academic records, and professional background.",
  },
  {
    title: "Upload Documents",
    description:
      "Provide crisp scanned copies of your prerequisite degree certificates and a recent photo.",
  },
  {
    title: "Submit & Pay",
    description:
      "Finalize registration by securely clearing your portal processing fee. Check email for tracking updates.",
  },
];

export default function AdmissionProcessSection({
  university,
}: ProcessSection) {
  const processData = university?.details?.processFlow || {};
  const steps =
    processData.steps && processData.steps.length > 0
      ? processData.steps
      : ADMISSION_STEPS;

  return (
    <section
      id="admission"
      className="px-4 pt-2 pb-12 sm:px-6 sm:pt-3 lg:px-8 lg:pt-5 lg:pb-12 font-sans"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-800 uppercase tracking-wider shadow-sm">
            <Workflow className="h-3.5 w-3.5 text-red-500" />
            {processData.badge || "Process Flow"}
          </span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            {processData.heading ? (
              <span dangerouslySetInnerHTML={{ __html: processData.heading }} />
            ) : (
              <>
                Online Admission <span className="text-red-500">Steps</span>
              </>
            )}
          </h2>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {steps.map((step: any, index: number) => {
            return (
              <div
                key={step.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-md"
              >
                {/* Visual Connector / Accent Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-transparent via-slate-200 to-transparent group-hover:via-red-400 transition-all duration-300" />

                <div>
                  {/* Step Metric Top Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-flex h-8 px-2.5 items-center justify-center rounded-lg bg-red-50 text-xs font-black tracking-wider text-red-600 border border-red-100/50">
                      STEP 0{index + 1}
                    </span>
                    <CheckCircle2 className="h-4 w-4 text-slate-300 group-hover:text-red-500 transition-colors duration-300" />
                  </div>

                  {/* Text Details */}
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-xs font-medium leading-relaxed text-slate-500">
                    {step.description}
                  </p>
                </div>

                {/* Micro decorative indicator at card base */}
                <div className="mt-6 flex items-center justify-end">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 group-hover:text-red-300 transition-colors">
                    Phase 0{index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
