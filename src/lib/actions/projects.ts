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
  summaryId: z.string().optional().or(z.literal("")),
  description: z.string().min(1),
  descriptionId: z.string().optional().or(z.literal("")),
  coverImageUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  repoUrl: z.string().url().optional().or(z.literal("")),
  year: z.string().optional().or(z.literal("")),
  featured: z.boolean(),
  order: z.coerce.number().int().default(0),
});

function revalidateProjects(slug?: string) {
  for (const path of ["/", "/id", "/projects", "/id/projects", "/admin/projects"]) {
    revalidatePath(path);
  }
  if (slug) {
    revalidatePath(`/projects/${slug}`);
    revalidatePath(`/id/projects/${slug}`);
  }
}

function parseForm(formData: FormData) {
  return baseSchema.parse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    summary: formData.get("summary"),
    summaryId: formData.get("summaryId") || "",
    description: formData.get("description"),
    descriptionId: formData.get("descriptionId") || "",
    coverImageUrl: formData.get("coverImageUrl") || "",
    liveUrl: formData.get("liveUrl") || "",
    repoUrl: formData.get("repoUrl") || "",
    year: formData.get("year") || "",
    featured: formData.get("featured") === "on",
    order: formData.get("order") || 0,
  });
}

function buildPayload(formData: FormData) {
  const data = parseForm(formData);
  return {
    ...data,
    summaryId: data.summaryId || null,
    descriptionId: data.descriptionId || null,
    coverImageUrl: data.coverImageUrl || null,
    liveUrl: data.liveUrl || null,
    repoUrl: data.repoUrl || null,
    year: data.year || null,
    techStack: csvToArray(formData.get("techStack")),
    screenshots: parseJsonStringArray(formData.get("screenshots")),
  };
}

export async function createProject(formData: FormData) {
  await requireAdmin();
  const payload = buildPayload(formData);

  await prisma.project.create({ data: payload });

  revalidateProjects(payload.slug);
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  await requireAdmin();
  const payload = buildPayload(formData);

  await prisma.project.update({ where: { id }, data: payload });

  revalidateProjects(payload.slug);
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireAdmin();
  const project = await prisma.project.delete({ where: { id } });
  revalidateProjects(project.slug);
}
