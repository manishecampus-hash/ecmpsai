"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  Download,
  IndianRupee,
  Sparkles,
  Star,
} from "lucide-react";

const highlights = [
  { label: "Duration", value: "2-3 Years", icon: Clock },
  { label: "Total Fees", value: "INR 3,50,000", icon: IndianRupee },
  { label: "EMI Starts", value: "INR 9,750/mo", icon: CreditCard },
  { label: "Mode", value: "100% Online", icon: BookOpen },
];

// Full AI Overview copy that will be "typed" out on load
const AI_OVERVIEW_TEXT =
  "Golden Gate University offers DBA program for working professionals and business leaders. The Online DBA is a 3 years long postgraduate degree, and the DBA is a doctoral level program mainly made for senior professionals and managers. These programs are career focused and offers specializations like Finance, Marketing, Human Resource, International Business, Project Management, Strategy, Leadership and many more.";

// Small reusable typewriter hook: reveals `text` one character at a time.
function useTypewriter(text, { speed = 18, startDelay = 300 } = {}) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsDone(false);

    let i = 0;
    let intervalId;

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        i += 1;
        setDisplayedText(text.slice(0, i));

        if (i >= text.length) {
          clearInterval(intervalId);
          setIsDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayedText, isDone };
}

export default function GGUDoctorateHero() {
  const [seatsLeft, setSeatsLeft] = useState(12);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { displayedText: aiOverviewText, isDone: aiOverviewDone } =
    useTypewriter(AI_OVERVIEW_TEXT, { speed: 16, startDelay: 400 });

  useEffect(() => {
    const timer = setInterval(() => {
      setSeatsLeft((prev) => (prev > 3 ? prev - 1 : prev));
    }, 45000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="font-sans relative overflow-hidden border-b border-slate-100 bg-slate-50 pt-4 pb-4 lg:pt-6 lg:pb-6">
      <div className="absolute inset-0 opacity-[0.03] [mask-image:linear-gradient(to_bottom,white,transparent)]">
        <svg className="h-full w-full" fill="none" viewBox="0 0 400 400">
          <defs>
            <pattern
              id="ggu-dba-grid"
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
          <rect width="100%" height="100%" fill="url(#ggu-dba-grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-1.5 text-sm font-bold text-red-600">
              <Award className="h-4 w-4" />
              Doctorate Program
            </div>

            <div className="mt-3 mb-4 flex w-fit items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-xs font-bold text-amber-700 ring-1 ring-amber-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
              </span>
              ONLY {seatsLeft} SEATS LEFT FOR JUNE 2026 BATCH
            </div>

            <h1 className="mt-2 text-2xl font-black tracking-tight text-gray-900 sm:text-4xl lg:text-3xl">
              Online DBA from{" "}
              <span className="text-red-500">Golden Gate University</span>
            </h1>

            {/* AI Overview with typewriter effect */}
            <div className="mt-4 max-w-xl">
              <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wide text-amber-600">
                <Sparkles className="h-3.5 w-3.5" />
                AI Overview
              </div>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                <span>{aiOverviewText}</span>
                <span
                  className={`ml-0.5 inline-block h-4 w-[2px] translate-y-[2px] bg-red-500 sm:h-[18px] ${
                    aiOverviewDone ? "animate-pulse" : ""
                  }`}
                  aria-hidden="true"
                />
                {/* Reserves the final space up front so nothing below shifts while typing */}
                <span className="invisible">
                  {AI_OVERVIEW_TEXT.slice(aiOverviewText.length)}
                </span>
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-4">
              <Link
                href="#apply"
                className="inline-flex items-center gap-2 rounded-full bg-red-500 px-8 py-3 text-sm font-black text-white shadow-lg shadow-red-100 transition hover:bg-red-600"
              >
                Apply Now
                <ChevronRight className="h-4 w-4" />
              </Link>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
              >
                <Download className="h-4 w-4" />
                Brochure
              </button>
            </div>
          </div>

          {/* RIGHT: VIDEO CARD */}
          <div className="relative">
            <div className="relative z-10 overflow-hidden rounded-3xl shadow-2xl ring-1 ring-slate-200">
              {/* Thumbnail */}
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1000&auto=format&fit=crop&q=80"
                alt="Golden Gate University DBA Program Overview"
                className="h-[420px] w-full object-cover"
              />

              {/* Play button overlay */}
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/35 transition hover:bg-black/45"
              >
                <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white/95 shadow-2xl transition hover:scale-105">
                  <span className="ml-1 border-y-[13px] border-l-[22px] border-r-0 border-y-transparent border-l-red-500" />
                </div>
              </button>

              {/* Video label */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl bg-white/90 px-3.5 py-2 shadow-md backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                <span className="text-xs font-bold text-slate-800">
                  Watch Program Overview
                </span>
                <span className="text-[11px] font-semibold text-slate-400">
                  3:10 min
                </span>
              </div>
            </div>

            {/* Rating badge */}
            <div className="absolute -right-4 top-6 z-20 hidden rounded-2xl bg-white/90 p-4 shadow-xl ring-1 ring-slate-100 backdrop-blur lg:block">
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Learner Rating
                  </p>
                  <p className="text-sm font-black text-gray-900">4.8/5</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
              >
                <Icon className="h-5 w-5 shrink-0 text-red-500" />

                <p className="text-xs font-bold uppercase text-slate-500 whitespace-nowrap">
                  {item.label}
                </p>

                <p className="text-base font-black text-gray-900 whitespace-nowrap">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative aspect-video w-[90vw] max-w-3xl overflow-hidden rounded-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/80"
              onClick={() => setIsVideoOpen(false)}
            >
              ✕
            </button>
            <iframe
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1"
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
