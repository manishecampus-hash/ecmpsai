import React from "react";

interface HighlightedTextProps {
  text?: string | null;
  className?: string;
}

export default function HighlightedText({ text, className }: HighlightedTextProps) {
  if (!text) {
    return null;
  }

  // Split text by matching pairs of asterisks (e.g., *Questions*)
  const parts = text.split(/(\*[^*]+\*)/g);

  return (
    <>
      {parts.map((part, index) => {
        const isHighlighted = part.startsWith("*") && part.endsWith("*") && part.length >= 2;

        if (isHighlighted) {
          const content = part.slice(1, -1);
          return (
            <span
              key={index}
              className={className || "text-orange-600"}
              style={className ? undefined : { color: "var(--orange-brand)" }}
            >
              {content}
            </span>
          );
        }

        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
}

