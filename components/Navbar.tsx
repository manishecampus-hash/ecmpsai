"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Menu,
  Sun,
  Moon,
  GraduationCap,
  UserRound,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "/search?q=degrees", label: "Degrees" },
  { href: "/search?q=universities", label: "Universities" },
  { href: "/compare", label: "Compare" },
  { href: "/search?q=careers", label: "Careers" },
];

type Student = {
  name: string;
  email: string;
};

const capitalize = (s?: string) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : undefined;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [student, setStudent] = useState<Student | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // Read student from localStorage — re-runs on auth change & storage events
  useEffect(() => {
    const readStudent = () => {
      try {
        const saved = localStorage.getItem("ecampus_student");
        setStudent(saved ? JSON.parse(saved) : null);
      } catch {
        setStudent(null);
      }
    };

    readStudent();
    window.addEventListener("storage", readStudent);
    window.addEventListener("ecampus-auth-change", readStudent);
    return () => {
      window.removeEventListener("storage", readStudent);
      window.removeEventListener("ecampus-auth-change", readStudent);
    };
  }, []);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = () => setDropdownOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [dropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem("ecampus_student");
    setStudent(null);
    setDropdownOpen(false);
    window.dispatchEvent(new Event("ecampus-auth-change"));
  };

  const firstName = capitalize(student?.name?.split(" ")[0]);
  const initials = student?.name
    ? student.name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("")
    : "";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#4F46E5] rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              e<span className="text-[#4F46E5]">Campus</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#4F46E5] dark:hover:text-[#818CF8] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Theme toggle — only after mount to avoid hydration mismatch */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            )}

            {/* Auth area — desktop */}
            {mounted &&
              (student ? (
                /* Logged-in user avatar + dropdown */
                <div className="relative hidden md:block">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDropdownOpen((o) => !o);
                    }}
                    className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-[#4F46E5] transition-all"
                  >
                    {/* Avatar circle with initials */}
                    <div className="w-7 h-7 rounded-full bg-[#4F46E5] flex items-center justify-center text-white text-xs font-semibold">
                      {initials}
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {firstName}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                          {student.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {student.email}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Guest buttons */
                <div className="hidden md:flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 dark:text-gray-300"
                  >
                    Login
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-full px-5"
                  >
                    Sign Up     gggg
                  </Button>
                </div>
              ))}

            {/* Mobile hamburger */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 dark:bg-gray-950">
                <div className="flex flex-col gap-1 mt-8">
                  {/* Mobile user info */}
                  {student && (
                    <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-gray-50 dark:bg-gray-900">
                      <div className="w-9 h-9 rounded-full bg-[#4F46E5] flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                          {student.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {student.email}
                        </p>
                      </div>
                    </div>
                  )}

                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-[#4F46E5] dark:hover:text-[#818CF8] rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="mt-4 flex flex-col gap-2 px-4">
                    {student ? (
                      <Button
                        variant="outline"
                        className="w-full text-red-500 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/40"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    ) : (
                      <>
                        <Button variant="outline" className="w-full">
                          Login
                        </Button>
                        <Button className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white">
                          Sign Up Free
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
