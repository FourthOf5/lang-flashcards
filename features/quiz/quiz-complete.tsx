"use client";

import { ArrowRight, PartyPopper, RotateCcw } from "lucide-react";

interface QuizCompleteProps {
  correct: number;
  total: number;
  onRestart: () => void;
  onSetup: () => void;
}

export const QuizComplete = ({
  correct,
  total,
  onRestart,
  onSetup,
}: QuizCompleteProps) => {
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <section className="panel-card mx-auto max-w-2xl overflow-hidden text-center">
      <div className="bg-[var(--yellow)] px-6 py-10 sm:py-14">
        <PartyPopper aria-hidden="true" size={38} className="mx-auto mb-4" />
        <p className="section-kicker">Round complete</p>
        <h2 className="font-display mt-2 text-5xl tracking-[-0.05em] sm:text-6xl">
          ¡Muy bien!
        </h2>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[var(--ink)]/65">
          You knew {correct} of {total} cards this time. That’s {percentage}%—the next round will feel easier.
        </p>
      </div>
      <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-7">
        <button type="button" onClick={onRestart} className="secondary-button">
          <RotateCcw aria-hidden="true" size={18} /> Same setup
        </button>
        <button type="button" onClick={onSetup} className="primary-button">
          Change setup <ArrowRight aria-hidden="true" size={18} />
        </button>
      </div>
    </section>
  );
};
