import React from "react";

interface HighlightedTitleProps {
  text?: string | null;
  className?: string;
  highlightClassName?: string;
  fallbackLastWord?: boolean;
}

export function HighlightedTitle({
  text,
  className,
  highlightClassName = "text-red-500",
  fallbackLastWord = false,
}: HighlightedTitleProps) {
  if (!text || typeof text !== "string") return null;

  // If text contains asterisks (*word* or **word**)
  if (text.includes("*")) {
    const regex = /(\*{1,2}[^*]+\*{1,2})/g;
    const parts = text.split(regex);
    return (
      <span className={className}>
        {parts.map((part, index) => {
          const isAsteriskWrapped =
            (part.startsWith("**") && part.endsWith("**") && part.length > 4) ||
            (part.startsWith("*") && part.endsWith("*") && part.length > 2);

          if (isAsteriskWrapped) {
            const content = part.replace(/^\*+|\*+$/g, "");
            return (
              <span key={index} className={highlightClassName}>
                {content}
              </span>
            );
          }

          return <React.Fragment key={index}>{part}</React.Fragment>;
        })}
      </span>
    );
  }

  // Fallback: If no asterisks and fallbackLastWord is true, highlight the last word
  if (fallbackLastWord && text.includes(" ")) {
    const lastSpaceIndex = text.lastIndexOf(" ");
    const before = text.substring(0, lastSpaceIndex);
    const lastWord = text.substring(lastSpaceIndex + 1);
    return (
      <span className={className}>
        {before} <span className={highlightClassName}>{lastWord}</span>
      </span>
    );
  }

  return <span className={className}>{text}</span>;
}

export default HighlightedTitle;
