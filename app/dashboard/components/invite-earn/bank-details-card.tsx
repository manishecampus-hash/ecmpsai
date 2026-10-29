"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Building2, CreditCard, Hash, Landmark, Loader2, Pencil, User } from "lucide-react";
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
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<BankDetails>(saved ?? EMPTY_BANK);
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);
  const showForm = !saved || editing;

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
      setEditing(false);
    }, 500);
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3 px-5 pt-5 sm:px-6">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <Landmark className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h2 className="text-base font-bold text-gray-900">Add Your Bank Details</h2>
            <p className="mt-0.5 text-[13px] text-gray-500">Your referral rewards are paid straight into this account.</p>
          </div>
        </div>
        {saved && !editing && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
            Saved
          </span>
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
            className="p-5 sm:p-6"
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
              {saved && (
                <button
                  type="button"
                  onClick={() => {
                    setForm(saved);
                    setErrors({});
                    setEditing(false);
                  }}
                  className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
                >
                  Cancel
                </button>
              )}
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
              className="p-5 sm:p-6"
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
                <button
                  type="button"
                  onClick={() => {
                    setForm(saved);
                    setEditing(true);
                  }}
                  className="inline-flex flex-shrink-0 items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-red-200 hover:text-red-600"
                >
                  <Pencil className="h-3.5 w-3.5" aria-hidden />
                  Edit details
                </button>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </section>
  );
}
