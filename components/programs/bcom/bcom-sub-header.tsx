"use client";

import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { label: "Program Overview", sectionId: "program-overview" },
  { label: "Key Highlights", sectionId: "key-highlights" },
  { label: "Subject/Syllabus", sectionId: "subject-syllabus" },
  { label: "Eligibility & Duration", sectionId: "eligibility-duration" },
  { label: "Program Fees", sectionId: "program-fees" },
  { label: "Admission Process", sectionId: "admission-process" },
  { label: "Top Specialization", sectionId: "top-specialization" },
  { label: "Career Scope", sectionId: "career-scope" },
  { label: "FAQs", sectionId: "faqs" },
];

// Main website header height in pixels
const MAIN_HEADER_HEIGHT = 70;

// Show the sub-header only after this much vertical scroll
const SHOW_AFTER_SCROLL = 250;

// Delay before showing the sub-header after scroll condition is matched
const REVEAL_DELAY_MS = 200;

// Sub-header height in pixels
const SUB_HEADER_HEIGHT = 56;

// Footer must have this id: <footer id="footer">
const FOOTER_ID = "footer";

export default function BComSubHeader() {
  const [activeSection, setActiveSection] = useState<string>(
    NAV_ITEMS[0].sectionId,
  );
  const [isVisible, setIsVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const activeLinkRef = useRef<HTMLButtonElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect when the footer enters the viewport
  useEffect(() => {
    const footer = document.getElementById(FOOTER_ID);
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,

        // Use positive bottom margin to hide the sub-header slightly before footer appears
        rootMargin: "0px 0px 200px 0px",
      },
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  // Show sub-header after scrolling down, but hide it again near the footer
  useEffect(() => {
    const onScroll = () => {
      const shouldShow =
        window.scrollY >= SHOW_AFTER_SCROLL && !isFooterVisible;

      if (shouldShow) {
        if (!revealTimerRef.current) {
          revealTimerRef.current = setTimeout(() => {
            setIsVisible(true);
          }, REVEAL_DELAY_MS);
        }
      } else {
        if (revealTimerRef.current) {
          clearTimeout(revealTimerRef.current);
          revealTimerRef.current = null;
        }

        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);

      if (revealTimerRef.current) {
        clearTimeout(revealTimerRef.current);
        revealTimerRef.current = null;
      }
    };
  }, [isFooterVisible]);

  // Scroll-spy: update active tab based on the section currently in view
  useEffect(() => {
    const SCROLL_OFFSET = MAIN_HEADER_HEIGHT + SUB_HEADER_HEIGHT;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: `-${SCROLL_OFFSET}px 0px -40% 0px`,
        threshold: 0,
      },
    );

    NAV_ITEMS.forEach(({ sectionId }) => {
      const section = document.getElementById(sectionId);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Keep the active tab visible inside the horizontal scroll area on mobile
  useEffect(() => {
    if (activeLinkRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const button = activeLinkRef.current;

      const containerLeft = container.scrollLeft;
      const containerRight = containerLeft + container.offsetWidth;
      const buttonLeft = button.offsetLeft;
      const buttonRight = buttonLeft + button.offsetWidth;

      if (buttonLeft < containerLeft) {
        container.scrollTo({ left: buttonLeft - 16, behavior: "smooth" });
      } else if (buttonRight > containerRight) {
        container.scrollTo({
          left: buttonRight - container.offsetWidth + 16,
          behavior: "smooth",
        });
      }
    }
  }, [activeSection]);

  const handleClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const SCROLL_OFFSET = MAIN_HEADER_HEIGHT + SUB_HEADER_HEIGHT;
    const top =
      section.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;

    window.scrollTo({ top, behavior: "smooth" });
    setActiveSection(sectionId);
  };

  return (
    <div
      className={`font-sans fixed left-0 right-0 z-40 bg-white  border-gray-200 shadow-none transition-all duration-300 ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-[calc(100%+70px)] opacity-0 pointer-events-none"
      }`}
      style={{
        top: `${MAIN_HEADER_HEIGHT}px`,
      }}
    >
      <div ref={scrollContainerRef} className="overflow-x-auto scrollbar-hide">
        <nav className="flex items-center justify-center min-w-max mx-auto px-4 md:px-8">
          {NAV_ITEMS.map(({ label, sectionId }) => {
            const isActive = activeSection === sectionId;

            return (
              <button
                key={sectionId}
                ref={isActive ? activeLinkRef : undefined}
                onClick={() => handleClick(sectionId)}
                className={`relative whitespace-nowrap px-3 py-4 text-sm font-medium transition-colors focus:outline-none ${
                  isActive ? "text-red-500" : "text-gray-700 hover:text-red-500"
                }`}
              >
                {label}

                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-t" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
