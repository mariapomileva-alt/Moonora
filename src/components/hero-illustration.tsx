"use client";

import { motion } from "framer-motion";

/** Cinematic SVG scene: bedroom at night, parent reading glowing book to child */
export function HeroIllustration() {
  return (
    <motion.div
      className="relative mx-auto aspect-[5/4] w-full max-w-xl lg:max-w-none"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg
        viewBox="0 0 560 480"
        className="h-auto w-full drop-shadow-[0_0_60px_rgba(201,169,98,0.12)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f3ead8" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#f3ead8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0a1628" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#152a45" />
            <stop offset="45%" stopColor="#0f2138" />
            <stop offset="100%" stopColor="#050a14" />
          </linearGradient>
          <linearGradient id="lampWarm" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e4cf8a" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#c9a962" stopOpacity="0" />
          </linearGradient>
          <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
          <filter id="bookGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="14" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="560" height="480" fill="url(#sky)" rx="24" />

        {/* Moon */}
        <circle cx="420" cy="88" r="36" fill="#f3ead8" opacity="0.95" />
        <circle cx="420" cy="88" r="72" fill="url(#moonGlow)" opacity="0.7" />

        {/* Clouds */}
        <g opacity="0.35" filter="url(#softBlur)">
          <ellipse cx="120" cy="100" rx="70" ry="22" fill="#8fa3bd" />
          <ellipse cx="200" cy="95" rx="90" ry="28" fill="#8fa3bd" />
          <ellipse cx="300" cy="110" rx="60" ry="18" fill="#6b7f9a" />
        </g>

        {/* Bed frame */}
        <path
          d="M80 340 L480 340 L480 400 L80 400 Z"
          fill="#0f2138"
          stroke="rgba(235,227,214,0.12)"
          strokeWidth="1"
        />
        <path d="M70 340 L490 340 L490 355 L70 355 Z" fill="#152a45" />

        {/* Mattress / blanket */}
        <path
          d="M95 318 Q280 280 465 318 L465 340 L95 340 Z"
          fill="#1a3352"
          stroke="rgba(201,169,98,0.2)"
          strokeWidth="1"
        />
        <path
          d="M100 325 Q280 295 460 325 L455 340 L105 340 Z"
          fill="url(#sky)"
          opacity="0.5"
        />

        {/* Teddy */}
        <ellipse cx="150" cy="305" rx="28" ry="32" fill="#2a3f5c" />
        <circle cx="150" cy="275" r="22" fill="#2a3f5c" />
        <circle cx="142" cy="268" r="4" fill="#ebe3d6" opacity="0.5" />
        <circle cx="158" cy="268" r="4" fill="#ebe3d6" opacity="0.5" />

        {/* Lamp */}
        <rect x="470" y="220" width="8" height="120" rx="2" fill="#3d4f6a" />
        <path d="M450 220 L498 220 L524 280 L424 280 Z" fill="#2a3f5c" stroke="rgba(235,227,214,0.15)" />
        <ellipse cx="474" cy="290" rx="55" ry="70" fill="url(#lampWarm)" />

        {/* Parent silhouette (simplified) */}
        <path
          d="M320 200 Q360 180 380 220 L395 340 L340 340 L330 250 Q310 230 320 200 Z"
          fill="#0a1628"
          opacity="0.92"
        />
        <ellipse cx="350" cy="175" rx="22" ry="24" fill="#0a1628" opacity="0.92" />

        {/* Child */}
        <path
          d="M260 260 Q280 240 295 265 L305 340 L245 340 L250 280 Q255 265 260 260 Z"
          fill="#0f2138"
          opacity="0.95"
        />
        <circle cx="278" cy="248" r="18" fill="#0f2138" opacity="0.95" />

        {/* Open book — hero glow */}
        <g filter="url(#bookGlow)">
          <path
            d="M270 270 L310 265 L315 310 L272 318 Z"
            fill="#1e3a5c"
            stroke="rgba(228,207,138,0.6)"
            strokeWidth="1.5"
          />
          <path
            d="M310 265 L350 270 L348 318 L315 310 Z"
            fill="#152a45"
            stroke="rgba(228,207,138,0.45)"
            strokeWidth="1.5"
          />
          <path d="M310 265 L310 312" stroke="rgba(243,234,216,0.35)" strokeWidth="1" />
        </g>
        <ellipse cx="310" cy="288" rx="40" ry="28" fill="#e4cf8a" opacity="0.25" />

        {/* Window soft light */}
        <rect x="40" y="80" width="100" height="120" rx="4" fill="#0a1628" stroke="rgba(235,227,214,0.1)" />
        <path d="M90 80 L90 200 M40 140 L140 140" stroke="rgba(235,227,214,0.08)" strokeWidth="1" />
      </svg>

      {/* Floating stars overlay on illustration */}
      <motion.div
        className="absolute -right-4 top-8 h-24 w-24 rounded-full bg-gold/20 blur-2xl"
        animate={{ opacity: [0.3, 0.6, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -left-6 bottom-24 h-32 w-32 rounded-full bg-moon/15 blur-3xl"
        animate={{ opacity: [0.2, 0.45, 0.25] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
