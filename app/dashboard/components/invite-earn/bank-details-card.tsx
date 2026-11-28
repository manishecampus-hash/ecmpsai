"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Building2, CreditCard, Hash, Landmark, Loader2, Lock, ShieldAlert, User } from "lucide-react";
import FormField from "./form-field";
import { EMPTY_BANK, IFSC_PATTERN, maskAccount, type BankDetails } from "./referral-store";

type Errors = Partial<Record<keyof BankDetails, string>>;

function validate(d: BankDetails): Errors {
  const errors: Errors = {};
  if (d.holderName.trim().length < 3) errors.holderName = "Enter the name as on your bank account";
  if (!/^\d{9,18}$/.test(d.accountNumber)) errors.accountNumber = "Account number should be 9–18 digits";
  if (d.bankName.trim().length < 3) errors.bankName = "Enter your bank name";
  if (!IFSC_PATTERN.test(d.ifsc)) errors.ifsc = "Enter a valid 11-character IFSC (e.g. HDFC0001234)";
  return errors;
}

export default function BankDetailsCard({
  saved,
  onSave,
}: {
  saved: BankDetails | null;
  onSave: (details: BankDetails) => void;
}) {
  const [form, setForm] = useState<BankDetails>(saved ?? EMPTY_BANK);
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);
  // Details can be filled in once; after saving they stay locked
  const showForm = !saved;

  const set = (key: keyof BankDetails, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next = validate(form);
    setErrors(next);
    if (Object.keys(next).length) return;
    setSaving(true);
    window.setTimeout(() => {
      onSave({ ...form, holderName: form.holderName.trim(), bankName: form.bankName.trim() });
      setSaving(false);
    }, 500);
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-4 sm:px-5 sm:pt-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm">
            <Landmark className="h-[18px] w-[18px]" aria-hidden />
          </span>
          <div className="min-w-0">
            <h2 className="text-[15px] font-bold tracking-tight text-gray-900">Bank Account for Rewards</h2>
            <p className="mt-0.5 text-xs text-gray-500">Your referral rewards are paid to this account</p>
          </div>
        </div>
        {saved && (
          <div className="flex items-center gap-2">
            {/* TODO: show "Verified" once the backend confirms the account */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
              <ShieldAlert className="h-3.5 w-3.5" aria-hidden />
              Unverified
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
              <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
              Saved
            </span>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {showForm ? (
          <motion.form
            key="form"
            noValidate
            onSubmit={submit}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
            className="mt-4 border-t border-gray-100 px-4 pb-4 pt-4 sm:px-5 sm:pb-5"
          >
            <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-3.5">
              <FormField
                id="bank-holder"
                label="Account Holder Name"
                icon={User}
                placeholder="Name as on bank account"
                autoComplete="name"
                value={form.holderName}
                onChange={(e) => set("holderName", e.target.value)}
                error={errors.holderName}
              />
              <FormField
                id="bank-account"
                label="Account Number"
                icon={CreditCard}
                placeholder="Enter your account number"
                inputMode="numeric"
                maxLength={18}
                value={form.accountNumber}
                onChange={(e) => set("accountNumber", e.target.value.replace(/\D/g, ""))}
                error={errors.accountNumber}
              />
              <FormField
                id="bank-name"
                label="Bank Name"
                icon={Building2}
                placeholder="Enter bank name"
                value={form.bankName}
                onChange={(e) => set("bankName", e.target.value)}
                error={errors.bankName}
              />
              <FormField
                id="bank-ifsc"
                label="IFSC Code"
                icon={Hash}
                placeholder="Enter IFSC code"
                maxLength={11}
                value={form.ifsc}
                onChange={(e) => set("ifsc", e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))}
                error={errors.ifsc}
              />
            </div>
            <div className="mt-4 flex flex-col-reverse items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-1.5 text-xs text-gray-500">
                <Lock className="h-3 w-3 flex-shrink-0" aria-hidden />
                Details are saved once and locked for your security.
              </p>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex h-11 min-w-[140px] items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 hover:shadow-md active:scale-[0.98] disabled:opacity-70"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {saving ? "Saving…" : "Save Details"}
              </button>
            </div>
          </motion.form>
        ) : (
          saved && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
              className="px-4 pb-4 pt-4 sm:px-5 sm:pb-5"
            >
              {/* Saved account, shown like a bank card */}
              <div className="relative flex flex-col gap-4 overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 via-white to-white p-4 sm:flex-row sm:items-center sm:justify-between">
                <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full border border-dashed border-gray-200 motion-safe:animate-[spin_40s_linear_infinite]" />
                <div className="relative flex min-w-0 items-center gap-3">
                  <span className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white shadow-md shadow-gray-900/20">
                    <Building2 className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-gray-900">{saved.bankName}</p>
                    <p className="mt-0.5 truncate text-xs text-gray-600">
                      {saved.holderName} · <span className="font-mono">{maskAccount(saved.accountNumber)}</span> · IFSC{" "}
                      <span className="font-mono">{saved.ifsc}</span>
                    </p>
                  </div>
                </div>
                {/* Bank details can be added once; changes go through support, so editing stays visibly locked */}
                <button
                  type="button"
                  disabled
                  aria-describedby="bank-locked-note"
                  title="Bank details are locked once saved. Contact support to change them."
                  className="relative inline-flex flex-shrink-0 cursor-not-allowed items-center justify-center gap-1.5 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-400"
                >
                  <Lock className="h-3.5 w-3.5" aria-hidden />
                  Edit details
                </button>
              </div>
              <p id="bank-locked-note" className="mt-2.5 flex items-center gap-1.5 text-xs text-gray-500">
                <Lock className="h-3 w-3 flex-shrink-0" aria-hidden />
                Bank details are locked once saved. Contact support to change them.
              </p>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </section>
  );
}
