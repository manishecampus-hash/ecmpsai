import React from "react";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden min-h-[720px] bg-white">
      <div className="relative min-h-[640px] md:min-h-[700px] grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Side */}
        <div className="relative min-h-[360px] md:min-h-[700px] flex items-center justify-center md:justify-end px-6 md:px-20">
          <img
            src="/compare/heropage.png"
            alt="Rushford University"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/35" />

          <div className="relative z-10 max-w-[520px] text-center md:text-left md:mr-16">
            <h1 className="text-[44px] sm:text-[58px] md:text-[64px] lg:text-[68px] font-extrabold leading-[1.12] text-[#54107a]">
              Rushford
              <br />
              University
            </h1>

            <p className="mt-5 text-lg sm:text-xl md:text-2xl font-extrabold text-[#111827]">
              Inspiring Minds, Building Futures.
            </p>

            <p className="mt-4 text-base sm:text-lg md:text-[22px] leading-relaxed text-black max-w-[470px]">
              A legacy of academic excellence, innovation and leadership.
            </p>

            <button className="mt-7 inline-flex items-center justify-center gap-3 min-w-[268px] h-[58px] rounded-[4px] bg-[#581184] px-8 text-lg font-bold text-white shadow-md transition-transform hover:scale-[1.03]">
              Explore Rushford
              <span className="grid h-5 w-5 place-items-center rounded-full border-2 border-white text-sm leading-none">
                →
              </span>
            </button>
          </div>

          <div className="absolute bottom-0 left-0 h-[36%] w-full bg-[#67109d]/80 [clip-path:ellipse(85%_65%_at_7%_100%)]" />
          <div className="absolute bottom-0 left-0 h-[28%] w-full bg-[#8f1bd1]/55 [clip-path:ellipse(75%_62%_at_3%_100%)]" />
        </div>

        {/* Right Side */}
        <div className="relative min-h-[360px] md:min-h-[700px] flex items-center justify-center md:justify-start px-6 md:px-20">
          <img
            src="/compare/heropage.png"
            alt="SSBM University"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/15" />

          <div className="relative z-10 max-w-[520px] text-center md:text-left md:ml-16">
            <h1 className="text-[44px] sm:text-[58px] md:text-[64px] lg:text-[68px] font-extrabold leading-[1.12] text-[#54107a]">
              SSBM
              <br />
              University
            </h1>

            <p className="mt-5 text-lg sm:text-xl md:text-2xl font-extrabold text-[#111827]">
              Inspiring Minds, Building Futures.
            </p>

            <p className="mt-4 text-base sm:text-lg md:text-[22px] leading-relaxed text-black max-w-[470px]">
              A legacy of academic excellence, innovation and leadership.
            </p>

            <button className="mt-7 inline-flex items-center justify-center gap-3 min-w-[236px] h-[58px] rounded-[4px] bg-[#1f5689] px-8 text-lg font-bold text-white shadow-md transition-transform hover:scale-[1.03]">
              Explore SSBM
              <span className="grid h-5 w-5 place-items-center rounded-full border-2 border-white text-sm leading-none">
                →
              </span>
            </button>
          </div>

          <div className="absolute bottom-0 right-0 h-[36%] w-full bg-[#075b9f]/80 [clip-path:ellipse(85%_65%_at_96%_100%)]" />
          <div className="absolute bottom-0 right-0 h-[28%] w-full bg-[#1278c8]/55 [clip-path:ellipse(75%_62%_at_100%_100%)]" />
        </div>

        {/* Center Divider */}
        <div className="hidden md:block absolute left-1/2 top-0 z-20 h-full w-[3px] -translate-x-1/2 bg-white/80" />

        {/* VS Badge */}
        <div className="absolute left-1/2 top-[52%] z-30 grid h-[132px] w-[132px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 shadow-xl">
          <span className="text-5xl font-black text-[#111827]">VS</span>
        </div>
      </div>
    </section>
  );
}
