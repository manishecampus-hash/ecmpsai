"use client";

import { useEffect, useState } from "react";
import { Handshake } from "lucide-react";

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
      {isDecimal ? count.toFixed(1) : Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const stats = [
    { value: 100, suffix: "+", label: "Listed Universities" },
    { value: 4.6, isDecimal: true, suffix: "/5", label: "Program Rating" },
    { value: 50, suffix: "%", label: "Avg. Hike Post Program*" },
    { value: 10000, suffix: "+", label: "Learners Associated" },
  ];

  return (
    <section
      style={{
        background:
          "radial-gradient(circle at top right, rgba(255, 59, 79, 0.12), transparent 35%), #05070d",
      }}
      className="relative w-full px-4 py-10 text-slate-100 sm:px-6"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <Handshake className="h-3.5 w-3.5 text-red-500" />
            Your goals are our goals
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl text-white">
            Invest In Yourself <span className="text-red-500">Today</span>
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#111827] p-4 sm:p-5 shadow-[0_12px_30px_rgba(0,0,0,0.28)]">
          <div className="grid grid-cols-2 divide-y divide-white/5 sm:grid-cols-4 sm:divide-x sm:divide-y-0 sm:divide-white/10">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center px-3 py-4 text-center"
              >
                <div className="mb-1 text-2xl font-black text-[#ff3b4f] sm:text-3xl">
                  <Counter
                    end={stat.value}
                    suffix={stat.suffix}
                    isDecimal={stat.isDecimal}
                  />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wide text-slate-300 sm:text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
