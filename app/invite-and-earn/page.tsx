import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeIndianRupee, CheckCircle2, ChevronRight, HeartHandshake, Wallet } from "lucide-react";
import FAQ from "@/components/home/faq";
import { Footer } from "@/components/layout/footer";
import RevealObserver from "@/components/about/reveal-observer";
import { REVEAL_UP } from "@/components/about/reveal";
import EarnersChart from "@/components/invite-and-earn/earners-chart";
import HowItWorks from "@/components/invite-and-earn/how-it-works";
import ProgramRewards, { REFER_HREF } from "@/components/invite-and-earn/program-rewards";
import { MAX_REFERRAL_REWARD, REFERRAL_UNIVERSITIES, TOP_EARNERS, formatINR } from "@/data/referral-programs";

const MAX = formatINR(MAX_REFERRAL_REWARD);

export const metadata: Metadata = {
  title: `Refer & Earn | Earn up to ${MAX} per Referral | eCampus`,
  description: `Invite friends to an online degree through eCampus and earn up to ${MAX} for every friend who enrols. See university and program-wise rewards.`,
  alternates: { canonical: "/invite-and-earn" },
};

const PERKS = ["No limit on referrals", "Paid to your bank account", "Track every referral live"];


const FAQS = [
  {
    q: "What is the eCampus Refer & Earn program?",
    a: "It's a simple way to earn rewards by recommending eCampus to friends, family or colleagues who want to study an online degree, certification or executive program.",
  },
  {
    q: "Who can refer?",
    a: "Anyone with an eCampus account can refer — students, alumni, working professionals or anyone who knows someone planning their higher education.",
  },
  {
    q: "How much can I earn for one referral?",
    a: `You can earn up to ${MAX} for each friend who enrols. The exact reward depends on the university and program — see the table above.`,
  },
  {
    q: "When will I receive my reward?",
    a: "The reward is released after your friend's enrolment is confirmed and is paid directly into the bank account saved in your dashboard.",
  },
  {
    q: "Is there a limit on how many friends I can refer?",
    a: "No. You can refer as many people as you like and earn a reward for every successful enrolment.",
  },
  {
    q: "How do I track my referrals?",
    a: "Go to Invite & Earn in your dashboard. Every friend you refer has a live status, from form submitted to reward paid.",
  },
  {
    q: "What if two people refer the same friend?",
    a: "The reward goes to whoever submitted the referral first.",
  },
  {
    q: "Can I refer myself?",
    a: "No. Self-referrals aren't eligible, but our advisors are always happy to help you choose a program for free.",
  },
];

const FOCUS = "focus-visible:underline focus-visible:underline-offset-4";
const CONTAINER = "mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:w-[86%] lg:px-0";
const H2 = "text-[30px] font-bold leading-[1.2] tracking-tight text-gray-900 sm:text-[36px] lg:text-[40px]";

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`text-sm font-semibold uppercase tracking-[0.14em] ${light ? "text-red-300" : "text-red-600"}`}>{children}</p>;
}

// Gentle curves drawn across the hero background (viewBox 1440 × 640)
const HERO_LINES = [
  "M-40 520 C 300 420, 520 640, 820 500 S 1250 260, 1480 300",
  "M-40 600 C 360 520, 640 700, 940 560 S 1300 380, 1480 430",
  "M560 -40 C 740 110, 900 60, 1060 200 S 1340 430, 1480 380",
];

// Gold, silver and bronze for the top-three list
const MEDALS = ["bg-amber-400", "bg-gray-300", "bg-orange-300"];

export default function InviteAndEarnPage() {
  return (
    <>
      <article className="overflow-hidden bg-white text-gray-900">
        {/* 1. Hero */}
        <section aria-labelledby="refer-heading" className="relative overflow-hidden border-b border-red-100 bg-[#fff5f5]">
          {/* Blush backdrop: thin flowing lines with a red streak travelling along each, and rings behind the card.
              SVG + CSS only; the motion stops for people who prefer reduced motion. */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <svg
              viewBox="0 0 1440 640"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 h-full w-full [mask-image:linear-gradient(to_right,transparent_38%,black_68%)]"
              fill="none"
            >
              {HERO_LINES.map((d, i) => (
                <g key={d}>
                  <path d={d} stroke="#fecaca" strokeWidth="1.25" />
                  <path
                    d={d}
                    pathLength={1000}
                    stroke="#ef4444"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeDasharray="90 910"
                    strokeDashoffset="1000"
                    className="opacity-0 motion-safe:animate-[dash-travel_9s_linear_infinite] motion-safe:opacity-70"
                    style={{ animationDelay: `${i * -3}s` }}
                  />
                </g>
              ))}
            </svg>
            <span className="absolute right-[-120px] top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full border border-red-200/70" />
            <span className="absolute right-[-40px] top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full border border-red-200/70" />
            <span className="absolute right-[40px] top-1/2 hidden h-[240px] w-[240px] -translate-y-1/2 rounded-full border border-dashed border-red-300/60 motion-safe:animate-[spin_40s_linear_infinite] lg:block" />
          </div>
          <div className={`${CONTAINER} relative grid grid-cols-[minmax(0,1fr)] items-center gap-12 py-14 sm:py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16 lg:py-20`}>
            <div>
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-500">
                <Link href="/" className={`transition-colors hover:text-gray-900 ${FOCUS}`}>
                  Home
                </Link>
                <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                <span aria-current="page" className="font-medium text-gray-900">
                  Invite &amp; Earn
                </span>
              </nav>
              <div className="mt-6 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500">
                <Eyebrow>Invite &amp; Earn</Eyebrow>
              </div>
              <h1
                id="refer-heading"
                className="mt-3 max-w-xl text-[36px] font-bold leading-[1.12] tracking-tight text-gray-900 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-both motion-safe:delay-100 motion-safe:duration-700 sm:text-[46px] lg:text-[52px]"
              >
                Invite a friend. Earn up to <span className="whitespace-nowrap text-red-600">{MAX}</span> when they enrol.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-gray-600 motion-safe:animate-in motion-safe:fade-in motion-safe:fill-mode-both motion-safe:delay-200 motion-safe:duration-700 sm:text-lg">
                Help someone you know find the right online degree. When they enrol through your referral, you get rewarded.
              </p>
              <div className="mt-8 flex flex-col gap-3 motion-safe:animate-in motion-safe:fade-in motion-safe:fill-mode-both motion-safe:delay-300 motion-safe:duration-700 sm:flex-row">
                <Link
                  href={REFER_HREF}
                  className={`group inline-flex items-center justify-center gap-2 rounded-[10px] bg-red-600 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-red-700 ${FOCUS}`}
                >
                  Refer Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
                <a
                  href="#program-rewards"
                  className={`inline-flex items-center justify-center gap-2 rounded-[10px] border border-gray-300 bg-white px-7 py-3.5 text-[15px] font-semibold text-gray-900 transition-colors hover:border-gray-900 ${FOCUS}`}
                >
                  See program rewards
                </a>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 border-t border-red-200/70 pt-6 motion-safe:animate-in motion-safe:fade-in motion-safe:fill-mode-both motion-safe:delay-500 motion-safe:duration-700">
                {PERKS.map((perk) => (
                  <li key={perk} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-red-600" aria-hidden />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>

            {/* Reward summary card */}
            <div className="mx-auto w-full max-w-[460px] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:fill-mode-both motion-safe:delay-200 motion-safe:duration-700 lg:mr-0">
              <div className="overflow-hidden rounded-2xl border border-gray-200 border-t-red-600 bg-white shadow-[0_24px_60px_-32px_rgba(17,24,39,0.35)] [border-top-width:4px]">
                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white shadow-md shadow-red-600/20">
                      <BadgeIndianRupee className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Referral reward</p>
                      <p className="text-xs text-gray-500">Paid for each successful enrolment</p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-end justify-between gap-4 border-b border-gray-100 pb-6">
                    <div>
                      <p className="text-sm text-gray-500">You earn up to</p>
                      <p className="mt-1 text-[48px] font-extrabold leading-none tracking-tight text-red-600 sm:text-[52px]">{MAX}</p>
                    </div>
                    <span className="mb-1 rounded-md bg-red-50 px-2 py-1 text-xs font-semibold text-red-700">per friend</span>
                  </div>

                  <dl className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-gray-50 p-4">
                      <dt className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                        <Wallet className="h-3.5 w-3.5 text-red-600" aria-hidden />
                        You get
                      </dt>
                      <dd className="mt-1.5 text-sm font-semibold leading-snug text-gray-900">Cash reward in your bank account</dd>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-4">
                      <dt className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                        <HeartHandshake className="h-3.5 w-3.5 text-red-600" aria-hidden />
                        Your friend gets
                      </dt>
                      <dd className="mt-1.5 text-sm font-semibold leading-snug text-gray-900">Free one-on-one expert counselling</dd>
                    </div>
                  </dl>
                </div>

                {/* University logos scrolling right → left; the list is doubled so the loop is seamless */}
                <div className="border-t border-gray-100 bg-gray-50 py-4">
                  <p className="px-6 text-xs font-semibold uppercase tracking-wide text-gray-500 sm:px-7">Programs from top universities</p>
                  <div className="group/logos mt-3 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
                    <ul className="flex w-max gap-3 motion-safe:animate-marquee group-hover/logos:[animation-play-state:paused]">
                      {[...REFERRAL_UNIVERSITIES, ...REFERRAL_UNIVERSITIES].map((u, i) => (
                        <li
                          key={`${u.id}-${i}`}
                          aria-hidden={i >= REFERRAL_UNIVERSITIES.length}
                          className="flex h-12 w-[112px] flex-shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white px-3"
                        >
                          <Image
                            src={u.logo}
                            alt={i < REFERRAL_UNIVERSITIES.length ? u.name : ""}
                            width={90}
                            height={30}
                            loading="eager"
                            fetchPriority="low"
                            className="h-7 w-auto max-w-full object-contain"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. How it works — a line draws from step 1 to step 3 as you scroll */}
        <section aria-labelledby="how-it-works" className="py-20 lg:py-24">
          <div className={CONTAINER}>
            <div data-reveal className={`${REVEAL_UP} mx-auto max-w-2xl text-center`}>
              <Eyebrow>How it works</Eyebrow>
              <h2 id="how-it-works" className={`mt-3 ${H2}`}>
                Three steps to your reward
              </h2>
            </div>
            <HowItWorks />
          </div>
        </section>

        {/* 3. University & program-wise rewards */}
        <section id="program-rewards" aria-labelledby="rewards-heading" className="scroll-mt-20 border-y border-gray-100 bg-gray-50 py-20 lg:py-24">
          <div className={CONTAINER}>
            <div data-reveal className={`${REVEAL_UP} flex flex-col gap-4 md:flex-row md:items-end md:justify-between`}>
              <div className="max-w-2xl">
                <Eyebrow>Rewards</Eyebrow>
                <h2 id="rewards-heading" className={`mt-3 ${H2}`}>
                  University &amp; program-wise rewards
                </h2>
                <p className="mt-3 text-base text-gray-600">Choose a university to see its programs and how much you earn for each enrolment.</p>
              </div>
            </div>
            <div data-reveal className={REVEAL_UP}>
              <ProgramRewards />
            </div>
          </div>
        </section>

        {/* 4. Top earners */}
        <section aria-labelledby="top-earners" className="bg-[#1B2230] py-16 text-white lg:py-20">
          <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16`}>
            <div data-reveal className={REVEAL_UP}>
              <Eyebrow light>Leaderboard</Eyebrow>
              <h2 id="top-earners" className="mt-3 text-[30px] font-bold leading-[1.2] tracking-tight text-white sm:text-[36px] lg:text-[40px]">
                Top earners this quarter
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/75">
                Our most active referrers have helped dozens of friends start their degree — and earned along the way. Your name could be
                next.
              </p>

              {/* Top three at a glance */}
              <ol className="mt-7 space-y-2.5">
                {TOP_EARNERS.slice(0, 3).map((e, i) => (
                  <li key={e.name} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5">
                    <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-gray-900 ${MEDALS[i]}`}>
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-semibold text-white">
                      {e.name} <span className="font-normal text-white/60">· {e.city}</span>
                    </span>
                    <span className="text-sm font-bold tabular-nums text-white">{formatINR(e.amount)}</span>
                  </li>
                ))}
              </ol>

              <Link
                href={REFER_HREF}
                className={`group mt-7 inline-flex items-center gap-2 rounded-[10px] bg-white px-6 py-3 text-[15px] font-semibold text-gray-900 transition-colors hover:bg-red-50 ${FOCUS}`}
              >
                Start referring
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
              {/* TODO(api): remove this note once the leaderboard shows real referrers */}
              <p className="mt-5 text-xs text-white/50">Sample rankings shown — the live leaderboard is coming soon.</p>
            </div>

            <div data-reveal className={REVEAL_UP}>
              <EarnersChart />
            </div>
          </div>
        </section>

        {/* 5. FAQs — same component as the home page */}
        <section aria-label="Refer and earn FAQs" className="py-20 lg:py-24">
          <FAQ items={FAQS.map((f, i) => ({ question: `${i + 1}. ${f.q}`, answer: f.a }))} />
        </section>

      </article>

      <RevealObserver />
      <Footer />
    </>
  );
}
