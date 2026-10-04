"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { rateCard } from "@/lib/site-data";

export function Packages() {
  return (
    <section className="bg-warm-cream py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        <p className="mb-3 font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-accent-deep">
          2026 rates
        </p>
        <h2 className="font-display text-display-md font-medium text-ink">Sessions & packages</h2>
        <p className="mt-3 max-w-xl font-sans text-sm text-ink-muted">
          Prices are in Ghana cedis. Maternity, traditional, and Christmas sessions are quoted when
          you enquire.
        </p>

        <div className="mt-14 space-y-16">
          {rateCard.groups.map((group) => (
            <div key={group.id}>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h3 className="font-display text-3xl text-ink">{group.name}</h3>
                  <p className="mt-1 font-sans text-sm text-ink-muted">{group.detail}</p>
                </div>
                <p className="max-w-sm font-sans text-sm text-ink-muted">{group.note}</p>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.tiers.map((tier, i) => (
                  <motion.article
                    key={tier.name}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 3) * 0.04, duration: 0.4 }}
                    className="flex flex-col rounded-sm border border-warm-beige bg-warm-white p-6"
                  >
                    <h4 className="font-display text-xl text-ink">{tier.name}</h4>
                    <p className="mt-2 font-sans text-lg font-medium text-ink">{tier.price}</p>
                    <ul className="mt-4 space-y-1.5">
                      {tier.includes.map((item) => (
                        <li key={item} className="font-sans text-sm text-ink-muted">
                          · {item}
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="font-display text-3xl text-ink">Canvas frames</h3>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {rateCard.frames.map((frame) => (
              <div
                key={frame.size}
                className="rounded-sm border border-warm-beige bg-warm-white px-4 py-5 text-center"
              >
                <p className="font-display text-xl text-ink">{frame.size}</p>
                <p className="mt-1 font-sans text-sm text-ink-muted">{frame.price}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 max-w-3xl font-sans text-sm leading-relaxed text-ink-muted">
          {rateCard.callOut}
        </p>

        <div className="mt-12 max-w-3xl">
          <h3 className="font-display text-2xl text-ink">Terms</h3>
          <ul className="mt-4 space-y-2">
            {rateCard.terms.map((term) => (
              <li key={term} className="font-sans text-sm leading-relaxed text-ink-muted">
                · {term}
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/#booking"
          className="mt-10 inline-flex rounded-sm bg-ink px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-warm-white transition-colors hover:bg-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:translate-y-px"
        >
          Enquire
        </Link>
      </div>
    </section>
  );
}
