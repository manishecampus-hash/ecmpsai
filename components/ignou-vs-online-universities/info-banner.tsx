"use client";

export function InfoBanner() {
  return (
    <section className="relative py-8 px-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1000px]">
        {/* Left-aligned info banner with icon */}
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 rounded-2xl border border-red-100 bg-gradient-to-r from-red-50/60 to-red-50/30 px-6 py-8 sm:px-8 sm:py-6 backdrop-blur-sm">
          {/* Icon/Alert badge */}
          <div className="flex-shrink-0">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#ff3b4d]/10 text-2xl">
              ⚠️
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#ff3b4d]">
                Completion Reality Check
              </p>

              <p className="max-w-2xl text-[15px] leading-6 text-slate-700 sm:text-[16px] sm:leading-7">
                <span className="block sm:inline">
                  Most distance learners don't finish.{" "}
                </span>
                <span className="font-bold text-[#0f1f3d]">
                  Learn why successful students complete & others don't.
                </span>
              </p>
            </div>
          </div>

          {/* CTA Badge */}
          <div className="flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#0f1f3d] px-4 py-2.5 text-xs font-bold text-white sm:text-sm">
              <span>See Stats</span>
              <span className="text-lg">→</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
