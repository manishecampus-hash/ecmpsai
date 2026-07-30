"use client";

import React, { useEffect, useRef, useState } from "react";
import { Download, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  ChevronLeft,
  Sparkles,
  Users,
  Globe,
  BookOpen,
  Building2,
} from "lucide-react";

interface HeroSectionProps {
  university?: {
    name?: string;
    fullName?: string;
    image?: string;
  };
  stats?: {
    learners?: string;
    countries?: string;
    programs?: string;
    campuses?: string;
  };
}

// Parses a string like "50,000+" into { prefix: "", number: 50000, suffix: "+" }
function parseStatValue(value: string) {
  const match = value.match(/^([^\d]*)([\d,]+)(.*)$/);
  if (!match) {
    return { prefix: "", number: 0, suffix: value, hasNumber: false };
  }
  const [, prefix, numStr, suffix] = match;
  const number = parseInt(numStr.replace(/,/g, ""), 10);
  return { prefix, number, suffix, hasNumber: true };
}

function formatWithCommas(num: number) {
  return num.toLocaleString("en-US");
}

// Animates a count from 0 up to the target number once triggered
function useCountUp(target: number, shouldStart: boolean, duration = 1500) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!shouldStart) return;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [shouldStart, target, duration]);

  return value;
}

function AnimatedStatValue({
  value,
  isVisible,
}: {
  value: string;
  isVisible: boolean;
}) {
  const { prefix, number, suffix, hasNumber } = parseStatValue(value);
  const animatedNumber = useCountUp(number, isVisible);

  if (!hasNumber) return <>{value}</>;

  return (
    <>
      {prefix}
      {formatWithCommas(animatedNumber)}
      {suffix}
    </>
  );
}

// Reveals `text` one character at a time, without ever shrinking the
// element's footprint (the un-typed remainder is rendered invisibly so
// nothing below the block shifts while typing is in progress).
function useTypewriter(
  text: string,
  {
    speed = 16,
    startDelay = 400,
  }: { speed?: number; startDelay?: number } = {},
) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsDone(false);

    let i = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        i += 1;
        setDisplayedText(text.slice(0, i));

        if (i >= text.length) {
          if (intervalId) clearInterval(intervalId);
          setIsDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayedText, isDone };
}

export default function UniversityHeroWithStats({
  university,
  stats,
}: HeroSectionProps) {
  const uniName = university?.name || "Amity";
  const uniFullName = university?.fullName || uniName;

  const hasOnlineWord = uniName.toLowerCase().includes("online");
  const displayHeading = hasOnlineWord ? uniName : `${uniName} Online`;

  const aiOverviewCopy = `${uniFullName} Online offers flexible, industry-focused online degree programs from ${uniFullName}, empowering learners to access quality education, develop practical skills, and achieve career growth through an advanced digital learning experience.`;

  const { displayedText: aiOverviewText, isDone: aiOverviewDone } =
    useTypewriter(aiOverviewCopy, { speed: 16, startDelay: 400 });

  const youtubeVideoId = "po5P0XIUT2k";

  const statsData = [
    {
      icon: Users,
      value: stats?.learners || "50,000+",
      label: "Learners",
    },
    {
      icon: Globe,
      value: stats?.countries || "150+",
      label: "Countries Reached",
    },
    {
      icon: BookOpen,
      value: stats?.programs || "150+",
      label: "Programs",
    },
    {
      icon: Building2,
      value: stats?.campuses || "10+",
      label: "Global Campuses",
    },
  ];

  // Trigger count-up animation once the stats section scrolls into view
  const statsSectionRef = useRef<HTMLElement | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const node = statsSectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b -mt-2 sm:-mt-3 lg:-mt-4 pt-2 sm:pt-3 lg:pt-4 pb-6 lg:pb-8">
        <div className="absolute inset-0 opacity-[0.03] [mask-image:linear-gradient(to_bottom,white,transparent)]">
          <svg className="h-full w-full" fill="none" viewBox="0 0 400 400">
            <defs>
              <pattern
                id="hero-grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 40L40 40M40 0L40 40"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-0 sm:px-6 sm:py-0 lg:px-8 pb-8 sm:pb-12 lg:pb-16">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 leading-tight sm:text-4xl md:text-4xl lg:text-4xl">
                {displayHeading.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-red-500">
                  {displayHeading.split(" ").slice(-1)}
                </span>
              </h1>

              {/* AI Overview with typewriter effect */}
              <div className="max-w-xl">
                <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wide text-amber-600">
                  <Sparkles className="h-3.5 w-3.5" />
                  <div className="text-[#1e293b] text-[15px] font-medium">
                    AI Overview
                  </div>
                </div>

                <p className="text-base text-gray-600 leading-relaxed">
                  <span>{aiOverviewText}</span>
                  <span
                    className={`ml-0.5 inline-block h-4 w-[2px] translate-y-[2px] bg-red-500 sm:h-[18px] ${
                      aiOverviewDone ? "animate-pulse" : ""
                    }`}
                    aria-hidden="true"
                  />
                  {/* Reserves the final space up front so nothing below shifts while typing */}
                  <span className="invisible">
                    {aiOverviewCopy.slice(aiOverviewText.length)}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap pb-2 [&::-webkit-scrollbar]:hidden">
                <div className="text-left leading-none flex-shrink-0">
                  <p className="text-lg font-black text-slate-600">NAAC</p>
                  <p className="-mt-0.5 text-lg font-black text-red-500">
                    GRADE A+
                  </p>
                  <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                    Accredited University
                  </p>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="text-2xl">✺</span>
                  <div className="leading-none">
                    <p className="text-sm font-black text-blue-900">UGC-DEB</p>
                    <p className="text-sm font-black text-blue-900">APPROVED</p>
                  </div>
                </div>

                <div className="flex items-baseline gap-1.5 flex-shrink-0">
                  <span className="text-xl font-black italic text-blue-900">
                    nirf
                  </span>
                  <span className="text-xl font-black text-red-500">
                    27<sup className="text-xs">th</sup>
                  </span>
                  <span className="text-[10px] font-bold tracking-wide text-slate-700">
                    RANKING
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4">
                <Link
                  href="https://ecampusapp.com/amity-university-online/#elementor-action%3Aaction%3Dpopup%3Aopen%26settings%3DeyJpZCI6IjEzMjMxIiwidG9nZ2xlIjpmYWxzZX0%3D"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-red-200 transition-transform hover:scale-[1.02] hover:bg-red-600 active:scale-[0.98] sm:w-auto"
                >
                  Apply to University
                </Link>

                <a
                  href="https://ecampusapp.com/amity-university-online/#elementor-action%3Aaction%3Dpopup%3Aopen%26settings%3DeyJpZCI6IjEzMjMxIiwidG9nZ2xlIjpmYWxzZX0%3D"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-center text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto"
                >
                  <Download className="h-4 w-4" />
                  Download Brochure
                </a>
              </div>
            </div>

            <div className="relative px-0 sm:px-4">
              <div className="relative z-10 mt-12 overflow-hidden shadow-2xl shadow-slate-200 ring-1 ring-slate-200">
                <div className="w-full h-[260px] sm:h-[320px] md:h-[380px]">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                    title={`${uniFullName} Video`}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
    </>
  );
}
