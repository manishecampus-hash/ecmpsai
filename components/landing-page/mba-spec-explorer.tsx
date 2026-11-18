"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Cpu,
  Globe2,
  HeartPulse,
  Landmark,
  Megaphone,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { ApplyNowButton } from "@/components/form/apply-now-modal";

const specIcon = (name: string): LucideIcon => {
  const n = name.toLowerCase();
  if (n.includes("market")) return Megaphone;
  if (n.includes("financ") || n.includes("account")) return Landmark;
  if (n.includes("human") || n.includes("hr")) return Users;
  if (n.includes("operation") || n.includes("supply") || n.includes("logistic")) return Truck;
  if (n.includes("analytic") || n.includes("data")) return BarChart3;
  if (n.includes("health") || n.includes("hospital")) return HeartPulse;
  if (n.includes("information") || n.includes("technology")) return Cpu;
  if (n.includes("international") || n.includes("global")) return Globe2;
  return BriefcaseBusiness;
};

/** Typical roles per specialisation */
const CAREER_ROLES: { match: RegExp; roles: string[] }[] = [
  { match: /market/i, roles: ["Marketing Manager", "Brand Manager", "Digital Marketing Lead"] },
  { match: /financ|account/i, roles: ["Financial Analyst", "Finance Manager", "Investment Analyst"] },
  { match: /human|\bhr\b/i, roles: ["HR Manager", "Talent Acquisition Lead", "HR Business Partner"] },
  { match: /operation|supply|logistic/i, roles: ["Operations Manager", "Supply Chain Manager", "Project Manager"] },
  { match: /analytic|data/i, roles: ["Business Analyst", "Data Analyst", "Strategy Analyst"] },
  { match: /health|hospital/i, roles: ["Hospital Administrator", "Healthcare Operations Manager"] },
  { match: /information|technology/i, roles: ["IT Project Manager", "Product Manager", "Digital Transformation Lead"] },
  { match: /international|global/i, roles: ["International Business Manager", "Export Manager"] },
];

/** Auto-advance interval and the pause after a manual pick */
const AUTOPLAY_MS = 4500;
const RESUME_AFTER_MS = 8000;

/** Short display name for the pills: "Finance and Accounting" → "Finance & Accounting" */
const shortName = (name: string) => name.replace(/\s+and\s+/i, " & ").replace(/\s+Management$/i, "");

export default function MbaSpecExplorer({ items }: { items: { key: string; value: string }[] }) {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false); // paused after a tap / click
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const stripRef = useRef<HTMLDivElement>(null);
  // Keeps playing under the cursor; only a manual pick pauses it briefly
  const running = inView && !held && items.length > 1;

  // Only auto-play while the section is on screen
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-advance to the next specialisation
  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % items.length), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [active, running, items.length]);

  useEffect(() => () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  // Pause for a while after the visitor interacts, then carry on
  const holdAutoplay = () => {
    setHeld(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setHeld(false), RESUME_AFTER_MS);
  };

  const pick = (i: number) => {
    setActive(i);
    holdAutoplay();
  };

  // Phones: keep the selected pill in view (moves the pill strip only)
  useEffect(() => {
    const strip = stripRef.current;
    const pill = pillRefs.current[active];
    if (!strip || !pill || strip.scrollWidth <= strip.clientWidth) return;
    const left = pill.getBoundingClientRect().left - strip.getBoundingClientRect().left + strip.scrollLeft;
    strip.scrollTo({ left: Math.max(0, left - (strip.clientWidth - pill.offsetWidth) / 2), behavior: "smooth" });
  }, [active]);

  const item = items[active];
  const Icon = specIcon(item.key);
  const roles = CAREER_ROLES.find((r) => r.match.test(item.key))?.roles || [];

  return (
    <div ref={rootRef} className="lg:grid lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-8">
      {/* Selector — pills on phones, vertical list on desktop */}
      <div
        ref={stripRef}
        role="tablist"
        aria-label="MBA specialisations"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((s, i) => {
          const PillIcon = specIcon(s.key);
          const isActive = i === active;
          return (
            <button
              key={s.key}
              ref={(el) => {
                pillRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => pick(i)}
              className={`group relative flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full px-4 py-2.5 text-[13px] font-semibold transition-all duration-300 lg:rounded-xl lg:px-4 lg:py-3 lg:text-left lg:text-sm ${
                isActive
                  ? "bg-gradient-to-r from-red-600 to-rose-500 text-white shadow-md shadow-red-500/25"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-slate-900 hover:ring-red-200 lg:bg-transparent lg:ring-0 lg:hover:bg-white"
              }`}
            >
              <PillIcon className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-red-500"}`} strokeWidth={2} />
              <span className="lg:flex-1">{shortName(s.key)}</span>
              {isActive && items.length > 1 && (
                <span
                  aria-hidden
                  className="absolute inset-x-4 bottom-1 h-[2px] overflow-hidden rounded-full bg-white/25 lg:bottom-1.5"
                >
                  <span
                    key={active}
                    className="lp-spec-progress block h-full origin-left rounded-full bg-white"
                    style={{ animationDuration: `${AUTOPLAY_MS}ms`, animationPlayState: running ? "running" : "paused" }}
                  />
                </span>
              )}
              <ArrowRight
                className={`hidden h-4 w-4 shrink-0 transition-all duration-300 lg:block ${
                  isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0 group-hover:opacity-60"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Detail panel — re-mounts on change so it animates */}
      <div
        key={active}
        role="tabpanel"
        className="lp-spec-in relative mt-4 overflow-hidden rounded-3xl bg-white p-6 shadow-[0_22px_50px_-30px_rgba(15,23,42,0.4)] ring-1 ring-slate-200 sm:p-8 lg:mt-0 lg:p-10"
      >
        {/* large faint icon as a backdrop */}
        <Icon aria-hidden className="pointer-events-none absolute -bottom-6 -right-6 h-40 w-40 text-red-50 sm:h-52 sm:w-52" strokeWidth={1.2} />

        <div className="relative">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-rose-500 text-white shadow-[0_12px_26px_-10px_rgba(220,38,38,0.7)]">
              <Icon className="h-7 w-7" strokeWidth={2} />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-red-600">
                MBA in · {String(active + 1).padStart(2, "0")}/{String(items.length).padStart(2, "0")}
              </p>
              <h3 className="text-xl font-extrabold leading-tight text-slate-900 sm:text-2xl">{item.key}</h3>
            </div>
          </div>

          <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-slate-600 sm:text-base">{item.value}</p>

          {roles.length > 0 && (
            <div className="mt-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Popular roles</p>
              <ul className="mt-2.5 flex flex-wrap gap-2">
                {roles.map((role, i) => (
                  <li
                    key={role}
                    className="lp-spec-chip rounded-full bg-red-50 px-3.5 py-1.5 text-[13px] font-semibold text-red-700 ring-1 ring-red-100"
                    style={{ animationDelay: `${150 + i * 90}ms` }}
                  >
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <ApplyNowButton className="group mt-7 inline-flex h-11 items-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-bold text-white transition-colors hover:bg-red-600">
            Get guidance on this track
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </ApplyNowButton>
        </div>
      </div>

      <style>{`
        @keyframes lp-spec-in { from { opacity: 0; transform: translate3d(0, 10px, 0); } to { opacity: 1; transform: none; } }
        .lp-spec-in { animation: lp-spec-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
        .lp-spec-chip { animation: lp-spec-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
        @keyframes lp-spec-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .lp-spec-progress { animation: lp-spec-progress linear forwards; transform: scaleX(0); }
        @media (prefers-reduced-motion: reduce) { .lp-spec-in, .lp-spec-chip { animation: none; } }
      `}</style>
    </div>
  );
}
