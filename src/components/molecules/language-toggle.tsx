"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const locales = ["en", "id"] as const;

export function LanguageToggle({ className }: { className?: string }) {
  const pathname = usePathname();
  const activeLocale = useLocale();

  return (
    <div
      className={cn(
        "flex items-center border border-dashed border-border font-mono text-2xs tracking-widest",
        className,
      )}
    >
      {locales.map((locale) => (
        <Link
          key={locale}
          href={pathname}
          locale={locale}
          aria-current={locale === activeLocale}
          className={cn(
            "px-2 py-1 transition-colors duration-200",
            locale === activeLocale
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
