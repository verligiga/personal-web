"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions/require-admin";
import { csvToArray, linesToArray } from "@/lib/actions/parse";

const baseSchema = z.object({
  role: z.string().min(1),
  company: z.string().min(1),
  companyUrl: z.string().url().optional().or(z.literal("")),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional().or(z.literal("")),
  order: z.coerce.number().int().default(0),
});

function revalidateExperience() {
  for (const path of ["/", "/id", "/experience", "/id/experience", "/admin/experience"]) {
    revalidatePath(path);
  }
}

function parseTranslatedFields(formData: FormData) {
  return {
    bullets: linesToArray(formData.get("bullets")),
    bulletsId: linesToArray(formData.get("bulletsId")),
    techStack: csvToArray(formData.get("techStack")),
  };
}

export async function createExperience(formData: FormData) {
  await requireAdmin();

  const data = baseSchema.parse({
    role: formData.get("role"),
    company: formData.get("company"),
    companyUrl: formData.get("companyUrl") || "",
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") || "",
    order: formData.get("order") || 0,
  });

  await prisma.experience.create({
    data: {
      role: data.role,
      company: data.company,
      companyUrl: data.companyUrl || null,
      startDate: data.startDate,
      endDate: data.endDate || null,
      order: data.order,
      ...parseTranslatedFields(formData),
    },
  });

  revalidateExperience();
  redirect("/admin/experience");
}

export async function updateExperience(id: string, formData: FormData) {
  await requireAdmin();

  const data = baseSchema.parse({
    role: formData.get("role"),
    company: formData.get("company"),
    companyUrl: formData.get("companyUrl") || "",
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") || "",
    order: formData.get("order") || 0,
  });

  await prisma.experience.update({
    where: { id },
    data: {
      role: data.role,
      company: data.company,
      companyUrl: data.companyUrl || null,
      startDate: data.startDate,
      endDate: data.endDate || null,
      order: data.order,
      ...parseTranslatedFields(formData),
    },
  });

  revalidateExperience();
  redirect("/admin/experience");
}

export async function deleteExperience(id: string) {
  await requireAdmin();
  await prisma.experience.delete({ where: { id } });
  revalidateExperience();
}
