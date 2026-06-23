import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function FooterCta() {
  return (
    <div className="absolute left-4 right-4 -top-40 z-20 mx-auto max-w-6xl sm:-top-32 md:px-6 lg:-top-24">
      <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-[#E1D9D1] shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
        <div className="relative flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Image — flush left, full height, no padding */}
          <div className="flex w-full shrink-0 items-center justify-center md:w-64 md:self-stretch">
            <div className="relative h-48 w-full md:h-full md:min-h-[160px]">
              <Image
                src="/cta/cta.png"
                alt="CTA"
                fill
                className="object-contain object-center md:object-left p-4 md:p-6"
              />
            </div>
          </div>

          {/* Text + Button */}
          <div className="flex flex-1 flex-col items-center justify-between gap-6 py-10 pr-8 md:flex-row md:items-center">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold leading-tight text-slate-800 sm:text-3xl lg:text-4xl">
                Ready to Start Your <br className="hidden md:block" />
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
                    className="flex items-center gap-1.5 text-xs font-medium text-slate-500"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-slate-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 shrink-0">
              <Link
                href="/apply"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-slate-800 px-6 py-2.5 text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-md"
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
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider text-center">
                Join 50,000+ Alumni
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
