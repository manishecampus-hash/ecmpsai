"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import {
  ApplicationForm,
  type LeadData,
} from "../discovery/degree-finder/application-form";

function SuccessState({
  name,
  onClose,
}: {
  name: string;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col items-center text-center py-6 px-2">
      <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-3" />
      <h3 className="text-xl font-bold text-gray-900">
        Thanks, {name.split(" ")[0]}!
      </h3>
      <p className="text-sm text-gray-500 mt-1.5 max-w-xs">
        Your application has been received. Our admissions team will reach out
        to you shortly.
      </p>
      <Button
        onClick={onClose}
        className="mt-5 h-10 px-6 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl text-sm"
      >
        Close
      </Button>
    </div>
  );
}

// ── FooterCta ─────────────────────────────────────────────────────────────────

export function FooterCta() {
  const [open, setOpen] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<LeadData | null>(null);

  const handleFormSubmit = (data: LeadData) => {
    setSubmittedLead(data);
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    // reset once fully closed so the dialog shows a fresh form next time
    if (!next) {
      setTimeout(() => setSubmittedLead(null), 200);
    }
  };

  return (
    <div className="absolute inset-x-0 -top-32 z-20 mx-auto max-w-6xl px-4 sm:px-4 md:px-6 sm:-top-40 md:-top-28 lg:-top-20">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-[#E1D9D1] shadow-[0_20px_50px_rgba(0,0,0,0.05)] md:rounded-[32px]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Image */}
          <div className="flex w-full shrink-0 justify-center md:w-64 md:items-center md:self-stretch">
            <div className="relative aspect-[16/9] w-2/5 max-w-[90px] sm:aspect-[4/3] sm:w-1/2 sm:max-w-[220px] md:aspect-auto md:h-full md:w-full md:min-h-[160px]">
              <Image
                src="/image/logo.png"
                alt="CTA"
                fill
                priority
                className="object-contain object-bottom md:object-left md:p-6"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col items-center gap-2 px-4 pb-4 pt-2 sm:gap-4 sm:pb-8 md:flex-row md:items-center md:justify-between md:gap-6 md:px-0 md:py-10 md:pr-8">
            {/* Text */}
            <div className="text-center md:text-left">
              <h2 className="text-base font-bold leading-tight text-slate-800 sm:text-2xl lg:text-4xl">
                Ready to Start Your
                <br className="hidden md:block" />
                Global Academic Journey?
              </h2>

              <div className="mt-2 flex flex-wrap justify-center gap-2 sm:mt-4 sm:gap-3 md:justify-start">
                {[
                  "Globally Accredited",
                  "Flexible Online",
                  "Industry Experts",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 sm:text-xs"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-slate-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Button — opens popup instead of navigating */}
            <div className="flex shrink-0 flex-col items-center gap-1.5 sm:gap-2">
              <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-slate-800 px-5 py-2 text-xs font-bold text-white shadow-md transition-all hover:scale-105 active:scale-95 sm:text-sm sm:px-6 sm:py-3"
                  >
                    <span
                      className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                      aria-hidden="true"
                    />

                    <span className="relative z-10 flex items-center gap-2">
                      Apply Now
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </button>
                </DialogTrigger>

                <DialogContent className="bg-white border border-gray-100 rounded-2xl px-4 sm:px-6 py-5 sm:py-6 max-w-md">
                  {submittedLead ? (
                    <SuccessState
                      name={submittedLead.name}
                      onClose={() => handleOpenChange(false)}
                    />
                  ) : (
                    <ApplicationForm onSubmit={handleFormSubmit} />
                  )}
                </DialogContent>
              </Dialog>

              <p className="text-center text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Join 50,000+ Alumni
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
