// Universities that use the 3-screen online application (landing → review details → payment).
//
// To switch the flow on for another university, add an entry keyed by its page slug
// (the part after /universities/). Anything left out falls back to the university's
// own API data (name, banner image, duration, logo, required documents).
//
// Values marked "confirm" are placeholders until the admissions team signs them off.

export interface AdmissionStage {
  title: string;
  /** Short time hint shown under the stage, e.g. "5 mins" */
  duration: string;
}

export interface ApplicationFlowConfig {
  /** Program name shown on the "You are applying for" card */
  programName: string;
  /** Optional overrides — otherwise taken from the university API */
  durationLabel?: string;
  image?: string;
  /** ISO date (YYYY-MM-DD) of the next intake; hidden when not set */
  startDate?: string;
  /** Stages shown on the landing screen, in order */
  stages: AdmissionStage[];
  payment: {
    /** Line-item label on the payment screen */
    label: string;
    /** Amount in rupees, inclusive of taxes */
    amount: number;
    /** Reassurance shown under the total */
    note: string;
  };
}

export const APPLICATION_FLOWS: Record<string, ApplicationFlowConfig> = {
  "paris-american-international-university": {
    programName: "Doctor of Business Administration (DBA)",
    durationLabel: "24 months",
    startDate: "2027-01-11", // confirm
    stages: [
      { title: "Screening Round", duration: "5 mins" },
      { title: "Seat Block Payment", duration: "5 mins" },
      { title: "Document Verification", duration: "By university" },
    ],
    payment: {
      label: "Seat block amount",
      amount: 5000, // confirm
      note: "Fully adjusted against your total program fee.",
    },
  },
};

export function getApplicationFlow(slug?: string | null): ApplicationFlowConfig | null {
  if (!slug) return null;
  return APPLICATION_FLOWS[slug] ?? null;
}

/** "/university/paris-american-international-university" → "paris-american-international-university" */
export function toUniversitySlug(raw?: string | null): string {
  return String(raw || "").split("/").filter(Boolean).pop() || "";
}
