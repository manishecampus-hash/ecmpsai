"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, ChevronUp, ImageIcon, Plus } from "lucide-react";
import { REVEAL_UP } from "@/components/about/reveal";
import { COMPARE_PAIRS, type ComparePair } from "@/data/compare-pairs";
import { openComparePicker, useCompareHref } from "./compare-link";

const PER_ROW = 3;

function PairCard({ pair, href }: { pair: ComparePair; href: string }) {
  const { a, b } = pair;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-white to-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_12px_30px_-20px_rgba(15,23,42,0.4)] ring-1 ring-slate-200 transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_28px_50px_-28px_rgba(15,23,42,0.5)]">
      {/* Banner: the "A vs B" image, or an empty slot until one is added in data/compare-pairs.ts */}
      <div className="relative aspect-[5/2] overflow-hidden bg-slate-100">
        {pair.cover ? (
          <Image
            src={pair.cover}
            alt={`${a.name} vs ${b.name}`}
            fill
            sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-slate-300" aria-hidden>
            <ImageIcon className="h-8 w-8" strokeWidth={1.5} />
          </span>
        )}
        {/* Glass highlight along the top of the banner */}
        <span aria-hidden className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-bold leading-snug text-slate-900">
          {a.short} <span className="font-semibold text-red-600">vs</span> {b.short}
        </h3>

        <dl className="mt-3 grid grid-cols-2 rounded-xl bg-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,1)] ring-1 ring-slate-200/80">
          {[a, b].map((uni, i) => (
            <div key={uni.short} className={`min-w-0 px-3 py-2.5 ${i ? "border-l border-slate-200/80" : ""}`}>
              <dt className="truncate text-[11px] font-medium text-slate-500">{uni.short} fees</dt>
              <dd className="mt-0.5 truncate text-sm font-bold text-slate-900">{uni.fee}</dd>
            </div>
          ))}
        </dl>

        <Link
          href={href}
          aria-label={`Compare ${a.name} and ${b.name} with AI`}
          className="group/btn relative mt-4 flex h-11 w-full items-center justify-between overflow-hidden rounded-xl bg-gradient-to-b from-red-500 to-red-600 pl-4 pr-1.5 text-sm font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_20px_-10px_rgba(220,38,38,0.8)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_16px_28px_-12px_rgba(220,38,38,0.9)] focus-visible:underline active:translate-y-0"
        >
          Compare with AI
          <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-white text-red-600 shadow-sm transition-[width] duration-300 group-hover/btn:w-11">
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" aria-hidden />
          </span>
          {/* Light that sweeps across the button on hover (snaps back instantly when the pointer leaves) */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-1/4 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-0 group-hover/btn:translate-x-[500%] group-hover/btn:duration-700 motion-reduce:hidden"
          />
        </Link>
      </div>

      {/* Gloss: a soft light that sweeps across the card on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-0 ease-out group-hover:translate-x-[400%] group-hover:duration-1000 motion-reduce:hidden"
      />
    </article>
  );
}

export default function ComparisonCards() {
  const hrefFor = useCompareHref();
  const [shown, setShown] = useState(PER_ROW);

  const total = COMPARE_PAIRS.length;
  const remaining = total - shown;

  const showFewer = () => {
    setShown(PER_ROW);
    document.getElementById("comparisons")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="comparisons" aria-labelledby="comparisons-heading" className="scroll-mt-20 bg-slate-50 py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:w-[86%] lg:px-0">
        <div data-reveal className={`${REVEAL_UP} flex flex-col gap-6 md:flex-row md:items-end md:justify-between`}>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-red-600">Popular comparisons</p>
            <h2
              id="comparisons-heading"
              className="mt-3 text-[30px] font-bold leading-[1.2] tracking-tight text-gray-900 sm:text-[36px] lg:text-[40px]"
            >
              Compare to find the right university
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-gray-600">
              {`${total} comparisons students ask us about most. Open one to get a detailed AI breakdown in your dashboard's My Chat.`}
            </p>
          </div>
          <button
            type="button"
            onClick={openComparePicker}
            className="inline-flex h-12 flex-shrink-0 items-center gap-2 self-start rounded-xl bg-red-600 px-6 text-sm font-bold text-white shadow-[0_12px_24px_-10px_rgba(220,38,38,0.6)] transition-colors hover:bg-red-700 focus-visible:underline md:self-auto"
          >
            <Plus className="h-4 w-4" aria-hidden />
            Compare any two
          </button>
        </div>

        {/* Equal rows (auto-rows-fr) keep every card the same size */}
        <ul id="comparison-list" className="mt-10 grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
          {COMPARE_PAIRS.slice(0, shown).map((pair, i) => {
            const card = <PairCard pair={pair} href={hrefFor(pair.a.name, pair.b.name, pair.program)} />;
            // The first row reveals on scroll; rows added later animate in as they appear
            return i < PER_ROW ? (
              <li key={pair.id} data-reveal style={{ transitionDelay: `${i * 100}ms` }} className={REVEAL_UP}>
                {card}
              </li>
            ) : (
              <li
                key={pair.id}
                style={{ animationDelay: `${(i % PER_ROW) * 90}ms` }}
                className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:fill-mode-both motion-safe:duration-500"
              >
                {card}
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-col items-center gap-3">
          {/* One button that changes its label, so keyboard focus stays put */}
          <button
            type="button"
            onClick={() => (remaining > 0 ? setShown((n) => Math.min(n + PER_ROW, total)) : showFewer())}
            aria-controls="comparison-list"
            className="group inline-flex h-12 items-center gap-2 rounded-xl border border-red-200 bg-white px-6 text-sm font-bold text-red-600 transition-colors hover:border-red-600 hover:bg-red-600 hover:text-white focus-visible:underline"
          >
            {remaining > 0 ? (
              <>
                See other comparisons
                <span className="rounded-full bg-red-600 px-2 py-0.5 text-[11px] font-bold text-white transition-colors group-hover:bg-white group-hover:text-red-600">{remaining}</span>
                <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
              </>
            ) : (
              <>
                Show fewer
                <ChevronUp className="h-4 w-4" aria-hidden />
              </>
            )}
          </button>
          <p className="text-xs text-gray-500">
            {`Showing ${shown} of ${total} · Fees are indicative for the full program.`}
          </p>
        </div>
      </div>
    </section>
  );
}
