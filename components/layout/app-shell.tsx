"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";

// Dashboard has its own sidebar/topbar shell — skip the marketing navbar there.
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  // Global interception: open sign-up popup anywhere a user attempts to download/view a brochure if not signed in
  useEffect(() => {
    const handleGlobalBrochureClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Do not intercept if already inside an active auth modal/container
      if (
        target.closest("[data-auth-modal]") ||
        target.closest(".auth-modal") ||
        target.closest("form[action*='auth']")
      ) {
        return;
      }

      // Check if clicked element or its interactive ancestor relates to brochure download
      const clickable = target.closest("button, a, [role='button']") as HTMLElement | null;
      if (!clickable) return;

      const text = (clickable.innerText || clickable.textContent || "").toLowerCase();
      const href = clickable instanceof HTMLAnchorElement ? (clickable.getAttribute("href") || "").toLowerCase() : "";
      const ariaLabel = (clickable.getAttribute("aria-label") || "").toLowerCase();

      const isBrochureClick =
        text.includes("brochure") ||
        ariaLabel.includes("brochure") ||
        (href.includes("brochure") && !href.startsWith("/brochure-") && !href.endsWith("/brochure-form"));

      if (isBrochureClick) {
        let isAuthenticated = false;
        try {
          const raw = localStorage.getItem("ecampus_student");
          if (raw) {
            const parsed = JSON.parse(raw);
            isAuthenticated = Boolean(parsed && (parsed.id || parsed.phone || parsed.email));
          }
        } catch {}

        if (!isAuthenticated) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          window.dispatchEvent(new CustomEvent("open-signup"));
        }
      }
    };

    document.addEventListener("click", handleGlobalBrochureClick, true);
    return () => {
      document.removeEventListener("click", handleGlobalBrochureClick, true);
    };
  }, []);

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
    </>
  );
}
