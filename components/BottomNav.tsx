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
    <>

      <div
        className={`fixed bottom-2 left-3 right-3 z-50 flex items-center gap-2 md:hidden transition-all duration-300 ${
          isVisible ? "translate-y-0" : "translate-y-24"
        }`}
      >
        {/* Main Navbar */}
        <div className="flex flex-1 items-center justify-around rounded-[22px] border border-gray-200 bg-white px-1.5 py-1.5 shadow-xl">
          {bottomNavLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 transition-all duration-300 ${
                  active ? "bg-red-50" : "hover:bg-gray-100 active:scale-95"
                }`}
              >
                {/* Icon */}
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-300 ${
                    active
                      ? "bg-[#ef4444] text-white shadow-md shadow-[#ef4444]/30"
                      : "text-black"
                  }`}
                >
                  <Icon
                    className={`h-[18px] w-[18px] transition-all duration-300 ${
                      active ? "scale-110" : ""
                    }`}
                    strokeWidth={2.3}
                  />
                </div>

                {/* Label */}
                <span
                  className={`whitespace-nowrap text-[8px] font-semibold leading-none transition-colors duration-300 ${
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
          className={`flex w-16 flex-shrink-0 flex-col items-center justify-center gap-0.5 rounded-[22px] border py-1.5 shadow-xl transition-all duration-300 ${
            aiActive
              ? "border-[#ef4444] bg-[#ef4444]/5"
              : "border-gray-200 bg-white active:scale-95"
          }`}
        >
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-300 ${
              aiActive
                ? "bg-[#ef4444] text-white shadow-md shadow-[#ef4444]/30"
                : "bg-black text-white"
            }`}
          >
            <AiIcon
              className={`h-[18px] w-[18px] transition-all duration-300 ${
                aiActive ? "scale-110" : ""
              }`}
              strokeWidth={2.3}
            />
          </div>
          <span
            className={`whitespace-nowrap text-[8px] font-semibold leading-none transition-colors duration-300 ${
              aiActive ? "text-[#ef4444]" : "text-black"
            }`}
          >
            {aiLink.label}
          </span>
        </Link>
      </div>
    </>
  );
}
