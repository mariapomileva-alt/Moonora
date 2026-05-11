"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Star = { id: number; x: number; y: number; size: number; duration: number; delay: number };

function makeStars(density: number, seed = 1): Star[] {
  let s = seed;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const out: Star[] = [];
  for (let i = 0; i < density; i++) {
    out.push({
      id: i,
      x: rnd() * 100,
      y: rnd() * 100,
      size: rnd() * 2 + 0.5,
      duration: 3 + rnd() * 5,
      delay: rnd() * 5,
    });
  }
  return out;
}

export function StarsField({ className = "", density = 48 }: { className?: string; density?: number }) {
  const [stars, setStars] = useState<Star[]>(() => makeStars(density, 42));

  useEffect(() => {
    setStars(makeStars(density, Date.now() % 100000));
  }, [density]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {stars.map((s) => (
        <motion.span
          key={`${s.id}-${s.x.toFixed(2)}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            boxShadow: `0 0 ${s.size * 4}px rgba(255,255,255,0.5)`,
          }}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.95, 0.35, 0.8, 0.2], scale: [1, 1.2, 1, 1.1, 1] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
