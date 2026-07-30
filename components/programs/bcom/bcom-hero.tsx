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
  Star,
} from "lucide-react";

const highlights = [
  { label: "Duration", value: "3 Years", icon: Clock },
  { label: "Total Fees", value: "INR 99,000", icon: IndianRupee },
  { label: "EMI Starts", value: "INR 2,750/mo", icon: CreditCard },
  { label: "Mode", value: "100% Online", icon: BookOpen },
];

export default function BComHero() {
  const [seatsLeft, setSeatsLeft] = useState(18);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeatsLeft((prev) => (prev > 5 ? prev - 1 : prev));
    }, 45000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-slate-50 pt-4 pb-4 lg:pt-6 lg:pb-6">
      <div className="absolute inset-0 opacity-[0.03] [mask-image:linear-gradient(to_bottom,white,transparent)]">
        <svg className="h-full w-full" fill="none" viewBox="0 0 400 400">
          <defs>
            <pattern
              id="bcom-grid"
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
          <rect width="100%" height="100%" fill="url(#bcom-grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-1.5 text-sm font-bold text-red-600">
              <Award className="h-4 w-4" />
              Undergraduate Program
            </div>

            <div className="mt-3 mb-4 flex w-fit items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-xs font-bold text-amber-700 ring-1 ring-amber-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
              </span>
              ONLY {seatsLeft} SEATS LEFT FOR JUNE 2026 BATCH
            </div>

            <h1 className="mt-2 text-2xl font-black text-gray-900 sm:text-3xl lg:text-3xl">
              Online B.Com in{" "}
              <span className="text-red-500">Accounting & Finance</span>
            </h1>

            <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Build a strong commerce foundation with accounting, finance,
              taxation, business law, and management concepts through a flexible
              online degree program.
            </p>

            <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Build a strong commerce foundation with accounting, finance,
              taxation, business law, and management concepts through a flexible
              online degree program.
            </p>

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
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1000&auto=format&fit=crop&q=80"
                alt="Online B.Com Program Overview"
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
                  2:45 min
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
                  <p className="text-sm font-black text-gray-900">4.7/5</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50">
                  <Icon className="h-4 w-4 text-red-500" />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                    {item.label}
                  </p>

                  <p className="truncate text-sm font-bold text-gray-900 sm:text-base">
                    {item.value}
                  </p>
                </div>
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
