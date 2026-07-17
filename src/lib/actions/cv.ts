"use server";

import { put, del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions/require-admin";

function revalidateCV() {
  revalidatePath("/");
  revalidatePath("/admin/cv");
}

export async function uploadCV(formData: FormData) {
  await requireAdmin();

  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file provided");
  }

  if (!file.name.toLowerCase().endsWith(".pdf")) {
    throw new Error("Only PDF files are allowed");
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error("File size must be less than 10MB");
  }

  try {
    const previousCV = await prisma.cV.findFirst();

    // Upload the new file (unique path, so it can't collide with the
    // existing one) before touching the old CV — if this fails, the old
    // CV is untouched instead of being left deleted with nothing to
    // replace it.
    const blob = await put(`cv/${Date.now()}-${file.name}`, file, {
      access: "public",
    });

    const cv = await prisma.cV.create({
      data: {
        fileName: file.name,
        fileUrl: blob.url,
        fileSize: file.size,
      },
    });

    if (previousCV) {
      await del(previousCV.fileUrl);
      await prisma.cV.delete({ where: { id: previousCV.id } });
    }

    revalidateCV();
    return { success: true, cv };
  } catch (error) {
    console.error("CV upload error:", error);
    throw new Error("Failed to upload CV");
  }
}

export async function getCV() {
  try {
    const cv = await prisma.cV.findFirst();
    return cv;
  } catch (error) {
    console.error("Get CV error:", error);
    return null;
  }
}

export async function deleteCV() {
  await requireAdmin();

  try {
    const cv = await prisma.cV.findFirst();
    if (!cv) {
      throw new Error("No CV found");
    }

    await del(cv.fileUrl);
    await prisma.cV.delete({ where: { id: cv.id } });

    revalidateCV();
    return { success: true };
  } catch (error) {
    console.error("Delete CV error:", error);
    throw new Error("Failed to delete CV");
  }
}
