"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { DIcons } from "dicons";
import { Phone, MessageCircle } from "lucide-react";
import { FooterCta } from "./footer-cta";
import ChildFooter from "./child-footer";

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
  "flex h-10 w-10 items-center justify-center rounded-full border border-slate-800/80 bg-slate-900/20 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:bg-red-500/10 hover:text-white";

const contactLinkClass =
  "group relative flex items-center justify-center gap-2 rounded-full border border-slate-800/80 bg-slate-900/20 px-5 py-2.5 transition-all duration-300 hover:bg-slate-900/50";

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
      className="relative mt-6 w-full bg-gradient-to-b from-[#0F131E] to-[#080B11] border-t border-slate-800/60 sm:mt-8 lg:mt-10"
    >
      <div className="relative mx-auto flex max-w-[1440px] flex-col gap-8 px-4 pb-0 pt-10 sm:px-6 sm:pt-12 lg:px-8">
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12">
          {/* Column 1: Brand Info Column */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-3 flex flex-col gap-5 text-left">
            <div className="relative h-10 w-40 invert hue-rotate-180">
              <Image
                src="/image/logo.png"
                alt="eCampus Logo"
                fill
                priority
                unoptimized
                className="object-contain object-left"
              />
            </div>
            <p className="text-[14.5px] leading-relaxed text-slate-300/90 font-medium tracking-wide">
           eCampus is India's trusted higher education platform helping students and working professionals discover the right degree, certification, executive, and doctorate programs. Compare universities, explore career-focused courses, and get expert guidance to make informed education decisions that support your professional growth.
            </p>
           
            <div className="flex flex-col gap-2.5">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">
                Follow us at
              </span>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { Icon: DIcons.Instagram, color: "hover:text-pink-400 hover:border-pink-400/50 hover:bg-pink-400/10" },
                  { Icon: DIcons.LinkedIn, color: "hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-400/10" },
                  { Icon: DIcons.Facebook, color: "hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/10" },
                  { Icon: DIcons.X, color: "hover:text-sky-400 hover:border-sky-400/50 hover:bg-sky-400/10" },
                  { Icon: DIcons.YouTube, color: "hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/10" },
                ].map(({ Icon, color }, idx) => (
                  <Link
                    key={idx}
                    href="#"
                    className={`flex h-9 w-9 items-center justify-center rounded-full border border-slate-800/80 bg-slate-900/20 text-slate-400 transition-all duration-300 hover:-translate-y-0.5 ${color}`}
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Columns 2-6: Dynamic Link Columns */}
          {footerSections.map((section, idx) => {
            let colSpanClass = "col-span-1 lg:col-span-2";
            if (footerSections.length === 5) {
              if (idx === 4) colSpanClass = "col-span-1 lg:col-span-1";
            } else if (footerSections.length === 4) {
              if (idx === 0) colSpanClass = "col-span-1 lg:col-span-3";
            }
            return (
              <div key={section.id} className={colSpanClass}>
                <h4 className="mb-5 text-[13px] font-extrabold uppercase tracking-wider text-slate-100">
                  {section.name}
                </h4>
                <ul className="flex flex-col space-y-2.5">
                  {section.items.map((item: any) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="group flex items-center text-[13.5px] leading-relaxed text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="w-full border-b border-slate-800/80" />
      </div>

      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-5 px-4 py-4 sm:px-6 sm:py-6 md:flex-row lg:px-8">
        {/* Sign Up Button (Left on Desktop, Centered on Mobile) */}
        <div className="flex justify-center md:justify-start">
          <Link
            href="/signup"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent("open-signup"));
            }}
            className="group relative p-[1px] inline-flex items-center justify-center overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.03]"
          >
            {/* Spinning gradient background for border */}
            <span className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_60%,#f97316_80%,#ef4444_90%,transparent_100%)] animate-[spin_3.5s_linear_infinite]" />
            
            {/* Inner Dark Body */}
            <span className="relative flex items-center justify-center gap-2 rounded-full bg-[#0F131E] px-7 py-2.5 text-[13px] font-bold uppercase tracking-wider text-slate-300 transition-colors duration-300 group-hover:bg-[#161B29] group-hover:text-white">
              Sign Up / Register
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </div>

        {/* Contact Buttons (Right on Desktop, Centered on Mobile) */}
        <div className="flex flex-wrap justify-center items-center gap-3 md:justify-end">
          {/* Toll Free Button */}
          <a
            href="tel:18001216201"
            className={`${contactLinkClass} hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)]`}
          >
            <Phone className="h-4 w-4 shrink-0 text-red-500" />
            <span className="whitespace-nowrap text-[13px] font-semibold text-slate-400 uppercase tracking-wider">
              Toll Free:
            </span>
            <span className="whitespace-nowrap text-[14px] font-extrabold text-white tracking-tight">
              1800-121-6201
            </span>
          </a>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/919355907564"
            target="_blank"
            rel="noopener noreferrer"
            className={`${contactLinkClass} hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]`}
          >
            <MessageCircle className="h-4 w-4 shrink-0 text-emerald-500" />
            <span className="whitespace-nowrap text-[13px] font-semibold text-slate-400 uppercase tracking-wider">
              WhatsApp:
            </span>
            <span className="whitespace-nowrap text-[14px] font-extrabold text-white tracking-tight">
              93559 07564
            </span>
          </a>
        </div>
      </div>

      <ChildFooter />
    </footer>
  );
}
