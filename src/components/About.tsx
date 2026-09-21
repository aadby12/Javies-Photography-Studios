"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { aboutContent, siteConfig } from "@/lib/site-data";
import { SectionHeading } from "@/components/SectionHeading";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-warm-white py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="About"
              title={aboutContent.title}
              description={aboutContent.lead}
            />
            <div className="mt-8 space-y-4">
              {aboutContent.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="font-sans text-sm leading-relaxed text-ink-muted md:text-[0.95rem]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <p className="mt-8 font-sans text-xs text-ink-faint">
              Based at {siteConfig.address.full}
            </p>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] overflow-hidden rounded-sm sm:aspect-[16/10]"
            >
              <Image
                src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1400&q=85"
                alt="Photography studio atmosphere at Javies"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </motion.div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {aboutContent.values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.45 }}
                  className="rounded-sm border border-warm-beige/80 bg-warm-cream/50 px-5 py-5"
                >
                  <h3 className="font-display text-xl text-ink">{value.title}</h3>
                  <p className="mt-1.5 font-sans text-sm text-ink-muted">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
