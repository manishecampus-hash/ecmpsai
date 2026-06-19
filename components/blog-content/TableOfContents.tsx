"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type Heading = { id: string; text?: string; label?: string; level: number };

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

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
    setIsOpen(false);
  };

  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        margin: "2rem 0",
      }}
    >
      {/* ── Header / Toggle ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          fontSize: "0.95rem",
          fontWeight: 600,
          color: "var(--text-primary)",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "var(--bg-page)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "transparent";
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              fontSize: "1.1rem",
              color: "var(--accent)",
            }}
          >
            ≡
          </span>
          Table of Contents
        </span>
        <ChevronDown
          size={18}
          style={{
            color: "var(--text-muted)",
            transition: "transform 0.3s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            flexShrink: 0,
          }}
        />
      </button>

      {/* ── Content ── */}
      {isOpen && (
        <div
          style={{
            borderTop: "1px solid var(--border)",
            padding: "12px 20px",
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {headings.map(({ id, text, label, level }) => {
              const displayText = label ?? text ?? id;
              return (
                <li key={id} style={{ margin: 0 }}>
                  <button
                    onClick={() => handleHeadingClick(id)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding:
                        level === 3 ? "8px 12px 8px 28px" : "8px 12px 8px 12px",
                      margin: 0,
                      fontSize: "0.85rem",
                      lineHeight: 1.5,
                      color:
                        active === id ? "var(--accent)" : "var(--text-muted)",
                      fontWeight: active === id ? 600 : 400,
                      background:
                        active === id ? "var(--bg-page)" : "transparent",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "var(--bg-page)";
                      if (active !== id) {
                        (e.currentTarget as HTMLButtonElement).style.color =
                          "var(--text-primary)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (active !== id) {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.background = "transparent";
                        (e.currentTarget as HTMLButtonElement).style.color =
                          "var(--text-muted)";
                      }
                    }}
                  >
                    {displayText}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
