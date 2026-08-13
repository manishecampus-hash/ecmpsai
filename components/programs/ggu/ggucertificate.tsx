import { GraduationCap } from "lucide-react";

const certificationPoints = [
  "Degree equivalent to a regular on-campus degree",
  "Hands-on Learning",
  "Globally Recognized Degree",
  "Highly experienced faculty",
];

export default function GGUCertificate() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Right image (kept first in DOM on mobile via order utilities to match About-section pattern) */}
        <div className="order-2 md:order-1 flex justify-center md:justify-start">
          <div className="relative w-full max-w-sm rounded-lg border border-gray-200 shadow-md overflow-hidden bg-white">
            <img
              src="/programuniversity/ggu_dba_certificate__1648725921747.webp"
              alt="Golden Gate University Certificate"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Left content */}
        <div className="order-1 md:order-2">
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Sample Certificate from{" "}
            <span className="text-red-500">Golden Gate University</span>
          </h2>

          <ul className="space-y-5">
            {certificationPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-1.5 h-3 w-3 shrink-0 bg-red-500" />
                <span className="text-[15px] sm:text-base text-gray-700 leading-relaxed">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
