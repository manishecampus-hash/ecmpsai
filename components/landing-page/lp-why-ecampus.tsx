import React from "react";
import {
  ArrowRight,
  BadgeIndianRupee,
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarCheck2,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  Headphones,
  Scale,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";
import { ApplyNowButton } from "@/components/form/apply-now-modal";
import { DBA_UNIVERSITIES } from "@/data/dba-universities";
import { AnimatedCounter } from "./animated-counter";
import { MBA_SPECIALISATIONS } from "./landing-page-mba-extras";
import { LpHeading, LpReveal, LpSection } from "./lp-ui";

// "Why eCampus" — same layout on the MBA and DBA landing pages, programme-specific copy.
// Neutral (white / slate) surface; colour comes from soft per-card accents, red is used only for the main CTA.

type Accent = "blue" | "emerald" | "amber" | "violet" | "sky" | "rose";

/** Static class strings per accent (kept whole so Tailwind picks them up) */
const ACCENTS: Record<Accent, { chip: string; line: string; glow: string }> = {
  blue: { chip: "bg-blue-50 text-blue-600 ring-blue-100", line: "from-blue-500 to-blue-300", glow: "group-hover:shadow-[0_22px_44px_-28px_rgba(37,99,235,0.55)]" },
  emerald: { chip: "bg-emerald-50 text-emerald-600 ring-emerald-100", line: "from-emerald-500 to-emerald-300", glow: "group-hover:shadow-[0_22px_44px_-28px_rgba(5,150,105,0.55)]" },
  amber: { chip: "bg-amber-50 text-amber-600 ring-amber-100", line: "from-amber-500 to-amber-300", glow: "group-hover:shadow-[0_22px_44px_-28px_rgba(217,119,6,0.55)]" },
  violet: { chip: "bg-violet-50 text-violet-600 ring-violet-100", line: "from-violet-500 to-violet-300", glow: "group-hover:shadow-[0_22px_44px_-28px_rgba(124,58,237,0.55)]" },
  sky: { chip: "bg-sky-50 text-sky-600 ring-sky-100", line: "from-sky-500 to-sky-300", glow: "group-hover:shadow-[0_22px_44px_-28px_rgba(2,132,199,0.55)]" },
  rose: { chip: "bg-rose-50 text-rose-600 ring-rose-100", line: "from-rose-500 to-rose-300", glow: "group-hover:shadow-[0_22px_44px_-28px_rgba(225,29,72,0.5)]" },
};

interface WhyEcampusCopy {
  heading: string;
  description: string;
  stats: { end: number; prefix?: string; suffix?: string; label: string }[];
  benefits: { icon: LucideIcon; accent: Accent; title: string; text: string }[];
  ctaTitle: string;
  ctaPoints: string[];
  cta: string;
}

const COPY: Record<"dba" | "mba", WhyEcampusCopy> = {
  dba: {
    heading: "Why Pursue Your DBA with *eCampus*?",
    description: "More than an admission desk. We stay with you from choosing a university to the day you become 'Dr.'",
    stats: [
      { end: DBA_UNIVERSITIES.length, label: "Accredited global universities" },
      { end: 20, prefix: "Upto ", suffix: "%", label: "eCampus fee waiver" },
      { end: 10, prefix: "₹", suffix: "K*", label: "Scholarship on enrolment" },
      { end: 100, suffix: "%", label: "Online, study while you work" },
    ],
    benefits: [
      { icon: UserRoundCheck, accent: "blue", title: "Free 1:1 DBA Counselling", text: "Senior counsellors match your experience and goals to the right university and specialisation." },
      { icon: ShieldCheck, accent: "emerald", title: "Only Accredited Universities", text: "Every partner university is vetted for global accreditation and WES / ECE recognition." },
      { icon: BadgeIndianRupee, accent: "amber", title: "Exclusive Fee Waiver", text: "Get up to 20% eCampus waiver plus scholarships you won't find when applying directly." },
      { icon: FileCheck2, accent: "violet", title: "Hassle-free Admission", text: "We help with your documents, SOP and application so you can enrol without the paperwork stress." },
      { icon: BookOpenCheck, accent: "sky", title: "Research & Thesis Guidance", text: "Support with topic selection, research proposal and mentor connect through your dissertation." },
      { icon: CalendarCheck2, accent: "rose", title: "Easy Monthly Payments", text: "Spread your fee into simple monthly instalments, so cost never delays your doctorate." },
    ],
    ctaTitle: "Not sure which DBA is right for you?",
    ctaPoints: ["Free profile evaluation", "University shortlist in 24 hrs", "No obligation"],
    cta: "Talk to a DBA Expert",
  },
  mba: {
    heading: "Why Choose *eCampus*?",
    description: "Compare, choose and enrol in the right UGC-entitled Online MBA, with expert help at every step.",
    stats: [
      { end: MBA_SPECIALISATIONS.length, suffix: "+", label: "MBA specialisations" },
      { end: 10, prefix: "Upto ", suffix: "%", label: "eCampus fee waiver" },
      { end: 10, prefix: "₹", suffix: "K*", label: "Scholarship on enrolment" },
      { end: 100, suffix: "%", label: "Online, UGC-entitled degree" },
    ],
    benefits: [
      { icon: Scale, accent: "blue", title: "Compare Universities Side by Side", text: "See fees, specialisations and approvals of top UGC-entitled universities in one place." },
      { icon: Headphones, accent: "emerald", title: "Free Expert Counselling", text: "MBA counsellors help you pick the specialisation and university that fit your career plan." },
      { icon: BadgeIndianRupee, accent: "amber", title: "Scholarships & Fee Waiver", text: "Unlock up to 10% eCampus waiver and scholarships on your Online MBA fee." },
      { icon: BriefcaseBusiness, accent: "violet", title: "Placement & Career Support", text: "Resume building, mock interviews and access to the universities' placement drives." },
      { icon: CalendarCheck2, accent: "sky", title: "Easy EMI Options", text: "Pay in simple monthly instalments and keep your savings intact while you study." },
      { icon: GraduationCap, accent: "rose", title: "Support Till You Graduate", text: "A dedicated student-success team for exams, LMS access and queries, from admission to degree." },
    ],
    ctaTitle: "Confused between universities or specialisations?",
    ctaPoints: ["Free career counselling", "Personalised shortlist", "No obligation"],
    cta: "Talk to an MBA Expert",
  },
};

const WHY_CSS = `
  @keyframes lp-why-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-3px) } }
  @keyframes lp-why-sheen { from { transform: translateX(-100%) } to { transform: translateX(100%) } }
  .lp-why-card:hover .lp-why-icon { animation: lp-why-float 1.6s ease-in-out infinite; }
  .lp-why-cta-sheen { animation: lp-why-sheen 6s linear infinite; }
  @media (prefers-reduced-motion: reduce) { .lp-why-card:hover .lp-why-icon, .lp-why-cta-sheen { animation: none; } }
`;

export function LpWhyEcampus({ program }: { program: "dba" | "mba" }) {
  const c = COPY[program];

  return (
    <LpSection className="overflow-hidden">
      <style>{WHY_CSS}</style>

      {/* Faint grid backdrop, fading out towards the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_top,black_35%,transparent_75%)]"
      />

      <div className="relative">
        <LpHeading
          eyebrow={
            <>
              <Sparkles className="h-3.5 w-3.5" /> The eCampus Advantage
            </>
          }
          heading={c.heading}
          description={c.description}
        />

        {/* Stats strip */}
        <LpReveal>
          <dl className="mx-auto mb-6 grid max-w-5xl grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_36px_-28px_rgba(15,23,42,0.45)] sm:mb-8 lg:grid-cols-4">
            {c.stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col-reverse px-4 py-4 text-center sm:py-5 ${i % 2 === 1 ? "border-l border-slate-100" : ""} ${i > 1 ? "border-t border-slate-100 lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
              >
                <dt className="mt-1.5 text-[11.5px] font-semibold text-slate-500 sm:text-xs">{s.label}</dt>
                <dd className="text-[24px] font-black leading-none tracking-tight text-slate-900 sm:text-[28px]">
                  <AnimatedCounter end={s.end} prefix={s.prefix} suffix={s.suffix} duration={1600} />
                </dd>
              </div>
            ))}
          </dl>
        </LpReveal>

        {/* Benefit cards */}
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {c.benefits.map(({ icon: Icon, accent, title, text }, i) => {
            const a = ACCENTS[accent];
            return (
              <LpReveal key={title} delay={i * 0.06}>
                <div
                  className={`lp-why-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 sm:p-6 ${a.glow}`}
                >
                  {/* accent line grows in on hover */}
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r transition-transform duration-500 ease-out group-hover:scale-x-100 ${a.line}`}
                  />
                  <div className="flex items-start justify-between">
                    <span className={`lp-why-icon flex h-12 w-12 items-center justify-center rounded-xl ring-1 ${a.chip}`}>
                      <Icon className="h-[22px] w-[22px]" strokeWidth={2} />
                    </span>
                    <span className="text-xs font-bold tabular-nums text-slate-300 transition-colors duration-300 group-hover:text-slate-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[15.5px] font-bold leading-snug text-slate-900 sm:text-base">{title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-600">{text}</p>
                </div>
              </LpReveal>
            );
          })}
        </div>

        {/* CTA bar — dark, with the only red element of the section */}
        <LpReveal delay={0.1}>
          <div className="relative mt-6 overflow-hidden rounded-2xl bg-slate-900 px-5 py-5 sm:mt-8 sm:px-8 sm:py-6">
            <span aria-hidden className="lp-why-cta-sheen pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            <div className="relative flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-base font-bold text-white sm:text-lg">{c.ctaTitle}</p>
                <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
                  {c.ctaPoints.map((p) => (
                    <li key={p} className="flex items-center gap-1.5 text-[13px] font-medium text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <ApplyNowButton className="group/btn inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-6 text-sm font-bold text-white shadow-[0_10px_24px_-10px_rgba(220,38,38,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 active:translate-y-0 sm:text-[15px] md:w-auto">
                {c.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </ApplyNowButton>
            </div>
          </div>
        </LpReveal>
      </div>
    </LpSection>
  );
}

export default LpWhyEcampus;
