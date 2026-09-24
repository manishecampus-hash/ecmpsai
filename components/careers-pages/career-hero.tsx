"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Rocket,
  Star,
  Download,
  BookOpen,
  Code2,
  LayoutGrid,
  Users,
  UserRound,
  Mail,
  ChevronDown,
  ShieldCheck,
  Zap,
  Check,
  type LucideIcon,
} from "lucide-react";

type FeatureIcon = "stack" | "apps" | "mentor";

const FEATURE_ICONS: Record<FeatureIcon, LucideIcon> = {
  stack: Code2,
  apps: LayoutGrid,
  mentor: Users,
};

type Country = { code: string; name: string; dial: string; length: number };

const COUNTRIES: Country[] = [
  { code: "IN", name: "India", dial: "91", length: 10 },
  { code: "US", name: "United States", dial: "1", length: 10 },
  { code: "GB", name: "United Kingdom", dial: "44", length: 10 },
  { code: "CA", name: "Canada", dial: "1", length: 10 },
  { code: "AU", name: "Australia", dial: "61", length: 9 },
  { code: "AE", name: "UAE", dial: "971", length: 9 },
  { code: "SG", name: "Singapore", dial: "65", length: 8 },
  { code: "DE", name: "Germany", dial: "49", length: 11 },
];

type CareerHeroProps = {
  hero: {
    badge: string;
    heading: string;
    headingHighlight?: string;
    description: string;
    image?: string;
    salary: string;
    duration: string;
    features?: readonly {
      icon: FeatureIcon;
      title: string;
      description: string;
    }[];
    ratingText?: string;
    placementText?: string;
    report?: {
      candidateCtc: string;
      placementWindow: string;
      careerGoals: readonly string[];
    };
  };
};

function CareerGoalDropdown({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex h-11 w-full items-center justify-between rounded-xl border bg-white px-3.5 text-left text-sm text-gray-900 shadow-sm transition-all ${
          open
            ? "border-red-400 ring-2 ring-red-100"
            : "border-gray-200 hover:border-red-200 hover:shadow-md"
        }`}
      >
        <span className="truncate">{value}</span>
        <span
          className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
            open ? "bg-red-50 text-red-600" : "text-gray-400"
          }`}
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-2xl border border-gray-100 bg-white p-1.5 shadow-xl shadow-gray-200/60">
          {options.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => {
                onChange(g);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors ${
                g === value
                  ? "bg-red-50 font-semibold text-red-600"
                  : "text-gray-700 hover:bg-red-50/60 hover:text-red-600"
              }`}
            >
              <span className="truncate">{g}</span>
              {g === value && (
                <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-red-600 text-white">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CountryDropdown({
  value,
  onChange,
}: {
  value: Country;
  onChange: (c: Country) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative flex-shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex h-full items-center gap-1.5 rounded-l-xl border-r px-3 text-sm font-semibold transition-colors ${
          open ? "border-red-200 bg-red-50 text-red-600" : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
        }`}
      >
        {value.code} +{value.dial}
        <ChevronDown
          className={`h-3.5 w-3.5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-20 w-56 overflow-hidden rounded-2xl border border-gray-100 bg-white p-1.5 shadow-xl shadow-gray-200/60">
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => {
                onChange(c);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors ${
                c.code === value.code
                  ? "bg-red-50 font-semibold text-red-600"
                  : "text-gray-700 hover:bg-red-50/60 hover:text-red-600"
              }`}
            >
              <span className="truncate">{c.name}</span>
              <span className="flex-shrink-0 text-xs text-gray-400">+{c.dial}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AICareerReportCard({
  report,
}: {
  report: NonNullable<CareerHeroProps["hero"]["report"]>;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState(report.careerGoals[0] ?? "");
  const [submitted, setSubmitted] = useState(false);

  const isValid =
    name.trim().length > 1 &&
    /^\S+@\S+\.\S+$/.test(email) &&
    phone.replace(/\D/g, "").length === country.length;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setSubmitted(true);
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Glow */}
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-red-100 via-white to-blue-100 blur-2xl" />

      <div className="relative w-full overflow-hidden rounded-[1.75rem] border border-gray-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
        <div className="h-1.5 w-full bg-red-600" />

        <div className="p-5 sm:p-6">
          <h2 className="text-center text-lg font-bold leading-snug text-gray-900 sm:text-xl">
            Get Personalized AI Career Report
          </h2>

          {submitted ? (
            <div className="mt-5 flex flex-col items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-7 text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Check className="h-5 w-5" />
              </span>
              <p className="text-sm font-semibold text-emerald-800">
                Your report is on its way!
              </p>
              <p className="text-xs text-emerald-700">
                We&apos;ll send it to your WhatsApp within moments.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Full Name
                </label>
                <div className="flex h-11 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 transition-colors focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100">
                  <UserRound className="h-4 w-4 flex-shrink-0 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Arjun Sharma"
                    className="w-full min-w-0 rounded-none border-0 bg-transparent p-0 text-sm text-gray-900 outline-none focus:border-0 focus:bg-transparent focus:shadow-none focus:outline-none focus:ring-0"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Email Address
                </label>
                <div className="flex h-11 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 transition-colors focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100">
                  <Mail className="h-4 w-4 flex-shrink-0 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. arjun@email.com"
                    className="w-full min-w-0 rounded-none border-0 bg-transparent p-0 text-sm text-gray-900 outline-none focus:border-0 focus:bg-transparent focus:shadow-none focus:outline-none focus:ring-0"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Phone Number
                </label>
                <div className="flex h-11 items-stretch overflow-visible rounded-xl border border-gray-200 bg-white transition-colors focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100">
                  <CountryDropdown
                    value={country}
                    onChange={(c) => {
                      setCountry(c);
                      setPhone("");
                    }}
                  />
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, "").slice(0, country.length))
                    }
                    placeholder={`${country.length}-digit number`}
                    className="w-full min-w-0 rounded-r-xl border-0 bg-transparent px-3.5 py-0 text-sm text-gray-900 outline-none focus:border-0 focus:bg-transparent focus:shadow-none focus:outline-none focus:ring-0"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Current Career Goal
                </label>
                <CareerGoalDropdown
                  value={goal}
                  onChange={setGoal}
                  options={report.careerGoals}
                />
              </div>

              <button
                type="submit"
                disabled={!isValid}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-red-600 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-xl disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none"
              >
                Download Report &amp; Syllabus (Instant)
                <Download className="h-4 w-4" />
              </button>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  100% Privacy Ensured
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-red-500" />
                  Instant WhatsApp Delivery
                </span>
              </div>
            </form>
          )}
        </div>

        <div className="grid grid-cols-2 divide-x divide-gray-100 border-t border-gray-100 bg-gray-50/70">
          <div className="px-5 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
              Median Graduate CTC
            </p>
            <p className="mt-0.5 text-base font-bold text-gray-900">
              {report.candidateCtc}
            </p>
          </div>
          <div className="px-5 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
              Avg Placement Window
            </p>
            <p className="mt-0.5 text-base font-bold text-emerald-600">
              {report.placementWindow}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CareerHero({ hero }: CareerHeroProps) {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-red-50/70 blur-3xl" />
        <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
      </div>

      {/* Main Container */}
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 pt-10 sm:px-8 sm:pb-16 sm:pt-14 lg:px-10 lg:pb-20 lg:pt-16">
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* LEFT CONTENT */}
          <div className="w-full max-w-2xl">
            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-red-600 sm:text-[13px]">
              <Rocket className="h-3.5 w-3.5" />
              {hero.badge}
            </span>

            {/* Main Heading */}
            <h1 className="mt-4 text-[32px] font-extrabold leading-[1.1] tracking-tight text-gray-900 sm:text-4xl md:text-[44px]">
              <span className="block">{hero.heading}</span>
              {hero.headingHighlight && (
                <span className="block text-red-600">{hero.headingHighlight}</span>
              )}
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              {hero.description}
            </p>

            {/* Feature cards */}
            {hero.features && hero.features.length > 0 && (
              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {hero.features.map((f) => {
                  const Icon = FEATURE_ICONS[f.icon];
                  return (
                    <div
                      key={f.title}
                      className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600">
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                      </span>
                      <p className="mt-2.5 text-sm font-bold text-gray-900">
                        {f.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        {f.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* CTA */}
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-xl hover:shadow-red-500/25"
              >
                Download Brochure
                <Download className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:bg-gray-50"
              >
                Explore Curriculum
                <BookOpen className="h-4 w-4" />
              </button>
            </div>

            {/* Trust row */}
            {(hero.ratingText || hero.placementText) && (
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-600">
                {hero.ratingText && (
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <span className="flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400" />
                      ))}
                    </span>
                    {hero.ratingText}
                  </span>
                )}
                {hero.ratingText && hero.placementText && (
                  <span className="text-gray-300">|</span>
                )}
                {hero.placementText && (
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    {hero.placementText}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* RIGHT FORM */}
          <div className="flex w-full justify-center lg:justify-end">
            {hero.report ? (
              <AICareerReportCard report={hero.report} />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
