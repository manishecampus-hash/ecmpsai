import { CheckCircle2 } from "lucide-react";

interface TargetAudienceProps {
  audience: string[];
}

export const TargetAudience = ({ audience }: TargetAudienceProps) => {
  if (!audience || audience.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Who Should Do This?
      </h2>
      <div className="flex flex-wrap gap-2">
        {audience.map((who) => (
          <span
            key={who}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800 rounded-full text-sm text-[#4F46E5] dark:text-indigo-300 font-medium"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            {who}
          </span>
        ))}
      </div>
    </section>
  );
};
