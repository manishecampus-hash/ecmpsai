"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface ProcessSection {
  university?: {
    name?: string;
  };
}

interface AdmissionStep {
  title: string;
  description: string;
}

const ADMISSION_STEPS: AdmissionStep[] = [
  {
    title: "Visit the Website",
    description:
      "Go to the official website and open the admissions page for the program you're interested in.",
  },
  {
    title: "Click Apply Now",
    description:
      'Click on the "Apply Now" button at the top of the page to start your application.',
  },
  {
    title: "Fill Your Details",
    description:
      "Fill in your basic personal and academic details, followed by your employment details (if any).",
  },
  {
    title: "Upload Documents",
    description:
      "Upload all the necessary documents for eligibility proof along with a recent, coloured passport-size photo.",
  },
  {
    title: "Submit & Pay",
    description:
      "Submit the application form and pay the application fee. Once reviewed and verified, you'll be informed about your enrollment and next steps via email.",
  },
];

interface Point {
  x: number;
  y: number;
}

// Builds a gently zig-zagging (curvy) path through a fixed-x column of points —
// the line bulges left/right between dots instead of running perfectly straight.
function buildWavyPath(points: Point[], amplitude = 26): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    const dir = i % 2 === 0 ? 1 : -1; // alternate bulge direction per segment
    const cx = p0.x + dir * amplitude;
    const cy1 = p0.y + (p1.y - p0.y) * 0.3;
    const cy2 = p0.y + (p1.y - p0.y) * 0.7;
    d += ` C ${cx} ${cy1}, ${cx} ${cy2}, ${p1.x} ${p1.y}`;
  }

  return d;
}

export default function AdmissionProcessSection({
  university,
}: ProcessSection) {
  const universityName = university?.name ?? "the university";

  const containerRef = useRef<HTMLDivElement | null>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [points, setPoints] = useState<Point[]>([]);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  const [activeStep, setActiveStep] = useState(0);

  // Measure real dot positions so the connector line always passes exactly
  // through each numbered circle, no matter how tall the text wraps.
  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const nextPoints: Point[] = dotRefs.current
      .filter((el): el is HTMLSpanElement => Boolean(el))
      .map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        };
      });

    setPoints(nextPoints);
    setSvgSize({ width: containerRect.width, height: containerRect.height });
  }, []);

  useEffect(() => {
    measure();

    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => measure());
    resizeObserver.observe(container);
    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // Track which step is active by comparing each dot's position to a fixed
  // line near the top of the viewport — more reliable than IntersectionObserver
  // for rows of very different heights.
  useEffect(() => {
    const THRESHOLD = 180;

    const handleScroll = () => {
      const dots = dotRefs.current.filter((el): el is HTMLSpanElement =>
        Boolean(el),
      );
      if (dots.length === 0) return;

      let next = 0;
      for (let i = 0; i < dots.length; i++) {
        const top = dots[i].getBoundingClientRect().top;
        if (top <= THRESHOLD) {
          next = i;
        }
      }
      setActiveStep(next);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const basePath = buildWavyPath(points);
  const progressPath = buildWavyPath(points.slice(0, activeStep + 1));

  return (
    <section
      id="admission-process"
      className="bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center">
          <span className="mb-4 inline-flex rounded-full bg-red-50 px-4 py-1 text-sm font-semibold text-red-600">
            Admission Open 2026
          </span>
        </div>
        <h2 className="text-center text-3xl font-bold uppercase tracking-tight text-slate-800 sm:text-4xl lg:text-4xl">
          {university?.name ? `${university.name} ` : ""}Online Admission
          Process
        </h2>

        <p className="mt-6 text-sm leading-7 text-slate-500 sm:text-base">
          The admission procedure for {universityName} online programs generally
          takes place two times a year. The first admission cycle starts in
          January, and the second cycle takes place in July. The entire process,
          from registration to admission confirmation, happens online. No
          entrance exam is required for admission.
        </p>

        <p className="mt-4 text-sm font-medium text-slate-700 sm:text-base">
          The admission procedure for 2026 for the online courses at{" "}
          {universityName} is as follows:
        </p>

        {/* Step timeline */}
        <div ref={containerRef} className="relative mt-12">
          {svgSize.width > 0 && svgSize.height > 0 && (
            <svg
              className="pointer-events-none absolute left-0 top-0 z-0"
              width={svgSize.width}
              height={svgSize.height}
              viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
            >
              <path
                d={basePath}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth={2}
                strokeLinecap="round"
              />
              <path
                d={progressPath}
                fill="none"
                stroke="#dc2626"
                strokeWidth={2.5}
                strokeLinecap="round"
              />
            </svg>
          )}

          {ADMISSION_STEPS.map((item, index) => {
            const isActive = index === activeStep;

            return (
              <div
                key={item.title}
                className="relative z-10 flex gap-6 pb-10 last:pb-0"
              >
                {/* Numbered dot */}
                <span
                  ref={(el) => {
                    dotRefs.current[index] = el;
                  }}
                  aria-hidden="true"
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-white text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? "scale-110 border-red-600 bg-red-600 text-white shadow-md shadow-red-200"
                      : index < activeStep
                        ? "border-red-400 bg-red-50 text-red-600"
                        : "border-slate-200 text-slate-400"
                  }`}
                >
                  {index + 1}
                </span>

                {/* Content */}
                <div
                  className={`-mt-1 flex-1 rounded-2xl border p-4 transition-all duration-300 sm:p-5 ${
                    isActive
                      ? "border-red-100 bg-red-50/40 shadow-sm"
                      : "border-transparent"
                  }`}
                >
                  <h3
                    className={`text-base font-semibold transition-colors duration-300 sm:text-lg ${
                      isActive ? "text-red-600" : "text-slate-800"
                    }`}
                  >
                    Step {index + 1}: {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-7 text-slate-500 sm:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
