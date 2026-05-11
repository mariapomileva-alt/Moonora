"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

/* ─────────────────────────────────────────────
   SVG backdrops for each cover style
───────────────────────────────────────────── */

function BackdropIllustration() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e2040] via-[#0a1628] to-[#050d1a]" />
      {/* Moon */}
      <div className="absolute right-[14%] top-[8%] h-14 w-14 rounded-full bg-gradient-to-br from-[#f3ead8] to-[#d4c08a] opacity-80 blur-[1px]" />
      <div className="absolute right-[14%] top-[8%] h-28 w-28 -translate-x-1/4 -translate-y-1/4 rounded-full bg-[#f3ead8]/12 blur-2xl" />
      {/* Stars */}
      {[[8,12],[25,6],[60,16],[78,8],[45,22],[88,18],[15,28]].map(([x,y],i)=>(
        <span key={i} className="absolute rounded-full bg-[#f3ead8]"
          style={{left:`${x}%`,top:`${y}%`,width:i%2===0?2:1,height:i%2===0?2:1,opacity:0.4+(i%3)*0.15}} />
      ))}
      {/* Trees silhouette */}
      <svg className="absolute inset-x-0 bottom-0 w-full" viewBox="0 0 320 120" preserveAspectRatio="xMidYMax slice">
        <path d="M0 120 Q30 80 60 95 T120 85 T180 90 T240 82 T290 88 T320 80 L320 120Z" fill="#0a1628" />
        <path d="M0 120 Q20 90 50 105 T110 98 T170 104 T230 96 T280 102 T320 94 L320 120Z" fill="#071220" />
      </svg>
      {/* Golden glow bottom */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#c9a96210] via-transparent to-transparent" />
      {/* Butterflies / sparkles */}
      {[[30,55],[50,45],[70,60]].map(([x,y],i)=>(
        <span key={i} className="absolute h-1 w-1 rounded-full bg-[#e4cf8a]"
          style={{left:`${x}%`,top:`${y}%`,opacity:0.55+(i*0.12),boxShadow:"0 0 4px #c9a962"}} />
      ))}
      {/* Book glow */}
      <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 h-16 w-24 rounded-full bg-[#c9a962]/20 blur-2xl" />
    </div>
  );
}

function BackdropFrame() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1e3a] via-[#091528] to-[#04090f]" />
      {/* Moonlight wash */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 h-48 w-64 rounded-full bg-[#f3ead8]/[0.07] blur-3xl" />
      {/* Stars */}
      {[[10,10],[82,8],[55,5],[28,18],[70,15],[42,24]].map(([x,y],i)=>(
        <span key={i} className="absolute rounded-full bg-[#f3ead8]"
          style={{left:`${x}%`,top:`${y}%`,width:1,height:1,opacity:0.5+(i%3)*0.15}} />
      ))}
      {/* Clouds */}
      <div className="absolute left-0 top-[30%] h-12 w-32 rounded-full bg-[#142a45]/60 blur-xl" />
      <div className="absolute right-0 top-[38%] h-10 w-24 rounded-full bg-[#142a45]/50 blur-xl" />
      {/* Magical arch glow */}
      <div className="absolute inset-x-[15%] top-[12%] h-[60%] rounded-t-full border border-[#c9a962]/20" />
      <div className="absolute inset-x-[15%] top-[12%] h-[60%] rounded-t-full bg-gradient-to-b from-[#c9a962]/[0.06] to-transparent" />
    </div>
  );
}

function BackdropSilhouette() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-[#060f1e] via-[#091628] to-[#030810]" />
      {/* Big moon low horizon */}
      <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 h-24 w-24 rounded-full bg-gradient-to-br from-[#f3ead8] to-[#dcc992] opacity-70 blur-[2px]" />
      <div className="absolute bottom-[26%] left-1/2 -translate-x-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#f3ead8]/10 blur-3xl" />
      {/* Stars */}
      {[[12,8],[35,5],[58,12],[78,6],[22,18],[65,9],[48,3],[88,15]].map(([x,y],i)=>(
        <span key={i} className="absolute rounded-full bg-[#f3ead8]"
          style={{left:`${x}%`,top:`${y}%`,width:i%3===0?2:1,height:i%3===0?2:1,opacity:0.35+(i%4)*0.15}} />
      ))}
      {/* Castle silhouette */}
      <svg className="absolute bottom-[28%] left-1/2 -translate-x-1/2 opacity-60 w-24" viewBox="0 0 80 60">
        <rect x="28" y="20" width="24" height="40" fill="#0a1628"/>
        <rect x="20" y="28" width="10" height="32" fill="#0a1628"/>
        <rect x="50" y="28" width="10" height="32" fill="#0a1628"/>
        <rect x="28" y="14" width="6" height="8" fill="#0a1628"/>
        <rect x="38" y="10" width="6" height="12" fill="#0a1628"/>
        <rect x="48" y="14" width="6" height="8" fill="#0a1628"/>
      </svg>
      {/* Trees */}
      <svg className="absolute inset-x-0 bottom-0 w-full" viewBox="0 0 320 80" preserveAspectRatio="xMidYMax slice">
        <path d="M0 80 Q40 45 80 55 T160 48 T240 52 T320 45 L320 80Z" fill="#060f1e" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Child figure placeholders per style
───────────────────────────────────────────── */

function ChildIllustrated({ photoUrl }: { photoUrl: string | null }) {
  return (
    <div className="absolute bottom-[14%] left-1/2 -translate-x-1/2 w-28 sm:w-32">
      <div className="relative mx-auto h-36 w-24 sm:h-40 sm:w-28">
        {photoUrl ? (
          <div className="relative overflow-hidden rounded-full h-full w-full ring-2 ring-[#c9a962]/40 shadow-[0_0_24px_rgba(201,169,98,0.3)]">
            <Image src={photoUrl} alt="" fill sizes="100px" className="object-cover object-top" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/40 via-transparent to-transparent mix-blend-multiply" />
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#142a45]/80 ring-2 ring-[#c9a962]/30">
            <svg viewBox="0 0 40 48" className="h-16 w-12 text-[#c9a962]/50" fill="none">
              <ellipse cx="20" cy="13" rx="9" ry="10" fill="currentColor" opacity="0.6"/>
              <path d="M4 44c0-9 7-16 16-16s16 7 16 16" fill="currentColor" opacity="0.4"/>
            </svg>
          </div>
        )}
        {/* Glow halo */}
        <div className="absolute -inset-3 rounded-full bg-[#c9a962]/15 blur-xl -z-10" />
        {/* Sparkles */}
        <span className="absolute -top-2 -right-1 h-2 w-2 rounded-full bg-[#e4cf8a] blur-[1px] opacity-80" />
        <span className="absolute top-4 -left-3 h-1 w-1 rounded-full bg-[#e4cf8a] opacity-60" />
      </div>
    </div>
  );
}

function ChildFramed({ photoUrl }: { photoUrl: string | null }) {
  return (
    <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[58%]">
      {/* Ornate arch frame */}
      <div className="relative">
        {/* Gold arch */}
        <svg viewBox="0 0 120 140" className="absolute -inset-1 w-[calc(100%+8px)] -translate-x-1" aria-hidden>
          <path d="M6 140 L6 56 Q6 6 60 6 Q114 6 114 56 L114 140" fill="none" stroke="#c9a962" strokeWidth="2" opacity="0.7"/>
          <path d="M14 140 L14 58 Q14 14 60 14 Q106 14 106 58 L106 140" fill="none" stroke="#c9a962" strokeWidth="0.8" opacity="0.35"/>
          {/* Corner laurels */}
          <circle cx="6" cy="56" r="3" fill="#c9a962" opacity="0.6"/>
          <circle cx="114" cy="56" r="3" fill="#c9a962" opacity="0.6"/>
          {/* Stars on arch */}
          <circle cx="60" cy="8" r="2.5" fill="#e4cf8a" opacity="0.9"/>
          <circle cx="30" cy="18" r="1.2" fill="#e4cf8a" opacity="0.55"/>
          <circle cx="90" cy="18" r="1.2" fill="#e4cf8a" opacity="0.55"/>
        </svg>
        <div className="overflow-hidden rounded-t-full" style={{borderRadius:"50% 50% 0 0 / 60% 60% 0 0"}}>
          {photoUrl ? (
            <div className="relative aspect-[3/4] w-full">
              <Image src={photoUrl} alt="" fill sizes="120px" className="object-cover object-top" unoptimized/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1e3a]/50 via-transparent to-transparent" />
            </div>
          ) : (
            <div className="flex aspect-[3/4] w-full items-center justify-center bg-gradient-to-b from-[#1a3355] to-[#0c1e3a]">
              <svg viewBox="0 0 40 48" className="h-16 w-12 text-[#c9a962]/45" fill="none">
                <ellipse cx="20" cy="13" rx="9" ry="10" fill="currentColor" opacity="0.6"/>
                <path d="M4 44c0-9 7-16 16-16s16 7 16 16" fill="currentColor" opacity="0.4"/>
              </svg>
            </div>
          )}
        </div>
        {/* Bottom frame line */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#c9a962]/60 to-transparent" />
      </div>
    </div>
  );
}

function ChildSilhouette({ photoUrl }: { photoUrl: string | null }) {
  return (
    <div className="absolute bottom-[16%] left-[28%] -translate-x-1/2 w-20 sm:w-24">
      {photoUrl ? (
        <div className="relative overflow-hidden h-28 w-20 sm:h-32 sm:w-24" style={{
          maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 70%, transparent 100%)",
          filter: "brightness(0.15) saturate(0)",
        }}>
          <Image src={photoUrl} alt="" fill sizes="80px" className="object-cover object-top" unoptimized/>
        </div>
      ) : (
        <svg viewBox="0 0 60 90" className="h-28 sm:h-32 w-full text-[#0d2040]" fill="currentColor">
          <ellipse cx="30" cy="16" rx="11" ry="12" />
          <path d="M8 88 Q8 50 30 46 Q52 50 52 88Z"/>
        </svg>
      )}
      {/* Glow on ground */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-4 w-12 rounded-full bg-[#c9a962]/20 blur-lg"/>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Book cover mockup shell
───────────────────────────────────────────── */

function CoverCard({
  title,
  optionLabel,
  description,
  selected,
  onSelect,
  photoUrl,
  backdropSlot,
  childSlot,
  delay = 0,
}: {
  title: string;
  optionLabel: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
  photoUrl: string | null;
  backdropSlot: React.ReactNode;
  childSlot: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay }}
      className="flex flex-col items-center"
    >
      {/* Book mockup */}
      <motion.div
        className="relative w-full max-w-[220px] sm:max-w-[240px]"
        style={{ perspective: "1200px" }}
        animate={{ rotateY: selected ? 0 : -6 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      >
        {/* Shadow */}
        <div className="absolute -bottom-6 left-1/2 h-8 w-[85%] -translate-x-1/2 rounded-[100%] bg-black/50 blur-xl" />

        {/* Book shell */}
        <div
          className={`relative rounded-r-[1.2rem] rounded-l-sm p-[2.5px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] transition-all duration-300 ${
            selected
              ? "ring-2 ring-[#c9a962]/70 shadow-[0_0_40px_rgba(201,169,98,0.25)]"
              : "ring-1 ring-white/10"
          }`}
          style={{
            background: selected
              ? "linear-gradient(145deg,#e4cf8a,#c9a962,#a88b4a,#d4c08a)"
              : "linear-gradient(145deg,#2a3f5c,#1a2d45,#0d1e30)",
          }}
        >
          <div className="relative overflow-hidden rounded-r-[1.05rem] rounded-l-[2px]" style={{ minHeight: 280 }}>
            {/* Background art */}
            {backdropSlot}

            {/* Noise texture */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.045]"
              style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
            />

            {/* Spine shadow */}
            <div className="absolute bottom-0 left-0 top-0 w-3 bg-gradient-to-r from-black/45 to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center px-4 pb-5 pt-3" style={{ minHeight: 280 }}>
              {/* Masthead */}
              <p className="text-[8px] font-semibold uppercase tracking-[0.38em] text-[#c9a962]/90">Moonora</p>

              {/* Child art */}
              <div className="relative w-full flex-1" style={{ minHeight: 160 }}>
                {childSlot}
              </div>

              {/* Title */}
              <motion.p
                layout
                className="mt-auto text-center font-serif text-[0.9rem] leading-tight text-[#f3ead8] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-[1rem]"
              >
                {title}
              </motion.p>

              {/* Decorative rule */}
              <div className="mx-auto mt-2 h-px w-10 bg-gradient-to-r from-transparent via-[#c9a962]/60 to-transparent" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Label + description + button */}
      <div className="mt-6 w-full max-w-[240px] text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c9a962]/80">
          {optionLabel}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-[#f3ead8]/55">{description}</p>
        <button
          onClick={onSelect}
          className={`mt-4 w-full rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
            selected
              ? "border-[#c9a962]/70 bg-gradient-to-r from-[#c9a962] to-[#e4cf8a] text-[#040c18] shadow-[0_0_28px_rgba(201,169,98,0.35)]"
              : "border-white/15 bg-white/[0.04] text-[#f3ead8]/80 hover:border-[#c9a962]/40 hover:bg-white/[0.07]"
          }`}
        >
          {selected ? "✓ Selected" : "Select this cover"}
        </button>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main export
───────────────────────────────────────────── */

export function CoverOptionsSection({ photoUrl, name }: { photoUrl: string | null; name: string }) {
  const [selected, setSelected] = useState<0 | 1 | 2>(0);
  const title = name.trim() ? `${name.trim()} and the Moon Forest` : "The Moon Forest";

  const covers = [
    {
      optionLabel: "Option 1 — Full Illustration",
      description: "Your child becomes a cinematic Pixar-style character inside the story world — the most emotional and immersive cover.",
      backdrop: <BackdropIllustration />,
      child: <ChildIllustrated photoUrl={photoUrl} />,
    },
    {
      optionLabel: "Option 2 — Magic Portrait Frame",
      description: "Your child's portrait sits inside an elegant gold arch — premium, luxury, and beautifully integrated.",
      backdrop: <BackdropFrame />,
      child: <ChildFramed photoUrl={photoUrl} />,
    },
    {
      optionLabel: "Option 3 — Dreamy Silhouette",
      description: "A cinematic silhouette against a moonlit sky — mysterious, elegant, and emotionally powerful.",
      backdrop: <BackdropSilhouette />,
      child: <ChildSilhouette photoUrl={photoUrl} />,
    },
  ] as const;

  return (
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-night-950 via-[#060e1c] to-night-950" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[#c9a962]/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-[#c9a962]/80">
            <span className="h-px w-8 bg-[#c9a962]/40" />
            3 Cover Options
            <span className="h-px w-8 bg-[#c9a962]/40" />
          </p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-[#f3ead8] sm:text-4xl">
            Choose how your child appears on the cover.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#f3ead8]/50 sm:text-base">
            Each option is finished by hand in our studio — your photo is never shown as a plain circle.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-6 lg:gap-10">
          {covers.map((c, i) => (
            <CoverCard
              key={i}
              title={title}
              optionLabel={c.optionLabel}
              description={c.description}
              selected={selected === i}
              onSelect={() => setSelected(i as 0 | 1 | 2)}
              photoUrl={photoUrl}
              backdropSlot={c.backdrop}
              childSlot={c.child}
              delay={i * 0.12}
            />
          ))}
        </div>

        {/* Recommendation note */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-14 max-w-2xl rounded-2xl border border-[#c9a962]/15 bg-[#c9a962]/[0.04] px-6 py-5"
        >
          <p className="flex items-start gap-3 text-sm leading-relaxed text-[#f3ead8]/65">
            <span className="mt-0.5 shrink-0 text-base">💡</span>
            <span>
              <span className="font-medium text-[#f3ead8]/90">Our recommendation:</span>{" "}
              We suggest the <span className="text-[#c9a962]">Full Illustration Cover</span> for the most magical, immersive result — or the{" "}
              <span className="text-[#c9a962]">Magic Portrait Frame</span> if you want your child's real photo to remain clearly visible on the cover.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
