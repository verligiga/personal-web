"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions/require-admin";

const profileSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  location: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  github: z.string().url(),
  linkedin: z.string().url(),
  summary: z.string().min(1),
  summaryId: z.string().optional().or(z.literal("")),
  avatarUrl: z.string().url().optional().or(z.literal("")),
});

function revalidateProfile() {
  for (const path of ["/", "/id", "/about", "/id/about", "/contact", "/id/contact", "/admin/profile"]) {
    revalidatePath(path);
  }
}

export async function saveProfile(formData: FormData) {
  await requireAdmin();

  const data = profileSchema.parse({
    name: formData.get("name"),
    role: formData.get("role"),
    location: formData.get("location"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    github: formData.get("github"),
    linkedin: formData.get("linkedin"),
    summary: formData.get("summary"),
    summaryId: formData.get("summaryId") || "",
    avatarUrl: formData.get("avatarUrl") || "",
  });

  const existing = await prisma.profile.findFirst();
  const payload = {
    ...data,
    summaryId: data.summaryId || null,
    avatarUrl: data.avatarUrl || null,
  };

  if (existing) {
    await prisma.profile.update({ where: { id: existing.id }, data: payload });
  } else {
    await prisma.profile.create({ data: payload });
  }

  revalidateProfile();
}
