import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateOrganizationRole } from "@/lib/actions/organization";
import { OrganizationForm } from "@/components/organisms/organization-form";

export default async function EditOrganizationRolePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const organizationRole = await prisma.organizationRole.findUnique({ where: { id } });
  if (!organizationRole) notFound();

  const action = updateOrganizationRole.bind(null, id);

  return (
    <div>
      <h1 className="mb-8 font-mono text-2xl text-foreground">Edit organization role</h1>
      <OrganizationForm organizationRole={organizationRole} action={action} />
    </div>
  );
}
