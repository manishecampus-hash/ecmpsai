// Course / specialisation options for the lead form's dropdown.
// One form is used across the site; each button passes the list that matches its programme
// (e.g. an MBA page's "Apply Now" shows MBA specialisations). Unknown programmes fall back to
// DEFAULT_FORM_COURSES.
//
// NOTE: values are sent to the CRM as-is (field "course"), so keep them in the CRM's naming format.

/** Generic list, used when a button has no programme context */
export const DEFAULT_FORM_COURSES = [
  "BA",
  "BCOM",
  "BBA",
  "BCA",
  "BSC",
  "MA",
  "MCOM",
  "MBA",
  "MCA",
  "MSC",
  "BTech",
  "DBA",
  "HR & Analytics",
  "AI for Business Professionals",
  "Certificate in CTO & AI Leadership",
  "Certificate in Chief data & AI officer",
];

export const DBA_SPECIALISATIONS = [
  "DBA_(Business_Analytics)",
  "DBA_(Data_Science)",
  "DBA_(Finance)",
  "DBA_(General_Management)",
  "DBA_(Healthcare_Management)",
  "DBA_(Human_Resource_Management)",
  "DBA_(International_Business)",
  "DBA_(Marketing)",
  "DBA_(Supply_Chain_Management)",
  "DBA_(Information_Technology)",
  "DBA_(Internet_of_Things_IoT)",
  "DBA_(Cybersecurity)",
  "DBA_(Artificial_Intelligence_AI)",
];

export const MBA_SPECIALISATIONS = [
  "MBA_(Artificial_Intelligence_&_Machine_Learning)",
  "MBA_(Data_Science_and_Artificial_Intelligence)",
  "MBA_(Business_Intelligence_and_Analytics)",
  "MBA_(AI_for_Business_Strategy)",
  "MBA_(General)",
  "MBA_(Marketing)",
  "MBA_(Human_Resource_and_Business_Analytics)",
  "MBA_(Operations_Management)",
  "MBA_(Marketing_and_Business_Analytics)",
  "MBA_(Logistics_&_Supply_Chain_Management)",
  "MBA_(IT_&_FinTech)",
  "MBA_(International_Finance)",
  "MBA_(International_Business)",
  "MBA_(Information_Technology)",
  "MBA_(Hospitality_Management)",
  "MBA_(Healthcare_Management)",
  "MBA_(Financial_&_Accounting_Management)",
  "MBA_(Digital_Marketing_and_E-Commerce)",
  "MBA_(Business_&_Law)",
  "MBA_(Banking_and_Finance)",
  "MBA_(Agri_Business_Management)",
  "MBA - Project Management",
  "MBA - Operations Management",
];

// STATIC placeholder lists for the other programmes — update to the exact CRM values when available.
export const BBA_SPECIALISATIONS = [
  "BBA_(General)",
  "BBA_(Marketing)",
  "BBA_(Finance)",
  "BBA_(Human_Resource_Management)",
  "BBA_(International_Business)",
  "BBA_(Digital_Marketing)",
  "BBA_(Business_Analytics)",
  "BBA_(Logistics_&_Supply_Chain_Management)",
];

export const BCA_SPECIALISATIONS = [
  "BCA_(General)",
  "BCA_(Data_Science)",
  "BCA_(Artificial_Intelligence)",
  "BCA_(Cloud_Computing)",
  "BCA_(Cyber_Security)",
  "BCA_(Data_Analytics)",
];

export const BCOM_SPECIALISATIONS = [
  "BCOM_(General)",
  "BCOM_(Accounting_&_Finance)",
  "BCOM_(Banking_&_Insurance)",
  "BCOM_(Taxation)",
  "BCOM_(International_Finance)",
];

export const BA_SPECIALISATIONS = [
  "BA_(General)",
  "BA_(English)",
  "BA_(Economics)",
  "BA_(Political_Science)",
  "BA_(Psychology)",
  "BA_(History)",
  "BA_(Sociology)",
  "BA_(Journalism_&_Mass_Communication)",
];

export const BSC_SPECIALISATIONS = [
  "BSC_(Data_Science)",
  "BSC_(Information_Technology)",
  "BSC_(Computer_Science)",
  "BSC_(Mathematics)",
];

export const MA_SPECIALISATIONS = [
  "MA_(English)",
  "MA_(Economics)",
  "MA_(Political_Science)",
  "MA_(Psychology)",
  "MA_(History)",
  "MA_(Sociology)",
  "MA_(Journalism_&_Mass_Communication)",
];

/** MA in Journalism & Mass Communication — single course option */
export const MAJMC_SPECIALISATIONS = ["MAJMC"];

export const MCOM_SPECIALISATIONS = [
  "MCOM_(General)",
  "MCOM_(Accounting_&_Finance)",
  "MCOM_(Banking_&_Insurance)",
  "MCOM_(Taxation)",
  "MCOM_(Financial_Management)",
];

export const MCA_SPECIALISATIONS = [
  "MCA_(General)",
  "MCA_(Data_Science)",
  "MCA_(Artificial_Intelligence_&_Machine_Learning)",
  "MCA_(Cloud_Computing)",
  "MCA_(Cyber_Security)",
  "MCA_(Full_Stack_Development)",
];

export const MSC_SPECIALISATIONS = [
  "MSC_(Data_Science)",
  "MSC_(Information_Technology)",
  "MSC_(Computer_Science)",
  "MSC_(Mathematics)",
];

export const BTECH_SPECIALISATIONS = [
  "BTech_(Computer_Science_&_Engineering)",
  "BTech_(Electronics_&_Communication)",
  "BTech_(Mechanical_Engineering)",
  "BTech_(Civil_Engineering)",
];

/**
 * Matchers checked in order (doctorate / master's before bachelor's so "MBA" isn't read as "BA").
 * Names are lower-cased with dots removed, e.g. "Online M.Com" → "online mcom".
 */
const MATCHERS: [RegExp, string[]][] = [
  [/\bdba\b|doctor(ate)? of business/, DBA_SPECIALISATIONS],
  [/\bmba\b|master of business/, MBA_SPECIALISATIONS],
  [/\bmca\b|master of computer/, MCA_SPECIALISATIONS],
  [/\bmcom\b|master of commerce/, MCOM_SPECIALISATIONS],
  [/\bmsc\b|master of science/, MSC_SPECIALISATIONS],
  // before MA, so "MAJMC" / "MA in Journalism & Mass Communication" get their own list
  [/\bmajmc\b|journalism (and|&) mass comm/, MAJMC_SPECIALISATIONS],
  [/\bma\b|master of arts/, MA_SPECIALISATIONS],
  [/\bbba\b|bachelor of business/, BBA_SPECIALISATIONS],
  [/\bbca\b|bachelor of computer/, BCA_SPECIALISATIONS],
  [/\bbcom\b|bachelor of commerce/, BCOM_SPECIALISATIONS],
  [/\bbsc\b|bachelor of science/, BSC_SPECIALISATIONS],
  [/\bb ?tech\b|bachelor of technology/, BTECH_SPECIALISATIONS],
  [/\bba\b|bachelor of arts/, BA_SPECIALISATIONS],
];

/**
 * Dropdown options for a programme, from its name or slug ("Online MBA", "online-bca", "M.Com").
 * Returns undefined when nothing matches, so the form shows DEFAULT_FORM_COURSES.
 */
export function getFormCourses(programName?: string | null): string[] | undefined {
  if (!programName) return undefined;
  const name = programName.toLowerCase().replace(/\./g, "").replace(/[-_/]+/g, " ");
  for (const [re, list] of MATCHERS) {
    if (re.test(name)) return list;
  }
  return undefined;
}
