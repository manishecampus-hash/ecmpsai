import React from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  FileSearch,
  GraduationCap,
  Lightbulb,
  MessagesSquare,
  PenLine,
  Rocket,
  School,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { ApplyNowButton } from "@/components/form/apply-now-modal";
import { LpHeading, LpReveal, LpSection } from "./lp-ui";

// Static DBA sections that sit between the CMS-driven ones on the landing page.

/** Specialisations shown in the Apply form's dropdown on the DBA landing page */
export const DBA_SPECIALISATIONS = [
  "DBA_(Business_Analytics)",
  "DBA_(Data_Science)",
  "DBA_(Finance)",
  "DBA_(General_Management)",
  "DBA_(Healthcare_Management)",
  "DBA_(Human_Resource_Management)",
  "DBA_(International_Business)",
  "DBA_(Marketing)",
  "DBH_(Supply_Chain_Management)",
  "DBA_(Information_Technology)",
  "DBA_(Internet_of_Things_IoT)",
  "DBA_(Cybersecurity)",
  "DBA_(Artificial_Intelligence_AI)",
];

const AUDIENCE: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Building2, title: "CXOs & Senior Leaders", text: "Add doctoral authority to your boardroom experience and lead strategy with evidence." },
  { icon: BriefcaseBusiness, title: "Mid-Senior Managers", text: "Move from managing teams to shaping direction, without pausing your career." },
  { icon: Lightbulb, title: "Consultants & Advisors", text: "Turn your expertise into research-backed frameworks clients pay a premium for." },
  { icon: Rocket, title: "Founders & Entrepreneurs", text: "Solve real problems in your own business through applied doctoral research." },
];

const JOURNEY: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: MessagesSquare, title: "Free Counselling", text: "Discuss your goals with a DBA counsellor." },
  { icon: School, title: "Choose University", text: "Shortlist the right accredited program." },
  { icon: PenLine, title: "Apply & Enrol", text: "Submit documents and secure your seat." },
  { icon: FileSearch, title: "Research & Thesis", text: "Coursework, research and dissertation online." },
  { icon: GraduationCap, title: "Become 'Dr.'", text: "Graduate with a globally recognised doctorate." },
];

export function DbaAudience() {
  return (
    <LpSection tone="muted">
      <LpHeading heading="Who Can Pursue an *Online DBA*?" description="Built for experienced professionals who want a doctorate without stepping away from work." />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {AUDIENCE.map(({ icon: Icon, title, text }, i) => (
          <LpReveal key={title} delay={i * 0.07}>
            <div className="group h-full rounded-2xl border border-slate-200 bg-white p-4 transition-all sm:p-5 duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_20px_40px_-24px_rgba(220,38,38,0.45)]">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 ring-1 ring-red-100 transition-colors group-hover:bg-red-600 group-hover:text-white sm:h-11 sm:w-11">
                <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={2} />
              </span>
              <h3 className="mt-3 text-[15px] font-bold text-slate-900 sm:mt-4 sm:text-[17px]">{title}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-600 sm:mt-1.5 sm:text-sm">{text}</p>
            </div>
          </LpReveal>
        ))}
      </div>
    </LpSection>
  );
}

export function DbaJourney() {
  return (
    <LpSection tone="muted">
      <LpHeading heading="Your Path to *'Dr. Title'*" description="A simple, guided journey from your first call to your doctorate." />
      <div className="relative">
        {/* connector through the step icons on wide screens */}
        <span aria-hidden className="absolute left-[10%] right-[10%] top-7 hidden border-t-2 border-dashed border-red-200 lg:block" />
        <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {JOURNEY.map(({ icon: Icon, title, text }, i) => (
            <li key={title}>
              <LpReveal delay={i * 0.08} className="relative flex gap-4 lg:flex-col lg:items-center lg:text-center">
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-red-600 shadow-sm ring-1 ring-red-100">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-slate-50">
                    {i + 1}
                  </span>
                </span>
                <div className="lg:mt-4">
                  <h3 className="text-base font-bold text-slate-900">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{text}</p>
                </div>
              </LpReveal>
            </li>
          ))}
        </ol>
      </div>
    </LpSection>
  );
}

export function DbaFinalCta() {
  return (
    <section className="w-full bg-white px-4 pb-12 pt-2 font-sans sm:px-6 sm:pb-14 lg:px-8">
      <LpReveal className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 to-rose-600 px-6 py-10 text-center text-white sm:px-12 sm:py-12 lg:flex lg:items-center lg:justify-between lg:text-left">
          <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-20" viewBox="0 0 800 240" preserveAspectRatio="none">
            <path d="M0 180 C 200 120, 360 240, 560 160 S 760 80, 800 120" fill="none" stroke="white" strokeWidth="1.5" />
            <path d="M0 60 C 220 20, 380 140, 600 70 S 760 20, 800 40" fill="none" stroke="white" strokeWidth="1" />
          </svg>
          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
              <UserCheck className="h-3.5 w-3.5" /> Free 1-on-1 Counselling
            </p>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight text-white sm:text-3xl">Ready to add &lsquo;Dr.&rsquo; to your name?</h2>
            <p className="mt-2 max-w-xl text-sm text-red-50 sm:text-base">
              Talk to a DBA counsellor and find the right program for your goals, budget and schedule.
            </p>
          </div>
          <ApplyNowButton
            courses={DBA_SPECIALISATIONS}
            className="group relative mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-bold text-red-600 shadow-lg transition hover:bg-red-50 lg:mt-0 lg:shrink-0"
          >
            Talk to a Counsellor
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </ApplyNowButton>
        </div>
      </LpReveal>
    </section>
  );
}
