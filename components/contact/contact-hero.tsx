"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Mail, MessageCircle, Phone, PhoneCall } from "lucide-react";
import FlowingLines from "@/components/about/flowing-lines";
import { EMAIL, PHONE, whatsappLink } from "./contact-data";

const TOPICS = ["Choosing a course", "University details", "Admissions", "Fees & EMI", "Career guidance", "Something else"];

const FOCUS = "focus-visible:underline focus-visible:underline-offset-4";

export default function ContactHero() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const message = `Hi eCampus! I need help with: ${topic}.`;

  return (
    <section aria-labelledby="contact-heading" className="relative overflow-hidden border-b border-red-100 bg-[#fff5f5]">
      <FlowingLines className="[mask-image:linear-gradient(to_right,transparent_35%,black_70%)]" />

      <div className="relative mx-auto grid w-full max-w-[1320px] grid-cols-[minmax(0,1fr)] items-center gap-12 px-5 py-14 sm:px-8 sm:py-16 lg:w-[86%] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16 lg:px-0 lg:py-20">
        <div>
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-500 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500">
            <Link href="/" className={`transition-colors hover:text-gray-900 ${FOCUS}`}>
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <span aria-current="page" className="font-medium text-gray-900">
              Contact Us
            </span>
          </nav>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-red-600 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500">
            Contact us
          </p>
          <h1
            id="contact-heading"
            className="mt-3 max-w-xl text-[38px] font-bold leading-[1.1] tracking-tight text-gray-900 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-both motion-safe:delay-100 motion-safe:duration-700 sm:text-[50px] lg:text-[56px]"
          >
            Let&apos;s Start a <span className="text-red-600">Conversation</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-gray-600 motion-safe:animate-in motion-safe:fade-in motion-safe:fill-mode-both motion-safe:delay-200 motion-safe:duration-700 sm:text-lg">
            Have questions about courses, universities, admissions, or your career? Our team is here to guide you with the right
            information and support.
          </p>
          <div className="mt-8 flex flex-col gap-3 motion-safe:animate-in motion-safe:fade-in motion-safe:fill-mode-both motion-safe:delay-300 motion-safe:duration-700 sm:flex-row">
            <a
              href={`tel:${PHONE.tel}`}
              className={`group inline-flex items-center justify-center gap-2 rounded-[10px] bg-red-600 px-6 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-red-600/20 transition-colors hover:bg-red-700 ${FOCUS}`}
            >
              <Phone className="h-4 w-4 transition-transform group-hover:-rotate-12" aria-hidden />
              Call Counsellor Now
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 rounded-[10px] border border-gray-300 bg-white px-6 py-3.5 text-[15px] font-semibold text-gray-900 transition-colors hover:border-emerald-300 hover:text-emerald-700 ${FOCUS}`}
            >
              <MessageCircle className="h-4 w-4 text-emerald-600" aria-hidden />
              WhatsApp Chat
            </a>
          </div>
          <div className="mt-8 flex flex-col gap-3 border-t border-red-200/70 pt-6 text-sm text-gray-700 motion-safe:animate-in motion-safe:fade-in motion-safe:fill-mode-both motion-safe:delay-500 motion-safe:duration-700 sm:flex-row sm:gap-6">
            <a href={`tel:${PHONE.tel}`} className={`inline-flex items-center gap-2 font-medium transition-colors hover:text-red-600 ${FOCUS}`}>
              <Phone className="h-4 w-4 text-red-600" aria-hidden />
              {PHONE.display} <span className="text-gray-500">(Toll Free)</span>
            </a>
            <a href={`mailto:${EMAIL}`} className={`inline-flex items-center gap-2 font-medium transition-colors hover:text-red-600 ${FOCUS}`}>
              <Mail className="h-4 w-4 text-red-600" aria-hidden />
              {EMAIL}
            </a>
          </div>
        </div>

        {/* Topic picker: the chosen topic is sent with the WhatsApp message */}
        <div className="mx-auto w-full max-w-[480px] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:fill-mode-both motion-safe:delay-200 motion-safe:duration-700 lg:mr-0">
          <div className="rounded-2xl border border-gray-200 border-t-red-600 bg-white p-6 shadow-[0_28px_60px_-34px_rgba(17,24,39,0.4)] [border-top-width:4px] sm:p-7">
            <p className="text-lg font-bold text-gray-900">What can we help you with?</p>
            <p className="mt-1 text-sm text-gray-500">Pick a topic and we&apos;ll connect you with the right expert.</p>

            <div role="radiogroup" aria-label="Topic" className="mt-5 grid grid-cols-2 gap-2.5">
              {TOPICS.map((t) => {
                const on = t === topic;
                return (
                  <button
                    key={t}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setTopic(t)}
                    className={`flex items-center justify-between gap-2 rounded-xl border px-3.5 py-3 text-left text-sm font-medium transition-all duration-200 ${
                      on ? "border-red-300 bg-red-50 text-red-700 shadow-sm" : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {t}
                    <span
                      className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                        on ? "scale-100 bg-red-600 text-white" : "scale-90 border border-gray-300 text-transparent"
                      }`}
                    >
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 space-y-2.5">
              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 ${FOCUS}`}
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Ask about {topic.toLowerCase()} on WhatsApp
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </a>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("open-signup"))}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition-colors hover:border-gray-900"
              >
                <PhoneCall className="h-4 w-4 text-red-600" aria-hidden />
                Request a call back
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
