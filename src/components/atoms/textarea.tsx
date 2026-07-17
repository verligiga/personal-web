import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full resize-y border border-dashed border-border bg-transparent px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-200 outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
