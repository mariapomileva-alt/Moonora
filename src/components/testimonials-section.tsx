"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    quote:
      "We opened the box at bedtime. She recognized herself on the cover and went completely still — in the best way. It is our most precious object in the nursery.",
    name: "Elena M.",
    detail: "Mother of two · Berlin",
  },
  {
    quote:
      "I sent photos from my phone, not a studio shoot. Somehow the book still feels like cinema — quiet, glowing, intentional. Worth every euro.",
    name: "James R.",
    detail: "Father · London",
  },
  {
    quote:
      "My parents ordered it as a gift. There was crying. Happy crying. The paper smells like a real publishing house, not a gadget.",
    name: "Sofia L.",
    detail: "Aunt & godparent · Lisbon",
  },
] as const;

export function TestimonialsSection() {
  return (
    <section id="reviews" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="absolute inset-0 bg-night-950" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold/85">From families</p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-cream sm:text-4xl">
            The kind of mail you wait on the steps for.
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.blockquote
              key={r.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col rounded-3xl border border-white/[0.06] bg-gradient-to-b from-night-800/35 to-night-950/90 p-7 shadow-inner"
            >
              <p className="text-sm leading-relaxed text-cream/70 sm:text-[0.9375rem]">“{r.quote}”</p>
              <footer className="mt-8 border-t border-white/[0.06] pt-5">
                <cite className="not-italic">
                  <span className="font-medium text-cream">{r.name}</span>
                  <span className="mt-1 block text-xs text-cream/45">{r.detail}</span>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
