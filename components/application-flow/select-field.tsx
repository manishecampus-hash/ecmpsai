"use client";

import { useRef, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Search } from "lucide-react";

// Custom dropdown for the application form: Radix Popover handles positioning, focus and
// outside-click; cmdk handles keyboard navigation and (for long lists) search.
export default function SelectField({
  id,
  value,
  onChange,
  options,
  placeholder,
  error,
  searchable = options.length > 8,
  searchPlaceholder = "Search…",
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  error?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const commandRef = useRef<HTMLDivElement>(null);

  const focusList = () => {
    // Short lists have no search box — focus the list itself so arrow keys work
    if (!searchable) commandRef.current?.focus();
    // Bring the current choice into view in long lists
    requestAnimationFrame(() =>
      commandRef.current?.querySelector('[cmdk-item][data-selected="true"]')?.scrollIntoView({ block: "nearest" }),
    );
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          id={id}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-invalid={Boolean(error)}
          className={`group flex h-11 w-full items-center justify-between gap-2 rounded-xl border bg-white px-3.5 text-left text-sm outline-none transition focus-visible:border-red-400 focus-visible:shadow-[0_0_0_3px_rgba(238,44,60,0.12)] ${
            open
              ? "border-red-400 shadow-[0_0_0_3px_rgba(238,44,60,0.12)]"
              : error
                ? "border-red-300 bg-red-50/30"
                : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <span className={`truncate ${value ? "text-slate-900" : "text-slate-400"}`}>{value || placeholder}</span>
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
              onOpenAutoFocus={(e) => {
                if (!searchable) e.preventDefault();
                focusList();
              }}
              style={{ width: "var(--radix-popover-trigger-width)" }}
            >
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="z-[60] origin-[var(--radix-popover-content-transform-origin)] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_16px_40px_-12px_rgba(15,23,42,0.25)]"
              >
                <Command ref={commandRef} loop defaultValue={value || undefined} tabIndex={-1} className="outline-none">
                  {searchable && (
                    <div className="flex items-center gap-2 border-b border-slate-100 px-3">
                      <Search className="h-4 w-4 flex-shrink-0 text-slate-400" />
                      <Command.Input
                        placeholder={searchPlaceholder}
                        className="h-10 w-full border-0 bg-transparent p-0 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-0 focus:bg-transparent focus:shadow-none focus:outline-none focus:ring-0"
                      />
                    </div>
                  )}
                  <Command.List role="listbox" className="max-h-64 overflow-y-auto overscroll-contain p-1.5">
                    <Command.Empty className="px-3 py-6 text-center text-sm text-slate-500">No matches found</Command.Empty>
                    {options.map((option) => {
                      const selected = option === value;
                      return (
                        <Command.Item
                          key={option}
                          value={option}
                          onSelect={() => {
                            onChange(option);
                            setOpen(false);
                          }}
                          className="flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none transition-colors data-[selected=true]:bg-red-50/70 data-[selected=true]:text-slate-900"
                        >
                          <span className={`truncate ${selected ? "font-semibold text-[#ee2c3c]" : ""}`}>{option}</span>
                          {selected && <Check className="h-4 w-4 flex-shrink-0 text-[#ee2c3c]" strokeWidth={2.5} />}
                        </Command.Item>
                      );
                    })}
                  </Command.List>
                </Command>
              </motion.div>
            </Popover.Content>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  );
}
