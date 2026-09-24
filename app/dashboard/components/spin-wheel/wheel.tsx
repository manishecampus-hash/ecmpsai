"use client";

import { useEffect, useRef, useState } from "react";
import { SPIN_WHEEL_COLORS, type SpinWheelReward } from "./data";

const VIEWBOX_SIZE = 220;
const CENTER = VIEWBOX_SIZE / 2;
const OUTER_RADIUS = 102;
const LABEL_RADIUS = 66;
const EXTRA_SPINS = 6;

const toRad = (deg: number) => (deg * Math.PI) / 180;

// Standard "0deg = east, clockwise positive" convention — matches SVG's
// y-down coordinate system and composes directly with `rotate()`.
function pointOnCircle(radius: number, angleDeg: number) {
  const rad = toRad(angleDeg);
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

function describeSlice(startAngle: number, endAngle: number) {
  const start = pointOnCircle(OUTER_RADIUS, startAngle);
  const end = pointOnCircle(OUTER_RADIUS, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${CENTER} ${CENTER} L ${start.x} ${start.y} A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
}

/**
 * The pointer sits fixed at the top (screen angle 270° in the east-based
 * convention above). Solve for the rotation that lands `index`'s segment
 * center under it, always moving forward from `currentRotation` so the
 * wheel never snaps backward, plus a few extra full turns for effect.
 */
export function getTargetRotation(
  index: number,
  segmentAngle: number,
  currentRotation: number,
): number {
  const segmentCenter = index * segmentAngle + segmentAngle / 2;
  const pointerAngle = 270;
  const target = ((pointerAngle - segmentCenter) % 360 + 360) % 360;
  const normalizedCurrent = ((currentRotation % 360) + 360) % 360;
  const deltaFromCurrent = ((target - normalizedCurrent) % 360 + 360) % 360;
  return currentRotation + deltaFromCurrent + EXTRA_SPINS * 360;
}

interface SpinWheelSvgProps {
  rewards: SpinWheelReward[];
  rotation: number;
  onSpinComplete?: () => void;
}

export function SpinWheelSvg({
  rewards,
  rotation,
  onSpinComplete,
}: SpinWheelSvgProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const segmentAngle = 360 / rewards.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  // Native CSS transition instead of a motion library — the most reliable,
  // dependency-free way to guarantee this rotates the same way in every
  // browser. Reduced motion still needs to read as a visible spin, just
  // calmer and shorter than the full flourish — never an instant snap.
  useEffect(() => {
    const el = svgRef.current;
    if (!el || !onSpinComplete) return;

    const handleTransitionEnd = (e: TransitionEvent) => {
      if (e.target === el && e.propertyName === "transform") onSpinComplete();
    };

    el.addEventListener("transitionend", handleTransitionEnd);
    return () => el.removeEventListener("transitionend", handleTransitionEnd);
  }, [onSpinComplete]);

  const duration = reducedMotion ? 1.8 : 5;
  const easing = reducedMotion
    ? "cubic-bezier(0, 0, 0.2, 1)"
    : "cubic-bezier(0.14, 0.8, 0.24, 1)";

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
      className="h-full w-full drop-shadow-[0_10px_28px_rgba(127,29,29,0.35)]"
      style={{
        transformOrigin: "50% 50%",
        transform: `rotate(${rotation}deg)`,
        transition: `transform ${duration}s ${easing}`,
      }}
      role="img"
      aria-label="Scholarship spin wheel"
    >
      {/* Outer ring */}
      <circle cx={CENTER} cy={CENTER} r={OUTER_RADIUS + 5} fill={SPIN_WHEEL_COLORS.ring} />

      {rewards.map((reward, i) => {
        const start = i * segmentAngle;
        const end = start + segmentAngle;
        const mid = start + segmentAngle / 2;
        const fill = i % 2 === 0 ? SPIN_WHEEL_COLORS.primary : SPIN_WHEEL_COLORS.accent;
        const labelPos = pointOnCircle(LABEL_RADIUS, mid);
        const isLeftHalf = Math.cos(toRad(mid)) < 0;
        const textRotation = isLeftHalf ? mid + 180 : mid;

        return (
          <g key={reward.id}>
            <path
              d={describeSlice(start, end)}
              fill={fill}
              stroke={SPIN_WHEEL_COLORS.ring}
              strokeWidth={1.5}
            />
            <text
              x={labelPos.x}
              y={labelPos.y}
              fill={SPIN_WHEEL_COLORS.text}
              fontSize={13}
              fontWeight={700}
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${textRotation}, ${labelPos.x}, ${labelPos.y})`}
            >
              {reward.label}
            </text>
          </g>
        );
      })}

      {/* Crisp rim */}
      <circle
        cx={CENTER}
        cy={CENTER}
        r={OUTER_RADIUS + 5}
        fill="none"
        stroke="#ffffff"
        strokeWidth={3}
      />
    </svg>
  );
}
