import {
  GraduationCap,
  UserRound,
  CheckCircle2,
  Wallet,
  BookOpen,
  Coins,
  type LucideIcon,
  BadgeCheck,
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
    icon: UserRound,
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
  icon: LucideIcon;
  label: string;
  range: string;
}

const FEE_ROWS: FeeRow[] = [
  {
    icon: GraduationCap,
    label: "Online UG Programs",
    range: "₹16,500 - ₹30,000",
  },
  { icon: BookOpen, label: "Online PG Programs", range: "₹33,000 - ₹50,000" },
];

export default function EligibilityFeesSection({
  university,
}: EligibilityFeesSectionProps) {
  const universityName = university?.name ?? "the university";
  const eligibilityData = university?.details?.eligibility || {};

  const groups = eligibilityData.groups && eligibilityData.groups.length > 0
    ? eligibilityData.groups.map((group: any, idx: number) => ({
        icon: idx === 0 ? UserRound : GraduationCap,
        title: group.title,
        points: group.points || [],
      }))
    : ELIGIBILITY_GROUPS;

  const feeRows = eligibilityData.feeRows && eligibilityData.feeRows.length > 0
    ? eligibilityData.feeRows.map((row: any, idx: number) => ({
        icon: idx === 0 ? GraduationCap : BookOpen,
        label: row.label,
        range: row.range,
      }))
    : FEE_ROWS;

  return (
    <section
      id="eligibility-fees"
      className="bg-white px-4 pt-3 pb-14 sm:px-6 sm:pt-4 lg:px-8 lg:pt-6 lg:pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center font-[Inter]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <BadgeCheck className="h-3.5 w-3.5 text-red-500" />
            {eligibilityData.badge || "Eligibility"}
          </span>

          <h2 className="mt-1 text-[23px] font-bold tracking-tight text-gray-900 whitespace-nowrap sm:text-3xl md:text-4xl">
            {eligibilityData.heading ? (
              <span dangerouslySetInnerHTML={{ __html: eligibilityData.heading }} />
            ) : (
              <>
                Verify Your <span className="text-red-500">Eligibility</span>
              </>
            )}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Eligibility Criteria */}
          <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
            <div className="bg-red-50/60 px-6 py-6 sm:px-8">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white">
                  <GraduationCap
                    className="h-6 w-6 text-red-600"
                    strokeWidth={1.75}
                  />
                </span>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-slate-900">
                    {eligibilityData.criteriaHeading ? (
                      <span dangerouslySetInnerHTML={{ __html: eligibilityData.criteriaHeading }} />
                    ) : (
                      <>
                        Eligibility <span className="text-red-600">Criteria</span>
                      </>
                    )}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {eligibilityData.criteriaSub || "Simple requirements for a bright future"}
                  </p>
                </div>
              </div>
              <div className="mt-6 h-0.5 w-full bg-red-600/70" />
            </div>

            <div className="px-6 py-6 sm:px-8">
              {groups.map((group: any, groupIndex: number) => {
                const Icon = group.icon;
                return (
                  <div
                    key={group.title}
                    className={groupIndex > 0 ? "mt-6 text-left" : "text-left"}
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50">
                        <Icon
                          className="h-4.5 w-4.5 text-red-600"
                          strokeWidth={1.75}
                        />
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 sm:text-base">
                        {group.title}
                      </h4>
                    </div>
                    <ul className="divide-y divide-slate-100">
                      {group.points.map((point: string) => (
                        <li
                          key={point}
                          className="flex items-start gap-3 py-2.5"
                        >
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
                            strokeWidth={2}
                          />
                          <span className="text-sm text-slate-600">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fees Structure */}
          <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm text-left">
            <div className="bg-amber-50/60 px-6 py-6 sm:px-8">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white">
                  <Wallet
                    className="h-6 w-6 text-amber-600"
                    strokeWidth={1.75}
                  />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {eligibilityData.feeHeading ? (
                      <span dangerouslySetInnerHTML={{ __html: eligibilityData.feeHeading }} />
                    ) : (
                      <>
                        Fees <span className="text-amber-600">Structure</span>
                      </>
                    )}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {eligibilityData.feeSub || "Affordable and flexible fee structure"}
                  </p>
                </div>
              </div>
              <div className="mt-6 h-0.5 w-full bg-amber-500/70" />
            </div>

            <div className="px-6 py-6 sm:px-8">
              <p className="text-sm leading-7 text-slate-600">
                {eligibilityData.feeDesc || (
                  <>
                    {universityName.charAt(0).toUpperCase() + universityName.slice(1)} offers an affordable and flexible fee structure, making quality higher education accessible to a wide range of learners.
                  </>
                )}
              </p>

              <div className="mt-6 rounded-xl bg-amber-50/60 p-4 sm:p-5">
                <h4 className="mb-4 text-sm font-bold text-amber-700 sm:text-base">
                  {eligibilityData.feeRangeHeading || "Fee Range Overview"}
                </h4>
                <ul className="divide-y divide-amber-100">
                  {feeRows.map((row: any) => {
                    const Icon = row.icon;
                    return (
                      <li
                        key={row.label}
                        className="flex items-center justify-between gap-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
                            <Icon
                              className="h-4 w-4 text-amber-600"
                              strokeWidth={1.75}
                            />
                          </span>
                          <span className="text-sm font-semibold text-slate-800">
                            {row.label}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="block text-sm font-bold text-slate-900">
                            {row.range}
                          </span>
                          <span className="block text-xs text-slate-400">
                            per semester*
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-6 flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
                  strokeWidth={2}
                />
                <p className="text-sm leading-6 text-slate-600">
                  {eligibilityData.feeFooter || "Program fees vary depending on the chosen course and specialization. The fee structure is competitive and may be revised as per university guidelines."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-slate-100 bg-slate-50/60 px-6 py-4 sm:px-8">
              <Coins
                className="h-4 w-4 shrink-0 text-amber-600"
                strokeWidth={1.75}
              />
              <p className="text-sm font-medium text-slate-700">
                {eligibilityData.feeInstallments || "Easy installment options available.*"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
