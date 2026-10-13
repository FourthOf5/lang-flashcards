"use client";

import { Pencil, Trash2 } from "lucide-react";
import type { CardGroup } from "@/features/library/types";

interface GroupListProps {
  groups: CardGroup[];
  onEdit: (group: CardGroup) => void;
  onDelete: (group: CardGroup) => void;
}

export const GroupList = ({ groups, onEdit, onDelete }: GroupListProps) => (
  <div className="space-y-2">
    {groups.map((group) => (
      <div key={group.id} className="flex items-center gap-3 rounded-2xl border border-[var(--ink)]/10 bg-white/55 p-3">
        <span className={`h-9 w-2 rounded-full swatch-${group.color}`} aria-hidden="true" />
        <span className="min-w-0 flex-1">
          <strong className="block truncate text-sm">{group.name}</strong>
          <small className="text-[var(--muted-ink)]">{group.cardCount} cards</small>
        </span>
        <button type="button" onClick={() => onEdit(group)} className="icon-button" aria-label={`Edit ${group.name}`}>
          <Pencil aria-hidden="true" size={16} />
        </button>
        <button type="button" onClick={() => onDelete(group)} className="icon-button hover:text-red-700" aria-label={`Delete ${group.name}`}>
          <Trash2 aria-hidden="true" size={16} />
        </button>
      </div>
    ))}
  </div>
);
