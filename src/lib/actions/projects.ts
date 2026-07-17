"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions/require-admin";
import { csvToArray, parseJsonStringArray } from "@/lib/actions/parse";

const baseSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers and hyphens only"),
  title: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().min(1),
  coverImageUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  repoUrl: z.string().url().optional().or(z.literal("")),
  year: z.string().optional().or(z.literal("")),
  featured: z.boolean(),
  order: z.coerce.number().int().default(0),
});

function revalidateProjects(slug?: string) {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  if (slug) revalidatePath(`/projects/${slug}`);
}

function parseForm(formData: FormData) {
  return baseSchema.parse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    summary: formData.get("summary"),
    description: formData.get("description"),
    coverImageUrl: formData.get("coverImageUrl") || "",
    liveUrl: formData.get("liveUrl") || "",
    repoUrl: formData.get("repoUrl") || "",
    year: formData.get("year") || "",
    featured: formData.get("featured") === "on",
    order: formData.get("order") || 0,
  });
}

export async function createProject(formData: FormData) {
  await requireAdmin();
  const data = parseForm(formData);

  await prisma.project.create({
    data: {
      ...data,
      coverImageUrl: data.coverImageUrl || null,
      liveUrl: data.liveUrl || null,
      repoUrl: data.repoUrl || null,
      year: data.year || null,
      techStack: csvToArray(formData.get("techStack")),
      screenshots: parseJsonStringArray(formData.get("screenshots")),
    },
  });

  revalidateProjects(data.slug);
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseForm(formData);

  await prisma.project.update({
    where: { id },
    data: {
      ...data,
      coverImageUrl: data.coverImageUrl || null,
      liveUrl: data.liveUrl || null,
      repoUrl: data.repoUrl || null,
      year: data.year || null,
      techStack: csvToArray(formData.get("techStack")),
      screenshots: parseJsonStringArray(formData.get("screenshots")),
    },
  });

  revalidateProjects(data.slug);
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireAdmin();
  const project = await prisma.project.delete({ where: { id } });
  revalidateProjects(project.slug);
}
