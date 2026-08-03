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

"use client";

import React, { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  ApplicationForm,
  type LeadData,
} from "../discovery/degree-finder/application-form";
import { BrochureForm } from "../discovery/degree-finder/brochure-form";
import {
  Sparkles,
  Users,
  Globe,
  BookOpen,
  Building2,
  CheckCircle2,
} from "lucide-react";

interface HeroSectionProps {
  university?: {
    name?: string;
    fullName?: string;
    image?: string;
    details?: any;
  };
  stats?: {
    learners?: string;
    countries?: string;
    programs?: string;
    campuses?: string;
  };
}

// Parses a string like "50,000+" into { prefix: "", number: 50000, suffix: "+" }
function parseStatValue(value: string) {
  const match = value.match(/^([^\d]*)([\d,]+)(.*)$/);
  if (!match) {
    return { prefix: "", number: 0, suffix: value, hasNumber: false };
  }
  const [, prefix, numStr, suffix] = match;
  const number = parseInt(numStr.replace(/,/g, ""), 10);
  return { prefix, number, suffix, hasNumber: true };
}

function formatWithCommas(num: number) {
  return num.toLocaleString("en-US");
}

// Animates a count from 0 up to the target number once triggered
function useCountUp(target: number, shouldStart: boolean, duration = 1500) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!shouldStart) return;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [shouldStart, target, duration]);

  return value;
}

function AnimatedStatValue({
  value,
  isVisible,
}: {
  value: string;
  isVisible: boolean;
}) {
  const { prefix, number, suffix, hasNumber } = parseStatValue(value);
  const animatedNumber = useCountUp(number, isVisible);

  if (!hasNumber) return <>{value}</>;

  return (
    <>
      {prefix}
      {formatWithCommas(animatedNumber)}
      {suffix}
    </>
  );
}

// Reveals `text` one character at a time, without ever shrinking the
// element's footprint (the un-typed remainder is rendered invisibly so
// nothing below the block shifts while typing is in progress).
function useTypewriter(
  text: string,
  {
    speed = 16,
    startDelay = 400,
  }: { speed?: number; startDelay?: number } = {},
) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsDone(false);

    let i = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        i += 1;
        setDisplayedText(text.slice(0, i));

        if (i >= text.length) {
          if (intervalId) clearInterval(intervalId);
          setIsDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayedText, isDone };
}

function SuccessState({
  name,
  onClose,
  isBrochure,
}: {
  name: string;
  onClose: () => void;
  isBrochure?: boolean;
}) {
  return (
    <div className="flex flex-col items-center text-center py-6 px-2">
      <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-3" />
      <h3 className="text-xl font-bold text-gray-900">
        Thanks, {name.split(" ")[0]}!
      </h3>
      <p className="text-sm text-gray-500 mt-1.5 max-w-xs">
        {isBrochure
          ? "Your brochure download has started. Our admissions team will also reach out to you shortly."
          : "Your application has been received. Our admissions team will reach out to you shortly."}
      </p>
      <button
        onClick={onClose}
        className="mt-5 h-10 px-6 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl text-sm"
      >
        Close
      </button>
    </div>
  );
}

export default function UniversityHeroWithStats({
  university,
  stats,
}: HeroSectionProps) {
  const uniName = university?.name || "Amity";
  const uniFullName = university?.fullName || uniName;

  const bannerData = university?.details?.banner || {};
  const ctas = bannerData.ctas || [];
  const cta1 = ctas[0] || { buttonText: "Apply to University", link: "/apply-now", target: "_self", isBrochure: false };
  const cta2 = ctas[1] || { buttonText: "Download Brochure", link: "/brochure.pdf", target: "_self", isBrochure: true };

  const accreditationLogos = bannerData.accreditationLogos || [];
  const logosToRender = accreditationLogos.filter((logo: string) => !!logo);

  const hasOnlineWord = uniName.toLowerCase().includes("online");
  const displayHeading = bannerData.heading || (hasOnlineWord ? uniName : `${uniName} Online`);

  const aiOverviewCopy = bannerData.subheading || `${uniFullName} Online offers flexible, industry-focused online degree programs from ${uniFullName}, empowering learners to access quality education, develop practical skills, and achieve career growth through an advanced digital learning experience.`;

  const { displayedText: aiOverviewText, isDone: aiOverviewDone } =
    useTypewriter(aiOverviewCopy, { speed: 16, startDelay: 400 });

  // Dialog state — separate tracking for Apply vs Brochure
  const [open, setOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"apply" | "brochure" | null>(
    null,
  );
  const [submittedLead, setSubmittedLead] = useState<LeadData | null>(null);
  const [activeBrochureUrl, setActiveBrochureUrl] = useState("/brochure.pdf");

  const handleFormSubmit = (data: LeadData) => {
    setSubmittedLead(data);
    if (dialogMode === "brochure" && typeof window !== "undefined") {
      const link = document.createElement("a");
      link.href = activeBrochureUrl;
      link.download = activeBrochureUrl.split("/").pop() || "brochure.pdf";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setTimeout(() => {
        setSubmittedLead(null);
        setDialogMode(null);
      }, 200);
    }
  };

  const handleApplyClick = () => {
    setDialogMode("apply");
    setOpen(true);
  };

  const handleBrochureClick = () => {
    setDialogMode("brochure");
    setOpen(true);
  };

  const renderCTA = (cta: any, isPrimary: boolean) => {
    if (!cta.buttonText) return null;

    const baseClass = isPrimary
      ? "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-red-200 transition-transform hover:scale-[1.02] hover:bg-red-600 active:scale-[0.98] sm:w-auto cursor-pointer"
      : "inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-center text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto cursor-pointer";

    if (cta.isBrochure) {
      return (
        <Dialog open={open && dialogMode === "brochure"} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <button
              type="button"
              onClick={() => {
                setActiveBrochureUrl(cta.link || "/brochure.pdf");
                handleBrochureClick();
              }}
              className={baseClass}
            >
              {!isPrimary && <Download className="h-4 w-4" />}
              {cta.buttonText}
            </button>
          </DialogTrigger>
          <DialogContent className="bg-white border border-gray-100 rounded-2xl px-4 sm:px-6 py-5 sm:py-6 max-w-md">
            {submittedLead ? (
              <SuccessState
                name={submittedLead.name}
                onClose={() => handleOpenChange(false)}
                isBrochure={true}
              />
            ) : (
              <BrochureForm
                onSubmit={handleFormSubmit}
              />
            )}
          </DialogContent>
        </Dialog>
      );
    }

    if (cta.link === "/apply-now" || cta.link === "apply" || cta.link === "/apply" || cta.link === "") {
      return (
        <Dialog open={open && dialogMode === "apply"} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <button
              type="button"
              onClick={handleApplyClick}
              className={baseClass}
            >
              {cta.buttonText}
            </button>
          </DialogTrigger>
          <DialogContent className="bg-white border border-gray-100 rounded-2xl px-4 sm:px-6 py-5 sm:py-6 max-w-md">
            {submittedLead ? (
              <SuccessState
                name={submittedLead.name}
                onClose={() => handleOpenChange(false)}
              />
            ) : (
              <ApplicationForm
                onSubmit={handleFormSubmit}
              />
            )}
          </DialogContent>
        </Dialog>
      );
    }

    return (
      <a
        href={cta.link || "#"}
        target={cta.target || "_self"}
        className={baseClass}
      >
        {cta.buttonText}
      </a>
    );
  };

  const youtubeUrl = bannerData.youtubeUrl || "";
  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };
  const youtubeVideoId = getYoutubeId(youtubeUrl) || "po5P0XIUT2k";

  const statsData = [
    {
      icon: Users,
      value: stats?.learners || "50,000+",
      label: "Learners",
    },
    {
      icon: Globe,
      value: stats?.countries || "150+",
      label: "Countries Reached",
    },
    {
      icon: BookOpen,
      value: stats?.programs || "150+",
      label: "Programs",
    },
    {
      icon: Building2,
      value: stats?.campuses || "10+",
      label: "Global Campuses",
    },
  ];

  // Trigger count-up animation once the stats section scrolls into view
  const statsSectionRef = useRef<HTMLElement | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const node = statsSectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white px-4 -mt-2 pt-4 pb-14 sm:px-6 sm:mt-0 lg:px-8 lg:mt-2 lg:pb-20">
        <div className="absolute inset-0 opacity-[0.03] [mask-image:linear-gradient(to_bottom,white,transparent)]">
          <svg className="h-full w-full" fill="none" viewBox="0 0 400 400">
            <defs>
              <pattern
                id="hero-grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 40L40 40M40 0L40 40"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-0 sm:px-6 sm:py-0 lg:px-8 pb-8 sm:pb-12 lg:pb-16">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 leading-tight sm:text-4xl md:text-4xl lg:text-4xl">
                {displayHeading.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-red-500">
                  {displayHeading.split(" ").slice(-1)}
                </span>
              </h1>

              {/* AI Overview with typewriter effect */}
              <div className="max-w-xl">
                <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wide text-amber-600">
                  <Sparkles className="h-3.5 w-3.5" />
                  <div className="text-[#1e293b] text-[14px] font-medium">
                    AI Overview
                  </div>
                </div>

                <p className="text-base text-gray-600 leading-relaxed">
                  <span>{aiOverviewText}</span>
                  <span
                    className={`ml-0.5 inline-block h-4 w-[2px] translate-y-[2px] bg-red-500 sm:h-[18px] ${
                      aiOverviewDone ? "animate-pulse" : ""
                    }`}
                    aria-hidden="true"
                  />
                  {/* Reserves the final space up front so nothing below shifts while typing */}
                  <span className="invisible">
                    {aiOverviewCopy.slice(aiOverviewText.length)}
                  </span>
                </p>
              </div>

              {/* Accreditations Badge - Custom Logos with Fallback */}
              {logosToRender.length > 0 ? (
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  {logosToRender.map((logo: string, idx: number) => (
                    <div key={idx} className="relative h-12 w-28 bg-white border border-slate-100 rounded-lg p-1.5 shadow-sm flex items-center justify-center">
                      <img
                        src={logo}
                        alt={`Accreditation Logo ${idx + 1}`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="pt-2">
                  <Image
                    src="/newuniversities/merge-approvals-nirf.png"
                    alt="NAAC A+, UGC-DEB Approved, NIRF 27th Ranking"
                    width={400}
                    height={80}
                    className="h-auto w-auto object-contain"
                    priority
                  />
                </div>
              )}

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4">
                {renderCTA(cta1, true)}
                {renderCTA(cta2, false)}
              </div>
            </div>

            <div className="relative px-0 sm:px-4 w-full">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <div className="w-full h-[260px] sm:h-[320px] md:h-[380px] relative">
                  {youtubeUrl ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                      title={`${uniFullName} Video`}
                      className="h-full w-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : bannerData.imageUrl || bannerData.image || university?.image ? (
                    <img
                      src={bannerData.imageUrl || bannerData.image || university?.image}
                      alt={`${uniFullName} Banner`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <iframe
                      src={`https://www.youtube.com/embed/po5P0XIUT2k`}
                      title={`${uniFullName} Video`}
                      className="h-full w-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
    </>
  );
}
