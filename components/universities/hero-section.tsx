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

export default function UniversityHeroWithStats({
  heroImage = "/images/logoo.webp",
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
      <div className="relative h-48 sm:h-64 lg:h-96">
        <img
          src="/ggubanner/ggubnr.webp"
          alt="Campus banner"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col items-start justify-center pl-4 pr-4 py-6 sm:pl-8 sm:pr-8 sm:py-8 lg:pl-32 lg:pr-12 lg:py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-4 w-full">
            {/* Logo */}
            <div className="flex-shrink-0 bg-blue-900 border-2 border-white rounded-xl p-2">
              <img
                src="/ggubanner/logoo.webp"
                alt="GGU Logo"
                className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 object-contain"
              />
            </div>

            {/* Text content */}
            <div className="text-white flex-1">
              <h1 className="text-xl sm:text-3xl lg:text-5xl font-bold mb-1 sm:mb-2 leading-tight">
                {title}
              </h1>
              <p className="text-xs sm:text-base lg:text-lg text-white/90 mb-2 sm:mb-3 line-clamp-2">
                A Heritage of Excellence. A Future of Impact.
              </p>

              {/* Location badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/40 rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 text-red-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-white text-xs sm:text-sm font-medium">
                  USA
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* carousel dots (visual) */}
        <div className="absolute inset-x-0 top-3 sm:top-4 flex justify-center space-x-2">
          <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white/90" />
          <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white/40" />
        </div>
      </div>

      {/* Overlapping white card below banner */}
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div className="relative -mt-8 sm:-mt-12 lg:-mt-16">
          <div className="rounded-lg sm:rounded-2xl bg-white px-4 sm:px-6 py-5 sm:py-6 shadow-lg ring-1 ring-slate-100">
            {/* TOP ROW: Badges, Rating, Trusted Text | CTAs */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 sm:pb-6 border-b">
              {/* LEFT: Badges + Rating + Trusted */}
              <div className="flex flex-col gap-3 w-full lg:w-auto">
                {/* Badges row */}
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  {badges.map((b, i) => (
                    <div key={i} className="flex items-center gap-1.5 sm:gap-2">
                      {b.src ? (
                        <img
                          src={b.src}
                          alt={b.alt}
                          className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-slate-100 bg-white object-contain"
                        />
                      ) : (
                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-xs font-bold text-slate-700">
                          {b.label?.[0] ?? "i"}
                        </div>
                      )}
                      <span className="text-xs font-medium text-slate-700 hidden sm:inline">
                        {b.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Rating + Trusted */}
                <div className="flex flex-col gap-2 sm:gap-3">
                  <div className="flex items-center gap-1 flex-wrap">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                    <span className="ml-1 sm:ml-2 font-semibold text-slate-800 text-sm sm:text-base">
                      {rating}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-600">
                      ({reviews})
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                    <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-sky-600 flex-shrink-0" />
                    <span className="line-clamp-1">{trustedText}</span>
                  </div>
                </div>
              </div>

              {/* RIGHT: CTAs */}
              <div className="flex flex-col gap-2 w-full sm:w-auto lg:gap-3">
                <div className="flex flex-col gap-2 sm:flex-row lg:gap-3">
                  <Link
                    href={onApplyHref}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ef4444] px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow hover:bg-red-500 transition whitespace-nowrap"
                  >
                    Apply
                    <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Link>

                  <Link
                    href={onTalkHref}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-4 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-800 border border-slate-200 hover:bg-slate-50 transition whitespace-nowrap"
                  >
                    <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Download</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* FEATURES SECTION: Heading + Grid + Compare Card */}
            <div className="pt-5 sm:pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 sm:gap-8">
                {/* LEFT: Why Golden Gate University */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">
                    Why Golden Gate University?
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {/* 100+ Programs */}
                    <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4">
                      <div className="rounded-lg bg-blue-50 p-2 sm:p-3 flex-shrink-0">
                        <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-base sm:text-lg font-bold text-slate-900">
                          100+
                        </div>
                        <div className="text-xs sm:text-sm text-slate-600">
                          Programs
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5 sm:mt-1 line-clamp-2">
                          Diverse specializations
                        </div>
                      </div>
                    </div>

                    {/* 75+ Years */}
                    <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4">
                      <div className="rounded-lg bg-blue-50 p-2 sm:p-3 flex-shrink-0">
                        <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-base sm:text-lg font-bold text-slate-900">
                          75+
                        </div>
                        <div className="text-xs sm:text-sm text-slate-600">
                          Years of Legacy
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5 sm:mt-1 line-clamp-2">
                          Experience & excellence
                        </div>
                      </div>
                    </div>

                    {/* Global */}
                    <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4">
                      <div className="rounded-lg bg-blue-50 p-2 sm:p-3 flex-shrink-0">
                        <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-base sm:text-lg font-bold text-slate-900">
                          Global
                        </div>
                        <div className="text-xs sm:text-sm text-slate-600">
                          Community
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5 sm:mt-1 line-clamp-2">
                          Diverse student body
                        </div>
                      </div>
                    </div>

                    {/* Career Focused */}
                    <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4">
                      <div className="rounded-lg bg-blue-50 p-2 sm:p-3 flex-shrink-0">
                        <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-base sm:text-lg font-bold text-slate-900">
                          Career
                        </div>
                        <div className="text-xs sm:text-sm text-slate-600">
                          Focused
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5 sm:mt-1 line-clamp-2">
                          Job-ready learning
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT: Compare Universities Card */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-blue-100 lg:h-fit">
                  <h4 className="font-bold text-slate-900 mb-3 sm:mb-4 text-sm sm:text-base">
                    Compare Universities
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mb-4 sm:mb-6">
                    Compare GGU with other top universities.
                  </p>

                  {/* University Logos */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="flex -space-x-2 sm:-space-x-3">
                      <img
                        src="/ggubanner/ssbm.png"
                        alt="University 1"
                        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-white bg-white shadow"
                      />
                      <img
                        src="/ggubanner/rushford.png"
                        alt="University 2"
                        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-white bg-white shadow"
                      />
                      <img
                        src="/ggubanner/ei.png"
                        alt="University 3"
                        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-white bg-white shadow"
                      />
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-white bg-blue-600 shadow flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                        +3
                      </div>
                    </div>
                  </div>

                  <Link
                    href="#compare"
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold text-xs sm:text-sm hover:text-blue-700 transition"
                  >
                    Compare Now
                    <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
