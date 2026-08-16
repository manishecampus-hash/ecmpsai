"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, Award, Zap } from "lucide-react";

export function CareerMomentumChart() {
  const chartData = [
    { stage: "Enrollment", online: 25, distance: 20, label: "Start" },
    { stage: "Year 1", online: 35, distance: 26, label: "Foundation" },
    { stage: "Year 2", online: 55, distance: 38, label: "Progress" },
    { stage: "Year 3", online: 72, distance: 48, label: "Advanced" },
    { stage: "Graduation", online: 88, distance: 62, label: "Complete" },
    { stage: "Placement", online: 95, distance: 72, label: "Employed" },
  ];

  const stats = [
    {
      id: 1,
      label: "Online Success Rate",
      value: "95%",
      icon: TrendingUp,
      color: "from-emerald-50/60 to-emerald-100/40",
      textColor: "text-emerald-600",
      borderColor: "border-emerald-200",
    },
    {
      id: 2,
      label: "Distance Success Rate",
      value: "72%",
      icon: Award,
      color: "from-[#ff3b4d]/5 to-[#ff3b4d]/10",
      textColor: "text-[#ff3b4d]",
      borderColor: "border-[#ff3b4d]/20",
    },
    {
      id: 3,
      label: "Growth Advantage",
      value: "23%",
      icon: Zap,
      color: "from-[#0f1f3d]/5 to-[#0f1f3d]/10",
      textColor: "text-[#0f1f3d]",
      borderColor: "border-[#0f1f3d]/20",
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-lg">
          <p className="font-semibold text-[#0f1f3d] text-sm">
            {payload[0].payload.stage}
          </p>
          <p className="text-xs text-slate-600 mt-1">
            {payload[0].payload.label}
          </p>
          <div className="mt-2 space-y-1">
            {payload.map((entry, index) => (
              <p
                key={index}
                className="text-sm font-medium"
                style={{ color: entry.color }}
              >
                {entry.name}: {entry.value}%
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="relative py-8 px-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1000px]">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#ff3b4d]/20 bg-[#ff3b4d]/5 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#ff3b4d]" />
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#ff3b4d]">
              Data Driven Insights
            </span>
          </div>

          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 whitespace-nowrap sm:text-3xl md:text-4xl">
            Career Growth <span className="text-red-500"> Trajectory</span>
          </h2>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className={`rounded-xl border ${stat.borderColor} bg-gradient-to-br ${stat.color} px-6 py-5 backdrop-blur-sm`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-700">
                      {stat.label}
                    </p>
                    <p className={`text-3xl font-bold mt-2 ${stat.textColor}`}>
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${stat.color} border ${stat.borderColor}`}
                  >
                    <Icon className={`h-6 w-6 ${stat.textColor}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chart Container */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
          {/* Chart */}
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorOnline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.01} />
                </linearGradient>
                <linearGradient id="colorDistance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff3b4d" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#ff3b4d" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="stage"
                stroke="#94a3b8"
                style={{ fontSize: "14px", fontWeight: 500 }}
              />
              <YAxis
                stroke="#94a3b8"
                style={{ fontSize: "14px", fontWeight: 500 }}
                label={{
                  value: "Progress Score",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: "#64748b" },
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                iconType="line"
                formatter={(value) => (
                  <span className="font-medium text-sm text-slate-700">
                    {value}
                  </span>
                )}
              />
              <Area
                type="monotone"
                dataKey="online"
                stroke="#059669"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorOnline)"
                name="100% Online"
                isAnimationActive={true}
              />
              <Area
                type="monotone"
                dataKey="distance"
                stroke="#ff3b4d"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorDistance)"
                name="Distance Learning"
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>

          {/* Chart Insight */}
          <div className="mt-8 border-t border-slate-200 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-[#0f1f3d] mb-2">Key Finding</h4>
                <p className="text-sm text-slate-600 leading-6">
                  Online learners maintain{" "}
                  <span className="font-bold text-[#059669]">
                    23% higher momentum
                  </span>{" "}
                  throughout their career journey, with acceleration increasing
                  after Year 2.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#0f1f3d] mb-2">
                  Why It Matters
                </h4>
                <p className="text-sm text-slate-600 leading-6">
                  Structured support systems and real-time guidance create
                  compounding advantages in career progression, making online
                  pathways more predictable and successful.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="h-[56px] px-8 bg-[#ff3b4d] text-white font-bold rounded-xl hover:bg-[#f52f43] transition-all duration-200 hover:shadow-[0_8px_16px_rgba(255,59,77,0.3)] active:scale-95">
            Explore Pathways
          </button>
          <button className="h-[56px] px-8 border-2 border-[#0f1f3d] text-[#0f1f3d] font-bold rounded-xl hover:bg-[#0f1f3d] hover:text-white transition-all duration-200">
            Download Report
          </button>
        </div>
      </div>
    </section>
  );
}
