"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Building2,
  Check,
  Copy,
  Globe2,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { REVEAL_UP } from "@/components/about/reveal";
import { OFFICES, PHONE, whatsappLink } from "./contact-data";

const mapsLink = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
const mapEmbed = (address: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`;

// Office switcher: pick an office on the left and the large map on the right follows it
export default function OfficeMap() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const office = OFFICES[active];

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(office.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — nothing more to do here.
    }
  };

  return (
    <section aria-labelledby="offices-heading" className="py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:w-[86%] lg:px-0">
        <div
          data-reveal
          className={`${REVEAL_UP} flex flex-col gap-4 md:flex-row md:items-end md:justify-between`}
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-red-600">
              Visit us
            </p>
            <h2
              id="offices-heading"
              className="mt-3 text-[30px] font-bold leading-[1.2] tracking-tight text-gray-900 sm:text-[36px] lg:text-[40px]"
            >
              Our offices
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-gray-600">
            {OFFICES.length} locations across India and the UAE. Choose an
            office to see it on the map.
          </p>
        </div>

        <div
          data-reveal
          className={`${REVEAL_UP} mt-10 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_24px_60px_-40px_rgba(17,24,39,0.35)] lg:grid lg:grid-cols-[360px_minmax(0,1fr)]`}
        >
          {/* Office list */}
          <div className="flex flex-col border-b border-gray-200 lg:border-b-0 lg:border-r">
            <div
              role="tablist"
              aria-label="Offices"
              className="divide-y divide-gray-100 border-b border-gray-100"
            >
              {OFFICES.map((o, i) => {
                const on = i === active;
                const Icon = o.country === "India" ? Building2 : Globe2;
                return (
                  <button
                    key={o.city}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="office-map-panel"
                    onClick={() => setActive(i)}
                    className={`relative block w-full p-5 text-left transition-colors duration-300 sm:p-6 ${on ? "bg-red-50/60" : "hover:bg-gray-50"}`}
                  >
                    <span
                      aria-hidden
                      className={`absolute inset-y-0 left-0 w-1 bg-red-600 transition-transform duration-300 ${on ? "scale-y-100" : "scale-y-0"}`}
                    />
                    <span className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-3">
                        <span
                          className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 ${
                            on
                              ? "bg-red-600 text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <span>
                          <span className="block text-lg font-bold text-gray-900">
                            {o.city}
                          </span>
                          <span className="block text-xs text-gray-500">
                            {o.country}
                          </span>
                        </span>
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                          o.tag === "Headquarters"
                            ? "bg-red-600 text-white"
                            : "bg-white text-gray-600 ring-1 ring-gray-200"
                        }`}
                      >
                        {o.tag}
                      </span>
                    </span>
                    {/* Address opens under the selected office */}
                    <span
                      className={`grid transition-all duration-300 ease-out ${on ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    >
                      <span className="overflow-hidden">
                        <span className="flex gap-2 pl-[52px] text-sm leading-relaxed text-gray-600">
                          <MapPin
                            className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600"
                            aria-hidden
                          />
                          {o.address}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Fills the rest of the column: quick ways to talk without visiting */}
            <div className="mt-auto bg-gray-50 p-5 sm:p-6">
              <p className="text-sm font-bold text-gray-900">
                Can&apos;t visit? Talk to us
              </p>
              <p className="mt-1 text-xs leading-relaxed text-gray-600">
                Our counsellors can help you over a call or chat.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <a
                  href={`tel:${PHONE.tel}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-red-600 px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-red-700 focus-visible:underline"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden />
                  Call us
                </a>
                <a
                  href={whatsappLink(
                    "Hi eCampus! I'd like to talk to a counsellor.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs font-semibold text-gray-800 transition-colors hover:border-emerald-300 hover:text-emerald-700 focus-visible:underline"
                >
                  <MessageCircle
                    className="h-3.5 w-3.5 text-emerald-600"
                    aria-hidden
                  />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Map for the selected office */}
          <div
            id="office-map-panel"
            role="tabpanel"
            className="relative bg-gray-100 lg:min-h-[440px]"
          >
            <div className="relative h-[280px] sm:h-[420px] lg:absolute lg:inset-0 lg:h-auto">
              <iframe
                key={office.city}
                title={`Map of the eCampus ${office.city} office`}
                src={mapEmbed(office.address)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500"
              />
            </div>

            {/* Details card: below the map on phones, floating over it on larger screens */}
            <div
              key={`card-${office.city}`}
              className="relative m-4 rounded-xl border border-gray-200 bg-white p-4 shadow-lg motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-500 sm:absolute sm:bottom-4 sm:left-4 sm:m-0 sm:max-w-[360px]"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-red-600">
                {office.tag}
              </p>
              <p className="mt-0.5 text-base font-bold text-gray-900">
                eCampus {office.city}, {office.country}
              </p>
              <address className="mt-1 text-sm not-italic leading-relaxed text-gray-600">
                {office.address}
              </address>
              <div className="mt-3 flex items-center gap-2">
                <a
                  href={mapsLink(office.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-700 focus-visible:underline"
                >
                  Get directions
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
                <button
                  type="button"
                  onClick={copyAddress}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:border-gray-300"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  {copied ? "Copied" : "Copy address"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
