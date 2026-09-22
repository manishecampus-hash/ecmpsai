"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/90 px-4 py-2.5 text-xs font-bold text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-slate-900 hover:border-slate-600 cursor-pointer active:scale-95 group"
    >
      <ArrowUp className="h-4 w-4 text-red-500 transition-transform group-hover:-translate-y-0.5" />
      <span>Top</span>
    </button>
  );
}

export default ScrollToTopButton;
