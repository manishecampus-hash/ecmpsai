import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatFee } from "@/lib/data";

interface University {
  slug: string;
  shortName: string;
  avgFee: number;
  mode: string[];
  naac: string;
  placementRate: number;
}

export const FeeComparisonTable = ({
  universities,
}: {
  universities: University[];
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-gray-800/50">
            <TableHead className="font-semibold text-gray-700 dark:text-gray-200">
              University
            </TableHead>
            <TableHead className="font-semibold text-gray-700 dark:text-gray-200">
              Total Fee
            </TableHead>
            <TableHead className="font-semibold text-gray-700 dark:text-gray-200">
              Mode
            </TableHead>
            <TableHead className="font-semibold text-gray-700 dark:text-gray-200">
              NAAC
            </TableHead>
            <TableHead className="font-semibold text-gray-700 dark:text-gray-200">
              Placement
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {universities.map((uni, i) => (
            <TableRow
              key={uni.slug}
              className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
            >
              <TableCell>
                <Link
                  href={`/university/${uni.slug}`}
                  className="font-medium text-gray-900 dark:text-white hover:text-[#4F46E5] dark:hover:text-indigo-400 transition-colors text-sm"
                >
                  {uni.shortName}
                </Link>
              </TableCell>
              <TableCell>
                <span
                  className={`text-sm font-bold ${i === 0 ? "text-green-600 dark:text-green-400" : "text-gray-700 dark:text-gray-300"}`}
                >
                  {formatFee(uni.avgFee)}
                  {i === 0 && (
                    <span className="ml-1 text-xs font-normal bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded-full">
                      Best
                    </span>
                  )}
                </span>
              </TableCell>
              <TableCell className="text-sm text-gray-600 dark:text-gray-300">
                {uni.mode.join(", ")}
              </TableCell>
              <TableCell className="text-sm text-gray-600 dark:text-gray-300">
                {uni.naac}
              </TableCell>
              <TableCell>
                <span
                  className={`text-sm font-medium ${uni.placementRate >= 85 ? "text-green-600 dark:text-green-400" : "text-gray-400 dark:text-gray-500"}`}
                >
                  {uni.placementRate}%
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
