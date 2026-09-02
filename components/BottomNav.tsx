"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Scale, CheckCircle, BookOpen, Sparkles } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const bottomNavLinks = [
    { href: "/discover", label: "Discover", icon: Search },
    { href: "/compare", label: "Compare", icon: Scale },
    { href: "/universities", label: "Universities", icon: CheckCircle },
    { href: "/study", label: "Study", icon: BookOpen },
  ];

  const aiLink = { href: "/ai", label: "AI Call", icon: Sparkles };

  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;

      setIsVisible(!(isScrollingDown && currentScrollY > 100));
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const aiActive = isActive(aiLink.href);
  const AiIcon = aiLink.icon;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-slate-300 bg-slate-100 px-1.5 py-2 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-24"
      }`}
    >
      <div className="flex w-full items-center gap-1.5">
        {/* Main Navbar */}
        <div className="flex flex-1 items-center justify-around rounded-2xl border border-slate-300 bg-white/90 px-1 py-1 shadow-sm">
          {bottomNavLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl py-0.5 transition-all duration-300 ${
                  active ? "" : "hover:bg-gray-100 active:scale-95"
                }`}
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-[10px] transition-all duration-300 ${
                    active
                      ? "bg-[#ef4444] text-white shadow-md shadow-[#ef4444]/30"
                      : "text-black"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 transition-all duration-300 ${
                      active ? "scale-105" : ""
                    }`}
                    strokeWidth={2.3}
                  />
                </div>

                <span
                  className={`whitespace-nowrap text-[10px] font-semibold leading-tight transition-colors duration-300 ${
                    active ? "text-[#ef4444]" : "text-black"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Separate AI Tab */}
        <Link
          href={aiLink.href}
          className={`flex w-[68px] flex-shrink-0 flex-col items-center justify-center gap-0.5 rounded-2xl border py-1 shadow-sm transition-all duration-300 ${
            aiActive
              ? "border-[#ef4444] bg-[#ef4444]/5"
              : "border-slate-300 bg-white/90 active:scale-95"
          }`}
        >
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ${
              aiActive
                ? "bg-[#ef4444] text-white shadow-md shadow-[#ef4444]/30"
                : "bg-black text-white"
            }`}
          >
            <AiIcon
              className={`h-4 w-4 transition-all duration-300 ${
                aiActive ? "scale-105" : ""
              }`}
              strokeWidth={2.3}
            />
          </div>

          <span
            className={`whitespace-nowrap text-[10px] font-semibold leading-tight transition-colors duration-300 ${
              aiActive ? "text-[#ef4444]" : "text-black"
            }`}
          >
            {aiLink.label}
          </span>
        </Link>
      </div>
    </div>
  );
}
