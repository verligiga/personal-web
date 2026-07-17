import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteOrganizationRole } from "@/lib/actions/organization";
import { Button } from "@/components/atoms/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/molecules/table";

export default async function AdminOrganizationPage() {
  const roles = await prisma.organizationRole.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-mono text-2xl text-foreground">Organization</h1>
        <Link href="/admin/organization/new">
          <Button size="sm" className="font-mono text-xs tracking-widest">
            + NEW
          </Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>Period</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-mono text-xs">{r.role}</TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">{r.org}</TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {r.period}
              </TableCell>
              <TableCell className="flex justify-end gap-3">
                <Link
                  href={`/admin/organization/${r.id}`}
                  className="font-mono text-xs text-primary hover:underline"
                >
                  EDIT
                </Link>
                <form action={deleteOrganizationRole.bind(null, r.id)}>
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
