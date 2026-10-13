import { Languages } from "lucide-react";
import type { MemoryCard } from "@/features/library/types";

interface LibraryCardProps {
  card: MemoryCard;
}

export const LibraryCard = ({ card }: LibraryCardProps) => (
  <article className="group relative overflow-hidden rounded-[26px] border border-[var(--ink)]/10 bg-white/70 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_40px_rgba(20,35,45,.08)]">
    <div className="mb-8 flex items-center justify-between gap-3">
      <span className={`group-pill pill-${card.groupColor}`}>{card.groupName}</span>
      <Languages aria-hidden="true" size={17} className="text-[var(--muted-ink)]" />
    </div>
    <dl>
      <div>
        <dt className="section-kicker">Spanish</dt>
        <dd className="font-display mt-1 text-3xl tracking-[-0.03em]">{card.spanish}</dd>
      </div>
      <div className="my-4 h-px bg-[var(--ink)]/10" />
      <div>
        <dt className="section-kicker">English</dt>
        <dd className="mt-1 text-lg font-bold">{card.english}</dd>
      </div>
    </dl>
    {card.note ? (
      <p className="mt-5 border-l-2 border-[var(--coral)] pl-3 text-xs leading-relaxed text-[var(--muted-ink)]">
        {card.note}
      </p>
    ) : null}
  </article>
);
