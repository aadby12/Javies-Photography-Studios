"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/site-data";

export function ServicesPreview() {
  return (
    <section className="scroll-mt-20 bg-warm-white pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
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
