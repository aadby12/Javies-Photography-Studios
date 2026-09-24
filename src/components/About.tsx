"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { aboutContent, siteConfig } from "@/lib/site-data";

export function About() {
  return (
    <section className="bg-warm-white py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="mb-3 font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-accent-deep">
                About
              </p>
              <h1 className="font-display text-display-md font-medium text-ink">
                {aboutContent.title}
              </h1>
              <p className="mt-5 font-sans text-base font-light leading-relaxed text-ink-muted">
                {aboutContent.lead}
              </p>
              <p className="mt-6 font-sans text-sm text-ink-faint">{aboutContent.location}</p>
              <p className="mt-1 font-sans text-sm text-ink-faint">{siteConfig.phone}</p>
              <Link
                href="/#booking"
                className="mt-8 inline-flex rounded-sm bg-ink px-7 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-warm-white transition-colors hover:bg-ink-soft"
              >
                Book a Session
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative aspect-[3/4] overflow-hidden rounded-sm sm:aspect-[4/5] lg:aspect-[3/4]"
            >
              <Image
                src={aboutContent.image}
                alt={aboutContent.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                quality={90}
                className="object-cover object-[center_20%]"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
