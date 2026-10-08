"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/site-data";

type ServicesPreviewProps = {
  fullPage?: boolean;
};

const highlights = ["maternity", "newborn", "milestone"]
  .map((id) => services.find((service) => service.id === id))
  .filter((service) => service != null);

export function ServicesPreview({ fullPage = false }: ServicesPreviewProps) {
  const items = fullPage ? services : services.slice(0, 5);
  const [active, setActive] = useState(0);
  const current = highlights[active] ?? highlights[0];

  if (!fullPage && current) {
    return (
      <section id="services-preview" className="scroll-mt-20 bg-warm-white py-20 md:py-28 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(20rem,1.05fr)] lg:gap-14 lg:px-10">
          <div>
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-accent-deep">
              Services
            </p>
            <h2 className="sr-only">Maternity, newborn, and milestone</h2>
            <div className="mt-6 flex flex-col">
              {highlights.map((service, index) => {
                const selected = index === active;
                return (
                  <button
                    key={service.id}
                    type="button"
                    aria-pressed={selected}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                    className={`group border-l-2 py-1.5 pl-4 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 md:py-2 md:pl-6 ${
                      selected ? "border-accent" : "border-transparent"
                    }`}
                  >
                    <span className="flex items-baseline gap-4">
                      <span
                        className={`font-sans text-[11px] font-medium tabular-nums tracking-[0.18em] transition-colors duration-300 ${
                          selected ? "text-accent-deep" : "text-ink-faint"
                        }`}
                      >
                        0{index + 1}
                      </span>
                      <span
                        className={`block font-display text-[clamp(2.6rem,6vw,4.8rem)] font-medium leading-[0.92] tracking-[-0.03em] transition-colors duration-500 ${
                          selected ? "text-ink" : "text-ink/30 group-hover:text-ink/55"
                        }`}
                      >
                        {service.title}
                        <span className={selected ? "text-accent" : "text-accent/50"}>.</span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-8 max-w-xl font-sans text-lg font-light leading-relaxed text-ink-muted md:text-xl">
              Family, portraits, traditional wear, and Christmas — photographed in the studio in Accra.
            </p>
            <Link
              href="/services"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-sm bg-ink px-7 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-warm-white transition-colors hover:bg-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:translate-y-px"
            >
              View packages
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="bg-warm-cream p-3 sm:p-4 lg:p-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-warm-cream">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.045 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={current.image}
                    alt={current.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 92vw, 800px"
                    quality={92}
                    className="object-cover"
                    style={{ objectFit: "cover", objectPosition: "center center" }}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/55 to-transparent" />
              <p className="absolute bottom-4 left-4 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-warm-white">
                {current.title}
              </p>
            </div>
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
