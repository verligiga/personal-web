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
  avatarUrl: z.string().url().optional().or(z.literal("")),
});

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
    avatarUrl: formData.get("avatarUrl") || "",
  });

  const existing = await prisma.profile.findFirst();

  if (existing) {
    await prisma.profile.update({
      where: { id: existing.id },
      data: { ...data, avatarUrl: data.avatarUrl || null },
    });
  } else {
    await prisma.profile.create({
      data: { ...data, avatarUrl: data.avatarUrl || null },
    });
  }

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/admin/profile");
}
