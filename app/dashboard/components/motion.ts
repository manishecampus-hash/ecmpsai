import type { Variants } from "framer-motion";

// Shared motion presets so every dashboard page moves with the same timing and feel.

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// One-off entrance for page-level blocks (headers, hero cards, toolbars)
export const fadeUp = (delay = 0) =>
  ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT, delay } },
  }) as const;

// Height-auto expand/collapse for disclosure panels and inline notices
export const collapse = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1, transition: { duration: 0.25, ease: EASE_OUT } },
  exit: { height: 0, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
} as const;

// Parent that reveals its `staggerItem` children one after another
export const staggerContainer = (stagger = 0.06, delayChildren = 0): Variants => ({
  enter: {},
  center: { transition: { staggerChildren: stagger, delayChildren } },
  exit: { transition: { duration: 0.15 } },
});

export const staggerItem: Variants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15, ease: "easeIn" } },
};

// Modal dialog: backdrop fades, panel springs in
export const backdropMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
} as const;

export const dialogMotion = {
  initial: { opacity: 0, scale: 0.95, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 420, damping: 32 } },
  exit: { opacity: 0, scale: 0.97, y: 4, transition: { duration: 0.15 } },
} as const;
