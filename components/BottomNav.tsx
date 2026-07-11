// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { Home, Search, GitCompare, Briefcase, User } from 'lucide-react';

// const navItems = [
//   { href: '/', label: 'Home', icon: Home },
//   { href: '/search?q=', label: 'Search', icon: Search },
//   { href: '/compare', label: 'Compare', icon: GitCompare },
//   { href: '/search?q=careers', label: 'Careers', icon: Briefcase },
//   { href: '/search?q=profile', label: 'Profile', icon: User },
// ];

// export function BottomNav() {
//   const pathname = usePathname();

//   return (
//     <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 safe-area-inset-bottom">
//       <div className="flex items-stretch justify-around h-16">
//         {navItems.map(({ href, label, icon: Icon }) => {
//           const isActive = pathname === href || (href !== '/' && pathname.startsWith(href.split('?')[0]));
//           return (
//             <Link
//               key={href}
//               href={href}
//               className={`flex flex-col items-center justify-center gap-0.5 px-3 py-2 flex-1 transition-colors ${
//                 isActive
//                   ? 'text-[#4F46E5] dark:text-[#818CF8]'
//                   : 'text-gray-500 dark:text-gray-400'
//               }`}
//             >
//               <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
//               <span className="text-[10px] font-medium leading-none">{label}</span>
//             </Link>
//           );
//         })}
//       </div>
//     </nav>
//   );
// }

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
    { href: "/apply", label: "Apply", icon: CheckCircle },
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
      {/* Full width white background layer */}
      <div className="fixed bottom-0 left-0 right-0 z-40 h-20 bg-white md:hidden" />

      <div
        className={`fixed bottom-2 left-3 right-3 z-50 flex items-center gap-2 md:hidden transition-all duration-300 ${
          isVisible ? "translate-y-0" : "translate-y-24"
        }`}
      >
        {/* Main Navbar */}
        <div className="flex flex-1 items-center justify-around rounded-[22px] border border-gray-200 bg-white px-1.5 py-1 shadow-xl">
          {bottomNavLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl py-1 transition-all duration-300 ${
                  active ? "bg-red-50" : "hover:bg-gray-100 active:scale-95"
                }`}
              >
                {/* Icon */}
                <div
                  className={`flex h-7 w-7 items-center justify-centertransition-all duration-300 ${
                    active
                      ? "bg-[#ef4444] text-white shadow-md shadow-[#ef4444]/30"
                      : "text-black"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 transition-all duration-300 ${
                      active ? "scale-110" : ""
                    }`}
                    strokeWidth={2.3}
                  />
                </div>

                {/* Label */}
                <span
                  className={`text-[7.5px] font-semibold leading-none transition-colors duration-300 ${
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
          className={`flex w-16 flex-shrink-0 flex-col items-center justify-center gap-0.5 rounded-[22px] border py-1 shadow-xl transition-all duration-300 ${
            aiActive
              ? "border-[#ef4444] bg-[#ef4444]/5"
              : "border-gray-200 bg-white active:scale-95"
          }`}
        >
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-xl transition-all duration-300 ${
              aiActive
                ? "bg-[#ef4444] text-white shadow-md shadow-[#ef4444]/30"
                : "bg-black text-white"
            }`}
          >
            <AiIcon
              className={`h-4 w-4 transition-all duration-300 ${
                aiActive ? "scale-110" : ""
              }`}
              strokeWidth={2.3}
            />
          </div>
          <span
            className={`text-[7.5px] font-semibold leading-none transition-colors duration-300 ${
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
