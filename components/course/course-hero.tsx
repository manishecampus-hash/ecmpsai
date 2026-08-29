"use client";

import React, { useState, useEffect } from "react";
import HighlightedText from "@/components/universities/HighlightedText";
import {
  CalendarDays,
  BookOpenCheck,
  GraduationCap,
  Globe2,
  Award,
  UsersRound,
  Landmark,
  ShieldCheck,
  Star,
  Sparkles,
  Download,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  CalendarDays,
  BookOpenCheck,
  GraduationCap,
  Globe2,
  Award,
  UsersRound,
  Landmark,
  ShieldCheck,
  Star,
};

export default function CourseHeroSection({ data }: { data?: any }) {
  const heading = data?.heading || data?.title;

  // If title is not present, hide whole section
  if (!heading || typeof heading !== "string" || !heading.trim()) {
    return null;
  }

  const subheading = data?.subheading;
  const descriptionText = data?.description;
  const cta1 = data?.cta1;
  const cta2 = data?.cta2;
  const image = data?.image;
  const titleSide = data?.titleSide;

  const stats = data?.stats && Array.isArray(data.stats) && data.stats.length > 0
    ? data.stats
    : null;

  const recognitionLogos = data?.logos && Array.isArray(data.logos) && data.logos.length > 0
    ? data.logos.map((src: string, i: number) => ({ src, alt: `Accreditation ${i + 1}` }))
    : null;

  const [aiText, setAiText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);

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
    } else {
      setIsTypingDone(true);
    }
  }, [aiText, descriptionText]);

  return (
    <section className="w-full overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid w-full gap-7 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-8 lg:items-start">
          {/* Left Content */}
          <div className="min-w-0 w-full">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="min-w-0 w-full">
                {subheading && (
                  <p className="text-xs font-bold uppercase tracking-wide text-red-600 sm:text-sm">
                    {subheading}
                  </p>
                )}

                <h1 className="mt-2 break-words text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                  {heading.includes("*") ? (
                    <HighlightedText text={heading} className="text-red-500" />
                  ) : heading.includes("Online MBA") ? (
                    <>
                      {heading.split("Online MBA")[0]}
                      <span className="text-red-500">Online MBA</span>
                      {heading.split("Online MBA")[1]}
                    </>
                  ) : (
                    heading
                  )}
                </h1>

                {descriptionText && (
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
                )}
              </div>
            </div>

            {/* Buttons */}
            {(cta1 || cta2) && (
              <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center sm:gap-4">
                {cta1 && (
                  <button className="inline-flex h-11 w-full items-center justify-center rounded-[13px] bg-[#f83d46] px-5 text-sm font-bold text-white shadow-[0_10px_18px_rgba(248,61,70,0.28)] transition hover:bg-[#ef343d] active:scale-[0.99] sm:w-fit sm:min-w-[120px]">
                    {cta1}
                  </button>
                )}

                {cta2 && (
                  <button className="inline-flex h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-[13px] border border-[#dfe5ee] bg-white px-5 text-sm font-bold text-slate-800 transition hover:bg-slate-50 active:scale-[0.99] sm:w-[170px]">
                    <Download className="h-4 w-4 flex-none" />
                    {cta2}
                  </button>
                )}
              </div>
            )}

            {/* Stats */}
            {stats && (
              <div className="mt-6 grid w-full grid-cols-1 gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat: any) => {
                  const Icon = ICON_MAP[stat.iconName] || CalendarDays;
                  return (
                    <div
                      key={stat.label}
                      className="min-w-0 bg-white p-3 sm:p-3"
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <div className="flex h-8 w-8 flex-none items-center justify-center rounded-md bg-red-50 text-red-600">
                          <Icon className="h-4 w-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-slate-500 sm:text-[11px]">
                            {stat.label}
                          </p>

                          <p className="mt-0.5 truncate text-sm font-black text-slate-950">
                            {stat.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Card */}
          <aside className="w-full min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm lg:w-[420px]">
            <div className="relative h-[200px] bg-slate-100 xs:h-[215px] sm:h-[250px] lg:h-[246px]">
              {image ? (
                <img
                  src={image}
                  alt="Program Hero"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400 text-sm font-semibold">
                  Image coming soon
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent pointer-events-none" />

              {(data?.name || titleSide) && (
                <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-4">
                  {data?.name && (
                    <p className="inline-flex max-w-full items-center gap-2 rounded-md border border-white/20 bg-black/35 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md sm:px-3 sm:text-[11px] sm:tracking-[0.16em]">
                      <span className="h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                      {data.name}
                    </p>
                  )}

                  {titleSide && (
                    <h2 className="mt-1 text-lg font-black leading-tight text-white sm:text-xl">
                      {titleSide.includes("*") ? (
                        <HighlightedText text={titleSide} className="text-red-500" />
                      ) : (
                        titleSide
                      )}
                    </h2>
                  )}
                </div>
              )}
            </div>

            {recognitionLogos && (
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
                      (logo: any, i: number) => (
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
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
