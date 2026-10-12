import { CalendarDays, Clock3 } from "lucide-react";
import type { ApplicationProgram } from "./types";
import { formatLongDate } from "./options";

// "You are applying for" card. `compact` is the smaller version used in side panels.
export default function ProgramCard({
  program,
  compact = false,
}: {
  program: ApplicationProgram;
  compact?: boolean;
}) {
  const start = formatLongDate(program.startDate);

  if (compact) {
    return (
      <div className="flex items-start gap-3">
        {program.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={program.image}
            alt=""
            className="h-14 w-14 flex-shrink-0 rounded-xl object-cover ring-1 ring-slate-200"
          />
        )}
        <div className="min-w-0">
          <p className="text-sm font-bold leading-snug text-slate-900">{program.programName}</p>
          <p className="mt-0.5 text-xs leading-snug text-slate-500">{program.universityName}</p>
          <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-medium text-slate-500">
            {program.durationLabel && (
              <span className="inline-flex items-center gap-1">
                <Clock3 className="h-3 w-3" /> {program.durationLabel}
              </span>
            )}
            {start && (
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="h-3 w-3" /> Starts {start}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3.5 text-left shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-4">
      {program.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={program.image}
          alt={`${program.universityName} campus`}
          className="h-20 w-20 flex-shrink-0 rounded-xl object-cover sm:h-[104px] sm:w-[116px]"
        />
      )}
      <div className="min-w-0">
        <p className="text-[15px] font-bold leading-snug text-slate-900 sm:text-lg">
          {program.programName} by {program.universityName}
        </p>
        {(program.durationLabel || start) && (
          <p className="mt-2 text-xs text-slate-500 sm:text-sm">
            {program.durationLabel}
            {program.durationLabel && start && <span className="mx-1.5 text-slate-300">|</span>}
            {start && (
              <>
                Starts at: <span className="font-bold text-slate-900">{start}</span>
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
