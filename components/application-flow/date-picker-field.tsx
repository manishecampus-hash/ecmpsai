"use client";

import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { DayPicker } from "react-day-picker";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const YEARS_PER_PAGE = 16;

type View = "days" | "months" | "years";

const toISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const fromISO = (v: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : undefined;
};

const navButton =
  "flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:pointer-events-none disabled:opacity-30";

// Calendar date picker for the application form. Opens on a year grid when empty
// (year → month → day), which is far quicker than paging back decades for a birth date.
export default function DatePickerField({
  id,
  value,
  onChange,
  placeholder = "Select date",
  error,
  minDate,
  maxDate,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  minDate: Date;
  maxDate: Date;
}) {
  const selected = fromISO(value);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("days");
  const [month, setMonth] = useState<Date>(selected ?? new Date(1995, 0, 1));
  const [yearPageStart, setYearPageStart] = useState(1988);

  const minYear = minDate.getFullYear();
  const maxYear = maxDate.getFullYear();
  const year = month.getFullYear();

  const handleOpenChange = (next: boolean) => {
    if (next) {
      const base = selected ?? new Date(Math.min(1995, maxYear), 0, 1);
      setMonth(new Date(base.getFullYear(), base.getMonth(), 1));
      setView(selected ? "days" : "years");
      setYearPageStart(Math.max(minYear, base.getFullYear() - (base.getFullYear() - minYear) % YEARS_PER_PAGE));
    }
    setOpen(next);
  };

  const monthDisabled = (m: number, y = year) =>
    new Date(y, m + 1, 0) < minDate || new Date(y, m, 1) > maxDate;

  const shiftMonth = (delta: number) => setMonth(new Date(year, month.getMonth() + delta, 1));
  const canPrevMonth = new Date(year, month.getMonth(), 0) >= new Date(minYear, minDate.getMonth(), 1);
  const canNextMonth = new Date(year, month.getMonth() + 1, 1) <= maxDate;

  const pageYears = Array.from({ length: YEARS_PER_PAGE }, (_, i) => yearPageStart + i);

  const header = (() => {
    if (view === "years")
      return {
        label: `${pageYears[0]} – ${Math.min(pageYears[YEARS_PER_PAGE - 1], maxYear)}`,
        onLabel: undefined,
        prev: () => setYearPageStart((s) => Math.max(minYear, s - YEARS_PER_PAGE)),
        next: () => setYearPageStart((s) => s + YEARS_PER_PAGE),
        canPrev: yearPageStart > minYear,
        canNext: yearPageStart + YEARS_PER_PAGE <= maxYear,
      };
    if (view === "months")
      return {
        label: String(year),
        onLabel: () => setView("years"),
        prev: () => setMonth(new Date(year - 1, month.getMonth(), 1)),
        next: () => setMonth(new Date(year + 1, month.getMonth(), 1)),
        canPrev: year > minYear,
        canNext: year < maxYear,
      };
    return {
      label: null,
      onLabel: undefined,
      prev: () => shiftMonth(-1),
      next: () => shiftMonth(1),
      canPrev: canPrevMonth,
      canNext: canNextMonth,
    };
  })();

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger asChild>
        <button
          type="button"
          id={id}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-invalid={Boolean(error)}
          className={`group flex h-11 w-full items-center gap-2.5 rounded-xl border bg-white px-3.5 text-left text-sm outline-none transition focus-visible:border-red-400 focus-visible:shadow-[0_0_0_3px_rgba(238,44,60,0.12)] ${
            open
              ? "border-red-400 shadow-[0_0_0_3px_rgba(238,44,60,0.12)]"
              : error
                ? "border-red-300 bg-red-50/30"
                : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <CalendarDays className={`h-4 w-4 flex-shrink-0 ${open || selected ? "text-[#ee2c3c]" : "text-slate-400"}`} />
          <span className={`flex-1 truncate ${selected ? "text-slate-900" : "text-slate-400"}`}>
            {selected ? `${selected.getDate()} ${MONTHS_LONG[selected.getMonth()]} ${selected.getFullYear()}` : placeholder}
          </span>
          <ChevronDown
            className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-[#ee2c3c]" : "text-slate-400"}`}
          />
        </button>
      </Popover.Trigger>

      <AnimatePresence>
        {open && (
          <Popover.Portal forceMount>
            <Popover.Content forceMount asChild align="start" sideOffset={6} collisionPadding={12}>
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="z-[60] w-[312px] origin-[var(--radix-popover-content-transform-origin)] rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.25)] outline-none"
              >
                {/* Header: arrows + month / year switches */}
                <div className="mb-2 flex items-center justify-between gap-1">
                  <button type="button" onClick={header.prev} disabled={!header.canPrev} aria-label="Previous" className={navButton}>
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {view === "days" ? (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setView("months")}
                        className="rounded-lg px-2.5 py-1.5 text-sm font-bold text-slate-900 transition hover:bg-red-50 hover:text-[#ee2c3c]"
                      >
                        {MONTHS_LONG[month.getMonth()]}
                      </button>
                      <button
                        type="button"
                        onClick={() => setView("years")}
                        className="rounded-lg px-2.5 py-1.5 text-sm font-bold text-slate-900 transition hover:bg-red-50 hover:text-[#ee2c3c]"
                      >
                        {year}
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={header.onLabel}
                      disabled={!header.onLabel}
                      className="rounded-lg px-2.5 py-1.5 text-sm font-bold text-slate-900 transition enabled:hover:bg-red-50 enabled:hover:text-[#ee2c3c]"
                    >
                      {header.label}
                    </button>
                  )}

                  <button type="button" onClick={header.next} disabled={!header.canNext} aria-label="Next" className={navButton}>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={view}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.14 }}
                  >
                    {view === "years" && (
                      <div className="grid grid-cols-4 gap-1.5">
                        {pageYears.map((y) => {
                          const disabled = y < minYear || y > maxYear;
                          const active = selected?.getFullYear() === y;
                          return (
                            <button
                              key={y}
                              type="button"
                              disabled={disabled}
                              onClick={() => {
                                setMonth(new Date(y, month.getMonth(), 1));
                                setView("months");
                              }}
                              className={`h-11 rounded-xl text-sm font-semibold transition disabled:pointer-events-none disabled:text-slate-300 ${
                                active
                                  ? "bg-[#ee2c3c] text-white shadow-md shadow-red-500/30"
                                  : "text-slate-700 hover:bg-red-50 hover:text-[#ee2c3c]"
                              }`}
                            >
                              {y}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {view === "months" && (
                      <div className="grid grid-cols-3 gap-1.5">
                        {MONTHS.map((label, m) => {
                          const active = selected?.getFullYear() === year && selected?.getMonth() === m;
                          return (
                            <button
                              key={label}
                              type="button"
                              disabled={monthDisabled(m)}
                              onClick={() => {
                                setMonth(new Date(year, m, 1));
                                setView("days");
                              }}
                              className={`h-12 rounded-xl text-sm font-semibold transition disabled:pointer-events-none disabled:text-slate-300 ${
                                active
                                  ? "bg-[#ee2c3c] text-white shadow-md shadow-red-500/30"
                                  : "text-slate-700 hover:bg-red-50 hover:text-[#ee2c3c]"
                              }`}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {view === "days" && (
                      <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={(d) => {
                          if (!d) return;
                          onChange(toISO(d));
                          setOpen(false);
                        }}
                        month={month}
                        onMonthChange={setMonth}
                        disabled={[{ before: minDate }, { after: maxDate }]}
                        showOutsideDays
                        fixedWeeks
                        components={{ Caption: () => null }}
                        classNames={{
                          months: "",
                          month: "",
                          table: "w-full border-collapse",
                          head_row: "flex",
                          head_cell: "w-10 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-400",
                          row: "mt-1 flex w-full",
                          cell: "h-10 w-10 p-0 text-center",
                          day: "h-10 w-10 rounded-full text-sm font-medium text-slate-700 outline-none transition hover:bg-red-50 hover:text-[#ee2c3c] focus-visible:ring-2 focus-visible:ring-red-300",
                          day_selected:
                            "!bg-[#ee2c3c] !text-white font-bold shadow-md shadow-red-500/30 hover:!bg-[#d92233]",
                          day_today: "ring-1 ring-inset ring-red-200",
                          day_outside: "text-slate-300",
                          day_disabled: "!text-slate-300 opacity-60 hover:!bg-transparent cursor-not-allowed",
                        }}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                <p className="mt-2 border-t border-slate-100 pt-2.5 text-center text-[11px] text-slate-400">
                  {view === "years" ? "Pick your birth year" : view === "months" ? "Pick the month" : "Pick the day"}
                </p>
              </motion.div>
            </Popover.Content>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  );
}
