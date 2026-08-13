import { Fragment } from "react";
import { ThumbsUp, ThumbsDown, Sparkles } from "lucide-react";

const rows = [
  {
    label: "Certificate",
    us: "Certificates from prestigious universities like the McCombs School, MIT, Johns Hopkins, and more.",
    them: "Single certificate from tier 2 colleges or institutions",
  },
  {
    label: "Curriculum",
    us: "Focused curriculum on LLMs, Prompt Engineering, CV, NLP, and AI Fundamentals",
    them: "Limited coverage",
  },
  {
    label: "Live Mentored Learning",
    us: "Live learning from top industry experts",
    them: "Limited to no live classes",
  },
  {
    label: "Career Support",
    us: "Yes, with mock interviews and job boards",
    them: "No career support",
  },
  {
    label: "Hands-on projects",
    us: "Lab sessions, case studies, and capstone projects",
    them: "Fewer projects and no capstone project",
  },
  {
    label: "Program support",
    us: "Yes, program support through 4 channels",
    them: "Limited support",
  },
];

export function CareerComparisonSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-slate-900">
          Upskill with the best programs in the world
        </h2>

        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.3fr_1fr] gap-0 md:gap-4">
          {/* Row label column header spacer (desktop only) */}
          <div className="hidden md:block" />

          {/* eCampus header */}
          <div className="relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
              <Sparkles className="h-3 w-3" />
              Recommended
            </div>
            <div className="rounded-t-2xl border-2 border-b-0 border-red-600 bg-red-50/60 px-6 pt-8 pb-4 text-center">
              <span className="text-xl font-bold text-red-600">
                eCampus Programs
              </span>
            </div>
          </div>

          {/* Other courses header */}
          <div className="flex items-center justify-center px-6 py-4 md:pt-8">
            <span className="text-xl font-bold text-slate-900">
              Other Courses
            </span>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <Fragment key={row.label}>
              {/* Label */}
              <div
                key={`label-${row.label}`}
                className={`flex items-center px-6 py-6 font-semibold text-slate-800 ${
                  i % 2 === 0 ? "bg-gray-50" : "bg-white"
                } md:rounded-none`}
              >
                {row.label}
              </div>

              {/* eCampus value */}
              <div
                key={`us-${row.label}`}
                className={`flex items-start gap-2 border-x-2 border-red-600 px-6 py-6 bg-red-50/40 ${
                  i === rows.length - 1 ? "rounded-b-2xl border-b-2" : ""
                }`}
              >
                <ThumbsUp className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                <span className="text-sm leading-6 text-slate-800">
                  {row.us}
                </span>
              </div>

              {/* Other courses value */}
              <div
                key={`them-${row.label}`}
                className={`flex items-start gap-2 px-6 py-6 ${
                  i % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <ThumbsDown className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                <span className="text-sm leading-6 text-gray-500">
                  {row.them}
                </span>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
