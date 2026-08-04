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

// Default GGU accreditation & recognition content (used when no CMS data is passed in)
const recognitionData: RecognitionItem[] = [
  {
    id: "aacsb",
    label: "AACSB Accredited",
    description:
      "The Edward S. Ageno School of Business holds AACSB accreditation, held by less than 6% of business schools worldwide.",
    ribbon: "Top 6% Globally",
    icon: BadgeCheck,
  },
  {
    id: "wscuc",
    label: "WSCUC",
    description:
      "Golden Gate University is regionally accredited by the WASC Senior College and University Commission.",
    icon: ShieldCheck,
  },
  {
    id: "established",
    label: "Est. 1901",
    description:
      "Over 120 years of experience educating working professionals in San Francisco and online.",
    icon: Landmark,
  },
  {
    id: "recognition",
    label: "Globally Recognized",
    description:
      "The Online DBA carries the same accreditation and academic weight as GGU's on-campus doctoral degree.",
    icon: Crown,
  },
  {
    id: "usde",
    label: "US Dept. of Education",
    description:
      "Recognized under U.S. federal accreditation standards for higher education institutions.",
    icon: Sparkles,
  },
  {
    id: "alumni",
    label: "60,000+ Alumni",
    description:
      "A global network of GGU graduates in leadership roles across industries.",
    icon: BadgeCheck,
  },
];

export default function GguAprovel({ university }: ApSectionProps) {
  const accData = university?.details?.accreditation || {};
  const list = accData.list?.length ? accData.list : recognitionData;

  const mappedList = list.map((item: any, idx: number) => {
    let resolvedIcon: any = item.icon || "";
    const isImageUrl =
      typeof resolvedIcon === "string" &&
      (resolvedIcon.startsWith("/") ||
        resolvedIcon.startsWith("http") ||
        resolvedIcon.startsWith("data:"));

    if (typeof resolvedIcon === "string" && !isImageUrl && resolvedIcon) {
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
  });

  return (
    <section
      id="approvals"
      className="bg-white px-4 -mt-3 pt-0 pb-12 sm:px-6 sm:-mt-4 lg:px-8 lg:-mt-5 font-sans"
    >
      <div className="max-w-7xl mx-auto">
        {/* Centered Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-black uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4 text-red-500" />
            Accreditation
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-3xl">
            {accData.heading ? (
              <span dangerouslySetInnerHTML={{ __html: accData.heading }} />
            ) : (
              <>
                Golden Gate University Recognition &{" "}
                <span className="text-red-500">Approval</span>
              </>
            )}
          </h2>
        </div>

        {/* Approval Grid */}
        <div className="grid divide-y divide-slate-100 border-y border-slate-100 md:grid-cols-2 md:divide-y-0 md:divide-x lg:grid-cols-3">
          {mappedList.map((item: any, index: number) => {
            const isImage = typeof item.icon === "string";
            const IconComponent = !isImage
              ? (item.icon as React.ElementType)
              : null;

            return (
              <div
                key={item.id}
                className={`flex items-start gap-5 p-5 sm:p-6 transition-all duration-200 hover:bg-slate-50/70
              ${index >= 3 ? "lg:border-t lg:border-slate-100" : ""}
            `}
              >
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200 p-2 shadow-sm">
                  {isImage ? (
                    <img
                      src={item.icon as string}
                      alt={item.label}
                      className="h-20 w-20 object-contain"
                    />
                  ) : (
                    IconComponent && (
                      <IconComponent className="h-10 w-10 text-slate-800" />
                    )
                  )}
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1 pt-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-slate-900 leading-tight">
                      {item.label}
                    </h3>

                    {item.ribbon && (
                      <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-600 border border-red-100">
                        {item.ribbon}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
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
