"use client";

import { Blog, ContentBlock } from "@/data/blog-data";

// ─── Inline formatter (bold, italic, code) ────────────────────────────────────
function inlineFormat(text: string) {
  return text
    .replace(
      /\*\*(.+?)\*\*/g,
      '<strong style="color:var(--text-primary);font-weight:700">$1</strong>',
    )
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(
      /`(.+?)`/g,
      '<code style="background:var(--bg-table-head);padding:2px 6px;border-radius:4px;font-size:0.9em;font-family:monospace;color:var(--accent)">$1</code>',
    );
}

// ─── Individual block renderers ───────────────────────────────────────────────

function renderParagraph(block: Extract<ContentBlock, { type: "paragraph" }>, key: number) {
  return (
    <p
      key={key}
      style={{
        color: "var(--text-muted)",
        lineHeight: 1.8,
        marginBottom: "1.25rem",
        fontSize: "1rem",
      }}
      dangerouslySetInnerHTML={{ __html: inlineFormat(block.text) }}
    />
  );
}

function renderHeading(block: Extract<ContentBlock, { type: "heading" }>, key: number) {
  if (block.level === 2) {
    return (
      <h2
        key={key}
        id={block.id}
        style={{
          color: "var(--text-primary)",
          fontSize: "1.5rem",
          fontWeight: 600,
          margin: "2.5rem 0 1rem",
          scrollMarginTop: "80px",
          lineHeight: 1.3,
        }}
      >
        {block.text}
      </h2>
    );
  }
  return (
    <h3
      key={key}
      id={block.id}
      style={{
        color: "var(--text-primary)",
        fontSize: "1.2rem",
        fontWeight: 700,
        margin: "1.8rem 0 0.6rem",
        scrollMarginTop: "80px",
      }}
    >
      {block.text}
    </h3>
  );
}

function renderList(block: Extract<ContentBlock, { type: "list" }>, key: number) {
  const Tag = block.ordered ? "ol" : "ul";
  return (
    <Tag
      key={key}
      style={{
        margin: "1rem 0 1.5rem",
        paddingLeft: "1.5rem",
        listStyleType: block.ordered ? "decimal" : "disc",
      }}
    >
      {block.items.map((item, i) => (
        <li
          key={i}
          style={{
            color: "var(--text-muted)",
            marginBottom: "0.4rem",
            lineHeight: 1.7,
          }}
        >
          <span dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
        </li>
      ))}
    </Tag>
  );
}

function renderTable(block: Extract<ContentBlock, { type: "table" }>, key: number) {
  return (
    <div
      key={key}
      style={{
        overflowX: "auto",
        margin: "2rem 0",
        borderRadius: "12px",
        border: "1px solid var(--border)",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
        <thead>
          <tr style={{ background: "var(--bg-table-head)" }}>
            {block.headers.map((h) => (
              <th
                key={h}
                style={{
                  padding: "12px 16px",
                  textAlign: "left",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  borderBottom: "1px solid var(--border)",
                  whiteSpace: "nowrap",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, ri) => (
            <tr
              key={ri}
              style={{
                background: ri % 2 === 0 ? "var(--bg-surface)" : "var(--bg-table-alt)",
              }}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  style={{
                    padding: "11px 16px",
                    color: ci === 0 ? "var(--text-primary)" : "var(--text-muted)",
                    fontWeight: ci === 0 ? 600 : 400,
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const calloutStyles: Record<
  string,
  { bg: string; border: string; icon: string }
> = {
  tip: { bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.4)", icon: "💡" },
  warning: { bg: "rgba(234,179,8,0.08)", border: "rgba(234,179,8,0.4)", icon: "⚠️" },
  info: { bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.4)", icon: "ℹ️" },
};

function renderCallout(block: Extract<ContentBlock, { type: "callout" }>, key: number) {
  const s = calloutStyles[block.variant] ?? calloutStyles.info;
  return (
    <div
      key={key}
      style={{
        background: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: "12px",
        padding: "14px 18px",
        margin: "1.5rem 0",
        display: "flex",
        gap: "10px",
        alignItems: "flex-start",
        lineHeight: 1.7,
        fontSize: "0.95rem",
        color: "var(--text-muted)",
      }}
    >
      <span style={{ fontSize: "1rem", flexShrink: 0 }}>{s.icon}</span>
      <span dangerouslySetInnerHTML={{ __html: inlineFormat(block.text) }} />
    </div>
  );
}

// ─── Main renderer ────────────────────────────────────────────────────────────

function renderBlock(block: ContentBlock, key: number): React.ReactNode {
  switch (block.type) {
    case "paragraph": return renderParagraph(block, key);
    case "heading": return renderHeading(block, key);
    case "list": return renderList(block, key);
    case "table": return renderTable(block, key);
    case "callout": return renderCallout(block, key);
    default: return null;
  }
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function BlogContent({ blog }: { blog: Blog }) {
  return (
    <article
      className="rounded-3xl border p-7 sm:p-10 lg:p-12"
      style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
    >
      <div style={{ maxWidth: "72ch" }}>
        {blog.content.map((block, i) => renderBlock(block, i))}
      </div>
    </article>
  );
}