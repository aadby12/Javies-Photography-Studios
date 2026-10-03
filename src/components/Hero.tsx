"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/lib/site-data";

const SLIDE_MS = 6500;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = heroSlides[index];

  useEffect(() => {
    if (paused) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [paused, index]);

  const go = (next: number) => {
    setIndex((next + heroSlides.length) % heroSlides.length);
  };

  const contained = "fit" in slide && slide.fit === "contain";
  const galleryHref = slide.id === "all" ? "/gallery" : `/gallery?category=${slide.id}`;

  return (
    <section
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Photography services"
    >
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.src}
            className={`absolute inset-0 ${contained ? "bg-black" : ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {contained ? (
              <div className="absolute inset-x-3 top-20 bottom-[40%] sm:inset-x-10 md:inset-x-20 md:top-24 md:bottom-[34%]">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            ) : (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: slide.objectPosition }}
              />
            )}
          </motion.div>
        </AnimatePresence>
        {contained ? null : (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/45 via-transparent to-transparent" />
          </>
        )}
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

        <AnimatePresence mode="wait">
          <motion.p
            key={slide.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-warm-white"
          >
            <Link href={galleryHref} className="hover:text-warm-beige">
              {slide.category}
            </Link>
          </motion.p>
        </AnimatePresence>

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
            href={galleryHref}
            className="inline-flex items-center justify-center rounded-sm border border-warm-white/40 bg-transparent px-7 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-warm-white transition-all duration-300 hover:border-warm-white hover:bg-warm-white/10"
          >
            {slide.id === "all" ? "View Gallery" : `View ${slide.category}`}
          </Link>
        </motion.div>

        <div className="mt-8 flex items-center gap-2" role="tablist" aria-label="Service slides">
          {heroSlides.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={itemIndex === index}
              aria-label={`Show ${item.category}`}
              onClick={() => go(itemIndex)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                itemIndex === index ? "w-8 bg-warm-white" : "w-3 bg-warm-white/40 hover:bg-warm-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous category"
        onClick={() => go(index - 1)}
        className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-sm p-2 text-warm-white/70 transition-colors hover:text-warm-white md:block"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        type="button"
        aria-label="Next category"
        onClick={() => go(index + 1)}
        className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-sm p-2 text-warm-white/70 transition-colors hover:text-warm-white md:block"
      >
        <ChevronRight size={28} />
      </button>

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
