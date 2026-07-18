"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions/require-admin";
import { linesToArray } from "@/lib/actions/parse";

const schema = z.object({
  role: z.string().min(1),
  org: z.string().min(1),
  period: z.string().min(1),
  order: z.coerce.number().int().default(0),
});

function revalidateOrganization() {
  for (const path of ["/about", "/id/about", "/admin/organization"]) {
    revalidatePath(path);
  }
}

function buildPayload(formData: FormData) {
  const data = schema.parse({
    role: formData.get("role"),
    org: formData.get("org"),
    period: formData.get("period"),
    order: formData.get("order") || 0,
  });
  return {
    ...data,
    roleId: (formData.get("roleId") as string) || null,
    bullets: linesToArray(formData.get("bullets")),
    bulletsId: linesToArray(formData.get("bulletsId")),
  };
}

export async function createOrganizationRole(formData: FormData) {
  await requireAdmin();
  await prisma.organizationRole.create({ data: buildPayload(formData) });
  revalidateOrganization();
  redirect("/admin/organization");
}

export async function updateOrganizationRole(id: string, formData: FormData) {
  await requireAdmin();
  await prisma.organizationRole.update({ where: { id }, data: buildPayload(formData) });
  revalidateOrganization();
  redirect("/admin/organization");
}

export async function deleteOrganizationRole(id: string) {
  await requireAdmin();
  await prisma.organizationRole.delete({ where: { id } });
  revalidateOrganization();
}
