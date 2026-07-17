import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageShell } from "@/components/templates/page-shell";
import { SectionLabel } from "@/components/molecules/section-label";
import { Reveal } from "@/components/atoms/reveal";
import { asStringArray } from "@/lib/format";

export const metadata: Metadata = { title: "About — Gregorius Verli" };

export default async function AboutPage() {
  const [profile, education, organization] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.education.findMany({ orderBy: { order: "asc" } }),
    prisma.organizationRole.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (!profile) return null;

  const facts = [
    { label: "Based in", value: profile.location },
    { label: "Email", value: profile.email },
    { label: "Phone", value: profile.phone },
    { label: "Role", value: profile.role },
  ];

  return (
    <PageShell>
      <SectionLabel fig="03" title="About" />

      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="font-mono text-xl leading-relaxed text-foreground">{profile.summary}</p>
        </Reveal>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:col-span-5 lg:pl-8">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.05}>
              <div className="border-t border-dashed border-border pt-3">
                <dt className="font-mono text-2xs tracking-widest text-muted-foreground">
                  {f.label.toUpperCase()}
                </dt>
                <dd className="mt-2 wrap-break-word font-mono text-sm text-foreground">{f.value}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>

      <div className="mt-20 grid gap-16 lg:grid-cols-2">
        <div>
          <p className="mb-6 font-mono text-2xs tracking-widest text-rust">{"// EDUCATION"}</p>
          <div className="flex flex-col gap-8">
            {education.map((e, i) => (
              <Reveal key={e.id} delay={i * 0.05}>
                <div className="border-t border-dashed border-border pt-5">
                  <h3 className="font-mono text-lg text-foreground">{e.school}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{e.program}</p>
                  <p className="mt-2 font-mono text-2xs tracking-wide text-muted-foreground">
                    {e.period}
                  </p>
                  {e.note && <p className="mt-2 text-xs text-muted-foreground">{e.note}</p>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-6 font-mono text-2xs tracking-widest text-rust">{"// ORGANIZATION"}</p>
          <div className="flex flex-col gap-8">
            {organization.map((o, i) => {
              const bullets = asStringArray(o.bullets);
              return (
                <Reveal key={o.id} delay={i * 0.05}>
                  <div className="border-t border-dashed border-border pt-5">
                    <h3 className="font-mono text-lg text-foreground">{o.role}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{o.org}</p>
                    <p className="mt-2 font-mono text-2xs tracking-wide text-muted-foreground">
                      {o.period}
                    </p>
                    <ul className="mt-3 flex flex-col gap-1.5">
                      {bullets.map((point) => (
                        <li key={point} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                          <span>—</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
