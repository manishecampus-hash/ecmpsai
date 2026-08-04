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

"use client";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
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
  { id: "fee", label: "Course Fees" },
  { id: "loan", label: "Education Loan/EMI" },
  { id: "admission", label: "Admission Open 2026" },
  { id: "syllabus", label: "Syllabus/Curriculum" },
  { id: "examination", label: "Examination Pattern" },
  { id: "job-roles", label: "Job Roles" },
  { id: "reviews", label: "Reviews" },
  { id: "coupons", label: "Coupons" },
  { id: "placement-partners", label: "Placement Partners" },
  { id: "faculty", label: "Faculty" },
];
const BASE_PATH = "/programs/doctorate/ggu";
export default function GguSubHeader() {
  const router = useRouter();
  const pathname = usePathname();
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

          if (item.id === "who-can-apply") {
            return (
              <Link
                key={item.id}
                href="/programs/doctorate/ggu/who-can-apply"
                style={{
                  flex: "0 0 auto",
                  whiteSpace: "nowrap",
                  padding: "0.5rem 0.25rem",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#111827",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            );
          }

          if (item.id === "specializations") {
            return (
              <Link
                key={item.id}
                href="/programs/doctorate/ggu/specializations"
                style={{
                  flex: "0 0 auto",
                  whiteSpace: "nowrap",
                  padding: "0.5rem 0.25rem",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#111827",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            );
          }
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
