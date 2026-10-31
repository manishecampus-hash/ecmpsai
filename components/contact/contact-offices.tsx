import { ChevronRight, ClipboardCheck, Headphones, MessageSquare } from "lucide-react";
import { REVEAL_UP } from "@/components/about/reveal";
import OfficeMap from "./office-map";

const STEPS = [
  { icon: MessageSquare, title: "You reach out", text: "Call, email or WhatsApp — whichever suits you." },
  { icon: Headphones, title: "We understand your goals", text: "A counsellor talks through your plans and budget." },
  { icon: ClipboardCheck, title: "You get a clear plan", text: "Program options, admission steps and next moves." },
];


export default function ContactOffices() {
  return (
    <>
      {/* What happens next — a compact strip: heading on the left, the three steps in one panel */}
      <section aria-labelledby="next-heading" className="border-y border-gray-100 bg-gray-50 py-12 lg:py-14">
        <div className="mx-auto grid w-full max-w-[1320px] items-center gap-8 px-5 sm:px-8 lg:w-[86%] lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12 lg:px-0">
          <div data-reveal className={REVEAL_UP}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-red-600">What happens next</p>
            <h2 id="next-heading" className="mt-2 text-[24px] font-bold leading-tight tracking-tight text-gray-900 sm:text-[28px]">
              From first message to a clear plan
            </h2>
          </div>

          <ol className="grid overflow-hidden rounded-2xl border border-gray-200 bg-white sm:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                data-reveal
                style={{ transitionDelay: `${i * 140}ms` }}
                className={`${REVEAL_UP} group relative border-gray-200 p-5 transition-colors duration-300 hover:bg-red-50/40 max-sm:[&:not(:last-child)]:border-b sm:[&:not(:last-child)]:border-r`}
              >
                {/* Arrow marker on the divider, pointing to the next step */}
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-red-600 shadow-sm sm:flex"
                  >
                    <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600 transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white">
                    <Icon className="h-[18px] w-[18px]" aria-hidden />
                  </span>
                  <span className="text-xs font-bold tabular-nums tracking-wider text-gray-400">0{i + 1}</span>
                </div>
                <h3 className="mt-3 text-[15px] font-bold text-gray-900">{title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-gray-600">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <OfficeMap />
    </>
  );
}
