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
    const iconProps = "h-4 w-4 sm:h-5 sm:w-5";
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
    <section className="relative bg-gradient-to-b from-white via-slate-50/30 to-white px-4 py-12 sm:px-8 sm:py-16 lg:px-12">
      <div className="mx-auto max-w-[1100px]">
        {/* Header */}
        <div className="mb-10 text-center sm:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#ff3b4d]/20 bg-[#ff3b4d]/5 px-3 py-1.5 sm:mb-5 sm:px-4 sm:py-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#ff3b4d]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#ff3b4d] sm:text-xs sm:tracking-[0.12em]">
              The Real Story
            </span>
          </div>

          <h2 className="mt-2 text-[24px] font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            Why Success Rates Differ So{" "}
            <span className="text-red-500">Drastically</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-6 text-slate-600 sm:mt-5 sm:text-[17px] sm:leading-7">
            Direct comparison from 10,000+ students who experienced both paths
          </p>
        </div>

        {/* Premium Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
          {/* Table Header - hidden on mobile, each row carries its own labels instead */}
          <div className="hidden border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 sm:grid sm:grid-cols-3">
            <div className="px-6 py-5">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500">
                Aspect
              </p>
            </div>
            <div className="border-l border-slate-200 px-6 py-5">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-slate-500">
                <span className="h-2 w-2 rounded-full bg-[#ff3b4d]" />
                IGNOU Reality
              </p>
            </div>
            <div className="border-l border-slate-200 px-6 py-5">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-slate-500">
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
                className={`grid grid-cols-1 gap-0 transition-colors duration-200 hover:bg-slate-50/50 sm:grid-cols-3 ${
                  index % 2 === 1 ? "bg-slate-50/30" : ""
                }`}
              >
                {/* Category */}
                <div className="px-4 pt-4 pb-2 sm:px-6 sm:py-5">
                  <p className="text-[13px] font-semibold tracking-tight text-[#0f1f3d] sm:text-sm">
                    {item.category}
                  </p>
                </div>

                {/* Left - IGNOU */}
                <div className="border-slate-100 px-4 py-2 sm:border-l sm:px-6 sm:py-5">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div className="mt-0.5 flex-shrink-0">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100/60 sm:h-7 sm:w-7">
                        <X
                          className="h-3.5 w-3.5 text-[#ff3b4d] sm:h-4 sm:w-4"
                          strokeWidth={3}
                        />
                      </div>
                    </div>
                    <p className="text-[13px] leading-6 text-slate-700 sm:text-[14px]">
                      <span className="mr-1.5 font-bold uppercase tracking-wide text-[10px] text-slate-400 sm:hidden">
                        IGNOU:
                      </span>
                      <span className="font-medium">{item.left.text}</span>
                    </p>
                  </div>
                </div>

                {/* Right - Online */}
                <div className="border-slate-100 px-4 pt-2 pb-4 sm:border-l sm:px-6 sm:py-5">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div className="mt-0.5 flex-shrink-0">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100/60 sm:h-7 sm:w-7">
                        {getIconComponent(item.right.icon)}
                      </div>
                    </div>
                    <p className="text-[13px] leading-6 text-slate-700 sm:text-[14px]">
                      <span className="mr-1.5 font-bold uppercase tracking-wide text-[10px] text-slate-400 sm:hidden">
                        Online:
                      </span>
                      <span className="font-medium">{item.right.text}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 gap-3 xs:grid-cols-3 sm:mt-10 sm:gap-4">
          <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-red-50/50 to-white px-4 py-4 text-center sm:px-6 sm:py-5">
            <p className="text-xl font-bold text-[#ff3b4d] sm:text-2xl">
              15-20%
            </p>
            <p className="mt-1 text-[13px] text-slate-600 sm:text-sm">
              IGNOU Completion Rate
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-green-50/50 to-white px-4 py-4 text-center sm:px-6 sm:py-5">
            <p className="text-xl font-bold text-green-600 sm:text-2xl">95%+</p>
            <p className="mt-1 text-[13px] text-slate-600 sm:text-sm">
              Online Completion Rate
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-blue-50/50 to-white px-4 py-4 text-center sm:px-6 sm:py-5">
            <p className="text-xl font-bold text-blue-600 sm:text-2xl">6x</p>
            <p className="mt-1 text-[13px] text-slate-600 sm:text-sm">
              Better Success Rate
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
          <button className="h-[52px] rounded-xl bg-[#ff3b4d] px-6 font-bold text-white transition-all duration-200 hover:bg-[#f52f43] hover:shadow-[0_8px_16px_rgba(255,59,77,0.3)] active:scale-95 sm:h-[56px] sm:px-8">
            See Full Comparison
          </button>
          <button className="h-[52px] rounded-xl border-2 border-[#0f1f3d] px-6 font-bold text-[#0f1f3d] transition-all duration-200 hover:bg-[#0f1f3d] hover:text-white sm:h-[56px] sm:px-8">
            Talk to an Advisor
          </button>
        </div>
      </div>
    </section>
  );
}
