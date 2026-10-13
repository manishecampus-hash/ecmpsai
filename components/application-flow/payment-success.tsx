"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MotionConfig, animate, motion } from "framer-motion";
import { ArrowRight, Check, Copy, FileText, Mail, PartyPopper } from "lucide-react";
import { useApplication } from "./application-context";
import ProgramCard from "./program-card";
import { formatINR, formatLongDate } from "./options";

const EASE = [0.22, 1, 0.36, 1] as const;

// Confetti burst around the badge — fixed angles/distances so every render is identical
const CONFETTI = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  const distance = i % 2 ? 62 : 82;
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    color: ["#ee2c3c", "#10b981", "#f59e0b", "#0ea5e9"][i % 4],
    rotate: i * 47,
  };
});

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: EASE, delay },
});

function SuccessBadge() {
  return (
    <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
      {[0, 1].map((ring) => (
        <motion.span
          key={ring}
          aria-hidden
          initial={{ scale: 0.6, opacity: 0.5 }}
          animate={{ scale: 1.9, opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeOut", delay: 0.35 + ring * 0.45, repeat: 1, repeatDelay: 0.4 }}
          className="absolute inset-0 rounded-full border-2 border-emerald-400"
        />
      ))}
      {CONFETTI.map((c, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
          animate={{ x: c.x, y: c.y, scale: [0, 1, 0.8], opacity: [1, 1, 0], rotate: c.rotate }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.3 }}
          className="absolute h-2 w-2 rounded-[2px]"
          style={{ backgroundColor: c.color }}
        />
      ))}
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
        className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30 ring-8 ring-emerald-100"
      >
        <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" aria-hidden>
          <motion.path
            d="M5 12.5l4.5 4.5L19 7.5"
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.35 }}
          />
        </svg>
      </motion.span>
    </div>
  );
}

// Amount ticks up from zero once the badge has landed
function CountUp({ value }: { value: number }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1,
      delay: 0.4,
      ease: "easeOut",
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [value]);
  return <>{formatINR(shown)}</>;
}

export function CopyValue({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable — the value is still visible to copy by hand.
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${value}`}
      className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={3} /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

// Confirmation shown right after Razorpay captures the payment — sized to fit one screen on desktop.
export default function PaymentSuccess() {
  const { program, state } = useApplication();
  const payment = state.payment!;
  const details = state.details!;

  const receipt: { label: string; value: string; copy?: boolean }[] = [
    { label: "Paid on", value: formatLongDate(payment.paidAt) },
    { label: "Payment ID", value: payment.paymentId, copy: true },
    { label: "Application No.", value: state.applicationId || "—", copy: Boolean(state.applicationId) },
  ];

  const nextSteps = [
    { title: "Seat blocked", text: `${formatINR(payment.amount)} received for ${program.programName}.`, status: "done" as const },
    { title: "Document verification", text: "Keep these documents ready:", status: "current" as const, docs: program.documents },
    { title: "Admission confirmation", text: `Our admissions team will reach out at ${details.email}.`, status: "upcoming" as const },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 pb-28 pt-6 sm:px-6 sm:py-8 lg:flex lg:items-center lg:py-3 [@media(max-height:640px)]:lg:py-2">
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mx-auto grid w-full max-w-[980px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_60px_-30px_rgba(15,23,42,0.3)] lg:grid-cols-[360px_minmax(0,1fr)]"
        >
          {/* Receipt */}
          <div className="relative flex flex-col items-center justify-center border-b border-dashed border-slate-200 bg-gradient-to-b from-emerald-50 via-white to-white px-6 py-7 text-center lg:border-b-0 lg:border-r lg:py-8 [@media(max-height:640px)]:lg:py-5">
            <SuccessBadge />

            <motion.p {...fadeUp(0.45)} className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
              <PartyPopper className="h-3.5 w-3.5" /> Payment successful
            </motion.p>
            <motion.p {...fadeUp(0.5)} className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">
              <CountUp value={payment.amount} />
            </motion.p>
            <motion.p {...fadeUp(0.55)} className="mt-1 text-sm text-slate-500">
              {program.payment.label} · paid securely via Razorpay
            </motion.p>

            <motion.dl {...fadeUp(0.6)} className="mt-6 w-full divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white text-left text-sm">
              {receipt.map(({ label, value, copy }) => (
                <div key={label} className="flex items-center justify-between gap-3 px-4 py-2.5">
                  <dt className="flex-shrink-0 text-xs text-slate-500">{label}</dt>
                  <dd className="flex min-w-0 items-center gap-1 font-semibold text-slate-900">
                    <span className="truncate">{value}</span>
                    {copy && <CopyValue value={value} />}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* What happens next */}
          <div className="flex flex-col px-6 py-7 lg:px-8 lg:py-8 [@media(max-height:640px)]:lg:py-5">
            <motion.div {...fadeUp(0.25)}>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[26px]">Your seat is blocked!</h1>
              <div className="mt-4 rounded-2xl border border-slate-200 p-3.5">
                <ProgramCard program={program} compact />
              </div>
            </motion.div>

            <motion.p {...fadeUp(0.4)} className="mt-6 text-xs font-bold uppercase tracking-wider text-slate-400 [@media(max-height:640px)]:mt-4">
              What happens next
            </motion.p>
            <ol className="mt-3 flex-1">
              {nextSteps.map((step, i) => (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.5 + i * 0.12 }}
                  className="relative flex gap-3.5 pb-4 last:pb-0 [@media(max-height:640px)]:pb-3"
                >
                  {i < nextSteps.length - 1 && (
                    <span aria-hidden className={`absolute bottom-0 left-[13px] top-8 w-0.5 ${step.status === "done" ? "bg-emerald-400" : "bg-slate-200"}`} />
                  )}
                  <span
                    className={`relative flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      step.status === "done"
                        ? "bg-emerald-500 text-white"
                        : step.status === "current"
                          ? "bg-white text-[#ee2c3c] ring-2 ring-[#ee2c3c]"
                          : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {step.status === "done" ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                    {step.status === "current" && (
                      <motion.span
                        aria-hidden
                        animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full border-2 border-[#ee2c3c]"
                      />
                    )}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-sm font-bold text-slate-900">{step.title}</p>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-slate-500">
                      {step.status === "upcoming" && <Mail className="mr-1 inline h-3.5 w-3.5 -translate-y-px text-slate-400" />}
                      {step.text}
                    </p>
                    {step.docs && step.docs.length > 0 && (
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {step.docs.map((doc, d) => (
                          <motion.li
                            key={doc.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.25, delay: 0.75 + d * 0.05 }}
                            title={doc.description}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
                          >
                            <FileText className="h-3 w-3 text-[#ee2c3c]" /> {doc.title}
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.li>
              ))}
            </ol>

            <motion.div {...fadeUp(0.85)} className="mt-6 flex flex-col gap-3 sm:flex-row [@media(max-height:640px)]:mt-4">
              <Link
                href="/dashboard/applications"
                className="group inline-flex h-11 items-center sm:flex-1 justify-center gap-2 rounded-xl bg-[#ee2c3c] px-6 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition-colors hover:bg-[#d92233]"
              >
                Track Application <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={`/universities/${program.slug}`}
                className="inline-flex h-11 items-center sm:flex-1 justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Back to University
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
