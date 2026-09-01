import Link from "next/link";
import { Metadata } from "next";
import { ChevronRight, ShieldCheck, Clock, Mail, Building2, Globe, Lock, UserCheck, KeyRound } from "lucide-react";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Ecampus",
  description:
    "Learn how Ecampus Technologies Private Limited collects, uses, protects, and handles your personal information when you use our website and educational services.",
  alternates: {
    canonical: "/privacy",
  },
};

const privacySections = [
  {
    id: "about-ecampus",
    number: "1",
    title: "About Ecampus",
    content: [
      "Ecampus Technologies Private Limited is a company incorporated under the laws of India.",
      "We provide technology-enabled education and related services, which may include course discovery, educational programme information, student enquiries, counselling, application and admission assistance, learning services, student support, and related services.",
      "Depending on the country from which you access our Services, additional country-specific privacy requirements or notices may apply.",
    ],
  },
  {
    id: "information-we-collect",
    number: "2",
    title: "Information We Collect",
    content: [
      "We may collect different categories of information depending on how you interact with our Services.",
    ],
    subsections: [
      {
        title: "2.1 Information You Provide Directly",
        text: "You may provide personal information when you create an account, submit an enquiry, request course info, apply for a programme, communicate with counselling, make a payment, or participate in surveys/events.",
        bullets: [
          "Full name;",
          "Date of birth or age (where required);",
          "Email address and mobile/telephone number;",
          "Residential or correspondence address, country, state, or city;",
          "Educational qualifications & employment or professional information;",
          "Course or programme preferences & application information;",
          "Documents submitted for admission or verification;",
          "Payment and transaction information; and",
          "Other information that you voluntarily provide.",
        ],
      },
      {
        title: "2.2 Information Collected Automatically",
        text: "When you access our website or Services, certain technical information may be collected automatically, including:",
        bullets: [
          "IP address, browser type and version, device type, operating system;",
          "Language preferences and approximate geographic location;",
          "Pages visited, links/buttons interacted with, date/time of access;",
          "Referring website source, session information, and website usage metrics.",
        ],
      },
      {
        title: "2.3 Cookies and Similar Technologies",
        text: "We may use cookies, pixels, tags, local storage, and analytics tools to operate our website, remember preferences, maintain sessions, measure performance/advertising, and prevent fraud. Disabling certain cookies may affect website functionality.",
      },
    ],
  },
  {
    id: "how-we-use-information",
    number: "3",
    title: "How We Use Personal Information",
    content: [
      "We process your personal information for the following core business purposes:",
    ],
    bullets: [
      "Providing and Operating Our Services: Processing enquiries, applications, admissions assistance, customer support, and account management.",
      "Communication: Responding to requests, sending application/admission updates, service notices, and permitted promotional messages.",
      "Improving Our Services: Analyzing user interactions to enhance website user experience, course discovery, and technology infrastructure.",
      "Security and Fraud Prevention: Detecting fraud, protecting accounts, monitoring suspicious activity, and securing systems.",
      "Legal and Regulatory Compliance: Complying with applicable laws, responding to lawful authority requests, and meeting tax/accounting requirements.",
    ],
  },
  {
    id: "legal-basis-for-processing",
    number: "4",
    title: "Legal Basis for Processing",
    content: [
      "Depending on the jurisdiction and circumstances, we process personal information based on:",
    ],
    bullets: [
      "Your explicit consent;",
      "Performance of a contract or steps taken at your request before entering into a contract;",
      "Compliance with legal obligations;",
      "Legitimate business interests (where permitted by applicable law); and",
      "Protection of our legal rights, users, and infrastructure.",
    ],
    footerText:
      "Where consent is required by applicable law, you may withdraw your consent at any time. Withdrawal of consent does not affect the lawfulness of processing carried out prior to withdrawal.",
  },
  {
    id: "educational-and-admission-info",
    number: "5",
    title: "Educational and Admission Information",
    content: [
      "If you use Ecampus to enquire about or apply for an educational programme, we process academic qualifications, professional background, course choices, identification documents, and contact details.",
      "Where an application involves a university, college, awarding body, or partner institution, relevant information is shared with that entity to process your enquiry or admission.",
      "The relevant institution will separately process your data under its own privacy policies.",
    ],
  },
  {
    id: "payments",
    number: "6",
    title: "Payments",
    content: [
      "Payment transactions are processed by Ecampus or authorised third-party payment service providers.",
      "We receive transaction metadata (amount, date, status, transaction ID) but generally do not store complete credit card numbers, CVV codes, or sensitive payment credentials.",
      "Third-party payment gateways process your data according to their respective privacy policies.",
    ],
  },
  {
    id: "how-we-share-information",
    number: "7",
    title: "How We Share Personal Information",
    content: [
      "We share personal information only as reasonably necessary with:",
    ],
    bullets: [
      "Educational Institutions: Partner universities, colleges, and awarding bodies to process admissions and course enquiries.",
      "Service Providers: Hosting, cloud infrastructure, CRM systems, email/SMS gateways, analytics tools, payment processors, and customer support vendors.",
      "Professional Advisers: Lawyers, auditors, accountants, insurers, and consultants.",
      "Government & Legal Authorities: When required or permitted by applicable law, court order, or regulatory bodies.",
      "Business Transfers: In the event of a merger, acquisition, restructuring, or asset sale, subject to applicable data privacy laws.",
    ],
  },
  {
    id: "international-data-transfers",
    number: "8",
    title: "International Data Transfers",
    content: [
      "Ecampus operates using global technology infrastructure and educational partners located in various countries.",
      "Consequently, your personal information may be transferred to, stored in, or processed outside your home jurisdiction.",
      "Where required by law, we implement standard contractual clauses and appropriate technical safeguards for cross-border data transfers.",
    ],
  },
  {
    id: "data-retention",
    number: "9",
    title: "Data Retention",
    content: [
      "We retain personal information only for as long as necessary to fulfill the purposes for which it was collected, including fulfilling educational requests, resolving disputes, maintaining accounting records, and complying with legal obligations.",
      "Once data is no longer required, it is securely deleted, anonymised, or disposed of in accordance with our data destruction policies.",
    ],
  },
  {
    id: "data-security",
    number: "10",
    title: "Data Security",
    content: [
      "We implement administrative, physical, and technical safeguards designed to protect personal data against unauthorized access, disclosure, loss, misuse, alteration, or destruction.",
      "Safeguards include encryption protocols, strict access controls, secure cloud infrastructure, and regular system monitoring.",
      "While we maintain robust security standards, no electronic transmission or storage system can be guaranteed 100% secure.",
    ],
  },
  {
    id: "your-rights",
    number: "11",
    title: "Your Rights",
    content: [
      "Depending on your geographic location and applicable privacy laws, you may hold rights regarding your personal information, including:",
    ],
    bullets: [
      "Access: Request a copy of personal information we hold about you.",
      "Correction: Request rectification of inaccurate or incomplete data.",
      "Erasure / Deletion: Request deletion of personal data where legally applicable.",
      "Withdraw Consent: Withdraw consent previously granted for processing.",
      "Objection / Restriction: Object to or restrict specific processing activities.",
      "Marketing Opt-Out: Unsubscribe from promotional communications at any time.",
    ],
    footerText:
      "To exercise any of these rights, please contact our privacy team using the contact details provided below. Identity verification may be required.",
  },
  {
    id: "marketing-communications",
    number: "12",
    title: "Marketing Communications",
    content: [
      "With your consent or as permitted by law, we may send information about relevant courses, admissions, events, and promotions via Email, SMS, WhatsApp, or phone calls.",
      "You can unsubscribe from marketing emails via the 'Unsubscribe' link or reply STOP to SMS/WhatsApp messages.",
      "Please note that transactional and service-critical communications (e.g., application updates, receipts) will still be sent.",
    ],
  },
  {
    id: "cookies-and-analytics",
    number: "13",
    title: "Cookies and Analytics",
    content: [
      "We utilize third-party analytics tools (e.g., Google Analytics) to evaluate website traffic, user journeys, campaign performance, and feature usage.",
      "You can manage cookie preferences directly in your web browser settings.",
    ],
  },
  {
    id: "third-party-websites",
    number: "14",
    title: "Third-Party Websites and Services",
    content: [
      "Our website may contain links to third-party university portals, payment engines, or external websites.",
      "This Privacy Policy does not apply to external websites. We advise reviewing the individual privacy statements of any third-party sites you visit.",
    ],
  },
  {
    id: "childrens-privacy",
    number: "15",
    title: "Children's Privacy",
    content: [
      "Our Services are primarily intended for students and adults seeking higher education.",
      "We do not knowingly collect personal data from minors without parental or guardian consent where required by applicable law.",
      "If you believe a minor has provided us with personal information without consent, please notify us immediately for prompt deletion.",
    ],
  },
  {
    id: "multi-country-users",
    number: "16",
    title: "Data of Users in Different Countries",
    content: [
      "Ecampus serves students globally (including India, the United Arab Emirates, and other international jurisdictions).",
      "Where local regulations grant additional privacy rights or require localized consent mechanisms, we adhere to applicable legal standards.",
    ],
  },
  {
    id: "do-not-track",
    number: "17",
    title: "Do Not Track and Similar Signals",
    content: [
      "Because industry standards for browser 'Do Not Track' (DNT) signals are not uniform, our platform may not alter behavior in response to all DNT signals unless explicitly mandated by local law.",
    ],
  },
  {
    id: "policy-changes",
    number: "18",
    title: "Changes to This Privacy Policy",
    content: [
      "We periodically update this Privacy Policy to reflect changes in our Services, legal obligations, or technical infrastructure.",
      "Updates are posted on this page with a revised 'Last Updated' date.",
    ],
  },
  {
    id: "contact-us",
    number: "19",
    title: "Contact Us",
    content: [
      "If you have any questions, requests, or privacy concerns, you can contact our privacy team:",
    ],
    contactCard: {
      company: "Ecampus Technologies Private Limited",
      email: "support@ecampusapp.com",
      website: "www.ecampusapp.com",
    },
  },
  {
    id: "grievance-complaints",
    number: "20",
    title: "Grievance / Privacy Complaints",
    content: [
      "If you have concerns regarding how your data is handled, you may submit a formal complaint to our contact email above.",
      "We review and address all formal privacy grievances within the timeframe specified by applicable law.",
    ],
  },
  {
    id: "consent",
    number: "21",
    title: "Consent",
    content: [
      "By using our website, submitting your details, or interacting with our Services, you acknowledge that your personal information will be processed as described in this Privacy Policy.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50/50 text-slate-800 pb-16">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200/80 py-4">
        <div className="max-w-[1264px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs font-medium text-slate-600">
          <Link href="/" className="hover:text-red-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Privacy Policy</span>
        </div>
      </div>

      {/* Hero Title Container */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1264px] mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Lock className="w-3.5 h-3.5" /> Data Protection &amp; Privacy
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-300 max-w-3xl text-sm sm:text-base leading-relaxed mb-6">
            Ecampus Technologies Private Limited is committed to maintaining the confidentiality, integrity, and security of your personal data. This policy explains how we handle your information across our website and services.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-400 font-medium pt-2 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Last Updated: 30 August 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span>Ecampus Technologies Pvt. Ltd.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-[1264px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sticky Navigation Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-2">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Table of Contents
              </h2>
              <nav className="space-y-1">
                {privacySections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="group flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all"
                  >
                    <span className="truncate">
                      {sec.number}. {sec.title}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Privacy Content Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 shadow-sm leading-relaxed text-sm sm:text-base text-slate-700">
              <p className="mb-6 leading-relaxed font-normal text-slate-700">
                By accessing or using our Services, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with this policy, please do not access or use our platforms.
              </p>

              <div className="space-y-10">
                {privacySections.map((sec) => (
                  <section key={sec.id} id={sec.id} className="scroll-mt-28 border-t border-slate-100 pt-8 first:border-0 first:pt-0">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-baseline gap-2">
                      <span className="text-emerald-600 font-extrabold">{sec.number}.</span>
                      <span>{sec.title}</span>
                    </h2>

                    <div className="space-y-4 text-slate-600">
                      {sec.content.map((p, idx) => (
                        <p key={idx} className="leading-relaxed">
                          {p}
                        </p>
                      ))}

                      {sec.subsections && (
                        <div className="space-y-4 my-4">
                          {sec.subsections.map((sub, sIdx) => (
                            <div key={sIdx} className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100 space-y-2">
                              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                                {sub.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                {sub.text}
                              </p>
                              {sub.bullets && (
                                <ul className="mt-2 space-y-1.5 pl-3 border-l-2 border-emerald-400">
                                  {sub.bullets.map((b, bIdx) => (
                                    <li key={bIdx} className="text-xs sm:text-sm text-slate-700">
                                      {b}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {sec.bullets && (
                        <ul className="my-4 space-y-2 pl-4 border-l-2 border-slate-200">
                          {sec.bullets.map((b, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-slate-700 text-sm sm:text-base">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2.5" />
                              <span className="leading-relaxed">{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {sec.footerText && (
                        <p className="mt-3 text-slate-600 italic text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                          {sec.footerText}
                        </p>
                      )}

                      {sec.contactCard && (
                        <div className="mt-6 bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800">
                          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-emerald-400" />
                            {sec.contactCard.company}
                          </h3>
                          <div className="space-y-2 text-sm text-slate-300 mt-4">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>Email: </span>
                              <a href={`mailto:${sec.contactCard.email}`} className="text-emerald-400 font-medium hover:underline">
                                {sec.contactCard.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>Website: </span>
                              <a href={`https://${sec.contactCard.website}`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-medium hover:underline">
                                {sec.contactCard.website}
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
