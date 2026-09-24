"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-data";

export function MobileStickyCta() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hello Javies Photography Studio — I'd like to book a session."
  )}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-warm-beige/80 bg-warm-white/95 px-3 py-2.5 backdrop-blur-md md:hidden">
      <div className="flex gap-2">
        <Link
          href="/#booking"
          className="flex flex-1 items-center justify-center rounded-sm bg-ink py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-warm-white"
        >
          Book a Session
        </Link>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="flex items-center justify-center rounded-sm border border-warm-beige bg-warm-cream px-4 text-ink"
        >
          <MessageCircle size={20} />
        </a>
      </div>
    </div>
  );
}
