"use client";

import React from "react";
import { ArrowRight, Check, Route } from "lucide-react";
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

  const rawHeading = (processData.heading || "").trim();
  const headingText =
    !rawHeading || rawHeading.toLowerCase() === "admission process"
      ? "Step-by-Step Online *Admission Process*"
      : rawHeading;

  const subtitleText = processData.subheading || processData.subtitle || "";

  const total = steps.length;
  const stepNo = (i: number) => String(i + 1).padStart(2, "0");

  const renderAction = (step: any, index: number) => {
    const action = getStepAction(step, index, total);
    if (!action) return null;
    return (
      <div
        className={`mt-3 flex items-center gap-1.5 text-xs font-semibold lg:justify-center ${
          action.isFinal ? "text-emerald-600" : "text-[#ea384c]"
        }`}
      >
        <span>{action.text}</span>
        {action.isFinal ? (
          <Check className="h-3.5 w-3.5 stroke-[2.5]" />
        ) : (
          <ArrowRight className="h-3.5 w-3.5" />
        )}
      </div>
    );
  };

  // Round step marker — red for every step, green tick for the last one
  const renderNode = (index: number) => {
    const isFinal = index === total - 1;
    return (
      <span
        className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white p-1 ring-1 transition-transform duration-300 group-hover:scale-110 ${
          isFinal
            ? "shadow-[0_8px_20px_-6px_rgba(16,185,129,0.55)] ring-emerald-100"
            : "shadow-[0_8px_20px_-6px_rgba(234,56,76,0.5)] ring-red-100"
        }`}
      >
        <span
          className={`flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br text-sm font-extrabold text-white ${
            isFinal ? "from-emerald-500 to-teal-500" : "from-[#ea384c] to-rose-500"
          }`}
        >
          {isFinal ? <Check className="h-5 w-5 stroke-[3]" /> : stepNo(index)}
        </span>
      </span>
    );
  };

  const stepLabel = (index: number) => {
    const isFinal = index === total - 1;
    return (
      <span
        className={`relative inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ${
          isFinal
            ? "bg-emerald-50 text-emerald-600 ring-emerald-100"
            : "bg-red-50 text-[#ea384c] ring-red-100"
        }`}
      >
        {isFinal ? "Final Step" : `Step ${stepNo(index)}`}
      </span>
    );
  };

  const cardShell = (index: number) => {
    const isFinal = index === total - 1;
    return `relative overflow-hidden rounded-2xl border bg-white shadow-[0_4px_18px_-6px_rgba(15,23,42,0.08)] transition-all duration-300 ${
      isFinal
        ? "border-emerald-100 group-hover:border-emerald-200 group-hover:shadow-[0_18px_38px_-16px_rgba(16,185,129,0.35)]"
        : "border-slate-200/70 group-hover:border-red-200 group-hover:shadow-[0_18px_38px_-16px_rgba(234,56,76,0.35)]"
    }`;
  };

  const accent = (index: number) =>
    index === total - 1 ? "from-emerald-400 to-teal-400" : "from-[#ea384c] to-rose-400";

  return (
    <section
      id="admission"
      className="mx-auto w-full max-w-6xl px-3 sm:px-6 lg:px-8 pt-2 pb-10 sm:pb-16 font-sans"
    >
      <div className="w-full">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#ea384c]">
            <Route className="h-3.5 w-3.5" />
            {processData.badge || "PROCESS FLOW"}
          </span>

          <h2 className="mt-2.5 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            <HighlightedText text={headingText} defaultColor="#ea384c" />
          </h2>

          {subtitleText && (
            <p className="mt-2.5 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xl mx-auto">
              {subtitleText}
            </p>
          )}
        </div>

        {/* Desktop: horizontal step bar behind the markers */}
        <ol
          className="relative hidden gap-5 lg:grid"
          style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
        >
          {total > 1 && (
            <span
              aria-hidden
              className="pointer-events-none absolute top-[22px] h-1 rounded-full bg-gradient-to-r from-[#ea384c] via-rose-400 to-emerald-400 opacity-80"
              style={{ left: `${50 / total}%`, right: `${50 / total}%` }}
            />
          )}

          {steps.map((step: any, index: number) => {
            const isFinal = index === total - 1;
            return (
              <li
                key={step.title || index}
                className="group relative flex flex-col items-center text-center"
              >
                {renderNode(index)}

                {/* short connector from marker to card */}
                <span
                  aria-hidden
                  className={`h-5 w-0.5 bg-gradient-to-b ${
                    isFinal ? "from-emerald-300" : "from-red-300"
                  } to-transparent`}
                />

                <div
                  className={`${cardShell(index)} flex w-full flex-1 flex-col items-center px-4 pb-6 pt-5 group-hover:-translate-y-1`}
                >
                  {/* coloured top edge */}
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent(index)}`}
                  />

                  {stepLabel(index)}
                  <h3 className="relative mt-3 text-[15px] font-bold leading-snug text-slate-900">
                    {step.title}
                  </h3>
                  <p className="relative mt-2 text-xs leading-relaxed text-slate-500">
                    {step.description}
                  </p>
                  <div className="relative">{renderAction(step, index)}</div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Mobile & tablet: vertical step line */}
        <ol className="relative mx-auto max-w-2xl space-y-4 lg:hidden">
          {steps.map((step: any, index: number) => {
            const isFinal = index === total - 1;
            const isBeforeFinal = index === total - 2;
            return (
              <li key={step.title || index} className="group relative flex items-start gap-4">
                {/* connector down to the next step */}
                {!isFinal && (
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute left-[22px] top-12 -bottom-4 w-1 rounded-full bg-gradient-to-b opacity-80 ${
                      isBeforeFinal ? "from-rose-400 to-emerald-400" : "from-[#ea384c] to-rose-400"
                    }`}
                  />
                )}

                {renderNode(index)}

                {/* horizontal link from the marker to its card */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute left-12 top-[23px] z-0 h-0.5 w-4 bg-gradient-to-r ${
                    isFinal ? "from-emerald-400 to-emerald-300" : "from-[#ea384c] to-rose-300"
                  }`}
                />
                <span
                  aria-hidden
                  className={`pointer-events-none absolute left-[58px] top-[20px] z-10 h-2 w-2 rounded-full ring-2 ring-white ${
                    isFinal ? "bg-emerald-400" : "bg-[#ea384c]"
                  }`}
                />

                <div className={`${cardShell(index)} min-w-0 flex-1 py-4 pl-5 pr-4`}>
                  {/* coloured left edge */}
                  <span
                    aria-hidden
                    className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${accent(index)}`}
                  />

                  {stepLabel(index)}
                  <h3 className="relative mt-2 text-[15px] font-bold leading-snug text-slate-900">
                    {step.title}
                  </h3>
                  <p className="relative mt-1.5 text-xs leading-relaxed text-slate-500">
                    {step.description}
                  </p>
                  <div className="relative">{renderAction(step, index)}</div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
