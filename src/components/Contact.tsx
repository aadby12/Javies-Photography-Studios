"use client";

import { motion } from "framer-motion";
import {
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  CalendarDays,
  ExternalLink,
} from "lucide-react";
import { siteConfig } from "@/lib/site-data";
import { SectionHeading } from "@/components/SectionHeading";

export function Contact() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hello Javies Photography Studios — I'd love to create something beautiful together."
  )}`;

  const links = [
    {
      label: "Instagram",
      href: siteConfig.instagram.url,
      icon: Instagram,
      detail: siteConfig.instagram.handle,
      external: true,
    },
    {
      label: "WhatsApp",
      href: whatsappUrl,
      icon: MessageCircle,
      detail: siteConfig.phone,
      external: true,
    },
    {
      label: "Booking",
      href: "#booking",
      icon: CalendarDays,
      detail: "Request a session",
      external: false,
    },
    {
      label: "Google Maps",
      href: siteConfig.mapsUrl,
      icon: MapPin,
      detail: siteConfig.address.full,
      external: true,
    },
  ];

  return (
    <section id="contact" className="scroll-mt-20 bg-ink py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Let's Create Something Beautiful."
              description="Reach out to plan your next session — we welcome families, individuals, couples, events, and corporate clients across Accra."
              light
            />

            <div className="mt-10 space-y-5">
              <div>
                <p className="font-display text-2xl text-warm-white md:text-3xl">
                  {siteConfig.name}
                </p>
              </div>
              <p className="flex items-start gap-3 font-sans text-sm text-warm-beige/75">
                <MapPin size={18} className="mt-0.5 shrink-0 text-accent" />
                {siteConfig.address.full}
              </p>
              <a
                href={`tel:${siteConfig.phoneInternational}`}
                className="flex items-center gap-3 font-sans text-sm text-warm-beige/75 transition-colors hover:text-warm-white"
              >
                <Phone size={18} className="shrink-0 text-accent" />
                {siteConfig.phone}
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {links.map((link, i) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="group flex flex-col rounded-sm border border-ink-soft bg-ink-soft/50 p-5 transition-colors hover:border-accent/40 hover:bg-ink-soft"
                >
                  <div className="flex items-center justify-between">
                    <Icon size={20} className="text-accent" />
                    {link.external && (
                      <ExternalLink
                        size={14}
                        className="text-warm-beige/40 transition-colors group-hover:text-warm-beige/70"
                      />
                    )}
                  </div>
                  <span className="mt-4 font-display text-xl text-warm-white">
                    {link.label}
                  </span>
                  <span className="mt-1 font-sans text-xs text-warm-beige/55">
                    {link.detail}
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>

        <div className="mt-14 overflow-hidden rounded-sm border border-ink-soft">
          <iframe
            title="Javies Photography Studios location map"
            src="https://www.google.com/maps?q=C%26G+House+Dome+Road+Westlands+Accra&output=embed"
            className="h-56 w-full grayscale contrast-125 md:h-72"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
