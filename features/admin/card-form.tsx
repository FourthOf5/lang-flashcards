"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Plus, Save } from "lucide-react";
import type {
  CardGroup,
  CardInput,
  MemoryCard,
} from "@/features/library/types";

interface CardFormProps {
  groups: CardGroup[];
  card?: MemoryCard | null;
  isSaving: boolean;
  onSave: (input: CardInput) => Promise<void>;
  onCancel?: () => void;
}

export const CardForm = ({ groups, card, isSaving, onSave, onCancel }: CardFormProps) => {
  const [groupId, setGroupId] = useState(groups[0]?.id ?? 0);
  const [spanish, setSpanish] = useState("");
  const [english, setEnglish] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    setGroupId(card?.groupId ?? groups[0]?.id ?? 0);
    setSpanish(card?.spanish ?? "");
    setEnglish(card?.english ?? "");
    setNote(card?.note ?? "");
  }, [card, groups]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    await onSave({ groupId, spanish, english, note });

    if (!card) {
      setSpanish("");
      setEnglish("");
      setNote("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="card-group" className="field-label">Group</label>
        <select
          id="card-group"
          value={groupId}
          onChange={(event) => setGroupId(Number(event.target.value))}
          className="field-control"
          disabled={groups.length === 0}
        >
          {groups.map((group) => (
            <option key={group.id} value={group.id}>{group.name}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <div>
          <label htmlFor="card-spanish" className="field-label">Spanish</label>
          <input
            id="card-spanish"
            value={spanish}
            onChange={(event) => setSpanish(event.target.value)}
            placeholder="la sobremesa"
            className="field-control"
            required
          />
        </div>
        <div>
          <label htmlFor="card-english" className="field-label">English</label>
          <input
            id="card-english"
            value={english}
            onChange={(event) => setEnglish(event.target.value)}
            placeholder="time spent chatting after a meal"
            className="field-control"
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="card-note" className="field-label">Memory note · optional</label>
        <textarea
          id="card-note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="A tiny hint, example, or grammar note"
          className="field-control min-h-24 resize-y"
        />
      </div>
      <div className="flex gap-2 pt-2">
        {onCancel ? (
          <button type="button" onClick={onCancel} className="secondary-button flex-1">Cancel</button>
        ) : null}
        <button type="submit" disabled={isSaving || groups.length === 0} className="primary-button flex-1">
          {card ? <Save aria-hidden="true" size={17} /> : <Plus aria-hidden="true" size={17} />}
          {card ? "Save card" : "Add card"}
        </button>
      </div>
    </form>
  );
};
