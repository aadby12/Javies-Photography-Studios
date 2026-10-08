"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/site-data";

type ServicesPreviewProps = {
  fullPage?: boolean;
};

export function ServicesPreview({ fullPage = false }: ServicesPreviewProps) {
  const items = fullPage ? services : services.slice(0, 5);

  if (!fullPage) {
    return (
      <section id="services-preview" className="scroll-mt-24 bg-warm-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-accent-deep">
            Services
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.75rem,6.5vw,5.25rem)] font-medium leading-[0.92] tracking-[-0.03em] text-ink">
            Maternity<span className="text-accent">.</span>
            <br />
            Newborn<span className="text-accent">.</span>
            <br />
            Milestone<span className="text-accent">.</span>
          </h2>
          <div className="mt-8 flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-xl font-sans text-lg font-light leading-relaxed text-ink-muted md:text-xl">
              Family, portraits, traditional wear, and Christmas — photographed in the studio in Accra.
            </p>
            <Link
              href="/services"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-sm bg-ink px-7 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-warm-white transition-colors hover:bg-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:translate-y-px"
            >
              View packages
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={fullPage ? undefined : "services-preview"}
      className={`scroll-mt-20 bg-warm-white ${fullPage ? "pb-20 md:pb-28" : "py-20 md:py-28 lg:py-32"}`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
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
              <div className="overflow-hidden bg-warm-cream">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  width={service.width}
                  height={service.height}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
                  quality={92}
                  className="h-auto w-full"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-2xl font-medium text-ink md:text-[1.65rem]">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-ink-muted">
                  {service.description}
                </p>
                <Link
                  href={`/?service=${service.id}#booking`}
                  className="mt-4 inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
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
