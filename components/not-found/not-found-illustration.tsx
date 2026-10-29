// Hand-built SVG for the 404 page: "404" with a graduation cap on the zero, a stack of books,
// an open book, leaves, a pencil cup and a paper plane. Inline SVG, so it's sharp and needs no download.

const RED = "#b91c1c";
const RED_DARK = "#7f1d1d";
const RED_MID = "#dc2626";
const RED_LIGHT = "#f87171";
const PAPER = "#fff7f5";

function Leaves({ x, y, scale = 1, flip = false }: { x: number; y: number; scale?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      <path d="M0 0 C 6 -40, 18 -80, 40 -120" fill="none" stroke={RED} strokeWidth="3" strokeLinecap="round" />
      {[
        [6, -24, -40],
        [12, -48, -30],
        [20, -72, -20],
        [30, -96, -10],
      ].map(([lx, ly, r], i) => (
        <g key={i}>
          <ellipse cx={lx - 14} cy={ly} rx="15" ry="7" transform={`rotate(${r + 210} ${lx - 14} ${ly})`} fill={i % 2 ? RED_LIGHT : RED_MID} />
          <ellipse cx={lx + 14} cy={ly - 6} rx="15" ry="7" transform={`rotate(${-r - 30} ${lx + 14} ${ly - 6})`} fill={i % 2 ? RED_MID : RED_LIGHT} />
        </g>
      ))}
      <ellipse cx="44" cy="-128" rx="12" ry="6" transform="rotate(-60 44 -128)" fill={RED_MID} />
    </g>
  );
}

function Book({ x, y, w, label, tone }: { x: number; y: number; w: number; label: string; tone: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="38" rx="5" fill={tone} />
      <rect x={x} y={y + 32} width={w} height="6" rx="3" fill={RED_DARK} opacity="0.35" />
      {/* Page edge */}
      <rect x={x + w - 26} y={y + 6} width="20" height="24" rx="2" fill={PAPER} />
      <path d={`M${x + w - 24} ${y + 13} h16 M${x + w - 24} ${y + 19} h16 M${x + w - 24} ${y + 25} h16`} stroke="#fecaca" strokeWidth="1.2" />
      {/* Label plate */}
      <rect x={x + 22} y={y + 8} width={w - 60} height="22" rx="3" fill={PAPER} />
      <text x={x + 22 + (w - 60) / 2} y={y + 24} textAnchor="middle" fontSize="13" fontWeight="700" letterSpacing="1.5" fill="#374151">
        {label}
      </text>
    </g>
  );
}

export default function NotFoundIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 620 460" className={className} role="img" aria-labelledby="nf-title">
      <title id="nf-title">404 — a graduation cap resting on the zero, beside a stack of books</title>

      {/* Backdrop */}
      <circle cx="330" cy="230" r="200" fill="#fdeeee" />
      <ellipse cx="320" cy="408" rx="270" ry="30" fill="#fbe2e2" />

      {/* Paper plane with its dashed trail */}
      <g className="motion-safe:animate-float [animation-delay:1s]">
        <path d="M455 150 C 500 140, 520 90, 560 62" fill="none" stroke="#fca5a5" strokeWidth="2" strokeDasharray="5 6" strokeLinecap="round" />
        <path d="M560 40 L600 28 L578 70 L570 54 Z" fill={RED_LIGHT} />
        <path d="M570 54 L600 28 L560 40 Z" fill="#fecaca" />
      </g>

      {/* 404 — a darker copy behind gives the digits depth */}
      <text x="338" y="352" textAnchor="middle" fontSize="250" fontWeight="800" letterSpacing="-8" fill={RED_DARK}>
        404
      </text>
      <text x="330" y="346" textAnchor="middle" fontSize="250" fontWeight="800" letterSpacing="-8" fill={RED}>
        404
      </text>

      {/* Excitement marks beside the cap */}
      <g stroke={RED_MID} strokeWidth="4" strokeLinecap="round" className="motion-safe:animate-pulse">
        <path d="M232 92 L246 108" />
        <path d="M262 74 L266 94" />
        <path d="M214 122 L234 128" />
        <path d="M418 62 L410 82" />
        <path d="M444 80 L428 92" />
      </g>

      {/* Graduation cap resting on the zero */}
      <g className="motion-safe:animate-float">
        <g transform="rotate(-6 330 120)">
          <path d="M282 128 L282 162 Q330 186 378 162 L378 128 Q330 150 282 128 Z" fill="#1f2937" />
          <path d="M236 116 L330 84 L424 116 L330 148 Z" fill="#111827" />
          <path d="M236 116 L330 148 L424 116 L424 121 L330 153 L236 121 Z" fill="#374151" />
          <circle cx="330" cy="116" r="5" fill={RED_MID} />
          <path d="M330 116 Q 380 118 404 126 L404 170" fill="none" stroke={RED_MID} strokeWidth="3" strokeLinecap="round" />
          <path d="M398 168 L410 168 L413 196 L395 196 Z" fill={RED_MID} />
        </g>
      </g>

      {/* Leaves on both sides */}
      <Leaves x={110} y={392} scale={0.9} />
      <Leaves x={560} y={386} scale={0.75} flip />

      {/* Stack of books */}
      <g className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-both motion-safe:delay-300 motion-safe:duration-700">
        <Book x={168} y={352} w={226} label="SUCCEED" tone={RED} />
        <Book x={182} y={314} w={204} label="GROW" tone={RED_MID} />
        <Book x={196} y={276} w={184} label="LEARN" tone={RED} />
      </g>

      {/* Open book */}
      <g className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-both motion-safe:delay-500 motion-safe:duration-700">
        <path d="M396 392 L470 378 L548 392 L548 400 L470 388 L396 400 Z" fill={RED} />
        <path d="M402 388 Q 430 352 470 368 L470 386 Q 436 372 402 388 Z" fill="#ffffff" stroke="#fecaca" />
        <path d="M538 388 Q 510 352 470 368 L470 386 Q 504 372 538 388 Z" fill={PAPER} stroke="#fecaca" />
        <path d="M418 372 Q 440 362 462 368 M420 378 Q 442 368 462 374 M482 368 Q 504 362 524 372 M482 374 Q 502 368 522 378" stroke="#fca5a5" strokeWidth="1.2" fill="none" />
      </g>

      {/* Pencil cup */}
      <g>
        <path d="M584 342 L590 300 M594 342 L604 296 M576 342 L572 304" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
        <path d="M590 300 L588 292 M604 296 L604 288 M572 304 L568 297" stroke={RED_MID} strokeWidth="3" strokeLinecap="round" />
        <rect x="566" y="336" width="42" height="56" rx="6" fill={RED} />
        <rect x="566" y="336" width="42" height="8" rx="4" fill={RED_DARK} opacity="0.4" />
      </g>
    </svg>
  );
}
