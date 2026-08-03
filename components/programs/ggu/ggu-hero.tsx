"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Award,
  BookOpen,
  ChevronRight,
  Clock,
  CreditCard,
  Download,
  IndianRupee,
  Sparkles,
} from "lucide-react";

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
  const { displayedText: aiOverviewText, isDone: aiOverviewDone } =
    useTypewriter(AI_OVERVIEW_TEXT, { speed: 16, startDelay: 400 });

  // YouTube video id for the embedded frame (same pattern as the university hero section)
  const youtubeVideoId = "2EcAN60qp0c";

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
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 leading-tight sm:text-4xl md:text-4xl lg:text-4xl">
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

          {/* RIGHT: VIDEO FRAME SECTION (direct YouTube embed, no thumbnail/modal) */}
          <div className="relative">
            <div className="relative z-10 overflow-hidden  shadow-2xl ring-1 ring-slate-200">
              <div className="w-full h-[300px] sm:h-[360px] lg:h-[350px]">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                  title="Golden Gate University DBA Program Overview"
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
  );
}
