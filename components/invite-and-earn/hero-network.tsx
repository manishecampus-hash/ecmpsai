// Hero backdrop for /invite-and-earn: a bright white-to-rose wash with a warm red glow, a faint red grid, and a
// network of connected dots (like the nodes in the eCampus logo) with red pulses travelling along the links —
// one friend referring the next. SVG + CSS only; the motion stops for people who prefer reduced motion.

// Nodes on a 1440 × 640 canvas, mostly to the right so the headline side stays clean
const NODES: [number, number][] = [
  [760, 90], [900, 40], [1060, 110], [1240, 60], [1380, 150],
  [820, 250], [980, 300], [1160, 240], [1320, 330],
  [880, 470], [1060, 520], [1250, 470], [1400, 560], [640, 560], [700, 380],
];

const LINKS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [2, 6], [5, 6], [6, 7], [2, 7], [7, 3], [7, 8], [4, 8],
  [5, 14], [6, 9], [14, 9], [9, 10], [10, 11], [11, 8], [11, 12], [8, 12], [9, 13], [14, 13], [10, 6],
];

// Links that carry a travelling pulse, with their timing (duration s, delay s)
const PULSES: [number, number, number][] = [
  [1, 3.2, 0], [5, 2.8, -1.2], [8, 3.6, -0.6], [11, 3, -2.1], [14, 2.6, -0.3], [16, 3.4, -1.7], [19, 2.9, -2.6], [21, 3.1, -0.9],
];

// Nodes with a slow glowing ring
const BEACONS = [2, 6, 8, 10, 14];

const line = ([a, b]: [number, number]) => `M${NODES[a][0]} ${NODES[a][1]} L${NODES[b][0]} ${NODES[b][1]}`;

export default function HeroNetwork() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <span className="absolute inset-0 bg-gradient-to-br from-white via-[#fff6f6] to-[#ffe4e8]" />
      <span className="absolute -right-32 -top-40 h-[560px] w-[560px] rounded-full bg-red-300/40 blur-[130px]" />
      <span className="absolute -bottom-52 left-[30%] h-[380px] w-[620px] rounded-full bg-rose-200/50 blur-[120px]" />
      <span className="absolute inset-0 [background-image:linear-gradient(rgba(220,38,38,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.07)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_75%)]" />

      <svg
        viewBox="0 0 1440 640"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full [mask-image:linear-gradient(to_right,transparent_22%,black_58%)]"
        fill="none"
      >
        <g stroke="rgba(239,68,68,0.22)" strokeWidth="1">
          {LINKS.map((l) => (
            <path key={`${l[0]}-${l[1]}`} d={line(l)} />
          ))}
        </g>
        {PULSES.map(([i, dur, delay]) => (
          <path
            key={`pulse-${i}`}
            d={line(LINKS[i])}
            pathLength={1000}
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="140 860"
            strokeDashoffset="1000"
            className="opacity-0 motion-safe:animate-[dash-travel_3s_linear_infinite] motion-safe:opacity-80"
            style={{ animationDuration: `${dur}s`, animationDelay: `${delay}s` }}
          />
        ))}
        {NODES.map(([x, y], i) => (
          <g key={`${x}-${y}`}>
            {BEACONS.includes(i) && (
              <circle
                cx={x}
                cy={y}
                r="14"
                fill="#ef4444"
                className="opacity-20 motion-safe:animate-ping"
                style={{ transformBox: "fill-box", transformOrigin: "center", animationDuration: "3s", animationDelay: `${i * -0.4}s` }}
              />
            )}
            <circle cx={x} cy={y} r="9" fill="#fecaca" opacity="0.7" />
            <circle cx={x} cy={y} r="3.5" fill={BEACONS.includes(i) ? "#dc2626" : "#ef4444"} />
          </g>
        ))}
      </svg>

      <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-300 to-transparent" />
    </div>
  );
}
