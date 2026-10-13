export const LoadingState = () => (
  <div className="grid min-h-[60vh] place-items-center px-6 text-center">
    <div>
      <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-[var(--coral)]/20 border-t-[var(--coral)]" />
      <p className="font-display text-2xl">Shuffling your cards…</p>
      <p className="mt-2 text-sm text-[var(--muted-ink)]">Un momento, por favor.</p>
    </div>
  </div>
);
