import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageShell } from "@/components/templates/page-shell";
import { SectionLabel } from "@/components/molecules/section-label";
import { ExperienceTimeline } from "@/components/organisms/experience-timeline";

export const metadata: Metadata = { title: "Experience — Gregorius Verli" };

export default async function ExperiencePage() {
  const experience = await prisma.experience.findMany({ orderBy: { order: "asc" } });

  return (
    <PageShell>
      <SectionLabel fig="04" title="Experience" />
      <ExperienceTimeline experience={experience} />
    </PageShell>
  );
}
