import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { formatFee } from "@/lib/data";

export const UniversitySection = ({ universities, degreeName }: any) => (
  <section>
    <h2 className="text-xl font-bold mb-6">
      Top Universities for {degreeName}
    </h2>
    <div className="bg-white border rounded-2xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>University</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Placement</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {universities.map((uni: any) => (
            <TableRow key={uni.slug}>
              <TableCell>
                <Link href={`/university/${uni.slug}`}>{uni.shortName}</Link>
              </TableCell>
              <TableCell>{formatFee(uni.avgFee)}</TableCell>
              <TableCell>{uni.placementRate}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </section>
);
