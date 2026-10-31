// University pairs shown on /compare — the hero showcase and the comparison cards both read from here.
// The global pairs reuse the facts already in data/comparisons.ts and the /compare/result fees.
// TODO: Indian university fees are indicative full-program Online MBA fees — replace with figures from the API when available.

export interface CompareUniversity {
  name: string;
  short: string;
  logo?: string; // wide logo on a white background; a monogram is shown when there is none
  location: string;
  established: number;
  approvals: string;
  fee: string;
  duration: string;
}

export interface ComparePair {
  id: string;
  program: string;
  region: "global" | "india";
  cover?: string; // full "A vs B" banner
  a: CompareUniversity;
  b: CompareUniversity;
}

export const COMPARE_PAIRS: ComparePair[] = [
  {
    id: "rushford-vs-eimt",
    program: "Online DBA",
    region: "global",
    cover: "/compare/rushford vs eimt.png",
    a: {
      name: "Rushford Business School",
      short: "Rushford",
      logo: "/universities/rushford.png",
      location: "Lucerne, Switzerland",
      established: 2008,
      approvals: "EduQua • QS 5-Star",
      fee: "₹4,50,000",
      duration: "36 months",
    },
    b: {
      name: "EIMT Switzerland",
      short: "EIMT",
      location: "Cham, Switzerland",
      established: 1987,
      approvals: "ACBSP • EURASHE",
      fee: "₹4.5L – ₹6.2L",
      duration: "36 months",
    },
  },
  {
    id: "ssbm-vs-esgci",
    program: "Executive DBA",
    region: "global",
    cover: "/compare/ssbm vs esgci.png",
    a: {
      name: "SSBM Geneva",
      short: "SSBM",
      logo: "/universities/ssbm.png",
      location: "Geneva, Switzerland",
      established: 2012,
      approvals: "ACBSP • EduQua",
      fee: "€5,000 – €7,000",
      duration: "36 months",
    },
    b: {
      name: "ESGCI Paris",
      short: "ESGCI",
      logo: "/universities/esgci.png",
      location: "Paris, France",
      established: 1986,
      approvals: "Qualiopi • French State",
      fee: "€6,000 – €8,000",
      duration: "36 months",
    },
  },
  {
    id: "ggu-vs-edgewood",
    program: "DBA & MBA",
    region: "global",
    cover: "/compare/ggu vs edgewood.png",
    a: {
      name: "Golden Gate University",
      short: "GGU",
      logo: "/universities/ggu.png",
      location: "California, USA",
      established: 1901,
      approvals: "WASC • AACSB Member",
      fee: "$7,000 – $9,000",
      duration: "24–36 months",
    },
    b: {
      name: "Edgewood University",
      short: "Edgewood",
      logo: "/universities/edgewood.png",
      location: "Madison, Wisconsin, USA",
      established: 1927,
      approvals: "HLC Accredited",
      fee: "$6,500 – $8,500",
      duration: "12–24 months",
    },
  },
  {
    id: "lsmt-vs-birchwood",
    program: "Doctorate / DBA",
    region: "global",
    cover: "/compare/lsmt vs birchwood.png",
    a: {
      name: "LSMT University",
      short: "LSMT",
      location: "London, United Kingdom",
      established: 2001,
      approvals: "UK Framework • WES",
      fee: "£4,500 – £6,500",
      duration: "24–36 months",
    },
    b: {
      name: "Birchwood University",
      short: "Birchwood",
      location: "Orlando, Florida, USA",
      established: 2002,
      approvals: "Florida Licensed • WES",
      fee: "$5,500 – $7,500",
      duration: "24–36 months",
    },
  },
  {
    id: "amity-vs-manipal-jaipur",
    program: "Online MBA",
    region: "india",
    a: {
      name: "Amity University Online",
      short: "Amity",
      logo: "/universities/amity.webp",
      location: "Noida, Uttar Pradesh",
      established: 2005,
      approvals: "UGC-DEB • NAAC A+",
      fee: "₹1,99,000",
      duration: "2 years",
    },
    b: {
      name: "Manipal University Jaipur Online",
      short: "Manipal Jaipur",
      logo: "/universities/manipal.png",
      location: "Jaipur, Rajasthan",
      established: 2011,
      approvals: "UGC-DEB • NAAC A+",
      fee: "₹1,75,000",
      duration: "2 years",
    },
  },
  {
    id: "chandigarh-vs-gla",
    program: "Online MBA",
    region: "india",
    a: {
      name: "Chandigarh University Online",
      short: "Chandigarh",
      logo: "/universities/cu.png",
      location: "Mohali, Punjab",
      established: 2012,
      approvals: "UGC-DEB • NAAC A+",
      fee: "₹1,65,000",
      duration: "2 years",
    },
    b: {
      name: "GLA University Online",
      short: "GLA",
      logo: "/universities/gla.png",
      location: "Mathura, Uttar Pradesh",
      established: 2010,
      approvals: "UGC-DEB • NAAC A+",
      fee: "₹1,40,000",
      duration: "2 years",
    },
  },
  {
    id: "jain-vs-sharda",
    program: "Online MBA",
    region: "india",
    a: {
      name: "Jain University Online",
      short: "Jain",
      logo: "/universities/jain.png",
      location: "Bengaluru, Karnataka",
      established: 2009,
      approvals: "UGC-DEB • NAAC A++",
      fee: "₹1,96,000",
      duration: "2 years",
    },
    b: {
      name: "Sharda University Online",
      short: "Sharda",
      logo: "/universities/sharda.png",
      location: "Greater Noida, Uttar Pradesh",
      established: 2009,
      approvals: "UGC-DEB • NAAC A+",
      fee: "₹1,40,000",
      duration: "2 years",
    },
  },
  {
    id: "galgotias-vs-uttaranchal",
    program: "Online MBA",
    region: "india",
    a: {
      name: "Galgotias University Online",
      short: "Galgotias",
      logo: "/universities/galgotias.png",
      location: "Greater Noida, Uttar Pradesh",
      established: 2011,
      approvals: "UGC-DEB • NAAC A+",
      fee: "₹1,20,000",
      duration: "2 years",
    },
    b: {
      name: "Uttaranchal University Online",
      short: "Uttaranchal",
      logo: "/universities/utranchal.png",
      location: "Dehradun, Uttarakhand",
      established: 2013,
      approvals: "UGC-DEB • NAAC A+",
      fee: "₹1,24,000",
      duration: "2 years",
    },
  },
  {
    id: "shoolini-vs-mangalayatan",
    program: "Online MBA",
    region: "india",
    a: {
      name: "Shoolini University Online",
      short: "Shoolini",
      logo: "/universities/shoolini.png",
      location: "Solan, Himachal Pradesh",
      established: 2009,
      approvals: "UGC-DEB • NAAC A+",
      fee: "₹1,60,000",
      duration: "2 years",
    },
    b: {
      name: "Mangalayatan University Online",
      short: "Mangalayatan",
      logo: "/universities/MU.png",
      location: "Aligarh, Uttar Pradesh",
      established: 2006,
      approvals: "UGC-DEB • NAAC A+",
      fee: "₹90,000",
      duration: "2 years",
    },
  },
  {
    id: "smu-vs-andhra",
    program: "Online MBA",
    region: "india",
    a: {
      name: "Sikkim Manipal University Online",
      short: "Sikkim Manipal",
      logo: "/universities/SMU.webp",
      location: "Gangtok, Sikkim",
      established: 1995,
      approvals: "UGC-DEB • NAAC A+",
      fee: "₹1,10,000",
      duration: "2 years",
    },
    b: {
      name: "Andhra University Online",
      short: "Andhra",
      logo: "/universities/andhra.png",
      location: "Visakhapatnam, Andhra Pradesh",
      established: 1926,
      approvals: "UGC-DEB • NAAC A++",
      fee: "₹70,000",
      duration: "2 years",
    },
  },
];
