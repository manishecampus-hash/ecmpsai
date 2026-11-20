"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __cms_analytics_last_hash__?: string;
  }
}

/**
 * Safely parses and injects HTML snippets into <head> or <body>.
 * - Ensures all <script> tags are dynamically instantiated as HTMLScriptElement so browsers execute them.
 * - Automatically routes visual/UI elements (e.g. <elevenlabs-convai>, <div>, widgets) to document.body,
 *   even if pasted into "Head Scripts", because elements inside <head> have display:none and cannot render.
 * - Routes metadata tags (<meta>, <link>, <style>, <title>, <base>) to document.head.
 */
function injectSnippet(rawHtml: string, targetType: "head" | "body") {
  if (!rawHtml || !rawHtml.trim()) return;

  const parser = new DOMParser();
  const parsedDoc = parser.parseFromString(rawHtml.trim(), "text/html");

  // Collect all nodes from both parsed <head> and <body>
  const nodes: Node[] = [];
  parsedDoc.head.childNodes.forEach((n) => nodes.push(n));
  parsedDoc.body.childNodes.forEach((n) => nodes.push(n));

  nodes.forEach((node) => {
    if (node.nodeType === Node.COMMENT_NODE) return;

    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent && node.textContent.trim()) {
        const textNode = document.createTextNode(node.textContent);
        if (targetType === "body") {
          document.body.appendChild(textNode);
        }
      }
      return;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      const tagName = el.tagName.toUpperCase();

      // Handle <script> tags
      if (tagName === "SCRIPT") {
        const script = document.createElement("script");
        Array.from(el.attributes).forEach((attr) => {
          script.setAttribute(attr.name, attr.value);
        });
        script.setAttribute("data-cms-injected", targetType);
        if (el.textContent) {
          script.textContent = el.textContent;
        }

        if (targetType === "head") {
          document.head.appendChild(script);
        } else {
          document.body.appendChild(script);
        }
        return;
      }

      // Metadata elements: META, LINK, STYLE, TITLE, BASE
      const isHeadMetadata = ["META", "LINK", "STYLE", "TITLE", "BASE"].includes(tagName);

      if (isHeadMetadata) {
        const cloned = el.cloneNode(true) as HTMLElement;
        cloned.setAttribute("data-cms-injected", "head");
        document.head.appendChild(cloned);
        return;
      }

      // Non-metadata elements (such as <elevenlabs-convai>, <div>, <iframe>, <noscript>, widgets):
      // Must be placed in <body> because <head> has display:none !important
      const cloned = el.cloneNode(true) as HTMLElement;
      cloned.setAttribute("data-cms-injected", targetType);

      // If cloned element contains any internal <script> tags, activate them
      const innerScripts = cloned.querySelectorAll("script");
      innerScripts.forEach((oldScript) => {
        const activeScript = document.createElement("script");
        Array.from(oldScript.attributes).forEach((attr) => {
          activeScript.setAttribute(attr.name, attr.value);
        });
        activeScript.setAttribute("data-cms-injected", targetType);
        if (oldScript.textContent) {
          activeScript.textContent = oldScript.textContent;
        }
        oldScript.parentNode?.replaceChild(activeScript, oldScript);
      });

      document.body.appendChild(cloned);
    }
  });
}

export function AnalyticsInjector() {
  useEffect(() => {
    const frontendApiUrl =
      process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL ||
      "http://localhost:5000";
    const backendApiUrl =
      process.env.NEXT_PUBLIC_ECAMPUS_BACKEND_API_URL ||
      "http://localhost:4000";

    const fetchAnalytics = async () => {
      let data: { headCode?: string; bodyCode?: string } | null = null;

      try {
        const res = await fetch(`${frontendApiUrl}/analytics`);
        if (res.ok) {
          data = await res.json();
        }
      } catch {
        // Fallback to backend API
      }

      if (!data) {
        try {
          const res = await fetch(`${backendApiUrl}/api/settings/analytics`);
          if (res.ok) {
            data = await res.json();
          }
        } catch {
          // Both failed
        }
      }

      if (!data) return;

      const headCode = typeof data.headCode === "string" ? data.headCode : "";
      const bodyCode = typeof data.bodyCode === "string" ? data.bodyCode : "";
      const currentHash = `${headCode}:::${bodyCode}`;

      // Avoid re-injecting if nothing changed
      if (window.__cms_analytics_last_hash__ === currentHash) {
        return;
      }

      // If re-injecting new scripts, clean up previous CMS injected elements
      document.querySelectorAll("[data-cms-injected]").forEach((el) => el.remove());

      try {
        if (headCode) {
          injectSnippet(headCode, "head");
        }
        if (bodyCode) {
          injectSnippet(bodyCode, "body");
        }
        window.__cms_analytics_last_hash__ = currentHash;
      } catch (err) {
        console.error("Failed to inject CMS analytics scripts:", err);
      }
    };

    fetchAnalytics();
  }, []);

  return null;
}
