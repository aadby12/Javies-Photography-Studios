"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { siteConfig } from "@/lib/site-data";

export function StudioReel() {
  const { youtube } = siteConfig;
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-warm-white pb-16 md:pb-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-5 md:px-8">
        <div className="w-full overflow-hidden rounded-sm bg-ink shadow-[0_28px_70px_-36px_rgba(26,22,20,0.7)] ring-1 ring-ink/10">
          <div className="relative aspect-video">
            {playing ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${youtube.videoId}?rel=0&autoplay=1`}
                title={youtube.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group absolute inset-0 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                aria-label={`Play ${youtube.title}`}
              >
                <Image
                  src="/images/youtube-kelele.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  quality={92}
                  className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  style={{ objectFit: "cover" }}
                />
                <span className="absolute inset-0 bg-ink/10 transition-colors duration-300 group-hover:bg-ink/20" />
                <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-warm-white text-ink shadow-[0_12px_40px_-12px_rgba(26,22,20,0.65)] transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none">
                  <Play size={22} className="ml-0.5" fill="currentColor" />
                </span>
              </button>
            )}
          </div>
        </div>
        <a
          href={youtube.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex rounded-sm bg-ink px-7 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-warm-white transition-colors hover:bg-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:translate-y-px"
        >
          More on YouTube
        </a>
      </div>
    </section>
  );
}
