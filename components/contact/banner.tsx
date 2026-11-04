"use client";

import React from "react";
import {
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

const Banner = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-0 pb-8 sm:px-6 md:pb-12 lg:px-8 lg:pb-16 lg:pt-0">
        <div className="grid items-center gap-6 sm:gap-8 lg:gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative z-10">
            <h1 className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl">
              Let&apos;s Start a <span className="text-red-500">Conversation</span>
            </h1>

            <div className="mt-4 sm:mt-5 flex items-center gap-2">
              <span className="h-1 w-12 sm:w-16 rounded-full bg-red-500" />
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            </div>

            <p className="mt-4 sm:mt-6 max-w-[540px] text-sm sm:text-base leading-6 sm:leading-8 text-slate-600 lg:text-lg">
              Have questions about courses, universities, admissions, or your
              career? Our team is here to guide you with the right information
              and support.
            </p>

            {/* Contact Info Line */}
            <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-1">
                <Phone size={14} className="text-red-500 shrink-0" />
                <a href="tel:18001216201" className="hover:text-red-500 transition">
                  1800-121-6201 (Toll Free)
                </a>
              </div>
              <span className="hidden sm:inline text-slate-400">•</span>
              <div className="flex items-center gap-1">
                <Mail size={14} className="text-blue-500 shrink-0" />
                <a href="mailto:support@ecampusapp.com" className="hover:text-blue-500 transition break-all">
                  support@ecampusapp.com
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-7 flex flex-col gap-2 sm:gap-4 sm:flex-row">
              <a
                href="tel:18001216201"
                className="inline-flex h-9 sm:h-11 items-center gap-2 justify-center rounded-[13px] bg-[#f83d46] px-3 sm:px-6 text-xs sm:text-sm font-bold text-white shadow-[0_10px_18px_rgba(248,61,70,0.28)] transition hover:bg-[#ef343d] active:scale-[0.99] whitespace-nowrap"
              >
                <Phone size={14} className="sm:size-[19px] shrink-0" />
                <span className="hidden sm:inline">Call Counsellor Now</span>
                <span className="sm:hidden">Call Now</span>
              </a>

              <a
                href="https://wa.me/919355907564"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 sm:h-11 items-center gap-2 justify-center rounded-[13px] border border-slate-200 bg-white px-3 sm:px-6 text-xs sm:text-sm font-bold text-slate-800 shadow-sm transition hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 active:scale-[0.99] whitespace-nowrap"
              >
                <MessageCircle size={14} className="sm:size-[19px] text-emerald-500 shrink-0" />
                <span className="hidden sm:inline">WhatsApp Chat</span>
                <span className="sm:hidden">WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="relative min-h-[250px] sm:min-h-[300px] lg:min-h-[380px]">
            <div className="absolute bottom-0 right-0 h-[90%] w-[90%] sm:h-[85%] sm:w-[75%] overflow-hidden rounded-bl-[40px] sm:rounded-bl-[60px] rounded-br-[16px] sm:rounded-br-[24px] rounded-tl-[40px] sm:rounded-tl-[60px] rounded-tr-[16px] sm:rounded-tr-[24px] shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
              <img
                src="/contact/bannerimg.png"
                alt="Contact Us"
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="absolute bottom-2 sm:bottom-3 left-0 grid grid-cols-5 gap-1 sm:gap-2">
              {Array.from({ length: 20 }).map((_, index) => (
                <span key={index} className="h-0.5 sm:h-1 w-0.5 sm:w-1 rounded-full bg-red-500" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;