"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CalendarClock,
  FileCheck2,
  GraduationCap,
  Layers,
  TrendingUp,
  Users,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import { ApplyNowButton } from "@/components/form/apply-now-modal";

type AudienceKey = "graduate" | "professional";

const AUDIENCES: Record<
  AudienceKey,
  {
    tab: string;
    tabShort: string;
    tabIcon: LucideIcon;
    eyebrow: string;
    title: string;
    text: string;
    benefits: { icon: LucideIcon; title: string; text: string }[];
  }
> = {
  graduate: {
    tab: "Fresh Graduate",
    tabShort: "Graduate",
    tabIcon: GraduationCap,
    eyebrow: "Just finished graduation?",
    title: "Start your management career with a head start",
    text: "Build a strong business foundation right after graduation and step into the job market with a postgraduate degree.",
    benefits: [
      { icon: BookOpen, title: "Strong business foundation", text: "Core subjects across marketing, finance, HR and operations in year one." },
      { icon: Layers, title: "Choose your specialisation", text: "Pick a track like Marketing, Finance or Business Analytics that suits you." },
      { icon: BriefcaseBusiness, title: "Earn while you learn", text: "Take up a job or internship alongside your online classes." },
      { icon: FileCheck2, title: "Projects for your résumé", text: "A summer project and a capstone to showcase what you can do." },
    ],
  },
  professional: {
    tab: "Working Professional",
    tabShort: "Professional",
    tabIcon: BriefcaseBusiness,
    eyebrow: "Already working?",
    title: "Grow into leadership without pausing your career",
    text: "Upgrade your management skills while you keep working — no career break and no relocation.",
    benefits: [
      { icon: CalendarClock, title: "Study around your job", text: "Live classes that fit your routine, plus recordings to catch up anytime." },
      { icon: TrendingUp, title: "Apply it at work", text: "Use what you learn in class directly in your current role." },
      { icon: Users, title: "A wider peer network", text: "Learn alongside professionals from different industries and regions." },
      { icon: WalletCards, title: "Easy fee options", text: "Loan, instalment and EMI options are available." },
    ],
  },
};

export default function MbaAudience() {
  const [active, setActive] = useState<AudienceKey>("professional");
  const data = AUDIENCES[active];
  const keys = Object.keys(AUDIENCES) as AudienceKey[];

  return (
    <div>
      {/* Segmented switch */}
      <div className="mx-auto mb-6 w-full max-w-md sm:mb-8">
        <div role="tablist" aria-label="Choose your profile" className="relative grid grid-cols-2 rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-slate-200">
          <span
            aria-hidden
            className="absolute bottom-1.5 left-1.5 top-1.5 w-[calc(50%-6px)] rounded-xl bg-gradient-to-r from-red-600 to-rose-500 shadow-md shadow-red-500/25 transition-transform duration-300 ease-out"
            style={{ transform: active === "professional" ? "translateX(100%)" : "translateX(0)" }}
          />
          {keys.map((key) => {
            const TabIcon = AUDIENCES[key].tabIcon;
            const isActive = key === active;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(key)}
                className={`relative z-10 flex items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-[13px] font-bold transition-colors duration-300 sm:text-sm ${
                  isActive ? "text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <TabIcon className="h-4 w-4 shrink-0" />
                <span className="truncate sm:hidden">{AUDIENCES[key].tabShort}</span>
                <span className="hidden truncate sm:inline">{AUDIENCES[key].tab}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Panel — re-mounts on switch so the content animates in */}
      <div
        key={active}
        role="tabpanel"
        className="lp-aud-in overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_44px_-28px_rgba(15,23,42,0.35)] lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
      >
        {/* Intro */}
        <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-600 to-rose-600 p-6 text-white sm:p-8 lg:flex lg:items-center">
          <div className="relative">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider !text-white">
              <data.tabIcon className="h-3.5 w-3.5" /> {data.eyebrow}
            </p>
            <h3 className="mt-4 text-[22px] font-extrabold leading-tight !text-white sm:text-[26px]">{data.title}</h3>
            <p className="mt-3 text-sm leading-relaxed !text-red-50 sm:text-[15px]">{data.text}</p>
            <ApplyNowButton className="group mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-red-600 shadow-lg transition hover:bg-red-50">
              Talk to a Counsellor
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ApplyNowButton>
          </div>
        </div>

        {/* Benefits */}
        <ul className="grid px-5 py-2 sm:grid-cols-2 sm:gap-x-8 sm:px-7 sm:py-5 lg:px-8 lg:py-6">
          {data.benefits.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className="lp-aud-item group flex gap-3.5 border-b border-slate-100 py-4 last:border-b-0 sm:py-5 sm:[&:nth-last-child(2)]:border-b-0"
              style={{ animationDelay: `${120 + i * 80}ms` }}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 ring-1 ring-red-100 transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <p className="text-[14.5px] font-bold leading-snug text-slate-900 transition-colors group-hover:text-red-700">{title}</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @keyframes lp-aud-in { from { opacity: 0; transform: translate3d(0, 10px, 0); } to { opacity: 1; transform: translate3d(0, 0, 0); } }
        .lp-aud-in { animation: lp-aud-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
        .lp-aud-item { animation: lp-aud-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
        @media (prefers-reduced-motion: reduce) { .lp-aud-in, .lp-aud-item { animation: none; } }
      `}</style>
    </div>
  );
}
