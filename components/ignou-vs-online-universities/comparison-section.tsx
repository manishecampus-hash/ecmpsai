"use client";

import { Check, X, BookOpen, Users, Zap, Award } from "lucide-react";

export function ComparisonSection() {
  const comparisonData = [
    {
      id: 1,
      category: "Faculty Support",
      left: {
        text: "Limited Faculty Interaction",
        icon: "book",
      },
      right: {
        text: "Direct Access to Mentors",
        icon: "users",
      },
    },
    {
      id: 2,
      category: "Learning Structure",
      left: {
        text: "Self-Paced, No Guidance",
        icon: "zap",
      },
      right: {
        text: "Structured Learning Path",
        icon: "award",
      },
    },
    {
      id: 3,
      category: "Examination",
      left: {
        text: "Scattered Exam Centres",
        icon: "book",
      },
      right: {
        text: "Secure Online Proctoring",
        icon: "check",
      },
    },
    {
      id: 4,
      category: "Career Support",
      left: {
        text: "Job Placement Uncertain",
        icon: "x",
      },
      right: {
        text: "Guaranteed Career Support",
        icon: "award",
      },
    },
    {
      id: 5,
      category: "Completion Rate",
      left: {
        text: "High Abandonment Rate",
        icon: "x",
      },
      right: {
        text: "95%+ Completion Rate",
        icon: "check",
      },
    },
    {
      id: 6,
      category: "Progress Tracking",
      left: {
        text: "No Real-Time Tracking",
        icon: "x",
      },
      right: {
        text: "AI-Powered Performance Dashboard",
        icon: "zap",
      },
    },
  ];

  const getIconComponent = (iconName) => {
    const iconProps = "h-5 w-5";
    switch (iconName) {
      case "check":
        return <Check className={`${iconProps} text-green-600`} />;
      case "x":
        return <X className={`${iconProps} text-[#ff3b4d]`} />;
      case "book":
        return <BookOpen className={`${iconProps} text-slate-500`} />;
      case "users":
        return <Users className={`${iconProps} text-green-600`} />;
      case "zap":
        return <Zap className={`${iconProps} text-green-600`} />;
      case "award":
        return <Award className={`${iconProps} text-green-600`} />;
      default:
        return null;
    }
  };

  return (
    <section className="relative py-16 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-white via-slate-50/30 to-white">
      <div className="mx-auto max-w-[1100px]">
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ff3b4d]/20 bg-[#ff3b4d]/5 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#ff3b4d]" />
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#ff3b4d]">
              The Real Story
            </span>
          </div>

          <h2 className="max-w-3xl mx-auto text-[36px] font-bold leading-[1.15] tracking-[-1.8px] text-[#0f1f3d] sm:text-[42px] lg:text-[48px]">
            Why Success Rates Differ So Drastically
          </h2>

          <p className="mt-5 text-[16px] leading-7 text-slate-600 sm:text-[17px] max-w-2xl mx-auto">
            Direct comparison from 10,000+ students who experienced both paths
          </p>
        </div>

        {/* Premium Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
          {/* Table Header */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
            <div className="px-6 py-5 sm:col-span-1">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500">
                Aspect
              </p>
            </div>
            <div className="px-6 py-5 sm:col-span-1 border-l border-slate-200">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#ff3b4d]" />
                IGNOU Reality
              </p>
            </div>
            <div className="px-6 py-5 sm:col-span-1 border-l border-slate-200">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-600" />
                Online Alternative
              </p>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-100">
            {comparisonData.map((item, index) => (
              <div
                key={item.id}
                className={`grid grid-cols-1 sm:grid-cols-3 gap-0 hover:bg-slate-50/50 transition-colors duration-200 ${
                  index % 2 === 1 ? "bg-slate-50/30" : ""
                }`}
              >
                {/* Category */}
                <div className="px-6 py-5 sm:col-span-1">
                  <p className="text-sm font-semibold text-[#0f1f3d] tracking-tight">
                    {item.category}
                  </p>
                </div>

                {/* Left - IGNOU */}
                <div className="px-6 py-5 sm:col-span-1 sm:border-l border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100/60">
                        <X className="h-4 w-4 text-[#ff3b4d]" strokeWidth={3} />
                      </div>
                    </div>
                    <p className="text-[14px] leading-6 text-slate-700 font-medium">
                      {item.left.text}
                    </p>
                  </div>
                </div>

                {/* Right - Online */}
                <div className="px-6 py-5 sm:col-span-1 sm:border-l border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100/60">
                        {getIconComponent(item.right.icon)}
                      </div>
                    </div>
                    <p className="text-[14px] leading-6 text-slate-700 font-medium">
                      {item.right.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-red-50/50 to-white px-6 py-5 text-center">
            <p className="text-2xl font-bold text-[#ff3b4d]">15-20%</p>
            <p className="mt-1 text-sm text-slate-600">IGNOU Completion Rate</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-green-50/50 to-white px-6 py-5 text-center">
            <p className="text-2xl font-bold text-green-600">95%+</p>
            <p className="mt-1 text-sm text-slate-600">
              Online Completion Rate
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-blue-50/50 to-white px-6 py-5 text-center">
            <p className="text-2xl font-bold text-blue-600">6x</p>
            <p className="mt-1 text-sm text-slate-600">Better Success Rate</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="h-[56px] px-8 bg-[#ff3b4d] text-white font-bold rounded-xl hover:bg-[#f52f43] transition-all duration-200 hover:shadow-[0_8px_16px_rgba(255,59,77,0.3)] active:scale-95">
            See Full Comparison
          </button>
          <button className="h-[56px] px-8 border-2 border-[#0f1f3d] text-[#0f1f3d] font-bold rounded-xl hover:bg-[#0f1f3d] hover:text-white transition-all duration-200">
            Talk to an Advisor
          </button>
        </div>
      </div>
    </section>
  );
}
