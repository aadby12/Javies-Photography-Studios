"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Instagram } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, siteConfig } from "@/lib/site-data";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [heroLight, setHeroLight] = useState(isHome);
  const solid = !isHome || scrolled || open;
  const inkNav = solid || (isHome && heroLight && !open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const syncHero = () => setHeroLight(document.documentElement.dataset.hero === "light");
    onScroll();
    syncHero();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new MutationObserver(syncHero);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-hero"] });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium ${
          solid
            ? "bg-warm-white/95 backdrop-blur-md border-b border-warm-beige/60"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8 lg:px-10">
          <Link
            href="/"
            className="group relative z-10 flex items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <span className="flex flex-col leading-none">
              <span
                className={`font-display text-xl font-semibold tracking-wide transition-colors duration-300 md:text-2xl ${
                  inkNav ? "text-ink" : "text-warm-white"
                }`}
              >
                Javies
              </span>
              <span
                className={`mt-0.5 font-sans text-[9px] uppercase tracking-[0.22em] ${
                  inkNav ? "text-ink-faint" : "text-warm-white/70"
                }`}
              >
                Photography Studios
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`font-sans text-[13px] font-medium tracking-wide transition-colors duration-300 hover:text-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                  inkNav ? "text-ink-muted" : "text-warm-white/85"
                } ${
                  pathname === link.href
                    ? inkNav
                      ? "text-ink underline decoration-accent-deep decoration-1 underline-offset-8"
                      : "text-warm-white underline decoration-warm-white/80 decoration-1 underline-offset-8"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-sm lg:hidden ${
                inkNav ? "text-ink" : "text-warm-white"
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
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={pathname === link.href ? "page" : undefined}
                      className={`block border-b border-warm-beige py-4 font-display text-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                        pathname === link.href ? "text-accent-deep" : "text-ink"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-8 space-y-4">
                <Link
                  href="/#booking"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center rounded-sm bg-ink py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-warm-white"
                >
                  Book a Session
                </Link>
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
