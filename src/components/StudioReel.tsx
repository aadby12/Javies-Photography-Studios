import { siteConfig } from "@/lib/site-data";

export function StudioReel() {
  const { youtube } = siteConfig;

  return (
    <section className="bg-warm-white py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 md:px-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-14 lg:px-10">
        <div>
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-accent-deep">
            On film
          </p>
          <h2 className="mt-3 font-display text-display-md font-medium text-ink">
            Watch the studio
          </h2>
          <p className="mt-4 max-w-md font-sans text-base font-light leading-relaxed text-ink-muted">
            Recent film from Javies Studios.
          </p>
          <a
            href={youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-sm bg-ink px-7 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-warm-white transition-colors hover:bg-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:translate-y-px"
          >
            More on YouTube
          </a>
        </div>

        <div className="overflow-hidden rounded-sm bg-ink shadow-[0_28px_70px_-36px_rgba(26,22,20,0.7)] ring-1 ring-ink/10">
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
      </div>
    </section>
  );
}
