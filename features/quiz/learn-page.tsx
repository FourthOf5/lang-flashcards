"use client";

import { useMemo, useState } from "react";
import { Check, X } from "lucide-react";
import type { CardGroup, MemoryCard } from "@/features/library/types";
import { Flashcard } from "@/features/quiz/flashcard";
import { QuizComplete } from "@/features/quiz/quiz-complete";
import { QuizSetup } from "@/features/quiz/quiz-setup";
import {
  createQuizCards,
  type QuizCard,
  type QuizDirection,
} from "@/features/quiz/quiz-utils";

interface LearnPageProps {
  groups: CardGroup[];
  cards: MemoryCard[];
}

export const LearnPage = ({ groups, cards }: LearnPageProps) => {
  const [selectedGroupId, setSelectedGroupId] = useState<number | "all">("all");
  const [direction, setDirection] = useState<QuizDirection>("mixed");
  const [limit, setLimit] = useState(10);
  const [quizCards, setQuizCards] = useState<QuizCard[]>([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const availableCards = useMemo(
    () =>
      selectedGroupId === "all"
        ? cards
        : cards.filter((card) => card.groupId === selectedGroupId),
    [cards, selectedGroupId],
  );

  const startQuiz = (): void => {
    const nextQuiz = createQuizCards(
      availableCards,
      direction,
      Math.min(limit, availableCards.length),
    );
    setQuizCards(nextQuiz);
    setCardIndex(0);
    setCorrect(0);
    setIsFlipped(false);
    setIsComplete(false);
  };

  const scoreCard = (known: boolean): void => {
    if (known) {
      setCorrect((value) => value + 1);
    }

    if (cardIndex + 1 >= quizCards.length) {
      setIsComplete(true);
      return;
    }

    setCardIndex((value) => value + 1);
    setIsFlipped(false);
  };

  if (isComplete) {
    return (
      <div className="page-wrap">
        <QuizComplete
          correct={correct}
          total={quizCards.length}
          onRestart={startQuiz}
          onSetup={() => setQuizCards([])}
        />
      </div>
    );
  }

  if (quizCards.length > 0) {
    const currentCard = quizCards[cardIndex];

    return (
      <div className="page-wrap mx-auto max-w-4xl">
        <div className="mb-5 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setQuizCards([])}
            className="text-sm font-bold text-[var(--muted-ink)] hover:text-[var(--ink)]"
          >
            ← Exit round
          </button>
          <div className="flex items-center gap-3 text-xs font-bold">
            <span>{cardIndex + 1} / {quizCards.length}</span>
            <span className="h-2 w-28 overflow-hidden rounded-full bg-[var(--ink)]/10 sm:w-40">
              <span
                className="block h-full rounded-full bg-[var(--coral)] transition-all"
                style={{ width: `${((cardIndex + 1) / quizCards.length) * 100}%` }}
              />
            </span>
          </div>
        </div>

        <Flashcard
          card={currentCard}
          isFlipped={isFlipped}
          onFlip={() => setIsFlipped((value) => !value)}
        />

        <div className={`mt-5 grid gap-3 sm:grid-cols-2 ${isFlipped ? "opacity-100" : "pointer-events-none opacity-0"}`}>
          <button type="button" onClick={() => scoreCard(false)} className="secondary-button min-h-14">
            <X aria-hidden="true" size={20} /> Again
          </button>
          <button type="button" onClick={() => scoreCard(true)} className="primary-button min-h-14">
            <Check aria-hidden="true" size={20} /> Got it
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <div className="mb-8 max-w-2xl">
        <p className="section-kicker">Today’s practice</p>
        <h1 className="font-display mt-2 text-4xl tracking-[-0.045em] sm:text-6xl">
          A little Spanish,
          <br />
          <span className="text-[var(--coral)]">one flip at a time.</span>
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--muted-ink)] sm:text-base">
          Pick a topic, choose which side you want to see first, and keep the round short enough to finish.
        </p>
      </div>

      <QuizSetup
        groups={groups}
        selectedGroupId={selectedGroupId}
        direction={direction}
        limit={Math.min(limit, Math.max(availableCards.length, 1))}
        availableCount={availableCards.length}
        onGroupChange={setSelectedGroupId}
        onDirectionChange={setDirection}
        onLimitChange={setLimit}
        onStart={startQuiz}
      />
    </div>
  );
};
