"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, CheckCircle2, Sparkles } from "lucide-react";
// import { Header } from "../ui/header-3";

interface HeroSectionProps {
  university?: {
    name?: string;
    fullName?: string;
    image?: string;
  };
}

export default function HeroSection({ university }: HeroSectionProps) {
  const uniName = university?.name || "Amity";
  const uniFullName = university?.fullName || uniName;

  const defaultHeroImage = "/newuniversities/amity.png";
  const activeHeroImage = defaultHeroImage;

  const hasOnlineWord = uniName.toLowerCase().includes("online");
  const displayHeading = hasOnlineWord ? uniName : `${uniName} Online`;

  return (
    <>
      {/* <Header /> */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-slate-50 pt-12 pb-14 lg:pt-14 lg:pb-16">
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

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <Link
                href="/"
                className="inline-flex items-center text-sm font-bold text-slate-500 transition-colors hover:text-red-500"
              >
                <ChevronLeft className="mr-1 h-4 w-4 stroke-[2.5]" />
                Back to Universities
              </Link>

              <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-1.5 text-xs font-extrabold text-red-600 uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                UGC Entrusted Degree
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900 leading-tight sm:text-5xl lg:text-6xl">
                {displayHeading} <br />
                <span className="text-red-500">Degree Programs</span>
              </h1>

              <p className="max-w-xl text-base text-gray-600 leading-relaxed sm:text-lg">
                Advance your career potential with globally accredited
                undergraduate and postgraduate qualifications. Experience
                premium, flexible distance education from{" "}
                <strong>{uniFullName}</strong> built entirely around your
                routine.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="#apply"
                  className="flex items-center justify-center rounded-xl bg-red-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-red-200 transition-all hover:scale-[1.02] hover:bg-red-600 active:scale-[0.98]"
                >
                  Apply Now
                </Link>

                <a
                  href="#catalog"
                  className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-8 py-3 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50"
                >
                  Explore Courses
                </a>
              </div>
            </div>

            <div className="relative px-4 sm:px-0">
              <div className="relative z-10 overflow-hidden rounded-3xl shadow-2xl shadow-slate-200 ring-1 ring-slate-200">
                <img
                  src={activeHeroImage}
                  alt={`${uniFullName} Digital Campus`}
                  className="h-[360px] w-full object-cover sm:h-[420px]"
                />
              </div>

              <div className="absolute -bottom-4 -left-2 z-20 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-100 sm:-left-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-green-100 p-2 text-green-600">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Academic Status
                    </p>
                    <p className="text-sm font-black text-gray-900">
                      Admissions Open 2026
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
