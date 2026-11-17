/**
 * Shared, framework-agnostic content for the /study/[slug] LMS pages.
 * Used by both the client UI and the server (JSON-LD), so the FAQs shown
 * on the page always match the FAQPage structured data.
 */

export interface LmsFaqInput {
  name: string;
  shortName: string;
  lmsHost?: string;
  contactDetails?: string;
}

export interface LmsFaq {
  q: string;
  a: string;
}

export function buildLmsFaqs({ name, shortName, lmsHost, contactDetails }: LmsFaqInput): LmsFaq[] {
  return [
    {
      q: `How do I log in to the ${name} LMS?`,
      a: `Click the "Go to LMS Portal" button on this page to open the official ${name} learning portal${lmsHost ? ` (${lmsHost})` : ""}. Sign in using the username or enrolment number and password provided by the university after your admission is confirmed.`,
    },
    {
      q: `I forgot my ${shortName} LMS password. What should I do?`,
      a: `Use the "Forgot Password" option on the LMS login page, if available. If you still can't sign in, contact the ${name} student support team${contactDetails ? ` at ${contactDetails}` : ""} to reset your credentials.`,
    },
    {
      q: `Is this the official ${shortName} LMS link?`,
      a: `Yes. The link on this page points to the official LMS published by ${name}. eCampus only redirects you to the portal — we never ask for or store your LMS password.`,
    },
    {
      q: `When will I receive my ${shortName} LMS login credentials?`,
      a: "Credentials are usually shared on your registered email once your admission, document verification and fee payment are complete. Check your spam folder if you can't find them.",
    },
    {
      q: `Can I access the ${shortName} LMS on my phone?`,
      a: "Most university learning portals work in any modern mobile browser. Some universities also offer a dedicated app — check the portal's login page or your welcome email for details.",
    },
  ];
}
