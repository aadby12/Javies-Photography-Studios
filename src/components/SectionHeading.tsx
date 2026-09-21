"use client";

import { motion } from "framer-motion";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p
          className={`mb-3 font-sans text-[11px] font-medium uppercase tracking-[0.24em] ${
            light ? "text-warm-beige/80" : "text-accent-deep"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-display-md font-medium text-balance ${
          light ? "text-warm-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 font-sans text-base font-light leading-relaxed md:text-[1.05rem] ${
            light ? "text-warm-white/75" : "text-ink-muted"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
