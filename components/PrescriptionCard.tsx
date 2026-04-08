import Image from "next/image";
import type { ContentEntry } from "@/lib/content";

type Props = {
  entry: ContentEntry;
  reason: string;
  index: number;
};

const RX_LABELS = ["Rx. I", "Rx. II", "Rx. III", "Rx. IV"];

export default function PrescriptionCard({ entry, reason, index }: Props) {
  return (
    <div
      className="flex flex-col gap-4 p-6 border border-[var(--ink-ghost)]"
      style={{
        backgroundColor: "var(--paper-light)",
        boxShadow: "2px 3px 14px rgba(10,10,10,0.06)",
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between">
        <span className="stamp">{RX_LABELS[index] ?? `Rx. ${index + 1}`}</span>
        <span
          className="text-[0.58rem] text-[var(--ink-faded)] tracking-wider mt-0.5"
          style={{ fontFamily: "var(--type)" }}
        >
          {entry.date}
        </span>
      </div>

      <div className="rule" />

      {/* Source */}
      <p
        className="text-[0.62rem] font-bold tracking-widest text-[var(--ink-faded)] uppercase"
        style={{ fontFamily: "var(--type)" }}
      >
        {entry.source_title}
      </p>

      {/* Reason — editorial note */}
      <p
        className="text-sm italic text-[var(--gold)] leading-relaxed"
        style={{ fontFamily: "var(--body)" }}
      >
        {reason}
      </p>

      {/* Pull quote */}
      <blockquote
        className="text-base leading-snug text-[var(--ink)] border-l-2 border-[var(--gold)] pl-4 uppercase"
        style={{ fontFamily: "var(--display)" }}
      >
        &ldquo;{entry.quote}&rdquo;
      </blockquote>

      <div className="rule" />

      {/* Footer */}
      <div className="flex items-center justify-between pt-0.5">
        <div className="flex items-center gap-2">
          <Image
            src="/sam-avatar.png"
            alt="Sam Parr"
            width={20}
            height={20}
            className="rounded-full"
            style={{ filter: "sepia(0.15) contrast(1.05)", objectFit: "cover" }}
          />
          <span
            className="text-[0.58rem] text-[var(--ink-faded)] tracking-wider"
            style={{ fontFamily: "var(--type)" }}
          >
            Sam Parr
          </span>
        </div>
        <a
          href={entry.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.6rem] tracking-widest uppercase text-[var(--gold)] hover:underline"
          style={{ fontFamily: "var(--type)" }}
        >
          Read it →
        </a>
      </div>
    </div>
  );
}
