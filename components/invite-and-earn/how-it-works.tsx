"use client";

import { useEffect, useRef, useState } from "react";
import { Check, MessagesSquare, UserPlus, Wallet } from "lucide-react";

const STEPS = [
  { icon: UserPlus, title: "Share your friend's details", text: "Log in and add your friend's name, phone number and the programs they're interested in." },
  { icon: MessagesSquare, title: "We guide them to enrol", text: "Our counselor calls your friend, helps them choose the right program and completes the admission." },
  { icon: Wallet, title: "Get paid", text: "Once the enrolment is confirmed, your reward is transferred to the bank account you've added." },
];

// Three steps joined by a line that draws from step 1 to step 3 as you scroll; each step lights up
// when the line reaches it. Horizontal on desktop, vertical on phones.
export default function HowItWorks() {
  const listRef = useRef<HTMLOListElement>(null);
  const trackRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const headRef = useRef<HTMLSpanElement>(null);
  const [reached, setReached] = useState(-1);

  useEffect(() => {
    const list = listRef.current;
    const track = trackRef.current;
    const fill = fillRef.current;
    const head = headRef.current;
    if (!list || !track || !fill || !head) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const box = list.getBoundingClientRect();
      const wide = window.matchMedia("(min-width: 768px)").matches;
      // Centre of each step's circle, relative to the list
      const centres = Array.from(list.querySelectorAll<HTMLElement>("[data-step-dot]")).map((dot) => {
        const r = dot.getBoundingClientRect();
        return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
      });
      if (centres.length < 2) return;
      const first = centres[0];
      const last = centres[centres.length - 1];
      const length = wide ? last.x - first.x : last.y - first.y;

      // Lay the track from the first circle to the last
      Object.assign(track.style, wide
        ? { left: `${first.x}px`, top: `${first.y - 2}px`, width: `${length}px`, height: "4px", opacity: "1" }
        : { left: `${first.x - 2}px`, top: `${first.y}px`, width: "4px", height: `${length}px`, opacity: "1" });

      const vh = window.innerHeight;
      // Desktop: draws over about half a screen of scrolling once the steps are in view.
      // Phone: follows a point 65% down the screen.
      const raw = wide ? (vh * 0.85 - box.top - first.y) / (vh * 0.45) : (vh * 0.65 - box.top - first.y) / length;
      const p = reduceMotion ? 1 : Math.min(1, Math.max(0, raw));

      fill.style.transformOrigin = wide ? "left center" : "center top";
      fill.style.transform = wide ? `scaleX(${p})` : `scaleY(${p})`;
      Object.assign(head.style, wide
        ? { left: `${p * 100}%`, top: "50%", opacity: p > 0 && p < 1 ? "1" : "0" }
        : { top: `${p * 100}%`, left: "50%", opacity: p > 0 && p < 1 ? "1" : "0" });

      const travelled = p * length;
      let count = -1;
      centres.forEach((c, i) => {
        const at = wide ? c.x - first.x : c.y - first.y;
        if (p > 0 && travelled >= at - 1) count = i;
      });
      setReached(count);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ol ref={listRef} className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
      {/* Track, its scroll-driven fill and a glowing head at the leading edge */}
      <span ref={trackRef} aria-hidden className="absolute rounded-full bg-gray-100 opacity-0">
        <span ref={fillRef} className="absolute inset-0 rounded-full bg-red-600" style={{ transform: "scale(0)" }} />
        <span
          ref={headRef}
          className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600 opacity-0 shadow-[0_0_0_6px_rgba(220,38,38,0.15)] transition-opacity duration-200"
        />
      </span>

      {STEPS.map(({ icon: Icon, title, text }, i) => {
        const on = i <= reached;
        return (
          <li key={title} className="relative flex gap-5 md:flex-col md:items-center md:text-center">
            <span
              data-step-dot
              className={`relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full ring-8 ring-white transition-all duration-500 ${
                on ? "scale-100 bg-red-600 text-white shadow-lg shadow-red-600/25" : "scale-95 border-2 border-gray-200 bg-white text-gray-400"
              }`}
            >
              <Icon className="h-6 w-6" aria-hidden />
              <span
                className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-white transition-all duration-300 ${
                  on ? "scale-100 opacity-100" : "scale-50 opacity-0"
                }`}
              >
                <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
              </span>
            </span>
            <div className={`pb-1 transition-all duration-500 md:mt-6 ${on ? "translate-y-0 opacity-100" : "translate-y-1 opacity-60"}`}>
              <p className={`text-xs font-bold uppercase tracking-[0.14em] transition-colors duration-500 ${on ? "text-red-600" : "text-gray-400"}`}>Step {i + 1}</p>
              <h3 className="mt-1.5 text-lg font-bold text-gray-900">{title}</h3>
              <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-gray-600 md:mx-auto">{text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
