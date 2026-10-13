"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CardForm } from "@/features/admin/card-form";
import { CardList } from "@/features/admin/card-list";
import { GroupForm } from "@/features/admin/group-form";
import { GroupList } from "@/features/admin/group-list";
import type { CardGroup, MemoryCard } from "@/features/library/types";
import { useCardLibrary } from "@/features/library/use-card-library";

interface AdminPageProps {
  library: ReturnType<typeof useCardLibrary>;
}

export const AdminPage = ({ library }: AdminPageProps) => {
  const [editingGroup, setEditingGroup] = useState<CardGroup | null>(null);
  const [editingCard, setEditingCard] = useState<MemoryCard | null>(null);
  const [query, setQuery] = useState("");

  const filteredCards = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return library.cards.filter((card) =>
      normalizedQuery.length === 0
        ? true
        : [card.spanish, card.english, card.groupName].some((value) =>
            value.toLocaleLowerCase().includes(normalizedQuery),
          ),
    );
  }, [library.cards, query]);

  const handleDeleteGroup = async (group: CardGroup): Promise<void> => {
    const confirmed = window.confirm(
      `Delete “${group.name}” and its ${group.cardCount} cards? This cannot be undone.`,
    );

    if (confirmed) {
      await library.deleteGroup(group.id);
      if (editingGroup?.id === group.id) setEditingGroup(null);
    }
  };

  const handleDeleteCard = async (card: MemoryCard): Promise<void> => {
    const confirmed = window.confirm(`Delete “${card.spanish}”?`);

    if (confirmed) {
      await library.deleteCard(card.id);
      if (editingCard?.id === card.id) setEditingCard(null);
    }
  };

  return (
    <div className="page-wrap">
      <div className="mb-8 max-w-2xl">
        <p className="section-kicker">Make it yours</p>
        <h1 className="font-display mt-2 text-4xl tracking-[-0.045em] sm:text-5xl">Card studio</h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted-ink)]">
          Organize topics on the left, then keep adding the words you actually want to remember.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(300px,.75fr)_minmax(0,1.25fr)]">
        <section className="panel-card p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="section-kicker">Groups</p>
              <h2 className="font-display mt-1 text-2xl">Topic shelves</h2>
            </div>
            <span className="count-badge">{library.groups.length}</span>
          </div>

          <GroupList
            groups={library.groups}
            onEdit={setEditingGroup}
            onDelete={(group) => void handleDeleteGroup(group)}
          />

          <div className="my-6 h-px bg-[var(--ink)]/10" />
          <h3 className="mb-4 text-sm font-black">{editingGroup ? "Edit group" : "Create a group"}</h3>
          <GroupForm
            group={editingGroup}
            isSaving={library.isSaving}
            onCancel={editingGroup ? () => setEditingGroup(null) : undefined}
            onSave={async (input) => {
              if (editingGroup) {
                await library.updateGroup(editingGroup.id, input);
                setEditingGroup(null);
              } else {
                await library.createGroup(input);
              }
            }}
          />
        </section>

        <div className="space-y-5">
          <section className="panel-card p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="section-kicker">Cards</p>
                <h2 className="font-display mt-1 text-2xl">{editingCard ? "Edit a card" : "Add a new card"}</h2>
              </div>
              <span className="count-badge">{library.cards.length}</span>
            </div>
            <CardForm
              groups={library.groups}
              card={editingCard}
              isSaving={library.isSaving}
              onCancel={editingCard ? () => setEditingCard(null) : undefined}
              onSave={async (input) => {
                if (editingCard) {
                  await library.updateCard(editingCard.id, input);
                  setEditingCard(null);
                } else {
                  await library.createCard(input);
                }
              }}
            />
          </section>

          <section className="panel-card p-5 sm:p-6">
            <label className="relative mb-2 block">
              <span className="sr-only">Search cards to edit</span>
              <Search aria-hidden="true" size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-ink)]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Find a card to edit…"
                className="field-control pl-11"
              />
            </label>
            <CardList
              cards={filteredCards}
              onEdit={setEditingCard}
              onDelete={(card) => void handleDeleteCard(card)}
            />
          </section>
        </div>
      </div>
    </div>
  );
};
