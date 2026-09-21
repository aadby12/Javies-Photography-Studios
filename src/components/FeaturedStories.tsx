"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { featuredStories } from "@/lib/site-data";
import { SectionHeading } from "@/components/SectionHeading";

export function FeaturedStories() {
  const [activeId, setActiveId] = useState(featuredStories[0]?.id ?? "");
  const story = featuredStories.find((s) => s.id === activeId) ?? featuredStories[0];

  if (!story) return null;

  return (
    <section id="stories" className="scroll-mt-20 bg-ink py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Featured stories"
          title="Stories, not just photographs"
          description="Each session unfolds as a narrative — from the opening frame to the quiet closing detail."
          light
        />

        <div className="mt-10 flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {featuredStories.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveId(s.id)}
              className={`shrink-0 rounded-sm px-4 py-2 font-sans text-[11px] font-medium uppercase tracking-[0.12em] transition-all duration-300 ${
                activeId === s.id
                  ? "bg-warm-white text-ink"
                  : "bg-ink-soft text-warm-beige/70 hover:text-warm-white"
              }`}
            >
              {s.category}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-sm md:aspect-[21/9] md:mb-10">
              <Image
                src={story.hero.src}
                alt={story.hero.alt}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-10">
                <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-warm-beige/80">
                  {story.category}
                </p>
                <h3 className="mt-2 font-display text-3xl font-medium text-warm-white md:text-5xl">
                  {story.title}
                </h3>
                <p className="mt-2 font-sans text-sm text-warm-white/70 md:text-base">
                  {story.subtitle}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {story.frames.map((frame, i) => (
                <motion.figure
                  key={`${story.id}-${frame.label}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.45 }}
                  className="group"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                    <Image
                      src={frame.src}
                      alt={frame.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-3 flex items-baseline justify-between gap-2">
                    <span className="font-display text-lg text-warm-white">
                      {frame.caption}
                    </span>
                    <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-warm-beige/50">
                      {String(i + 1).padStart(2, "0")} · {frame.label}
                    </span>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
