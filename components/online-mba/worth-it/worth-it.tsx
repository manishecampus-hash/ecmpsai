"use client";

import React from "react";
import {
  Clock,
  Globe2,
  Wallet,
  Briefcase,
  Award,
  Target,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

interface Reason {
  title: string;
  description: string;
  icon: LucideIcon;
}

const REASONS: Reason[] = [
  {
    title: "Convenience",
    description:
      "An online MBA program enables learners to pursue their studies around a flexible schedule, offering resources and recorded sessions alongside scheduled live classes depending on their convenience. This educational method enables students to maintain a proper equilibrium between their academic responsibilities and their work responsibilities alongside family obligations.",
    icon: Clock,
  },
  {
    title: "Global Reach",
    description:
      "Internet access lets you get top university coursework from locations throughout the world, even if you don't move.",
    icon: Globe2,
  },
  {
    title: "Lower Costs",
    description:
      "Online MBA programs usually cost less than their conventional on-campus equivalents due to their reduced expenses. Students benefit financially from cutting expenses regarding transportation and residence, as well as general living costs.",
    icon: Wallet,
  },
  {
    title: "Study While Working",
    description:
      "Working students can pursue their MBA studies through online programs so they can maintain their current employment. The educational concepts become immediately apparent, which enables you to translate them into work.",
    icon: Briefcase,
  },
  {
    title: "Leadership and Managerial Skills",
    description:
      "An MBA provides students with essential leadership abilities together with managerial competencies that enable them to advance in their careers or transition to new professional territories.",
    icon: Award,
  },
  {
    title: "Specializations",
    description:
      "The program allows students to select an academic focus (finance, marketing, or data analytics) that develops their skills in a particular field of expertise.",
    icon: Target,
  },
  {
    title: "Innovative Learning Methods",
    description:
      "The learning experience improves through online programs because they adopt state-of-the-art technological solutions, including interactive assignments, live webinars, and video lectures.",
    icon: Sparkles,
  },
  {
    title: "Increased Earning Potential",
    description:
      "Professional leaders almost universally consider the Master of Business Administration their top qualification to reach executive positions. The salary growth post-graduation, along with expanded career possibilities, frequently becomes accessible to MBA graduates.",
    icon: TrendingUp,
  },
];

const DEMAND_STATS = [
  { label: "Growing Market", value: "30%" },
  { label: "Flexibility", value: "75%" },
  { label: "Career Benefits", value: "55%" },
  { label: "Specialization Options", value: "70–80%" },
];

const FUTURE_SPECIALIZATIONS =
  "operations management, finance management, human resources, international business, marketing, health administration, business analytics, information technology, supply chain management, management consulting, entrepreneurship, agribusiness, general management, strategy, pharmaceutical management, project management, digital marketing, and more.";

export default function WorthIt() {
  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
          Is <span className="text-red-500">Online MBA</span> Worth It?
        </h2>
      </div>

      <p className="max-w-4xl text-sm leading-relaxed text-slate-600 sm:text-base">
        Pursuing an online MBA course can be a valuable investment depending
        on your personal goals, career aspirations, and learning
        preferences. Here are some reasons why it might be worth pursuing:
      </p>

      {/* Demand stats panel */}
      <div className="mt-8 rounded-2xl border border-red-100 bg-red-50/40 p-6 sm:p-8">
        <h3 className="text-center text-lg font-bold text-slate-900 sm:text-xl">
          Demand of Online MBA Course
        </h3>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {DEMAND_STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-3 rounded-xl bg-white px-3 py-5 shadow-sm border border-red-100"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-red-200 text-sm font-extrabold text-red-500 sm:h-16 sm:w-16 sm:text-base">
                {stat.value}
              </span>
              <span className="text-center text-xs font-semibold text-slate-700 sm:text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reasons list */}
      <div className="mt-10 rounded-3xl border border-slate-200 bg-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] overflow-hidden">
        {REASONS.map((reason, i) => {
          const Icon = reason.icon;
          return (
            <div
              key={reason.title}
              className={`flex gap-4 px-5 py-6 sm:px-8 ${
                i !== REASONS.length - 1 ? "border-b border-slate-100" : ""
              } ${i % 2 === 1 ? "bg-red-50/20" : ""}`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500 text-white shadow-md shadow-red-500/30">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                <span className="font-bold text-slate-900">
                  {reason.title}:
                </span>{" "}
                {reason.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Future aspects */}
      <div className="mt-10 max-w-4xl">
        <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
          Future Aspects of the <span className="text-red-500">Online MBA</span>{" "}
          Course
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          Learning the online MBA course will be immensely broader and more
          accessible, with highly personalized, in-depth integration with
          emerging technologies, including VR and AI, and an emphasis on
          future-oriented business skills, sustainability, data analytics,
          and ethical leadership.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
          In the coming years, we can expect features like virtual learning
          spaces, personalized learning powered by AI, a strong focus on AI
          applications and data analysis, teamwork across the globe with
          different viewpoints, a commitment to ethical and sustainable
          business practices, partnerships with industries and real-world
          case studies, short courses and flexible learning options, and
          more.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
          In the future, students will pursue the top specializations in the
          online MBA course, which will offer superior outcomes and
          increased opportunities. The specializations are{" "}
          {FUTURE_SPECIALIZATIONS}
        </p>
      </div>

      {/* GMAC stat highlight */}
      <div className="mt-6 flex max-w-4xl items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
          <TrendingUp className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
          As per GMAC (Graduate Management Admission Council), MBA graduates
          typically earn a{" "}
          <span className="font-semibold text-slate-900">
            77% higher median salary
          </span>{" "}
          compared to bachelor&apos;s degree holders, along with stronger
          promotion rates and long-term career mobility. This makes pursuing
          an online MBA a strong long-term decision for professionals aiming
          for leadership or managerial roles and a substantial salary
          increase.
        </p>
      </div>
    </section>
  );
}