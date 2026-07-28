"use client";

interface CertificateSection {
  university?: {
    name?: string;
  };
}

const DEFAULT_CHECKLIST = [
  "1st in India to get UGC approval for online programs",
  "India's only Online MBA accredited by QS and ranked among the top 10 in Asia Pacific.",
  "Degrees recognised by World Education Services (WES) across Canada & USA.",
  "Ranked 22nd by NIRF in 2025",
];

export default function SampleCertificateSection({
  university,
}: CertificateSection) {
  const certData = university?.details?.certificate || {};
  const universityName = university?.name || "Amity University";

  const checklist =
    certData.checklist && certData.checklist.length > 0
      ? certData.checklist
      : DEFAULT_CHECKLIST;

  return (
    <section
      id="sample-certificate"
      className="bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20 font-[Inter]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-5 lg:gap-8">
          {/* Left: heading, description & checklist */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
              {certData.heading ? (
                <span dangerouslySetInnerHTML={{ __html: certData.heading }} />
              ) : (
                <>
                  Sample Certificate from{" "}
                  <span className="text-red-500">{universityName} Online</span>
                </>
              )}
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
              {certData.description ||
                `Become alumnus of ${universityName} Online and get a UGC-approved online degree. The degree awarded by the university is also been accredited by WES, etc.`}
            </p>

            <ul className="mt-7 space-y-4">
              {checklist.map((item: string) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-slate-700 sm:text-base"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-3 w-3"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 5.29a1 1 0 010 1.415l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.414l2.793 2.792 6.793-6.793a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: framed certificate image */}
          <div className="flex justify-center lg:col-span-2">
            <div className="relative w-full max-w-xs border-[8px] border-slate-900 bg-slate-900 shadow-2xl sm:max-w-sm">
              <div className="relative h-56 overflow-hidden bg-[#f5efe4] p-3 sm:h-64">
                {certData.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={certData.imageUrl}
                    alt={`Sample certificate from ${universityName}`}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-center text-xs font-medium text-slate-400">
                    Certificate image goes here
                  </div>
                )}

                {/* diagonal SAMPLE watermark */}
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-3xl font-bold uppercase tracking-widest text-slate-400/30 [transform:rotate(-25deg)]">
                  Sample
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
