"use client";

interface StatCard {
  value: string;
  label: string;
}

interface PartnerCompany {
  name: string;
  initials: string;
}

const placementPartners: string[][] = [
  ["Accenture", "Amazon", "American Express"],
  ["Deloitte", "EY (Ernst & Young)", "HCL Technologies"],
  ["Hindustan Unilever Limited (HUL)", "ICICI Bank", "Infosys"],
  ["ITC Limited", "JP Morgan Chase", "KPMG"],
  ["L&T (Larsen & Toubro)", "Mahindra & Mahindra", "Microsoft"],
];

const stats: StatCard[] = [
  { value: "50%", label: "Average Salary Hike" },
  { value: "300+", label: "Hiring Partners" },
  { value: "3X", label: "Increase in Interview Opportunities" },
];

const partnerCompanies: PartnerCompany[] = [
  { name: "ICICI Bank", initials: "ICICI", logo: undefined },
  { name: "Accenture", initials: "ACN", logo: undefined },
  { name: "Amazon", initials: "AMZ", logo: undefined },
  { name: "American Express", initials: "AMEX", logo: undefined },
  { name: "Deloitte", initials: "DEL", logo: undefined },
  { name: "EY", initials: "EY", logo: undefined },
  { name: "HCL", initials: "HCL", logo: undefined },
  { name: "Infosys", initials: "INFY", logo: undefined },
  { name: "ITC", initials: "ITC", logo: undefined },
  { name: "KPMG", initials: "KPMG", logo: undefined },
  { name: "L&T", initials: "L&T", logo: undefined },
  { name: "Microsoft", initials: "MSFT", logo: undefined },
  { name: "Hindustan Unilever Limited", initials: "HUL", logo: undefined },
  { name: "JP Morgan", initials: "JPM", logo: undefined },
];

export default function GGUPlacementPartners() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          <span className="text-red-500">Golden Gate University</span> Placement
          Partners
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
          The strong network of placement partners at Golden Gate University
          shows how well-connected the program is. These placement relationships
          with well-known global companies across a wide range of industries
          give students internship and job opportunities they can't get anywhere
          else. The university carefully builds these relationships to make sure
          students get exposure across a wide range of fields, along with
          real-world experience and useful knowledge.
        </p>

        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
          With the help and support of our esteemed placement partners, they
          have a history of successfully placing our students, making them
          well-prepared for the tough job market after graduation. Some
          companies that have worked on placements with Golden Gate University
          are mentioned below:
        </p>

        {/* Placement Partners Table */}
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
          <div className="bg-red-50 border-b border-slate-200 px-4 py-2.5">
            <h2 className="text-sm font-bold text-slate-900 text-center">
              Placement Partners
            </h2>
          </div>
          {placementPartners.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid grid-cols-1 sm:grid-cols-3 border-b border-slate-200 last:border-b-0 ${
                rowIndex % 2 === 0 ? "bg-white" : "bg-red-50/40"
              }`}
            >
              {row.map((company, colIndex) => (
                <div
                  key={company}
                  className={`px-4 py-3 text-sm text-slate-700 ${
                    colIndex !== 0 ? "sm:border-l border-slate-200" : ""
                  }`}
                >
                  {company}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-10">
          <span className="inline-block rounded-full border border-slate-300 px-4 py-1.5 text-xs sm:text-sm font-semibold text-slate-900">
            Our Students Work At
          </span>

          <div className="mt-4 grid sm:grid-cols-3 gap-4 max-w-3xl">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-red-50 border border-red-100 p-5"
              >
                <p className="text-2xl sm:text-3xl font-bold text-red-600">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-slate-700">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partner logo-style cards */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {partnerCompanies.map((company) => (
            <div
              key={company.name}
              className="flex flex-col items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white p-4 hover:border-red-200 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 border border-red-200">
                <span className="text-[10px] font-bold text-red-600">
                  {company.initials}
                </span>
              </div>
              <span className="text-xs text-slate-600 text-center leading-tight">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
