"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bell,
  BellRing,
  ChevronDown,
  Menu,
  UserCircle,
  Settings,
  Gift,
  Copy,
  Check,
  type LucideIcon,
} from "lucide-react";
import type { StudentProfile } from "../types";
import type { SpinWheelReward } from "./spin-wheel/data";

type DashboardNotification = {
  icon: LucideIcon;
  iconClass: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
};

// No notification feed is connected yet, so the panel shows its empty state.
const notifications: DashboardNotification[] = [];

export default function Topbar({
  student,
  onOpenMobileMenu,
  wonReward: wonRewardProp,
}: {
  student: StudentProfile;
  onOpenMobileMenu: () => void;
  wonReward?: SpinWheelReward | null;
}) {
  // Pages that don't track the spin themselves still show the saved reward
  const wonReward = wonRewardProp ?? student.spinReward ?? null;
  const displayName = student.name?.trim() || "Rahul Kumar";
  const initial = displayName.charAt(0).toUpperCase();

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [rewardCopied, setRewardCopied] = useState(false);
  const [rewardLandPulse, setRewardLandPulse] = useState(0);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleCopyReward = async () => {
    if (!wonReward) return;
    try {
      await navigator.clipboard.writeText(wonReward.couponCode);
      setRewardCopied(true);
      setTimeout(() => setRewardCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — nothing more to do here.
    }
  };

  // The spin wheel's "claim" animation flies a badge here and pings this
  // event on arrival, so the pill gives a little landing pulse.
  useEffect(() => {
    const handleLanded = () => setRewardLandPulse((n) => n + 1);
    window.addEventListener("reward-pill-landed", handleLanded);
    return () => window.removeEventListener("reward-pill-landed", handleLanded);
  }, []);

  // Menus open on hover (or click) and stay open until the user clicks outside,
  // presses Escape or picks an item — moving the mouse away no longer closes them.
  const openProfileMenu = () => {
    setProfileMenuOpen(true);
    setNotificationsOpen(false);
  };
  const openNotifications = () => {
    setNotificationsOpen(true);
    setProfileMenuOpen(false);
  };

  useEffect(() => {
    if (!profileMenuOpen && !notificationsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setProfileMenuOpen(false);
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [profileMenuOpen, notificationsOpen]);

  useEffect(() => {
    if (!profileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [profileMenuOpen]);

  useEffect(() => {
    if (!notificationsOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [notificationsOpen]);

  return (
    <header className="sticky top-0 z-30 flex h-16 flex-shrink-0 items-center gap-3 border-b border-gray-100 bg-white px-4 sm:px-6">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          aria-label="Open menu"
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Scholarship reward — shows here once the user has spun the wheel */}
        {wonReward && (
          <motion.div
            key={rewardLandPulse}
            data-reward-target
            initial={{ scale: 1, boxShadow: "0 0 0 0 rgba(220,38,38,0)" }}
            animate={{
              scale: [1, 1.08, 1],
              boxShadow: [
                "0 0 0 0 rgba(220,38,38,0)",
                "0 0 0 6px rgba(220,38,38,0.22)",
                "0 0 0 0 rgba(220,38,38,0)",
              ],
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="hidden min-w-0 max-w-xl flex-1 items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 sm:flex"
          >
            <Gift className="h-4 w-4 flex-shrink-0 text-red-500" />
            <span className="min-w-0 flex-1 truncate text-sm text-gray-700">
              <span className="font-semibold text-gray-900">You won {wonReward.label}!</span>{" "}
              Code:{" "}
              <span className="font-mono font-semibold text-red-600">
                {wonReward.couponCode}
              </span>
            </span>
            <button
              type="button"
              onClick={handleCopyReward}
              aria-label="Copy coupon code"
              className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-200/70 hover:text-gray-700"
            >
              {rewardCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </motion.div>
        )}

        <div className="ml-auto flex flex-shrink-0 items-center gap-2 sm:gap-3">
          <span className="hidden items-center gap-1.5 rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            AI Readiness 94/100
          </span>

          <div
            ref={notificationsRef}
            className="relative"
            onMouseEnter={openNotifications}
          >
            <button
              type="button"
              onClick={openNotifications}
              aria-label="Notifications"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
            >
              <Bell className="h-[18px] w-[18px]" strokeWidth={1.8} />
              {unreadCount > 0 && (
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 top-full z-50 mt-1 w-72 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
                <div className="flex items-center justify-between border-b border-gray-100 px-3 py-2">
                  <h3 className="text-xs font-bold text-gray-900">
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <span className="rounded-full bg-red-50 px-1.5 py-0.5 text-[10px] font-semibold text-red-600">
                      {unreadCount} new
                    </span>
                  )}
                </div>

                {notifications.length > 0 ? (
                  <div className="max-h-56 overflow-y-auto">
                    {notifications.map((n, i) => {
                      const Icon = n.icon;
                      return (
                        <div
                          key={i}
                          className={`flex gap-2.5 border-b border-gray-50 px-3 py-2 last:border-b-0 transition hover:bg-gray-50 ${
                            n.unread ? "bg-red-50/30" : ""
                          }`}
                        >
                          <span
                            className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${n.iconClass}`}
                          >
                            <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold text-gray-900">
                              {n.title}
                            </p>
                            <p className="mt-0.5 line-clamp-1 text-[11px] leading-relaxed text-gray-500">
                              {n.description}
                            </p>
                            <p className="mt-0.5 text-[10px] text-gray-400">
                              {n.time}
                            </p>
                          </div>
                          {n.unread && (
                            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center px-6 pb-6 pt-7 text-center">
                    <div className="relative">
                      <motion.span
                        initial={{ rotate: 0 }}
                        animate={{ rotate: [0, -14, 12, -8, 5, 0] }}
                        transition={{ duration: 0.9, delay: 0.1, ease: "easeInOut" }}
                        style={{ transformOrigin: "50% 15%" }}
                        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500 ring-1 ring-red-100"
                      >
                        <BellRing className="h-6 w-6" strokeWidth={1.8} />
                      </motion.span>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 420, damping: 18, delay: 0.45 }}
                        className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-white"
                      >
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </motion.span>
                    </div>
                    <p className="mt-4 text-sm font-semibold text-gray-900">
                      No new notifications
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500">
                      You&apos;re all caught up. We&apos;ll let you know when something new arrives.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div
            ref={profileMenuRef}
            className="relative"
            onMouseEnter={openProfileMenu}
          >
            <button
              type="button"
              onClick={openProfileMenu}
              className="flex items-center gap-2 rounded-full py-1 pl-1 pr-1.5 transition-colors hover:bg-gray-50 sm:pr-2.5"
            >
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-semibold text-white">
                {initial}
              </span>
              <span className="hidden text-left leading-tight sm:block">
                <span className="block text-sm font-semibold text-gray-900">
                  {displayName}
                </span>
                <span className="block text-xs text-gray-400">
                  {student.coursesInterested?.length
                    ? student.coursesInterested[0]
                    : "B.Tech CS"}
                </span>
              </span>
              <ChevronDown
                className={`hidden h-4 w-4 text-gray-400 transition-transform sm:block ${
                  profileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 top-full z-50 mt-1 w-44 rounded-xl border border-gray-100 bg-white py-1.5 shadow-lg">
                <Link
                  href="/dashboard/profile"
                  onClick={() => setProfileMenuOpen(false)}
                  className="flex items-center gap-2 px-3.5 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <UserCircle className="h-4 w-4 text-gray-400" />
                  Profile
                </Link>
                <Link
                  href="/dashboard/settings"
                  onClick={() => setProfileMenuOpen(false)}
                  className="flex items-center gap-2 px-3.5 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Settings className="h-4 w-4 text-gray-400" />
                  Settings
                </Link>
              </div>
            )}
          </div>
        </div>
    </header>
  );
}
