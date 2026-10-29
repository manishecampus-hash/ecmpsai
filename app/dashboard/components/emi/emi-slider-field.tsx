"use client";

import { useEffect, useState } from "react";

// Slider with an editable value box beside it — type an exact figure or drag
export default function EmiSliderField({
  id,
  label,
  value,
  min,
  max,
  step,
  prefix,
  suffix,
  format,
  minLabel,
  maxLabel,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  format: (n: number) => string;
  minLabel: string;
  maxLabel: string;
  onChange: (value: number) => void;
}) {
  const [draft, setDraft] = useState(format(value));
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    if (!editing) setDraft(format(value));
  }, [value, editing, format]);

  const commit = () => {
    setEditing(false);
    const n = Number(draft.replace(/[^\d.]/g, ""));
    if (!Number.isFinite(n) || draft.trim() === "") return setDraft(format(value));
    const clamped = Math.min(max, Math.max(min, n));
    onChange(clamped);
    setDraft(format(clamped));
  };

  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="flex h-10 min-w-[128px] items-center justify-end gap-1 rounded-lg border border-red-100 bg-red-50/70 px-3 transition focus-within:border-red-400 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(238,44,60,0.12)]">
          {prefix && <span className="text-sm font-bold text-red-700">{prefix}</span>}
          <input
            aria-label={`${label} value`}
            inputMode="decimal"
            value={draft}
            onFocus={() => setEditing(true)}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => e.key === "Enter" && (e.currentTarget as HTMLInputElement).blur()}
            className="min-w-0 border-0 bg-transparent p-0 text-right text-sm font-bold text-red-700 outline-none focus:ring-0"
            style={{ width: `${Math.max(draft.length, 2) + 0.5}ch` }}
          />
          {suffix && <span className="text-sm font-bold text-red-700">{suffix}</span>}
        </div>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ background: `linear-gradient(to right, #dc2626 ${pct}%, #e5e7eb ${pct}%)` }}
        className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-red-600 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-red-600 [&::-webkit-slider-thumb]:shadow-[0_1px_6px_rgba(220,38,38,0.45)] [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-110"
      />
      <div className="mt-1.5 flex justify-between text-[11px] font-medium text-gray-400">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
