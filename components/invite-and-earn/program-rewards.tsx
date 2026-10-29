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
    <div className="mt-10 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_20px_50px_-35px_rgba(17,24,39,0.35)] lg:grid lg:grid-cols-[300px_minmax(0,1fr)]">
      {/* 1. Choose a university */}
      <div className="border-b border-gray-200 bg-gray-50/70 lg:border-b-0 lg:border-r">
        <p className="px-5 pt-5 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
          1. Choose a university
        </p>
        <div
          role="tablist"
          aria-label="Universities"
          className="flex gap-2 overflow-x-auto p-4 [scrollbar-width:none] lg:flex-col lg:overflow-visible [&::-webkit-scrollbar]:hidden"
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
                className={`relative flex flex-shrink-0 items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors lg:w-full ${
                  on
                    ? "border-red-200 bg-white shadow-sm"
                    : "border-transparent hover:bg-white"
                }`}
              >
                {on && (
                  <span
                    aria-hidden
                    className="absolute inset-y-2.5 left-0 hidden w-[3px] rounded-r-full bg-red-600 lg:block"
                  />
                )}
                <span className="flex h-10 w-[72px] flex-shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-white px-1.5">
                  <Image
                    src={u.logo}
                    alt=""
                    width={64}
                    height={28}
                    className="h-7 w-auto max-w-full object-contain"
                  />
                </span>
                <span
                  className={`whitespace-nowrap text-sm lg:whitespace-normal ${on ? "font-semibold text-gray-900" : "text-gray-600"}`}
                >
                  {u.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Programs and rewards */}
      <div id="referral-programs" role="tabpanel" className="min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
              2. Pick a program
            </p>
            <p className="mt-1 truncate text-base font-bold text-gray-900">
              {uni.name}{" "}
              <span className="font-medium text-gray-500">· earn up to</span>{" "}
              <span className="text-red-600">{formatINR(best)}</span>
            </p>
          </div>
          <div
            role="radiogroup"
            aria-label="Program level"
            className="flex rounded-lg border border-gray-200 bg-gray-50 p-1"
          >
            {LEVELS.map((l) => (
              <button
                key={l}
                type="button"
                role="radio"
                aria-checked={level === l}
                onClick={() => setLevel(l)}
                className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  level === l
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
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

        {/* Desktop table (the wrapper fades in on change — animating a <tbody> renders badly in Chrome) */}
        <div
          key={`${uni.id}-${level}`}
          className="hidden md:block motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300"
        >
          <table className="w-full text-left text-sm">
            <thead className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              <tr className="border-b border-gray-100">
                <th className="px-6 py-3 font-semibold">Program</th>
                <th className="px-4 py-3 font-semibold">Level</th>
                <th className="px-4 py-3 font-semibold">Duration</th>
                <th className="px-4 py-3 text-right font-semibold">
                  You earn up to
                </th>
                <th className="px-6 py-3">
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
                  <td className="px-6 py-4 font-semibold text-gray-900">
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
                  <td className="px-4 py-4 text-right text-base font-bold tabular-nums text-gray-900">
                    {formatINR(p.reward)}
                  </td>
                  <td className="px-6 py-4 text-right">
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
