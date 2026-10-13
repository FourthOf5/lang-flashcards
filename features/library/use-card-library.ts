"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  CardGroup,
  CardInput,
  GroupInput,
  MemoryCard,
} from "@/features/library/types";
import { getJson, sendJson } from "@/lib/api-client";

export const useCardLibrary = () => {
  const [groups, setGroups] = useState<CardGroup[]>([]);
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasAttemptedSeed = useRef(false);

  const loadLibrary = useCallback(async (): Promise<void> => {
    setError(null);

    try {
      let nextGroups = await getJson<CardGroup[]>("/api/groups");

      if (nextGroups.length === 0 && !hasAttemptedSeed.current) {
        hasAttemptedSeed.current = true;
        await sendJson<{ seeded: boolean }>("/api/seed", "POST");
        nextGroups = await getJson<CardGroup[]>("/api/groups");
      }

      const nextCards = await getJson<MemoryCard[]>("/api/cards");
      setGroups(nextGroups);
      setCards(nextCards);
    } catch (nextError) {
      setError(
        nextError instanceof Error ? nextError.message : "Could not load your cards.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadLibrary();
  }, [loadLibrary]);

  const runMutation = async (mutation: () => Promise<unknown>): Promise<void> => {
    setIsSaving(true);
    setError(null);

    try {
      await mutation();
      await loadLibrary();
    } catch (nextError) {
      setError(
        nextError instanceof Error ? nextError.message : "Could not save that change.",
      );
      throw nextError;
    } finally {
      setIsSaving(false);
    }
  };

  const createGroup = async (input: GroupInput): Promise<void> =>
    runMutation(() => sendJson("/api/groups", "POST", input));

  const updateGroup = async (id: number, input: GroupInput): Promise<void> =>
    runMutation(() => sendJson(`/api/groups/${id}`, "PATCH", input));

  const deleteGroup = async (id: number): Promise<void> =>
    runMutation(() => sendJson(`/api/groups/${id}`, "DELETE"));

  const createCard = async (input: CardInput): Promise<void> =>
    runMutation(() => sendJson("/api/cards", "POST", input));

  const updateCard = async (id: number, input: CardInput): Promise<void> =>
    runMutation(() => sendJson(`/api/cards/${id}`, "PATCH", input));

  const deleteCard = async (id: number): Promise<void> =>
    runMutation(() => sendJson(`/api/cards/${id}`, "DELETE"));

  return {
    groups,
    cards,
    isLoading,
    isSaving,
    error,
    createGroup,
    updateGroup,
    deleteGroup,
    createCard,
    updateCard,
    deleteCard,
    reload: loadLibrary,
  };
};
