"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CTA from "./cta";

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
      <main
        style={{
          fontFamily: "'Segoe UI',sans-serif",
          background: "#f8f8f8",
          minHeight: "100vh",
          paddingBottom: 60,
        }}
      >
        {/* Hero */}
        <section
          style={{
            textAlign: "center",
            padding: "60px 20px 44px",
            background: "#fff",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "#fff0f0",
              color: "#e53935",
              fontSize: ".75rem",
              fontWeight: 700,
              letterSpacing: "1.5px",
              padding: "6px 16px",
              borderRadius: 50,
              marginBottom: 18,
            }}
          >
            🎓 COMPARE UNIVERSITIES
          </span>
          <h1
            style={{
              fontSize: "clamp(1.6rem,3.8vw,2.6rem)",
              fontWeight: 800,
              color: "#111",
              margin: "0 0 14px",
              lineHeight: 1.2,
            }}
          >
            Compare Multiple Universities{" "}
            <span style={{ color: "#e53935" }}>&amp; Find The Best!</span>
          </h1>
        </section>

        {/* Selector Cards */}
        <section
          style={{
            display: "flex",
            gap: 16,
            maxWidth: 1180,
            margin: "40px auto 0",
            padding: "0 20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* Course Card */}
          <div
            style={{
              background: course ? "#fff5f5" : "#e53935",
              border: `2px solid ${course ? "#e53935" : "transparent"}`,
              borderRadius: 16,
              padding: "32px 20px 24px",
              flex: "1 1 220px",
              maxWidth: 268,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              boxShadow: "0 2px 16px rgba(229,57,53,.15)",
              transition: "all .2s",
            }}
          >
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: 16,
                background: course ? "#ffd5d5" : "rgba(255,255,255,.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: course ? "#e53935" : "#fff",
              }}
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
              style={{
                margin: 0,
                fontWeight: 700,
                fontSize: ".8rem",
                letterSpacing: "1px",
                color: course ? "#e53935" : "rgba(255,255,255,.8)",
                textTransform: "uppercase",
              }}
            >
              Select Course
            </p>
            <select
              value={course}
              onChange={(e) => {
                setCourse(e.target.value);
                setUnis(["", "", ""]);
              }}
              style={{
                width: "100%",
                padding: "11px 13px",
                borderRadius: 10,
                border: "1.5px solid #f0c0c0",
                fontSize: ".88rem",
                fontFamily: "inherit",
                fontWeight: 600,
                color: "#e53935",
                background: "#fff",
                cursor: "pointer",
                outline: "none",
              }}
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
              style={{
                background: unis[i] ? "#fff5f5" : "#fff",
                border: `2px solid ${unis[i] ? "#e53935" : "#f0f0f0"}`,
                borderRadius: 16,
                padding: "32px 20px 24px",
                flex: "1 1 220px",
                maxWidth: 268,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                boxShadow: unis[i]
                  ? "0 4px 20px rgba(229,57,53,.12)"
                  : "0 2px 10px rgba(0,0,0,.05)",
                opacity: !course ? 0.5 : 1,
                pointerEvents: !course ? "none" : "auto",
                transition: "all .2s",
              }}
            >
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: 16,
                  background: unis[i] ? "#ffd5d5" : "#f8f8f8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: unis[i] ? "#e53935" : "#bbb",
                }}
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
                style={{
                  margin: 0,
                  fontWeight: 700,
                  fontSize: ".8rem",
                  letterSpacing: "1px",
                  color: unis[i] ? "#e53935" : "#bbb",
                  textTransform: "uppercase",
                }}
              >
                University {i + 1}
              </p>
              <select
                value={unis[i]}
                disabled={!course}
                onChange={(e) => setUni(i, e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 13px",
                  borderRadius: 10,
                  border: "1.5px solid #f0f0f0",
                  fontSize: ".88rem",
                  fontFamily: "inherit",
                  color: unis[i] ? "#e53935" : "#999",
                  fontWeight: unis[i] ? 600 : 400,
                  background: "#fff",
                  cursor: course ? "pointer" : "not-allowed",
                  outline: "none",
                }}
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
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <button
            onClick={go}
            disabled={!canGo}
            style={{
              background: canGo ? "#e53935" : "#e0e0e0",
              color: canGo ? "#fff" : "#aaa",
              fontWeight: 800,
              fontSize: "1.02rem",
              padding: "15px 56px",
              borderRadius: 50,
              border: "none",
              cursor: canGo ? "pointer" : "not-allowed",
              fontFamily: "inherit",
              letterSpacing: ".3px",
              boxShadow: canGo ? "0 8px 24px rgba(229,57,53,.35)" : "none",
              transition: "all .25s",
            }}
          >
            Compare Now →
          </button>
        </div>
      </main>
      <CTA />
    </>
  );
}
