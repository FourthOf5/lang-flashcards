"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Plus, Save } from "lucide-react";
import type {
  CardGroup,
  GroupColor,
  GroupInput,
} from "@/features/library/types";

interface GroupFormProps {
  group?: CardGroup | null;
  isSaving: boolean;
  onSave: (input: GroupInput) => Promise<void>;
  onCancel?: () => void;
}

const colors: GroupColor[] = ["coral", "blue", "yellow", "green"];

export const GroupForm = ({ group, isSaving, onSave, onCancel }: GroupFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState<GroupColor>("coral");

  useEffect(() => {
    setName(group?.name ?? "");
    setDescription(group?.description ?? "");
    setColor(group?.color ?? "coral");
  }, [group]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    await onSave({ name, description, color });

    if (!group) {
      setName("");
      setDescription("");
      setColor("coral");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="group-name" className="field-label">Group name</label>
        <input
          id="group-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. At the restaurant"
          className="field-control"
          required
        />
      </div>
      <div>
        <label htmlFor="group-description" className="field-label">Short description</label>
        <input
          id="group-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="What belongs in this group?"
          className="field-control"
        />
      </div>
      <fieldset>
        <legend className="field-label">Color</legend>
        <div className="flex gap-2">
          {colors.map((option) => (
            <label key={option} className="cursor-pointer">
              <input
                type="radio"
                name="group-color"
                value={option}
                checked={color === option}
                onChange={() => setColor(option)}
                className="peer sr-only"
              />
              <span className={`block h-9 w-9 rounded-full border-4 border-white shadow-sm ring-2 ring-transparent peer-checked:ring-[var(--ink)] swatch-${option}`} />
              <span className="sr-only">{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="flex gap-2 pt-2">
        {onCancel ? (
          <button type="button" onClick={onCancel} className="secondary-button flex-1">
            Cancel
          </button>
        ) : null}
        <button type="submit" disabled={isSaving} className="primary-button flex-1">
          {group ? <Save aria-hidden="true" size={17} /> : <Plus aria-hidden="true" size={17} />}
          {group ? "Save group" : "Add group"}
        </button>
      </div>
    </form>
  );
};
