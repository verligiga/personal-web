import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { localized } from "@/lib/i18n";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/templates/page-shell";
import { Hero } from "@/components/organisms/hero";
import { ProjectGrid } from "@/components/organisms/project-grid";
import { SectionLabel } from "@/components/molecules/section-label";
import { TagList } from "@/components/molecules/tag-list";
import { Reveal } from "@/components/atoms/reveal";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [profile, skillCategories, featuredProjects, t] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.skillCategory.findMany({
      orderBy: { order: "asc" },
      include: { skills: { orderBy: { order: "asc" } } },
    }),
    prisma.project.findMany({
      where: { featured: true },
      orderBy: { order: "asc" },
      take: 3,
    }),
    getTranslations("Home"),
  ]);

  if (!profile) {
    return (
      <PageShell>
        <p className="font-mono text-sm text-muted-foreground">{t("noProfile")}</p>
      </PageShell>
    );
  }

  const localizedProfile = {
    ...profile,
    summary: localized(locale, profile.summary, profile.summaryId),
  };

  return (
    <PageShell>
      <Hero profile={localizedProfile} />

      {skillCategories.length > 0 && (
        <section className="py-16">
          <SectionLabel fig="01" title={t("stackTitle")} />
          <div className="grid gap-8 sm:grid-cols-3">
            {skillCategories.map((cat) => (
              <div key={cat.id}>
                <p className="mb-4 font-mono text-2xs tracking-widest text-muted-foreground">
                  {"// "}
                  {cat.label.toUpperCase()}
                </p>
                <TagList items={cat.skills.map((s) => s.name)} />
              </div>
            ))}
          </div>
        </section>
      )}

      {featuredProjects.length > 0 && (
        <section className="py-16">
          <SectionLabel fig="02" title={t("featuredWorkTitle")} />
          <ProjectGrid projects={featuredProjects} locale={locale} />
          <Reveal delay={0.2}>
            <div className="mt-8">
              <Link
                href="/projects"
                className="font-mono text-2xs tracking-widest text-primary transition-colors hover:underline"
              >
                {t("viewAllProjects").toUpperCase()} →
              </Link>
            </div>
          </Reveal>
        </section>
      )}
    </PageShell>
  );
}
