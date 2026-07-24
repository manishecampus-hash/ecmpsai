// "use client";

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import {
//   Menu,
//   UserCircle,
//   ChevronDown,
//   ChevronRight,
//   ChevronLeft,
//   Clock,
//   X,
//   Search,
//   Scale,
//   CheckCircle,
//   BookOpen,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { SignupModal } from "@/components/layout/signup-modal";
// import { categories } from "@/data/header-menu";
// import BottomNav from "../BottomNav";

// type Student = {
//   name?: string;
//   email: string;
// };

// const navLinks = [
//   { label: "Discover", href: "/discover" },
//   { label: "Compare", href: "/compare" },
//   { label: "Universities", href: "/universities" },
//   { label: "Study", href: "/study" },
//   { label: "Contact Us", href: "/contact-us" },
// ];

// function GrayIcon({
//   Icon,
//   size = 20,
//   active = false,
//   boxClass = "w-11 h-11 rounded-full",
// }) {
//   return (
//     <span
//       className={`${boxClass} bg-[#f3f4f6] border border-gray-200 flex items-center justify-center flex-shrink-0`}
//     >
//       <Icon size={size} className="text-black" strokeWidth={1.8} />
//     </span>
//   );
// }

// function CourseCard({ tag, name, duration, href = "#", image, onNavigate }) {
//   return (
//     <Link
//       href={href}
//       onClick={onNavigate}
//       className="flex items-center justify-between gap-5 border border-gray-100 rounded-2xl p-5 transition-all duration-150 hover:border-red-300 hover:-translate-y-1 hover:shadow-md"
//     >
//       <div className="min-w-0">
//         <p className="text-[11px] font-semibold uppercase tracking-widest mb-1.5 text-red-500">
//           {tag}
//         </p>
//         <p className="text-base font-medium text-gray-800 leading-snug mb-2.5">
//           {name}
//         </p>
//         <span className="flex items-center gap-1.5 text-[13px] text-gray-500">
//           <Clock size={13} className="text-green-500" strokeWidth={1.8} />
//           {duration}
//         </span>
//       </div>
//       {image && (
//         <div className="relative w-20 h-16 flex items-center justify-center flex-shrink-0">
//           <div className="absolute inset-0 rounded-2xl via-yellow-100 to-blue-100 blur-sm opacity-90" />
//           <div className="relative w-24 h-16 rounded-2xl bg-white/70 border border-white shadow-sm flex items-center justify-center">
//             <img
//               src={image}
//               alt={name}
//               className="max-w-[88%] max-h-[88%] object-contain drop-shadow-md saturate-150 contrast-110"
//             />
//           </div>
//         </div>
//       )}
//     </Link>
//   );
// }

// function ProgramDropdown({
//   open,
//   onClose,
//   dropdownRef,
// }: {
//   open: boolean;
//   onClose: () => void;
//   dropdownRef: React.RefObject<HTMLDivElement>;
// }) {
//   const [activeCat, setActiveCat] = useState(categories[0].id);
//   const [mobileStep, setMobileStep] = useState<"list" | "detail">("list");
//   const active = categories.find((c) => c.id === activeCat) || categories[0];

//   // Reset to category list every time the dropdown is (re)opened
//   useEffect(() => {
//     if (open) setMobileStep("list");
//   }, [open]);

//   if (!open) return null;

//   const handleCategoryClick = (id: string) => {
//     setActiveCat(id);
//     setMobileStep("detail"); // mobile: drill into courses
//   };

//   return (
//     <div
//       ref={dropdownRef}
//       className="fixed top-[80px] left-1/2 -translate-x-1/2 w-[1040px] max-w-[calc(100vw-16px)] sm:max-w-[calc(100vw-32px)] bg-[#f7fbff] rounded-2xl sm:rounded-3xl border border-gray-200 shadow-2xl z-[999] overflow-hidden"
//     >
//       <div className="flex flex-col md:flex-row max-h-[80vh] md:max-h-[520px]">
//         {/* ===== Sidebar: category list ===== */}
//         {/* Desktop: always visible. Mobile: only visible when mobileStep === "list" */}
//         <aside
//           className={`${
//             mobileStep === "list" ? "block" : "hidden"
//           } md:block w-full md:w-72 border-b md:border-b-0 md:border-r border-gray-100 py-2 md:py-3 flex-shrink-0 bg-gray-50/80 overflow-y-auto max-h-[80vh] md:max-h-[520px] custom-scroll`}
//         >
//           {categories.map((cat) => {
//             const isActive = cat.id === activeCat;
//             return (
//               <button
//                 key={cat.id}
//                 onMouseEnter={() => setActiveCat(cat.id)}
//                 onClick={() => handleCategoryClick(cat.id)}
//                 className={`w-[95%] mx-auto flex items-center gap-3.5 px-4 py-3 text-left rounded-xl transition-all duration-150 ${
//                   isActive
//                     ? "bg-[#fde9eb] text-red-700 font-semibold"
//                     : "text-black hover:bg-[#fde9eb]/60 hover:text-red-600"
//                 }`}
//               >
//                 <GrayIcon
//                   Icon={cat.Icon}
//                   size={18}
//                   active={isActive}
//                   boxClass="w-10 h-10 rounded-full"
//                 />
//                 <span className="leading-tight flex-1 text-[15px]">
//                   {cat.label}
//                 </span>
//                 <ChevronRight
//                   size={15}
//                   className={isActive ? "text-red-500" : "text-black"}
//                   strokeWidth={1.8}
//                 />
//               </button>
//             );
//           })}
//         </aside>

//         {/* ===== Content: course cards for active category ===== */}
//         {/* Desktop: always visible. Mobile: only visible when mobileStep === "detail" */}
//         <div
//           className={`${
//             mobileStep === "detail" ? "flex" : "hidden"
//           } md:flex flex-1 flex-col p-4 md:p-6 overflow-y-auto max-h-[80vh] md:max-h-[520px] custom-scroll`}
//         >
//           {/* Mobile-only back header */}
//           <button
//             onClick={() => setMobileStep("list")}
//             className="md:hidden flex items-center gap-2 mb-4 text-sm font-semibold text-gray-700"
//           >
//             <ChevronLeft size={18} strokeWidth={2} />
//             {active.label}
//           </button>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
//             {active.courses.map((c, i) => (
//               <CourseCard key={i} {...c} onNavigate={onClose} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Mobile menu: Programs is a direct button (not inside this drawer anymore)
// function MobileDrawer({
//   open,
//   onClose,
//   student,
//   displayName,
//   onLogout,
//   onSignup,
//   pathname,
// }) {
//   const isActive = (href: string) => {
//     const basePath = href.split("?")[0];
//     return pathname === basePath || pathname.startsWith(basePath);
//   };

//   // Prevent body scroll when drawer is open
//   useEffect(() => {
//     if (open) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [open]);

//   return (
//     <>
//       {/* Backdrop */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/40 z-[55] md:hidden"
//           onClick={onClose}
//         />
//       )}

//       {/* Drawer panel */}
//       <div
//         className={`fixed top-0 right-0 bottom-0 w-[85vw] max-w-[340px] bg-white z-[60] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
//           open ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* Drawer header */}
//         <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
//           <span className="text-sm font-bold text-gray-800">Menu</span>
//           <button
//             onClick={onClose}
//             className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//           >
//             <X size={18} className="text-gray-700" strokeWidth={1.8} />
//           </button>
//         </div>

//         {/* Scrollable content */}
//         <div className="flex-1 overflow-y-auto custom-scroll">
//           <div className="px-4 pt-4 pb-6 space-y-1.5">
//             {/* Navigation section */}

//             {navLinks
//               .filter(
//                 (link) =>
//                   !["/discover", "/compare", "/apply", "/study"].includes(
//                     link.href,
//                   ),
//               )
//               .map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   onClick={onClose}
//                   className={`block px-4 py-2.5 rounded-full text-[15px] font-medium transition-colors ${
//                     isActive(link.href)
//                       ? "bg-gray-100 text-gray-900"
//                       : "text-gray-700 hover:bg-gray-50"
//                   }`}
//                 >
//                   {link.label}
//                 </Link>
//               ))}

//             {/* Auth section */}
//             <div className="mt-4 border-t border-gray-200 pt-4">
//               {student ? (
//                 <>
//                   <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 bg-gray-50 mb-2">
//                     <UserCircle className="w-4 h-4 text-indigo-600" />
//                     <span className="text-sm font-semibold text-gray-900">
//                       Hi, {displayName}
//                     </span>
//                   </div>
//                   <Button
//                     onClick={() => {
//                       onLogout();
//                       onClose();
//                     }}
//                     variant="ghost"
//                     className="w-full justify-start text-gray-700"
//                   >
//                     Logout
//                   </Button>
//                 </>
//               ) : (
//                 <div className="flex items-center gap-2">
//                   <Link href="/login" onClick={onClose}>
//                     <Button
//                       variant="outline"
//                       className="w-24 border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-black"
//                     >
//                       Login
//                     </Button>
//                   </Link>
//                   <Button
//                     className="  px-4 py-2.5 rounded-md text-[15px] font-medium transition-colors  text-gray-700 bg-white hover:bg-gray-50 "
//                     onClick={() => {
//                       onSignup();
//                       onClose();
//                     }}
//                   >
//                     Sign Up
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export function Navbar() {
//   const [student, setStudent] = useState<Student | null>(null);
//   const [showSignupModal, setShowSignupModal] = useState(false);
//   const [activeMenu, setActiveMenu] = useState<string | null>(null);
//   const [floating, setFloating] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const pathname = usePathname();

//   // FIX: split the single shared ref into three separate refs so outside-click
//   // detection can correctly check the desktop trigger, the mobile trigger, and
//   // the dropdown panel independently. Previously both the <nav> and the
//   // ProgramDropdown wrapper used the SAME `dropdownRef`, so the later-rendered
//   // element (the dropdown wrapper) silently overwrote `dropdownRef.current`,
//   // meaning the Programs button was never recognized as "inside" the ref.
//   // That caused the mousedown handler to immediately close the menu, and then
//   // the click handler right after would toggle it open again — so the dropdown
//   // would flicker instead of closing properly.
//   const desktopTriggerRef = useRef<HTMLDivElement>(null);
//   const mobileTriggerRef = useRef<HTMLButtonElement>(null);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleScroll = () => setFloating(window.scrollY > 0);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const target = event.target as Node;

//       const clickedInsideDesktopTrigger =
//         desktopTriggerRef.current && desktopTriggerRef.current.contains(target);
//       const clickedInsideMobileTrigger =
//         mobileTriggerRef.current && mobileTriggerRef.current.contains(target);
//       const clickedInsideDropdown =
//         dropdownRef.current && dropdownRef.current.contains(target);

//       if (
//         !clickedInsideDesktopTrigger &&
//         !clickedInsideMobileTrigger &&
//         !clickedInsideDropdown
//       ) {
//         setActiveMenu(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     const readStudent = () => {
//       const saved = localStorage.getItem("ecampus_student");
//       setStudent(saved ? JSON.parse(saved) : null);
//     };
//     readStudent();
//     window.addEventListener("ecampus-auth-change", readStudent);
//     return () => window.removeEventListener("ecampus-auth-change", readStudent);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("ecampus_student");
//     window.dispatchEvent(new Event("ecampus-auth-change"));
//     setStudent(null);
//   };

//   const isActive = (href: string) => {
//     const basePath = href.split("?")[0];
//     return pathname === basePath || pathname.startsWith(basePath);
//   };

//   const displayName =
//     student?.name?.split(" ")[0] ?? student?.email?.split("@")[0];

//   const toggle = (menu: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setActiveMenu(activeMenu === menu ? null : menu);
//     setMobileOpen(false);
//   };

//   const closeAll = () => {
//     setActiveMenu(null);
//     setMobileOpen(false);
//   };

//   // Bottom nav links - first 4 items only
//   const bottomNavLinks = navLinks.slice(0, 4);

//   return (
//     <>
//       <style>{`
//         .custom-scroll {
//           scrollbar-width: thin;
//           scrollbar-color: #e5e7eb transparent;
//         }
//         .custom-scroll::-webkit-scrollbar { width: 4px; }
//         .custom-scroll::-webkit-scrollbar-track { background: transparent; }
//         .custom-scroll::-webkit-scrollbar-thumb {
//           background-color: #e5e7eb;
//           border-radius: 99px;
//         }
//         .custom-scroll::-webkit-scrollbar-thumb:hover {
//           background-color: #d1d5db;
//         }
//       `}</style>

//       <header className="fixed top-0 left-0 right-0 z-50 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Left side: Hamburger (mobile only) + Logo */}
//             {/* CHANGED: Hamburger button moved here, to the left of the logo, mobile-only */}
//             <div className="flex items-center gap-2">
//               <button
//                 className="md:hidden p-2 text-gray-800"
//                 onClick={() => setMobileOpen((prev) => !prev)}
//                 aria-label="Toggle menu"
//               >
//                 {mobileOpen ? (
//                   <X className="w-6 h-6" />
//                 ) : (
//                   <Menu className="w-6 h-6" />
//                 )}
//               </button>

//               <Link
//                 href="/"
//                 className="flex items-center gap-2 flex-shrink-0 group"
//                 onClick={closeAll}
//               >
//                 <div className="relative w-32 h-16 cursor-pointer">
//                   <Image
//                     src="/image/logo.png"
//                     alt="Logo"
//                     fill
//                     className="object-contain  transition-transform duration-300 group-hover:scale-105"
//                     priority
//                   />
//                 </div>
//               </Link>
//             </div>

//             {/* Desktop Navigation */}
//             <nav
//               className="hidden md:flex items-center gap-1"
//               ref={desktopTriggerRef}
//             >
//               <button
//                 onClick={(e) => toggle("program", e)}
//                 className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[15px] font-medium transition-all duration-200 ${
//                   activeMenu !== "program"
//                     ? "bg-[#FFF5F5] text-red-600 border-[#FDE2E2]"
//                     : "bg-white text-gray-600 border-gray-300"
//                 }`}
//               >
//                 Programs
//                 <ChevronDown
//                   className={`w-4 h-4 transition-transform duration-200 ${
//                     activeMenu === "program" ? "rotate-180" : "rotate-0"
//                   } ${
//                     activeMenu !== "program" ? "text-red-600" : "text-gray-600"
//                   }`}
//                 />
//               </button>

//               {navLinks.map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   onClick={closeAll}
//                   className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
//                     isActive(link.href)
//                       ? "bg-gray-100 text-gray-900"
//                       : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//                   }`}
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//             </nav>

//             {/* Right side */}
//             <div className="flex items-center gap-2">
//               {/* Desktop auth */}
//               {student ? (
//                 <div className="hidden sm:flex items-center gap-3">
//                   <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5">
//                     <UserCircle className="w-4 h-4 text-indigo-600" />
//                     <span className="text-sm font-semibold text-gray-900">
//                       Hi, {displayName}
//                     </span>
//                   </div>
//                   <Button
//                     onClick={handleLogout}
//                     variant="ghost"
//                     size="sm"
//                     className="text-gray-600 hover:text-gray-900"
//                   >
//                     Logout
//                   </Button>
//                 </div>
//               ) : (
//                 <div className="hidden sm:flex items-center gap-2">
//                   <Button
//                     size="sm"
//                     onClick={() => setShowSignupModal(true)}
//                     className="bg-white text-gray-800 border border-gray-300 rounded-full hover:bg-gray-100 hover:text-gray-900"
//                   >
//                     Sign Up
//                   </Button>
//                 </div>
//               )}

//               {/* Mobile Programs button - direct button, same style as desktop */}
//               <button
//                 ref={mobileTriggerRef}
//                 onClick={(e) => toggle("program", e)}
//                 className={`md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium transition-all duration-200 ${
//                   activeMenu !== "program"
//                     ? "bg-[#FFF5F5] text-red-600 border-[#FDE2E2]"
//                     : "bg-white text-gray-600 border-gray-300"
//                 }`}
//               >
//                 Programs
//                 <ChevronDown
//                   className={`w-3.5 h-3.5 transition-transform duration-200 ${
//                     activeMenu === "program" ? "rotate-180" : "rotate-0"
//                   } ${
//                     activeMenu !== "program" ? "text-red-600" : "text-gray-600"
//                   }`}
//                 />
//               </button>

//               {/* REMOVED: Hamburger button used to be here on the right side.
//                   It has been moved to the top-left, next to the logo. */}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Program dropdown - shared between desktop button and mobile button */}
//       <ProgramDropdown
//         open={activeMenu === "program"}
//         onClose={closeAll}
//         dropdownRef={dropdownRef}
//       />

//       {/* Mobile Drawer */}
//       <MobileDrawer
//         open={mobileOpen}
//         onClose={closeAll}
//         student={student}
//         displayName={displayName}
//         onLogout={handleLogout}
//         onSignup={() => setShowSignupModal(true)}
//         pathname={pathname}
//       />

//       {/* Bottom Navigation Bar - Modern Design */}
//       <BottomNav />
//       {/* Signup Modal */}
//       <SignupModal
//         isOpen={showSignupModal}
//         onClose={() => setShowSignupModal(false)}
//         onSwitchToLogin={() => setShowSignupModal(false)}
//       />
//     </>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  UserCircle,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Clock,
  X,
  Search,
  Scale,
  CheckCircle,
  BookOpen,
  Building2,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignupModal } from "@/components/layout/signup-modal";
import { categories } from "@/data/header-menu";
import AnimatedDrawer from "@/components/AnimatedDrawer";
import BottomNav from "../BottomNav";
import * as LucideIcons from "lucide-react";

type Student = {
  name?: string;
  email: string;
};

const navLinks = [
  { label: "Discover", href: "/discover" },
  { label: "Compare", href: "/compare" },
  { label: "Universities", href: "/universities" },
  { label: "Study", href: "/study" },
  { label: "Contact Us", href: "/contact-us" },
];

function CategoryIcon({ icon, className }: { icon: any; className?: string }) {
  if (!icon) return <LucideIcons.BookOpen className={className} />;

  // If it's a React component / function, render it directly
  if (typeof icon === "function" || (typeof icon === "object" && icon !== null)) {
    const IconComp = icon;
    return <IconComp className={className} />;
  }

  // If it's a string, check if it's an image URL or Lucide icon name
  if (typeof icon === "string") {
    if (icon.startsWith("http") || icon.startsWith("/") || icon.includes(".")) {
      return <img src={icon} alt="" className="w-5 h-5 object-contain rounded-sm flex-shrink-0" />;
    }
    const IconComponent = (LucideIcons as any)[icon] || LucideIcons.BookOpen;
    return <IconComponent className={className} />;
  }

  return <LucideIcons.BookOpen className={className} />;
}

function GrayIcon({
  icon,
  size = 20,
  active = false,
  boxClass = "w-11 h-11 rounded-full",
}: {
  icon: any;
  size?: number;
  active?: boolean;
  boxClass?: string;
}) {
  return (
    <span
      className={`${boxClass} bg-[#f3f4f6] border border-gray-200 flex items-center justify-center flex-shrink-0`}
    >
      <CategoryIcon icon={icon} className="text-black w-[18px] h-[18px]" />
    </span>
  );
}

function CourseCard({
  tag,
  name,
  duration,
  href = "#",
  image,
  onNavigate,
}: {
  tag: string;
  name: string;
  duration: string;
  href?: string;
  image?: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="flex items-center justify-between gap-5 bg-white border border-gray-100 rounded-2xl p-5 transition-all duration-150 hover:border-red-300 hover:-translate-y-1 hover:shadow-md"
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
        <div className="relative w-20 h-16 flex items-center justify-center flex-shrink-0">
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

function ProgramDropdown({
  open,
  onClose,
  dropdownRef,
  categories,
  activeCat,
  setActiveCat,
}: {
  open: boolean;
  onClose: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
  categories: any[];
  activeCat: string;
  setActiveCat: (id: string) => void;
}) {
  const [mobileStep, setMobileStep] = useState<"list" | "detail">("list");

  // Reset to category list every time the dropdown is (re)opened
  useEffect(() => {
    if (open) setMobileStep("list");
  }, [open]);

  if (!open || categories.length === 0) return null;

  const currentActiveCatId = activeCat || (categories[0] ? categories[0].id : "");
  const active = categories.find((c) => c.id === currentActiveCatId) || categories[0];

  const handleCategoryClick = (id: string) => {
    setActiveCat(id);
    setMobileStep("detail"); // mobile: drill into courses
  };

  return (
    <div
      ref={dropdownRef}
      className="fixed top-[80px] left-1/2 -translate-x-1/2 w-[1040px] max-w-[calc(100vw-16px)] sm:max-w-[calc(100vw-32px)] bg-[#f7fbff] rounded-2xl sm:rounded-3xl border border-gray-200 shadow-2xl z-[999] overflow-hidden"
    >
      <div className="flex flex-col md:flex-row max-h-[80vh] md:max-h-[520px]">
        {/* ===== Sidebar: category list ===== */}
        {/* Desktop: always visible. Mobile: only visible when mobileStep === "list" */}
        <aside
          className={`${
            mobileStep === "list" ? "block" : "hidden"
          } md:block w-full md:w-72 border-b md:border-b-0 md:border-r border-gray-100 py-2 md:py-3 flex-shrink-0 bg-gray-50/80 overflow-y-auto max-h-[80vh] md:max-h-[520px] custom-scroll`}
        >
          {categories.map((cat) => {
            const isActive = cat.id === currentActiveCatId;
            return (
              <button
                key={cat.id}
                onMouseEnter={() => setActiveCat(cat.id)}
                onClick={() => handleCategoryClick(cat.id)}
                className={`w-[95%] mx-auto flex items-center gap-3.5 px-4 py-3 text-left rounded-xl transition-all duration-150 ${
                  isActive
                    ? "bg-[#fde9eb] text-red-700 font-semibold"
                    : "text-black hover:bg-[#fde9eb]/60 hover:text-red-600"
                }`}
              >
                <GrayIcon
                  icon={cat.Icon}
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

        {/* ===== Content: course cards for active category ===== */}
        {/* Desktop: always visible. Mobile: only visible when mobileStep === "detail" */}
        <div
          className={`${
            mobileStep === "detail" ? "flex" : "hidden"
          } md:flex flex-1 flex-col p-4 md:p-6 overflow-y-auto max-h-[80vh] md:max-h-[520px] custom-scroll`}
        >
          {/* Mobile-only back header */}
          <button
            onClick={() => setMobileStep("list")}
            className="md:hidden flex items-center gap-2 mb-4 text-sm font-semibold text-gray-700"
          >
            <ChevronLeft size={18} strokeWidth={2} />
            {active.label}
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {active.courses.map((c: any, i: number) => (
              <CourseCard key={i} {...c} onNavigate={onClose} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Mobile menu: Programs is a direct button (not inside this drawer anymore)
function MobileDrawer({
  open,
  onClose,
  student,
  displayName,
  onLogout,
  onSignup,
  pathname,
  navLinks,
}: {
  open: boolean;
  onClose: () => void;
  student: any;
  displayName: string | undefined;
  onLogout: () => void;
  onSignup: () => void;
  pathname: string;
  navLinks: any[];
}) {
  const isActive = (href: string) => {
    const basePath = href.split("?")[0];
    return pathname === basePath || pathname.startsWith(basePath);
  };
  const mobileLinkIcons: Record<string, React.ElementType> = {
    "/universities": Building2,
    "/contact-us": Phone,
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
    <AnimatedDrawer
      open={open}
      onClose={onClose}
      width="w-[85vw] max-w-[340px]"
    >
      <div className="px-4 pt-4 pb-6 space-y-1.5">
        {/* Navigation section */}
        {navLinks
          .filter(
            (link) =>
              !["/discover", "/compare", "/apply", "/study"].includes(
                link.href,
              ),
          )
          .map((link) => {
            const Icon = mobileLinkIcons[link.href];
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-full text-[15px] font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {Icon && (
                  <Icon
                    size={18}
                    strokeWidth={1.8}
                    className="text-gray-500 flex-shrink-0"
                  />
                )}
                {link.label}
              </Link>
            );
          })}

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
                  className="w-24 rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-black"
                >
                  Login
                </Button>
              </Link>
              <Button
                className="px-4 py-2.5 rounded-md text-[15px] font-medium transition-colors text-gray-700 bg-white hover:bg-gray-50"
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
    </AnimatedDrawer>
  );
}

export function Navbar() {
  const [student, setStudent] = useState<Student | null>(null);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [floating, setFloating] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const [headerNavLinks, setHeaderNavLinks] = useState(navLinks);
  const [programsMenu, setProgramsMenu] = useState<any[]>(categories);
  const [activeCat, setActiveCat] = useState<string>("");

  useEffect(() => {
    if (programsMenu && programsMenu.length > 0 && !activeCat) {
      setActiveCat(programsMenu[0].id || programsMenu[0].label.toLowerCase().replace(/\s+/g, "-"));
    }
  }, [programsMenu, activeCat]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";

    // Fetch Header Links
    fetch(`${apiUrl}/menus/header`)
      .then((res) => {
        if (!res.ok) throw new Error("Header menu not found");
        return res.json();
      })
      .then((data) => {
        if (data && data.items && data.items.length > 0) {
          const links = data.items.map((item: any) => ({
            label: item.label,
            href: item.url,
            target: item.target
          }));
          setHeaderNavLinks(links);
        }
      })
      .catch((err) => console.error("Error fetching header menu:", err));

    // Fetch Programs Menu
    fetch(`${apiUrl}/menus/programs`)
      .then((res) => {
        if (!res.ok) throw new Error("Programs menu not found");
        return res.json();
      })
      .then((data) => {
        if (data && data.items && data.items.length > 0) {
          const fetchedCats = data.items.map((cat: any) => ({
            id: cat.id || cat.label.toLowerCase().replace(/\s+/g, "-"),
            label: cat.label,
            Icon: cat.icon || "BookOpen",
            courses: (cat.children || []).map((child: any) => ({
              tag: child.type || "",
              name: child.label,
              duration: child.duration || "",
              href: child.url || "#",
              image: child.icon || "",
              target: child.target || "_self",
            }))
          }));
          setProgramsMenu(fetchedCats);
          if (fetchedCats.length > 0) {
            setActiveCat(fetchedCats[0].id);
          }
        }
      })
      .catch((err) => console.error("Error fetching programs menu:", err));
  }, []);

  // FIX: split the single shared ref into three separate refs so outside-click
  // detection can correctly check the desktop trigger, the mobile trigger, and
  // the dropdown panel independently. Previously both the <nav> and the
  // ProgramDropdown wrapper used the SAME `dropdownRef`, so the later-rendered
  // element (the dropdown wrapper) silently overwrote `dropdownRef.current`,
  // meaning the Programs button was never recognized as "inside" the ref.
  // That caused the mousedown handler to immediately close the menu, and then
  // the click handler right after would toggle it open again — so the dropdown
  // would flicker instead of closing properly.
  const desktopTriggerRef = useRef<HTMLDivElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setFloating(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedInsideDesktopTrigger =
        desktopTriggerRef.current && desktopTriggerRef.current.contains(target);
      const clickedInsideMobileTrigger =
        mobileTriggerRef.current && mobileTriggerRef.current.contains(target);
      const clickedInsideDropdown =
        dropdownRef.current && dropdownRef.current.contains(target);

      if (
        !clickedInsideDesktopTrigger &&
        !clickedInsideMobileTrigger &&
        !clickedInsideDropdown
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

      <header className="fixed top-0 left-0 right-0 z-[65] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side: Hamburger (mobile only) + Logo */}
            {/* CHANGED: Hamburger button moved here, to the left of the logo, mobile-only */}
            <div className="flex items-center gap-2">
              <button
                className="md:hidden p-2 text-gray-800 relative w-10 h-10 flex items-center justify-center"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label="Toggle menu"
              >
                <div className="flex flex-col gap-[6px] w-6">
                  {/* Line 1 */}
                  <span
                    className={`h-[2.5px] bg-gray-800 rounded-full transition-all duration-3000 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] ${
                      mobileOpen
                        ? "w-full translate-y-[6.4px] rotate-45"
                        : "w-full translate-y-0 rotate-0"
                    }`}
                  />
                  {/* Line 2 */}
                  <span
                    className={`h-[2.5px] bg-gray-800 rounded-full transition-all duration-3000 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] ${
                      mobileOpen ? "w-[85%] opacity-0" : "w-[85%] opacity-100"
                    }`}
                  />
                  {/* Line 3 */}
                  <span
                    className={`h-[2.5px] bg-gray-800 rounded-full transition-all duration-3000 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] ${
                      mobileOpen
                        ? "w-full -translate-y-[6.4px] -rotate-45"
                        : "w-[65%] translate-y-0 rotate-0"
                    }`}
                  />
                </div>
              </button>

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
            </div>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center gap-1"
              ref={desktopTriggerRef}
            >
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
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeMenu === "program" ? "rotate-180" : "rotate-0"
                  } ${
                    activeMenu !== "program" ? "text-red-600" : "text-gray-600"
                  }`}
                />
              </button>

              {headerNavLinks.map((link) => (
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

              {/* Mobile Programs button - direct button, same style as desktop */}
              <button
                ref={mobileTriggerRef}
                onClick={(e) => toggle("program", e)}
                className={`md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium transition-all duration-200 ${
                  activeMenu !== "program"
                    ? "bg-[#FFF5F5] text-red-600 border-[#FDE2E2]"
                    : "bg-white text-gray-600 border-gray-300"
                }`}
              >
                Programs
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMenu === "program" ? "rotate-180" : "rotate-0"
                  } ${
                    activeMenu !== "program" ? "text-red-600" : "text-gray-600"
                  }`}
                />
              </button>

              {/* REMOVED: Hamburger button used to be here on the right side.
                  It has been moved to the top-left, next to the logo. */}
            </div>
          </div>
        </div>
      </header>

      {/* Program dropdown - shared between desktop button and mobile button */}
      <ProgramDropdown
        open={activeMenu === "program"}
        onClose={closeAll}
        dropdownRef={dropdownRef}
        categories={programsMenu}
        activeCat={activeCat}
        setActiveCat={setActiveCat}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        open={mobileOpen}
        onClose={closeAll}
        student={student}
        displayName={displayName}
        onLogout={handleLogout}
        onSignup={() => setShowSignupModal(true)}
        pathname={pathname}
        navLinks={headerNavLinks}
      />

      {/* Bottom Navigation Bar - Modern Design */}
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
