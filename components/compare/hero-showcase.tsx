"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { COMPARE_PAIRS, type CompareUniversity } from "@/data/compare-pairs";
import UniLogo from "./uni-logo";
import { useCompareHref } from "./compare-link";

const ROWS = [
  ["Established", "established"],
  ["Approvals", "approvals"],
  ["Fees", "fee"],
  ["Duration", "duration"],
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

// The pair drifts sideways while each card crossfades in with a soft blur, then its rows follow
const pairMotion: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 28 }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE, staggerChildren: 0.12 },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir * -28,
    transition: { duration: 0.5, ease: [0.4, 0, 1, 1] },
  }),
};
const cardMotion: Variants = {
  enter: { opacity: 0, y: 16, scale: 0.97, filter: "blur(6px)" },
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: EASE,
      delayChildren: 0.2,
      staggerChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    filter: "blur(4px)",
    transition: { duration: 0.4 },
  },
};
const rowMotion: Variants = {
  enter: { opacity: 0, y: 6 },
  center: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  exit: { opacity: 0 },
};

function UniCard({ uni }: { uni: CompareUniversity }) {
  return (
    <motion.div
      variants={cardMotion}
      className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-white to-slate-50 p-4 shadow-[inset_0_1px_0_#fff,0_28px_60px_-30px_rgba(0,0,0,0.9)] transition-transform duration-300 hover:-translate-y-1 sm:p-5"
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-red-600" />
      <UniLogo uni={uni} className="h-12 w-full max-w-[150px]" />
      <p className="mt-3 line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-tight text-slate-900 sm:min-h-[2.75rem] sm:text-base">
        {uni.name}
      </p>
      <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
        <MapPin className="h-3 w-3 flex-shrink-0 text-red-600" aria-hidden />
        <span className="truncate">{uni.location}</span>
      </p>
      <dl className="mt-4 divide-y divide-slate-100 border-t border-slate-100 text-xs sm:text-[13px]">
        {ROWS.map(([label, key]) => (
          <motion.div
            key={key}
            variants={rowMotion}
            className="flex flex-col gap-0.5 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
          >
            <dt className="text-slate-500">{label}</dt>
            <dd className="font-semibold text-slate-900 sm:text-right">
              {uni[key]}
            </dd>
          </motion.div>
        ))}
      </dl>
    </motion.div>
  );
}

// Two university cards that slide to the next pair every few seconds; hover or focus pauses it
export default function HeroShowcase() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const hrefFor = useCompareHref();

  const total = COMPARE_PAIRS.length;
  const pair = COMPARE_PAIRS[index];
  const go = (next: number, direction: number) => {
    setDir(direction);
    setIndex((next + total) % total);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(e) =>
          !e.currentTarget.contains(e.relatedTarget as Node) && setPaused(false)
        }
        className="w-full"
      >
        <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden />
          Side-by-side preview
        </p>

        {/* Old and new pair share one grid cell so the height never jumps while they cross */}
        <div className="relative grid" aria-live="polite">
          <AnimatePresence initial={false} custom={dir}>
            <motion.div
              key={pair.id}
              custom={dir}
              variants={pairMotion}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-2 gap-3 [grid-area:1/1] sm:gap-6"
            >
              <UniCard uni={pair.a} />
              <UniCard uni={pair.b} />
            </motion.div>
          </AnimatePresence>
          {/* VS pops in again each time the pair changes */}
          <motion.span
            key={`vs-${pair.id}`}
            aria-hidden
            initial={{ scale: 0.4, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 18,
              delay: 0.25,
            }}
            className="absolute left-1/2 top-[18px] z-10 -ml-[22px] flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-xs font-black text-white shadow-[0_0_0_6px_rgba(220,38,38,0.18)] ring-4 ring-slate-950 sm:top-[22px]"
          >
            VS
          </motion.span>
        </div>

        {/* Pager: the active segment fills over 5s and moves on when it is full */}
        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => go(index - 1, -1)}
            aria-label="Previous comparison"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex flex-1 gap-1.5">
            {COMPARE_PAIRS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => go(i, i >= index ? 1 : -1)}
                aria-label={`Show ${p.a.short} vs ${p.b.short}`}
                aria-current={i === index}
                className="flex-1 py-2"
              >
                <span className="relative block h-1 overflow-hidden rounded-full bg-white/20">
                  {i < index && (
                    <span className="absolute inset-0 bg-white/40" />
                  )}
                  {i === index && (
                    <span
                      key={index}
                      onAnimationEnd={() => go(index + 1, 1)}
                      className={`absolute inset-0 origin-left bg-red-500 ${
                        reduceMotion ? "" : "animate-[draw_5s_linear_forwards]"
                      } ${paused ? "[animation-play-state:paused]" : ""}`}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(index + 1, 1)}
            aria-label="Next comparison"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <Link
          href={hrefFor(pair.a.name, pair.b.name, pair.program)}
          className="group mt-4 flex items-center justify-between gap-3 rounded-xl bg-white/[0.06] px-4 py-3 ring-1 ring-white/10 transition-colors hover:bg-white/10 focus-visible:underline"
        >
          <span className="min-w-0 truncate text-sm font-semibold text-white">
            <span className="font-medium text-white/60">Ask AI: </span>
            {pair.a.short} vs {pair.b.short}
          </span>
          <span className="flex flex-shrink-0 items-center gap-1.5 text-sm font-bold text-red-400">
            Compare
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </span>
        </Link>
      </div>
    </MotionConfig>
  );
}
