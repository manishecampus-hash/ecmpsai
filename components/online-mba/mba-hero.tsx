"use client";

import React, { useState, useEffect } from "react";
import {
  Award,
  BookOpenCheck,
  CalendarDays,
  Download,
  Globe2,
  GraduationCap,
  Landmark,
  ShieldCheck,
  Star,
  UsersRound,
  Sparkles,
} from "lucide-react";

const stats = [
  { label: "Duration", value: "24 Months", icon: CalendarDays },
  { label: "Learning Mode", value: "100% Online", icon: BookOpenCheck },
  { label: "Program Level", value: "Master's", icon: GraduationCap },
  { label: "Community", value: "80+ Countries", icon: Globe2 },
];

const recognitionLogos = [
  {
    src: "/ggubanner/amity-online-university-logo_2.webp",
    alt: "AACSB Accredited",
  },
  { src: "/ggubanner/cu-online.webp", alt: "WES Recognized" },
  {
    src: "/ggubanner/sharda-university-online-up-logo.webp",
    alt: "75+ Years of Legacy",
  },
];

const descriptionText =
  "A flexible online MBA designed for working professionals who want to build core business skills, sharpen strategic thinking and grow into leadership roles. Gain practical management insights, develop data-driven decision-making skills, and learn to lead teams and drive results in a rapidly evolving global business environment.";

export default function MbaHeroSection() {
  const [aiText, setAiText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    if (aiText.length < descriptionText.length) {
      const timer = setTimeout(() => {
        setAiText(descriptionText.slice(0, aiText.length + 1));
      }, 30);

      return () => clearTimeout(timer);
    } else {
      setIsTypingDone(true);
    }
  }, [aiText]);

  return (
    <section className="w-full overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid w-full gap-7 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-8 lg:items-start">
          {/* Left Content */}
          <div className="min-w-0 w-full">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="min-w-0 w-full">
                <p className="text-xs font-bold uppercase tracking-wide text-red-600 sm:text-sm">
                  Master's Program
                </p>

                <h1 className="mt-2 break-words text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                  Compare & Apply from 100+{" "}
                  <span className="text-red-500">
                    Online MBA Universities
                  </span>
                </h1>

                <div className="mt-4">
                  <div className="mb-2 inline-flex max-w-full items-center gap-1.5 text-xs font-black uppercase tracking-wide text-amber-600">
                    <Sparkles className="h-3.5 w-3.5 flex-none" />
                    <div className="text-[14px] font-medium normal-case text-[#1e293b]">
                      AI Overview
                    </div>
                  </div>

                  <p className="max-w-3xl break-words text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                    <span>{aiText}</span>

                    <span
                      className={`ml-0.5 inline-block h-4 w-[2px] translate-y-[2px] bg-red-500 sm:h-[18px] ${
                        isTypingDone ? "animate-pulse" : ""
                      }`}
                      aria-hidden="true"
                    />

                    {/* Reserves the final space up front so nothing below shifts while typing */}
                    <span className="invisible">
                      {descriptionText.slice(aiText.length)}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center sm:gap-4">
              <button className="inline-flex h-11 w-full items-center justify-center rounded-[13px] bg-[#f83d46] px-5 text-sm font-bold text-white shadow-[0_10px_18px_rgba(248,61,70,0.28)] transition hover:bg-[#ef343d] active:scale-[0.99] sm:w-fit sm:min-w-[120px]">
                Apply Now
              </button>

              <button className="inline-flex h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-[13px] border border-[#dfe5ee] bg-white px-5 text-sm font-bold text-slate-800 transition hover:bg-slate-50 active:scale-[0.99] sm:w-[170px]">
                <Download className="h-4 w-4 flex-none" />
                Explore Courses
              </button>
            </div>

            {/* Stats */}
            <div className="mt-6 grid w-full grid-cols-1 gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="min-w-0 bg-white p-3 sm:p-3"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="flex h-8 w-8 flex-none items-center justify-center rounded-md bg-red-50 text-red-600">
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-slate-500 sm:text-[11px]">
                        {label}
                      </p>

                      <p className="mt-0.5 truncate text-sm font-black text-slate-950">
                        {value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card */}
          <aside className="w-full min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm lg:w-[420px]">
            <div className="relative h-[200px] bg-slate-100 xs:h-[215px] sm:h-[250px] lg:h-[246px]">
              <img
                src="/ggubanner/newbnr.png"
                alt="Online MBA program"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />

              <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-4">
                <p className="inline-flex max-w-full items-center gap-2 rounded-md border border-white/20 bg-black/35 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md sm:px-3 sm:text-[11px] sm:tracking-[0.16em]">
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                  Online MBA
                </p>

                <h2 className="mt-1 text-lg font-black leading-tight text-white sm:text-xl">
                  Learn from anywhere. Lead everywhere.
                </h2>
              </div>
            </div>

            <div className="p-3.5 sm:p-4">
              <div className="border-b border-slate-200 pb-3">
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500 sm:text-[11px]">
                  Recognition
                </p>

                <h2 className="mt-1 text-base font-black text-slate-950 sm:text-lg">
                  Globally respected credentials
                </h2>
              </div>

              <div className="relative mt-4 overflow-hidden">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-white to-transparent sm:w-8" />

                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-white to-transparent sm:w-8" />

                <div className="recognition-track flex w-max flex-nowrap items-center gap-2">
                  {[...recognitionLogos, ...recognitionLogos].map(
                    (logo, i) => (
                      <div
                        key={`${logo.alt}-${i}`}
                        className="flex h-14 w-[118px] flex-none items-center justify-center rounded-md border border-slate-200 bg-slate-50 p-2 sm:h-16 sm:w-[132px]"
                      >
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          className="max-h-10 w-auto max-w-full object-contain sm:max-h-12"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        @keyframes recognition-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .recognition-track {
          animation: recognition-scroll 14s linear infinite;
          will-change: transform;
        }

        .recognition-track:hover {
          animation-play-state: paused;
        }

        @media (max-width: 639px) {
          .recognition-track {
            animation-duration: 12s;
          }
        }
      `}</style>
    </section>
  );
}