"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
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

type FieldName = keyof BookingPayload;
type FieldErrors = Partial<Record<FieldName, string>>;

const inputClass =
  "w-full rounded-sm border border-warm-beige bg-warm-white px-4 py-3 font-sans text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/40";

const labelClass = "mb-1.5 block font-sans text-xs text-ink-muted";

function bookingMessage(form: BookingPayload) {
  return [
    "Hello Javies Photography Studio, I would like to book a session.",
    "",
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Email: ${form.email}`,
    `Service: ${form.service}`,
    `Preferred date: ${form.preferredDate || "Not set"}`,
    `Preferred time: ${form.preferredTime || "Not set"}`,
    `Comments: ${form.message || "—"}`,
  ].join("\n");
}

function serviceFromQuery(value: string | null) {
  if (!value) return "";
  const match = bookingServices.find(
    (service) =>
      service.id === value.toLowerCase() || service.label.toLowerCase() === value.toLowerCase()
  );
  return match?.label ?? "";
}

function validate(form: BookingPayload): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.name.trim()) errors.name = "Enter your name.";

  const digits = form.phone.replace(/\D/g, "");
  if (!form.phone.trim()) errors.phone = "Enter your phone number.";
  else if (digits.length < 9 || digits.length > 15) errors.phone = "Enter a valid phone number.";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!form.service) errors.service = "Select a photography service.";
  return errors;
}

function FieldLabel({
  htmlFor,
  children,
  required = false,
}: {
  htmlFor: string;
  children: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className={labelClass}>
      {children}
      {required ? (
        <>
          <span className="text-accent-deep" aria-hidden="true">
            {" "}
            *
          </span>
          <span className="sr-only"> (required)</span>
        </>
      ) : null}
    </label>
  );
}

export function BookingExperience() {
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [form, setForm] = useState<BookingPayload>({
    name: "",
    phone: "",
    email: "",
    service: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");

  useEffect(() => {
    const selected = serviceFromQuery(searchParams.get("service"));
    if (!selected) return;
    setForm((current) => (current.service === selected ? current : { ...current, service: selected }));
    setSubmitted(false);
    const booking = document.getElementById("booking");
    if (!booking) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    booking.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, [searchParams]);

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    bookingMessage(form)
  )}`;

  const update = (field: FieldName, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed: BookingPayload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      service: form.service.trim(),
      preferredDate: form.preferredDate.trim(),
      preferredTime: form.preferredTime.trim(),
      message: form.message.trim(),
    };
    setForm(trimmed);
    const errors = validate(trimmed);
    setFieldErrors(errors);
    setError(null);
    if (Object.keys(errors).length > 0) {
      const first = Object.keys(errors)[0];
      document.getElementById(`booking-${first}`)?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...trimmed, website: honeypot }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; code?: string };
      if (res.ok && data.ok) {
        setSubmitted(true);
        return;
      }
      setError(data.code === "email_failed" || data.code === "unconfigured" ? "send" : "send");
    } catch {
      setError("send");
    } finally {
      setSubmitting(false);
    }
  };

  const fieldProps = (name: FieldName) => ({
    id: `booking-${name}`,
    "aria-invalid": fieldErrors[name] ? true : undefined,
    "aria-describedby": fieldErrors[name] ? `booking-${name}-error` : undefined,
    className: `${inputClass} ${fieldErrors[name] ? "border-red-700" : ""}`,
  });

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
                className="inline-flex items-center gap-2 rounded-sm border border-warm-beige bg-warm-white px-5 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:translate-y-px"
              >
                <MessageCircle size={16} className="text-accent-deep" />
                WhatsApp
              </a>
              <a
                href={`tel:${siteConfig.phoneInternational}`}
                className="inline-flex items-center gap-2 rounded-sm border border-warm-beige bg-warm-white px-5 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:translate-y-px"
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
                  <h3 className="font-display text-3xl text-ink">Request received!</h3>
                  <p className="mx-auto mt-3 max-w-md font-sans text-sm leading-relaxed text-ink-muted">
                    We&apos;ll contact you by phone or WhatsApp to confirm your session.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="relative space-y-4" noValidate>
                  <div hidden aria-hidden="true">
                    <input
                      id="website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <FieldLabel htmlFor="booking-name" required>
                        Name
                      </FieldLabel>
                      <input
                        {...fieldProps("name")}
                        required
                        type="text"
                        autoComplete="name"
                        maxLength={120}
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="Your name"
                      />
                      {fieldErrors.name ? (
                        <p id="booking-name-error" className="mt-1.5 font-sans text-xs text-red-700">
                          {fieldErrors.name}
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <FieldLabel htmlFor="booking-phone" required>
                        Phone
                      </FieldLabel>
                      <input
                        {...fieldProps("phone")}
                        required
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        maxLength={40}
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="0XXXXXXXXX"
                      />
                      {fieldErrors.phone ? (
                        <p id="booking-phone-error" className="mt-1.5 font-sans text-xs text-red-700">
                          {fieldErrors.phone}
                        </p>
                      ) : null}
                    </div>
                    <div className="sm:col-span-2">
                      <FieldLabel htmlFor="booking-email" required>
                        Email
                      </FieldLabel>
                      <input
                        {...fieldProps("email")}
                        required
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        maxLength={160}
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="you@email.com"
                      />
                      {fieldErrors.email ? (
                        <p id="booking-email-error" className="mt-1.5 font-sans text-xs text-red-700">
                          {fieldErrors.email}
                        </p>
                      ) : null}
                    </div>
                    <div className="sm:col-span-2">
                      <FieldLabel htmlFor="booking-service" required>
                        Photography Service
                      </FieldLabel>
                      <select
                        {...fieldProps("service")}
                        required
                        value={form.service}
                        onChange={(e) => update("service", e.target.value)}
                      >
                        <option value="">Select…</option>
                        {bookingServices.map((s) => (
                          <option key={s.id} value={s.label}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.service ? (
                        <p id="booking-service-error" className="mt-1.5 font-sans text-xs text-red-700">
                          {fieldErrors.service}
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <FieldLabel htmlFor="booking-preferredDate">Preferred Date</FieldLabel>
                      <input
                        {...fieldProps("preferredDate")}
                        type="date"
                        value={form.preferredDate}
                        onChange={(e) => update("preferredDate", e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor="booking-preferredTime">Preferred Time</FieldLabel>
                      <input
                        {...fieldProps("preferredTime")}
                        type="time"
                        value={form.preferredTime}
                        onChange={(e) => update("preferredTime", e.target.value)}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <FieldLabel htmlFor="booking-message">Comments</FieldLabel>
                      <textarea
                        {...fieldProps("message")}
                        rows={4}
                        maxLength={2000}
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        className={`${fieldProps("message").className} resize-none`}
                        placeholder="Anything we should know…"
                      />
                    </div>
                  </div>

                  {error ? (
                    <div role="alert" className="rounded-sm border border-red-200 bg-red-50 px-4 py-3">
                      <p className="font-sans text-sm font-medium text-red-800">Something went wrong.</p>
                      <p className="mt-1 font-sans text-sm text-red-800">
                        Please try again or contact us on{" "}
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-2"
                        >
                          WhatsApp
                        </a>
                        .
                      </p>
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={submitting}
                    aria-busy={submitting}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-ink px-7 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-warm-white transition-colors hover:bg-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {submitting ? (
                      <span
                        className="h-3.5 w-3.5 animate-spin rounded-full border border-warm-white/30 border-t-warm-white motion-reduce:animate-none"
                        aria-hidden="true"
                      />
                    ) : null}
                    {submitting ? "Sending request…" : "Send Session Request"}
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
