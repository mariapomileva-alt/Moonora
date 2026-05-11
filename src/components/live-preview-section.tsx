"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

const languages = ["English", "Deutsch", "Français", "Español", "Italiano"];

function getPreviewBlurb(
  name: string,
  ageStr: string,
  language: string
): { line1: string; line2: string } {
  const trimmed = name.trim();
  const digits = ageStr.replace(/\D/g, "");
  const age = digits ? parseInt(digits, 10) : NaN;
  const a = Number.isFinite(age) ? age : 5;

  if (!trimmed) {
    const neutral: Record<string, [string, string]> = {
      English: [
        "Before any name is set in type, the Moon Forest already waits for your voice at bedtime.",
        "Glow-moss, kindly shadows — in the printed book, the hero will wear your child’s smile from the photo you send.",
      ],
      Deutsch: [
        "Bevor ein Name im Satz steht, lauscht der Mondwald schon dem ersten Kapitel beim Vorlesen.",
        "Sternenmoos und leise Schritte — im gedruckten Buch wird der Held aus eurem Foto lebendig.",
      ],
      Français: [
        "Avant qu’un prénom ne soit posé sur la page, la forêt de lune attend déjà votre voix du soir.",
        "Brumes d’argent et créatures douces — au livre final, le héros portera le regard de votre enfant.",
      ],
      Español: [
        "Antes de que un nombre se imprima, el bosque de la luna ya escucha la voz que lee en voz baja.",
        "Musgo luminoso y sombras amables — en el libro impreso, el héroe llevará la sonrisa de vuestra foto.",
      ],
      Italiano: [
        "Prima che un nome compaia in pagina, la foresta di luna aspetta già la voce della buonanotte.",
        "Muschio di luce e ombre gentili — nel libro stampato, l’eroe avrà lo sguardo della vostra foto.",
      ],
    };
    const pair = neutral[language] ?? neutral.English;
    return { line1: pair[0], line2: pair[1] };
  }

  const safe = trimmed;

  const byLang: Record<string, [string, string][]> = {
    English: [
      [
        `When ${safe} enters the Moon Forest, the paths rearrange like pages turning in a dream.`,
        `Glow-moss, kindly shadows, and one lullaby of a quest — written to be read aloud at the edge of sleep.`,
      ],
      [
        `A crown of dew, a lantern of wishes: tonight the trees remember ${safe} by name.`,
        `Each spread holds its breath until your voice finds the next line.`,
      ],
    ],
    Deutsch: [
      [
        `${safe} betritt den Mondwald — und die Pfade ordnen sich wie Papier unter sanften Fingern.`,
        `Sternenmoos, leise Wesen, eine Geschichte, die nach dem letzten Licht noch weiterflüstert.`,
      ],
    ],
    Français: [
      [
        `Quand ${safe} franchit la lisière, la forêt de lune déplie ses sentiers comme un livre ouvert.`,
        `Brumes d’argent, créatures douces, et une quête à murmurer jusqu’au sommeil.`,
      ],
    ],
    Español: [
      [
        `Cuando ${safe} pisa el bosque de la luna, los senderos se reordenan como páginas de un sueño.`,
        `Musgo luminoso, sombras amables — un cuento para la hora en que el día se apaga.`,
      ],
    ],
    Italiano: [
      [
        `Quando ${safe} entra nella foresta di luna, i sentieri si aprono come pagine scritte col respiro.`,
        `Muschio di luce, ombre gentili — una fiaba da leggere piano, fino all’ultima stella.`,
      ],
    ],
  };

  const list = byLang[language] ?? byLang.English;
  const idx = (a + safe.length) % list.length;
  return { line1: list[idx][0], line2: list[idx][1] };
}

/** Ornate “magic window” frame — stars + gold border + soft arch (cover option 2 style). */
function MagicPhotoFrame({
  children,
  className = "",
  size = "md",
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** md = form upload, lg = book mockup */
  size?: "md" | "lg";
  /** Subtle hover scale when wrapped in .group (upload zone) */
  interactive?: boolean;
}) {
  const scale = size === "lg" ? "max-w-[11.5rem] sm:max-w-[12.5rem]" : "max-w-[13.5rem]";

  return (
    <div
      className={`relative mx-auto w-full ${scale} ${interactive ? "transition-transform duration-300 will-change-transform group-hover:scale-[1.01]" : ""} ${className}`}
    >
      <div className="pointer-events-none absolute -inset-3 rounded-[2.25rem] bg-gold/20 blur-2xl opacity-60" aria-hidden />

      <div className="pointer-events-none absolute inset-[3px] overflow-hidden rounded-[1.5rem] rounded-t-[2.35rem] bg-gradient-to-b from-[#1c3355] via-[#132742] to-[#0a1524]">
        <div className="absolute inset-0 opacity-[0.55]">
          {[
            [12, 14],
            [28, 22],
            [88, 12],
            [72, 28],
            [55, 8],
            [102, 18],
            [44, 36],
          ].map(([x, y], i) => (
            <span
              key={i}
              className="absolute rounded-full bg-moon"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: i % 3 === 0 ? 2 : 1,
                height: i % 3 === 0 ? 2 : 1,
                opacity: 0.25 + (i % 4) * 0.12,
                boxShadow: "0 0 6px rgba(243,234,216,0.35)",
              }}
            />
          ))}
        </div>
        <div className="absolute -right-8 top-4 h-20 w-28 rounded-full bg-white/[0.04] blur-2xl" />
        <div className="absolute -left-6 bottom-8 h-16 w-24 rounded-full bg-gold/[0.06] blur-2xl" />
      </div>

      <div
        className="relative rounded-[1.45rem] rounded-t-[2.2rem] p-[3px] shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
        style={{
          background:
            "linear-gradient(155deg, #e8d7a8 0%, #c9a962 38%, #a88b4a 55%, #d4c08a 100%)",
        }}
      >
        <div className="relative overflow-hidden rounded-[1.3rem] rounded-t-[2.05rem] bg-[#0d1c2e]/95 ring-1 ring-black/40">
          <div className={size === "lg" ? "aspect-[4/5] w-full min-h-[11.5rem] sm:min-h-[12.5rem]" : "aspect-[4/5] w-full min-h-[12.5rem]"}>
            {children}
          </div>
        </div>
      </div>

      <svg
        className="pointer-events-none absolute -left-0.5 top-0 z-10 h-9 w-9 text-gold/55"
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden
      >
        <path d="M8 28C8 10 12 6 22 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M6 26c4-2 6-8 10-10" stroke="currentColor" strokeWidth="0.7" opacity="0.6" strokeLinecap="round" />
      </svg>
      <svg
        className="pointer-events-none absolute -right-0.5 top-0 z-10 h-9 w-9 scale-x-[-1] text-gold/55"
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden
      >
        <path d="M8 28C8 10 12 6 22 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M6 26c4-2 6-8 10-10" stroke="currentColor" strokeWidth="0.7" opacity="0.6" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/** Printed cover portrait — gold arch only, no “editor” stars / glow (option 2, book side). */
function CoverPrintedFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[13.25rem] sm:w-[14.25rem]">
      <div
        className="relative rounded-[1.38rem] rounded-t-[2.08rem] p-[2px] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_14px_40px_rgba(0,0,0,0.5)]"
        style={{
          background: "linear-gradient(158deg, #f2e6c8 0%, #d4b87a 32%, #b89652 58%, #e4cf8a 100%)",
        }}
      >
        <div className="relative overflow-hidden rounded-[1.28rem] rounded-t-[1.98rem] bg-gradient-to-b from-[#142a45] to-[#070f18] p-[1px] ring-1 ring-black/50">
          <div className="relative overflow-hidden rounded-[1.22rem] rounded-t-[1.92rem] bg-gradient-to-b from-night-800/80 to-night-950">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-night-950/40" />
            <div className="relative aspect-[4/5] w-full min-h-[13rem] sm:min-h-[14rem]">{children}</div>
          </div>
        </div>
      </div>
      <div className="mt-2.5 flex justify-center gap-1.5 opacity-50" aria-hidden>
        <span className="h-1 w-1 rounded-full bg-gold" />
        <span className="h-1 w-1 rounded-full bg-gold" />
        <span className="h-1 w-1 rounded-full bg-gold" />
      </div>
    </div>
  );
}

function FairytaleCoverBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-r-[1.15rem] rounded-l-sm"
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#243d62] via-[#142a45] to-[#070f1c]" />
      {/* Mist */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0a1628]/90 via-transparent to-transparent" />
      <svg className="absolute inset-0 h-full w-full opacity-[0.55]" viewBox="0 0 320 400" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="pvTrees" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a1628" stopOpacity="0" />
            <stop offset="100%" stopColor="#050a14" stopOpacity="0.95" />
          </linearGradient>
        </defs>
        {[12, 48, 88, 120, 200, 240, 280, 160, 72, 220].map((x, i) => (
          <circle
            key={i}
            cx={x + (i % 3) * 8}
            cy={28 + (i % 5) * 22}
            r={i % 3 === 0 ? 1.2 : 0.7}
            fill="#f3ead8"
            opacity={0.35 + (i % 4) * 0.12}
          />
        ))}
        <path
          d="M0 280 Q40 240 80 265 T160 250 T240 268 T320 255 L320 400 L0 400 Z"
          fill="url(#pvTrees)"
          opacity="0.85"
        />
        <path
          d="M0 295 Q60 255 120 278 T220 268 T320 275 L320 400 L0 400 Z"
          fill="#0f2138"
          opacity="0.9"
        />
      </svg>

      {/* Gold corner filigree hint */}
      <div className="absolute left-3 top-3 h-16 w-16 rounded-tl-lg border-l-2 border-t-2 border-gold/25" />
      <div className="absolute bottom-3 right-3 h-14 w-14 rounded-br-lg border-b-2 border-r-2 border-gold/20" />
    </div>
  );
}

export function LivePreviewSection() {
  const [name, setName] = useState("");
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

  const coverTitle = useMemo(
    () => (name.trim() ? `${name.trim()} and the Moon Forest` : "The Moon Forest"),
    [name]
  );
  const blurb = useMemo(() => getPreviewBlurb(name, age, language), [name, age, language]);

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
            <p className="text-sm font-medium text-cream/80">Child’s photo</p>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/35">
              Upload · not the printed cover
            </p>
            <label className="group relative mt-1 block w-full cursor-pointer">
              <input type="file" accept="image/*" className="sr-only" onChange={onFile} />
              <MagicPhotoFrame size="md" interactive>
                {photoUrl ? (
                  <div className="relative h-full min-h-[inherit] w-full">
                    <Image
                      src={photoUrl}
                      alt=""
                      fill
                      className="object-cover object-top"
                      sizes="200px"
                      unoptimized
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night-950/90 to-transparent py-3 text-center">
                      <span className="text-[10px] font-medium uppercase tracking-widest text-gold/90">
                        Tap to replace
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full min-h-[12.5rem] flex-col items-center justify-center gap-2 px-4 py-6 text-center">
                    <span className="rounded-full border border-dashed border-gold/40 bg-night-950/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/80">
                      Your portrait
                    </span>
                    <span className="text-sm text-cream/60">Drop or tap to upload</span>
                    <span className="text-xs text-cream/38">JPG or PNG · private preview</span>
                  </div>
                )}
              </MagicPhotoFrame>
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
              Stylized mock preview — final art is hand-finished in our studio (no AI on this screen).
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
            <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-gold/65">
              Printed cover preview
            </p>
            <BookMockup
              photoUrl={photoUrl}
              title={coverTitle}
              age={age}
              language={language}
              line1={blurb.line1}
              line2={blurb.line2}
            />
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
  line1,
  line2,
}: {
  photoUrl: string | null;
  title: string;
  age: string;
  language: string;
  line1: string;
  line2: string;
}) {
  return (
    <div className="relative w-full max-w-[300px] sm:max-w-[320px]">
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
          <div className="relative min-h-[420px] overflow-hidden rounded-r-[1.15rem] rounded-l-sm sm:min-h-[440px]">
            <FairytaleCoverBackdrop />

            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />

            <div className="absolute bottom-0 left-0 top-0 w-3 bg-gradient-to-r from-black/40 to-transparent" />

            <div className="relative z-10 flex min-h-[420px] flex-col px-5 pb-6 pt-5 sm:min-h-[460px] sm:px-6 sm:pb-7 sm:pt-6">
              {/* Printed cover masthead — not the upload editor */}
              <div className="relative mb-1 flex h-9 shrink-0 items-center justify-center">
                <svg
                  className="pointer-events-none absolute left-0 top-1 h-8 w-10 text-gold/45"
                  viewBox="0 0 40 32"
                  fill="none"
                  aria-hidden
                >
                  <path d="M4 6v18M4 6h18" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
                </svg>
                <p className="text-center text-[9px] font-semibold uppercase tracking-[0.42em] text-gold/95">
                  Moonora
                </p>
                <div
                  className="pointer-events-none absolute right-0 top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-night-950/50 ring-1 ring-gold/25"
                  aria-hidden
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-moon" fill="currentColor">
                    <path d="M18.5 12.5c0 4.5-3.5 8.5-8 9.5 3-1.5 5-5 5-9 0-4-2-7.5-5-9 4.5 1 8 4.5 8 8.5z" opacity="0.95" />
                  </svg>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <CoverPrintedFrame>
                  <AnimatePresence mode="wait">
                    {photoUrl ? (
                      <motion.div
                        key="img"
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="relative h-full min-h-[13rem] w-full sm:min-h-[14rem]"
                      >
                        <Image
                          src={photoUrl}
                          alt=""
                          fill
                          sizes="180px"
                          className="object-cover object-top"
                          unoptimized
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="ph"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex min-h-[13rem] w-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-[#1a3050]/90 to-night-950 px-4 py-8 sm:min-h-[14rem]"
                      >
                        <span className="font-serif text-sm italic text-cream/45">Portrait on cover</span>
                        <span className="text-center text-[10px] uppercase tracking-[0.2em] text-cream/30">
                          Add a photo in the editor
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CoverPrintedFrame>
              </div>

              <motion.h3
                layout
                className="mt-6 text-center font-serif text-[1.28rem] leading-[1.15] tracking-tight text-cream drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)] sm:text-[1.42rem]"
              >
                {title}
              </motion.h3>

              <AnimatePresence mode="wait">
                <motion.div
                  key={line1 + line2}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.35 }}
                  className="mt-4 space-y-2.5 px-0.5"
                >
                  <p className="text-center font-serif text-[0.8125rem] italic leading-relaxed text-cream/90 sm:text-[0.9rem]">
                    {line1}
                  </p>
                  <p className="text-center text-[11px] leading-relaxed text-cream/58 sm:text-xs">{line2}</p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-auto border-t border-white/10 pt-4">
                <p className="text-center text-[10px] leading-relaxed text-cream/45">
                  Personalized edition · Age {age.replace(/\D/g, "") || "—"} · {language}
                </p>
                <div className="mx-auto mt-3 h-0.5 w-16 rounded-full bg-gradient-to-r from-gold to-gold-bright" />
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-12 -right-8 h-44 w-44 rounded-full bg-gold/12 blur-3xl" />
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
