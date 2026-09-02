"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface DBAHeroProps {
  onCtaClick?: () => void;
  ctaText?: string;
}

export function DBAHero({
  onCtaClick,
  ctaText = "Let's Talk About Your Career Goals",
}: DBAHeroProps) {
  return (
    <section className="relative z-10 w-full !m-0 !p-0">
      {/* SAME WIDTH / ALIGNMENT AS CAREER SECTION */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16 font-[Inter]">

        <div className="grid items-center gap-8 py-6 sm:gap-10 sm:py-8 lg:grid-cols-2 lg:gap-12 lg:py-8">

          {/* ================= LEFT CONTENT ================= */}
          <div className="flex flex-col items-start gap-4">

            {/* Heading */}
            <h1 className="m-0 max-w-[620px] text-[32px] font-extrabold leading-[1.15] tracking-[-0.8px] text-gray-900 sm:text-[38px] lg:text-[46px]">
              Manoj Didn't Quit His Job.
             
              But Leveled Up to{" "}
              <span className="text-red-500">'Dr.'</span>
            </h1>

            {/* Description */}
            <p className="m-0 max-w-[590px] text-[14px] leading-6 text-slate-500 sm:text-[15px] sm:leading-7">
              You've built a career. Now, build your authority. In today's
              world,{" "}
              <strong className="font-bold text-slate-800">
                personal brand is net worth.
              </strong>{" "}
              An Online DBA isn't just a title — it's your strategy for
              boardroom influence, consulting power, and global credibility.
            </p>

            {/* CTA */}
            <button
              type="button"
              onClick={onCtaClick}
              className="group mt-1 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-red-500 px-5 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-red-500/30 sm:min-h-[50px] sm:px-6"
            >
              {ctaText}

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* ================= RIGHT IMAGE AREA ================= */}
          <div className="relative flex min-h-[390px] items-center justify-center lg:min-h-[410px]">

            {/* Background Circle */}
            <div className="absolute left-1/2 top-1/2 h-[290px] w-[290px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-50 sm:h-[350px] sm:w-[350px] lg:h-[370px] lg:w-[370px]" />

            {/* Small Decoration */}
            <div className="absolute right-4 top-6 h-12 w-12 rounded-full border-[6px] border-red-50 sm:right-8 sm:top-8 sm:h-14 sm:w-14" />

            {/* Images Wrapper */}
            <div className="relative z-10 flex w-full max-w-[460px] items-end justify-center gap-3 pt-12 sm:gap-4 lg:max-w-[480px]">

              {/* ================= ARROW ================= */}
              <div className="absolute left-1/2 top-0 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap">

                <span className="text-[10px] font-bold text-slate-500">
                  From
                </span>

                <span className="text-xs font-extrabold text-red-500">
                  'Mr.'
                </span>

                <div className="relative w-9 border-t-2 border-dashed border-red-300 sm:w-12">
                  <span className="absolute -right-1.5 -top-[5px] h-2 w-2 rotate-45 border-r-2 border-t-2 border-red-500" />
                </div>

                <span className="text-xs font-extrabold text-red-500">
                  'Dr.'
                </span>

                <span className="text-[10px] font-bold text-slate-500">
                  To
                </span>

              </div>

              {/* ================= BEFORE IMAGE ================= */}
              <div className="relative w-[46%] max-w-[205px] translate-y-5 overflow-hidden rounded-xl border-4 border-white bg-slate-100 shadow-xl">

                <img
                  src="/dba/before.png"
                  alt="Professional before DBA"
                  className="block h-[250px] w-full object-cover sm:h-[300px] lg:h-[315px]"
                />

                <span className="absolute bottom-2 left-2 rounded-md bg-gray-900/90 px-2 py-1 text-[9px] font-bold text-white">
                  BEFORE DBA
                </span>

              </div>

              {/* ================= AFTER IMAGE ================= */}
              <div className="relative w-[46%] max-w-[205px] -translate-y-1 overflow-hidden rounded-xl border-4 border-white bg-slate-100 shadow-xl">

                <img
                  src="/dba/after.png"
                  alt="Professional after DBA"
                  className="block h-[250px] w-full object-cover sm:h-[300px] lg:h-[315px]"
                />

                <span className="absolute bottom-2 left-2 rounded-md bg-red-500 px-2 py-1 text-[9px] font-bold text-white">
                  AFTER DBA
                </span>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default DBAHero;