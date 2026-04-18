# Uncle Sam — An Interactive Sam Parr Experience

> Scrollytelling, wisdom oracle, and archetype quiz built on Sam Parr's essays and newsletters. Newspaper-editorial aesthetic. Companion to [Uncle Shaan](https://github.com/siddchauhan77/uncle-shaan).

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat&logo=vercel&logoColor=white)

---

## What It Is

An interactive web experience built on Sam Parr's writing — essays and newsletters from his body of work on entrepreneurship, business ideas, and the "blue collar billionaire" mindset. Three modes, one aesthetic: vintage broadsheet newspaper design.

---

## Three Experiences

| Route | What it does |
|-------|-------------|
| `/` | **Scrollytelling** — key quotes and ideas from Sam's writing revealed as you scroll, newspaper-feature style |
| `/oracle` | **Wisdom Oracle** — pull a card to get a random insight from Sam's writing; cycles through unseen cards before repeating |
| `/quiz` | **Archetype Quiz** — 5-question personality diagnostic (ideas, blockers, success definitions, risk tolerance, situation) → your entrepreneur archetype |

---

## Stack

- **Next.js** (App Router) with TypeScript
- **React** for component architecture
- **OpenAI** for content enrichment / archetype generation
- **Notion API** (`@notionhq/client`) as content CMS
- Content pipeline: essays/newsletters → structured `content.json` → filtered by `oracle_eligible` and `scrollytelling_eligible` flags
- Deployed on **Vercel**

---

## Content Architecture

```
data/content.json        ← source of truth for all Sam Parr quotes and excerpts
lib/content.ts           ← typed content layer (getOracleCards, getScrollytellingCards, getEntryById)
lib/archetypes.ts        ← quiz scoring logic → archetype mapping
app/page.tsx             ← scrollytelling homepage
app/oracle/page.tsx      ← card oracle with seen-set deduplication
app/quiz/page.tsx        ← 5-question flow → ArchetypeResult
```

Each content entry carries: `quote`, `full_excerpt`, `source_url`, `source_title`, `date`, `themes[]`, `life_situations[]`, `oracle_eligible`, `scrollytelling_eligible`.

---

## Part of a Series

This is the Sam Parr companion to [uncle-shaan](https://github.com/siddchauhan77/uncle-shaan) — which covers Shaan Puri. Same stack, same newspaper aesthetic, different voice and content corpus.

→ See full design and content decisions in [`CASE_STUDY.md`](./CASE_STUDY.md)
