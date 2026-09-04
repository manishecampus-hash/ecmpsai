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
      ? "h-32 w-32 text-3xl"
      : "h-9 w-9 text-[10px]";

  return (
    <div
      className={`overflow-hidden rounded-full ${sizeClass}`}
    >
      {graduate.avatarSrc ? (
        <img
          src={graduate.avatarSrc}
          alt={graduate.name}
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
    <div className="relative mx-auto w-full max-w-[980px]">
      <div className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.10)]">

        {/* Top Accent */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-500 to-transparent" />

        <div className="grid min-h-[430px] md:grid-cols-[0.9fr_1.5fr]">

          {/* =================================================
              LEFT PROFILE
          ================================================= */}

          <div className="relative flex flex-col items-center justify-center overflow-hidden bg-white px-8 py-10 text-center md:px-10">

            {/* DP */}
            <div className="relative mb-5">
              <div className="absolute -inset-2 rounded-full border border-red-200" />

              <div className="relative h-32 w-32 overflow-hidden rounded-full border-[6px] border-white bg-white shadow-lg">
                <ProfileAvatar
                  graduate={graduate}
                  size="large"
                />
              </div>
            </div>

            <h3 className="relative text-lg font-extrabold text-slate-900">
              {graduate.name}
            </h3>

            <p className="relative mt-1 text-sm font-medium text-slate-500">
              {graduate.role}
            </p>

            <div className="relative mt-4">
              <StarRating rating={graduate.rating} />
            </div>
          </div>

          {/* =================================================
              RIGHT TESTIMONIAL
          ================================================= */}

          <div className="relative flex flex-col justify-center px-7 py-10 sm:px-10 md:px-14">

            {/* Quote */}
            <div className="absolute right-8 top-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-red-500">
              <Quote
                className="h-8 w-8"
                fill="currentColor"
              />
            </div>

            {/* Label */}
            <div className="mb-5 flex items-center gap-2">
              <span className="h-1.5 w-8 rounded-full bg-red-500" />

              <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-red-500">
                Graduate Experience
              </span>
            </div>

            {/* Testimonial */}
            <p className="max-w-[690px] text-lg font-semibold leading-[1.65] text-slate-800 sm:text-xl md:text-2xl">
              "{graduate.testimonial}"
            </p>

            {/* Bottom */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">

              <div>
                <p className="text-sm font-bold text-slate-900">
                  Career transformation
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Real experience from our graduate community
                </p>
              </div>

              {/* =================================================
                  READ FULL STORY
              ================================================= */}

              <button
                type="button"
                onClick={() => onOpen(graduate)}
                className="rounded-full border border-red-500 bg-white px-5 py-2.5 text-xs font-bold text-red-500 transition hover:bg-red-500 hover:text-white"
              >
                Read Full Story
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
    setActiveIndex((prev) => {
      if (prev === 0) {
        return graduates.length - 1;
      }

      return prev - 1;
    });
  };

  const next = () => {
    setActiveIndex((prev) => {
      return (prev + 1) % graduates.length;
    });
  };

  /* =======================================================
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

      <section className="relative w-full overflow-hidden bg-white">

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-6 text-center">

            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-red-500 shadow-sm">
              <Trophy className="h-4 w-4" />

             
            </div>


 <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
               Success Stories What Our{" "}
              <span className="text-red-500">Graduates</span>
            </h2>

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
              ARROWS + DOTS
          ================================================= */}

          <div className="mt-5 flex items-center justify-center gap-5">

            {/* Previous */}
            <button
              type="button"
              onClick={previous}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {graduates.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Show testimonial ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "w-8 bg-red-500"
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            {/* Next */}
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-100"
            >
              <ArrowRight className="h-5 w-5" />
            </button>

          </div>

          {/* =================================================
              MINI DP NAVIGATION
          ================================================= */}

          <div className="mt-5 flex justify-center">

            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">

              {graduates.slice(0, 5).map((graduate, index) => (
                <button
                  key={`${graduate.name}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show ${graduate.name}`}
                  className={`relative h-9 w-9 overflow-hidden rounded-full border-2 transition-all duration-300 ${
                    activeIndex === index
                      ? "scale-110 border-red-500"
                      : "border-white opacity-55 hover:opacity-100"
                  }`}
                >
                  <ProfileAvatar
                    graduate={graduate}
                    size="small"
                  />
                </button>
              ))}

            </div>
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
                  alt={`${selected.name} full story`}
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