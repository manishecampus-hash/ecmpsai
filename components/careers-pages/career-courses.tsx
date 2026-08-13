"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const whyPoints = [
  {
    title: "In-Depth Subject Matter Exploration",
    body: "Our software development courses offer exhaustive insights into software engineering, encompassing its foundational principles, significance, historical evolution, and practical applications. This extensive coverage guarantees a holistic educational experience.",
  },
  {
    title: "Strategically Structured Curriculum",
    body: "With a focus on clarity and progression, our online software development course content is systematically organized into distinct sections, facilitating a seamless learning journey. This methodical approach is designed to optimize comprehension and retention of complex subject matter.",
  },
  {
    title: "Educational Excellence",
    body: "Our courses are developed to impart invaluable knowledge on the multifaceted aspects of software engineering. From delineating career trajectories to elucidating requisite skills and industry innovations, we aim to equip you with the acumen necessary for professional advancement.",
  },
  {
    title: "Interactive Learning Experience",
    body: "Engage with curated software engineering online course recommendations, detailed profiles of esteemed instructors, and motivational success stories from our alumni. These elements foster a dynamic learning environment, encouraging professional growth and networking.",
  },
  {
    title: "Current and Relevant Content",
    body: "We are committed to delivering content that reflects the latest trends and advancements in software engineering. Our curriculum is continually updated, ensuring relevance and applicability in a rapidly changing industry.",
  },
];

const featuredCourses = [
  {
    title: "Waterfall Model",
    body: "A comprehensive exploration of this traditional sequential design framework.",
  },
  {
    title: "Scope of Software Engineering",
    body: "An analytical overview of the field's extensive reach and potential.",
  },
  {
    title: "Turbo C++",
    body: "An in-depth course on programming with Turbo C++.",
  },
  {
    title: "Python IDE",
    body: "Mastery over Python through the lens of the most effective integrated development environments.",
  },
  {
    title: "Anaconda Python",
    body: "A specialized course on leveraging Python and data science through Anaconda.",
  },
];

export function CareerCourses() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
          Advance your Career with Software Engineering Courses
        </h2>

        <p className="mt-5 text-sm md:text-base text-gray-600 leading-7">
          Great Learning presents an unparalleled suite of complimentary
          software engineering courses, meticulously designed for seasoned
          professionals aiming to refine their technical prowess in the
          ever-evolving technological landscape. Our curriculum spans essential
          programming languages including C, C++, Java, Python, and R, alongside
          comprehensive training in the utilization of sophisticated platforms
          and tools such as Turbo C++, Dev C++, Visual Studio, Eclipse,
          Anaconda, and R-Studio. These offerings are crafted to bolster your
          understanding of software engineering principles, ensuring
          applicability across various domains.
        </p>

        <div
          className={`grid transition-all duration-500 ease-in-out ${
            expanded
              ? "grid-rows-[1fr] opacity-100 mt-8"
              : "grid-rows-[0fr] opacity-0 mt-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Why opt for Great Learning for your Software Engineering
                  endeavours?
                </h3>
                <div className="mt-4 space-y-4">
                  {whyPoints.map((point) => (
                    <p
                      key={point.title}
                      className="text-sm text-gray-600 leading-7"
                    >
                      <span className="font-semibold text-slate-900">
                        {point.title}:
                      </span>{" "}
                      {point.body}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Featured free Software Engineering courses
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {featuredCourses.map((course) => (
                    <li key={course.title} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-600" />
                      <p className="text-sm text-gray-600 leading-7">
                        <span className="font-semibold text-slate-900">
                          {course.title}:
                        </span>{" "}
                        {course.body}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-gray-500">
                  And numerous others curated to your professional development
                  needs.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Testimonials from our Esteemed Alumni
                </h3>
                <p className="mt-4 text-sm text-gray-600 leading-7">
                  Great Learning has catalyzed career transformations across the
                  spectrum through the best software engineering courses. Our
                  alumni, ranging from SecOps Engineers to Tech Leads, share
                  their journeys of growth and success, underscoring the
                  profound impact of our software engineering courses on their
                  professional trajectories.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Master Software Engineering
                </h3>
                <p className="mt-4 text-sm text-gray-600 leading-7">
                  Software engineering transcends mere programming; it is about
                  innovatively addressing complex challenges through technology.
                  At Great Learning, we are dedicated to providing you with the
                  advanced knowledge and tools necessary through the best
                  software development courses to make a significant impact in
                  the tech industry. Enroll in our free software courses and
                  chart a path to a fulfilling career in software engineering.
                </p>
                <p className="mt-4 text-sm text-gray-600 leading-7">
                  Discover new opportunities, learn software engineering at a
                  pace that suits your professional commitments, and join the
                  ranks of software engineering leaders with Great Learning.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
        >
          {expanded ? "Read less" : "Read more"}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </section>
  );
}
