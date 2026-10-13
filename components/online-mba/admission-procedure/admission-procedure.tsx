"use client";

import React from "react";
import {
  Globe,
  LogIn,
  ClipboardCheck,
  UserPlus,
  Wallet,
  Calculator,
  ArrowUpRight,
  CreditCard,
  FileText,
  CheckCircle,
  GraduationCap,
  Mail,
  Phone,
  Search,
  Award,
  BookOpen,
  HelpCircle,
} from "lucide-react";

export function RenderHeading({
  text,
  colorClass = "text-[#ee2c3c]",
  colorHex = "#ee2c3c",
}: {
  text?: string | null;
  colorClass?: string;
  colorHex?: string;
}) {
  if (!text || typeof text !== "string") return null;

  const regex = /(\*{1,2}[^*]+\*{1,2})/g;
  const parts = text.split(regex);

  if (parts.length === 1 && !text.includes("*")) {
    return <>{text}</>;
  }

  return (
    <>
      {parts.map((part, index) => {
        const isAsteriskWrapped =
          (part.startsWith("**") && part.endsWith("**") && part.length > 4) ||
          (part.startsWith("*") && part.endsWith("*") && part.length > 2);

        if (isAsteriskWrapped) {
          const content = part.replace(/^\*+|\*+$/g, "");
          return (
            <span
              key={index}
              className={colorClass}
              style={{ color: colorHex }}
            >
              {content}
            </span>
          );
        }

        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
}

const ICON_MAP: Record<string, any> = {
  globe: Globe,
  login: LogIn,
  signin: LogIn,
  clipboard: ClipboardCheck,
  clipboardcheck: ClipboardCheck,
  userplus: UserPlus,
  signup: UserPlus,
  register: UserPlus,
  wallet: Wallet,
  creditcard: CreditCard,
  filetext: FileText,
  document: FileText,
  checkcircle: CheckCircle,
  check: CheckCircle,
  graduationcap: GraduationCap,
  degree: GraduationCap,
  mail: Mail,
  phone: Phone,
  search: Search,
  award: Award,
  bookopen: BookOpen,
  helpcircle: HelpCircle,
};

const FALLBACK_ICON_LIST = [Globe, LogIn, ClipboardCheck, UserPlus, Wallet, CreditCard, CheckCircle];

function SafeIcon({
  iconName,
  index = 0,
  className = "h-5 w-5",
  strokeWidth = 2,
}: {
  iconName?: string;
  index?: number;
  className?: string;
  strokeWidth?: number;
}) {
  try {
    if (typeof iconName === "string" && iconName.trim()) {
      const cleanKey = iconName.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
      const MatchedIcon = ICON_MAP[cleanKey];
      if (MatchedIcon) {
        return <MatchedIcon className={className} strokeWidth={strokeWidth} />;
      }
    }
    const FallbackIcon = FALLBACK_ICON_LIST[index % FALLBACK_ICON_LIST.length] || Globe;
    return <FallbackIcon className={className} strokeWidth={strokeWidth} />;
  } catch {
    return <Globe className={className} strokeWidth={strokeWidth} />;
  }
}

export interface ProcedureStep {
  id?: string;
  icon?: string;
  title: string;
  description: string;
}

function getNormalizedSteps(data: any): ProcedureStep[] {
  if (!data) return [];
  const rawList = Array.isArray(data.steps)
    ? data.steps
    : Array.isArray(data.list)
    ? data.list
    : [];

  const steps: ProcedureStep[] = [];
  rawList.forEach((item: any, idx: number) => {
    if (!item) return;
    if (typeof item === "string") {
      const trimmed = item.trim();
      if (trimmed) {
        steps.push({
          id: `step_${idx}`,
          icon: "Globe",
          title: trimmed,
          description: "",
        });
      }
    } else if (typeof item === "object") {
      const title = (item.title || "").trim();
      const description = (item.description || item.desc || "").trim();
      const icon = typeof item.icon === "string" ? item.icon.trim() : "";
      if (title || description) {
        steps.push({
          id: item.id || `step_${idx}`,
          icon,
          title,
          description,
        });
      }
    }
  });

  return steps;
}

interface MbaAdmissionProcedureProps {
  data?: any;
  title?: string;
}

export default function MbaAdmissionProcedure({ data, title }: MbaAdmissionProcedureProps) {
  // Use ONLY configured heading, NO fallback string
  const heading = (data?.heading || title || "").trim();
  const introText = (data?.introText || data?.description || "").trim();
  const roiText = (data?.roiText || "").trim();
  const roiUrl = (data?.roiUrl || "https://collegevidya.com/tool/online-university-roi-calculator/").trim();
  const steps = getNormalizedSteps(data);

  // If no data configured at all, render nothing (no fallback, placeholder, dummy content)
  if (!heading && !introText && !roiText && steps.length === 0) {
    return null;
  }

  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
      {/* Header - render only if configured */}
      {heading ? (
        <div className="mb-6">
          <h2 className="text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            <RenderHeading text={heading} colorClass="text-[#ee2c3c]" colorHex="#ee2c3c" />
          </h2>
        </div>
      ) : null}

      {/* ROI calculator callout - render only if roiText is configured */}
      {roiText ? (
        <a
          href={roiUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mb-6 flex items-center gap-3 rounded-2xl border border-red-100 bg-white px-5 py-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ee2c3c] text-white shadow-sm shadow-red-500/30">
            <Calculator className="h-5 w-5" strokeWidth={2} />
          </span>
          <p className="flex-1 text-sm leading-relaxed text-slate-700 sm:text-base">{roiText}</p>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-[#ee2c3c] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      ) : null}

      {/* Intro text - render only if configured */}
      {introText ? (
        <p className="mt-2 mb-6 max-w-4xl text-sm leading-relaxed text-slate-600 sm:text-base">
          {introText}
        </p>
      ) : null}

      {/* Steps panel - render only if steps are configured */}
      {steps.length > 0 ? (
        <div
          className="relative mt-6 overflow-hidden rounded-3xl border border-red-100 bg-red-50/50 p-4 sm:p-6"
          style={{
            backgroundImage: "radial-gradient(rgba(238,44,60,0.12) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        >
          <ol className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, i) => {
              const stepNumber = String(i + 1).padStart(2, "0");

              return (
                <li
                  key={step.id || i}
                  className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_18px_40px_-20px_rgba(238,44,60,0.4)] sm:p-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    {/* Step number box */}
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ee2c3c] text-lg font-extrabold tabular-nums text-white shadow-md shadow-red-500/30 transition-transform duration-300 group-hover:scale-105">
                      {stepNumber}
                    </span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#ee2c3c] ring-1 ring-red-100">
                      <SafeIcon iconName={step.icon} index={i} className="h-5 w-5" strokeWidth={2} />
                    </span>
                  </div>

                  <span className="mt-4 text-[11px] font-bold uppercase tracking-widest text-[#ee2c3c]">
                    STEP {stepNumber}
                  </span>

                  {step.title ? (
                    <h3 className="mt-1 text-base font-bold leading-snug text-slate-900 sm:text-lg">
                      {step.title}
                    </h3>
                  ) : null}
                  {step.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {step.description}
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
      ) : null}
    </section>
  );
}