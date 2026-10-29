// Refer & Earn rewards per university and program.
// TODO(api): static placeholder data — replace with the referral rewards API once it is available.
// The hero's "earn up to" amount is worked out from this list, so the two always agree.

export type ReferralProgram = {
  name: string;
  level: "UG" | "PG";
  duration: string;
  reward: number; // what the referrer earns for one successful enrolment (₹)
};

export type ReferralUniversity = {
  id: string;
  name: string;
  logo: string;
  programs: ReferralProgram[];
};

const UG = (name: string, reward: number, duration = "3 years"): ReferralProgram => ({ name, level: "UG", duration, reward });
const PG = (name: string, reward: number, duration = "2 years"): ReferralProgram => ({ name, level: "PG", duration, reward });

export const REFERRAL_UNIVERSITIES: ReferralUniversity[] = [
  {
    id: "amity",
    name: "Amity University Online",
    logo: "/universities/amity.webp",
    programs: [PG("Online MBA", 25000), PG("Online MCA", 20000), UG("Online BBA", 12000), UG("Online BCA", 12000), UG("Online B.Com", 8000), PG("Online M.Com", 10000), UG("Online BA", 6000), PG("Online MA", 8000)],
  },
  {
    id: "manipal",
    name: "Manipal University Jaipur",
    logo: "/universities/manipal-jaipur.webp",
    programs: [PG("Online MBA", 22000), PG("Online MCA", 18000), UG("Online BBA", 10000), UG("Online BCA", 10000), UG("Online B.Com", 7000), PG("Online M.Com", 9000), PG("Online MA JMC", 9000)],
  },
  {
    id: "smu",
    name: "Sikkim Manipal University",
    logo: "/universities/SMU.webp",
    programs: [PG("Online MBA", 18000), PG("Online MCA", 15000), UG("Online BBA", 9000), UG("Online BCA", 9000), UG("Online B.Com", 6000), PG("Online MA", 7000)],
  },
  {
    id: "chandigarh",
    name: "Chandigarh University Online",
    logo: "/universities/Chandigarh-University.webp",
    programs: [PG("Online MBA", 20000), PG("Online MCA", 16000), UG("Online BBA", 9000), UG("Online BCA", 9000), PG("Online M.Com", 8000), PG("Online MSc Data Science", 15000)],
  },
  {
    id: "jain",
    name: "Jain University Online",
    logo: "/universities/Jain-University.webp",
    programs: [PG("Online MBA", 20000), PG("Online MCA", 16000), UG("Online BBA", 9000), UG("Online BCA", 9000), UG("Online B.Com", 6000), PG("Online M.Com", 8000)],
  },
  {
    id: "dypatil",
    name: "DY Patil University Online",
    logo: "/universities/dy-patil.webp",
    programs: [PG("Online MBA", 18000), UG("Online BBA", 8000), UG("Online B.Com", 6000), PG("Online M.Com", 7000)],
  },
  {
    id: "uttaranchal",
    name: "Uttaranchal University Online",
    logo: "/universities/online-uttranchal.webp",
    programs: [PG("Online MBA", 15000), PG("Online MCA", 12000), UG("Online BBA", 7000), UG("Online BCA", 7000), UG("Online BA", 5000)],
  },
  {
    id: "sharda",
    name: "Sharda University Online",
    logo: "/universities/sharda-ONLINE.webp",
    programs: [PG("Online MBA", 16000), PG("Online MCA", 13000), UG("Online BBA", 8000), UG("Online BCA", 8000), PG("Online MA", 6000)],
  },
];

export const MAX_REFERRAL_REWARD = Math.max(...REFERRAL_UNIVERSITIES.flatMap((u) => u.programs.map((p) => p.reward)));

// TODO(api): sample leaderboard — replace with real referrer rankings before launch
export const TOP_EARNERS = [
  { name: "Aarav M.", city: "Delhi", referrals: 14, amount: 186000 },
  { name: "Ritika S.", city: "Jaipur", referrals: 12, amount: 161000 },
  { name: "Kunal P.", city: "Pune", referrals: 11, amount: 148500 },
  { name: "Sana K.", city: "Lucknow", referrals: 9, amount: 121000 },
  { name: "Deepak R.", city: "Indore", referrals: 8, amount: 109000 },
  { name: "Megha T.", city: "Bengaluru", referrals: 7, amount: 96500 },
  { name: "Arjun V.", city: "Chandigarh", referrals: 6, amount: 82000 },
];

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
