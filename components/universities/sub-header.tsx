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
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
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
    const handleScroll = () => {
      setIsSticky(window.scrollY > stickyTriggerOffset);

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
      <style jsx>{`
        .subheader-scroll {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE / old Edge */
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: x proximity;
        }
        .subheader-scroll::-webkit-scrollbar {
          display: none; /* Chrome, Safari, new Edge */
          height: 0;
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
          transition: background 0.2s ease, color 0.2s ease, opacity 0.2s ease;
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

        /* ---- Mobile fixes: proper edge spacing + smaller items ---- */
        .subheader-wrap {
          padding: 0.5rem 0.75rem;
          gap: 0.5rem;
        }
        .subheader-scroll {
          gap: 0.75rem;
          padding-right: 0.25rem;
        }
        .subheader-item {
          padding: 0.5rem 0.4rem;
          font-size: 0.875rem;
        }

        @media (max-width: 640px) {
          .subheader-wrap {
            padding: 0.5rem 0.5rem !important;
            gap: 0.35rem !important;
          }
          .subheader-scroll {
            gap: 0.9rem !important;
            padding: 0 0.25rem !important;
          }
          .subheader-item {
            font-size: 0.78rem !important;
            padding: 0.4rem 0.35rem !important;
          }
          .subheader-arrow {
            width: 26px;
            height: 26px;
          }
        }
      `}</style>

      <div
        className="subheader-wrap"
        style={{
          display: "flex",
          alignItems: "center",
          maxWidth: "1280px",
          margin: "0 auto",
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
            overflowX: "auto",
            flex: "1 1 auto",
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === activeId;

            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className="subheader-item"
                style={{
                  flex: "0 0 auto",
                  whiteSpace: "nowrap",
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