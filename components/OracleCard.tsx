"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { ContentEntry } from "@/lib/content";

type Props = {
  entry: ContentEntry;
  onPullAnother: () => void;
  /** When true, plays the deal-in animation on mount and delays auto-flip. */
  animateEntry?: boolean;
  /** When true, plays the discard-out animation. The card becomes non-interactive. */
  exiting?: boolean;
  /** Disable interactive controls (e.g. while another animation is in flight). */
  disabled?: boolean;
  /** Optional slot rendered below the action buttons (used for the quiz CTA). */
  footerSlot?: React.ReactNode;
};

export default function OracleCard({
  entry,
  onPullAnother,
  animateEntry = false,
  exiting = false,
  disabled = false,
  footerSlot,
}: Props) {
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  // Auto-flip — delay longer when dealing in so the flip happens AFTER the card lands
  useEffect(() => {
    if (exiting) return;
    const delay = animateEntry ? 720 : 350;
    const t = setTimeout(() => setFlipped(true), delay);
    return () => clearTimeout(t);
  }, [animateEntry, exiting]);

  async function handleShare() {
    const text = `"${entry.quote}"\n\n— ${entry.source_title}\n\nvia Uncle Sam`;
    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch {
        /* user cancelled — ignore */
      }
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const sceneClass = [
    "card-scene w-full",
    exiting ? "card-discard-out" : "",
    animateEntry && !exiting ? "card-deal-in" : "",
    !exiting && !disabled ? "cursor-pointer" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xs mx-auto">

      {/* ── Card ── */}
      <div
        className={sceneClass}
        style={{ height: "460px" }}
        onClick={() => {
          if (exiting || disabled) return;
          setFlipped((f) => !f);
        }}
      >
        <div className={`card-inner ${flipped ? "flipped" : ""}`}>

          {/* FRONT = decorative back-of-card */}
          <div
            className="card-front rounded-sm overflow-hidden"
            style={{ boxShadow: "5px 7px 28px rgba(10,10,10,0.4)" }}
          >
            <div className="card-back-face w-full h-full flex flex-col items-center justify-center p-8 relative">
              <div className="absolute inset-3 border border-[var(--gold)] opacity-25 rounded-sm" />
              <div className="absolute inset-[18px] border border-[var(--gold)] opacity-12 rounded-sm" />

              <div className="flex flex-col items-center gap-4 relative z-10">
                <span className="text-[var(--gold)] opacity-35 text-3xl select-none">$</span>
                <div className="text-center">
                  <p
                    className="text-[var(--ink-ghost)] text-[0.6rem] tracking-[0.35em] uppercase opacity-50"
                    style={{ fontFamily: "var(--type)" }}
                  >
                    Uncle
                  </p>
                  <p
                    className="text-[var(--ink-ghost)] text-2xl opacity-40 uppercase tracking-widest"
                    style={{ fontFamily: "var(--display)" }}
                  >
                    Sam
                  </p>
                </div>
                <span className="text-[var(--gold)] opacity-35 text-3xl select-none">$</span>
              </div>

              {["top-5 left-5", "top-5 right-5", "bottom-5 left-5", "bottom-5 right-5"].map((pos) => (
                <span
                  key={pos}
                  className={`absolute ${pos} text-[var(--gold)] opacity-20 text-xs select-none`}
                >
                  ◈
                </span>
              ))}
            </div>
          </div>

          {/* BACK = content face */}
          <div
            className="card-back rounded-sm overflow-hidden"
            style={{
              backgroundColor: "var(--paper-light)",
              boxShadow: "5px 7px 28px rgba(10,10,10,0.2)",
            }}
          >
            <div className="w-full h-full flex flex-col p-7">
              <div className="rule-double mb-5" />

              <div className="mb-4">
                <span className="stamp">{entry.source_title}</span>
              </div>

              <blockquote
                className="flex-1 text-[1.1rem] leading-snug text-[var(--ink)] uppercase"
                style={{ fontFamily: "var(--display)", letterSpacing: "0.01em" }}
              >
                &ldquo;{entry.quote}&rdquo;
              </blockquote>

              {entry.full_excerpt && entry.full_excerpt !== entry.quote && (
                <p
                  className="text-[0.68rem] text-[var(--ink-faded)] leading-relaxed mt-4 line-clamp-3"
                  style={{ fontFamily: "var(--type)" }}
                >
                  {entry.full_excerpt}
                </p>
              )}

              <div className="rule-double mt-5 mb-4" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src="/sam-avatar.png"
                    alt="Sam Parr"
                    width={22}
                    height={22}
                    className="rounded-full"
                    style={{ filter: "sepia(0.15) contrast(1.05)", objectFit: "cover" }}
                  />
                  <span
                    className="text-[0.6rem] text-[var(--ink-faded)] tracking-wider"
                    style={{ fontFamily: "var(--type)" }}
                  >
                    {entry.date}
                  </span>
                </div>
                <a
                  href={entry.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[0.6rem] tracking-widest uppercase text-[var(--gold)] hover:underline"
                  style={{ fontFamily: "var(--type)" }}
                >
                  Read →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Actions ── */}
      {!exiting && (
        <>
          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={onPullAnother}
              disabled={disabled}
              className="w-full py-3.5 bg-[var(--ink)] text-[var(--paper)] text-[0.65rem] tracking-[0.18em] uppercase transition-colors hover:bg-[var(--ink-mid)] disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ fontFamily: "var(--type)" }}
            >
              Pull Another Card
            </button>
            <button
              onClick={handleShare}
              disabled={disabled}
              className="w-full py-3 border border-[var(--ink-ghost)] text-[var(--ink-faded)] text-[0.65rem] tracking-[0.18em] uppercase transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)] disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ fontFamily: "var(--type)" }}
            >
              {copied ? "Copied to clipboard" : "Share this"}
            </button>
          </div>
          {footerSlot}
        </>
      )}
    </div>
  );
}
