"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Instagram } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, siteConfig } from "@/lib/site-data";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium ${
          scrolled || open
            ? "bg-warm-white/95 backdrop-blur-md border-b border-warm-beige/60"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8 lg:px-10">
          <Link
            href="/"
            className="group relative z-10"
            onClick={() => setOpen(false)}
          >
            <span
              className={`font-display text-xl font-semibold tracking-wide transition-colors duration-300 md:text-2xl ${
                scrolled || open ? "text-ink" : "text-warm-white"
              }`}
            >
              Javies
            </span>
            <span
              className={`ml-1.5 hidden font-sans text-[10px] uppercase tracking-[0.2em] sm:inline ${
                scrolled || open ? "text-ink-faint" : "text-warm-white/70"
              }`}
            >
              Studios
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-sans text-[13px] font-medium tracking-wide transition-colors duration-300 hover:text-accent-deep ${
                  scrolled ? "text-ink-muted" : "text-warm-white/85"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#booking"
              className={`hidden rounded-sm px-5 py-2.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 md:inline-flex ${
                scrolled
                  ? "bg-ink text-warm-white hover:bg-ink-soft"
                  : "bg-warm-white/95 text-ink hover:bg-warm-white"
              }`}
            >
              Book a Session
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-sm lg:hidden ${
                scrolled || open ? "text-ink" : "text-warm-white"
              }`}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-warm-white lg:hidden"
          >
            <div className="flex h-full flex-col px-6 pb-10 pt-24">
              <nav className="flex flex-1 flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => setOpen(false)}
                    className="border-b border-warm-beige py-4 font-display text-3xl text-ink"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
              <div className="mt-8 space-y-4">
                <a
                  href="#booking"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center rounded-sm bg-ink py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-warm-white"
                >
                  Book a Session
                </a>
                <a
                  href={siteConfig.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-ink-muted"
                >
                  <Instagram size={18} />
                  <span className="font-sans text-sm">{siteConfig.instagram.handle}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
