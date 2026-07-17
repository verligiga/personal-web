"use server";

import { del, list } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions/require-admin";

export type MediaItem = {
  url: string;
  pathname: string;
  uploadedAt: string;
  usedBy: string[];
};

export async function listMedia(): Promise<MediaItem[]> {
  await requireAdmin();

  const [{ blobs }, profile, projects] = await Promise.all([
    list({ prefix: "portofolio/", limit: 200 }),
    prisma.profile.findFirst({ select: { avatarUrl: true } }),
    prisma.project.findMany({ select: { title: true, coverImageUrl: true } }),
  ]);

  const usedByUrl = new Map<string, string[]>();
  const addUsage = (url: string | null, label: string) => {
    if (!url) return;
    const existing = usedByUrl.get(url) ?? [];
    existing.push(label);
    usedByUrl.set(url, existing);
  };

  addUsage(profile?.avatarUrl ?? null, "Profile avatar");
  for (const project of projects) {
    addUsage(project.coverImageUrl, `Project: ${project.title}`);
  }

  return blobs
    .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())
    .map((b) => ({
      url: b.url,
      pathname: b.pathname,
      uploadedAt: b.uploadedAt.toISOString(),
      usedBy: usedByUrl.get(b.url) ?? [],
    }));
}

export async function deleteMedia(url: string) {
  await requireAdmin();
  await del(url);
}
