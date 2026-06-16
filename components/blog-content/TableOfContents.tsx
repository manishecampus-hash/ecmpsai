"use client";

import { useState, useEffect } from "react";
import { List } from "lucide-react";

type Heading = { id: string; text?: string; label?: string; level: number };

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>("");

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

  return (
    <nav
      className="rounded-2xl border p-5"
      style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <List className="h-4 w-4" style={{ color: "var(--accent)" }} />
        <span
          style={{
            color: "var(--text-primary)",
            fontWeight: 700,
            fontSize: "0.875rem",
          }}
        >
          On this page
        </span>
      </div>
      <ul className="space-y-1">
        {headings.map(({ id, text, label, level }) => {
          const displayText = label ?? text ?? id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                style={{
                  display: "block",
                  paddingLeft: level === 3 ? "20px" : "8px",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                  fontSize: "0.8rem",
                  lineHeight: 1.5,
                  color: active === id ? "var(--accent)" : "var(--text-muted)",
                  fontWeight: active === id ? 600 : 400,
                  borderLeft:
                    active === id
                      ? "2px solid var(--accent)"
                      : "2px solid transparent",
                  textDecoration: "none",
                  transition: "color 0.15s, border-color 0.15s",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {displayText}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}