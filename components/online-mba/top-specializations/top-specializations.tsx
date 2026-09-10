"use client";

import React from "react";
import {
  Landmark,
  Megaphone,
  Users,
  Settings,
  Truck,
  BarChart3,
  Monitor,
  Globe,
  Package,
  Briefcase,
  TrendingUp,
  HeartPulse,
  Database,
  ShoppingBag,
  Building2,
  Wallet,
  ArrowUpRight,
  type LucideIcon,
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

interface SpecializationItem {
  title: string;
  href?: string;
  icon?: any;
}

const ICON_LIST = [
  Landmark,
  Megaphone,
  Users,
  Settings,
  Truck,
  BarChart3,
  Monitor,
  Globe,
  Package,
  Briefcase,
  TrendingUp,
  HeartPulse,
  Database,
  ShoppingBag,
  Building2,
  Wallet,
];

function parseSpecializations(input: any): SpecializationItem[] {
  if (!input) return [];

  const items: SpecializationItem[] = [];

  if (Array.isArray(input)) {
    input.forEach((item: any, idx: number) => {
      if (!item) return;
      if (typeof item === "string") {
        const trimmed = item.trim();
        if (trimmed) {
          items.push({
            title: trimmed,
            href: "#",
            icon: ICON_LIST[idx % ICON_LIST.length],
          });
        }
      } else if (typeof item === "object") {
        const title = (item.title || item.name || "").trim();
        if (title) {
          items.push({
            title,
            href: item.href || "#",
            icon: item.icon || ICON_LIST[idx % ICON_LIST.length],
          });
        }
      }
    });
    return items;
  }

  if (typeof input === "string") {
    input.split(/[\n,]+/).forEach((s: string, idx: number) => {
      const trimmed = s.trim();
      if (trimmed) {
        items.push({
          title: trimmed,
          href: "#",
          icon: ICON_LIST[idx % ICON_LIST.length],
        });
      }
    });
    return items;
  }

  return [];
}

interface TopSpecializationsProps {
  data?: any;
  title?: string;
}

export default function TopSpecializations({ data, title }: TopSpecializationsProps) {
  // Use ONLY configured heading, NO fallback string
  const heading = (data?.heading || title || "").trim();
  const list = parseSpecializations(data?.specializationsList || data?.list);

  // If no data configured at all, render nothing (no fallback, placeholder, dummy content)
  if (!heading && list.length === 0) {
    return null;
  }

  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
      {/* Header - render only if configured */}
      {heading ? (
        <div className="mb-8">
          <h2 className="text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            <RenderHeading text={heading} colorClass="text-[#ee2c3c]" colorHex="#ee2c3c" />
          </h2>
        </div>
      ) : null}

      {/* Specializations list panel - render only if configured */}
      {list.length > 0 ? (
        <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
          <div className="grid sm:grid-cols-2">
            {list.map((spec: SpecializationItem, i: number) => {
              const Icon = spec.icon || ICON_LIST[i % ICON_LIST.length];
              const isLastRow = i >= list.length - 2;

              return (
                <div
                  key={spec.title || i}
                  className={`group flex items-center gap-4 px-6 py-5 transition-colors hover:bg-red-50/50 border-b border-slate-200 ${
                    i % 2 === 0 ? "sm:border-r" : ""
                  } ${isLastRow ? "sm:border-b-0" : ""}`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 transition-colors group-hover:bg-red-500 group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>

                  <span className="flex-1 text-sm font-semibold text-slate-800 underline decoration-slate-300 underline-offset-2 group-hover:text-red-500 group-hover:decoration-red-300 sm:text-base">
                    {spec.title}
                  </span>

                  <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-red-500" />
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}