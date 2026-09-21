"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { kidsExperience } from "@/lib/site-data";

export function KidsExperience() {
  return (
    <section
      id="kids"
      className="scroll-mt-20 overflow-hidden bg-warm-white py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-3 font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-accent-deep">
              Children&apos;s experience
            </p>
            <h2 className="font-display text-display-md font-medium text-ink text-balance">
              {kidsExperience.title}
            </h2>
            <p className="mt-5 max-w-md font-sans text-base font-light leading-relaxed text-ink-muted">
              {kidsExperience.description}
            </p>
            <a
              href="#booking?service=children"
              className="mt-8 inline-flex rounded-sm bg-ink px-7 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-warm-white transition-colors hover:bg-ink-soft"
            >
              Book a Kids Session
            </a>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {kidsExperience.images.map((img, i) => (
              <motion.div
                key={img.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`relative overflow-hidden rounded-sm ${
                  i % 2 === 1 ? "mt-6 sm:mt-10" : ""
                } ${i < 2 ? "aspect-[3/4]" : "aspect-square"}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/55 to-transparent p-3 pt-10">
                  <p className="font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-warm-white/90">
                    {img.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
