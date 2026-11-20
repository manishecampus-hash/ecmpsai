// ── Data ─────────────────────────────────────────────────────────────────────
// STATIC for now — replace with CMS / API data later. All amounts are in INR, including taxes.

export interface FeePlan {
  id: string;
  /** Full name, used in the popup title */
  university: string;
  /** Short name, used on the tab and the CTA ("Download GGU Brochure") */
  shortName: string;
  logo?: string;
  location: string;
  duration: string;
  standardFee: number;
  /** eCampus waiver, e.g. "upto 20%" */
  waiver: string;
  payableFee: number;
  /** Months the payable fee is spread over for the "starting ₹X/month" line */
  emiMonths: number;
  /** Optional on-campus immersion — omit for fully online programmes */
  immersion?: {
    fee: number;
    days: number;
    location: string;
    inclusions: string[];
  };
}

const DBA_IMMERSION_INCLUSIONS = [
  "On-campus Immersion with accommodation & meals",
  "Academic & Group mentoring sessions",
  "City tour",
];

export const DBA_FEE_PLANS: FeePlan[] = [
  {
    id: "ggu",
    university: "Golden Gate University",
    shortName: "Golden Gate",
    logo: "https://ecampus-admin-ui.b-cdn.net/ecampus-images/3.svg",
    location: "California, USA",
    duration: "3 Years",
    standardFee: 1065000,
    waiver: "upto 20%",
    payableFee: 800000,
    emiMonths: 36,
    immersion: { fee: 225000, days: 7, location: "San Francisco, USA", inclusions: DBA_IMMERSION_INCLUSIONS },
  },
  {
    id: "paiu",
    university: "Paris American International University",
    shortName: "PAIU",
    logo: "https://ecampus-admin-ui.b-cdn.net/ecampus-images/4.svg",
    location: "Paris, France",
    duration: "3 Years",
    standardFee: 750000,
    waiver: "upto 20%",
    payableFee: 600000,
    emiMonths: 36,
    immersion: { fee: 180000, days: 5, location: "Paris, France", inclusions: DBA_IMMERSION_INCLUSIONS },
  },
  {
    id: "rushford",
    university: "Rushford Business School",
    shortName: "Rushford",
    logo: "https://ecampus-admin-ui.b-cdn.net/ecampus-images/2.svg",
    location: "Switzerland",
    duration: "3 Years",
    standardFee: 650000,
    waiver: "upto 20%",
    payableFee: 520000,
    emiMonths: 36,
  },
  {
    id: "lsmt",
    university: "London School of Management & Technology",
    shortName: "LSMT",
    logo: "https://ecampus-admin-ui.b-cdn.net/ecampus-images/6.svg",
    location: "London, UK",
    duration: "3 Years",
    standardFee: 550000,
    waiver: "upto 20%",
    payableFee: 440000,
    emiMonths: 36,
    immersion: { fee: 150000, days: 5, location: "London, UK", inclusions: DBA_IMMERSION_INCLUSIONS },
  },
  {
    id: "esgci",
    university: "Ecole de Commerce International (ESGCI)",
    shortName: "ESGCI",
    logo: "https://ecampus-admin-ui.b-cdn.net/ecampus-images/5.svg",
    location: "Paris, France",
    duration: "3 Years",
    standardFee: 625000,
    waiver: "upto 20%",
    payableFee: 500000,
    emiMonths: 36,
  },
];

const MBA_IMMERSION_INCLUSIONS = [
  "On-campus immersion with industry sessions",
  "Faculty interaction & networking",
  "Campus tour & convocation-style meet",
];

/** `logo` is filled from the CMS university list on the MBA page (matched by name) */
export const MBA_FEE_PLANS: FeePlan[] = [
  {
    id: "amity",
    university: "Amity University Online",
    shortName: "Amity",
    location: "Noida, India",
    duration: "2 Years",
    standardFee: 225000,
    waiver: "upto 10%",
    payableFee: 199000,
    emiMonths: 24,
    immersion: { fee: 25000, days: 3, location: "Noida Campus", inclusions: MBA_IMMERSION_INCLUSIONS },
  },
  {
    id: "manipal",
    university: "Manipal University Jaipur",
    shortName: "Manipal",
    location: "Jaipur, India",
    duration: "2 Years",
    standardFee: 195000,
    waiver: "upto 10%",
    payableFee: 175000,
    emiMonths: 24,
  },
  {
    id: "nmims",
    university: "NMIMS Online",
    shortName: "NMIMS",
    location: "Mumbai, India",
    duration: "2 Years",
    standardFee: 220000,
    waiver: "upto 10%",
    payableFee: 196000,
    emiMonths: 24,
  },
  {
    id: "lpu",
    university: "Lovely Professional University Online",
    shortName: "LPU",
    location: "Phagwara, India",
    duration: "2 Years",
    standardFee: 180000,
    waiver: "upto 10%",
    payableFee: 160000,
    emiMonths: 24,
    immersion: { fee: 20000, days: 3, location: "Phagwara Campus", inclusions: MBA_IMMERSION_INCLUSIONS },
  },
  {
    id: "dy-patil",
    university: "DY Patil University Online",
    shortName: "DY Patil",
    location: "Navi Mumbai, India",
    duration: "2 Years",
    standardFee: 210000,
    waiver: "upto 10%",
    payableFee: 189000,
    emiMonths: 24,
  },
];
