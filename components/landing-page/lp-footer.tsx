import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

/** Slim landing-page footer (no menu columns): logo, call number, copyright and legal links. */
export default function LpFooter() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-4 py-6 text-center sm:px-6 md:flex-row md:justify-between md:text-left lg:px-8">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <div className="relative h-9 w-32">
            <Image src="/image/logo.png" alt="eCampus" fill sizes="128px" className="object-contain md:object-left" />
          </div>
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} eCampus. All rights reserved.</p>
        </div>

        <a
          href="tel:+919355907564"
          className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-700 transition-colors hover:border-red-600 hover:bg-red-600 hover:text-white"
        >
          <Phone className="h-4 w-4" /> Call us: 93559 07564
        </a>

        <nav aria-label="Legal" className="flex items-center gap-4 text-xs font-semibold text-slate-500">
          <Link href="/privacy-policy" className="hover:text-slate-900">
            Privacy Policy
          </Link>
          <span aria-hidden className="h-3 w-px bg-slate-300" />
          <Link href="/terms-and-conditions" className="hover:text-slate-900">
            Terms &amp; Conditions
          </Link>
        </nav>
      </div>
    </footer>
  );
}
