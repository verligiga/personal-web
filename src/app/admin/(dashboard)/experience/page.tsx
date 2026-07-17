import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPeriod } from "@/lib/format";
import { deleteExperience } from "@/lib/actions/experience";
import { Button } from "@/components/atoms/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/molecules/table";

export default async function AdminExperiencePage() {
  const experience = await prisma.experience.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-mono text-2xl text-foreground">Experience</h1>
        <Link href="/admin/experience/new">
          <Button size="sm" className="font-mono text-xs tracking-widest">
            + NEW
          </Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Period</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {experience.map((job) => (
            <TableRow key={job.id}>
              <TableCell className="font-mono text-xs">{job.role}</TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {job.company}
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {formatPeriod(job.startDate, job.endDate)}
              </TableCell>
              <TableCell className="flex justify-end gap-3">
                <Link
                  href={`/admin/experience/${job.id}`}
                  className="font-mono text-xs text-primary hover:underline"
                >
                  EDIT
                </Link>
                <form action={deleteExperience.bind(null, job.id)}>
                  <button className="font-mono text-xs text-destructive hover:underline">
                    DELETE
                  </button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
