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
};
