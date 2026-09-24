"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Check, MessageCircle, Phone } from "lucide-react";
import { bookingServices, siteConfig } from "@/lib/site-data";
import { SectionHeading } from "@/components/SectionHeading";

export type BookingPayload = {
  name: string;
  phone: string;
  email: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
};

async function submitBookingRequest(payload: BookingPayload): Promise<void> {
  await new Promise((r) => setTimeout(r, 500));
  if (process.env.NODE_ENV === "development") {
    console.info("[Booking]", payload);
  }
}

const inputClass =
  "w-full rounded-sm border border-warm-beige bg-warm-white px-4 py-3 font-sans text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent";

export function BookingExperience() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<BookingPayload>({
    name: "",
    phone: "",
    email: "",
    service: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    `Hello Javies — I'd like to book a ${form.service || "session"}${
      form.preferredDate ? ` on ${form.preferredDate}` : ""
    }.`
  )}`;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitBookingRequest(form);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="booking" className="scroll-mt-20 bg-warm-cream py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Booking"
              title="Book a session"
              description="Send a request — we'll confirm by phone or WhatsApp."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-warm-beige bg-warm-white px-5 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:border-accent"
              >
                <MessageCircle size={16} className="text-accent-deep" />
                WhatsApp
              </a>
              <a
                href={`tel:${siteConfig.phoneInternational}`}
                className="inline-flex items-center gap-2 rounded-sm border border-warm-beige bg-warm-white px-5 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:border-accent"
              >
                <Phone size={16} className="text-accent-deep" />
                Call
              </a>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="rounded-sm border border-warm-beige/80 bg-warm-white p-6 md:p-8 lg:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-10 text-center"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-warm-cream">
                    <Check className="text-accent-deep" size={28} />
                  </div>
                  <h3 className="font-display text-3xl text-ink">Request sent</h3>
                  <p className="mx-auto mt-3 max-w-md font-sans text-sm text-ink-muted">
                    Thank you, {form.name}. We&apos;ll be in touch shortly.
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 rounded-sm bg-ink px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-warm-white"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block font-sans text-xs text-ink-faint">Name</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className={inputClass}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block font-sans text-xs text-ink-faint">Phone</label>
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        className={inputClass}
                        placeholder="0XXXXXXXXX"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block font-sans text-xs text-ink-faint">Email</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className={inputClass}
                        placeholder="you@email.com"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block font-sans text-xs text-ink-faint">
                        Photography Service
                      </label>
                      <select
                        required
                        value={form.service}
                        onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
                        className={inputClass}
                      >
                        <option value="">Select…</option>
                        {bookingServices.map((s) => (
                          <option key={s.id} value={s.label}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block font-sans text-xs text-ink-faint">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={form.preferredDate}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, preferredDate: e.target.value }))
                        }
                        className={inputClass}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block font-sans text-xs text-ink-faint">
                        Preferred Time
                      </label>
                      <input
                        type="time"
                        value={form.preferredTime}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, preferredTime: e.target.value }))
                        }
                        className={inputClass}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block font-sans text-xs text-ink-faint">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        className={`${inputClass} resize-none`}
                        placeholder="Anything we should know…"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-4 w-full rounded-sm bg-ink px-7 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-warm-white transition-colors hover:bg-ink-soft disabled:opacity-50 sm:w-auto"
                  >
                    {submitting ? "Sending…" : "Send Session Request"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
