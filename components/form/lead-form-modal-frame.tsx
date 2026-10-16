"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

const ambientSparkles = Array.from({ length: 32 }, (_, index) => ({
  left: (index * 37 + 7) % 97,
  top: (index * 53 + 11) % 94,
  size: 2 + (index % 3),
  duration: 2.4 + ((index * 7) % 18) / 10,
  delay: (index * 3) % 5,
  color: ["#e0f2fe", "#bfdbfe", "#ede9fe", "#ffffff"][index % 4],
}));

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
      className="fixed inset-0 z-[10000] flex items-center justify-center overflow-y-auto px-3 py-4 backdrop-blur-[2px] sm:px-6 sm:py-6"
      style={{
        backgroundColor: "rgba(8, 12, 28, 0.84)",
        backgroundImage:
          "radial-gradient(ellipse at 12% 22%, rgba(56,189,248,0.15), transparent 35%), radial-gradient(ellipse at 88% 78%, rgba(129,140,248,0.16), transparent 38%)",
      }}
      onClick={onClose}
    >
      {!reduceMotion && (
        <>
          <motion.span
            aria-hidden="true"
            animate={{ opacity: [0.1, 0.65, 0.1], scaleX: [0.72, 1, 0.82] }}
            transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
            className="pointer-events-none absolute left-[-12%] top-[24%] h-px w-[124%] rotate-[-11deg] bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent shadow-[0_0_16px_rgba(125,211,252,0.55)]"
          />
          <motion.span
            aria-hidden="true"
            animate={{ opacity: [0.08, 0.48, 0.08], scaleX: [0.8, 1, 0.7] }}
            transition={{ duration: 9, ease: "easeInOut", repeat: Infinity, delay: 1.5 }}
            className="pointer-events-none absolute left-[-10%] top-[72%] h-px w-[120%] rotate-[9deg] bg-gradient-to-r from-transparent via-indigo-200/70 to-transparent shadow-[0_0_18px_rgba(165,180,252,0.55)]"
          />
          <motion.span
            aria-hidden="true"
            animate={{ opacity: [0.06, 0.38, 0.06], scaleX: [0.75, 1, 0.85] }}
            transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, delay: 2.5 }}
            className="pointer-events-none absolute left-[-8%] top-[48%] h-px w-[116%] rotate-[-4deg] bg-gradient-to-r from-transparent via-sky-100/60 to-transparent shadow-[0_0_15px_rgba(186,230,253,0.5)]"
          />
          {ambientSparkles.map((sparkle, index) => (
          <motion.span
            key={index}
            aria-hidden="true"
            initial={{ opacity: 0.15, scale: 0.55, rotate: 0 }}
            animate={{
              opacity: [0.15, 0.95, 0.25, 0.75, 0.15],
              scale: [0.55, 1.35, 0.8, 1.15, 0.55],
              rotate: [0, 45, 90, 135, 180],
            }}
            transition={{
              duration: sparkle.duration,
              delay: sparkle.delay,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="pointer-events-none absolute rounded-full shadow-[0_0_10px_currentColor]"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              width: sparkle.size,
              height: sparkle.size,
              color: sparkle.color,
              backgroundColor: sparkle.color,
            }}
          />
          ))}
        </>
      )}
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative z-10 grid max-h-[94vh] w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_28px_90px_rgba(15,23,42,0.32)] md:max-h-[90vh] md:grid-cols-[minmax(0,1.08fr)_minmax(400px,0.92fr)] ${imageSrc ? "grid-rows-[auto_minmax(0,1fr)] md:grid-rows-1" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {imageSrc ? (
          <>
            <div aria-hidden="true" className="relative h-32 overflow-hidden md:hidden">
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
