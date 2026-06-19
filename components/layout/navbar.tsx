//
//
//
//

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SignupModal } from "@/components/layout/signup-modal"; // ← adjust path as needed

const navLinks = [
  { label: "Discover", href: "/discover" },
  { label: "Compare", href: "/compare" },
  { label: "Apply", href: "/apply" },
  { label: "Study", href: "/study" },
  { label: "contact us", href: "/contact-us" },

  // { label: "Alumni", href: "/alumni" },
  // { label: "Scholarship", href: "/search?q=scholarship" },
  // { label: "Jobs/internships", href: "/jobs/internships" },
];

type Student = {
  name?: string;
  email: string;
};

export function Navbar() {
  const [student, setStudent] = useState<Student | null>(null);
  const [showSignupModal, setShowSignupModal] = useState(false); // ← NEW
  const pathname = usePathname();
  const [links, setLinks] = useState(navLinks);

  // Fetch dynamic menu from ecampus-frontend API
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL ||
          "http://localhost:5000";
        const res = await fetch(`${apiUrl}/menus/header`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch menu");
        const data = await res.json();
        if (data && Array.isArray(data.items)) {
          const formattedLinks = data.items.map((item: any) => {
            let href = item.url;
            if (item.urlType === "relative" && !href.startsWith("/")) {
              href = `/${href}`;
            }
            return { href, label: item.label };
          });
          setLinks(formattedLinks);
        }
      } catch (error) {
        console.error("Error loading header menu:", error);
      }
    };

    fetchMenu();
  }, []);

  // Read student from localStorage on mount + listen for auth changes
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

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 flex-shrink-0 group"
            >
              <div className="relative w-32 h-16 cursor-pointer">
                <Image
                  src="/image/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain brightness-0 transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
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

            {/* Right Side — login state */}
            <div className="flex items-center gap-2">
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
                  {/* ↓ onClick opens modal instead of navigating */}
                  <Button
                    size="sm"
                    onClick={() => setShowSignupModal(true)}
                    className="bg-white text-gray-800 border border-gray-300 rounded-full hover:bg-gray-100 hover:text-gray-900"
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <button className="md:hidden p-2 text-gray-800">
                    <Menu className="w-6 h-6" />
                  </button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="bg-white border-l border-gray-200"
                >
                  <div className="mt-8 flex flex-col gap-2">
                    {links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                          isActive(link.href)
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}

                    <div className="mt-4 border-t border-gray-200 pt-4">
                      {student ? (
                        <>
                          <div className="px-4 py-2 text-sm font-medium text-gray-900">
                            Hi, {displayName}
                          </div>
                          <Button
                            onClick={handleLogout}
                            variant="ghost"
                            className="w-full justify-start text-gray-700"
                          >
                            Logout
                          </Button>
                        </>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Link href="/login">
                            <Button
                              variant="outline"
                              className="w-24 border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-black"
                            >
                              Login
                            </Button>
                          </Link>
                          {/* ↓ Mobile signup also opens modal */}
                          <Button
                            className="w-24 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-black"
                            onClick={() => setShowSignupModal(true)}
                          >
                            Sign Up
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Signup Modal — rendered outside header so backdrop covers full page */}
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSwitchToLogin={() => {
          setShowSignupModal(false);
          // If you also have a login modal, open it here
          // Otherwise, navigate: router.push("/login")
        }}
      />
    </>
  );
}
