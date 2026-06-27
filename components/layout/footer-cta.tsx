import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function FooterCta() {
  return (
    <div className="absolute inset-x-0 -top-56 z-20 mx-auto max-w-6xl px-2 sm:px-4 md:px-6 sm:-top-40 md:-top-32 lg:-top-24">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-[#E1D9D1] shadow-[0_20px_50px_rgba(0,0,0,0.05)] md:rounded-[32px]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Image */}
          <div className="flex w-full shrink-0 items-center justify-center md:w-64 md:self-stretch">
            <div className="relative h-[170px] w-full sm:h-[200px] md:h-full md:min-h-[160px]">
              <Image
                src="/cta/cta.png"
                alt="CTA"
                fill
                priority
                className="object-contain object-center p-0 md:object-left md:p-6"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col items-center gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-0 md:py-10 md:pr-8">
            {/* Text */}
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold leading-tight text-slate-800 sm:text-2xl lg:text-4xl">
                Ready to Start Your
                <br className="hidden md:block" />
                Global Academic Journey?
              </h2>

              <div className="mt-4 flex flex-wrap justify-center gap-3 md:justify-start">
                {[
                  "Globally Accredited",
                  "Flexible Online",
                  "Industry Experts",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 sm:text-xs"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-slate-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Button */}
            <div className="flex shrink-0 flex-col items-center gap-2">
              <Link
                href="/apply"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-slate-800 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:scale-105 active:scale-95"
              >
                <span
                  className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                  aria-hidden="true"
                />

                <span className="relative z-10 flex items-center gap-2">
                  Apply Now
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>

              <p className="text-center text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Join 50,000+ Alumni
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
