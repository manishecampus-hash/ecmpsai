"use client";

import React, { useState, useEffect } from "react";
import { FESTIVE_CONFIG, type FestiveThemeConfig } from "@/config/festive.config";

interface HangingDiyaOverlayProps {
  /** Optional override for festive configuration */
  config?: Partial<FestiveThemeConfig>;
  /** Optional custom CSS classes for the fixed overlay container */
  className?: string;
}

interface DiyaItemConfig {
  id: number;
  /** Horizontal position across top viewport (percentage) */
  positionPercent: number;
  /** Golden string length in pixels for desktop/tablet */
  stringLength: number;
  /** Golden string length in pixels for mobile */
  mobileStringLength?: number;
  /** Duration in seconds for gentle pendulum swing */
  swingDuration: number;
  /** Phase offset in seconds for swing */
  swingDelay: number;
  /** Phase offset in seconds for flame flicker */
  flickerDelay: number;
  /** Responsive visibility tier:
   *  "mobile"  -> shown on Mobile, Tablet, and Desktop (only corner accents)
   *  "tablet"  -> shown on Tablet and Desktop
   *  "desktop" -> shown on Desktop only
   */
  tier: "mobile" | "tablet" | "desktop";
}

// 9 balanced diyas with staggered hanging lengths.
// On Mobile: Only the right-side accent (#9) is shown with an ultra-short string
// to keep the left side (hamburger & logo) and center completely clear.
const DIYAS: DiyaItemConfig[] = [
  { id: 1, positionPercent: 3.5, stringLength: 32, swingDuration: 4.6, swingDelay: -0.6, flickerDelay: -0.2, tier: "tablet" }, // Left side: tablet and desktop only (hidden on mobile)
  { id: 2, positionPercent: 15.5, stringLength: 64, swingDuration: 5.3, swingDelay: -2.3, flickerDelay: -1.1, tier: "desktop" },
  { id: 3, positionPercent: 27.0, stringLength: 44, swingDuration: 4.2, swingDelay: -1.5, flickerDelay: -0.7, tier: "tablet" },
  { id: 4, positionPercent: 38.5, stringLength: 74, swingDuration: 5.8, swingDelay: -3.1, flickerDelay: -1.8, tier: "desktop" },
  { id: 5, positionPercent: 50.0, stringLength: 52, swingDuration: 4.9, swingDelay: -0.9, flickerDelay: -0.4, tier: "tablet" },
  { id: 6, positionPercent: 61.5, stringLength: 74, swingDuration: 5.6, swingDelay: -2.8, flickerDelay: -1.5, tier: "desktop" },
  { id: 7, positionPercent: 73.0, stringLength: 44, swingDuration: 4.4, swingDelay: -1.2, flickerDelay: -0.9, tier: "tablet" },
  { id: 8, positionPercent: 84.5, stringLength: 64, swingDuration: 5.2, swingDelay: -2.1, flickerDelay: -1.3, tier: "desktop" },
  { id: 9, positionPercent: 96.5, stringLength: 32, mobileStringLength: 10, swingDuration: 4.7, swingDelay: -0.4, flickerDelay: -0.3, tier: "mobile" }, // Right side: mobile, tablet, and desktop
];

/**
 * Single Vector Brass Diya with dynamic string length and flame
 */
function DiyaSvg({
  stringLength,
  flickerDelay,
}: {
  stringLength: number;
  flickerDelay: number;
}) {
  const S = stringLength;
  const totalHeight = S + 78;

  return (
    <svg
      viewBox={`0 0 64 ${totalHeight}`}
      width="64"
      height={totalHeight}
      className="overflow-visible block filter drop-shadow-[0_2px_6px_rgba(217,119,6,0.3)]"
      aria-hidden="true"
    >
      {/* 1. Suspension golden chain & decorative beads */}
      <line
        x1="32"
        y1="0"
        x2="32"
        y2={S}
        stroke="url(#diwali-gold-chain)"
        strokeWidth="1.3"
        strokeDasharray="3, 1.8"
      />
      <circle cx="32" cy={S * 0.28} r="1.8" fill="url(#diwali-gold-chain)" />
      <circle cx="32" cy={S * 0.62} r="2.2" fill="url(#diwali-gold-chain)" />
      <circle cx="32" cy={S * 0.92} r="1.8" fill="url(#diwali-gold-chain)" />
      <circle cx="32" cy={S} r="2.5" fill="none" stroke="url(#diwali-gold-chain)" strokeWidth="1.3" />

      {/* 2. Flame with independent flicker animation */}
      <g
        className="diya-flame-wrapper"
        style={{
          transformOrigin: `32px ${S + 20}px`,
          animationDelay: `${flickerDelay}s`,
        }}
      >
        {/* Soft glowing ambient light halo */}
        <circle
          cx="32"
          cy={S + 13}
          r="21"
          fill="url(#diwali-flame-glow)"
          className="diya-halo"
          style={{ animationDelay: `${flickerDelay}s` }}
        />

        {/* Outer warm orange/amber teardrop flame */}
        <path
          d={`M 32 ${S + 1} C 28 ${S + 8}, 24 ${S + 14}, 25 ${S + 18} C 26 ${S + 22}, 38 ${S + 22}, 39 ${S + 18} C 40 ${S + 14}, 36 ${S + 8}, 32 ${S + 1} Z`}
          fill="url(#diwali-flame-body)"
          className="diya-flame"
          style={{ animationDelay: `${flickerDelay}s` }}
        />

        {/* Inner white-hot luminous flame core */}
        <path
          d={`M 32 ${S + 6} C 30 ${S + 10}, 28 ${S + 14}, 29 ${S + 18} C 30 ${S + 20}, 34 ${S + 20}, 35 ${S + 18} C 36 ${S + 14}, 34 ${S + 10}, 32 ${S + 6} Z`}
          fill="#ffffff"
          opacity="0.94"
        />

        {/* Traditional cotton diya wick */}
        <path
          d={`M 32 ${S + 22} Q 31 ${S + 18}, 32 ${S + 15}`}
          stroke="#451a03"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* 3. Traditional Brass Diya Lamp Body */}
      {/* Metallic brass outer bowl */}
      <path
        d={`M 12 ${S + 22} Q 10 ${S + 38}, 32 ${S + 45} Q 54 ${S + 38}, 52 ${S + 22} Q 32 ${S + 26}, 12 ${S + 22} Z`}
        fill="url(#diwali-brass-body)"
        stroke="#78350f"
        strokeWidth="0.75"
      />

      {/* Polished rim highlight */}
      <ellipse
        cx="32"
        cy={S + 22}
        rx="20"
        ry="4.2"
        fill="url(#diwali-brass-rim)"
        stroke="#78350f"
        strokeWidth="0.5"
      />

      {/* Inner oil reservoir pool reflection */}
      <ellipse
        cx="32"
        cy={S + 22.5}
        rx="16"
        ry="2.8"
        fill="url(#diwali-oil-pool)"
      />

      {/* Pedestal stand */}
      <path
        d={`M 27 ${S + 44} L 24 ${S + 51} L 40 ${S + 51} L 37 ${S + 44} Z`}
        fill="url(#diwali-brass-body)"
        stroke="#78350f"
        strokeWidth="0.6"
      />
      <ellipse
        cx="32"
        cy={S + 51}
        rx="8"
        ry="1.8"
        fill="url(#diwali-brass-rim)"
      />

      {/* 4. Bottom hanging brass bell / tassel */}
      <line
        x1="32"
        y1={S + 52.8}
        x2="32"
        y2={S + 58}
        stroke="url(#diwali-gold-chain)"
        strokeWidth="1"
      />
      <circle
        cx="32"
        cy={S + 60.5}
        r="2.5"
        fill="url(#diwali-gold-chain)"
        stroke="#854d0e"
        strokeWidth="0.4"
      />
      <polygon
        points={`32,${S + 62} 29,${S + 69} 35,${S + 69}`}
        fill="url(#diwali-brass-body)"
        stroke="#78350f"
        strokeWidth="0.4"
      />
      <circle cx="32" cy={S + 71} r="1.3" fill="#fde047" />
    </svg>
  );
}

/**
 * HangingDiyaOverlay Component
 * Renders an accessible, lightweight, high-performance festive hanging Diya overlay
 * across the top edge of the website.
 *
 * In Mobile View:
 * Features a clean, simplified presentation with a subtle golden top hairline and
 * two miniature corner accents, keeping the mobile header completely uncluttered.
 */
export function HangingDiyaOverlay({
  config: userConfig,
  className = "",
}: HangingDiyaOverlayProps) {
  const activeConfig = { ...FESTIVE_CONFIG, ...userConfig };
  const [isDismissed, setIsDismissed] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      if (typeof window !== "undefined") {
        const dismissed = sessionStorage.getItem(activeConfig.storageKey);
        if (dismissed === "true") {
          setIsDismissed(true);
        }
      }
    } catch {
      // Storage unavailable or disabled
    }
  }, [activeConfig.storageKey]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem(activeConfig.storageKey, "true");
      }
    } catch {
      // Storage unavailable
    }
  };

  // Seasonal flag check or user dismissal check
  if (!activeConfig.enabled || activeConfig.theme !== "diwali" || (isClient && isDismissed)) {
    return null;
  }

  return (
    <>
      <style>{`
        /* ========================================================
           Diwali Hanging Diya Animations & Responsive Styles
           ======================================================== */
        @keyframes diyaPendulumSwing {
          0% {
            transform: rotate(-2.2deg);
          }
          50% {
            transform: rotate(2.2deg);
          }
          100% {
            transform: rotate(-2.2deg);
          }
        }

        @keyframes diyaFlameFlicker {
          0%, 100% {
            transform: scale(1) translate(0, 0);
            opacity: 0.96;
            filter: drop-shadow(0 0 5px rgba(251, 191, 36, 0.75)) drop-shadow(0 0 11px rgba(245, 158, 11, 0.45));
          }
          25% {
            transform: scale(1.06, 0.96) translate(-0.4px, -0.5px);
            opacity: 1;
            filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.92)) drop-shadow(0 0 16px rgba(245, 158, 11, 0.6));
          }
          50% {
            transform: scale(0.95, 1.05) translate(0.4px, -0.2px);
            opacity: 0.91;
            filter: drop-shadow(0 0 4px rgba(251, 191, 36, 0.6)) drop-shadow(0 0 8px rgba(245, 158, 11, 0.35));
          }
          75% {
            transform: scale(1.04, 0.98) translate(0.2px, -0.4px);
            opacity: 0.98;
            filter: drop-shadow(0 0 7px rgba(251, 191, 36, 0.85)) drop-shadow(0 0 13px rgba(245, 158, 11, 0.5));
          }
        }

        @keyframes diyaHaloGlow {
          0%, 100% {
            opacity: 0.55;
            transform: scale(1);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.15);
          }
        }

        .diya-item {
          transform-origin: 32px 0px;
          animation: diyaPendulumSwing ease-in-out infinite alternate;
          will-change: transform;
        }

        .diya-flame-wrapper {
          animation: diyaFlameFlicker 2.4s ease-in-out infinite;
          will-change: transform, opacity;
        }

        .diya-halo {
          animation: diyaHaloGlow 3.6s ease-in-out infinite;
          transform-origin: center center;
        }

        /* prefers-reduced-motion: disable swinging and flickering for comfort */
        @media (prefers-reduced-motion: reduce) {
          .diya-item,
          .diya-flame-wrapper,
          .diya-halo {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* SVG Definitions shared across all rendered Diyas */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true" focusable="false">
        <defs>
          {/* Polished brass metallic body */}
          <linearGradient id="diwali-brass-body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="25%" stopColor="#f59e0b" />
            <stop offset="60%" stopColor="#d97706" />
            <stop offset="85%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          {/* Diya inner rim highlight */}
          <linearGradient id="diwali-brass-rim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="30%" stopColor="#fef08a" />
            <stop offset="70%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          {/* Golden suspension string/chain */}
          <linearGradient id="diwali-gold-chain" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="50%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          {/* Deep amber oil pool reflection */}
          <radialGradient id="diwali-oil-pool" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#92400e" />
            <stop offset="75%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#451a03" />
          </radialGradient>

          {/* Warm glowing candle flame body */}
          <linearGradient id="diwali-flame-body" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="28%" stopColor="#ea580c" />
            <stop offset="60%" stopColor="#f59e0b" />
            <stop offset="88%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          {/* Ambient radial halo glow */}
          <radialGradient id="diwali-flame-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.65" />
            <stop offset="45%" stopColor="#ea580c" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Fixed top overlay container (pointer-events: none ensures zero blocking of links, inputs, or navbar) */}
      <aside
        role="region"
        aria-label="Festive Diwali Decoration"
        className={`pointer-events-none fixed top-0 left-0 right-0 z-[70] w-full select-none ${className}`}
      >
        {/* Subtle golden festive hairline along top edge on mobile */}
        <div className="sm:hidden absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-amber-400/90 to-amber-500 shadow-[0_1px_8px_rgba(251,191,36,0.6)]" />

        {/* 1. Mobile-exclusive right-corner Diya (< 640px) */}
        {/* Placed reliably in the top-right margin: completely clears hamburger & logo on the left */}
        <div
          className="sm:hidden absolute top-0 right-3 diya-item"
          style={{
            animationDuration: "4.7s",
            animationDelay: "-0.4s",
          }}
        >
          <div className="transform scale-[0.72] origin-top">
            <DiyaSvg stringLength={18} flickerDelay={-0.3} />
          </div>
        </div>

        {/* 2. Tablet & Desktop Full Multi-Diya Toran (>= 640px) */}
        <div className="hidden sm:block relative w-full max-w-[1920px] mx-auto h-[120px] lg:h-[160px]">
          {DIYAS.map((item) => {
            const tierClass = item.tier === "desktop" ? "hidden lg:block" : "block";

            return (
              <div
                key={item.id}
                className={`absolute top-0 -translate-x-1/2 diya-item ${tierClass}`}
                style={{
                  left: `${item.positionPercent}%`,
                  animationDuration: `${item.swingDuration}s`,
                  animationDelay: `${item.swingDelay}s`,
                }}
              >
                <div className="transform sm:scale-80 lg:scale-100 origin-top">
                  <DiyaSvg
                    stringLength={item.stringLength}
                    flickerDelay={item.flickerDelay}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Small subtle dismiss button (hidden on mobile to prevent cluttering mobile action bar) */}
        {activeConfig.allowDismiss && (
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Hide Diwali decoration"
            title="Hide festive diyas"
            className="pointer-events-auto hidden sm:flex absolute top-2 right-2 sm:right-4 items-center justify-center rounded-full bg-white/70 hover:bg-white text-amber-900/70 hover:text-amber-950 p-1.5 text-xs shadow-xs border border-amber-200/60 backdrop-blur-xs transition-all opacity-40 hover:opacity-100 cursor-pointer"
          >
            <span className="sr-only">Hide decoration</span>
            ✕
          </button>
        )}
      </aside>
    </>
  );
}

export default HangingDiyaOverlay;
