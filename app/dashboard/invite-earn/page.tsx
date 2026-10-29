"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Gift, GraduationCap, HeartHandshake, ShieldCheck, Star } from "lucide-react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { fadeUp } from "../components/motion";
import BankDetailsCard from "../components/invite-earn/bank-details-card";
import ReferFriendCard from "../components/invite-earn/refer-friend-card";
import ReferralStatusCard from "../components/invite-earn/referral-status-card";
import InviteHero from "../components/invite-earn/invite-hero";
import InviteOfferModal from "../components/invite-earn/invite-offer-modal";
import {
  readBankDetails,
  readReferrals,
  saveBankDetails,
  saveReferrals,
  type BankDetails,
  type Referral,
} from "../components/invite-earn/referral-store";
import type { StudentProfile } from "../types";

const WHY_REFER = [
  { icon: GraduationCap, title: "Help Your Friends", text: "Guide them towards the right career and education." },
  { icon: Star, title: "Earn Rewards", text: "Get attractive rewards for successful referrals." },
  { icon: ShieldCheck, title: "Trusted Platform", text: "eCampus is a reliable and student-friendly platform." },
  { icon: HeartHandshake, title: "Make a Difference", text: "Help more students build a brighter future." },
];

export default function InviteEarnPage() {
  const [student, setStudent] = useState<StudentProfile>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [bank, setBank] = useState<BankDetails | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const referFormRef = useRef<HTMLDivElement>(null);
  // The offer popup opens each time the page is visited, and again from the top bar button
  const [offerOpen, setOfferOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ecampus_student");
    if (saved) setStudent(JSON.parse(saved));
    const list = readReferrals();
    setReferrals(list);
    setSelectedId(list[0]?.id ?? null);
    setBank(readBankDetails());
    setLoaded(true);
    const t = window.setTimeout(() => setOfferOpen(true), 400);
    return () => window.clearTimeout(t);
  }, []);

  // Same code the Settings → Rewards tab shows
  const referralCode = student.referralCode || "ECAMP-RAHUL26";
  const selected = referrals.find((r) => r.id === selectedId) ?? referrals[0] ?? null;

  const addReferral = (draft: Pick<Referral, "name" | "phone" | "email" | "state" | "courses">) => {
    const referral: Referral = {
      ...draft,
      id: `ref-${Date.now().toString(36)}`,
      createdAt: new Date().toISOString(),
      stage: 1,
    };
    const next = [referral, ...referrals];
    setReferrals(next);
    saveReferrals(next);
    setSelectedId(referral.id);
  };

  const updateBank = (details: BankDetails) => {
    setBank(details);
    saveBankDetails(details);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f9fafb]">
      <Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar
          student={student}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          action={
            <button
              type="button"
              onClick={() => setOfferOpen(true)}
              aria-label="Invite and earn offer"
              className="group inline-flex h-9 items-center gap-2 rounded-xl bg-red-600 px-2.5 text-sm font-semibold text-white shadow-sm shadow-red-600/20 transition hover:bg-red-700 active:scale-[0.97] sm:px-3.5"
            >
              <Gift className="h-4 w-4 transition-transform group-hover:-rotate-12" aria-hidden />
              <span className="hidden sm:inline">Invite &amp; Earn</span>
            </button>
          }
        />

        <main className="min-w-0 flex-1 overflow-y-auto p-4 pb-28 sm:p-6 sm:pb-24">
          <div className="mx-auto max-w-[1400px] space-y-5">
            {loaded && (
              <>
                <InviteHero referrals={referrals} bank={bank} referralCode={referralCode} />

                <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
                  <motion.div {...fadeUp(0.05)} className="min-w-0 space-y-5">
                    <BankDetailsCard saved={bank} onSave={updateBank} />
                    <div ref={referFormRef} className="scroll-mt-4">
                      <ReferFriendCard referrals={referrals} selectedId={selected?.id ?? null} onSelect={setSelectedId} onSubmit={addReferral} />
                    </div>
                  </motion.div>

                  <motion.div {...fadeUp(0.1)} className="min-w-0">
                    <ReferralStatusCard referrals={referrals} selected={selected} onSelect={setSelectedId} />
                  </motion.div>
                </div>
              </>
            )}

            {/* Why refer */}
            <motion.section
              {...fadeUp(0.15)}
              className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-[auto_repeat(4,minmax(0,1fr))] lg:items-center lg:gap-6"
            >
              <h2 className="flex items-center gap-2 text-base font-bold text-gray-900 sm:col-span-2 lg:col-span-1 lg:max-w-[150px]">
                <span className="h-6 w-1 rounded-full bg-red-600" aria-hidden />
                Why Refer to eCampus?
              </h2>
              {WHY_REFER.map(({ icon: Icon, title, text }) => (
                <div key={title} className="group flex items-start gap-3">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{text}</p>
                  </div>
                </div>
              ))}
            </motion.section>
          </div>
        </main>
      </div>

      <InviteOfferModal
        open={offerOpen}
        onClose={() => setOfferOpen(false)}
        onRefer={() => {
          setOfferOpen(false);
          window.setTimeout(() => referFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
        }}
      />
    </div>
  );
}
