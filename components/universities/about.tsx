"use client";

import React, { useState } from "react";
import { ImageIcon } from "lucide-react";

interface AboutProgramProps {
  university?: any;
}

export default function AboutProgram({ university }: AboutProgramProps) {
  const aboutData = university?.details?.about;
  const uniDisplayName = university?.name || "Amity University Online";
  const uniImage = aboutData?.imageUrl || aboutData?.image || university?.image;

  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="why"
      className="bg-white px-4 -mt-2 pt-0 pb-14 sm:px-6 sm:-mt-4 sm:pt-1 lg:px-8 lg:-mt-12 lg:pb-20"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 font-sans">
        {/* Intro: image left, About copy right */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Image slot */}
          <div className="order-1">
            <div className="relative w-full overflow-hidden border border-dashed border-slate-200 bg-slate-50 aspect-[4/3] flex items-center justify-center rounded-2xl">
              {uniImage ? (
                <img
                  src={uniImage}
                  alt={`${uniDisplayName} Campus`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-300">
                  <ImageIcon className="h-10 w-10" />
                  <span className="text-xs font-medium text-slate-400">
                    Campus image goes here
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Text */}
          <div className="order-2 text-left">
            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-3xl">
              {aboutData?.heading ? (
                <span dangerouslySetInnerHTML={{ __html: aboutData.heading }} />
              ) : (
                <>
                  About Amity University <span className="text-red-500">Online</span>
                </>
              )}
            </h2>

            <div className="mt-4 max-w-2xl text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
              {aboutData?.description ? (
                <div dangerouslySetInnerHTML={{ __html: aboutData.description }} />
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

            {/* Dynamic Tabs (if configured in Admin UI) */}
            {aboutData?.tabs && aboutData.tabs.length > 0 && (
              <div className="mt-6 border-t border-slate-100 pt-6">
                <div className="flex border-b border-slate-200 gap-4 overflow-x-auto pb-1 subheader-scroll">
                  {aboutData.tabs.map((tab: any, idx: number) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveTab(idx)}
                      className={`pb-2 text-sm font-semibold border-b-2 whitespace-nowrap transition outline-none ${
                        activeTab === idx
                          ? "border-red-500 text-red-500"
                          : "border-transparent text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>
                <div className="mt-4 text-sm text-slate-600 leading-relaxed">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: aboutData.tabs[activeTab]?.content || "",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
