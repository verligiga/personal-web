import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { PageShell } from "@/components/templates/page-shell";
import { SectionLabel } from "@/components/molecules/section-label";
import { ExperienceTimeline } from "@/components/organisms/experience-timeline";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.experience" });
  return { title: t("title"), description: t("description") };
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [experience, t] = await Promise.all([
    prisma.experience.findMany({ orderBy: { order: "asc" } }),
    getTranslations("Experience"),
  ]);

  return (
    <PageShell>
      <SectionLabel fig="04" title={t("title")} />
      <ExperienceTimeline experience={experience} locale={locale} />
    </PageShell>
  );
}
