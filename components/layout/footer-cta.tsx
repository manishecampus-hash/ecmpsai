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
    <div className="w-full relative overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/10 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,0.15)] md:rounded-[24px]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 md:p-8 gap-6">
        {/* Left Column: Logo + Title + Pills */}
        <div className="flex flex-col items-center md:items-start gap-4 flex-1">
          <div className="relative h-8 w-32 invert hue-rotate-180">
            <Image
              src="/image/logo.png"
              alt="eCampus Logo"
              fill
              priority
              className="object-contain object-left"
            />
          </div>
          <h2 className="text-xl font-extrabold leading-tight tracking-tight text-white sm:text-2xl lg:text-[28px] text-center md:text-left">
            Ready to Start Your{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
              Global Academic Journey?
            </span>
          </h2>

          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {[
              "Globally Accredited",
              "Flexible Online",
              "Industry Experts",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-1.5 rounded-full bg-slate-800/40 border border-slate-700/40 px-3 py-1 text-[11px] font-semibold text-slate-300 transition-all duration-300 hover:bg-slate-800 hover:text-white sm:text-xs"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-red-500 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Button */}
        <div className="flex flex-col items-center gap-2.5 shrink-0 md:pl-6">
          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-red-500/20 transition-all hover:scale-105 active:scale-95 sm:text-sm sm:px-7 sm:py-3.5"
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

          <p className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Join 50,000+ Alumni
          </p>
        </div>
      </div>
    </div>
  );
}
