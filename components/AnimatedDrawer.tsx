"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedDrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: string;
}

export default function AnimatedDrawer({
  open,
  onClose,
  children,
  width = "w-full", // Full Width
}: AnimatedDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[3px] z-[55] md:hidden"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`fixed inset-y-0 left-0 ${width} bg-white z-[60] flex flex-col shadow-2xl md:hidden overflow-hidden pt-16`}
          >
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.15,
                duration: 0.35,
              }}
              className="flex-1 overflow-y-auto custom-scroll border-t border-gray-100"
            >
              {children}
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
