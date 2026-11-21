"use client";

import { useRef } from "react";

import {
  GraduationCap,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BadgeCheck,
  Clock3,
  IndianRupee,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

type UniversityCourse = {
  universityName: string;
  universityShortName: string;
  logo: string;
  program: string;
  degree: string;
  duration: string;
  avgFee: number;
  naacGrade: string;
  ugcApproved: boolean;
  placementRate: number;
  avgSalary: number;
  keyHighlights: string[];
  slug: string;
};

const universityCourses: UniversityCourse[] = [
  {
    universityName: "Amity University Online",
    universityShortName: "Amity",
    logo: "/universities/amity.webp",
    program: "BCA",
    degree: "Bachelor of Computer Applications",
    duration: "3 Years",
    avgFee: 150000,
    naacGrade: "A+",
    ugcApproved: true,
    placementRate: 92,
    avgSalary: 850000,
    keyHighlights: [
      "Full Stack Development",
      "Industry Curriculum",
      "Placement Support",
    ],
    slug: "amity",
  },
  {
    universityName: "Lovely Professional University",
    universityShortName: "LPU",
    logo: "",
    program: "BCA",
    degree: "Bachelor of Computer Applications",
    duration: "3 Years",
    avgFee: 200000,
    naacGrade: "A",
    ugcApproved: true,
    placementRate: 88,
    avgSalary: 780000,
    keyHighlights: [
      "Software Engineering",
      "Strong Tech Programs",
      "200K+ Alumni",
    ],
    slug: "lpu",
  },
  {
    universityName: "Manipal University Online",
    universityShortName: "Manipal",
    logo: "/universities/onlinemanipal.webp",
    program: "MCA",
    degree: "Master of Computer Applications",
    duration: "2 Years",
    avgFee: 180000,
    naacGrade: "A++",
    ugcApproved: true,
    placementRate: 94,
    avgSalary: 920000,
    keyHighlights: [
      "Advanced Programming & AI",
      "Premier Tech University",
      "Top-Tier Placements",
    ],
    slug: "manipal",
  },
  {
    universityName: "Chandigarh University",
    universityShortName: "CU",
    logo: "/universities/Chandigarh-University.webp",
    program: "BCA",
    degree: "Bachelor of Computer Applications",
    duration: "3 Years",
    avgFee: 135000,
    naacGrade: "A+",
    ugcApproved: true,
    placementRate: 85,
    avgSalary: 720000,
    keyHighlights: [
      "Modern Tech Stack",
      "Project-Based Learning",
      "Industry Certifications",
    ],
    slug: "chandigarh",
  },
];

function CourseCard({ course, index }: { course: UniversityCourse; index: number }) {
  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        className="relative h-36 overflow-hidden bg-slate-900 bg-cover"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(15,23,42,.46) 0%, rgba(15,23,42,.15) 58%, rgba(15,23,42,.08) 100%), url('${course.program === "MCA" ? "/degrees/mca.webp" : "/degrees/bca.webp"}')`,
          backgroundPosition: "center 52%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/10" />
        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
            <GraduationCap className="h-3.5 w-3.5" />
            {course.degree.startsWith("Master") ? "Postgraduate" : "Undergraduate"}
          </span>
          <div className="flex flex-col items-end gap-1">
            {course.ugcApproved && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/95 px-2 py-1 text-[9px] font-bold text-emerald-950">
                <CheckCircle2 className="h-2.5 w-2.5" /> UGC Approved
              </span>
            )}
            <span className="rounded-full bg-white/90 px-2 py-1 text-[9px] font-bold text-slate-700">
              NAAC {course.naacGrade}
            </span>
          </div>
        </div>
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-2 text-white">
          <div className="min-w-0">
            <h3 className="text-2xl font-extrabold leading-none tracking-tight">{course.program}</h3>
            <p className="mt-1 text-xs font-medium text-white/85">{course.universityName}</p>
          </div>
          {course.logo ? (
            <span className="inline-flex h-9 max-w-36 shrink-0 items-center rounded-lg bg-white/95 px-2.5 py-1 shadow-sm ring-1 ring-black/5">
              <Image
                src={course.logo}
                alt={`${course.universityName} logo`}
                width={130}
                height={36}
                className="max-h-7 w-auto max-w-32 object-contain"
              />
            </span>
          ) : (
            <span className="inline-flex h-9 shrink-0 items-center gap-1 rounded-lg bg-white px-2.5 shadow-sm ring-1 ring-black/5">
              <span className="text-lg font-black italic tracking-tight text-red-700">LPU</span>
              <span className="text-[8px] font-bold uppercase leading-[1.05] tracking-wide text-slate-600">Lovely<br />Professional</span>
            </span>
          )}
        </div>
      </div>

      <div className="relative flex flex-1 flex-col p-5">
        <p className="min-h-10 text-sm font-semibold leading-5 text-slate-700">{course.degree}</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-sky-100 bg-gradient-to-b from-sky-50 to-white p-2.5 text-center transition-all group-hover:-translate-y-0.5 group-hover:border-sky-200 group-hover:shadow-sm">
            <Clock3 className="mx-auto h-4 w-4 text-sky-600" />
            <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-wider text-slate-500">Duration</p>
            <p className="mt-0.5 text-xs font-bold text-slate-900">{course.duration}</p>
          </div>
          <div className="rounded-xl border border-amber-100 bg-gradient-to-b from-amber-50 to-white p-2.5 text-center transition-all group-hover:-translate-y-0.5 group-hover:border-amber-200 group-hover:shadow-sm">
            <IndianRupee className="mx-auto h-4 w-4 text-amber-600" />
            <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-wider text-slate-500">Fee</p>
            <p className="mt-1 text-xs font-bold text-slate-900">₹{(course.avgFee / 1000).toFixed(0)}K</p>
          </div>
          <div className="rounded-xl border border-emerald-100 bg-gradient-to-b from-emerald-50 to-white p-2.5 text-center transition-all group-hover:-translate-y-0.5 group-hover:border-emerald-200 group-hover:shadow-sm">
            <BriefcaseBusiness className="mx-auto h-4 w-4 text-emerald-600" />
            <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-wider text-slate-500">Placement</p>
            <div className="mt-0.5 flex items-center justify-center gap-0.5">
              <span className="text-xs font-bold text-slate-900">{course.placementRate}%</span>
              <TrendingUp className="h-3 w-3 text-emerald-500" />
            </div>
          </div>
        </div>
        <div className="mt-4 flex-1 space-y-2">
          {course.keyHighlights.map((highlight, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 flex-shrink-0 text-red-500" />
              <span className="text-xs leading-4 text-slate-600">{highlight}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between gap-2 border-t border-slate-100 pt-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-medium text-slate-400">Avg. salary</span>
            <span className="text-base font-extrabold text-slate-900">₹{(course.avgSalary / 100000).toFixed(1)}L</span>
          </div>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-signup"))}
            className="group/btn inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-red-600 px-3.5 py-2.5 text-xs font-bold text-white transition-all duration-200 hover:bg-red-700 hover:shadow-lg active:scale-95"
          >
            Apply Now
            <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-500 to-orange-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}
export function LearnFromSection() {
  const programCarouselRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white pb-8 pt-8 sm:pb-10 sm:pt-10">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 top-10 h-64 w-64 rounded-full bg-red-100/20 blur-3xl" />
        <div className="absolute -left-32 bottom-10 h-64 w-64 rounded-full bg-orange-100/20 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1">
            <Sparkles className="h-3 w-3 text-red-600" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-600">
              University Programs
            </span>
          </div>
          <h2 className="mt-4 whitespace-nowrap text-[clamp(12px,4.2vw,24px)] font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            Degree Programs From Top Universities
          </h2>
          <p className="mx-auto mt-3 max-w-none text-sm leading-6 text-slate-600 sm:text-base md:whitespace-nowrap">
            UGC-approved programs with industry-aligned curriculum and placement support
          </p>
        </div>

        {/* University Courses Grid */}
        <div className="mt-4 flex items-center justify-end gap-1 text-xs font-medium text-slate-500 sm:hidden">
          Swipe to explore programs
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
        <div className="relative mt-3 sm:mt-10">
          <button
            type="button"
            aria-label="Previous programs"
            onClick={() => programCarouselRef.current?.scrollBy({ left: -300, behavior: "smooth" })}
            className="absolute left-1 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-lg backdrop-blur transition hover:bg-red-600 hover:text-white sm:hidden"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div
            ref={programCarouselRef}
            role="region"
            aria-label="Degree programs"
            tabIndex={0}
            className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[8vw] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:items-stretch sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-4"
          >
            {universityCourses.map((course, index) => (
              <div key={course.slug} className="w-[84vw] max-w-[360px] shrink-0 snap-center sm:w-auto sm:max-w-none sm:shrink">
                <CourseCard course={course} index={index} />
              </div>
            ))}
          </div>
          <button
            type="button"
            aria-label="Next programs"
            onClick={() => programCarouselRef.current?.scrollBy({ left: 300, behavior: "smooth" })}
            className="absolute right-1 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-lg backdrop-blur transition hover:bg-red-600 hover:text-white sm:hidden"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <p className="text-xs text-slate-500">Not sure which program is right for you?</p>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-signup"))}
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 transition-colors hover:text-red-700"
          >
            Get Free Career Counseling
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
