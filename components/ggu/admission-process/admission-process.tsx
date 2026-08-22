"use client";

import { AlertCircle } from "lucide-react";

const admissionSteps = [
  {
    step: 1,
    title: "Choose a Program:",
    description:
      "Explore Golden Gate University's Online DBA program and identify the path that aligns with your career goals.",
  },
  {
    step: 2,
    title: "Check Your Eligibility Requirements:",
    description:
      "Ensure you meet the program's requirements including academic background and professional experience.",
  },
  {
    step: 3,
    title: "Review Your Finances:",
    description:
      "Explore EMI options, scholarships, and flexible payment plans available through Golden Gate University.",
  },
  {
    step: 4,
    title: "Get Your Documents Ready:",
    description:
      "Prepare your academic transcripts, letters of recommendation, resume, and identification documents.",
  },
  {
    step: 5,
    title: "Submit Your Application:",
    description:
      "Complete the online application form with all required information and supporting documentation.",
  },
  {
    step: 6,
    title: "Application Review:",
    description:
      "Our admissions team reviews your application and assesses your fit for the program.",
  },
  {
    step: 7,
    title: "Admission Decision:",
    description:
      "Receive your admission decision via email with details about your enrollment options.",
  },
  {
    step: 8,
    title: "Accept Your Offer:",
    description:
      "Confirm your acceptance and choose your preferred EMI plan if applicable.",
  },
  {
    step: 9,
    title: "Complete Financial Enrollment:",
    description:
      "Finalize your payment arrangement and receive enrollment confirmation from the university.",
  },
  {
    step: 10,
    title: "Begin Your Journey:",
    description:
      "Start your Online DBA program at Golden Gate University and join a diverse community of business leaders worldwide.",
  },
];

const infoBlocks = [
  {
    text: "Golden Gate University is committed to transparency and accessibility in our admissions process, making it easy for prospective students to navigate their educational journey.",
  },
  {
    text: "All international applicants must verify their credentials through official equivalency evaluation services.",
    links: [{ text: "Learn more", href: "#" }],
  },
  {
    text: "Golden Gate University offers multiple scholarship opportunities for qualified candidates.",
    links: [{ text: "Explore scholarships", href: "#" }],
  },
  {
    text: "Learn more about our Online DBA program and career outcomes.",
    links: [{ text: "Program details", href: "#" }],
  },
  {
    text: "Golden Gate University is accredited by the Western Association of Schools and Colleges (WASC).",
    links: [{ text: "View accreditation", href: "#" }],
  },
  {
    text: "Flexible payment plans available through multiple partner financial institutions.",
    links: [{ text: "Explore EMI options", href: "#" }],
  },
  {
    text: "Golden Gate University supports diverse learning needs with comprehensive student services.",
    links: [{ text: "Student support", href: "#" }],
  },
  {
    text: "Questions about the admission process? Our dedicated admissions team is here to help.",
    links: [{ text: "Contact admissions", href: "#" }],
  },
];

export default function GGUAdmissionProcess() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            <span className="text-red-500">Golden Gate University</span>{" "}
            Admission Process
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
            A straightforward and transparent pathway to pursue your Online DBA
            at Golden Gate University.
          </p>
        </div>

        {/* Steps Section - connector/timeline style */}
        <div>
          {admissionSteps.map((step, index) => {
            const isFirst = index === 0;
            const isLast = index === admissionSteps.length - 1;
            return (
              <div
                key={step.step}
                className="flex items-stretch gap-3 sm:gap-4"
              >
                {/* connector column */}
                <div className="relative w-5 sm:w-6 shrink-0">
                  {!isFirst && (
                    <span
                      className="absolute left-1/2 top-0 h-1/2 w-0.5 -translate-x-1/2 bg-red-300"
                      aria-hidden="true"
                    />
                  )}
                  {!isLast && (
                    <span
                      className="absolute left-1/2 bottom-0 h-1/2 w-0.5 -translate-x-1/2 bg-red-300"
                      aria-hidden="true"
                    />
                  )}
                  {/* horizontal tick / arrow into the pill */}
                  <span
                    className="absolute left-1/2 top-1/2 h-0.5 w-6 sm:w-8 -translate-y-1/2 bg-red-300 z-0"
                    aria-hidden="true"
                  />
                  {/* dot */}
                  <span
                    className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 ring-4 ring-white z-10"
                    aria-hidden="true"
                  />
                </div>

                {/* content */}
                <div
                  className={`relative flex-1 min-w-0 flex items-center ${
                    isLast ? "pb-0" : "pb-5"
                  }`}
                >
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="inline-block rounded-md bg-red-50 px-2 py-0.5 text-sm font-bold text-red-600 whitespace-nowrap">
                      {step.title}
                    </span>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <hr className="my-10 border-slate-200" />

        {/* Info Blocks Section */}
        <div className="space-y-3">
          {infoBlocks.map((block, index) => (
            <div
              key={index}
              className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <div className="flex gap-2.5">
                <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 leading-relaxed">
                  {block.text}
                  {block.links &&
                    block.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.href}
                        className="text-red-600 font-medium hover:underline ml-1"
                      >
                        {link.text}
                      </a>
                    ))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
