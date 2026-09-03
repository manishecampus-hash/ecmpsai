"use client";

import React, { useState } from "react";
import { Phone, Mail, MessageCircle, Copy, Check, Clock, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function ContactCards() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-slate-50 via-white to-slate-50/50 py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
            Direct Support Channels
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            We&apos;re Here to Help You <span className="text-red-500">Succeed</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Reach out through your preferred channel. Our education experts are available to provide instant guidance and answer all your program queries.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* CARD 1: TOLL FREE PHONE */}
          <div className="group relative rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-red-500/10 hover:border-red-200 transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-0 left-8 -translate-y-1/2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 text-white shadow-lg shadow-red-500/30 group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-6 h-6" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between pt-4 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded-md">
                  Toll Free Hotline
                </span>
                <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                  <Clock className="w-3 h-3" />
                  Mon-Sat (9AM-7PM)
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Call Us Directly
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
                Speak with our admissions counsellors for free course & university selection guidance.
              </p>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-6 flex items-center justify-between group/number hover:bg-red-50/50 hover:border-red-100 transition-colors">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Toll Free Number</span>
                  <a
                    href="tel:18001216201"
                    className="text-lg sm:text-xl font-extrabold text-slate-900 hover:text-red-600 transition-colors tracking-tight"
                  >
                    1800-121-6201
                  </a>
                </div>

                <button
                  onClick={() => handleCopy("1800-121-6201", "phone")}
                  title="Copy Phone Number"
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-white transition-all border border-transparent hover:border-slate-200"
                >
                  {copiedField === "phone" ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="tel:18001216201"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600 text-white font-bold text-xs sm:text-sm hover:bg-red-700 shadow-md shadow-red-600/20 active:scale-[0.98] transition-all"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>

          {/* CARD 2: SUPPORT EMAIL */}
          <div className="group relative rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-200 transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-0 left-8 -translate-y-1/2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-6 h-6" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between pt-4 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                  Official Email
                </span>
                <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                  <Clock className="w-3 h-3" />
                  24h Response Time
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Email Support
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
                Send us your detailed queries, verification requests, or partnership proposals anytime.
              </p>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-6 flex items-center justify-between group/email hover:bg-blue-50/50 hover:border-blue-100 transition-colors">
                <div className="flex flex-col min-w-0 pr-2">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Support Email</span>
                  <a
                    href="mailto:support@ecampusapp.com"
                    className="text-sm sm:text-base font-extrabold text-slate-900 hover:text-blue-600 transition-colors tracking-tight truncate"
                  >
                    support@ecampusapp.com
                  </a>
                </div>

                <button
                  onClick={() => handleCopy("support@ecampusapp.com", "email")}
                  title="Copy Email Address"
                  className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-white transition-all border border-transparent hover:border-slate-200 shrink-0"
                >
                  {copiedField === "email" ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="mailto:support@ecampusapp.com"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 text-white font-bold text-xs sm:text-sm hover:bg-blue-700 shadow-md shadow-blue-600/20 active:scale-[0.98] transition-all"
              >
                <Mail className="w-4 h-4" />
                Send Email
              </a>
            </div>
          </div>

          {/* CARD 3: WHATSAPP SUPPORT */}
          <div className="group relative rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-0 left-8 -translate-y-1/2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-6 h-6" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between pt-4 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  WhatsApp Live
                </span>
                <span className="text-[11px] font-medium text-emerald-600">
                  Instant Reply
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-1">
                WhatsApp Assistant
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
                Get course details, fee structures, and prospectus delivered straight to your WhatsApp.
              </p>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-6 flex items-center justify-between group/wa hover:bg-emerald-50/50 hover:border-emerald-100 transition-colors">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">WhatsApp Support</span>
                  <a
                    href="https://wa.me/919355907564"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl font-extrabold text-slate-900 hover:text-emerald-600 transition-colors tracking-tight"
                  >
                    +91 93559 07564
                  </a>
                </div>

                <button
                  onClick={() => handleCopy("+91 93559 07564", "whatsapp")}
                  title="Copy WhatsApp Number"
                  className="p-2 rounded-xl text-slate-400 hover:text-emerald-600 hover:bg-white transition-all border border-transparent hover:border-slate-200"
                >
                  {copiedField === "whatsapp" ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="https://wa.me/919355907564"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs sm:text-sm hover:bg-emerald-700 shadow-md shadow-emerald-600/20 active:scale-[0.98] transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
                <ArrowUpRight className="w-4 h-4 opacity-75" />
              </a>
            </div>
          </div>

        </div>

        {/* Copied Toast Floating Alert */}
        {copiedField && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 text-white text-xs font-semibold shadow-2xl border border-slate-800 animate-in fade-in slide-in-from-bottom-5">
            <Check className="w-4 h-4 text-emerald-400" />
            Copied {copiedField} to clipboard!
          </div>
        )}
      </div>
    </section>
  );
}
