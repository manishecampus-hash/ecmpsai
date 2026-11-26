// Online MBA fee structure for the /lp/online-mba page.
// Amounts are taken from each university's own Online MBA page (source URL on every plan).
// STATIC for now — replace with CMS / API data later. Amounts are in INR.

export interface MbaFeeOption {
  /** Amount payable for this option */
  price: number;
  /** Price before the discount — shown struck through */
  original?: number;
  /** Shown after the price, e.g. "/year" */
  per?: string;
  /** Small line under the price (as on the university's page) */
  note: string;
  /** Total cost of the programme when paying this way */
  effective: number;
  /** Defaults to "Effective fee of" */
  effectiveLabel?: string;
}

export interface MbaFeePlan {
  id: string;
  /** Matches the university slug in the CMS ("Top Online MBA Universities") */
  slug: string;
  label: string;
  name: string;
  logo?: string;
  location?: string;
  tabNote?: string;
  duration: string;
  oneTime: MbaFeeOption;
  annual: MbaFeeOption;
  semester: MbaFeeOption;
  /** EMI line under the cards */
  emi?: string;
  /** Charges not included in the cards */
  extras?: string;
  source: string;
}

export const MBA_FEE_PLANS: MbaFeePlan[] = [
  {
    id: "amity",
    slug: "amity-university-online",
    label: "Amity University Online",
    name: "Amity University Online",
    location: "Noida, UP",
    tabNote: "Self Pay Benefits",
    duration: "2 Years · 4 Semesters",
    oneTime: { price: 207000, original: 225000, note: "Self Pay Benefits", effective: 207000 },
    annual: { price: 106880, original: 112500, per: "/year", note: "Self Pay Benefits", effective: 213750 },
    semester: { price: 56300, per: "/semester", note: "Self Pay Benefits", effective: 225000 },
    emi: "24 Months No-Cost EMI at ₹8,906/month (0% interest)",
    source: "https://amityonline.com/master-of-business-administration-online",
  },
  {
    id: "gla",
    slug: "gla-university-online",
    label: "GLA University Online",
    name: "GLA University Online",
    location: "Mathura, Uttar Pradesh",
    tabNote: "₹4,000 benefit on full fee",
    duration: "24 Months · 4 Semesters",
    oneTime: {
      price: 93000,
      original: 97000,
      note: "₹4,000 benefit on total programme fee",
      effective: 93000,
      effectiveLabel: "Effective tuition fee of",
    },
    annual: {
      price: 48500,
      per: "/year",
      note: "₹2,000 benefit on first-year fee",
      effective: 95000,
      effectiveLabel: "Effective tuition fee of",
    },
    semester: {
      price: 24250,
      per: "/semester",
      note: "Tuition fee per semester",
      effective: 97000,
      effectiveLabel: "Effective tuition fee of",
    },
    emi: "No-Cost EMI available",
    extras: "Registration ₹500 & Alumni ₹1,800 (one-time) and Exam fee ₹1,500 per semester are charged separately.",
    source: "https://glaonline.com/program/online-mba",
  },
  {
    id: "muj",
    slug: "manipal-university-online",
    label: "Manipal University Jaipur",
    name: "Manipal University Jaipur Online",
    location: "Jaipur, Rajasthan",
    tabNote: "15% discount",
    duration: "2 Years · 4 Semesters",
    oneTime: { price: 156400, original: 184000, note: "15% discount", effective: 156400 },
    annual: { price: 78200, original: 92000, per: "/year", note: "15% discount", effective: 156400 },
    semester: { price: 39100, original: 46000, per: "/semester", note: "15% discount", effective: 156400 },
    emi: "No-Cost EMI available",
    extras: "One-time registration fee of ₹500.",
    source: "https://www.onlinemanipal.com/online-mba-manipal-university-jaipur",
  },
  {
    id: "smu",
    slug: "sikkim-manipal-university-online",
    label: "Sikkim Manipal University",
    name: "Sikkim Manipal University Online",
    location: "Gangtok, Sikkim",
    tabNote: "10% discount",
    duration: "2 Years · 4 Semesters",
    oneTime: { price: 108000, original: 120000, note: "10% discount", effective: 108000 },
    annual: { price: 54000, original: 60000, per: "/year", note: "10% discount", effective: 108000 },
    semester: { price: 27000, original: 30000, per: "/semester", note: "10% discount", effective: 108000 },
    emi: "No-Cost EMI available",
    extras: "Non-refundable application fee of ₹500.",
    source: "https://www.onlinemanipal.com/online-mba-degree-dual-specialization-smu",
  },
  {
    id: "cu",
    slug: "chandigarh-university-online",
    label: "Chandigarh University Online",
    name: "Chandigarh University Online",
    location: "Mohali, Punjab",
    tabNote: "25% Early Bird Scholarship",
    duration: "2 Years · 4 Semesters",
    oneTime: { price: 175125, original: 233500, note: "25% Early Bird Scholarship", effective: 175125 },
    annual: { price: 87563, per: "/year", note: "25% Early Bird Scholarship", effective: 175125 },
    semester: { price: 43781, per: "/semester", note: "25% Early Bird Scholarship", effective: 175125 },
    emi: "No-Cost EMI available",
    extras: "Includes Harvard Business Publishing certification. Book your seat by paying ₹10,000.",
    source: "https://www.onlinecu.in/online-mba.php",
  },
  {
    id: "vgu",
    slug: "vivekananda-global-university-online",
    label: "Vivekananda Global University",
    name: "Vivekananda Global University Online",
    location: "Jaipur, Rajasthan",
    tabNote: "Save 15% on full payment",
    duration: "2 Years · 4 Semesters",
    oneTime: { price: 127500, original: 150000, note: "Best value: save 15%", effective: 127500 },
    annual: { price: 67500, original: 75000, per: "/year", note: "Save 10%", effective: 135000 },
    semester: { price: 37500, per: "/semester", note: "Pay semester by semester", effective: 150000 },
    emi: "No-Cost EMI from ₹6,250/month",
    extras: "Registration ₹1,000 (one-time) and Exam fee ₹1,500 per semester are charged separately.",
    source: "https://onlinevgu.com/programs/online-mba",
  },
];
