"use client";

import { motion } from "motion/react";
import { Tag } from "@/components/atoms/tag";

export function TagList({
  items,
  variant = "default",
  className = "flex flex-wrap justify-start gap-2",
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
          <motion.li
            key={item}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.03, ease: "easeOut" }}
          >
            <Tag variant={variant}>{item}</Tag>
          </motion.li>
        ) : (
          <li key={item}>
            <Tag variant={variant}>{item}</Tag>
          </li>
        ),
      )}
    </ul>
  );
}
