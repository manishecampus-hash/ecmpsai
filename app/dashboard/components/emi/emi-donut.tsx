"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedNumber from "./animated-number";
import { INTEREST_COLOR, PRINCIPAL_COLOR, inr } from "./emi-math";

const R = 80;
const STROKE = 26;
const C = 2 * Math.PI * R;
const GAP = 3; // surface gap between the two segments
const EASE = [0.22, 1, 0.36, 1] as const;

// Principal vs interest split. Hovering (or focusing) a segment shows its figure in the centre.
export default function EmiDonut({ principal, interest }: { principal: number; interest: number }) {
  const [hovered, setHovered] = useState<"principal" | "interest" | null>(null);
  const total = principal + interest;
  const pShare = total > 0 ? principal / total : 1;
  const iShare = 1 - pShare;
  // Leave out the gap when one segment is (almost) the whole ring, e.g. a 0% loan
  const gap = iShare > 0.002 && pShare > 0.002 ? GAP : 0;
  const pLen = Math.max(0, pShare * C - gap);
  const iLen = Math.max(0, iShare * C - gap);

  const center =
    hovered === "principal"
      ? { label: "Principal amount", value: principal, pct: pShare }
      : hovered === "interest"
        ? { label: "Total interest", value: interest, pct: iShare }
        : { label: "Total amount", value: total, pct: null };

  const segment = (key: "principal" | "interest", color: string, length: number, offset: number) => (
    <motion.circle
      cx="100"
      cy="100"
      r={R}
      fill="none"
      stroke={color}
      strokeWidth={hovered === key ? STROKE + 6 : STROKE}
      strokeLinecap="butt"
      initial={false}
      animate={{ strokeDasharray: `${length} ${C - length}`, strokeDashoffset: -offset }}
      transition={{ duration: 0.6, ease: EASE }}
      onMouseEnter={() => setHovered(key)}
      onMouseLeave={() => setHovered(null)}
      onFocus={() => setHovered(key)}
      onBlur={() => setHovered(null)}
      tabIndex={0}
      role="img"
      aria-label={`${key === "principal" ? "Principal amount" : "Total interest"}: ${inr(key === "principal" ? principal : interest)}`}
      className="cursor-pointer outline-none transition-[stroke-width] duration-200"
      style={{ opacity: hovered && hovered !== key ? 0.35 : 1 }}
    />
  );

  return (
    <div className="flex flex-col items-center">
      <div className="relative aspect-square w-full max-w-[260px]">
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90 overflow-visible">
          <circle cx="100" cy="100" r={R} fill="none" stroke="#f3f4f6" strokeWidth={STROKE} />
          {segment("principal", PRINCIPAL_COLOR, pLen, gap / 2)}
          {segment("interest", INTEREST_COLOR, iLen, pShare * C + gap / 2)}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500">{center.label}</span>
          <span className="mt-1 text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
            <AnimatedNumber value={center.value} format={inr} />
          </span>
          {center.pct !== null && <span className="mt-0.5 text-xs font-semibold text-gray-500">{Math.round(center.pct * 100)}% of total</span>}
        </div>
      </div>

      {/* Legend with direct values, so colour is never the only cue */}
      <ul className="mt-6 grid w-full grid-cols-2 gap-3">
        {[
          { key: "principal" as const, label: "Principal amount", value: principal, share: pShare, color: PRINCIPAL_COLOR },
          { key: "interest" as const, label: "Total interest", value: interest, share: iShare, color: INTEREST_COLOR },
        ].map((item) => (
          <li
            key={item.key}
            onMouseEnter={() => setHovered(item.key)}
            onMouseLeave={() => setHovered(null)}
            className={`rounded-xl border px-3.5 py-3 transition ${hovered === item.key ? "border-gray-300 bg-white shadow-sm" : "border-gray-100 bg-gray-50/70"}`}
          >
            <span className="flex items-center gap-2 text-xs font-medium text-gray-500">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              {item.label}
            </span>
            <span className="mt-1 block text-sm font-bold text-gray-900">
              <AnimatedNumber value={item.value} format={inr} />
              <span className="ml-1.5 text-xs font-semibold text-gray-400">{Math.round(item.share * 100)}%</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
