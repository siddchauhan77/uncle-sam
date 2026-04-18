# Case Study — Uncle Sam

> Interactive Sam Parr experience: scrollytelling, oracle, and archetype quiz.

---

## Problem

Sam Parr's writing — across The Hustle, My First Million newsletters, and essays — contains dense, practical wisdom on business ideas, entrepreneurship, and anti-conventional thinking. But it lives scattered across paid newsletters, YouTube transcripts, and old articles. Most people skim the surface and never absorb the best ideas.

The question: what if you could engage with that content in a way that felt like an experience, not a reading list?

---

## Approach

Built a three-mode interactive web experience on top of a curated, structured content corpus:

1. **Scrollytelling homepage** — pulls `scrollytelling_eligible` cards from the content layer and reveals them progressively as the user scrolls. Newspaper broadsheet aesthetic: double rules, serif display type, ink-on-paper color palette. Creates a "reading the paper" ritual feel.

2. **Wisdom Oracle** — a card-draw interface that surfaces one Sam Parr insight at a time. The oracle cycles through unseen cards first (tracked via a `Set<string>` in component state) before repeating. Designed for daily-use: open it, pull a card, close it.

3. **Archetype Quiz** — 5 questions (how you think about ideas, what blocks you, how you define success, your relationship to boring businesses, and your current situation) → scored against archetype profiles → a personalized "entrepreneur type" result with framing language from Sam's actual writing.

---

## Architecture

```
Content Layer
  ├── data/content.json          ← structured corpus (quotes, excerpts, themes, eligibility flags)
  ├── lib/content.ts             ← typed accessors (getOracleCards, getScrollytellingCards)
  └── lib/archetypes.ts          ← quiz scoring → archetype output

Routes
  ├── app/page.tsx               ← scrollytelling (filtered by scrollytelling_eligible)
  ├── app/oracle/page.tsx        ← oracle (filtered by oracle_eligible, seen-set deduplication)
  └── app/quiz/page.tsx          ← 5-question flow (choice type) → ArchetypeResult component

External
  ├── @notionhq/client           ← Notion as content CMS for managing/updating the corpus
  └── openai                     ← content enrichment and archetype generation
```

**Key content model fields:**
- `oracle_eligible` / `scrollytelling_eligible` — flags that control which mode a piece appears in
- `themes[]` — used for future filtering and recommendation
- `life_situations[]` — aligns oracle results to where the user is right now
- `source_url` + `source_title` — every excerpt links back to the original source (attribution-first)

---

## Design Decisions

**Newspaper aesthetic** — Same visual system as uncle-shaan. Double rules, uppercase tracking, print-era typography. The choice was intentional: Sam Parr's content style is punchy, declarative, "just the facts" — newspaper editorial fits that voice better than a clean SaaS interface.

**Three modes, not one** — Passive reading (scrollytelling), reflective engagement (oracle), and active self-assessment (quiz) cover different user intents. A user can return for any mode without it feeling repetitive.

**Seen-set deduplication on the oracle** — Prevents the same card appearing twice in a session without blocking randomness long-term. After all cards are seen, it resets. Simple, no persistence needed.

**Notional + OpenAI as content infrastructure** — Notion handles editorial workflow (add/edit/remove entries without touching code). OpenAI handles enrichment for archetype language generation. Clean separation of content management from application logic.

---

## Companion Project

- **[Uncle Shaan](https://github.com/siddchauhan77/uncle-shaan)** — same stack, Shaan Puri's essays and newsletters

The "uncle" series concept: take a prolific creator's body of work, structure it semantically, and build multiple engagement modes on top. Each creator gets their own distinct visual treatment but shares the underlying content architecture.

---

## Takeaways

- Demonstrates full-stack Next.js development with App Router and TypeScript
- Shows content architecture thinking: structured corpus → typed accessors → filtered UI modes
- Shows UI/UX taste: editorial aesthetic, progressive disclosure, state management (oracle seen-set)
- Demonstrates ability to ship creative, content-driven products quickly with AI-assisted content pipelines
