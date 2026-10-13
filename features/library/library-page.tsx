"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { LibraryCard } from "@/features/library/library-card";
import type { CardGroup, MemoryCard } from "@/features/library/types";

interface LibraryPageProps {
  groups: CardGroup[];
  cards: MemoryCard[];
}

export const LibraryPage = ({ groups, cards }: LibraryPageProps) => {
  const [query, setQuery] = useState("");
  const [groupId, setGroupId] = useState<number | "all">("all");

  const filteredCards = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    return cards.filter((card) => {
      const matchesGroup = groupId === "all" || card.groupId === groupId;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [card.spanish, card.english, card.note, card.groupName].some((value) =>
          value.toLocaleLowerCase().includes(normalizedQuery),
        );

      return matchesGroup && matchesQuery;
    });
  }, [cards, groupId, query]);

  return (
    <div className="page-wrap">
      <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="section-kicker">Your collection</p>
          <h1 className="font-display mt-2 text-4xl tracking-[-0.045em] sm:text-5xl">The library</h1>
          <p className="mt-3 text-sm text-[var(--muted-ink)]">
            {filteredCards.length} of {cards.length} cards on the table.
          </p>
        </div>
        <label className="relative block w-full lg:max-w-sm">
          <span className="sr-only">Search cards</span>
          <Search
            aria-hidden="true"
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-ink)]"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Spanish, English, notes…"
            className="field-control pl-11"
          />
        </label>
      </div>

      <div className="scrollbar-none -mx-5 mb-6 flex gap-2 overflow-x-auto px-5 pb-1 md:-mx-8 md:px-8">
        <button
          type="button"
          onClick={() => setGroupId("all")}
          className={`filter-chip ${groupId === "all" ? "filter-chip-active" : ""}`}
        >
          All topics
        </button>
        {groups.map((group) => (
          <button
            key={group.id}
            type="button"
            onClick={() => setGroupId(group.id)}
            className={`filter-chip ${groupId === group.id ? "filter-chip-active" : ""}`}
          >
            {group.name}
          </button>
        ))}
      </div>

      {filteredCards.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCards.map((card) => (
            <LibraryCard key={card.id} card={card} />
          ))}
        </div>
      ) : (
        <div className="panel-card grid min-h-64 place-items-center px-6 text-center">
          <div>
            <p className="font-display text-3xl">No match, todavía.</p>
            <p className="mt-2 text-sm text-[var(--muted-ink)]">Try another word or topic.</p>
          </div>
        </div>
      )}
    </div>
  );
};
