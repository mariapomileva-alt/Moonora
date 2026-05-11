"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image, { type StaticImageData } from "next/image";

import coverFull from "@/images/cover-moonora-full-illustration.png";
import coverFrame from "@/images/cover-moonora-magic-frame.png";
import coverSilhouette from "@/images/cover-moonora-silhouette.png";
import type { AiPipelinePhase } from "@/lib/cover-ai";

/** Full-bleed cinematic cover art + post-grade (raster URL or bundled asset). */
function CinematicCoverArt({
  src,
  transforming,
  phaseLabel,
  objectPosition = "center 45%",
}: {
  src: StaticImageData | string;
  transforming: boolean;
  /** Shown on loading overlay */
  phaseLabel?: string;
  objectPosition?: string;
}) {
  const isData = typeof src === "string";
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={transforming ? { scale: 1.04, filter: "blur(6px) brightness(0.65)" } : { scale: 1.06, filter: "blur(0px) brightness(1)" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={src}
          alt=""
          fill
          sizes="(max-width:640px) 72vw, 240px"
          className="object-cover"
          style={{ objectPosition }}
          priority={false}
          unoptimized={isData}
        />
      </motion.div>

      {/* Spine-side depth (printed board shadow) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/[0.52] via-black/10 via-35% to-transparent" />

      {/* Moonlight cool wash */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-[0.42]"
        style={{
          background:
            "radial-gradient(ellipse 120% 70% at 85% 12%, rgba(200, 220, 255, 0.22) 0%, transparent 55%), radial-gradient(ellipse 80% 50% at 20% 100%, rgba(30, 55, 90, 0.35) 0%, transparent 50%)",
        }}
      />

      {/* Warm golden key (bedtime luxury) */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.28]"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% 88%, rgba(201, 169, 98, 0.45) 0%, transparent 58%), radial-gradient(circle at 75% 18%, rgba(255, 236, 200, 0.12) 0%, transparent 35%)",
        }}
      />

      {/* Volumetric fog — bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#040a14]/92 via-[#0a1628]/35 to-transparent" />

      {/* Atmospheric haze */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a1420]/25 via-transparent to-[#050c18]/50" />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow:
            "inset 0 0 100px rgba(0,0,0,0.55), inset 0 -40px 80px rgba(0,0,0,0.45), inset 12px 0 40px rgba(0,0,0,0.35)",
        }}
      />

      {/* Subtle lens bloom */}
      <div className="pointer-events-none absolute -right-6 top-[8%] h-24 w-24 rounded-full bg-[#f3ead8]/12 blur-3xl" />

      {/* Gold dust — soft bokeh (not geometric shapes) */}
      {[
        [12, 22, 2.5, 0.35],
        [78, 18, 1.8, 0.28],
        [55, 35, 2, 0.22],
        [88, 48, 1.2, 0.2],
        [22, 55, 1.5, 0.18],
        [68, 62, 2.2, 0.25],
        [40, 28, 1.4, 0.15],
      ].map(([x, y, s, o], i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute rounded-full bg-[#e8d4a0]"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: s,
            height: s,
            opacity: o,
            filter: "blur(1px)",
            boxShadow: "0 0 12px rgba(232,212,160,0.35)",
          }}
          animate={{ y: [0, -4, 0], opacity: [o, o + 0.15, o] }}
          transition={{ duration: 4 + (i % 3), delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <AnimatePresence>
        {transforming && (
          <motion.div
            key="gen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 z-[12] flex flex-col items-center justify-center bg-[#050a14]/55 backdrop-blur-[2px]"
          >
            <motion.div
              className="h-10 w-10 rounded-full border border-[#c9a962]/50 border-t-[#f3ead8]"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
            />
            <p className="mt-3 max-w-[11rem] text-center text-[8px] font-semibold uppercase leading-relaxed tracking-[0.22em] text-[#c9a962]/90">
              {phaseLabel || "Painting your cover…"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CoverCard({
  title,
  optionLabel,
  badge,
  description,
  bullets,
  selected,
  onSelect,
  coverSrc,
  objectPosition,
  transforming,
  phaseLabel,
  delay = 0,
}: {
  title: string;
  optionLabel: string;
  badge?: string;
  description: string;
  bullets: string[];
  selected: boolean;
  onSelect: () => void;
  coverSrc: StaticImageData | string;
  objectPosition?: string;
  transforming: boolean;
  phaseLabel?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay }}
      className="flex flex-col items-center"
    >
      <div className="relative w-full max-w-[220px] sm:max-w-[230px]" style={{ perspective: "1400px" }}>
        <div className="absolute -bottom-5 left-1/2 h-8 w-[80%] -translate-x-1/2 rounded-[100%] bg-black/60 blur-2xl" />

        <motion.div
          animate={{ rotateY: selected ? 0 : -7, scale: selected ? 1.02 : 1 }}
          transition={{ type: "spring", stiffness: 70, damping: 18 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className={`relative rounded-r-[1.3rem] rounded-l-sm p-[3px] transition-all duration-400 ${
              selected
                ? "shadow-[0_0_60px_rgba(201,169,98,0.35),0_40px_80px_-10px_rgba(0,0,0,0.9)]"
                : "shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)]"
            }`}
            style={{
              background: selected
                ? "linear-gradient(155deg,#f0e0a0 0%,#c9a962 35%,#a88b4a 58%,#d4c08a 100%)"
                : "linear-gradient(155deg,#1e3050 0%,#0e1e30 50%,#080e18 100%)",
            }}
          >
            <div className="relative overflow-hidden rounded-r-[1.1rem] rounded-l-[2px]" style={{ minHeight: 290 }}>
              <CinematicCoverArt
                src={coverSrc}
                transforming={transforming}
                phaseLabel={phaseLabel}
                objectPosition={objectPosition}
              />

              {/* Stronger film grain for painterly feel */}
              <div
                className="pointer-events-none absolute inset-0 z-[14] opacity-[0.07] mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='5'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
              />

              <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-[16] w-4 bg-gradient-to-r from-black/55 to-transparent" />

              <div className="pointer-events-none absolute inset-x-0 top-0 z-[16] h-px bg-gradient-to-r from-transparent via-[#f3ead8]/12 to-transparent" />

              {/* Readability scrim behind type */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[17] h-[38%] bg-gradient-to-t from-[#030810]/95 via-[#030810]/55 to-transparent" />

              <div className="relative z-20 flex min-h-[290px] flex-col items-center px-4 pb-5 pt-3">
                <div className="flex items-center gap-1.5">
                  <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 text-[#c9a962]/85" fill="currentColor" aria-hidden>
                    <path d="M8 5c0 2-1.6 3.5-3.5 4 1.5-.8 2.5-2.4 2.5-4 0-1.6-1-3.2-2.5-4C6.4 1.5 8 3 8 5z" />
                  </svg>
                  <p className="text-[7.5px] font-semibold uppercase tracking-[0.42em] text-[#c9a962]/95">Moonora</p>
                </div>

                <div className="flex-1" style={{ minHeight: 100 }} />

                <motion.p
                  layout
                  className="text-center font-serif text-[0.88rem] leading-snug text-[#f7f0e4] sm:text-[0.95rem]"
                  style={{
                    textShadow:
                      "0 2px 24px rgba(0,0,0,0.95), 0 0 40px rgba(0,0,0,0.8), 0 1px 0 rgba(201,169,98,0.15)",
                  }}
                >
                  {title}
                </motion.p>
                <div className="mx-auto mt-2 h-px w-8 bg-gradient-to-r from-transparent via-[#c9a962]/6 to-transparent" />
              </div>
            </div>
          </div>

          <div
            className="absolute bottom-0 left-0 top-0 w-2 rounded-l-sm"
            style={{
              transform: "rotateY(-90deg) translateZ(-1px) translateX(-1px)",
              background: "linear-gradient(to bottom, #0e1e30, #060e18)",
              transformOrigin: "left center",
            }}
          />
        </motion.div>
      </div>

      <div className="mt-7 w-full max-w-[230px] text-center">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <p className="text-[9px] font-semibold uppercase tracking-[0.32em] text-[#c9a962]/75">{optionLabel}</p>
          {badge && (
            <span className="rounded-full bg-[#c9a962]/15 px-2 py-0.5 text-[8px] font-medium uppercase tracking-wide text-[#c9a962]/90">
              {badge}
            </span>
          )}
        </div>
        <p className="mt-2 text-[0.8rem] leading-relaxed text-[#f3ead8]/55">{description}</p>
        <ul className="mt-3 space-y-1 text-left">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-1.5 text-[11px] text-[#f3ead8]/42">
              <span className="mt-0.5 shrink-0 text-[#c9a962]/60">✦</span>
              {b}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={onSelect}
          className={`mt-4 w-full rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-250 ${
            selected
              ? "bg-gradient-to-r from-[#c9a962] to-[#e4cf8a] text-[#040c18] shadow-[0_0_30px_rgba(201,169,98,0.4)]"
              : "border border-white/12 bg-white/[0.04] text-[#f3ead8]/75 hover:border-[#c9a962]/35 hover:bg-white/[0.07] hover:text-[#f3ead8]/90"
          }`}
        >
          {selected ? "✓ Selected" : "Select this cover"}
        </button>
      </div>
    </motion.div>
  );
}

export function CoverOptionsSection({
  name,
  coverStyleIndex,
  onCoverStyleChange,
  aiCovers,
  aiPhase,
  aiError,
  hasPhoto,
  aiEnabled,
}: {
  name: string;
  coverStyleIndex: 0 | 1 | 2;
  onCoverStyleChange: (i: 0 | 1 | 2) => void;
  aiCovers: [string | null, string | null, string | null];
  aiPhase: AiPipelinePhase;
  aiError: string | null;
  hasPhoto: boolean;
  /** OPENAI pipeline available (API base URL set) */
  aiEnabled: boolean;
}) {
  const title = name.trim() ? `${name.trim()} and the Moon Forest` : "The Moon Forest";

  const covers: {
    optionLabel: string;
    badge?: string;
    description: string;
    bullets: string[];
    fallback: StaticImageData;
    objectPosition: string;
  }[] = [
    {
      optionLabel: "Option 1 — Full illustration",
      badge: "Recommended",
      description:
        "A fully painted cinematic scene: your child as a believable illustrated hero inside the Moon Forest — depth, emotion, and collector’s-edition finish.",
      bullets: [
        "Painterly CG storybook quality (not flat vector)",
        "Layered forest depth, moonlight, and particles",
        "Your photo is reference only for likeness",
      ],
      fallback: coverFull,
      objectPosition: "center 42%",
    },
    {
      optionLabel: "Option 2 — Magic portrait frame",
      description:
        "An oil-painted portrait treatment inside an ornate gold arch — still illustration, never a pasted photo — luxury bedtime publishing.",
      bullets: [
        "Hand-finished portrait integrated into the scene",
        "Warm candlelight + cool moon cross-light",
        "Gold architectural frame as part of the painting",
      ],
      fallback: coverFrame,
      objectPosition: "center 38%",
    },
    {
      optionLabel: "Option 3 — Dreamy silhouette",
      description:
        "Cinematic silhouette and atmosphere first: your child as a quiet emotional presence beneath a vast moonlit world.",
      bullets: [
        "Film-key lighting and volumetric mist",
        "Mysterious, elegant, story-forward composition",
        "Silhouette derived from reference, fully illustrated",
      ],
      fallback: coverSilhouette,
      objectPosition: "center 48%",
    },
  ];

  const phaseLabelForCard = (i: 0 | 1 | 2) => {
    if (coverStyleIndex !== i) return undefined;
    if (aiPhase === "portrait") return "Illustrating your child…";
    if (aiPhase === "cover") return "Creating the magical cover…";
    return undefined;
  };

  const cardTransforming = (i: 0 | 1 | 2) =>
    aiEnabled &&
    hasPhoto &&
    coverStyleIndex === i &&
    (aiPhase === "portrait" || aiPhase === "cover") &&
    !aiCovers[i];

  return (
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-night-950 via-[#050b18] to-night-950" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#c9a962]/[0.05] blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="flex items-center justify-center gap-3 text-[10px] font-semibold uppercase tracking-[0.36em] text-[#c9a962]/75">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#c9a962]/50" />
            Cover style
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#c9a962]/50" />
          </p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-[#f3ead8] sm:text-[2.1rem]">
            How should your child appear on the cover?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#f3ead8]/48 sm:text-[0.95rem]">
            {aiEnabled
              ? "OpenAI generates a painted portrait from your photo, then a full cover for each style you select — the raw upload never appears on the cover."
              : "These are premium painted-cover directions. Enable the local cover API (see dev command) for live OpenAI generation from your upload."}
          </p>
        </motion.div>

        <AnimatePresence>
          {hasPhoto && aiEnabled && (aiPhase === "portrait" || aiPhase === "cover") && (
            <motion.div
              key="notice"
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.4 }}
              className="mx-auto mt-8 max-w-md"
            >
              <div className="flex items-center gap-3 rounded-2xl border border-[#c9a962]/20 bg-[#c9a962]/[0.06] px-5 py-3.5">
                <motion.div
                  className="h-2 w-2 shrink-0 rounded-full bg-[#c9a962]"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                <p className="text-left text-xs leading-relaxed text-[#f3ead8]/72">
                  {aiPhase === "portrait" ? (
                    <>
                      <span className="text-[#c9a962]/90">Illustrating your child…</span> — turning your photo into a cinematic painted character (reference only).
                    </>
                  ) : (
                    <>
                      <span className="text-[#c9a962]/90">Creating the magical cover…</span> — placing your illustrated hero into the Moonora world.
                    </>
                  )}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {aiError && (
          <p className="mx-auto mt-6 max-w-lg rounded-xl border border-red-500/30 bg-red-950/30 px-4 py-3 text-center text-xs text-red-200/90">
            {aiError}
          </p>
        )}

        <div className="mt-14 grid gap-12 sm:grid-cols-3 sm:gap-5 lg:gap-8">
          {covers.map((c, i) => {
            const idx = i as 0 | 1 | 2;
            const src = aiCovers[idx] ?? c.fallback;
            return (
              <CoverCard
                key={i}
                title={title}
                optionLabel={c.optionLabel}
                badge={c.badge}
                description={c.description}
                bullets={c.bullets}
                selected={coverStyleIndex === idx}
                onSelect={() => onCoverStyleChange(idx)}
                coverSrc={src}
                objectPosition={c.objectPosition}
                delay={i * 0.13}
                transforming={cardTransforming(idx)}
                phaseLabel={phaseLabelForCard(idx)}
              />
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.25 }}
          className="mx-auto mt-14 max-w-2xl rounded-2xl border border-[#c9a962]/12 bg-[#c9a962]/[0.035] px-6 py-5"
        >
          <p className="flex items-start gap-3 text-sm leading-relaxed text-[#f3ead8]/60">
            <span className="mt-0.5 shrink-0 text-[#c9a962]">
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
                <path d="M8 5v4M8 11v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <span>
              <span className="font-medium text-[#f3ead8]/85">Our recommendation: </span>
              Choose <span className="text-[#c9a962]">Full illustration</span> for maximum magic and immersion. Choose{" "}
              <span className="text-[#c9a962]">Magic portrait frame</span> for a painted likeness that still reads clearly as your child — fully illustrated, never a pasted photo.
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <button
            type="button"
            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#c9a962] to-[#e4cf8a] px-8 py-3.5 text-sm font-semibold text-[#040c18] shadow-[0_0_40px_rgba(201,169,98,0.2)] transition hover:brightness-105 hover:shadow-[0_0_60px_rgba(201,169,98,0.3)]"
          >
            Continue with selected cover
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
