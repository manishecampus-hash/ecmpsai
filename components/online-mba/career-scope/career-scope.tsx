"use client";

import React from "react";
import { Info } from "lucide-react";

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

export interface JobRoleItem {
  id?: string;
  role: string;
  salary: string;
  /** Entry / Mid / Senior — optional, from the backend later */
  level?: string;
}

export interface RecruiterItem {
  id?: string;
  company: string;
  salary: string;
}

interface CareerScopeProps {
  data?: any;
  title?: string;
}

// Career levels for the job roles table. A role's own `level` (when the backend sends it) wins;
// otherwise roles are ranked by the top of their salary range and split into thirds.
const LEVELS = ["Entry", "Mid", "Senior"] as const;
// One brand-red scale that deepens with seniority
const LEVEL_STYLES: Record<string, string> = {
  Entry: "bg-white text-[#ee2c3c] ring-1 ring-red-200",
  Mid: "bg-red-100 text-[#c81e2f] ring-1 ring-red-200",
  Senior: "bg-[#ee2c3c] text-white shadow-[0_6px_14px_-6px_rgba(238,44,60,0.7)]",
};

function topSalary(salary: string) {
  const nums = String(salary).match(/\d+(?:\.\d+)?/g);
  return nums ? Number(nums[nums.length - 1]) : 0;
}

function groupByLevel<T extends { salary: string; level?: string }>(jobs: T[]) {
  const normalise = (l?: string) => LEVELS.find((L) => l && l.toLowerCase().startsWith(L.toLowerCase()));
  const groups: Record<string, T[]> = { Entry: [], Mid: [], Senior: [] };
  if (jobs.every((j) => normalise(j.level))) {
    jobs.forEach((j) => groups[normalise(j.level)!].push(j));
  } else {
    const ranked = [...jobs].sort((a, b) => topSalary(a.salary) - topSalary(b.salary));
    ranked.forEach((j, i) => groups[LEVELS[Math.min(2, Math.floor((i * 3) / ranked.length))]].push(j));
  }
  return LEVELS.map((level) => ({ level, items: groups[level] })).filter((g) => g.items.length > 0);
}

export default function CareerScope({ data, title }: CareerScopeProps) {
  // Use ONLY configured fields - NO hardcoded fallback dummy data
  const heading = (data?.heading || title || "").trim();
  const introText = (data?.introText || data?.description || "").trim();
  const disclaimer = (data?.disclaimer || "").trim();

  // Job Roles Table config
  const jobRolesTableTitle = (data?.jobRolesTableTitle || "Job Roles Overview").trim();
  const jobRolesCol1 = (data?.jobRolesCol1 || "Job Role").trim();
  const jobRolesCol2 = (data?.jobRolesCol2 || "Wages in INR (annually)").trim();
  const jobRolesList: JobRoleItem[] = Array.isArray(data?.jobRoles)
    ? data.jobRoles.filter((j: any) => j && (j.role || j.salary))
    : [];

  // Top Recruiters config
  const recruitersHeading = (data?.recruitersHeading || "Top Recruiters").trim();
  const recruitersIntro = (data?.recruitersIntro || "").trim();
  const recruitersTableTitle = (data?.recruitersTableTitle || "Top Hiring Companies").trim();
  const recruitersCol1 = (data?.recruitersCol1 || "Company").trim();
  const recruitersCol2 = (data?.recruitersCol2 || "Salary Packages (yearly, in INR)").trim();
  const recruitersList: RecruiterItem[] = Array.isArray(data?.recruiters)
    ? data.recruiters.filter((r: any) => r && (r.company || r.salary))
    : [];

  // Bottom Note
  const bottomNote = (data?.bottomNote || data?.calloutNote || "").trim();

  // If no data configured at all, render nothing (no fallback dummy content)
  if (
    !heading &&
    !introText &&
    !disclaimer &&
    jobRolesList.length === 0 &&
    recruitersList.length === 0 &&
    !recruitersIntro &&
    !bottomNote
  ) {
    return null;
  }

  const jobGroups = groupByLevel(jobRolesList);

  // Split intro text into paragraphs if multi-line
  const introParagraphs = introText
    ? introText.split(/\n\s*\n/).map((p: string) => p.trim()).filter(Boolean)
    : [];

  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
      {/* Header - render only if configured */}
      {heading && (
        <div className="mb-6">
          <h2 className="text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            <RenderHeading text={heading} colorClass="text-[#ee2c3c]" colorHex="#ee2c3c" />
          </h2>
        </div>
      )}

      {/* Intro / Description Paragraphs - render only if configured */}
      {introParagraphs.length > 0 && (
        <div className="max-w-4xl space-y-3">
          {introParagraphs.map((para: string, idx: number) => (
            <p key={idx} className="text-sm leading-relaxed text-slate-600 sm:text-base">
              {para}
            </p>
          ))}
        </div>
      )}

      {/* Disclaimer - render only if configured */}
      {disclaimer && (
        <p className="mt-2 max-w-4xl text-xs italic text-slate-400 sm:text-sm">
          {disclaimer}
        </p>
      )}

      {/* Job roles grouped by career level */}
      {jobGroups.length > 0 && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          {jobRolesTableTitle && (
            <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4 sm:px-6">
              <span className="h-5 w-1 rounded-full bg-[#ee2c3c]" />
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">{jobRolesTableTitle}</h3>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
              <thead>
                <tr className="border-b border-red-100 bg-red-50 text-slate-900">
                  <th scope="col" className="w-[180px] border-r border-red-100 px-5 py-3.5 font-bold">Career Level</th>
                  <th scope="col" className="border-r border-red-100 px-5 py-3.5 font-bold">{jobRolesCol1}</th>
                  <th scope="col" className="px-5 py-3.5 font-bold">{jobRolesCol2}</th>
                </tr>
              </thead>
              <tbody>
                {jobGroups.map((group) =>
                  group.items.map((job, i) => (
                    <tr
                      key={`${group.level}-${job.id || job.role || i}`}
                      className={`transition-colors hover:bg-red-50/30 ${i === group.items.length - 1 ? "border-b border-slate-200 last:border-b-0" : "border-b border-slate-100"}`}
                    >
                      {i === 0 && (
                        <th
                          scope="rowgroup"
                          rowSpan={group.items.length}
                          className="border-r border-slate-200 bg-slate-50/60 px-5 py-3.5 align-top font-normal"
                        >
                          <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${LEVEL_STYLES[group.level] || LEVEL_STYLES.Entry}`}>
                            {/* level meter: 1, 2 or 3 bars */}
                            <span className="flex h-3 items-end gap-[2px]" aria-hidden>
                              {[0, 1, 2].map((bar) => (
                                <span
                                  key={bar}
                                  style={{ height: `${50 + bar * 25}%` }}
                                  className={`w-[3px] rounded-full bg-current ${bar <= LEVELS.indexOf(group.level) ? "" : "opacity-25"}`}
                                />
                              ))}
                            </span>
                            {group.level}-Level
                          </span>
                          <p className="mt-1.5 text-xs text-slate-500">
                            {group.items.length} {group.items.length === 1 ? "role" : "roles"}
                          </p>
                        </th>
                      )}
                      <td className="border-r border-slate-200 px-5 py-3.5 font-medium text-slate-800">{job.role}</td>
                      <td className="px-5 py-3.5 font-bold tabular-nums text-[#ee2c3c]">{job.salary}</td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Top recruiters section - render only if intro or list configured */}
      {(recruitersList.length > 0 || recruitersIntro) && (
        <div className="mt-10">
          {recruitersHeading && (
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
              {recruitersHeading}
            </h3>
          )}

          {recruitersIntro && (
            <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-600 sm:text-base">
              {recruitersIntro}
            </p>
          )}

          {recruitersList.length > 0 && (
            <div className="mt-6 rounded-xl border border-slate-200 overflow-hidden">
              {recruitersTableTitle && (
                <div className="bg-red-500 px-6 py-4">
                  <h3 className="text-center text-sm font-bold text-white sm:text-base">
                    {recruitersTableTitle}
                  </h3>
                </div>
              )}

              <div className="hidden sm:grid sm:grid-cols-[2fr_1fr] bg-slate-50 border-b border-slate-200">
                <div className="px-6 py-3 border-r border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {recruitersCol1}
                  </span>
                </div>
                <div className="px-6 py-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {recruitersCol2}
                  </span>
                </div>
              </div>

              {recruitersList.map((rec: RecruiterItem, i: number) => (
                <div
                  key={rec.id || rec.company || i}
                  className={`grid grid-cols-1 sm:grid-cols-[2fr_1fr] ${
                    i !== recruitersList.length - 1 ? "border-b border-slate-200" : ""
                  } ${i % 2 === 1 ? "bg-red-50/30" : "bg-white"}`}
                >
                  <div className="px-6 py-3.5 sm:border-r border-slate-200">
                    <p className="text-sm font-semibold text-slate-900 sm:text-base">
                      {rec.company}
                    </p>
                  </div>
                  <div className="px-6 pb-3.5 sm:py-3.5">
                    <p className="text-sm font-medium text-red-500 sm:text-base">
                      {rec.salary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bottom Note - render only if configured */}
      {bottomNote && (
        <div className="mt-6 flex max-w-4xl items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-white mt-0.5">
            <Info className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base whitespace-pre-line">
            {bottomNote}
          </p>
        </div>
      )}
    </section>
  );
}