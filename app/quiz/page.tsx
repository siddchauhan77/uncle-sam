"use client";

import { useState } from "react";
import Link from "next/link";
import QuizCard from "@/components/QuizCard";
import ArchetypeResult from "@/components/ArchetypeResult";
import { getArchetype } from "@/lib/archetypes";

type Answers = {
  ideas: string;
  blocker: string;
  success: string;
  boring: string;
  situation: string;
};

const QUESTIONS = [
  {
    key: "ideas" as keyof Answers,
    question: "How many business ideas do you have right now?",
    type: "choice" as const,
    options: [
      { label: "Zero. I have no ideas.", value: "zero" },
      { label: "1–5. I've got a couple.", value: "one-five" },
      { label: "5–20. My Notes app is a mess.", value: "five-twenty" },
      { label: "I lost count. Send help.", value: "lost-count" },
    ],
  },
  {
    key: "blocker" as keyof Answers,
    question: "Why haven't you started yet?",
    type: "choice" as const,
    options: [
      { label: "Need money / funding", value: "money" },
      { label: "Need more skills first", value: "skills" },
      { label: "Still looking for the right idea", value: "right-idea" },
      { label: "I'm scared but I won't say that", value: "scared" },
    ],
  },
  {
    key: "success" as keyof Answers,
    question: "What does winning look like to you?",
    type: "choice" as const,
    options: [
      { label: "Freedom — work when I want, where I want", value: "freedom" },
      { label: "Money — a number with commas", value: "money" },
      { label: "Impact — something that matters", value: "impact" },
      { label: "Prove everyone wrong", value: "prove-them" },
    ],
  },
  {
    key: "boring" as keyof Answers,
    question: "What's your relationship with boring businesses?",
    type: "choice" as const,
    options: [
      { label: "Boring = bad. I want to build something impressive.", value: "boring-bad" },
      { label: "Boring is fine if it's profitable.", value: "boring-fine" },
      { label: "I love boring businesses. Show me the margins.", value: "boring-love" },
      { label: "What's a boring business?", value: "boring-unknown" },
    ],
  },
  {
    key: "situation" as keyof Answers,
    question: "Where are you right now?",
    type: "choice" as const,
    options: [
      { label: "Full-time job, want out", value: "employee" },
      { label: "Student / just graduated", value: "student" },
      { label: "Already building something", value: "building" },
      { label: "In between things", value: "between" },
    ],
  },
];

const EMPTY: Answers = { ideas: "", blocker: "", success: "", boring: "", situation: "" };

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [result, setResult] = useState<ReturnType<typeof getArchetype> | null>(null);

  const current = QUESTIONS[step];
  const currentValue = answers[current?.key];
  const canAdvance = currentValue.trim().length > 0;

  function handleChange(val: string) {
    setAnswers((a) => ({ ...a, [current.key]: val }));
  }

  function handleNext() {
    if (step < QUESTIONS.length - 1) {
      setStep((s) => s + 1);
    } else {
      setResult(getArchetype(answers));
    }
  }

  function handleRetake() {
    setResult(null);
    setStep(0);
    setAnswers(EMPTY);
  }

  /* ── Result view ── */
  if (result) {
    return (
      <main
        className="min-h-screen flex flex-col px-6 py-12 max-w-lg mx-auto"
        style={{ backgroundColor: "var(--paper)", color: "var(--ink)" }}
      >
        <div className="flex items-center justify-between mb-5">
          <Link
            href="/"
            className="text-[0.62rem] tracking-widest uppercase transition-colors hover:text-[var(--gold)]"
            style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
          >
            ← Back
          </Link>
          <span
            className="text-[0.62rem] tracking-wider uppercase"
            style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
          >
            Uncle Sam
          </span>
        </div>

        <ArchetypeResult archetype={result} onRetake={handleRetake} />
      </main>
    );
  }

  /* ── Quiz flow ── */
  return (
    <main
      className="min-h-screen flex flex-col px-6 py-12 max-w-lg mx-auto"
      style={{ backgroundColor: "var(--paper)", color: "var(--ink)" }}
    >
      {/* Header */}
      <div className="rule-double mb-4" />
      <div className="flex items-center justify-between mb-4">
        <Link
          href="/"
          className="text-[0.62rem] tracking-widest uppercase transition-colors hover:text-[var(--gold)]"
          style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
        >
          ← Back
        </Link>
        <span
          className="text-[0.62rem] tracking-wider uppercase"
          style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
        >
          Uncle Sam&apos;s quiz
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="w-full h-px mb-10 relative"
        style={{ backgroundColor: "var(--ink-ghost)" }}
      >
        <div
          className="absolute left-0 top-0 h-full transition-all duration-500"
          style={{
            backgroundColor: "var(--gold)",
            width: `${((step + 1) / QUESTIONS.length) * 100}%`,
          }}
        />
      </div>

      {/* Question */}
      <div className="flex-1">
        <QuizCard
          question={current.question}
          options={current.options}
          type={current.type}
          value={currentValue}
          onChange={handleChange}
          questionNumber={step + 1}
          total={QUESTIONS.length}
        />
      </div>

      {/* Continue */}
      <div className="mt-10">
        <button
          onClick={handleNext}
          disabled={!canAdvance}
          className="w-full py-4 text-[0.65rem] tracking-[0.2em] uppercase transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            fontFamily: "var(--type)",
            backgroundColor: "var(--ink)",
            color: "var(--paper)",
          }}
        >
          {step < QUESTIONS.length - 1 ? "Continue →" : "Get my prescription"}
        </button>
      </div>
    </main>
  );
}
