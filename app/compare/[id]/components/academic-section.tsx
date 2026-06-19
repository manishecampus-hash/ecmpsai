import React from "react";
import { School, Users, Lightbulb, Globe, Target } from "lucide-react";

export default function AcademicComparison() {
  const rows = [
    {
      icon: "school",
      label: "Programs Offered",
      aVal: "200+",
      aDesc: "Diverse programs",
      bVal: "350+",
      bDesc: "Industry-aligned",
    },
    {
      icon: "users",
      label: "Student to Faculty Ratio",
      aVal: "15:1",
      aDesc: "Ratio",
      bVal: "12:1",
      bDesc: "Ratio",
    },
    {
      icon: "bulb",
      label: "Learning Approach",
      aVal: null,
      aDesc: "Research-driven",
      bVal: null,
      bDesc: "Experiential",
    },
    {
      icon: "world",
      label: "Global Exposure",
      aVal: null,
      aDesc: "200+ universities",
      bVal: null,
      bDesc: "150+ institutions",
    },
    {
      icon: "target",
      label: "Teaching Focus",
      aVal: null,
      aDesc: "Academic excellence",
      bVal: null,
      bDesc: "Industry readiness",
    },
  ];

  const iconMap = {
    school: School,
    users: Users,
    bulb: Lightbulb,
    world: Globe,
    target: Target,
  };
  const iconBgMap = {
    school: "#ede9fe",
    users: "#dbeafe",
    bulb: "#fef9c3",
    world: "#dcfce7",
    target: "#fee2e2",
  };
  const iconColorMap = {
    school: "#7c3aed",
    users: "#2563eb",
    bulb: "#ca8a04",
    world: "#16a34a",
    target: "#dc2626",
  };

  return (
    <div
      style={{
        borderRadius: 16,
        padding: "32px 24px",
        fontFamily: "sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: 22,
          fontWeight: 700,
          color: "#1a1a2e",
          marginBottom: 28,
        }}
      >
        Academic Comparison
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 220px 1fr",
          background: "white",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        }}
      >
        {/* Headers */}
        <div
          style={{
            background: "#6b21a8",
            color: "white",
            fontWeight: 700,
            padding: "18px",
            textAlign: "center",
          }}
        >
          Amity University
        </div>
        <div
          style={{
            background: "#f8fafc",
            padding: "18px",
            textAlign: "center",
            fontWeight: 700,
            color: "#64748b",
          }}
        >
          Features
        </div>
        <div
          style={{
            background: "#2563eb",
            color: "white",
            fontWeight: 700,
            padding: "18px",
            textAlign: "center",
          }}
        >
          Manipal University
        </div>

        {rows.map((row, idx) => {
          const Icon = iconMap[row.icon];
          return (
            <React.Fragment key={idx}>
              {/* Left Cell */}
              <div
                style={{
                  padding: "20px",
                  textAlign: "center",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                {row.aVal && (
                  <div
                    style={{ fontSize: 18, fontWeight: 700, color: "#5b21b6" }}
                  >
                    {row.aVal}
                  </div>
                )}
                <div style={{ fontSize: 12, color: "#666" }}>{row.aDesc}</div>
              </div>

              {/* Middle Cell - Icon and Label in ROW */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  padding: "0 16px",
                  borderBottom: "1px solid #f1f5f9",
                  gap: "10px",
                  background: "#fcfcfc",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: iconBgMap[row.icon],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={16} color={iconColorMap[row.icon]} />
                </div>
                <div
                  style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}
                >
                  {row.label}
                </div>
              </div>

              {/* Right Cell */}
              <div
                style={{
                  padding: "20px",
                  textAlign: "center",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                {row.bVal && (
                  <div
                    style={{ fontSize: 18, fontWeight: 700, color: "#1d4ed8" }}
                  >
                    {row.bVal}
                  </div>
                )}
                <div style={{ fontSize: 12, color: "#666" }}>{row.bDesc}</div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
