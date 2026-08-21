"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { DIcons } from "dicons";
import { Phone, MessageCircle } from "lucide-react";
import { FooterCta } from "./footer-cta";

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
  const [footerSections, setFooterSections] = useState<any[]>(
    navigation.categories[0].sections,
  );

  useEffect(() => {
    const apiUrl =
      process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL ||
      "http://localhost:5000";

    const normalizeUrl = (url: string) => {
      if (!url) return "/";
      if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("#") || url.startsWith("/")) {
        return url;
      }
      return `/${url}`;
    };

    fetch(`${apiUrl}/menus/footer`)
      .then((res) => {
        if (!res.ok) throw new Error("Footer menu not found");
        return res.json();
      })
      .then((data) => {
        if (data && data.items && data.items.length > 0) {
          const sections = data.items.map((sec: any) => ({
            id: sec.id || sec.label.toLowerCase().replace(/\s+/g, "-"),
            name: sec.label,
            items: (sec.children || []).map((item: any) => ({
              name: item.label,
              href: normalizeUrl(item.url || "#"),
            })),
          }));
          setFooterSections(sections);
        }
      })
      .catch((err) => console.error("Error fetching footer menu:", err));
  }, []);

  return (
    <footer
      id="footer"
      className="relative mt-32 w-full bg-[#191e27] sm:mt-40 lg:mt-36"
    >
      <FooterCta />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-5 px-4 pb-0 pt-24 sm:px-6 sm:pt-32 sm:gap-6 sm:pb-1 lg:px-8 lg:pt-28">
        {/* <div className="relative h-12 w-40">
          <Link href="/" aria-label="eCampus home">
            <Image
              src="/image/logo.png"
              alt="Logo"
              fill
              className="object-contain brightness-0 invert transition-transform duration-300 hover:scale-105"
              priority
            />
          </Link>
        </div> */}

        <div className="w-full border-b border-dotted border-slate-800" />

        <div className="grid w-full grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {footerSections.map((section) => (
            <div key={section.id}>
              <h4 className="mb-4 text-sm font-semibold text-white">
                {section.name}
              </h4>
              <ul className="flex flex-col space-y-2">
                {section.items.map((item: any) => (
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

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-1 sm:px-6 sm:py-2 sm:gap-7 md:flex-row lg:px-8">
        <div className="flex flex-wrap justify-center gap-3 md:justify-start">
          {[
            { Icon: DIcons.X, color: "text-sky-500" }, // X (Twitter)
            { Icon: DIcons.Instagram, color: "text-pink-500" },
            { Icon: DIcons.LinkedIn, color: "text-blue-600" },
            { Icon: DIcons.Facebook, color: "text-blue-500" },
            { Icon: DIcons.YouTube, color: "text-red-600" },
          ].map(({ Icon, color }, idx) => (
            <Link key={idx} href="#" className={socialLinkClass}>
              <Icon className={`h-5 w-5 ${color}`} />
            </Link>
          ))}
        </div>
        <div className="flex flex-row items-center gap-2">
          {/* Toll Free Button */}
          <a
            href="tel:18001216201"
            className={`${contactLinkClass} flex items-center gap-2 !rounded-full !border-2 border-red-500 px-5 py-2.5 min-w-[160px] hover:bg-red-500/10 relative overflow-visible`}
          >
            <span className="absolute -top-2 left-3 rounded-full bg-red-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
              Toll Free
            </span>

            <Phone className="h-4 w-4 shrink-0 text-red-500" />

            <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-white">
              1800-121-6201
            </span>
          </a>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/919355907564"
            target="_blank"
            rel="noopener noreferrer"
            className={`${contactLinkClass} flex items-center gap-2 !rounded-full !border-2 border-green-500 px-5 py-2.5 min-w-[150px] hover:bg-green-500/10 relative overflow-visible`}
          >
            <span className="absolute -top-2 left-3 rounded-full bg-green-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
              WhatsApp
            </span>

            <MessageCircle className="h-4 w-4 shrink-0 text-green-500" />

            <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-white">
              93559 07564
            </span>
          </a>
        </div>
      </div>

      <div className="bg-[#1b1e20] px-4 pt-4 pb-24 sm:pt-6 sm:pb-24 md:py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-[12px] sm:gap-4 md:flex-row">
          <div className="flex flex-wrap justify-center gap-4 text-slate-300">
            <Link href="/terms" className="hover:text-red-500">
              Terms & Condition
            </Link>
            <Link href="/privacy" className="hover:text-red-500">
              Privacy Policy
            </Link>
          </div>
          <p className="text-slate-400">©2026 | All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
