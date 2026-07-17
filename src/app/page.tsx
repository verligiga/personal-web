import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageShell } from "@/components/templates/page-shell";
import { Hero } from "@/components/organisms/hero";
import { ProjectGrid } from "@/components/organisms/project-grid";
import { SectionLabel } from "@/components/molecules/section-label";
import { TagList } from "@/components/molecules/tag-list";
import { Reveal } from "@/components/atoms/reveal";

export default async function HomePage() {
  const [profile, skillCategories, featuredProjects] = await Promise.all([
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
  ]);

  if (!profile) {
    return (
      <PageShell>
        <p className="font-mono text-sm text-muted-foreground">
          No profile data yet. Seed the database or add one from /admin.
        </p>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Hero profile={profile} />

      {skillCategories.length > 0 && (
        <section className="py-16">
          <SectionLabel fig="01" title="Stack" />
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
          <SectionLabel fig="02" title="Featured work" />
          <ProjectGrid projects={featuredProjects} />
          <Reveal delay={0.2}>
            <div className="mt-8">
              <Link
                href="/projects"
                className="font-mono text-2xs tracking-widest text-primary transition-colors hover:underline"
              >
                VIEW ALL PROJECTS →
              </Link>
            </div>
          </Reveal>
        </section>
      )}
    </PageShell>
  );
}
