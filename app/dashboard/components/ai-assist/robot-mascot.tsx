"use client";

import { useId } from "react";
import { motion } from "framer-motion";

// eCampus AI's mascot: a small white robot with a glowing visor that floats and waves.
// Drawn inline so it scales cleanly and picks up the AI sparkle's violet → cyan gradient.
export default function RobotMascot({ className = "", wave = true }: { className?: string; wave?: boolean }) {
  const id = useId().replace(/:/g, "");
  const shell = `${id}-shell`;
  const glow = `${id}-glow`;
  const visor = `${id}-visor`;

  return (
    <motion.svg
      viewBox="0 0 200 230"
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
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id={visor} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f2433" />
          <stop offset="100%" stopColor="#0b0d14" />
        </linearGradient>
      </defs>

      {/* Soft shadow under the robot */}
      <ellipse cx="100" cy="222" rx="42" ry="6" fill="#0f172a" opacity="0.08" />

      {/* Right arm, resting */}
      <rect x="138" y="132" width="20" height="58" rx="10" fill={`url(#${shell})`} stroke="#d7dce7" transform="rotate(-14 148 136)" />

      {/* Body */}
      <rect x="62" y="122" width="76" height="86" rx="36" fill={`url(#${shell})`} stroke="#d7dce7" />
      <rect x="86" y="146" width="28" height="8" rx="4" fill={`url(#${glow})`} opacity="0.85" />

      {/* Left arm, waving */}
      {/* origin ≈ the shoulder, as a fraction of the arm's bounding box */}
      <motion.g
        style={{ originX: 0.8, originY: 0.85 }}
        animate={wave ? { rotate: [0, -18, 0, -18, 0] } : undefined}
        transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
      >
        <rect x="56" y="90" width="20" height="52" rx="10" fill={`url(#${shell})`} stroke="#d7dce7" transform="rotate(-32 66 140)" />
      </motion.g>

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
      <path d="M72 70 q9 -12 18 0" fill="none" stroke={`url(#${glow})`} strokeWidth="6" strokeLinecap="round" />
      <path d="M110 70 q9 -12 18 0" fill="none" stroke={`url(#${glow})`} strokeWidth="6" strokeLinecap="round" />
      <path d="M90 82 q10 8 20 0" fill="none" stroke={`url(#${glow})`} strokeWidth="5" strokeLinecap="round" />
    </motion.svg>
  );
}
