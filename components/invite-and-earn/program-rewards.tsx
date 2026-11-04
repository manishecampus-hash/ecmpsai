"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, GraduationCap } from "lucide-react";
import { REFERRAL_UNIVERSITIES, formatINR } from "@/data/referral-programs";

const LEVELS = ["All", "UG", "PG"] as const;
type Level = (typeof LEVELS)[number];

export const REFER_HREF = "/login?returnUrl=/dashboard/invite-earn";

const FOCUS = "focus-visible:underline focus-visible:underline-offset-4";

// Soft red tint in the corner of the light header band
function HeaderGloss() {
  return <span aria-hidden className="pointer-events-none absolute -right-10 -top-16 h-36 w-56 rounded-full bg-red-100/70 blur-3xl" />;
}

export default function ProgramRewards() {
  const [uniId, setUniId] = useState(REFERRAL_UNIVERSITIES[0].id);
  const [level, setLevel] = useState<Level>("All");
  const uni =
    REFERRAL_UNIVERSITIES.find((u) => u.id === uniId) ??
    REFERRAL_UNIVERSITIES[0];
  const programs = uni.programs.filter(
    (p) => level === "All" || p.level === level,
  );
  const best = Math.max(...uni.programs.map((p) => p.reward));

  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_24px_60px_-35px_rgba(17,24,39,0.45)] lg:grid lg:grid-cols-[300px_minmax(0,1fr)] lg:grid-rows-[auto_1fr]">
      {/* University list header (vertically centred against the taller program header beside it) */}
      <div className="relative flex items-center overflow-hidden border-b border-red-100 bg-gradient-to-b from-[#fff5f5] to-white px-5 py-4 lg:col-start-1 lg:row-start-1 lg:border-r lg:border-r-gray-200">
        <HeaderGloss />
        <p className="relative text-lg font-bold text-gray-900">Choose a university</p>
      </div>

      {/* 1. Choose a university */}
      <div className="border-b border-gray-200 bg-gray-50/70 lg:col-start-1 lg:row-start-2 lg:border-b-0 lg:border-r">
        <div
          role="tablist"
          aria-label="Universities"
          className="flex gap-2 overflow-x-auto p-3 [scrollbar-width:none] lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-3 lg:pb-3 lg:pt-2 [&::-webkit-scrollbar]:hidden"
        >
          {REFERRAL_UNIVERSITIES.map((u) => {
            const on = u.id === uniId;
            return (
              <button
                key={u.id}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="referral-programs"
                onClick={() => setUniId(u.id)}
                className={`relative flex flex-shrink-0 items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors lg:h-14 lg:w-full lg:py-0 ${
                  on
                    ? "border-red-200 bg-white shadow-[0_6px_16px_-10px_rgba(190,18,60,0.45)]"
                    : "border-transparent hover:bg-white"
                }`}
              >
                {on && (
                  <span
                    aria-hidden
                    className="absolute inset-y-2.5 left-0 hidden w-[3px] rounded-r-full bg-red-600 lg:block"
                  />
                )}
                <span className="flex h-10 w-[76px] flex-shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-white px-1.5">
                  <Image
                    src={u.logo}
                    alt=""
                    width={64}
                    height={28}
                    className="h-7 w-auto max-w-full object-contain"
                  />
                </span>
                <span
                  className={`whitespace-nowrap text-sm lg:line-clamp-2 lg:whitespace-normal lg:leading-tight ${on ? "font-semibold text-gray-900" : "text-gray-600"}`}
                >
                  {u.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Program header */}
      <div className="relative flex flex-wrap items-center justify-between gap-4 overflow-hidden border-b border-red-100 bg-gradient-to-b from-[#fff5f5] to-white px-5 py-4 sm:px-6 lg:col-start-2 lg:row-start-1">
        <HeaderGloss />
        <div className="relative min-w-0">
          <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-lg font-bold text-gray-900">
            Pick a program
            {/* Selected university: logo, name and its top reward; slides in when the choice changes */}
            <span
              key={uni.id}
              className="inline-flex max-w-full items-center gap-2 rounded-full border border-red-100 bg-white py-1 pl-1 pr-3 text-xs font-normal shadow-[0_4px_14px_-6px_rgba(190,18,60,0.35)] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-left-2 motion-safe:duration-300"
            >
              <span className="flex h-7 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-50 px-1.5 ring-1 ring-gray-100">
                <Image src={uni.logo} alt="" width={40} height={18} className="h-[18px] w-auto max-w-full object-contain" />
              </span>
              <span className="truncate font-semibold text-gray-800">{uni.name}</span>
              <span aria-hidden className="h-4 w-px flex-shrink-0 bg-gray-200" />
              <span className="flex-shrink-0 whitespace-nowrap text-gray-500">
                <span className="sm:hidden">Up to </span>
                <span className="hidden sm:inline">Earn up to </span>
                <span className="text-[13px] font-extrabold text-red-600">{formatINR(best)}</span>
              </span>
            </span>
          </p>
        </div>
        <div
          role="radiogroup"
          aria-label="Program level"
          className="relative flex rounded-lg bg-white p-1 shadow-sm ring-1 ring-gray-200"
        >
          {LEVELS.map((l) => (
            <button
              key={l}
              type="button"
              role="radio"
              aria-checked={level === l}
              onClick={() => setLevel(l)}
              className={`whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors sm:px-3.5 ${
                level === l
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {l === "All"
                ? "All programs"
                : l === "UG"
                  ? "Undergraduate"
                  : "Postgraduate"}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Programs and rewards */}
      <div id="referral-programs" role="tabpanel" className="min-w-0 lg:col-start-2 lg:row-start-2">
        {/* Desktop table (the wrapper fades in on change — animating a <tbody> renders badly in Chrome) */}
        <div
          key={`${uni.id}-${level}`}
          className="hidden px-3 pt-2 md:block motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300"
        >
          <table className="w-full text-left text-sm">
            <thead className="text-xs font-semibold uppercase tracking-wide text-red-900/70">
              <tr className="h-14 bg-red-50/70">
                <th className="rounded-l-xl px-4 font-semibold">Program</th>
                <th className="px-4 font-semibold">Level</th>
                <th className="px-4 font-semibold">Duration</th>
                <th className="px-4 text-right font-semibold">You earn up to</th>
                <th className="rounded-r-xl px-4">
                  <span className="sr-only">Refer</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {programs.map((p) => (
                <tr
                  key={p.name}
                  className="group transition-colors hover:bg-red-50/40"
                >
                  <td className="rounded-l-xl px-4 py-4 font-semibold text-gray-900">
                    {p.name}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-md px-2 py-0.5 text-xs font-semibold ${p.level === "PG" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700"}`}
                    >
                      {p.level}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-600">{p.duration}</td>
                  <td className="px-4 py-4 text-right text-base font-bold tabular-nums text-gray-900 group-hover:text-red-600">
                    {formatINR(p.reward)}
                  </td>
                  <td className="rounded-r-xl px-4 py-4 text-right">
                    <Link
                      href={REFER_HREF}
                      aria-label={`Refer a friend to ${p.name} at ${uni.name}`}
                      className={`inline-flex items-center gap-1.5 rounded-lg border border-red-600 px-3.5 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-600 hover:text-white group-hover:bg-red-600 group-hover:text-white ${FOCUS}`}
                    >
                      Refer Now
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phone cards */}
        <ul
          key={`m-${uni.id}-${level}`}
          className="divide-y divide-gray-100 md:hidden motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300"
        >
          {programs.map((p) => (
            <li
              key={p.name}
              className="flex items-center justify-between gap-4 px-5 py-4"
            >
              <div className="min-w-0">
                <p className="truncate font-semibold text-gray-900">{p.name}</p>
                <p className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="h-3.5 w-3.5" aria-hidden />
                    {p.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" aria-hidden />
                    {p.duration}
                  </span>
                </p>
                <p className="mt-1.5 text-sm font-bold text-gray-900">
                  Earn up to{" "}
                  <span className="text-red-600">{formatINR(p.reward)}</span>
                </p>
              </div>
              <Link
                href={REFER_HREF}
                aria-label={`Refer a friend to ${p.name} at ${uni.name}`}
                className={`flex-shrink-0 rounded-lg bg-red-600 px-3.5 py-2 text-xs font-semibold text-white ${FOCUS}`}
              >
                Refer Now
              </Link>
            </li>
          ))}
        </ul>

        {programs.length === 0 && (
          <p className="px-6 py-10 text-center text-sm text-gray-500">
            No {level} programs listed for this university yet.
          </p>
        )}

        <p className="border-t border-gray-100 px-6 py-3.5 text-xs text-gray-500">
          Rewards are paid for each successful enrolment and may change.
          You&apos;ll need to log in to submit a referral.
        </p>
      </div>
    </div>
  );
}
