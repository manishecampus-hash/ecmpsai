"use client";

import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Check, ChevronDown, X } from "lucide-react";

// Multi-pick dropdown in the same style as the application form's SelectField
export default function CourseMultiSelect({
  id,
  value,
  onChange,
  options,
  error,
}: {
  id: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const toggle = (option: string) =>
    onChange(value.includes(option) ? value.filter((v) => v !== option) : [...value, option]);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          id={id}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={`group flex min-h-[44px] w-full items-center gap-2.5 rounded-xl border bg-white px-3.5 py-1.5 text-left text-sm outline-none transition focus-visible:border-red-400 focus-visible:shadow-[0_0_0_3px_rgba(238,44,60,0.12)] ${
            open
              ? "border-red-400 shadow-[0_0_0_3px_rgba(238,44,60,0.12)]"
              : error
                ? "border-red-300 bg-red-50/30"
                : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <BookOpen className="h-4 w-4 flex-shrink-0 text-slate-400" aria-hidden />
          <span className="flex min-w-0 flex-1 flex-wrap gap-1.5">
            {value.length === 0 ? (
              <span className="py-1 text-slate-400">Select interested courses</span>
            ) : (
              value.map((course) => (
                <span
                  key={course}
                  className="inline-flex items-center gap-1 rounded-full bg-red-50 py-1 pl-2.5 pr-1.5 text-xs font-semibold text-red-700"
                >
                  {course}
                  <span
                    role="button"
                    tabIndex={-1}
                    aria-label={`Remove ${course}`}
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(course);
                    }}
                    className="flex h-4 w-4 items-center justify-center rounded-full text-red-500 transition hover:bg-red-100 hover:text-red-700"
                  >
                    <X className="h-3 w-3" />
                  </span>
                </span>
              ))
            )}
          </span>
          <ChevronDown
            className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${
              open ? "rotate-180 text-[#ee2c3c]" : "text-slate-400 group-hover:text-slate-500"
            }`}
          />
        </button>
      </Popover.Trigger>

      <AnimatePresence>
        {open && (
          <Popover.Portal forceMount>
            <Popover.Content
              forceMount
              asChild
              align="start"
              sideOffset={6}
              collisionPadding={12}
              style={{ width: "var(--radix-popover-trigger-width)" }}
            >
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="z-[60] origin-[var(--radix-popover-content-transform-origin)] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_16px_40px_-12px_rgba(15,23,42,0.25)]"
              >
                <div role="listbox" aria-multiselectable="true" className="grid max-h-64 gap-0.5 overflow-y-auto overscroll-contain p-1.5 sm:grid-cols-2">
                  {options.map((option) => {
                    const selected = value.includes(option);
                    return (
                      <button
                        key={option}
                        type="button"
                        role="option"
                        aria-selected={selected}
                        onClick={() => toggle(option)}
                        className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                          selected ? "bg-red-50/70 font-semibold text-[#ee2c3c]" : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span
                          className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition ${
                            selected ? "border-[#ee2c3c] bg-[#ee2c3c] text-white" : "border-slate-300 bg-white"
                          }`}
                        >
                          {selected && <Check className="h-3 w-3" strokeWidth={3} />}
                        </span>
                        <span className="truncate">{option}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 px-3 py-2">
                  <span className="text-xs text-slate-500">{value.length} selected</span>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-600"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            </Popover.Content>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  );
}
