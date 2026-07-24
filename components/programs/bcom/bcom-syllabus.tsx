import React from "react";
import { BookOpen, GraduationCap, CheckSquare } from "lucide-react";

interface Semester {
  id: number;
  title: string;
  subjects: string[];
}

const semesters: Semester[] = [
  {
    id: 1,
    title: "Semester 1",
    subjects: [
      "Financial Accounting",
      "Business Organisation & Management",
      "Business Economics",
      "Business Laws",
      "Environmental Studies",
    ],
  },
  {
    id: 2,
    title: "Semester 2",
    subjects: [
      "Corporate Accounting",
      "Business Mathematics & Statistics",
      "Company Law",
      "Business Communication",
      "Micro Economics",
    ],
  },
  {
    id: 3,
    title: "Semester 3",
    subjects: [
      "Income Tax Law & Practice",
      "Cost Accounting",
      "Business Statistics",
      "E-Commerce",
      "Human Resource Management",
    ],
  },
  {
    id: 4,
    title: "Semester 4",
    subjects: [
      "Corporate Tax Planning",
      "Management Accounting",
      "Auditing & Corporate Governance",
      "Indian Economy",
      "Entrepreneurship Development",
    ],
  },
  {
    id: 5,
    title: "Semester 5",
    subjects: [
      "Financial Management",
      "Marketing Management",
      "Goods & Service Tax (GST)",
      "International Business",
      "Elective: Banking / Insurance / Finance",
    ],
  },
  {
    id: 6,
    title: "Semester 6",
    subjects: [
      "Strategic Management",
      "Financial Markets & Institutions",
      "Project Work / Dissertation",
      "Elective I",
      "Elective II",
    ],
  },
];

export default function BComSyllabus() {
  return (
    <section
      style={{
        background:
          "radial-gradient(circle at top right, rgba(255, 59, 79, 0.06), transparent 35%), #ffffff",
      }}
      className="relative w-full px-4 py-12 text-slate-900 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900">
            <BookOpen className="h-3.5 w-3.5 text-red-500" />
            Syllabus
          </span>

          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            Online B.Com <span className="text-red-500">Syllabus</span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            The{" "}
            <strong className="text-slate-900">Online B.Com syllabus</strong> is
            spread across{" "}
            <strong className="text-slate-900">6 semesters</strong>, covering
            core subjects in accounting, finance, taxation, and business
            management along with electives in the final year.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {semesters.map((sem) => (
            <div
              key={sem.id}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-red-50">
                  <GraduationCap className="h-5 w-5 text-red-500" />
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {sem.title}
                </h3>
              </div>

              <div className="mt-4 flex-1 space-y-3">
                {sem.subjects.map((subject) => (
                  <div key={subject} className="flex items-start gap-2.5">
                    <CheckSquare className="mt-0.5 h-4 w-4 flex-shrink-0 fill-red-500 text-red-500" />
                    <p className="text-sm leading-relaxed text-slate-600">
                      {subject}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
