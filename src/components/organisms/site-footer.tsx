"use client";

import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 font-mono text-2xs tracking-widest text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <span>© {year} GREGORIUS VERLI GIGA WINARNO</span>
        <span>BUILT WITH NEXT.JS + PRISMA + POSTGRESQL</span>
      </div>
    </footer>
  );
}
