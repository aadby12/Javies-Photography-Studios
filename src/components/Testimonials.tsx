"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonialPlaceholders } from "@/lib/site-data";
import { SectionHeading } from "@/components/SectionHeading";

/**
 * Testimonials — do not fabricate client quotes.
 * Replace `testimonialPlaceholders` in site-data.ts with real testimonials when available.
 * Placeholders are marked for development editing only.
 */
export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-20 bg-warm-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Kind words"
          title="Client reflections"
          description="This space is ready for real client stories. Placeholder entries below are editable in development only — never fabricated as live reviews."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonialPlaceholders.map((t, i) => (
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="relative rounded-sm border border-dashed border-warm-sand/80 bg-warm-white p-6 md:p-8"
            >
              {t.isPlaceholder && (
                <span className="absolute right-4 top-4 rounded-sm bg-warm-beige/60 px-2 py-0.5 font-sans text-[9px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                  Editable placeholder
                </span>
              )}
              <Quote size={22} className="text-accent/70" />
              <p className="mt-4 font-display text-xl leading-snug text-ink-muted italic md:text-[1.35rem]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-6 border-t border-warm-beige pt-4">
                <cite className="not-italic">
                  <span className="block font-sans text-sm font-medium text-ink">
                    {t.name}
                  </span>
                  <span className="mt-0.5 block font-sans text-xs text-ink-faint">
                    {t.context}
                  </span>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
