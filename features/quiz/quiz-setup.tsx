"use client";

import { ArrowLeftRight, Play, Shuffle } from "lucide-react";
import type { CardGroup } from "@/features/library/types";
import type { QuizDirection } from "@/features/quiz/quiz-utils";

interface QuizSetupProps {
  groups: CardGroup[];
  selectedGroupId: number | "all";
  direction: QuizDirection;
  limit: number;
  availableCount: number;
  onGroupChange: (groupId: number | "all") => void;
  onDirectionChange: (direction: QuizDirection) => void;
  onLimitChange: (limit: number) => void;
  onStart: () => void;
}

const directionOptions: Array<{
  id: QuizDirection;
  label: string;
  helper: string;
}> = [
  { id: "spanish-first", label: "ES → EN", helper: "Spanish first" },
  { id: "english-first", label: "EN → ES", helper: "English first" },
  { id: "mixed", label: "Mix it up", helper: "Both directions" },
];

export const QuizSetup = ({
  groups,
  selectedGroupId,
  direction,
  limit,
  availableCount,
  onGroupChange,
  onDirectionChange,
  onLimitChange,
  onStart,
}: QuizSetupProps) => (
  <div className="grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,.75fr)]">
    <section className="panel-card p-5 sm:p-7">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--blue)] text-white">
          <Shuffle aria-hidden="true" size={20} />
        </div>
        <div>
          <p className="section-kicker">01 · Pick a deck</p>
          <h2 className="font-display text-2xl">What are we learning?</h2>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onGroupChange("all")}
          className={`topic-option ${selectedGroupId === "all" ? "topic-option-active" : ""}`}
        >
          <span className="topic-swatch bg-[var(--ink)]" />
          <span>
            <strong>Everything</strong>
            <small>{groups.reduce((total, group) => total + group.cardCount, 0)} cards · all topics</small>
          </span>
        </button>
        {groups.map((group) => (
          <button
            key={group.id}
            type="button"
            onClick={() => onGroupChange(group.id)}
            className={`topic-option ${selectedGroupId === group.id ? "topic-option-active" : ""}`}
          >
            <span className={`topic-swatch swatch-${group.color}`} />
            <span>
              <strong>{group.name}</strong>
              <small>{group.cardCount} cards</small>
            </span>
          </button>
        ))}
      </div>
    </section>

    <section className="panel-card flex flex-col p-5 sm:p-7">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--coral)] text-white">
          <ArrowLeftRight aria-hidden="true" size={20} />
        </div>
        <div>
          <p className="section-kicker">02 · Choose direction</p>
          <h2 className="font-display text-2xl">How should cards flip?</h2>
        </div>
      </div>

      <div className="space-y-2">
        {directionOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onDirectionChange(option.id)}
            className={`direction-option ${direction === option.id ? "direction-option-active" : ""}`}
          >
            <span>
              <strong>{option.label}</strong>
              <small>{option.helper}</small>
            </span>
            <span className="radio-dot" aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="mt-6">
        <label htmlFor="card-count" className="section-kicker mb-2 block">
          Session length
        </label>
        <select
          id="card-count"
          value={limit}
          onChange={(event) => onLimitChange(Number(event.target.value))}
          className="field-control"
        >
          {[5, 10, 20, availableCount]
            .filter((value, index, values) => value > 0 && values.indexOf(value) === index)
            .map((value) => (
              <option key={value} value={value}>
                {value >= availableCount ? `All ${availableCount}` : `${value} cards`}
              </option>
            ))}
        </select>
      </div>

      <button
        type="button"
        onClick={onStart}
        disabled={availableCount === 0}
        className="primary-button mt-6 w-full"
      >
        Start a round
        <Play aria-hidden="true" size={18} fill="currentColor" />
      </button>
    </section>
  </div>
);
