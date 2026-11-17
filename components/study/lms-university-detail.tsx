"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  BookOpen,
  Building2,
  Calendar,
  Check,
  ClipboardCheck,
  Copy,
  ExternalLink,
  FilePenLine,
  ChevronDown,
  GraduationCap,
  Globe,
  HelpCircle,
  KeyRound,
  LayoutDashboard,
  LibraryBig,
  Lock,
  MapPin,
  MousePointerClick,
  Phone,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Video,
  WalletCards,
} from "lucide-react";

import { Footer } from "@/components/layout/footer";
import { RICH_TEXT } from "@/components/course/section-ui";
import { buildLmsFaqs } from "@/lib/lms-content";

export interface LmsUniversityDetailData {
  slug: string;
  name: string;
  shortcode: string;
  logoUrl: string;
  location: string;
  establishmentYear: string;
  nirfRanking: string;
  studentsCount: string;
  contactDetails: string;
  ugcApproval: boolean;
  wesApproval: boolean;
  emiFacility: boolean;
  ecampusAssured: boolean;
  aboutHtml: string;
  tagline: string;
  accreditations: string[];
  lmsUrl: string;
  lmsHost: string;
}

export interface LmsRelatedUniversity {
  slug: string;
  name: string;
  logoUrl: string;
  location: string;
}

interface Props {
  university: LmsUniversityDetailData;
  related: LmsRelatedUniversity[];
}

const EASE = [0.22, 1, 0.36, 1] as const;

const SectionHeader = ({
  children,
  icon: Icon,
  subtitle,
}: {
  children: React.ReactNode;
  icon: React.ElementType;
  subtitle?: string;
}) => (
  <div className="mb-5 flex items-start gap-3 border-b border-slate-100 pb-4">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-[#ee2c3c]">
      <Icon className="h-5 w-5" />
    </div>
    <div className="min-w-0">
      <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{children}</h2>
      {subtitle && <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">{subtitle}</p>}
    </div>
  </div>
);

export default function LmsUniversityDetail({ university, related }: Props) {
  const u = university;
  const shortName = u.shortcode || u.name;
  const hasLms = u.lmsUrl && u.lmsUrl !== "#";

  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    if (!hasLms) return;
    try {
      await navigator.clipboard.writeText(u.lmsUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  const facts = useMemo(
    () =>
      [
        u.establishmentYear && { icon: Calendar, label: "Established", value: u.establishmentYear },
        u.location && { icon: MapPin, label: "Location", value: u.location },
        u.nirfRanking && { icon: Award, label: "NIRF Ranking", value: u.nirfRanking },
        u.studentsCount && { icon: Users, label: "Learners", value: u.studentsCount },
        {
          icon: ShieldCheck,
          label: "Approvals",
          value: [u.ugcApproval && "UGC", u.wesApproval && "WES"].filter(Boolean).join(" • ") || "UGC Entitled",
        },
        u.emiFacility && { icon: WalletCards, label: "Fee Payment", value: "EMI Available" },
      ].filter(Boolean) as { icon: React.ElementType; label: string; value: string }[],
    [u],
  );

  const loginSteps = [
    {
      icon: MousePointerClick,
      title: `Open the ${shortName} LMS`,
      text: `Click "Go to LMS Portal" on this page. The official portal${u.lmsHost ? ` (${u.lmsHost})` : ""} opens in a new tab.`,
    },
    {
      icon: KeyRound,
      title: "Enter your credentials",
      text: "Sign in with the username / enrolment number and password shared by the university on your registered email.",
    },
    {
      icon: LayoutDashboard,
      title: "Explore your dashboard",
      text: "Access your enrolled courses, recorded lectures, study material, assignments and announcements.",
    },
    {
      icon: ClipboardCheck,
      title: "Track your progress",
      text: "Submit assignments, check exam schedules and keep an eye on results and academic updates.",
    },
  ];

  const portalFeatures = [
    { icon: Video, label: "Live & Recorded", hint: "Classes anytime" },
    { icon: LibraryBig, label: "E-Library", hint: "Notes & e-books" },
    { icon: FilePenLine, label: "Assignments", hint: "Submit & exams" },
    { icon: Trophy, label: "Results", hint: "Grades & certificates" },
  ];

  // Same source as the FAQPage JSON-LD rendered on the server
  const faqs = buildLmsFaqs({
    name: u.name,
    shortName,
    lmsHost: u.lmsHost,
    contactDetails: u.contactDetails,
  });

  const [openFaqs, setOpenFaqs] = useState<number[]>([0]);
  const toggleFaq = (index: number) =>
    setOpenFaqs((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));

  const otherPortals = related.filter((r) => r.slug !== u.slug);

  const CtaButton = ({ compact = false }: { compact?: boolean }) =>
    hasLms ? (
      <a
        href={u.lmsUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        aria-label={`Go to the official ${u.name} LMS portal (opens in a new tab)`}
        className={`group/cta relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-[#f04654] via-[#f45b67] to-[#fb7185] font-semibold text-white shadow-md shadow-red-400/25 ring-1 ring-inset ring-white/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-400/30 hover:brightness-105 active:translate-y-0 active:scale-[0.99] ${
          compact ? "px-12 py-3 text-sm" : "px-14 py-3.5 text-[15px] sm:text-base"
        }`}
      >
        {/* Soft top highlight */}
        <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
        {/* Shine sweep */}
        <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover/cta:translate-x-[300%]" />
        <Lock className={`relative ${compact ? "h-4 w-4" : "h-[18px] w-[18px]"} opacity-90`} />
        <span className="relative tracking-tight">Go to {shortName} LMS Portal</span>
        <span
          className={`absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-xl bg-white/20 ring-1 ring-white/30 transition-all duration-300 group-hover/cta:bg-white group-hover/cta:text-[#ee2c3c] ${
            compact ? "h-8 w-8" : "h-9 w-9"
          }`}
        >
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
        </span>
      </a>
    ) : (
      <span className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-200 px-6 py-4 text-sm font-bold text-slate-500">
        LMS link coming soon
      </span>
    );

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* ───────────── Hero ───────────── */}
      <section className="relative overflow-hidden bg-slate-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(239,68,68,0.28),rgba(255,255,255,0))] px-4 pb-20 pt-6 text-white sm:px-6 sm:pb-24 sm:pt-7 lg:px-8">
        {/* Subtle grid + glow orbs */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_40%,transparent_100%)]" />
        <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-rose-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          {/* Top bar / breadcrumb */}
          <div className="mb-5 flex items-center justify-between gap-4">
            <Link
              href="/study"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-slate-300 backdrop-blur-sm transition-colors hover:bg-white/15 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to LMS Portals</span>
            </Link>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Official LMS
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mx-auto max-w-5xl space-y-4 text-center"
          >
            {/* Logo tile with glow */}
            <div className="relative mx-auto w-fit">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-red-500/40 via-rose-500/30 to-amber-400/30 opacity-60 blur-xl" />
              <div className="relative flex h-16 w-36 items-center justify-center rounded-2xl border border-white/20 bg-white px-3 py-2 shadow-2xl sm:h-[72px] sm:w-44">
                <Image
                  src={u.logoUrl}
                  alt={`${u.name} logo`}
                  width={200}
                  height={80}
                  unoptimized
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/20 px-3 py-1 text-[11px] font-medium text-red-300">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified Student Portal
              </span>
              <h1 className="text-balance text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl lg:whitespace-nowrap lg:text-[38px]">
                {u.name} <span className="text-red-400">LMS</span> Login
              </h1>
              <p className="mx-auto line-clamp-2 max-w-xl text-[13px] font-normal leading-relaxed !text-slate-300 sm:text-sm">
                {u.tagline
                  ? u.tagline
                  : `Sign in to the official ${u.name} learning portal to attend classes, access study material and track your academic progress.`}
              </p>
            </div>

            {/* Quick chips */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                <MapPin className="h-3.5 w-3.5 text-red-400" /> {u.location}
              </span>
              {u.establishmentYear && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                  <Calendar className="h-3.5 w-3.5 text-red-400" /> Estd. {u.establishmentYear}
                </span>
              )}
              {u.ugcApproval && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                  <BadgeCheck className="h-3.5 w-3.5 text-red-400" /> UGC Entitled
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────────── Main CTA card ───────────── */}
      <div className="relative z-10 mx-auto -mt-12 max-w-3xl px-4 sm:-mt-14 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 text-slate-900 shadow-xl shadow-slate-200/60 sm:p-8"
        >
          <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-red-500 via-rose-500 to-amber-500" />

          <div className="mb-6 flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-[#ee2c3c]">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Student LMS Access</h2>
                <p className="text-xs text-slate-500">Official learning portal of {u.name}</p>
              </div>
            </div>
            {u.ecampusAssured && (
              <span className="hidden items-center gap-1 rounded-full border border-amber-200/70 bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800 sm:inline-flex">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" /> eCampus Assured
              </span>
            )}
          </div>

          {/* Destination preview (browser bar) */}
          {hasLms && u.lmsHost && (
            <div className="mb-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">You&apos;ll be redirected to</p>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 sm:px-4">
                <div className="hidden gap-1.5 sm:flex">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
                  <Lock className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                  <span className="truncate text-sm font-semibold text-slate-800">{u.lmsHost}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label="Copy LMS link"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-xl px-2.5 py-2 text-xs font-semibold text-slate-500 transition-colors hover:bg-white hover:text-slate-900"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>
          )}

          <CtaButton />

          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] font-medium text-slate-500">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Secure HTTPS connection
            </span>
            <span className="inline-flex items-center gap-1">
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" /> Opens in a new tab
            </span>
          </div>

          {/* What's inside the portal */}
          <div className="mt-6 border-t border-slate-100 pt-5">
            <div className="mb-3.5 flex items-center gap-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Inside your portal</span>
              <span className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {portalFeatures.map((f) => (
                <div
                  key={f.label}
                  className="group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-slate-200/70 bg-white px-3 pb-4 pt-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg hover:shadow-red-500/10"
                >
                  {/* soft red glow on hover */}
                  <span className="pointer-events-none absolute -top-10 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full bg-red-400/0 blur-2xl transition-colors duration-300 group-hover:bg-red-400/25" />
                  <div className="relative mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-50 to-rose-100 text-[#ee2c3c] ring-1 ring-red-100 transition-all duration-300 group-hover:scale-110 group-hover:from-[#ee2c3c] group-hover:to-rose-500 group-hover:text-white group-hover:shadow-md group-hover:shadow-red-500/30 group-hover:ring-transparent">
                    <f.icon className="h-[22px] w-[22px]" strokeWidth={1.9} />
                  </div>
                  <span className="relative text-[13px] font-bold leading-tight text-slate-900 transition-colors group-hover:text-[#ee2c3c]">
                    {f.label}
                  </span>
                  <span className="relative mt-1 text-[11px] leading-snug text-slate-500">{f.hint}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ───────────── Content ───────────── */}
      <article className="mx-auto max-w-4xl space-y-10 px-4 pb-16 pt-12 text-base leading-relaxed text-slate-700 sm:px-6">
        {/* Quick facts */}
        {facts.length > 0 && (
          <section>
            <SectionHeader icon={Building2} subtitle={`Key facts about ${u.name}`}>
              University at a Glance
            </SectionHeader>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-red-300 hover:shadow-md"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <f.icon className="h-4 w-4 shrink-0 text-[#ee2c3c]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{f.label}</span>
                  </div>
                  <p className="text-sm font-bold leading-snug text-slate-900 sm:text-base">{f.value}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* How to login */}
        <section>
          <SectionHeader icon={KeyRound} subtitle="Follow these simple steps to access your account">
            How to Log In to {shortName} LMS
          </SectionHeader>
          <ol className="grid gap-4 sm:grid-cols-2">
            {loginSteps.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg hover:shadow-red-500/[0.07] sm:p-6"
              >
                {/* Big step number — highlights on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-5 top-4 select-none text-[56px] font-black leading-none tracking-tighter text-slate-100 transition-all duration-300 group-hover:scale-110 group-hover:text-[#ee2c3c]/20"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#ee2c3c] ring-1 ring-red-100 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#ee2c3c] group-hover:to-rose-500 group-hover:text-white group-hover:shadow-md group-hover:shadow-red-500/25 group-hover:ring-transparent">
                  <step.icon className="h-5 w-5" />
                </div>

                <p className="relative text-[11px] font-bold uppercase tracking-wider text-[#ee2c3c]">
                  Step {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="relative mt-0.5 pr-14 text-base font-bold text-slate-900">{step.title}</h3>
                <p className="relative mt-1.5 text-sm leading-relaxed text-slate-600">{step.text}</p>

                {/* Bottom accent line */}
                <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[#ee2c3c] to-rose-400 transition-all duration-500 group-hover:w-full" />
              </motion.li>
            ))}
          </ol>
        </section>

        {/* About */}
        {u.aboutHtml && (
          <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeader icon={BookOpen}>About {u.name}</SectionHeader>
            <div className={RICH_TEXT} dangerouslySetInnerHTML={{ __html: u.aboutHtml }} />

            {u.accreditations.length > 0 && (
              <div className="mt-6 border-t border-slate-100 pt-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Recognitions & Accreditations
                </p>
                <div className="flex flex-wrap gap-2">
                  {u.accreditations.map((label) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 bg-red-50/80 px-2.5 py-1 text-xs font-semibold text-red-700"
                    >
                      <BadgeCheck className="h-3.5 w-3.5 text-[#ee2c3c]" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Link
              href={`/universities/${u.slug}`}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#ee2c3c] transition-colors hover:text-[#d02534]"
            >
              View full university profile
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        )}

        {/* Help banner + CTA */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-900 bg-[radial-gradient(ellipse_70%_90%_at_100%_0%,rgba(239,68,68,0.28),rgba(255,255,255,0))] p-6 text-white shadow-lg shadow-slate-900/10 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-lg">
              <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                Ready to continue learning?
              </h2>
              <p className="mt-1.5 text-sm text-slate-300">
                Jump straight into your {shortName} classes, assignments and study material.
                {u.contactDetails && " Facing login issues? Reach out to the university helpdesk."}
              </p>
              {u.contactDetails && (
                <a
                  href={`tel:${u.contactDetails.replace(/[^\d+]/g, "")}`}
                  className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/15"
                >
                  <Phone className="h-3.5 w-3.5 text-red-300" />
                  {u.contactDetails}
                </a>
              )}
            </div>
            <div className="w-full md:w-auto md:min-w-[280px]">
              <CtaButton compact />
            </div>
          </div>
        </section>

        {/* Other LMS portals */}
        {otherPortals.length > 0 && (
          <section>
            <SectionHeader icon={Globe} subtitle="Find the official LMS for other partner universities">
              Other University LMS Portals
            </SectionHeader>
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-3">
              {otherPortals.map((p) => (
                <Link
                  key={p.slug}
                  href={`/study/${p.slug}`}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-3.5 transition-all hover:border-red-400 hover:shadow-sm"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50 p-1.5 transition-transform group-hover:scale-105">
                      <Image
                        src={p.logoUrl}
                        alt={p.name}
                        width={56}
                        height={40}
                        unoptimized
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="block truncate text-xs font-bold text-slate-900 transition-colors group-hover:text-[#ee2c3c]">
                        {p.name}
                      </span>
                      <span className="mt-0.5 block truncate text-[10px] text-slate-400">{p.location}</span>
                    </div>
                  </div>
                  <ArrowRight className="ml-2 h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-[#ee2c3c]" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQs — item styling matches the homepage FAQ; answers stay in the DOM for SEO */}
        <section aria-labelledby="lms-faq-heading">
          <SectionHeader icon={HelpCircle} subtitle={`Common questions about the ${shortName} LMS`}>
            <span id="lms-faq-heading">Frequently Asked Questions</span>
          </SectionHeader>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqs.includes(index);
              const panelId = `lms-faq-panel-${index}`;
              const buttonId = `lms-faq-button-${index}`;
              return (
                <div
                  key={faq.q}
                  className="rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.06)] transition-all duration-300 hover:shadow-[0_4px_12px_rgba(15,23,42,0.1)] sm:rounded-2xl"
                >
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left active:bg-slate-50 sm:px-5 sm:py-4"
                  >
                    <h3 className="flex-1 text-sm font-semibold leading-snug tracking-[-0.2px] text-slate-900">
                      {index + 1}. {faq.q}
                    </h3>
                    <span
                      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 transition-all duration-300 ${
                        isOpen ? "rotate-180 bg-red-50" : ""
                      }`}
                    >
                      <ChevronDown className="h-4 w-4 text-red-500" />
                    </span>
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-4 pb-4 text-xs leading-relaxed text-slate-600 sm:px-5 sm:text-sm">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}

