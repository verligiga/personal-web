import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { asStringArray } from "@/lib/format";
import { localized } from "@/lib/i18n";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/templates/page-shell";
import { Reveal } from "@/components/atoms/reveal";
import { Tag } from "@/components/atoms/tag";
import { ScreenshotCarousel } from "@/components/organisms/screenshot-carousel";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const [project, t] = await Promise.all([
    prisma.project.findUnique({ where: { slug } }),
    getTranslations({ locale, namespace: "ProjectDetail" }),
  ]);
  return { title: project ? `${project.title} - Gregorius Verli` : t("notFound") };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const [project, t] = await Promise.all([
    prisma.project.findUnique({ where: { slug } }),
    getTranslations("ProjectDetail"),
  ]);

  if (!project) notFound();

  const techStack = asStringArray(project.techStack);
  const screenshots = asStringArray(project.screenshots);
  const summary = localized(locale, project.summary, project.summaryId);
  const description = localized(locale, project.description, project.descriptionId);

  return (
    <PageShell narrow>
      <Link
        href="/projects"
        className="font-mono text-2xs tracking-widest text-primary transition-colors hover:underline"
      >
        ← {t("allProjects").toUpperCase()}
      </Link>

      <Reveal delay={0.05}>
        <p className="mt-8 font-mono text-2xs tracking-widest text-rust">
          $ {project.year ?? ""}
        </p>
        <h1 className="mt-3 font-mono text-4xl text-foreground sm:text-5xl">{project.title}</h1>
        <p className="mt-4 max-w-2xl whitespace-pre-line text-sm text-muted-foreground">{summary}</p>
      </Reveal>

      {project.coverImageUrl && (
        <Reveal delay={0.1}>
          <div className="relative mt-10 aspect-video w-full overflow-hidden border border-dashed border-border">
            <Image
              src={project.coverImageUrl}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 800px, 100vw"
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </Reveal>
      )}

      <div className="mt-10 grid gap-10 md:grid-cols-3">
        <Reveal delay={0.15} className="md:col-span-2">
          <p className="mb-3 font-mono text-2xs tracking-widest text-muted-foreground">
            {"// "}
            {t("description").toUpperCase()}
          </p>
          <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">
            {description}
          </p>
        </Reveal>

        <Reveal delay={0.2} className="flex flex-col gap-8">
          <div>
            <p className="mb-3 font-mono text-2xs tracking-widest text-muted-foreground">
              {"// "}
              {t("stack").toUpperCase()}
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {techStack.map((tech) => (
                <li key={tech}>
                  <Tag>{tech}</Tag>
                </li>
              ))}
            </ul>
          </div>

          {(project.liveUrl || project.repoUrl) && (
            <div>
              <p className="mb-3 font-mono text-2xs tracking-widest text-muted-foreground">
                {"// "}
                {t("links").toUpperCase()}
              </p>
              <div className="flex flex-col gap-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs text-primary transition-colors hover:underline"
                  >
                    {t("liveSite")} ↗
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs text-primary transition-colors hover:underline"
                  >
                    {t("repository")} ↗
                  </a>
                )}
              </div>
            </div>
          )}
        </Reveal>
      </div>

      {screenshots.length > 0 && (
        <Reveal x={60} y={0} delay={0.1} className="mt-16">
          <p className="mb-6 font-mono text-2xs tracking-widest text-muted-foreground">
            {"// "}
            {t("screenshots").toUpperCase()}
          </p>
          <ScreenshotCarousel images={screenshots} alt={project.title} />
        </Reveal>
      )}
    </PageShell>
  );
}
