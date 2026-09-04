import Link from "next/link";

export default function ChildFooter() {
  return (
    <div className="bg-black/30 border-t border-slate-900/60 px-4 py-8">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-center gap-3.5 text-center text-[12.5px] sm:gap-4.5">
        {/* Links row */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-slate-400">
          <Link href="/terms" className="hover:text-red-500 transition-colors duration-300">
            Terms &amp; Condition
          </Link>
          <span className="hidden sm:inline text-slate-800">|</span>
          <Link href="/privacy" className="hover:text-red-500 transition-colors duration-300">
            Privacy Policy
          </Link>
          <span className="hidden sm:inline text-slate-800">|</span>
          <span className="text-slate-400">ISO 27001:2013</span>
          <span className="hidden sm:inline text-slate-800">|</span>
          <span className="text-slate-400">ISO 9001:2015</span>
        </div>

        {/* Copyright */}
        <p className="text-slate-500 text-[12px] tracking-wide">
          © 2018 - 2026 | Ecampus Technologies Pvt Ltd. | All rights reserved.
        </p>

        {/* Built with love */}
        <p className="text-slate-500 text-[11.5px] tracking-wide">
          Built with <span className="text-red-500 animate-pulse inline-block">&#10084;</span> in India.
        </p>
      </div>
    </div>
  );
}