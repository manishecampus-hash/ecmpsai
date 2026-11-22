// DBA fee structure — same universities, amounts and wording as the "Online DBA Fee Structure"
// section on dba.ecampusapp.com. Values are display text, kept exactly as shown there.
// STATIC for now — replace with CMS / API data later.

export interface FeePlan {
  id: string;
  /** Tab label (as in the reference dropdown) */
  label: string;
  /** Name used in the CTA ("Download {name} Brochure") and the brochure popup */
  name: string;
  logo?: string;
  location?: string;
  /** Small note under the tab label */
  tabNote?: string;
  /** Title pill of the fee card */
  cardTitle: string;
  /** Small line under the title pill (e.g. "Without Immersion") */
  cardSubtitle?: string;
  standardFee: string;
  /** Small note under the standard fee (e.g. "(Including taxes)") */
  standardFeeNote?: string;
  waiver: string;
  /** Omitted when the reference doesn't show a payable fee */
  payableFee?: string;
  taxText?: string;
  emiTitle: string;
  emi: string;
  /** Seat-block amount for "* Block your seat now with only …" */
  seat: string;
  /** Separate immersion card — omitted for single-card universities */
  immersion?: {
    title: string;
    price: string;
    taxText: string;
    showInclusionsTitle: boolean;
    inclusions: string[];
  };
}

const IMMERSION_INCLUSIONS = [
  "On-campus Immersion with accommodation & meals",
  "Academic & Group mentoring sessions",
  "City tour",
];

export const DBA_FEE_PLANS: FeePlan[] = [
  {
    id: "rushford",
    label: "Rushford Business School",
    name: "Rushford University",
    logo: "https://ecampus-admin-ui.b-cdn.net/ecampus-images/2.svg",
    location: "Lucerne, Switzerland",
    tabNote: "+ Immersion option",
    cardTitle: "Fee (without Immersion)",
    standardFee: "INR 4,50,000",
    waiver: "INR 1,00,000",
    payableFee: "INR 3,50,000/-",
    taxText: "Including taxes",
    emiTitle: "Complete your doctorate starting",
    emi: "INR 9,722/month",
    seat: "₹25,000",
    immersion: {
      title: "Immersion Fee",
      price: "INR 1,50,000*",
      taxText: "Inclusive of taxes",
      showInclusionsTitle: false,
      inclusions: IMMERSION_INCLUSIONS,
    },
  },
  {
    id: "esgci",
    label: "ESGCI",
    name: "ESGCI",
    logo: "https://ecampus-admin-ui.b-cdn.net/ecampus-images/5.svg",
    location: "Paris, France",
    tabNote: "+ Immersion option",
    cardTitle: "Without Immersion",
    standardFee: "INR 7,15,000/-*",
    waiver: "INR 50,000/-*",
    payableFee: "INR 6,65,000/-",
    taxText: "Including taxes",
    emiTitle: "Complete your doctorate starting",
    emi: "INR 19,475/month",
    seat: "₹25,000",
    immersion: {
      title: "Immersion Fee",
      price: "INR 2,75,000*",
      taxText: "Inclusive of taxes",
      showInclusionsTitle: true,
      inclusions: IMMERSION_INCLUSIONS,
    },
  },
  {
    id: "ssbm",
    label: "SSBM",
    name: "SSBM",
    location: "Geneva, Switzerland",
    tabNote: "+ Immersion option",
    cardTitle: "DBA (without Immersion)",
    standardFee: "INR 7,50,000",
    waiver: "INR 1,00,000",
    payableFee: "INR 6,50,000/-",
    taxText: "Including taxes",
    emiTitle: "Complete your doctorate starting",
    emi: "INR 18,055/month",
    seat: "₹25,000",
    immersion: {
      title: "Immersion Fee",
      price: "INR 3,50,000*",
      taxText: "Inclusive of taxes",
      showInclusionsTitle: true,
      inclusions: IMMERSION_INCLUSIONS,
    },
  },
  {
    id: "goldengate",
    label: "Golden Gate University",
    name: "Golden Gate University",
    logo: "https://ecampus-admin-ui.b-cdn.net/ecampus-images/3.svg",
    location: "San Francisco, California",
    tabNote: "+ Immersion option",
    cardTitle: "DBA (without Immersion)",
    standardFee: "INR 10,65,000",
    standardFeeNote: "(Including taxes)",
    waiver: "upto 20%",
    emiTitle: "Complete your doctorate starting",
    emi: "INR 22,222/month*",
    seat: "₹44,999",
    immersion: {
      title: "Immersion Fee",
      price: "INR 2,25,000*",
      taxText: "Inclusive of taxes",
      showInclusionsTitle: true,
      inclusions: ["7 days On-campus Immersion with meals", "Lectures & Group mentoring sessions", "City tour"],
    },
  },
  {
    id: "lsmt",
    label: "LSMT University",
    name: "LSMT University",
    logo: "https://ecampus-admin-ui.b-cdn.net/ecampus-images/6.svg",
    location: "Croydon, United Kingdom",
    tabNote: "Without immersion",
    cardTitle: "Doctor of Business Administration",
    cardSubtitle: "Without Immersion",
    standardFee: "INR 4,00,000",
    waiver: "INR 50,000",
    payableFee: "INR 3,50,000/-",
    taxText: "No taxes applicable.",
    emiTitle: "No Cost EMI starts",
    emi: "INR 9,722/month",
    seat: "₹25,000/-",
  },
  {
    id: "floridacoastal",
    label: "Florida Coastal University",
    name: "Florida Coastal University",
    location: "Jacksonville, United States",
    tabNote: "Without immersion",
    cardTitle: "Doctor of Business Administration",
    cardSubtitle: "Without Immersion",
    standardFee: "INR 4,00,000",
    waiver: "INR 50,000",
    payableFee: "INR 3,50,000/-",
    taxText: "No taxes applicable.",
    emiTitle: "No Cost EMI starts",
    emi: "INR 9,722/month",
    seat: "₹25,000/-",
  },
  {
    id: "birchwood",
    label: "Birchwood University",
    name: "Birchwood University",
    location: "Florida, USA",
    tabNote: "Without immersion",
    cardTitle: "Doctor of Business Administration",
    cardSubtitle: "Without Immersion",
    standardFee: "INR 5,00,000",
    waiver: "INR 50,000",
    payableFee: "INR 4,50,000/-",
    taxText: "No taxes applicable.",
    emiTitle: "No Cost EMI starts",
    emi: "INR 15,270/month",
    seat: "₹25,000",
  },
  {
    id: "eimt",
    label: "EIMT",
    name: "EIMT",
    location: "Cham, Switzerland",
    tabNote: "Without immersion",
    cardTitle: "Doctor of Business Administration",
    cardSubtitle: "Without Immersion",
    standardFee: "INR 4,00,000",
    waiver: "INR 50,000",
    payableFee: "INR 3,50,000/-",
    taxText: "No taxes applicable.",
    emiTitle: "No Cost EMI starts",
    emi: "INR 9,722/month",
    seat: "₹25,000",
  },
  {
    id: "edgewood",
    label: "Edgewood University",
    name: "Edgewood University",
    location: "Madison, USA",
    cardTitle: "Doctor of Business Administration",
    standardFee: "INR 9,50,000/-*",
    waiver: "INR 50,000",
    payableFee: "INR 9,00,000/-*",
    taxText: "Including taxes",
    emiTitle: "Complete your doctorate starting",
    emi: "INR 23,000/month",
    seat: "₹25,000",
  },
];
