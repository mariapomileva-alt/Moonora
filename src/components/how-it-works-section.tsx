"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Upload your child’s photo",
    body: "A gentle, well-lit portrait is all we need. Our artists weave them into every spread with care.",
    icon: "photo",
  },
  {
    title: "Choose a magical adventure",
    body: "Select a world that fits their imagination — moonlit forests, secret islands, and soft wonder.",
    icon: "spark",
  },
  {
    title: "Receive a printed hardcover",
    body: "A weighty keepsake arrives at your door: foil details, archival paper, a story they’ll outgrow but never forget.",
    icon: "book",
  },
] as const;

function StepIcon({ type }: { type: (typeof steps)[number]["icon"] }) {
  const common = "h-10 w-10 text-gold";
  if (type === "photo") {
    return (
      <svg className={common} viewBox="0 0 40 40" fill="none" aria-hidden>
        <rect x="6" y="10" width="28" height="22" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
        <circle cx="20" cy="21" r="5" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
        <path d="M10 32h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      </svg>
    );
  }
  if (type === "spark") {
    return (
      <svg className={common} viewBox="0 0 40 40" fill="none" aria-hidden>
        <path
          d="M20 4 L22 14 L32 16 L22 18 L20 28 L18 18 L8 16 L18 14 Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
          fill="currentColor"
          fillOpacity="0.12"
        />
        <motion.circle
          cx="28"
          cy="10"
          r="1.5"
          fill="currentColor"
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 40 40" fill="none" aria-hidden>
      <path
        d="M8 12h24v20H8z"
        stroke="currentColor"
        strokeWidth="1.5"
        rx="2"
        opacity="0.85"
      />
      <path d="M20 12v20" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <path d="M12 8h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

const easeLux = [0.22, 1, 0.36, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.65, ease: easeLux },
  }),
};

export function HowItWorksSection() {
  return (
    <section id="how" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-night-950 via-night-900/80 to-night-950" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold/85">How it works</p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-cream sm:text-4xl">
            From a single photograph to a shelf they reach for every night.
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.article
              key={s.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-b from-night-800/60 to-night-950/80 p-8 shadow-[0_0_0_1px_rgba(201,169,98,0.06)_inset]"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/5 blur-2xl transition group-hover:bg-gold/10" />
              <motion.div
                className="mb-6 inline-flex rounded-2xl border border-gold/20 bg-night-900/80 p-3"
                whileHover={{ scale: 1.04, rotate: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                <StepIcon type={s.icon} />
              </motion.div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gold/70">Step {i + 1}</p>
              <h3 className="mt-2 font-serif text-xl text-cream">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/55">{s.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
