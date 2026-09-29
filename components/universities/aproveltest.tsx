"use client";

import React from "react";
import {
  BadgeCheck,
  Crown,
  Landmark,
  ShieldCheck,
  Sparkles,
  Award,
  CheckCircle2,
} from "lucide-react";
import * as Icons from "lucide-react";
import HighlightedText from "./HighlightedText";

interface ApSectionProps {
  university?: any;
}

interface RecognitionItem {
  id: string;
  label: string;
  description: string;
  ribbon?: string;
  icon: React.ElementType | string;
}

const recognitionData: RecognitionItem[] = [
  {
    id: "naac",
    label: "NAAC A+",
    description: "Rajasthan's 1st NAAC A+ Accredited University",
    icon: "/approvals/NIRF-2.jpg.webp",
  },
  {
    id: "qs",
    label: "AIU",
    description: "Amongst South Asia's Top Universities (2026)",
    ribbon: "Rank 195",
    icon: "/approvals/NAAC-A-3.jpg.webp",
  },
  {
    id: "ugc",
    label: "WES",
    description: "Online Degrees Equivalent to Campus Degree",
    icon: "/approvals/WES-2.jpg.webp",
  },
  {
    id: "aicte",
    label: "ACU",
    description: "AICTE Norms Compliant",
    icon: "/approvals/ACU-3.jpg.webp",
  },
  {
    id: "impact",
    label: "BCI",
    description: "Amongst World's Top 400 Universities (2025)",
    ribbon: "Ranked 301-400",
    icon: "/approvals/ACU-3.jpg.webp",
  },
  {
    id: "week",
    label: "The Week",
    description: "Amongst Private & Deemed Multidisciplinary Universities",
    ribbon: "Rank 15",
    icon: "/approvals/ACU-3.jpg.webp",
  },
];

export default function ApSection({ university }: ApSectionProps) {
  const accData = university?.details?.accreditation || {};
  const rawList = accData.list && accData.list.length > 0 ? accData.list : recognitionData;

  if (!rawList || rawList.length === 0) {
    return null;
  }

  const mappedList = rawList.map((item: any, idx: number) => {
    let resolvedIcon: any = item.icon || "";
    const isImageUrl =
      typeof resolvedIcon === "string" &&
      (resolvedIcon.startsWith("/") ||
        resolvedIcon.startsWith("http") ||
        resolvedIcon.startsWith("data:"));
    if (!isImageUrl && resolvedIcon) {
      resolvedIcon = (Icons as any)[resolvedIcon] || ShieldCheck;
    } else if (!resolvedIcon) {
      const defaultIcons = [Landmark, BadgeCheck, Crown, Sparkles, Award, CheckCircle2];
      resolvedIcon = defaultIcons[idx % defaultIcons.length];
    }
    return {
      id: item.id || String(idx),
      label: item.label || "",
      description: item.description || "",
      ribbon: item.ribbon || "",
      icon: resolvedIcon,
    };
  });

  const headingText = accData.heading || "Recognition & *Approvals*";
  const subtitleText = accData.subheading || accData.subtitle || "";

  return (
    <section
      id="approvals"
      className="mx-auto w-full max-w-6xl px-3 sm:px-6 lg:px-8 pt-0 pb-8 sm:pb-12 font-sans"
    >
      <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 lg:p-8 shadow-xs">
        {/* Centered Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/80 px-3.5 py-1 text-[11px] font-bold tracking-wider text-slate-800 uppercase">
            <ShieldCheck className="h-3.5 w-3.5 text-[#ea384c]" />
            {accData.badge || "ACCREDITATIONS & APPROVALS"}
          </span>

          <h2 className="mt-2.5 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            <HighlightedText text={headingText} defaultColor="#ea384c" />
          </h2>

          {subtitleText && (
            <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xl mx-auto">
              {subtitleText}
            </p>
          )}
        </div>

        {/* Approval Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4.5">
          {mappedList.map((item: any) => {
            const isImage = typeof item.icon === "string";
            const IconComponent = !isImage ? (item.icon as React.ElementType) : null;

            return (
              <div
                key={item.id}
                className="rounded-2xl bg-[#f8fafc] border border-slate-200/70 p-4 sm:p-4.5 flex items-start gap-4 transition-all duration-200 hover:border-slate-300 hover:shadow-xs group text-left"
              >
                {/* Icon / Logo Box */}
                <div className="flex h-16 w-16 sm:h-18 sm:w-18 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200/80 p-2 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                  {isImage ? (
                    <img
                      src={item.icon as string}
                      alt={item.label}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    IconComponent && (
                      <IconComponent className="h-7 w-7 text-[#ea384c] stroke-[1.8]" />
                    )
                  )}
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug tracking-tight">
                      {item.label}
                    </h3>

                    {item.ribbon && (
                      <span className="inline-flex items-center rounded-md bg-red-50 border border-red-100/90 px-2 py-0.5 text-[10px] font-bold text-red-600 uppercase tracking-wide shrink-0">
                        {item.ribbon}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
