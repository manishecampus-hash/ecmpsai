"use client";

import { ArrowRight, Check, Loader2 } from "lucide-react";

interface OtpProgressButtonProps {
  filled: number;
  length?: number;
  loading?: boolean;
  verified?: boolean;
  label?: string;
}

/**
 * Submit button that fills left-to-right as OTP digits are typed.
 * Two stacked copies of the label: a muted one on the track and a white one
 * on the fill, clipped to the fill width so the text colour flips exactly at
 * the fill edge.
 */
export function OtpProgressButton({
  filled,
  length = 6,
  loading = false,
  verified = false,
  label = "Verify & Proceed",
}: OtpProgressButtonProps) {
  const complete = filled >= length;
  const remaining = length - filled;
  const pct = loading || verified ? 100 : (Math.min(filled, length) / length) * 100;

  const content = verified ? (
    <>
      <Check className="h-4 w-4 stroke-[3]" />
      <span>Verified</span>
    </>
  ) : loading ? (
    <>
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>Verifying…</span>
    </>
  ) : complete ? (
    <>
      <span>{label}</span>
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </>
  ) : filled === 0 ? (
    <span>Enter the {length}-digit code</span>
  ) : (
    <span>
      {remaining} more digit{remaining > 1 ? "s" : ""}
    </span>
  );

  return (
    <button
      type="submit"
      disabled={!complete || loading || verified}
      aria-live="polite"
      className="group relative h-12 w-full overflow-hidden rounded-2xl bg-slate-100 text-sm font-semibold ring-1 ring-inset ring-slate-200 transition-transform active:scale-[0.99] disabled:cursor-default"
    >
      <span className="flex h-full items-center justify-center gap-2 text-slate-500">{content}</span>

      <span
        aria-hidden
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
        className={`absolute inset-0 flex items-center justify-center gap-2 bg-gradient-to-r text-white transition-[clip-path] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          verified ? "from-emerald-500 to-emerald-600" : "from-red-600 to-rose-500"
        }`}
      >
        {content}
        {loading && (
          <span
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{ animation: "shimmer 1.1s ease-in-out infinite" }}
          />
        )}
      </span>
    </button>
  );
}
