"use client";

import React from "react";
import {
  BadgeCheck,
  Crown,
  Landmark,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import * as Icons from "lucide-react";

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
    icon: Landmark,
  },
  {
    id: "aicte",
    label: "ACU",
    description: "AICTE Norms Compliant",
    icon: BadgeCheck,
  },
  {
    id: "impact",
    label: "BCI",
    description: "Amongst World's Top 400 Universities (2025)",
    ribbon: "Ranked 301-400",
    icon: Crown,
  },
  {
    id: "week",
    label: "The Week",
    description: "Amongst Private & Deemed Multidisciplinary Universities",
    ribbon: "Rank 15",
    icon: Sparkles,
  },
];

export default function ApSection({ university }: ApSectionProps) {
  const accData = university?.details?.accreditation || {};
  const list =
    accData.list && accData.list.length > 0
      ? accData.list.map((item: any, idx: number) => {
          let resolvedIcon: any = item.icon || "";
          const isImageUrl =
            typeof resolvedIcon === "string" &&
            (resolvedIcon.startsWith("/") ||
              resolvedIcon.startsWith("http") ||
              resolvedIcon.startsWith("data:"));
          if (!isImageUrl && resolvedIcon) {
            resolvedIcon = (Icons as any)[resolvedIcon] || ShieldCheck;
          } else if (!resolvedIcon) {
            const defaultIcons = [Landmark, BadgeCheck, Crown, Sparkles];
            resolvedIcon = defaultIcons[idx % defaultIcons.length];
          }
          return {
            id: item.id || String(idx),
            label: item.label || "",
            description: item.description || "",
            ribbon: item.ribbon || "",
            icon: resolvedIcon,
          };
        })
      : recognitionData;

  return (
    <section
      id="approvals"
      className="bg-white px-4 pt-1 pb-12 sm:px-6 sm:pt-2 lg:px-8 lg:pt-3 font-sans"
    >
      <div className="max-w-7xl mx-auto">
        {/* Centered Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-black uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4 text-red-500" />
            {"Accreditation"}
          </span>
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            Recognition & <span className="text-red-500">Approval</span>
          </h2>
        </div>

        {/* Horizontal Row List / Grid */}
        <div className="grid divide-y divide-slate-100 border-y border-slate-100 md:grid-cols-2 md:divide-y-0 md:divide-x md:border-x-0 lg:grid-cols-3">
          {list.map((item, index) => {
            const isImage = typeof item.icon === "string";
            const IconComponent = !isImage
              ? (item.icon as React.ElementType)
              : null;

            return (
              <div
                key={item.id}
                className={`flex items-start gap-4 p-6 transition-colors duration-200 hover:bg-slate-50/60
                  ${index >= 3 ? "lg:border-t lg:border-slate-100" : ""}
                  ${index % 2 !== 0 ? "md:border-l-0" : ""}
                `}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 border border-slate-200/50 p-0.5 text-slate-700">
                  {isImage ? (
                    <img
                      src={item.icon as string}
                      alt={item.label}
                      className="scale-150 object-contain mix-blend-multiply"
                    />
                  ) : (
                    IconComponent && (
                      <IconComponent className="h-14 w-6 text-slate-800" />
                    )
                  )}
                </div>

                {/* Text Body */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-slate-900">
                      {item.label}
                    </h3>
                    {item.ribbon && (
                      <span className="inline-flex items-center rounded bg-red-50 px-1.5 py-0.5 text-[10px] font-bold text-red-600 border border-red-100">
                        {item.ribbon}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
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
