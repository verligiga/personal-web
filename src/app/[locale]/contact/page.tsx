import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { PageShell } from "@/components/templates/page-shell";
import { SectionLabel } from "@/components/molecules/section-label";
import { Reveal } from "@/components/atoms/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.contact" });
  return { title: t("title"), description: t("description") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [profile, t] = await Promise.all([
    prisma.profile.findFirst(),
    getTranslations("Contact"),
  ]);
  if (!profile) return null;

  return (
    <PageShell narrow>
      <SectionLabel fig="06" title={t("title")} />

      <Reveal>
        <h1 className="font-mono text-[9vw] leading-[0.95] text-foreground sm:text-6xl lg:text-7xl">
          {t("headlinePre")}
          <br />
          <span className="text-primary">{t("headlineAccent")}</span> {t("headlinePost")}
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
