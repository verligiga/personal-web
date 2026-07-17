import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { PageShell } from "@/components/templates/page-shell";
import { SectionLabel } from "@/components/molecules/section-label";
import { ProjectGrid } from "@/components/organisms/project-grid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.projects" });
  return { title: t("title"), description: t("description") };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [projects, t] = await Promise.all([
    prisma.project.findMany({ orderBy: { order: "asc" } }),
    getTranslations("Projects"),
  ]);

  return (
    <PageShell>
      <SectionLabel fig="05" title={t("title")} />
      <ProjectGrid projects={projects} locale={locale} />

      {projects.length === 0 && (
        <p className="font-mono text-sm text-muted-foreground">{t("empty")}</p>
      )}
    </PageShell>
  );
}
