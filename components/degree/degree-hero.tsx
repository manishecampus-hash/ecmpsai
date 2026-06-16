import Link from "next/link";
import { ChevronRight, IndianRupee, Clock, Building2 } from "lucide-react";
import { formatFee } from "@/lib/data";

// Note: Use 'export const', NOT 'export default'
export const DegreeHero = ({ degree }: { degree: any }) => (
  <section className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-12 px-4">
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">
        Is an Online {degree.name} right for you?
      </h1>
      <p className="text-gray-600 mb-8 max-w-2xl">{degree.description}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            icon: IndianRupee,
            label: "Avg Fee",
            value: formatFee(degree.avgFee),
          },
          { icon: Clock, label: "Duration", value: degree.duration },
          {
            icon: IndianRupee,
            label: "Avg Salary",
            value: `₹${(degree.avgSalary / 100000).toFixed(0)}L`,
          },
          {
            icon: Building2,
            label: "Universities",
            value: `${degree.universities}+`,
          },
        ].map((item, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border text-center">
            <item.icon className="w-5 h-5 mx-auto text-indigo-600 mb-2" />
            <div className="font-bold">{item.value}</div>
            <div className="text-xs text-gray-400">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
