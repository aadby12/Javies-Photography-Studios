"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { packages, bookingServices } from "@/lib/site-data";
import { SectionHeading } from "@/components/SectionHeading";

const inputClass =
  "w-full rounded-sm border border-warm-beige bg-warm-white px-4 py-3 font-sans text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent";

type PackageInquiry = {
  packageId: string;
  sessionType: string;
  numberOfPeople: string;
  duration: string;
  location: string;
  editedPhotos: string;
  videoRequirements: string;
  specialRequests: string;
  name: string;
  email: string;
  phone: string;
};

export function Packages() {
  const [selected, setSelected] = useState(packages[0]?.id ?? "");
  const [sent, setSent] = useState(false);
  const [inquiry, setInquiry] = useState<PackageInquiry>({
    packageId: packages[0]?.id ?? "",
    sessionType: "",
    numberOfPeople: "",
    duration: "",
    location: "",
    editedPhotos: "",
    videoRequirements: "",
    specialRequests: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Integration hook for package inquiry CRM / email
    if (process.env.NODE_ENV === "development") {
      console.info("[Packages] Inquiry:", inquiry);
    }
    setSent(true);
  };

  return (
    <section id="packages" className="scroll-mt-20 bg-warm-white py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Packages"
          title="Sessions shaped around you"
          description="Explore our package directions, then request tailored details — no invented prices, just a clear path to the right fit."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((pkg, i) => (
            <motion.button
              key={pkg.id}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              onClick={() => {
                setSelected(pkg.id);
                setInquiry((q) => ({ ...q, packageId: pkg.id }));
                setSent(false);
              }}
              className={`rounded-sm border p-6 text-left transition-all duration-300 ${
                selected === pkg.id
                  ? "border-ink bg-ink text-warm-white"
                  : "border-warm-beige bg-warm-cream/40 hover:border-accent"
              }`}
            >
              <h3
                className={`font-display text-2xl ${
                  selected === pkg.id ? "text-warm-white" : "text-ink"
                }`}
              >
                {pkg.name}
              </h3>
              <p
                className={`mt-2 font-sans text-sm leading-relaxed ${
                  selected === pkg.id ? "text-warm-white/75" : "text-ink-muted"
                }`}
              >
                {pkg.description}
              </p>
              <ul className="mt-4 space-y-1.5">
                {pkg.highlights.map((h) => (
                  <li
                    key={h}
                    className={`font-sans text-xs ${
                      selected === pkg.id ? "text-warm-beige/80" : "text-ink-faint"
                    }`}
                  >
                    · {h}
                  </li>
                ))}
              </ul>
            </motion.button>
          ))}
        </div>

        <div className="mt-12 rounded-sm border border-warm-beige bg-warm-cream/50 p-6 md:p-10">
          {sent ? (
            <div className="py-8 text-center">
              <h3 className="font-display text-3xl text-ink">Details requested</h3>
              <p className="mx-auto mt-3 max-w-md font-sans text-sm text-ink-muted">
                Thank you. We&apos;ll share package details tailored to your
                session preferences shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 className="font-display text-2xl text-ink md:text-3xl">
                Request Package Details
              </h3>
              <p className="mt-2 font-sans text-sm text-ink-muted">
                Optional fields help us prepare an accurate proposal.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="mb-1.5 block font-sans text-xs text-ink-faint">
                    Session type
                  </label>
                  <select
                    value={inquiry.sessionType}
                    onChange={(e) =>
                      setInquiry((q) => ({ ...q, sessionType: e.target.value }))
                    }
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
                    Number of people
                  </label>
                  <input
                    type="text"
                    value={inquiry.numberOfPeople}
                    onChange={(e) =>
                      setInquiry((q) => ({
                        ...q,
                        numberOfPeople: e.target.value,
                      }))
                    }
                    className={inputClass}
                    placeholder="e.g. 4"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-sans text-xs text-ink-faint">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={inquiry.duration}
                    onChange={(e) =>
                      setInquiry((q) => ({ ...q, duration: e.target.value }))
                    }
                    className={inputClass}
                    placeholder="e.g. 2 hours"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-sans text-xs text-ink-faint">
                    Location
                  </label>
                  <input
                    type="text"
                    value={inquiry.location}
                    onChange={(e) =>
                      setInquiry((q) => ({ ...q, location: e.target.value }))
                    }
                    className={inputClass}
                    placeholder="Studio / outdoor / venue"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-sans text-xs text-ink-faint">
                    Number of edited photos
                  </label>
                  <input
                    type="text"
                    value={inquiry.editedPhotos}
                    onChange={(e) =>
                      setInquiry((q) => ({
                        ...q,
                        editedPhotos: e.target.value,
                      }))
                    }
                    className={inputClass}
                    placeholder="Preferred count"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-sans text-xs text-ink-faint">
                    Video requirements
                  </label>
                  <input
                    type="text"
                    value={inquiry.videoRequirements}
                    onChange={(e) =>
                      setInquiry((q) => ({
                        ...q,
                        videoRequirements: e.target.value,
                      }))
                    }
                    className={inputClass}
                    placeholder="Highlight reel, full coverage…"
                  />
                </div>
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="mb-1.5 block font-sans text-xs text-ink-faint">
                    Special requests
                  </label>
                  <textarea
                    rows={3}
                    value={inquiry.specialRequests}
                    onChange={(e) =>
                      setInquiry((q) => ({
                        ...q,
                        specialRequests: e.target.value,
                      }))
                    }
                    className={`${inputClass} resize-none`}
                    placeholder="Themes, accessibility, timing notes…"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-sans text-xs text-ink-faint">
                    Your name *
                  </label>
                  <input
                    required
                    type="text"
                    value={inquiry.name}
                    onChange={(e) =>
                      setInquiry((q) => ({ ...q, name: e.target.value }))
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-sans text-xs text-ink-faint">
                    Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={inquiry.email}
                    onChange={(e) =>
                      setInquiry((q) => ({ ...q, email: e.target.value }))
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-sans text-xs text-ink-faint">
                    Phone *
                  </label>
                  <input
                    required
                    type="tel"
                    value={inquiry.phone}
                    onChange={(e) =>
                      setInquiry((q) => ({ ...q, phone: e.target.value }))
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-8 rounded-sm bg-ink px-7 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-warm-white transition-colors hover:bg-ink-soft"
              >
                Request Package Details
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
