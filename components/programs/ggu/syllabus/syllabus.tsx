"use client";

const syllabusTracks = [
  {
    title: "Business Management Track",
    items: [
      "Managerial Skills",
      "Managerial Economics",
      "Cutting Edge Leadership",
      "Accounting for Financial Reporting",
      "Strategic Management: Integrating the Enterprise",
      "International Business Environment",
    ],
  },
  {
    title: "Specialization Track (Choose 6 courses from Specialisation tracks)",
    items: [
      "Finance",
      "Leadership",
      "Business Analytics",
      "Marketing",
      "General Management",
      "International Management",
      "Data Science",
      "Supply Chain Management",
    ],
  },
  {
    title: "Research Track",
    items: [
      "Research Design",
      "Business Statistics",
      "Designing a Qualitative Methodology",
      "Designing a Quantitative Methodology",
      "Introduction to Academic Research",
      "The Landscape of Literature Review",
    ],
  },
  {
    title: "ECTS Tracks",
    items: [
      "Reflection and Minutes of the Meeting with the Supervisor",
      "Report Writing",
      "Written Dissertation and Oral Defence",
      "Doctoral Residency",
      "Written Proposal Defence",
    ],
  },
];

const otherDbaCourses = [
  { name: "Golden Gate University Online DBA", href: "#" },
  { name: "SSBM Online DBA", href: "#" },
  { name: "Rushford Online DBA", href: "#" },
  { name: "IIM Kashipur Online DBA", href: "#" },
  { name: "Durham University Online DBA", href: "#" },
  { name: "IMSR Online DBA", href: "#" },
  { name: "University of Michigan Flint Online DBA", href: "#" },
  { name: "University of Dallas Online DBA", href: "#" },
  { name: "ESGCI School of Business Online DBA", href: "#" },
  { name: "Westcliff University Online DBA", href: "#" },
  { name: "University of South Florida Online DBA", href: "#" },
  { name: "Walden University Online DBA", href: "#" },
  { name: "Liberty University Online DBA", href: "#" },
  { name: "Purdue University Online DBA", href: "#" },
];

export default function GGUSyllabusPage() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          <span className="text-red-500">Golden Gate University</span> Syllabus
          / Curriculum
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
          The curriculum of the Online DBA program at Golden Gate University is
          rigorously designed to provide students with a thorough knowledge of
          advanced business ideas and research processes. By the end of the
          program, graduates will be well-rounded professionals with the
          knowledge, abilities, and confidence to stand out in the global
          competitive market and make substantial contributions to the field of
          business management.
        </p>

        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
          To give an overview of the Online DBA program at Golden Gate
          University, the syllabus of the program is outlined below:
        </p>

        {/* Syllabus Table */}
        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200">
          <div className="bg-[#ef4444] px-4 py-3 text-center">
            <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
              Online DBA Syllabus
            </h2>
          </div>

          <div className="grid sm:grid-cols-2">
            {syllabusTracks.map((track, index) => (
              <div
                key={track.title}
                className={`border-slate-200 ${
                  index % 2 === 0 ? "sm:border-r" : ""
                } ${index < 2 ? "border-b" : ""}`}
              >
                <div className="bg-red-50 px-4 py-2.5 border-b border-slate-200">
                  <h3 className="text-sm font-bold text-slate-900">
                    {track.title}
                  </h3>
                </div>
                <ul className="px-4 py-3 space-y-1.5">
                  {track.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm text-slate-700"
                    >
                      <span className="text-red-500 mt-1.5 h-1 w-1 rounded-full bg-red-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Other DBA Courses Table */}
        <div className="mt-10 overflow-hidden rounded-xl border border-slate-200">
          <div className="bg-[#ef4444] px-4 py-3 text-center">
            <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
              Other Doctor of Business Administration [DBA] Courses
            </h2>
          </div>

          <div className="grid sm:grid-cols-2">
            {otherDbaCourses.map((course, index) => (
              <a
                key={course.name}
                href={course.href}
                className={`px-4 py-3 text-sm text-red-600 font-medium hover:underline hover:bg-red-50 transition-colors duration-150 border-slate-200 ${
                  index % 2 === 0 ? "sm:border-r" : ""
                } border-b`}
              >
                {course.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
