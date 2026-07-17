import { FigureLabel } from "@/components/atoms/figure-label";

export function SectionLabel({
  fig,
  title,
  className = "",
}: {
  fig: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`mb-12 flex items-end gap-4 ${className}`}>
      <FigureLabel fig={fig} />
      <h2 className="font-mono text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      <span className="mb-2 h-px flex-1 bg-border" />
    </div>
  );
}
