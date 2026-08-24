import React from "react";

/**
 * Why choose an Online MBA over a regular MBA?
 * Same container/heading system as the other sections
 * (max-w-4xl, text-3xl md:text-4xl, red-500 accent).
 * Table header re-themed navy -> red-600; 3-column comparison table
 * matches the reference format.
 */

type Row = { factor: string; online: string; regular: string };

const ROWS: Row[] = [
  {
    factor: "Flexibility",
    online: "Mostly self-paced, with scheduled live sessions (4–6 hrs/week)",
    regular: "Fixed class schedules",
  },
  {
    factor: "Cost",
    online: "More affordable — lower tuition and no relocation expenses",
    regular: "Higher tuition and living costs",
  },
  {
    factor: "Work Experience",
    online: "Continue your job while studying",
    regular: "Often requires leaving or pausing a job",
  },
  {
    factor: "Learning Method",
    online: "Live and recorded digital classes with online resources",
    regular: "Classroom-based learning",
  },
  {
    factor: "Time Management",
    online: "Suitable for working professionals",
    regular: "Requires full-time commitment",
  },
  {
    factor: "Networking",
    online: "Virtual networking with professionals worldwide",
    regular: "Face-to-face networking opportunities",
  },
];

export default function OnlineVsRegular() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-10 font-sans text-slate-800">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
        Why choose an <span className="text-red-500">Online MBA</span> over a regular MBA?
      </h2>

      <p className="mt-4 text-slate-500 leading-relaxed">
        Under UGC norms, an online MBA carries the same standing as a
        regular MBA. What it adds is flexibility, cost-effectiveness, and
        earning potential while you upgrade your skills — plus the chance
        to build a network that spans the globe rather than one campus.
        And the part that matters most: employers and HR teams accept and
        consider this degree.
      </p>

      <div className="mt-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden bg-white">
        <div className="bg-red-600 px-6 py-4">
          <h3 className="text-sm font-bold text-white text-center">
            Online MBA vs. Regular MBA
          </h3>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="bg-red-50/60 border-b border-slate-100">
              <th className="px-6 py-3.5 text-sm font-bold text-slate-900 w-[26%]">
                Factor
              </th>
              <th className="px-6 py-3.5 text-sm font-bold text-slate-900 w-[37%]">
                Online MBA
              </th>
              <th className="px-6 py-3.5 text-sm font-bold text-slate-900 w-[37%]">
                Regular MBA
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr
                key={row.factor}
                className={i !== ROWS.length - 1 ? "border-b border-slate-100" : ""}
              >
                <td className="px-6 py-4 align-top">
                  <span className="text-sm font-bold text-slate-900">
                    {row.factor}
                  </span>
                </td>
                <td className="px-6 py-4 align-top">
                  <span className="text-sm text-red-600 leading-relaxed">
                    {row.online}
                  </span>
                </td>
                <td className="px-6 py-4 align-top">
                  <span className="text-sm text-slate-600 leading-relaxed">
                    {row.regular}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}