"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ClipboardList, Compass, FileCheck2, Sparkles, UserRoundCheck, Wallet } from "lucide-react";
import { EASE_OUT, staggerContainer, staggerItem } from "../motion";

// The same three steps every online application on eCampus goes through
const HOW_IT_WORKS = [
  { icon: Compass, title: "Pick a program", text: "Shortlist the right university with the AI Degree Finder." },
  { icon: UserRoundCheck, title: "Review your details", text: "Confirm your personal, education and work details." },
  { icon: Wallet, title: "Block your seat", text: "Pay the seat block amount securely to submit." },
];

export default function ApplicationsEmpty() {
  return (
    <motion.div
      variants={staggerContainer(0.08, 0.05)}
      initial="enter"
      animate="center"
      className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white px-5 py-10 text-center shadow-sm sm:px-8 sm:py-14"
    >
      {/* soft dotted backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(#fecaca_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />

      {/* stacked application cards */}
      <motion.div variants={staggerItem} className="relative mx-auto h-28 w-28">
        <motion.span
          aria-hidden
          animate={{ rotate: [-10, -6, -10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-2 rounded-2xl border border-red-100 bg-red-50"
        />
        <motion.span
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-2 flex items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-xl shadow-red-500/10"
        >
          <ClipboardList className="h-10 w-10 text-red-500" strokeWidth={1.6} />
        </motion.span>
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 16, delay: 0.5 }}
          className="absolute -right-1 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white shadow-md ring-4 ring-white"
        >
          <Sparkles className="h-4 w-4" />
        </motion.span>
      </motion.div>

      <motion.h2 variants={staggerItem} className="relative mt-6 text-xl font-bold text-gray-900 sm:text-2xl">
        No applications yet
      </motion.h2>
      <motion.p variants={staggerItem} className="relative mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-500">
        Once you apply to a university and block your seat, your application status, payment receipt and next steps
        will show up right here.
      </motion.p>

      <motion.div variants={staggerItem} className="relative mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">
        <Link
          href="/dashboard/matcher"
          className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-6 text-sm font-bold text-red-600 transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-500/25"
        >
          Find your program
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href="/universities"
          className="inline-flex h-11 items-center justify-center rounded-xl border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Browse universities
        </Link>
      </motion.div>

      <motion.div variants={staggerItem} className="relative mx-auto mt-10 max-w-3xl border-t border-dashed border-gray-200 pt-8">
        <p className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
          <FileCheck2 className="h-3.5 w-3.5" /> How applying works
        </p>
        <ol className="mt-5 grid gap-3 text-left sm:grid-cols-3">
          {HOW_IT_WORKS.map(({ icon: Icon, title, text }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.45 + i * 0.1 }}
              className="relative overflow-hidden rounded-xl border border-gray-100 bg-gray-50/60 p-4 transition hover:-translate-y-0.5 hover:border-red-100 hover:bg-white hover:shadow-sm"
            >
              <span aria-hidden className="absolute -bottom-2.5 right-2 select-none text-[72px] font-black leading-none text-red-100">
                {i + 1}
              </span>
              <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-white text-red-600 shadow-sm ring-1 ring-gray-100">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <p className="relative mt-3 text-sm font-bold text-gray-900">{title}</p>
              <p className="relative mt-1 text-xs leading-relaxed text-gray-500">{text}</p>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </motion.div>
  );
}
