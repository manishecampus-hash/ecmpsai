import {
  GraduationCap,
  CheckCircle2,
  Wallet,
  type LucideIcon,
} from "lucide-react";

interface EligibilityFeesSectionProps {
  university?: {
    name?: string;
  };
}

interface EligibilityGroup {
  icon: LucideIcon;
  title: string;
  points: string[];
}

const ELIGIBILITY_GROUPS: EligibilityGroup[] = [
  {
    icon: GraduationCap,
    title: "For Online Undergraduate Programs",
    points: [
      "10+2 or equivalent qualification from a recognized board",
      "No age limit for admission",
      "Open to freshers as well as working professionals",
    ],
  },
  {
    icon: GraduationCap,
    title: "For Online Postgraduate Programs",
    points: [
      "Bachelor's degree from a recognized university",
      "No entrance examination required",
      "Suitable for working professionals, entrepreneurs, and career aspirants",
    ],
  },
];

interface FeeRow {
  label: string;
  range: string;
}

const FEE_ROWS: FeeRow[] = [
  {
    label: "Online UG Programs",
    range: "₹16,500 – ₹30,000",
  },
  {
    label: "Online PG Programs",
    range: "₹33,000 – ₹50,000",
  },
];

export default function EligibilityFeesSection({
  university,
}: EligibilityFeesSectionProps) {
  const universityName = university?.name ?? "the university";
  const eligibilityData = university?.details?.eligibility || {};

  const groups =
    eligibilityData.groups && eligibilityData.groups.length > 0
      ? eligibilityData.groups.map((group: any, idx: number) => ({
          title: group.title,
          points: group.points || [],
        }))
      : ELIGIBILITY_GROUPS;

  const feeRows =
    eligibilityData.feeRows && eligibilityData.feeRows.length > 0
      ? eligibilityData.feeRows.map((row: any) => ({
          label: row.label,
          range: row.range,
        }))
      : FEE_ROWS;

  return (
    <section id="fee" className="bg-white px-6 py-4 sm:px-8 lg:px-12 lg:py-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Eligibility Criteria */}
          <div className="rounded-3xl border border-gray-300 bg-white p-10">
            <div className="mb-8">
              <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl ">
                Eligibility{" "}
                <span className="text-red-600">
                  {eligibilityData.criteriaHeading || "Criteria"}
                </span>
              </h2>
              <div className="mt-5 h-1 w-20 bg-red-600" />
            </div>

            <div className="space-y-8">
              {groups.map((group: any) => (
                <div key={group.title}>
                  <h3 className="mb-4 text-base font-bold text-black">
                    {group.title}
                  </h3>
                  <ul className="space-y-3.5">
                    {group.points.map((point: string) => (
                      <li key={point} className="flex items-start gap-3">
                        <CheckCircle2
                          className="mt-0.5 h-5 w-5 shrink-0 text-red-600 flex-shrink-0"
                          strokeWidth={2}
                          fill="currentColor"
                        />
                        <span className="text-base text-black leading-normal">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Fees Structure */}
          <div className="rounded-3xl border border-gray-300 bg-white p-10">
            <div className="mb-8">
              <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl ">
                Fees{" "}
                <span className="text-red-600">
                  {eligibilityData.feeHeading || "Structure"}
                </span>
              </h2>
              <div className="mt-5 h-1 w-20 bg-red-600" />
            </div>

            <div className="space-y-7">
              <p className="text-base leading-7 text-black">
                {eligibilityData.feeDesc || (
                  <>
                    {universityName.charAt(0).toUpperCase() +
                      universityName.slice(1)}{" "}
                    offers an affordable and flexible fee structure, making
                    quality higher education accessible to a wide range of
                    learners.
                  </>
                )}
              </p>

              <div>
                <h3 className="mb-5 text-base font-bold text-black">
                  {eligibilityData.feeRangeHeading ||
                    universityName.charAt(0).toUpperCase() +
                      universityName.slice(1) +
                      " Online Fee Range"}
                </h3>
                <ul className="space-y-3.5">
                  {feeRows.map((row: any) => (
                    <li key={row.label} className="flex items-center gap-3">
                      <CheckCircle2
                        className="h-5 w-5 text-red-600 flex-shrink-0"
                        strokeWidth={2}
                        fill="currentColor"
                      />
                      <span className="text-base text-black">{row.label}</span>
                      <span className="ml-auto text-base text-black font-semibold">
                        {row.range}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-sm text-gray-600">per semester*</p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-red-600 flex-shrink-0"
                  strokeWidth={2}
                  fill="currentColor"
                />
                <p className="text-base leading-7 text-black">
                  {eligibilityData.feeFooter ||
                    "Program fees at Amity Online University vary depending on the chosen course and specialization. The fee structure is competitive and may be revised as per university guidelines."}
                </p>
              </div>

              <div>
                <p className="text-base text-blue-600 italic">
                  {eligibilityData.feeInstallments ||
                    "Easy installment options available.*"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
