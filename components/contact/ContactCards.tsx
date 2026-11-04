"use client";

import React, { useState } from "react";
import { Phone, Mail, MessageCircle, Copy, Check, Clock, ArrowUpRight } from "lucide-react";

export default function ContactCards() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section className="relative w-full bg-white py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            We&apos;re Here to Help You <span className="text-red-500">Succeed</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Reach out through your preferred channel. Our education experts are available to provide instant guidance.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* CARD 1: TOLL FREE PHONE */}
          <div className="group relative rounded-2xl sm:rounded-3xl bg-white border border-gray-100 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-red-200 p-6 sm:p-8 flex flex-col justify-between">
            <div className="absolute -top-6 left-6 sm:left-8 z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-5 h-5" />
              </div>
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wide text-red-600 bg-red-50 px-2.5 py-1 rounded-md">
                  Toll Free Hotline
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Call Us Directly
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                Speak with our admissions counsellors for course & university guidance.
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 flex items-center justify-between group/number hover:bg-red-50/50 hover:border-red-100 transition-colors">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium block mb-1">Toll Free</span>
                  <a
                    href="tel:18001216201"
                    className="text-lg sm:text-xl font-bold text-gray-900 hover:text-red-600 transition-colors"
                  >
                    1800-121-6201
                  </a>
                </div>

                <button
                  onClick={() => handleCopy("1800-121-6201", "phone")}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-white transition-all"
                >
                  {copiedField === "phone" ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <a
              href="tel:18001216201"
              className="w-full inline-flex items-center gap-2 justify-center py-3 px-4 rounded-[13px] bg-red-600 text-white font-bold text-xs sm:text-sm hover:bg-red-700 transition-all"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>

          {/* CARD 2: SUPPORT EMAIL */}
          <div className="group relative rounded-2xl sm:rounded-3xl bg-white border border-gray-100 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-blue-200 p-6 sm:p-8 flex flex-col justify-between">
            <div className="absolute -top-6 left-6 sm:left-8 z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-5 h-5" />
              </div>
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wide text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                  Official Email
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Email Support
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                Send us your detailed queries, verification requests, or proposals anytime.
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 flex items-center justify-between group/email hover:bg-blue-50/50 hover:border-blue-100 transition-colors">
                <div className="min-w-0 pr-2">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium block mb-1">Email</span>
                  <a
                    href="mailto:support@ecampusapp.com"
                    className="text-sm sm:text-base font-bold text-gray-900 hover:text-blue-600 transition-colors truncate"
                  >
                    support@ecampusapp.com
                  </a>
                </div>

                <button
                  onClick={() => handleCopy("support@ecampusapp.com", "email")}
                  className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-white transition-all shrink-0"
                >
                  {copiedField === "email" ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <a
              href="mailto:support@ecampusapp.com"
              className="w-full inline-flex items-center gap-2 justify-center py-3 px-4 rounded-[13px] bg-blue-600 text-white font-bold text-xs sm:text-sm hover:bg-blue-700 transition-all"
            >
              <Mail className="w-4 h-4" />
              Send Email
            </a>
          </div>

          {/* CARD 3: WHATSAPP SUPPORT */}
          <div className="group relative rounded-2xl sm:rounded-3xl bg-white border border-gray-100 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-emerald-200 p-6 sm:p-8 flex flex-col justify-between">
            <div className="absolute -top-6 left-6 sm:left-8 z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-5 h-5" />
              </div>
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wide text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                  WhatsApp Live
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                WhatsApp Assistant
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                Get course details, fee structures, and prospectus on your WhatsApp.
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 flex items-center justify-between group/wa hover:bg-emerald-50/50 hover:border-emerald-100 transition-colors">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium block mb-1">WhatsApp</span>
                  <a
                    href="https://wa.me/919355907564"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl font-bold text-gray-900 hover:text-emerald-600 transition-colors"
                  >
                    +91 93559 07564
                  </a>
                </div>

                <button
                  onClick={() => handleCopy("+91 93559 07564", "whatsapp")}
                  className="p-2 rounded-xl text-slate-400 hover:text-emerald-600 hover:bg-white transition-all"
                >
                  {copiedField === "whatsapp" ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <a
              href="https://wa.me/919355907564"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center gap-2 justify-center py-3 px-4 rounded-[13px] bg-emerald-600 text-white font-bold text-xs sm:text-sm hover:bg-emerald-700 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>

        </div>

        {/* Copied Toast */}
        {copiedField && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-900 text-white text-xs font-semibold shadow-lg border border-gray-800 animate-in fade-in slide-in-from-bottom-5">
            <Check className="w-4 h-4 text-emerald-400" />
            Copied to clipboard!
          </div>
        )}
      </div>
    </section>
  );
}