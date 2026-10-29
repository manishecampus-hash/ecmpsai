"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Table2, TrendingDown } from "lucide-react";
import { INTEREST_COLOR, PRINCIPAL_COLOR, inr, inrShort, type YearRow } from "./emi-math";

type View = "split" | "balance" | "table";

const VIEWS: { id: View; label: string; icon: typeof BarChart3 }[] = [
  { id: "split", label: "Yearly breakdown", icon: BarChart3 },
  { id: "balance", label: "Loan balance", icon: TrendingDown },
  { id: "table", label: "Table", icon: Table2 },
];

const EASE = [0.22, 1, 0.36, 1] as const;

// Round the axis top up to a clean 1 / 2 / 2.5 / 5 step so the gridlines read well
function niceScale(max: number, ticks = 4) {
  if (max <= 0) return { top: 1, step: 0.25 };
  const raw = max / ticks;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? raw;
  return { top: step * ticks, step };
}

export default function AmortizationChart({ rows, loanAmount }: { rows: YearRow[]; loanAmount: number }) {
  const [view, setView] = useState<View>("split");
  const [active, setActive] = useState<number | null>(null);

  const max = view === "balance" ? loanAmount : Math.max(...rows.map((r) => r.principal + r.interest), 0);
  const { top, step } = niceScale(max);
  const ticks = Array.from({ length: Math.round(top / step) + 1 }, (_, i) => i * step).reverse();
  const hovered = active !== null ? rows[active] : null;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Your repayment schedule</h2>
          <p className="mt-0.5 text-sm text-gray-500">How every year of EMIs is split between your loan and its interest.</p>
        </div>
        <div role="tablist" aria-label="Schedule view" className="relative flex rounded-xl bg-gray-100 p-1">
          {VIEWS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={view === id}
              onClick={() => {
                setView(id);
                setActive(null);
              }}
              className={`relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                view === id ? "text-gray-900" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {view === id && (
                <motion.span layoutId="emi-view" transition={{ type: "spring", stiffness: 420, damping: 34 }} className="absolute inset-0 rounded-lg bg-white shadow-sm" />
              )}
              <Icon className="relative h-3.5 w-3.5" aria-hidden />
              <span className="relative">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {view === "table" ? (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
            className="mt-5 overflow-x-auto rounded-xl border border-gray-100"
          >
            <table className="w-full min-w-[480px] text-sm">
              <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3">Year</th>
                  <th className="px-4 py-3 text-right">Principal paid</th>
                  <th className="px-4 py-3 text-right">Interest paid</th>
                  <th className="px-4 py-3 text-right">Total paid</th>
                  <th className="px-4 py-3 text-right">Balance left</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((r) => (
                  <tr key={r.year} className="transition-colors hover:bg-red-50/40">
                    <td className="px-4 py-2.5 font-semibold text-gray-900">Year {r.year}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-700">{inr(r.principal)}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-700">{inr(r.interest)}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums font-semibold text-gray-900">{inr(r.principal + r.interest)}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-700">{inr(r.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        ) : (
          <motion.div
            key="chart"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
            className="mt-5"
          >
            {/* Legend */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-gray-600">
              {view === "split" ? (
                <>
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: PRINCIPAL_COLOR }} />
                    Principal paid
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: INTEREST_COLOR }} />
                    Interest paid
                  </span>
                </>
              ) : (
                <span className="text-gray-500">Amount still owed at the end of each year</span>
              )}
              <span className="ml-auto text-gray-400">Hover a bar for details</span>
            </div>

            <div className="relative mt-4 flex h-[260px] gap-3">
              {/* Y axis */}
              <div className="flex w-12 flex-shrink-0 flex-col justify-between pb-6 text-right text-[11px] tabular-nums text-gray-400">
                {ticks.map((t) => (
                  <span key={t} className="-translate-y-1/2 first:translate-y-0 last:translate-y-0">
                    {inrShort(t)}
                  </span>
                ))}
              </div>

              <div className="relative min-w-0 flex-1">
                {/* Recessive gridlines */}
                <div aria-hidden className="absolute inset-x-0 bottom-6 top-0 flex flex-col justify-between">
                  {ticks.map((t) => (
                    <span key={t} className={`border-t ${t === 0 ? "border-gray-300" : "border-dashed border-gray-100"}`} />
                  ))}
                </div>

                {/* Bars */}
                <div className="absolute inset-0 flex items-stretch gap-1 sm:gap-2" onMouseLeave={() => setActive(null)}>
                  {rows.map((r, i) => {
                    const pH = (r.principal / top) * 100;
                    const iH = (r.interest / top) * 100;
                    const bH = (r.balance / top) * 100;
                    const isActive = active === i;
                    return (
                      <button
                        key={r.year}
                        type="button"
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        onBlur={() => setActive(null)}
                        aria-label={`Year ${r.year}: principal ${inr(r.principal)}, interest ${inr(r.interest)}, balance ${inr(r.balance)}`}
                        className="group relative flex min-w-0 flex-1 flex-col items-center outline-none"
                      >
                        {/* Column hit area highlight */}
                        <span className={`absolute inset-x-0 bottom-6 top-0 rounded-md transition-colors ${isActive ? "bg-gray-50" : ""}`} />
                        <span className="relative flex w-full max-w-[44px] flex-1 flex-col justify-end">
                          {view === "split" ? (
                            <>
                              <motion.span
                                initial={{ height: 0 }}
                                animate={{ height: `${iH}%` }}
                                transition={{ duration: 0.6, ease: EASE, delay: i * 0.03 }}
                                className="block rounded-t-[4px]"
                                style={{ backgroundColor: INTEREST_COLOR, opacity: active !== null && !isActive ? 0.45 : 1 }}
                              />
                              <span className="block h-[2px] flex-shrink-0 bg-white" />
                              <motion.span
                                initial={{ height: 0 }}
                                animate={{ height: `${pH}%` }}
                                transition={{ duration: 0.6, ease: EASE, delay: i * 0.03 }}
                                className="block"
                                style={{ backgroundColor: PRINCIPAL_COLOR, opacity: active !== null && !isActive ? 0.45 : 1 }}
                              />
                            </>
                          ) : (
                            <motion.span
                              initial={{ height: 0 }}
                              animate={{ height: `${bH}%` }}
                              transition={{ duration: 0.6, ease: EASE, delay: i * 0.03 }}
                              className="block rounded-t-[4px]"
                              style={{ backgroundColor: PRINCIPAL_COLOR, opacity: active !== null && !isActive ? 0.45 : 1 }}
                            />
                          )}
                        </span>
                        <span className={`relative mt-1.5 h-[18px] text-[11px] font-medium ${isActive ? "text-gray-900" : "text-gray-400"}`}>
                          Y{r.year}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Tooltip */}
                <AnimatePresence>
                  {hovered && active !== null && (
                    <motion.div
                      key="tip"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      transition={{ duration: 0.15 }}
                      className="pointer-events-none absolute top-2 z-10 w-44 rounded-xl border border-gray-200 bg-white p-3 text-xs shadow-lg"
                      // Sits beside the hovered column (right of it in the first half, left of it after) so it never hides the bar
                      style={
                        active < rows.length / 2
                          ? { left: `calc(${((active + 1) / rows.length) * 100}% + 6px)` }
                          : { right: `calc(${((rows.length - active) / rows.length) * 100}% + 6px)` }
                      }
                    >
                      <p className="font-bold text-gray-900">Year {hovered.year}</p>
                      <dl className="mt-1.5 space-y-1">
                        <div className="flex justify-between gap-2">
                          <dt className="flex items-center gap-1.5 text-gray-500">
                            <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: PRINCIPAL_COLOR }} />
                            Principal
                          </dt>
                          <dd className="font-semibold tabular-nums text-gray-900">{inr(hovered.principal)}</dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt className="flex items-center gap-1.5 text-gray-500">
                            <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: INTEREST_COLOR }} />
                            Interest
                          </dt>
                          <dd className="font-semibold tabular-nums text-gray-900">{inr(hovered.interest)}</dd>
                        </div>
                        <div className="flex justify-between gap-2 border-t border-gray-100 pt-1">
                          <dt className="text-gray-500">Balance left</dt>
                          <dd className="font-semibold tabular-nums text-gray-900">{inr(hovered.balance)}</dd>
                        </div>
                      </dl>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
