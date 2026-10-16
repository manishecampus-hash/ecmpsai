"use client";

import React from "react";
import { motion } from "framer-motion";
import HighlightedTitle from "./highlighted-title";

// Shared frame for every landing-page section: same width, rhythm and heading style.

export function LpSection({
  id,
  tone = "white",
  children,
  className = "",
}: {
  id?: string;
  tone?: "white" | "muted";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative w-full scroll-mt-20 ${tone === "muted" ? "bg-slate-50" : "bg-white"} ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-8 font-sans sm:px-6 sm:py-11 lg:px-8">{children}</div>
    </section>
  );
}

export function LpHeading({
  heading,
  description,
  eyebrow,
}: {
  heading: string;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
}) {
  return (
    <div className="mx-auto mb-6 max-w-3xl text-center sm:mb-8">
      {eyebrow && (
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-red-600">
          {eyebrow}
        </p>
      )}
      <h2 className="text-[26px] font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
        <HighlightedTitle text={heading} fallbackLastWord highlightClassName="text-red-600" />
      </h2>
      {description && <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-600 sm:text-base">{description}</p>}
    </div>
  );
}

/** Fades content up the first time it scrolls into view */
export function LpReveal({
  children,
  className,
  delay = 0,
  duration = 0.45,
  distance = 14,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay: Math.min(delay, 0.4) }}
    >
      {children}
    </motion.div>
  );
}

/** Seamless right-to-left logo strip (the list is doubled and the track moves by half) */
export function LogoMarquee({
  logos,
  speed = 30,
  size = "md",
}: {
  logos: { logo: string; name?: string }[];
  speed?: number;
  size?: "sm" | "md";
}) {
  const tile = size === "sm" ? "h-16 w-32 sm:h-[72px] sm:w-36" : "h-20 w-40 sm:h-24 sm:w-48";
  const img = size === "sm" ? "max-h-9 sm:max-h-10" : "max-h-12 sm:max-h-14";
  const base = logos.length < 6 ? [...logos, ...logos, ...logos] : logos;
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white py-6 sm:py-8 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
      <div className="lp-marquee flex w-max items-center" style={{ animationDuration: `${speed}s` }}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-4 pr-4 sm:gap-5 sm:pr-5" aria-hidden={copy === 1}>
            {base.map((p, i) => (
              <div
                key={`${copy}-${i}`}
                className={`flex shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white px-4 transition-colors hover:border-red-200 ${tile}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.logo} alt={copy === 0 ? p.name || "" : ""} loading="lazy" className={`max-w-full object-contain ${img}`} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes lp-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .lp-marquee { animation: lp-marquee linear infinite; }
        .lp-marquee:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .lp-marquee { animation: none; } }
      `}</style>
    </div>
  );
}
