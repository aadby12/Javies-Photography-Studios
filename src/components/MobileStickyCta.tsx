"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-data";

/** Compact floating WhatsApp action on mobile — booking stays in menu + page CTAs */
export function MobileStickyCta() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hello Javies Photography Studio — I'd like to book a session."
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-warm-white shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95 md:hidden"
    >
      <MessageCircle size={24} />
    </a>
  );
}
