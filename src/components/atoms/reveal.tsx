"use client";

import { motion } from "motion/react";

export function Reveal({
  children,
  delay = 0,
  x = 0,
  y = 16,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const animation = {
    initial: { opacity: 0, x, y },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.45, delay, ease: "easeOut" },
    className,
  } as const;

  if (as === "li") {
    return <motion.li {...animation}>{children}</motion.li>;
  }

  return <motion.div {...animation}>{children}</motion.div>;
}
