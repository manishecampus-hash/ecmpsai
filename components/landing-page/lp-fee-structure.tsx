"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, Download, MapPin, Plane, Sparkles, Ticket, TrendingDown } from "lucide-react";
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

/** University logo (or initial) — used in the dropdown trigger and its options */
function UniLogo({ plan, size = "md" }: { plan: FeePlan; size?: "sm" | "md" }) {
  const box = size === "md" ? "h-9 w-[64px]" : "h-8 w-[56px]";
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-lg bg-white ${box}`}>
      {plan.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={plan.logo} alt="" loading="lazy" className="max-h-full w-full object-contain" />
      ) : (
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-sm font-black text-slate-700 ring-1 ring-slate-200">
          {plan.label.charAt(0)}
        </span>
      )}
    </span>
  );
}

function UniNote({ plan }: { plan: FeePlan }) {
  if (!plan.tabNote) return null;
  return (
    <span className={`block truncate text-[11px] font-semibold ${plan.immersion ? "text-emerald-600" : "text-slate-500"}`}>
      {plan.tabNote}
    </span>
  );
}

/**
 * Custom dropdown (the native <select> list can't be styled or show logos).
 * Listbox pattern: arrow keys / Home / End move, Enter or Space selects, Esc or an outside click closes.
 */
function UniversitySelect({
  plans,
  value,
  onChange,
  label,
}: {
  plans: FeePlan[];
  value: string;
  onChange: (id: string) => void;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const baseId = useId();
  const selectedIndex = Math.max(0, plans.findIndex((p) => p.id === value));
  const selected = plans[selectedIndex];

  // Close on outside click / tap
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Keep the highlighted option in view
  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLElement>(`[data-index="${highlight}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, highlight]);

  const openList = () => {
    setHighlight(selectedIndex);
    setOpen(true);
  };
  const choose = (index: number) => {
    onChange(plans[index].id);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(plans.length - 1, h + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(0, h - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setHighlight(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setHighlight(plans.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(highlight);
    } else if (e.key === "Escape" || e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className="relative z-30 mx-auto mb-5 w-full max-w-md sm:mb-6">
      <p id={`${baseId}-label`} className="mb-1.5 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
        Select University
      </p>

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${baseId}-list`}
        aria-labelledby={`${baseId}-label ${baseId}-value`}
        aria-activedescendant={open ? `${baseId}-opt-${highlight}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`flex h-14 w-full items-center gap-3 rounded-2xl border-[1.5px] bg-white pl-3 pr-4 text-left shadow-[0_10px_24px_-14px_rgba(220,38,38,0.55)] outline-none transition-all duration-200 focus-visible:ring-4 focus-visible:ring-red-100 ${
          open ? "border-red-600 ring-4 ring-red-100" : "border-red-500 hover:border-red-600"
        }`}
      >
        <UniLogo plan={selected} />
        <span id={`${baseId}-value`} className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-[15px] font-bold text-slate-900">{selected.label}</span>
          <UniNote plan={selected} />
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
            open ? "rotate-180 bg-red-600 text-white" : "bg-red-50 text-red-600"
          }`}
        >
          <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
        </span>
      </button>

      {open && (
        <ul
          ref={listRef}
          id={`${baseId}-list`}
          role="listbox"
          aria-label={label}
          tabIndex={-1}
          className="lp-uni-menu absolute inset-x-0 top-full mt-2 max-h-[min(380px,60vh)] overflow-y-auto overscroll-contain rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_24px_50px_-20px_rgba(15,23,42,0.45)] [scrollbar-width:thin]"
        >
          {plans.map((p, i) => {
            const isSelected = i === selectedIndex;
            const isHighlighted = i === highlight;
            return (
              <li
                key={p.id}
                id={`${baseId}-opt-${i}`}
                data-index={i}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setHighlight(i)}
                onClick={() => choose(i)}
                className={`flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 transition-colors duration-150 ${
                  isSelected ? "bg-red-50" : isHighlighted ? "bg-slate-50" : ""
                }`}
              >
                <UniLogo plan={p} size="sm" />
                <span className="min-w-0 flex-1 leading-tight">
                  <span className={`block truncate text-[14.5px] font-bold ${isSelected ? "text-red-700" : "text-slate-800"}`}>
                    {p.label}
                  </span>
                  <UniNote plan={p} />
                </span>
                {isSelected && (
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

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
          // Mobile: one line, font scales with the screen width; sm+ unchanged
          descriptionClassName="whitespace-nowrap text-[clamp(10px,3.05vw,15px)] tracking-[-0.01em] sm:whitespace-normal sm:tracking-normal"
        />

        {/* University selector — custom dropdown with logos */}
        <UniversitySelect
          plans={plans}
          value={plan.id}
          onChange={setActiveId}
          label={`${programLabel} fee by university`}
        />

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
              {plan.cardSubtitle && (
                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-500">{plan.cardSubtitle}</p>
              )}
            </div>

            <dl className="px-5 sm:px-8">
              <div className="flex flex-col items-center gap-0.5 border-b border-slate-200 py-3.5 text-center sm:flex-row sm:justify-between sm:gap-3 sm:py-4 sm:text-left">
                <dt className="text-[15px] text-slate-600 sm:text-base">Standard Fee:</dt>
                <dd className="text-center text-[15px] font-extrabold text-slate-900 sm:text-right sm:text-base">
                  {plan.standardFee}
                  {plan.standardFeeNote && (
                    <span className="block text-[11px] font-normal text-slate-500">{plan.standardFeeNote}</span>
                  )}
                </dd>
              </div>
              <div className="flex flex-col items-center gap-0.5 border-b border-slate-200 py-3.5 text-center sm:flex-row sm:justify-between sm:gap-3 sm:py-4 sm:text-left">
                <dt className="text-[15px] text-slate-600 sm:text-base">eCampus Waiver:</dt>
                <dd className="whitespace-nowrap text-[15px] font-extrabold text-emerald-600 sm:text-base">{plan.waiver}</dd>
              </div>
            </dl>

            <div className="mt-5 flex-1 bg-gradient-to-b from-slate-50 to-red-50/60 px-5 pb-7 pt-5 text-center sm:px-8 sm:text-left">
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
              <div className="flex flex-1 flex-col items-center bg-gradient-to-b from-slate-50 to-red-50/60 px-6 py-7 sm:block sm:px-10">
                {plan.immersion.showInclusionsTitle && (
                  <p className="mb-3.5 text-center text-xs font-bold uppercase tracking-wider text-slate-500 sm:text-left">Inclusions</p>
                )}
                <ul className="w-fit space-y-3.5 sm:w-auto">
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
            Download Brochure
          </BrochureButton>
          <p className="max-w-3xl text-center text-[11px] leading-relaxed text-slate-400">
            Fees are as per the university and may change. Final fee is confirmed at the time of admission.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes lp-fee-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .lp-fee-in { animation: lp-fee-in .4s cubic-bezier(0.22, 1, 0.36, 1); }
        @keyframes lp-uni-menu { from { opacity: 0; transform: translateY(-6px) } to { opacity: 1; transform: none } }
        .lp-uni-menu { animation: lp-uni-menu .18s ease-out; }
        @keyframes lp-fee-shine { from { transform: translateX(-120%) skewX(-20deg); } to { transform: translateX(320%) skewX(-20deg); } }
        .lp-fee-cta::after { content: ""; position: absolute; inset: 0 auto 0 0; width: 35%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent); animation: lp-fee-shine 3.2s ease-in-out infinite; pointer-events: none; }
        @media (prefers-reduced-motion: reduce) { .lp-fee-in, .lp-fee-cta::after, .lp-uni-menu { animation: none; } }
      `}</style>
    </LpSection>
  );
}

export default LpFeeStructure;
