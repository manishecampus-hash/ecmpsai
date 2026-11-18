import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpenCheck,
  ClipboardCheck,
  FileCheck2,
  Landmark,
  Layers,
  MailCheck,
  MapPin,
  Send,
  CalendarClock,
  Sparkles,
  TrendingUp,
  Trophy,
  WalletCards,
  UploadCloud,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { ApplyNowButton } from "@/components/form/apply-now-modal";
import ProgramsCarousel from "@/components/online-dba/programs-carousel";
import { LpHeading, LpReveal, LpSection } from "./lp-ui";
import MbaSemesterTabs from "./mba-semester-tabs";
import MbaSpecExplorer from "./mba-spec-explorer";
import MbaAudience from "./mba-audience";

/* ============================================================
   Online MBA landing-page sections.
   Content comes from the "online-mba" course in the CMS
   (GET /root-courses/online-mba) and is rendered only on MBA pages.
============================================================ */

export interface MbaUniversity {
  id?: string;
  name: string;
  slug?: string;
  logoUrl?: string;
  location?: string;
  nirfRanking?: string;
  establishmentYear?: number | string;
  ugcApproval?: boolean;
  wesApproval?: boolean;
}

export interface MbaCourseData {
  duration?: string;
  mode?: string;
  eligibility?: string;
  associatedUniversities?: MbaUniversity[];
  details?: {
    eligibility?: { eligCriteria?: string; durationText?: string; eligNote?: string };
    specializations?: { heading?: string; items?: { key: string; value: string }[] };
    syllabus?: {
      journeyBadge?: string;
      journeyTitle?: string;
      journeySubtitle?: string;
      semesters?: { number?: string; title?: string; text?: string }[];
    };
    processFlow?: { heading?: string; subHeading?: string; steps?: { title: string; description: string }[] };
    supportDesk?: { faqs?: { question: string; answer: string }[] };
    courseOffer?: { categories?: { name: string; items?: string[] }[] };
  };
}

const universityHref = (slug?: string) => {
  const clean = (slug || "").replace(/^\/?(university|universities)\//i, "").replace(/^\/+|\/+$/g, "");
  return clean ? `/universities/${clean}` : null;
};

/** "10" → "NIRF Rank #10"; band text kept as-is; "N/A" / empty → null */
const nirfLabel = (raw?: string) => {
  const text = (raw || "").trim();
  if (!text || /^n\/?a$/i.test(text)) return null;
  if (/^#?\d+$/.test(text)) return `NIRF Rank #${text.replace("#", "")}`;
  return `NIRF ${text.replace(/^nirf\s*/i, "")}`;
};

/* ------------------------------------------------------------
   2. Top Online MBA Universities (cards + mobile carousel)
------------------------------------------------------------ */
export function MbaUniversities({ universities }: { universities: MbaUniversity[] }) {
  const list = universities.filter((u) => u && u.name);
  if (list.length === 0) return null;

  return (
    <LpSection>
      <LpHeading
        eyebrow={
          <>
            <Trophy className="h-3.5 w-3.5" /> UGC-Entitled Universities
          </>
        }
        heading="Top Online *MBA Universities*"
        description="Compare leading UGC-entitled universities offering a 2-year Online MBA for working professionals and graduates."
        descriptionClassName="text-[clamp(11px,3vw,15px)] tracking-[-0.01em] sm:tracking-normal"
      />

      <p className="-mt-3 mb-4 text-center text-xs font-semibold text-slate-500 sm:hidden">
        {`Swipe to see all ${list.length} universities →`}
      </p>

      <ProgramsCarousel count={list.length}>
        {list.map((u, i) => {
          const href = universityHref(u.slug);
          const nirf = nirfLabel(u.nirfRanking);
          const meta: { icon: LucideIcon; text: string; tone: string }[] = [
            u.location && { icon: MapPin, text: u.location, tone: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100" },
            nirf && { icon: Trophy, text: nirf, tone: "bg-amber-50 text-amber-600 ring-1 ring-amber-100" },
            u.establishmentYear && {
              icon: Landmark,
              text: `Established ${u.establishmentYear}`,
              tone: "bg-blue-50 text-blue-600 ring-1 ring-blue-100",
            },
          ].filter(Boolean) as { icon: LucideIcon; text: string; tone: string }[];

          return (
            <LpReveal
              key={u.id || u.name}
              delay={Math.min(i, 5) * 0.07}
              duration={0.75}
              distance={8}
              className="w-[82%] shrink-0 snap-start max-sm:![animation:none] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-slate-200 border-t-[3px] border-t-red-600 bg-white shadow-[0_8px_24px_-18px_rgba(15,23,42,0.3)] transition duration-500 hover:-translate-y-0.5 hover:border-slate-300 hover:border-t-red-600 hover:shadow-[0_18px_34px_-22px_rgba(15,23,42,0.32)]">
                {/* Logo stage */}
                <div className="relative flex h-32 items-center justify-center overflow-hidden border-b border-slate-100 bg-slate-50/70 px-6">
                  {u.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={u.logoUrl}
                      alt={`${u.name} logo`}
                      loading="lazy"
                      className="relative max-h-16 w-auto max-w-[78%] object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <span className="relative text-2xl font-black text-slate-300">{u.name.charAt(0)}</span>
                  )}
                  <span className="absolute left-4 top-4 rounded-full border border-red-100 bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-red-700 backdrop-blur">
                    Online MBA
                  </span>
                  {u.ugcApproval !== false && (
                    <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-100">
                      <BadgeCheck className="h-3 w-3" /> UGC
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                  <h3 className="line-clamp-2 min-h-[48px] text-[17px] font-bold leading-snug tracking-[-0.02em] text-slate-900 transition-colors group-hover:text-red-700">
                    {u.name.trim()}
                  </h3>

                  <div className="my-3 h-px bg-gradient-to-r from-slate-200 via-slate-100 to-transparent" />
                  <ul className="grid flex-1 grid-cols-1 content-start gap-y-2.5 text-[12.5px] font-medium text-slate-600">
                    {meta.map(({ icon: Icon, text, tone }) => (
                      <li key={text} className="flex min-w-0 items-center gap-2.5">
                        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${tone}`}>
                          <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                        </span>
                        <span className="truncate">{text}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 grid grid-cols-2 gap-2.5">
                    {href ? (
                      <Link
                        href={href}
                        className="flex h-11 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
                      >
                        View
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <span />
                    )}
                    <ApplyNowButton
                      className={`group/btn flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 text-sm font-bold text-red-700 transition-colors duration-300 hover:border-red-700 hover:bg-red-700 hover:text-white group-hover:border-red-700 group-hover:bg-red-700 group-hover:text-white ${
                        href ? "" : "col-span-2"
                      }`}
                    >
                      Apply Now
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </ApplyNowButton>
                  </div>
                </div>
              </article>
            </LpReveal>
          );
        })}
      </ProgramsCarousel>
    </LpSection>
  );
}

/* ------------------------------------------------------------
   3. Specialisations & careers — interactive explorer (one panel, less text)
------------------------------------------------------------ */
export function MbaSpecializations({
  items,
  tone = "muted",
}: {
  items: { key: string; value: string }[];
  tone?: "white" | "muted";
}) {
  const list = items.filter((s) => s && s.key);
  if (list.length === 0) return null;

  return (
    <LpSection tone={tone}>
      <LpHeading
        eyebrow={
          <>
            <Layers className="h-3.5 w-3.5" /> Specialisations &amp; Careers
          </>
        }
        heading="Choose Your *MBA Specialisation*"
        description="Tap a track to see what you’ll learn and the roles it leads to."
      />
      <MbaSpecExplorer items={list} />
    </LpSection>
  );
}

/* ------------------------------------------------------------
   4. Two-year journey — semester switcher (one panel instead of four cards)
------------------------------------------------------------ */
export function MbaSyllabus({
  syllabus,
  tone = "muted",
}: {
  syllabus: NonNullable<NonNullable<MbaCourseData["details"]>["syllabus"]>;
  tone?: "white" | "muted";
}) {
  const semesters = (syllabus.semesters || [])
    .filter((sem) => sem && (sem.title || sem.text))
    .map((sem, i) => ({
      number: sem.number || String(i + 1).padStart(2, "0"),
      title: sem.title || `Semester ${i + 1}`,
      yearLabel: i < 2 ? "Year 1 · Foundation" : "Year 2 · Specialisation",
      subjects: (sem.text || "").split(/,\s*/).map((t) => t.trim()).filter(Boolean),
    }));
  if (semesters.length === 0) return null;

  return (
    <LpSection tone={tone}>
      <LpHeading
        eyebrow={
          <>
            <BookOpenCheck className="h-3.5 w-3.5" /> {syllabus.journeyBadge || "Programme Structure"}
          </>
        }
        heading="Your 2-Year *MBA Journey*"
        description={syllabus.journeySubtitle || "From business foundations to specialization."}
      />
      <MbaSemesterTabs semesters={semesters} />
      <p className="mt-5 text-center text-xs text-slate-500">
        Indicative structure — exact subjects vary by university and specialisation.
      </p>
    </LpSection>
  );
}

/* ------------------------------------------------------------
   5. Admission process
------------------------------------------------------------ */
const STEP_ICONS: LucideIcon[] = [ClipboardCheck, Send, UploadCloud, FileCheck2, MailCheck];

export function MbaAdmissionJourney({
  steps,
  description,
  tone = "white",
}: {
  steps: { title: string; description: string }[];
  description?: string;
  tone?: "white" | "muted";
}) {
  const list = steps.filter((s) => s && s.title);
  if (list.length === 0) return null;

  return (
    <LpSection tone={tone}>
      <LpHeading
        heading="Online MBA *Admission Process*"
        description={description || "Simple steps from choosing a university to receiving your offer letter."}
      />
      {/* Numbered timeline — vertical on phones/tablets, horizontal on desktop. No boxes. */}
      <ol
        className={`relative mx-auto max-w-2xl lg:grid lg:max-w-none lg:gap-6 ${
          list.length >= 5 ? "lg:grid-cols-5" : list.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
        }`}
      >
        {/* desktop connector through the numbers */}
        {list.length > 1 && (
          <span
            aria-hidden
            className="pointer-events-none absolute top-7 hidden h-[3px] rounded-full bg-gradient-to-r from-red-600 via-rose-300 to-emerald-400 lg:block"
            style={{ left: `${50 / list.length}%`, right: `${50 / list.length}%` }}
          />
        )}

        {list.map((step, i) => {
          const Icon = STEP_ICONS[i % STEP_ICONS.length];
          const title = step.title.replace(/^step\s*\d+\s*[:.-]\s*/i, "");
          const isLast = i === list.length - 1;
          const num = String(i + 1).padStart(2, "0");
          return (
            <li key={step.title} className="relative">
              <LpReveal
                delay={i * 0.08}
                className="group relative grid grid-cols-[56px_minmax(0,1fr)] gap-x-4 lg:flex lg:flex-col lg:items-center lg:text-center"
              >
                {/* number + vertical connector (phones/tablets) */}
                <div className="relative flex flex-col items-center">
                  <span
                    className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-black text-white ring-[5px] transition-transform duration-300 group-hover:scale-105 ${
                      tone === "muted" ? "ring-slate-50" : "ring-white"
                    } ${
                      isLast
                        ? "bg-gradient-to-br from-emerald-500 to-teal-500 shadow-[0_10px_24px_-8px_rgba(16,185,129,0.65)]"
                        : "bg-gradient-to-br from-red-600 to-rose-500 shadow-[0_10px_24px_-8px_rgba(220,38,38,0.65)]"
                    }`}
                  >
                    {num}
                  </span>
                  {!isLast && (
                    <span
                      aria-hidden
                      className="mt-1 w-[3px] flex-1 rounded-full bg-gradient-to-b from-red-400 to-rose-200 lg:hidden"
                    />
                  )}
                </div>

                {/* text */}
                <div className={`pt-1.5 ${isLast ? "pb-0" : "pb-8"} lg:mt-5 lg:pb-0 lg:pt-0`}>
                  <p
                    className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider ${
                      isLast ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={2.4} />
                    {isLast ? "Final Step" : `Step ${num}`}
                  </p>
                  <h3 className="mt-1 text-[15.5px] font-bold leading-snug text-slate-900 sm:text-base">{title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600 sm:text-sm">{step.description}</p>
                </div>
              </LpReveal>
            </li>
          );
        })}
      </ol>
    </LpSection>
  );
}

/* ------------------------------------------------------------
   6. Closing call to action
------------------------------------------------------------ */
export function MbaFinalCta() {
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
            <h2 className="mt-3 whitespace-nowrap text-[clamp(16px,4.6vw,24px)] font-extrabold leading-tight text-white sm:whitespace-normal sm:text-3xl">
              Ready to lead with an MBA?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-red-50 sm:text-base">
              Talk to an MBA counsellor to compare universities, fees and specialisations for your goals.
            </p>
          </div>
          <ApplyNowButton className="group relative mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-bold text-red-600 shadow-lg transition hover:bg-red-50 lg:mt-0 lg:shrink-0">
            Talk to a Counsellor
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </ApplyNowButton>
        </div>
      </LpReveal>
    </section>
  );
}

/* ------------------------------------------------------------
   7. Built for graduates & working professionals (switchable)
------------------------------------------------------------ */
export function MbaAudienceSection({ tone = "muted" }: { tone?: "white" | "muted" }) {
  return (
    <LpSection tone={tone}>
      <LpHeading
        eyebrow={
          <>
            <Users className="h-3.5 w-3.5" /> Made For You
          </>
        }
        heading="Built for *Graduates & Professionals*"
        description="See how an Online MBA fits where you are in your career today."
      />
      <MbaAudience />
    </LpSection>
  );
}

/* ------------------------------------------------------------
   9. What an Online MBA offers — icon pillars, one line each (CMS: course "courseOffer")
------------------------------------------------------------ */
const offerIcon = (name: string): LucideIcon => {
  const n = name.toLowerCase();
  if (n.includes("cost") || n.includes("fee")) return WalletCards;
  if (n.includes("flex")) return CalendarClock;
  if (n.includes("network")) return Users;
  if (n.includes("professional") || n.includes("career")) return TrendingUp;
  if (n.includes("personal")) return Sparkles;
  return BadgeCheck;
};

export function MbaOffers({
  categories,
  tone = "white",
}: {
  categories: { name: string; items?: string[] }[];
  tone?: "white" | "muted";
}) {
  const list = categories.filter((c) => c && c.name && c.items?.length);
  if (list.length === 0) return null;

  return (
    <LpSection tone={tone}>
      <LpHeading
        eyebrow={
          <>
            <Sparkles className="h-3.5 w-3.5" /> Why Go Online
          </>
        }
        heading="Why Choose an *Online MBA*"
        description="Five reasons busy learners pick the online route."
      />
      <div className="relative">
        {/* thread connecting the icons on desktop */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-[10%] right-[10%] top-8 hidden border-t-2 border-dashed border-red-200 lg:block"
        />
        <ul className="relative grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-5">
          {list.map((c, i) => {
            const Icon = offerIcon(c.name);
            const spanFull = list.length % 2 === 1 && i === list.length - 1;
            return (
              <li key={c.name} className={spanFull ? "col-span-2 sm:col-span-1" : ""}>
                <LpReveal delay={i * 0.08} className="group flex flex-col items-center text-center">
                  <span
                    className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-red-600 shadow-[0_12px_28px_-14px_rgba(220,38,38,0.55)] ring-1 ring-red-100 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-gradient-to-br group-hover:from-red-600 group-hover:to-rose-500 group-hover:text-white group-hover:ring-transparent`}
                  >
                    <Icon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.9} />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white ring-2 ring-white">
                      {i + 1}
                    </span>
                  </span>
                  <h3 className="mt-4 text-[15px] font-bold leading-snug text-slate-900">{c.name}</h3>
                  <p className="mt-1 max-w-[220px] text-[13px] leading-snug text-slate-500">{c.items![0]}</p>
                </LpReveal>
              </li>
            );
          })}
        </ul>
      </div>
    </LpSection>
  );
}
