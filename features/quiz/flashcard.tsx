"use client";

import { RotateCcw } from "lucide-react";
import type { QuizCard } from "@/features/quiz/quiz-utils";

interface FlashcardProps {
  card: QuizCard;
  isFlipped: boolean;
  onFlip: () => void;
}

export const Flashcard = ({ card, isFlipped, onFlip }: FlashcardProps) => (
  <button
    type="button"
    onClick={onFlip}
    className={`flashcard ${isFlipped ? "is-flipped" : ""}`}
    aria-label={isFlipped ? "Show question" : "Reveal answer"}
  >
    <span className="flashcard-inner">
      <span className="flashcard-face flashcard-front">
        <span className="card-language">{card.frontLanguage}</span>
        <strong>{card.front}</strong>
        <span className="card-hint">
          <RotateCcw aria-hidden="true" size={14} /> Tap to reveal
        </span>
      </span>
      <span className="flashcard-face flashcard-back">
        <span className="card-language">{card.backLanguage}</span>
        <strong>{card.back}</strong>
        {card.note ? <em>{card.note}</em> : null}
        <span className="card-hint">
          <RotateCcw aria-hidden="true" size={14} /> Tap to flip back
        </span>
      </span>
    </span>
  </button>
);
