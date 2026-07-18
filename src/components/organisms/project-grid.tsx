import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Project } from "@/generated/prisma/client";
import { asStringArray } from "@/lib/format";
import { localized } from "@/lib/i18n";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/atoms/reveal";
import { Panel } from "@/components/molecules/panel";

export async function ProjectGrid({
  projects,
  locale,
  columns = 3,
}: {
  projects: Project[];
  locale: string;
  columns?: 2 | 3;
}) {
  const t = await getTranslations("Projects");
  const gridCols = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid gap-6 ${gridCols}`}>
      {projects.map((project, i) => (
        <Reveal key={project.id} delay={Math.min(i * 0.06, 0.3)}>
          <Link href={`/projects/${project.slug}`}>
            <Panel hoverable className="flex h-full flex-col overflow-hidden p-0">
              {project.coverImageUrl && (
                <div className="relative aspect-video w-full overflow-hidden border-b border-dashed border-border">
                  <Image
                    src={project.coverImageUrl}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-2xs tracking-widest text-muted-foreground">
                    {project.year}
                  </p>
                  {project.featured && (
                    <span className="border border-rust px-1.5 py-0.5 font-mono text-2xs tracking-widest text-rust">
                      {t("featured").toUpperCase()}
                    </span>
                  )}
                </div>
                <h3 className="mt-3 font-mono text-lg text-foreground">{project.title}</h3>
                <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-muted-foreground">
                  {localized(locale, project.summary, project.summaryId)}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {asStringArray(project.techStack)
                    .slice(0, 4)
                    .map((tech) => (
                      <span key={tech} className="font-mono text-2xs text-primary">
                        {tech}
                      </span>
                    ))}
                </div>
              </div>
            </Panel>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
