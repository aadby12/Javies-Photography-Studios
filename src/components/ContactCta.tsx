"use client";

import { Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-data";

export function ContactCta() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hello Javies Photography Studio — I'd like to book a session."
  )}`;

  return (
    <section className="bg-ink py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 text-center md:px-8 lg:px-10">
        <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-warm-beige/70">
          Accra, Ghana
        </p>
        <h2 className="mt-4 font-display text-display-md font-medium text-warm-white">
          Book your session
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`tel:${siteConfig.phoneInternational}`}
            className="inline-flex items-center gap-2 rounded-sm bg-warm-white px-5 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-ink"
          >
            <Phone size={16} />
            {siteConfig.phone}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 rounded-sm border border-warm-white/30 px-5 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-warm-white"
          >
            <Mail size={16} />
            Email
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-warm-white/30 px-5 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-warm-white"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
          <a
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-warm-white/30 px-5 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-warm-white"
          >
            <Instagram size={16} />
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
