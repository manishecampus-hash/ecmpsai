"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  UserCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  X,
  Search,
  Scale,
  CheckCircle,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignupModal } from "@/components/layout/signup-modal";
import { categories } from "@/data/header-menu";
import BottomNav from "../BottomNav";

type Student = {
  name?: string;
  email: string;
};

const navLinks = [
  { label: "Discover", href: "/discover" },
  { label: "Compare", href: "/compare" },
  { label: "Apply", href: "/apply" },
  { label: "Study", href: "/study" },
  { label: "Contact Us", href: "/contact-us" },
];

function GrayIcon({
  Icon,
  size = 20,
  active = false,
  boxClass = "w-11 h-11 rounded-full",
}) {
  return (
    <span
      className={`${boxClass} bg-[#f3f4f6] border border-gray-200 flex items-center justify-center flex-shrink-0`}
    >
      <Icon size={size} className="text-black" strokeWidth={1.8} />
    </span>
  );
}

function CourseCard({ tag, name, duration, href = "#", image, onNavigate }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="flex items-center justify-between gap-5 border border-gray-100 rounded-2xl p-5 transition-all duration-150 hover:border-red-300 "
    >
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-widest mb-1.5 text-red-500">
          {tag}
        </p>
        <p className="text-base font-medium text-gray-800 leading-snug mb-2.5">
          {name}
        </p>
        <span className="flex items-center gap-1.5 text-[13px] text-gray-500">
          <Clock size={13} className="text-green-500" strokeWidth={1.8} />
          {duration}
        </span>
      </div>
      {image && (
        <div className="relative w-28 h-20 flex items-center justify-center flex-shrink-0">
          <div className="absolute inset-0 rounded-2xl via-yellow-100 to-blue-100 blur-sm opacity-90" />
          <div className="relative w-24 h-16 rounded-2xl bg-white/70 border border-white shadow-sm flex items-center justify-center">
            <img
              src={image}
              alt={name}
              className="max-w-[88%] max-h-[88%] object-contain drop-shadow-md saturate-150 contrast-110"
            />
          </div>
        </div>
      )}
    </Link>
  );
}

function ProgramDropdown({ open, onClose }) {
  const [activeCat, setActiveCat] = useState(categories[0].id);
  const active = categories.find((c) => c.id === activeCat) || categories[0];

  if (!open) return null;

  return (
    <div className="fixed top-[80px] left-1/2 -translate-x-1/2 w-[1040px] max-w-[calc(100vw-32px)] bg-white rounded-3xl border border-gray-200 shadow-2xl z-[999] overflow-hidden">
      <div className="flex max-h-[520px]">
        <aside className="w-72 border-r border-gray-100 py-3 flex-shrink-0 bg-gray-50/80 overflow-y-auto max-h-[520px] custom-scroll">
          {categories.map((cat) => {
            const isActive = cat.id === activeCat;
            return (
              <button
                key={cat.id}
                onMouseEnter={() => setActiveCat(cat.id)}
                onClick={() => setActiveCat(cat.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 text-left transition-all duration-100 border-r-2 ${
                  isActive
                    ? "bg-black-50 border-black text-red-600 font-semibold"
                    : "border-transparent text-black hover:bg-white hover:text-gray-900"
                }`}
              >
                <GrayIcon
                  Icon={cat.Icon}
                  size={18}
                  active={isActive}
                  boxClass="w-10 h-10 rounded-full"
                />
                <span className="leading-tight flex-1 text-[15px]">
                  {cat.label}
                </span>
                <ChevronRight
                  size={15}
                  className={isActive ? "text-red-500" : "text-black"}
                  strokeWidth={1.8}
                />
              </button>
            );
          })}
        </aside>
        <div className="flex-1 p-6 overflow-y-auto max-h-[520px] custom-scroll ">
          <div className="grid grid-cols-2 gap-4">
            {active.courses.map((c, i) => (
              <CourseCard key={i} {...c} onNavigate={onClose} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ FIXED: Single unified mobile menu using a full-screen slide-in drawer
function MobileDrawer({
  open,
  onClose,
  student,
  displayName,
  onLogout,
  onSignup,
  pathname,
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const isActive = (href: string) => {
    const basePath = href.split("?")[0];
    return pathname === basePath || pathname.startsWith(basePath);
  };

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-[55] md:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[85vw] max-w-[340px] bg-white z-[60] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <span className="text-sm font-bold text-gray-800">Menu</span>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X size={18} className="text-gray-700" strokeWidth={1.8} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto custom-scroll">
          <div className="px-4 pt-4 pb-6 space-y-1.5">
            {/* Programs section */}
            <p className="text-[12px] font-semibold uppercase tracking-widest text-gray-400 px-2 mb-3">
              Programs
            </p>

            {categories.map(({ id, label, Icon, courses }) => {
              const isOpen = expanded === id;
              return (
                <div key={id}>
                  <button
                    onClick={() => setExpanded(isOpen ? null : id)}
                    className={`w-full flex items-center gap-3.5 px-3 py-3 rounded-full text-base transition-colors ${
                      isOpen ? "bg-red-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <GrayIcon
                      Icon={Icon}
                      size={18}
                      active={isOpen}
                      boxClass="w-11 h-11 rounded-full"
                    />
                    <span
                      className={`font-medium flex-1 text-left text-[15px] ${
                        isOpen ? "text-red-600" : "text-gray-800"
                      }`}
                    >
                      {label}
                    </span>
                    <ChevronDown
                      size={17}
                      className={`flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-red-400" : "text-black"
                      }`}
                      strokeWidth={1.8}
                    />
                  </button>

                  {isOpen && (
                    <div className="ml-14 mt-2 space-y-2.5 pb-2">
                      {courses.map((c, i) => (
                        <Link
                          key={i}
                          href={c.href || "#"}
                          onClick={onClose}
                          className="block px-4 py-3 rounded-2xl border border-gray-100 hover:border-red-200 hover:bg-red-50 transition-all"
                        >
                          <p className="text-[11px] font-semibold uppercase tracking-widest mb-1 text-red-500">
                            {c.tag}
                          </p>
                          <p className="text-[15px] font-medium text-gray-800 leading-snug">
                            {c.name}
                          </p>
                          <span className="flex items-center gap-1.5 text-[12px] text-gray-500 mt-1.5">
                            <Clock
                              size={12}
                              className="text-green-500"
                              strokeWidth={1.8}
                            />
                            {c.duration}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Navigation section */}
            <p className="text-[12px] font-semibold uppercase tracking-widest text-gray-400 px-2 pt-4 mb-2">
              Navigation
            </p>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`block px-4 py-2.5 rounded-full text-[15px] font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Auth section */}
            <div className="mt-4 border-t border-gray-200 pt-4">
              {student ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 bg-gray-50 mb-2">
                    <UserCircle className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm font-semibold text-gray-900">
                      Hi, {displayName}
                    </span>
                  </div>
                  <Button
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    variant="ghost"
                    className="w-full justify-start text-gray-700"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login" onClick={onClose}>
                    <Button
                      variant="outline"
                      className="w-24 border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-black"
                    >
                      Login
                    </Button>
                  </Link>
                  <Button
                    className="  px-4 py-2.5 rounded-md text-[15px] font-medium transition-colors  text-gray-700 bg-white hover:bg-gray-50 "
                    onClick={() => {
                      onSignup();
                      onClose();
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Navbar() {
  const [student, setStudent] = useState<Student | null>(null);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [floating, setFloating] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setFloating(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const readStudent = () => {
      const saved = localStorage.getItem("ecampus_student");
      setStudent(saved ? JSON.parse(saved) : null);
    };
    readStudent();
    window.addEventListener("ecampus-auth-change", readStudent);
    return () => window.removeEventListener("ecampus-auth-change", readStudent);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ecampus_student");
    window.dispatchEvent(new Event("ecampus-auth-change"));
    setStudent(null);
  };

  const isActive = (href: string) => {
    const basePath = href.split("?")[0];
    return pathname === basePath || pathname.startsWith(basePath);
  };

  const displayName =
    student?.name?.split(" ")[0] ?? student?.email?.split("@")[0];

  const toggle = (menu: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === menu ? null : menu);
    setMobileOpen(false);
  };

  const closeAll = () => {
    setActiveMenu(null);
    setMobileOpen(false);
  };

  // Bottom nav links - first 4 items only
  const bottomNavLinks = navLinks.slice(0, 4);

  return (
    <>
      <style>{`
        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: #e5e7eb transparent;
        }
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: #e5e7eb;
          border-radius: 99px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background-color: #d1d5db;
        }
      `}</style>

      <header className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 flex-shrink-0 group"
              onClick={closeAll}
            >
              <div className="relative w-32 h-16 cursor-pointer">
                <Image
                  src="/image/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain  transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center gap-1"
              ref={dropdownRef}
            >
              <div className="relative">
                <button
                  onClick={(e) => toggle("program", e)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[15px] font-medium transition-all duration-200 ${
                    activeMenu !== "program"
                      ? "bg-[#FFF5F5] text-red-600 border-[#FDE2E2]"
                      : "bg-white text-gray-600 border-gray-300"
                  }`}
                >
                  Programs
                  <ChevronDown
                    className={`w-4 h-4 ${
                      activeMenu !== "program"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  />
                </button>
                <ProgramDropdown
                  open={activeMenu === "program"}
                  onClose={closeAll}
                />
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeAll}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                    isActive(link.href)
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Desktop auth */}
              {student ? (
                <div className="hidden sm:flex items-center gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5">
                    <UserCircle className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm font-semibold text-gray-900">
                      Hi, {displayName}
                    </span>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => setShowSignupModal(true)}
                    className="bg-white text-gray-800 border border-gray-300 rounded-full hover:bg-gray-100 hover:text-gray-900"
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              {/* Hamburger button */}
              <button
                className="md:hidden p-2 text-gray-800"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        open={mobileOpen}
        onClose={closeAll}
        student={student}
        displayName={displayName}
        onLogout={handleLogout}
        onSignup={() => setShowSignupModal(true)}
        pathname={pathname}
      />

      {/* ✅ Bottom Navigation Bar - Modern Design */}
      <BottomNav />
      {/* Signup Modal */}
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSwitchToLogin={() => setShowSignupModal(false)}
      />
    </>
  );
}
