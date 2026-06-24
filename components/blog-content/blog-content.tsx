"use client";

import { Blog, ContentBlock } from "@/data/blog-data";

function inlineFormat(text: string) {
  return text
    .replace(
      /\*\*(.+?)\*\*/g,
      '<strong style="color:#111827;font-weight:700">$1</strong>',
    )
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(
      /`(.+?)`/g,
      '<code style="background:#f4f4f5;padding:3px 7px;border-radius:5px;font-size:0.9em;font-family:monospace;color:#ef233c;border:1px solid #e5e7eb;">$1</code>',
    );
}

function renderParagraph(
  block: Extract<ContentBlock, { type: "paragraph" }>,
  key: number,
) {
  return (
    <p
      key={key}
      className="content-paragraph"
      dangerouslySetInnerHTML={{ __html: inlineFormat(block.text) }}
    />
  );
}

function renderHeading(
  block: Extract<ContentBlock, { type: "heading" }>,
  key: number,
) {
  const Tag = block.level === 2 ? "h2" : "h3";
  return (
    <Tag key={key} id={block.id} className={`content-heading h${block.level}`}>
      {block.text}
    </Tag>
  );
}

function renderList(
  block: Extract<ContentBlock, { type: "list" }>,
  key: number,
) {
  const Tag = block.ordered ? "ol" : "ul";
  return (
    <Tag key={key} className="content-list">
      {block.items.map((item, i) => (
        <li key={i}>
          <span dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
        </li>
      ))}
    </Tag>
  );
}

function renderTable(
  block: Extract<ContentBlock, { type: "table" }>,
  key: number,
) {
  return (
    <div key={key} className="table-scroll">
      <table className="content-table">
        <thead>
          <tr>
            {block.headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderImage(block: ContentBlock, key: number) {
  if (!("src" in block) && !("imageSrc" in block) && !("url" in block)) {
    return null;
  }

  const imageBlock = block as ContentBlock & {
    src?: string;
    imageSrc?: string;
    url?: string;
    alt?: string;
    caption?: string;
  };
  const src = imageBlock.src ?? imageBlock.imageSrc ?? imageBlock.url;

  if (!src) return null;

  return (
    <figure key={key} className="content-image">
      <img src={src} alt={imageBlock.alt ?? ""} loading="lazy" />
      {imageBlock.caption && <figcaption>{imageBlock.caption}</figcaption>}
    </figure>
  );
}

const calloutStyles: Record<string, { bg: string; border: string }> = {
  tip: { bg: "#f4f4f5", border: "#111827" },
  warning: { bg: "#fff7ed", border: "#f59e0b" },
  info: { bg: "#f4f4f5", border: "#111827" },
};

function renderCallout(
  block: Extract<ContentBlock, { type: "callout" }>,
  key: number,
) {
  const style = calloutStyles[block.variant] ?? calloutStyles.info;

  return (
    <aside
      key={key}
      className="content-callout"
      style={{
        background: style.bg,
        borderLeftColor: style.border,
      }}
      dangerouslySetInnerHTML={{ __html: inlineFormat(block.text) }}
    />
  );
}

function renderBlock(block: ContentBlock, key: number): React.ReactNode {
  switch (block.type) {
    case "paragraph":
      return renderParagraph(block, key);
    case "heading":
      return renderHeading(block, key);
    case "list":
      return renderList(block, key);
    case "table":
      return renderTable(block, key);
    case "callout":
      return renderCallout(block, key);
    default:
      return renderImage(block, key);
  }
}

export function BlogContent({ blog }: { blog: Blog }) {
  const isHtml = typeof blog.content === "string";

  return (
    <article className="upgrad-content">
      {isHtml ? (
        <div dangerouslySetInnerHTML={{ __html: blog.content as string }} />
      ) : (
        (blog.content as ContentBlock[]).map((block, i) => renderBlock(block, i))
      )}

      <style>{`
        .upgrad-content {
          width: 100%;
          max-width: 900px;
          color: #111827;
        }

        .upgrad-content p,
        .content-paragraph {
          margin: 0 0 26px;
          color: #111827;
          font-size: 18px;
          line-height: 1.75;
          font-weight: 400;
        }

        .upgrad-content h1,
        .upgrad-content h2,
        .upgrad-content h3,
        .content-heading {
          color: #000000;
          font-weight: 600;
          letter-spacing: 0;
          scroll-margin-top: 110px;
        }

        .upgrad-content h1 {
          margin: 48px 0 20px;
          font-size: 36px;
          line-height: 1.2;
        }

        .upgrad-content h2,
        .content-heading.h2 {
          margin: 40px 0 16px;
          font-size: 30px;
          line-height: 1.25;
        }

        .upgrad-content h3,
        .content-heading.h3 {
          margin: 30px 0 12px;
          font-size: 22px;
          line-height: 1.35;
        }

        .upgrad-content ul,
        .upgrad-content ol,
        .content-list {
          margin: 0 0 34px;
          padding-left: 28px;
          color: #111827;
        }

        .upgrad-content li,
        .content-list li {
          margin-bottom: 10px;
          font-size: 18px;
          line-height: 1.7;
        }

        .upgrad-content table,
        .content-table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
          border: 1px solid #e5e7eb;
          background: #ffffff;
          font-size: 18px;
          line-height: 1.3;
          margin: 32px 0 40px;
        }

        .upgrad-content th,
        .upgrad-content td,
        .content-table th,
        .content-table td {
          padding: 24px 20px;
          text-align: left;
          vertical-align: middle;
          border-right: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
          color: #1f2937;
          overflow-wrap: anywhere;
        }

        .upgrad-content th,
        .content-table th {
          background: #f7f7f8;
          color: #1f2937;
          font-weight: 600;
        }

        .upgrad-content th:last-child,
        .upgrad-content td:last-child,
        .content-table th:last-child,
        .content-table td:last-child {
          border-right: 0;
        }

        .upgrad-content tbody tr:last-child td,
        .content-table tbody tr:last-child td {
          border-bottom: 0;
        }

        .upgrad-content blockquote,
        .upgrad-content aside,
        .content-callout {
          margin: 34px 0;
          padding: 22px 24px;
          border-left: 2px solid #111827;
          color: #000000;
          font-size: 18px;
          line-height: 1.8;
          font-style: italic;
          background: #f4f4f5;
        }

        .upgrad-content figure,
        .content-image {
          width: 100%;
          margin: 30px 0 34px;
        }

        .upgrad-content figure img,
        .content-image img {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 8px;
        }

        .upgrad-content figure figcaption,
        .content-image figcaption {
          margin-top: 10px;
          color: #6b7280;
          text-align: center;
          font-size: 14px;
          line-height: 1.5;
        }

        .upgrad-content a,
        .content-callout a,
        .content-paragraph a {
          color: #3f73d8;
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        @media (max-width: 1180px) {
          .upgrad-content p,
          .content-paragraph,
          .upgrad-content blockquote,
          .upgrad-content aside,
          .content-callout {
            font-size: 17px;
          }

          .upgrad-content table,
          .content-table {
            font-size: 17px;
          }
        }

        @media (max-width: 720px) {
          .upgrad-content p,
          .content-paragraph,
          .upgrad-content blockquote,
          .upgrad-content aside,
          .content-callout {
            margin-bottom: 26px;
            font-size: 16px;
            line-height: 1.72;
          }

          .upgrad-content h2,
          .content-heading.h2 {
            margin-top: 36px;
            font-size: 28px;
          }

          .upgrad-content h3,
          .content-heading.h3 {
            font-size: 22px;
          }

          .upgrad-content li,
          .content-list li {
            font-size: 16px;
          }

          .upgrad-content table,
          .content-table {
            min-width: 640px;
            font-size: 16px;
          }

          .upgrad-content th,
          .upgrad-content td,
          .content-table th,
          .content-table td {
            padding: 16px 14px;
          }
        }
      `}</style>
    </article>
  );
}
