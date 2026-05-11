import { MoonoraLogo } from "./moonora-logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-night-950 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 text-center text-sm text-cream/40 sm:flex-row sm:text-left sm:px-6">
        <MoonoraLogo size="sm" className="opacity-90" />
        <p>© {new Date().getFullYear()} Moonora. Crafted for bedtime, built for memory.</p>
        <div className="flex gap-6">
          <a href="#" className="transition hover:text-cream/70">
            Privacy
          </a>
          <a href="#" className="transition hover:text-cream/70">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
