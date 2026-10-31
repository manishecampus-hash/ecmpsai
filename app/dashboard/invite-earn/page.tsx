"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, HeartHandshake, ShieldCheck, Star } from "lucide-react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { fadeUp } from "../components/motion";
import BankDetailsCard from "../components/invite-earn/bank-details-card";
import ReferFriendCard from "../components/invite-earn/refer-friend-card";
import ReferralStatusCard from "../components/invite-earn/referral-status-card";
import InviteHero from "../components/invite-earn/invite-hero";
import InviteOfferModal from "../components/invite-earn/invite-offer-modal";
import { INVITE_BUTTON_CLASS, InviteButtonContent, REFER_INTENT_KEY } from "../components/invite-earn/invite-earn-button";
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

// The progress panel sits beside the list from xl up and below it on smaller screens
function useIsWide() {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return wide;
}

const PANEL_EASE = [0.22, 1, 0.36, 1] as const;

export default function InviteEarnPage() {
  const [student, setStudent] = useState<StudentProfile>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [bank, setBank] = useState<BankDetails | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const referFormRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const wide = useIsWide();
  // The offer popup opens each time the page is visited, and again from the top bar button
  const [offerOpen, setOfferOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ecampus_student");
    if (saved) setStudent(JSON.parse(saved));
    setReferrals(readReferrals());
    setBank(readBankDetails());
    setLoaded(true);
    // Arriving from the popup's "Refer a friend" on another page: skip the popup and go to the form
    let fromRefer = false;
    try {
      fromRefer = sessionStorage.getItem(REFER_INTENT_KEY) === "1";
    } catch {
      // Storage unavailable — show the popup as usual.
    }
    // The flag is cleared only once acted on, so a re-run of this effect still sees it
    const t = fromRefer
      ? window.setTimeout(() => {
          try {
            sessionStorage.removeItem(REFER_INTENT_KEY);
          } catch {
            // Nothing to clear.
          }
          referFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300)
      : window.setTimeout(() => setOfferOpen(true), 400);
    return () => window.clearTimeout(t);
  }, []);

  // Same code the Settings → Rewards tab shows
  const referralCode = student.referralCode || "ECAMP-RAHUL26";
  // Progress is shown only after the student opens a friend's card
  const selected = referrals.find((r) => r.id === selectedId) ?? null;

  // On smaller screens the panel opens below the list, so bring it into view
  useEffect(() => {
    if (!selectedId || wide) return;
    const t = window.setTimeout(() => statusRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    return () => window.clearTimeout(t);
  }, [selectedId, wide]);

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
            <button type="button" onClick={() => setOfferOpen(true)} aria-label="Invite and earn offer" className={INVITE_BUTTON_CLASS}>
              <InviteButtonContent />
            </button>
          }
        />

        <main className="min-w-0 flex-1 overflow-y-auto p-4 pb-28 sm:p-6 sm:pb-24">
          <div className="mx-auto max-w-[1400px] space-y-5">
            {loaded && (
              <>
                <InviteHero referrals={referrals} referralCode={referralCode} />

                <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:gap-0">
                  <motion.div {...fadeUp(0.05)} className="min-w-0 flex-1 space-y-5">
                    <BankDetailsCard saved={bank} onSave={updateBank} />
                    <div ref={referFormRef} className="scroll-mt-4">
                      <ReferFriendCard referrals={referrals} selectedId={selected?.id ?? null} onSelect={setSelectedId} onSubmit={addReferral} />
                    </div>
                  </motion.div>

                  {/* Opens when a friend's card is clicked: slides in from the right on wide screens, rises in below the list otherwise */}
                  <AnimatePresence initial={false}>
                    {selected && (
                      <motion.div
                        key="referral-status"
                        ref={statusRef}
                        initial={wide ? { width: 0, opacity: 0, x: 48 } : { opacity: 0, y: 28, scale: 0.97 }}
                        animate={wide ? { width: 440, opacity: 1, x: 0 } : { opacity: 1, y: 0, scale: 1 }}
                        exit={wide ? { width: 0, opacity: 0, x: 48 } : { opacity: 0, y: 20, scale: 0.97 }}
                        transition={{ duration: 0.5, ease: PANEL_EASE }}
                        className="min-w-0 flex-shrink-0 scroll-mt-4 overflow-hidden xl:sticky xl:top-0"
                      >
                        <div className="pb-1 xl:w-[440px] xl:pl-5">
                          <ReferralStatusCard selected={selected} onClose={() => setSelectedId(null)} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
