"use client";

interface FacultyMember {
  name: string;
  title: string;
  subtitle: string;
  initials: string;
}

const faculty: FacultyMember[] = [
  {
    name: "Dr. Arvind Nair",
    title: "Professor of Strategic Management",
    subtitle: "Former Dean, School of Business",
    initials: "AN",
  },
  {
    name: "Dr. Meera Kapoor",
    title: "Program Director, Online DBA",
    subtitle: "20+ years in academic leadership",
    initials: "MK",
  },
  {
    name: "Dr. Sanjay Rathi",
    title: "Professor of Finance",
    subtitle: "Former Head of Corporate Finance, ICICI Bank",
    initials: "SR",
  },
  {
    name: "Dr. Lisa Fernandes",
    title: "Professor of Marketing Analytics",
    subtitle: "Ex-Consultant, Deloitte Digital",
    initials: "LF",
  },
  {
    name: "Dr. Rohan Malhotra",
    title: "Professor of Business Research",
    subtitle: "Published author, business methodology",
    initials: "RM",
  },
  {
    name: "Dr. Priya Sethi",
    title: "Professor of Leadership Studies",
    subtitle: "Former VP - People & Culture, Infosys",
    initials: "PS",
  },
  {
    name: "Dr. Karan Bhatt",
    title: "Professor of Data Science",
    subtitle: "Ex-Lead Data Scientist, Microsoft",
    initials: "KB",
  },
  {
    name: "Dr. Neha Joshi",
    title: "Professor of Supply Chain Management",
    subtitle: "Former Director of Operations, L&T",
    initials: "NJ",
  },
];

export default function GGUFaculty() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Meet Your <span className="text-red-500">Faculty</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Learn from Golden Gate University's Online DBA faculty — a mix of
          academic leaders and industry veterans who bring real-world expertise
          into every course.
        </p>

        {/* Faculty grid */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {faculty.map((member) => (
            <div
              key={member.name}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 hover:border-red-200 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 border border-red-200">
                <span className="text-sm font-bold text-red-600">
                  {member.initials}
                </span>
              </div>

              <h3 className="mt-4 text-sm sm:text-base font-bold text-slate-900">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-slate-700">{member.title}</p>
              <p className="mt-0.5 text-xs text-slate-500">{member.subtitle}</p>

              <a
                href="#"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 hover:underline"
              >
                View More
                <span aria-hidden="true">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
