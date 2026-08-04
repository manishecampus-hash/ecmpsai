import React from "react";

interface HighlightedTextProps {
  text?: string | null;
}

export default function HighlightedText({ text }: HighlightedTextProps) {
  if (!text) {
    return null;
  }

  // Split text by matching pairs of asterisks (e.g., *Questionss*)
  const parts = text.split(/(\*[^*]+\*)/g);

  return (
    <>
      {parts.map((part, index) => {
        const isHighlighted = part.startsWith("*") && part.endsWith("*") && part.length >= 2;

        if (isHighlighted) {
          const content = part.slice(1, -1);
          return (
            <span key={index} className="text-orange-600" style={{ color: "var(--orange-brand)" }}>
              {content}
            </span>
          );
        }

        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
}
