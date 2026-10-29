"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Loader2, Mail, MapPin, Phone, Send, User, UserPlus, X } from "lucide-react";
import SelectField from "@/components/application-flow/select-field";
import { indianStates } from "@/data/indian-states";
import CourseMultiSelect from "./course-multi-select";
import FormField from "./form-field";
import {
  EMAIL_PATTERN,
  PHONE_PATTERN,
  REFERRAL_COURSES,
  REFERRAL_STEPS,
  initials,
  type Referral,
} from "./referral-store";

type Draft = Pick<Referral, "name" | "phone" | "email" | "state" | "courses">;
type Errors = Partial<Record<keyof Draft, string>>;

const EMPTY_DRAFT: Draft = { name: "", phone: "", email: "", state: "", courses: [] };

const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

// What the friend is waiting on next, indexed by the number of finished steps
const STAGE_LABELS = ["Not submitted", "Counselor call pending", "Awaiting payment", "Admission in progress", "Reward processing"];

export function stageBadge(stage: number) {
  if (stage >= REFERRAL_STEPS.length) return { label: "Reward paid", className: "bg-emerald-50 text-emerald-700" };
  return { label: STAGE_LABELS[stage], className: "bg-amber-50 text-amber-700" };
}

export default function ReferFriendCard({
  referrals,
  selectedId,
  onSelect,
  onSubmit,
}: {
  referrals: Referral[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onSubmit: (draft: Draft) => void;
}) {
  const [formOpen, setFormOpen] = useState(false);
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [justInvited, setJustInvited] = useState<string | null>(null);
  const showForm = formOpen || referrals.length === 0;

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (d: Draft): Errors => {
    const next: Errors = {};
    if (d.name.trim().length < 3) next.name = "Enter your friend's full name";
    if (!PHONE_PATTERN.test(d.phone)) next.phone = "Enter a valid 10-digit mobile number";
    else if (referrals.some((r) => r.phone === d.phone)) next.phone = "You've already invited this number";
    if (!EMAIL_PATTERN.test(d.email.trim())) next.email = "Enter a valid email address";
    if (!d.state) next.state = "Select a state";
    if (d.courses.length === 0) next.courses = "Pick at least one course";
    return next;
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next = validate(draft);
    setErrors(next);
    if (Object.keys(next).length) return;
    setSubmitting(true);
    window.setTimeout(() => {
      onSubmit({ ...draft, name: draft.name.trim(), email: draft.email.trim() });
      setJustInvited(draft.name.trim());
      setDraft(EMPTY_DRAFT);
      setSubmitting(false);
      setFormOpen(false);
    }, 600);
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3 px-5 pt-5 sm:px-6">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <UserPlus className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h2 className="text-base font-bold text-gray-900">{showForm ? "Refer a Friend" : "Your Invited Friends"}</h2>
            <p className="mt-0.5 text-[13px] text-gray-500">
              {showForm
                ? "Fill in the details of your friend who is interested in higher education."
                : "Track each friend you've invited, or invite someone new."}
            </p>
          </div>
        </div>
        {!showForm && (
          <button
            type="button"
            onClick={() => {
              setJustInvited(null);
              setFormOpen(true);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-600/20 transition hover:bg-red-700 active:scale-[0.98]"
          >
            <UserPlus className="h-4 w-4" aria-hidden />
            Invite another friend
          </button>
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
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                id="ref-name"
                label="Candidate Name"
                icon={User}
                placeholder="Enter candidate name"
                autoComplete="off"
                value={draft.name}
                onChange={(e) => set("name", e.target.value)}
                error={errors.name}
              />
              <FormField
                id="ref-phone"
                label="Phone Number"
                icon={Phone}
                placeholder="Enter 10 digit mobile number"
                inputMode="numeric"
                maxLength={10}
                autoComplete="off"
                value={draft.phone}
                onChange={(e) => set("phone", e.target.value.replace(/\D/g, ""))}
                error={errors.phone}
              />
              <FormField
                id="ref-email"
                label="Email Address"
                icon={Mail}
                type="email"
                placeholder="Enter email address"
                autoComplete="off"
                value={draft.email}
                onChange={(e) => set("email", e.target.value)}
                error={errors.email}
              />
              <FormField id="ref-state" label="State" error={errors.state}>
                <SelectField
                  id="ref-state"
                  value={draft.state}
                  onChange={(v) => set("state", v)}
                  options={indianStates}
                  placeholder="Select state"
                  searchPlaceholder="Search state…"
                  error={errors.state}
                />
              </FormField>
              <div className="sm:col-span-2">
                <FormField
                  id="ref-courses"
                  label="Interested Courses"
                  error={errors.courses}
                  hint="You can select multiple courses"
                >
                  <CourseMultiSelect
                    id="ref-courses"
                    value={draft.courses}
                    onChange={(v) => set("courses", v)}
                    options={REFERRAL_COURSES}
                    error={errors.courses}
                  />
                </FormField>
              </div>
            </div>

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row">
              {referrals.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setFormOpen(false);
                    setErrors({});
                  }}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  <X className="h-4 w-4" aria-hidden />
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 active:scale-[0.99] disabled:opacity-70"
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" aria-hidden />}
                {submitting ? "Submitting…" : "Submit Referral"}
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
            className="p-5 sm:p-6"
          >
            <AnimatePresence initial={false}>
              {justInvited && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mb-4 flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" aria-hidden />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-emerald-800">{justInvited} has been invited!</p>
                      <p className="mt-0.5 text-xs text-emerald-700">
                        Our counselor will reach out to them shortly. You can follow their progress on the right.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setJustInvited(null)}
                      aria-label="Dismiss"
                      className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-emerald-700 transition hover:bg-emerald-100"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <ul className="space-y-3">
              {referrals.map((r, i) => {
                const selected = r.id === selectedId;
                const badge = stageBadge(r.stage);
                return (
                  <motion.li
                    key={r.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: Math.min(i, 5) * 0.05 } }}
                  >
                    <button
                      type="button"
                      onClick={() => onSelect(r.id)}
                      aria-pressed={selected}
                      className={`relative w-full overflow-hidden rounded-xl border p-4 text-left transition ${
                        selected
                          ? "border-red-200 bg-red-50/40 shadow-sm"
                          : "border-gray-200 bg-white hover:border-red-100 hover:bg-gray-50/60"
                      }`}
                    >
                      {selected && <span aria-hidden className="absolute inset-y-3 left-0 w-1 rounded-r-full bg-red-600" />}
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white ring-4 ring-red-50">
                            {initials(r.name)}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-[15px] font-bold text-gray-900">{r.name}</p>
                            <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                              <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                              Invited on {formatDate(r.createdAt)}
                            </p>
                          </div>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${badge.className}`}>
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {badge.label}
                        </span>
                      </div>

                      <div className="mt-3.5 grid gap-x-5 gap-y-2 border-t border-dashed border-gray-200 pt-3.5 text-xs text-gray-700 sm:grid-cols-3">
                        <span className="flex min-w-0 items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 flex-shrink-0 text-red-500" aria-hidden />
                          +91 {r.phone}
                        </span>
                        <span className="flex min-w-0 items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 flex-shrink-0 text-red-500" aria-hidden />
                          <span className="truncate">{r.email}</span>
                        </span>
                        <span className="flex min-w-0 items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-red-500" aria-hidden />
                          <span className="truncate">{r.state}</span>
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {r.courses.map((c) => (
                          <span key={c} className="rounded-md border border-gray-200 bg-white px-2 py-0.5 text-[11px] font-medium text-gray-600">
                            {c}
                          </span>
                        ))}
                      </div>
                    </button>
                  </motion.li>
                );
              })}
            </ul>

            {/* Dashed tile that opens the form again */}
            <button
              type="button"
              onClick={() => {
                setJustInvited(null);
                setFormOpen(true);
              }}
              className="group mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-red-200 py-4 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50/50"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-50 transition group-hover:bg-red-600 group-hover:text-white">
                <UserPlus className="h-4 w-4" aria-hidden />
              </span>
              Add or invite more friends
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
