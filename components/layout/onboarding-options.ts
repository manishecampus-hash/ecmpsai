// Central configuration for the post-signup onboarding questionnaire.
// Every option shown in the 5 steps lives here — the modal only renders it —
// so programs, ranges and categories can be updated (or swapped for API data) in one place.

export type QualificationId = "12th_pass" | "diploma" | "bachelors" | "masters" | "phd";
export type EmploymentStatus = "working" | "non_working";

export interface OnboardingOption {
  id: string;
  label: string;
  description?: string;
}

export interface CourseOption {
  id: string;
  name: string;
  fullName: string;
  // Optional heading used to group related programs (e.g. DBA specialisations)
  group?: string;
}

export interface OnboardingData {
  highestQualification: QualificationId | "";
  coursePreference: string;
  budget: string;
  employmentStatus: EmploymentStatus | "";
  currentSalary: string;
  targetSalary: string;
  category: string;
}

export const EMPTY_ONBOARDING: OnboardingData = {
  highestQualification: "",
  coursePreference: "",
  budget: "",
  employmentStatus: "",
  currentSalary: "",
  targetSalary: "",
  category: "",
};

export const ONBOARDING_STEPS = [
  { id: 1, label: "Qualification" },
  { id: 2, label: "Course" },
  { id: 3, label: "Budget" },
  { id: 4, label: "Salary" },
  { id: 5, label: "Category" },
] as const;

// ── Step 1 ──────────────────────────────────────────────────────────
export const QUALIFICATION_OPTIONS: { id: QualificationId; label: string; description: string }[] = [
  { id: "12th_pass", label: "12th Pass", description: "Completed senior secondary (10+2)" },
  { id: "diploma", label: "Diploma", description: "Completed a diploma programme" },
  { id: "bachelors", label: "Bachelor's Degree", description: "Completed an undergraduate degree" },
  { id: "masters", label: "Master's Degree", description: "Completed a postgraduate degree" },
  { id: "phd", label: "PhD / Doctorate", description: "Completed a doctoral degree" },
];

// ── Step 2 — programmes offered on eCampus, by highest completed qualification ──
const UG_PROGRAMS: CourseOption[] = [
  { id: "ba", name: "BA", fullName: "Bachelor of Arts" },
  { id: "bba", name: "BBA", fullName: "Bachelor of Business Administration" },
  { id: "bca", name: "BCA", fullName: "Bachelor of Computer Applications" },
  { id: "bcom", name: "B.Com", fullName: "Bachelor of Commerce" },
  { id: "bsc", name: "B.Sc", fullName: "Bachelor of Science" },
];

const PG_PROGRAMS: CourseOption[] = [
  { id: "mba", name: "MBA", fullName: "Master of Business Administration" },
  { id: "mca", name: "MCA", fullName: "Master of Computer Applications" },
  { id: "mcom", name: "M.Com", fullName: "Master of Commerce" },
  { id: "ma", name: "MA", fullName: "Master of Arts" },
  { id: "msc", name: "M.Sc", fullName: "Master of Science" },
  { id: "ma_jmc", name: "MA (Journalism & Mass Communication)", fullName: "Master of Arts in Journalism and Mass Communication" },
];

const DBA_GROUP = "Doctor of Business Administration (DBA)";
const DBA_SPECIALISATIONS = [
  "General Management",
  "Business Analytics",
  "Marketing",
  "Supply Chain Management",
  "Information Technology",
  "Human Resource Management",
  "International Business",
  "Data Science",
  "Healthcare Management",
  "Gen-AI",
];

const DOCTORAL_PROGRAMS: CourseOption[] = [
  ...DBA_SPECIALISATIONS.map((spec) => ({
    id: `dba_${spec.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/_+$/, "")}`,
    name: `DBA – ${spec}`,
    fullName: `Doctor of Business Administration in ${spec}`,
    group: DBA_GROUP,
  })),
  { id: "phd", name: "PhD / Doctorate", fullName: "Doctoral & Research Programs", group: "Research Doctorate" },
];

// After a doctorate, only continuing-learning programmes that exist on the site
// (the IIM Kozhikode certifications listed in the header menu).
const POST_DOCTORAL_PROGRAMS: CourseOption[] = [
  { id: "iim_k_hr", name: "IIM K – HR Management & Analytics", fullName: "Executive certification · 8 months" },
  { id: "iim_k_ai", name: "IIM K – AI Professional Certificate", fullName: "Executive certification · 6 months" },
];

export const COURSE_OPTIONS_BY_QUALIFICATION: Record<QualificationId, CourseOption[]> = {
  "12th_pass": UG_PROGRAMS,
  diploma: UG_PROGRAMS,
  bachelors: PG_PROGRAMS,
  masters: DOCTORAL_PROGRAMS,
  phd: POST_DOCTORAL_PROGRAMS,
};

export function getCourseOptions(qualification: OnboardingData["highestQualification"]): CourseOption[] {
  return qualification ? COURSE_OPTIONS_BY_QUALIFICATION[qualification] ?? [] : [];
}

// ── Step 3 ──────────────────────────────────────────────────────────
export const BUDGET_OPTIONS: OnboardingOption[] = [
  { id: "50k", label: "₹50,000" },
  { id: "50k_1l", label: "₹50,000 – ₹1 Lakh" },
  { id: "1l_3l", label: "₹1 Lakh – ₹3 Lakh" },
  { id: "3l_5l", label: "₹3 Lakh – ₹5 Lakh" },
  { id: "5l_plus", label: "Above ₹5 Lakh" },
];

// ── Step 4 ──────────────────────────────────────────────────────────
export const EMPLOYMENT_OPTIONS: { id: EmploymentStatus; label: string }[] = [
  { id: "working", label: "Working" },
  { id: "non_working", label: "Non-Working" },
];

export const CURRENT_SALARY_OPTIONS: OnboardingOption[] = [
  { id: "20k_35k", label: "₹20,000 – ₹35,000 / month" },
  { id: "35k_75k", label: "₹35,000 – ₹75,000 / month" },
  { id: "75k_1_5l", label: "₹75,000 – ₹1.5 Lakh / month" },
  { id: "1_5l_plus", label: "₹1.5 Lakh + / month" },
];

export const TARGET_SALARY_OPTIONS: OnboardingOption[] = [
  { id: "75k_1l", label: "₹75,000 – ₹1 Lakh / month" },
  { id: "1l_2_5l", label: "₹1 Lakh – ₹2.5 Lakh / month" },
  { id: "2_5l_5l", label: "₹2.5 Lakh – ₹5 Lakh / month" },
  { id: "5l_plus", label: "₹5 Lakh + / month" },
];

// ── Step 5 ──────────────────────────────────────────────────────────
export const CATEGORY_OPTIONS: OnboardingOption[] = [
  { id: "visually_impaired", label: "Visually Impaired" },
  { id: "defence_govt", label: "Defence Personnel / Govt. Employee" },
  { id: "divyang", label: "Divyang", description: "For persons with disabilities" },
  { id: "sc_st", label: "SC/ST Category" },
  { id: "merit_based", label: "Merit-Based", description: "75% aggregate in last qualification" },
  { id: "none", label: "None of the above" },
];

// ── Validation ──────────────────────────────────────────────────────
export function isStepComplete(step: number, data: OnboardingData): boolean {
  switch (step) {
    case 1:
      return !!data.highestQualification;
    case 2:
      return getCourseOptions(data.highestQualification).some((c) => c.id === data.coursePreference);
    case 3:
      return BUDGET_OPTIONS.some((o) => o.id === data.budget);
    case 4:
      if (data.employmentStatus === "working") return !!data.currentSalary && !!data.targetSalary;
      if (data.employmentStatus === "non_working") return !!data.targetSalary;
      return false;
    case 5:
      return CATEGORY_OPTIONS.some((o) => o.id === data.category);
    default:
      return false;
  }
}

export function isOnboardingComplete(data: OnboardingData) {
  return [1, 2, 3, 4, 5].every((s) => isStepComplete(s, data));
}

// ── Display helpers (profile page etc.) ─────────────────────────────
const labelOf = (list: { id: string; label: string }[], id?: string) =>
  list.find((o) => o.id === id)?.label ?? "";

/** Human-readable rows for a saved answer set. Also understands the older 4-question shape. */
export function describeAdvisorProfile(profile: Record<string, string | undefined> | undefined) {
  if (!profile) return [];
  if (profile.highestQualification) {
    const q = profile.highestQualification as QualificationId;
    const course = getCourseOptions(q).find((c) => c.id === profile.coursePreference);
    const salary =
      profile.employmentStatus === "working"
        ? `${labelOf(CURRENT_SALARY_OPTIONS, profile.currentSalary)} → ${labelOf(TARGET_SALARY_OPTIONS, profile.targetSalary)}`
        : labelOf(TARGET_SALARY_OPTIONS, profile.targetSalary);
    return [
      { key: "qualification", label: "Highest Qualification", value: labelOf(QUALIFICATION_OPTIONS, q) },
      { key: "course", label: "Program Interest", value: course?.name ?? "" },
      { key: "budget", label: "Budget Range", value: labelOf(BUDGET_OPTIONS, profile.budget) },
      {
        key: "salary",
        label: profile.employmentStatus === "working" ? "Current → Target Salary" : "Target Salary",
        value: salary,
      },
      { key: "category", label: "Scholarship Category", value: labelOf(CATEGORY_OPTIONS, profile.category) },
    ].filter((r) => r.value);
  }
  // Answers saved by the previous version of the questionnaire
  return [
    { key: "goal", label: "Primary Goal", value: profile.goal ?? "" },
    { key: "focus", label: "Focus Area", value: profile.focusArea ?? "" },
    { key: "format", label: "Preferred Format", value: profile.format ?? "" },
    { key: "budget", label: "Budget Range", value: profile.budget ?? "" },
  ].filter((r) => r.value);
}
