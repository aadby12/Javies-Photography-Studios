"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { featuredWork } from "@/lib/site-data";
import { SectionHeading } from "@/components/SectionHeading";

export function FeaturedWork() {
  return (
    <section id="featured" className="scroll-mt-20 bg-warm-cream py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Work" title="Selected sessions" />
          <Link
            href="/gallery"
            className="shrink-0 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-accent-deep"
          >
            View Gallery
          </Link>
        </div>

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-5">
          {featuredWork.map((item, i) => (
            <motion.figure
              key={item.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: (i % 6) * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-sm lg:mb-5"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={900}
                  height={1200}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-400 group-hover:bg-ink/15" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                  <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-warm-white drop-shadow">
                    {item.category}
                  </span>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
