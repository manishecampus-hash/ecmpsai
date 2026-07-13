"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  MapPin,
  UsersRound,
} from "lucide-react";
import { universities } from "@/data/universities";

const CARDS_PER_PAGE = 3;

export default function UniversitySection() {
  const [page, setPage] = useState(0);

  const universityPages = useMemo(() => {
    const pages = [];

    for (let i = 0; i < universities.length; i += CARDS_PER_PAGE) {
      pages.push(universities.slice(i, i + CARDS_PER_PAGE));
    }

    return pages;
  }, []);

  const currentUniversities = universityPages[page] || [];
  const totalPages = universityPages.length;

  const goPrev = () => {
    setPage((current) => (current === 0 ? totalPages - 1 : current - 1));
  };

  const goNext = () => {
    setPage((current) => (current === totalPages - 1 ? 0 : current + 1));
  };

  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-red-50 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-red-600">
            Top Online Universities
          </span>

          <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
            Compare Universities for{" "}
            <span className="text-red-500">Online B.Com</span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-500">
            Shortlist trusted universities based on location, course portfolio,
            and online learning flexibility.
          </p>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-[0_8px_20px_rgba(15,23,42,0.14)] transition hover:border-red-200 hover:text-red-500 lg:flex"
            aria-label="Previous universities"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.4} />
          </button>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentUniversities.map((university, index) => {
              const actualIndex = page * CARDS_PER_PAGE + index;

              return (
                <article
                  key={university.slug || university.name}
                  className="group relative flex min-h-[390px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_20px_50px_rgba(15,23,42,0.14)]"
                >
                  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-red-50 via-white to-slate-50" />

                  <div className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[11px] font-black text-red-500 shadow-sm ring-1 ring-red-100">
                    #{actualIndex + 1}
                  </div>

                  <div className="relative flex h-full flex-col">
                    <div className="flex items-center justify-center pt-5">
                      <div className="flex h-20 w-44 items-center justify-center rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
                        <Image
                          src={university.image}
                          alt={university.name}
                          width={180}
                          height={70}
                          className="max-h-14 w-auto object-contain"
                        />
                      </div>
                    </div>

                    <div className="mt-6 text-center">
                      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                        Online University
                      </p>

                      <h3 className="mx-auto mt-2 line-clamp-2 min-h-[48px] max-w-xs text-lg font-black leading-6 text-slate-950">
                        {university.name}
                      </h3>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-slate-50 p-3 text-center">
                        <GraduationCap className="mx-auto mb-1 h-4 w-4 text-red-500" />
                        <p className="text-[11px] font-bold text-slate-500">
                          Courses
                        </p>
                        <p className="mt-0.5 text-xs font-black text-slate-900">
                          {university.courses}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-3 text-center">
                        <MapPin className="mx-auto mb-1 h-4 w-4 text-red-500" />
                        <p className="text-[11px] font-bold text-slate-500">
                          Region
                        </p>
                        <p className="mt-0.5 text-xs font-black text-slate-900">
                          {university.region}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700">
                      <UsersRound className="h-4 w-4 shrink-0" />
                      <span>Trusted by 50,000+ Students</span>
                    </div>

                    <button
                      type="button"
                      className="mt-auto flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-red-500 text-sm font-black text-white transition-all duration-200 hover:bg-red-600 group-hover:shadow-[0_12px_26px_rgba(239,68,68,0.28)]"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            onClick={goNext}
            className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-[0_8px_20px_rgba(15,23,42,0.14)] transition hover:border-red-200 hover:text-red-500 lg:flex"
            aria-label="Next universities"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.4} />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={goPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:text-red-500"
            aria-label="Previous universities"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.4} />
          </button>

          <button
            type="button"
            onClick={goNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:text-red-500"
            aria-label="Next universities"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </section>
  );
}
