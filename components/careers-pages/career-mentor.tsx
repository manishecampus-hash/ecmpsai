const softwareRoles = [
  "Software Developer",
  "Chief Technology Officers (CTOs)",
  "Cloud Engineer",
  "Cloud Solutions Architect",
  "Cloud Program Manager",
  "Cybersecurity Architect",
  "Automotive Engineer",
  "AI Engineer",
  "Machine Learning / Data Science Infrastructure Specialist",
];

const infraRoles = [
  "Technology Consultant",
  "IT Infrastructure Manager",
  "Cloud Native Developer",
  "Cloud Consultant",
  "Cloud Product Manager",
  "Chief Information Security Officer (CISOs) / Technology Leader",
  "Electrical and Electronics Engineer",
  "MLOps Engineer",
];

const companies = [
  { name: "Cognizant", className: "text-indigo-700" },
  { name: "Dell", className: "text-blue-800" },
  { name: "hp", className: "text-sky-500 lowercase" },
  { name: "IBM", className: "text-slate-400 tracking-widest" },
  { name: "Microsoft", className: "text-slate-700" },
  { name: "amazon", className: "text-slate-900 lowercase" },
  { name: "Google", className: "text-slate-700" },
  { name: "yahoo!", className: "text-purple-700 lowercase italic" },
  { name: "Adobe", className: "text-red-600" },
  { name: "Infosys", className: "text-blue-700" },
  { name: "accenture", className: "text-slate-900 lowercase" },
  { name: "MAERSK", className: "text-sky-500 tracking-wide" },
  { name: "ORACLE", className: "text-red-600 tracking-wide" },
  { name: "intel", className: "text-blue-600 lowercase" },
  {
    name: "Standard Chartered",
    className: "text-emerald-600 text-xs",
  },
  { name: "Deloitte", className: "text-slate-900" },
];

export function CareerMentor() {
  return (
    <section className="bg-white py-6 md:py-8 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mx-auto mb-5 max-w-2xl text-center">
          <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            Career growth &amp; earning potential
          </h2>

          <p className="mt-2 text-base leading-6 text-gray-600">
            The roles our graduates step into once they've done the work.
          </p>
        </div>

        {/* Career Roles */}
        <div className="mx-auto max-w-5xl rounded-2xl border border-gray-200 p-5 md:p-7">
          <h3 className="mb-4 text-lg font-bold text-slate-900">
            Careers in Software Engineering
          </h3>

          <div className="grid gap-x-10 gap-y-1.5 sm:grid-cols-2">
            {[...softwareRoles, ...infraRoles].map((role) => (
              <div key={role} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-600" />

                <span className="text-sm leading-6 text-slate-700">{role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Companies */}
        <div className="mx-auto mt-5 max-w-5xl">
          <p className="mb-4 text-sm font-semibold text-gray-500">
            Our alumni work at top companies
          </p>

          <div className="grid grid-cols-3 items-center gap-x-8 gap-y-5 sm:grid-cols-4 md:grid-cols-8">
            {companies.map((company) => (
              <span
                key={company.name}
                className={`text-center text-lg font-bold ${company.className}`}
              >
                {company.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
