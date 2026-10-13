"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, IndianRupee } from "lucide-react";
import { useApplication } from "./application-context";
import StageTimeline from "./stage-timeline";
import { formatINR, formatLongDate } from "./options";

const EASE = [0.22, 1, 0.36, 1] as const;

// Screen 1 — admission stages on the left, the program being applied to on the right.
export default function LandingScreen() {
  const router = useRouter();
  const { program, state, student, hydrated, basePath } = useApplication();

  const firstName = hydrated ? (state.details?.fullName || student?.name || "").trim().split(/\s+/)[0] : "";
  const completed = state.payment ? 2 : state.details ? 1 : 0;
  const start = formatLongDate(program.startDate);

  const cta = state.payment
    ? { label: "View Application", href: `${basePath}/payment` }
    : state.details
      ? { label: firstName ? `Continue Application, ${firstName}` : "Continue Application", href: `${basePath}/payment` }
      : { label: firstName ? `Let's Get Started, ${firstName}` : "Let's Get Started", href: `${basePath}/details` };

  const facts = [
    program.durationLabel && { icon: Clock3, label: "Duration", value: program.durationLabel },
    start && { icon: CalendarDays, label: "Starts on", value: start },
    { icon: IndianRupee, label: program.payment.label, value: formatINR(program.payment.amount) },
  ].filter(Boolean) as { icon: typeof Clock3; label: string; value: string }[];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 pb-28 pt-6 sm:px-6 sm:py-8 lg:flex lg:items-center lg:py-2">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="mx-auto w-full max-w-[940px] rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_50px_-30px_rgba(15,23,42,0.25)] sm:p-6 lg:p-5 [@media(min-width:1024px)_and_(min-height:700px)]:p-7"
      >
        <Link
          href={`/universities/${program.slug}`}
          className="inline-flex items-center gap-2 rounded-full py-1 pr-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>
            Back<span className="hidden sm:inline"> to {program.universityName}</span>
          </span>
        </Link>

        {/* Mobile: program → process → button. Desktop: process on the left, program + button on the right. */}
        <div className="mt-4 grid grid-cols-1 gap-6 [grid-template-areas:'program'_'process'_'cta'] lg:grid-cols-[280px_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-8 lg:gap-y-5 lg:[grid-template-areas:'process_program'_'process_cta']">
          {/* Admission process */}
          <motion.aside
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.1 }}
            className="rounded-2xl border border-slate-100 bg-slate-50 p-5 [grid-area:process] sm:p-6"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Admission Process</p>
            <p className="mt-1 text-sm text-slate-500">
              {program.stages.length} simple steps to secure your seat
            </p>
            <div className="mt-5">
              <StageTimeline stages={program.stages} completed={completed} />
            </div>
          </motion.aside>

          {/* Program being applied to */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.18 }}
            className="min-w-0 [grid-area:program]"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-[#ee2c3c]">You are applying for</p>

            {program.image && (
              <div className="relative mt-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={program.image}
                  alt={`${program.universityName} campus`}
                  className="aspect-[16/7] w-full rounded-2xl object-cover lg:aspect-auto lg:h-[clamp(120px,calc(100vh_-_480px),290px)]"
                />
                {program.universityLogo && (
                  <span className="absolute -bottom-6 left-5 flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={program.universityLogo} alt={`${program.universityName} logo`} className="h-full w-full object-contain" />
                  </span>
                )}
              </div>
            )}

            <h1
              className={`text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-[28px] ${
                program.image && program.universityLogo ? "mt-8" : "mt-4"
              }`}
            >
              {program.programName}
            </h1>
            <p className="mt-1 text-sm text-slate-500 sm:text-base">by {program.universityName}</p>

            <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {facts.map(({ icon: Icon, label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE, delay: 0.3 + i * 0.06 }}
                  className="flex items-center gap-2.5 rounded-xl border border-slate-200 px-3 py-3"
                >
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#ee2c3c]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-[11px] leading-tight text-slate-500">{label}</dt>
                    <dd className="mt-0.5 text-sm font-bold leading-snug text-slate-900">{value}</dd>
                  </div>
                </motion.div>
              ))}
            </dl>
          </motion.section>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.45 }}
            className="[grid-area:cta]"
          >
            <motion.button
              type="button"
              onClick={() => router.push(cta.href)}
              whileTap={{ scale: 0.98 }}
              className="group flex h-14 w-full items-center justify-center gap-3 rounded-xl border border-red-200 bg-red-50 px-6 text-base font-bold uppercase tracking-wide text-[#ee2c3c] transition-all duration-300 hover:border-[#ee2c3c] hover:bg-[#ee2c3c] hover:text-white hover:shadow-lg hover:shadow-red-500/25"
            >
              <span className="truncate">{cta.label}</span>
              <ArrowRight className="h-5 w-5 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
