export interface SpecializationRow {
  id: string;
  course: string;
  specialization: string;
  duration: string;
  fees: string;
  emi: string;
  brochure?: string;
}

export const DEFAULT_SPECIALIZATIONS_DATA: SpecializationRow[] = [
  {
    id: "1",
    course: "B.Tech",
    specialization: "Cloud & Cyber Security",
    duration: "4 Years",
    fees: "₹2,80,000",
    emi: "INR 7,775/mo*",
  },
  {
    id: "2",
    course: "B.Tech",
    specialization: "Artificial Intelligence & Data Science",
    duration: "4 Years",
    fees: "₹3,20,000",
    emi: "INR 8,888/mo*",
  },
  {
    id: "3",
    course: "B.Com",
    specialization: "General Accountancy",
    duration: "3 Years",
    fees: "₹99,000",
    emi: "INR 2,750/mo*",
  },
  {
    id: "4",
    course: "B.Com",
    specialization: "Honours & Corporate Finance",
    duration: "3 Years",
    fees: "₹1,50,000",
    emi: "INR 4,166/mo*",
  },
  {
    id: "5",
    course: "B.Com",
    specialization: "International Accounting & Finance",
    duration: "3 Years",
    fees: "₹2,25,000",
    emi: "INR 6,250/mo*",
  },
  {
    id: "6",
    course: "BA",
    specialization: "Liberal Arts & Economics",
    duration: "3 Years",
    fees: "₹99,000",
    emi: "INR 2,750/mo*",
  },
  {
    id: "7",
    course: "BA",
    specialization: "Sociology & Human Behavior",
    duration: "3 Years",
    fees: "₹99,000",
    emi: "INR 2,750/mo*",
  },
  {
    id: "8",
    course: "BA",
    specialization: "Journalism & Digital Media",
    duration: "3 Years",
    fees: "₹1,70,000",
    emi: "INR 4,722/mo*",
  },
  {
    id: "9",
    course: "BA",
    specialization: "Political Science & Governance",
    duration: "3 Years",
    fees: "₹99,000",
    emi: "INR 2,750/mo*",
  },
  {
    id: "10",
    course: "BA",
    specialization: "English Literature",
    duration: "3 Years",
    fees: "₹85,000",
    emi: "INR 2,361/mo*",
  },
  {
    id: "11",
    course: "MCA",
    specialization: "Advanced Software Engineering",
    duration: "2 Years",
    fees: "₹1,70,000",
    emi: "INR 7,083/mo*",
  },
  {
    id: "12",
    course: "MCA",
    specialization: "Blockchain Systems & Management",
    duration: "2 Years",
    fees: "₹1,70,000",
    emi: "INR 7,083/mo*",
  },
  {
    id: "13",
    course: "MCA",
    specialization: "FinTech Systems & Cloud Architecture",
    duration: "2 Years",
    fees: "₹2,75,000",
    emi: "INR 11,458/mo*",
  },
  {
    id: "14",
    course: "MBA",
    specialization: "Strategic Marketing & Analytics",
    duration: "2 Years",
    fees: "₹2,50,000",
    emi: "INR 10,416/mo*",
  },
  {
    id: "15",
    course: "MBA",
    specialization: "Human Resource Transformation",
    duration: "2 Years",
    fees: "₹2,50,000",
    emi: "INR 10,416/mo*",
  },
];