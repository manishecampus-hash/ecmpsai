"use client";

import { useId, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MotionConfig, motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Briefcase,
  ChevronDown,
  FileText,
  GraduationCap,
  Landmark,
  Mic,
  Paperclip,
  Rocket,
  Send,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import RobotMascot from "@/app/dashboard/components/ai-assist/robot-mascot";
import { chatHref, useSignedIn } from "@/components/compare/compare-link";

// On wide screens the cards sit around the robot like the campaign artwork (positions on a 1200px-wide stage);
// below that they fall into a simple grid under the search bar.
const FEATURES: { icon: LucideIcon; title: string; place: string; tilt: string; float: number }[] = [
  {
    icon: BookOpen,
    title: "Course Guidance",
    place: "xl:left-[56px] xl:top-[50px]",
    tilt: "perspective(900px) rotateY(16deg) rotateZ(5deg)",
    float: 0,
  },
  {
    icon: FileText,
    title: "Admission Support",
    place: "xl:left-0 xl:top-[222px]",
    tilt: "perspective(900px) rotateY(16deg) rotateZ(2deg)",
    float: 0.8,
  },
  {
    icon: Landmark,
    title: "University Information",
    place: "xl:right-[56px] xl:top-[46px]",
    tilt: "perspective(900px) rotateY(-16deg) rotateZ(-6deg)",
    float: 0.4,
  },
  {
    icon: Briefcase,
    title: "Career Recommendations",
    place: "xl:right-0 xl:top-[226px]",
    tilt: "perspective(900px) rotateY(-16deg) rotateZ(-2deg)",
    float: 1.2,
  },
];

// Lines from each card into the search bar (same 1200 × 420 stage)
const CONNECTORS = [
  { d: "M324 104 C 368 120, 356 214, 292 248", dot: [324, 104] },
  { d: "M266 272 C 276 273, 284 277, 294 281", dot: [266, 272] },
  { d: "M876 100 C 832 118, 844 214, 908 248", dot: [876, 100] },
  { d: "M934 276 C 924 277, 916 280, 906 284", dot: [934, 276] },
];

const EASE = [0.22, 1, 0.36, 1] as const;

// Same focus treatment as the rest of the page (the global stylesheet removes focus rings and shadows on focus,
// so every glow here sits on a separate, non-focusable layer)
const FOCUS = "focus-visible:underline focus-visible:underline-offset-4";
const ROUND_TOOL =
  "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-white/[0.85] ring-1 ring-white/[0.15] transition hover:bg-white/[0.15] hover:text-white";

function FeatureCard({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <div className="relative h-full overflow-hidden rounded-[22px] border border-red-500/80 bg-gradient-to-br from-[#2b1117] via-[#160c11] to-[#0e0a0e] p-5 shadow-[0_0_26px_rgba(239,68,68,0.45),inset_0_0_26px_rgba(239,68,68,0.14),inset_0_1px_0_rgba(255,255,255,0.18)]">
      {/* Glass shine across the top-left */}
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.14] via-transparent to-transparent" />
      <div className="relative flex items-center gap-4">
        <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-red-500/[0.45] to-red-950/60 text-red-100 ring-1 ring-red-400/60 shadow-[0_0_18px_rgba(239,68,68,0.55)]">
          <Icon className="h-6 w-6" aria-hidden />
        </span>
        <h3 className="text-base font-bold leading-tight text-white">{title}</h3>
      </div>
    </div>
  );
}

// Search bar wrapped in a crackling red border: noise layers slide past each other and displace the outline
function ElectricFrame({ children }: { children: ReactNode }) {
  const raw = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "120px" });
  const reduceMotion = useReducedMotion();
  // The noise only moves while the bar is on screen (and never for reduced motion)
  const live = inView && !reduceMotion;

  const filter = (name: string, seed: number, scale: number) => (
    <filter id={`${raw}-${name}`} x="-10%" y="-40%" width="120%" height="180%" colorInterpolationFilters="sRGB">
      <feTurbulence type="turbulence" baseFrequency="0.022" numOctaves="3" seed={seed} result="n1" />
      <feOffset in="n1" result="o1">
        {live && <animate attributeName="dy" values="500;0" dur="5s" repeatCount="indefinite" />}
      </feOffset>
      <feTurbulence type="turbulence" baseFrequency="0.022" numOctaves="3" seed={seed} result="n2" />
      <feOffset in="n2" result="o2">
        {live && <animate attributeName="dy" values="0;-500" dur="5s" repeatCount="indefinite" />}
      </feOffset>
      <feTurbulence type="turbulence" baseFrequency="0.022" numOctaves="3" seed={seed + 1} result="n3" />
      <feOffset in="n3" result="o3">
        {live && <animate attributeName="dx" values="700;0" dur="5s" repeatCount="indefinite" />}
      </feOffset>
      <feTurbulence type="turbulence" baseFrequency="0.022" numOctaves="3" seed={seed + 1} result="n4" />
      <feOffset in="n4" result="o4">
        {live && <animate attributeName="dx" values="0;-700" dur="5s" repeatCount="indefinite" />}
      </feOffset>
      <feComposite in="o1" in2="o2" result="p1" />
      <feComposite in="o3" in2="o4" result="p2" />
      <feBlend in="p1" in2="p2" mode="color-dodge" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale={scale} xChannelSelector="R" yChannelSelector="B" />
    </filter>
  );

  const zap = (name: string): CSSProperties => ({ filter: `url(#${raw}-${name})` });

  return (
    <div ref={ref} className="relative">
      <svg aria-hidden className="absolute h-0 w-0">
        <defs>
          {filter("a", 1, 18)}
        </defs>
      </svg>

      {/* Red haze behind the bar */}
      <span aria-hidden className="pointer-events-none absolute -inset-4 rounded-[40px] bg-red-600/25 blur-2xl" />
      {/* Crackling outline, with a soft glow under it */}
      <span aria-hidden className="pointer-events-none absolute -inset-[7px] rounded-[32px] border-2 border-[#ff9a9a]" style={zap("a")} />
      <span aria-hidden className="pointer-events-none absolute -inset-[7px] rounded-[32px] border-[3px] border-red-500 opacity-70 blur-[6px]" />
      {/* Crisp neon rim */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[26px] border border-red-300/90 shadow-[0_0_14px_rgba(239,68,68,0.95),0_0_40px_rgba(239,68,68,0.45),inset_0_0_18px_rgba(239,68,68,0.35)]"
      />
      <div className="relative rounded-[26px] bg-gradient-to-b from-[#1a0f15] to-[#100a0e]">{children}</div>
    </div>
  );
}

// Glowing turntable under the bar
function Podium() {
  return (
    <div aria-hidden className="relative mx-auto h-[96px] w-[86%] max-w-[520px]">
      <span className="absolute inset-x-0 bottom-0 h-[64px] rounded-[50%] bg-gradient-to-b from-[#241820] to-[#07050a] shadow-[0_24px_40px_rgba(0,0,0,0.7)] ring-1 ring-white/10" />
      <span className="absolute inset-x-[5%] bottom-[16px] h-[46px] rounded-[50%] bg-[#140d12] ring-1 ring-red-500/40" />
      <motion.span
        className="absolute inset-x-[17%] bottom-[24px] h-[30px] rounded-[50%] border-2 border-red-500 shadow-[0_0_22px_rgba(239,68,68,0.9),inset_0_0_16px_rgba(239,68,68,0.6)]"
        animate={{ opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="absolute inset-x-[30%] bottom-[30px] h-[16px] rounded-[50%] bg-red-500/50 blur-md" />
    </div>
  );
}

export default function AiAgentSection() {
  const router = useRouter();
  const signedIn = useSignedIn();
  const [question, setQuestion] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const agentHref = chatHref("", signedIn);

  // Signed-in students land in My Chat with the question already sent; others log in first and come back to it
  const ask = (e: FormEvent) => {
    e.preventDefault();
    router.push(chatHref(question, signedIn));
  };

  return (
    <MotionConfig reducedMotion="user">
      <section aria-labelledby="ai-agent" className="relative isolate overflow-hidden bg-[#08070b] pb-8 pt-8 text-white sm:pt-10 lg:pb-10 lg:pt-12">
        {/* Backdrop: red glows, glowing swooshes and dotted waves */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <span className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-red-600/25 blur-[120px]" />
          <span className="absolute left-1/2 top-[45%] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-red-700/[0.15] blur-[120px]" />
          <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="agent-swoosh" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
                <stop offset="45%" stopColor="#ff4d4d" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g fill="none" stroke="url(#agent-swoosh)" strokeLinecap="round">
              <path d="M-60 250 C 120 170, 260 90, 560 -30" strokeWidth="10" opacity="0.35" className="blur-[6px]" />
              <path d="M-60 250 C 120 170, 260 90, 560 -30" strokeWidth="2.5" />
              <path d="M-60 190 C 90 130, 200 60, 420 -30" strokeWidth="1.5" opacity="0.6" />
              <path d="M-40 800 C 180 700, 360 760, 600 940" strokeWidth="8" opacity="0.3" className="blur-[6px]" />
              <path d="M-40 800 C 180 700, 360 760, 600 940" strokeWidth="2" />
              <path d="M860 940 C 1080 780, 1280 740, 1500 790" strokeWidth="8" opacity="0.3" className="blur-[6px]" />
              <path d="M860 940 C 1080 780, 1280 740, 1500 790" strokeWidth="2" />
            </g>
          </svg>
          <span className="absolute bottom-0 left-0 h-[260px] w-[45%] [background-image:radial-gradient(rgba(248,113,113,0.55)_1px,transparent_1.4px)] [background-size:9px_9px] [mask-image:radial-gradient(ellipse_at_bottom_left,black,transparent_70%)]" />
          <span className="absolute bottom-0 right-0 h-[260px] w-[45%] [background-image:radial-gradient(rgba(196,181,253,0.4)_1px,transparent_1.4px)] [background-size:9px_9px] [mask-image:radial-gradient(ellipse_at_bottom_right,black,transparent_70%)]" />
        </div>

        <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/90 bg-red-500/10 px-6 py-2 text-[15px] font-semibold text-white shadow-[0_0_22px_rgba(239,68,68,0.35),inset_0_0_14px_rgba(239,68,68,0.25)]">
              <Sparkles className="h-4 w-4 text-red-200" aria-hidden />
              Introducing
            </span>
            <h2
              id="ai-agent"
              className="relative mx-auto mt-5 w-fit text-[36px] font-extrabold leading-[1.1] tracking-tight text-white sm:text-[52px] lg:text-[64px]"
            >
              Our eCampus{" "}
              <span className="relative inline-block pr-1 italic text-red-500 [text-shadow:0_0_28px_rgba(239,68,68,0.45)]">
                AI Agent
                {/* Brush underline */}
                <svg aria-hidden viewBox="0 0 300 24" preserveAspectRatio="none" className="absolute -bottom-2 left-[8%] h-3 w-[92%] sm:-bottom-3 sm:h-4">
                  <path d="M4 18 C 80 4, 200 2, 296 10" fill="none" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
              {/* Spark marks */}
              <svg aria-hidden viewBox="0 0 40 40" className="absolute -right-10 -top-3 hidden h-10 w-10 sm:block">
                <path d="M10 22 L18 6 M22 28 L36 20" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              Your intelligent education companion — built to simplify your learning, admission and career journey.
            </p>
          </motion.div>

          {/* Stage: robot, search bar and podium, with the feature cards around them on wide screens */}
          <div className="relative mx-auto mt-8 xl:mt-6 xl:h-[420px] xl:w-[1200px]">
            <svg aria-hidden viewBox="0 0 1200 420" className="pointer-events-none absolute inset-0 hidden h-full w-full xl:block">
              <g fill="none" stroke="#ef4444" strokeLinecap="round">
                {CONNECTORS.map((c) => (
                  <g key={c.d}>
                    <path d={c.d} strokeWidth="6" opacity="0.25" className="blur-[3px]" />
                    <path d={c.d} strokeWidth="1.6" />
                  </g>
                ))}
              </g>
              {CONNECTORS.map((c) => (
                <g key={`dot-${c.d}`}>
                  <circle cx={c.dot[0]} cy={c.dot[1]} r="9" fill="#ef4444" opacity="0.25" />
                  <circle cx={c.dot[0]} cy={c.dot[1]} r="4" fill="#ff6b6b" />
                </g>
              ))}
            </svg>

            <div className="relative mx-auto max-w-[620px] xl:absolute xl:left-[290px] xl:top-0 xl:w-[620px]">
              {/* Robot with its glowing half-disc and two floating glass tiles */}
              <div className="relative h-[200px] sm:h-[215px]">
                <div aria-hidden className="absolute left-1/2 top-[10px] h-[205px] w-[360px] -translate-x-1/2 overflow-hidden sm:w-[480px]">
                  <span className="absolute left-1/2 top-[24px] h-[300px] w-[300px] -translate-x-1/2 rounded-full border-2 border-red-500/90 bg-[radial-gradient(circle_at_50%_55%,rgba(239,68,68,0.6),rgba(153,27,27,0.35)_45%,rgba(69,10,10,0.2)_70%)] shadow-[0_0_30px_rgba(239,68,68,0.6),inset_0_0_40px_rgba(239,68,68,0.35)] sm:h-[400px] sm:w-[400px]" />
                </div>
                <motion.span
                  aria-hidden
                  className="absolute left-[4%] top-[30px] hidden h-[88px] w-[88px] items-center justify-center rounded-[20px] border border-white/20 bg-gradient-to-br from-white/[0.14] to-white/[0.03] text-white/80 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-sm sm:flex"
                  style={{ transform: "perspective(500px) rotateY(24deg) rotateZ(-10deg)" }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <BarChart3 className="h-9 w-9" />
                </motion.span>
                <motion.span
                  aria-hidden
                  className="absolute right-[4%] top-[20px] hidden h-[88px] w-[88px] items-center justify-center rounded-[20px] border border-white/20 bg-gradient-to-br from-white/[0.14] to-white/[0.03] text-white/80 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-sm sm:flex"
                  style={{ transform: "perspective(500px) rotateY(-24deg) rotateZ(10deg)" }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                >
                  <GraduationCap className="h-9 w-9" />
                </motion.span>
                <div className="absolute left-1/2 top-[-30px] -translate-x-1/2">
                  <RobotMascot graduate className="h-[290px] w-[240px] sm:h-[318px] sm:w-[262px]" />
                </div>
              </div>

              {/* Ask box: opens the AI Agent in the dashboard */}
              <div className="relative z-10">
                <ElectricFrame>
                  <form onSubmit={ask}>
                    <label htmlFor="ai-agent-question" className="sr-only">
                      Ask the eCampus AI Agent
                    </label>
                    <div className="flex items-center gap-3 px-5 pt-5 sm:px-6">
                      <Sparkles className="h-5 w-5 flex-shrink-0 text-red-400" aria-hidden />
                      <input
                        ref={inputRef}
                        id="ai-agent-question"
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Ask anything about courses, universities, admissions, or careers..."
                        autoComplete="off"
                        className="min-w-0 flex-1 rounded-none border-0 bg-transparent p-0 text-[15px] text-white caret-red-500 outline-none placeholder:text-white/80 focus:bg-transparent sm:text-base"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-2 px-4 pb-4 pt-4 sm:px-5">
                      <div className="flex items-center gap-2">
                        <Link href={agentHref} aria-label="Attach a document in the AI Agent" className={ROUND_TOOL}>
                          <Paperclip className="h-[18px] w-[18px]" aria-hidden />
                        </Link>
                        <button
                          type="button"
                          onClick={() => inputRef.current?.focus()}
                          className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full bg-white/[0.07] px-3.5 text-sm font-semibold sm:px-4 text-white ring-1 ring-white/[0.15] transition hover:bg-white/[0.15]"
                        >
                          <Sparkles className="h-4 w-4 text-red-400" aria-hidden />
                          Smart Mode
                          <ChevronDown className="h-4 w-4 text-white/70" aria-hidden />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link href={agentHref} aria-label="Ask by voice in the AI Agent" className={ROUND_TOOL}>
                          <Mic className="h-[18px] w-[18px]" aria-hidden />
                        </Link>
                        <span className="relative">
                          <span aria-hidden className="pointer-events-none absolute -inset-1.5 rounded-full bg-red-600/60 blur-md" />
                          <button
                            type="submit"
                            aria-label="Ask the AI Agent"
                            className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-b from-red-500 to-red-600 text-white ring-1 ring-red-300/60 transition hover:from-red-400 hover:to-red-600 active:scale-95"
                          >
                            <Send className="h-[18px] w-[18px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                          </button>
                        </span>
                      </div>
                    </div>
                  </form>
                </ElectricFrame>
              </div>

              <div className="-mt-6">
                <Podium />
              </div>
            </div>

            {/* Feature cards */}
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:mt-0 xl:block">
              {FEATURES.map(({ place, tilt, float, ...card }, i) => (
                <motion.li
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.1 }}
                  className={`xl:absolute xl:w-[262px] ${place}`}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: float }}
                    className="h-full"
                  >
                    <div className="h-full xl:[transform:var(--tilt)]" style={{ "--tilt": tilt } as CSSProperties}>
                      <FeatureCard {...card} />
                    </div>
                  </motion.div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Call to action at the foot of the section, between the two lower swooshes: dark glass pill with a red light running round its edge */}
          <div className="relative mx-auto mt-10 w-fit xl:mt-6">
            <span aria-hidden className="pointer-events-none absolute -inset-3 rounded-full bg-red-600/30 blur-2xl" />
            <Link
              href={agentHref}
              className={`group relative block overflow-hidden rounded-full p-[1.5px] transition-transform duration-300 hover:-translate-y-0.5 ${FOCUS}`}
            >
              <span
                aria-hidden
                className="absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,#ef4444_70deg,#fca5a5_100deg,transparent_160deg,transparent_200deg,#ef4444_250deg,#fca5a5_280deg,transparent_340deg)] motion-safe:animate-[spin_4s_linear_infinite]"
              />
              <span className="relative flex items-center gap-3 rounded-full bg-gradient-to-b from-[#1f1217] to-[#0d080b] py-2 pl-2 pr-3 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-colors duration-300 group-hover:from-[#2a1219] sm:gap-4">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-0 group-hover:translate-x-[400%] group-hover:duration-1000 motion-reduce:hidden"
                />
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-b from-red-500 to-red-700 shadow-[0_0_18px_rgba(239,68,68,0.6)] sm:h-12 sm:w-12">
                  <Rocket className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </span>
                <span className="text-base font-bold tracking-wide sm:text-lg">Try Our AI Agent</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 transition-colors duration-300 group-hover:bg-red-600 group-hover:ring-red-400">
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
