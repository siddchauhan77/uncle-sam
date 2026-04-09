"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import OracleCard from "@/components/OracleCard";
import { getOracleCards } from "@/lib/content";
import type { ContentEntry } from "@/lib/content";

const allCards = getOracleCards();

function pickCard(seen: Set<string>): ContentEntry {
  const unseen = allCards.filter((c) => !seen.has(c.id));
  const pool = unseen.length > 0 ? unseen : allCards;
  return pool[Math.floor(Math.random() * pool.length)];
}

type PullState = "idle" | "discarding" | "dealing";

export default function OraclePage() {
  const [seen] = useState<Set<string>>(() => new Set());
  const [current, setCurrent] = useState<ContentEntry | null>(null);
  const [exiting, setExiting] = useState<ContentEntry | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [pullState, setPullState] = useState<PullState>("idle");
  const [pullCount, setPullCount] = useState(0);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Cleanup any pending timers on unmount
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  const pull = useCallback(() => {
    // First pull — simple flow, no animation
    if (!current) {
      const card = pickCard(seen);
      seen.add(card.id);
      setCurrent(card);
      setRevealed(true);
      setPullCount(1);
      // Tiny haptic on supporting devices
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate?.(8);
      }
      return;
    }

    // Already animating — ignore re-clicks
    if (pullState !== "idle") return;

    // Subsequent pulls — animated
    setExiting(current);
    setPullState("discarding");

    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate?.(12);
    }

    const t1 = setTimeout(() => {
      const card = pickCard(seen);
      seen.add(card.id);
      setCurrent(card);
      setPullState("dealing");
      setPullCount((c) => c + 1);
    }, 520);

    const t2 = setTimeout(() => {
      setExiting(null);
      setPullState("idle");
    }, 1200);

    timersRef.current.push(t1, t2);
  }, [current, pullState, seen]);

  const isAnimating = pullState !== "idle";

  return (
    <main
      className="min-h-screen flex flex-col px-6 py-8 relative"
      style={{ backgroundColor: "var(--paper)", color: "var(--ink)" }}
    >
      {/* ── Persistent quiz banner — top of page, always visible ── */}
      <Link
        href="/quiz"
        className="block w-full max-w-md mx-auto mb-6 px-4 py-2.5 border border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors group"
        style={{ backgroundColor: "var(--gold)", color: "var(--ink)" }}
      >
        <div className="flex items-center justify-between gap-3">
          <span
            className="text-[0.6rem] tracking-[0.2em] uppercase font-bold"
            style={{ fontFamily: "var(--type)" }}
          >
            New: Take the founder diagnostic →
          </span>
          <span
            className="text-[0.55rem] tracking-wider opacity-80"
            style={{ fontFamily: "var(--type)" }}
          >
            5 Qs
          </span>
        </div>
      </Link>

      {/* Header */}
      <div className="w-full max-w-xs mx-auto mb-6">
        <div className="rule-double mb-4" />
        <div className="flex items-center justify-between">
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
        <div className="rule mt-4" />
      </div>

      {!revealed ? (
        /* ── Pre-pull state ── */
        <div className="flex flex-col items-center text-center gap-8 max-w-xs mx-auto flex-1 justify-center">

          {/* Stacked deck visual */}
          <div className="relative w-44 h-60 mx-auto">
            <div
              className="absolute inset-0 translate-x-2.5 translate-y-2.5 card-back-face"
              style={{ boxShadow: "1px 1px 0 var(--ink-ghost)" }}
            />
            <div
              className="absolute inset-0 translate-x-1 translate-y-1 card-back-face"
              style={{ boxShadow: "1px 1px 0 var(--ink-ghost)" }}
            />
            <div
              className="absolute inset-0 card-back-face flex flex-col items-center justify-center deck-pulse"
              style={{ boxShadow: "4px 5px 20px rgba(10,10,10,0.35)" }}
            >
              <div className="absolute inset-3 border border-[var(--gold)] opacity-25" />
              <div className="absolute inset-[18px] border border-[var(--gold)] opacity-12" />
              <div className="flex flex-col items-center gap-3 z-10">
                <span className="text-[var(--gold)] opacity-35 text-2xl select-none">$</span>
                <p
                  className="text-[var(--ink-ghost)] text-xl opacity-40 uppercase tracking-widest"
                  style={{ fontFamily: "var(--display)" }}
                >
                  Sam
                </p>
                <span className="text-[var(--gold)] opacity-35 text-2xl select-none">$</span>
              </div>
            </div>
          </div>

          <div>
            <h1
              className="text-4xl leading-tight mb-3 uppercase"
              style={{ fontFamily: "var(--display)" }}
            >
              What does<br />Uncle Sam say?
            </h1>
            <p
              className="text-sm leading-relaxed"
              style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
            >
              Pull a card. Get a piece of business wisdom<br />from Sam&apos;s actual writing.
            </p>
          </div>

          <button
            onClick={pull}
            className="w-full max-w-[240px] py-4 text-[0.65rem] tracking-[0.2em] uppercase transition-colors hover:opacity-80"
            style={{
              fontFamily: "var(--type)",
              backgroundColor: "var(--ink)",
              color: "var(--paper)",
            }}
          >
            Pull a card
          </button>

          <Link
            href="/quiz"
            className="text-[0.62rem] tracking-wider underline underline-offset-4 transition-colors hover:text-[var(--ink)]"
            style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
          >
            Or take the founder diagnostic →
          </Link>
        </div>
      ) : (
        current && (
          <div className="relative flex flex-col items-center max-w-xs mx-auto w-full">
            {/* Persistent mini-deck — anchored top-left of card area */}
            <div
              className={`absolute -top-2 -left-12 sm:-left-16 w-16 h-22 z-0 transition-opacity hidden sm:block ${
                isAnimating ? "deck-shuffling" : ""
              }`}
              style={{
                transform: "scale(0.45)",
                transformOrigin: "top left",
              }}
              aria-hidden="true"
            >
              <div className="relative w-44 h-60">
                <div
                  className="absolute inset-0 translate-x-2 translate-y-2 card-back-face"
                  style={{ boxShadow: "1px 1px 0 var(--ink-ghost)" }}
                />
                <div
                  className="absolute inset-0 translate-x-1 translate-y-1 card-back-face"
                  style={{ boxShadow: "1px 1px 0 var(--ink-ghost)" }}
                />
                <div
                  className="absolute inset-0 card-back-face flex items-center justify-center"
                  style={{ boxShadow: "3px 4px 14px rgba(10,10,10,0.35)" }}
                >
                  <div className="absolute inset-3 border border-[var(--gold)] opacity-25" />
                  <span className="text-[var(--gold)] opacity-35 text-2xl select-none">$</span>
                </div>
              </div>
            </div>

            {/* Exiting card — z-index above the dealing card */}
            {exiting && (
              <div className="absolute inset-0 z-20 pointer-events-none">
                <OracleCard
                  key={`exit-${exiting.id}`}
                  entry={exiting}
                  onPullAnother={() => {}}
                  exiting
                />
              </div>
            )}

            {/* Active card */}
            <div className="relative z-10 w-full">
              <OracleCard
                key={`active-${current.id}-${pullCount}`}
                entry={current}
                onPullAnother={pull}
                animateEntry={pullState === "dealing"}
                disabled={isAnimating}
                footerSlot={
                  pullCount >= 1 && (
                    <Link
                      href="/quiz"
                      className="block w-full mt-3 px-5 py-3.5 border-2 transition-colors group"
                      style={{
                        borderColor: "var(--gold)",
                        backgroundColor: "var(--paper-light)",
                      }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex flex-col text-left">
                          <span
                            className="text-[0.6rem] tracking-[0.2em] uppercase font-bold"
                            style={{ fontFamily: "var(--type)", color: "var(--gold)" }}
                          >
                            Want a real read?
                          </span>
                          <span
                            className="text-[0.62rem] mt-0.5"
                            style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
                          >
                            Take the 5-Q diagnostic →
                          </span>
                        </div>
                        <span
                          className="text-lg group-hover:translate-x-1 transition-transform"
                          style={{ color: "var(--gold)" }}
                        >
                          →
                        </span>
                      </div>
                    </Link>
                  )
                }
              />
            </div>
          </div>
        )
      )}

      {/* Footer */}
      <div className="mt-12 text-center max-w-xs mx-auto">
        <div className="rule mb-4" />
        <p
          className="text-[0.58rem] tracking-widest uppercase"
          style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
        >
          {allCards.length} cards from Sam&apos;s writing
        </p>
      </div>
    </main>
  );
}
