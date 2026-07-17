import { Tag } from "@/components/atoms/tag";
import { Reveal } from "@/components/atoms/reveal";

export function TagList({
  items,
  variant = "default",
  className = "flex flex-wrap gap-2",
  stagger = true,
}: {
  items: string[];
  variant?: "default" | "accent";
  className?: string;
  stagger?: boolean;
}) {
  return (
    <ul className={className}>
      {items.map((item, i) =>
        stagger ? (
          <Reveal as="li" key={item} delay={i * 0.03} y={8}>
            <Tag variant={variant}>{item}</Tag>
          </Reveal>
        ) : (
          <li key={item}>
            <Tag variant={variant}>{item}</Tag>
          </li>
        ),
      )}
    </ul>
  );
}
