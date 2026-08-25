"use client";

import React, { ReactNode } from "react";

interface DataPoint {
  year: number;
  value: number;
}

interface StatTileProps {
  icon: ReactNode;
  label: string;
  value: string;
  border?: boolean;
}

const DATA: DataPoint[] = [
  { year: 2024, value: 9.87 },
  { year: 2026, value: 12.4 },
  { year: 2028, value: 15.1 },
  { year: 2030, value: 17.0 },
  { year: 2033, value: 19.13 },
];

const CAGR = "7.63%";

/* Chart dimensions */
const W = 520;
const H = 190;
const PAD_L = 44;
const PAD_R = 16;
const PAD_T = 20;
const PAD_B = 28;
const PLOT_W = W - PAD_L - PAD_R;
const PLOT_H = H - PAD_T - PAD_B;

const Y_MIN = 0;
const Y_MAX = 20;
const Y_TICKS = [0, 5, 10, 15, 20];

function xForIndex(i: number): number {
  return PAD_L + (i / (DATA.length - 1)) * PLOT_W;
}

function yForValue(v: number): number {
  return PAD_T + PLOT_H - ((v - Y_MIN) / (Y_MAX - Y_MIN)) * PLOT_H;
}

const points = DATA.map((d, i) => ({
  ...d,
  x: xForIndex(i),
  y: yForValue(d.value),
}));

const linePath = points
  .map(
    (p, i) =>
      `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`,
  )
  .join(" ");

const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(
  1,
)} ${(PAD_T + PLOT_H).toFixed(1)} L ${points[0].x.toFixed(1)} ${(
  PAD_T + PLOT_H
).toFixed(1)} Z`;

export default function MBAOverview() {
  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-black">
      <div className="max-w-6xl mx-auto font-[Inter]">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
         Online MBA Course<span className="text-[#ee2c3c]"> Overview</span> 
          </h2>
        </div>

        <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
          An online MBA is a 2-year postgraduate program that covers the same
          core disciplines as a campus MBA — strategy, leadership, finance,
          marketing, and more — without requiring you to pause your career.
          Whether you&apos;re targeting an entry-level role, switching industries,
          or building toward entrepreneurship, an online MBA can be the pivot
          point your career needs.
        </p>

        <p className="mt-4 text-slate-600 leading-relaxed text-base sm:text-lg">
          Flexibility is the biggest draw. Students access recorded lectures,
          join live virtual sessions, submit assignments online, and engage
          with faculty and peers through discussion forums and group projects.
          This model works especially well for working professionals balancing
          a full-time job with career growth. Most programs also layer in
          industry-aligned curricula, case studies, internships, and
          networking opportunities to build real-world readiness.
        </p>

        {/* Signature panel */}
        <div className="mt-8 max-w-md mx-auto rounded-2xl border border-slate-200 shadow-sm overflow-hidden bg-white">
          <div className="px-4 pt-4 pb-1 flex items-start justify-between flex-wrap gap-2">
            <div>
              <span className="inline-block text-[10px] font-bold tracking-wider text-red-500 uppercase">
                Market Insights
              </span>

              <h3 className="mt-0.5 text-base font-bold text-slate-900">
                India&apos;s Online MBA Market, 2024–2033
              </h3>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 text-red-500 border border-red-100 px-2.5 py-1 text-xs font-bold">
              {CAGR} CAGR
            </span>
          </div>

          <div className="px-3 sm:px-4 pt-1 pb-0.5">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full h-auto"
              role="img"
              aria-label="Market size chart"
            >
              <defs>
                <linearGradient id="redFade" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="#ef4444"
                    stopOpacity="0.22"
                  />
                  <stop
                    offset="100%"
                    stopColor="#ef4444"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>

              {/* Horizontal gridlines + y-axis labels */}
              {Y_TICKS.map((t) => {
                const y = yForValue(t);

                return (
                  <g key={t}>
                    <line
                      x1={PAD_L}
                      y1={y}
                      x2={W - PAD_R}
                      y2={y}
                      stroke="#f1f5f9"
                      strokeWidth="1"
                    />

                    <text
                      x={PAD_L - 10}
                      y={y + 3}
                      textAnchor="end"
                      fontSize="9"
                      fontWeight="600"
                      className="fill-slate-400"
                    >
                      ${t}B
                    </text>
                  </g>
                );
              })}

              {/* Baseline */}
              <line
                x1={PAD_L}
                y1={PAD_T + PLOT_H}
                x2={W - PAD_R}
                y2={PAD_T + PLOT_H}
                stroke="#e2e8f0"
                strokeWidth="1.5"
              />

              {/* Area + line */}
              <path d={areaPath} fill="url(#redFade)" />

              <path
                d={linePath}
                fill="none"
                stroke="#ef4444"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Points + labels */}
              {points.map((p, i) => {
                const isEndpoint =
                  i === 0 || i === points.length - 1;

                return (
                  <g key={p.year}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isEndpoint ? 4.5 : 3.5}
                      fill="#fff"
                      stroke="#ef4444"
                      strokeWidth={isEndpoint ? 2.5 : 2}
                    />

                    <text
                      x={p.x}
                      y={p.y - 11}
                      textAnchor="middle"
                      fontSize={isEndpoint ? 10.5 : 9.5}
                      fontWeight="800"
                      className="fill-slate-900"
                    >
                      ${p.value.toFixed(2)}B
                    </text>

                    <text
                      x={p.x}
                      y={PAD_T + PLOT_H + 16}
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="600"
                      className="fill-slate-400"
                    >
                      {p.year}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Stat tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-slate-100">
            <StatTile
              icon={<TrendUpIcon />}
              label="Market Size 2024"
              value={`$${DATA[0].value.toFixed(2)}B`}
            />

            <StatTile
              icon={<TargetIcon />}
              label="Market Size 2033"
              value={`$${DATA[DATA.length - 1].value.toFixed(2)}B`}
              border
            />

            <StatTile
              icon={<BoltIcon />}
              label="Growth Rate"
              value={CAGR}
              border
            />

            <StatTile
              icon={<PulseIcon />}
              label="Momentum"
              value="Accelerating"
              border
            />
          </div>

          <div className="px-4 py-2 border-t border-slate-100 text-[10px] text-slate-400 italic">
            Source: Custom Market Insights
          </div>
        </div>

        <p className="mt-8 text-slate-600 leading-relaxed text-base sm:text-lg">
          Demand for online MBAs has climbed steadily as employer acceptance of
          online credentials grows and program technology matures. Accredited
          online MBA degrees are recognized worldwide and can meaningfully
          improve career prospects, leadership readiness, and earning
          potential.
        </p>

        <p className="mt-4 text-slate-600 leading-relaxed text-base sm:text-lg">
          The hard part is choosing where to study. Right now you&apos;re weighing
          modules, formats, and outcomes — and that&apos;s exactly what we help
          with. Compare 100+ universities for free in under 2 minutes using
          our tool: fees, accreditation, specialization, placement record, and
          student reviews, all in one place.
        </p>

      
      </div>
    </section>
  );
}

function StatTile({
  icon,
  label,
  value,
  border,
}: StatTileProps) {
  return (
    <div
      className={`flex items-center gap-2 px-3 sm:px-4 py-3 ${
        border ? "sm:border-l border-slate-100" : ""
      }`}
    >
      <div className="h-7 w-7 shrink-0 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
        {icon}
      </div>

      <div>
        <div className="text-[10px] font-semibold tracking-wide text-slate-400 uppercase">
          {label}
        </div>

        <div className="text-xs font-bold text-slate-900">{value}</div>
      </div>
    </div>
  );
}

function TrendUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 17l6-6 4 4 8-8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 7h6v6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="8"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="currentColor"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M13 3L4 14h6l-1 7 9-11h-6l1-7z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PulseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 12h4l2 7 4-14 2 7h6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}