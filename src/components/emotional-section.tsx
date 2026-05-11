"use client";

import { motion } from "framer-motion";
import { StarsField } from "./stars-field";

export function EmotionalSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-night-950 via-night-900 to-night-950" />
      <StarsField density={32} className="opacity-40" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75 }}
          className="text-xs font-semibold uppercase tracking-[0.35em] text-gold/85"
        >
          Why families choose Moonora
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="mt-5 font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl md:text-[2.75rem]"
        >
          This is more than a book.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, delay: 0.12 }}
          className="mt-10 space-y-6 text-left sm:mt-12"
        >
          {[
            "It is the hush before sleep — your voice, their name on the page, the same story asked for again and again.",
            "A keepsake for the shelf and for the heart: something grandparents wrap with trembling hands.",
            "The illustrations age gently; the binding stays proud on the bedside table. Years from now, they will still remember how the moon looked on page seven.",
          ].map((text, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-cream/65 sm:text-lg [&:not(:first-child)]:border-t [&:not(:first-child)]:border-white/[0.06] [&:not(:first-child)]:pt-6"
            >
              {text}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
