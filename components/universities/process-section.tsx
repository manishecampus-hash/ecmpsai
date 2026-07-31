"use client";

import React from "react";
import { Workflow } from "lucide-react";

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
      className="bg-white px-4 -mt-6 pt-0 pb-14 sm:px-6 sm:-mt-4 lg:px-8 lg:-mt-2 lg:pb-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-800 uppercase tracking-wider shadow-sm">
            <Workflow className="h-3.5 w-3.5 text-red-500" />
            {processData.badge || "Process Flow"}
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-3xl ">
            Online Admission <span className="text-red-500">Steps</span>
          </h2>
        </div>

        {/* Step Cards Grid */}
        <div className="flex flex-wrap justify-center gap-3">
          {steps.map((step: any, index: number) => {
            return (
              <div
                key={step.title}
                className="flex flex-col items-center text-center rounded-2xl border-2 border-red-500 bg-white px-3 py-4 w-[200px] transition-all duration-300 hover:shadow-md"
              >
                <h3 className="text-base font-bold text-red-500">
                  Step {index + 1}
                </h3>
                <h4 className="mt-1 text-base font-bold text-slate-900">
                  {step.title}
                </h4>
                <p className="mt-2 text-xs font-medium leading-relaxed text-slate-500">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
