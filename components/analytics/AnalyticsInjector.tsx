"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __cms_head_injected__?: boolean;
    __cms_body_injected__?: boolean;
  }
}

export function AnalyticsInjector() {
  useEffect(() => {
    const apiUrl =
      process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL ||
      "http://localhost:5000";

    fetch(`${apiUrl}/analytics`)
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (!data) return;

        // 1. Inject Head Code if not already injected
        if (
          data.headCode &&
          typeof data.headCode === "string" &&
          data.headCode.trim() &&
          !window.__cms_head_injected__
        ) {
          try {
            const range = document.createRange();
            range.selectNode(document.head);
            const fragment = range.createContextualFragment(data.headCode.trim());
            document.head.appendChild(fragment);
            window.__cms_head_injected__ = true;
          } catch (err) {
            console.error("Failed to inject CMS Head analytics scripts:", err);
          }
        }

        // 2. Inject Body Code if not already injected
        if (
          data.bodyCode &&
          typeof data.bodyCode === "string" &&
          data.bodyCode.trim() &&
          !window.__cms_body_injected__
        ) {
          try {
            const range = document.createRange();
            range.selectNode(document.body);
            const fragment = range.createContextualFragment(data.bodyCode.trim());
            document.body.appendChild(fragment);
            window.__cms_body_injected__ = true;
          } catch (err) {
            console.error("Failed to inject CMS Body analytics scripts:", err);
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching analytics scripts from API:", err);
      });
  }, []);

  return null;
}
