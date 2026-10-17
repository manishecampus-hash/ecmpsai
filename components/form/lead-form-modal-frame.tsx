"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

// Backdrop: dark navy scrim, soft blue/red glows and confetti pieces that fall
// slowly from top to bottom. CSS-only (transform/opacity), so it stays smooth.
const CONFETTI = Array.from({ length: 56 }, (_, i) => ({
  left: (i * 29 + 5) % 100,
  size: 5 + (i % 4) * 2,
  duration: 9 + ((i * 7) % 9),
  // negative delay so the screen is already filled when the popup opens
  delay: -((i * 13) % 17),
  sway: (i % 2 ? 1 : -1) * (12 + (i % 5) * 6),
  spin: (i % 3 ? 1 : -1) * (240 + (i % 4) * 90),
  color: ["#3b82f6", "#ffffff", "#f59e0b", "#ee2c3c", "#60a5fa", "#ffffff"][i % 6],
  shape: i % 3,
  opacity: 0.55 + (i % 4) * 0.12,
}));

const BACKDROP_CSS = `
  @keyframes lfm-fall {
    from { transform: translate3d(0, -12vh, 0) rotate(0deg); }
    to { transform: translate3d(var(--lfm-sway), 112vh, 0) rotate(var(--lfm-spin)); }
  }
  @keyframes lfm-drift-a { 0%, 100% { transform: translate3d(0, 0, 0) scale(1); } 50% { transform: translate3d(6vw, 4vh, 0) scale(1.12); } }
  @keyframes lfm-drift-b { 0%, 100% { transform: translate3d(0, 0, 0) scale(1.08); } 50% { transform: translate3d(-5vw, -5vh, 0) scale(0.94); } }
  .lfm-piece { position: absolute; top: 0; will-change: transform; animation: lfm-fall linear infinite; }
  .lfm-glow-a { animation: lfm-drift-a 16s ease-in-out infinite; }
  .lfm-glow-b { animation: lfm-drift-b 20s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce) { .lfm-piece { display: none; } .lfm-glow-a, .lfm-glow-b { animation: none; } }
`;

export default function LeadFormModalFrame({
  children,
  onClose,
  title,
  imageSrc,
}: {
  children: ReactNode;
  onClose: () => void;
  title: string;
  imageSrc?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed inset-0 z-[10000] flex items-center justify-center overflow-y-auto bg-[rgba(11,20,46,0.8)] px-3 py-4 backdrop-blur-sm sm:px-6 sm:py-6"
      onClick={onClose}
    >
      <style>{BACKDROP_CSS}</style>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <span className="lfm-glow-a absolute -left-[12%] -top-[18%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.3),transparent)]" />
        <span className="lfm-glow-b absolute -bottom-[22%] -right-[14%] h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(closest-side,rgba(238,44,60,0.22),transparent)]" />
        {CONFETTI.map((piece, i) => (
          <span
            key={i}
            className="lfm-piece"
            style={
              {
                left: `${piece.left}%`,
                width: piece.shape === 2 ? piece.size * 0.6 : piece.size,
                height: piece.shape === 2 ? piece.size * 1.4 : piece.size,
                backgroundColor: piece.color,
                opacity: piece.opacity,
                borderRadius: piece.shape === 1 ? "50%" : "1.5px",
                animationDuration: `${piece.duration}s`,
                animationDelay: `${piece.delay}s`,
                "--lfm-sway": `${piece.sway}px`,
                "--lfm-spin": `${piece.spin}deg`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative z-10 grid max-h-[94vh] w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_32px_100px_-12px_rgba(0,0,0,0.55)] ring-1 ring-white/10 md:max-h-[90vh] md:grid-cols-[minmax(0,1.08fr)_minmax(400px,0.92fr)] ${imageSrc ? "grid-rows-[auto_minmax(0,1fr)] md:grid-rows-1" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {imageSrc ? (
          <>
            <div aria-hidden="true" className="relative h-[74px] overflow-hidden md:hidden">
              <img src={imageSrc} alt="" className="h-full w-full object-cover object-top" />
            </div>
            <div aria-hidden="true" className="hidden min-h-0 overflow-hidden bg-[#fffafa] md:flex md:items-center md:justify-center">
              <img src={imageSrc} alt="" className="h-full w-full object-cover object-center" />
            </div>
          </>
        ) : (
          <div aria-hidden="true" data-course-image-placeholder className="hidden bg-[#fffafa] md:block" />
        )}
        <div className="relative min-h-0 overflow-y-auto bg-white">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          {children}
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
