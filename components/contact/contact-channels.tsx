"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Copy, Mail, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { REVEAL_LEFT, REVEAL_UP } from "@/components/about/reveal";
import { EMAIL, PHONE, WHATSAPP, whatsappLink } from "./contact-data";

type Channel = {
  id: string;
  icon: LucideIcon;
  label: string;
  value: string;
  text: string;
  href: string;
  action: string;
  external?: boolean;
  tone: string; // icon colours, normal and on hover
};

const CHANNELS: Channel[] = [
  {
    id: "phone",
    icon: Phone,
    label: "Toll free hotline",
    value: PHONE.display,
    text: "Speak with our admissions counsellors for course & university guidance.",
    href: `tel:${PHONE.tel}`,
    action: "Call now",
    tone: "text-red-400 ring-red-500/40 group-hover:bg-red-600 group-hover:text-white group-hover:ring-red-600",
  },
  {
    id: "email",
    icon: Mail,
    label: "Official email",
    value: EMAIL,
    text: "Send us your detailed queries, verification requests, or proposals anytime.",
    href: `mailto:${EMAIL}`,
    action: "Send email",
    tone: "text-white ring-white/25 group-hover:bg-white group-hover:text-slate-950 group-hover:ring-white",
  },
  {
    id: "whatsapp",
    icon: MessageCircle,
    label: "WhatsApp live",
    value: WHATSAPP.display,
    text: "Get course details, fee structures, and prospectus on your WhatsApp.",
    href: whatsappLink(),
    action: "Chat now",
    external: true,
    tone: "text-emerald-400 ring-emerald-500/40 group-hover:bg-emerald-500 group-hover:text-white group-hover:ring-emerald-500",
  },
];

// A photo of our team on one side, the ways to reach us as a clean list on the other, on the dark brand backdrop
export default function ContactChannels() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Clipboard API unavailable — nothing more to do here.
    }
  };

  return (
    <section aria-labelledby="channels-heading" className="relative isolate overflow-hidden bg-slate-950 py-20 lg:py-24">
      {/* Black-and-red backdrop, same as the course and compare heroes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 bottom-[-12rem] h-[520px] w-[520px] rounded-full bg-[#ee2c3c]/25 blur-[120px]" />
        <div className="absolute -right-32 -top-40 h-[460px] w-[460px] rounded-full bg-rose-500/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
      </div>

      <div className="mx-auto grid w-full max-w-[1320px] items-center gap-12 px-5 sm:px-8 lg:w-[86%] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 lg:px-0">
        {/* Photo */}
        <div data-reveal className={`${REVEAL_LEFT} relative mx-auto w-full max-w-[560px] lg:mx-0`}>
          <div aria-hidden className="absolute -left-4 -top-4 h-full w-full rounded-[28px] border-2 border-red-600" />
          <div className="group relative aspect-[540/420] overflow-hidden rounded-[28px] bg-slate-900 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
            <Image
              src="/contact/contactusnew.png"
              alt="An eCampus counsellor helping a student over the phone"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>
          {/* Caption card */}
          <div className="relative -mt-8 ml-auto mr-5 flex w-fit items-center gap-3 rounded-xl bg-white px-5 py-3 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] sm:mr-8">
            <span className="relative flex h-2.5 w-2.5" aria-hidden>
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-red-600">Real counsellors</span>
              <span className="block text-sm font-bold text-slate-900">Free, one-on-one guidance</span>
            </span>
          </div>
        </div>

        {/* Ways to reach us */}
        <div>
          <div data-reveal className={REVEAL_UP}>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-red-400">Reach us</p>
            <h2 id="channels-heading" className="mt-3 text-[30px] font-bold leading-[1.2] tracking-tight text-white sm:text-[36px] lg:text-[40px]">
              We&apos;re here to help you <span className="text-red-500">succeed</span>
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/70">
              Reach out through your preferred channel. Our education experts are available to provide instant guidance.
            </p>
          </div>

          <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {CHANNELS.map((c, i) => {
              const Icon = c.icon;
              return (
                <li key={c.id} data-reveal style={{ transitionDelay: `${120 + i * 120}ms` }} className={REVEAL_UP}>
                  <div className="group relative flex items-start gap-5 py-6 transition-transform duration-300 hover:translate-x-1">
                    {/* Red marker that grows along the left edge on hover */}
                    <span
                      aria-hidden
                      className="absolute -left-4 top-1/2 h-0 w-0.5 -translate-y-1/2 rounded-full bg-red-500 transition-[height] duration-300 group-hover:h-10 max-sm:hidden"
                    />
                    <span className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.04] ring-2 transition-colors duration-300 ${c.tone}`}>
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">{c.label}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <a
                          href={c.href}
                          {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="truncate text-xl font-bold text-white transition-colors hover:text-red-400 sm:text-2xl"
                        >
                          {c.value}
                        </a>
                        <button
                          type="button"
                          onClick={() => copy(c.id, c.value)}
                          aria-label={`Copy ${c.label.toLowerCase()}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-white/50 transition-colors hover:text-white"
                        >
                          {copied === c.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                          {copied === c.id ? "Copied" : "Copy"}
                        </button>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/60">{c.text}</p>
                    </div>
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="mt-1 hidden flex-shrink-0 items-center gap-1.5 text-sm font-semibold text-red-400 transition-colors hover:text-red-300 focus-visible:underline sm:inline-flex"
                    >
                      {c.action}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {copied && (
        <div role="status" className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-semibold text-slate-900 shadow-lg animate-in fade-in slide-in-from-bottom-4">
          <Check className="h-4 w-4 text-emerald-600" />
          Copied to clipboard
        </div>
      )}
    </section>
  );
}
