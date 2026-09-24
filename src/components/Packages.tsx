"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { packages } from "@/lib/site-data";

export function Packages() {
  return (
    <section className="bg-warm-cream py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        <p className="mb-3 font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-accent-deep">
          Packages
        </p>
        <h2 className="font-display text-display-md font-medium text-ink">
          Sessions & packages
        </h2>
        <p className="mt-3 max-w-lg font-sans text-sm text-ink-muted">
          Package details and pricing can be confirmed when you enquire.
        </p>

        <div className="mt-12 space-y-8">
          {packages.map((pkg, i) => (
            <motion.article
              key={pkg.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.45 }}
              className="grid overflow-hidden rounded-sm border border-warm-beige bg-warm-white md:grid-cols-5"
            >
              <div className="relative aspect-[4/5] md:col-span-2 md:aspect-auto md:min-h-[280px]">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-6 md:col-span-3 md:p-10">
                <h3 className="font-display text-2xl text-ink md:text-3xl">{pkg.name}</h3>
                <p className="mt-2 font-sans text-sm text-ink-muted">{pkg.description}</p>
                <ul className="mt-5 space-y-1.5">
                  {pkg.includes.map((item) => (
                    <li key={item} className="font-sans text-sm text-ink-muted">
                      · {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 font-sans text-sm font-medium text-ink">{pkg.price}</p>
                <Link
                  href="/#booking"
                  className="mt-6 inline-flex w-fit rounded-sm bg-ink px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-warm-white transition-colors hover:bg-ink-soft"
                >
                  Enquire
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
