"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { Check, GraduationCap, PhoneCall, Send, Wallet } from "lucide-react";
import { MAX_REFERRAL_REWARD, formatINR } from "@/data/referral-programs";
import { EASE_OUT } from "../motion";

const STEPS = [
  { icon: Send, title: "Share your code", text: "Send your code or link to a friend." },
  { icon: PhoneCall, title: "Counselor connects", text: "Our counselor calls within 24 hours." },
  { icon: GraduationCap, title: "Friend enrols", text: "University confirms their admission." },
  { icon: Wallet, title: "You get paid", text: "Reward lands in your bank account." },
];

const LAST = STEPS.length - 1;
// Point on the screen (share of its height) the mobile line fills down to while scrolling
const SCROLL_ANCHOR = 0.6;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

// Below the lg breakpoint the steps stack vertically and follow the scroll
function useIsStacked() {
  const [stacked, setStacked] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => setStacked(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return stacked;
}

// Four-step explainer with a progress line through the steps.
// Desktop: horizontal, the current step cycles on a timer and hovering a step jumps to it.
// Mobile / tablet: vertical, the line fills down as the student scrolls past each step.
export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const markerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const inView = useInView(ref, { margin: "-80px" });
  const reduce = useReducedMotion();
  const stacked = useIsStacked();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // How full each vertical segment between two steps is (mobile)
  const seg0 = useMotionValue(0);
  const seg1 = useMotionValue(0);
  const seg2 = useMotionValue(0);
  const segments = useRef([seg0, seg1, seg2]).current;

  // Desktop: step through on a timer while the section is on screen
  useEffect(() => {
    if (stacked || reduce || paused || !inView) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % STEPS.length), 2200);
    return () => window.clearInterval(t);
  }, [stacked, reduce, paused, inView]);

  // Mobile: tie the line to the scroll position. Listens in the capture phase so it also hears the
  // dashboard's own scrolling <main>, not only the window.
  useEffect(() => {
    if (!stacked) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const anchor = window.innerHeight * SCROLL_ANCHOR;
      const centers = markerRefs.current.map((el) => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        return r.top + r.height / 2;
      });
      let reached = 0;
      centers.forEach((y, i) => {
        if (y <= anchor) reached = i + 1;
      });
      setActive(Math.max(0, reached - 1));
      segments.forEach((mv, i) => {
        const from = centers[i];
        const to = centers[i + 1];
        mv.set(to > from ? clamp01((anchor - from) / (to - from)) : 0);
      });
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { capture: true, passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule, { capture: true });
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [stacked, segments]);

  const fill = active / LAST;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      aria-labelledby="how-title"
      className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:py-5"
    >
      {/* Faint dot grid and a soft warm glow in the top-right corner */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_60%)]" />
        <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-red-400/[0.07] blur-3xl" />
      </div>

      <div className="relative flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">How it works</p>
          <h2 id="how-title" className="mt-1 text-[17px] font-bold tracking-tight text-gray-900">
            From invite to payout in four steps
          </h2>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm">
          Earn up to <span className="font-bold text-red-600">{formatINR(MAX_REFERRAL_REWARD)}</span> per enrolment
        </span>
      </div>

      <ol
        className="relative mt-6 grid gap-9 lg:mt-5 lg:grid-cols-4 lg:gap-4"
        onMouseLeave={() => {
          if (!stacked) setPaused(false);
        }}
      >
        {/* Desktop connector behind the markers: dashed track, a fill up to the current step, a glowing head */}
        <div aria-hidden className="pointer-events-none absolute left-[22px] right-[calc(25%-34px)] top-[22px] hidden h-[2px] -translate-y-1/2 lg:block">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#e5e7eb_0_6px,transparent_6px_12px)]" />
          <motion.div
            initial={false}
            animate={{ scaleX: fill }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-gray-900 via-gray-700 to-red-600"
          />
          <motion.span
            initial={false}
            animate={{ left: `${fill * 100}%` }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600 shadow-[0_0_0_5px_rgba(220,38,38,0.14)]"
          />
        </div>

        {STEPS.map(({ icon: Icon, title, text }, i) => {
          const done = i < active;
          const current = i === active;
          return (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.15 + i * 0.12, ease: EASE_OUT }}
              onMouseEnter={() => {
                // On touch screens a tap fires this too, so it only steers the desktop stepper
                if (stacked) return;
                setPaused(true);
                setActive(i);
              }}
              className="relative flex cursor-default items-center gap-3.5 lg:flex-col lg:items-start lg:gap-0"
            >
              {/* Mobile connector down to the next step: dashed track that fills as you scroll */}
              {i < LAST && (
                <span aria-hidden className="pointer-events-none absolute left-[21px] top-[50px] -bottom-[30px] w-[2px] lg:hidden">
                  <span className="absolute inset-0 bg-[repeating-linear-gradient(180deg,#e5e7eb_0_6px,transparent_6px_12px)]" />
                  <motion.span
                    style={{ scaleY: segments[i] }}
                    className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-gray-900 to-red-600"
                  />
                </span>
              )}

              <motion.span
                ref={(el) => {
                  markerRefs.current[i] = el;
                }}
                animate={{ scale: current ? 1.08 : 1, y: current && !stacked ? -2 : 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
                className={`relative z-10 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                  current
                    ? "bg-white text-red-600 shadow-[0_12px_24px_-12px_rgba(220,38,38,0.6)] ring-2 ring-red-500"
                    : done
                      ? "bg-gray-900 text-white shadow-md shadow-gray-900/20"
                      : "border border-gray-200 bg-white text-gray-600 shadow-sm"
                }`}
              >
                {current && <span aria-hidden className="absolute inset-0 rounded-xl bg-red-400/20 motion-safe:animate-ping" />}
                <Icon className="relative h-[18px] w-[18px]" aria-hidden />
                <span
                  className={`absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ring-2 ring-white transition-colors duration-300 ${
                    done ? "bg-emerald-500 text-white" : current ? "bg-red-600 text-white" : "bg-gray-900 text-white"
                  }`}
                >
                  {done ? <Check className="h-3 w-3" strokeWidth={3.5} /> : i + 1}
                </span>
              </motion.span>

              <div className="min-w-0 flex-1 lg:mt-3 lg:w-full lg:pr-3">
                <p className={`text-sm font-semibold transition-colors duration-300 ${current ? "text-gray-900" : "text-gray-700"}`}>{title}</p>
                <p title={text} className="mt-0.5 truncate text-[12.5px] text-gray-500 lg:text-xs">
                  {text}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </motion.section>
  );
}
