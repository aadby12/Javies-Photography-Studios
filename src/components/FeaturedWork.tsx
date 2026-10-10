import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const strips = [
  {
    src: "/images/home-milestone-hq.jpg",
    alt: "Milestone sessions by Javies Photography Studio",
    href: "/gallery?category=milestone",
    width: 1533,
    height: 495,
  },
  {
    src: "/images/home-maternity-newborn-hq.jpg",
    alt: "Maternity and newborn sessions by Javies Photography Studio",
    href: "/gallery",
    width: 1080,
    height: 349,
  },
  {
    src: "/images/home-portraits-hq.jpg",
    alt: "Portrait sessions by Javies Photography Studio",
    href: "/gallery?category=portrait",
    width: 1080,
    height: 349,
  },
];

export function FeaturedWork() {
  return (
    <section id="featured" className="scroll-mt-24 bg-warm-cream pb-12 pt-8 md:pb-16 md:pt-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 md:gap-5 md:px-8 lg:px-10">
        <Link
          href="/gallery"
          className="group mb-1 inline-flex w-fit items-center gap-3 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <h2 className="font-display text-[clamp(2.25rem,4vw,3.25rem)] font-medium leading-none tracking-[-0.03em]">
            Gallery
          </h2>
          <ArrowRight
            size={22}
            className="mt-1 transition-transform duration-300 group-hover:translate-x-1.5 motion-reduce:transition-none"
          />
        </Link>
        {strips.map((item) => (
          <Link
            key={item.src}
            href={item.href}
            className="block overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              sizes="(min-width: 1280px) 1160px, 100vw"
              quality={92}
              className="h-auto w-full"
            />
          </Link>
        ))}
        <Link
          href="/gallery"
          className="group relative block overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <Image
            src="/images/hero/prints.jpg"
            alt=""
            width={2000}
            height={1334}
            sizes="(min-width: 1280px) 1160px, 100vw"
            quality={92}
            className="h-auto w-full"
          />
          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/80 via-ink/40 to-transparent px-5 pb-5 pt-16 text-warm-white md:px-8 md:pb-7">
            <span className="font-display text-3xl font-medium leading-none tracking-[-0.03em] md:text-4xl">
              View the gallery
            </span>
            <ArrowRight
              size={26}
              className="mb-1 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5 motion-reduce:transition-none"
            />
          </span>
        </Link>
      </div>
    </section>
  );
}
