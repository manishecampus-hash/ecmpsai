"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Sparkles,
  Users,
  Globe,
  BookOpen,
  Building2,
  Award,
  Clock,
  Headphones,
} from "lucide-react";
import PlacementPartners from "./placement-partners";

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

export default function UniversityHeroWithStats({
  university,
  stats,
}: HeroSectionProps) {
  const uniName = university?.name || "Amity";
  const uniFullName = university?.fullName || uniName;

  const defaultHeroImage = "/newuniversities/amity.png";
  const activeHeroImage = defaultHeroImage;

  const hasOnlineWord = uniName.toLowerCase().includes("online");
  const displayHeading = hasOnlineWord ? uniName : `${uniName} Online`;

  const featureCards = [
    {
      icon: Award,
      title: "UGC Entitled",
      subtitle: "Online Degrees",
    },
    {
      icon: Clock,
      title: "100% Online",
      subtitle: "Flexible Learning",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      subtitle: "For Learners",
    },
  ];

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
      <section className="relative overflow-hidden border-b  -mt-4 sm:-mt-6 lg:-mt-8 pt-0 pb-6 lg:pb-8">
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
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-1.5 text-xs font-extrabold text-red-600 uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                UGC Entrusted Degree
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900 leading-tight sm:text-3xl lg:text-4xl">
                {displayHeading} <br />
                <span className="text-red-500">Degree Programs</span>
              </h1>

              <p className="max-w-xl text-base text-gray-600 leading-relaxed sm:text-lg">
                Build your future with globally recognized undergraduate and
                postgraduate degrees. Flexible, engaging and designed for your
                success.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="#apply"
                  className="flex items-center justify-center rounded-xl bg-red-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-red-200 transition-all hover:scale-[1.02] hover:bg-red-600 active:scale-[0.98]"
                >
                  Apply to University
                </Link>

                <a
                  href="#catalog"
                  className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-8 py-3 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50"
                >
                  Download Brochure
                </a>
              </div>
            </div>

            <div className="relative px-4 sm:px-0">
              <div className="relative z-10 overflow-hidden rounded-3xl shadow-2xl shadow-slate-200 ring-1 ring-slate-200">
                <img
                  src={activeHeroImage}
                  alt={`${uniFullName} Digital Campus`}
                  className="h-[360px] w-full object-cover sm:h-[480px]"
                />

                {/* Feature Cards Overlay */}
                <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center gap-2 bg-gradient-to-t from-black/40 to-transparent p-2">
                  {featureCards.map((card, idx) => {
                    const IconComponent = card.icon;

                    return (
                      <div
                        key={idx}
                        className="relative w-[110px] rounded-lg bg-white px-2 py-1 shadow-md"
                      >
                        <div className="absolute -top-2 right-1 rounded-full bg-yellow-400 px-1 py-0.5 text-[8px] font-bold text-black">
                          ⭐ 4.8
                        </div>

                        <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-slate-700">
                          <IconComponent className="h-4 w-4" />
                        </div>

                        <p className="text-[10px] font-semibold text-gray-900 text-center leading-tight">
                          {card.title}
                        </p>

                        <p className="text-[8px] text-gray-500 text-center leading-tight mt-0.5 line-clamp-2">
                          {card.subtitle}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <PlacementPartners />
    </>
  );
}
