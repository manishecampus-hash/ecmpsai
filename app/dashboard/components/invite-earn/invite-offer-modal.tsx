"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Gift, UserPlus, X } from "lucide-react";
import FlowingLines from "@/components/about/flowing-lines";
import { MAX_REFERRAL_REWARD, formatINR } from "@/data/referral-programs";
import { backdropMotion, dialogMotion } from "../motion";

const PERKS = ["No limit on referrals", "Paid to your bank account", "Track every referral live"];

// The Invite & Earn offer, shown as a popup when the page opens and from the top bar button
export default function InviteOfferModal({ open, onClose, onRefer }: { open: boolean; onClose: () => void; onRefer: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="invite-offer"
          {...backdropMotion}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-gray-900/40 p-4 backdrop-blur-[2px]"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="invite-offer-title"
            {...dialogMotion}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[560px] overflow-hidden rounded-[24px] border border-red-100 bg-[#fff5f5] shadow-[0_30px_80px_-20px_rgba(17,24,39,0.45)]"
          >
            {/* Same blush backdrop as the page: flowing lines with travelling streaks and thin rings */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <FlowingLines className="[mask-image:linear-gradient(to_bottom,transparent_20%,black_75%)]" />
              <span className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-red-200/70" />
              <span className="absolute -right-8 -top-8 h-44 w-44 rounded-full border border-dashed border-red-300/60 motion-safe:animate-[spin_40s_linear_infinite]" />
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm ring-1 ring-gray-200 transition hover:text-gray-900"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative p-6 sm:p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/25">
                <Gift className="h-6 w-6" aria-hidden />
              </span>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-red-600">Invite &amp; Earn</p>
              <h2 id="invite-offer-title" className="mt-2 pr-8 text-[26px] font-bold leading-tight tracking-tight text-gray-900 sm:text-[30px]">
                Invite friends, earn up to <span className="whitespace-nowrap text-red-600">{formatINR(MAX_REFERRAL_REWARD)}</span> per enrolment
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-[15px]">
                Share your code or add a friend&apos;s details below. When they enrol through you, the reward goes straight to your bank account.
              </p>

              <ul className="mt-5 space-y-2 rounded-2xl border border-red-100 bg-white/80 p-4">
                {PERKS.map((perk, i) => (
                  <motion.li
                    key={perk}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 0.2 + i * 0.08 } }}
                    className="flex items-center gap-2.5 text-sm font-medium text-gray-800"
                  >
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-red-600" aria-hidden />
                    {perk}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <button
                  type="button"
                  onClick={onRefer}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-red-600/20 transition hover:bg-red-700 active:scale-[0.98]"
                >
                  <UserPlus className="h-4 w-4" aria-hidden />
                  Refer a friend
                </button>
                <Link
                  href="/invite-and-earn#program-rewards"
                  className="group inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:border-gray-900"
                >
                  See program rewards
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
