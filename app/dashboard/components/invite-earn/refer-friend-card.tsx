"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Eye, EyeOff, Loader2, Mail, MapPin, Phone, Send, User, UserPlus, X } from "lucide-react";
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

/** Soft avatar colours, rotated per friend */
const AVATAR_TONES = [
  "bg-blue-50 text-blue-700",
  "bg-emerald-50 text-emerald-700",
  "bg-amber-50 text-amber-700",
  "bg-violet-50 text-violet-700",
  "bg-rose-50 text-rose-700",
];

/** Compact "View / Hide progress" button (sits above the row's full-size click area) */
function ProgressButton({
  selected,
  name,
  hint,
  onClick,
}: {
  selected: boolean;
  name: string;
  /** soft ping on the first row until any friend is opened */
  hint: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={selected ? `Hide progress for ${name}` : `View progress for ${name}`}
      className={`pointer-events-auto relative inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors duration-200 active:scale-95 ${
        selected
          ? "bg-red-600 text-white hover:bg-red-700"
          : "border border-gray-200 bg-white text-gray-700 hover:border-red-600 hover:bg-red-600 hover:text-white"
      }`}
    >
      {hint && <span aria-hidden className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500 motion-safe:animate-ping" />}
      {selected ? <EyeOff className="h-3.5 w-3.5" aria-hidden /> : <Eye className="h-3.5 w-3.5" aria-hidden />}
      {selected ? "Hide progress" : "View progress"}
    </button>
  );
}

export default function ReferFriendCard({
  referrals,
  selectedId,
  onSelect,
  onSubmit,
}: {
  referrals: Referral[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
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
      <div className="flex items-center justify-between gap-3 px-4 pt-4 sm:px-5 sm:pt-5">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 ring-1 ring-red-100">
            <UserPlus className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <h2 className="text-[15px] font-bold text-gray-900">{showForm ? "Refer a Friend" : "Your Invited Friends"}</h2>
            <p className="mt-0.5 text-xs text-gray-500">
              {showForm
                ? "Share a friend's details — our counselor will guide them"
                : `${referrals.length} ${referrals.length === 1 ? "friend" : "friends"} invited · tap a friend to see progress`}
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
            aria-label="Invite another friend"
            className="inline-flex flex-shrink-0 items-center gap-2 rounded-xl bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-md shadow-red-600/20 transition hover:bg-red-700 active:scale-[0.98] sm:px-4"
          >
            <UserPlus className="h-4 w-4" aria-hidden />
            <span className="sm:hidden">Invite</span>
            <span className="hidden sm:inline">Invite another friend</span>
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
            className="px-4 pb-4 pt-4 sm:px-5 sm:pb-5"
          >
            <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-x-4">
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

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
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
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-red-50 px-6 py-3 text-sm font-semibold text-red-600 ring-1 ring-red-200 transition-[background-color,color,box-shadow] duration-200 hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-600/25 hover:ring-red-600 active:scale-[0.98] disabled:opacity-70 sm:min-w-[200px]"
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 transition-transform duration-200 group-hover:-rotate-12 group-hover:translate-x-0.5" aria-hidden />}
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
            className="px-4 pb-4 pt-4 sm:px-5 sm:pb-5"
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
                        Our counselor will reach out to them shortly. Tap “View progress” on their card to follow it.
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

            <ul className="space-y-2.5">
              {referrals.map((r, i) => {
                const selected = r.id === selectedId;
                const badge = stageBadge(r.stage);
                return (
                  <motion.li
                    key={r.id}
                    layout="position"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: Math.min(i, 5) * 0.05 } }}
                    className={`group relative overflow-hidden rounded-xl border px-3.5 py-3 transition-[border-color,box-shadow,background-color] duration-200 sm:px-4 ${
                      selected
                        ? "border-red-200 bg-red-50/50 shadow-[0_10px_24px_-18px_rgba(220,38,38,0.6)]"
                        : "border-gray-200 bg-white hover:border-red-100 hover:shadow-[0_10px_24px_-20px_rgba(17,24,39,0.45)]"
                    }`}
                  >
                    {/* The whole row opens this friend's progress; the progress button sits above it */}
                    <button
                      type="button"
                      onClick={() => onSelect(r.id)}
                      aria-pressed={selected}
                      aria-label={`Show ${r.name}'s referral progress`}
                      className="absolute inset-0 rounded-xl"
                    />
                    {selected && (
                      <motion.span
                        layoutId="friend-selected"
                        aria-hidden
                        className="absolute inset-y-3 left-0 w-1 rounded-r-full bg-red-600"
                      />
                    )}

                    <div className="pointer-events-none relative flex items-start gap-3">
                      <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ring-2 ring-white ${AVATAR_TONES[i % AVATAR_TONES.length]}`}>
                        {initials(r.name)}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <p className="truncate text-[14.5px] font-bold text-gray-900">{r.name}</p>
                          {r.courses.map((c) => (
                            <span key={c} className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[10.5px] font-semibold text-gray-700">
                              {c}
                            </span>
                          ))}
                        </div>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                          <CalendarDays className="h-3.5 w-3.5 flex-shrink-0" aria-hidden />
                          Invited on {formatDate(r.createdAt)}
                        </p>
                      </div>

                      {/* Status + progress — right side on tablet / desktop */}
                      <div className="hidden flex-shrink-0 items-center gap-2 sm:flex">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${badge.className}`}>
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {badge.label}
                        </span>
                        <ProgressButton selected={selected} name={r.name} hint={!selectedId && i === 0} onClick={() => onSelect(selected ? null : r.id)} />
                      </div>
                    </div>

                    {/* Phones: status + progress on their own row */}
                    <div className="pointer-events-none relative mt-2.5 flex items-center justify-between gap-2 sm:hidden">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${badge.className}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {badge.label}
                      </span>
                      <ProgressButton selected={selected} name={r.name} hint={!selectedId && i === 0} onClick={() => onSelect(selected ? null : r.id)} />
                    </div>

                    {/* Progress through the referral steps */}
                    <div className="pointer-events-none relative mt-2.5 flex items-center gap-2.5">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(Math.min(r.stage, REFERRAL_STEPS.length) / REFERRAL_STEPS.length) * 100}%` }}
                          transition={{ duration: 0.9, delay: 0.2 + Math.min(i, 5) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full bg-gradient-to-r from-red-500 to-rose-400"
                        />
                      </div>
                      <span className="whitespace-nowrap text-[11px] font-semibold text-gray-500">
                        Step {Math.min(r.stage, REFERRAL_STEPS.length)} of {REFERRAL_STEPS.length}
                      </span>
                    </div>

                    <div className="pointer-events-none relative mt-2.5 flex flex-wrap gap-x-5 gap-y-1.5 border-t border-gray-100 pt-2.5 text-xs text-gray-600">
                      <span className="flex min-w-0 items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" aria-hidden />
                        +91 {r.phone}
                      </span>
                      <span className="flex min-w-0 max-w-full items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" aria-hidden />
                        <span className="truncate">{r.email}</span>
                      </span>
                      <span className="flex min-w-0 items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" aria-hidden />
                        <span className="truncate">{r.state}</span>
                      </span>
                    </div>
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
              className="group mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-red-300 py-3 text-sm font-semibold text-red-600 transition hover:border-red-400 hover:bg-red-50/50"
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
