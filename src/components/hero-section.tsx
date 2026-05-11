"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { FloatingParticles } from "./floating-particles";
import { MoonoraLogo } from "./moonora-logo";
import { StarsField } from "./stars-field";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yClouds = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.6], [1, 0.3]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24"
    >
      <motion.div style={{ opacity: opacityBg }} className="absolute inset-0 bg-gradient-to-b from-night-800 via-night-900 to-night-950" />
      <StarsField density={56} className="opacity-90" />
      <FloatingParticles count={12} />

      <motion.div
        className="pointer-events-none absolute -top-20 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gradient-to-b from-moon/25 via-gold/10 to-transparent blur-3xl"
        style={{ y: yClouds }}
      />

      <motion.div
        style={{ y: yContent }}
        className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
      >
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-5 flex flex-col items-center gap-2 lg:items-start"
          >
            <MoonoraLogo size="md" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold/75">
              Where bedtime becomes magic
            </p>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.85, ease: [0.22, 1, 0.36, 1] as const }}
            className="font-serif text-[2.1rem] font-medium leading-[1.12] tracking-tight text-cream sm:text-5xl lg:text-[3.25rem]"
          >
            Turn your child into the{" "}
            <span className="text-gradient-gold">hero</span> of their own bedtime story.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mx-auto mt-6 max-w-md text-base leading-relaxed text-cream/65 lg:mx-0 lg:max-w-lg lg:text-lg"
          >
            Personalized magical books created from your child’s photo — illustrated, bound in
            hardcover, and delivered worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52, duration: 0.75 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-start sm:gap-4"
          >
            <a
              href="#preview"
              className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-gold to-gold-bright px-8 py-3.5 text-sm font-semibold text-night-950 shadow-[0_0_40px_rgba(201,169,98,0.25)] transition hover:brightness-105 sm:w-auto"
            >
              Create Your Story
            </a>
            <a
              href="#stories"
              className="inline-flex w-full items-center justify-center rounded-full border border-cream/20 bg-white/[0.03] px-8 py-3.5 text-sm font-medium text-cream transition hover:border-gold/35 hover:bg-white/[0.06] sm:w-auto"
            >
              See Example Book
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.8 }}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-5 lg:justify-start"
          >
            <div className="glass-subtle flex items-center gap-3 rounded-2xl px-4 py-3">
              <div className="relative h-14 w-11 shrink-0 rounded-sm bg-gradient-to-br from-night-700 to-night-800 shadow-lg ring-1 ring-gold/30">
                <div className="absolute inset-1 rounded-[2px] bg-gradient-to-br from-[#2a4a6f] to-night-900" />
                <span className="absolute inset-0 flex items-center justify-center font-serif text-[9px] font-medium leading-tight text-center text-cream/90 px-0.5">
                  Wonderland
                </span>
              </div>
              <div className="text-left">
                <p className="text-xs uppercase tracking-widest text-gold/80">Featured edition</p>
                <p className="font-serif text-lg text-cream">Wonderland</p>
                <p className="text-xs text-cream/50">Premium hardcover · 32 pages</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="order-1 lg:order-2"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div className="relative mx-auto max-w-xl lg:max-w-none">
            <div className="relative overflow-hidden rounded-[1.75rem] shadow-[0_40px_100px_-24px_rgba(0,0,0,0.85)] ring-1 ring-white/12">
              <Image
                src="/hero-moonora.png"
                alt="A child in bed at night, reading a glowing Moonora storybook — moonlight, stars, and a cozy bedroom"
                width={1024}
                height={786}
                priority
                className="h-auto w-full object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
              <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/[0.06]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-night-950/50 to-transparent" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-night-950 to-transparent"
      />
    </section>
  );
}
