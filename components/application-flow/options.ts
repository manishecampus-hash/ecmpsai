import type { ApplicantDetails } from "./types";

export const GENDER_OPTIONS = ["Male", "Female", "Other", "Prefer not to say"];

export const QUALIFICATION_OPTIONS = [
  "PhD / Doctorate",
  "Master's Degree",
  "Bachelor's Degree",
  "Diploma",
  "12th Pass",
];

export const EXPERIENCE_OPTIONS = [
  "Less than 2 years",
  "2 – 5 years",
  "5 – 10 years",
  "10 – 15 years",
  "15+ years",
];

export const COUNTRY_OPTIONS = ["India", "Other"];

export const INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

// AI Advisor answer → qualification label, so a signed-in student starts pre-filled
export const ADVISOR_QUALIFICATION_MAP: Record<string, string> = {
  phd: "PhD / Doctorate",
  masters: "Master's Degree",
  bachelors: "Bachelor's Degree",
  diploma: "Diploma",
  "12th_pass": "12th Pass",
};

export const EMPTY_DETAILS: ApplicantDetails = {
  fullName: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  country: "India",
  state: "",
  city: "",
  qualification: "",
  fieldOfStudy: "",
  institute: "",
  graduationYear: "",
  score: "",
  experience: "",
  company: "",
  designation: "",
  consent: false,
};

export type DetailErrors = Partial<Record<keyof ApplicantDetails, string>>;

export function validateDetails(d: ApplicantDetails): DetailErrors {
  const e: DetailErrors = {};
  const thisYear = new Date().getFullYear();

  if (d.fullName.trim().length < 2) e.fullName = "Enter your full name";
  if (!/^\S+@\S+\.\S+$/.test(d.email.trim())) e.email = "Enter a valid email address";
  if (!/^[6-9]\d{9}$/.test(d.phone)) e.phone = "Enter a valid 10-digit mobile number";
  if (!d.dob) e.dob = "Select your date of birth";
  if (!d.gender) e.gender = "Select your gender";
  if (!d.country) e.country = "Select your country";
  if (d.country === "India" && !d.state) e.state = "Select your state";
  if (!d.city.trim()) e.city = "Enter your city";
  if (!d.qualification) e.qualification = "Select your highest qualification";
  if (!d.institute.trim()) e.institute = "Enter your university or institute";
  const year = Number(d.graduationYear);
  if (!/^\d{4}$/.test(d.graduationYear) || year < 1960 || year > thisYear + 1)
    e.graduationYear = "Enter a valid year";
  if (!d.experience) e.experience = "Select your work experience";
  if (!d.designation.trim()) e.designation = "Enter your current designation";
  if (!d.consent) e.consent = "Please confirm to continue";
  return e;
}

export function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

export function formatLongDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
