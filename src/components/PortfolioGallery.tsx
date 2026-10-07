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
  initialCategory?: string;
};

function isGalleryCategory(value: string | undefined): value is GalleryCategory {
  return galleryCategories.some((category) => category.id === value);
}

export function PortfolioGallery({
  showHeading = true,
  limit,
  initialCategory,
}: GalleryProps) {
  const [active, setActive] = useState<GalleryCategory>(
    isGalleryCategory(initialCategory) ? initialCategory : "all"
  );
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const items =
      active === "all"
        ? galleryItems.filter((item) => item.includeInAll)
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
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const viewerOpen = viewerIndex !== null;
  useEffect(() => {
    if (!viewerOpen) return;
    closeRef.current?.focus();
  }, [viewerOpen]);

  useEffect(() => {
    if (viewerIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeViewer();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [viewerIndex, goNext, goPrev]);

  const current = viewerIndex !== null ? filtered[viewerIndex] : null;

  return (
    <section className="bg-warm-cream pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        {showHeading && <SectionHeading eyebrow="Gallery" title="Our work" />}

        <div
          className={`sticky top-[4.25rem] z-30 -mx-5 bg-warm-cream/95 px-5 py-3 backdrop-blur-sm md:-mx-8 md:px-8 lg:-mx-10 lg:px-10 ${
            showHeading ? "mt-8" : ""
          }`}
        >
          <div
            role="tablist"
            aria-label="Gallery categories"
            className="flex flex-nowrap gap-2 overflow-x-auto pb-1 scrollbar-thin md:flex-wrap md:overflow-visible"
            onKeyDown={(event) => {
              if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
              event.preventDefault();
              const current = galleryCategories.findIndex((category) => category.id === active);
              const direction = event.key === "ArrowRight" ? 1 : -1;
              const next =
                galleryCategories[
                  (current + direction + galleryCategories.length) % galleryCategories.length
                ];
              setActive(next.id);
              const tabs = event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]');
              tabs[(current + direction + galleryCategories.length) % galleryCategories.length]?.focus();
            }}
          >
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={active === cat.id}
                onClick={() => setActive(cat.id)}
                className={`shrink-0 rounded-sm px-4 py-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.12em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                  active === cat.id
                    ? "bg-ink text-warm-white shadow-sm"
                    : "bg-warm-white text-ink-muted hover:text-ink"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {active === "event" && filtered.length === 0 && (
          <p className="mt-16 font-sans text-sm text-ink-muted">Event photographs will be added soon.</p>
        )}

        {/* Masonry grid — natural aspect, no forced crops */}
        <div className="mt-10 columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3 lg:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.button
                key={item.id}
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
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
                    quality={92}
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
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col overscroll-contain"
            style={{ backgroundColor: "rgba(26, 22, 20, 0.97)" }}
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
                ref={closeRef}
                type="button"
                aria-label="Close"
                onClick={closeViewer}
                className="flex h-11 w-11 items-center justify-center rounded-sm text-warm-white/80 transition-colors hover:text-warm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X size={24} />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-3 pb-3 md:px-14">
              <button
                type="button"
                aria-label="Previous"
                onClick={goPrev}
                className="absolute left-1 z-10 flex h-11 w-11 items-center justify-center rounded-sm text-warm-white/70 transition-colors hover:text-warm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:left-4"
              >
                <ChevronLeft size={32} />
              </button>

              <motion.div
                key={current.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex h-full max-h-full w-full items-center justify-center"
              >
                {/* Native img = exact file, full frame, no optimizer crop */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.src}
                  alt={current.alt}
                  className="h-auto w-auto max-h-[calc(100svh-7.5rem)] max-w-[min(100%,92vw)] object-contain"
                  draggable={false}
                />
              </motion.div>

              <button
                type="button"
                aria-label="Next"
                onClick={goNext}
                className="absolute right-1 z-10 flex h-11 w-11 items-center justify-center rounded-sm text-warm-white/70 transition-colors hover:text-warm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:right-4"
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
