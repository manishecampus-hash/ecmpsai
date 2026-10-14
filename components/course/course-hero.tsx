"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import HighlightedText from "@/components/universities/HighlightedText";
import { ArrowRight, CalendarDays, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";
import ApplyNowModal from "@/components/form/apply-now-modal";
import PodcastButton from "./podcast-button";
import { EASE, STAT_ICONS } from "./section-ui";

type HeroUniversity = { id?: string; name: string; logoUrl?: string };

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: EASE, delay },
});

// Endless right-to-left logo strip: the list is repeated so half the track always covers
// the box, and the track slides by exactly that half.
function LogoMarquee({
  logos,
  className,
  tileClass,
  speed,
}: {
  logos: { src: string; alt: string }[];
  className?: string;
  tileClass: string;
  speed: number;
}) {
  const copies = logos.length < 4 ? 4 : 2;
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <div
        className="hero-marquee flex w-max flex-nowrap items-center gap-2.5 pr-2.5"
        style={{ animationDuration: `${speed}s` }}
      >
        {Array.from({ length: copies }).flatMap((_, c) =>
          logos.map((logo, i) => (
            <div key={`${c}-${i}`} className={tileClass}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo.src} alt={c === 0 ? logo.alt : ""} className="max-h-full w-auto max-w-full object-contain" loading="lazy" />
            </div>
          )),
        )}
      </div>
    </div>
  );
}

export default function CourseHeroSection({
  data,
  onCta1Click,
  universities = [],
  podcastScript = "",
}: {
  data?: any;
  onCta1Click?: () => void;
  /** Universities offering the course — shown as a logo strip and count */
  universities?: HeroUniversity[];
  /** Text read aloud by "Listen Podcast" */
  podcastScript?: string;
}) {
  const heading: string = data?.heading || data?.title || "";
  const descriptionText: string = data?.description || "";

  const [aiText, setAiText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

  // Desktop shows three lines of the overview (two when the title wraps to three lines) so the
  // hero stays within one screen; longer text gets a "Read more" that opens the rest in place.
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const [descExpanded, setDescExpanded] = useState(false);
  const [descOverflows, setDescOverflows] = useState(false);
  const [longTitle, setLongTitle] = useState(false);
  useEffect(() => {
    const title = titleRef.current;
    const desc = descRef.current;
    if (!title || !desc) return;
    const check = () => {
      const lineHeight = parseFloat(getComputedStyle(title).lineHeight) || 1;
      setLongTitle(Math.round(title.offsetHeight / lineHeight) >= 3);
      setDescOverflows(desc.scrollHeight > desc.clientHeight + 2);
    };
    check();
    const observer = new ResizeObserver(check);
    observer.observe(title);
    observer.observe(desc);
    return () => observer.disconnect();
  }, [descriptionText, descExpanded]);

  useEffect(() => {
    if (!descriptionText) return;
    setAiText("");
    setIsTypingDone(false);
  }, [descriptionText]);

  useEffect(() => {
    if (!descriptionText) return;
    if (aiText.length < descriptionText.length) {
      const timer = setTimeout(() => {
        setAiText(descriptionText.slice(0, aiText.length + 1));
      }, 25);
      return () => clearTimeout(timer);
    }
    setIsTypingDone(true);
  }, [aiText, descriptionText]);

  // If title is not present, hide whole section
  if (!heading.trim()) return null;

  const subheading = data?.subheading;
  const cta1 = data?.cta1;
  const image = data?.image;
  const titleSide = typeof data?.titleSide === "string" ? data.titleSide.trim() : "";

  const stats = Array.isArray(data?.stats) && data.stats.length > 0 ? data.stats : null;

  const recognitionLogos = Array.isArray(data?.logos) && data.logos.length > 0
    ? data.logos.map((src: string, i: number) => ({ src, alt: `Accreditation ${i + 1}` }))
    : null;

  const universityLogos = universities
    .filter((u) => u?.logoUrl)
    .map((u) => ({ src: u.logoUrl as string, alt: u.name }));

  const handleCta1 = () => (onCta1Click ? onCta1Click() : setShowApplyModal(true));

  return (
    <section className="relative isolate w-full overflow-hidden bg-slate-950">
      {/* Backdrop: brand glow + faint grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-48 h-[520px] w-[520px] rounded-full bg-[#ee2c3c]/30 blur-[120px]" />
        <div className="absolute -bottom-40 -right-24 h-[460px] w-[460px] rounded-full bg-rose-500/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
      </div>

      <style>{`
        @keyframes hero-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .hero-marquee { animation: hero-marquee linear infinite; }
        .hero-marquee:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .hero-marquee { animation: none; } }
      `}</style>

      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="overflow-hidden rounded-[24px] bg-white shadow-[0_30px_80px_-24px_rgba(0,0,0,0.6)] ring-1 ring-white/10 sm:rounded-[28px]"
        >
          <div className="grid gap-7 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:gap-10 lg:p-10 xl:grid-cols-[minmax(0,1fr)_460px]">
            {/* ── Copy ── */}
            <div className="min-w-0">
              {subheading && (
                <motion.p
                  {...rise(0.1)}
                  className="inline-flex max-w-full items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#ee2c3c] sm:text-xs"
                >
                  <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-[#ee2c3c]" />
                  <span className="truncate">{subheading}</span>
                </motion.p>
              )}

              <motion.h1
                ref={titleRef}
                {...rise(0.16)}
                className="mt-4 break-words text-[28px] font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl lg:text-[44px]"
              >
                {heading.includes("*") ? (
                  <HighlightedText text={heading} className="text-[#ee2c3c]" />
                ) : heading.includes("Online MBA") ? (
                  <>
                    {heading.split("Online MBA")[0]}
                    <span className="text-[#ee2c3c]">Online MBA</span>
                    {heading.split("Online MBA")[1]}
                  </>
                ) : (
                  heading
                )}
              </motion.h1>

              {descriptionText && (
                <motion.div {...rise(0.22)} className="mt-5">
                  <div className="mb-2 inline-flex items-center gap-1.5 rounded-md bg-amber-50 px-2 py-0.5 text-amber-600">
                    <Sparkles className="h-3.5 w-3.5 flex-none" />
                    <span className="text-[12px] font-semibold text-slate-800">AI Overview</span>
                  </div>
                  <p
                    ref={descRef}
                    className={`relative max-w-2xl break-words text-[15px] leading-7 text-slate-600 sm:text-base ${descExpanded ? "" : longTitle ? "lg:max-h-12 lg:overflow-hidden" : "lg:max-h-[72px] lg:overflow-hidden"}`}
                  >
                    <span>{aiText}</span>
                    <span
                      className={`ml-0.5 inline-block h-4 w-[2px] translate-y-[2px] bg-[#ee2c3c] sm:h-[18px] ${isTypingDone ? "animate-pulse" : ""}`}
                      aria-hidden="true"
                    />
                    {/* Reserves the final space up front so nothing below shifts while typing */}
                    <span className="invisible">{descriptionText.slice(aiText.length)}</span>
                    {descOverflows && !descExpanded && (
                      <button
                        type="button"
                        onClick={() => setDescExpanded(true)}
                        className="absolute bottom-0 right-0 hidden bg-gradient-to-l from-white from-70% to-transparent pl-12 font-semibold text-[#ee2c3c] hover:underline lg:inline"
                      >
                        … Read more
                      </button>
                    )}
                  </p>
                  {descExpanded && (
                    <button
                      type="button"
                      onClick={() => setDescExpanded(false)}
                      className="mt-1 hidden text-sm font-semibold text-[#ee2c3c] hover:underline lg:inline"
                    >
                      Read less
                    </button>
                  )}
                </motion.div>
              )}

              {(cta1 || podcastScript) && (
                <motion.div {...rise(0.28)} className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                  {cta1 && (
                    <button
                      type="button"
                      onClick={handleCta1}
                      className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#ee2c3c] px-7 text-sm font-bold text-white shadow-[0_12px_24px_-8px_rgba(238,44,60,0.6)] transition hover:bg-[#d92233] active:scale-[0.98]"
                    >
                      {cta1}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  )}
                  {podcastScript && <PodcastButton script={podcastScript} title={heading.replace(/\*/g, "").trim()} image={image} />}
                </motion.div>
              )}

              {stats && (
                <motion.div {...rise(0.34)} className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {stats.map((stat: any) => {
                    const Icon = STAT_ICONS[stat.iconName] || CalendarDays;
                    return (
                      <div
                        key={stat.label}
                        className="group min-w-0 rounded-2xl border border-slate-200 bg-slate-50/70 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-200 hover:bg-white hover:shadow-[0_12px_24px_-16px_rgba(238,44,60,0.5)]"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#ee2c3c] shadow-sm ring-1 ring-slate-100 transition-colors group-hover:bg-[#ee2c3c] group-hover:text-white">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="mt-2.5 block text-[10px] font-semibold uppercase leading-tight tracking-wide text-slate-500">
                          {stat.label}
                        </span>
                        <span className="mt-0.5 block break-words text-sm font-extrabold leading-snug text-slate-950">{stat.value}</span>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </div>

            {/* ── Media ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
              className="relative min-w-0"
            >
              <div className="relative aspect-[27/16] overflow-hidden rounded-[20px] bg-slate-100 shadow-[0_18px_40px_-20px_rgba(15,23,42,0.45)] ring-1 ring-slate-200/70">
                {image ? (
                  <motion.img
                    src={image}
                    alt={heading.replace(/\*/g, "") || "Program"}
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.4, ease: EASE }}
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-50 to-rose-100 p-6 text-center">
                    <span className="line-clamp-3 text-lg font-bold text-slate-900">{heading.replace(/\*/g, "")}</span>
                  </div>
                )}

                {(data?.name || titleSide) && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/75 to-transparent p-4 pt-10">
                    {data?.name && (
                      <p className="inline-flex max-w-full items-center gap-2 rounded-md border border-white/20 bg-black/35 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                        <span className="h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                        {data.name}
                      </p>
                    )}
                    {titleSide && (
                      <h2 className="mt-1 text-lg font-black leading-tight text-white sm:text-xl">
                        {titleSide.includes("*") ? <HighlightedText text={titleSide} className="text-red-400" /> : titleSide}
                      </h2>
                    )}
                  </div>
                )}
              </div>

              {/* Floating count of universities */}
              {universities.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: [0, -6, 0] }}
                  transition={{ opacity: { delay: 0.7, duration: 0.4 }, y: { delay: 1.1, duration: 4, repeat: Infinity, ease: "easeInOut" } }}
                  className="absolute -right-1 -top-4 flex items-center gap-2.5 rounded-2xl bg-white py-2 pl-2 pr-3.5 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.4)] ring-1 ring-slate-100 sm:-right-3"
                >
                  <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[#ee2c3c] text-white">
                    <GraduationCap className="h-[18px] w-[18px]" />
                    <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-extrabold text-slate-900">{universities.length} {universities.length === 1 ? "University" : "Universities"}</span>
                    <span className="block text-[11px] font-medium text-slate-500">offering this course</span>
                  </span>
                </motion.div>
              )}

              {/* Recognition logos */}
              {recognitionLogos && (
                <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-3.5">
                  <p className="mb-2.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#ee2c3c]" /> Recognition
                    <span className="font-semibold normal-case tracking-normal text-slate-900">· Globally respected credentials</span>
                  </p>
                  <LogoMarquee
                    logos={recognitionLogos}
                    speed={18}
                    className="[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
                    tileClass="flex h-12 w-[112px] flex-none items-center justify-center rounded-lg border border-slate-100 bg-slate-50 p-1.5"
                  />
                </div>
              )}
            </motion.div>
          </div>

          {/* University logo strip */}
          {universityLogos.length > 0 && (
            <div className="flex items-center gap-5 border-t border-slate-100 bg-slate-50/80 px-5 py-3.5 sm:px-8 lg:px-10">
              <p className="hidden shrink-0 text-[11px] font-bold uppercase leading-snug tracking-wider text-slate-500 sm:block">
                Top universities
                <br />
                <span className="text-[#ee2c3c]">offering this course</span>
              </p>
              <span className="hidden h-10 w-px shrink-0 bg-slate-200 sm:block" />
              <LogoMarquee
                logos={universityLogos}
                speed={Math.max(24, universityLogos.length * 3)}
                className="min-w-0 flex-1 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
                tileClass="flex h-12 w-[128px] flex-none items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 sm:h-14 sm:w-[140px]"
              />
            </div>
          )}
        </motion.div>
      </div>

      <ApplyNowModal isOpen={showApplyModal} onClose={() => setShowApplyModal(false)} />
    </section>
  );
}
