"use client";

import Link from "next/link";

type HeroSectionProps = {
  a: any;
  b: any;
};

export function HeroSection({ a, b }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-[620px] overflow-hidden -translate-y-10">
      {/* Full width background image */}
      <img
        src="/compare/heropage.png"
        alt="University comparison"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Left content — Amity */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center -translate-x-[250px] -translate-y-[50px]">
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-black leading-tight mb-3">
            Amity
            <br />
            University
          </h2>

          <p className="text-sm md:text-base font-bold text-black mb-2">
            Inspiring Minds, Building Futures.
          </p>

          <p className="text-sm text-black/95 leading-relaxed mb-7 max-w-[260px] mx-auto">
            Amity University is a leading private institution known for quality
            education and industry connections.
          </p>

          <Link
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#3b1073" }}
          >
            Explore Amity
            <span className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold">
              ➔
            </span>
          </Link>
        </div>
      </div>

      {/* Right content — Manipal */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center translate-x-[250px] -translate-y-[50px]">
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-black leading-tight mb-3">
            Manipal
            <br />
            University
          </h2>

          <p className="text-sm md:text-base font-bold text-black mb-2">
            Inspiring Minds, Building Futures.
          </p>

          <p className="text-sm text-black/95 leading-relaxed mb-7 max-w-[260px] mx-auto">
            Manipal University Jaipur offers quality education with a focus on
            innovation and skill development.
          </p>

          <Link
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#1e3a6e" }}
          >
            Explore Manipal
            <span className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold">
              ➔
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
