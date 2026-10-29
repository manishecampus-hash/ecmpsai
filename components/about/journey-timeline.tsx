"use client";

import { useEffect, useRef, useState } from "react";
import { BadgeIndianRupee, Boxes, CheckCircle2, Lightbulb, Rocket, Sparkles, TrendingUp, Users, type LucideIcon } from "lucide-react";
import { REVEAL_LEFT, REVEAL_RIGHT, REVEAL_UP } from "./reveal";

type Milestone = { when?: string; points: string[] };
type JourneyYear = { year: string; chapter: string; title: string; milestones: Milestone[]; current?: boolean };

// **text** is shown in bold
const JOURNEY: JourneyYear[] = [
  {
    year: "2017",
    chapter: "The Preface",
    title: "The idea takes shape",
    milestones: [
      {
        when: "Dec 2017",
        points: [
          "A **3-member team** decided to build software after providing **4 years of IT services to universities & colleges**.",
          "The idea was to reduce the pain points of these institutions.",
          "Product conceptualisation begins.",
        ],
      },
    ],
  },
  {
    year: "2018",
    chapter: "The Interlude",
    title: "Building an ed-tech solution",
    milestones: [
      {
        when: "Mar 2018",
        points: [
          "After 3 months of rigorous R&D and consultation with education industry veterans, the team jump-started.",
          "**7 people** embarked on a journey to **build an ed-tech solution** for higher educational institutions.",
          "Our journey of **LMS / ERP product development** begins.",
        ],
      },
    ],
  },
  {
    year: "2019",
    chapter: "The Story",
    title: "eCampus LMS goes live",
    milestones: [
      {
        when: "Jan 2019",
        points: [
          "A **SaaS platform** by the name of **“eCampus LMS”** hits the market (beta version).",
          "Signs its **1st university** contract for a user base of 500.",
          "**Product development** continues with a client-centric approach.",
        ],
      },
    ],
  },
  {
    year: "2020",
    chapter: "The Story",
    title: "Growth and a new family",
    milestones: [
      {
        when: "Jan 2020",
        points: [
          "eCampus signs **10+ universities & colleges across 5 states** in India.",
          "User base expands to **25,000+ active users**.",
          "The eCampus family grows from **7 to 20 members**.",
        ],
      },
      { when: "June 2020", points: ["eCampus achieves **break-even**.", "Product improvement picks up pace."] },
      {
        when: "Dec 2020",
        points: [
          "eCampus is acquired by **Edutra Technologies, powered by Blackboard Education**.",
          "We're now part of a **500+ workforce** organisation.",
        ],
      },
    ],
  },
  {
    year: "2021",
    chapter: "The Future",
    title: "A suite of products",
    milestones: [
      {
        when: "Jan 2021",
        points: [
          "eCampus raised **$250k** from its parent organisation to continue growth & expansion.",
          "Building a suite of products — **eCampus LMS, Edutra CRM, Edutra HRMS, Edutra ERP** and more.",
          "The eCampus family is now a **50+ member** team.",
        ],
      },
      { when: "June 2021", points: ["Expansion and product development continue."] },
    ],
  },
  // TODO(content): placeholder copy for 2022–2025 — replace with the real milestones from the team
  {
    year: "2022 – 25",
    chapter: "The Next Chapter",
    title: "From campuses to learners",
    milestones: [
      {
        points: [
          "Years of working with universities shape a new focus: helping **learners themselves** find the right program.",
          "eCampus grows into a **higher education discovery platform** for students and working professionals.",
        ],
      },
    ],
  },
  {
    year: "2026",
    chapter: "Today",
    title: "Smarter education discovery",
    current: true,
    milestones: [
      {
        points: [
          "Learners explore **online degrees, certifications, executive education and doctoral programs** in one place.",
          "**AI-powered tools** — the AI Degree Finder and KIVO chat — help match programs to each learner's goals.",
          "Free **expert advisors** guide every learner through their next step.",
        ],
      },
    ],
  },
];

// Icon and the headline milestone shown as a badge on each year's card
const YEAR_DETAILS: Record<string, { icon: LucideIcon; highlight: string }> = {
  "2017": { icon: Lightbulb, highlight: "3-member founding team" },
  "2018": { icon: Users, highlight: "7 people building the product" },
  "2019": { icon: Rocket, highlight: "First university signed" },
  "2020": { icon: TrendingUp, highlight: "25,000+ active users" },
  "2021": { icon: BadgeIndianRupee, highlight: "$250k raised · 50+ team" },
  "2022 – 25": { icon: Boxes, highlight: "Learner-first platform" },
  "2026": { icon: Sparkles, highlight: "AI-powered discovery" },
};

function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 ? (
          <strong key={i} className="font-semibold text-gray-900">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

function JourneyCard({ item, active }: { item: JourneyYear; active: boolean }) {
  const { icon: Icon, highlight } = YEAR_DETAILS[item.year] ?? { icon: Sparkles, highlight: "" };
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-white p-6 transition-[border-color,box-shadow] duration-500 hover:border-red-200 sm:p-7 ${
        active ? "border-red-200 shadow-[0_22px_45px_-28px_rgba(220,38,38,0.45)]" : "border-gray-200"
      } ${item.current ? "bg-red-50/30" : ""}`}
    >
      {/* Accent that grows along the top edge once the timeline reaches this year */}
      <span
        aria-hidden
        className={`absolute inset-x-0 top-0 h-[3px] origin-left bg-red-600 transition-transform duration-700 ${active ? "scale-x-100" : "scale-x-0"}`}
      />
      <div className="flex items-start gap-4">
        <span
          className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-colors duration-500 ${
            active ? "bg-red-600 text-white" : "bg-red-50 text-red-600"
          }`}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-red-600">{item.chapter}</span>
            {item.current && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-1 text-[11px] font-bold text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white motion-safe:animate-pulse" />
                Now
              </span>
            )}
          </div>
          <h3 className="mt-1 text-xl font-bold text-gray-900">{item.title}</h3>
        </div>
      </div>
      {highlight && (
        <p className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50/70 px-3 py-1 text-xs font-semibold text-red-700">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden />
          {highlight}
        </p>
      )}

      <div className="mt-4 space-y-4">
        {item.milestones.map((m, i) => (
          <div key={m.when ?? i}>
            {m.when && (
              <p className="mb-2 inline-flex rounded-md bg-gray-100 px-2 py-0.5 text-xs font-bold text-gray-700">{m.when}</p>
            )}
            <ul className="space-y-2">
              {m.points.map((p) => (
                <li key={p} className="flex gap-2.5 text-[14.5px] leading-relaxed text-gray-600">
                  <CheckCircle2 className="mt-[3px] h-4 w-4 flex-shrink-0 text-red-500" aria-hidden />
                  <span>
                    <RichText text={p} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// Vertical timeline: a centre rail that fills in red as you scroll, a dot that lights up for each year,
// the year set large opposite its card, and cards sliding in from alternating sides.
export default function JourneyTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const [reached, setReached] = useState(-1);

  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      // The fill follows a point 60% down the screen
      const marker = window.innerHeight * 0.6 - rect.top;
      const progress = Math.min(1, Math.max(0, marker / rect.height));
      fill.style.transform = `scaleY(${progress})`;
      const dots = list.querySelectorAll<HTMLElement>("[data-dot]");
      let count = -1;
      dots.forEach((dot, i) => {
        if (dot.getBoundingClientRect().top + 8 <= window.innerHeight * 0.6) count = i;
      });
      setReached(count);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ol ref={listRef} className="relative mt-14 lg:mt-20">
      {/* Rail and its scroll-driven fill */}
      <span aria-hidden className="absolute bottom-0 left-[15px] top-0 w-0.5 rounded-full bg-gray-200 lg:left-1/2 lg:-translate-x-1/2" />
      <span
        ref={fillRef}
        aria-hidden
        className="absolute bottom-0 left-[15px] top-0 w-0.5 origin-top rounded-full bg-red-600 lg:left-1/2 lg:-translate-x-1/2"
        style={{ transform: "scaleY(0)" }}
      />

      {JOURNEY.map((item, i) => {
        const cardOnRight = i % 2 === 0;
        const active = i <= reached;
        return (
          <li key={item.year} className="relative pb-12 pl-12 last:pb-0 lg:grid lg:grid-cols-[1fr_64px_1fr] lg:pb-16 lg:pl-0">
            {/* Dot */}
            <span
              data-dot
              aria-hidden
              className={`absolute left-[7px] top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 bg-white transition-all duration-500 lg:static lg:col-start-2 lg:row-start-1 lg:mx-auto lg:mt-8 ${
                active ? "scale-110 border-red-600 shadow-[0_0_0_6px_rgba(220,38,38,0.12)]" : "border-gray-300"
              }`}
            >
              <span className={`h-2 w-2 rounded-full transition-colors duration-500 ${active ? "bg-red-600" : "bg-gray-300"}`} />
            </span>

            {/* Year, opposite the card on desktop and above it on phones */}
            <div
              data-reveal
              className={`${REVEAL_UP} lg:row-start-1 lg:pt-3 ${cardOnRight ? "lg:col-start-1 lg:text-right" : "lg:col-start-3"}`}
            >
              <p
                className={`text-[34px] font-extrabold leading-none tracking-tight transition-colors duration-700 sm:text-[44px] lg:text-[64px] ${
                  active ? "text-red-600" : "text-gray-200"
                }`}
              >
                {item.year}
              </p>
            </div>

            {/* Card */}
            <div
              data-reveal
              className={`${cardOnRight ? REVEAL_RIGHT : REVEAL_LEFT} mt-4 lg:row-start-1 lg:mt-0 ${cardOnRight ? "lg:col-start-3" : "lg:col-start-1"}`}
            >
              <JourneyCard item={item} active={active} />
            </div>
          </li>
        );
      })}
    </ol>
  );
}
