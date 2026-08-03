// "use client";

// import { useEffect, useRef, useState } from "react";

// interface NavItem {
//   id: string;
//   label: string;
// }

// const NAV_ITEMS: NavItem[] = [
//   { id: "overview", label: "Overview" },
//   { id: "programs", label: "Programs" },
//   { id: "specializations", label: "Specializations" },
//   { id: "approvals", label: "Approvals" },
//   { id: "placements", label: "Placements" },
//   { id: "testimonials", label: "Testimonials" },
//   { id: "faq", label: "FAQs" },
// ];

// export default function SubHeader() {
//   const [activeId, setActiveId] = useState<string>("overview");
//   const [isSticky, setIsSticky] = useState(false);
//   const [isVisible, setIsVisible] = useState(false); // Initially hidden
//   const navRef = useRef<HTMLDivElement | null>(null);
//   const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
//   const mainHeaderHeight = 70;

//   useEffect(() => {
//     const handleScroll = () => {
//       const triggerPoint = mainHeaderHeight + 100;

//       setIsVisible(window.scrollY > 150);

//       const sections = NAV_ITEMS.map((item) => ({
//         id: item.id,
//         element: document.getElementById(item.id),
//       })).filter((s) => s.element !== null);

//       if (sections.length === 0) return;

//       let current = sections[0].id;

//       for (let i = sections.length - 1; i >= 0; i--) {
//         const rect = sections[i].element!.getBoundingClientRect();
//         if (rect.top <= triggerPoint) {
//           current = sections[i].id;
//           break;
//         }
//       }

//       setActiveId(current);
//       setIsSticky(window.scrollY > mainHeaderHeight);
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const activeEl = itemRefs.current[activeId];
//     if (activeEl && navRef.current) {
//       activeEl.scrollIntoView({
//         behavior: "smooth",
//         block: "nearest",
//         inline: "center",
//       });
//     }
//   }, [activeId]);

//   const handleClick = (id: string) => {
//     const el = document.getElementById(id);
//     if (!el) return;

//     const offset = mainHeaderHeight + 80;
//     const top = el.getBoundingClientRect().top + window.scrollY - offset;
//     window.scrollTo({ top, behavior: "smooth" });
//   };

//   return (
//     <div
//       ref={navRef}
//       style={{
//         position: "sticky",
//         top: mainHeaderHeight,
//         zIndex: 50,
//         borderBottom: "1px solid #e6f0fa",
//         background: "linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)",
//         boxShadow: isSticky ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
//         transition:
//           "box-shadow 200ms ease, opacity 300ms ease, transform 300ms ease",
//         opacity: isVisible ? 1 : 0,
//         transform: isVisible ? "translateY(0)" : "translateY(-10px)",
//         pointerEvents: isVisible ? "auto" : "none", // Clicks ko disable karta hai jab hidden ho
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           gap: "0.5rem",
//           overflowX: "auto",
//           maxWidth: "1280px",
//           margin: "0 auto",
//           padding: "0.75rem 1rem",
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
//                   ? "1px solid rgba(255,255,255,0.06)"
//                   : "1px solid rgba(15,23,42,0.04)",
//                 background: isActive ? "#0284c7" : "#ffffff",
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

// import { useEffect, useLayoutEffect, useRef, useState } from "react";

// interface NavItem {
//   id: string;
//   label: string;
// }

// const NAV_ITEMS: NavItem[] = [
//   { id: "overview", label: "Overview" },
//   { id: "programs", label: "Programs" },
//   { id: "specializations", label: "Specializations" },
//   { id: "approvals", label: "Approvals" },
//   { id: "placements", label: "Placements" },
//   { id: "testimonials", label: "Testimonials" },
//   { id: "faq", label: "FAQs" },
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
//       const triggerPoint = mainHeaderHeight + 100;

//       const sections = NAV_ITEMS.map((item) => ({
//         id: item.id,
//         element: document.getElementById(item.id),
//       })).filter((s) => s.element !== null);

//       if (sections.length === 0) return;

//       let current = sections[0].id;

//       for (let i = sections.length - 1; i >= 0; i--) {
//         const rect = sections[i].element!.getBoundingClientRect();
//         if (rect.top <= triggerPoint) {
//           current = sections[i].id;
//           break;
//         }
//       }

//       setActiveId(current);
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

//   useEffect(() => {
//     const activeEl = itemRefs.current[activeId];
//     if (activeEl && navRef.current) {
//       activeEl.scrollIntoView({
//         behavior: "smooth",
//         block: "nearest",
//         inline: "center",
//       });
//     }
//   }, [activeId]);

//   const handleClick = (id: string) => {
//     const el = document.getElementById(id);
//     if (!el) return;

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
//         // move subheader to top when replacing main header
//         top: isSticky ? 0 : mainHeaderHeight,
//         zIndex: 70,
//         borderBottom: "1px solid #e6f0fa",
//         background: "linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)",
//         boxShadow: isSticky ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
//         transition: "box-shadow 200ms ease, top 200ms ease",
//         pointerEvents: "auto",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           gap: "0.5rem",
//           overflowX: "auto",
//           maxWidth: "1280px",
//           margin: "0 auto",
//           padding: "0.75rem 1rem",
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
//                   ? "1px solid rgba(255,255,255,0.06)"
//                   : "1px solid rgba(15,23,42,0.04)",
//                 background: isActive ? "#0284c7" : "#ffffff",
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

// import { useEffect, useLayoutEffect, useRef, useState } from "react";

// interface NavItem {
//   id: string;
//   label: string;
// }

// const NAV_ITEMS: NavItem[] = [
//   { id: "why", label: "Why Amity" },
//   { id: "courses", label: "Courses" },
//   { id: "fee", label: "Fee & Scholarship" },
//   { id: "loan", label: "Loan & EMI" },
//   { id: "admission", label: "Admission Process" },
//   { id: "examination", label: "Examination Pattern" },
//   { id: "approvals", label: "Approvals" },
//   { id: "certificate", label: "Certificate" },
//   { id: "placements", label: "Placements" },
//   { id: "reviews", label: "Reviews" },
//   { id: "faq", label: "FAQs" },
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
//         // background: "linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)",
//         background: "#ffffff",
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
//               onClick={() => handleClick(item.id)}
//               style={{
//                 flex: "0 0 auto",
//                 whiteSpace: "nowrap",
//                 padding: "0.5rem 0.25rem",
//                 fontSize: "0.875rem",
//                 fontWeight: 600,
//                 border: "none",
//                 background: "transparent",
//                 color: isActive ? "#ef4444" : "#111827",
//                 cursor: "pointer",
//                 transition: "color 0.2s ease",
//                 borderBottom: isActive
//                   ? "3px solid #ef4444"
//                   : "3px solid transparent",
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

"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "why", label: "Why Amity" },
  { id: "courses", label: "Courses" },
  { id: "fee", label: "Fee & Scholarship" },
  { id: "loan", label: "Loan & EMI" },
  { id: "admission", label: "Admission Process" },
  { id: "examination", label: "Examination Pattern" },
  { id: "approvals", label: "Approvals" },
  { id: "certificate", label: "Certificate" },
  { id: "placements", label: "Placements" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQs" },
];

export default function SubHeader() {
  const [activeId, setActiveId] = useState<string>("overview");
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const mainHeaderHeight = 70; // must match your main header CSS height (px)
  const stickyTriggerOffset = 400; // scroll distance before subheader becomes sticky
  const [subHeaderHeight, setSubHeaderHeight] = useState<number>(56);

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

  useEffect(() => {
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
  }, []);

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
    if (!el) return;

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
        // background: "linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)",
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
      `}</style>

      <div
        className="subheader-scroll"
        style={{
          display: "flex",
          gap: "0.5rem",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0.75rem 1rem",
          justifyContent: "flex-start",
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = item.id === activeId;

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              style={{
                flex: "0 0 auto",
                whiteSpace: "nowrap",
                padding: "0.5rem 0.25rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                border: "none",
                background: "transparent",
                color: isActive ? "#ef4444" : "#111827",
                cursor: "pointer",
                transition: "color 0.2s ease",
                borderBottom: isActive
                  ? "3px solid #ef4444"
                  : "3px solid transparent",
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
