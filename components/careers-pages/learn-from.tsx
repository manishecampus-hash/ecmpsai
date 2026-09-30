import {
  GraduationCap,
  Landmark,
  Share2,
  Building2,
  Star,
  Globe,
  Award,
  Medal,
  type LucideIcon,
} from "lucide-react";

type Institution = {
  label: string;
  title: string;
  sub: string;
  icon: LucideIcon;
};

const institutions: Institution[] = [
  {
    label: "UT Austin",
    title: "McCombs Business",
    sub: "University of Texas at Austin",
    icon: GraduationCap,
  },
  {
    label: "MIT IDSS",
    title: "MIT • IDSS",
    sub: "Data, Systems & Society",
    icon: Landmark,
  },
  {
    label: "Johns Hopkins",
    title: "Whiting Engineering",
    sub: "Johns Hopkins University",
    icon: Share2,
  },
  {
    label: "Northwestern",
    title: "Northwestern Univ",
    sub: "Professional Studies",
    icon: Building2,
  },
  {
    label: "Great Lakes",
    title: "Great Lakes Exec",
    sub: "Technology Leadership",
    icon: Star,
  },
  {
    label: "Deakin Aus",
    title: "Deakin University",
    sub: "Melbourne, Australia",
    icon: Globe,
  },
  {
    label: "Walsh USA",
    title: "Walsh College",
    sub: "Applied Computer Science",
    icon: Award,
  },
  {
    label: "IIT Consortium",
    title: "IIT Network",
    sub: "Faculty-Led Certifications",
    icon: Medal,
  },
];

export function LearnFromSection() {
  return (
    <section className="w-full bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-red-600 sm:text-sm">
            Elite Institutional Accreditation
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
            Earn Recognized Certifications From Top Institutions
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-500">
            Co-developed with globally respected higher-education institutions
            and university engineering faculties.
          </p>
        </div>

        {/* Institution grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {institutions.map((inst) => {
            const Icon = inst.icon;
            return (
              <div
                key={inst.label}
                className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-red-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wide text-gray-400 transition-colors group-hover:text-red-600">
                    {inst.label}
                  </span>
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-400 transition-colors group-hover:bg-red-50 group-hover:text-red-600">
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                </div>

                <p className="mt-6 text-base font-bold text-slate-900">
                  {inst.title}
                </p>
                <p className="mt-0.5 text-sm text-gray-500">{inst.sub}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
