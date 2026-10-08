import { siteConfig } from "@/lib/site-data";

export function StudioReel() {
  const { youtube } = siteConfig;

  return (
    <section className="bg-warm-white pb-16 md:pb-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-5 md:px-8">
        <div className="w-full overflow-hidden rounded-sm bg-ink shadow-[0_28px_70px_-36px_rgba(26,22,20,0.7)] ring-1 ring-ink/10">
          <div className="relative aspect-video">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${youtube.videoId}?rel=0`}
              title={youtube.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
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
