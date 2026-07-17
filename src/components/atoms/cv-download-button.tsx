import { getTranslations } from "next-intl/server";
import { getCV } from "@/lib/actions/cv";

export async function CVDownloadButton() {
  const [cv, t] = await Promise.all([getCV(), getTranslations("Hero")]);
  if (!cv) return null;

  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages -- /api/cv is a download endpoint, not a page
    <a
      href="/api/cv"
      className="border border-primary/60 px-6 py-3 font-mono text-2xs tracking-widest text-primary transition-all duration-300 ease-out hover:border-primary hover:bg-primary/5 dark:border-primary dark:hover:bg-primary/10"
    >
      {t("downloadCv").toUpperCase()}
    </a>
  );
}
