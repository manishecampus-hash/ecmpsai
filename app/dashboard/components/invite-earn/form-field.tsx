import type { InputHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

// Labelled input with a leading icon, shared by the Invite & Earn forms
export default function FormField({
  id,
  label,
  icon: Icon,
  error,
  hint,
  children,
  ...input
}: {
  id: string;
  label: string;
  icon?: LucideIcon;
  error?: string;
  hint?: string;
  children?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-semibold text-gray-800">
        {label} <span className="text-red-600">*</span>
      </label>
      {children ?? (
        <div className="relative">
          {Icon && <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />}
          <input
            id={id}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`h-11 w-full rounded-xl border bg-white pr-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(238,44,60,0.12)] ${
              Icon ? "pl-10" : "pl-3.5"
            } ${error ? "border-red-300 bg-red-50/30" : "border-slate-200 hover:border-slate-300"}`}
            {...input}
          />
        </div>
      )}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs font-medium text-red-600">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1 text-[11px] text-gray-400">{hint}</p>
      )}
    </div>
  );
}
