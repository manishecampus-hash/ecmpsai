"use client";

import React, { useState } from "react";
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
  ArrowRight,
  Headset,
  ListChecks,
} from "lucide-react";
import ApplyNowModal from "@/components/form/apply-now-modal";

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
  const [showForm, setShowForm] = useState(false);
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
      {heading ? (
        <h2 className="text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
          <RenderHeading text={heading} colorClass="text-[#ee2c3c]" colorHex="#ee2c3c" />
        </h2>
      ) : null}

      {introText ? <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-600 sm:text-base">{introText}</p> : null}

      <div className={`mt-7 grid gap-6 ${steps.length > 0 ? "lg:grid-cols-[minmax(0,1fr)_320px]" : ""}`}>
        {/* Steps as a vertical timeline */}
        {steps.length > 0 ? (
          <ol className="relative">
            {steps.map((step, i) => {
              const last = i === steps.length - 1;
              return (
                <li key={step.id || i} className="relative flex gap-4 pb-5 last:pb-0 sm:gap-5">
                  {!last && <span aria-hidden className="absolute bottom-0 left-5 top-11 w-0.5 bg-gradient-to-b from-red-300 to-red-100" />}
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ee2c3c] text-sm font-bold tabular-nums text-white shadow-[0_6px_14px_-6px_rgba(238,44,60,0.7)] ring-4 ring-white">
                    {i + 1}
                  </span>
                  <div className="group flex-1 rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:border-red-200 hover:shadow-[0_16px_36px_-24px_rgba(238,44,60,0.5)] sm:p-5">
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#ee2c3c] ring-1 ring-red-100 transition-colors group-hover:bg-[#ee2c3c] group-hover:text-white">
                        <SafeIcon iconName={step.icon} index={i} className="h-5 w-5" strokeWidth={2} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-[#ee2c3c]">Step {i + 1}</p>
                        {step.title ? <h3 className="mt-0.5 text-base font-bold leading-snug text-slate-900 sm:text-[17px]">{step.title}</h3> : null}
                        {step.description ? <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{step.description}</p> : null}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        ) : null}

        {/* Side panel */}
        <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
          {steps.length > 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-[#ee2c3c] ring-1 ring-red-100">
                  <ListChecks className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-2xl font-extrabold leading-none text-slate-900">{steps.length} steps</p>
                  <p className="mt-1 text-xs font-medium text-slate-500">to complete your admission</p>
                </div>
              </div>
              <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                {steps.map((step, i) => (
                  <li key={step.id || i} className="flex items-center gap-2.5 text-[13px] text-slate-600">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50 text-[10px] font-bold text-[#ee2c3c]">{i + 1}</span>
                    <span className="truncate">{step.title || step.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {roiText ? (
            <a
              href={roiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50/60 p-4 transition-colors hover:border-red-200 hover:bg-red-50"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ee2c3c] text-white">
                <Calculator className="h-5 w-5" strokeWidth={2} />
              </span>
              <p className="flex-1 text-sm leading-relaxed text-slate-700">{roiText}</p>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-[#ee2c3c] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ) : null}

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Headset className="h-4 w-4 text-[#ee2c3c]" /> Need help with admission?
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
              Our counsellors can guide you through documents, fees and deadlines.
            </p>
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="group mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 text-sm font-bold text-[#ee2c3c] transition-all duration-300 hover:border-[#ee2c3c] hover:bg-[#ee2c3c] hover:text-white"
            >
              Talk to a Counsellor
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </aside>
      </div>

      <ApplyNowModal isOpen={showForm} onClose={() => setShowForm(false)} />
    </section>
  );
}
