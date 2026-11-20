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
  Check,
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
    <div className="mx-auto max-w-6xl">
      {/* Enhanced tabs with red theme */}
      <div className="mx-auto mb-8 w-full max-w-md">
        <div className="relative overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_8px_24px_-12px_rgba(15,23,42,0.3)] ring-1 ring-slate-200">
          {/* Sliding background */}
          <div
            className="absolute inset-y-1.5 w-[calc(50%-6px)] rounded-xl bg-gradient-to-br from-red-600 to-rose-600 shadow-lg transition-all duration-300 ease-out"
            style={{ 
              left: active === "professional" ? "calc(50% + 3px)" : "6px",
            }}
          />
          
          <div role="tablist" aria-label="Choose your profile" className="relative grid grid-cols-2 gap-1.5">
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
                  className={`relative z-10 flex items-center justify-center gap-2 rounded-xl px-3 py-3.5 text-[13px] font-bold transition-all duration-300 sm:text-sm ${
                    isActive 
                      ? "text-white" 
                      : "text-slate-600 hover:text-slate-900"
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
      </div>

      {/* Main content card */}
      <div
        key={active}
        role="tabpanel"
        className="lp-aud-in overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_-20px_rgba(15,23,42,0.3)] ring-1 ring-slate-200"
      >
        {/* Top section with gradient */}
        <div className="relative overflow-hidden border-b-2 border-red-100 bg-gradient-to-br from-red-50 via-rose-50 to-white px-6 py-7 sm:px-8 sm:py-8">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gradient-to-br from-red-600/10 to-rose-600/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-gradient-to-tr from-amber-600/10 to-orange-600/10 blur-3xl" />
          
          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 shadow-sm ring-1 ring-red-100">
                  <data.tabIcon className="h-4 w-4 text-red-600" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">{data.eyebrow}</span>
                </div>
                
                <h3 className="mt-4 text-[24px] font-extrabold leading-tight text-slate-900 sm:text-[28px]">
                  {data.title}
                </h3>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-600 sm:text-[16px]">
                  {data.text}
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <ApplyNowButton className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-7 text-sm font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-600/40">
                Talk to a Counsellor
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </ApplyNowButton>
              
              <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-emerald-600 shadow-sm ring-1 ring-emerald-100">
                <Check className="h-3.5 w-3.5" />
                Free 1-on-1 guidance
              </div>
            </div>
          </div>
        </div>

        {/* Benefits grid with enhanced design */}
        <div className="grid sm:grid-cols-2">
          {data.benefits.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className="lp-aud-item group relative border-b border-slate-100 px-6 py-6 transition-all duration-300 hover:bg-red-50/50 sm:border-r sm:px-7 sm:py-7 sm:even:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
              style={{ animationDelay: `${80 + i * 70}ms` }}
            >
              {/* Number indicator */}
              <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-400 transition-all duration-300 group-hover:bg-red-100 group-hover:text-red-600">
                {i + 1}
              </div>
              
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-600 to-rose-600 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-20" />
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-red-600 shadow-sm ring-1 ring-slate-200 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-red-600 group-hover:to-rose-600 group-hover:text-white group-hover:shadow-lg group-hover:ring-red-200">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                </div>
                
                <div className="min-w-0 flex-1">
                  <p className="text-[15.5px] font-bold leading-snug text-slate-900">
                    {title}
                  </p>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">
                    {text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes lp-aud-in { 
          from { opacity: 0; transform: translate3d(0, 16px, 0); } 
          to { opacity: 1; transform: translate3d(0, 0, 0); } 
        }
        @keyframes lp-aud-item { 
          from { opacity: 0; transform: translate3d(0, 8px, 0); } 
          to { opacity: 1; transform: translate3d(0, 0, 0); } 
        }
        .lp-aud-in { animation: lp-aud-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
        .lp-aud-item { animation: lp-aud-item 0.5s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
        @media (prefers-reduced-motion: reduce) { 
          .lp-aud-in, .lp-aud-item { animation: none; } 
        }
      `}</style>
    </div>
  );
}
