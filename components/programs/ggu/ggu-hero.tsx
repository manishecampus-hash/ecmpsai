// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import {
//   Award,
//   BookOpen,
//   ChevronRight,
//   Clock,
//   CreditCard,
//   Download,
//   IndianRupee,
//   Sparkles,
// } from "lucide-react";

// // Full AI Overview copy that will be "typed" out on load
// const AI_OVERVIEW_TEXT =
//   "Golden Gate University offers DBA program for working professionals and business leaders. The Online DBA is a 3 years long postgraduate degree, and the DBA is a doctoral level program mainly made for senior professionals and managers. These programs are career focused and offers specializations like Finance, Marketing, Human Resource, International Business, Project Management, Strategy, Leadership and many more.";

// // Small reusable typewriter hook: reveals `text` one character at a time.
// function useTypewriter(text, { speed = 18, startDelay = 300 } = {}) {
//   const [displayedText, setDisplayedText] = useState("");
//   const [isDone, setIsDone] = useState(false);

//   useEffect(() => {
//     setDisplayedText("");
//     setIsDone(false);

//     let i = 0;
//     let intervalId;

//     const startTimeout = setTimeout(() => {
//       intervalId = setInterval(() => {
//         i += 1;
//         setDisplayedText(text.slice(0, i));

//         if (i >= text.length) {
//           clearInterval(intervalId);
//           setIsDone(true);
//         }
//       }, speed);
//     }, startDelay);

//     return () => {
//       clearTimeout(startTimeout);
//       clearInterval(intervalId);
//     };
//   }, [text, speed, startDelay]);

//   return { displayedText, isDone };
// }

// export default function GGUDoctorateHero() {
//   const [seatsLeft, setSeatsLeft] = useState(12);
//   const { displayedText: aiOverviewText, isDone: aiOverviewDone } =
//     useTypewriter(AI_OVERVIEW_TEXT, { speed: 16, startDelay: 400 });

//   // YouTube video id for the embedded frame (same pattern as the university hero section)
//   const youtubeVideoId = "2EcAN60qp0c";

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setSeatsLeft((prev) => (prev > 3 ? prev - 1 : prev));
//     }, 45000);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <section className="font-sans relative overflow-hidden border-b border-slate-100 bg-slate-50 pt-4 pb-4 lg:pt-6 lg:pb-6">
//       <div className="absolute inset-0 opacity-[0.03] [mask-image:linear-gradient(to_bottom,white,transparent)]">
//         <svg className="h-full w-full" fill="none" viewBox="0 0 400 400">
//           <defs>
//             <pattern
//               id="ggu-dba-grid"
//               width="40"
//               height="40"
//               patternUnits="userSpaceOnUse"
//             >
//               <path
//                 d="M0 40L40 40M40 0L40 40"
//                 stroke="currentColor"
//                 strokeWidth="1"
//               />
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#ggu-dba-grid)" />
//         </svg>
//       </div>

//       <div className="relative mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
//         <div className="grid items-center gap-12 lg:grid-cols-2">
//           <div>
//             <h1 className="text-3xl font-bold tracking-tight text-gray-900 leading-tight sm:text-4xl md:text-4xl lg:text-4xl">
//               Online DBA from{" "}
//               <span className="text-red-500">Golden Gate University</span>
//             </h1>

//             {/* AI Overview with typewriter effect */}
//             <div className="max-w-xl">
//               <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wide text-amber-600">
//                 <Sparkles className="h-3.5 w-3.5" />
//                 <div className="text-[#1e293b] text-[14px] font-medium">
//                   AI Overview
//                 </div>
//               </div>
//               <p className="text-sm leading-relaxed text-slate-600 sm:text-base min-h-[180px]">
//                 <span>{aiOverviewText}</span>
//                 <span
//                   className={`ml-0.5 inline-block h-4 w-[2px] translate-y-[2px] bg-red-500 sm:h-[18px] ${
//                     aiOverviewDone ? "animate-pulse" : ""
//                   }`}
//                   aria-hidden="true"
//                 />
//               </p>
//             </div>

//             <div className="mt-5 flex flex-wrap gap-4">
//               <Link
//                 href="#apply"
//                 className="inline-flex items-center gap-2 rounded-full bg-red-500 px-8 py-3 text-sm font-black text-white shadow-lg shadow-red-100 transition hover:bg-red-600"
//               >
//                 Apply Now
//                 <ChevronRight className="h-4 w-4" />
//               </Link>

//               <button
//                 type="button"
//                 className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
//               >
//                 <Download className="h-4 w-4" />
//                 Brochure
//               </button>
//             </div>
//           </div>

//           {/* RIGHT: VIDEO FRAME SECTION (direct YouTube embed, no thumbnail/modal) */}
//           <div className="relative">
//             <div className="relative z-10 overflow-hidden  shadow-2xl ring-1 ring-slate-200 rounded-xl">
//               <div className="w-full h-[260px] sm:h-[320px] md:h-[380px]">
//                 <iframe
//                   src={`https://www.youtube.com/embed/${youtubeVideoId}`}
//                   title="Golden Gate University DBA Program Overview"
//                   className="h-full w-full"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";

// import React from "react";
// import Link from "next/link";
// import {
//   BookOpen,
//   Clock,
//   Globe,
//   Users,
//   Star,
//   ChevronRight,
// } from "lucide-react";

// type Props = {
//   heroImage?: string;
//   logoImage?: string;
//   rating?: number;
//   reviews?: number;
//   trustedCount?: string;
// };

// export default function GGUHeroBanner({
//   heroImage = "/images/ggu-campus.jpg", // replace with actual hero image
//   logoImage = "/images/ggu-logo-square.png", // replace with actual logo
//   rating = 4.8,
//   reviews = 44,
//   trustedCount = "10,000+",
// }: Props) {
//   return (
//     <header className="relative">
//       {/* Hero banner */}
//       <div className="relative h-56 sm:h-72 lg:h-96">
//         <img
//           src="/ggubanner/ggubnr.webp"
//           alt="Golden Gate University campus"
//           className="absolute inset-0 h-full w-full object-cover"
//         />
//         {/* dark overlay to make text readable */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/25" />
//         {/* top-left title + logo inside banner */}
//         <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:py-8 lg:py-10">
//           <div className="flex items-center gap-4">
//             <div className="rounded-md bg-white/10 p-2">
//               <img
//                 src={logoImage}
//                 alt="GGU logo"
//                 className="h-12 w-12 object-contain"
//               />
//             </div>

//             <div>
//               <h1 className="text-white text-2xl sm:text-3xl font-extrabold">
//                 Golden Gate University
//               </h1>
//               <p className="mt-1 text-sm text-white/90">
//                 A Heritage of Excellence. A Future of Impact.
//               </p>
//             </div>

//             <span className="ml-4 inline-flex items-center rounded-full bg-sky-600/80 px-2 py-0.5 text-xs font-semibold text-white">
//               USA
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Overlapping card */}
//       <div className="mx-auto max-w-7xl px-4">
//         <div className="relative -mt-12 sm:-mt-16">
//           <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-100">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
//               {/* LEFT: main info */}
//               <div className="space-y-4">
//                 <div className="flex flex-wrap items-center gap-4">
//                   {/* accreditation badges (placeholder circles) */}
//                   <div className="flex items-center gap-3">
//                     <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold">
//                       WES
//                     </div>
//                     <div className="text-sm text-slate-600">WES Approved</div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold">
//                       AACSB
//                     </div>
//                     <div className="text-sm text-slate-600">
//                       AACSB Accredited
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3 ml-auto">
//                     <div className="flex items-center gap-1 text-amber-500">
//                       <Star className="h-4 w-4" />
//                       <span className="font-semibold">{rating}</span>
//                       <span className="text-sm text-slate-500">
//                         ({reviews} Reviews)
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <div className="text-sm text-slate-600">
//                     Trusted by{" "}
//                     <span className="font-semibold text-slate-800">
//                       {trustedCount}
//                     </span>{" "}
//                     learners
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap gap-3 items-center">
//                   <Link
//                     href="#apply"
//                     className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
//                   >
//                     Apply to University
//                     <ChevronRight className="h-4 w-4" />
//                   </Link>

//                   <button
//                     type="button"
//                     className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//                   >
//                     Talk to University
//                   </button>

//                   <button
//                     type="button"
//                     className="ml-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
//                   >
//                     Add to Compare +
//                   </button>
//                 </div>

//                 {/* Feature row inside left column for small screens (will also appear below on wide screens) */}
//                 <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
//                   <div className="flex items-start gap-3">
//                     <div className="rounded-lg bg-sky-50 p-2">
//                       <BookOpen className="h-5 w-5 text-sky-600" />
//                     </div>
//                     <div>
//                       <div className="text-sm font-semibold">100+ Programs</div>
//                       <div className="text-xs text-slate-500">
//                         Diverse specializations
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3">
//                     <div className="rounded-lg bg-sky-50 p-2">
//                       <Clock className="h-5 w-5 text-sky-600" />
//                     </div>
//                     <div>
//                       <div className="text-sm font-semibold">75+ Years</div>
//                       <div className="text-xs text-slate-500">
//                         Legacy & experience
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3">
//                     <div className="rounded-lg bg-sky-50 p-2">
//                       <Globe className="h-5 w-5 text-sky-600" />
//                     </div>
//                     <div>
//                       <div className="text-sm font-semibold">Global</div>
//                       <div className="text-xs text-slate-500">
//                         Diverse community
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3">
//                     <div className="rounded-lg bg-sky-50 p-2">
//                       <Users className="h-5 w-5 text-sky-600" />
//                     </div>
//                     <div>
//                       <div className="text-sm font-semibold">Career</div>
//                       <div className="text-xs text-slate-500">
//                         Focused learning
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* RIGHT: Compare panel */}
//               <aside className="w-full lg:w-auto">
//                 <div className="rounded-lg bg-slate-50 p-4">
//                   <h3 className="text-sm font-semibold text-slate-800">
//                     Compare Universities
//                   </h3>
//                   <p className="mt-1 text-xs text-slate-500">
//                     Compare GGU with other top universities.
//                   </p>

//                   <div className="mt-4 flex items-center gap-2">
//                     <div className="h-8 w-8 rounded-full bg-white/80 flex items-center justify-center text-xs">
//                       R
//                     </div>
//                     <div className="h-8 w-8 rounded-full bg-white/80 flex items-center justify-center text-xs">
//                       EU
//                     </div>
//                     <div className="h-8 w-8 rounded-full bg-white/80 flex items-center justify-center text-xs">
//                       +3
//                     </div>
//                   </div>

//                   <Link
//                     href="#compare"
//                     className="mt-4 inline-block text-sm font-semibold text-sky-600"
//                   >
//                     Compare Now &rarr;
//                   </Link>

//                   <div className="mt-4">
//                     <button className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold border border-slate-200">
//                       Talk to University
//                     </button>
//                   </div>
//                 </div>
//               </aside>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// "use client";

// import React from "react";
// import Link from "next/link";
// import {
//   Star,
//   ChevronRight,
//   MessageSquare,
//   BookOpen,
//   Clock,
//   Globe,
//   Users,
// } from "lucide-react";

// type Badge = { alt: string; src?: string; label?: string };

// type Props = {
//   heroImage?: string;
//   logoSrc?: string;
//   title?: string;
//   badges?: Badge[];
//   rating?: number;
//   reviews?: number;
//   trustedText?: string;
//   onApplyHref?: string;
//   onTalkHref?: string;
// };

// export default function GGUHeroFull({
//   heroImage = "/images/ggu-campus.jpg",
//   logoSrc = "/images/ggu-logo-square.png",
//   title = "Golden Gate University",
//   badges = [
//     { alt: "Seal", src: "/images/badge-seal.png", label: "" },
//     { alt: "WES", src: "/images/badge-wes.png", label: "WES" },
//     { alt: "AACSB", src: "/images/badge-aacsb.png", label: "AACSB" },
//     { alt: "More", src: undefined, label: "+" },
//   ],
//   rating = 4.8,
//   reviews = 44,
//   trustedText = "Trusted by 10,000+ learners",
//   onApplyHref = "#apply",
//   onTalkHref = "#talk",
// }: Props) {
//   return (
//     <header className="relative bg-white">
//       {/* Banner */}
//       <div className="relative h-56 sm:h-72 lg:h-96">
//         <img
//           src="/ggubanner/ggubnr.webp"
//           alt="Campus banner"
//           className="absolute inset-0 h-full w-full object-cover"
//         />
//         {/* overlay */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-transparent" />
//         {/* carousel dots (visual) */}
//         <div className="absolute inset-x-0 top-4 flex justify-center space-x-2">
//           <span className="h-2 w-2 rounded-full bg-white/90" />
//           <span className="h-2 w-2 rounded-full bg-white/40" />
//         </div>
//       </div>
//       {/* Overlapping white card below banner */}
//       <div className="mx-auto max-w-7xl px-4">
//         <div className="relative -mt-12 sm:-mt-16">
//           <div className="rounded-2xl bg-white px-6 py-6 shadow-lg ring-1 ring-slate-100">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
//               {/* LEFT: logo + title + badges + rating + Let's Talk */}
//               <div>
//                 <div className="flex items-start gap-6">
//                   {/* Square logo box */}
//                   <div className="flex-shrink-0">
//                     <div className="h-20 w-20 rounded-md bg-white shadow-sm border border-slate-100 flex items-center justify-center overflow-hidden">
//                       <img
//                         src={logoSrc}
//                         alt={`${title} logo`}
//                         className="h-full w-full object-contain"
//                       />
//                     </div>
//                   </div>

//                   {/* Title and badges */}
//                   <div className="min-w-0">
//                     <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">
//                       {title}
//                     </h2>

//                     <div className="mt-3 flex items-center gap-4 flex-wrap">
//                       <div className="flex items-center gap-3">
//                         {badges.map((b, i) => (
//                           <div
//                             key={i}
//                             className="flex items-center gap-2 text-sm"
//                           >
//                             {b.src ? (
//                               <img
//                                 src={b.src}
//                                 alt={b.alt}
//                                 className="h-8 w-8 rounded-full border border-slate-100 bg-white object-contain"
//                               />
//                             ) : (
//                               <div className="h-8 w-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-xs font-bold text-slate-700">
//                                 {b.label ?? "i"}
//                               </div>
//                             )}
//                             <span className="hidden sm:inline text-sm text-slate-600">
//                               {b.label}
//                             </span>
//                           </div>
//                         ))}

//                         {/* Rating */}
//                         <div className="ml-4 flex items-center gap-2">
//                           <div className="flex items-center gap-1 text-amber-500">
//                             <Star className="h-4 w-4" />
//                             <span className="font-semibold text-slate-800">
//                               {rating}
//                             </span>
//                           </div>
//                           <div className="text-sm text-slate-500">
//                             {reviews} Reviews
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* "Let's Talk" row */}
//                     <div className="mt-4 flex items-center gap-3 text-sm">
//                       <div className="text-slate-600">
//                         Not sure what you are looking for?
//                       </div>
//                       <Link
//                         href={onTalkHref}
//                         className="inline-flex items-center gap-2 text-sky-600 font-semibold"
//                       >
//                         <div className="flex -space-x-2">
//                           <img
//                             src="/images/avatar1.jpg"
//                             alt="advisor 1"
//                             className="h-8 w-8 rounded-full border-2 border-white shadow-sm"
//                           />
//                           <img
//                             src="/images/avatar2.jpg"
//                             alt="advisor 2"
//                             className="h-8 w-8 rounded-full border-2 border-white shadow-sm"
//                           />
//                           <img
//                             src="/images/avatar3.jpg"
//                             alt="advisor 3"
//                             className="h-8 w-8 rounded-full border-2 border-white shadow-sm"
//                           />
//                         </div>
//                         <span>Let's Talk</span>
//                         <ChevronRight className="h-4 w-4" />
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* RIGHT: CTAs + Add to Compare + trusted text */}
//               <div className="flex flex-col items-start lg:items-end gap-3">
//                 <div className="flex gap-3">
//                   <Link
//                     href={onApplyHref}
//                     className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700"
//                   >
//                     Apply to University
//                     <ChevronRight className="h-4 w-4" />
//                   </Link>

//                   <Link
//                     href={onTalkHref}
//                     className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 border border-slate-200 hover:bg-slate-100"
//                   >
//                     <MessageSquare className="h-4 w-4" />
//                     Talk to University
//                   </Link>
//                 </div>

//                 <button
//                   type="button"
//                   className="mt-2 inline-flex items-center gap-2 rounded-full border border-sky-300 text-sky-600 px-5 py-2 text-sm font-medium bg-white hover:bg-sky-50"
//                 >
//                   Add to Compare <span className="text-lg">+</span>
//                 </button>

//                 <div className="mt-2 text-xs text-slate-500 hidden lg:block">
//                   {trustedText}
//                 </div>
//               </div>
//             </div>

//             {/* Feature row (optional) */}
//             <div className="mt-6 border-t pt-4">
//               <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
//                 <div className="flex items-start gap-3">
//                   <div className="rounded-lg bg-sky-50 p-2">
//                     <BookOpen className="h-6 w-6 text-sky-600" />
//                   </div>
//                   <div>
//                     <div className="text-sm font-semibold">100+ Programs</div>
//                     <div className="text-xs text-slate-500">
//                       Diverse specializations
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-3">
//                   <div className="rounded-lg bg-sky-50 p-2">
//                     <Clock className="h-6 w-6 text-sky-600" />
//                   </div>
//                   <div>
//                     <div className="text-sm font-semibold">75+ Years</div>
//                     <div className="text-xs text-slate-500">
//                       Legacy & experience
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-3">
//                   <div className="rounded-lg bg-sky-50 p-2">
//                     <Globe className="h-6 w-6 text-sky-600" />
//                   </div>
//                   <div>
//                     <div className="text-sm font-semibold">Global</div>
//                     <div className="text-xs text-slate-500">
//                       Diverse community
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-3">
//                   <div className="rounded-lg bg-sky-50 p-2">
//                     <Users className="h-6 w-6 text-sky-600" />
//                   </div>
//                   <div>
//                     <div className="text-sm font-semibold">Career</div>
//                     <div className="text-xs text-slate-500">
//                       Focused learning
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>{" "}
//       {/* container */}
//     </header>
//   );
// }

"use client";

import React from "react";
import Link from "next/link";
import {
  Star,
  ChevronRight,
  MessageSquare,
  BookOpen,
  Clock,
  Globe,
  Users,
  Shield,
} from "lucide-react";

type Badge = { alt: string; src?: string; label?: string };

type Props = {
  heroImage?: string;
  logoSrc?: string;
  title?: string;
  badges?: Badge[];
  rating?: number;
  reviews?: number;
  trustedText?: string;
  onApplyHref?: string;
  onTalkHref?: string;
};

export default function GGUHeroFull({
  heroImage = "/images/ggu-campus.jpg",
  logoSrc = "/images/ggu-logo-square.png",
  title = "Golden Gate University",
  badges = [
    { alt: "Seal", src: "/ggubanner/aiu-logo.jpg", label: "" },
    { alt: "WES", src: "/ggubanner/wes-logo.jpg", label: "" },
    { alt: "AACSB", src: "/ggubanner/3rd.webp", label: "" },
    { alt: "More", src: undefined, label: "More" },
  ],
  rating = 4.8,
  reviews = 44,
  trustedText = "Trusted by 10,000+ learners",
  onApplyHref = "#apply",
  onTalkHref = "#talk",
}: Props) {
  return (
    <header className="relative bg-white">
      {/* Banner */}
      <div className="relative h-56 sm:h-72 lg:h-96">
        <img
          src="/ggubanner/ggubnr.webp"
          alt="Campus banner"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col items-start justify-center pl-16 pr-6 py-6 sm:pl-24 sm:pr-8 sm:py-8 lg:pl-32 lg:pr-12 lg:py-12">
          <div className="flex items-end gap-4">
            {/* Logo */}
            <div className="flex-shrink-0 bg-blue-900 border-2 border-white rounded-xl p-2">
              <img
                src={logoSrc}
                alt="GGU Logo"
                className="h-16 w-16 sm:h-20 sm:w-20 object-contain"
              />
            </div>

            {/* Text content */}
            <div className="text-white">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
                {title}
              </h1>
              <p className="text-base sm:text-lg text-white/90 mb-3">
                A Heritage of Excellence. A Future of Impact.
              </p>

              {/* Location badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/40 rounded-full px-3 py-1.5">
                <svg
                  className="w-4 h-4 text-red-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-white text-sm font-medium">USA</span>
              </div>
            </div>
          </div>
        </div>

        {/* carousel dots (visual) */}
        <div className="absolute inset-x-0 top-4 flex justify-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-white/90" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
        </div>
      </div>

      {/* Overlapping white card below banner */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative -mt-12 sm:-mt-16">
          <div className="rounded-2xl bg-white px-6 py-6 shadow-lg ring-1 ring-slate-100">
            {/* TOP ROW: Badges, Rating, Trusted Text | CTAs */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b">
              {/* LEFT: Badges + Rating + Trusted */}
              <div className="flex flex-col gap-3">
                {/* Badges row */}
                <div className="flex items-center gap-4 flex-wrap">
                  {badges.map((b, i) => (
                    <div key={i} className="flex items-center gap-2">
                      {b.src ? (
                        <img
                          src={b.src}
                          alt={b.alt}
                          className="h-10 w-10 rounded-full border border-slate-100 bg-white object-contain"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-xs font-bold text-slate-700">
                          {b.label?.[0] ?? "i"}
                        </div>
                      )}
                      <span className="text-xs font-medium text-slate-700">
                        {b.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Rating + Trusted */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                    <span className="ml-2 font-semibold text-slate-800">
                      {rating}
                    </span>
                    <span className="text-sm text-slate-600">
                      ({reviews} Reviews)
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Shield className="h-4 w-4 text-sky-600" />
                    <span>{trustedText}</span>
                  </div>
                </div>
              </div>

              {/* RIGHT: CTAs + Add to Compare */}
              <div className="flex flex-col gap-2 lg:gap-3">
                <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
                  <Link
                    href={onApplyHref}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ef4444] px-5 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
                  >
                    Apply to University
                    <ChevronRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href={onTalkHref}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-800 border border-slate-200 hover:bg-slate-50 transition"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Download Brochure
                  </Link>
                </div>
              </div>
            </div>

            {/* FEATURES SECTION: Heading + Grid + Compare Card */}
            <div className="pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
                {/* LEFT: Why Golden Gate University */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">
                    Why Golden Gate University?
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* 100+ Programs */}
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-blue-50 p-3 flex-shrink-0">
                        <BookOpen className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-slate-900">
                          100+
                        </div>
                        <div className="text-sm text-slate-600">Programs</div>
                        <div className="text-xs text-slate-500 mt-1">
                          Diverse specializations
                        </div>
                      </div>
                    </div>

                    {/* 75+ Years */}
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-blue-50 p-3 flex-shrink-0">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-slate-900">
                          75+
                        </div>
                        <div className="text-sm text-slate-600">
                          Years of Legacy
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          Experience & excellence
                        </div>
                      </div>
                    </div>

                    {/* Global */}
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-blue-50 p-3 flex-shrink-0">
                        <Globe className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-slate-900">
                          Global
                        </div>
                        <div className="text-sm text-slate-600">Community</div>
                        <div className="text-xs text-slate-500 mt-1">
                          Diverse student body
                        </div>
                      </div>
                    </div>

                    {/* Career Focused */}
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-blue-50 p-3 flex-shrink-0">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-slate-900">
                          Career
                        </div>
                        <div className="text-sm text-slate-600">Focused</div>
                        <div className="text-xs text-slate-500 mt-1">
                          Job-ready learning
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT: Compare Universities Card */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 h-fit">
                  <h4 className="font-bold text-slate-900 mb-4">
                    Compare Universities
                  </h4>
                  <p className="text-sm text-slate-600 mb-6">
                    Compare GGU with other top universities.
                  </p>

                  {/* University Logos */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex -space-x-3">
                      <img
                        src="/ggubanner/ssbm.png"
                        alt="University 1"
                        className="h-12 w-12 rounded-full border-2 border-white bg-white shadow"
                      />
                      <img
                        src="/ggubanner/rushford.png"
                        alt="University 2"
                        className="h-12 w-12 rounded-full border-2 border-white bg-white shadow"
                      />
                      <img
                        src="/ggubanner/ei.png"
                        alt="University 3"
                        className="h-12 w-12 rounded-full border-2 border-white bg-white shadow"
                      />
                      <div className="h-12 w-12 rounded-full border-2 border-white bg-blue-600 shadow flex items-center justify-center text-white text-sm font-bold">
                        +3
                      </div>
                    </div>
                  </div>

                  <Link
                    href="#compare"
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-700 transition"
                  >
                    Compare Now
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
