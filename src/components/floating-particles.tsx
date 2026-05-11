"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

function makeParticles(count: number, seed: number) {
  let s = seed;
  const rnd = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rnd() * 100,
    delay: rnd() * 8,
    duration: 14 + rnd() * 12,
    size: 2 + rnd() * 3,
    opacity: 0.08 + rnd() * 0.12,
    drift: (rnd() - 0.5) * 60,
  }));
}

export function FloatingParticles({ count = 14 }: { count?: number }) {
  const [seed, setSeed] = useState(7);
  useEffect(() => {
    setSeed(Date.now() % 99991);
  }, [count]);

  const items = useMemo(() => makeParticles(count, seed), [count, seed]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((p) => (
        <motion.div
          key={`${p.id}-${seed}`}
          className="absolute rounded-full bg-gradient-to-br from-moon/40 to-gold/20 blur-[1px]"
          style={{
            left: `${p.x}%`,
            bottom: "-5%",
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{ y: ["0vh", "-120vh"], x: [0, p.drift] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
