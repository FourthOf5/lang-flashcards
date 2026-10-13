import type { MemoryCard } from "@/features/library/types";

export type QuizDirection = "spanish-first" | "english-first" | "mixed";

export interface QuizCard extends MemoryCard {
  front: string;
  back: string;
  frontLanguage: "Spanish" | "English";
  backLanguage: "Spanish" | "English";
}

const shuffled = <T,>(items: T[]): T[] => {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
};

export const createQuizCards = (
  cards: MemoryCard[],
  direction: QuizDirection,
  limit: number,
): QuizCard[] =>
  shuffled(cards)
    .slice(0, limit)
    .map((card) => {
      const spanishFirst =
        direction === "spanish-first" ||
        (direction === "mixed" && Math.random() >= 0.5);

      return {
        ...card,
        front: spanishFirst ? card.spanish : card.english,
        back: spanishFirst ? card.english : card.spanish,
        frontLanguage: spanishFirst ? "Spanish" : "English",
        backLanguage: spanishFirst ? "English" : "Spanish",
      };
    });
