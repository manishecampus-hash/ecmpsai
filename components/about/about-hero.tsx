"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Flag,
  GraduationCap,
  MessagesSquare,
  Pause,
  Play,
  Scale,
  Users,
  type LucideIcon,
} from "lucide-react";

type Slide = {
  image: string;
  alt: string;
  // Keeps the people in frame when the photo is cropped to the hero's shape
  position: string;
  icon: LucideIcon;
  title: string;
  text: string;
  href: string;
  cta: string;
};

// Each photo is paired with one thing about the company, listed in the panel in the same order.
// Copy comes from the sections further down this page.
const SLIDES: Slide[] = [
  {
    image: "/about/hero/students.webp",
    alt: "Group of smiling students sitting together outdoors",
    position: "50% 60%",
    icon: Users,
    title: "Who we are",
    text: "A higher education discovery platform that brings education opportunities together in one place.",
    href: "#our-journey",
    cta: "Read our story",
  },
  {
    image: "/about/hero/classroom.webp",
    alt: "Students attending a lecture in a classroom",
    position: "50% 50%",
    icon: Flag,
    title: "Our journey since 2017",
    text: "From a three-person idea to a platform that helps learners across India find their next step.",
    href: "#our-journey",
    cta: "See our journey",
  },
  {
    image: "/about/hero/online-learner.webp",
    alt: "Student learning online on a laptop",
    position: "35% 40%",
    icon: GraduationCap,
    title: "Programs in one place",
    text: "Online degrees, certifications, executive education and doctoral programs from available institutions.",
    href: "/universities",
    cta: "Browse universities",
  },
  {
    image: "/about/hero/study-group.webp",
    alt: "Students comparing options together on their laptops",
    position: "55% 45%",
    icon: Scale,
    title: "Compare with clarity",
    text: "Review program information side by side to find what suits your goals, interests and schedule.",
    href: "/compare",
    cta: "Compare universities",
  },
  {
    image: "/about/hero/graduation.webp",
    alt: "Graduates throwing their caps in the air",
    position: "50% 55%",
    icon: MessagesSquare,
    title: "Free expert guidance",
    text: "Speak to an eCampus advisor about the right program for you. It's free, with no obligation.",
    href: "/contact-us",
    cta: "Talk to an advisor",
  },
];

// Each slide shows for 7 seconds, timed by the countdown bar in the open entry
const EASE = [0.22, 1, 0.36, 1] as const;

// Same focus treatment as the rest of the page (the global stylesheet removes focus rings)
const FOCUS = "focus-visible:underline focus-visible:underline-offset-4";
const ICON_BUTTON =
  "flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 transition hover:bg-white hover:text-slate-900 active:scale-95";

export default function AboutHero({ container }: { container: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reduceMotion = useReducedMotion();
  const n = SLIDES.length;
  // Only explicit pauses change the button; hovering the panel holds the timer quietly
  const holding = paused || hovering;

  const go = useCallback((i: number) => setActive(((i % n) + n) % n), [n]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="about-heading"
        aria-roledescription="carousel"
        className="relative isolate overflow-hidden bg-slate-900"
      >
        <h1 id="about-heading" className="sr-only">
          About eCampus
        </h1>

        {/* Full-colour photos crossfade while the incoming one slowly settles from a slight zoom */}
        <div className="absolute inset-0 -z-10">
          {SLIDES.map((s, i) => (
            <div
              key={s.image}
              aria-hidden={i !== active}
              className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${i === active ? "opacity-100" : "opacity-0"}`}
            >
              <Image
                src={s.image}
                alt={s.alt}
                fill
                sizes="100vw"
                quality={75}
                priority={i === 0}
                className={`object-cover transition-transform duration-[9000ms] ease-out motion-reduce:transition-none ${
                  i === active ? "scale-100" : "scale-110 motion-reduce:scale-100"
                }`}
                style={{ objectPosition: s.position }}
              />
            </div>
          ))}
        </div>

        {/* Fixed height: the open row grows and shrinks between slides, and a hero that followed it would
            shift the scroll position of everything below on every slide */}
        <div
          className={`${container} relative flex h-[640px] items-end py-6 sm:h-[660px] sm:py-10 lg:h-[680px] lg:items-start lg:justify-end lg:pb-0 lg:pt-[84px]`}
        >
          {/* Inside eCampus: one entry per photo, the open one counts down to the next */}
          <div
            className="group/panel relative w-full max-w-[440px] max-sm:max-w-none"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-b from-slate-900/50 via-slate-950/50 to-slate-950/60 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_0_0_1px_rgba(255,255,255,0.22),0_40px_80px_-30px_rgba(0,0,0,0.75)] backdrop-blur-2xl backdrop-saturate-150">
              {/* Glass gloss: a curved shine over the top, a bright top edge, a soft red glow low down, and a sweep on hover */}
              <span aria-hidden className="pointer-events-none absolute -left-1/4 -top-1/3 h-2/3 w-[150%] rounded-[50%] bg-gradient-to-b from-white/[0.16] to-transparent" />
              <span aria-hidden className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
              <span aria-hidden className="pointer-events-none absolute -bottom-16 left-1/2 h-32 w-3/4 -translate-x-1/2 rounded-full bg-red-600/25 blur-3xl" />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.15] to-transparent transition-transform duration-0 group-hover/panel:translate-x-[400%] group-hover/panel:duration-[1400ms] motion-reduce:hidden"
              />

              <div className="relative flex items-center justify-between gap-3 px-3 pb-3 pt-2">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.25)]" aria-hidden />
                  <p className="text-sm font-semibold tracking-wide text-white">Inside eCampus</p>
                  <span className="text-xs tabular-nums text-white/60" aria-hidden>
                    {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button type="button" onClick={() => go(active - 1)} aria-label="Previous slide" className={ICON_BUTTON}>
                    <ChevronLeft className="h-4 w-4" aria-hidden />
                  </button>
                  {!reduceMotion && (
                    <button
                      type="button"
                      onClick={() => setPaused((p) => !p)}
                      aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                      className={ICON_BUTTON}
                    >
                      {paused ? <Play className="ml-0.5 h-3.5 w-3.5" aria-hidden /> : <Pause className="h-3.5 w-3.5" aria-hidden />}
                    </button>
                  )}
                  <button type="button" onClick={() => go(active + 1)} aria-label="Next slide" className={ICON_BUTTON}>
                    <ChevronRight className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </div>

              <ol className="relative space-y-1">
                {SLIDES.map((s, i) => {
                  const on = i === active;
                  const Icon = s.icon;
                  return (
                    <li
                      key={s.image}
                      className="relative"
                      aria-roledescription={on ? "slide" : undefined}
                      aria-label={on ? `${i + 1} of ${n}: ${s.title}` : undefined}
                    >
                      {on && (
                        <motion.span
                          layoutId="about-hero-active"
                          transition={{ duration: 0.55, ease: EASE }}
                          className="absolute inset-0 overflow-hidden rounded-[18px] bg-gradient-to-b from-white/[0.28] to-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.75),inset_0_0_0_1px_rgba(255,255,255,0.35),inset_0_-14px_24px_-18px_rgba(255,255,255,0.35),0_20px_40px_-18px_rgba(0,0,0,0.75)]"
                        >
                          {/* Gloss across the top half */}
                          <span aria-hidden className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent" />
                        </motion.span>
                      )}
                      <button
                        type="button"
                        onClick={() => go(i)}
                        aria-current={on ? "true" : undefined}
                        aria-label={`Show ${s.title}`}
                        className={`relative flex w-full items-center gap-3 rounded-[18px] p-2.5 text-left transition-colors duration-300 ${
                          on ? "" : "hover:bg-white/10"
                        }`}
                      >
                        <span
                          className={`relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-[12px] ring-1 transition duration-500 ${
                            on ? "ring-white/60" : "ring-white/20"
                          }`}
                        >
                          {/* Pre-sized 128×96 thumbnails (about 3KB each), served as they are */}
                          <Image
                            src={s.image.replace("/hero/", "/hero/thumbs/")}
                            alt=""
                            width={128}
                            height={96}
                            unoptimized
                            className={`h-full w-full object-cover transition duration-500 ${on ? "scale-100" : "scale-110"}`}
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={`block text-[11px] font-bold tabular-nums transition-colors duration-300 ${on ? "text-red-400" : "text-white/60"}`}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`block truncate text-[15px] font-semibold transition-colors duration-300 ${on ? "text-white drop-shadow-sm" : "text-white"}`}
                          >
                            {s.title}
                          </span>
                        </span>
                        <span
                          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[11px] transition-all duration-300 ${
                            on ? "bg-gradient-to-b from-red-500 to-red-600 text-white shadow-[0_6px_16px_-4px_rgba(239,68,68,0.7),inset_0_1px_0_rgba(255,255,255,0.35)]" : "bg-white/10 text-white/80"
                          }`}
                        >
                          <Icon className="h-4 w-4" aria-hidden />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.div
                            key="details"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.55, ease: EASE }}
                            className="relative overflow-hidden"
                          >
                            <motion.div
                              initial={{ y: 8, filter: "blur(4px)" }}
                              animate={{ y: 0, filter: "blur(0px)" }}
                              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                              className="px-3 pb-5 pt-0.5"
                            >
                              <p className="text-[13px] leading-relaxed text-white/90">{s.text}</p>
                              <Link
                                href={s.href}
                                className={`group mt-2.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white transition-colors hover:text-red-200 ${FOCUS}`}
                              >
                                {s.cta}
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_0_10px_rgba(239,68,68,0.6)] transition-all group-hover:translate-x-0.5 group-hover:bg-red-500">
                                  <ArrowRight className="h-3 w-3" aria-hidden />
                                </span>
                              </Link>
                            </motion.div>
                            {/* Countdown to the next slide; it drives the slideshow */}
                            <span aria-hidden className="absolute inset-x-3 bottom-2 block h-[3px] overflow-hidden rounded-full bg-white/25">
                              {!reduceMotion && (
                                <span
                                  key={active}
                                  onAnimationEnd={() => go(active + 1)}
                                  className={`block h-full origin-left rounded-full bg-gradient-to-r from-red-400 to-red-600 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-[draw_7s_linear_forwards] ${
                                    holding ? "[animation-play-state:paused]" : ""
                                  }`}
                                />
                              )}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
