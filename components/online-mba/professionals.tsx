"use client";

import React from "react";

export default function Professionals() {
  return (
    <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-black">
      <div className="max-w-6xl mx-auto font-[Inter]">
        {/* First Section */}
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            Is an Online MBA Good for Working{" "}
            <span className="text-[#ee2c3c]"> Professionals?</span>
          </h2>
        </div>

        <p className="mx-auto max-w-5xl text-center text-slate-600 leading-relaxed text-base sm:text-lg">
          An online MBA is a strong fit for working professionals who want to
          move their career forward without leaving their job. It brings the
          flexibility to learn management while keeping a paycheck — unlike a
          traditional classroom setup, you can study from anywhere and attend
          classes on your own schedule, making it easier to balance work,
          family, and study.
        </p>

        <div className="mt-6 rounded-2xl border border-slate-200 shadow-sm bg-white p-6">
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckBubble />

              <span className="text-sm md:text-[15px] text-slate-600 leading-relaxed">
                <span className="font-bold text-slate-900">
                  Career advancement
                </span>{" "}
                is one of the biggest wins here. You build leadership,
                communication, and decision-making skills — exactly what a
                competitive job market demands — and most organizations prefer
                a management qualification for promotions and bigger
                responsibilities. It can also help you switch careers, move
                into a managerial role, or start your own business.
              </span>
            </li>

            <li className="flex items-start gap-3">
              <CheckBubble />

              <span className="text-sm md:text-[15px] text-slate-600 leading-relaxed">
                <span className="font-bold text-slate-900">
                  Cost and application
                </span>{" "}
                work in your favor too. Online programs typically cost less
                than a regular MBA since there's no commuting or relocation,
                and you can apply what you learn at work almost immediately —
                making the learning more practical and useful.
              </span>
            </li>
          </ul>
        </div>

     

      
       </div>
    </section>
  );
}

function CheckBubble() {
  return (
    <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path
          d="M20 6L9 17l-5-5"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}