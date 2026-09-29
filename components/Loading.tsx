export function Loading({ text = "Loading workouts…" }: { text?: string }) {
  return (
    <div className="grid min-h-[360px] place-items-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-line border-t-acid" />
        <p className="text-xs font-black uppercase tracking-[.2em] text-muted">{text}</p>
      </div>
    </div>
  );
}
