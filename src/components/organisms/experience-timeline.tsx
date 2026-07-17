import { getTranslations } from "next-intl/server";
import type { Experience } from "@/generated/prisma/client";
import { asStringArray, asSubProjects, formatPeriod } from "@/lib/format";
import { localized } from "@/lib/i18n";
import { Reveal } from "@/components/atoms/reveal";
import { Tag } from "@/components/atoms/tag";

export async function ExperienceTimeline({
  experience,
  locale,
}: {
  experience: Experience[];
  locale: string;
}) {
  const t = await getTranslations("Experience");

  return (
    <div className="flex flex-col">
      {experience.map((job, i) => {
        const bullets = asStringArray(localized(locale, job.bullets, job.bulletsId));
        const techStack = asStringArray(job.techStack);
        const subProjects = asSubProjects(job.subProjects);
        const current = job.endDate === null;

        return (
          <Reveal key={job.id} delay={Math.min(i * 0.06, 0.3)}>
            <article className="grid gap-4 border-t border-dashed border-border py-10 last:border-b lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-3">
                <p className="font-mono text-2xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 font-mono text-2xs tracking-wide text-muted-foreground">
                  {formatPeriod(job.startDate, job.endDate)}
                </p>
                {current && (
                  <span className="mt-3 inline-block border border-primary px-2 py-0.5 font-mono text-2xs tracking-widest text-primary">
                    {t("current").toUpperCase()}
                  </span>
                )}
              </div>

              <div className="lg:col-span-9">
                <h3 className="font-mono text-xl text-foreground sm:text-2xl">{job.role}</h3>
                {job.companyUrl ? (
                  <a
                    href={job.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block font-mono text-sm text-rust transition-colors hover:underline"
                  >
                    {job.company} ↗
                  </a>
                ) : (
                  <p className="mt-1 font-mono text-sm text-rust">{job.company}</p>
                )}

                <ul className="mt-5 flex flex-col gap-2">
                  {bullets.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-foreground">
                      <span className="text-muted-foreground">-</span>
                      {point}
                    </li>
                  ))}
                </ul>

                {subProjects.length > 0 && (
                  <div className="mt-6 flex flex-col gap-3">
                    {subProjects.map((p) => (
                      <div key={p.name} className="border-l-2 border-dashed border-border pl-4">
                        <p className="text-sm text-foreground">{p.name}</p>
                        <p className="font-mono text-2xs text-muted-foreground">{p.tech}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
