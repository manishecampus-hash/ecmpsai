"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, CheckCircle2, Copy, Gift, Hourglass, IndianRupee, Landmark, Link2, Trophy, Users } from "lucide-react";
import FlowingLines from "@/components/about/flowing-lines";
import { fadeUp } from "../motion";
import { REFERRAL_STEPS, maskAccount, type BankDetails, type Referral } from "./referral-store";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41Z" />
    </svg>
  );
}

// Top of the dashboard Invite & Earn page: the student's earnings and their code to share (the offer itself is in a popup).
// Rewards are confirmed by the backend; until it is connected nothing is marked as earned.
export default function InviteHero({
  referrals,
  bank,
  referralCode,
  rewardsEarned = 0,
}: {
  referrals: Referral[];
  bank: BankDetails | null;
  referralCode: string;
  rewardsEarned?: number;
}) {
  const [copied, setCopied] = useState<"code" | "link" | null>(null);
  const [origin, setOrigin] = useState("");
  useEffect(() => setOrigin(window.location.origin), []);
  const inviteLink = `${origin}/?ref=${referralCode}`;
  const shareMessage = `Hey! I'm studying with eCampus — they help you pick the right online degree. Use my referral code ${referralCode} when you sign up: ${inviteLink}`;

  const copy = async (text: string, kind: "code" | "link") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Clipboard API unavailable — nothing more to do here.
    }
  };

  const completed = referrals.filter((r) => r.stage >= REFERRAL_STEPS.length - 1).length;
  const stats = [
    { icon: Users, label: "Total Referrals", value: referrals.length, tone: "bg-red-50 text-red-600" },
    { icon: Hourglass, label: "In Progress", value: referrals.length - completed, tone: "bg-amber-50 text-amber-600" },
    { icon: CheckCircle2, label: "Completed", value: completed, tone: "bg-emerald-50 text-emerald-600" },
    { icon: Gift, label: "Rewards Earned", value: `₹${rewardsEarned.toLocaleString("en-IN")}`, tone: "bg-violet-50 text-violet-600" },
  ];

  return (
    <motion.section
      {...fadeUp()}
      aria-labelledby="earnings-title"
      className="relative overflow-hidden rounded-[22px] border border-red-100 bg-[#fff5f5] shadow-[0_16px_40px_-30px_rgba(220,38,38,0.45)]"
    >
      {/* Blush backdrop: flowing lines with travelling streaks and thin rings behind the code card */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <FlowingLines className="[mask-image:linear-gradient(to_right,transparent_20%,black_65%)]" />
        <span className="absolute right-[-120px] top-[-80px] h-[420px] w-[420px] rounded-full border border-red-200/70" />
        <span className="absolute right-[-40px] top-[-10px] h-[280px] w-[280px] rounded-full border border-dashed border-red-300/60 motion-safe:animate-[spin_40s_linear_infinite]" />
      </div>

      <div className="relative grid gap-6 p-5 sm:p-7 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-center xl:gap-8">
        {/* Earnings: total on top, the four counters below */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-white shadow-md shadow-red-600/10 ring-1 ring-red-100">
              <Trophy className="h-8 w-8 text-amber-500 motion-safe:animate-float" aria-hidden />
            </span>
            <div className="min-w-0">
              <h2 id="earnings-title" className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600">
                Your Referral Earnings
              </h2>
              <p className="mt-1 flex items-center text-[40px] font-extrabold leading-none tracking-tight text-gray-900 sm:text-[44px]">
                <IndianRupee className="h-8 w-8 text-red-600" strokeWidth={2.75} aria-hidden />
                {rewardsEarned.toLocaleString("en-IN")}
              </p>
            </div>
            <p
              className={`inline-flex max-w-full items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold sm:ml-auto ${
                bank ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100" : "bg-amber-50 text-amber-700 ring-1 ring-amber-100"
              }`}
            >
              <Landmark className="h-3.5 w-3.5 flex-shrink-0" aria-hidden />
              {bank ? (
                <span className="truncate">
                  Paid to {bank.bankName} <span className="font-mono">{maskAccount(bank.accountNumber)}</span>
                </span>
              ) : (
                <span className="truncate">Add bank details to receive rewards</span>
              )}
            </p>
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map(({ icon: Icon, label, value, tone }, i) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.08, duration: 0.4 } }}
                className="group relative overflow-hidden rounded-2xl border border-white bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-red-100 hover:shadow-md"
              >
                <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-red-600 transition-transform duration-300 group-hover:scale-x-100" />
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${tone}`}>
                  <Icon className="h-[18px] w-[18px]" aria-hidden />
                </span>
                <p className="mt-3 text-2xl font-bold leading-none text-gray-900">{value}</p>
                <p className="mt-1.5 text-xs font-medium text-gray-500">{label}</p>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Referral code to share */}
        <div className="rounded-2xl border border-gray-200 border-t-red-600 bg-white p-5 shadow-[0_20px_45px_-28px_rgba(17,24,39,0.35)] [border-top-width:4px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500">Your referral code</p>
          <div className="mt-2.5 flex items-center justify-between gap-2 rounded-xl border-2 border-dashed border-red-200 bg-red-50/60 py-2 pl-3 pr-2">
            <span className="min-w-0 truncate font-mono text-lg font-bold tracking-[0.08em] text-red-700">{referralCode}</span>
            <button
              type="button"
              onClick={() => copy(referralCode, "code")}
              className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700 active:scale-95"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied === "code" ? "done" : "copy"}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.15 }}
                  className="flex"
                >
                  {copied === "code" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                </motion.span>
              </AnimatePresence>
              {copied === "code" ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="mt-2.5 grid grid-cols-2 gap-2">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white py-2 text-xs font-semibold text-gray-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            >
              <WhatsAppIcon className="h-4 w-4 text-emerald-600" />
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => copy(inviteLink, "link")}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white py-2 text-xs font-semibold text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              {copied === "link" ? <Check className="h-4 w-4 text-emerald-600" /> : <Link2 className="h-4 w-4 text-red-500" />}
              {copied === "link" ? "Copied" : "Copy link"}
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
