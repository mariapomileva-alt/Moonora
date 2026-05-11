type MoonoraLogoProps = {
  className?: string;
  /** sm = header/footer, md = hero, lg = display */
  size?: "sm" | "md" | "lg";
};

const sizeClass = {
  sm: "text-xl sm:text-2xl",
  md: "text-2xl sm:text-3xl",
  lg: "text-4xl sm:text-5xl",
} as const;

/**
 * Single brand lockup: gold serif “Moonora” + arc and star (same everywhere on the site).
 */
export function MoonoraLogo({ className = "", size = "sm" }: MoonoraLogoProps) {
  const text = sizeClass[size];

  return (
    <span className={`relative inline-block ${className}`}>
      <span className={`relative z-10 font-serif font-medium tracking-tight text-gradient-gold drop-shadow-[0_1px_18px_rgba(201,169,98,0.12)] ${text}`}>
        Moonora
      </span>
      <svg
        className="pointer-events-none absolute bottom-[calc(100%-0.15em)] left-1/2 z-0 w-[112%] max-w-[13rem] -translate-x-1/2 overflow-visible text-gold sm:max-w-[15rem]"
        viewBox="0 0 200 22"
        fill="none"
        aria-hidden
      >
        <path
          d="M 6 18 Q 100 0 188 14"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          opacity={0.9}
        />
        <path
          d="M 186 8 l 2.2 4.2 4.6 0.7-3.3 3.2 0.8 4.6-4.1-2.2-4.1 2.2 0.8-4.6-3.3-3.2 4.6-0.7z"
          fill="currentColor"
          opacity={0.92}
        />
      </svg>
    </span>
  );
}
