"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
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
  ChevronsLeft,
} from "lucide-react";

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutGrid, href: "/dashboard" },
  { id: "matcher", label: "AI Degree Finder", icon: Compass, href: "/dashboard/matcher" },
  { id: "counselor", label: "AI Counselor Sara", icon: MessageCircle, href: "/dashboard/counselor", live: true },
  { id: "profile", label: "Profile", icon: UserCircle, href: "/dashboard/profile" },
  { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

const ADVISOR_NAME = "Vishal";

const EXPANDED_WIDTH = 260;
const COLLAPSED_WIDTH = 76;
const WIDTH_SPRING = { type: "spring", stiffness: 320, damping: 34, mass: 0.9 } as const;

// ── Collapsed state, shared by every dashboard page and remembered across visits ──
const STORAGE_KEY = "ecampus_sidebar_collapsed";
const listeners = new Set<() => void>();
let collapsedValue: boolean | null = null;

function getCollapsed() {
  if (collapsedValue === null) {
    try {
      collapsedValue = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      collapsedValue = false;
    }
  }
  return collapsedValue;
}

function setCollapsed(next: boolean) {
  collapsedValue = next;
  try {
    localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
  } catch {
    // Storage unavailable — the choice still applies for this visit.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// Small dark label shown beside an item while the sidebar is collapsed
function CollapsedTooltip({ label }: { label: string }) {
  return (
    <span
      role="tooltip"
      className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-x-1 -translate-y-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100 group-focus-within/item:translate-x-0 group-focus-within/item:opacity-100"
    >
      {label}
      <span className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-gray-900" />
    </span>
  );
}

function SidebarContent({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname();

  // Labels fade out quickly when collapsing and fade back in once there's room
  const labelMotion = {
    animate: collapsed ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 },
    transition: collapsed ? { duration: 0.12 } : { duration: 0.22, delay: 0.1 },
  };

  return (
    <div className="flex h-full flex-col">
      {/* Brand — collapses to just the "e" mark */}
      <Link href="/" aria-label="eCampus home" className="block px-5 pt-6">
        <motion.div
          initial={false}
          animate={{ width: collapsed ? 34 : 128 }}
          transition={WIDTH_SPRING}
          className="relative h-9 overflow-hidden"
        >
          <div className="relative h-9 w-32">
            <Image
              src="/image/logo.png"
              alt="eCampus"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </motion.div>
      </Link>

      {/* Counselor status */}
      <div className="mx-3 mt-5 h-[42px]">
        <AnimatePresence initial={false} mode="popLayout">
          {collapsed ? (
            <motion.div
              key="advisor-compact"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1, transition: { type: "spring", stiffness: 420, damping: 24, delay: 0.08 } }}
              exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.1 } }}
              className="group/item relative mx-auto flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-gray-100 bg-gray-50"
            >
              <span className="text-sm font-bold text-red-600">{ADVISOR_NAME.charAt(0)}</span>
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-gray-50" />
              <CollapsedTooltip label={`Program Advisor · ${ADVISOR_NAME}`} />
            </motion.div>
          ) : (
            <motion.div
              key="advisor-full"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.22, delay: 0.12 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="mx-2 flex h-[42px] items-center justify-between overflow-hidden whitespace-nowrap rounded-xl border border-gray-100 bg-gray-50 px-3.5"
            >
              <span className="text-xs font-medium text-gray-500">
                Program Advisor
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                {ADVISOR_NAME}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav
        className={`mt-5 flex-1 space-y-1 px-3 pb-5 ${collapsed ? "overflow-visible" : "overflow-y-auto"}`}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.href ? pathname === item.href : false;
          const className = `relative flex w-full items-center gap-3 overflow-hidden rounded-xl px-[17px] py-2.5 text-left text-sm font-medium transition-colors ${
            active
              ? "bg-red-50 text-red-600"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`;

          const content = (
            <>
              {active && (
                <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-red-600" />
              )}
              <span className="relative flex-shrink-0">
                <Icon
                  className="h-[18px] w-[18px] transition-transform duration-200 group-hover/item:scale-110"
                  strokeWidth={1.8}
                />
                {/* live dot moves onto the icon when there's no room for it at the end */}
                <AnimatePresence initial={false}>
                  {item.live && collapsed && (
                    <motion.span
                      key="live-on-icon"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 22 }}
                      className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-green-500 ring-2 ring-white"
                    />
                  )}
                </AnimatePresence>
              </span>
              <motion.span
                initial={false}
                {...labelMotion}
                aria-hidden={collapsed}
                className="flex-1 truncate whitespace-nowrap"
              >
                {item.label}
              </motion.span>
              {item.live && (
                <motion.span
                  initial={false}
                  {...labelMotion}
                  className="h-2 w-2 flex-shrink-0 rounded-full bg-green-500"
                />
              )}
            </>
          );

          return (
            <div key={item.id} className="group/item relative">
              {item.href ? (
                <Link
                  href={item.href}
                  aria-label={collapsed ? item.label : undefined}
                  className={className}
                >
                  {content}
                </Link>
              ) : (
                <button
                  type="button"
                  aria-label={collapsed ? item.label : undefined}
                  className={className}
                >
                  {content}
                </button>
              )}
              {collapsed && <CollapsedTooltip label={item.label} />}
            </div>
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
  const collapsed = useSyncExternalStore(subscribe, getCollapsed, () => false);

  // Apply a remembered state instantly on load; only animate the user's own toggles
  const [animateWidth, setAnimateWidth] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimateWidth(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH }}
        transition={animateWidth ? WIDTH_SPRING : { duration: 0 }}
        className="relative z-40 hidden lg:flex lg:h-screen lg:flex-shrink-0 lg:flex-col lg:border-r lg:border-gray-100 lg:bg-white"
      >
        <SidebarContent collapsed={collapsed} />

        {/* Collapse / expand toggle on the sidebar edge */}
        <motion.button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="absolute -right-3.5 top-7 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-colors hover:border-red-200 hover:text-red-600 hover:shadow-md"
        >
          <motion.span
            initial={false}
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={WIDTH_SPRING}
            className="flex"
          >
            <ChevronsLeft className="h-4 w-4" strokeWidth={2} />
          </motion.span>
        </motion.button>
      </motion.aside>

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
