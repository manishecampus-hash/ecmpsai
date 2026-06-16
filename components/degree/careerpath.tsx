import { ArrowRight } from "lucide-react";

interface CareerPathProps {
  path: string[];
}

export const CareerPath = ({ path }: CareerPathProps) => {
  if (!path || path.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Career Progression
      </h2>
      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6">
        <div className="flex items-center gap-2 md:gap-4 flex-wrap">
          {path.map((step, i) => (
            <span key={step} className="flex items-center gap-2">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${
                  i === 0
                    ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
                    : i === path.length - 1
                      ? "bg-[#4F46E5] border-[#4F46E5] text-white"
                      : "bg-white dark:bg-gray-800 border-[#4F46E5]/30 text-[#4F46E5] dark:text-indigo-400"
                }`}
              >
                {step}
              </span>
              {i < path.length - 1 && (
                <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
