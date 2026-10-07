import type { SpinWheelReward } from "./components/spin-wheel/data";

export type StudentProfile = {
  name?: string;
  email?: string;
  phone?: string;
  coursesInterested?: string[];
  state?: string;
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
};
