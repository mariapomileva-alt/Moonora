"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function SiteHeader() {
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-3 sm:px-6 glass-subtle">
        <Link href="#" className="font-serif text-lg tracking-tight text-cream sm:text-xl">
          Moonora
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-cream/70 md:flex">
          <a href="#stories" className="transition hover:text-cream">
            Stories
          </a>
          <a href="#preview" className="transition hover:text-cream">
            Preview
          </a>
          <a href="#reviews" className="transition hover:text-cream">
            Families
          </a>
        </nav>
        <a
          href="#preview"
          className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-cream transition hover:border-gold/40 hover:bg-white/[0.07]"
        >
          Start
        </a>
      </div>
    </motion.header>
  );
}
