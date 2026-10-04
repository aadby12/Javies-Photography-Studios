import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig, navLinks } from "@/lib/site-data";

const linkClass =
  "font-sans text-sm text-ink-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

export function Footer() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}`;

  return (
    <footer className="border-t border-warm-beige bg-warm-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
              <span>
                <span className="block font-display text-3xl font-semibold text-ink">Javies</span>
                <span className="mt-1 block font-sans text-[11px] uppercase tracking-[0.18em] text-ink-faint">
                  Photography Studio
                </span>
              </span>
            </Link>
            <p className="mt-4 font-sans text-sm text-ink">Accra, Ghana</p>
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClass} mt-3 inline-flex items-start gap-2.5`}
            >
              <MapPin size={16} className="mt-0.5 shrink-0 text-accent-deep" />
              <span>{siteConfig.address.full}</span>
            </a>
          </div>

          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
              Contact
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={`tel:${siteConfig.phoneInternational}`} className={`${linkClass} inline-flex items-center gap-2.5`}>
                  <Phone size={16} className="shrink-0 text-accent-deep" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className={`${linkClass} inline-flex items-center gap-2.5`}>
                  <Mail size={16} className="shrink-0 text-accent-deep" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} inline-flex items-center gap-2.5`}
                >
                  <MessageCircle size={16} className="shrink-0 text-accent-deep" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
              Navigate
            </p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-2xl leading-snug text-ink">Book a session</p>
            <Link
              href="/#booking"
              className="mt-5 inline-flex rounded-sm bg-ink px-5 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-warm-white transition-colors hover:bg-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:translate-y-px"
            >
              Book a Session
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-warm-beige pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-ink-faint">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-sans text-[11px] tracking-wide text-ink-faint sm:text-right">
            Powered by Avenor Tech
          </p>
        </div>
      </div>
    </footer>
  );
}
