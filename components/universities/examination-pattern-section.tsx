import {
  Scale,
  FileText,
  ClipboardList,
  Award,
  ShieldCheck,
  type LucideIcon,
  ClipboardCheck,
} from "lucide-react";

interface ExaminationPatternSectionProps {
  university?: {
    name?: string;
  };
}

interface PatternItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const PATTERN_ITEMS: PatternItem[] = [
  {
    icon: Scale,
    title: "Weightage Distribution",
    description:
      "Internal assessments carry 30% of the weightage, while external end-term examinations carry 70% of the weightage, ensuring a balanced evaluation approach.",
  },
  {
    icon: FileText,
    title: "Internal Assessment Components",
    description:
      "Students must submit assignments by due dates to complete internal assessment requirements, with assignment submission available online through the Learning Portal.",
  },
  {
    icon: ClipboardList,
    title: "External Examination Format",
    description:
      "External exams are divided into different sections including subjective questions, case studies, and multiple-choice questions, providing a comprehensive evaluation across different question types and skill levels.",
  },
  {
    icon: Award,
    title: "Qualifying Criteria",
    description:
      "Students must score minimum required percentages in both internal and external assessments to qualify for the degree, with passing requirements varying by program level.",
  },
  {
    icon: ShieldCheck,
    title: "Proctored Online System",
    description:
      "Examinations are conducted through secure online systems with AI-powered monitoring and remote invigilation using webcam surveillance to maintain academic integrity and prevent malpractices.",
  },
];

export default function ExaminationPatternSection({
  university,
}: ExaminationPatternSectionProps) {
  const examData = university?.details?.examination || {};
  const items = examData.items && examData.items.length > 0
    ? examData.items.map((item: any, idx: number) => {
        const defaultIcons = [Scale, FileText, ClipboardList, Award, ShieldCheck];
        const Icon = defaultIcons[idx % defaultIcons.length] || FileText;
        return {
          icon: Icon,
          title: item.title,
          description: item.description,
        };
      })
    : PATTERN_ITEMS;

  return (
    <section
      id="examination-pattern"
      className="bg-white px-4 -mt-6 pt-0 pb-14 sm:px-6 sm:-mt-4 lg:px-8 lg:-mt-2 lg:pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center font-[Inter]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <ClipboardCheck className="h-3.5 w-3.5 text-red-500" />
            {examData.badge || "Examination"}
          </span>

          <h2 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 whitespace-nowrap sm:text-3xl md:text-4xl">
            {examData.heading ? (
              <span dangerouslySetInnerHTML={{ __html: examData.heading }} />
            ) : (
              <>
                Online Examination <span className="text-red-500">Pattern</span>
              </>
            )}
          </h2>
        </div>

        {/* List */}
        <div className="mt-8 divide-y divide-slate-100 border-t border-slate-100 text-left">
          {items.map((item: any) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:gap-6"
              >
                {/* Icon + title */}
                <div className="flex shrink-0 items-center gap-4 sm:w-64">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-50">
                    <Icon className="h-6 w-6 text-red-600" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                    {item.title}
                  </h3>
                </div>

                {/* Divider (desktop only) */}
                <div className="hidden h-14 w-px shrink-0 bg-slate-200 sm:block" />

                {/* Description */}
                <p className="text-sm leading-7 text-slate-500 sm:text-base">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
