import { useTranslations } from "next-intl";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 font-mono text-2xs tracking-widest text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <span>© {year} GREGORIUS VERLI GIGA WINARNO</span>
        <span>{t("builtWith").toUpperCase()}</span>
      </div>
    </footer>
  );
}
