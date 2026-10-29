import { Crown } from "lucide-react";
import { TOP_EARNERS, formatINR } from "@/data/referral-programs";

const STEP = 50000;

// ₹1.86L / ₹96.5K — short enough to sit above a narrow column
const short = (n: number) => (n >= 1e5 ? `₹${+(n / 1e5).toFixed(2)}L` : n >= 1e3 ? `₹${+(n / 1e3).toFixed(1)}K` : `₹${n}`);

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

// Column chart of the top referrers. Bars grow in when the section scrolls into view (via RevealObserver),
// the top three are highlighted, and hovering or focusing a bar shows that referrer's details. CSS only.
export default function EarnersChart() {
  const earners = TOP_EARNERS;
  const top = earners[0].amount;
  const scaleMax = Math.ceil((top * 1.08) / STEP) * STEP;
  const ticks = Array.from({ length: scaleMax / STEP + 1 }, (_, i) => scaleMax - i * STEP);
  const total = earners.reduce((s, e) => s + e.amount, 0);
  const referrals = earners.reduce((s, e) => s + e.referrals, 0);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-white">Rewards earned by our top referrers</p>
        <span className="flex-shrink-0 whitespace-nowrap rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/80">This quarter</span>
      </div>

      <div className="mt-6 flex gap-2 sm:gap-3">
        {/* Y axis */}
        <div className="flex h-[220px] w-10 flex-shrink-0 flex-col justify-between text-right text-[10px] tabular-nums text-white/50 sm:w-11 sm:text-[11px]">
          {ticks.map((t) => (
            <span key={t} className="-translate-y-1/2 first:translate-y-0 last:translate-y-0">
              {short(t).replace(".00", "")}
            </span>
          ))}
        </div>

        <div className="min-w-0 flex-1">
          <div className="relative h-[220px]">
            {/* Gridlines */}
            <div aria-hidden className="absolute inset-0 flex flex-col justify-between">
              {ticks.map((t) => (
                <span key={t} className={`border-t ${t === 0 ? "border-white/25" : "border-dashed border-white/[0.08]"}`} />
              ))}
            </div>

            <ol className="absolute inset-0 flex items-end gap-1.5 sm:gap-3">
              {earners.map((e, i) => {
                const pct = (e.amount / scaleMax) * 100;
                const lead = i < 3;
                return (
                  <li
                    key={e.name}
                    tabIndex={0}
                    aria-label={`Rank ${i + 1}: ${e.name}, ${e.city}, ${e.referrals} referrals, ${formatINR(e.amount)}`}
                    className="group relative flex h-full min-w-0 flex-1 justify-center outline-none"
                  >
                    {/* Bar */}
                    <span
                      className={`absolute bottom-0 w-full max-w-[52px] origin-bottom rounded-t-md transition-[transform,background-color] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:scale-y-0 [.is-visible_&]:scale-y-100 [@media(scripting:none)]:!scale-y-100 ${
                        i === 0 ? "bg-red-500" : lead ? "bg-red-500/70" : "bg-white/20"
                      } group-hover:bg-red-400 group-focus-visible:bg-red-400`}
                      style={{ height: `${pct}%`, transitionDelay: `${150 + i * 90}ms` }}
                    >
                      <span className="absolute inset-x-0 bottom-1.5 text-center text-[10px] font-bold text-white/80 sm:text-xs">{i + 1}</span>
                    </span>

                    {/* Value label (and a crown for the leader) */}
                    <span
                      className="absolute flex -translate-y-1.5 flex-col items-center opacity-0 transition-opacity duration-500 [.is-visible_&]:opacity-100 motion-reduce:opacity-100 [@media(scripting:none)]:opacity-100"
                      style={{ bottom: `${pct}%`, transitionDelay: `${700 + i * 90}ms` }}
                    >
                      {i === 0 && <Crown className="mb-0.5 h-4 w-4 text-amber-400" aria-hidden />}
                      <span className="whitespace-nowrap text-[10px] font-bold tabular-nums text-white sm:text-[11px]">{short(e.amount)}</span>
                    </span>

                    {/* Hover details */}
                    <span
                      role="presentation"
                      className="pointer-events-none absolute z-20 w-max -translate-y-12 scale-95 rounded-lg bg-white px-3 py-2 text-left opacity-0 shadow-xl transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
                      style={{ bottom: `${pct}%` }}
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-50 text-[10px] font-bold text-red-600">{initials(e.name)}</span>
                        <span>
                          <span className="block text-xs font-bold text-gray-900">{e.name}</span>
                          <span className="block text-[11px] text-gray-600">
                            {e.city} · {e.referrals} referrals
                          </span>
                        </span>
                      </span>
                      <span className="mt-1.5 block text-sm font-extrabold tabular-nums text-gray-900">{formatINR(e.amount)}</span>
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* X axis: names */}
          <ol aria-hidden className="mt-2 flex gap-1.5 sm:gap-3">
            {earners.map((e, i) => (
              <li key={e.name} className={`min-w-0 flex-1 truncate text-center text-[10px] sm:text-xs ${i < 3 ? "font-semibold text-white" : "text-white/60"}`}>
                {e.name.split(" ")[0]}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Small summary */}
      <dl className="mt-6 grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-4 text-center">
        <div>
          <dt className="text-[11px] text-white/60">Earned by top 7</dt>
          <dd className="mt-0.5 text-sm font-bold tabular-nums text-white">{formatINR(total)}</dd>
        </div>
        <div>
          <dt className="text-[11px] text-white/60">Friends referred</dt>
          <dd className="mt-0.5 text-sm font-bold tabular-nums text-white">{referrals}</dd>
        </div>
        <div>
          <dt className="text-[11px] text-white/60">Top reward</dt>
          <dd className="mt-0.5 text-sm font-bold tabular-nums text-white">{formatINR(top)}</dd>
        </div>
      </dl>
    </div>
  );
}
