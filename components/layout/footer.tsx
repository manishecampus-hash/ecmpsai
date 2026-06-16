"use client";

import Link from "next/link";
import Image from "next/image";
import { DIcons } from "dicons";
import { Phone, MessageCircle } from "lucide-react";
// import { FooterCta } from "./footer-cta";

const navigation = {
  categories: [
    {
      id: "programs",
      name: "Programs",
      sections: [
        {
          id: "dba",
          name: "Online DBA Program",
          items: [
            { name: "Birchwood University", href: "/degrees/bachelors" },
            { name: "EIMT", href: "/degrees/masters" },
            { name: "Swiss School of Business", href: "/degrees/phd" },
            { name: "ESGCI", href: "/degrees/phd" },
            { name: "Rushford Business School", href: "/degrees/phd" },
          ],
        },
        {
          id: "cert",
          name: "Certificate Program",
          items: [
            { name: "IIM K - HR Management", href: "/certifications" },
            { name: "IIM K-AI Professional", href: "/executive" },
          ],
        },
        {
          id: "ug",
          name: "Online UG Courses",
          items: [
            { name: "Online BBA", href: "/micro-credentials" },
            { name: "Online BCA", href: "/mini-courses" },
            { name: "Online BSC", href: "/corporate-training" },
          ],
        },
        {
          id: "pg",
          name: "Online PG Courses",
          items: [
            { name: "MBA", href: "/subjects/business" },
            { name: "MCA", href: "/subjects/technology" },
            { name: "MA", href: "/subjects/data-science" },
          ],
        },
        {
          id: "popular",
          name: "Popular Courses",
          items: [
            { name: "IIM K HR Analytics", href: "/about" },
            { name: "1 Year MBA - O.P Jindal", href: "/blog" },
          ],
        },
        {
          id: "support",
          name: "Support",
          items: [
            { name: "Help Center", href: "/help" },
            { name: "Contact", href: "/contact" },
          ],
        },
      ],
    },
  ],
};

const socialLinkClass =
  "flex h-11 w-11 items-center justify-center rounded-xl border border-dotted border-slate-700 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:bg-red-500/10 hover:text-red-500";

const contactLinkClass =
  "group relative flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 pt-2 transition-colors";

export function Footer() {
  return (
    <footer
      id="footer"
      className="relative mt-10 w-full bg-[#191e27]"
    >
      {/* <FooterCta />  hide for now */}

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-8 pt-10 sm:px-6 sm:pt-10 lg:px-8 lg:pt-10">
        <div className="flex w-full justify-start">
          <Link href="/" aria-label="eCampus home">
            {/* Define the container size here */}
            <div className="relative h-12 w-40">
              <Image
                src="/image/logo.png"
                alt="Logo"
                fill
                className="object-contain brightness-0 invert transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>
          </Link>
        </div>

        <div className="w-full border-b border-dotted border-slate-800" />

        <div className="grid w-full grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {navigation.categories[0].sections.map((section) => (
            <div key={section.id}>
              <h4 className="mb-4 text-sm font-semibold text-white">
                {section.name}
              </h4>
              <ul className="flex flex-col space-y-2">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm leading-relaxed text-white/70 transition-colors hover:text-red-500"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="w-full border-b border-dotted border-slate-800" />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-7 px-4 py-8 sm:px-6 md:flex-row lg:px-8">
        <div className="flex flex-wrap justify-center gap-3 md:justify-start">
          {[
            DIcons.X,
            DIcons.Instagram,
            DIcons.LinkedIn,
            DIcons.Facebook,
            DIcons.YouTube,
          ].map((Icon, idx) => (
            <Link key={idx} href="#" className={socialLinkClass}>
              <Icon className="h-5 w-5" />
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="tel:18001216201"
            className={`${contactLinkClass} min-w-[165px] hover:border-red-500/70`}
          >
            <span className="absolute -top-2 left-3 rounded bg-red-600 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
              Toll Free
            </span>
            <Phone className="h-4 w-4 shrink-0 text-red-500" />
            <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-white">
              1800-121-6201
            </span>
          </a>

          <a
            href="https://wa.me/919355907564"
            target="_blank"
            rel="noopener noreferrer"
            className={`${contactLinkClass} min-w-[155px] hover:border-green-500/70`}
          >
            <span className="absolute -top-2 left-3 rounded bg-green-600 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
              WhatsApp
            </span>
            <MessageCircle className="h-4 w-4 shrink-0 text-green-500" />
            <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-white">
              93559 07564
            </span>
          </a>
        </div>
      </div>

    </footer>
  );
}
