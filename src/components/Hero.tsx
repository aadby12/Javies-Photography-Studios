"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 scale-105"
          animate={{ scale: [1.05, 1.12, 1.05] }}
          transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
        >
          <Image
            src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=2000&q=85"
            alt="Warm family moment captured by Javies Photography Studios"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAGcP//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAQUCf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Bf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEABj8Cf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8hf//Z"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/35 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-28 pt-32 md:px-8 md:pb-32 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-warm-beige/90 md:text-xs"
        >
          Javies Photography Studios · Accra
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl font-display text-display-xl font-medium text-warm-white text-balance"
        >
          Your Moments. Beautifully Told.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-lg font-sans text-base font-light leading-relaxed text-warm-white/85 md:text-lg"
        >
          Photography and visual storytelling for life&apos;s most important
          moments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4"
        >
          <a
            href="#booking"
            className="inline-flex items-center justify-center rounded-sm bg-warm-white px-7 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-ink transition-all duration-300 hover:bg-warm-cream"
          >
            Book a Session
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center justify-center rounded-sm border border-warm-white/40 bg-transparent px-7 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-warm-white transition-all duration-300 hover:border-warm-white hover:bg-warm-white/10"
          >
            Explore Our Work
          </a>
        </motion.div>
      </div>

      <a
        href="#services"
        aria-label="Scroll to services"
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
