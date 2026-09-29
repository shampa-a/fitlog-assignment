import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-panel py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-5 sm:flex-row sm:items-center lg:px-8">
        <Logo />
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
