"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions/require-admin";

function revalidateSkills() {
  revalidatePath("/");
  revalidatePath("/admin/skills");
}

export async function createSkillCategory(formData: FormData) {
  await requireAdmin();

  const label = z.string().min(1).parse(formData.get("label"));
  const count = await prisma.skillCategory.count();

  await prisma.skillCategory.create({ data: { label, order: count } });
  revalidateSkills();
}

export async function deleteSkillCategory(id: string) {
  await requireAdmin();
  await prisma.skillCategory.delete({ where: { id } });
  revalidateSkills();
}

export async function createSkill(categoryId: string, formData: FormData) {
  await requireAdmin();

  const name = z.string().min(1).parse(formData.get("name"));
  const count = await prisma.skill.count({ where: { categoryId } });

  await prisma.skill.create({ data: { name, categoryId, order: count } });
  revalidateSkills();
}

export async function deleteSkill(id: string) {
  await requireAdmin();
  await prisma.skill.delete({ where: { id } });
  revalidateSkills();
}
