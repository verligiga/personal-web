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
  revalidatePath("/about");
  revalidatePath("/admin/organization");
}

function parseForm(formData: FormData) {
  return schema.parse({
    role: formData.get("role"),
    org: formData.get("org"),
    period: formData.get("period"),
    order: formData.get("order") || 0,
  });
}

export async function createOrganizationRole(formData: FormData) {
  await requireAdmin();
  const data = parseForm(formData);
  await prisma.organizationRole.create({
    data: { ...data, bullets: linesToArray(formData.get("bullets")) },
  });
  revalidateOrganization();
  redirect("/admin/organization");
}

export async function updateOrganizationRole(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseForm(formData);
  await prisma.organizationRole.update({
    where: { id },
    data: { ...data, bullets: linesToArray(formData.get("bullets")) },
  });
  revalidateOrganization();
  redirect("/admin/organization");
}

export async function deleteOrganizationRole(id: string) {
  await requireAdmin();
  await prisma.organizationRole.delete({ where: { id } });
  revalidateOrganization();
}
