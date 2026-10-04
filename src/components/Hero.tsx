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

  const poster = "layout" in slide && slide.layout === "poster";
  const light = "tone" in slide && slide.tone === "light";

  useEffect(() => {
    document.documentElement.dataset.hero = light ? "light" : "dark";
    return () => {
      delete document.documentElement.dataset.hero;
    };
  }, [light]);

  return (
    <section
      className="relative flex h-[100svh] min-h-[640px] w-full flex-col overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Studio photography"
    >
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.src}
            className={`absolute inset-0 ${poster ? (light ? "bg-white" : "bg-black") : ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {poster ? null : (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                quality={92}
                className="hero-drift object-cover motion-reduce:animate-none"
                style={{ objectPosition: slide.objectPosition }}
              />
            )}
          </motion.div>
        </AnimatePresence>
        {poster ? null : (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/45 via-transparent to-transparent" />
          </>
        )}
      </div>

      <div className="relative z-[1] min-h-0 w-full flex-1">
        {poster ? (
          <>
            <div className="absolute inset-x-4 top-20 bottom-6 sm:inset-x-8 md:hidden">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority
                sizes="100vw"
                quality={92}
                className="object-contain"
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="absolute inset-x-0 top-14 bottom-0 hidden items-center justify-center md:flex">
              <Image
                src={slide.src}
                alt={slide.alt}
                width={2400}
                height={1600}
                priority
                sizes="(min-width: 1280px) 1400px, 92vw"
                quality={92}
                className="h-auto w-auto max-h-full max-w-[min(92vw,1400px)]"
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "min(92vw, 1400px)",
                  maxHeight: "100%",
                }}
              />
            </div>
          </>
        ) : null}
      </div>

      <div
        className={`relative z-10 mx-auto w-full max-w-7xl shrink-0 px-5 pb-28 md:px-8 lg:px-10 ${
          poster ? "md:pb-10" : "md:pb-32"
        }`}
      >
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className={`max-w-2xl font-display text-display-xl font-medium ${
            light ? "text-ink" : "text-warm-white"
          }`}
        >
          Javies
          <span
            className={`mt-1 block font-display text-[0.42em] font-normal tracking-[0.08em] md:mt-2 ${
              light ? "text-ink/70" : "text-warm-beige/90"
            }`}
          >
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
            className={`inline-flex items-center justify-center rounded-sm px-7 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:translate-y-px motion-reduce:transition-none ${
              light
                ? "bg-ink text-warm-white hover:bg-ink/90"
                : "bg-warm-white text-ink hover:bg-warm-cream"
            }`}
          >
            Book a Session
          </Link>
          <Link
            href="/gallery"
            className={`inline-flex items-center justify-center rounded-sm border bg-transparent px-7 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:translate-y-px motion-reduce:transition-none ${
              light
                ? "border-ink/30 text-ink hover:border-ink hover:bg-ink/5"
                : "border-warm-white/40 text-warm-white hover:border-warm-white hover:bg-warm-white/10"
            }`}
          >
            View Gallery
          </Link>
        </motion.div>

        <div className="mt-8 flex items-center gap-2" role="tablist" aria-label="Service slides">
          {heroSlides.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={itemIndex === index}
              aria-label={`Show slide ${itemIndex + 1}`}
              onClick={() => go(itemIndex)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                light
                  ? itemIndex === index
                    ? "w-8 bg-ink"
                    : "w-3 bg-ink/25 hover:bg-ink/50"
                  : itemIndex === index
                    ? "w-8 bg-warm-white"
                    : "w-3 bg-warm-white/40 hover:bg-warm-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(index - 1)}
        className={`absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-sm p-2 transition-colors md:block ${
          light ? "text-ink/50 hover:text-ink" : "text-warm-white/70 hover:text-warm-white"
        }`}
      >
        <ChevronLeft size={28} />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(index + 1)}
        className={`absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-sm p-2 transition-colors md:block ${
          light ? "text-ink/50 hover:text-ink" : "text-warm-white/70 hover:text-warm-white"
        }`}
      >
        <ChevronRight size={28} />
      </button>

      <a
        href="#featured"
        aria-label="Scroll down"
        className={`absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 transition-colors md:block ${
          light ? "text-ink/45 hover:text-ink" : "text-warm-white/60 hover:text-warm-white"
        }`}
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
