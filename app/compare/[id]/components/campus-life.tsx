import { Users, MapPin, Coffee, Zap } from "lucide-react";

interface CampusProps {
  a: { name: string; description: string; highlights: string[] };
  b: { name: string; description: string; highlights: string[] };
}

export default function CampusLife({ a, b }: CampusProps) {
  return (
    <section className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-3 mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Campus Life & Facilities
        </h2>
      </div>

      {/* Comparison Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Amity University */}
        <div className="relative overflow-hidden rounded-3xl border border-purple-100 bg-gradient-to-br from-purple-50 via-white to-white p-6 transition-all duration-300 hover:shadow-lg">
          <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-purple-100/50 blur-2xl" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <MapPin size={20} className="text-purple-600" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Amity University
                </h3>
                <p className="text-xs text-gray-500">Campus Life Highlights</p>
              </div>
            </div>

            {a.description && (
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                {a.description}
              </p>
            )}

            <ul className="space-y-3">
              {a.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl bg-white/80 p-3 border border-purple-100"
                >
                  <div className="mt-0.5">
                    <Zap size={15} className="text-purple-500" />
                  </div>

                  <span className="text-sm text-gray-700">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Manipal University */}
        <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-white p-6 transition-all duration-300 hover:shadow-lg">
          <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-blue-100/50 blur-2xl" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Coffee size={20} className="text-blue-600" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Manipal University
                </h3>
                <p className="text-xs text-gray-500">Campus Life Highlights</p>
              </div>
            </div>

            {b.description && (
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                {b.description}
              </p>
            )}

            <ul className="space-y-3">
              {b.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl bg-white/80 p-3 border border-blue-100"
                >
                  <div className="mt-0.5">
                    <Zap size={15} className="text-blue-500" />
                  </div>

                  <span className="text-sm text-gray-700">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
