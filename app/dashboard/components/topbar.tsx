"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  UserCircle,
  LogOut,
  Landmark,
  Wallet,
  FileCheck2,
  MessageCircle,
  CalendarClock,
  Sparkles,
} from "lucide-react";
import type { StudentProfile } from "../types";

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
}: {
  student: StudentProfile;
  onOpenMobileMenu: () => void;
}) {
  const router = useRouter();
  const displayName = student.name?.trim() || "Rahul Kumar";
  const initial = displayName.charAt(0).toUpperCase();

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => n.unread).length;

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

  const requestLogout = () => {
    setProfileMenuOpen(false);
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("ecampus_student");
    window.dispatchEvent(new Event("ecampus-auth-change"));
    setShowLogoutConfirm(false);
    router.push("/");
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 flex-shrink-0 items-center gap-3 border-b border-gray-100 bg-white px-4 sm:px-6">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          aria-label="Open menu"
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search */}
        <div className="hidden min-w-0 max-w-xl flex-1 items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 transition-all focus-within:border-red-300 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(220,38,38,0.08)] sm:flex">
          <Search className="h-4 w-4 flex-shrink-0 text-gray-400" />
          <input
            type="text"
            placeholder="Ask eCampus AI or search degrees, colleges, skills..."
            className="min-w-0 flex-1 appearance-none truncate rounded-none border-0 bg-transparent p-0 text-sm text-gray-700 shadow-none outline-none ring-0 placeholder:text-gray-400 focus:appearance-none focus:rounded-none focus:border-0 focus:bg-transparent focus:p-0 focus:text-sm focus:shadow-none focus:outline-none focus:ring-0"
          />
          <kbd className="hidden flex-shrink-0 rounded-md border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-gray-400 md:inline">
            ⌘K
          </kbd>
        </div>

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
                  href="/dashboard"
                  onClick={() => setProfileMenuOpen(false)}
                  className="flex items-center gap-2 px-3.5 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <UserCircle className="h-4 w-4 text-gray-400" />
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={requestLogout}
                  className="flex w-full items-center gap-2 px-3.5 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Logout confirmation */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
              onClick={() => setShowLogoutConfirm(false)}
            />
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 10 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white p-7 text-center shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Decorative glow */}
                <div className="pointer-events-none absolute -top-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-red-100 blur-2xl" />

                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.08, type: "spring", stiffness: 400, damping: 18 }}
                  className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 ring-8 ring-red-50/60"
                >
                  <LogOut className="h-7 w-7 text-red-600" />
                </motion.div>

                <h3 className="relative mt-5 text-xl font-bold text-gray-900">
                  Log out?
                </h3>
                <p className="relative mt-1.5 text-sm leading-relaxed text-gray-500">
                  Do you want to logout of your eCampus account?
                </p>

                <div className="relative mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 rounded-full border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={confirmLogout}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-red-600 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-600/25 transition-all hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/30"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Yes, Logout
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
