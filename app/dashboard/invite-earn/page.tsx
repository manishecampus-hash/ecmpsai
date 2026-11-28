"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ChevronDown, GraduationCap, HeartHandshake, ShieldCheck, Star } from "lucide-react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { EASE_OUT, fadeUp } from "../components/motion";
import BankDetailsCard from "../components/invite-earn/bank-details-card";
import ReferFriendCard from "../components/invite-earn/refer-friend-card";
import ReferralStatusCard from "../components/invite-earn/referral-status-card";
import InviteHero from "../components/invite-earn/invite-hero";
import HowItWorks from "../components/invite-earn/how-it-works";
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
  { icon: GraduationCap, title: "Help your friends", text: "Guide them towards the right career and education.", tone: "bg-blue-50 text-blue-600" },
  { icon: Star, title: "Earn rewards", text: "Get attractive rewards for successful referrals.", tone: "bg-amber-50 text-amber-600" },
  { icon: ShieldCheck, title: "Trusted platform", text: "eCampus is a reliable and student-friendly platform.", tone: "bg-emerald-50 text-emerald-600" },
  { icon: HeartHandshake, title: "Make a difference", text: "Help more students build a brighter future.", tone: "bg-violet-50 text-violet-600" },
];

const FAQS = [
  {
    q: "When will I receive my reward?",
    a: "Once the university confirms your friend's admission, the reward is transferred to the bank account you saved on this page.",
  },
  { q: "Is there a limit on referrals?", a: "No. You can refer as many friends as you like and earn for every successful enrolment." },
  {
    q: "How do I track a referral?",
    a: "Open any friend under “Your Invited Friends” to see each step, from the counselor call to your payout.",
  },
  {
    q: "Can I change my bank details later?",
    a: "Bank details are locked once saved to keep your payouts secure. Contact support if you need to update them.",
  },
];

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button type="button" onClick={onToggle} aria-expanded={open} className="group flex w-full items-center justify-between gap-3 py-3 text-left">
        <span className={`text-[13.5px] font-semibold transition-colors ${open ? "text-gray-900" : "text-gray-700 group-hover:text-gray-900"}`}>{q}</span>
        <span
          className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            open ? "rotate-180 bg-gray-900 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
          }`}
        >
          <ChevronDown className="h-3.5 w-3.5" aria-hidden />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <p className="pb-3.5 pr-8 text-[12.5px] leading-relaxed text-gray-500">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Section that rises in the first time it scrolls into view
const reveal = (delay = 0) =>
  ({
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.45, delay, ease: EASE_OUT },
  }) as const;

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

// Set once the offer popup has opened by itself, so it doesn't open again on later visits
const OFFER_SEEN_KEY = "ecampus_invite_offer_seen";

export default function InviteEarnPage() {
  const [student, setStudent] = useState<StudentProfile>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [bank, setBank] = useState<BankDetails | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const referFormRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const wide = useIsWide();
  // The offer popup opens by itself on the first visit, and any time from the top bar button
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
    // The offer popup opens by itself only on the student's first visit; later it opens from the top bar button
    let offerSeen = false;
    try {
      offerSeen = localStorage.getItem(OFFER_SEEN_KEY) === "1";
    } catch {
      // Storage unavailable — treat as a first visit.
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
      : offerSeen
        ? undefined
        : window.setTimeout(() => {
            setOfferOpen(true);
            try {
              localStorage.setItem(OFFER_SEEN_KEY, "1");
            } catch {
              // Storage unavailable — it may show again next visit.
            }
          }, 400);
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
    <MotionConfig reducedMotion="user">
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
            <div className="mx-auto max-w-[1280px] space-y-4">
              {loaded && (
                <>
                  <InviteHero referrals={referrals} referralCode={referralCode} />

                  <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:gap-0">
                    {/* Main action first (invite / track friends), payout details below it */}
                    <motion.div {...fadeUp(0.05)} className="min-w-0 flex-1 space-y-4">
                      <div ref={referFormRef} className="scroll-mt-4">
                        <ReferFriendCard referrals={referrals} selectedId={selected?.id ?? null} onSelect={setSelectedId} onSubmit={addReferral} />
                      </div>
                      <BankDetailsCard saved={bank} onSave={updateBank} />
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

              <HowItWorks />

              {/* Why refer + FAQ */}
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
                <motion.section {...reveal()} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">Why refer</p>
                  <h2 className="mt-1 text-[17px] font-bold tracking-tight text-gray-900">Why refer to eCampus?</h2>
                  <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {WHY_REFER.map(({ icon: Icon, title, text, tone }, i) => (
                      <motion.div
                        key={title}
                        {...reveal(0.08 * i)}
                        className="group flex gap-3 rounded-xl border border-gray-100 bg-gray-50/50 p-3.5 transition-[background-color,border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-gray-200 hover:bg-white hover:shadow-[0_14px_28px_-20px_rgba(15,23,42,0.45)]"
                      >
                        <span
                          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${tone}`}
                        >
                          <Icon className="h-[18px] w-[18px]" aria-hidden />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[13.5px] font-semibold text-gray-900">{title}</span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-gray-500">{text}</span>
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                <motion.section {...reveal(0.08)} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">FAQ</p>
                  <h2 className="mt-1 text-[17px] font-bold tracking-tight text-gray-900">Common questions</h2>
                  <div className="mt-2">
                    {FAQS.map((f, i) => (
                      <FaqItem key={f.q} q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
                    ))}
                  </div>
                </motion.section>
              </div>
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
    </MotionConfig>
  );
}
