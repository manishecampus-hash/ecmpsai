"use client";

import React from "react";
import HighlightedText from "@/components/universities/HighlightedText";
import { CheckCircle2, Sparkles } from "lucide-react";

const DEFAULT_OVERVIEW_TABS = [
  {
    label: "FLEXIBLE LEARNING",
    heading: "100% Online & Asynchronous",
    subtext: "Learn at your own pace with recorded lectures and live weekend interactive sessions.",
    points: [
      "Access study materials 24/7",
      "Flexible examination slots",
      "Virtual Interactive LMS"
    ]
  },
  {
    label: "CAREER GROWTH",
    heading: "Placement Support & Networking",
    subtext: "Connect with global alumni networks and leading recruiters.",
    points: [
      "1-on-1 Mentorship",
      "Resume & LinkedIn Building",
      "Virtual Placement Drives"
    ]
  }
];

interface SubOverviewProps {
  data?: any;
  title?: string;
  content?: string;
}

export default function SubOverview({ data, title, content }: SubOverviewProps) {
  const rawHeading = data?.heading || title || "Online MBA Overview";
  const description =
    data?.description ||
    content ||
    "The Online Master of Business Administration (MBA) is one of the most sought-after postgraduate management programs in India. Designed to cater to working executives, entrepreneurs, and fresh graduates, this program offers the flexibility of remote learning without compromising academic rigor or industry value.";
  
  const rawTabs = data?.tabs;
  const tabs: any[] =
    rawTabs && Array.isArray(rawTabs) && rawTabs.length > 0
      ? rawTabs
      : DEFAULT_OVERVIEW_TABS;

  const renderTitle = (titleText: string) => {
    if (!titleText) return null;

    if (titleText.includes("*")) {
      const parts = titleText.split(/(\*{1,2}[^*]+\*{1,2})/g);
      return (
        <>
          {parts.map((part, index) => {
            const isAsteriskWrapped =
              (part.startsWith("**") && part.endsWith("**") && part.length > 4) ||
              (part.startsWith("*") && part.endsWith("*") && part.length > 2);

            if (isAsteriskWrapped) {
              const content = part.replace(/^\*+|\*+$/g, "");
              return (
                <span
                  key={index}
                  className="text-[#ee2c3c]"
                  style={{ color: "#ee2c3c" }}
                >
                  {content}
                </span>
              );
            }
            return <React.Fragment key={index}>{part}</React.Fragment>;
          })}
        </>
      );
    }

    return titleText;
  };

  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-black">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            {renderTitle(rawHeading)}
          </h1>
        </div>

        {/* Description */}
        {description ? (
          <div
            className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base mb-8 text-left"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        ) : null}

        {/* Dynamic Cards / Tabs Grid */}
        {tabs.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {tabs.map((tab: any, i: number) => {
              const pointsList: string[] = tab.points
                ? typeof tab.points === "string"
                  ? tab.points.includes("\n")
                    ? tab.points.split("\n").map((s: string) => s.trim().replace(/^✓\s*/, "")).filter(Boolean)
                    : tab.points.split(",").map((s: string) => s.trim().replace(/^✓\s*/, "")).filter(Boolean)
                  : Array.isArray(tab.points)
                  ? tab.points.map((p: any) => typeof p === "string" ? p.replace(/^✓\s*/, "").trim() : p)
                  : []
                : [];

              return (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {tab.label && (
                      <span className="inline-block rounded bg-red-50 px-2 py-0.5 text-[10px] font-bold text-[#ee2c3c] uppercase tracking-wider mb-2">
                        {tab.label}
                      </span>
                    )}
                    {tab.heading && (
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {tab.heading}
                      </h3>
                    )}
                    {tab.subtext && (
                      <p className="text-xs text-slate-500 mt-1 mb-3 leading-relaxed">
                        {tab.subtext}
                      </p>
                    )}
                  </div>

                  {pointsList.length > 0 && (
                    <ul className="space-y-1.5 mt-2">
                      {pointsList.map((pt: string, j: number) => (
                        <li key={j} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                          <span className="text-emerald-500 font-bold text-xs select-none">✓</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
