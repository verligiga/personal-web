"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions/require-admin";

const schema = z.object({
  school: z.string().min(1),
  program: z.string().min(1),
  period: z.string().min(1),
  note: z.string().optional().or(z.literal("")),
  order: z.coerce.number().int().default(0),
});

function revalidateEducation() {
  revalidatePath("/about");
  revalidatePath("/admin/education");
}

function parseForm(formData: FormData) {
  return schema.parse({
    school: formData.get("school"),
    program: formData.get("program"),
    period: formData.get("period"),
    note: formData.get("note") || "",
    order: formData.get("order") || 0,
  });
}

export async function createEducation(formData: FormData) {
  await requireAdmin();
  const data = parseForm(formData);
  await prisma.education.create({ data: { ...data, note: data.note || null } });
  revalidateEducation();
  redirect("/admin/education");
}

export async function updateEducation(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseForm(formData);
  await prisma.education.update({ where: { id }, data: { ...data, note: data.note || null } });
  revalidateEducation();
  redirect("/admin/education");
}

export async function deleteEducation(id: string) {
  await requireAdmin();
  await prisma.education.delete({ where: { id } });
  revalidateEducation();
}
