import { cn } from "@/lib/utils";

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full border border-dashed border-border bg-transparent px-3 py-2 font-mono text-sm text-foreground transition-colors duration-200 outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
