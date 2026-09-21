"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import {
  bookingServices,
  locationOptions,
  siteConfig,
} from "@/lib/site-data";
import { SectionHeading } from "@/components/SectionHeading";

/**
 * BookingExperience
 * Structured for future third-party booking integration.
 * Replace `submitBookingRequest` with your provider API (Calendly, custom CRM, etc.)
 * without redesigning this multi-step UI.
 */
export type BookingPayload = {
  service: string;
  preferredDate: string;
  location: string;
  name: string;
  email: string;
  phone: string;
  requirements: string;
};

async function submitBookingRequest(payload: BookingPayload): Promise<void> {
  // Integration hook — swap for real booking provider
  await new Promise((r) => setTimeout(r, 600));
  if (process.env.NODE_ENV === "development") {
    console.info("[Booking] Request ready for provider:", payload);
  }
}

const STEPS = [
  "Service",
  "Date",
  "Location",
  "Details",
  "Requirements",
  "Confirm",
] as const;

const inputClass =
  "w-full rounded-sm border border-warm-beige bg-warm-white px-4 py-3 font-sans text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent";

export function BookingExperience() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<BookingPayload>({
    service: "",
    preferredDate: "",
    location: "",
    name: "",
    email: "",
    phone: "",
    requirements: "",
  });

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    `Hello Javies — I'd like to book a ${form.service || "session"}${
      form.preferredDate ? ` on ${form.preferredDate}` : ""
    }.`
  )}`;

  const canNext = () => {
    switch (step) {
      case 0:
        return !!form.service;
      case 1:
        return !!form.preferredDate;
      case 2:
        return !!form.location;
      case 3:
        return !!form.name && !!form.email && !!form.phone;
      case 4:
        return true;
      default:
        return true;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (step < STEPS.length - 1) {
      if (canNext()) setStep((s) => s + 1);
      return;
    }
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
              title="Reserve your session"
              description="A clear, guided request flow — ready to connect to your existing booking system without redesigning the experience."
            />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-sm border border-warm-beige bg-warm-white px-5 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:border-accent"
            >
              <MessageCircle size={16} className="text-accent-deep" />
              Book via WhatsApp
            </a>
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
                  <h3 className="font-display text-3xl text-ink">Request received</h3>
                  <p className="mx-auto mt-3 max-w-md font-sans text-sm text-ink-muted">
                    Thank you, {form.name}. We&apos;ll follow up shortly to confirm
                    your {form.service} session. You can also reach us on WhatsApp.
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 rounded-sm bg-ink px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-warm-white"
                  >
                    <MessageCircle size={16} />
                    Continue on WhatsApp
                  </a>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-8 flex items-center gap-1 overflow-x-auto pb-1 scrollbar-thin">
                    {STEPS.map((label, i) => (
                      <div key={label} className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => i < step && setStep(i)}
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-sans text-xs transition-colors ${
                            i === step
                              ? "bg-ink text-warm-white"
                              : i < step
                                ? "bg-accent/40 text-ink"
                                : "bg-warm-cream text-ink-faint"
                          }`}
                        >
                          {i < step ? <Check size={14} /> : i + 1}
                        </button>
                        <span
                          className={`mr-2 hidden font-sans text-[10px] uppercase tracking-[0.1em] sm:inline ${
                            i === step ? "text-ink" : "text-ink-faint"
                          }`}
                        >
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step === 0 && (
                        <fieldset>
                          <legend className="font-display text-2xl text-ink">
                            Choose a service
                          </legend>
                          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {bookingServices.map((s) => (
                              <button
                                key={s.id}
                                type="button"
                                onClick={() =>
                                  setForm((f) => ({ ...f, service: s.label }))
                                }
                                className={`rounded-sm border px-3 py-4 text-center font-sans text-sm transition-all ${
                                  form.service === s.label
                                    ? "border-ink bg-ink text-warm-white"
                                    : "border-warm-beige bg-warm-cream/40 text-ink-muted hover:border-accent"
                                }`}
                              >
                                {s.label}
                              </button>
                            ))}
                          </div>
                        </fieldset>
                      )}

                      {step === 1 && (
                        <fieldset>
                          <legend className="font-display text-2xl text-ink">
                            Preferred date
                          </legend>
                          <p className="mt-2 font-sans text-sm text-ink-muted">
                            Select your ideal session date. We&apos;ll confirm
                            availability.
                          </p>
                          <input
                            type="date"
                            required
                            value={form.preferredDate}
                            onChange={(e) =>
                              setForm((f) => ({
                                ...f,
                                preferredDate: e.target.value,
                              }))
                            }
                            className={`${inputClass} mt-5 max-w-xs`}
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </fieldset>
                      )}

                      {step === 2 && (
                        <fieldset>
                          <legend className="font-display text-2xl text-ink">
                            Choose location
                          </legend>
                          <div className="mt-5 space-y-2">
                            {locationOptions.map((loc) => (
                              <button
                                key={loc}
                                type="button"
                                onClick={() =>
                                  setForm((f) => ({ ...f, location: loc }))
                                }
                                className={`block w-full rounded-sm border px-4 py-3.5 text-left font-sans text-sm transition-all ${
                                  form.location === loc
                                    ? "border-ink bg-ink text-warm-white"
                                    : "border-warm-beige text-ink-muted hover:border-accent"
                                }`}
                              >
                                {loc}
                              </button>
                            ))}
                          </div>
                        </fieldset>
                      )}

                      {step === 3 && (
                        <fieldset>
                          <legend className="font-display text-2xl text-ink">
                            Your details
                          </legend>
                          <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                              <label className="mb-1.5 block font-sans text-xs text-ink-faint">
                                Full name
                              </label>
                              <input
                                required
                                type="text"
                                value={form.name}
                                onChange={(e) =>
                                  setForm((f) => ({ ...f, name: e.target.value }))
                                }
                                className={inputClass}
                                placeholder="Your name"
                              />
                            </div>
                            <div>
                              <label className="mb-1.5 block font-sans text-xs text-ink-faint">
                                Email
                              </label>
                              <input
                                required
                                type="email"
                                value={form.email}
                                onChange={(e) =>
                                  setForm((f) => ({ ...f, email: e.target.value }))
                                }
                                className={inputClass}
                                placeholder="you@email.com"
                              />
                            </div>
                            <div>
                              <label className="mb-1.5 block font-sans text-xs text-ink-faint">
                                Phone
                              </label>
                              <input
                                required
                                type="tel"
                                value={form.phone}
                                onChange={(e) =>
                                  setForm((f) => ({ ...f, phone: e.target.value }))
                                }
                                className={inputClass}
                                placeholder="0XXXXXXXXX"
                              />
                            </div>
                          </div>
                        </fieldset>
                      )}

                      {step === 4 && (
                        <fieldset>
                          <legend className="font-display text-2xl text-ink">
                            Requirements
                          </legend>
                          <p className="mt-2 font-sans text-sm text-ink-muted">
                            Tell us anything that helps us prepare — group size,
                            theme, video needs, accessibility.
                          </p>
                          <textarea
                            rows={5}
                            value={form.requirements}
                            onChange={(e) =>
                              setForm((f) => ({
                                ...f,
                                requirements: e.target.value,
                              }))
                            }
                            className={`${inputClass} mt-5 resize-none`}
                            placeholder="Optional notes..."
                          />
                        </fieldset>
                      )}

                      {step === 5 && (
                        <div>
                          <h3 className="font-display text-2xl text-ink">
                            Review & submit
                          </h3>
                          <dl className="mt-5 space-y-3 rounded-sm bg-warm-cream/60 p-5">
                            {[
                              ["Service", form.service],
                              ["Date", form.preferredDate],
                              ["Location", form.location],
                              ["Name", form.name],
                              ["Email", form.email],
                              ["Phone", form.phone],
                              ["Requirements", form.requirements || "—"],
                            ].map(([label, value]) => (
                              <div
                                key={label}
                                className="flex flex-col gap-0.5 border-b border-warm-beige/60 pb-3 last:border-0 last:pb-0 sm:flex-row sm:justify-between"
                              >
                                <dt className="font-sans text-xs uppercase tracking-[0.12em] text-ink-faint">
                                  {label}
                                </dt>
                                <dd className="font-sans text-sm text-ink sm:text-right">
                                  {value}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-10 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      disabled={step === 0}
                      onClick={() => setStep((s) => Math.max(0, s - 1))}
                      className="inline-flex items-center gap-1 font-sans text-sm text-ink-muted transition-colors hover:text-ink disabled:opacity-30"
                    >
                      <ChevronLeft size={16} />
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!canNext() || submitting}
                      className="inline-flex items-center gap-2 rounded-sm bg-ink px-7 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-warm-white transition-colors hover:bg-ink-soft disabled:opacity-40"
                    >
                      {step === STEPS.length - 1
                        ? submitting
                          ? "Sending…"
                          : "Request Booking"
                        : "Continue"}
                      {step < STEPS.length - 1 && <ChevronRight size={16} />}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
