"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutGrid,
  Compass,
  GraduationCap,
  ClipboardList,
  Scale,
  ShieldCheck,
  Gift,
  MessageCircle,
  UserCircle,
  Settings,
  X,
} from "lucide-react";

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutGrid, href: "/dashboard" },
  { id: "matcher", label: "AI Degree Matcher", icon: Compass, href: "/dashboard/matcher" },
  { id: "counselor", label: "AI Counselor Sara", icon: MessageCircle, live: true },
  { id: "profile", label: "Profile", icon: UserCircle, href: "/dashboard/profile" },
  { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <Link href="/" className="block px-5 pt-6">
        <div className="relative h-9 w-32">
          <Image
            src="/image/logo.png"
            alt="eCampus"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
      </Link>

      {/* Counselor status */}
      <div className="mx-5 mt-5 flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-2.5">
        <span className="text-xs font-medium text-gray-500">
          Program Advisor
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
          Vishal 
        </span>
      </div>

      {/* Nav */}
      <nav className="mt-5 flex-1 space-y-1 overflow-y-auto px-3 pb-5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.href ? pathname === item.href : false;
          const className = `flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
            active
              ? "bg-red-50 text-red-600"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`;

          if (item.href) {
            return (
              <Link key={item.id} href={item.href} className={className}>
                <Icon className="h-[18px] w-[18px] flex-shrink-0" strokeWidth={1.8} />
                <span className="flex-1 truncate">{item.label}</span>
              </Link>
            );
          }

          return (
            <button key={item.id} type="button" className={className}>
              <Icon className="h-[18px] w-[18px] flex-shrink-0" strokeWidth={1.8} />
              <span className="flex-1 truncate">{item.label}</span>
              {item.live && (
                <span className="h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default function Sidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:h-screen lg:w-[260px] lg:flex-shrink-0 lg:flex-col lg:border-r lg:border-gray-100 lg:bg-white">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-[280px] bg-white shadow-2xl lg:hidden"
            >
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                <X className="h-4 w-4" />
              </button>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
