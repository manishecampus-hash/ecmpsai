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
      "Advanced Research Methods",
      "Organizational Theory & Behavior",
      "Strategic Leadership",
      "Quantitative Analysis for Business",
      "Academic Writing & Doctoral Seminar",
    ],
  },
  {
    id: 2,
    title: "Semester 2",
    subjects: [
      "Applied Statistics & Data Analysis",
      "Corporate Finance Theory",
      "Global Business Strategy",
      "Qualitative Research Methods",
      "Ethics in Business Research",
    ],
  },
  {
    id: 3,
    title: "Semester 3",
    subjects: [
      "Marketing Strategy & Consumer Insights",
      "Organizational Change & Innovation",
      "Economic Analysis for Decision Making",
      "Dissertation Seminar I",
      "Elective I",
    ],
  },
  {
    id: 4,
    title: "Semester 4",
    subjects: [
      "Advanced Financial Management",
      "Leadership & Corporate Governance",
      "Research Design & Proposal Development",
      "Dissertation Seminar II",
      "Elective II",
    ],
  },
  {
    id: 5,
    title: "Semester 5",
    subjects: [
      "Comprehensive Examination Preparation",
      "Dissertation Proposal Defense",
      "Applied Research Project",
      "Elective: Finance / Marketing / Leadership",
    ],
  },
  {
    id: 6,
    title: "Semester 6",
    subjects: [
      "Dissertation Research & Data Collection",
      "Dissertation Writing",
      "Final Dissertation Defense",
      "Doctoral Capstone",
    ],
  },
];

export default function GGUDoctorateSyllabus() {
  return (
    <section
      style={{
        background:
          "radial-gradient(circle at top right, rgba(255, 59, 79, 0.06), transparent 35%), #ffffff",
        fontFamily: "'Inter', sans-serif",
      }}
      className="relative w-full px-4 py-12 text-slate-900 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900">
            <BookOpen className="h-3.5 w-3.5 text-red-500" />
            Syllabus
          </span>

          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-black sm:text-3xl md:text-4xl">
            Online DBA
            <span className="text-red-500"> Syllabus</span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            The{" "}
            <strong className="text-slate-900">
              Golden Gate University Online DBA syllabus
            </strong>{" "}
            is spread across{" "}
            <strong className="text-slate-900">6 semesters</strong>, covering
            advanced research methods, strategic leadership, and applied
            business theory, culminating in an original dissertation.
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
