"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const strips = [
  {
    src: "/images/home-milestone.jpg",
    alt: "Milestone sessions by Javies Photography Studio",
    href: "/gallery?category=milestone",
    width: 1024,
    height: 330,
  },
  {
    src: "/images/home-maternity-newborn.jpg",
    alt: "Maternity and newborn sessions by Javies Photography Studio",
    href: "/gallery",
    width: 1024,
    height: 330,
  },
  {
    src: "/images/home-portraits.jpg",
    alt: "Portrait sessions by Javies Photography Studio",
    href: "/gallery?category=portrait",
    width: 1024,
    height: 330,
  },
];

export function FeaturedWork() {
  return (
    <section id="featured" className="scroll-mt-20 bg-warm-cream py-16 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 md:gap-5 md:px-8 lg:px-10">
        {strips.map((item, index) => (
          <motion.div
            key={item.src}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={item.href}
              className="group block overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width: 1280px) 100vw, 1200px"
                quality={92}
                className="h-auto w-full"
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
