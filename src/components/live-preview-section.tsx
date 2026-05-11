"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

const languages = ["English", "Deutsch", "Français", "Español", "Italiano"];

export function LivePreviewSection() {
  const [name, setName] = useState("Kira");
  const [age, setAge] = useState("5");
  const [language, setLanguage] = useState("English");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const onFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setPhotoUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
  }, []);

  const displayName = name.trim() || "Your child";
  const coverTitle = useMemo(() => `${displayName} and the Moon Forest`, [displayName]);

  return (
    <section id="preview" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-night-950 via-night-900 to-night-950" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold/85">Live preview</p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-cream sm:text-4xl">
            See the cover take shape — before we ever go to print.
          </h2>
        </motion.div>

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="rounded-3xl border border-white/[0.07] bg-night-800/30 p-6 sm:p-8 glass-subtle"
          >
            <label className="block text-sm font-medium text-cream/80">Child’s photo</label>
            <label className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-cream/20 bg-night-950/50 px-4 py-10 transition hover:border-gold/35 hover:bg-night-900/40">
              <input type="file" accept="image/*" className="sr-only" onChange={onFile} />
              <span className="text-sm text-cream/50">Drop or tap to upload</span>
              <span className="mt-1 text-xs text-cream/35">JPG or PNG · private preview</span>
            </label>

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="child-name" className="text-sm font-medium text-cream/80">
                  Child’s name
                </label>
                <input
                  id="child-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-night-950/80 px-4 py-3 text-cream outline-none ring-gold/30 transition placeholder:text-cream/30 focus:border-gold/40 focus:ring-2"
                  placeholder="First name"
                  autoComplete="given-name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="child-age" className="text-sm font-medium text-cream/80">
                    Age
                  </label>
                  <input
                    id="child-age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-night-950/80 px-4 py-3 text-cream outline-none focus:border-gold/40 focus:ring-2 focus:ring-gold/30"
                    inputMode="numeric"
                  />
                </div>
                <div>
                  <label htmlFor="lang" className="text-sm font-medium text-cream/80">
                    Language
                  </label>
                  <select
                    id="lang"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-night-950/80 px-4 py-3 text-cream outline-none focus:border-gold/40 focus:ring-2 focus:ring-gold/30"
                  >
                    {languages.map((l) => (
                      <option key={l} value={l} className="bg-night-900">
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-cream/40">
              This is a stylized mock preview. Final art is refined by our studio — same warmth, finer detail.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="flex flex-col items-center justify-center lg:pt-4"
            style={{ perspective: "1400px" }}
          >
            <BookMockup photoUrl={photoUrl} title={coverTitle} age={age} language={language} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BookMockup({
  photoUrl,
  title,
  age,
  language,
}: {
  photoUrl: string | null;
  title: string;
  age: string;
  language: string;
}) {
  return (
    <div className="relative w-full max-w-[320px] sm:max-w-[340px]">
      <motion.div
        className="relative mx-auto"
        initial={{ rotateY: -14, rotateX: 6 }}
        whileInView={{ rotateY: -8, rotateX: 3 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 38, damping: 18 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute -bottom-8 left-1/2 h-10 w-[90%] -translate-x-1/2 rounded-[100%] bg-black/55 blur-2xl" />

        <div className="relative rounded-r-[1.35rem] rounded-l-md bg-gradient-to-r from-night-800 via-night-900 to-night-950 p-[3px] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.85)] ring-1 ring-white/10">
          <div className="relative overflow-hidden rounded-r-[1.2rem] rounded-l-sm bg-gradient-to-br from-[#1a3352] via-night-900 to-night-950">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Spine hint */}
            <div className="absolute bottom-0 left-0 top-0 w-3 bg-gradient-to-r from-black/35 to-transparent" />

            <div className="relative flex flex-col gap-6 p-7 sm:p-8 sm:pb-9">
              <div className="flex items-start gap-4">
                <div className="relative h-[5.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-lg border border-gold/35 bg-night-800 shadow-lg ring-1 ring-black/40 sm:h-24 sm:w-20">
                  <AnimatePresence mode="wait">
                    {photoUrl ? (
                      <motion.div
                        key="img"
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="relative h-full w-full"
                      >
                        <Image src={photoUrl} alt="" fill sizes="120px" className="object-cover" unoptimized />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="ph"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex h-full w-full items-center justify-center bg-night-800"
                      >
                        <span className="px-2 text-center text-[9px] uppercase tracking-widest text-cream/30">
                          Your photo
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold/90">Moonora</p>
                  <motion.h3 layout className="mt-2 font-serif text-[1.15rem] leading-snug tracking-tight text-cream sm:text-xl">
                    {title}
                  </motion.h3>
                </div>
              </div>

              <div className="mt-auto border-t border-white/10 pt-5">
                <p className="text-[11px] leading-relaxed text-cream/45">
                  Personalized edition · Age {age || "—"} · {language}
                </p>
                <div className="mt-3 h-0.5 w-14 rounded-full bg-gradient-to-r from-gold to-gold-bright" />
              </div>
            </div>

            {/* Soft corner glow */}
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-gold/15 blur-3xl" />
          </div>
        </div>
      </motion.div>

      <motion.p
        className="mt-12 text-center text-sm text-cream/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Hardcover · debossed title · 170gsm archival pages
      </motion.p>
    </div>
  );
}
