import { CheckCircle } from "lucide-react";

const eligibilityPoints = [
  "Master's degree from a recognized university",
  "Minimum 55% marks or equivalent CGPA",
  "Professionals with managerial or leadership experience",
  "Entrepreneurs, consultants, and working executives",
  "Interest in AI, innovation, or digital transformation",
  "Admission subject to profile evaluation and university approval",
];

export default function Page() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">
            Who Can <span className="text-red-500">Apply?</span>
          </h1>

          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Built for experienced professionals ready to advance their careers
            through research, leadership, and AI-driven business innovation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
          {eligibilityPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
              <p className="text-gray-700 leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
