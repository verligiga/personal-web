"use server";

import { put } from "@vercel/blob";
import { auth } from "@/lib/auth";

export async function uploadImage(formData: FormData): Promise<
  { url: string; error?: undefined } | { url?: undefined; error: string }
> {
  const session = await auth();
  if (!session) {
    return { error: "Not authenticated." };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "No file provided." };
  }

  if (!file.type.startsWith("image/")) {
    return { error: "Only image files are allowed." };
  }

  const blob = await put(`portofolio/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  return { url: blob.url };
}
