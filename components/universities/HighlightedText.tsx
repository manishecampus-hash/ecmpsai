import React from "react";

interface HighlightedTextProps {
  text?: string | null;
  className?: string;
  defaultColor?: string;
}

export default function HighlightedText({
  text,
  className,
  defaultColor = "#ee2c3c",
}: HighlightedTextProps) {
  if (!text || typeof text !== "string") {
    return null;
  }

  // Regex to match *word*, **word**, etc.
  const regex = /(\*{1,2}[^*]+\*{1,2})/g;
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        const isAsteriskWrapped =
          (part.startsWith("**") && part.endsWith("**") && part.length > 4) ||
          (part.startsWith("*") && part.endsWith("*") && part.length > 2);

        if (isAsteriskWrapped) {
          const content = part.replace(/^\*+|\*+$/g, "");
          return (
            <span
              key={index}
              className={className || "text-[#ee2c3c]"}
              style={{ color: defaultColor }}
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

