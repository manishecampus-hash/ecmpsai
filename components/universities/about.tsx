"use client";

import React from "react";
import { GraduationCap, Award, CheckCircle2 } from "lucide-react";
import HighlightedText from "./HighlightedText";

interface AboutProgramProps {
  university?: any;
}

export default function AboutProgram({ university }: AboutProgramProps) {
  const aboutData = university?.details?.about || {};
  const uniDisplayName = university?.name || "University Online";
  const uniImage = aboutData?.image || aboutData?.imageUrl || university?.image || "/image/hero1.png";

  const naacItem = university?.details?.accreditation?.list?.find((item: any) =>
    item.label?.toLowerCase().includes("naac") || item.description?.toLowerCase().includes("naac")
  );
  const nirfItem = university?.details?.accreditation?.list?.find((item: any) =>
    item.label?.toLowerCase().includes("nirf") || item.description?.toLowerCase().includes("nirf")
  );

  const badgeTitle = aboutData?.badgeTitle || "Recognized Excellence";
  const badgeSubtext =
    aboutData?.badgeSubtext ||
    (naacItem
      ? `${naacItem.label}${naacItem.ribbon ? ` (${naacItem.ribbon} Score)` : ""}`
      : nirfItem
        ? `${nirfItem.label}${nirfItem.ribbon ? ` (Rank ${nirfItem.ribbon})` : ""}`
        : university?.nirfRanking
          ? `NIRF Ranked #${university.nirfRanking}`
          : "UGC Entitled & NAAC Accredited");

  const defaultPills = [
    {
      label: "100% Online Delivery",
      iconColor: "text-emerald-600",
      borderColor: "border-emerald-200/90",
      bgColor: "bg-emerald-50/60",
    },
    {
      label: "Weekend Live Sessions",
      iconColor: "text-[#ea384c]",
      borderColor: "border-red-200/90",
      bgColor: "bg-red-50/60",
    },
    {
      label: "Dedicated Placement Desk",
      iconColor: "text-indigo-600",
      borderColor: "border-indigo-200/90",
      bgColor: "bg-indigo-50/60",
    },
  ];

  const pills = aboutData?.features && aboutData.features.length > 0 ? aboutData.features : defaultPills;

  const headingText = aboutData?.heading || "Academic Prestige Built for the *Modern Learner*";

  return (
    <section
      id="why"
      className="mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8 pt-0 pb-8 sm:pb-12 font-sans"
    >
      <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 lg:p-10 xl:p-12 shadow-xs">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Left Column: Image with floating dark badge */}
          <div className="lg:col-span-6 w-full">
            <div className="relative w-full">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] min-h-[320px] sm:min-h-[380px] lg:min-h-[440px] xl:min-h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs border border-slate-100 bg-slate-100">
                <img
                  src={uniImage}
                  alt={`${uniDisplayName} Modern Infrastructure`}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Floating Dark Badge */}
              <div className="absolute -bottom-3 -right-2 sm:-bottom-4 sm:-right-3 z-10 bg-[#0c1322] border border-slate-800 shadow-xl rounded-2xl py-2.5 px-3.5 sm:py-3 sm:px-4.5 flex items-center gap-3 text-left max-w-[280px] sm:max-w-[320px]">
                <div className="h-8.5 w-8.5 sm:h-9.5 sm:w-9.5 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center shrink-0">
                  <Award className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-amber-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-[13px] font-bold text-white tracking-tight leading-snug truncate">
                    {badgeTitle}
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
                    {badgeSubtext}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Feature Pills */}
          <div className="lg:col-span-6 w-full text-left pt-2 lg:pt-0">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-2.5">
              <GraduationCap className="h-4 w-4 text-[#ea384c]" />
              <span className="text-xs font-bold text-[#ea384c] uppercase tracking-wider">
                {aboutData?.badge || "ABOUT THE UNIVERSITY"}
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-3xl xl:text-[34px] font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              <HighlightedText text={headingText} defaultColor="#ea384c" />
            </h2>

            {/* Description */}
            <div className="text-xs sm:text-[13px] xl:text-sm text-slate-600 leading-relaxed space-y-3.5 font-normal mb-6 sm:mb-7 [&_strong]:font-semibold [&_strong]:text-slate-900">
              {aboutData?.description ? (
                <div
                  dangerouslySetInnerHTML={{ __html: aboutData.description }}
                  className="space-y-3"
                />
              ) : (
                <>
                  <p>
                    <strong>{uniDisplayName}</strong> stands as a prominent institution
                    of higher education in India, recognized for its unrelenting emphasis
                    on <strong>academic quality, innovation, and student-centric learning</strong>.
                    Established with a mission to produce ethically grounded and agile leaders,
                    the university merges rigorous theoretical training with high-touch industry exposure.
                  </p>
                  <p>
                    Offering an expansive spectrum of <strong>undergraduate, postgraduate, and professional online programs</strong>,
                    the university focuses on hands-on applicability, career adaptability, and technological velocity.
                    Supported by seasoned faculty and a comprehensive digital LMS infrastructure, students gain the strategic
                    mindset to stand out in competitive global markets.
                  </p>
                </>
              )}
            </div>

            {/* Bottom 3 Feature Pills */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
              {pills.map((pill: any, index: number) => {
                const isObj = typeof pill === "object";
                const label = isObj ? pill.label : pill;
                const iconColor = isObj ? pill.iconColor || "text-emerald-600" : "text-emerald-600";
                const borderColor = isObj ? pill.borderColor || "border-emerald-200/90" : "border-emerald-200/90";
                const bgColor = isObj ? pill.bgColor || "bg-emerald-50/60" : "bg-emerald-50/60";

                return (
                  <div
                    key={index}
                    className={`inline-flex items-center gap-1.5 rounded-full border ${borderColor} ${bgColor} px-3.5 py-1.5 text-xs font-semibold text-slate-800 transition-all hover:bg-white hover:shadow-2xs`}
                  >
                    <CheckCircle2 className={`h-4 w-4 ${iconColor} shrink-0`} />
                    <span>{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
