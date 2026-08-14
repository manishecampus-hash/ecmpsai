"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CTA from "./cta";
import UniversitySlider from "@/components/compare/page";

const COURSES = [
  { label: "MBA", value: "mba" },
  { label: "BBA", value: "bba" },
  { label: "B.Tech", value: "btech" },
  { label: "M.Tech", value: "mtech" },
  { label: "MCA", value: "mca" },
  { label: "BCA", value: "bca" },
  { label: "B.Com", value: "bcom" },
  { label: "M.Com", value: "mcom" },
  { label: "BA", value: "ba" },
  { label: "MA", value: "ma" },
  { label: "LLB", value: "llb" },
  { label: "B.Ed", value: "bed" },
  { label: "MSC", value: "msc" },
  { label: "Data Science", value: "ds" },
  { label: "Artificial Intelligence", value: "ai" },
];

const UNIVERSITIES_BY_COURSE: Record<string, string[]> = {
  mba: [
    "Amity University",
    "Symbiosis University",
    "IGNOU",
    "Manipal University",
    "Lovely Professional University",
    "NMIMS",
    "SMU",
    "Jain University",
  ],
  bba: [
    "Amity University",
    "Symbiosis University",
    "IGNOU",
    "Manipal University",
    "Jain University",
  ],
  btech: [
    "Amity University",
    "Manipal University",
    "Lovely Professional University",
    "UPES",
    "Chandigarh University",
    "BITS Pilani",
  ],
  mtech: ["BITS Pilani", "Amity University", "Manipal University", "UPES"],
  mca: [
    "IGNOU",
    "Amity University",
    "Manipal University",
    "SMU",
    "Lovely Professional University",
  ],
  bca: [
    "IGNOU",
    "Amity University",
    "Manipal University",
    "Lovely Professional University",
  ],
  bcom: ["IGNOU", "Amity University", "Manipal University", "SMU"],
  mcom: ["IGNOU", "Amity University", "Manipal University"],
  ba: ["IGNOU", "Amity University", "SMU", "Manipal University"],
  ma: ["IGNOU", "Amity University", "Manipal University"],
  llb: ["Amity University", "Symbiosis University", "Manipal University"],
  bed: ["IGNOU", "Amity University", "Manipal University"],
  msc: [
    "Amity University",
    "Manipal University",
    "Chandigarh University",
    "Jain University",
    "Vivekananda Global University",
    "Centurion University",
  ],
  ds: [
    "Amity University",
    "Manipal University",
    "Lovely Professional University",
    "UPES",
    "Chandigarh University",
  ],
  ai: [
    "Amity University",
    "Manipal University",
    "Chandigarh University",
    "Lovely Professional University",
  ],
};

export default function ComparePage() {
  const router = useRouter();
  const [course, setCourse] = useState("");
  const [unis, setUnis] = useState(["", "", ""]);

  const available = course ? (UNIVERSITIES_BY_COURSE[course] ?? []) : [];
  const active = unis.filter(Boolean);
  const canGo = course !== "" && active.length > 0;

  const setUni = (i: number, v: string) => {
    const u = [...unis];
    u[i] = v;
    setUnis(u);
  };

  const go = () => {
    if (!canGo) return;
    sessionStorage.setItem("cmp_course", course);
    sessionStorage.setItem("cmp_unis", JSON.stringify(active));
    router.push("/compare/result");
  };

  return (
    <>
      <CTA />
      <UniversitySlider />
      <main className="font-sans bg-[#f8f8f8] min-h-screen pb-14 sm:pb-16">
        {/* Hero */}
        <section className="text-center px-5 py-12 sm:py-14 bg-white border-b border-gray-100">
          <span className="inline-flex items-center gap-1.5 text-red-600 bg-red-50 border border-red-100 rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold tracking-wide mb-4">
            🎓 COMPARE UNIVERSITIES
          </span>
          <h2 className="text-[1.6rem] sm:text-4xl lg:2l font-bold text-gray-900 leading-tight m-0">
            Compare Multiple Universities{" "}
            <span className="text-red-600">&amp; Find The Best!</span>
          </h2>
        </section>

        {/* Selector Cards */}
        <section className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto mt-8 sm:mt-10 px-5">
          {/* Course Card */}
          <div
            className={`flex-1 basis-[220px] max-w-[268px] flex flex-col items-center gap-4 rounded-2xl border-2 px-5 pt-8 pb-6 shadow-[0_2px_16px_rgba(229,57,53,0.15)] transition-all duration-200 ${
              course
                ? "bg-red-50 border-red-600"
                : "bg-red-600 border-transparent"
            }`}
          >
            <div
              className={`w-[68px] h-[68px] rounded-2xl flex items-center justify-center ${
                course ? "bg-red-200 text-red-600" : "bg-white/20 text-white"
              }`}
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                <line x1="9" y1="9" x2="15" y2="9" />
                <line x1="9" y1="13" x2="13" y2="13" />
              </svg>
            </div>
            <p
              className={`m-0 font-bold text-[.8rem] tracking-wide uppercase ${
                course ? "text-red-600" : "text-white/80"
              }`}
            >
              Select Course
            </p>
            <select
              value={course}
              onChange={(e) => {
                setCourse(e.target.value);
                setUnis(["", "", ""]);
              }}
              className="w-full rounded-[10px] border-[1.5px] border-red-200 bg-white px-3.5 py-[11px] text-[.88rem] font-semibold text-red-600 outline-none cursor-pointer font-sans"
            >
              <option value="">— Choose Course —</option>
              {COURSES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* University Cards */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`flex-1 basis-[220px] max-w-[268px] flex flex-col items-center gap-4 rounded-2xl border-2 px-5 pt-8 pb-6 transition-all duration-200 ${
                unis[i]
                  ? "bg-red-50 border-red-600 shadow-[0_4px_20px_rgba(229,57,53,0.12)]"
                  : "bg-white border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
              } ${!course ? "opacity-50 pointer-events-none" : "opacity-100"}`}
            >
              <div
                className={`w-[68px] h-[68px] rounded-2xl flex items-center justify-center ${
                  unis[i]
                    ? "bg-red-200 text-red-600"
                    : "bg-[#f8f8f8] text-gray-300"
                }`}
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="2" y="19" width="20" height="2" rx="1" />
                  <rect x="6" y="11" width="3" height="8" />
                  <rect x="10.5" y="11" width="3" height="8" />
                  <rect x="15" y="11" width="3" height="8" />
                  <polygon points="12 2 2 9 22 9" />
                </svg>
              </div>
              <p
                className={`m-0 font-bold text-[.8rem] tracking-wide uppercase ${
                  unis[i] ? "text-red-600" : "text-gray-300"
                }`}
              >
                University {i + 1}
              </p>
              <select
                value={unis[i]}
                disabled={!course}
                onChange={(e) => setUni(i, e.target.value)}
                className={`w-full rounded-[10px] border-[1.5px] border-gray-100 bg-white px-3.5 py-[11px] text-[.88rem] outline-none font-sans ${
                  unis[i]
                    ? "text-red-600 font-semibold"
                    : "text-gray-500 font-normal"
                } ${course ? "cursor-pointer" : "cursor-not-allowed"}`}
              >
                <option value="">— Select University —</option>
                {available
                  .filter((u) => u === unis[i] || !unis.includes(u))
                  .map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
              </select>
            </div>
          ))}
        </section>

        {/* Compare Button */}
        <div className="text-center mt-9">
          <button
            onClick={go}
            disabled={!canGo}
            className={`rounded-full px-14 py-[15px] text-[1.02rem] font-extrabold tracking-wide font-sans transition-all duration-200 ${
              canGo
                ? "bg-red-600 text-white shadow-[0_8px_24px_rgba(229,57,53,0.35)] cursor-pointer hover:bg-red-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Compare Now →
          </button>
        </div>
      </main>
    </>
  );
}
