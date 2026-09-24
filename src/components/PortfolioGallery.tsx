"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  galleryCategories,
  galleryItems,
  type GalleryCategory,
  type GalleryItem,
} from "@/lib/gallery-data";
import { SectionHeading } from "@/components/SectionHeading";

type GalleryProps = {
  showHeading?: boolean;
  limit?: number;
};

export function PortfolioGallery({ showHeading = true, limit }: GalleryProps) {
  const [active, setActive] = useState<GalleryCategory>("all");
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const filtered = useMemo(() => {
    const items =
      active === "all"
        ? galleryItems
        : galleryItems.filter((item) => item.category === active);
    return typeof limit === "number" ? items.slice(0, limit) : items;
  }, [active, limit]);

  const openViewer = (item: GalleryItem) => {
    const index = filtered.findIndex((f) => f.id === item.id);
    setViewerIndex(index >= 0 ? index : 0);
  };

  const closeViewer = () => setViewerIndex(null);

  const goNext = useCallback(() => {
    if (viewerIndex === null || filtered.length === 0) return;
    setViewerIndex((viewerIndex + 1) % filtered.length);
  }, [viewerIndex, filtered.length]);

  const goPrev = useCallback(() => {
    if (viewerIndex === null || filtered.length === 0) return;
    setViewerIndex((viewerIndex - 1 + filtered.length) % filtered.length);
  }, [viewerIndex, filtered.length]);

  useEffect(() => {
    if (viewerIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeViewer();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [viewerIndex, goNext, goPrev]);

  const current = viewerIndex !== null ? filtered[viewerIndex] : null;

  return (
    <section className="bg-warm-cream pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        {showHeading && <SectionHeading eyebrow="Gallery" title="Our work" />}

        <div
          className={`flex gap-2 overflow-x-auto pb-2 scrollbar-thin sm:flex-wrap sm:overflow-visible ${
            showHeading ? "mt-10" : ""
          }`}
        >
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActive(cat.id)}
              className={`shrink-0 rounded-sm px-4 py-2 font-sans text-[11px] font-medium uppercase tracking-[0.12em] transition-all duration-300 ${
                active === cat.id
                  ? "bg-ink text-warm-white"
                  : "bg-warm-white text-ink-muted hover:text-ink"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry grid — natural aspect, no forced crops */}
        <div className="mt-10 columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3 lg:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.button
                key={item.id}
                type="button"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => openViewer(item)}
                className="mb-3 w-full break-inside-avoid text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:mb-4 lg:mb-5"
              >
                <span className="group relative block overflow-hidden rounded-sm">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={85}
                    className="h-auto w-full"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-400 group-hover:bg-ink/15" />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 p-3 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                    <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-warm-white drop-shadow">
                      {item.caption}
                    </span>
                  </span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox — full original photo, never cropped */}
      <AnimatePresence>
        {current && viewerIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink/96"
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
              if (delta > 50) goPrev();
              if (delta < -50) goNext();
              touchStartX.current = null;
            }}
          >
            <div className="flex shrink-0 items-center justify-between px-4 py-3 md:px-8">
              <p className="font-sans text-xs text-warm-beige/70">
                {viewerIndex + 1} / {filtered.length}
              </p>
              <button
                type="button"
                aria-label="Close"
                onClick={closeViewer}
                className="rounded-sm p-2 text-warm-white/80 transition-colors hover:text-warm-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-3 md:px-14">
              <button
                type="button"
                aria-label="Previous"
                onClick={goPrev}
                className="absolute left-1 z-10 rounded-sm p-2 text-warm-white/70 transition-colors hover:text-warm-white md:left-4"
              >
                <ChevronLeft size={32} />
              </button>

              <motion.div
                key={current.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex h-full w-full items-center justify-center"
              >
                {/* Native img = exact file, full frame, no optimizer crop */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.src}
                  alt={current.alt}
                  className="max-h-[calc(100svh-7.5rem)] max-w-full object-contain"
                  draggable={false}
                />
              </motion.div>

              <button
                type="button"
                aria-label="Next"
                onClick={goNext}
                className="absolute right-1 z-10 rounded-sm p-2 text-warm-white/70 transition-colors hover:text-warm-white md:right-4"
              >
                <ChevronRight size={32} />
              </button>
            </div>

            <div className="shrink-0 px-6 pb-5 text-center">
              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-warm-beige/60">
                {current.caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
