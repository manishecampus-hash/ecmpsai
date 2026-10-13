"use client";

import { memo } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

// Markdown → ChatGPT-style answer typography (headings shifted down one level so the page keeps one h1)
const components: Components = {
  h1: ({ children }) => (
    <h2 className="mb-2 mt-6 border-b border-black/[0.08] pb-1.5 text-lg font-bold text-[#0d0d0d] first:mt-0">{children}</h2>
  ),
  h2: ({ children }) => (
    <h3 className="mb-2 mt-6 border-b border-black/[0.08] pb-1.5 text-base font-bold text-[#0d0d0d] first:mt-0">{children}</h3>
  ),
  h3: ({ children }) => <h4 className="mb-1.5 mt-5 text-[15px] font-semibold text-[#0d0d0d] first:mt-0">{children}</h4>,
  p: ({ children }) => <p className="mb-3 leading-[1.8] text-[#0d0d0d] last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-[#0d0d0d]">{children}</strong>,
  ul: ({ children }) => <ul className="mb-3 mt-1 list-disc space-y-1.5 pl-5 marker:text-[#8f8f8f]">{children}</ul>,
  ol: ({ children }) => <ol className="mb-3 mt-1 list-decimal space-y-1.5 pl-5 marker:text-[#5d5d5d]">{children}</ol>,
  li: ({ children }) => <li className="pl-1 leading-[1.75] text-[#0d0d0d]">{children}</li>,
  a: ({ children, href }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-[#0d0d0d] underline decoration-black/25 underline-offset-2 hover:decoration-black">
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto rounded-xl border border-black/[0.08]">
      <table className="w-full min-w-[320px] border-collapse text-[13px]">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-[#f4f4f4]">{children}</thead>,
  th: ({ children }) => (
    <th className="whitespace-nowrap border-b border-black/[0.12] px-3.5 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-[#0d0d0d]">
      {children}
    </th>
  ),
  tr: ({ children }) => <tr className="transition-colors hover:bg-[#f9f9f9]">{children}</tr>,
  td: ({ children }) => (
    <td className="border-b border-black/[0.06] px-3.5 py-2.5 align-top leading-relaxed text-[#0d0d0d]">{children}</td>
  ),
  hr: () => <hr className="my-5 border-0 border-t border-black/[0.08]" />,
  blockquote: ({ children }) => (
    <blockquote className="my-3 border-l-[3px] border-[#0d0d0d] pl-3.5 italic text-[#5d5d5d]">{children}</blockquote>
  ),
  pre: ({ children }) => (
    <pre className="my-3 overflow-x-auto rounded-xl bg-[#f4f4f4] p-4 text-[13px] leading-relaxed [&_code]:bg-transparent [&_code]:p-0">
      {children}
    </pre>
  ),
  code: ({ children }) => <code className="rounded-md bg-[#f4f4f4] px-1.5 py-0.5 font-mono text-[13px] text-[#0d0d0d]">{children}</code>,
};

function MarkdownAnswer({ text }: { text: string }) {
  return (
    <div className="text-[15px] leading-[1.8] text-[#0d0d0d]">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {text}
      </ReactMarkdown>
    </div>
  );
}

export default memo(MarkdownAnswer);
