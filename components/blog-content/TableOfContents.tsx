"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type Heading = { id: string; text?: string; label?: string; level: number };

const PREVIEW_COUNT = 3;

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "0px 0px -70% 0px" },
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleHeadingClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const visibleHeadings = isExpanded
    ? headings
    : headings.slice(0, PREVIEW_COUNT);
  const hasMore = headings.length > PREVIEW_COUNT;

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        overflow: "hidden",
        margin: "2rem 0",
        fontFamily: "inherit",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          padding: "18px 24px 14px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          borderBottom: "1px solid #f3f4f6",
        }}
      >
        <span
          style={{
            color: "#6b7280",
            fontSize: "1.2rem",
            lineHeight: 1,
            fontWeight: 700,
          }}
        >
          ≡
        </span>
        <span
          style={{
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "#111827",
          }}
        >
          Table of Contents
        </span>
      </div>

      {/* ── Items ── */}
      <ul style={{ listStyle: "none", padding: "10px 0 0", margin: 0 }}>
        {visibleHeadings.map(({ id, text, label, level }) => {
          const displayText = label ?? text ?? id;
          const isActive = active === id;
          return (
            <li
              key={id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                padding:
                  level === 3
                    ? "7px 24px 7px 48px"
                    : level === 2
                    ? "7px 24px 7px 36px"
                    : "7px 24px",
              }}
            >
              {/* bullet */}
              <span
                style={{
                  flexShrink: 0,
                  marginTop: "6px",
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: isActive ? "#6b7280" : "#9ca3af",
                  display: "inline-block",
                }}
              />
              <button
                onClick={() => handleHeadingClick(id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  padding: 0,
                  fontSize: "0.93rem",
                  lineHeight: 1.55,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#111827" : "#374151",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#6b7280";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = isActive
                    ? "#111827"
                    : "#374151";
                }}
              >
                {displayText}
              </button>
            </li>
          );
        })}
      </ul>

      {/* ── Fade + View all / View less ── */}
      {hasMore && (
        <div style={{ position: "relative" }}>
          {/* fade overlay when collapsed */}
          {!isExpanded && (
            <div
              style={{
                position: "absolute",
                top: "-40px",
                left: 0,
                right: 0,
                height: "40px",
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.95))",
                pointerEvents: "none",
              }}
            />
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "10px 24px 14px",
            }}
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "0.88rem",
                fontWeight: 600,
                color: "#6b7280",
                padding: 0,
              }}
            >
              {isExpanded ? "View less" : "View all"}
              <ChevronDown
                size={16}
                style={{
                  transition: "transform 0.25s ease",
                  transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
