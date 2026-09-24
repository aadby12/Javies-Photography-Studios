import Link from "next/link";
import { Instagram, MapPin, Phone } from "lucide-react";
import { siteConfig, navLinks } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-warm-beige bg-warm-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <Link href="/" className="font-display text-3xl font-semibold text-ink">
              Javies
            </Link>
            <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.18em] text-ink-faint">
              Photography Studio
            </p>
            <p className="mt-3 font-sans text-sm text-ink-muted">Accra, Ghana</p>
          </div>

          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
              Navigate
            </p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
              Visit
            </p>
            <ul className="mt-4 space-y-3">
              <li className="flex gap-2.5 text-sm text-ink-muted">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent-deep" />
                <span>{siteConfig.address.full}</span>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phoneInternational}`}
                  className="flex gap-2.5 text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  <Phone size={16} className="mt-0.5 shrink-0 text-accent-deep" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2.5 text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  <Instagram size={16} className="mt-0.5 shrink-0 text-accent-deep" />
                  {siteConfig.instagram.handle}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-display text-2xl leading-snug text-ink">Book a session</p>
            <Link
              href="/#booking"
              className="mt-5 inline-flex rounded-sm bg-ink px-5 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-warm-white transition-colors hover:bg-ink-soft"
            >
              Book a Session
            </Link>
          </div>
        </div>

        <div className="mt-14 border-t border-warm-beige pt-8">
          <p className="font-sans text-xs text-ink-faint">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
