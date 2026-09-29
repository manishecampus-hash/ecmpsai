"use client";

import React from "react";
import { ArrowRight, Check } from "lucide-react";
import HighlightedText from "./HighlightedText";

interface ProcessSection {
  university?: any;
}

interface StepAction {
  text: string;
  isFinal: boolean;
}

function getStepAction(step: any, index: number, total: number): StepAction | null {
  if (step.actionText || step.action || step.tag || step.linkText) {
    const text = (step.actionText || step.action || step.tag || step.linkText).toString().trim();
    if (!text) return null;
    const isFinal = index === total - 1 || text.includes("✓");
    return { text: text.replace(/[→✓]/g, "").trim(), isFinal };
  }
  return null;
}

export default function AdmissionProcessSection({
  university,
}: ProcessSection) {
  const processData = university?.details?.processFlow || {};
  const steps = processData.steps || [];

  if (!steps || steps.length === 0) {
    return null;
  }

  const gridColsClass =
    steps.length <= 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : steps.length === 5
        ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6";

  const rawHeading = (processData.heading || "").trim();
  const headingText =
    !rawHeading || rawHeading.toLowerCase() === "admission process"
      ? "Step-by-Step Online *Admission Process*"
      : rawHeading;

  const subtitleText = processData.subheading || processData.subtitle || "";

  return (
    <section
      id="admission"
      className="mx-auto w-full max-w-6xl px-3 sm:px-6 lg:px-8 pt-2 pb-10 sm:pb-16 font-sans"
    >
      <div className="w-full">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-bold text-[#ea384c] uppercase tracking-wider block mb-2">
            {processData.badge || "PROCESS FLOW"}
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            <HighlightedText text={headingText} defaultColor="#ea384c" />
          </h2>

          {subtitleText && (
            <p className="mt-2.5 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xl mx-auto">
              {subtitleText}
            </p>
          )}
        </div>

        {/* Step Cards Grid */}
        <div className={`grid ${gridColsClass} gap-4 sm:gap-5`}>
          {steps.map((step: any, index: number) => {
            const isFinal = index === steps.length - 1;
            const action = getStepAction(step, index, steps.length);

            return (
              <div
                key={step.title || index}
                className="rounded-2xl sm:rounded-[22px] bg-white border border-slate-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)] p-5 sm:p-5.5 flex flex-col justify-between transition-all duration-200 text-left group"
              >
                <div>
                  {/* Step Number Badge */}
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-sm sm:text-base ${
                      isFinal
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-red-50 text-[#ea384c]"
                    }`}
                  >
                    {index + 1}
                  </div>

                  {/* Step Label */}
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-3.5 mb-1.5">
                    STEP {index + 1}
                  </span>

                  {/* Title */}
                  <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Action Link (only if explicitly configured) */}
                {action && (
                  <div
                    className={`mt-4 pt-2 flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold ${
                      action.isFinal
                        ? "text-emerald-600"
                        : "text-[#ea384c] group-hover:translate-x-0.5 transition-transform"
                    }`}
                  >
                    <span>{action.text}</span>
                    {action.isFinal ? (
                      <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                    ) : (
                      <ArrowRight className="h-3.5 w-3.5 stroke-[2]" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
