"use client";

import { useEffect, useState } from "react";
import { Handshake, Award, TrendingUp, Users, Sparkles } from "lucide-react";

function Counter({
  end,
  duration = 2000,
  suffix = "",
  isDecimal = false,
}: {
  end: number;
  duration?: number;
  suffix?: string;
  isDecimal?: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <span>
      {isDecimal
        ? count.toFixed(1)
        : Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const stats = [
    {
      value: 100,
      suffix: "+",
      label: "Listed Universities",
      icon: Award,
    },
    {
      value: 4.6,
      isDecimal: true,
      suffix: "/5",
      label: "Program Rating",
      icon: Sparkles,
    },
    {
      value: 50,
      suffix: "%",
      label: "Avg. Hike Post Program*",
      icon: TrendingUp,
    },
    {
      value: 10000,
      suffix: "+",
      label: "Learners Associated",
      icon: Users,
    },
  ];

  return (
    <section className="relative w-full bg-gradient-to-b from-[#0B0F19] via-[#0F1422] to-[#0B0F19] px-4 py-12 text-slate-100 sm:px-6 sm:py-16 overflow-hidden border-b border-slate-800/80">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 h-64 w-64 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700/80 bg-slate-800/60 backdrop-blur px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-200">
            <Handshake className="h-3.5 w-3.5 text-red-500" />
            Empowering Your Future
          </span>

          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Invest In Yourself <span className="text-red-500">Today</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-normal leading-relaxed">
            Discover top UGC-recognized &amp; NAAC A+ accredited online universities. Compare programs, fees, and career outcomes.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md p-4 sm:p-6 shadow-[0_16px_36px_rgba(0,0,0,0.35)]">
          <div className="grid grid-cols-2 divide-y divide-slate-800/60 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-3 sm:p-4 text-center group"
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Icon className="h-4 w-4 text-red-400 group-hover:scale-110 transition-transform" />
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                      <Counter
                        end={stat.value}
                        suffix={stat.suffix}
                        isDecimal={stat.isDecimal}
                      />
                    </span>
                  </div>

                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}