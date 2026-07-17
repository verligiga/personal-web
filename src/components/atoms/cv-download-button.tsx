import { getCV } from "@/lib/actions/cv";

export async function CVDownloadButton() {
  const cv = await getCV();
  if (!cv) return null;

  return (
    <a
      href="/api/cv"
      className="border border-primary/60 px-6 py-3 font-mono text-2xs tracking-widest text-primary transition-all duration-300 ease-out hover:border-primary hover:bg-primary/5 dark:border-primary dark:hover:bg-primary/10"
    >
      DOWNLOAD CV
    </a>
  );
}
