"use client";

import { useEffect, useState } from "react";
import { animate, motion } from "framer-motion";
import { ArrowRight, FileCheck2, Lock, Sparkle, Trophy, UsersRound, type LucideIcon } from "lucide-react";
import { ADVISOR_NAME } from "../sidebar";
import { fadeUp } from "../motion";

// Same number the floating WhatsApp button uses
const ADVISOR_WHATSAPP = "919873794789";
const ADVISOR_PHONE_MASKED = "+91 98*****789";

const PERKS = ["Free 1:1 counselling, even on weekends", "End-to-end admission & document support"];

const STATS: { value: number; label: string; icon: LucideIcon }[] = [
  { value: 50000, label: "Students assisted", icon: UsersRound },
  { value: 25000, label: "Applications filled", icon: FileCheck2 },
];

function CountUp({ to }: { to: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const controls = animate(0, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [to]);
  return <>{n.toLocaleString("en-IN")}+</>;
}

// Trust card on the degree finder: who helps the student, what eCampus does for them, and how many it has helped.
export default function WhyEcampusCard({ delay = 0 }: { delay?: number }) {
  const whatsapp = `https://wa.me/${ADVISOR_WHATSAPP}?text=${encodeURIComponent(
    `Hi ${ADVISOR_NAME}, I'd like help choosing an online degree.`,
  )}`;

  return (
    <motion.section
      {...fadeUp(delay)}
      aria-labelledby="why-ecampus-heading"
      className="overflow-hidden rounded-2xl border border-red-100 bg-white shadow-[0_10px_30px_-12px_rgba(238,44,60,0.25)]"
    >
      <div className="relative flex items-center justify-center gap-2 overflow-hidden bg-gradient-to-r from-red-600 via-red-500 to-rose-500 px-5 py-3.5">
        <span className="pointer-events-none absolute -right-6 -top-10 h-24 w-24 rounded-full bg-white/10" />
        <span className="pointer-events-none absolute -bottom-12 left-6 h-20 w-20 rounded-full bg-white/10" />
        <Trophy className="relative h-5 w-5 text-amber-300" fill="currentColor" fillOpacity={0.35} />
        <h2 id="why-ecampus-heading" className="relative text-[15px] font-bold tracking-tight text-white">
          Why apply through eCampus?
        </h2>
      </div>

      <div className="p-4">
        {/* Dedicated advisor */}
        <div className="flex items-center gap-3 rounded-xl border border-red-100 bg-gradient-to-br from-red-50 via-rose-50/60 to-white p-3">
          <span className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-400 text-lg font-bold text-white shadow-md shadow-red-500/25 ring-4 ring-white">
            {ADVISOR_NAME.charAt(0)}
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" aria-label="Online" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-red-600">Your Dedicated Program Advisor</p>
            <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-[15px] font-bold text-gray-900">
              {ADVISOR_NAME}
              <span className="font-medium text-gray-400">·</span>
              <span className="font-semibold text-gray-700">{ADVISOR_PHONE_MASKED}</span>
              <Lock className="h-3.5 w-3.5 text-gray-500" aria-label="Shared once you connect" />
            </p>
          </div>
        </div>

        <ul className="mt-4 space-y-2.5 px-1">
          {PERKS.map((perk) => (
            <li key={perk} className="flex items-start gap-2.5 text-sm text-gray-700">
              <Sparkle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" fill="currentColor" fillOpacity={0.2} />
              {perk}
            </li>
          ))}
        </ul>

        {/* Social proof */}
        <div className="mt-4 grid grid-cols-2 gap-2.5 rounded-xl bg-gray-50 p-2.5">
          {STATS.map(({ value, label, icon: Icon }) => (
            <div key={label} className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <p className="text-lg font-extrabold leading-tight tracking-tight text-gray-900">
                  <CountUp to={value} />
                </p>
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-1 text-xs font-medium text-gray-500">{label}</p>
            </div>
          ))}
        </div>

        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-red-200 bg-white py-2.5 text-sm font-bold text-red-600 transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-500/25"
        >
          Talk to your advisor
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </motion.section>
  );
}
