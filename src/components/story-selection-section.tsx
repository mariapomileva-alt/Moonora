"use client";

import { motion } from "framer-motion";

function WonderlandArt() {
  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" fill="none" aria-hidden>
      <defs>
        <linearGradient id="wSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a3352" />
          <stop offset="100%" stopColor="#0a1628" />
        </linearGradient>
        <radialGradient id="wMoon" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f3ead8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f3ead8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="220" fill="url(#wSky)" />
      <circle cx="300" cy="48" r="22" fill="#ebe3d6" opacity="0.9" />
      <circle cx="300" cy="48" r="50" fill="url(#wMoon)" opacity="0.5" />
      {/* Trees */}
      <path d="M40 200 L70 120 L100 200 Z" fill="#0f2138" opacity="0.9" />
      <path d="M20 200 L55 100 L90 200 Z" fill="#152a45" opacity="0.85" />
      <path d="M320 200 L350 130 L380 200 Z" fill="#0f2138" />
      <path d="M280 200 L330 90 L380 200 Z" fill="#152a45" opacity="0.9" />
      {/* Glowing orbs */}
      <circle cx="180" cy="140" r="6" fill="#e4cf8a" opacity="0.7" />
      <circle cx="220" cy="160" r="4" fill="#e4cf8a" opacity="0.5" />
      <circle cx="150" cy="170" r="3" fill="#c9a962" opacity="0.6" />
      {/* Creature silhouette */}
      <ellipse cx="200" cy="185" rx="18" ry="12" fill="#2a3f5c" opacity="0.8" />
      <circle cx="200" cy="168" r="10" fill="#2a3f5c" opacity="0.85" />
    </svg>
  );
}

function IslandArt() {
  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" fill="none" aria-hidden>
      <defs>
        <linearGradient id="iSea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#152a45" />
          <stop offset="100%" stopColor="#050a14" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill="url(#iSea)" />
      {/* Stars */}
      {[30, 60, 100, 140, 250, 290, 340].map((x, i) => (
        <circle key={x} cx={x} cy={30 + (i % 3) * 15} r={1.2} fill="#ebe3d6" opacity={0.4 + (i % 3) * 0.15} />
      ))}
      {/* Island */}
      <path
        d="M120 200 Q200 140 280 200 Z"
        fill="#1a3352"
        stroke="rgba(201,169,98,0.25)"
        strokeWidth="1"
      />
      <path d="M160 175 L200 155 L240 175" stroke="rgba(228,207,138,0.35)" strokeWidth="1.5" fill="none" />
      {/* Map curl */}
      <path
        d="M60 160 Q80 140 100 160 L95 185 Q75 195 55 180 Z"
        fill="#2a3f5c"
        stroke="rgba(235,227,214,0.15)"
        opacity="0.9"
      />
      {/* Moon on horizon */}
      <circle cx="360" cy="170" r="28" fill="#f3ead8" opacity="0.12" />
    </svg>
  );
}

const stories = [
  {
    title: "Kira in Wonderland",
    tagline: "A dream world beneath the moon",
    description:
      "Glowing forests, kind creatures, and a path of stardust — a gentle epic where courage fits in a whisper.",
    Art: WonderlandArt,
  },
  {
    title: "Adventure on the Secret Island",
    tagline: "Maps, tides, and a little magic",
    description:
      "Salt air, lantern light on the waves, and a treasure that was never gold — a cozy voyage for curious hearts.",
    Art: IslandArt,
  },
] as const;

export function StorySelectionSection() {
  return (
    <section id="stories" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="absolute inset-0 bg-night-950" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold/85">Curated worlds</p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-cream sm:text-4xl">
            Stories written to feel timeless — not trendy.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-cream/55 sm:text-base">
            Each adventure is lovingly illustrated and edited by a human art director. Your child’s name and likeness
            appear throughout, never as an afterthought.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {stories.map((story, i) => {
            const Art = story.Art;
            return (
            <motion.article
              key={story.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-gradient-to-b from-night-800/40 to-night-950 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]"
            >
              <div className="relative aspect-[400/220] overflow-hidden">
                <Art />
                <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/20 to-transparent" />
                <p className="absolute bottom-4 left-6 font-serif text-2xl text-cream drop-shadow-lg sm:text-3xl">
                  {story.title}
                </p>
              </div>
              <div className="flex flex-1 flex-col p-7 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-gold/75">{story.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-cream/60">{story.description}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    className="rounded-full border border-cream/15 bg-white/[0.04] px-6 py-3 text-sm font-medium text-cream transition hover:border-gold/35"
                  >
                    Preview spreads
                  </button>
                  <a
                    href="#preview"
                    className="inline-flex items-center justify-center rounded-full bg-cream px-6 py-3 text-sm font-semibold text-night-950 transition hover:bg-moon"
                  >
                    Create this story
                  </a>
                </div>
              </div>
            </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
