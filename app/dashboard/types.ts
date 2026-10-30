import type { SpinWheelReward } from "./components/spin-wheel/data";

export type StudentProfile = {
  id?: string;
  name?: string;
  email?: string;
  email_verified_at?: string | Date | null;
  phone?: string;
  phone_verified_at?: string | Date | null;
  course?: string;
  coursesInterested?: string[];
  state?: string;
  dob?: string;
  referralCode?: string;
  whatsappOptIn?: boolean;
  joinedAt?: string;
  // AI Advisor answers. New 5-step onboarding fields, plus the older 4-question
  // fields so profiles saved before the change still display correctly.
  advisorProfile?: {
    highestQualification?: string;
    coursePreference?: string;
    budget?: string;
    employmentStatus?: string;
    currentSalary?: string;
    targetSalary?: string;
    category?: string;
    goal?: string;
    focusArea?: string;
    format?: string;
  };
  // Set once the student has used their single Spin & Win spin
  spinReward?: SpinWheelReward;
  // Set if the student skipped the spin wheel
  spinSkipped?: boolean;
};
