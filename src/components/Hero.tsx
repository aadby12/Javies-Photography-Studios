"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { heroImage } from "@/lib/site-data";

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 scale-105"
          animate={{ scale: [1.05, 1.1, 1.05] }}
          transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
        >
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: heroImage.objectPosition }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/45 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-28 pt-32 md:px-8 md:pb-32 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mb-3 font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-warm-beige/90 md:text-xs"
        >
          Accra, Ghana
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl font-display text-display-xl font-medium text-warm-white"
        >
          Javies
          <span className="mt-1 block font-display text-[0.42em] font-normal tracking-[0.08em] text-warm-beige/90 md:mt-2">
            Photography Studio
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4"
        >
          <Link
            href="/#booking"
            className="inline-flex items-center justify-center rounded-sm bg-warm-white px-7 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-ink transition-all duration-300 hover:bg-warm-cream"
          >
            Book a Session
          </Link>
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center rounded-sm border border-warm-white/40 bg-transparent px-7 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-warm-white transition-all duration-300 hover:border-warm-white hover:bg-warm-white/10"
          >
            View Gallery
          </Link>
        </motion.div>
      </div>

      <a
        href="#featured"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 text-warm-white/60 transition-colors hover:text-warm-white md:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </a>
    </section>
  );
}
