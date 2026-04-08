import Link from "next/link";
import ScrollSection from "@/components/ScrollSection";
import EmailCapture from "@/components/EmailCapture";
import { getScrollytellingCards } from "@/lib/content";

export default function Home() {
  const cards = getScrollytellingCards();

  const heroQuote    = cards.find((c) => c.id === "hustle-origin-1");
  const quote1       = cards.find((c) => c.id === "ideas-cheap-1");
  const quote2       = cards.find((c) => c.id === "boring-biz-2");
  const quote3       = cards.find((c) => c.id === "fear-dressed-1");
  const quote4       = cards.find((c) => c.id === "blue-collar-1");

  return (
    <main className="flex flex-col">

      {/* ── MASTHEAD / HERO ── */}
      <section
        className="min-h-screen flex flex-col px-6 py-14"
        style={{ backgroundColor: "var(--paper)", color: "var(--ink)" }}
      >
        <ScrollSection delay={0}>
          <div className="rule-double mb-4" />
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-[0.58rem] tracking-[0.22em] text-[var(--ink-faded)] uppercase"
              style={{ fontFamily: "var(--type)" }}
            >
              Est. for the doers
            </span>
            <span
              className="text-[0.58rem] tracking-[0.22em] text-[var(--ink-faded)] uppercase"
              style={{ fontFamily: "var(--type)" }}
            >
              Vol. I · Issue 1
            </span>
          </div>
          <div className="rule" />
        </ScrollSection>

        {/* Giant masthead title */}
        <ScrollSection delay={120}>
          <div className="text-center py-10">
            <p
              className="text-[0.6rem] tracking-[0.4em] uppercase mb-3"
              style={{ fontFamily: "var(--type)", color: "var(--red)" }}
            >
              <span className="stamp-breaking">Breaking</span>
            </p>
            <h1
              className="font-black leading-none tracking-tight uppercase"
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(4.5rem, 18vw, 9rem)",
              }}
            >
              Uncle<br />Sam
            </h1>
            <p
              className="text-[0.6rem] tracking-[0.28em] uppercase mt-4"
              style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
            >
              School taught you a lot. He teaches you the rest.
            </p>
          </div>
        </ScrollSection>

        <div className="rule-double mb-8" />

        {/* CTA block */}
        <ScrollSection delay={240}>
          <div className="flex flex-col gap-4 max-w-sm mx-auto w-full">
            <p
              className="text-lg italic leading-relaxed text-center"
              style={{ fontFamily: "var(--body)", color: "var(--ink-mid)" }}
            >
              &ldquo;Real talk on business, money, and why you&apos;re still not building.&rdquo;
            </p>
            <div className="flex flex-col gap-2 mt-2">
              <Link
                href="/quiz"
                className="w-full py-3.5 text-center text-[0.65rem] tracking-[0.2em] uppercase transition-colors hover:opacity-80"
                style={{
                  fontFamily: "var(--type)",
                  backgroundColor: "var(--ink)",
                  color: "var(--paper)",
                }}
              >
                Take the Quiz →
              </Link>
              <Link
                href="/oracle"
                className="w-full py-3 text-center text-[0.65rem] tracking-[0.2em] uppercase border transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                style={{
                  fontFamily: "var(--type)",
                  borderColor: "var(--ink)",
                  color: "var(--ink)",
                }}
              >
                Pull a Card
              </Link>
            </div>
          </div>
        </ScrollSection>

        {/* Scroll hint */}
        <ScrollSection delay={420} className="flex justify-center mt-10">
          <div className="flex flex-col items-center gap-2" style={{ color: "var(--ink-faded)" }}>
            <span
              className="text-[0.55rem] tracking-[0.35em] uppercase"
              style={{ fontFamily: "var(--type)" }}
            >
              Scroll
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-current to-transparent opacity-60" />
          </div>
        </ScrollSection>
      </section>

      {/* ── THE HUSTLE ORIGIN — dark ── */}
      {heroQuote && (
        <section
          className="min-h-screen flex items-center justify-center px-6 py-24"
          style={{ backgroundColor: "var(--dark-bg)", color: "var(--paper)" }}
        >
          <ScrollSection className="max-w-2xl mx-auto">
            <div className="rule-double mb-8" style={{ opacity: 0.3 }} />
            <p
              className="text-[0.6rem] tracking-[0.35em] uppercase mb-8"
              style={{ fontFamily: "var(--type)", color: "var(--gold)" }}
            >
              On how it started
            </p>
            <blockquote
              className="leading-relaxed mb-8 uppercase"
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
              }}
            >
              &ldquo;{heroQuote.quote}&rdquo;
            </blockquote>
            <p className="text-base leading-loose mb-8" style={{ fontFamily: "var(--body)", color: "rgba(245,240,232,0.72)" }}>
              {heroQuote.full_excerpt}
            </p>
            <div className="rule-double" style={{ opacity: 0.3 }} />
          </ScrollSection>
        </section>
      )}

      {/* ── IDEAS ARE CHEAP ── */}
      {quote1 && (
        <section
          className="min-h-screen flex items-center justify-center px-6 py-24"
          style={{ backgroundColor: "var(--paper)", color: "var(--ink)" }}
        >
          <ScrollSection className="max-w-2xl mx-auto">
            <div className="w-8 h-0.5 mb-8" style={{ backgroundColor: "var(--red)" }} />
            <p
              className="text-[0.6rem] tracking-[0.3em] uppercase mb-6"
              style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
            >
              On ideas vs. execution
            </p>
            <blockquote
              className="leading-relaxed mb-8 uppercase"
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)",
              }}
            >
              &ldquo;{quote1.quote}&rdquo;
            </blockquote>
            <div className="rule mb-4" />
            <span
              className="text-[0.62rem] tracking-wide"
              style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
            >
              {quote1.source_title} · {quote1.date}
            </span>
          </ScrollSection>
        </section>
      )}

      {/* ── BORING BUSINESS — dark ── */}
      {quote2 && (
        <section
          className="min-h-screen flex items-center justify-center px-6 py-24"
          style={{ backgroundColor: "var(--dark-bg)", color: "var(--paper)" }}
        >
          <ScrollSection className="max-w-2xl mx-auto text-center">
            <p
              className="text-[0.6rem] tracking-[0.35em] uppercase mb-8"
              style={{ fontFamily: "var(--type)", color: "var(--gold)" }}
            >
              On boring businesses
            </p>
            <blockquote
              className="leading-relaxed mb-8 uppercase"
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)",
              }}
            >
              &ldquo;{quote2.quote}&rdquo;
            </blockquote>
            <div className="rule mb-4" style={{ opacity: 0.3 }} />
            <p
              className="text-[0.62rem] tracking-wide"
              style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
            >
              — {quote2.source_title}
            </p>
          </ScrollSection>
        </section>
      )}

      {/* ── FEAR DRESSED AS RESEARCH ── */}
      {quote3 && (
        <section
          className="min-h-screen flex items-center justify-center px-6 py-24"
          style={{ backgroundColor: "var(--paper-warm)", color: "var(--ink)" }}
        >
          <ScrollSection className="max-w-2xl mx-auto">
            <p
              className="text-[0.6rem] tracking-[0.3em] uppercase mb-6"
              style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
            >
              On overthinking
            </p>
            <blockquote
              className="leading-relaxed mb-8 uppercase"
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)",
              }}
            >
              &ldquo;{quote3.quote}&rdquo;
            </blockquote>
            <div className="rule mb-4" />
            <span
              className="text-[0.62rem] tracking-wide"
              style={{ fontFamily: "var(--type)", color: "var(--ink-faded)" }}
            >
              {quote3.source_title} · {quote3.date}
            </span>
          </ScrollSection>
        </section>
      )}

      {/* ── THE CHIP ── */}
      {quote4 && (
        <section
          className="min-h-[65vh] flex items-center justify-center px-6 py-24"
          style={{ backgroundColor: "var(--paper)", color: "var(--ink)" }}
        >
          <ScrollSection className="max-w-xl mx-auto text-center">
            <div className="rule-double mb-8" />
            <blockquote
              className="leading-relaxed mb-6 uppercase"
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(1.3rem, 3vw, 1.9rem)",
              }}
            >
              &ldquo;{quote4.quote}&rdquo;
            </blockquote>
            <p
              className="text-[0.6rem] tracking-[0.35em] uppercase"
              style={{ fontFamily: "var(--type)", color: "var(--gold)" }}
            >
              Sound familiar?
            </p>
            <div className="rule-double mt-8" />
          </ScrollSection>
        </section>
      )}

      {/* ── FINAL CTA — dark ── */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center"
        style={{ backgroundColor: "var(--dark-bg)", color: "var(--paper)" }}
      >
        <ScrollSection className="max-w-md mx-auto w-full">
          <div className="rule-double mb-10" style={{ opacity: 0.3 }} />
          <p
            className="text-[0.6rem] tracking-[0.35em] uppercase mb-4"
            style={{ fontFamily: "var(--type)", color: "var(--gold)" }}
          >
            The diagnosis
          </p>
          <h2
            className="leading-none mb-6 uppercase"
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(2.2rem, 8vw, 3.5rem)",
            }}
          >
            Why aren&apos;t<br />you building?
          </h2>
          <p
            className="text-base mb-10 leading-loose"
            style={{ fontFamily: "var(--body)", color: "rgba(245,240,232,0.72)" }}
          >
            5 questions. Uncle Sam gives you a straight answer.<br />
            No fluff. No hand-holding. Just the truth.
          </p>
          <div className="flex flex-col gap-4">
            <Link
              href="/quiz"
              className="w-full py-4 text-center text-[0.65rem] tracking-[0.2em] uppercase transition-colors hover:opacity-80"
              style={{
                fontFamily: "var(--type)",
                backgroundColor: "var(--gold)",
                color: "var(--ink)",
              }}
            >
              Take the quiz — get your prescription
            </Link>
            <Link
              href="/oracle"
              className="w-full py-3.5 text-center text-[0.65rem] tracking-[0.2em] uppercase border transition-colors hover:border-[var(--paper)] hover:text-[var(--paper)]"
              style={{
                fontFamily: "var(--type)",
                borderColor: "var(--ink-faded)",
                color: "var(--ink-faded)",
              }}
            >
              Just pull a card
            </Link>
            <div className="mt-2">
              <EmailCapture source="homepage" />
            </div>
          </div>
          <div className="rule-double mt-10" style={{ opacity: 0.3 }} />
        </ScrollSection>
      </section>
    </main>
  );
}
