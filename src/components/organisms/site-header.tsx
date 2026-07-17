"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Link, usePathname } from "@/i18n/navigation";
import { NavLink } from "@/components/molecules/nav-link";
import { ThemeToggle } from "@/components/molecules/theme-toggle";
import { LanguageToggle } from "@/components/molecules/language-toggle";

const links = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/experience", key: "experience" },
  { href: "/projects", key: "projects" },
  { href: "/contact", key: "contact" },
] as const;

function isActive(pathname: string | null, href: string) {
  return href === "/" ? pathname === "/" : Boolean(pathname?.startsWith(href));
}

export function SiteHeader() {
  const pathname = usePathname();
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="font-mono text-sm tracking-widest text-foreground">
          GVGW - 13
        </Link>

        <div className="hidden md:flex">
          <nav className="flex gap-1">
            {links.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={t(link.key)}
                active={isActive(pathname, link.href)}
                className="px-3 py-1.5"
              />
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <LanguageToggle />
          <ThemeToggle />

          <button
            onClick={() => setOpen((v) => !v)}
            className="font-mono text-2xs tracking-widest text-primary transition-colors md:hidden"
            aria-label="Toggle navigation"
          >
            {open ? t("close") : t("menu")}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-border/60 md:hidden"
          >
            <div className="flex flex-col px-6 py-4">
              {links.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={t(link.key)}
                  active={isActive(pathname, link.href)}
                  onClick={() => setOpen(false)}
                  className="py-2"
                />
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
