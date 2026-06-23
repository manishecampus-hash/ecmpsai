"use client";

import { ArrowLeft, Calculator } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useMemo, useState } from "react";

const calculatorTitles: Record<string, string> = {
  "inches-to-centimeters": "Inch to Centimeter Calculator",
  "online-university-roi": "Online University ROI Calculator",
  "gpa-to-percentage": "GPA to Percentage Calculator",
  "sgpa-to-percentage": "SGPA to Percentage Calculator",
  "cgpa-to-percentage": "CGPA to Percentage Calculator",
  bmi: "BMI Calculator",
  age: "Age Calculator",
  "inr-to-usd": "INR to USD Converter",
  fraction: "Fraction Calculator",
  "gallon-to-liter": "Gallon to Liter Calculator",
  "meters-to-feet": "Meters to Feet Converter",
  percentage: "Percentage Calculator",
  "feet-to-centimeter": "Feet to Centimeter Calculator",
  "kilometer-to-mile": "Kilometer to Mile Calculator",
  "sq-ft-to-sq-meter": "Sq Ft to Sq Meter Converter",
};

const conversionRows = [
  ["1 inch", "2.54 cm"],
  ["2 inches", "5.08 cm"],
  ["3 inches", "7.62 cm"],
  ["4 inches", "10.16 cm"],
  ["5 inches", "12.7 cm"],
  ["6 inches", "15.24 cm"],
  ["8 inches", "20.32 cm"],
  ["10 inches", "25.4 cm"],
  ["12 inches", "30.48 cm"],
  ["15 inches", "38.1 cm"],
  ["20 inches", "50.8 cm"],
  ["24 inches", "60.96 cm"],
];

const popularCourses = [
  ["Online B.Com", "Online M.Com"],
  ["Online B.Sc", "Online M.Sc"],
  ["Online BA", "Online MA"],
  ["Online BBA", "Online MCA"],
  ["Online BCA", "Online MBA"],
];

const relatedCalculators = [
  [
    "Inch to Centimeter Calculator",
    "Online University ROI Calculator",
    "GPA To Percentage Calculator",
  ],
  ["SGPA to Percentage Calculator", "BMI Calculator", "Age Calculator"],
  ["INR to USD Converter", "Fraction Calculator", "Convert Gallon Into Liter"],
  [
    "Meters & Feet Converter",
    "Percentage Calculator",
    "CGPA to Percentage Calculator",
  ],
  [
    "feet to centimeters calculator",
    "kilometer to miles calculator",
    "square meter to square feet calculator",
  ],
];

const faqs = [
  {
    question: "What is the formula to convert inches into centimeters?",
    answer:
      "The standard formula to convert inches into centimeters is: 1 inch = 2.54 centimeters. To get the value in centimeters, multiply the inch value by 2.54.",
  },
  {
    question: "How accurate is the Inch to Centimeter Calculator?",
    answer:
      "The calculator uses the globally accepted conversion value of 1 inch = 2.54 centimeters, so the result is accurate for normal academic, professional, and daily use.",
  },
  {
    question: "Can I convert decimal inch values using this tool?",
    answer:
      "Yes, you can enter decimal inch values such as 5.5, 10.25, or 12.75 and convert them instantly.",
  },
  {
    question: "Why do we need to convert inches to centimeters?",
    answer:
      "Inches are commonly used in some countries and product listings, while centimeters are used in the metric system. Conversion helps users understand measurements clearly.",
  },
  {
    question: "Is the Inch to Centimeter Calculator free to use?",
    answer:
      "Yes, this calculator is free to use and does not require sign-up or installation.",
  },
];

const numberValue = (value: string) => Number(value) || 0;

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-9 text-2xl font-extrabold text-black">{children}</h2>
);

const InchToCentimeterPage = () => {
  const [inches, setInches] = useState("12");
  const [result, setResult] = useState("");

  const calculate = () => {
    setResult((numberValue(inches) * 2.54).toFixed(2));
  };

  const recalculate = () => {
    setResult("");
  };

  return (
    <main className="min-h-screen bg-white text-gray-950">
      <section className="bg-black px-4 py-20 text-center text-white">
        <h1 className="text-2xl font-bold md:text-4xl">
          Inch to Centimeter Calculator
        </h1>
        <p className="mx-auto mt-8 max-w-3xl rounded-full bg-gray px-8 py-4 text-6lg">
          Convert inches into centimeters instantly
        </p>

        <div className="mx-auto mt-20 max-w-3xl rounded-[32px] bg-white px-6 py-14 text-gray-900 md:px-16">
          {result ? (
            <div className="py-10 text-center">
              <p className="text-5xl font-extrabold text-red-600 md:text-7xl">
                {result} cm
              </p>
              <p className="mt-5 text-2xl text-gray-900">Centimeters</p>
              <button
                type="button"
                onClick={recalculate}
                className="mt-10 rounded-xl border-2 border-black px-8 py-3 text-xl font-semibold text-white-600 hover:bg-black hover:text-white"
              >
                Recalculate
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center gap-4 text-2xl">
                <span>I have</span>
                <input
                  value={inches}
                  onChange={(event) => setInches(event.target.value)}
                  className="w-28 border-b-2 border-gray-900 text-center text-3xl font-bold text-gray-500 outline-none"
                  type="number"
                />
                <span>inches</span>
              </div>
              <p className="mt-8 text-xl italic text-gray-600">
                let&apos;s convert it!
              </p>
              <p className="mt-14 text-xl">
                Want to know how many centimeters this equals?
              </p>
              <button
                type="button"
                onClick={calculate}
                className="mt-6 rounded-xl bg-black px-5 py-4 text-lg font-semibold text-white hover:bg-black "
              >
                Calculate
              </button>
            </>
          )}
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-10 text-[15px] leading-7 text-black">
        <h2 className="text-3xl font-extrabold">
          Inch to Centimeter Calculator - Quick & Accurate Inch to cm Conversion
          Tool
        </h2>
        <p className="mt-5">
          The Inch to Centimeter Calculator is a fast, reliable, and easy-to-use
          online tool that helps you convert measurements from inches to
          centimeters instantly. This tool is designed for students,
          professionals, online shoppers, designers, and everyday users who need
          quick and accurate measurement conversions without manual
          calculations.
        </p>
        <p className="mt-5">
          Since different countries follow different measurement systems,
          converting inches to centimeters has become a common requirement. This
          calculator on eCampus eliminates confusion and provides precise
          results in just one click.
        </p>

        <SectionTitle>What Is an Inch to Centimeter Calculator?</SectionTitle>
        <p className="mt-4">
          An Inch to Centimeter Calculator is an online conversion tool that
          converts values measured in inches into centimeters. Inches are widely
          used in countries like the USA, while centimeters are part of the
          metric system followed in India and most parts of the world.
        </p>

        <SectionTitle>Inch to Centimeter Conversion Formula</SectionTitle>
        <p className="mt-4">
          The conversion between inches and centimeters is based on a standard
          mathematical relationship:
        </p>
        <p className="mt-4 font-extrabold">1 inch = 2.54 centimeters</p>
        <p className="mt-4">
          To convert inches into centimeters, multiply the inch value by 2.54.
        </p>
        <p className="mt-4 font-bold">Example:</p>
        <ul className="ml-6 mt-2 list-disc space-y-2">
          <li>
            6 inches x 2.54 = <strong>15.24 cm</strong>
          </li>
          <li>
            15 inches x 2.54 = <strong>38.1 cm</strong>
          </li>
        </ul>

        <SectionTitle>Inch to Centimeter Conversion Table</SectionTitle>
        <p className="mt-4">
          For quick reference, here is a commonly used Inch to Centimeter
          conversion table.
        </p>
        <table className="mt-5 w-full border-collapse text-left text-sm">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-3">Inches (in)</th>
              <th className="border border-gray-400 px-4 py-3">
                Centimeters (cm)
              </th>
            </tr>
          </thead>
          <tbody>
            {conversionRows.map((row) => (
              <tr key={row[0]}>
                <td className="border border-gray-300 px-4 py-2">{row[0]}</td>
                <td className="border border-gray-300 px-4 py-2">{row[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <SectionTitle>
          How to Use the Inch to Centimeter Calculator on eCampus
        </SectionTitle>
        <ol className="ml-6 mt-4 list-decimal space-y-1">
          <li>Enter the value in inches in the input box</li>
          <li>Click on the Convert button</li>
          <li>Instantly get the result in centimeters</li>
        </ol>
        <p className="mt-4">
          No sign-up, no installation, and no technical knowledge required.
        </p>

        <SectionTitle>
          Key Features of the Inch to Centimeter Calculator
        </SectionTitle>
        <ul className="ml-6 mt-4 list-disc space-y-1">
          <li>Instant inch to cm conversion</li>
          <li>Accurate results using standard conversion logic</li>
          <li>Supports decimal and whole number values</li>
          <li>Mobile-friendly and responsive design</li>
          <li>Clean and distraction-free interface</li>
          <li>Completely free to use</li>
        </ul>

        <SectionTitle>Who Can Use This Inch to cm Calculator?</SectionTitle>
        <ol className="ml-6 mt-4 list-decimal space-y-3">
          <li>
            <strong>Students</strong>
            <br />
            Helpful for mathematics, physics, engineering, and technical
            subjects where unit conversion is required.
          </li>
          <li>
            <strong>Professionals</strong>
            <br />
            Used by architects, civil engineers, interior designers, and
            technical professionals for accurate measurements.
          </li>
          <li>
            <strong>Online Shoppers</strong>
            <br />
            Many international products list dimensions in inches. This tool
            helps convert them into centimeters easily.
          </li>
          <li>
            <strong>Tailors and Designers</strong>
            <br />
            Ensures correct size conversion for clothing, fabrics, and
            accessories.
          </li>
          <li>
            <strong>Everyday User</strong>
            <br />
            Perfect for home measurements like TV screens, furniture, and room
            dimensions.
          </li>
        </ol>

        <SectionTitle>Why Use This Inch to cm Calculator?</SectionTitle>
        <ol className="ml-6 mt-4 list-decimal space-y-3">
          <li>
            <strong>Accuracy</strong>
            <br />
            Eliminates calculation mistakes and rounding errors.
          </li>
          <li>
            <strong>Time-Saving</strong>
            <br />
            Provides instant results compared to manual conversion.
          </li>
          <li>
            <strong>User-Friendly</strong>
            <br />
            No learning curve, anyone can use it easily.
          </li>
          <li>
            <strong>Reliable</strong>
            <br />
            Uses the globally accepted conversion standard.
          </li>
        </ol>

        <SectionTitle>Final Thoughts</SectionTitle>
        <p className="mt-4">
          The Inch to Centimeter Calculator on eCampus is a reliable and
          practical solution for converting inches into centimeters accurately
          and instantly. Whether you are a student, professional, or everyday
          user, this tool helps you avoid confusion and saves valuable time.
        </p>

        <SectionTitle>
          eCampus - Online Education, Career Guidance & Smart Tools
        </SectionTitle>
        <p className="mt-4">
          eCampus is a modern online education and digital learning platform
          created to support students and working professionals in their
          academic journey. It provides access to online education resources,
          career-oriented guidance, and smart tools that simplify learning and
          decision-making.
        </p>

        <SectionTitle>Explore our Popular Online Course</SectionTitle>
        <table className="mt-4 w-48 border-collapse text-center text-xs">
          <thead>
            <tr>
              <th
                className="border border-gray-300 bg-black px-3 py-2 text-white"
                colSpan={2}
              >
                Online Course
              </th>
            </tr>
          </thead>
          <tbody>
            {popularCourses.map((row) => (
              <tr key={row.join("-")}>
                <td className="border border-gray-300 px-3 py-2 text-blue-600">
                  {row[0]}
                </td>
                <td className="border border-black px-3 py-2 text-blue-600">
                  {row[1]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="mt-16 w-full border-collapse text-center text-xs">
          <thead>
            <tr>
              <th
                className="border border-black bg-black px-3 py-3 text-white"
                colSpan={3}
              >
                Free Online Calculators
              </th>
            </tr>
          </thead>
          <tbody>
            {relatedCalculators.map((row) => (
              <tr key={row.join("-")}>
                {row.map((item) => (
                  <td key={item} className="border border-black px-3 py-2">
                    {item}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <section className="mt-8 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="py-4 text-center text-2xl font-extrabold">
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-gray-200">
            {faqs.map((faq) => (
              <details key={faq.question} className="group px-5 py-4">
                <summary className="cursor-pointer list-none text-sm font-extrabold">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-gray-700">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
};

const GenericCalculatorPage = ({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [date, setDate] = useState("");
  const [operation, setOperation] = useState("add");

  const result = useMemo(() => {
    const x = numberValue(a);
    const y = numberValue(b);
    const z = numberValue(c);

    switch (slug) {
      case "gpa-to-percentage":
      case "sgpa-to-percentage":
      case "cgpa-to-percentage":
        return `${(x * 9.5).toFixed(2)}%`;
      case "bmi": {
        const heightMeters = y / 100;
        if (!heightMeters) return "Enter height";
        return `${(x / (heightMeters * heightMeters)).toFixed(2)} BMI`;
      }
      case "age": {
        if (!date) return "Select date of birth";
        const dob = new Date(date);
        const now = new Date();
        let years = now.getFullYear() - dob.getFullYear();
        let months = now.getMonth() - dob.getMonth();
        if (months < 0) {
          years -= 1;
          months += 12;
        }
        return `${years} years ${months} months`;
      }
      case "inr-to-usd":
        return `$${(x / 83).toFixed(2)} USD`;
      case "fraction":
        if (!y) return "Enter second number";
        if (operation === "subtract") return `${(x - y).toFixed(2)}`;
        if (operation === "multiply") return `${(x * y).toFixed(2)}`;
        if (operation === "divide") return `${(x / y).toFixed(2)}`;
        return `${(x + y).toFixed(2)}`;
      case "gallon-to-liter":
        return `${(x * 3.78541).toFixed(2)} liters`;
      case "meters-to-feet":
        return `${(x * 3.28084).toFixed(2)} feet`;
      case "percentage":
        return `${((x / 100) * y).toFixed(2)}`;
      case "feet-to-centimeter":
        return `${(x * 30.48).toFixed(2)} cm`;
      case "kilometer-to-mile":
        return `${(x * 0.621371).toFixed(2)} miles`;
      case "sq-ft-to-sq-meter":
        return `${(x * 0.092903).toFixed(2)} sq meters`;
      case "online-university-roi":
        return `ROI value: ${(y * (z || 1) - x).toFixed(2)}`;
      default:
        return "Calculator ready";
    }
  }, [a, b, c, date, operation, slug]);

  const needsSecondInput = [
    "bmi",
    "fraction",
    "percentage",
    "online-university-roi",
  ].includes(slug);
  const needsThirdInput = slug === "online-university-roi";

  return (
    <main className="min-h-screen bg-[#fff8f8] px-4 py-10">
      <section className="mx-auto max-w-2xl">
        <Link
          href="/tools"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-red-600"
        >
          <ArrowLeft size={16} />
          Back to calculators
        </Link>

        <div className="overflow-hidden border border-gray-400 bg-white shadow-[4px_4px_0_rgba(0,0,0,0.18)]">
          <div className="flex items-center gap-3 bg-red-600 px-5 py-5 text-white">
            <Calculator size={30} />
            <div>
              <p className="text-xs font-bold uppercase">
                Easy | Fast | Accurate
              </p>
              <h1 className="text-2xl font-extrabold">{title}</h1>
            </div>
          </div>

          <div className="space-y-4 p-5">
            {slug === "age" ? (
              <label className="block text-sm font-bold text-gray-700">
                Date of birth
                <input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="mt-2 h-11 w-full border border-gray-300 px-3 text-gray-700 outline-none focus:border-red-500"
                />
              </label>
            ) : (
              <label className="block text-sm font-bold text-gray-700">
                {slug === "bmi"
                  ? "Weight in kg"
                  : slug === "online-university-roi"
                    ? "Total course cost"
                    : "Value"}
                <input
                  type="number"
                  value={a}
                  onChange={(event) => setA(event.target.value)}
                  className="mt-2 h-11 w-full border border-gray-300 px-3 text-gray-700 outline-none focus:border-red-500"
                />
              </label>
            )}

            {slug === "fraction" && (
              <label className="block text-sm font-bold text-gray-700">
                Operation
                <select
                  value={operation}
                  onChange={(event) => setOperation(event.target.value)}
                  className="mt-2 h-11 w-full border border-gray-300 px-3 text-gray-700 outline-none focus:border-red-500"
                >
                  <option value="add">Add</option>
                  <option value="subtract">Subtract</option>
                  <option value="multiply">Multiply</option>
                  <option value="divide">Divide</option>
                </select>
              </label>
            )}

            {needsSecondInput && (
              <label className="block text-sm font-bold text-gray-700">
                {slug === "bmi"
                  ? "Height in cm"
                  : slug === "percentage"
                    ? "Total value"
                    : slug === "online-university-roi"
                      ? "Yearly salary increase"
                      : "Second value"}
                <input
                  type="number"
                  value={b}
                  onChange={(event) => setB(event.target.value)}
                  className="mt-2 h-11 w-full border border-gray-300 px-3 text-gray-700 outline-none focus:border-red-500"
                />
              </label>
            )}

            {needsThirdInput && (
              <label className="block text-sm font-bold text-gray-700">
                Years
                <input
                  type="number"
                  value={c}
                  onChange={(event) => setC(event.target.value)}
                  className="mt-2 h-11 w-full border border-gray-300 px-3 text-gray-700 outline-none focus:border-red-500"
                />
              </label>
            )}

            <div className="border border-red-200 bg-red-50 p-4">
              <p className="text-xs font-bold uppercase text-red-600">Result</p>
              <p className="mt-1 text-2xl font-extrabold text-gray-950">
                {result}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const ToolsDetailPage = () => {
  const params = useParams();
  const slug = String(params.slug || "");
  const title = calculatorTitles[slug] || "Calculator";

  if (
    slug === "inches-to-centimeters" ||
    slug === "inch-to-centimeter-calculator"
  ) {
    return <InchToCentimeterPage />;
  }

  return <GenericCalculatorPage slug={slug} title={title} />;
};

export default ToolsDetailPage;
