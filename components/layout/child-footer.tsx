import Link from "next/link";

export default function ChildFooter() {
  return (
    <div className="bg-[#1b1e20] px-4 pt-8 pb-8 sm:pt-10 sm:pb-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 text-center text-[13px] sm:gap-5">
        {/* Links row */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-slate-300">
          <Link href="/terms" className="hover:text-red-500 transition-colors">
            Terms &amp; Condition
          </Link>
          <span className="hidden sm:inline text-slate-600">|</span>
          <Link href="/privacy" className="hover:text-red-500 transition-colors">
            Privacy Policy
          </Link>
          <span className="hidden sm:inline text-slate-600">|</span>
          <Link
            href="/cancellation-refund"
            className="hover:text-red-500 transition-colors"
          >
            Cancellation &amp; Refund
          </Link>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="text-slate-300">ISO 27001:2013</span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="text-slate-300">ISO 9001:2015</span>
        </div>

        {/* Copyright */}
        <p className="text-slate-400">
          ©2018 - 2026 | Ecampus Technologies Pvt Ltd. | All rights reserved.
        </p>

        {/* Built with love */}
        <p className="text-slate-400">
          Built with <span className="text-red-500">&#10084;</span> in India.
        </p>
      </div>
    </div>
  );
}