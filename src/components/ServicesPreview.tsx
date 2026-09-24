"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/site-data";
import { SectionHeading } from "@/components/SectionHeading";

type ServicesPreviewProps = {
  fullPage?: boolean;
};

export function ServicesPreview({ fullPage = false }: ServicesPreviewProps) {
  const items = fullPage ? services : services.slice(0, 5);

  return (
    <section
      id={fullPage ? undefined : "services-preview"}
      className={`scroll-mt-20 bg-warm-white ${fullPage ? "pb-20 md:pb-28" : "py-20 md:py-28 lg:py-32"}`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        {!fullPage && (
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Services" title="What we photograph" />
            <Link
              href="/services"
              className="shrink-0 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-accent-deep"
            >
              View Packages
            </Link>
          </div>
        )}

        <div
          className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 ${fullPage ? "" : "mt-14"}`}
        >
          {items.map((service, index) => (
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
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                <h3 className="absolute bottom-4 left-4 font-display text-2xl font-medium text-warm-white md:text-[1.65rem]">
                  {service.title}
                </h3>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="flex-1 font-sans text-sm leading-relaxed text-ink-muted">
                  {service.description}
                </p>
                <Link
                  href="/#booking"
                  className="mt-4 inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-accent-deep"
                >
                  Enquire
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
