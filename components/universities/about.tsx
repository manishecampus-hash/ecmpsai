"use client";

import React from "react";
import { ImageIcon } from "lucide-react";
import HighlightedText from "./HighlightedText";

interface AboutProgramProps {
  university?: any;
}

export default function AboutProgram({ university }: AboutProgramProps) {
  const aboutData = university?.details?.about;
  const uniDisplayName = university?.name || "Amity University Online";
  const uniImage = aboutData?.image || aboutData?.imageUrl || university?.image;

  return (
    <section
      id="why"
      className="bg-white px-4 -mt-2 pt-0 pb-14 sm:px-6 sm:-mt-4 sm:pt-1 lg:px-8 lg:-mt-12 lg:pb-20"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 font-[Inter]">
        {/* Intro: image left, About copy right */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Image slot */}
          {uniImage ? (
            <div className="order-1">
              <div className="relative w-full overflow-hidden aspect-[4/3] rounded-2xl">
                <img
                  src={uniImage}
                  alt={`${uniDisplayName} Campus`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="order-1">
              <div className="relative w-full overflow-hidden border border-slate-200 bg-slate-50 aspect-[4/3] flex items-center justify-center rounded-2xl text-slate-400 text-sm font-medium">
                Image coming soon
              </div>
            </div>
          )}

          {/* Text */}
          <div className="order-2 text-left">
            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-3xl">
              {aboutData?.heading ? (
                aboutData.heading.includes("*") ? (
                  <HighlightedText text={aboutData.heading} />
                ) : (
                  <>
                    {aboutData.heading.split(" ").slice(0, -1).join(" ")}{" "}
                    <span className="text-red-500">
                      {aboutData.heading.split(" ").slice(-1)}
                    </span>
                  </>
                )
              ) : (
                <>
                  About {uniDisplayName.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="text-red-500">
                    {uniDisplayName.split(" ").slice(-1)}
                  </span>
                </>
              )}
            </h2>

            <div className="mt-4 max-w-2xl text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
              {aboutData?.description ? (
                <div dangerouslySetInnerHTML={{ __html: aboutData.description }} className="space-y-3 rich-text-content" />
              ) : (
                <>
                  <p>
                    <strong className="font-semibold text-slate-900">
                      {uniDisplayName}
                    </strong>{" "}
                    is one of India&apos;s leading private universities, widely
                    recognized for its academic excellence, global outlook, and
                    industry-focused education. Established with a vision to
                    nurture talent and create future-ready professionals,{" "}
                    {university?.name || "Amity"} offers a diverse range of
                    undergraduate, postgraduate, and doctoral programs across
                    multiple disciplines.
                  </p>
                  <p className="mt-3">
                    The university is{" "}
                    <strong className="font-semibold text-slate-900">
                      UGC-approved
                    </strong>{" "}
                    and{" "}
                    <strong className="font-semibold text-slate-900">
                      NAAC accredited
                    </strong>
                    , demonstrating its strong academic standards and commitment
                    to quality education.{" "}
                    {university?.name || "Amity University"} is particularly
                    well known for its programs in Management, Engineering,
                    Computer Applications, Commerce, Sciences, Humanities, Law,
                    and Online Education, with a strong emphasis on research,
                    innovation, and practical learning.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
