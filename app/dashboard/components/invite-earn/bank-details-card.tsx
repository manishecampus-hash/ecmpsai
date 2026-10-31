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
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-5 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <Landmark className="h-5 w-5" aria-hidden />
          </span>
          <h2 className="text-base font-bold text-gray-900">Your Bank Account Details</h2>
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
            className="px-5 pb-5 pt-3 sm:px-6 sm:pb-6"
          >
            <div className="grid gap-4 rounded-xl border border-gray-100 bg-gray-50/70 p-4 sm:grid-cols-2">
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
            <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex min-w-[140px] items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-600/20 transition hover:bg-red-700 active:scale-[0.98] disabled:opacity-70"
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
              className="px-5 pb-5 pt-3 sm:px-6 sm:pb-6"
            >
              {/* Saved account, shown like a bank card */}
              <div className="flex flex-col gap-4 rounded-xl border border-red-100 bg-red-50/40 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white text-red-600 shadow-sm ring-1 ring-red-100">
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
                  className="inline-flex flex-shrink-0 cursor-not-allowed items-center justify-center gap-1.5 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-400"
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
