import { Star } from "lucide-react";

const universities = [
  {
    name: "McCombs School of Business",
    sub: "The University of Texas at Austin",
  },
  { name: "Great Lakes", sub: "Executive Learning" },
  { name: "Northwestern", sub: "School of Professional Studies" },
  { name: "IDSS · MIT", sub: "" },
  { name: "Deakin University", sub: "" },
  { name: "MIT Professional Education", sub: "" },
  { name: "Johns Hopkins", sub: "Whiting School of Engineering" },
  { name: "Walsh College", sub: "" },
  { name: "IIT", sub: "" },
];

const ratings = [
  { source: "Google", score: "4.6" },
  { source: "Course Report", score: "4.89" },
  { source: "SwitchUp", score: "4.94" },
  { source: "Career Karma", score: "4.7" },
];

export function LearnFromSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Top: heading + logo grid */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16 items-start">
          <div>
            <span className="text-sm font-bold tracking-widest text-red-600">
              LEARN FROM
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              The world&apos;s best universities
            </h2>
            <p className="mt-4 text-base text-gray-600 leading-7">
              We partner with the world&apos;s most respected universities so
              that you can get top-notch education.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-10">
            {universities.map((uni) => (
              <div
                key={uni.name}
                className="flex flex-col items-start justify-center min-h-[56px]"
              >
                <span className="text-lg font-semibold text-slate-800">
                  {uni.name}
                </span>
                {uni.sub && (
                  <span className="text-xs text-gray-500 mt-0.5">
                    {uni.sub}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 border-t border-gray-200" />

        {/* Bottom: trust badges */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
            Empowering millions through professional learning
          </h3>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {ratings.map((r) => (
              <div
                key={r.source}
                className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-3 shadow-sm"
              >
                <span className="text-lg font-bold text-slate-900">
                  {r.score}
                </span>
                <Star className="h-5 w-5 fill-red-500 text-red-500" />
                <span className="text-sm font-semibold text-gray-700">
                  {r.source}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
