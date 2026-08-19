// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { Download } from "lucide-react";
// import Image from "next/image";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import {
//   ApplicationForm,
//   type LeadData,
// } from "../discovery/degree-finder/application-form";
// import {
//   Sparkles,
//   Users,
//   Globe,
//   BookOpen,
//   Building2,
//   CheckCircle2,
// } from "lucide-react";

// interface HeroSectionProps {
//   university?: {
//     name?: string;
//     fullName?: string;
//     image?: string;
//   };
//   stats?: {
//     learners?: string;
//     countries?: string;
//     programs?: string;
//     campuses?: string;
//   };
// }

// // Parses a string like "50,000+" into { prefix: "", number: 50000, suffix: "+" }
// function parseStatValue(value: string) {
//   const match = value.match(/^([^\d]*)([\d,]+)(.*)$/);
//   if (!match) {
//     return { prefix: "", number: 0, suffix: value, hasNumber: false };
//   }
//   const [, prefix, numStr, suffix] = match;
//   const number = parseInt(numStr.replace(/,/g, ""), 10);
//   return { prefix, number, suffix, hasNumber: true };
// }

// function formatWithCommas(num: number) {
//   return num.toLocaleString("en-US");
// }

// // Animates a count from 0 up to the target number once triggered
// function useCountUp(target: number, shouldStart: boolean, duration = 1500) {
//   const [value, setValue] = useState(0);
//   const frameRef = useRef<number | null>(null);

//   useEffect(() => {
//     if (!shouldStart) return;

//     const startTime = performance.now();

//     const tick = (now: number) => {
//       const elapsed = now - startTime;
//       const progress = Math.min(elapsed / duration, 1);
//       const eased = 1 - Math.pow(1 - progress, 3);
//       setValue(Math.round(eased * target));

//       if (progress < 1) {
//         frameRef.current = requestAnimationFrame(tick);
//       }
//     };

//     frameRef.current = requestAnimationFrame(tick);

//     return () => {
//       if (frameRef.current) cancelAnimationFrame(frameRef.current);
//     };
//   }, [shouldStart, target, duration]);

//   return value;
// }

// function AnimatedStatValue({
//   value,
//   isVisible,
// }: {
//   value: string;
//   isVisible: boolean;
// }) {
//   const { prefix, number, suffix, hasNumber } = parseStatValue(value);
//   const animatedNumber = useCountUp(number, isVisible);

//   if (!hasNumber) return <>{value}</>;

//   return (
//     <>
//       {prefix}
//       {formatWithCommas(animatedNumber)}
//       {suffix}
//     </>
//   );
// }

// // Reveals `text` one character at a time, without ever shrinking the
// // element's footprint (the un-typed remainder is rendered invisibly so
// // nothing below the block shifts while typing is in progress).
// function useTypewriter(
//   text: string,
//   {
//     speed = 16,
//     startDelay = 400,
//   }: { speed?: number; startDelay?: number } = {},
// ) {
//   const [displayedText, setDisplayedText] = useState("");
//   const [isDone, setIsDone] = useState(false);

//   useEffect(() => {
//     setDisplayedText("");
//     setIsDone(false);

//     let i = 0;
//     let intervalId: ReturnType<typeof setInterval> | undefined;

//     const startTimeout = setTimeout(() => {
//       intervalId = setInterval(() => {
//         i += 1;
//         setDisplayedText(text.slice(0, i));

//         if (i >= text.length) {
//           if (intervalId) clearInterval(intervalId);
//           setIsDone(true);
//         }
//       }, speed);
//     }, startDelay);

//     return () => {
//       clearTimeout(startTimeout);
//       if (intervalId) clearInterval(intervalId);
//     };
//   }, [text, speed, startDelay]);

//   return { displayedText, isDone };
// }

// function SuccessState({
//   name,
//   onClose,
// }: {
//   name: string;
//   onClose: () => void;
// }) {
//   return (
//     <div className="flex flex-col items-center text-center py-6 px-2">
//       <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-3" />
//       <h3 className="text-xl font-bold text-gray-900">
//         Thanks, {name.split(" ")[0]}!
//       </h3>
//       <p className="text-sm text-gray-500 mt-1.5 max-w-xs">
//         Your application has been received. Our admissions team will reach out
//         to you shortly.
//       </p>
//       <button
//         onClick={onClose}
//         className="mt-5 h-10 px-6 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl text-sm"
//       >
//         Close
//       </button>
//     </div>
//   );
// }

// export default function UniversityHeroWithStats({
//   university,
//   stats,
// }: HeroSectionProps) {
//   const uniName = university?.name || "Amity";
//   const uniFullName = university?.fullName || uniName;

//   const hasOnlineWord = uniName.toLowerCase().includes("online");
//   const displayHeading = hasOnlineWord ? uniName : `${uniName} Online`;

//   const aiOverviewCopy = `${uniFullName} Online offers flexible, industry-focused online degree programs from ${uniFullName}, empowering learners to access quality education, develop practical skills, and achieve career growth through an advanced digital learning experience.`;

//   const { displayedText: aiOverviewText, isDone: aiOverviewDone } =
//     useTypewriter(aiOverviewCopy, { speed: 16, startDelay: 400 });

//   // Dialog state
//   const [open, setOpen] = useState(false);
//   const [submittedLead, setSubmittedLead] = useState<LeadData | null>(null);

//   const handleFormSubmit = (data: LeadData) => {
//     setSubmittedLead(data);
//   };

//   const handleOpenChange = (next: boolean) => {
//     setOpen(next);
//     if (!next) {
//       setTimeout(() => setSubmittedLead(null), 200);
//     }
//   };

//   const youtubeVideoId = "po5P0XIUT2k";

//   const statsData = [
//     {
//       icon: Users,
//       value: stats?.learners || "50,000+",
//       label: "Learners",
//     },
//     {
//       icon: Globe,
//       value: stats?.countries || "150+",
//       label: "Countries Reached",
//     },
//     {
//       icon: BookOpen,
//       value: stats?.programs || "150+",
//       label: "Programs",
//     },
//     {
//       icon: Building2,
//       value: stats?.campuses || "10+",
//       label: "Global Campuses",
//     },
//   ];

//   // Trigger count-up animation once the stats section scrolls into view
//   const statsSectionRef = useRef<HTMLElement | null>(null);
//   const [statsVisible, setStatsVisible] = useState(false);

//   useEffect(() => {
//     const node = statsSectionRef.current;
//     if (!node) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setStatsVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.3 },
//     );

//     observer.observe(node);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <>
//       {/* Hero Section */}
//       <section className="bg-white px-4 -mt-2 pt-4 pb-14 sm:px-6 sm:mt-0 lg:px-8 lg:mt-2 lg:pb-20">
//         <div className="absolute inset-0 opacity-[0.03] [mask-image:linear-gradient(to_bottom,white,transparent)]">
//           <svg className="h-full w-full" fill="none" viewBox="0 0 400 400">
//             <defs>
//               <pattern
//                 id="hero-grid"
//                 width="40"
//                 height="40"
//                 patternUnits="userSpaceOnUse"
//               >
//                 <path
//                   d="M0 40L40 40M40 0L40 40"
//                   stroke="currentColor"
//                   strokeWidth="1"
//                 />
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#hero-grid)" />
//           </svg>
//         </div>

//         <div className="relative mx-auto max-w-7xl px-4 py-0 sm:px-6 sm:py-0 lg:px-8 pb-8 sm:pb-12 lg:pb-16">
//           <div className="grid items-center gap-8 md:grid-cols-2">
//             <div className="space-y-6">
//               <h1 className="text-3xl font-bold tracking-tight text-gray-900 leading-tight sm:text-4xl md:text-4xl lg:text-4xl">
//                 {displayHeading.split(" ").slice(0, -1).join(" ")}{" "}
//                 <span className="text-red-500">
//                   {displayHeading.split(" ").slice(-1)}
//                 </span>
//               </h1>

//               {/* AI Overview with typewriter effect */}
//               <div className="max-w-xl">
//                 <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wide text-amber-600">
//                   <Sparkles className="h-3.5 w-3.5" />
//                   <div className="text-[#1e293b] text-[14px] font-medium">
//                     AI Overview
//                   </div>
//                 </div>

//                 <p className="text-base text-gray-600 leading-relaxed">
//                   <span>{aiOverviewText}</span>
//                   <span
//                     className={`ml-0.5 inline-block h-4 w-[2px] translate-y-[2px] bg-red-500 sm:h-[18px] ${
//                       aiOverviewDone ? "animate-pulse" : ""
//                     }`}
//                     aria-hidden="true"
//                   />
//                   {/* Reserves the final space up front so nothing below shifts while typing */}
//                   <span className="invisible">
//                     {aiOverviewCopy.slice(aiOverviewText.length)}
//                   </span>
//                 </p>
//               </div>

//               {/* Accreditations Badge - Image */}
//               <div className="pt-2">
//                 <Image
//                   src="/newuniversities/merge-approvals-nirf.png"
//                   alt="NAAC A+, UGC-DEB Approved, NIRF 27th Ranking"
//                   width={400}
//                   height={80}
//                   className="h-auto w-auto object-contain"
//                   priority
//                 />
//               </div>

//               <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4">
//                 <Dialog open={open} onOpenChange={handleOpenChange}>
//                   <DialogTrigger asChild>
//                     <button
//                       type="button"
//                       className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-red-200 transition-transform hover:scale-[1.02] hover:bg-red-600 active:scale-[0.98] sm:w-auto"
//                     >
//                       Apply to University
//                     </button>
//                   </DialogTrigger>

//                   <DialogContent className="bg-white border border-gray-100 rounded-2xl px-4 sm:px-6 py-5 sm:py-6 max-w-md">
//                     {submittedLead ? (
//                       <SuccessState
//                         name={submittedLead.name}
//                         onClose={() => handleOpenChange(false)}
//                       />
//                     ) : (
//                       <ApplicationForm onSubmit={handleFormSubmit} />
//                     )}
//                   </DialogContent>
//                 </Dialog>

//                 <a
//                   href="https://ecampusapp.com/amity-university-online/#elementor-action%3Aaction%3Dpopup%3Aopen%26settings%3DeyJpZCI6IjEzMjMxIiwidG9nZ2xlIjpmYWxzZX0%3D"
//                   className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-center text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto"
//                 >
//                   <Download className="h-4 w-4" />
//                   Download Brochure
//                 </a>
//               </div>
//             </div>

//             <div className="relative px-0 sm:px-4">
//               <div className="">
//                 <div className="w-full h-[260px] sm:h-[320px] md:h-[380px]">
//                   <iframe
//                     src={`https://www.youtube.com/embed/${youtubeVideoId}`}
//                     title={`${uniFullName} Video`}
//                     className="h-full w-full"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//     </>
//   );
// }

// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { Download } from "lucide-react";
// import Image from "next/image";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import HighlightedText from "./HighlightedText";
// import {
//   ApplicationForm,
//   type LeadData,
// } from "../discovery/degree-finder/application-form";
// import { BrochureForm } from "../discovery/degree-finder/brochure-form";
// import {
//   Sparkles,
//   Users,
//   Globe,
//   BookOpen,
//   Building2,
//   CheckCircle2,
// } from "lucide-react";

// interface HeroSectionProps {
//   university?: {
//     name?: string;
//     fullName?: string;
//     image?: string;
//     details?: any;
//   };
//   stats?: {
//     learners?: string;
//     countries?: string;
//     programs?: string;
//     campuses?: string;
//   };
// }

// // Parses a string like "50,000+" into { prefix: "", number: 50000, suffix: "+" }
// function parseStatValue(value: string) {
//   const match = value.match(/^([^\d]*)([\d,]+)(.*)$/);
//   if (!match) {
//     return { prefix: "", number: 0, suffix: value, hasNumber: false };
//   }
//   const [, prefix, numStr, suffix] = match;
//   const number = parseInt(numStr.replace(/,/g, ""), 10);
//   return { prefix, number, suffix, hasNumber: true };
// }

// function formatWithCommas(num: number) {
//   return num.toLocaleString("en-US");
// }

// // Animates a count from 0 up to the target number once triggered
// function useCountUp(target: number, shouldStart: boolean, duration = 1500) {
//   const [value, setValue] = useState(0);
//   const frameRef = useRef<number | null>(null);

//   useEffect(() => {
//     if (!shouldStart) return;

//     const startTime = performance.now();

//     const tick = (now: number) => {
//       const elapsed = now - startTime;
//       const progress = Math.min(elapsed / duration, 1);
//       const eased = 1 - Math.pow(1 - progress, 3);
//       setValue(Math.round(eased * target));

//       if (progress < 1) {
//         frameRef.current = requestAnimationFrame(tick);
//       }
//     };

//     frameRef.current = requestAnimationFrame(tick);

//     return () => {
//       if (frameRef.current) cancelAnimationFrame(frameRef.current);
//     };
//   }, [shouldStart, target, duration]);

//   return value;
// }

// function AnimatedStatValue({
//   value,
//   isVisible,
// }: {
//   value: string;
//   isVisible: boolean;
// }) {
//   const { prefix, number, suffix, hasNumber } = parseStatValue(value);
//   const animatedNumber = useCountUp(number, isVisible);

//   if (!hasNumber) return <>{value}</>;

//   return (
//     <>
//       {prefix}
//       {formatWithCommas(animatedNumber)}
//       {suffix}
//     </>
//   );
// }

// // Reveals `text` one character at a time, without ever shrinking the
// // element's footprint (the un-typed remainder is rendered invisibly so
// // nothing below the block shifts while typing is in progress).
// function useTypewriter(
//   text: string,
//   {
//     speed = 16,
//     startDelay = 400,
//   }: { speed?: number; startDelay?: number } = {},
// ) {
//   const [displayedText, setDisplayedText] = useState("");
//   const [isDone, setIsDone] = useState(false);

//   useEffect(() => {
//     setDisplayedText("");
//     setIsDone(false);

//     let i = 0;
//     let intervalId: ReturnType<typeof setInterval> | undefined;

//     const startTimeout = setTimeout(() => {
//       intervalId = setInterval(() => {
//         i += 1;
//         setDisplayedText(text.slice(0, i));

//         if (i >= text.length) {
//           if (intervalId) clearInterval(intervalId);
//           setIsDone(true);
//         }
//       }, speed);
//     }, startDelay);

//     return () => {
//       clearTimeout(startTimeout);
//       if (intervalId) clearInterval(intervalId);
//     };
//   }, [text, speed, startDelay]);

//   return { displayedText, isDone };
// }

// function SuccessState({
//   name,
//   onClose,
// }: {
//   name: string;
//   onClose: () => void;
// }) {
//   return (
//     <div className="flex flex-col items-center text-center py-6 px-2">
//       <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-3" />
//       <h3 className="text-xl font-bold text-gray-900">
//         Thanks, {name.split(" ")[0]}!
//       </h3>
//       <p className="text-sm text-gray-500 mt-1.5 max-w-xs">
//         Your application has been received. Our admissions team will reach out
//         to you shortly.
//       </p>
//       <button
//         onClick={onClose}
//         className="mt-5 h-10 px-6 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl text-sm"
//       >
//         Close
//       </button>
//     </div>
//   );
// }

// function getYoutubeId(url: string) {
//   if (!url) return null;
//   const trimmed = url.trim();
//   if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
//     return trimmed;
//   }
//   const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/;
//   const match = trimmed.match(regExp);
//   if (match && match[1]) {
//     return match[1];
//   }
//   const fallback = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//   const fallbackMatch = trimmed.match(fallback);
//   return (fallbackMatch && fallbackMatch[2].length === 11) ? fallbackMatch[2] : null;
// }

// export default function UniversityHeroWithStats({
//   university,
//   stats,
// }: HeroSectionProps) {
//   const uniName = university?.name || "Amity";
//   const uniFullName = university?.fullName || uniName;

//   const banner = university?.details?.banner || {};
//   const bannerHeading = banner.heading || "";
//   const bannerSubheading = banner.subheading || "";
//   const bannerImage = banner.image || "";
//   const bannerVideo = banner.video || "";
//   const bannerYoutubeUrl = banner.youtubeUrl || "";
//   const youtubeVideoId = getYoutubeId(bannerYoutubeUrl);
//   const bannerMediaType = banner.mediaType || (bannerImage ? "image" : (bannerVideo ? "video" : (youtubeVideoId ? "youtube" : null)));

//   if (!bannerHeading && !bannerImage && !bannerVideo && !youtubeVideoId) {
//     return null;
//   }

//   const aiOverviewCopy = bannerSubheading || "";

//   const { displayedText: aiOverviewText, isDone: aiOverviewDone } =
//     useTypewriter(aiOverviewCopy, { speed: 16, startDelay: 400 });

//   // Dialog state — separate tracking for Apply vs Brochure
//   const [open, setOpen] = useState(false);
//   const [dialogMode, setDialogMode] = useState<"apply" | "brochure" | null>(
//     null,
//   );
//   const [submittedLead, setSubmittedLead] = useState<LeadData | null>(null);

//   const handleFormSubmit = (data: LeadData) => {
//     setSubmittedLead(data);
//   };

//   const handleOpenChange = (next: boolean) => {
//     setOpen(next);
//     if (!next) {
//       setTimeout(() => {
//         setSubmittedLead(null);
//         setDialogMode(null);
//       }, 200);
//     }
//   };

//   const handleApplyClick = () => {
//     setDialogMode("apply");
//     setOpen(true);
//   };

//   const handleBrochureClick = () => {
//     setDialogMode("brochure");
//     setOpen(true);
//   };

//   const statsData = [
//     {
//       icon: Users,
//       value: stats?.learners || "50,000+",
//       label: "Learners",
//     },
//     {
//       icon: Globe,
//       value: stats?.countries || "150+",
//       label: "Countries Reached",
//     },
//     {
//       icon: BookOpen,
//       value: stats?.programs || "150+",
//       label: "Programs",
//     },
//     {
//       icon: Building2,
//       value: stats?.campuses || "10+",
//       label: "Global Campuses",
//     },
//   ];

//   // Trigger count-up animation once the stats section scrolls into view
//   const statsSectionRef = useRef<HTMLElement | null>(null);
//   const [statsVisible, setStatsVisible] = useState(false);

//   useEffect(() => {
//     const node = statsSectionRef.current;
//     if (!node) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setStatsVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.3 },
//     );

//     observer.observe(node);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <>
//       {/* Hero Section */}
//       <section className="bg-white px-4 mt-4 pt-4 pb-14 sm:px-6 sm:mt-0 lg:px-8 lg:mt-2 lg:pb-20">
//         <div className="absolute inset-0 opacity-[0.03] [mask-image:linear-gradient(to_bottom,white,transparent)]">
//           <svg className="h-full w-full" fill="none" viewBox="0 0 400 400">
//             <defs>
//               <pattern
//                 id="hero-grid"
//                 width="40"
//                 height="40"
//                 patternUnits="userSpaceOnUse"
//               >
//                 <path
//                   d="M0 40L40 40M40 0L40 40"
//                   stroke="currentColor"
//                   strokeWidth="1"
//                 />
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#hero-grid)" />
//           </svg>
//         </div>

//         <div className="relative mx-auto max-w-7xl px-4 py-0 sm:px-6 sm:py-0 lg:px-8 pb-8 sm:pb-12 lg:pb-16">
//           <div className="grid items-center gap-8 md:grid-cols-2">
//             <div className="space-y-6">
//               {bannerHeading && (
//                 <h1 className="text-3xl font-bold tracking-tight text-gray-900 leading-tight sm:text-4xl md:text-4xl lg:text-4xl">
//                   {bannerHeading.includes("*") ? (
//                     <HighlightedText text={bannerHeading} />
//                   ) : (
//                     <>
//                       {bannerHeading.split(" ").slice(0, -1).join(" ")}{" "}
//                       <span className="text-red-500">
//                         {bannerHeading.split(" ").slice(-1)}
//                       </span>
//                     </>
//                   )}
//                 </h1>
//               )}

//               {/* AI Overview with typewriter effect */}
//               {aiOverviewCopy && (
//                 <div className="max-w-xl">
//                   <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wide text-amber-600">
//                     <Sparkles className="h-3.5 w-3.5" />
//                     <div className="text-[#1e293b] text-[14px] font-medium">
//                       AI Overview
//                     </div>
//                   </div>

//                   <p className="text-base text-gray-600 leading-relaxed">
//                     <span>{aiOverviewText}</span>
//                     <span
//                       className={`ml-0.5 inline-block h-4 w-[2px] translate-y-[2px] bg-red-500 sm:h-[18px] ${
//                         aiOverviewDone ? "animate-pulse" : ""
//                       }`}
//                       aria-hidden="true"
//                     />
//                     {/* Reserves the final space up front so nothing below shifts while typing */}
//                     <span className="invisible">
//                       {aiOverviewCopy.slice(aiOverviewText.length)}
//                     </span>
//                   </p>
//                 </div>
//               )}

//               {/* Accreditations Badge */}
//               {banner.accreditationLogos && banner.accreditationLogos.filter(Boolean).length > 0 && (
//                 <div className="pt-2">
//                   <div className="flex gap-4 items-center flex-wrap">
//                     {banner.accreditationLogos.filter(Boolean).map((logoUrl: string, idx: number) => (
//                       <img
//                         key={idx}
//                         src={logoUrl}
//                         alt={`Accreditation Logo ${idx + 1}`}
//                         className="h-12 w-auto object-contain"
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {((banner.ctas?.[0]?.buttonText) || (banner.ctas?.[1]?.buttonText)) && (
//                 <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4">
//                   {/* Apply to University - Shows ApplicationForm */}
//                   {banner.ctas?.[0]?.buttonText && (
//                     <Dialog
//                       open={open && dialogMode === "apply"}
//                       onOpenChange={handleOpenChange}
//                     >
//                       <DialogTrigger asChild>
//                         <button
//                           type="button"
//                           onClick={handleApplyClick}
//                           className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-red-200 transition-transform hover:scale-[1.02] hover:bg-red-600 active:scale-[0.98] sm:w-auto"
//                         >
//                           {banner.ctas[0].buttonText}
//                         </button>
//                       </DialogTrigger>

//                       <DialogContent className="bg-white border border-gray-100 rounded-2xl px-4 sm:px-6 py-5 sm:py-6 max-w-md">
//                         {submittedLead ? (
//                           <SuccessState
//                             name={submittedLead.name}
//                             onClose={() => handleOpenChange(false)}
//                           />
//                         ) : (
//                           <ApplicationForm
//                             onSubmit={handleFormSubmit}
//                           />
//                         )}
//                       </DialogContent>
//                     </Dialog>
//                   )}

//                   {/* Download Brochure - Shows BrochureForm */}
//                   {banner.ctas?.[1]?.buttonText && (
//                     <Dialog
//                       open={open && dialogMode === "brochure"}
//                       onOpenChange={handleOpenChange}
//                     >
//                       <DialogTrigger asChild>
//                         <button
//                           type="button"
//                           onClick={handleBrochureClick}
//                           className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-center text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto"
//                         >
//                           <Download className="h-4 w-4" />
//                           {banner.ctas[1].buttonText}
//                         </button>
//                       </DialogTrigger>

//                       <DialogContent className="bg-white border border-gray-100 rounded-2xl px-4 sm:px-6 py-5 sm:py-6 max-w-md">
//                         {submittedLead ? (
//                           <SuccessState
//                             name={submittedLead.name}
//                             onClose={() => handleOpenChange(false)}
//                           />
//                         ) : (
//                           <BrochureForm onSubmit={handleFormSubmit} />
//                         )}
//                       </DialogContent>
//                     </Dialog>
//                   )}
//                 </div>
//               )}
//             </div>

//             <div className="relative px-0 sm:px-4">
//               <div className="">
//                 {(bannerImage || bannerVideo || youtubeVideoId) && (
//                   <div className="w-full h-[260px] sm:h-[320px] md:h-[380px] overflow-hidden rounded-xl bg-slate-100">
//                     {bannerMediaType === "image" && bannerImage && (
//                       <img
//                         src={bannerImage}
//                         alt={`${uniFullName} Banner`}
//                         className="h-full w-full object-cover"
//                       />
//                     )}
//                     {bannerMediaType === "video" && bannerVideo && (
//                       <video
//                         src={bannerVideo}
//                         controls
//                         className="h-full w-full object-cover"
//                       />
//                     )}
//                     {bannerMediaType === "youtube" && youtubeVideoId && (
//                       <iframe
//                         src={`https://www.youtube.com/embed/${youtubeVideoId}`}
//                         title={`${uniFullName} Video`}
//                         className="h-full w-full"
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                         referrerPolicy="strict-origin-when-cross-origin"
//                         allowFullScreen
//                       />
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//     </>
//   );
// }

// chnages

"use client";

import React from "react";
import {
  Star,
  BookOpen,
  Clock,
  Globe,
  Users,
  Shield,
  Download,
  MapPin,
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
  university?: any;
};

const iconMap: Record<string, React.ComponentType<any>> = {
  BookOpen,
  Clock,
  Globe,
  Users,
  Shield,
  Download,
};

const renderPointerIcon = (iconStr: string, alt: string) => {
  if (!iconStr) {
    return <BookOpen className="h-5 w-5 text-[#f83d46] sm:h-6 sm:w-6" />;
  }

  const LucideIcon =
    iconMap[iconStr] ||
    iconMap[iconStr.charAt(0).toUpperCase() + iconStr.slice(1)] ||
    iconMap[iconStr.toLowerCase()];

  if (LucideIcon) {
    return <LucideIcon className="h-5 w-5 text-[#f83d46] sm:h-6 sm:w-6" />;
  }

  if (
    iconStr.startsWith("http") ||
    iconStr.startsWith("/") ||
    iconStr.includes(".")
  ) {
    return (
      <img
        src={iconStr}
        alt={alt}
        className="h-5 w-5 object-contain sm:h-6 sm:w-6"
      />
    );
  }

  return <BookOpen className="h-5 w-5 text-[#f83d46] sm:h-6 sm:w-6" />;
};

export default function UniversityHeroWithStats({
  heroImage = "/newuniversities/amitybanner.webp",
  logoSrc = "/ggubanner/ggu-logo-square.png",
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
  university,
}: Props) {
  const banner = university?.details?.banner || {};
  const bannerHeading = banner.heading || university?.name || title;
  const bannerSubheading =
    banner.subheading || "A Heritage of Excellence. A Future of Impact.";
  const bannerLocation = university?.location || "USA";
  const bannerLogo = banner.icon || university?.logoUrl || logoSrc;
  const bannerBg = banner.image || heroImage || "/ggubanner/ggubnr.webp";

  const bannerRating =
    banner.rating !== undefined ? Number(banner.rating) : rating;
  const bannerReviews =
    banner.reviewsCount !== undefined ? Number(banner.reviewsCount) : reviews;
  const bannerTrustedText = banner.trustedText || trustedText;

  const dbLogos = banner.accreditationLogos || [];
  const dynamicBadges =
    dbLogos.length > 0
      ? [
          ...dbLogos
            .filter((logo: string) => logo && logo.trim() !== "")
            .map((logo: string, idx: number) => ({
              alt: `Accreditation Logo ${idx + 1}`,
              src: logo,
              label: "",
            })),
          { alt: "More", src: undefined, label: "More" },
        ]
      : badges;

  const pointers = banner.pointers || {};
  const pointersTitle = pointers.title || `Why ${university?.name || title}?`;
  const pointersItems =
    pointers.items && pointers.items.length > 0
      ? pointers.items
      : [
          {
            mainText: "100+",
            heading: "Programs",
            subheading: "Diverse specializations",
            icon: "BookOpen",
          },
          {
            mainText: "75+",
            heading: "Years of Legacy",
            subheading: "Experience & excellence",
            icon: "Clock",
          },
          {
            mainText: "Global",
            heading: "Community",
            subheading: "Diverse student body",
            icon: "Globe",
          },
          {
            mainText: "Career",
            heading: "Focused",
            subheading: "Job-ready learning",
            icon: "Users",
          },
        ];

  return (
    <header className="relative bg-white">
      <div className="relative h-64 overflow-hidden sm:h-72 lg:h-96">
        <img
          src={bannerBg}
          alt="Campus banner"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/45 to-black/20" />

        <div className="absolute inset-0 flex items-center px-4 py-6 sm:px-8 lg:px-32 lg:py-12">
          <div className="flex w-full items-end gap-4">
            <div className="shrink-0 rounded-xl border-2 border-white bg-white p-2">
              <img
                src={bannerLogo}
                alt={`${bannerHeading} Logo`}
                className="h-16 w-16 object-contain sm:h-20 sm:w-20"
              />
            </div>

            <div className="min-w-0 flex-1 text-white">
              <h1 className="mb-1 text-2xl font-bold leading-tight sm:text-3xl lg:text-5xl">
                {bannerHeading}
              </h1>

              <p className="mb-3 line-clamp-2 text-sm text-white/90 sm:text-base lg:text-lg">
                {bannerSubheading}
              </p>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-3 py-1.5 backdrop-blur-sm">
                <MapPin className="h-4 w-4 shrink-0 text-red-400" />
                <span className="text-sm font-medium text-white">
                  {bannerLocation}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div className="relative -mt-10 mb-16 sm:-mt-12 sm:mb-24 lg:-mt-16 lg:mb-32">
          <div className="rounded-2xl bg-white p-4 shadow-lg ring-1 ring-slate-100 sm:p-6">
            <div className="grid gap-5 border-b border-slate-200 pb-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  {dynamicBadges.map((b, i) => (
                    <div key={i} className="flex items-center gap-2">
                      {b.src ? (
                        <img
                          src={b.src}
                          alt={b.alt}
                          className="h-10 w-10 rounded-full border border-slate-100 bg-white object-contain"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-slate-50 text-xs font-bold text-slate-700">
                          {b.label?.[0] ?? "i"}
                        </div>
                      )}

                      {b.label && (
                        <span className="text-xs font-medium text-slate-700">
                          {b.label}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(bannerRating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    ))}

                    <span className="ml-1 text-sm font-semibold text-slate-800 sm:text-base">
                      {bannerRating}
                    </span>

                    <span className="text-xs text-slate-600 sm:text-sm">
                      ({bannerReviews})
                    </span>
                  </div>

                  <div className="flex min-w-0 items-center gap-2 text-xs text-slate-700 sm:text-sm">
                    <Shield className="h-4 w-4 shrink-0 text-sky-600" />
                    <span className="truncate">{bannerTrustedText}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 lg:flex lg:justify-end">
                <button className="inline-flex h-11 min-w-0 items-center justify-center rounded-[13px] bg-[#f83d46] px-3 text-xs font-bold text-white shadow-[0_10px_18px_rgba(248,61,70,0.28)] transition hover:bg-[#ef343d] active:scale-[0.99] sm:px-5 sm:text-sm">
                  <span className="truncate">
                    {banner.ctas?.[0]?.buttonText || "Apply Now"}
                  </span>
                </button>

                <button className="inline-flex h-11 min-w-0 items-center justify-center gap-2 rounded-[13px] border border-[#dfe5ee] bg-white px-3 text-xs font-bold text-slate-800 transition hover:bg-slate-50 active:scale-[0.99] sm:px-5 sm:text-sm">
                  <Download className="h-4 w-4 shrink-0" />

                  <span className="truncate">
                    {banner.ctas?.[1]?.buttonText || "Explore Courses"}
                  </span>
                </button>
              </div>
            </div>

            <div className="pt-5 sm:pt-6">
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px] lg:gap-8">
                <div className="min-w-0">
                  <h3 className="mb-4 text-xl font-bold text-slate-900 sm:mb-6 sm:text-2xl">
                    {pointersTitle}
                  </h3>

                  <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
                    {pointersItems.map((item: any, idx: number) => (
                      <div key={idx} className="min-w-0">
                        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 sm:h-12 sm:w-12">
                          {renderPointerIcon(item.icon, item.heading)}
                        </div>

                        <div className="truncate text-base font-bold text-slate-900 sm:text-lg">
                          {item.mainText}
                        </div>

                        <div className="text-xs text-slate-600 sm:text-sm">
                          {item.heading}
                        </div>

                        <div className="mt-0.5 line-clamp-2 text-xs text-slate-500 sm:mt-1">
                          {item.subheading}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 lg:h-fit">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900 sm:text-base">
                      Compare Universities
                    </h4>
                  </div>

                  <p className="mb-3 text-xs text-slate-600 sm:text-sm">
                    Compare GGU with other top universities.
                  </p>

                  <div className="flex items-center gap-3">
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

                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-sm font-bold text-white shadow">
                        +3
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
