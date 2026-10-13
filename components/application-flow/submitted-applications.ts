import type { ApplicantDetails, ApplicationProgram, PaymentRecord } from "./types";

// Applications whose seat block has been paid, kept in this browser for the
// dashboard's "My Applications" page (frontend-only until there's an API for it).
const STORAGE_KEY = "ecampus_applications";

export interface SubmittedApplication {
  applicationId: string;
  program: ApplicationProgram;
  details: ApplicantDetails;
  payment: PaymentRecord;
}

export function readSubmittedApplications(): SubmittedApplication[] {
  try {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

/** Newest first; one entry per university, so applying again replaces the older one */
export function addSubmittedApplication(app: SubmittedApplication) {
  try {
    const rest = readSubmittedApplications().filter((a) => a.program?.slug !== app.program.slug);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([app, ...rest]));
  } catch {
    // Storage unavailable — the success screen still shows for this visit.
  }
}
