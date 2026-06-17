import Link from "next/link";
import { ArrowRight, GraduationCap, CheckCircle2 } from "lucide-react";

export function FooterCta() {
  return (
    <div className="absolute left-4 right-4 -top-40 z-20 mx-auto max-w-6xl sm:-top-32 md:px-6 lg:-top-24">
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1120]/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-red-500/20 blur-[100px]" />
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-blue-600/20 blur-[100px]" />

        <div className="relative flex flex-col items-center justify-between gap-8 px-8 py-12 md:flex-row md:px-16">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <GraduationCap className="h-8 w-8 text-red-500" />
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                Ready to Start Your <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                  Global Academic Journey?
                </span>
              </h2>

              <div className="mt-4 flex flex-wrap justify-center gap-3 md:justify-start">
                {[
                  "Globally Accredited",
                  "Flexible Online",
                  "Industry Experts",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-1.5 text-xs font-medium text-slate-400"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-red-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Small Button */}
          <div className="flex flex-col items-center gap-2 md:items-end">
            <Link
              href="/apply"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-[#0b1120] transition-all hover:scale-105 active:scale-95 shadow-[0_4px_15px_rgba(255,255,255,0.1)] hover:shadow-red-500/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                Apply Now
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
              Join 50,000+ Alumni
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
