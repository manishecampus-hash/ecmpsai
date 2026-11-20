"use client";

import React, { useState } from "react";
import { Check, Download, MapPin, Plane, Sparkles, Ticket, TrendingDown } from "lucide-react";
import { BrochureButton } from "@/components/form/apply-now-modal";
import { LpHeading, LpSection } from "./lp-ui";
import type { FeePlan } from "./lp-fee-data";

/** Outlined pill used as each card's title (as in the reference design) */
function CardPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-flex items-center gap-2 rounded-full border-[1.5px] border-red-600 bg-white px-5 py-2 text-center text-[15px] font-extrabold text-red-700 shadow-[0_6px_16px_-10px_rgba(220,38,38,0.6)] sm:px-7 sm:py-2.5 sm:text-lg">
      {children}
    </span>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-[14px] font-medium leading-snug text-slate-700 sm:text-[15px]">
      <Check className="mt-0.5 h-4 w-4 shrink-0 text-red-600" strokeWidth={3.2} />
      <span>{children}</span>
    </li>
  );
}

const CARD =
  "relative flex flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_44px_-30px_rgba(15,23,42,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_24px_50px_-28px_rgba(220,38,38,0.35)]";

/** "INR 50,000/-*" → "INR 50,000" for the savings ribbon */
const cleanAmount = (v: string) => v.replace(/\/-|\*/g, "").trim();

export function LpFeeStructure({
  programLabel,
  plans,
  formCourses,
  heading,
  description,
  tone = "white",
}: {
  /** e.g. "DBA" — used for the tab list label */
  programLabel: string;
  plans: FeePlan[];
  formCourses?: string[];
  heading: string;
  description?: string;
  tone?: "white" | "muted";
}) {
  const [activeId, setActiveId] = useState(plans[0]?.id);
  const plan = plans.find((p) => p.id === activeId) ?? plans[0];
  if (!plan) return null;

  const hasImmersion = Boolean(plan.immersion);

  return (
    <LpSection tone={tone} className="overflow-hidden">
      <div className="relative">
        <LpHeading
          eyebrow={
            <>
              <Sparkles className="h-3.5 w-3.5" /> Limited Period Offer
            </>
          }
          heading={heading}
          description={description}
        />

        {/* University selector — compact tabs */}
        <div
          role="tablist"
          aria-label={`${programLabel} fee by university`}
          className="-mx-4 mb-5 flex snap-x gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:mb-6 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {plans.map((p) => {
            const active = p.id === plan.id;
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveId(p.id)}
                className={`flex shrink-0 snap-start items-center gap-2.5 rounded-xl border px-2.5 py-1.5 text-left transition-all duration-200 ${
                  active
                    ? "border-red-500 bg-red-50/60 shadow-[0_6px_16px_-10px_rgba(220,38,38,0.55)]"
                    : "border-slate-200 bg-white hover:border-red-200 hover:bg-red-50/30"
                }`}
              >
                <span className="flex h-8 w-[60px] shrink-0 items-center justify-center rounded-md bg-white">
                  {p.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.logo} alt={`${p.name} logo`} loading="lazy" className="max-h-8 w-full object-contain" />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-sm font-black text-slate-700">
                      {p.label.charAt(0)}
                    </span>
                  )}
                </span>
                <span className="leading-tight">
                  <span className={`block whitespace-nowrap text-[12.5px] font-bold ${active ? "text-red-700" : "text-slate-800"}`}>
                    {p.label}
                  </span>
                  {p.tabNote && (
                    <span
                      className={`block whitespace-nowrap text-[10px] font-semibold ${
                        p.immersion || /included/i.test(p.tabNote) ? "text-emerald-600" : "text-slate-400"
                      }`}
                    >
                      {p.tabNote}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected university */}
        <p className="mb-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center text-sm font-semibold text-slate-600">
          <span className="text-base font-extrabold text-slate-900">{plan.name}</span>
          {plan.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-red-500" /> {plan.location}
            </span>
          )}
        </p>

        {/* Fee card (+ immersion card when the university offers one) */}
        <div
          key={plan.id}
          className={`lp-fee-in mx-auto grid gap-5 md:gap-6 ${hasImmersion ? "max-w-5xl md:grid-cols-2" : "max-w-xl"}`}
        >
          {/* ── Fee card ── */}
          <article className={CARD}>
            <span className="absolute right-0 top-4 flex items-center gap-1 rounded-l-full bg-emerald-600 py-1 pl-3 pr-3 text-[10.5px] font-bold uppercase tracking-wide text-white shadow-md">
              <TrendingDown className="h-3.5 w-3.5" /> Save {cleanAmount(plan.waiver)}
            </span>

            <div className="px-5 pb-2 pt-12 text-center sm:px-8 sm:pt-10">
              <CardPill>{plan.cardTitle}</CardPill>
            </div>

            <dl className="px-5 sm:px-8">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 py-4">
                <dt className="text-[15px] text-slate-600 sm:text-base">Standard Fee:</dt>
                <dd className="text-right text-[15px] font-extrabold text-slate-900 sm:text-base">
                  {plan.standardFee}
                  {plan.standardFeeNote && (
                    <span className="block text-[11px] font-normal text-slate-500">{plan.standardFeeNote}</span>
                  )}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 py-4">
                <dt className="text-[15px] text-slate-600 sm:text-base">eCampus Waiver:</dt>
                <dd className="whitespace-nowrap text-[15px] font-extrabold text-emerald-600 sm:text-base">{plan.waiver}</dd>
              </div>
            </dl>

            <div className="mt-5 flex-1 bg-gradient-to-b from-slate-50 to-red-50/60 px-5 pb-7 pt-5 sm:px-8">
              {plan.payableFee && (
                <div className="mb-5">
                  <p className="text-[15px] text-slate-700 sm:text-base">
                    Payable Fee: <span className="font-extrabold text-red-600">{plan.payableFee}</span>
                  </p>
                  {plan.taxText && <p className="mt-0.5 text-xs text-slate-500">{plan.taxText}</p>}
                </div>
              )}

              <p className="text-[15px] text-slate-700 sm:text-base">{plan.emiTitle}</p>
              <p className="mt-1 text-[26px] font-black leading-none tracking-tight text-red-600 sm:text-[32px]">{plan.emi}</p>
            </div>
          </article>

          {/* ── Immersion card ── */}
          {plan.immersion && (
            <article className={CARD}>
              <div className="px-5 pb-6 pt-8 text-center sm:px-8 sm:pt-10">
                <CardPill>
                  <Plane className="h-4 w-4" /> {plan.immersion.title}
                </CardPill>
                <p className="mt-5 text-[30px] font-black leading-none tracking-tight text-red-600 sm:text-[36px]">
                  {plan.immersion.price}
                </p>
                <p className="mt-2 text-sm text-slate-500">{plan.immersion.taxText}</p>
              </div>
              <div className="flex-1 bg-gradient-to-b from-slate-50 to-red-50/60 px-6 py-7 sm:px-10">
                {plan.immersion.showInclusionsTitle && (
                  <p className="mb-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Inclusions</p>
                )}
                <ul className="space-y-3.5">
                  {plan.immersion.inclusions.map((item) => (
                    <CheckItem key={item}>{item}</CheckItem>
                  ))}
                </ul>
              </div>
            </article>
          )}
        </div>

        {/* Seat-block note + brochure CTA */}
        <div className="mx-auto mt-7 flex max-w-5xl flex-col items-center gap-4 sm:mt-8">
          <p className="flex flex-wrap items-center justify-center gap-x-1.5 text-center text-base font-bold text-slate-800 sm:text-lg">
            <Ticket className="h-5 w-5 text-red-600" />* Block your seat now with only
            <span className="text-red-600">{plan.seat}</span>
          </p>
          <BrochureButton
            courses={formCourses}
            programName={plan.name}
            className="lp-fee-cta group/btn relative inline-flex min-h-12 w-full max-w-md items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-6 py-3 text-sm font-bold text-white shadow-[0_12px_28px_-10px_rgba(239,68,68,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:from-red-700 hover:to-red-600 hover:shadow-[0_16px_32px_-10px_rgba(239,68,68,0.7)] active:translate-y-0 sm:min-h-[52px] sm:text-[15px]"
          >
            <Download className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/btn:translate-y-0.5" />
            Download {plan.name} Brochure
          </BrochureButton>
          <p className="max-w-3xl text-center text-[11px] leading-relaxed text-slate-400">
            Fees are as per the university and may change. Final fee is confirmed at the time of admission.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes lp-fee-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .lp-fee-in { animation: lp-fee-in .4s cubic-bezier(0.22, 1, 0.36, 1); }
        @keyframes lp-fee-shine { from { transform: translateX(-120%) skewX(-20deg); } to { transform: translateX(320%) skewX(-20deg); } }
        .lp-fee-cta::after { content: ""; position: absolute; inset: 0 auto 0 0; width: 35%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent); animation: lp-fee-shine 3.2s ease-in-out infinite; pointer-events: none; }
        @media (prefers-reduced-motion: reduce) { .lp-fee-in, .lp-fee-cta::after { animation: none; } }
      `}</style>
    </LpSection>
  );
}

export default LpFeeStructure;
