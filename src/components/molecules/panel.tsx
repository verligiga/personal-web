import { cn } from "@/lib/utils";
import { CornerTicks } from "@/components/atoms/corner-ticks";

export function Panel({
  children,
  className,
  hoverable = false,
}: {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative border border-dashed border-border bg-(--panel-surface) p-6 transition-all duration-200 ease-out",
        hoverable && "hover:-translate-y-0.5 hover:border-primary",
        className,
      )}
    >
      <CornerTicks />
      {children}
    </div>
  );
}
