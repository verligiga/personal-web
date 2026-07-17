import Link from "next/link";
import type { Project } from "@/generated/prisma/client";
import { asStringArray } from "@/lib/format";
import { Reveal } from "@/components/atoms/reveal";
import { Panel } from "@/components/molecules/panel";

export function ProjectGrid({
  projects,
  columns = 3,
}: {
  projects: Project[];
  columns?: 2 | 3;
}) {
  const gridCols = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid gap-6 ${gridCols}`}>
      {projects.map((project, i) => (
        <Reveal key={project.id} delay={Math.min(i * 0.06, 0.3)}>
          <Link href={`/projects/${project.slug}`}>
            <Panel hoverable className="h-full">
              <div className="flex items-center justify-between">
                <p className="font-mono text-2xs tracking-widest text-muted-foreground">
                  {project.year}
                </p>
                {project.featured && (
                  <span className="border border-rust px-1.5 py-0.5 font-mono text-2xs tracking-widest text-rust">
                    FEATURED
                  </span>
                )}
              </div>
              <h3 className="mt-3 font-mono text-lg text-foreground">{project.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {project.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {asStringArray(project.techStack)
                  .slice(0, 4)
                  .map((t) => (
                    <span key={t} className="font-mono text-2xs text-primary">
                      {t}
                    </span>
                  ))}
              </div>
            </Panel>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
