import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageShell } from "@/components/templates/page-shell";
import { SectionLabel } from "@/components/molecules/section-label";
import { Reveal } from "@/components/atoms/reveal";

export const metadata: Metadata = { title: "Contact — Gregorius Verli" };

export default async function ContactPage() {
  const profile = await prisma.profile.findFirst();
  if (!profile) return null;

  return (
    <PageShell narrow>
      <SectionLabel fig="06" title="Contact" />

      <Reveal>
        <h1 className="font-mono text-[9vw] leading-[0.95] text-foreground sm:text-6xl lg:text-7xl">
          Let&apos;s build
          <br />
          <span className="text-primary">something</span> together.
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-14 flex flex-col gap-8 border-t border-dashed border-border pt-10 sm:flex-row sm:items-start sm:justify-between">
          <a
            href={`mailto:${profile.email}`}
            className="font-mono text-lg text-primary transition-colors hover:underline sm:text-xl"
          >
            {profile.email}
          </a>

          <div className="flex flex-col gap-2 font-mono text-sm text-muted-foreground sm:items-end">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {profile.github.replace("https://", "")} ↗
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {profile.linkedin.replace("https://www.", "").replace(/\/$/, "")} ↗
            </a>
            <span>{profile.phone}</span>
            <span>{profile.location}</span>
          </div>
        </div>
      </Reveal>
    </PageShell>
  );
}
