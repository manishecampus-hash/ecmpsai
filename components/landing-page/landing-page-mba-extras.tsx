import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpenCheck,
  CalendarCheck,
  Clock3,
  GraduationCap,
  IndianRupee,
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
import { AnimatedCounter } from "./animated-counter";

/* ============================================================
   Online MBA landing-page sections.
   Content comes from the "online-mba" course in the CMS
   (GET /root-courses/online-mba) and is rendered only on MBA pages.
============================================================ */

/**
 * Online MBA landing page syllabus (static — overrides the CMS semesters on /lp pages).
 * Subjects are listed as-is, so names containing commas stay whole.
 */
export const MBA_LP_SEMESTERS: { number: string; title: string; subjects: string[] }[] = [
  {
    number: "01",
    title: "Semester 01",
    subjects: [
      "Managerial Economics",
      "Statistics for Management",
      "Professional communication",
      "Accounting for Managers",
      "Marketing Management",
    ],
  },
  {
    number: "02",
    title: "Semester 02",
    subjects: [
      "Legal Aspects of Business",
      "Business Research Methods",
      "Financial Management",
      "Human Resource Management",
      "Conflict Resolution and Management",
    ],
  },
  {
    number: "03",
    title: "Semester 03",
    subjects: [
      "Strategic Management",
      "Minor Project",
      "Professional Ethics",
      "Specialization Elective 1",
      "Specialization Elective 2",
      "Specialization Elective 3",
      "Specialization Elective 4",
    ],
  },
  {
    number: "04",
    title: "Semester 04",
    subjects: [
      "Major Project",
      "Management in Action: Social, Economic and Ethical Issues",
      "Digital Marketing",
      "AI Tools and Applications",
      "Specialization Elective 1",
      "Specialization Elective 2",
    ],
  },
];

/** Specialisations for the form dropdown — shared data, see data/form-courses.ts */
export { MBA_SPECIALISATIONS } from "@/data/form-courses";

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
      /** `subjects` (exact list) wins over `text` (comma-separated) when both are present */
      semesters?: { number?: string; title?: string; text?: string; subjects?: string[] }[];
    };
    processFlow?: { heading?: string; subHeading?: string; steps?: { title: string; description: string }[] };
    supportDesk?: { faqs?: { question: string; answer: string }[] };
    courseOffer?: { categories?: { name: string; items?: string[] }[] };
    courseFees?: { rows?: { university?: string; fee?: string }[] };
    about?: { heading?: string; description?: string };
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
    <LpSection tone="muted">
      <LpHeading
        eyebrow={
          <>
            <Trophy className="h-3.5 w-3.5" /> UGC-Entitled Universities
          </>
        }
        heading="Top Online MBA *Universities*"
        description="Compare leading UGC-entitled universities offering a 2-year Online MBA for working professionals and graduates."
        descriptionClassName="text-[clamp(13px,3.2vw,15px)] tracking-[-0.01em] sm:tracking-normal"
      />

      <p className="-mt-3 mb-5 text-center text-xs font-semibold text-slate-500 sm:hidden">
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
          
          // Load first 6 images eagerly, rest lazy
          const shouldLoadEager = i < 6;

          return (
            <LpReveal
              key={u.id || u.name}
              delay={Math.min(i, 5) * 0.07}
              duration={0.75}
              distance={8}
              className="w-[85%] shrink-0 snap-start max-sm:![animation:none] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border-2 border-slate-200 bg-white shadow-[0_8px_24px_-16px_rgba(15,23,42,0.3)] transition-all duration-400 will-change-transform hover:-translate-y-1.5 hover:border-red-600 hover:shadow-[0_20px_40px_-20px_rgba(220,38,38,0.4)] hover:z-10">
                {/* Logo stage */}
                <div className="relative flex h-32 items-center justify-center border-b-2 border-slate-100 bg-gradient-to-br from-slate-50 to-white px-6">
                  {u.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={u.logoUrl}
                      alt={`${u.name} logo`}
                      loading={shouldLoadEager ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={shouldLoadEager ? "high" : "auto"}
                      className="relative max-h-16 w-auto max-w-[80%] object-contain transition-transform duration-400 group-hover:scale-105"
                    />
                  ) : (
                    <span className="relative text-3xl font-black text-slate-300">{u.name.charAt(0)}</span>
                  )}
                  <span className="absolute left-4 top-4 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                    Online MBA
                  </span>
                  {u.ugcApproval !== false && (
                    <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-200">
                      <BadgeCheck className="h-3 w-3" /> UGC
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                  <h3 className="line-clamp-2 min-h-[48px] text-[17px] font-bold leading-snug tracking-[-0.02em] text-slate-900 transition-colors duration-300 group-hover:text-red-700">
                    {u.name.trim()}
                  </h3>

                  <div className="my-3.5 h-px bg-gradient-to-r from-slate-300 via-slate-200 to-transparent" />
                  
                  <ul className="grid flex-1 grid-cols-1 content-start gap-y-2.5 text-[13px] font-medium text-slate-700">
                    {meta.map(({ icon: Icon, text, tone }) => (
                      <li key={text} className="flex min-w-0 items-center gap-2.5">
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-105 ${tone}`}>
                          <Icon className="h-4 w-4" strokeWidth={2.2} />
                        </span>
                        <span className="truncate">{text}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 grid grid-cols-2 gap-2.5">
                    {href ? (
                      <Link
                        href={href}
                        className="flex h-11 items-center justify-center gap-1.5 rounded-xl border-2 border-slate-200 bg-white text-sm font-bold text-slate-700 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50"
                      >
                        View
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <span />
                    )}
                    <ApplyNowButton
                      className={`group/btn flex h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-red-600 bg-red-600 text-sm font-bold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-lg ${
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
    .filter((sem) => sem && (sem.title || sem.text || sem.subjects?.length))
    .map((sem, i) => ({
      number: sem.number || String(i + 1).padStart(2, "0"),
      title: sem.title || `Semester ${i + 1}`,
      yearLabel: i < 2 ? "Year 1 · Foundation" : "Year 2 · Specialisation",
      subjects: sem.subjects?.length
        ? sem.subjects
        : (sem.text || "").split(/,\s*/).map((t) => t.trim()).filter(Boolean),
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
              Speak with an MBA program advisor to compare universities, fees and specialisations for your goals.
            </p>
          </div>
          <ApplyNowButton className="group relative mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-bold text-red-600 shadow-lg transition hover:bg-red-50 lg:mt-0 lg:shrink-0">
            Talk with Program Advisor
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

/* ------------------------------------------------------------
   10. Key programme info (batch · duration · fee · eligibility)
------------------------------------------------------------ */
export function MbaKeyInfo({ course, tone = "muted" }: { course: MbaCourseData; tone?: "white" | "muted" }) {
  const semesters = course.details?.syllabus?.semesters?.length || 4;
  const cards: {
    label: string;
    value: string;
    subtitle?: string;
    lines: string[];
    link?: { text: string; href: string };
  }[] = [
    { 
      label: "BATCH STARTS", 
      value: "Admissions Open", 
      subtitle: "Limited Seats",
      lines: [] 
    },
    { 
      label: "DURATION", 
      value: `Duration : ${course.duration || "2 Years"}`, 
      lines: [
        `No. of Semesters : ${semesters}`,
        `Programme Completion Validity : ${Math.ceil(semesters / 2) * 2} Years`
      ]
    },
    {
      label: "PROGRAMME FEE",
      value: "Starting at ₹15,000 / Semester",
      lines: [
        `No. of Semesters : ${semesters}`,
        "No Cost EMI Option Available"
      ],
      link: { text: "Detailed Fee Structure & EMI Options", href: "#programs" },
    },
    { 
      label: "ELIGIBILITY", 
      value: course.eligibility || "Graduate",
      lines: [
        "Graduate with minimum 50%"
      ],
      link: { text: "Detailed Programme Eligibility", href: "#lp-overview" }
    },
  ];

  return (
    <LpSection tone={tone}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {cards.map((c, i) => (
          <LpReveal key={c.label} delay={i * 0.07}>
            <div className="flex h-full flex-col rounded-xl bg-[#f5f5f5] px-5 pb-5 pt-6 text-center">
              {/* Label */}
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                {c.label}
              </p>

              {/* Main Value */}
              <h3 className="mt-3 text-[17px] font-bold leading-tight text-red-700 sm:text-[19px]">
                {c.value}
              </h3>

              {/* Subtitle if exists */}
              {c.subtitle && (
                <p className="mt-1 text-[13px] font-medium text-slate-900">
                  {c.subtitle}
                </p>
              )}

              {/* Additional lines */}
              {c.lines.length > 0 && (
                <div className="mt-3 space-y-1 text-[13px] leading-relaxed text-slate-900">
                  {c.lines.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              )}

              {/* Link if exists */}
              {c.link && (
                <a
                  href={c.link.href}
                  className="mt-auto inline-block pt-3 text-[12px] font-semibold text-red-700 underline-offset-2 hover:underline"
                >
                  {c.link.text}
                </a>
              )}
            </div>
          </LpReveal>
        ))}
      </div>
    </LpSection>
  );
}

/* ------------------------------------------------------------
   11. About the Online MBA + recognitions & numbers
------------------------------------------------------------ */
const RECOGNITIONS = [
  { name: "NAAC Accreditation", logo: "https://ecampus-admin-ui.b-cdn.net/blogs/untitled-design-57--1788867779015-l35op5.png" },
  { name: "Association of Indian Universities (AIU)", logo: "https://ecampus-admin-ui.b-cdn.net/blogs/untitled-design-24-1--1789639165318-xbov6h.svg" },
  { name: "NIRF Ranking", logo: "https://ecampus-admin-ui.b-cdn.net/blogs/2-1788867466527-xddkkk.png" },
  { name: "University Grants Commission (UGC)", logo: "https://ecampus-admin-ui.b-cdn.net/blogs/untitled-design-56--1788866561905-fbg2j0.png" },
];

/** First two paragraphs of the CMS "about" HTML */
const firstParagraphs = (html?: string, count = 2) => (html || "").match(/<p[\s\S]*?<\/p>/gi)?.slice(0, count).join("") || "";

export function MbaAboutWhy({
  course,
  universityCount,
  specializationCount,
  tone = "white",
}: {
  course: MbaCourseData;
  universityCount: number;
  specializationCount: number;
  tone?: "white" | "muted";
}) {
  const about = firstParagraphs(course.details?.about?.description);
  const stats = [
    universityCount > 0 && { value: universityCount, label: "UGC-Entitled Universities", suffix: "+" },
    specializationCount > 0 && { value: specializationCount, label: "MBA Specialisations", suffix: "+" },
    { value: course.details?.syllabus?.semesters?.length || 4, label: "Semesters in 2 Years", suffix: "" },
    { value: 100, label: "Online Learning", suffix: "%" },
  ].filter(Boolean) as { value: number; label: string; suffix: string }[];

  return (
    <LpSection tone={tone}>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Left: about */}
        <LpReveal>
          <h2 className="text-[26px] font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Online <span className="text-red-600">MBA</span>
          </h2>
          <div className="mt-5 space-y-3 text-[14px] leading-relaxed text-slate-600 sm:mt-6 sm:text-[15.5px]">
            <p className="border-l-4 border-red-600 pl-4 font-medium sm:pl-5">
              An <strong className="font-bold text-slate-900">Online MBA</strong> is a flexible, career-focused postgraduate degree designed for working professionals and recent graduates seeking management expertise without pausing their careers.
            </p>
            <p>
              The program combines <strong className="font-semibold text-slate-900">live interactive sessions</strong>, self-paced learning, and practical business insights, preparing you for leadership roles across industries.
            </p>
          </div>
        </LpReveal>

        {/* Right: recognitions + numbers */}
        <LpReveal delay={0.1}>
          <h2 className="text-[26px] font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-center">
            Recognised &amp; <span className="text-red-600">Trusted</span>
          </h2>
          <div className="mt-5 grid grid-cols-4 items-center gap-3 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200/80 sm:mt-6 sm:gap-4 sm:p-6">
            {RECOGNITIONS.map((r) => (
              <div key={r.name} className="group flex flex-col items-center text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.logo}
                  alt={r.name}
                  loading="lazy"
                  className="h-16 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105 sm:h-20 lg:h-24"
                />
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-[11px] text-slate-400">Approvals and rankings vary by university.</p>

          <div className="mt-6 grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-x-3">
            {stats.map((st) => (
              <div key={st.label} className="text-center">
                <p className="text-[26px] font-extrabold leading-none tracking-tight text-slate-900 sm:text-[30px]">
                  <AnimatedCounter end={st.value} duration={2000} suffix={st.suffix} />
                </p>
                <p className="mt-1.5 text-[12.5px] leading-snug text-slate-600 sm:text-[13.5px]">{st.label}</p>
              </div>
            ))}
          </div>
        </LpReveal>
      </div>
    </LpSection>
  );
}
