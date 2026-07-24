import React from "react";
import { Handshake } from "lucide-react";

const yearOne = [
  ["BCOM101", "Financial Accounting", "6 Credits"],
  ["BCOM102", "Business Organisation", "6 Credits"],
  ["BCOM103", "Business Economics", "6 Credits"],
  ["BCOM104", "Business Communication", "6 Credits"],
  ["BCOM105", "Principles of Management", "6 Credits"],
];

const yearTwo = [
  ["BCOM201", "Corporate Accounting", "6 Credits"],
  ["BCOM202", "Business Law", "6 Credits"],
  ["BCOM203", "Cost Accounting", "6 Credits"],
  ["BCOM204", "Income Tax Law", "6 Credits"],
  ["BCOM205", "Company Law", "6 Credits"],
];

const yearThree = [
  ["BCOM301", "Auditing", "6 Credits"],
  ["BCOM302", "Financial Management", "6 Credits"],
  ["BCOM303", "Management Accounting", "6 Credits"],
  ["BCOM304", "GST & Indirect Tax", "6 Credits"],
  ["BCOM305", "Project Work / Elective", "6 Credits"],
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

export default function BComCurriculum() {
  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-8 max-w-3xl border-b border-slate-100 pb-6 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/60 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900">
            <Handshake className="h-3.5 w-3.5 text-red-500" />
            B.Com Program
          </span>

          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            Program <span className="text-red-500">Curriculum</span>
          </h2>
        </div>

        <div className="mt-8 space-y-4 text-sm leading-relaxed text-black">
          <p>
            The <strong>Online B.Com program</strong> moves through three
            academic years, with each year building stronger foundations in
            commerce, accounting, taxation, finance, and business management.
          </p>

          <p>
            <strong>Year 1</strong> builds the foundation. Students explore core
            subjects such as financial accounting, business organisation,
            economics, communication, and management principles.
          </p>

          <p>
            <strong>Year 2</strong> goes deeper into applied commerce subjects
            including corporate accounting, business law, cost accounting,
            income tax, and company law.
          </p>

          <p>
            <strong>Year 3</strong> focuses on advanced commerce and
            professional skills through auditing, financial management,
            management accounting, GST, indirect taxation, and project-based
            learning.
          </p>
        </div>

        <CurriculumTable title="Year 1" rows={yearOne} />
        <CurriculumTable title="Year 2" rows={yearTwo} />
        <CurriculumTable title="Year 3" rows={yearThree} />
      </div>
    </section>
  );
}
