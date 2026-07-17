import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageShell } from "@/components/templates/page-shell";
import { SectionLabel } from "@/components/molecules/section-label";
import { ProjectGrid } from "@/components/organisms/project-grid";

export const metadata: Metadata = { title: "Projects — Gregorius Verli" };

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <PageShell>
      <SectionLabel fig="05" title="Projects" />
      <ProjectGrid projects={projects} />

      {projects.length === 0 && (
        <p className="font-mono text-sm text-muted-foreground">
          No projects yet — add some from /admin/projects.
        </p>
      )}
    </PageShell>
  );
}
