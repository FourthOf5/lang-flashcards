"use client";

import { Pencil, Trash2 } from "lucide-react";
import type { MemoryCard } from "@/features/library/types";

interface CardListProps {
  cards: MemoryCard[];
  onEdit: (card: MemoryCard) => void;
  onDelete: (card: MemoryCard) => void;
}

export const CardList = ({ cards, onEdit, onDelete }: CardListProps) => (
  <div className="divide-y divide-[var(--ink)]/10">
    {cards.map((card) => (
      <div key={card.id} className="grid gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-center">
        <div className="min-w-0">
          <span className={`group-pill pill-${card.groupColor}`}>{card.groupName}</span>
          <strong className="mt-2 block truncate font-display text-xl">{card.spanish}</strong>
        </div>
        <p className="truncate text-sm font-semibold text-[var(--muted-ink)]">{card.english}</p>
        <div className="flex gap-1 justify-self-end">
          <button type="button" onClick={() => onEdit(card)} className="icon-button" aria-label={`Edit ${card.spanish}`}>
            <Pencil aria-hidden="true" size={16} />
          </button>
          <button type="button" onClick={() => onDelete(card)} className="icon-button hover:text-red-700" aria-label={`Delete ${card.spanish}`}>
            <Trash2 aria-hidden="true" size={16} />
          </button>
        </div>
      </div>
    ))}
  </div>
);
