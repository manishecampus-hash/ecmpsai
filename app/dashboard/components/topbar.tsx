"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bell,
  ChevronDown,
  Menu,
  UserCircle,
  Settings,
  Landmark,
  Wallet,
  FileCheck2,
  MessageCircle,
  CalendarClock,
  Sparkles,
  Gift,
  Copy,
  Check,
} from "lucide-react";
import type { StudentProfile } from "../types";
import type { SpinWheelReward } from "./spin-wheel/data";

const notifications = [
  {
    icon: Landmark,
    iconClass: "bg-red-50 text-red-600",
    title: "2 new university matches found",
    description: "Chandigarh University & Manipal Online just crossed 90% fit.",
    time: "5 min ago",
    unread: true,
  },
  {
    icon: Wallet,
    iconClass: "bg-emerald-50 text-emerald-600",
    title: "Scholarship pre-approved",
    description: "You're eligible for ₹25,000 merit waiver — claim before it expires.",
    time: "1 hour ago",
    unread: true,
  },
  {
    icon: MessageCircle,
    iconClass: "bg-blue-50 text-blue-600",
    title: "Counselor Sara sent you a message",
    description: "\"Confirmed! CU & Manipal offer slot-based weekend exams.\"",
    time: "2 hours ago",
    unread: true,
  },
  {
    icon: FileCheck2,
    iconClass: "bg-violet-50 text-violet-600",
    title: "Document verified",
    description: "Your 12th marksheet has been OCR-verified successfully.",
    time: "Yesterday",
    unread: false,
  },
  {
    icon: CalendarClock,
    iconClass: "bg-amber-50 text-amber-600",
    title: "AI Match Call reminder",
    description: "Your 15-minute verification session is scheduled for tomorrow, 4 PM.",
    time: "Yesterday",
    unread: false,
  },
  {
    icon: Sparkles,
    iconClass: "bg-red-50 text-red-600",
    title: "AI Academic Twin updated",
    description: "Your calibration score moved from 64% to 72% this week.",
    time: "2 days ago",
    unread: false,
  },
  {
    icon: Landmark,
    iconClass: "bg-red-50 text-red-600",
    title: "Application deadline approaching",
    description: "NMIMS CDOE Executive MBA applications close in 4 days.",
    time: "3 days ago",
    unread: false,
  },
];

export default function Topbar({
  student,
  onOpenMobileMenu,
  wonReward,
}: {
  student: StudentProfile;
  onOpenMobileMenu: () => void;
  wonReward?: SpinWheelReward | null;
}) {
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
            className="hidden min-w-0 max-w-xl flex-1 items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 sm:flex"
          >
            <Gift className="h-4 w-4 flex-shrink-0 text-amber-600" />
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
              className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-amber-700 transition-colors hover:bg-amber-100"
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
            onMouseEnter={() => setNotificationsOpen(true)}
            onMouseLeave={() => setNotificationsOpen(false)}
          >
            <button
              type="button"
              onClick={() => setNotificationsOpen((v) => !v)}
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

                <button
                  type="button"
                  className="block w-full border-t border-gray-100 px-3 py-2 text-center text-xs font-semibold text-red-600 hover:bg-gray-50"
                >
                  View all notifications
                </button>
              </div>
            )}
          </div>

          <div
            ref={profileMenuRef}
            className="relative"
            onMouseEnter={() => setProfileMenuOpen(true)}
            onMouseLeave={() => setProfileMenuOpen(false)}
          >
            <button
              type="button"
              onClick={() => setProfileMenuOpen((v) => !v)}
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
                    : "B.Tech CS"}{" "}
                  · Cohort &apos;26
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
