import type { AdmissionStage } from "@/data/application-flows";

/** Everything the three screens need about the program being applied to */
export interface ApplicationProgram {
  /** University page slug — used for links and the saved-draft key */
  slug: string;
  universityName: string;
  universityLogo?: string;
  programName: string;
  image?: string;
  durationLabel?: string;
  startDate?: string;
  stages: AdmissionStage[];
  payment: {
    label: string;
    amount: number;
    note: string;
  };
  /** Eligibility points from the university API (shown beside the form) */
  eligibility: string[];
  /** Documents the university asks for after payment (from the API's process flow) */
  documents: { title: string; description?: string }[];
}

export interface ApplicantDetails {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  country: string;
  state: string;
  city: string;
  qualification: string;
  fieldOfStudy: string;
  institute: string;
  graduationYear: string;
  score: string;
  experience: string;
  company: string;
  designation: string;
  consent: boolean;
}

export interface PaymentRecord {
  paymentId: string;
  amount: number;
  paidAt: string;
}

export interface ApplicationState {
  applicationId: string | null;
  details: ApplicantDetails | null;
  payment: PaymentRecord | null;
}
