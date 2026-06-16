"use client";

import { Share2, BookmarkPlus } from "lucide-react";

export function ShareSaveButtons() {
  return (
    <div
      style={{
        marginTop: "24px",
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={() => navigator.share?.({ url: window.location.href })}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "7px",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "8px 16px",
          fontSize: "13px",
          fontWeight: 500,
          color: "var(--text-muted)",
          background: "var(--bg-page)",
          cursor: "pointer",
        }}
      >
        <Share2 style={{ width: 15, height: 15 }} /> Share
      </button>
    </div>
  );
}
