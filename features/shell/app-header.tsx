import { Flame } from "lucide-react";

interface AppHeaderProps {
  cardCount: number;
}

export const AppHeader = ({ cardCount }: AppHeaderProps) => (
  <header className="flex items-center justify-between border-b border-[var(--ink)]/10 px-5 py-4 md:px-8 md:py-5">
    <div className="flex items-center gap-3">
      <div className="logo-mark" aria-hidden="true">
        <span>Ñ</span>
      </div>
      <div>
        <p className="font-display text-xl leading-none tracking-[-0.03em]">Vuelta</p>
        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--muted-ink)]">
          Spanish memory cards
        </p>
      </div>
    </div>
    <div className="flex items-center gap-2 rounded-full border border-[var(--ink)]/10 bg-white/60 px-3 py-2 text-xs font-bold">
      <Flame aria-hidden="true" size={16} className="text-[var(--coral)]" />
      {cardCount} cards ready
    </div>
  </header>
);
