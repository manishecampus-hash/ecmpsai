// Invite & Earn data. No referral API is connected yet, so invites and payout details are kept in
// this browser; swap these helpers for API calls once the backend exists.

export type Referral = {
  id: string;
  name: string;
  phone: string;
  email: string;
  state: string;
  courses: string[];
  createdAt: string;
  // How many steps of REFERRAL_STEPS are done (1 = form submitted)
  stage: number;
};

export type BankDetails = {
  holderName: string;
  accountNumber: string;
  bankName: string;
  ifsc: string;
};

export const EMPTY_BANK: BankDetails = { holderName: "", accountNumber: "", bankName: "", ifsc: "" };

export const REFERRAL_STEPS = [
  { title: "Form Submitted", description: "You have filled the referral form." },
  { title: "Talked with Counselor", description: "Our counselor has contacted the candidate." },
  { title: "Payment Done", description: "Candidate has completed the payment." },
  { title: "Referral Completed", description: "Admission process is successfully completed." },
  { title: "Payment Received in Your Account", description: "Your reward will be transferred to your bank account." },
];

export const REFERRAL_COURSES = [
  "Online MBA",
  "Online MCA",
  "Online BBA",
  "Online BCA",
  "Online B.Com",
  "Online M.Com",
  "Online BA",
  "Online MA",
  "Online M.Sc",
  "Executive MBA",
  "Online DBA",
  "Online PhD",
  "PG Diploma",
  "Certification Courses",
];

const REFERRALS_KEY = "ecampus_referrals";
const BANK_KEY = "ecampus_referral_bank";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable — the data still lives in memory for this visit.
  }
}

export const readReferrals = () => read<Referral[]>(REFERRALS_KEY, []);
export const saveReferrals = (list: Referral[]) => write(REFERRALS_KEY, list);
export const readBankDetails = () => read<BankDetails | null>(BANK_KEY, null);
export const saveBankDetails = (details: BankDetails) => write(BANK_KEY, details);

export const IFSC_PATTERN = /^[A-Z]{4}0[A-Z0-9]{6}$/;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_PATTERN = /^[6-9]\d{9}$/;

export const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

export const maskAccount = (account: string) => `•••• ${account.slice(-4)}`;
