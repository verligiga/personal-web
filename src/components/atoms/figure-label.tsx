import { cn } from "@/lib/utils";

export function FigureLabel({
  fig,
  children,
  className,
}: {
  fig: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("font-mono text-2xs tracking-widest text-rust", className)}>
      {"$ "}
      {fig}
      {children && <> {children}</>}
    </span>
  );
}
