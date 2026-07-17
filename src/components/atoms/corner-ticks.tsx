import { cn } from "@/lib/utils";

const positions = [
  "left-[-1px] top-[-1px] border-l border-t",
  "right-[-1px] top-[-1px] border-r border-t",
  "left-[-1px] bottom-[-1px] border-l border-b",
  "right-[-1px] bottom-[-1px] border-r border-b",
];

export function CornerTicks() {
  return (
    <>
      {positions.map((pos) => (
        <span
          key={pos}
          aria-hidden
          className={cn("pointer-events-none absolute h-3 w-3 border-primary/70", pos)}
        />
      ))}
    </>
  );
}
