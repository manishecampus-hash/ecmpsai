// "use client";

// import React, {
//   useMemo,
//   useRef,
//   useState,
//   useEffect,
//   useCallback,
// } from "react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Clock,
//   Users,
//   Handshake,
// } from "lucide-react";

// // Real data with actual content
// const programsData = [
//   {
//     id: 1,
//     title: "BTech Computer Science Engineering",
//     image:
//       "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=200&fit=crop",
//     ribbon: "DEGREE",
//     learners: "5.2K+ Students",
//     duration: "4 Years",
//     tab: "engineering",
//     slug: "/program/btech-cse",
//     isFree: false,
//   },
//   {
//     id: 2,
//     title: "Advanced Python Programming Bootcamp",
//     image:
//       "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=200&fit=crop",
//     ribbon: "COURSE",
//     learners: "12K+ Students",
//     duration: "8 Weeks",
//     tab: "engineering",
//     slug: "/program/python-bootcamp",
//     isFree: true,
//   },
//   {
//     id: 3,
//     title: "MBA - Business Administration",
//     image:
//       "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
//     ribbon: "DEGREE",
//     learners: "3.8K+ Students",
//     duration: "2 Years",
//     tab: "management",
//     slug: "/program/mba-general",
//     isFree: false,
//   },
//   {
//     id: 4,
//     title: "Digital Marketing Masterclass",
//     image:
//       "https://images.unsplash.com/photo-1460925895917-aeb19be489c7?w=400&h=200&fit=crop",
//     ribbon: "CERTIFICATION",
//     learners: "8.9K+ Students",
//     duration: "6 Weeks",
//     tab: "certifications",
//     slug: "/program/digital-marketing",
//     isFree: true,
//   },
//   {
//     id: 5,
//     title: "Cloud Architecture with AWS",
//     image:
//       "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=200&fit=crop",
//     ribbon: "CERTIFICATION",
//     learners: "6.7K+ Students",
//     duration: "10 Weeks",
//     tab: "engineering",
//     slug: "/program/aws-cloud",
//     isFree: false,
//   },
//   {
//     id: 6,
//     title: "Global MBA - Sync Online",
//     image:
//       "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
//     ribbon: "DEGREE",
//     learners: "2.1K+ Students",
//     duration: "18 Months",
//     tab: "globalandasync",
//     slug: "/program/global-mba-sync",
//     isFree: false,
//   },
//   {
//     id: 7,
//     title: "Data Science & ML Bootcamp",
//     image:
//       "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=200&fit=crop",
//     ribbon: "COURSE",
//     learners: "9.3K+ Students",
//     duration: "12 Weeks",
//     tab: "engineering",
//     slug: "/program/data-science",
//     isFree: false,
//   },
//   {
//     id: 8,
//     title: "Financial Management Fundamentals",
//     image:
//       "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
//     ribbon: "CERTIFICATION",
//     learners: "4.5K+ Students",
//     duration: "4 Weeks",
//     tab: "management",
//     slug: "/program/finance-basics",
//     isFree: true,
//   },
// ];

// const courseTabs = [
//   { id: "all", label: "All Courses" },
//   { id: "engineering", label: "Engineering" },
//   { id: "management", label: "Management" },
//   { id: "degree", label: "Degree" },
//   { id: "globalandasync", label: "Global and Async" },
//   { id: "certifications", label: "Certifications" },
// ];

// function useScrollState(ref: React.RefObject<HTMLDivElement | null>) {
//   const [canLeft, setCanLeft] = useState(false);
//   const [canRight, setCanRight] = useState(false);

//   const update = useCallback(() => {
//     const el = ref.current;
//     if (!el) return;
//     setCanLeft(el.scrollLeft > 4);
//     setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
//   }, [ref]);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     update();
//     el.addEventListener("scroll", update, { passive: true });
//     window.addEventListener("resize", update);
//     return () => {
//       el.removeEventListener("scroll", update);
//       window.removeEventListener("resize", update);
//     };
//   }, [ref, update]);

//   useEffect(() => {
//     setTimeout(update, 80);
//   }, [update]);

//   return { canLeft, canRight };
// }

// const tabArrowStyle = (visible: boolean): React.CSSProperties => ({
//   background: "transparent",
//   border: "none",
//   padding: 0,
//   cursor: visible ? "pointer" : "default",
//   color: "#ff3b4f",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   opacity: visible ? 1 : 0,
//   pointerEvents: visible ? "auto" : "none",
//   transition: "opacity 0.2s",
//   flexShrink: 0,
//   width: 36,
//   height: 36,
// });

// const leftArrowStyle = (visible: boolean): React.CSSProperties => ({
//   position: "absolute",
//   left: 0,
//   top: "50%",
//   transform: "translateY(-50%)",
//   zIndex: 40,
//   background: "#666666",
//   border: "none",
//   borderRadius: "0 8px 8px 0",
//   padding: 0,
//   cursor: visible ? "pointer" : "default",
//   color: "#ffffff",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   opacity: visible ? 1 : 0,
//   pointerEvents: visible ? "auto" : "none",
//   transition: "opacity 0.2s, background 0.2s",
//   flexShrink: 0,
//   width: 24,
//   height: 64,
// });

// const rightArrowStyle = (visible: boolean): React.CSSProperties => ({
//   position: "absolute",
//   right: 0,
//   top: "50%",
//   transform: "translateY(-50%)",
//   zIndex: 40,
//   background: "#666666",
//   border: "none",
//   borderRadius: "8px 0 0 8px",
//   padding: 0,
//   cursor: visible ? "pointer" : "default",
//   color: "#ffffff",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   opacity: visible ? 1 : 0,
//   pointerEvents: visible ? "auto" : "none",
//   transition: "opacity 0.2s, background 0.2s",
//   flexShrink: 0,
//   width: 24,
//   height: 64,
// });

// export default function ProgramsSection() {
//   const [activeTab, setActiveTab] = useState("all");
//   const carouselRef = useRef<HTMLDivElement>(null);
//   const tabsRef = useRef<HTMLDivElement>(null);

//   const filteredPrograms = useMemo(
//     () =>
//       activeTab === "all"
//         ? programsData
//         : programsData.filter((p) => p.tab === activeTab),
//     [activeTab],
//   );

//   const handleTabChange = (tabId: string) => {
//     setActiveTab(tabId);
//     setTimeout(() => {
//       if (carouselRef.current) {
//         carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
//       }
//     }, 50);
//   };

//   const { canLeft: carLeft, canRight: carRight } = useScrollState(carouselRef);
//   const { canLeft: tabLeft, canRight: tabRight } = useScrollState(tabsRef);

//   const scrollCarousel = (dir: number) => {
//     if (carouselRef.current) {
//       carouselRef.current.scrollBy({ left: dir * 290, behavior: "smooth" });
//     }
//   };

//   const scrollTabs = (dir: number) => {
//     if (tabsRef.current) {
//       tabsRef.current.scrollBy({ left: dir * 200, behavior: "smooth" });
//     }
//   };

//   return (
//     <section className="relative w-full py-10 bg-white">
//       <style>{`
//         .__ps::-webkit-scrollbar { display: none; }
//         @media (min-width: 768px) { .__tabArrow { display: none !important; } }
//         .__carArrow:hover { background: #333333 !important; }
//       `}</style>

//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-6 font-[Inter]">
//           <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
//             <Handshake className="h-3.5 w-3.5 text-red-500" />
//             In-Demand Courses
//           </span>

//           <h2 className="mt-2 text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl md:text-4xl">
//             Find The Right <span className="text-red-500">Program</span>
//           </h2>
//         </div>

//         {/* Tabs Row */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "4px",
//             marginBottom: "28px",
//             borderBottom: "1px solid #e2e8f0",
//           }}
//         >
//           <button
//             className="__tabArrow"
//             onClick={() => scrollTabs(-1)}
//             style={tabArrowStyle(tabLeft)}
//             aria-label="Scroll tabs left"
//           >
//             <ChevronLeft size={16} />
//           </button>

//           <div
//             ref={tabsRef}
//             className="__ps"
//             style={{
//               flex: 1,
//               display: "flex",
//               gap: "28px",
//               overflowX: "auto",
//               scrollbarWidth: "none",
//               padding: "0 2px",
//             }}
//           >
//             {courseTabs.map((tab) => {
//               const isActive = activeTab === tab.id;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => handleTabChange(tab.id)}
//                   style={{
//                     background: "none",
//                     border: "none",
//                     cursor: "pointer",
//                     padding: "0 0 12px",
//                     fontSize: "14px",
//                     fontWeight: isActive ? 700 : 500,
//                     color: isActive ? "#000" : "#64748b",
//                     whiteSpace: "nowrap",
//                     borderBottom: isActive
//                       ? "2px solid #000"
//                       : "2px solid transparent",
//                     marginBottom: "-1px",
//                     transition: "color 0.2s, font-weight 0.2s",
//                   }}
//                 >
//                   {tab.label}
//                 </button>
//               );
//             })}
//           </div>

//           <button
//             className="__tabArrow"
//             onClick={() => scrollTabs(1)}
//             style={tabArrowStyle(tabRight)}
//             aria-label="Scroll tabs right"
//           >
//             <ChevronRight size={16} />
//           </button>
//         </div>

//         {/* Carousel Row */}
//         <div style={{ position: "relative" }}>
//           <button
//             className="__carArrow"
//             onClick={() => scrollCarousel(-1)}
//             style={leftArrowStyle(carLeft)}
//             aria-label="Scroll carousel left"
//           >
//             <ChevronLeft size={16} />
//           </button>

//           <div
//             ref={carouselRef}
//             className="__ps"
//             style={{
//               display: "flex",
//               gap: "16px",
//               overflowX: "auto",
//               scrollbarWidth: "none",
//               scrollSnapType: "x mandatory",
//               padding: "4px 32px 12px",
//               alignItems: "stretch",
//             }}
//           >
//             {filteredPrograms.length === 0 ? (
//               <div
//                 style={{
//                   flex: "0 0 100%",
//                   borderRadius: "12px",
//                   border: "1px dashed #e2e8f0",
//                   padding: "48px",
//                   textAlign: "center",
//                   color: "#94a3b8",
//                   fontSize: "14px",
//                 }}
//               >
//                 No programs found for this category.
//               </div>
//             ) : (
//               filteredPrograms.map((program) => (
//                 <article
//                   key={program.id}
//                   style={{
//                     flex: "0 0 270px",
//                     scrollSnapAlign: "start",
//                     borderRadius: "12px",
//                     border: "1px solid #e2e8f0",
//                     background: "#ffffff",
//                     overflow: "hidden",
//                     display: "flex",
//                     flexDirection: "column",
//                     transition: "box-shadow 0.25s, transform 0.25s",
//                     boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
//                     position: "relative",
//                     cursor: "pointer",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.boxShadow =
//                       "0 8px 32px rgba(0,0,0,0.14)";
//                     e.currentTarget.style.transform = "translateY(-3px)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.boxShadow =
//                       "0 2px 12px rgba(0,0,0,0.08)";
//                     e.currentTarget.style.transform = "translateY(0)";
//                   }}
//                 >
//                   {/* Image */}
//                   <div
//                     style={{
//                       position: "relative",
//                       height: "160px",
//                       overflow: "hidden",
//                       background: "#f1f5f9",
//                       flexShrink: 0,
//                     }}
//                   >
//                     <img
//                       src={program.image}
//                       alt={program.title}
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                       }}
//                       loading="lazy"
//                     />
//                     <div
//                       style={{
//                         position: "absolute",
//                         top: "12px",
//                         left: "0",
//                         background: "#ff3b4f",
//                         padding: "3px 10px 3px 12px",
//                         fontSize: "10px",
//                         fontWeight: 700,
//                         color: "#fff",
//                         borderRadius: "0 4px 4px 0",
//                         letterSpacing: "0.0em",
//                         boxShadow: "0 2px 6px rgba(255,59,79,0.3)",
//                       }}
//                     >
//                       {program.ribbon}
//                     </div>
//                   </div>

//                   {/* Body */}
//                   <div
//                     style={{
//                       padding: "14px 14px 0",
//                       display: "flex",
//                       flexDirection: "column",
//                       flex: 1,
//                     }}
//                   >
//                     <p
//                       style={{
//                         margin: "0 0 12px",
//                         fontSize: "14px",
//                         fontWeight: 700,
//                         color: "#0f172a",
//                         lineHeight: "1.45",
//                         display: "-webkit-box",
//                         WebkitLineClamp: 3,
//                         WebkitBoxOrient: "vertical",
//                         overflow: "hidden",
//                       }}
//                     >
//                       {program.title}
//                     </p>

//                     {/* Learners & Duration - Side by Side (AMNE SAMNE) */}
//                     <div
//                       style={{
//                         display: "flex",
//                         gap: "20px",
//                         marginBottom: "14px",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                       }}
//                     >
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "6px",
//                           fontSize: "12px",
//                           color: "#475569",
//                         }}
//                       >
//                         <Users size={13} color="#64748b" strokeWidth={1.8} />
//                         <span>{program.learners}</span>
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "6px",
//                           fontSize: "12px",
//                           color: "#475569",
//                         }}
//                       >
//                         <Clock size={13} color="#64748b" strokeWidth={1.8} />
//                         <span>{program.duration}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* CTA Buttons */}
//                   <div
//                     style={{
//                       padding: "12px 14px 14px",
//                       display: "flex",
//                       gap: "10px",
//                       borderTop: "1px solid #f1f5f9",
//                     }}
//                   >
//                     <a
//                       href={program.slug}
//                       style={{
//                         flex: 1,
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         borderRadius: "6px",
//                         border: "1.5px solid #cbd5e1",
//                         background: "#fff",
//                         padding: "8px 10px",
//                         fontSize: "12px",
//                         fontWeight: 700,
//                         color: "#0f172a",
//                         textDecoration: "none",
//                         transition: "border-color 0.2s, background 0.2s",
//                         whiteSpace: "nowrap",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.borderColor = "#94a3b8";
//                         e.currentTarget.style.background = "#f8fafc";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.borderColor = "#cbd5e1";
//                         e.currentTarget.style.background = "#fff";
//                       }}
//                     >
//                       View Program
//                     </a>
//                     <a
//                       href={program.slug}
//                       style={{
//                         flex: 1,
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         borderRadius: "6px",
//                         background: "#ff3b4f",
//                         border: "1.5px solid #ff3b4f",
//                         padding: "8px 10px",
//                         fontSize: "12px",
//                         fontWeight: 700,
//                         color: "#fff",
//                         textDecoration: "none",
//                         transition: "background 0.2s, border-color 0.2s",
//                         whiteSpace: "nowrap",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.background = "#e02035";
//                         e.currentTarget.style.borderColor = "#e02035";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.background = "#ff3b4f";
//                         e.currentTarget.style.borderColor = "#ff3b4f";
//                       }}
//                     >
//                       {program.isFree ? "Enroll Now" : "Get Brochure"}
//                     </a>
//                   </div>
//                 </article>
//               ))
//             )}
//           </div>

//           <button
//             className="__carArrow"
//             onClick={() => scrollCarousel(1)}
//             style={rightArrowStyle(carRight)}
//             aria-label="Scroll carousel right"
//           >
//             <ChevronRight size={16} />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";

// import React, {
//   useMemo,
//   useRef,
//   useState,
//   useEffect,
//   useCallback,
// } from "react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Clock,
//   Users,
//   Handshake,
// } from "lucide-react";

// // Real data with actual content
// const programsData = [
//   {
//     id: 1,
//     title: "BTech Computer Science Engineering",
//     image:
//       "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=200&fit=crop",
//     ribbon: "DEGREE",
//     learners: "5.2K+ Students",
//     duration: "4 Years",
//     tab: "engineering",
//     slug: "/program/btech-cse",
//     isFree: false,
//     mode: "offline",
//   },
//   {
//     id: 2,
//     title: "Advanced Python Programming Bootcamp",
//     image:
//       "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=200&fit=crop",
//     ribbon: "COURSE",
//     learners: "12K+ Students",
//     duration: "8 Weeks",
//     tab: "engineering",
//     slug: "/program/python-bootcamp",
//     isFree: true,
//     mode: "online",
//   },
//   {
//     id: 3,
//     title: "MBA - Business Administration",
//     image:
//       "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
//     ribbon: "DEGREE",
//     learners: "3.8K+ Students",
//     duration: "2 Years",
//     tab: "management",
//     slug: "/program/mba-general",
//     isFree: false,
//     mode: "offline",
//   },
//   {
//     id: 4,
//     title: "Digital Marketing Masterclass",
//     image:
//       "https://images.unsplash.com/photo-1460925895917-aeb19be489c7?w=400&h=200&fit=crop",
//     ribbon: "CERTIFICATION",
//     learners: "8.9K+ Students",
//     duration: "6 Weeks",
//     tab: "certifications",
//     slug: "/program/digital-marketing",
//     isFree: true,
//     mode: "online",
//   },
//   {
//     id: 5,
//     title: "Cloud Architecture with AWS",
//     image:
//       "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=200&fit=crop",
//     ribbon: "CERTIFICATION",
//     learners: "6.7K+ Students",
//     duration: "10 Weeks",
//     tab: "engineering",
//     slug: "/program/aws-cloud",
//     isFree: false,
//     mode: "online",
//   },
//   {
//     id: 6,
//     title: "Global MBA - Sync Online",
//     image:
//       "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
//     ribbon: "DEGREE",
//     learners: "2.1K+ Students",
//     duration: "18 Months",
//     tab: "globalandasync",
//     slug: "/program/global-mba-sync",
//     isFree: false,
//     mode: "online",
//   },
//   {
//     id: 7,
//     title: "Data Science & ML Bootcamp",
//     image:
//       "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=200&fit=crop",
//     ribbon: "COURSE",
//     learners: "9.3K+ Students",
//     duration: "12 Weeks",
//     tab: "engineering",
//     slug: "/program/data-science",
//     isFree: false,
//     mode: "online",
//   },
//   {
//     id: 8,
//     title: "Financial Management Fundamentals",
//     image:
//       "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
//     ribbon: "CERTIFICATION",
//     learners: "4.5K+ Students",
//     duration: "4 Weeks",
//     tab: "management",
//     slug: "/program/finance-basics",
//     isFree: true,
//     mode: "offline",
//   },
// ];

// const courseTabs = [
//   { id: "all", label: "All Courses" },
//   { id: "engineering", label: "Engineering" },
//   { id: "management", label: "Management" },
//   { id: "degree", label: "Degree" },
//   { id: "globalandasync", label: "Global and Async" },
//   { id: "certifications", label: "Certifications" },
// ];

// const modeTabs = [
//   { id: "all", label: "All" },
//   { id: "online", label: "Online" },
//   { id: "offline", label: "Offline" },
// ];

// function useScrollState(ref: React.RefObject<HTMLDivElement | null>) {
//   const [canLeft, setCanLeft] = useState(false);
//   const [canRight, setCanRight] = useState(false);

//   const update = useCallback(() => {
//     const el = ref.current;
//     if (!el) return;
//     setCanLeft(el.scrollLeft > 4);
//     setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
//   }, [ref]);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     update();
//     el.addEventListener("scroll", update, { passive: true });
//     window.addEventListener("resize", update);
//     return () => {
//       el.removeEventListener("scroll", update);
//       window.removeEventListener("resize", update);
//     };
//   }, [ref, update]);

//   useEffect(() => {
//     setTimeout(update, 80);
//   }, [update]);

//   return { canLeft, canRight };
// }

// const tabArrowStyle = (visible: boolean): React.CSSProperties => ({
//   background: "transparent",
//   border: "none",
//   padding: 0,
//   cursor: visible ? "pointer" : "default",
//   color: "#ff3b4f",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   opacity: visible ? 1 : 0,
//   pointerEvents: visible ? "auto" : "none",
//   transition: "opacity 0.2s",
//   flexShrink: 0,
// });

// const leftArrowStyle = (visible: boolean): React.CSSProperties => ({
//   position: "absolute",
//   left: 0,
//   top: "50%",
//   transform: "translateY(-50%)",
//   zIndex: 40,
//   background: "#666666",
//   border: "none",
//   borderRadius: "0 8px 8px 0",
//   padding: 0,
//   cursor: visible ? "pointer" : "default",
//   color: "#ffffff",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   opacity: visible ? 1 : 0,
//   pointerEvents: visible ? "auto" : "none",
//   transition: "opacity 0.2s, background 0.2s",
//   flexShrink: 0,
//   width: 24,
//   height: 64,
// });

// const rightArrowStyle = (visible: boolean): React.CSSProperties => ({
//   position: "absolute",
//   right: 0,
//   top: "50%",
//   transform: "translateY(-50%)",
//   zIndex: 40,
//   background: "#666666",
//   border: "none",
//   borderRadius: "8px 0 0 8px",
//   padding: 0,
//   cursor: visible ? "pointer" : "default",
//   color: "#ffffff",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   opacity: visible ? 1 : 0,
//   pointerEvents: visible ? "auto" : "none",
//   transition: "opacity 0.2s, background 0.2s",
//   flexShrink: 0,
//   width: 24,
//   height: 64,
// });

// export default function ProgramsSection() {
//   const [activeTab, setActiveTab] = useState("all");
//   const [activeMode, setActiveMode] = useState("all");
//   const carouselRef = useRef<HTMLDivElement>(null);
//   const tabsRef = useRef<HTMLDivElement>(null);

//   const filteredPrograms = useMemo(
//     () =>
//       programsData.filter((p) => {
//         const tabMatch = activeTab === "all" || p.tab === activeTab;
//         const modeMatch = activeMode === "all" || p.mode === activeMode;
//         return tabMatch && modeMatch;
//       }),
//     [activeTab, activeMode],
//   );

//   const handleTabChange = (tabId: string) => {
//     setActiveTab(tabId);
//     setTimeout(() => {
//       if (carouselRef.current) {
//         carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
//       }
//     }, 50);
//   };

//   const handleModeChange = (modeId: string) => {
//     setActiveMode(modeId);
//     setTimeout(() => {
//       if (carouselRef.current) {
//         carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
//       }
//     }, 50);
//   };

//   const { canLeft: carLeft, canRight: carRight } = useScrollState(carouselRef);
//   const { canLeft: tabLeft, canRight: tabRight } = useScrollState(tabsRef);

//   const scrollCarousel = (dir: number) => {
//     if (carouselRef.current) {
//       carouselRef.current.scrollBy({ left: dir * 290, behavior: "smooth" });
//     }
//   };

//   const scrollTabs = (dir: number) => {
//     if (tabsRef.current) {
//       tabsRef.current.scrollBy({ left: dir * 200, behavior: "smooth" });
//     }
//   };

//   return (
//     <section className="relative w-full py-10 bg-white">
//       <style>{`
//         .__ps::-webkit-scrollbar { display: none; }
//         @media (min-width: 768px) { .__tabArrow { display: none !important; } }
//         .__carArrow:hover { background: #333333 !important; }
//       `}</style>

//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-6 font-[Inter]">
//           <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
//             <Handshake className="h-3.5 w-3.5 text-red-500" />
//             In-Demand Courses
//           </span>

//           <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 whitespace-nowrap sm:text-3xl md:text-4xl">
//             Find The Right <span className="text-red-500">Program</span>
//           </h2>
//         </div>

//         {/* Tabs Row */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "0px",
//             marginBottom: "28px",
//             borderBottom: "1px solid #e2e8f0",
//           }}
//         >
//           <button
//             className="__tabArrow"
//             onClick={() => scrollTabs(-1)}
//             style={{
//               ...tabArrowStyle(tabLeft),
//               width: 20,
//               height: 20,
//               minWidth: 20,
//               padding: 0,
//               marginRight: "6px",
//             }}
//             aria-label="Scroll tabs left"
//           >
//             <ChevronLeft size={16} />
//           </button>

//           <div
//             ref={tabsRef}
//             className="__ps"
//             style={{
//               flex: 1,
//               display: "flex",
//               gap: "28px",
//               overflowX: "auto",
//               scrollbarWidth: "none",
//               padding: "0 2px",
//               alignItems: "center",
//             }}
//           >
//             {courseTabs.map((tab) => {
//               const isActive = activeTab === tab.id;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => handleTabChange(tab.id)}
//                   style={{
//                     background: "none",
//                     border: "none",
//                     cursor: "pointer",
//                     padding: "0 0 12px",
//                     fontSize: "14px",
//                     fontWeight: isActive ? 700 : 500,
//                     color: isActive ? "#000" : "#64748b",
//                     whiteSpace: "nowrap",
//                     borderBottom: isActive
//                       ? "2px solid #000"
//                       : "2px solid transparent",
//                     marginBottom: "-1px",
//                     transition: "color 0.2s, font-weight 0.2s",
//                   }}
//                 >
//                   {tab.label}
//                 </button>
//               );
//             })}
//           </div>

//           <button
//             className="__tabArrow"
//             onClick={() => scrollTabs(1)}
//             style={{
//               ...tabArrowStyle(tabRight),
//               width: 20,
//               height: 20,
//               minWidth: 20,
//               padding: 0,
//               marginLeft: "6px",
//             }}
//             aria-label="Scroll tabs right"
//           >
//             <ChevronRight size={16} />
//           </button>
//         </div>

//         {/* Mode Toggle */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//             marginBottom: "20px",
//           }}
//         >
//           <span
//             style={{
//               fontSize: "13px",
//               fontWeight: 600,
//               color: "#475569",
//               whiteSpace: "nowrap",
//             }}
//           >
//             Mode:
//           </span>
//           <div
//             style={{
//               display: "flex",
//               gap: "6px",
//             }}
//           >
//             {modeTabs.map((mode) => {
//               const isActive = activeMode === mode.id;
//               return (
//                 <button
//                   key={mode.id}
//                   onClick={() => handleModeChange(mode.id)}
//                   style={{
//                     background: isActive ? "#ff3b4f" : "#f8fafc",
//                     border: isActive
//                       ? "1.5px solid #ff3b4f"
//                       : "1.5px solid #e2e8f0",
//                     borderRadius: "20px",
//                     padding: "5px 16px",
//                     fontSize: "12px",
//                     fontWeight: 700,
//                     color: isActive ? "#fff" : "#475569",
//                     cursor: "pointer",
//                     transition:
//                       "background 0.2s, border-color 0.2s, color 0.2s",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   {mode.label}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Carousel Row */}
//         <div style={{ position: "relative" }}>
//           <button
//             className="__carArrow"
//             onClick={() => scrollCarousel(-1)}
//             style={leftArrowStyle(carLeft)}
//             aria-label="Scroll carousel left"
//           >
//             <ChevronLeft size={16} />
//           </button>

//           <div
//             ref={carouselRef}
//             className="__ps"
//             style={{
//               display: "flex",
//               gap: "16px",
//               overflowX: "auto",
//               scrollbarWidth: "none",
//               scrollSnapType: "x mandatory",
//               padding: "4px 32px 12px",
//               alignItems: "stretch",
//             }}
//           >
//             {filteredPrograms.length === 0 ? (
//               <div
//                 style={{
//                   flex: "0 0 100%",
//                   borderRadius: "12px",
//                   border: "1px dashed #e2e8f0",
//                   padding: "48px",
//                   textAlign: "center",
//                   color: "#94a3b8",
//                   fontSize: "14px",
//                 }}
//               >
//                 No programs found for this category.
//               </div>
//             ) : (
//               filteredPrograms.map((program) => (
//                 <article
//                   key={program.id}
//                   style={{
//                     flex: "0 0 270px",
//                     scrollSnapAlign: "start",
//                     borderRadius: "12px",
//                     border: "1px solid #e2e8f0",
//                     background: "#ffffff",
//                     overflow: "hidden",
//                     display: "flex",
//                     flexDirection: "column",
//                     transition: "box-shadow 0.25s, transform 0.25s",
//                     boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
//                     position: "relative",
//                     cursor: "pointer",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.boxShadow =
//                       "0 8px 32px rgba(0,0,0,0.14)";
//                     e.currentTarget.style.transform = "translateY(-3px)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.boxShadow =
//                       "0 2px 12px rgba(0,0,0,0.08)";
//                     e.currentTarget.style.transform = "translateY(0)";
//                   }}
//                 >
//                   {/* Image */}
//                   <div
//                     style={{
//                       position: "relative",
//                       height: "160px",
//                       overflow: "hidden",
//                       background: "#f1f5f9",
//                       flexShrink: 0,
//                     }}
//                   >
//                     <img
//                       src={program.image}
//                       alt={program.title}
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                       }}
//                       loading="lazy"
//                     />
//                     <div
//                       style={{
//                         position: "absolute",
//                         top: "12px",
//                         left: "0",
//                         background: "#ff3b4f",
//                         padding: "3px 10px 3px 12px",
//                         fontSize: "10px",
//                         fontWeight: 700,
//                         color: "#fff",
//                         borderRadius: "0 4px 4px 0",
//                         letterSpacing: "0.0em",
//                         boxShadow: "0 2px 6px rgba(255,59,79,0.3)",
//                       }}
//                     >
//                       {program.ribbon}
//                     </div>
//                     {/* Mode Badge */}
//                     <div
//                       style={{
//                         position: "absolute",
//                         top: "12px",
//                         right: "10px",
//                         background:
//                           program.mode === "online" ? "#dcfce7" : "#fef3c7",
//                         padding: "3px 8px",
//                         fontSize: "10px",
//                         fontWeight: 700,
//                         color:
//                           program.mode === "online" ? "#16a34a" : "#b45309",
//                         borderRadius: "20px",
//                         border:
//                           program.mode === "online"
//                             ? "1px solid #bbf7d0"
//                             : "1px solid #fde68a",
//                         textTransform: "capitalize",
//                       }}
//                     >
//                       {program.mode === "online" ? "🟢 Online" : "🟡 Offline"}
//                     </div>
//                   </div>

//                   {/* Body */}
//                   <div
//                     style={{
//                       padding: "14px 14px 0",
//                       display: "flex",
//                       flexDirection: "column",
//                       flex: 1,
//                     }}
//                   >
//                     <p
//                       style={{
//                         margin: "0 0 12px",
//                         fontSize: "14px",
//                         fontWeight: 700,
//                         color: "#0f172a",
//                         lineHeight: "1.45",
//                         display: "-webkit-box",
//                         WebkitLineClamp: 3,
//                         WebkitBoxOrient: "vertical",
//                         overflow: "hidden",
//                       }}
//                     >
//                       {program.title}
//                     </p>

//                     {/* Learners & Duration - Side by Side (AMNE SAMNE) */}
//                     <div
//                       style={{
//                         display: "flex",
//                         gap: "20px",
//                         marginBottom: "14px",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                       }}
//                     >
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "6px",
//                           fontSize: "12px",
//                           color: "#475569",
//                         }}
//                       >
//                         <Users size={13} color="#64748b" strokeWidth={1.8} />
//                         <span>{program.learners}</span>
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "6px",
//                           fontSize: "12px",
//                           color: "#475569",
//                         }}
//                       >
//                         <Clock size={13} color="#64748b" strokeWidth={1.8} />
//                         <span>{program.duration}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* CTA Buttons */}
//                   <div
//                     style={{
//                       padding: "12px 14px 14px",
//                       display: "flex",
//                       gap: "10px",
//                       borderTop: "1px solid #f1f5f9",
//                     }}
//                   >
//                     <a
//                       href={program.slug}
//                       style={{
//                         flex: 1,
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         borderRadius: "6px",
//                         border: "1.5px solid #cbd5e1",
//                         background: "#fff",
//                         padding: "8px 10px",
//                         fontSize: "12px",
//                         fontWeight: 700,
//                         color: "#0f172a",
//                         textDecoration: "none",
//                         transition: "border-color 0.2s, background 0.2s",
//                         whiteSpace: "nowrap",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.borderColor = "#94a3b8";
//                         e.currentTarget.style.background = "#f8fafc";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.borderColor = "#cbd5e1";
//                         e.currentTarget.style.background = "#fff";
//                       }}
//                     >
//                       View Program
//                     </a>
//                     <a
//                       href={program.slug}
//                       style={{
//                         flex: 1,
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         borderRadius: "6px",
//                         background: "#ff3b4f",
//                         border: "1.5px solid #ff3b4f",
//                         padding: "8px 10px",
//                         fontSize: "12px",
//                         fontWeight: 700,
//                         color: "#fff",
//                         textDecoration: "none",
//                         transition: "background 0.2s, border-color 0.2s",
//                         whiteSpace: "nowrap",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.background = "#e02035";
//                         e.currentTarget.style.borderColor = "#e02035";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.background = "#ff3b4f";
//                         e.currentTarget.style.borderColor = "#ff3b4f";
//                       }}
//                     >
//                       {program.isFree ? "Enroll Now" : "Get Brochure"}
//                     </a>
//                   </div>
//                 </article>
//               ))
//             )}
//           </div>

//           <button
//             className="__carArrow"
//             onClick={() => scrollCarousel(1)}
//             style={rightArrowStyle(carRight)}
//             aria-label="Scroll carousel right"
//           >
//             <ChevronRight size={16} />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  Handshake,
  CheckCircle2,
} from "lucide-react";

// Real data with actual content
const programsData = [
  {
    id: 1,
    title: "BTech Computer Science Engineering",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=200&fit=crop",
    ribbon: "DEGREE",
    learners: "5.2K+ Students",
    duration: "4 Years",
    tab: "engineering",
    slug: "/program/btech-cse",
    isFree: false,
    mode: "offline",
    description:
      "Build strong foundations in programming, algorithms and system design with an industry-aligned curriculum.",
    highlights: [
      "Industry-aligned curriculum",
      "Live coding labs",
      "100% placement support",
    ],
  },
  {
    id: 2,
    title: "Advanced Python Programming Bootcamp",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=200&fit=crop",
    ribbon: "COURSE",
    learners: "12K+ Students",
    duration: "8 Weeks",
    tab: "engineering",
    slug: "/program/python-bootcamp",
    isFree: true,
    mode: "online",
    description:
      "Master advanced Python concepts, automation and real-world projects in an intensive, mentor-led format.",
    highlights: [
      "Hands-on projects",
      "1:1 mentor sessions",
      "Certificate on completion",
    ],
  },
  {
    id: 3,
    title: "MBA - Business Administration",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
    ribbon: "DEGREE",
    learners: "3.8K+ Students",
    duration: "2 Years",
    tab: "management",
    slug: "/program/mba-general",
    isFree: false,
    mode: "offline",
    description:
      "A comprehensive management program covering strategy, finance, marketing and leadership fundamentals.",
    highlights: ["Case-study driven", "Global faculty", "Campus placements"],
  },
  {
    id: 4,
    title: "Digital Marketing Masterclass",
    image:
      "https://images.unsplash.com/photo-1460925895917-aeb19be489c7?w=400&h=200&fit=crop",
    ribbon: "CERTIFICATION",
    learners: "8.9K+ Students",
    duration: "6 Weeks",
    tab: "certifications",
    slug: "/program/digital-marketing",
    isFree: true,
    mode: "online",
    description:
      "Learn SEO, paid ads, and content strategy through practical campaigns and real client-style projects.",
    highlights: [
      "SEO + Paid Ads",
      "Live campaign practice",
      "Google certification prep",
    ],
  },
  {
    id: 5,
    title: "Cloud Architecture with AWS",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=200&fit=crop",
    ribbon: "CERTIFICATION",
    learners: "6.7K+ Students",
    duration: "10 Weeks",
    tab: "engineering",
    slug: "/program/aws-cloud",
    isFree: false,
    mode: "online",
    description:
      "Design and deploy scalable cloud infrastructure with hands-on AWS labs and real deployment scenarios.",
    highlights: [
      "Hands-on AWS labs",
      "Solution architect prep",
      "Cloud project portfolio",
    ],
  },
  {
    id: 6,
    title: "Global MBA - Sync Online",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
    ribbon: "DEGREE",
    learners: "2.1K+ Students",
    duration: "18 Months",
    tab: "globalandasync",
    slug: "/program/global-mba-sync",
    isFree: false,
    mode: "online",
    description:
      "A globally recognized MBA delivered live online with international peer cohorts and faculty.",
    highlights: [
      "Live global cohorts",
      "International faculty",
      "Dual credential option",
    ],
  },
  {
    id: 7,
    title: "Data Science & ML Bootcamp",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=200&fit=crop",
    ribbon: "COURSE",
    learners: "9.3K+ Students",
    duration: "12 Weeks",
    tab: "engineering",
    slug: "/program/data-science",
    isFree: false,
    mode: "online",
    description:
      "Go from fundamentals to deployment with hands-on projects in Python, ML models and real datasets.",
    highlights: [
      "Real-world datasets",
      "ML model deployment",
      "Capstone project",
    ],
  },
  {
    id: 8,
    title: "Financial Management Fundamentals",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
    ribbon: "CERTIFICATION",
    learners: "4.5K+ Students",
    duration: "4 Weeks",
    tab: "management",
    slug: "/program/finance-basics",
    isFree: true,
    mode: "offline",
    description:
      "Understand budgeting, financial statements and investment basics to make smarter money decisions.",
    highlights: [
      "Practical budgeting tools",
      "Case-based learning",
      "Beginner friendly",
    ],
  },
];

const courseTabs = [
  { id: "all", label: "All Courses" },
  { id: "engineering", label: "Engineering" },
  { id: "management", label: "Management" },
  { id: "degree", label: "Degree" },
  { id: "globalandasync", label: "Global and Async" },
  { id: "certifications", label: "Certifications" },
];

const modeTabs = [
  { id: "all", label: "All" },
  { id: "online", label: "Online" },
  { id: "offline", label: "Offline" },
];

function useScrollState(ref: React.RefObject<HTMLDivElement | null>) {
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, [ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref, update]);

  useEffect(() => {
    setTimeout(update, 80);
  }, [update]);

  return { canLeft, canRight };
}

const tabArrowStyle = (visible: boolean): React.CSSProperties => ({
  background: "transparent",
  border: "none",
  padding: 0,
  cursor: visible ? "pointer" : "default",
  color: "#ff3b4f",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: visible ? 1 : 0,
  pointerEvents: visible ? "auto" : "none",
  transition: "opacity 0.2s",
  flexShrink: 0,
});

const leftArrowStyle = (visible: boolean): React.CSSProperties => ({
  position: "absolute",
  left: 0,
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 40,
  background: "#666666",
  border: "none",
  borderRadius: "0 8px 8px 0",
  padding: 0,
  cursor: visible ? "pointer" : "default",
  color: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: visible ? 1 : 0,
  pointerEvents: visible ? "auto" : "none",
  transition: "opacity 0.2s, background 0.2s",
  flexShrink: 0,
  width: 24,
  height: 64,
});

const rightArrowStyle = (visible: boolean): React.CSSProperties => ({
  position: "absolute",
  right: 0,
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 40,
  background: "#666666",
  border: "none",
  borderRadius: "8px 0 0 8px",
  padding: 0,
  cursor: visible ? "pointer" : "default",
  color: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: visible ? 1 : 0,
  pointerEvents: visible ? "auto" : "none",
  transition: "opacity 0.2s, background 0.2s",
  flexShrink: 0,
  width: 24,
  height: 64,
});

export default function ProgramsSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [activeMode, setActiveMode] = useState("all");
  const carouselRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const filteredPrograms = useMemo(
    () =>
      programsData.filter((p) => {
        const tabMatch = activeTab === "all" || p.tab === activeTab;
        const modeMatch = activeMode === "all" || p.mode === activeMode;
        return tabMatch && modeMatch;
      }),
    [activeTab, activeMode],
  );

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setTimeout(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 50);
  };

  const handleModeChange = (modeId: string) => {
    setActiveMode(modeId);
    setTimeout(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 50);
  };

  const { canLeft: carLeft, canRight: carRight } = useScrollState(carouselRef);
  const { canLeft: tabLeft, canRight: tabRight } = useScrollState(tabsRef);

  const scrollCarousel = (dir: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir * 290, behavior: "smooth" });
    }
  };

  const scrollTabs = (dir: number) => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: dir * 200, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full py-10 bg-white">
      <style>{`
        .__ps::-webkit-scrollbar { display: none; }
        @media (min-width: 768px) { .__tabArrow { display: none !important; } }
        .__carArrow:hover { background: #333333 !important; }

        /* ---- Image hover overlay (details on hover) ---- */
        .__imgWrap {
          position: relative;
          height: 160px;
          overflow: hidden;
          background: #f1f5f9;
          flex-shrink: 0;
        }
        .__imgWrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .__imgWrap:hover img {
          transform: scale(1.08);
        }
        .__cardOverlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(15,23,42,0.35) 0%, rgba(15,23,42,0.92) 55%, rgba(15,23,42,0.97) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 12px 14px;
          opacity: 0;
          transform: translateY(100%);
          transition: opacity 0.35s ease, transform 0.35s ease;
          pointer-events: none;
        }
        .__imgWrap:hover .__cardOverlay {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .__overlayText {
          color: #e2e8f0;
          font-size: 11px;
          line-height: 1.5;
          margin: 0 0 8px;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .__imgWrap:hover .__overlayText {
          opacity: 1;
          transform: translateY(0);
        }
        .__overlayList {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s ease 0.12s, transform 0.3s ease 0.12s;
        }
        .__imgWrap:hover .__overlayList {
          opacity: 1;
          transform: translateY(0);
        }
        .__overlayList li {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10.5px;
          font-weight: 600;
          color: #f8fafc;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-6 font-[Inter]">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <Handshake className="h-3.5 w-3.5 text-red-500" />
            In-Demand Courses
          </span>

          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 whitespace-nowrap sm:text-3xl md:text-4xl">
            Find The Right <span className="text-red-500">Program</span>
          </h2>
        </div>

        {/* Tabs Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0px",
            marginBottom: "28px",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <button
            className="__tabArrow"
            onClick={() => scrollTabs(-1)}
            style={{
              ...tabArrowStyle(tabLeft),
              width: 20,
              height: 20,
              minWidth: 20,
              padding: 0,
              marginRight: "6px",
            }}
            aria-label="Scroll tabs left"
          >
            <ChevronLeft size={16} />
          </button>

          <div
            ref={tabsRef}
            className="__ps"
            style={{
              flex: 1,
              display: "flex",
              gap: "28px",
              overflowX: "auto",
              scrollbarWidth: "none",
              padding: "0 2px",
              alignItems: "center",
            }}
          >
            {courseTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0 0 12px",
                    fontSize: "14px",
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "#000" : "#64748b",
                    whiteSpace: "nowrap",
                    borderBottom: isActive
                      ? "2px solid #000"
                      : "2px solid transparent",
                    marginBottom: "-1px",
                    transition: "color 0.2s, font-weight 0.2s",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <button
            className="__tabArrow"
            onClick={() => scrollTabs(1)}
            style={{
              ...tabArrowStyle(tabRight),
              width: 20,
              height: 20,
              minWidth: 20,
              padding: 0,
              marginLeft: "6px",
            }}
            aria-label="Scroll tabs right"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Mode Toggle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#475569",
              whiteSpace: "nowrap",
            }}
          >
            Mode:
          </span>
          <div
            style={{
              display: "flex",
              gap: "6px",
            }}
          >
            {modeTabs.map((mode) => {
              const isActive = activeMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => handleModeChange(mode.id)}
                  style={{
                    background: isActive ? "#ff3b4f" : "#f8fafc",
                    border: isActive
                      ? "1.5px solid #ff3b4f"
                      : "1.5px solid #e2e8f0",
                    borderRadius: "20px",
                    padding: "5px 16px",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: isActive ? "#fff" : "#475569",
                    cursor: "pointer",
                    transition:
                      "background 0.2s, border-color 0.2s, color 0.2s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {mode.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel Row */}
        <div style={{ position: "relative" }}>
          <button
            className="__carArrow"
            onClick={() => scrollCarousel(-1)}
            style={leftArrowStyle(carLeft)}
            aria-label="Scroll carousel left"
          >
            <ChevronLeft size={16} />
          </button>

          <div
            ref={carouselRef}
            className="__ps"
            style={{
              display: "flex",
              gap: "16px",
              overflowX: "auto",
              scrollbarWidth: "none",
              scrollSnapType: "x mandatory",
              padding: "4px 32px 12px",
              alignItems: "stretch",
            }}
          >
            {filteredPrograms.length === 0 ? (
              <div
                style={{
                  flex: "0 0 100%",
                  borderRadius: "12px",
                  border: "1px dashed #e2e8f0",
                  padding: "48px",
                  textAlign: "center",
                  color: "#94a3b8",
                  fontSize: "14px",
                }}
              >
                No programs found for this category.
              </div>
            ) : (
              filteredPrograms.map((program) => (
                <article
                  key={program.id}
                  style={{
                    flex: "0 0 270px",
                    scrollSnapAlign: "start",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    background: "#ffffff",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    transition: "box-shadow 0.25s, transform 0.25s",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    position: "relative",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 8px 32px rgba(0,0,0,0.14)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 2px 12px rgba(0,0,0,0.08)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Image + Hover Overlay */}
                  <div className="__imgWrap">
                    <img
                      src={program.image}
                      alt={program.title}
                      loading="lazy"
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "0",
                        background: "#ff3b4f",
                        padding: "3px 10px 3px 12px",
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "#fff",
                        borderRadius: "0 4px 4px 0",
                        boxShadow: "0 2px 6px rgba(255,59,79,0.3)",
                        zIndex: 2,
                      }}
                    >
                      {program.ribbon}
                    </div>
                    {/* Mode Badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "10px",
                        background:
                          program.mode === "online" ? "#dcfce7" : "#fef3c7",
                        padding: "3px 8px",
                        fontSize: "10px",
                        fontWeight: 700,
                        color:
                          program.mode === "online" ? "#16a34a" : "#b45309",
                        borderRadius: "20px",
                        border:
                          program.mode === "online"
                            ? "1px solid #bbf7d0"
                            : "1px solid #fde68a",
                        textTransform: "capitalize",
                        zIndex: 2,
                      }}
                    >
                      {program.mode === "online" ? "🟢 Online" : "🟡 Offline"}
                    </div>

                    {/* Hover overlay - image size same, extra details show here */}
                    <div className="__cardOverlay">
                      <p className="__overlayText">{program.description}</p>
                      <ul className="__overlayList">
                        {program.highlights.map((h, i) => (
                          <li key={i}>
                            <CheckCircle2 size={11} color="#4ade80" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Body */}
                  <div
                    style={{
                      padding: "14px 14px 0",
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    <p
                      style={{
                        margin: "0 0 12px",
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#0f172a",
                        lineHeight: "1.45",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {program.title}
                    </p>

                    {/* Learners & Duration - Side by Side (AMNE SAMNE) */}
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        marginBottom: "14px",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "12px",
                          color: "#475569",
                        }}
                      >
                        <Users size={13} color="#64748b" strokeWidth={1.8} />
                        <span>{program.learners}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "12px",
                          color: "#475569",
                        }}
                      >
                        <Clock size={13} color="#64748b" strokeWidth={1.8} />
                        <span>{program.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div
                    style={{
                      padding: "12px 14px 14px",
                      display: "flex",
                      gap: "10px",
                      borderTop: "1px solid #f1f5f9",
                    }}
                  >
                    <a
                      href={program.slug}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "6px",
                        border: "1.5px solid #cbd5e1",
                        background: "#fff",
                        padding: "8px 10px",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#0f172a",
                        textDecoration: "none",
                        transition: "border-color 0.2s, background 0.2s",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#94a3b8";
                        e.currentTarget.style.background = "#f8fafc";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#cbd5e1";
                        e.currentTarget.style.background = "#fff";
                      }}
                    >
                      View Program
                    </a>
                    <a
                      href={program.slug}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "6px",
                        background: "#ff3b4f",
                        border: "1.5px solid #ff3b4f",
                        padding: "8px 10px",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#fff",
                        textDecoration: "none",
                        transition: "background 0.2s, border-color 0.2s",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#e02035";
                        e.currentTarget.style.borderColor = "#e02035";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#ff3b4f";
                        e.currentTarget.style.borderColor = "#ff3b4f";
                      }}
                    >
                      {program.isFree ? "Enroll Now" : "Get Brochure"}
                    </a>
                  </div>
                </article>
              ))
            )}
          </div>

          <button
            className="__carArrow"
            onClick={() => scrollCarousel(1)}
            style={rightArrowStyle(carRight)}
            aria-label="Scroll carousel right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
