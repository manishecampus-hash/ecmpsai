"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  GraduationCap,
  Hash,
  Hourglass,
  Mail,
  MapPin,
  MessageCircle,
  Route,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import type { SubmittedApplication } from "@/components/application-flow/submitted-applications";
import { CopyValue } from "@/components/application-flow/payment-success";
import { formatLongDate } from "@/components/application-flow/options";
import ApplicationJourney, { buildJourney } from "./application-journey";
import { ADVISOR_NAME } from "../sidebar";
import { EASE_OUT, staggerContainer, staggerItem } from "../motion";

const card = "rounded-2xl border border-gray-100 bg-white shadow-sm";

function CardHeader({
  icon: Icon,
  title,
  subtitle,
  aside,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 items-start gap-3">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 ring-1 ring-red-100">
          <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <h2 className="text-base font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="mt-0.5 text-[13px] leading-relaxed text-gray-500">{subtitle}</p>}
        </div>
      </div>
      {aside}
    </div>
  );
}

const daysUntil = (iso?: string) => {
  if (!iso) return null;
  const start = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(start.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((start.getTime() - today.getTime()) / 86_400_000);
};

export default function ApplicationDetail({ application }: { application: SubmittedApplication }) {
  const { applicationId, program, details, payment } = application;

  const journey = useMemo(() => buildJourney(application), [application]);
  const doneCount = journey.filter((s) => s.status === "done").length;
  const progress = Math.round((doneCount / journey.length) * 100);
  const nextStep = journey.find((s) => s.status === "current");
  const startsIn = daysUntil(program.startDate);

  const overview: { icon: LucideIcon; label: string; value: string; copy?: boolean }[] = [
    { icon: Hash, label: "Application No.", value: applicationId, copy: true },
    { icon: CalendarDays, label: "Applied on", value: formatLongDate(payment.paidAt) },
    ...(program.durationLabel ? [{ icon: Clock3, label: "Duration", value: program.durationLabel }] : []),
    ...(startsIn !== null
      ? [
          {
            icon: Hourglass,
            label: "Program starts",
            value: startsIn > 0 ? `In ${startsIn} day${startsIn === 1 ? "" : "s"}` : formatLongDate(program.startDate),
          },
        ]
      : []),
  ];

  // Submitted answers, grouped like the review screen (optional fields left blank are skipped)
  const groups: { icon: LucideIcon; title: string; rows: [string, string][] }[] = [
    {
      icon: UserRound,
      title: "Personal",
      rows: [
        ["Full name", details.fullName],
        ["Email", details.email],
        ["Mobile", details.phone && `+91 ${details.phone}`],
        ["Date of birth", formatLongDate(details.dob)],
        ["Gender", details.gender],
      ],
    },
    {
      icon: MapPin,
      title: "Location",
      rows: [
        ["City", details.city],
        ["State", details.state],
        ["Country", details.country],
      ],
    },
    {
      icon: GraduationCap,
      title: "Education",
      rows: [
        ["Qualification", details.qualification],
        ["Specialisation", details.fieldOfStudy],
        ["Institute", details.institute],
        ["Completed in", details.graduationYear],
        ["Percentage / CGPA", details.score],
      ],
    },
    {
      icon: Briefcase,
      title: "Work",
      rows: [
        ["Experience", details.experience],
        ["Designation", details.designation],
        ["Organisation", details.company],
      ],
    },
  ].map((g) => ({ ...g, rows: g.rows.filter(([, v]) => Boolean(v?.trim())) as [string, string][] }));

  return (
    <motion.div variants={staggerContainer(0.08, 0.05)} initial="enter" animate="center" className="space-y-5">
      {/* ── Overview ── */}
      <motion.section variants={staggerItem} className={`${card} relative overflow-hidden`}>
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.3 }}
          className="absolute inset-x-0 top-0 z-10 h-1 origin-left bg-red-600"
        />
        <div className="grid md:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
          <div className="relative h-44 overflow-hidden bg-gradient-to-br from-red-50 to-rose-100 md:h-auto md:min-h-[240px]">
            {program.image ? (
              <motion.img
                src={program.image}
                alt=""
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: EASE_OUT }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <GraduationCap className="absolute inset-0 m-auto h-14 w-14 text-red-300" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-gray-950/10 to-transparent" />
            <span className="absolute left-3 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-emerald-700 shadow-sm backdrop-blur">
              <CheckCircle2 className="h-3.5 w-3.5" /> Seat blocked
            </span>
            {program.universityLogo && (
              <span className="absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white p-1.5 shadow-lg ring-1 ring-black/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={program.universityLogo} alt={program.universityName} className="h-full w-full object-contain" />
              </span>
            )}
          </div>

          <div className="min-w-0 p-5 sm:p-6">
            {nextStep && (
              <span className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                <span className="relative flex h-2 w-2">
                  <motion.span
                    aria-hidden
                    animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full bg-red-500"
                  />
                  <span className="relative h-2 w-2 rounded-full bg-red-600" />
                </span>
                Next: {nextStep.title}
              </span>
            )}
            <h2 className="mt-3 text-xl font-bold leading-snug tracking-tight text-gray-900 sm:text-2xl">{program.programName}</h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
              <Building2 className="h-4 w-4 flex-shrink-0 text-gray-400" />
              <span className="truncate">{program.universityName}</span>
            </p>

            <dl className="mt-5 grid grid-cols-2 gap-2.5 xl:grid-cols-4">
              {overview.map(({ icon: Icon, label, value, copy }, i) => (
                <div
                  key={label}
                  // Phones: the application no. gets a full row, as does an unpaired last tile
                  className={`group relative min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50/70 px-3 py-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-red-100 hover:bg-white hover:shadow-lg hover:shadow-red-500/[0.08] ${
                    i === 0 || (i === overview.length - 1 && i % 2 === 1) ? "col-span-2 sm:col-span-1" : ""
                  }`}
                >
                  <dt className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500 transition-colors duration-300 group-hover:text-gray-700">
                    <Icon className="h-3.5 w-3.5 text-gray-400 transition-all duration-300 group-hover:scale-125 group-hover:text-red-500" /> {label}
                  </dt>
                  <dd className="mt-1 flex min-w-0 items-center gap-0.5 text-sm font-bold text-gray-900">
                    <span className="truncate">{value}</span>
                    {copy && <CopyValue value={value} />}
                    {/* accent line that slides in on hover (positioned against the tile) */}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-red-400 to-red-600 transition-transform duration-300 group-hover:scale-x-100"
                    />
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-gray-700">Admission progress</span>
                <span className="text-gray-500">
                  {doneCount} of {journey.length} steps · <span className="text-red-600">{progress}%</span>
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: EASE_OUT, delay: 0.4 }}
                  className="h-full rounded-full bg-gradient-to-r from-red-400 to-red-600"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Journey ── */}
      <motion.section variants={staggerItem} className={`${card} p-5 sm:p-6`}>
        <CardHeader icon={Route} title="Application journey" subtitle="Where your application stands right now." />
        <div className="mt-6">
          <ApplicationJourney steps={journey} />
        </div>
      </motion.section>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
        <div className="space-y-5">
          {/* ── Documents ── */}
          {program.documents.length > 0 && (
            <motion.section variants={staggerItem} className={`${card} p-5 sm:p-6`}>
              <CardHeader
                icon={FileText}
                title="Documents for verification"
                subtitle={`Keep these ready — ${program.universityName} will ask for them in the next step.`}
                aside={
                  <span className="flex-shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700">
                    {program.documents.length} required
                  </span>
                }
              />
              <motion.ul variants={staggerContainer(0.05, 0.2)} className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {program.documents.map((doc, i) => (
                  <motion.li key={doc.title} variants={staggerItem}>
                    <div className="group flex h-full items-start gap-3 rounded-xl border border-gray-100 p-3.5 transition hover:-translate-y-0.5 hover:border-red-100 hover:bg-red-50/40 hover:shadow-sm">
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gray-50 text-xs font-bold text-gray-500 transition-colors group-hover:bg-white group-hover:text-red-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-900">{doc.title}</p>
                        {doc.description && <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{doc.description}</p>}
                      </div>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
              <p className="mt-4 flex items-start gap-2 rounded-xl bg-gray-50 px-3.5 py-3 text-xs leading-relaxed text-gray-600">
                <Mail className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                <span>
                  The admissions team will reach out at <span className="font-semibold text-gray-900">{details.email}</span> with
                  the next steps.
                </span>
              </p>
            </motion.section>
          )}

          {/* ── Submitted details ── */}
          <motion.section variants={staggerItem} className={`${card} p-5 sm:p-6`}>
            <CardHeader
              icon={BadgeCheck}
              title="Details you submitted"
              subtitle={`Shared with ${program.universityName} on ${formatLongDate(payment.paidAt)}.`}
            />
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {groups.map(({ icon: Icon, title, rows }) =>
                rows.length ? (
                  <div key={title} className="rounded-xl border border-gray-100 p-4">
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                      <Icon className="h-3.5 w-3.5 text-red-500" /> {title}
                    </p>
                    <dl className="mt-3 space-y-2.5">
                      {rows.map(([label, value]) => (
                        <div key={label} className="flex items-baseline justify-between gap-3 text-sm">
                          <dt className="flex-shrink-0 text-gray-500">{label}</dt>
                          <dd className="min-w-0 truncate text-right font-semibold text-gray-900" title={value}>
                            {value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ) : null,
              )}
            </div>
          </motion.section>
        </div>

        <div className="space-y-5 xl:sticky xl:top-0">
          {/* ── Payment receipt ── */}
          <motion.section variants={staggerItem} className={`${card} p-5 sm:p-6`}>
            <p className="text-sm font-bold text-gray-900">Payment confirmed</p>
            <p className="mt-1 text-xs leading-relaxed text-gray-500">Your payment record and downloadable receipt are available in Payment Receipts.</p>
            <Link href="/dashboard/receipts" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700">
              <FileText className="h-4 w-4" /> View receipt <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </motion.section>          <motion.section variants={staggerItem} className={`${card} relative overflow-hidden p-5 sm:p-6`}>
            <span aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-red-50 blur-2xl" />
            <div className="relative flex items-center gap-3">
              <span className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-red-600 text-base font-bold text-white shadow-md shadow-red-500/25">
                {ADVISOR_NAME.charAt(0)}
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900">Need help with your application?</p>
                <p className="text-xs text-gray-500">{ADVISOR_NAME} · Your program advisor</p>
              </div>
            </div>
            <p className="relative mt-3 text-[13px] leading-relaxed text-gray-600">
              Questions about documents, fees or the admission timeline? Get answers in minutes.
            </p>
            <div className="relative mt-4 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-1">
              <Link
                href="/dashboard/mychat"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-bold text-red-600 transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-500/25"
              >
                <MessageCircle className="h-4 w-4" /> Ask in My Chat
              </Link>
              <Link
                href={`/universities/${program.slug}`}
                className="group inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                View university
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
}
