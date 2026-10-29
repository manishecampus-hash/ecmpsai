"use client";

import { useEffect } from "react";

// Fades/slides in every [data-reveal] element on the page as it scrolls into view.
// One observer for the whole page and plain CSS transitions, so it adds almost no JS.
export default function RevealObserver() {
  useEffect(() => {
    const pending = new Set(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reveal = (el: Element) => {
      el.classList.add("is-visible");
      pending.delete(el as HTMLElement);
      io?.unobserve(el);
    };

    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && reveal(e.target)), {
            rootMargin: "0px 0px -8% 0px",
            threshold: 0.12,
          })
        : null;
    if (!io) return pending.forEach(reveal);
    pending.forEach((el) => io.observe(el));

    // A jump (anchor link, fast scroll) can skip past an element without it ever intersecting —
    // anything already above the bottom of the screen is shown too
    let frame = 0;
    const sweep = () => {
      frame = 0;
      pending.forEach((el) => el.getBoundingClientRect().top < window.innerHeight && reveal(el));
      if (!pending.size) window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sweep);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
