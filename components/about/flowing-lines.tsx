// Thin curves across a section background, each with a short streak travelling along it.
// SVG + CSS only (no JS); the motion stops for people who prefer reduced motion.

const LINES = [
  "M-40 520 C 300 420, 520 640, 820 500 S 1250 260, 1480 300",
  "M-40 600 C 360 520, 640 700, 940 560 S 1300 380, 1480 430",
  "M560 -40 C 740 110, 900 60, 1060 200 S 1340 430, 1480 380",
];

const TONES = {
  // Red lines on a blush background
  light: { line: "#fecaca", streak: "#ef4444" },
  // White lines on a red or navy background
  inverse: { line: "rgba(255,255,255,0.14)", streak: "rgba(255,255,255,0.75)" },
};

export default function FlowingLines({ tone = "light", className = "" }: { tone?: keyof typeof TONES; className?: string }) {
  const { line, streak } = TONES[tone];
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 640"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      {LINES.map((d, i) => (
        <g key={d}>
          <path d={d} stroke={line} strokeWidth="1.25" />
          <path
            d={d}
            pathLength={1000}
            stroke={streak}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeDasharray="90 910"
            strokeDashoffset="1000"
            className="opacity-0 motion-safe:animate-[dash-travel_9s_linear_infinite] motion-safe:opacity-70"
            style={{ animationDelay: `${i * -3}s` }}
          />
        </g>
      ))}
    </svg>
  );
}
