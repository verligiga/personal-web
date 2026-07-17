import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
  size?: "default" | "sm";
};

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center border font-mono transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-50",
        variant === "default" &&
          "border-primary bg-primary text-primary-foreground hover:bg-transparent hover:text-primary",
        variant === "outline" &&
          "border-dashed border-border text-foreground hover:border-primary hover:text-primary",
        size === "default" && "px-6 py-3 text-2xs tracking-widest",
        size === "sm" && "h-9 px-3 text-2xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}
