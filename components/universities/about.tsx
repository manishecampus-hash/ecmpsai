"use client";

import React, { useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronRight,
  Award,
  Users,
  TrendingUp,
  Globe,
  CreditCard,
  Shield,
  Building2,
  Briefcase,
  GraduationCap,
  Handshake,
  Info,
  CircleHelp,
} from "lucide-react";

type TabKey =
  | "Program Overview"
  | "Skills You Will Learn"
  | "Eligibility"
  | "Who is this Program for"
  | "Program Fee";

const feeCards = [
  {
    label: "Total Program Fee",
    value: "₹1,75,000",
    subtext: "(inclusive of Taxes)",
    icon: <CreditCard className="h-6 w-6 text-red-500" />,
    iconBg: "bg-red-50",
  },
  {
    label: "Flexible Payment",
    description: "Easy EMIs & installment options available",
    icon: <CreditCard className="h-6 w-6 text-orange-500" />,
    iconBg: "bg-orange-50",
  },
  {
    label: "No Hidden Charges",
    description: "Transparent fee structure with complete clarity",
    icon: <Shield className="h-6 w-6 text-emerald-500" />,
    iconBg: "bg-emerald-50",
  },
];

const eligibilityCards = [
  {
    label: "Academic Qualification",
    description:
      "Bachelor's degree (10+2+3) from a recognised university in any discipline.",
    icon: <Building2 className="h-6 w-6 text-red-500" />,
    iconBg: "bg-red-50",
  },
  {
    label: "Work Experience",
    description: "Minimum one year of work experience preferred.",
    icon: <Briefcase className="h-6 w-6 text-red-500" />,
    iconBg: "bg-red-50",
  },
  {
    label: "Diploma Holders",
    description:
      "Diploma holders with relevant professional experience may also apply.",
    icon: <GraduationCap className="h-6 w-6 text-red-500" />,
    iconBg: "bg-red-50",
  },
];

const tabContent: Record<
  TabKey,
  {
    heading: string;
    subtext: string;
    list: string[];
  }
> = {
  "Program Overview": {
    heading: "Program <span class='text-red-600'>Overview</span>",
    subtext:
      "The IIM Kozhikode HR Analytics programme is designed for working professionals who want to combine human resource leadership with analytical decision-making. The curriculum integrates strategic HR frameworks, business context, and modern analytics tools to help learners solve workforce challenges through data-driven insights.",
    list: [],
  },
  "Skills You Will Learn": {
    heading: "Skills You Will <span class='text-red-600'>Learn</span>",
    subtext:
      "Develop practical capabilities required to lead modern HR functions where business strategy, people management, and analytics work together.",
    list: [
      "Strategic HR management and business alignment",
      "People analytics and workforce intelligence",
      "Data interpretation and dashboard reporting",
      "Talent acquisition and retention analytics",
      "Performance measurement frameworks",
      "Compensation and workforce planning",
      "Predictive modelling for HR decision-making",
      "AI-enabled human capital insights",
    ],
  },
  Eligibility: {
    heading: "Minimum <span class='text-red-600'>Eligibility</span>",
    subtext:
      "The programme is intended for professionals who wish to strengthen analytical thinking within HR, people strategy, and organisational decision-making.",
    list: [
      "Bachelor's degree (10+2+3) from a recognised university",
      "Diploma holders with relevant professional experience may also apply",
      "Minimum one year of work experience preferred",
      "Suitable for HR, operations, consulting, and business professionals",
      "Basic familiarity with business functions is beneficial",
      "No prior analytics background required",
    ],
  },
  "Who is this Program for": {
    heading: "Who Can <span class='text-red-600'>Pursue This Program?</span>",
    subtext:
      "Ideal for professionals aiming to move beyond traditional HR execution and build strategic capability through data-backed decision-making.",
    list: [
      "HR executives and people managers",
      "Mid-career professionals transitioning into strategic HR roles",
      "Business leaders managing workforce decisions",
      "Analysts interested in people and organisational data",
      "Entrepreneurs building high-performance teams",
      "Professionals preparing for leadership roles in HR",
    ],
  },
  "Program Fee": {
    heading: "Program <span class='text-red-600'>Fee & Investment</span>",
    subtext:
      "The programme fee is structured to provide strong long-term career value while offering flexibility for professionals balancing work and learning commitments.",
    list: [
      "Transparent fee structure with no hidden charges",
      "Flexible payment and instalment options",
      "EMI facilities available through supported partners",
      "Access to live sessions, learning materials, and assessments",
      "Certificate awarded upon successful completion",
      "Strong long-term career ROI through executive upskilling",
    ],
  },
};

interface AboutProgramProps {
  university?: any;
}

export default function AboutProgram({ university }: AboutProgramProps) {
  const aboutData = university?.details?.about;

  const dynamicTabs = useMemo(() => {
    if (aboutData?.tabs && aboutData.tabs.length > 0) {
      return aboutData.tabs.map((t: any) => t.label);
    }
    return [
      "Program Overview",
      "Skills You Will Learn",
      "Eligibility",
      "Who is this Program for",
      "Program Fee",
    ];
  }, [aboutData]);

  const [activeTab, setActiveTab] = useState<string>("Program Overview");

  React.useEffect(() => {
    if (dynamicTabs.length > 0 && !dynamicTabs.includes(activeTab)) {
      setActiveTab(dynamicTabs[0]);
    }
  }, [dynamicTabs, activeTab]);

  const currentContent = useMemo(() => {
    if (aboutData?.tabs && aboutData.tabs.length > 0) {
      const matched = aboutData.tabs.find((t: any) => t.label === activeTab);
      if (matched) {
        return {
          heading: matched.heading,
          subtext: matched.subtext,
          list: matched.points || [],
        };
      }
    }
    const fallback = tabContent[activeTab as TabKey];
    if (fallback) return fallback;
    return { heading: "", subtext: "", list: [] };
  }, [aboutData, activeTab]);

  return (
    <section
      id="why"
      className="bg-white px-4 pt-4 pb-14 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8 lg:pb-20"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 text-center font-[Inter]">
        <div className="mx-auto max-w-3xl px-2 sm:px-6 text-center mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <CircleHelp className="h-3.5 w-3.5 text-red-500" />
            About
          </span>

          <h2 className="mt-0.5 text-[22px] font-bold tracking-tight text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl">
            {aboutData?.heading || (
              <>
                About {university?.name || "IIM K HR Analytics"}{" "}
                <span className="text-red-500">Course</span>
              </>
            )}
          </h2>

          {aboutData?.description && (
            <p className="mt-3 max-w-3xl mx-auto text-sm text-slate-600 leading-relaxed">
              {aboutData.description}
            </p>
          )}
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="flex flex-col gap-2 rounded-3xl border border-slate-100 bg-white p-2 sticky top-3 lg:top-16">
              {dynamicTabs.map((tab) => {
                const active = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`group flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm font-semibold transition-all duration-200 sm:px-4 sm:py-4 sm:text-[15px] ${
                      active
                        ? "bg-red-50 text-red-600 shadow-sm"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span className="pr-3 leading-snug break-words">{tab}</span>
                    <ChevronRight
                      className={`h-4 w-4 shrink-0 transition-all duration-200 ${
                        active
                          ? "translate-x-1 opacity-100"
                          : "opacity-0 group-hover:opacity-60"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content panel */}
          <div className="lg:col-span-8">
            <div className="rounded-[28px] border border-slate-100 bg-slate-50 p-4 sm:p-6 lg:p-8 shadow-sm flex flex-col items-center text-center">
              <div
                key={activeTab}
                className="animate-in fade-in slide-in-from-right-4 duration-300 w-full flex flex-col items-center"
              >
                {activeTab === "Eligibility" && (
                  <span className="text-xs font-bold text-red-600 tracking-widest uppercase mb-3">
                    Eligibility
                  </span>
                )}
                <h3
                  className="text-xl font-bold leading-tight text-slate-900 sm:text-2xl md:text-3xl"
                  dangerouslySetInnerHTML={{
                    __html: currentContent.heading,
                  }}
                />

                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  {currentContent.subtext}
                </p>

                {/* Conditional centered grid container configurations */}
                <div
                  className={`mt-6 grid grid-cols-1 gap-4 mx-auto w-full ${
                    activeTab === "Program Overview"
                      ? "sm:grid-cols-2 max-w-md"
                      : activeTab === "Program Fee"
                        ? "sm:grid-cols-3 max-w-4xl"
                        : activeTab === "Eligibility"
                          ? "sm:grid-cols-3 max-w-4xl"
                          : "sm:grid-cols-2 max-w-2xl"
                  }`}
                >
                  {activeTab === "Program Overview"
                    ? null
                    : activeTab === "Program Fee"
                      ? feeCards.map((card, idx) => (
                          <div
                            key={idx}
                            className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm w-full hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`rounded-lg p-2 ${card.iconBg} flex-shrink-0`}
                              >
                                {card.icon}
                              </div>
                              <div className="text-left flex-1">
                                <h4 className="font-semibold text-slate-900 text-sm">
                                  {card.label}
                                </h4>
                                {card.value && (
                                  <div className="mt-2">
                                    <div className="text-lg sm:text-xl font-bold text-slate-900">
                                      {card.value}
                                    </div>
                                    {card.subtext && (
                                      <div className="text-xs text-slate-500 mt-1">
                                        {card.subtext}
                                      </div>
                                    )}
                                  </div>
                                )}
                                {card.description && (
                                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                                    {card.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      : activeTab === "Eligibility"
                        ? eligibilityCards.map((card, idx) => (
                            <div
                              key={idx}
                              className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm w-full hover:shadow-md transition-shadow"
                            >
                              <div className="flex flex-col items-center text-center gap-3">
                                <div
                                  className={`rounded-lg p-2 ${card.iconBg} flex-shrink-0`}
                                >
                                  {card.icon}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-slate-900 text-sm">
                                    {card.label}
                                  </h4>
                                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                                    {card.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        : currentContent.list.map((item) => (
                            <div
                              key={item}
                              className="flex flex-col items-center text-center gap-2 rounded-2xl bg-white px-4 py-4 shadow-sm w-full"
                            >
                              <div className="rounded-full border border-red-100 bg-red-50 p-1">
                                <CheckCircle2 className="h-4 w-4 text-red-500" />
                              </div>
                              <span className="text-sm font-medium leading-relaxed text-slate-700">
                                {item}
                              </span>
                            </div>
                          ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
