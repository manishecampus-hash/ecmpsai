"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  GraduationCap,
  MapPin,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { useApplication } from "./application-context";
import FlowShell from "./flow-shell";
import ProgramCard from "./program-card";
import SelectField from "./select-field";
import DatePickerField from "./date-picker-field";
import {
  ADVISOR_QUALIFICATION_MAP,
  COUNTRY_OPTIONS,
  EMPTY_DETAILS,
  EXPERIENCE_OPTIONS,
  GENDER_OPTIONS,
  INDIAN_STATES,
  QUALIFICATION_OPTIONS,
  formatINR,
  validateDetails,
  type DetailErrors,
} from "./options";
import type { ApplicantDetails } from "./types";

const EASE = [0.22, 1, 0.36, 1] as const;

// Date-of-birth range: 1 Jan 1950 up to 16 years before today
const DOB_MIN = new Date(1950, 0, 1);
const DOB_MAX = (() => {
  const d = new Date();
  return new Date(d.getFullYear() - 16, d.getMonth(), d.getDate());
})();

const inputClass = (error?: string) =>
  `h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-red-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(238,44,60,0.12)] ${
    error ? "border-red-300 bg-red-50/30" : "border-slate-200 hover:border-slate-300"
  }`;

function Field({
  id,
  label,
  optional,
  error,
  className = "",
  children,
}: {
  id: keyof ApplicantDetails;
  label: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={`field-${id}`} className="mb-1.5 block text-xs font-semibold text-slate-700">
        {label}
        {optional ? <span className="ml-1 font-normal text-slate-400">(optional)</span> : <span className="text-[#ee2c3c]"> *</span>}
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -3 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-xs font-medium text-red-600"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

function Select({
  id,
  value,
  onChange,
  options,
  placeholder,
  error,
}: {
  id: keyof ApplicantDetails;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  error?: string;
}) {
  return (
    <SelectField
      id={`field-${id}`}
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      error={error}
      searchPlaceholder={`Search ${placeholder.replace(/^Select\s+/i, "")}…`}
    />
  );
}

function Section({
  icon: Icon,
  title,
  index,
  children,
}: {
  icon: LucideIcon;
  title: string;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE, delay: 0.05 + index * 0.06 }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-[#ee2c3c] ring-1 ring-red-100">
          <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
        </span>
        <h2 className="text-base font-bold text-slate-900">{title}</h2>
      </div>
      <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">{children}</div>
    </motion.section>
  );
}

// Screen 2 — the student reviews/completes their basic details before paying.
export default function DetailsScreen() {
  const router = useRouter();
  const { program, state, student, hydrated, saveDetails, basePath } = useApplication();

  const [form, setForm] = useState<ApplicantDetails>(EMPTY_DETAILS);
  const [errors, setErrors] = useState<DetailErrors>({});
  const [submitting, setSubmitting] = useState(false);

  // Start from the saved application, otherwise pre-fill from the signed-in student
  useEffect(() => {
    if (!hydrated) return;
    if (state.details) {
      setForm({ ...EMPTY_DETAILS, ...state.details });
      return;
    }
    const phoneDigits = (student?.phone || "").replace(/\D/g, "").slice(-10);
    setForm({
      ...EMPTY_DETAILS,
      fullName: student?.name || "",
      email: student?.email || "",
      phone: phoneDigits,
      state: student?.state && INDIAN_STATES.includes(student.state) ? student.state : "",
      qualification: ADVISOR_QUALIFICATION_MAP[student?.advisorProfile?.highestQualification || ""] || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  const set = <K extends keyof ApplicantDetails>(key: K) => (value: ApplicantDetails[K]) => {
    setForm((f) => ({ ...f, [key]: value, ...(key === "country" && value !== "India" ? { state: "" } : {}) }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateDetails(form);
    setErrors(found);
    const first = (Object.keys(found) as (keyof ApplicantDetails)[])[0];
    if (first) {
      const el = document.getElementById(`field-${first}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus({ preventScroll: true });
      return;
    }
    setSubmitting(true);
    saveDetails({ ...form, fullName: form.fullName.trim(), email: form.email.trim() });
    router.push(`${basePath}/payment`);
  };


  const aside = (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">You are applying for</p>
        <ProgramCard program={program} compact />
        <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-3 text-sm">
          <span className="text-slate-500">Payable at next step</span>
          <span className="font-bold text-slate-900">{formatINR(program.payment.amount)}</span>
        </div>
      </div>

      {program.eligibility.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">Eligibility</p>
          <ul className="space-y-2.5">
            {program.eligibility.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-600">
                <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );

  return (
    <FlowShell backHref={basePath} step={1} aside={aside}>
      <div className="mb-5">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">Review your details</h1>
        <p className="mt-1.5 text-sm text-slate-500">
          The university uses these details to evaluate your application. Please make sure they&apos;re correct.
        </p>
      </div>

      <form noValidate onSubmit={handleSubmit} className="space-y-5">
        <Section icon={UserRound} title="Personal Details" index={0}>
          <Field id="fullName" label="Full name (as per documents)" error={errors.fullName} className="sm:col-span-2">
            <input
              id="field-fullName"
              value={form.fullName}
              onChange={(e) => set("fullName")(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              autoComplete="name"
              aria-invalid={Boolean(errors.fullName)}
              className={inputClass(errors.fullName)}
            />
          </Field>
          <Field id="email" label="Email address" error={errors.email}>
            <input
              id="field-email"
              type="email"
              value={form.email}
              onChange={(e) => set("email")(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              className={inputClass(errors.email)}
            />
          </Field>
          <Field id="phone" label="Mobile number" error={errors.phone}>
            <div className="flex">
              <span className="flex h-11 items-center rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-600">
                +91
              </span>
              <input
                id="field-phone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={form.phone}
                onChange={(e) => set("phone")(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="10-digit mobile number"
                autoComplete="tel-national"
                aria-invalid={Boolean(errors.phone)}
                className={`${inputClass(errors.phone)} rounded-l-none`}
              />
            </div>
          </Field>
          <Field id="dob" label="Date of birth" error={errors.dob}>
            <DatePickerField
              id="field-dob"
              value={form.dob}
              onChange={set("dob")}
              placeholder="Select date of birth"
              error={errors.dob}
              minDate={DOB_MIN}
              maxDate={DOB_MAX}
            />
          </Field>
          <Field id="gender" label="Gender" error={errors.gender}>
            <Select id="gender" value={form.gender} onChange={set("gender")} options={GENDER_OPTIONS} placeholder="Select gender" error={errors.gender} />
          </Field>
        </Section>

        <Section icon={MapPin} title="Location" index={1}>
          <Field id="country" label="Country" error={errors.country}>
            <Select id="country" value={form.country} onChange={set("country")} options={COUNTRY_OPTIONS} placeholder="Select country" error={errors.country} />
          </Field>
          {form.country === "India" && (
            <Field id="state" label="State" error={errors.state}>
              <Select id="state" value={form.state} onChange={set("state")} options={INDIAN_STATES} placeholder="Select state" error={errors.state} />
            </Field>
          )}
          <Field id="city" label="City" error={errors.city}>
            <input
              id="field-city"
              value={form.city}
              onChange={(e) => set("city")(e.target.value)}
              placeholder="e.g. Pune"
              autoComplete="address-level2"
              aria-invalid={Boolean(errors.city)}
              className={inputClass(errors.city)}
            />
          </Field>
        </Section>

        <Section icon={GraduationCap} title="Education" index={2}>
          <Field id="qualification" label="Highest qualification" error={errors.qualification}>
            <Select
              id="qualification"
              value={form.qualification}
              onChange={set("qualification")}
              options={QUALIFICATION_OPTIONS}
              placeholder="Select qualification"
              error={errors.qualification}
            />
          </Field>
          <Field id="fieldOfStudy" label="Specialisation / field" optional>
            <input
              id="field-fieldOfStudy"
              value={form.fieldOfStudy}
              onChange={(e) => set("fieldOfStudy")(e.target.value)}
              placeholder="e.g. Finance"
              className={inputClass()}
            />
          </Field>
          <Field id="institute" label="University / institute" error={errors.institute} className="sm:col-span-2">
            <input
              id="field-institute"
              value={form.institute}
              onChange={(e) => set("institute")(e.target.value)}
              placeholder="Where you completed your highest qualification"
              aria-invalid={Boolean(errors.institute)}
              className={inputClass(errors.institute)}
            />
          </Field>
          <Field id="graduationYear" label="Year of completion" error={errors.graduationYear}>
            <input
              id="field-graduationYear"
              inputMode="numeric"
              maxLength={4}
              value={form.graduationYear}
              onChange={(e) => set("graduationYear")(e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="e.g. 2018"
              aria-invalid={Boolean(errors.graduationYear)}
              className={inputClass(errors.graduationYear)}
            />
          </Field>
          <Field id="score" label="Percentage / CGPA" optional>
            <input
              id="field-score"
              value={form.score}
              onChange={(e) => set("score")(e.target.value.slice(0, 10))}
              placeholder="e.g. 72% or 7.8"
              className={inputClass()}
            />
          </Field>
        </Section>

        <Section icon={Briefcase} title="Work Experience" index={3}>
          <Field id="experience" label="Total work experience" error={errors.experience}>
            <Select
              id="experience"
              value={form.experience}
              onChange={set("experience")}
              options={EXPERIENCE_OPTIONS}
              placeholder="Select experience"
              error={errors.experience}
            />
          </Field>
          <Field id="designation" label="Current designation" error={errors.designation}>
            <input
              id="field-designation"
              value={form.designation}
              onChange={(e) => set("designation")(e.target.value)}
              placeholder="e.g. Senior Manager"
              autoComplete="organization-title"
              aria-invalid={Boolean(errors.designation)}
              className={inputClass(errors.designation)}
            />
          </Field>
          <Field id="company" label="Current organisation" optional className="sm:col-span-2">
            <input
              id="field-company"
              value={form.company}
              onChange={(e) => set("company")(e.target.value)}
              placeholder="e.g. Infosys"
              autoComplete="organization"
              className={inputClass()}
            />
          </Field>
        </Section>

        {/* Consent + continue */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE, delay: 0.3 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6"
        >
          <label htmlFor="field-consent" className="flex cursor-pointer items-start gap-3">
            <input
              id="field-consent"
              type="checkbox"
              checked={form.consent}
              onChange={(e) => set("consent")(e.target.checked)}
              className="mt-0.5 h-4 w-4 flex-shrink-0 cursor-pointer accent-[#ee2c3c]"
            />
            <span className="text-[13px] leading-relaxed text-slate-600">
              I confirm these details are accurate and agree to be contacted by eCampus and{" "}
              {program.universityName} about my application.
            </span>
          </label>
          {errors.consent && <p className="mt-2 pl-7 text-xs font-medium text-red-600">{errors.consent}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="group mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#ee2c3c] text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-red-500/20 transition-colors hover:bg-[#d92233] disabled:opacity-70 sm:ml-auto sm:w-auto sm:px-8"
          >
            Save &amp; Continue to Payment
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </form>
    </FlowShell>
  );
}
