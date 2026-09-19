// "use client";

// import { Handshake, Star, X } from "lucide-react";
// import React, { useEffect, useRef, useState } from "react";
// import { DEFAULT_GRADUATES, GraduateTestimonialT } from "@/data/graduates";

// const StarRating = ({ rating }: { rating: number }) => (
//   <div style={{ display: "flex", gap: 3, marginTop: 8 }}>
//     {Array.from({ length: 5 }).map((_, i) => (
//       <Star
//         key={i}
//         size={13}
//         fill={i < Math.round(rating) ? "#facc15" : "none"}
//         color={i < Math.round(rating) ? "#facc15" : "#d1d5db"}
//         strokeWidth={1.5}
//       />
//     ))}
//   </div>
// );

// const GraduateCard = ({
//   graduate,
//   onOpen,
// }: {
//   graduate: GraduateTestimonialT;
//   onOpen: (g: GraduateTestimonialT) => void;
// }) => (
//   <div
//     className="__gradCard"
//     onClick={() => onOpen(graduate)}
//     role="button"
//     tabIndex={0}
//     onKeyDown={(e) => {
//       if (e.key === "Enter" || e.key === " ") onOpen(graduate);
//     }}
//   >
//     {/* Image */}
//     <div className="__gradCardImage">
//       {graduate.avatarSrc ? (
//         <img
//           src={graduate.avatarSrc}
//           alt={graduate.name}
//           style={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             objectPosition: "center top",
//           }}
//         />
//       ) : (
//         <div
//           style={{
//             width: "100%",
//             height: "100%",
//             background: graduate.avatarColor,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: 28,
//             fontWeight: 800,
//             color: "#fff",
//           }}
//         >
//           {graduate.initials}
//         </div>
//       )}
//     </div>

//     {/* Info overlay on hover */}
//     <div className="__gradCardOverlay">
//       <div className="__gradCardContent">
//         <p className="__gradCardQuote">
//           "
//           {graduate.testimonial ??
//             "This program completely transformed my career path and gave me the confidence to grow."}
//           "
//         </p>
//         <div className="__gradCardMeta">
//           <p
//             style={{ margin: 0, fontSize: 13, fontWeight: 800, color: "#fff" }}
//           >
//             {graduate.name}
//           </p>
//           <p style={{ margin: "3px 0 0", fontSize: 11.5, color: "#cbd5e1" }}>
//             {graduate.role}
//           </p>
//         </div>
//       </div>
//     </div>

//     {/* Default info (below image) */}
//     <div className="__gradCardInfo">
//       <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#111" }}>
//         {graduate.name}
//       </p>
//       <p
//         style={{
//           margin: "2px 0 0",
//           fontSize: 12,
//           color: "#666",
//           fontWeight: 500,
//         }}
//       >
//         {graduate.role}
//       </p>
//       <StarRating rating={graduate.rating} />
//     </div>
//   </div>
// );

// const GraduateSlider = ({
//   graduates,
//   onOpen,
// }: {
//   graduates: GraduateTestimonialT[];
//   onOpen: (g: GraduateTestimonialT) => void;
// }) => {
//   const trackRef = useRef<HTMLDivElement | null>(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const isInteractingRef = useRef(false);
//   const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
//     null,
//   );

//   const handleScroll = () => {
//     const el = trackRef.current;
//     if (!el) return;
//     const slideWidth = el.firstElementChild
//       ? (el.firstElementChild as HTMLElement).getBoundingClientRect().width + 16
//       : el.clientWidth;
//     const index = Math.round(el.scrollLeft / slideWidth);
//     setActiveIndex(Math.min(graduates.length - 1, Math.max(0, index)));
//   };

//   const scrollToIndex = (index: number) => {
//     const el = trackRef.current;
//     if (!el) return;
//     const slideEl = el.children[index] as HTMLElement | undefined;
//     if (slideEl) {
//       el.scrollTo({ left: slideEl.offsetLeft - 16, behavior: "smooth" });
//     }
//   };

//   const startAutoplay = () => {
//     if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);

//     autoplayIntervalRef.current = setInterval(() => {
//       if (isInteractingRef.current) return;
//       setActiveIndex((prev) => {
//         const next = (prev + 1) % graduates.length;
//         scrollToIndex(next);
//         return next;
//       });
//     }, 4000);
//   };

//   // Auto-advance every few seconds
//   useEffect(() => {
//     if (graduates.length <= 1) return;
//     startAutoplay();
//     return () => {
//       if (autoplayIntervalRef.current)
//         clearInterval(autoplayIntervalRef.current);
//     };
//   }, [graduates.length]);

//   const pauseAutoplay = () => {
//     isInteractingRef.current = true;
//     if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
//     if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
//   };

//   const resumeAutoplaySoon = () => {
//     if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
//     resumeTimeoutRef.current = setTimeout(() => {
//       isInteractingRef.current = false;
//       startAutoplay();
//     }, 5000);
//   };

//   return (
//     <div className="__gradSliderWrap">
//       <div
//         className="__gradSliderTrack"
//         ref={trackRef}
//         onScroll={handleScroll}
//         onTouchStart={pauseAutoplay}
//         onTouchEnd={resumeAutoplaySoon}
//         onPointerDown={pauseAutoplay}
//         onPointerUp={resumeAutoplaySoon}
//       >
//         {graduates.map((graduate, index) => (
//           <div className="__gradSlide" key={`${graduate.name}-slide-${index}`}>
//             <GraduateCard graduate={graduate} onOpen={onOpen} />
//           </div>
//         ))}
//       </div>

//       {/* Navigation dots */}
//       <div className="__gradDots">
//         {graduates.map((_, index) => (
//           <button
//             key={index}
//             aria-label={`Go to testimonial ${index + 1}`}
//             className={`__gradDot ${index === activeIndex ? "__gradDotActive" : ""}`}
//             onClick={() => {
//               pauseAutoplay();
//               scrollToIndex(index);
//               resumeAutoplaySoon();
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const GraduateModal = ({
//   graduate,
//   onClose,
// }: {
//   graduate: GraduateTestimonialT;
//   onClose: () => void;
// }) => {
//   const [entered, setEntered] = useState(false);

//   React.useEffect(() => {
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };
//     document.addEventListener("keydown", onKey);
//     document.body.style.overflow = "hidden";
//     const raf = requestAnimationFrame(() => setEntered(true));
//     return () => {
//       document.removeEventListener("keydown", onKey);
//       document.body.style.overflow = "";
//       cancelAnimationFrame(raf);
//     };
//   }, [onClose]);

//   return (
//     <div
//       className={`__gradModal ${entered ? "__gradModalActive" : ""}`}
//       onClick={onClose}
//     >
//       <div className="__gradModalBox" onClick={(e) => e.stopPropagation()}>
//         <button
//           className="__gradModalClose"
//           onClick={onClose}
//           aria-label="Close modal"
//         >
//           <X size={20} />
//         </button>

//         <div className="__gradModalImage">
//           {graduate.avatarSrc ? (
//             <img
//               src={graduate.avatarSrc}
//               alt={graduate.name}
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//                 objectPosition: "center top",
//               }}
//             />
//           ) : (
//             <div
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 background: graduate.avatarColor,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 48,
//                 fontWeight: 800,
//                 color: "#fff",
//               }}
//             >
//               {graduate.initials}
//             </div>
//           )}
//         </div>

//         <div className="__gradModalBody">
//           <p
//             style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#111" }}
//           >
//             {graduate.name}
//           </p>
//           <p style={{ margin: "4px 0 8px", fontSize: 13.5, color: "#666" }}>
//             {graduate.role}
//           </p>
//           <StarRating rating={graduate.rating} />
//           <p className="__gradModalQuote">
//             "
//             {graduate.testimonial ??
//               "This program completely transformed my career path and gave me the confidence to grow."}
//             "
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export function GraduatesMarquee({
//   graduates = DEFAULT_GRADUATES,
// }: {
//   graduates?: GraduateTestimonialT[];
// }) {
//   const [selected, setSelected] = useState<GraduateTestimonialT | null>(null);

//   return (
//    <section className="relative z-10 w-full">
//       <style>{`
//        .__gradSection {
//   background: #ffffff;
//   padding: 0;
// }

//         .__gradContainer {
//           max-width: 1280px;
//           margin: 0 auto;
//           padding: 0 16px;
//         }

//         @media (min-width: 640px) {
//           .__gradContainer {
//             padding: 0 24px;
//           }
//         }

//         @media (min-width: 1024px) {
//           .__gradContainer {
//             padding: 0 64px;
//           }
//         }

//         /* Header */
//       .__gradHeader {
//   text-align: center;
//   margin-bottom: 24px;
// }

//         @media (max-width: 768px) {
//           .__gradHeader {
//             margin-bottom: 40px;
//           }
//         }

//         .__gradBadge {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           background: #f9fafb;
//           border: 1px solid #e5e7eb;
//           border-radius: 9999px;
//           padding: 8px 16px;
//           font-size: 11px;
//           font-weight: 700;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//           color: #111;
//           margin-bottom: 12px;
//         }

//         .__gradTitle {
//           font-size: 36px;
//           font-weight: 800;
//           line-height: 1.2;
//           color: #111;
//           margin: 0;
//           letter-spacing: -0.5px;
//         }

//         @media (max-width: 1024px) {
//           .__gradTitle {
//             font-size: 28px;
//           }
//         }

//         @media (max-width: 640px) {
//           .__gradTitle {
//             font-size: 24px;
//           }
//         }

//         .__gradTitle .highlight {
//           color: #ef4444;
//         }

//         /* Card */
//         .__gradCard {
//           cursor: pointer;
//           border-radius: 12px;
//           overflow: hidden;
//           background: #fff;
//           border: 1px solid #e5e7eb;
//           transition: all 0.3s ease;
//           display: flex;
//           flex-direction: column;
//           height: 100%;
//         }

//         .__gradCard:hover {
//           border-color: #d1d5db;
//           box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
//           transform: translateY(-4px);
//         }

//         .__gradCardImage {
//           width: 100%;
//           height: 240px;
//           background: #f3f4f6;
//           overflow: hidden;
//           position: relative;
//         }

//         .__gradCardImage img {
//           transition: transform 0.4s ease, filter 0.3s ease;
//         }

//         .__gradCard:hover .__gradCardImage img {
//           transform: scale(1.08);
//           filter: brightness(0.7);
//         }

//         /* Overlay on image on hover */
//         .__gradCardOverlay {
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 100%);
//           padding: 20px;
//           display: flex;
//           flex-direction: column;
//           justify-content: flex-end;
//           opacity: 0;
//           transition: opacity 0.35s ease;
//           pointer-events: none;
//         }

//         .__gradCard:hover .__gradCardOverlay {
//           opacity: 1;
//           pointer-events: auto;
//         }

//         .__gradCardContent {
//           display: flex;
//           flex-direction: column;
//           gap: 12px;
//         }

//         .__gradCardQuote {
//           margin: 0;
//           font-size: 13px;
//           line-height: 1.6;
//           color: #f3f4f6;
//           font-style: italic;
//           display: -webkit-box;
//           -webkit-line-clamp: 3;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }

//         .__gradCardMeta {
//           border-top: 1px solid rgba(255, 255, 255, 0.2);
//           padding-top: 8px;
//         }

//         .__gradCardMeta p {
//           margin: 0;
//         }

//         /* Info below image */
//         .__gradCardInfo {
//           padding: 16px;
//           flex-grow: 1;
//           display: flex;
//           flex-direction: column;
//           justify-content: flex-start;
//         }

//         .__gradCardInfo p {
//           margin: 0;
//         }

//         /* Modal */
//         .__gradModal {
//           position: fixed;
//           inset: 0;
//           background: rgba(17, 24, 39, 0.92);
//           z-index: 1000;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 20px;
//           opacity: 0;
//           visibility: hidden;
//           transition: opacity 0.3s ease, visibility 0.3s ease;
//         }

//         .__gradModal.__gradModalActive {
//           opacity: 1;
//           visibility: visible;
//         }

//         .__gradModalBox {
//           position: relative;
//           width: 100%;
//           max-width: 500px;
//           background: #fff;
//           border-radius: 16px;
//           overflow: hidden;
//           box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
//           max-height: 90vh;
//           display: flex;
//           flex-direction: column;
//           transform: scale(0.95);
//           opacity: 0;
//           transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
//         }

//         .__gradModal.__gradModalActive .__gradModalBox {
//           transform: scale(1);
//           opacity: 1;
//         }

//         .__gradModalClose {
//           position: absolute;
//           top: 12px;
//           right: 12px;
//           z-index: 10;
//           width: 36px;
//           height: 36px;
//           border-radius: 50%;
//           border: none;
//           background: #fff;
//           color: #111;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           transition: all 0.2s ease;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
//         }

//         .__gradModalClose:hover {
//           background: #f3f4f6;
//           transform: scale(1.08);
//         }

//         .__gradModalImage {
//           width: 100%;
//           height: 320px;
//           background: #f3f4f6;
//           overflow: hidden;
//         }

//         .__gradModalImage img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           object-position: center top;
//         }

//         .__gradModalBody {
//           padding: 24px;
//           overflow-y: auto;
//           flex-grow: 1;
//         }

//         .__gradModalBody p {
//           margin: 0;
//         }

//         .__gradModalQuote {
//           margin-top: 16px;
//           font-size: 14px;
//           line-height: 1.7;
//           color: #374151;
//           font-style: italic;
//         }

//         @media (max-width: 640px) {
//           .__gradModalImage {
//             height: 280px;
//           }

//           .__gradModalBody {
//             padding: 20px;
//           }

//           .__gradModalBox {
//             max-width: 100%;
//           }
//         }

//         /* Slider (now on all devices) */
//         .__gradSliderWrap {
//           display: block;
//         }

//         .__gradSliderTrack {
//           display: flex;
//           gap: 16px;
//           overflow-x: auto;
//           scroll-snap-type: x mandatory;
//           -webkit-overflow-scrolling: touch;
//           padding: 8px 16px;
//           margin: 0 -16px;
//           box-sizing: border-box;
//           scrollbar-width: none;
//         }

//         .__gradSliderTrack::-webkit-scrollbar {
//           display: none;
//         }

//         .__gradSlide {
//           flex: 0 0 calc(33.333% - 11px);
//           box-sizing: border-box;
//           scroll-snap-align: start;
//         }

//         @media (max-width: 1024px) {
//           .__gradSlide {
//             flex: 0 0 calc(50% - 8px);
//           }
//         }

//         @media (max-width: 640px) {
//           .__gradSlide {
//             flex: 0 0 calc(100% - 32px);
//           }

//           .__gradSliderTrack {
//             gap: 12px;
//             padding: 8px 16px;
//           }
//         }

//         /* Dots */
//         .__gradDots {
//           display: flex;
//           justify-content: center;
//           gap: 8px;
//           margin-top: 20px;
//           padding: 0 16px;
//         }

//         .__gradDot {
//           width: 8px;
//           height: 8px;
//           border-radius: 50%;
//           border: none;
//           background: #d1d5db;
//           padding: 0;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .__gradDot:hover {
//           background: #9ca3af;
//         }

//         .__gradDotActive {
//           background: #ef4444;
//           width: 24px;
//           border-radius: 4px;
//         }

//         @media (max-width: 1024px) {
//           .__gradDots {
//             margin-top: 16px;
//           }
//         }
//       `}</style>

//       <div className="__gradContainer">
//         {/* Header */}
//         <div className="__gradHeader">
//           <div className="__gradBadge">
//             <Handshake size={14} style={{ color: "#ef4444" }} />
//             Success Stories
//           </div>
//           <h2 className="__gradTitle">
//             What Our Graduates <span className="highlight">Say</span>
//           </h2>
//         </div>

//         {/* Slider (All Devices) */}
//         <GraduateSlider graduates={graduates} onOpen={setSelected} />
//       </div>

//       {/* Modal */}
//       {selected && (
//         <GraduateModal graduate={selected} onClose={() => setSelected(null)} />
//       )}
//     </section>
//   );
// }


"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Quote,
  Star,
  Trophy,
  X,
} from "lucide-react";

import {
  DEFAULT_GRADUATES,
  GraduateTestimonialT,
} from "@/data/graduates";

/* =========================================================
   STAR RATING
========================================================= */

function StarRating({
  rating,
}: {
  rating: number;
}) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4"
          fill={i < Math.round(rating) ? "#fbbf24" : "transparent"}
          color={i < Math.round(rating) ? "#fbbf24" : "#cbd5e1"}
          strokeWidth={1.8}
        />
      ))}
    </div>
  );
}

/* =========================================================
   PROFILE DP
   ONLY avatarSrc IS USED HERE
========================================================= */

function ProfileAvatar({
  graduate,
  size = "large",
}: {
  graduate: GraduateTestimonialT;
  size?: "large" | "small";
}) {
  const sizeClass =
    size === "large"
      ? "h-24 w-24 sm:h-28 sm:w-28 text-2xl"
      : "h-full w-full text-[10px]";

  return (
    <div
      className={`overflow-hidden rounded-full ${sizeClass}`}
    >
      {graduate.avatarSrc ? (
        <img
          src={graduate.avatarSrc}
          alt={(graduate as any).altText || graduate.name}
          className="h-full w-full object-cover object-center"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center font-black text-white"
          style={{
            background: graduate.avatarColor,
          }}
        >
          {graduate.initials}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   FEATURED TESTIMONIAL
========================================================= */

function FeaturedGraduate({
  graduate,
  onOpen,
}: {
  graduate: GraduateTestimonialT;
  onOpen: (graduate: GraduateTestimonialT) => void;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[880px]">
      <div className="group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_12px_36px_rgba(15,23,42,0.06)] hover:shadow-[0_18px_48px_rgba(15,23,42,0.1)] transition-all duration-300">
        {/* Top Accent Line */}
        <div className="h-1 w-full bg-gradient-to-r from-red-500/20 via-red-500 to-red-500/20" />

        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {/* =================================================
              LEFT PROFILE COLUMN
          ================================================= */}
          <div className="relative flex flex-col items-center justify-center bg-slate-50/50 md:bg-white p-7 text-center">
            {/* DP */}
            <div className="relative mb-3.5">
              <div className="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full ring-4 ring-red-100/70 p-1 bg-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                <ProfileAvatar graduate={graduate} size="large" />
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
              {graduate.name}
            </h3>

            <p className="mt-0.5 text-xs sm:text-sm font-medium text-slate-500">
              {graduate.role}
            </p>

            <div className="mt-2.5">
              <StarRating rating={graduate.rating} />
            </div>

            <span className="mt-3.5 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10.5px] font-semibold text-emerald-700 border border-emerald-200/60 shadow-2xs">
              <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Verified Graduate
            </span>
          </div>

          {/* =================================================
              RIGHT TESTIMONIAL COLUMN
          ================================================= */}
          <div className="relative flex flex-col justify-between p-7 sm:p-9 lg:p-10">
            {/* Header: Badge & Quote Icon */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50/70 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-red-600">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                Graduate Experience
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-500 shadow-2xs">
                <Quote className="h-4 w-4 fill-current" />
              </div>
            </div>

            {/* Testimonial Quote */}
            <blockquote className="my-2 sm:my-3 text-lg sm:text-xl lg:text-2xl font-bold leading-relaxed text-slate-800 tracking-tight">
              "{graduate.testimonial}"
            </blockquote>

            {/* Bottom Meta & Read Full Story */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">
                  Career transformation
                </p>
                <p className="mt-0.5 text-[11px] sm:text-xs text-slate-500">
                  Real experience from our graduate community
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpen(graduate)}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-red-500 bg-white px-5 py-2 text-xs font-bold text-red-600 shadow-2xs hover:bg-red-500 hover:text-white transition-all duration-200 active:scale-95 group/btn"
              >
                Read Full Story
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export function GraduatesMarquee({
  graduates = DEFAULT_GRADUATES,
}: {
  graduates?: GraduateTestimonialT[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const [selected, setSelected] =
    useState<GraduateTestimonialT | null>(null);

  /* =======================================================
     AUTOPLAY
  ======================================================= */

  useEffect(() => {
    if (graduates.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        return (prev + 1) % graduates.length;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [graduates.length]);

  const activeGraduate = graduates[activeIndex];

  /* =======================================================
     NAVIGATION
  ======================================================= */

  const previous = () => {
    setActiveIndex((prev) => (prev === 0 ? graduates.length - 1 : prev - 1));
  };

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % graduates.length);
  };  /* =======================================================
     CLOSE MODAL WITH ESC
  ======================================================= */

  useEffect(() => {
    if (!selected) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected]);

  return (
    <>
      {/* =====================================================
          TESTIMONIAL SECTION
      ===================================================== */}

      <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-slate-50/40 to-white py-12 sm:py-16 lg:py-20">
        {/* Subtle ambient decorative glows */}
        <div className="pointer-events-none absolute -left-20 top-16 h-60 w-60 rounded-full bg-red-100/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-10 h-60 w-60 rounded-full bg-red-100/25 blur-3xl" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
          {/* =================================================
              HEADER
          ================================================= */}
          <div className="mb-10 sm:mb-12 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200/80 bg-red-50/80 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-red-600 shadow-2xs">
              <Trophy className="h-3.5 w-3.5 text-red-500" />
              Success Stories
            </span>

            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Success Stories — What Our{" "}
              <span className="text-red-500">Graduates Say</span>
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-normal">
              Real career transformations, student experiences, and reviews from our alumni community.
            </p>

            <div className="h-1 w-12 bg-red-500 mx-auto mt-3.5 rounded-full shadow-[0_2px_8px_rgba(239,68,68,0.35)]" />
          </div>

          {/* =================================================
              FEATURED TESTIMONIAL
          ================================================= */}
          {activeGraduate && (
            <FeaturedGraduate
              graduate={activeGraduate}
              onOpen={setSelected}
            />
          )}

          {/* =================================================
              CAROUSEL CONTROLS: PREVIOUS / NEXT & PROGRESS
          ================================================= */}
          <div className="mt-8 flex items-center justify-center gap-4">
            {/* Previous Button */}
            <button
              type="button"
              onClick={previous}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-700 shadow-sm transition-all duration-200 hover:border-red-300 hover:bg-red-50/60 hover:text-red-600 hover:shadow-md active:scale-95 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            </button>

            {/* Slide Progress Dots */}
            <div className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-4 py-2.5 shadow-xs">
              {graduates.map((_, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to testimonial ${index + 1}`}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-8 bg-red-500 shadow-xs shadow-red-500/30"
                        : "w-2 bg-slate-200 hover:bg-slate-300"
                    }`}
                  />
                );
              })}
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-700 shadow-sm transition-all duration-200 hover:border-red-300 hover:bg-red-50/60 hover:text-red-600 hover:shadow-md active:scale-95 group"
            >
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>

        </div>
      </section>

      {/* =====================================================
          FULL STORY MODAL

          IMPORTANT:
          storySrc is used ONLY here.
          avatarSrc is NOT used here.
      ===================================================== */}

      {selected && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative flex max-h-[94vh] w-full max-w-[650px] flex-col overflow-hidden rounded-[24px] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* =================================================
                CLOSE BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-800 shadow-lg transition hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>

            {/* =================================================
                FULL STORY IMAGE
            ================================================= */}

            {selected.storySrc ? (
              <div className="max-h-[72vh] w-full overflow-y-auto bg-white">
                <img
                  src={selected.storySrc}
                  alt={(selected as any).altText ? `${(selected as any).altText} - Full Story` : `${selected.name} full story`}
                  className="mx-auto block h-auto w-full object-contain"
                />
              </div>
            ) : (
              <div className="flex min-h-[350px] items-center justify-center bg-slate-50 px-6 text-center">
                <div>
                  <p className="text-base font-bold text-slate-700">
                    Story image not available
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Please add a storySrc for this testimonial.
                  </p>
                </div>
              </div>
            )}

            {/* =================================================
                DETAILS
            ================================================= */}

            <div className="shrink-0 border-t border-slate-100 bg-white px-6 py-5 text-center sm:px-8">

              <h3 className="text-xl font-black text-slate-900">
                {selected.name}
              </h3>

              <p className="mt-1 text-sm font-medium text-slate-500">
                {selected.role}
              </p>

              <div className="mt-3 flex justify-center">
                <StarRating
                  rating={selected.rating}
                />
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
}