import React from "react";
import { CheckSquare } from "lucide-react";

const specializations = [
  {
    title: "Strategic Management",
    desc: "This specialization builds expertise in corporate strategy, competitive analysis, and organizational decision-making at the executive level.",
    roles:
      "Chief Strategy Officer, Management Consultant, Business Strategist, Vice President - Strategy, Director of Operations",
  },
  {
    title: "Organizational Leadership",
    desc: "It focuses on leadership theory, change management, organizational behavior, and building high-performing teams.",
    roles:
      "Chief Executive Officer, Chief Human Resources Officer, VP - People & Culture, Organizational Development Director",
  },
  {
    title: "Finance & Investment",
    desc: "This specialization provides advanced knowledge of corporate finance, investment strategy, financial modeling, and capital markets.",
    roles:
      "Chief Financial Officer, VP - Finance, Investment Director, Financial Strategy Consultant, Fund Manager",
  },
  {
    title: "Marketing Strategy",
    desc: "It covers brand strategy, consumer behavior research, digital marketing leadership, and go-to-market planning.",
    roles:
      "Chief Marketing Officer, VP - Marketing, Brand Strategy Director, Marketing Research Consultant",
  },
  {
    title: "International Business",
    desc: "This specialization focuses on global market entry strategy, cross-border management, international trade policy, and global operations.",
    roles:
      "Chief International Officer, VP - Global Operations, International Business Consultant, Global Strategy Director",
  },
];

export default function GGUDoctorateSpecializations() {
  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold leading-tight text-black sm:text-4xl">
            Top Online DBA{" "}
            <span className="text-red-500">Specializations at GGU</span>
          </h2>

          <p className="mx-auto mt-4 max-w-6xl text-lg leading-relaxed text-black">
            <strong>Golden Gate University&apos;s Online DBA</strong> offers
            in-demand specializations aligned with executive leadership,
            strategy, finance, marketing, and global business careers.
          </p>
        </div>

        <div className="mt-9 space-y-7">
          {specializations.map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <CheckSquare className="mt-1 h-5 w-5 flex-shrink-0 fill-red-500 text-red-500" />

              <div>
                <h3 className="text-xl font-bold text-black">{item.title}:</h3>

                <p className="mt-1 text-lg leading-relaxed text-black">
                  {item.desc}
                </p>

                <p className="mt-1 text-lg leading-relaxed text-black">
                  <strong>Career roles:</strong> {item.roles}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
