"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { X } from "lucide-react";

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
  width = "w-[85vw] max-w-[340px]",
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
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[3px] z-[55] md:hidden"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`fixed top-0 left-0 bottom-0 ${width} bg-white z-[60] flex flex-col shadow-2xl md:hidden overflow-hidden`}
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white"
            >
              <h2 className="text-base font-bold text-gray-900">Menu</h2>

              <motion.button
                onClick={onClose}
                whileHover={{
                  scale: 1.08,
                  rotate: 90,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                initial={{
                  opacity: 0,
                  scale: 0.6,
                  rotate: -180,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.35,
                }}
                className="w-10 h-10 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center hover:bg-red-50 transition-colors"
              >
                <X size={20} strokeWidth={2} className="text-gray-700" />
              </motion.button>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.15,
                duration: 0.35,
              }}
              className="flex-1 overflow-y-auto custom-scroll"
            >
              {children}
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
