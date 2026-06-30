"use client";

import React, { useEffect, useRef, useState } from "react";

export default function ScrollBallEffect() {
  const effectSectionRef = useRef(null);
  const [ballPosition, setBallPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: [0, 0.5, 1],
        rootMargin: "0px",
      },
    );

    if (effectSectionRef.current) {
      observer.observe(effectSectionRef.current);
    }

    return () => {
      if (effectSectionRef.current) {
        observer.unobserve(effectSectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !effectSectionRef.current) return;

    const handleScroll = () => {
      const section = effectSectionRef.current;
      const sectionRect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;

      const scrollProgress = Math.max(
        0,
        Math.min(
          1,
          (sectionHeight - sectionRect.top) /
            (window.innerHeight + sectionHeight),
        ),
      );

      const position = (scrollProgress * 4) % 1;
      setBallPosition(position);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  const getBallCoordinates = (progress) => {
    const segmentIndex = Math.floor(progress * 4);
    const segmentProgress = (progress * 4) % 1;

    const segments = [
      { startX: 0, endX: 250, centerX: 125, baselineY: 100 },
      { startX: 250, endX: 500, centerX: 375, baselineY: 100 },
      { startX: 500, endX: 750, centerX: 625, baselineY: 100 },
      { startX: 750, endX: 1000, centerX: 875, baselineY: 100 },
    ];

    const segment = segments[Math.min(segmentIndex, 3)];
    const radius = (segment.endX - segment.startX) / 2;

    const angle = segmentProgress * Math.PI;
    const x = segment.centerX + Math.cos(angle + Math.PI) * radius;
    const y = segment.baselineY - Math.sin(angle) * radius;

    return {
      x: (x / 1000) * 100,
      y: (y / 180) * 100,
    };
  };

  const { x, y } = getBallCoordinates(ballPosition);

  const badges = [
    { icon: "⭐", title: "Rated 4.9/5" },
    { icon: "🛡️", title: "Verified Partner" },
    { icon: "🎯", title: "100% Guidance" },
    { icon: "🤝", title: "Trusted by Students" },
  ];

  return (
    <section ref={effectSectionRef} className="w-full py-8 md:py-12">
      <div className="relative mx-auto h-40 sm:h-48 md:h-56 w-full max-w-6xl px-2 sm:px-4 md:px-6">
        <svg
          className="h-full w-full"
          viewBox="0 0 1000 180"
          preserveAspectRatio="none"
          style={{ overflow: "visible" }}
        >
          <path
            d="M 0 100 A 125 125 0 0 1 250 100"
            fill="none"
            stroke="#d1d5db"
            strokeWidth="2"
            strokeDasharray="5,5"
          />

          <path
            d="M 250 100 A 125 125 0 0 1 500 100"
            fill="none"
            stroke="#d1d5db"
            strokeWidth="2"
            strokeDasharray="5,5"
          />

          <path
            d="M 500 100 A 125 125 0 0 1 750 100"
            fill="none"
            stroke="#d1d5db"
            strokeWidth="2"
            strokeDasharray="5,5"
          />

          <path
            d="M 750 100 A 125 125 0 0 1 1000 100"
            fill="none"
            stroke="#d1d5db"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        </svg>

        {/* Trust Badges */}
        <div className="absolute inset-0">
          {badges.map((item, index) => (
            <div
              key={index}
              className="absolute flex flex-col items-center text-center"
              style={{
                left: `${12.5 + index * 25}%`,
                top: "35%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="mb-1 sm:mb-2 flex h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 items-center justify-center rounded-full border border-orange-100 bg-white text-sm sm:text-xl md:text-3xl shadow-lg">
                {item.icon}
              </div>

              <h4 className="max-w-[60px] sm:max-w-[100px] md:max-w-none text-[8px] sm:text-xs md:text-sm font-semibold leading-tight text-slate-900">
                {item.title}
              </h4>
            </div>
          ))}
        </div>

        {/* Moving Ball */}
        <div
          className="absolute h-3 w-3 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded-full bg-orange-500 shadow-lg transition-all duration-100"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </section>
  );
}
