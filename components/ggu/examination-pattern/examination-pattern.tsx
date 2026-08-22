"use client";

import { PenLine, Briefcase, Mic, ClipboardCheck } from "lucide-react";

const examTypes = [
  {
    icon: PenLine,
    title: "Written Tests",
    description:
      "Structured written assessments that evaluate your grasp of core theories, frameworks, and concepts covered across each course.",
  },
  {
    icon: Briefcase,
    title: "Case Studies",
    description:
      "Real-world business scenarios that test your ability to analyze problems and apply academic concepts to practical decision-making.",
  },
  {
    icon: Mic,
    title: "Talks & Presentations",
    description:
      "Oral presentations and discussions that assess your communication skills and depth of understanding of research and coursework.",
  },
  {
    icon: ClipboardCheck,
    title: "Hands-on Assessments",
    description:
      "Applied, practice-based evaluations designed to test how confidently you can use academic ideas in real-life business situations.",
  },
];

export default function ExamPattern() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          <span className="text-red-500">Golden Gate University</span> Exam
          Pattern
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
          A dynamic examination pattern is used at Golden Gate University that
          goes beyond regular tests. The method uses a variety of assessments —
          such as written tests, case studies, talks, and hands-on evaluations —
          to fully test students' knowledge, skills, and ability to use academic
          ideas in real-life situations.
        </p>

        {/* Exam Types Grid */}
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {examTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div
                key={type.title}
                className="flex gap-4 p-4 sm:p-5 border border-slate-200 rounded-lg bg-white hover:border-red-200 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 border border-red-200">
                    <Icon className="h-5 w-5 text-red-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base mb-1">
                    {type.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {type.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
