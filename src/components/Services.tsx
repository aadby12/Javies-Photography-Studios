"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/site-data";
import { SectionHeading } from "@/components/SectionHeading";

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-warm-white py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        <SectionHeading
          eyebrow="What we create"
          title="Services crafted for every story"
          description="From children's portraits to corporate campaigns — professional photography and videography with warmth and precision."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex flex-col overflow-hidden rounded-sm bg-warm-cream"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-80" />
                <h3 className="absolute bottom-4 left-4 font-display text-2xl font-medium text-warm-white md:text-[1.65rem]">
                  {service.title}
                </h3>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="flex-1 font-sans text-sm leading-relaxed text-ink-muted">
                  {service.description}
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <a
                    href="#portfolio"
                    className="inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-accent-deep"
                  >
                    Explore
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </a>
                  <span className="text-warm-sand">·</span>
                  <a
                    href={`#booking?service=${service.id}`}
                    className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-deep transition-colors hover:text-ink"
                  >
                    Book
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
