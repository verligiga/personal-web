import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteEducation } from "@/lib/actions/education";
import { Button } from "@/components/atoms/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/molecules/table";

export default async function AdminEducationPage() {
  const education = await prisma.education.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-mono text-2xl text-foreground">Education</h1>
        <Link href="/admin/education/new">
          <Button size="sm" className="font-mono text-xs tracking-widest">
            + NEW
          </Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>School</TableHead>
            <TableHead>Program</TableHead>
            <TableHead>Period</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {education.map((e) => (
            <TableRow key={e.id}>
              <TableCell className="font-mono text-xs">{e.school}</TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {e.program}
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {e.period}
              </TableCell>
              <TableCell className="flex justify-end gap-3">
                <Link
                  href={`/admin/education/${e.id}`}
                  className="font-mono text-xs text-primary hover:underline"
                >
                  EDIT
                </Link>
                <form action={deleteEducation.bind(null, e.id)}>
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
