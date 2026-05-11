"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { EmotionalSection } from "./emotional-section";
import { FinalCtaSection } from "./final-cta-section";
import { HeroSection } from "./hero-section";
import { HowItWorksSection } from "./how-it-works-section";
import { LivePreviewSection } from "./live-preview-section";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { StorySelectionSection } from "./story-selection-section";
import { TestimonialsSection } from "./testimonials-section";

export function LandingPage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const minMs = 700;
    const start = performance.now();
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const raf = requestAnimationFrame(() => {
      const elapsed = performance.now() - start;
      const rest = Math.max(0, minMs - elapsed);
      timeoutId = setTimeout(() => setReady(true), rest);
    });
    return () => {
      cancelAnimationFrame(raf);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {!ready && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-night-950"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="h-14 w-14 rounded-full border-2 border-gold/25 border-t-gold"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
              />
              <p className="font-serif text-lg tracking-wide text-cream/70">Moonora</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.6, delay: ready ? 0.05 : 0 }}
      >
        <SiteHeader />
        <main>
          <HeroSection />
          <HowItWorksSection />
          <StorySelectionSection />
          <LivePreviewSection />
          <EmotionalSection />
          <TestimonialsSection />
          <FinalCtaSection />
        </main>
        <SiteFooter />
      </motion.div>
    </>
  );
}
