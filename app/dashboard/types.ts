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
  advisorProfile?: {
    goal?: string;
    focusArea?: string;
    format?: string;
    budget?: string;
  };
  // Set once the student has used their single Spin & Win spin
  spinReward?: SpinWheelReward;
};
