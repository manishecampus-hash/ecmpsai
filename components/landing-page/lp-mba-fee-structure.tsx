"use client";

import React, { useEffect, useRef, useState } from "react";
import { BadgeCheck, CalendarClock, Download, IndianRupee, MapPin, WalletCards } from "lucide-react";
import { BrochureButton } from "@/components/form/apply-now-modal";
import { LpHeading, LpSection } from "./lp-ui";
import { UniversitySelect } from "./lp-fee-structure";
import type { MbaFeeOption, MbaFeePlan } from "./lp-mba-fee-data";

const inr = new Intl.NumberFormat("en-IN");

type CardKey = "oneTime" | "annual" | "semester";

const CARDS: { key: CardKey; title: string; tone: string }[] = [
  {
    key: "oneTime",
    title: "One-Time Payment",
    tone: "border-emerald-500/70 hover:border-emerald-500 hover:shadow-[0_22px_44px_-26px_rgba(16,185,129,0.6)]",
  },
  {
    key: "annual",
    title: "Annual Fee",
    tone: "border-rose-400/80 hover:border-rose-500 hover:shadow-[0_22px_44px_-26px_rgba(244,63,94,0.55)]",
  },
  {
    key: "semester",
    title: "Per Semester Fee",
    tone: "border-amber-400/90 hover:border-amber-500 hover:shadow-[0_22px_44px_-26px_rgba(245,158,11,0.6)]",
  },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Rolls the number from its previous value to the new one when the university changes */
function useCountUp(value: number, duration = 700) {
  const [display, setDisplay] = useState(value);
  const current = useRef(value);

  useEffect(() => {
    const from = current.current;
    if (from === value) return;
    if (prefersReducedMotion()) {
      current.current = value;
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(from + (value - from) * eased);
      current.current = next;
      setDisplay(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return display;
}

function FeeCard({
  title,
  tone,
  option,
  best,
  index,
  planId,
}: {
  title: string;
  tone: string;
  option: MbaFeeOption;
  best: boolean;
  index: number;
  planId: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const firstRender = useRef(true);
  const price = useCountUp(option.price);
  const saving = option.original ? option.original - option.price : 0;

  // Staggered settle-in each time another university is picked (the cards stay mounted so the numbers can roll)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (prefersReducedMotion() || !ref.current?.animate) return;
    ref.current.animate(
      [
        { opacity: 0.35, transform: "translateY(12px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 460, delay: index * 80, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
    );
  }, [planId, index]);

  return (
    <article
      ref={ref}
      className={`group relative flex flex-col rounded-[18px] border-[1.5px] bg-white px-5 pb-4 pt-5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 sm:px-6 ${tone}`}
    >
      {best && (
        <span className="absolute -top-3 right-5 rounded-full bg-emerald-600 px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-white shadow-[0_6px_14px_-6px_rgba(5,150,105,0.8)]">
          Best value
        </span>
      )}

      <h3 className="text-[19px] font-bold tracking-[-0.01em] text-[#1c2b5a] sm:text-[21px]">{title}</h3>

      <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p className="text-[30px] font-medium leading-none tracking-[-0.02em] text-[#1c2b5a] tabular-nums sm:text-[34px]">
          ₹{inr.format(price)}
          {option.per && <span className="text-[17px] font-normal text-slate-500 sm:text-lg">{option.per}</span>}
        </p>
        {option.original && (
          <s className="text-[15px] font-medium text-slate-400 decoration-slate-500 decoration-[1.5px]">
            ₹{inr.format(option.original)}
          </s>
        )}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
        <p className="text-[14px] text-slate-500">{option.note}</p>
        {saving > 0 && (
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[12px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
            <IndianRupee className="h-3 w-3" strokeWidth={2.6} />
            You save ₹{inr.format(saving)}
          </span>
        )}
      </div>

      <div className="mt-auto pt-3.5">
        <p className="flex items-center gap-2 border-t border-dashed border-slate-200 pt-3 text-[14.5px] font-semibold text-emerald-600">
          <BadgeCheck className="h-5 w-5 shrink-0 fill-emerald-500 text-white" strokeWidth={2.2} />
          {option.effectiveLabel ?? "Effective fee of"} Rs. {inr.format(option.effective)}
        </p>
      </div>
    </article>
  );
}

export function LpMbaFeeStructure({
  plans,
  formCourses,
  tone = "white",
}: {
  plans: MbaFeePlan[];
  formCourses?: string[];
  tone?: "white" | "muted";
}) {
  const [activeId, setActiveId] = useState(plans[0]?.id);
  const plan = plans.find((p) => p.id === activeId) ?? plans[0];
  if (!plan) return null;

  // "Best value" only when one option really costs less overall than the other two
  const totals = CARDS.map((c) => plan[c.key].effective);
  const lowest = Math.min(...totals);
  const bestKey = totals.filter((t) => t === lowest).length === 1 ? CARDS[totals.indexOf(lowest)].key : null;

  return (
    <LpSection tone={tone}>
      <LpHeading
        eyebrow={
          <>
            <IndianRupee className="h-3.5 w-3.5" /> Transparent Fees
          </>
        }
        heading="Online MBA *Fee Structure*"
        description="Choose a university to see its one-time, annual and semester-wise fee."
        descriptionClassName="text-[clamp(13px,3.2vw,15px)]"
      />

      <UniversitySelect plans={plans} value={plan.id} onChange={setActiveId} label="Online MBA fee by university" />

      <p className="mb-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center text-sm font-semibold text-slate-600 sm:mb-8">
        <span className="text-base font-extrabold text-slate-900">{plan.name}</span>
        {plan.location && (
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-red-500" /> {plan.location}
          </span>
        )}
      </p>

      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3 lg:gap-6">
        {CARDS.map((c, i) => (
          <FeeCard
            key={c.key}
            title={c.title}
            tone={c.tone}
            option={plan[c.key]}
            best={bestKey === c.key}
            index={i}
            planId={plan.id}
          />
        ))}
      </div>

      {/* EMI, duration & brochure */}
      <div className="mx-auto mt-6 flex max-w-6xl flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 px-5 py-4 md:flex-row md:items-center md:justify-between">
        <ul className="flex flex-col gap-2 text-[14px] font-medium text-slate-700 sm:flex-row sm:flex-wrap sm:gap-x-7">
          {plan.emi && (
            <li className="flex items-center gap-2">
              <WalletCards className="h-4 w-4 shrink-0 text-red-600" /> {plan.emi}
            </li>
          )}
          <li className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4 shrink-0 text-red-600" /> {plan.duration}
          </li>
        </ul>
        <BrochureButton
          courses={formCourses}
          programName={plan.name}
          className="group/btn inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_22px_-12px_rgba(220,38,38,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 active:translate-y-0"
        >
          <Download className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-y-0.5" />
          Download Fee Brochure
        </BrochureButton>
      </div>

      {plan.extras && <p className="mx-auto mt-3 max-w-6xl text-center text-[12.5px] text-slate-500">{plan.extras}</p>}
      <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] leading-relaxed text-slate-400">
        Fees as listed by the university and subject to change. The final fee is confirmed at the time of admission.
      </p>

      <style>{`
        @keyframes lp-uni-menu { from { opacity: 0; transform: translateY(-6px) } to { opacity: 1; transform: none } }
        .lp-uni-menu { animation: lp-uni-menu .18s ease-out; }
        @media (prefers-reduced-motion: reduce) { .lp-uni-menu { animation: none; } }
      `}</style>
    </LpSection>
  );
}

export default LpMbaFeeStructure;
