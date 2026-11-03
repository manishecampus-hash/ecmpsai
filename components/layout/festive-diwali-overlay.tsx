"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface FestiveDiwaliOverlayProps {
  className?: string;
  allowDismiss?: boolean;
}

export function FestiveDiwaliOverlay({
  className = "",
  allowDismiss = true,
}: FestiveDiwaliOverlayProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const dismissed = sessionStorage.getItem("ecampus_diwali_overlay_dismissed");
        if (dismissed === "true") {
          setIsDismissed(true);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    try {
      sessionStorage.setItem("ecampus_diwali_overlay_dismissed", "true");
    } catch {
      // Ignore storage errors
    }
  };

  if (isDismissed) return null;

  return (
    <>
      <style>{`
        @keyframes diwaliLanternSwayLeft {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(2deg);
          }
          100% {
            transform: rotate(-1.5deg);
          }
        }

        @keyframes diwaliLanternSwayRight {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-2deg);
          }
          100% {
            transform: rotate(1.5deg);
          }
        }

        @keyframes diwaliFlamePulse {
          0%, 100% {
            filter: drop-shadow(0 6px 18px rgba(245, 158, 11, 0.4)) brightness(1);
          }
          50% {
            filter: drop-shadow(0 10px 28px rgba(251, 191, 36, 0.65)) brightness(1.06);
          }
        }

        .diwali-lantern-container {
          transform-origin: top center;
          animation: diwaliFlamePulse 4s ease-in-out infinite;
        }

        .diwali-sway-left {
          animation: diwaliLanternSwayLeft 7s ease-in-out infinite alternate, diwaliFlamePulse 4s ease-in-out infinite;
        }

        .diwali-sway-right {
          animation: diwaliLanternSwayRight 7s ease-in-out infinite alternate, diwaliFlamePulse 4s ease-in-out infinite;
        }
      `}</style>

      {/* Hanging Lanterns in left and right whitespace - leaves the header and content completely clear */}
      <aside
        aria-label="Festive Diwali Decoration"
        className={`pointer-events-none fixed inset-0 z-[70] w-full select-none overflow-hidden ${className}`}
      >
        {/* Left Side Hanging Lantern & Diya */}
        <div className="absolute top-0 left-0 sm:left-1 md:left-2 lg:left-3 xl:left-5 2xl:left-8 w-[65px] sm:w-[85px] md:w-[105px] lg:w-[125px] xl:w-[145px] 2xl:w-[165px] diwali-lantern-container diwali-sway-left">
          <Image
            src="/festive/diwali_lantern_left.png"
            alt="Diwali Hanging Lantern"
            width={728}
            height={1345}
            priority
            className="w-full h-auto object-contain pointer-events-none"
          />
        </div>

        {/* Right Side Hanging Lantern & Diya */}
        <div className="absolute top-0 right-0 sm:right-1 md:right-2 lg:right-3 xl:right-5 2xl:right-8 w-[65px] sm:w-[85px] md:w-[105px] lg:w-[125px] xl:w-[145px] 2xl:w-[165px] diwali-lantern-container diwali-sway-right">
          <Image
            src="/festive/diwali_lantern_right.png"
            alt="Diwali Hanging Lantern"
            width={728}
            height={1345}
            priority
            className="w-full h-auto object-contain pointer-events-none"
          />
        </div>

        {/* Subtle Session Dismiss Button */}
        {allowDismiss && (
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Hide Diwali decoration"
            title="Hide festive lanterns"
            className="pointer-events-auto absolute top-2 right-2 flex items-center justify-center rounded-full bg-white/70 hover:bg-white text-slate-500 hover:text-slate-800 p-1 text-[10px] shadow-xs border border-amber-200/60 backdrop-blur-xs transition-all opacity-30 hover:opacity-100 cursor-pointer"
          >
            ✕
          </button>
        )}
      </aside>
    </>
  );
}

export default FestiveDiwaliOverlay;
