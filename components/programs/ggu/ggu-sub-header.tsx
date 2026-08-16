// "use client";

// import { useEffect, useLayoutEffect, useRef, useState } from "react";

// interface NavItem {
//   id: string;
//   label: string;
// }

// const NAV_ITEMS = [
//   { label: "Program Overview", sectionId: "program-overview" },
//   { label: "Key Highlights", sectionId: "key-highlights" },
//   { label: "Subject/Syllabus", sectionId: "subject-syllabus" },
//   { label: "Eligibility & Duration", sectionId: "eligibility-duration" },
//   { label: "Program Fees", sectionId: "program-fees" },
//   { label: "Admission Process", sectionId: "admission-process" },
//   { label: "Top Specialization", sectionId: "top-specialization" },
//   { label: "Career Scope", sectionId: "career-scope" },
//   { label: "FAQs", sectionId: "faqs" },
// ];

// export default function SubHeader() {
//   const [activeId, setActiveId] = useState<string>("overview");
//   const [isSticky, setIsSticky] = useState(false);
//   const navRef = useRef<HTMLDivElement | null>(null);
//   const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
//   const mainHeaderHeight = 70; // must match your main header CSS height (px)
//   const [subHeaderHeight, setSubHeaderHeight] = useState<number>(56);

//   // measure subheader height (for scroll offsets)
//   useLayoutEffect(() => {
//     const update = () => {
//       const h = navRef.current?.offsetHeight ?? 56;
//       setSubHeaderHeight(h);
//     };
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsSticky(window.scrollY > mainHeaderHeight);
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Toggle main header hidden class when isSticky changes
//   useEffect(() => {
//     const mainHeader = document.getElementById("main-header");
//     if (!mainHeader) return;
//     if (isSticky) {
//       mainHeader.classList.add("main-header--hidden");
//       mainHeader.setAttribute("aria-hidden", "true");
//     } else {
//       mainHeader.classList.remove("main-header--hidden");
//       mainHeader.removeAttribute("aria-hidden");
//     }
//   }, [isSticky]);

//   const handleClick = (id: string) => {
//     const el = document.getElementById(id);
//     if (!el) return;

//     setActiveId(id);

//     // When subheader is replacing the main header, offset by subHeaderHeight
//     // Otherwise offset by mainHeaderHeight + subHeaderHeight to keep section below headers
//     const offset = isSticky
//       ? subHeaderHeight
//       : mainHeaderHeight + subHeaderHeight;
//     const top = el.getBoundingClientRect().top + window.scrollY - offset;
//     window.scrollTo({ top, behavior: "smooth" });
//   };

//   return (
//     <div
//       ref={navRef}
//       style={{
//         position: "sticky",
//         top: 0,
//         zIndex: 70,
//         borderBottom: "1px solid #e6f0fa",
//         background: "linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)",
//         boxShadow: isSticky ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
//         transition: "box-shadow 200ms ease, top 200ms ease",
//         pointerEvents: "auto",
//       }}
//     >
//       {/* Hide the horizontal scrollbar across browsers while keeping scroll usable */}
//       <style jsx>{`
//         .subheader-scroll {
//           scrollbar-width: none; /* Firefox */
//           -ms-overflow-style: none; /* IE / old Edge */
//         }
//         .subheader-scroll::-webkit-scrollbar {
//           display: none; /* Chrome, Safari, new Edge */
//           height: 0;
//         }
//       `}</style>

//       <div
//         className="subheader-scroll"
//         style={{
//           display: "flex",
//           gap: "0.5rem",
//           overflowX: "auto",
//           WebkitOverflowScrolling: "touch",
//           maxWidth: "1280px",
//           margin: "0 auto",
//           padding: "0.75rem 1rem",
//           justifyContent: "flex-start",
//         }}
//       >
//         {NAV_ITEMS.map((item) => {
//           const isActive = item.id === activeId;
//           return (
//             <button
//               key={item.id}
//               ref={(el) => {
//                 itemRefs.current[item.id] = el;
//               }}
//               onClick={() => handleClick(item.id)}
//               style={{
//                 flex: "0 0 auto",
//                 whiteSpace: "nowrap",
//                 borderRadius: "9999px",
//                 padding: "0.375rem 1rem",
//                 fontSize: "0.875rem",
//                 fontWeight: 500,
//                 border: isActive
//                   ? "1px solid rgba(19, 2, 2, 0.06)"
//                   : "1px solid rgba(15,23,42,0.04)",
//                 background: isActive ? "#fb4444" : "#ffffff",
//                 color: isActive ? "#ffffff" : "#334155",
//                 cursor: "pointer",
//                 transition: "all 200ms",
//                 boxShadow: isActive ? "0 1px 3px rgba(2,132,199,0.2)" : "none",
//               }}
//             >
//               {item.label}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// "use client";
// import Link from "next/link";
// import { Link as LinkIcon } from "lucide-react";
// import { useRouter, usePathname } from "next/navigation";
// import { useEffect, useLayoutEffect, useRef, useState } from "react";

// interface NavItem {
//   id: string;
//   label: string;
// }

// const NAV_ITEMS: NavItem[] = [
//   { id: "about", label: "About" },
//   { id: "who-can-apply", label: "Who Can Apply" },
//   { id: "specializations", label: "Specializations" },
//   { id: "fee", label: "Course Fees" },
//   { id: "emi-details", label: "Education Loan/EMI" },
//   { id: "admission-process", label: "Admission Open 2026" },
//   { id: "syllabus", label: "Syllabus/Curriculum" },
//   { id: "examination-pattern", label: "Examination Pattern" },
//   { id: "job-roles", label: "Job Roles" },
//   { id: "reviews", label: "Reviews" },
//   { id: "coupons", label: "Coupons" },
//   { id: "placement-partners", label: "Placement Partners" },
//   { id: "faculty", label: "Faculty" },
// ];
// const BASE_PATH = "/programs/doctorate/ggu";
// export default function GguSubHeader() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [activeId, setActiveId] = useState<string>("overview");
//   const [isSticky, setIsSticky] = useState(false);
//   const navRef = useRef<HTMLDivElement | null>(null);
//   const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
//   const mainHeaderHeight = 70; // must match your main header CSS height (px)
//   const stickyTriggerOffset = 400; // scroll distance before subheader becomes sticky
//   const [subHeaderHeight, setSubHeaderHeight] = useState<number>(56);

//   // measure subheader height (for scroll offsets)
//   useLayoutEffect(() => {
//     const update = () => {
//       const h = navRef.current?.offsetHeight ?? 56;
//       setSubHeaderHeight(h);
//     };
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsSticky(window.scrollY > stickyTriggerOffset);

//       // Determine which section is currently in view and update active tab
//       const offset =
//         (window.scrollY > stickyTriggerOffset
//           ? subHeaderHeight
//           : mainHeaderHeight + subHeaderHeight) + 20;

//       let currentId = activeId;
//       for (const item of NAV_ITEMS) {
//         const el = document.getElementById(item.id);
//         if (!el) continue;
//         const top = el.getBoundingClientRect().top;
//         if (top - offset <= 0) {
//           currentId = item.id;
//         }
//       }
//       setActiveId((prev) => (prev !== currentId ? currentId : prev));
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Toggle main header hidden class when isSticky changes
//   useEffect(() => {
//     const mainHeader = document.getElementById("main-header");
//     if (!mainHeader) return;
//     if (isSticky) {
//       mainHeader.classList.add("main-header--hidden");
//       mainHeader.setAttribute("aria-hidden", "true");
//     } else {
//       mainHeader.classList.remove("main-header--hidden");
//       mainHeader.removeAttribute("aria-hidden");
//     }
//   }, [isSticky]);

//   const handleClick = (id: string) => {
//     const el = document.getElementById(id);
//     if (!el) {
//       if (pathname !== BASE_PATH) {
//         router.push(`${BASE_PATH}#${id}`);
//       }
//       return;
//     }

//     setActiveId(id);

//     // When subheader is replacing the main header, offset by subHeaderHeight
//     // Otherwise offset by mainHeaderHeight + subHeaderHeight to keep section below headers
//     const offset = isSticky
//       ? subHeaderHeight
//       : mainHeaderHeight + subHeaderHeight;
//     const top = el.getBoundingClientRect().top + window.scrollY - offset;
//     window.scrollTo({ top, behavior: "smooth" });
//   };

//   return (
//     <div
//       ref={navRef}
//       style={{
//         position: "fixed",
//         top: isSticky ? 0 : "-100px",
//         left: 0,
//         right: 0,
//         zIndex: 70,
//         borderBottom: "1px solid #e6f0fa",
//         background: "#ffffff",
//         boxShadow: isSticky ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
//         transition: "box-shadow 200ms ease, top 250ms ease",
//         pointerEvents: "auto",
//       }}
//     >
//       {/* Hide the horizontal scrollbar across browsers while keeping scroll usable */}
//       <style jsx>{`
//         .subheader-scroll {
//           scrollbar-width: none; /* Firefox */
//           -ms-overflow-style: none; /* IE / old Edge */
//         }
//         .subheader-scroll::-webkit-scrollbar {
//           display: none; /* Chrome, Safari, new Edge */
//           height: 0;
//         }
//       `}</style>

//       <div
//         className="subheader-scroll"
//         style={{
//           display: "flex",
//           gap: "0.5rem",
//           overflowX: "auto",
//           WebkitOverflowScrolling: "touch",
//           maxWidth: "1280px",
//           margin: "0 auto",
//           padding: "0.75rem 1rem",
//           justifyContent: "flex-start",
//         }}
//       >
//         {NAV_ITEMS.map((item) => {
//           const isActive = item.id === activeId;
//           const linkMap: Record<string, string> = {
//             "who-can-apply": "/programs/doctorate/ggu/who-can-apply",
//             specializations: "/programs/doctorate/ggu/specializations",
//             "emi-details": "/programs/doctorate/ggu/emi-details",
//             "admission-process": "/programs/doctorate/ggu/admission-process",
//             syllabus: "/programs/doctorate/ggu/syllabus",
//             "examination-pattern":
//               "/programs/doctorate/ggu/examination-pattern",
//             "job-roles": "/programs/doctorate/ggu/job-roles",
//           };

//           const commonStyles = {
//             flex: "0 0 auto",
//             whiteSpace: "nowrap" as const,
//             padding: "0.5rem 0.25rem",
//             fontSize: "0.875rem",
//             fontWeight: 600,
//             color: isActive ? "#ef4444" : "#111827",
//             transition: "color 0.2s ease",
//             borderBottom: isActive
//               ? "3px solid #ef4444"
//               : "3px solid transparent",
//           };

//           // Items with separate routes
//           if (linkMap[item.id]) {
//             return (
//               <Link
//                 key={item.id}
//                 href={linkMap[item.id]}
//                 style={{
//                   ...commonStyles,
//                   textDecoration: "none",
//                 }}
//               >
//                 {item.label}
//               </Link>
//             );
//           }

//           // Anchor items (scroll to section)
//           return (
//             <button
//               key={item.id}
//               onClick={() => handleClick(item.id)}
//               style={{
//                 ...commonStyles,
//                 border: "none",
//                 background: "transparent",
//                 cursor: "pointer",
//               }}
//             >
//               {item.label}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// "use client";
// import Link from "next/link";
// import { Link as LinkIcon } from "lucide-react";
// import { useRouter, usePathname } from "next/navigation";
// import { useEffect, useLayoutEffect, useRef, useState } from "react";

// interface NavItem {
//   id: string;
//   label: string;
// }

// const NAV_ITEMS: NavItem[] = [
//   { id: "about", label: "About" },
//   { id: "who-can-apply", label: "Who Can Apply" },
//   { id: "specializations", label: "Specializations" },
//   { id: "fee", label: "Course Fees" },
//   { id: "emi-details", label: "Education Loan/EMI" },
//   { id: "admission-process", label: "Admission Open 2026" },
//   { id: "syllabus", label: "Syllabus/Curriculum" },
//   { id: "examination-pattern", label: "Examination Pattern" },
//   { id: "job-roles", label: "Job Roles" },
//   { id: "reviews", label: "Reviews" },
//   { id: "coupons", label: "Coupons" },
//   { id: "placement-partners", label: "Placement Partners" },
//   { id: "faculty", label: "Faculty" },
// ];
// const BASE_PATH = "/programs/doctorate/ggu";

// // Routes for items that live on their own page instead of an in-page anchor
// const LINK_MAP: Record<string, string> = {
//   "who-can-apply": "/programs/doctorate/ggu/who-can-apply",
//   specializations: "/programs/doctorate/ggu/specializations",
//   "emi-details": "/programs/doctorate/ggu/emi-details",
//   "admission-process": "/programs/doctorate/ggu/admission-process",
//   syllabus: "/programs/doctorate/ggu/syllabus",
//   "examination-pattern": "/programs/doctorate/ggu/examination-pattern",
//   "job-roles": "/programs/doctorate/ggu/job-roles",
//   reviews: "/programs/doctorate/ggu/reviews",
//   coupons: "/programs/doctorate/ggu/coupons",
//   "placement-partners": "/programs/doctorate/ggu/placement-partners",
//   faculty: "/programs/doctorate/ggu/faculty",
// };

// export default function GguSubHeader() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [activeId, setActiveId] = useState<string>("overview");
//   const [isSticky, setIsSticky] = useState(false);
//   const navRef = useRef<HTMLDivElement | null>(null);
//   const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
//   const mainHeaderHeight = 70; // must match your main header CSS height (px)
//   const stickyTriggerOffset = 400; // scroll distance before subheader becomes sticky
//   const [subHeaderHeight, setSubHeaderHeight] = useState<number>(56);

//   // measure subheader height (for scroll offsets)
//   useLayoutEffect(() => {
//     const update = () => {
//       const h = navRef.current?.offsetHeight ?? 56;
//       setSubHeaderHeight(h);
//     };
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);

//   useEffect(() => {
//     // Only run scroll-based section detection on the base page,
//     // since anchor sections (#about, #syllabus, etc.) only exist there.
//     if (pathname !== BASE_PATH) return;

//     const handleScroll = () => {
//       setIsSticky(window.scrollY > stickyTriggerOffset);

//       // Determine which section is currently in view and update active tab
//       const offset =
//         (window.scrollY > stickyTriggerOffset
//           ? subHeaderHeight
//           : mainHeaderHeight + subHeaderHeight) + 20;

//       let currentId = activeId;
//       for (const item of NAV_ITEMS) {
//         const el = document.getElementById(item.id);
//         if (!el) continue;
//         const top = el.getBoundingClientRect().top;
//         if (top - offset <= 0) {
//           currentId = item.id;
//         }
//       }
//       setActiveId((prev) => (prev !== currentId ? currentId : prev));
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [pathname]);

//   // Keep sticky behavior working even on non-base pages (just no active-section tracking)
//   useEffect(() => {
//     if (pathname === BASE_PATH) return;
//     const handleScroll = () =>
//       setIsSticky(window.scrollY > stickyTriggerOffset);
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [pathname]);

//   // Toggle main header hidden class when isSticky changes
//   useEffect(() => {
//     const mainHeader = document.getElementById("main-header");
//     if (!mainHeader) return;
//     if (isSticky) {
//       mainHeader.classList.add("main-header--hidden");
//       mainHeader.setAttribute("aria-hidden", "true");
//     } else {
//       mainHeader.classList.remove("main-header--hidden");
//       mainHeader.removeAttribute("aria-hidden");
//     }
//   }, [isSticky]);

//   const handleClick = (id: string) => {
//     const el = document.getElementById(id);
//     if (!el) {
//       if (pathname !== BASE_PATH) {
//         router.push(`${BASE_PATH}#${id}`);
//       }
//       return;
//     }

//     setActiveId(id);

//     // When subheader is replacing the main header, offset by subHeaderHeight
//     // Otherwise offset by mainHeaderHeight + subHeaderHeight to keep section below headers
//     const offset = isSticky
//       ? subHeaderHeight
//       : mainHeaderHeight + subHeaderHeight;
//     const top = el.getBoundingClientRect().top + window.scrollY - offset;
//     window.scrollTo({ top, behavior: "smooth" });
//   };

//   return (
//     <div
//       ref={navRef}
//       style={{
//         position: "fixed",
//         top: isSticky ? 0 : "-100px",
//         left: 0,
//         right: 0,
//         zIndex: 70,
//         borderBottom: "1px solid #e6f0fa",
//         background: "#ffffff",
//         boxShadow: isSticky ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
//         transition: "box-shadow 200ms ease, top 250ms ease",
//         pointerEvents: "auto",
//       }}
//     >
//       {/* Hide the horizontal scrollbar across browsers while keeping scroll usable */}
//       <style jsx>{`
//         .subheader-scroll {
//           scrollbar-width: none; /* Firefox */
//           -ms-overflow-style: none; /* IE / old Edge */
//         }
//         .subheader-scroll::-webkit-scrollbar {
//           display: none; /* Chrome, Safari, new Edge */
//           height: 0;
//         }
//         .subheader-scroll {
//           -webkit-overflow-scrolling: touch;
//           scroll-snap-type: x proximity;
//         }
//         .subheader-item {
//           scroll-snap-align: start;
//         }
//         @media (max-width: 640px) {
//           .subheader-scroll {
//             gap: 0.25rem !important;
//             padding: 0.6rem 0.75rem !important;
//           }
//           .subheader-item {
//             font-size: 0.78rem !important;
//             padding: 0.4rem 0.4rem !important;
//           }
//         }
//       `}</style>

//       <div
//         className="subheader-scroll"
//         style={{
//           display: "flex",
//           gap: "0.5rem",
//           overflowX: "auto",
//           WebkitOverflowScrolling: "touch",
//           maxWidth: "1280px",
//           margin: "0 auto",
//           padding: "0.75rem 1rem",
//           justifyContent: "flex-start",
//         }}
//       >
//         {NAV_ITEMS.map((item) => {
//           // Route-based items are active when their pathname matches the current route.
//           // Anchor-based items are active based on scroll position, but only on the base page.
//           const isActive = LINK_MAP[item.id]
//             ? pathname === LINK_MAP[item.id]
//             : pathname === BASE_PATH && item.id === activeId;

//           const commonStyles = {
//             flex: "0 0 auto",
//             whiteSpace: "nowrap" as const,
//             padding: "0.5rem 0.25rem",
//             fontSize: "0.875rem",
//             fontWeight: 600,
//             color: isActive ? "#ef4444" : "#111827",
//             transition: "color 0.2s ease",
//             borderBottom: isActive
//               ? "3px solid #ef4444"
//               : "3px solid transparent",
//           };

//           // Items with separate routes
//           if (LINK_MAP[item.id]) {
//             return (
//               <Link
//                 key={item.id}
//                 href={LINK_MAP[item.id]}
//                 className="subheader-item"
//                 style={{
//                   ...commonStyles,
//                   textDecoration: "none",
//                 }}
//               >
//                 {item.label}
//               </Link>
//             );
//           }

//           // Anchor items (scroll to section)
//           return (
//             <button
//               key={item.id}
//               onClick={() => handleClick(item.id)}
//               className="subheader-item"
//               style={{
//                 ...commonStyles,
//                 border: "none",
//                 background: "transparent",
//                 cursor: "pointer",
//               }}
//             >
//               {item.label}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// "use client";
// import Link from "next/link";
// import { Link as LinkIcon, Home } from "lucide-react";
// import { useRouter, usePathname } from "next/navigation";
// import { useEffect, useLayoutEffect, useRef, useState } from "react";

// interface NavItem {
//   id: string;
//   label: string;
// }

// const NAV_ITEMS: NavItem[] = [
//   { id: "about", label: "About" },
//   { id: "who-can-apply", label: "Who Can Apply" },
//   { id: "specializations", label: "Specializations" },
//   { id: "fees", label: "Course Fees" },
//   { id: "emi-details", label: "Education Loan/EMI" },
//   { id: "admission-process", label: "Admission Open 2026" },
//   { id: "syllabus", label: "Syllabus/Curriculum" },
//   { id: "examination-pattern", label: "Examination Pattern" },
//   { id: "job-roles", label: "Job Roles" },
//   { id: "reviews", label: "Reviews" },
//   { id: "coupons", label: "Coupons" },
//   { id: "placement-partners", label: "Placement Partners" },
//   { id: "faculty", label: "Faculty" },
// ];
// const BASE_PATH = "/programs/doctorate/ggu";

// const LINK_MAP: Record<string, string> = {
//   "who-can-apply": "/programs/doctorate/ggu/who-can-apply",
//   specializations: "/programs/doctorate/ggu/specializations",
//   fees: "/programs/doctorate/ggu/fees",
//   "emi-details": "/programs/doctorate/ggu/emi-details",
//   "admission-process": "/programs/doctorate/ggu/admission-process",
//   syllabus: "/programs/doctorate/ggu/syllabus",
//   "examination-pattern": "/programs/doctorate/ggu/examination-pattern",
//   "job-roles": "/programs/doctorate/ggu/job-roles",
//   reviews: "/programs/doctorate/ggu/reviews",
//   coupons: "/programs/doctorate/ggu/coupons",
//   "placement-partners": "/programs/doctorate/ggu/placement-partners",
//   faculty: "/programs/doctorate/ggu/faculty",
// };

// export default function GguSubHeader() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [activeId, setActiveId] = useState<string>("overview");
//   const [isSticky, setIsSticky] = useState(false);
//   const navRef = useRef<HTMLDivElement | null>(null);
//   const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
//   const mainHeaderHeight = 70; // must match your main header CSS height (px)
//   const stickyTriggerOffset = 400; // scroll distance before subheader becomes sticky
//   const [subHeaderHeight, setSubHeaderHeight] = useState<number>(56);

//   // measure subheader height (for scroll offsets)
//   useLayoutEffect(() => {
//     const update = () => {
//       const h = navRef.current?.offsetHeight ?? 56;
//       setSubHeaderHeight(h);
//     };
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);

//   useEffect(() => {
//     // Only run scroll-based section detection on the base page,
//     // since anchor sections (#about, #syllabus, etc.) only exist there.
//     if (pathname !== BASE_PATH) return;

//     const handleScroll = () => {
//       setIsSticky(window.scrollY > stickyTriggerOffset);

//       // Determine which section is currently in view and update active tab
//       const offset =
//         (window.scrollY > stickyTriggerOffset
//           ? subHeaderHeight
//           : mainHeaderHeight + subHeaderHeight) + 20;

//       let currentId = activeId;
//       for (const item of NAV_ITEMS) {
//         const el = document.getElementById(item.id);
//         if (!el) continue;
//         const top = el.getBoundingClientRect().top;
//         if (top - offset <= 0) {
//           currentId = item.id;
//         }
//       }
//       setActiveId((prev) => (prev !== currentId ? currentId : prev));
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [pathname]);

//   // Keep sticky behavior working even on non-base pages (just no active-section tracking)
//   useEffect(() => {
//     if (pathname === BASE_PATH) return;
//     const handleScroll = () =>
//       setIsSticky(window.scrollY > stickyTriggerOffset);
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [pathname]);

//   // Toggle main header hidden class when isSticky changes
//   useEffect(() => {
//     const mainHeader = document.getElementById("main-header");
//     if (!mainHeader) return;
//     if (isSticky) {
//       mainHeader.classList.add("main-header--hidden");
//       mainHeader.setAttribute("aria-hidden", "true");
//     } else {
//       mainHeader.classList.remove("main-header--hidden");
//       mainHeader.removeAttribute("aria-hidden");
//     }
//   }, [isSticky]);

//   const handleClick = (id: string) => {
//     const el = document.getElementById(id);
//     if (!el) {
//       if (pathname !== BASE_PATH) {
//         router.push(`${BASE_PATH}#${id}`);
//       }
//       return;
//     }

//     setActiveId(id);

//     // When subheader is replacing the main header, offset by subHeaderHeight
//     // Otherwise offset by mainHeaderHeight + subHeaderHeight to keep section below headers
//     const offset = isSticky
//       ? subHeaderHeight
//       : mainHeaderHeight + subHeaderHeight;
//     const top = el.getBoundingClientRect().top + window.scrollY - offset;
//     window.scrollTo({ top, behavior: "smooth" });
//   };

//   return (
//     <div
//       ref={navRef}
//       style={{
//         position: "fixed",
//         top: isSticky ? 0 : "-100px",
//         left: 0,
//         right: 0,
//         zIndex: 70,
//         borderBottom: "1px solid #e6f0fa",
//         background: "#ffffff",
//         boxShadow: isSticky ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
//         transition: "box-shadow 200ms ease, top 250ms ease",
//         pointerEvents: "auto",
//       }}
//     >
//       {/* Hide the horizontal scrollbar across browsers while keeping scroll usable */}
//       <style jsx>{`
//         .subheader-scroll {
//           scrollbar-width: none; /* Firefox */
//           -ms-overflow-style: none; /* IE / old Edge */
//         }
//         .subheader-scroll::-webkit-scrollbar {
//           display: none; /* Chrome, Safari, new Edge */
//           height: 0;
//         }
//         .subheader-scroll {
//           -webkit-overflow-scrolling: touch;
//           scroll-snap-type: x proximity;
//         }
//         .subheader-item {
//           scroll-snap-align: start;
//         }
//         @media (max-width: 640px) {
//           .subheader-scroll {
//             gap: 0.25rem !important;
//             padding: 0.6rem 0.75rem !important;
//           }
//           .subheader-item {
//             font-size: 0.78rem !important;
//             padding: 0.4rem 0.4rem !important;
//           }
//         }
//       `}</style>

//       <div
//         className="subheader-scroll"
//         style={{
//           display: "flex",
//           gap: "0.5rem",
//           overflowX: "auto",
//           WebkitOverflowScrolling: "touch",
//           maxWidth: "1280px",
//           margin: "0 auto",
//           padding: "0.75rem 1rem",
//           justifyContent: "flex-start",
//         }}
//       >
//         {NAV_ITEMS.map((item) => {
//           // Route-based items are active when their pathname matches the current route.
//           // Anchor-based items are active based on scroll position, but only on the base page.
//           const isActive = LINK_MAP[item.id]
//             ? pathname === LINK_MAP[item.id]
//             : pathname === BASE_PATH && item.id === activeId;

//           const commonStyles = {
//             flex: "0 0 auto",
//             whiteSpace: "nowrap" as const,
//             padding: "0.5rem 0.25rem",
//             fontSize: "0.875rem",
//             fontWeight: 600,
//             color: isActive ? "#ef4444" : "#111827",
//             transition: "color 0.2s ease",
//             borderBottom: isActive
//               ? "3px solid #ef4444"
//               : "3px solid transparent",
//           };

//           // Items with separate routes
//           if (LINK_MAP[item.id]) {
//             return (
//               <Link
//                 key={item.id}
//                 href={LINK_MAP[item.id]}
//                 className="subheader-item"
//                 style={{
//                   ...commonStyles,
//                   textDecoration: "none",
//                 }}
//               >
//                 {item.label}
//               </Link>
//             );
//           }

//           // Anchor items (scroll to section)
//           return (
//             <button
//               key={item.id}
//               onClick={() => handleClick(item.id)}
//               className="subheader-item"
//               style={{
//                 ...commonStyles,
//                 border: "none",
//                 background: "transparent",
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: item.id === "about" ? "0.4rem" : undefined,
//               }}
//             >
//               {item.id === "about" && <Home size={18} />}
//               {item.label}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// 16 aug

"use client";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "About" },
  { id: "who-can-apply", label: "Who Can Apply" },
  { id: "specializations", label: "Specializations" },
  { id: "fees", label: "Course Fees" },
  { id: "emi-details", label: "Education Loan/EMI" },
  { id: "admission-process", label: "Admission Open 2026" },
  { id: "syllabus", label: "Syllabus/Curriculum" },
  { id: "examination-pattern", label: "Examination Pattern" },
  { id: "job-roles", label: "Job Roles" },
  { id: "reviews", label: "Reviews" },
  { id: "coupons", label: "Coupons" },
  { id: "placement-partners", label: "Placement Partners" },
  { id: "faculty", label: "Faculty" },
];
const BASE_PATH = "/programs/doctorate/ggu";

const LINK_MAP: Record<string, string> = {
  "who-can-apply": "/programs/doctorate/ggu/who-can-apply",
  specializations: "/programs/doctorate/ggu/specializations",
  fees: "/programs/doctorate/ggu/fees",
  "emi-details": "/programs/doctorate/ggu/emi-details",
  "admission-process": "/programs/doctorate/ggu/admission-process",
  syllabus: "/programs/doctorate/ggu/syllabus",
  "examination-pattern": "/programs/doctorate/ggu/examination-pattern",
  "job-roles": "/programs/doctorate/ggu/job-roles",
  reviews: "/programs/doctorate/ggu/reviews",
  coupons: "/programs/doctorate/ggu/coupons",
  "placement-partners": "/programs/doctorate/ggu/placement-partners",
  faculty: "/programs/doctorate/ggu/faculty",
};

export default function GguSubHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string>("overview");
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const mainHeaderHeight = 70; // must match your main header CSS height (px)
  const stickyTriggerOffset = 400; // scroll distance before subheader becomes sticky
  const [subHeaderHeight, setSubHeaderHeight] = useState<number>(56);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // measure subheader height (for scroll offsets)
  useLayoutEffect(() => {
    const update = () => {
      const h = navRef.current?.offsetHeight ?? 56;
      setSubHeaderHeight(h);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // measure and track horizontal scroll position for arrow visibility
  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScrollLeft - 4);
  };

  useLayoutEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.6, 160);
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Only run scroll-based section detection on the base page,
    // since anchor sections (#about, #syllabus, etc.) only exist there.
    if (pathname !== BASE_PATH) return;

    const handleScroll = () => {
      setIsSticky(window.scrollY > stickyTriggerOffset);

      // Determine which section is currently in view and update active tab
      const offset =
        (window.scrollY > stickyTriggerOffset
          ? subHeaderHeight
          : mainHeaderHeight + subHeaderHeight) + 20;

      let currentId = activeId;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - offset <= 0) {
          currentId = item.id;
        }
      }
      setActiveId((prev) => (prev !== currentId ? currentId : prev));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Keep sticky behavior working even on non-base pages (just no active-section tracking)
  useEffect(() => {
    if (pathname === BASE_PATH) return;
    const handleScroll = () =>
      setIsSticky(window.scrollY > stickyTriggerOffset);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Toggle main header hidden class when isSticky changes
  useEffect(() => {
    const mainHeader = document.getElementById("main-header");
    if (!mainHeader) return;
    if (isSticky) {
      mainHeader.classList.add("main-header--hidden");
      mainHeader.setAttribute("aria-hidden", "true");
    } else {
      mainHeader.classList.remove("main-header--hidden");
      mainHeader.removeAttribute("aria-hidden");
    }
  }, [isSticky]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) {
      if (pathname !== BASE_PATH) {
        router.push(`${BASE_PATH}#${id}`);
      }
      return;
    }

    setActiveId(id);

    // When subheader is replacing the main header, offset by subHeaderHeight
    // Otherwise offset by mainHeaderHeight + subHeaderHeight to keep section below headers
    const offset = isSticky
      ? subHeaderHeight
      : mainHeaderHeight + subHeaderHeight;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div
      ref={navRef}
      style={{
        position: "fixed",
        top: isSticky ? 0 : "-100px",
        left: 0,
        right: 0,
        zIndex: 70,
        borderBottom: "1px solid #e6f0fa",
        background: "#ffffff",
        boxShadow: isSticky ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
        transition: "box-shadow 200ms ease, top 250ms ease",
        pointerEvents: "auto",
      }}
    >
      {/* Hide the horizontal scrollbar across browsers while keeping scroll usable */}
      <style jsx>{`
        .subheader-scroll {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE / old Edge */
        }
        .subheader-scroll::-webkit-scrollbar {
          display: none; /* Chrome, Safari, new Edge */
          height: 0;
        }
        .subheader-scroll {
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: x proximity;
        }
        .subheader-item {
          scroll-snap-align: start;
        }
        .subheader-arrow {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 9999px;
          border: 1px solid #e6f0fa;
          background: #ffffff;
          color: #111827;
          cursor: pointer;
          transition:
            background 0.2s ease,
            color 0.2s ease,
            opacity 0.2s ease;
        }
        .subheader-arrow:hover {
          background: #fef2f2;
          color: #ef4444;
          border-color: #fecaca;
        }
        .subheader-arrow:disabled {
          opacity: 0;
          pointer-events: none;
        }
        @media (max-width: 640px) {
          .subheader-scroll {
            gap: 0.25rem !important;
            padding: 0.6rem 0.5rem !important;
          }
          .subheader-item {
            font-size: 0.78rem !important;
            padding: 0.4rem 0.4rem !important;
          }
          .subheader-arrow {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0.5rem 0.75rem",
          gap: "0.5rem",
        }}
      >
        <button
          type="button"
          aria-label="Scroll left"
          className="subheader-arrow"
          onClick={() => scrollByAmount("left")}
          disabled={!canScrollLeft}
        >
          <ChevronLeft size={18} />
        </button>

        <div
          ref={scrollRef}
          className="subheader-scroll"
          style={{
            display: "flex",
            gap: "0.5rem",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            flex: "1 1 auto",
            justifyContent: "flex-start",
          }}
        >
          {NAV_ITEMS.map((item) => {
            // Route-based items are active when their pathname matches the current route.
            // Anchor-based items are active based on scroll position, but only on the base page.
            const isActive = LINK_MAP[item.id]
              ? pathname === LINK_MAP[item.id]
              : pathname === BASE_PATH && item.id === activeId;

            const commonStyles = {
              flex: "0 0 auto",
              whiteSpace: "nowrap" as const,
              padding: "0.5rem 0.25rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: isActive ? "#ef4444" : "#111827",
              transition: "color 0.2s ease",
              borderBottom: isActive
                ? "3px solid #ef4444"
                : "3px solid transparent",
            };

            // Items with separate routes
            if (LINK_MAP[item.id]) {
              return (
                <Link
                  key={item.id}
                  href={LINK_MAP[item.id]}
                  className="subheader-item"
                  style={{
                    ...commonStyles,
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                </Link>
              );
            }

            // Anchor items (scroll to section)
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className="subheader-item"
                style={{
                  ...commonStyles,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: item.id === "about" ? "0.4rem" : undefined,
                }}
              >
                {item.id === "about" && <Home size={18} />}
                {item.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Scroll right"
          className="subheader-arrow"
          onClick={() => scrollByAmount("right")}
          disabled={!canScrollRight}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
