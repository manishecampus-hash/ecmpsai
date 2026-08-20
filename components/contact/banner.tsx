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
      <div className="mx-auto max-w-7xl px-6 pt-0 pb-12 lg:px-8 lg:pb-16 lg:pt-0">
        <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 md:text-5xl lg:text-[62px]">
              Let&apos;s Start a
              <br />
              <span className="text-red-600">Conversation</span>
            </h1>

            <div className="mt-5 flex items-center gap-2">
              <span className="h-1 w-16 rounded-full bg-red-600" />
              <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
            </div>

            <p className="mt-6 max-w-[540px] text-base leading-8 text-slate-600 md:text-lg">
              Have questions about courses, universities, admissions, or your
              career? Our team is here to guide you with the right information
              and support.
            </p>

            <div className="mt-7 flex flex-wrap gap-4">
              <button className="flex items-center gap-3 rounded-lg bg-red-600 px-7 py-4 font-semibold text-white shadow-lg shadow-red-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-red-700">
                <Send size={19} />
                Contact Our Team
              </button>

              <button className="flex items-center gap-3 rounded-lg border border-red-300 bg-white px-7 py-4 font-semibold text-red-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-red-50">
                <MessageCircle size={19} />
                Explore Support
              </button>
            </div>

            <div className="mt-8 grid max-w-[610px] gap-4 sm:grid-cols-2">
              <div className="flex min-h-[90px] items-center gap-4 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <Phone size={24} strokeWidth={1.8} />
                </div>

                <div>
                  <h3 className="text-base font-semibold text-slate-800">
                    Quick Support
                  </h3>
                  <span className="mt-2 block h-[2px] w-7 bg-red-500" />
                </div>
              </div>

              <div className="flex min-h-[90px] items-center gap-4 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <Mail size={24} strokeWidth={1.8} />
                </div>

                <div>
                  <h3 className="text-base font-semibold text-slate-800">
                    Email Us
                  </h3>
                  <span className="mt-2 block h-[2px] w-7 bg-red-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[500px] lg:min-h-[620px]">
            <div className="absolute bottom-0 right-0 h-[90%] w-[94%] overflow-hidden rounded-bl-[80px] rounded-br-[32px] rounded-tl-[80px] rounded-tr-[32px] shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
              <img
                src="/contact/bannerimg.png"
                alt="Contact Us"
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="absolute bottom-3 left-0 grid grid-cols-5 gap-2">
              {Array.from({ length: 20 }).map((_, index) => (
                <span key={index} className="h-1 w-1 rounded-full bg-red-500" />
              ))}
            </div>

            <div className="absolute bottom-6 left-0 z-10 w-[210px] rounded-2xl bg-red-600 p-6 text-white shadow-xl shadow-red-500/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30">
                <Headphones size={23} />
              </div>

              <h3 className="mt-4 text-lg font-bold">
                We&apos;re here
                <br />
                to help!
              </h3>

              <div className="my-4 h-px w-full bg-white/30" />

              <p className="text-sm leading-6 text-white/95">
                Get the answers
                <br />
                you need.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
