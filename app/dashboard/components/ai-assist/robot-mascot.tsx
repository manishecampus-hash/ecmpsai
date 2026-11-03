"use client";

import { useId } from "react";
import { motion } from "framer-motion";

// eCampus AI's mascot: a small white robot with a glowing visor that floats and waves.
// Drawn inline so it scales cleanly and picks up the AI sparkle's violet → cyan gradient.
// The "graduate" look (used on /about-us) swaps the glow to the brand red, adds a mortarboard with a
// swinging tassel, a cap emblem on the chest, blinking eyes and little "hi" marks by the waving hand.
export default function RobotMascot({
  className = "",
  wave = true,
  graduate = false,
}: {
  className?: string;
  wave?: boolean;
  graduate?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const shell = `${id}-shell`;
  const glow = `${id}-glow`;
  const visor = `${id}-visor`;
  const cap = `${id}-cap`;
  const shine = `${id}-shine`;

  return (
    <motion.svg
      viewBox={graduate ? "-14 -44 228 274" : "0 0 200 230"}
      className={className}
      aria-hidden
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id={shell} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e4e8f1" />
        </linearGradient>
        <linearGradient id={glow} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={graduate ? "#ff6b6b" : "#a78bfa"} />
          <stop offset="100%" stopColor={graduate ? "#e11d48" : "#22d3ee"} />
        </linearGradient>
        <linearGradient id={visor} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f2433" />
          <stop offset="100%" stopColor="#0b0d14" />
        </linearGradient>
        {graduate && (
          <>
            <linearGradient id={cap} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </linearGradient>
            {/* Soft neon bloom around the eyes */}
            <filter id={shine} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </>
        )}
      </defs>

      {/* Soft shadow under the robot */}
      <ellipse cx="100" cy="222" rx="42" ry="6" fill="#0f172a" opacity="0.08" />

      {/* Right arm, resting */}
      <rect x="138" y="132" width="20" height="58" rx="10" fill={`url(#${shell})`} stroke="#d7dce7" transform="rotate(-14 148 136)" />

      {/* Body */}
      <rect x="62" y="122" width="76" height="86" rx="36" fill={`url(#${shell})`} stroke="#d7dce7" />
      {graduate ? (
        // Mortarboard emblem on the chest
        <g fill={`url(#${glow})`}>
          <path d="M100 142 l20 8 -20 8 -20 -8z" />
          <path d="M88 154 v8 q12 7 24 0 v-8 l-12 5z" />
        </g>
      ) : (
        <rect x="86" y="146" width="28" height="8" rx="4" fill={`url(#${glow})`} opacity="0.85" />
      )}

      {/* Left arm, waving */}
      {/* origin ≈ the shoulder, as a fraction of the arm's bounding box */}
      <motion.g
        style={{ originX: 0.8, originY: 0.85 }}
        animate={wave ? { rotate: [0, -18, 0, -18, 0] } : undefined}
        transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
      >
        <rect x="56" y="90" width="20" height="52" rx="10" fill={`url(#${shell})`} stroke="#d7dce7" transform="rotate(-32 66 140)" />
      </motion.g>

      {/* "Hi" marks beside the waving hand */}
      {graduate && (
        <motion.g
          stroke="#ef4444"
          strokeWidth="4"
          strokeLinecap="round"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M12 84 l-9 -3" />
          <path d="M18 70 l-6 -8" />
          <path d="M31 63 l-1 -10" />
        </motion.g>
      )}

      {/* Neck */}
      <rect x="88" y="110" width="24" height="16" rx="6" fill="#d9deea" />

      {/* Ear pods */}
      <circle cx="40" cy="68" r="15" fill={`url(#${shell})`} stroke="#d7dce7" />
      <circle cx="40" cy="68" r="7" fill={`url(#${glow})`} />
      <circle cx="160" cy="68" r="15" fill={`url(#${shell})`} stroke="#d7dce7" />
      <circle cx="160" cy="68" r="7" fill={`url(#${glow})`} />

      {/* Head */}
      <rect x="42" y="18" width="116" height="98" rx="46" fill={`url(#${shell})`} stroke="#d7dce7" />
      <rect x="55" y="36" width="90" height="62" rx="30" fill={`url(#${visor})`} />
      <ellipse cx="78" cy="46" rx="14" ry="4" fill="#ffffff" opacity="0.12" />

      {/* Happy eyes and smile */}
      <motion.g
        filter={graduate ? `url(#${shine})` : undefined}
        style={{ originX: 0.5, originY: 0.5 }}
        animate={graduate ? { scaleY: [1, 1, 0.15, 1] } : undefined}
        transition={graduate ? { duration: 4, times: [0, 0.9, 0.95, 1], repeat: Infinity } : undefined}
      >
        <path d="M72 70 q9 -12 18 0" fill="none" stroke={`url(#${glow})`} strokeWidth="6" strokeLinecap="round" />
        <path d="M110 70 q9 -12 18 0" fill="none" stroke={`url(#${glow})`} strokeWidth="6" strokeLinecap="round" />
      </motion.g>
      <path
        d="M90 82 q10 8 20 0"
        fill="none"
        stroke={`url(#${glow})`}
        strokeWidth="5"
        strokeLinecap="round"
        filter={graduate ? `url(#${shine})` : undefined}
      />

      {/* Graduation cap, tilted on the head, with a swinging tassel */}
      {graduate && (
        <g transform="rotate(8 104 4)">
          <path d="M70 0 v18 q34 14 68 0 v-18z" fill="#991b1b" />
          <path d="M104 -30 l66 22 -66 22 -66 -22z" fill={`url(#${cap})`} stroke="#fca5a5" strokeOpacity="0.45" />
          <path d="M104 -30 l66 22 -10 3.4 -56 -18.7z" fill="#ffffff" opacity="0.14" />
          <circle cx="104" cy="-8" r="4" fill="#fecaca" />
          <motion.g
            style={{ originX: 0, originY: 0 }}
            animate={{ rotate: [0, 7, -4, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M104 -8 L150 2 L150 30" fill="none" stroke="#fecaca" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M145 28 h10 l2 16 h-14z" fill="#ef4444" />
          </motion.g>
        </g>
      )}
    </motion.svg>
  );
}
