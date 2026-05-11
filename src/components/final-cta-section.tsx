"use client";

import { motion } from "framer-motion";
import { StarsField } from "./stars-field";

export function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-night-950 via-[#0a1830] to-night-950" />
      <StarsField density={40} className="opacity-50" />

      <motion.div
        className="pointer-events-none absolute -top-24 right-1/4 h-64 w-64 rounded-full bg-moon/10 blur-3xl"
        animate={{ opacity: [0.25, 0.45, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.28, 0.18] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Moon */}
      <div className="pointer-events-none absolute left-1/2 top-8 h-28 w-28 -translate-x-1/2 rounded-full bg-gradient-to-b from-moon to-cream-soft opacity-[0.15] blur-2xl sm:top-12 sm:h-36 sm:w-36" />
      <div className="pointer-events-none absolute left-1/2 top-10 h-16 w-16 -translate-x-1/2 rounded-full border border-white/10 bg-moon/10 sm:top-14 sm:h-20 sm:w-20" />

      <div className="relative mx-auto max-w-3xl px-4 pt-16 text-center sm:px-6 sm:pt-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl md:text-5xl"
        >
          Create a story they will remember{" "}
          <span className="text-gradient-gold">forever</span>.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-cream/55"
        >
          From 49–89 EUR depending on edition. Free worldwide shipping on hardcover orders this season.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.2 }}
          className="mt-10"
        >
          <a
            href="#preview"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gold to-gold-bright px-10 py-4 text-base font-semibold text-night-950 shadow-[0_0_50px_rgba(201,169,98,0.3)] transition hover:brightness-105"
          >
            Start Your Magical Book
          </a>
        </motion.div>
      </div>
    </section>
  );
}
