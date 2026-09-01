import Link from "next/link";
import { Metadata } from "next";
import { ChevronRight, FileText, Clock, Mail, ShieldCheck, Building2, Globe } from "lucide-react";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Terms & Conditions — Ecampus",
  description:
    "Read the Terms & Conditions governing your access to and use of Ecampus Technologies Private Limited website, applications, educational content, and services.",
  alternates: {
    canonical: "/terms",
  },
};

const termsSections = [
  {
    id: "about-ecampus",
    number: "1",
    title: "About Ecampus",
    content: [
      "Ecampus Technologies Private Limited is a company incorporated under the laws of India.",
      "Our Services may include, depending on the offering:",
    ],
    bullets: [
      "Information about educational programmes and courses;",
      "Course discovery and comparison;",
      "Student enquiries and counselling;",
      "Applications and admissions-related assistance;",
      "Online and offline educational programmes;",
      "Learning resources and educational content;",
      "Student support and related services;",
      "Communication regarding programmes, admissions, offers, and services; and",
      "Other technology-enabled education and related services.",
    ],
    footerText:
      "Specific services may be subject to additional terms, policies, agreements, programme-specific conditions, or institutional requirements.",
  },
  {
    id: "eligibility",
    number: "2",
    title: "Eligibility",
    content: [
      "You must be legally capable of entering into a binding agreement to use our Services.",
      "If you are under the age of majority applicable in your jurisdiction, you may use the Services only with the involvement and consent of a parent or legal guardian where required by applicable law.",
      "By using the Services, you represent that:",
    ],
    bullets: [
      "The information you provide is accurate and complete;",
      "You will keep your account information secure;",
      "You will comply with these Terms and applicable laws; and",
      "You will not use the Services for any unlawful or unauthorised purpose.",
    ],
  },
  {
    id: "account-registration",
    number: "3",
    title: "Account Registration",
    content: [
      "Certain Services may require you to create an account or provide personal information.",
      "You are responsible for:",
    ],
    bullets: [
      "Providing accurate and current information;",
      "Maintaining the confidentiality of your login credentials;",
      "All activities conducted through your account; and",
      "Informing us promptly if you believe your account has been accessed without authorisation.",
    ],
    footerText:
      "We reserve the right to suspend or terminate accounts containing inaccurate, misleading, fraudulent, or unauthorised information.",
  },
  {
    id: "educational-programmes",
    number: "4",
    title: "Educational Programmes and Information",
    content: [
      "Ecampus may provide information about courses, programmes, institutions, qualifications, fees, admission requirements, eligibility criteria, duration, curriculum, locations, delivery methods, and other educational offerings.",
      "While we make reasonable efforts to keep such information accurate and current, information may change due to decisions made by universities, institutions, regulators, government authorities, accreditation bodies, or other third parties.",
      "Accordingly:",
    ],
    bullets: [
      "Programme availability may change;",
      "Fees may be revised;",
      "Admission criteria may change;",
      "Course structures and curricula may be modified;",
      "Intakes and deadlines may change; and",
      "A programme may be withdrawn or discontinued.",
    ],
    footerText:
      "Where applicable, the relevant university, institution, awarding body, or other authorised entity will determine final admission, enrolment, academic, examination, certification, and qualification-related decisions. Ecampus does not guarantee admission, enrolment, examination results, academic performance, employment, promotion, immigration approval, visa approval, or any particular career outcome unless expressly stated in a written agreement.",
  },
  {
    id: "third-party-institutions",
    number: "5",
    title: "Third-Party Institutions and Services",
    content: [
      "Some programmes, courses, educational services, payment services, technology services, or other offerings available through Ecampus may be provided by or involve third parties, including universities, educational institutions, service providers, payment processors, technology providers, and other partners.",
      "Your relationship with such third parties may be subject to their own terms, policies, and conditions.",
      "Ecampus is not responsible for changes, delays, failures, decisions, policies, or actions of third-party institutions or service providers, except to the extent required by applicable law or expressly agreed in writing.",
    ],
  },
  {
    id: "applications-and-admissions",
    number: "6",
    title: "Applications and Admissions",
    content: [
      "Where Ecampus facilitates or assists with an application or admission process, you are responsible for providing truthful, complete, and authentic information and documents.",
      "You must not:",
    ],
    bullets: [
      "Submit forged, altered, or fraudulent documents;",
      "Provide misleading academic or personal information;",
      "Misrepresent your eligibility;",
      "Impersonate another person; or",
      "Attempt to manipulate an admission or verification process.",
    ],
    footerText:
      "We may refuse to process or may cancel an application if we reasonably believe that information or documentation is inaccurate, fraudulent, incomplete, or otherwise unacceptable. Final admission decisions may be made by the relevant educational institution or awarding body.",
  },
  {
    id: "fees-and-payments",
    number: "7",
    title: "Fees and Payments",
    content: [
      "Certain Services may require payment of fees.",
      "The applicable price, payment terms, taxes, and other charges will be displayed or communicated to you before payment where reasonably practicable.",
      "Unless otherwise stated:",
    ],
    bullets: [
      "All payments must be made through the payment methods made available by Ecampus or its authorised payment partners;",
      "You are responsible for providing accurate billing and payment information;",
      "Applicable taxes, including GST or other applicable taxes, may be charged as required by law; and",
      "Payment of a fee does not necessarily guarantee admission, academic progression, certification, or any other outcome unless expressly stated.",
    ],
    footerText:
      "Where payments are processed by a third-party payment provider, additional terms and conditions of that provider may apply.",
  },
  {
    id: "refunds-and-cancellations",
    number: "8",
    title: "Refunds and Cancellations",
    content: [
      "Refunds, cancellations, withdrawals, and fee adjustments will be governed by the applicable refund or cancellation policy associated with the relevant Service, programme, institution, or transaction.",
      "Where a specific refund policy is provided to you at the time of purchase or enrolment, that policy will apply to the relevant transaction.",
      "Any refund, where applicable, may be subject to:",
    ],
    bullets: [
      "The applicable refund policy;",
      "Administrative or processing charges, where legally permitted;",
      "Deductions or costs imposed by third-party institutions or service providers, where applicable; and",
      "Applicable taxes and statutory requirements.",
    ],
    footerText:
      "Nothing in these Terms limits any mandatory consumer or statutory rights that cannot legally be excluded.",
  },
  {
    id: "user-conduct",
    number: "9",
    title: "User Conduct",
    content: [
      "You agree to use the Services responsibly and lawfully.",
      "You must not:",
    ],
    bullets: [
      "Violate any applicable law or regulation;",
      "Access or attempt to access another user's account;",
      "Use the Services for fraudulent, deceptive, or unlawful activities;",
      "Upload malicious software, viruses, or harmful code;",
      "Attempt to gain unauthorised access to our systems;",
      "Interfere with the operation or security of the Services;",
      "Copy, reproduce, distribute, sell, or commercially exploit our content without permission;",
      "Scrape, crawl, harvest, or systematically extract data without our written permission;",
      "Reverse engineer or attempt to derive the source code of our technology, except where permitted by law;",
      "Upload content that infringes another person's intellectual property, privacy, or other rights;",
      "Use automated systems to access the Services in a manner that places an unreasonable burden on our infrastructure; or",
      "Misrepresent your identity or affiliation with Ecampus or any educational institution.",
    ],
    footerText:
      "We reserve the right to suspend or restrict access where we reasonably believe that these Terms have been violated.",
  },
  {
    id: "intellectual-property",
    number: "10",
    title: "Intellectual Property",
    content: [
      "All content and materials made available through the Services, including but not limited to text, logos, trademarks, brand names, graphics, images, videos, audio, course materials, software, website design, user interfaces, databases, and other proprietary materials are owned by, licensed to, or otherwise lawfully used by Ecampus or the relevant third-party rights holder.",
      "Except as expressly permitted by us or applicable law, you may not reproduce, modify, distribute, publicly display, publish, sell, license, or commercially exploit such content without prior written permission.",
      "Nothing in these Terms grants you ownership of any intellectual property belonging to Ecampus or any third party.",
    ],
  },
  {
    id: "user-submitted-content",
    number: "11",
    title: "User-Submitted Information and Content",
    content: [
      "If you submit information, feedback, reviews, questions, suggestions, documents, or other content through the Services, you represent that you have the right to provide such content.",
      "You grant Ecampus permission to use such information as reasonably necessary to provide, operate, improve, secure, and support the Services, subject to our Privacy Policy and applicable law.",
      "We may remove content that we reasonably believe violates these Terms, applicable law, or the rights of others.",
    ],
  },
  {
    id: "communications",
    number: "12",
    title: "Communications",
    content: [
      "By providing your phone number, email address, or other contact information, you agree that Ecampus and its authorised service providers may contact you regarding:",
    ],
    bullets: [
      "Your account;",
      "Applications or enquiries;",
      "Courses and programmes;",
      "Admissions;",
      "Payments and transactions;",
      "Customer support;",
      "Important service updates; and",
      "Other communications permitted by applicable law.",
    ],
    footerText:
      "Where required by law, marketing communications will be subject to applicable consent and opt-out requirements. You may opt out of promotional communications using the unsubscribe mechanism provided in the relevant communication or by contacting us.",
  },
  {
    id: "privacy",
    number: "13",
    title: "Privacy",
    content: [
      "Your use of the Services is also governed by our Privacy Policy, which explains how we collect, use, store, process, and protect personal information.",
      "By using the Services, you acknowledge that you have read and understood our Privacy Policy.",
    ],
  },
  {
    id: "cookies",
    number: "14",
    title: "Cookies and Similar Technologies",
    content: [
      "Our website and Services may use cookies, pixels, analytics tools, and similar technologies to operate the website, remember preferences, understand usage, improve performance, and support relevant communications.",
      "Your use of such technologies may be subject to our Cookie Policy and applicable law.",
    ],
  },
  {
    id: "third-party-links",
    number: "15",
    title: "Third-Party Links",
    content: [
      "Our Services may contain links to websites, applications, or services operated by third parties.",
      "Such links are provided for convenience and do not necessarily constitute an endorsement by Ecampus.",
      "We are not responsible for the content, security, privacy practices, availability, or policies of third-party websites or services. You should review the applicable third-party terms and privacy policies before using them.",
    ],
  },
  {
    id: "service-availability",
    number: "16",
    title: "Service Availability",
    content: [
      "We aim to keep our Services available and functioning properly, but we do not guarantee uninterrupted, secure, or error-free operation.",
      "The Services may occasionally be unavailable due to maintenance, updates, technical failures, internet or network problems, cybersecurity incidents, third-party service failures, force majeure events, or other circumstances beyond our reasonable control.",
      "We may modify, suspend, discontinue, or restrict any part of the Services where reasonably necessary.",
    ],
  },
  {
    id: "accuracy-of-information",
    number: "17",
    title: "Accuracy of Information",
    content: [
      "We make reasonable efforts to provide accurate information but do not warrant that all information available through the Services will always be complete, current, accurate, or error-free.",
      "You should independently verify material information, particularly information relating to admission eligibility, fees, course availability, accreditation, recognition, programme structure, deadlines, visa or immigration requirements, and other requirements that may affect your educational or financial decisions.",
    ],
  },
  {
    id: "disclaimers",
    number: "18",
    title: "Disclaimers",
    content: [
      "To the maximum extent permitted by applicable law, the Services are provided on an 'as is' and 'as available' basis.",
      "Ecampus does not guarantee that:",
    ],
    bullets: [
      "The Services will always be available;",
      "The Services will be free from errors or interruptions;",
      "Information will always be completely accurate or current;",
      "A particular educational programme will remain available;",
      "You will be admitted to a programme;",
      "You will obtain a particular academic result;",
      "You will receive a particular employment or career outcome; or",
      "Third-party services will operate without interruption.",
    ],
    footerText:
      "Nothing in these Terms excludes any warranty, right, or protection that cannot legally be excluded.",
  },
  {
    id: "limitation-of-liability",
    number: "19",
    title: "Limitation of Liability",
    content: [
      "To the maximum extent permitted by applicable law, Ecampus and its directors, officers, employees, affiliates, contractors, and service providers will not be liable for indirect, incidental, special, consequential, exemplary, or punitive losses arising from or relating to your use of the Services.",
      "Where liability cannot be excluded, our liability will be limited to the extent permitted by applicable law.",
      "Nothing in these Terms excludes or limits liability for matters that cannot legally be excluded or limited.",
    ],
  },
  {
    id: "indemnification",
    number: "20",
    title: "Indemnification",
    content: [
      "To the extent permitted by applicable law, you agree to indemnify and hold harmless Ecampus Technologies Private Limited, its affiliates, directors, officers, employees, contractors, and authorised representatives from claims, losses, liabilities, damages, costs, and expenses arising from your breach of these Terms, misuse of the Services, violation of applicable law, infringement of third-party rights, or fraudulent, misleading, or unauthorised information submitted by you.",
    ],
  },
  {
    id: "suspension-and-termination",
    number: "21",
    title: "Suspension and Termination",
    content: [
      "We may suspend, restrict, or terminate your access to the Services if you breach these Terms, provide false or misleading information, engage in fraudulent or unlawful activity, create a security or operational risk, or if we are required to do so by law or a competent authority.",
      "Where appropriate and reasonably practicable, we may provide notice before taking such action.",
      "Termination will not affect rights or obligations that accrued before termination or provisions that are intended to survive termination.",
    ],
  },
  {
    id: "changes-to-terms",
    number: "22",
    title: "Changes to These Terms",
    content: [
      "We may update these Terms from time to time to reflect changes in our Services, business practices, legal requirements, or technology.",
      "The updated Terms will be posted on this page with a revised 'Last Updated' date.",
      "Your continued use of the Services after the updated Terms become effective constitutes acceptance of the revised Terms, to the extent permitted by applicable law.",
    ],
  },
  {
    id: "governing-law",
    number: "23",
    title: "Governing Law",
    content: [
      "These Terms shall be governed by and interpreted in accordance with the laws of India, except to the extent that applicable mandatory law requires otherwise.",
      "Subject to applicable law, courts having appropriate jurisdiction in India shall have jurisdiction over disputes arising from or relating to these Terms or the Services.",
      "Where Ecampus provides Services in another country or jurisdiction, additional country-specific terms may apply.",
    ],
  },
  {
    id: "country-specific-services",
    number: "24",
    title: "Country-Specific Services",
    content: [
      "Ecampus may operate country-specific websites, pages, services, programmes, or offerings (for example, in the United Arab Emirates or other jurisdictions).",
      "Where country-specific terms are expressly provided, those terms will apply to the relevant Services to the extent they conflict with these general Terms.",
    ],
  },
  {
    id: "force-majeure",
    number: "25",
    title: "Force Majeure",
    content: [
      "Ecampus will not be responsible for delays or failure to perform its obligations where such delay or failure results from circumstances beyond its reasonable control, including natural disasters, epidemics, pandemics, war, terrorism, civil unrest, government actions, regulatory changes, labour disputes, power or internet failures, cyber incidents, or failures of third-party infrastructure.",
    ],
  },
  {
    id: "severability",
    number: "26",
    title: "Severability",
    content: [
      "If any provision of these Terms is found to be invalid, unlawful, or unenforceable, the remaining provisions will continue in full force and effect to the extent permitted by law.",
    ],
  },
  {
    id: "waiver",
    number: "27",
    title: "Waiver",
    content: [
      "Failure by Ecampus to enforce any provision of these Terms will not constitute a waiver of our right to enforce that provision or any other provision in the future.",
    ],
  },
  {
    id: "entire-agreement",
    number: "28",
    title: "Entire Agreement",
    content: [
      "These Terms, together with any applicable policies, programme-specific terms, payment terms, refund policies, and other agreements expressly incorporated by reference, constitute the entire agreement between you and Ecampus concerning your use of the relevant Services.",
    ],
  },
  {
    id: "contact-us",
    number: "29",
    title: "Contact Us",
    content: [
      "If you have questions, concerns, complaints, or requests regarding these Terms, please contact us:",
    ],
    contactCard: {
      company: "Ecampus Technologies Private Limited",
      email: "support@ecampusapp.com",
      website: "www.ecampusapp.com",
      privacyNote:
        "For privacy-related matters, please refer to our Privacy Policy or contact our designated privacy contact person using the details provided there.",
    },
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50/50 text-slate-800 pb-16">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200/80 py-4">
        <div className="max-w-[1264px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs font-medium text-slate-600">
          <Link href="/" className="hover:text-red-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Terms &amp; Conditions</span>
        </div>
      </div>

      {/* Hero Title Container */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1264px] mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" /> Legal Policy
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-slate-300 max-w-3xl text-sm sm:text-base leading-relaxed mb-6">
            Welcome to the website and services operated by Ecampus Technologies Private Limited (“Ecampus”, “we”, “us”, or “our”). These Terms &amp; Conditions govern your access to and use of our platforms, educational content, and services.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-400 font-medium pt-2 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-400" />
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
                <FileText className="w-4 h-4 text-red-600" /> Table of Contents
              </h2>
              <nav className="space-y-1">
                {termsSections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="group flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg text-slate-600 hover:text-red-600 hover:bg-red-50/50 transition-all"
                  >
                    <span className="truncate">
                      {sec.number}. {sec.title}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Terms Articles Content Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 shadow-sm leading-relaxed text-sm sm:text-base text-slate-700">
              <p className="mb-6 leading-relaxed font-normal text-slate-700">
                By accessing, browsing, registering on, or using our Services, you acknowledge that you have read, understood, and agreed to be bound by these Terms. If you do not agree with these Terms, please do not use our Services.
              </p>

              <div className="space-y-10">
                {termsSections.map((sec) => (
                  <section key={sec.id} id={sec.id} className="scroll-mt-28 border-t border-slate-100 pt-8 first:border-0 first:pt-0">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-baseline gap-2">
                      <span className="text-red-600 font-extrabold">{sec.number}.</span>
                      <span>{sec.title}</span>
                    </h2>

                    <div className="space-y-3 text-slate-600">
                      {sec.content.map((p, idx) => (
                        <p key={idx} className="leading-relaxed">
                          {p}
                        </p>
                      ))}

                      {sec.bullets && (
                        <ul className="my-4 space-y-2 pl-4 border-l-2 border-slate-200">
                          {sec.bullets.map((b, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-slate-700 text-sm sm:text-base">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-2.5" />
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
                            <Building2 className="w-4 h-4 text-red-400" />
                            {sec.contactCard.company}
                          </h3>
                          <div className="space-y-2 text-sm text-slate-300 mt-4">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-red-400 shrink-0" />
                              <span>Email: </span>
                              <a href={`mailto:${sec.contactCard.email}`} className="text-red-400 font-medium hover:underline">
                                {sec.contactCard.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4 text-red-400 shrink-0" />
                              <span>Website: </span>
                              <a href={`https://${sec.contactCard.website}`} target="_blank" rel="noopener noreferrer" className="text-red-400 font-medium hover:underline">
                                {sec.contactCard.website}
                              </a>
                            </div>
                          </div>
                          <p className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
                            {sec.contactCard.privacyNote}
                          </p>
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
