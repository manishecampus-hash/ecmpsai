import React from "react";
import {
  Bookmark,
  CheckSquare,
  Search,
  CalendarDays,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  Check,
  Crown,
  Minus,
} from "lucide-react";
import { ApplyNowButton } from "@/components/form/apply-now-modal";
import { LpHeading, LpReveal, LpSection } from "./lp-ui";

export interface ComparisonColumnItem {
  id: string;
  title: string;
}

export interface ComparisonRowItem {
  id: string;
  title: string;
  columnValues: Record<string, string>;
  icon?: string;
}

export interface LandingPageHighlightsData {
  sectionHeading?: string;
  columns?: ComparisonColumnItem[];
  rows?: ComparisonRowItem[];
}

interface LandingPageHighlightsProps {
  highlights?: LandingPageHighlightsData;
}

const ROW_ICONS = [Bookmark, CheckSquare, Search, CalendarDays, Users, Award, BookOpen];

export function LandingPageHighlights({ highlights }: LandingPageHighlightsProps) {
  if (!highlights || !highlights.rows || highlights.rows.length === 0) return null;

  const sectionHeading = highlights.sectionHeading || "Key Highlights";
  const columns = highlights.columns && highlights.columns.length > 0
    ? highlights.columns
    : [
        { id: "col-1", title: "Program A" },
        { id: "col-2", title: "Program B" },
      ];
  const rows = highlights.rows;

  // The first column (DBA) is the recommended one: raised card, red checks; the rest stay muted
  const [lead, ...others] = columns;
  const grid: React.CSSProperties = {
    gridTemplateColumns: `minmax(210px,1fr) minmax(0,1.25fr) ${others.map(() => "minmax(0,1fr)").join(" ")}`,
    gridTemplateRows: `auto repeat(${rows.length}, auto)`,
  };
  const at = (col: number, row: number): React.CSSProperties => ({ gridColumn: col, gridRow: row });

  return (
    <LpSection tone="muted">
      <LpHeading heading={sectionHeading} />

      {/* Desktop: comparison with the DBA column lifted out as a card */}
      <LpReveal className="hidden md:block">
        <div className="relative mb-5 mt-9 grid rounded-2xl border border-slate-200 bg-white" style={grid}>
          {/* highlighted DBA column */}
          <div
            aria-hidden
            style={{ gridColumn: 2, gridRow: "1 / -1" }}
            className="-my-5 rounded-3xl bg-gradient-to-b from-red-50 via-white to-white shadow-[0_28px_60px_-28px_rgba(220,38,38,0.55)] ring-2 ring-red-500"
          />

          {/* header */}
          <div style={at(1, 1)} className="flex items-end px-6 pb-5 pt-6 text-xs font-bold uppercase tracking-wider text-slate-500">
            Features &amp; Comparison
          </div>
          <div style={at(2, 1)} className="relative flex flex-col items-center px-6 pb-5 pt-1 text-center">
            <span className="-mt-4 inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
              <Crown className="h-3.5 w-3.5" /> Recommended
            </span>
            <span className="mt-3 text-3xl font-extrabold tracking-tight text-red-600">{lead.title}</span>
            <span className="mt-0.5 text-xs font-semibold text-slate-500">Best for working professionals</span>
          </div>
          {others.map((col, i) => (
            <div key={col.id} style={at(i + 3, 1)} className="flex flex-col items-center justify-end px-6 pb-5 pt-6 text-center">
              <span className="text-2xl font-extrabold tracking-tight text-slate-500">{col.title}</span>
              <span className="mt-0.5 text-xs font-semibold text-slate-400">Academic research track</span>
            </div>
          ))}

          {/* rows */}
          {rows.map((row, r) => {
            const Icon = ROW_ICONS[r % ROW_ICONS.length];
            const line = "border-t border-slate-100";
            return (
              <React.Fragment key={row.id || row.title}>
                <div style={at(1, r + 2)} className={`flex items-center gap-3 px-6 py-4 ${line}`}>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-red-50 text-red-600 ring-1 ring-red-100">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                  </span>
                  <span className="text-[15px] font-bold text-slate-900">{row.title}</span>
                </div>
                <div style={at(2, r + 2)} className="relative mx-4 flex items-start gap-3 border-t border-red-100 px-2 py-4">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-600 text-white">
                    <Check className="h-3 w-3" strokeWidth={3.5} />
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-slate-800">{row.columnValues?.[lead.id] || "—"}</p>
                </div>
                {others.map((col, i) => (
                  <div key={col.id} style={at(i + 3, r + 2)} className={`flex items-start gap-3 px-6 py-4 ${line}`}>
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                      <Minus className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <p className="text-sm leading-relaxed text-slate-500">{row.columnValues?.[col.id] || "—"}</p>
                  </div>
                ))}
              </React.Fragment>
            );
          })}
        </div>
      </LpReveal>

      {/* Mobile: one card per feature, DBA answer highlighted */}
      <div className="space-y-3 md:hidden">
        {rows.map((row, r) => {
          const Icon = ROW_ICONS[r % ROW_ICONS.length];
          return (
            <div key={row.id || row.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="flex items-center gap-3 px-4 pt-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-red-50 text-red-600 ring-1 ring-red-100">
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </span>
                <h3 className="text-[15px] font-bold text-slate-900">{row.title}</h3>
              </div>
              <div className="m-3 rounded-xl border border-red-200 bg-red-50/60 p-3">
                <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-red-600">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} /> {lead.title}
                  {r === 0 && <span className="ml-auto rounded-full bg-red-600 px-2 py-0.5 text-[9px] text-white">Recommended</span>}
                </p>
                <p className="text-sm font-medium leading-relaxed text-slate-800">{row.columnValues?.[lead.id] || "—"}</p>
              </div>
              {others.map((col) => (
                <div key={col.id} className="mx-3 mb-3 px-3">
                  <p className="mb-0.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">{col.title}</p>
                  <p className="text-sm leading-relaxed text-slate-500">{row.columnValues?.[col.id] || "—"}</p>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Lead prompt */}
      <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-4 md:mt-16">
        <p className="text-sm font-medium text-slate-600">Not sure which doctorate fits your goals?</p>
        <ApplyNowButton className="group inline-flex h-10 items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 text-sm font-bold text-red-700 transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white">
          Talk to a DBA Counsellor
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </ApplyNowButton>
      </div>
    </LpSection>
  );
}

export default LandingPageHighlights;
