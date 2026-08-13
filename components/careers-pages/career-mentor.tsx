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
  { name: "Standard Chartered", className: "text-emerald-600 text-xs" },
  { name: "Deloitte", className: "text-slate-900" },
];

export function CareerMentor() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center rounded-full bg-red-50 px-4 py-1.5 text-xs font-bold tracking-widest text-red-600 border border-red-100">
            YOUR FUTURE
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
            Career growth &amp; earning potential
          </h2>
          <p className="mt-4 text-base text-gray-600 leading-7">
            The roles our graduates step into once they've done the work.
          </p>
        </div>

        <div className="max-w-5xl mx-auto rounded-2xl border border-gray-200 p-8 md:p-10">
          <h3 className="text-lg font-bold text-slate-900 mb-6">
            Careers in Software Engineering
          </h3>

          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-3">
            {[...softwareRoles, ...infraRoles].map((role) => (
              <div key={role} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-600" />
                <span className="text-sm text-slate-700 leading-6">{role}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-14">
          <p className="text-sm font-semibold text-gray-500 mb-6">
            Our alumni work at top companies
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-x-8 gap-y-8 items-center">
            {companies.map((company) => (
              <span
                key={company.name}
                className={`text-lg font-bold text-center ${company.className}`}
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
