import React from "react";
import { Handshake } from "lucide-react";

const yearOne = [
  ["DBA101", "Advanced Research Methods", "6 Credits"],
  ["DBA102", "Organizational Theory & Behavior", "6 Credits"],
  ["DBA103", "Strategic Leadership", "6 Credits"],
  ["DBA104", "Quantitative Analysis for Business", "6 Credits"],
  ["DBA105", "Academic Writing & Doctoral Seminar", "6 Credits"],
];

const yearTwo = [
  ["DBA201", "Applied Statistics & Data Analysis", "6 Credits"],
  ["DBA202", "Corporate Finance Theory", "6 Credits"],
  ["DBA203", "Global Business Strategy", "6 Credits"],
  ["DBA204", "Qualitative Research Methods", "6 Credits"],
  ["DBA205", "Ethics in Business Research", "6 Credits"],
];

const yearThree = [
  ["DBA301", "Comprehensive Examination Preparation", "6 Credits"],
  ["DBA302", "Dissertation Proposal Defense", "6 Credits"],
  ["DBA303", "Dissertation Research & Data Collection", "6 Credits"],
  ["DBA304", "Dissertation Writing", "6 Credits"],
  ["DBA305", "Final Dissertation Defense / Doctoral Capstone", "6 Credits"],
];

function CurriculumTable({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <div className="mt-8">
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-black">
        {title}
      </h3>

      <div className="overflow-hidden border border-slate-300">
        <table className="w-full border-collapse text-left text-sm text-black">
          <thead>
            <tr className="bg-slate-100">
              <th className="border-b border-r border-slate-300 px-3 py-3 font-bold">
                Course Code
              </th>
              <th className="border-b border-r border-slate-300 px-3 py-3 font-bold">
                Module Title
              </th>
              <th className="border-b border-slate-300 px-3 py-3 font-bold">
                ECTS
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map(([code, module, credits]) => (
              <tr key={code} className="even:bg-slate-50">
                <td className="border-b border-r border-slate-300 px-3 py-3 font-semibold">
                  {code}
                </td>
                <td className="border-b border-r border-slate-300 px-3 py-3">
                  {module}
                </td>
                <td className="border-b border-slate-300 px-3 py-3 font-semibold">
                  {credits}
                </td>
              </tr>
            ))}

            <tr>
              <td className="border-r border-slate-300 px-3 py-3 font-bold">
                Total Credits
              </td>
              <td className="border-r border-slate-300 px-3 py-3" />
              <td className="px-3 py-3 font-bold">30 Credits</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function GGUDoctorateCurriculum() {
  return (
    <section
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-8 max-w-3xl border-b border-slate-100 pb-6 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/60 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900">
            <Handshake className="h-3.5 w-3.5 text-red-500" />
            DBA Program
          </span>

          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-black sm:text-3xl md:text-4xl">
            Program
            <span className="text-red-500"> Curriculum</span>
          </h2>
        </div>

        <div className="mt-8 space-y-4 text-sm leading-relaxed text-black">
          <p>
            The <strong>Golden Gate University Online DBA</strong> moves through
            three academic years, with each year building deeper capability in
            research, strategy, finance, and doctoral-level business
            scholarship.
          </p>

          <p>
            <strong>Year 1</strong> builds the research foundation. Students
            explore advanced research methods, organizational theory, strategic
            leadership, quantitative analysis, and academic writing.
          </p>

          <p>
            <strong>Year 2</strong> goes deeper into applied doctoral study
            including applied statistics, corporate finance theory, global
            business strategy, qualitative research methods, and research
            ethics.
          </p>

          <p>
            <strong>Year 3</strong> focuses on the dissertation journey through
            comprehensive examinations, proposal defense, original research, and
            the final dissertation defense.
          </p>
        </div>

        <CurriculumTable title="Year 1" rows={yearOne} />
        <CurriculumTable title="Year 2" rows={yearTwo} />
        <CurriculumTable title="Year 3" rows={yearThree} />
      </div>
    </section>
  );
}
