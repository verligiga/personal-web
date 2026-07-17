import { cn } from "@/lib/utils";

export function Input({ className, type, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        "w-full border border-dashed border-border bg-transparent px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-200 outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
