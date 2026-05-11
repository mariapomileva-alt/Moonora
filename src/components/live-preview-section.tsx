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

function FairytaleCoverBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-r-[1.15rem] rounded-l-sm"
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#243d62] via-[#142a45] to-[#070f1c]" />
      {/* Mist */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0a1628]/90 via-transparent to-transparent" />
      {/* Moon glow */}
      <div className="absolute -right-6 -top-8 h-36 w-36 rounded-full bg-moon/25 blur-3xl" />
      <div className="absolute right-4 top-5 h-14 w-14 rounded-full bg-gradient-to-br from-moon to-cream-soft opacity-[0.92] shadow-[0_0_40px_rgba(243,234,216,0.35)]" />
      <div className="absolute right-6 top-7 h-11 w-11 rounded-full bg-night-900/25" />

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

            <div className="relative z-10 flex min-h-[420px] flex-col px-5 pb-6 pt-6 sm:min-h-[440px] sm:px-6 sm:pb-7 sm:pt-7">
              <p className="text-center text-[9px] font-semibold uppercase tracking-[0.35em] text-gold/90">
                Moonora
              </p>

              <div className="mt-5 flex justify-center">
                <div className="relative h-[5.75rem] w-[5.75rem] shrink-0 overflow-hidden rounded-full border-2 border-gold/45 bg-night-800/90 shadow-[0_12px_40px_rgba(0,0,0,0.45)] ring-4 ring-black/30 ring-offset-2 ring-offset-[#142a45]/80 sm:h-24 sm:w-24">
                  <AnimatePresence mode="wait">
                    {photoUrl ? (
                      <motion.div
                        key="img"
                        initial={{ opacity: 0, scale: 1.05 }}
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
                        className="flex h-full w-full items-center justify-center bg-gradient-to-b from-night-800 to-night-950"
                      >
                        <span className="px-3 text-center text-[9px] uppercase tracking-widest text-cream/35">
                          Photo
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <motion.h3
                layout
                className="mt-5 text-center font-serif text-[1.2rem] leading-[1.2] tracking-tight text-cream drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-[1.35rem]"
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
                  className="mt-4 space-y-2 px-0.5"
                >
                  <p className="text-center font-serif text-[0.8125rem] italic leading-snug text-cream/85 sm:text-sm">
                    {line1}
                  </p>
                  <p className="text-center text-[11px] leading-relaxed text-cream/60 sm:text-xs">{line2}</p>
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
