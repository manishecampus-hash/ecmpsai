"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CTA from "../cta";

const COURSE_LABELS: Record<string, string> = {
  mba: "MBA",
  bba: "BBA",
  btech: "B.Tech",
  mtech: "M.Tech",
  mca: "MCA",
  bca: "BCA",
  bcom: "B.Com",
  mcom: "M.Com",
  ba: "BA",
  ma: "MA",
  llb: "LLB",
  bed: "B.Ed",
  msc: "MSC",
  ds: "Data Science",
  ai: "Artificial Intelligence",
};

interface UniInfo {
  location: string;
  established: string;
  accreditation: string;
  naacGrade: string;
  ugcApproved: boolean;
  fees: string;
  duration: string;
  mode: string;
  emiAvailable: boolean;
  scholarship: boolean;
  placement: string;
  ranking: string;
  website: string;
}

const UNI_DATA: Record<string, UniInfo> = {
  "Amity University": {
    location: "Noida, Uttar Pradesh",
    established: "2005",
    accreditation: "UGC | NIRF 26 | NAAC A+",
    naacGrade: "A+",
    ugcApproved: true,
    fees: "₹1,20,000/yr",
    duration: "2 Years",
    mode: "Online / Distance",
    emiAvailable: true,
    scholarship: true,
    placement: "90%+",
    ranking: "#26 NIRF",
    website: "https://amity.edu",
  },
  "Symbiosis University": {
    location: "Pune, Maharashtra",
    established: "1971",
    accreditation: "UGC, NAAC A",
    naacGrade: "A",
    ugcApproved: true,
    fees: "₹95,000/yr",
    duration: "2 Years",
    mode: "Distance",
    emiAvailable: true,
    scholarship: true,
    placement: "85%+",
    ranking: "#35 NIRF",
    website: "https://siu.edu.in",
  },
  IGNOU: {
    location: "New Delhi",
    established: "1985",
    accreditation: "UGC, NAAC A++",
    naacGrade: "A++",
    ugcApproved: true,
    fees: "₹18,000/yr",
    duration: "2 Years",
    mode: "Distance / ODL",
    emiAvailable: false,
    scholarship: false,
    placement: "70%+",
    ranking: "#12 NIRF",
    website: "https://ignou.ac.in",
  },
  "Manipal University": {
    location: "Manipal, Karnataka",
    established: "1953",
    accreditation: "UGC, NAAC A+",
    naacGrade: "A+",
    ugcApproved: true,
    fees: "₹85,000/yr",
    duration: "2 Years",
    mode: "Online",
    emiAvailable: true,
    scholarship: true,
    placement: "88%+",
    ranking: "#9 NIRF",
    website: "https://manipal.edu",
  },
  "Lovely Professional University": {
    location: "Phagwara, Punjab",
    established: "2005",
    accreditation: "UGC, NAAC A+",
    naacGrade: "A+",
    ugcApproved: true,
    fees: "₹70,000/yr",
    duration: "2 Years",
    mode: "Online / Distance",
    emiAvailable: true,
    scholarship: true,
    placement: "82%+",
    ranking: "#42 NIRF",
    website: "https://lpu.in",
  },
  NMIMS: {
    location: "Mumbai, Maharashtra",
    established: "1981",
    accreditation: "UGC, NAAC A+",
    naacGrade: "A+",
    ugcApproved: true,
    fees: "₹1,50,000/yr",
    duration: "2 Years",
    mode: "Distance",
    emiAvailable: true,
    scholarship: true,
    placement: "92%+",
    ranking: "#31 NIRF",
    website: "https://nmims.edu",
  },
  SMU: {
    location: "Dimapur, Nagaland",
    established: "1992",
    accreditation: "UGC, NAAC B+",
    naacGrade: "B+",
    ugcApproved: true,
    fees: "₹45,000/yr",
    duration: "2 Years",
    mode: "Distance",
    emiAvailable: true,
    scholarship: false,
    placement: "75%+",
    ranking: "—",
    website: "https://smude.edu.in",
  },
  "Jain University": {
    location: "Bengaluru, Karnataka",
    established: "1990",
    accreditation: "UGC, NAAC A+",
    naacGrade: "A+",
    ugcApproved: true,
    fees: "₹80,000/yr",
    duration: "2 Years",
    mode: "Online",
    emiAvailable: true,
    scholarship: true,
    placement: "84%+",
    ranking: "#55 NIRF",
    website: "https://jainuniversity.ac.in",
  },
  "BITS Pilani": {
    location: "Pilani, Rajasthan",
    established: "1964",
    accreditation: "UGC, NAAC A",
    naacGrade: "A",
    ugcApproved: true,
    fees: "₹1,80,000/yr",
    duration: "2 Years",
    mode: "Distance / WILP",
    emiAvailable: true,
    scholarship: false,
    placement: "95%+",
    ranking: "#16 NIRF",
    website: "https://bits-pilani.ac.in",
  },
  UPES: {
    location: "Dehradun, Uttarakhand",
    established: "2003",
    accreditation: "UGC, NAAC A",
    naacGrade: "A",
    ugcApproved: true,
    fees: "₹1,00,000/yr",
    duration: "2 Years",
    mode: "Online",
    emiAvailable: true,
    scholarship: true,
    placement: "87%+",
    ranking: "#61 NIRF",
    website: "https://upes.ac.in",
  },
  "Chandigarh University": {
    location: "Mohali, Punjab",
    established: "2012",
    accreditation: "UGC, NAAC A+",
    naacGrade: "A+",
    ugcApproved: true,
    fees: "₹75,000/yr",
    duration: "2 Years",
    mode: "Online / Distance",
    emiAvailable: true,
    scholarship: true,
    placement: "83%+",
    ranking: "#38 NIRF",
    website: "https://cuchd.in",
  },
  "Vivekananda Global University": {
    location: "Jaipur, Rajasthan",
    established: "2012",
    accreditation: "UGC, NAAC A+, AICTE",
    naacGrade: "A+",
    ugcApproved: true,
    fees: "₹55,000/yr",
    duration: "2 Years",
    mode: "Online / Distance",
    emiAvailable: true,
    scholarship: true,
    placement: "78%+",
    ranking: "—",
    website: "https://vgu.ac.in",
  },
  "Centurion University": {
    location: "Gajapati, Odisha",
    established: "2010",
    accreditation: "NAAC A+ Grade, Recognized by UGC & DEB",
    naacGrade: "A+",
    ugcApproved: true,
    fees: "₹60,000/yr",
    duration: "2 Years",
    mode: "Distance",
    emiAvailable: true,
    scholarship: true,
    placement: "80%+",
    ranking: "—",
    website: "https://cutm.ac.in",
  },
};

const ROWS: {
  label: string;
  key: keyof UniInfo;
  icon: string;
  isBoolean?: boolean;
}[] = [
  { label: "Location", key: "location", icon: "📍" },
  { label: "Established Year", key: "established", icon: "🗓️" },
  { label: "Accreditation", key: "accreditation", icon: "✅" },
  { label: "NAAC Grade", key: "naacGrade", icon: "⭐" },
  { label: "UGC Approved", key: "ugcApproved", icon: "🏛️", isBoolean: true },
  { label: "Annual Fees", key: "fees", icon: "💰" },
  { label: "Duration", key: "duration", icon: "📅" },
  { label: "Study Mode", key: "mode", icon: "💻" },
  { label: "EMI Available", key: "emiAvailable", icon: "💳", isBoolean: true },
  { label: "Scholarship", key: "scholarship", icon: "🎓", isBoolean: true },
  { label: "Placement Rate", key: "placement", icon: "📈" },
  { label: "NIRF Ranking", key: "ranking", icon: "🏆" },
];

function Avatar({ name }: { name: string }) {
  const colors = ["#e53935", "#c62828", "#b71c1c", "#d32f2f", "#e57373"];
  const bg = colors[name.length % colors.length];
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <div
      style={{
        width: 72,
        height: 72,
        borderRadius: "50%",
        background: bg,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.4rem",
        fontWeight: 800,
        margin: "0 auto 12px",
        boxShadow: "0 4px 14px rgba(229,57,53,.3)",
      }}
    >
      {initials}
    </div>
  );
}

export default function CompareResultPage() {
  const [course, setCourse] = useState("");
  const [unis, setUnis] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const c = sessionStorage.getItem("cmp_course") ?? "";
    const u: string[] = JSON.parse(sessionStorage.getItem("cmp_unis") ?? "[]");
    setCourse(c);
    setUnis(u);
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "100px 20px",
          fontFamily: "'Segoe UI',sans-serif",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            border: "4px solid #ffd5d5",
            borderTop: "4px solid #e53935",
            borderRadius: "50%",
            margin: "0 auto 16px",
            animation: "spin .8s linear infinite",
          }}
        />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <p style={{ color: "#999" }}>Loading comparison...</p>
      </div>
    );
  }

  if (unis.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "100px 20px",
          fontFamily: "'Segoe UI',sans-serif",
        }}
      >
        <p style={{ fontSize: "1.1rem", color: "#555", marginBottom: 24 }}>
          ⚠️ Koi university select nahi ki.
        </p>
        <Link
          href="/compare"
          style={{
            display: "inline-block",
            background: "#e53935",
            color: "#fff",
            padding: "12px 32px",
            borderRadius: 50,
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          ← Wapas Jao
        </Link>
      </div>
    );
  }

  const courseLabel = COURSE_LABELS[course] ?? course.toUpperCase();
  const LABEL_W = 230;

  return (
    <main
      style={{
        fontFamily: "'Segoe UI',sans-serif",
        background: "#f8f8f8",
        minHeight: "100vh",
        paddingBottom: 80,
      }}
    >
      {/* Breadcrumb */}
      <nav
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "16px 24px 0",
          display: "flex",
          gap: 6,
          alignItems: "center",
          fontSize: ".82rem",
        }}
      >
        <Link
          href="/"
          style={{ color: "#e53935", textDecoration: "none", fontWeight: 500 }}
        >
          Home
        </Link>
        <span style={{ color: "#ccc" }}>›</span>
        <Link
          href="/compare"
          style={{ color: "#e53935", textDecoration: "none", fontWeight: 500 }}
        >
          Compare
        </Link>
        <span style={{ color: "#ccc" }}>›</span>
        <span style={{ color: "#999" }}>{courseLabel} Comparison</span>
      </nav>

      {/* Hero */}
      <section
        style={{
          textAlign: "center",
          padding: "44px 20px 36px",
          background: "#fff",
          borderBottom: "1px solid #f0f0f0",
          marginBottom: 36,
        }}
      >
        <span
          style={{
            display: "inline-block",
            background: "#fff0f0",
            color: "#e53935",
            fontSize: ".75rem",
            fontWeight: 700,
            letterSpacing: "1.5px",
            padding: "6px 16px",
            borderRadius: 50,
            marginBottom: 16,
          }}
        >
          🎓 COMPARE UNIVERSITIES
        </span>
        <h1
          style={{
            fontSize: "clamp(1.4rem,3.2vw,2.2rem)",
            fontWeight: 800,
            color: "#111",
            margin: "0 0 12px",
          }}
        >
          Compare Multiple Universities{" "}
          <span style={{ color: "#e53935" }}>&amp; Find The Best!</span>
        </h1>
        <p
          style={{
            color: "#666",
            fontSize: ".94rem",
            maxWidth: 700,
            margin: "0 auto",
            lineHeight: 1.75,
          }}
        >
          Find The Best University For Your Distance Education Or Online Degree
          Programs. Our Compare University Tool Helps Working Professionals
          &amp; Students Who are confused about choosing a university.
        </p>
      </section>

      {/* Table */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div
          style={{
            overflowX: "auto",
            borderRadius: 18,
            boxShadow: "0 4px 32px rgba(0,0,0,.08)",
            border: "1px solid #f0f0f0",
          }}
        >
          <table
            style={{
              borderCollapse: "collapse",
              background: "#fff",
              width: "100%",
              minWidth: LABEL_W + 200 * unis.length,
            }}
          >
            {/* ── Header Row ── */}
            <thead>
              <tr>
                {/* Course cell — RED */}
                <th
                  style={{
                    background: "#e53935",
                    width: LABEL_W,
                    minWidth: LABEL_W,
                    padding: "28px 20px",
                    verticalAlign: "middle",
                    borderRight: "2px solid rgba(255,255,255,.2)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 12,
                      color: "#fff",
                    }}
                  >
                    <div
                      style={{
                        width: 62,
                        height: 62,
                        borderRadius: 14,
                        background: "rgba(255,255,255,.18)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="32"
                        height="32"
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
                    <span
                      style={{
                        fontSize: "1.15rem",
                        fontWeight: 800,
                        letterSpacing: 0.5,
                      }}
                    >
                      {courseLabel}
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{ opacity: 0.6 }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </th>

                {/* University columns */}
                {unis.map((uni) => (
                  <th
                    key={uni}
                    style={{
                      background: "#fff",
                      padding: "22px 16px",
                      textAlign: "center",
                      verticalAlign: "middle",
                      borderRight: "1px solid #f5f5f5",
                      borderBottom: "3px solid #e53935",
                      minWidth: 200,
                    }}
                  >
                    <Avatar name={uni} />
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: ".9rem",
                        color: "#111",
                        marginBottom: 8,
                        lineHeight: 1.3,
                      }}
                    >
                      {uni}
                    </div>
                    <span
                      style={{
                        display: "inline-block",
                        background: "#fff0f0",
                        color: "#e53935",
                        borderRadius: 50,
                        padding: "3px 14px",
                        fontSize: ".72rem",
                        fontWeight: 700,
                      }}
                    >
                      {courseLabel}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            {/* ── Data Rows ── */}
            <tbody>
              {ROWS.map((row, idx) => (
                <tr
                  key={row.key}
                  style={{ background: idx % 2 === 0 ? "#fff" : "#fafafa" }}
                >
                  {/* Label — RED background */}
                  <td
                    style={{
                      background: "#e53935",
                      color: "#fff",
                      fontWeight: 600,
                      padding: "15px 18px",
                      fontSize: ".84rem",
                      borderBottom: "1px solid rgba(255,255,255,.15)",
                      minWidth: LABEL_W,
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <span style={{ fontSize: "1rem" }}>{row.icon}</span>
                      {row.label}
                    </div>
                  </td>

                  {/* Values */}
                  {unis.map((uni) => {
                    const val = UNI_DATA[uni]?.[row.key];
                    return (
                      <td
                        key={uni}
                        style={{
                          padding: "15px 16px",
                          textAlign: "center",
                          borderBottom: "1px solid #f5f5f5",
                          borderRight: "1px solid #f5f5f5",
                          fontSize: ".875rem",
                          color: "#333",
                          verticalAlign: "middle",
                        }}
                      >
                        {row.isBoolean ? (
                          <span
                            style={{
                              display: "inline-block",
                              padding: "4px 14px",
                              borderRadius: 50,
                              fontSize: ".78rem",
                              fontWeight: 700,
                              background: val ? "#e8f5e9" : "#ffebee",
                              color: val ? "#2e7d32" : "#c62828",
                            }}
                          >
                            {val ? "✓ Yes" : "✗ No"}
                          </span>
                        ) : row.key === "naacGrade" ? (
                          <span
                            style={{
                              display: "inline-block",
                              background: "#fff3e0",
                              color: "#e65100",
                              fontWeight: 800,
                              fontSize: ".88rem",
                              padding: "3px 14px",
                              borderRadius: 50,
                            }}
                          >
                            {String(val ?? "—")}
                          </span>
                        ) : (
                          <span style={{ fontSize: ".86rem" }}>
                            {String(val ?? "—")}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>

            {/* ── Apply Row ── */}
            <tfoot>
              <tr>
                <td
                  style={{
                    background: "#c62828",
                    color: "#fff",
                    fontWeight: 700,
                    padding: "18px 18px",
                    fontSize: ".84rem",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <span>🚀</span> Apply Now
                  </div>
                </td>
                {unis.map((uni) => (
                  <td
                    key={uni}
                    style={{
                      padding: "16px",
                      textAlign: "center",
                      background: "#fff5f5",
                      borderRight: "1px solid #f5f5f5",
                    }}
                  >
                    <a
                      href={UNI_DATA[uni]?.website ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-block",
                        background: "#e53935",
                        color: "#fff",
                        borderRadius: 50,
                        padding: "10px 26px",
                        fontWeight: 700,
                        fontSize: ".82rem",
                        textDecoration: "none",
                        boxShadow: "0 4px 14px rgba(229,57,53,.3)",
                      }}
                    >
                      Apply Now →
                    </a>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>

        <p
          style={{
            textAlign: "center",
            color: "#bbb",
            fontSize: ".73rem",
            marginTop: 16,
          }}
        >
          * Fees and rankings are indicative. Please verify from the official
          university website.
        </p>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link
            href="/compare"
            style={{
              display: "inline-block",
              border: "2px solid #e53935",
              color: "#e53935",
              borderRadius: 50,
              padding: "11px 36px",
              fontWeight: 700,
              fontSize: ".88rem",
              textDecoration: "none",
            }}
          >
            ← Compare Again
            <CTA />
          </Link>
        </div>
      </section>
    </main>
  );
}
