"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Award, BookOpenCheck, Briefcase, GraduationCap, Search, type LucideIcon } from "lucide-react";

// Each search the panel "types" lights up the program type it belongs to
const PROGRAMS: { icon: LucideIcon; title: string; text: string; href: string; query: string }[] = [
  { icon: GraduationCap, title: "Online Degrees", text: "UG & PG programs from online universities", href: "/universities", query: "Online MBA for working professionals" },
  { icon: Award, title: "Professional Certifications", text: "Skill-focused certificate programs", href: "/certification/digital-marketing-ai", query: "Digital marketing certification" },
  { icon: Briefcase, title: "Executive Education", text: "Programs such as the 1-year executive MBA", href: "/one-year-online-mba", query: "1-year executive MBA" },
  { icon: BookOpenCheck, title: "Doctoral Programs", text: "DBA and other doctoral pathways", href: "/programs/doctorate", query: "Doctorate (DBA) programs" },
];

const TYPE_MS = 45;
const HOLD_MS = 1800;

export default function HeroProgramPanel() {
  const [active, setActive] = useState(0);
  const [typed, setTyped] = useState(PROGRAMS[0].query.length);
  const [paused, setPaused] = useState(false);
  const [animate, setAnimate] = useState(false);

  // Start the loop only when motion is allowed (the server and reduced-motion users see a still panel)
  useEffect(() => {
    setAnimate(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!animate || paused) return;
    const query = PROGRAMS[active].query;
    const t =
      typed < query.length
        ? setTimeout(() => setTyped((n) => n + 1), TYPE_MS)
        : setTimeout(() => {
            setActive((i) => (i + 1) % PROGRAMS.length);
            setTyped(0);
          }, HOLD_MS);
    return () => clearTimeout(t);
  }, [animate, paused, typed, active]);

  const query = PROGRAMS[active].query.slice(0, typed);
  const matched = typed >= PROGRAMS[active].query.length;

  return (
    <div
      className="relative rounded-3xl border border-gray-200 border-t-red-600 bg-white p-5 shadow-[0_30px_60px_-30px_rgba(17,24,39,0.3)] [border-top-width:4px] sm:p-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-gray-900">Explore programs</p>
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
        </span>
      </div>

      {/* Search bar that types an example query */}
      <div aria-hidden className="mt-4 flex h-12 items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50 px-4">
        <Search className="h-4 w-4 flex-shrink-0 text-gray-400" />
        <span className="truncate text-sm text-gray-800">{query}</span>
        <span className="-ml-1.5 h-5 w-[2px] flex-shrink-0 bg-red-600 motion-safe:animate-pulse" />
      </div>

      <ul className="mt-4 space-y-2.5">
        {PROGRAMS.map(({ icon: Icon, title, text, href }, i) => {
          const on = i === active && matched;
          return (
            <li key={title}>
              <Link
                href={href}
                onFocus={() => {
                  setPaused(true);
                  setActive(i);
                  setTyped(PROGRAMS[i].query.length);
                }}
                onBlur={() => setPaused(false)}
                className={`group flex items-center gap-3.5 rounded-xl border p-3 transition-all duration-500 focus-visible:underline ${
                  on ? "translate-x-1 border-red-200 bg-red-50/70 shadow-sm" : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-colors duration-500 ${
                    on ? "bg-red-600 text-white" : "bg-red-50 text-red-600"
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-gray-900">{title}</span>
                  <span className="block truncate text-xs text-gray-500">{text}</span>
                </span>
                <span
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                    on ? "bg-white text-red-600 shadow-sm" : "text-gray-300 group-hover:text-gray-500"
                  }`}
                >
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Progress through the four examples */}
      <div className="mt-5 flex items-center gap-1.5" aria-hidden>
        {PROGRAMS.map((p, i) => (
          <span key={p.title} className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-red-600" : "w-3 bg-gray-200"}`} />
        ))}
      </div>
    </div>
  );
}
