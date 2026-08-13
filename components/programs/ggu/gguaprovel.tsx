"use client";

import React, { useRef } from "react";
import { ChevronRight, ChevronLeft, ShieldCheck } from "lucide-react";
import * as Icons from "lucide-react";

interface ApSectionProps {
  university?: any;
}

interface RecognitionItem {
  id: string;
  label: string;
  description: string;
  icon: string; // image URL for the logo
}

// Default GGU accreditation & recognition content (used when no CMS data is passed in)
const recognitionData: RecognitionItem[] = [
  {
    id: "aiu",
    label: "Association of Indian Universities",
    description:
      "GGU is associated with membership in AIU, registered under the Societies Registration Act, 1860 that enables universities to collaborate & discuss common academic matters.",
    icon: "/approvals/1st.webp",
  },
  {
    id: "wasc",
    label: "WASC",
    description:
      "GGU is accredited by WASC by Senior College and University Commission (WSCUC), which also accredits top universities ensuring high educational standards.",
    icon: "/approvals/2nd.webp",
  },
  {
    id: "wes",
    label: "WES Accreditation",
    description:
      "WES Accreditation is one of the most widely accepted and respected forms of recognition for a degree.",
    icon: "/approvals/3rd.svg",
  },
  {
    id: "aacsb",
    label: "AACSB Accredited",
    description:
      "The Edward S. Ageno School of Business holds AACSB accreditation, held by less than 6% of business schools worldwide.",
    icon: "/approvals/4th.svg",
  },
];

const preventFocusScroll = (e: React.SyntheticEvent) => {
  e.preventDefault();
};

const leftArrowStyle = (): React.CSSProperties => ({
  position: "absolute",
  left: 0,
  top: 0,
  bottom: 0,
  margin: "auto 0",
  zIndex: 40,
  background: "#666666",
  border: "none",
  borderRadius: "0 8px 8px 0",
  padding: 0,
  cursor: "pointer",
  color: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 0.2s",
  flexShrink: 0,
  width: 24,
  height: 64,
});

const rightArrowStyle = (): React.CSSProperties => ({
  position: "absolute",
  right: 0,
  top: 0,
  bottom: 0,
  margin: "auto 0",
  zIndex: 40,
  background: "#666666",
  border: "none",
  borderRadius: "8px 0 0 8px",
  padding: 0,
  cursor: "pointer",
  color: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 0.2s",
  flexShrink: 0,
  width: 24,
  height: 64,
});

export default function GguAprovel({ university }: ApSectionProps) {
  const accData = university?.details?.accreditation || {};
  const list = accData.list?.length ? accData.list : recognitionData;
  const scrollRef = useRef<HTMLDivElement>(null);

  const mappedList = list.map((item: any, idx: number) => ({
    id: item.id || String(idx),
    label: item.label || "",
    description: item.description || "",
    icon: item.icon || "",
  }));

  const scrollRight = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: scrollRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: -scrollRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="approvals"
      className="bg-white px-4 py-5 sm:px-6 lg:px-8 font-sans"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="mb-8 mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-4xl">
            DBA from GGU{" "}
            <span className="text-red-500"> Assured Globally Accredited</span>
          </h2>
        </div>

        {/* Cards Row */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
          >
            {mappedList.map((item: any) => (
              <div
                key={item.id}
                className="flex w-full flex-shrink-0 snap-start flex-col rounded-2xl border border-slate-200 p-6 shadow-sm sm:w-[calc((100%-2.5rem)/3)]"
              >
                <div className="mb-5 flex h-24 w-full items-center justify-center">
                  {item.icon ? (
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="h-24 max-w-[160px] object-contain"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-slate-50 border border-slate-200">
                      <ShieldCheck className="h-10 w-10 text-slate-400" />
                    </div>
                  )}
                </div>

                <h3 className="mb-2 text-center text-base font-bold text-slate-900 leading-tight">
                  {item.label}
                </h3>

                <p className="text-center text-sm leading-6 text-slate-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Left scroll arrow */}
          <button
            type="button"
            onMouseDown={preventFocusScroll}
            onClick={scrollLeft}
            aria-label="Scroll left"
            className="__carArrow"
            style={leftArrowStyle()}
          >
            <ChevronLeft size={16} />
          </button>

          {/* Right scroll arrow */}
          <button
            type="button"
            onMouseDown={preventFocusScroll}
            onClick={scrollRight}
            aria-label="Scroll right"
            className="__carArrow"
            style={rightArrowStyle()}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .__carArrow:hover {
          background: #333333 !important;
        }

        @media (max-width: 640px) {
          .__carArrow {
            top: 115px !important;
            bottom: auto !important;
            margin: 0 !important;
            transform: translateY(-50%) !important;
          }
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
