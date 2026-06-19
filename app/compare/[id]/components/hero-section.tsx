import React from "react";

export default function HeroSection() {
  return (
    <div className="relative w-full overflow-hidden min-h-[600px] md:h-[500px]">
      {/* Background Image */}
      <img
        src="/compare/home.png"
        alt="University Comparison"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Light Overlay */}
      <div className="absolute inset-0 bg-white/70" />

      {/* Content Container */}
      <div className="relative h-full flex flex-col md:flex-row justify-center md:justify-between items-center px-6 md:px-16 lg:px-24 py-12 gap-10 md:gap-4 z-10 text-black">
        {/* Left Content */}
        <div className="flex-1 w-full text-center md:text-left flex flex-col items-center md:items-start">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold text-[#4a1472] leading-tight break-words">
            Amity University
          </h2>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 leading-snug">
            Inspiring Minds, Building Futures.
          </p>
          <p className="mt-3 text-sm md:text-base lg:text-lg text-gray-700 max-w-sm">
            A legacy of academic excellence, innovation and leadership.
          </p>
          <button className="mt-8 px-6 py-3 md:px-8 md:py-3 bg-[#4a1472] text-white rounded-full font-bold hover:scale-105 transition-transform shrink-0">
            Explore Amity
          </button>
        </div>

        {/* Right Content */}
        <div className="flex-1 w-full text-center md:text-right flex flex-col items-center md:items-end">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold text-[#4a1472] leading-tight break-words">
            Manipal University
          </h2>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 leading-snug">
            Inspiring Minds, Building Futures.
          </p>
          <p className="mt-3 text-sm md:text-base lg:text-lg text-gray-700 max-w-sm">
            A legacy of academic excellence, innovation and leadership.
          </p>
          <button className="mt-8 px-6 py-3 md:px-8 md:py-3 bg-[#1f4a7b] text-white rounded-full font-bold hover:scale-105 transition-transform shrink-0">
            Explore Manipal
          </button>
        </div>
      </div>
    </div>
  );
}
