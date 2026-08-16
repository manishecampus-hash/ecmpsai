"use client";

import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-20 h-[550px] w-[650px] rounded-full bg-red-50/70 blur-3xl" />

        <div className="absolute right-[20%] top-[35%] h-[350px] w-[350px] rounded-full bg-red-50/40 blur-3xl" />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="relative mx-auto grid min-h-[550px] max-w-[1300px] items-center gap-6 px-6 py-6 sm:px-8 lg:grid-cols-[48%_52%] lg:px-12 lg:py-8">
        {/* ===================================================
            LEFT CONTENT
        ==================================================== */}

        <div className="relative z-30 max-w-[700px]">
          {/* Badge */}

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ff3b4d] text-[10px] text-white">
              ✦
            </span>

            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#ff3b4d] sm:text-[11px]">
              University Comparison
            </span>
          </div>

          {/* Heading */}

          <h1 className="max-w-[700px] text-[36px] font-bold leading-[1.1] tracking-[-2.5px] text-[#0f1f3d] sm:text-[44px] lg:text-[52px] xl:text-[56px]">
            <span className="text-[#ff3b4d]">IGNOU</span> <span>vs</span>{" "}
            <span className="text-[#ff3b4d]">100%</span>
            <br />
            <span>Online Universities</span>
            <sup className="ml-1 align-top text-[10px] font-bold sm:text-[12px]">
              TM
            </sup>
          </h1>

          {/* Description */}

          <p className="mt-6 max-w-[650px] text-[16px] leading-7 text-slate-500 sm:text-[18px] sm:leading-8">
            <strong className="font-bold text-[#0f1f3d]">
              11 Honest Questions.
            </strong>{" "}
            Confused Between IGNOU & Online Universities? Get the Clarity You
            Need to Choose Right.
          </p>

          {/* CTA */}

          <Link
            href="/compare/result"
            className="group mt-7 flex h-[58px] w-full max-w-[430px] items-center justify-center gap-3 rounded-xl bg-[#ff3b4d] px-7 text-[18px] font-bold text-white shadow-[6px_7px_0px_#0f1f3d] transition-all duration-200 hover:-translate-y-1 hover:bg-[#f52f43] hover:shadow-[4px_5px_0px_#0f1f3d] sm:h-[62px] sm:text-[19px]"
          >
            <span>Get Started</span>

            <span className="text-2xl transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>

          {/* =================================================
              TRUST ROW
          ================================================== */}

          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-sm">
                👨🏻
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-sm">
                👩🏻
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-sm">
                👨🏽
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-sm">
                👩🏻
              </div>
            </div>

            <p className="text-[13px] text-slate-600 sm:text-[15px]">
              Built on{" "}
              <strong className="font-extrabold text-[#0f1f3d]">
                1.25 lakh
              </strong>{" "}
              student journeys
            </p>
          </div>
        </div>

        {/* ===================================================
            RIGHT HERO IMAGE
        ==================================================== */}

        <div className="relative mx-auto mt-6 h-[450px] w-full max-w-[650px] sm:h-[500px] lg:mt-0 lg:h-[520px]">
          {/* Soft red glow behind image */}

          <div className="absolute left-1/2 top-1/2 h-[450px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-50/80 blur-3xl" />

          {/* =================================================
              COMPLETE HERO IMAGE

              hero.png contains:
              - Phone
              - University cards
              - Comparison line
              - IGNOU
              - Benchmark
          ================================================== */}

          <div className="relative z-20 h-full w-full">
            <Image
              src="/ignou-vs-online/hero.png"
              alt="IGNOU vs Online Universities"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 650px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
