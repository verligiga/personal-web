import { cn } from "@/lib/utils";

export function Tag({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "accent";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block border border-dashed px-2.5 py-1 font-mono text-2xs transition-colors",
        variant === "default" && "border-border text-foreground",
        variant === "accent" && "border-primary/40 text-primary",
        className,
      )}
    >
      {children}
    </span>
  );
}
