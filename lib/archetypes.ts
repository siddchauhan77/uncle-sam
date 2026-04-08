// ─────────────────────────────────────────────
// Archetype definitions — Uncle Sam quiz
// ─────────────────────────────────────────────

export type ArchetypeId =
  | "idea-hoarder"
  | "overthink-er"
  | "boring-biz-skeptic"
  | "almost-operator";

export type Prescription = {
  type: "quote" | "action" | "mindset";
  contentId?: string; // references content.json id
  label: string;
  body: string;
};

export type Archetype = {
  id: ArchetypeId;
  name: string;
  tagline: string;
  diagnosis: string;
  prescriptions: Prescription[];
  mfmSearches: { label: string; query: string }[];
};

export const ARCHETYPES: Record<ArchetypeId, Archetype> = {
  "idea-hoarder": {
    id: "idea-hoarder",
    name: "The Idea Hoarder",
    tagline: "You have 47 ideas and zero launched products.",
    diagnosis:
      "You collect business ideas like they're Pokémon cards. Every week there's a new one — a better one — and the old ones pile up in a Google Doc you haven't opened in months. Here's what Sam would tell you: ideas are worth exactly nothing. The Hustle didn't start because Sam had a perfect idea. It started because he picked one and went. The idea graveyard is full of people who were 'still figuring it out.'",
    prescriptions: [
      {
        type: "action",
        label: "Do this now",
        body: "Open that Google Doc. Pick the idea you've come back to the most — not the best-sounding one, the one you can't stop thinking about. Kill the rest. You're not allowed to add new ideas for 30 days. Work the one you picked.",
      },
      {
        type: "quote",
        contentId: "boring-biz-1",
        label: "What Sam says",
        body: "The best business idea isn't the one that sounds most impressive at dinner. It's the one you'll actually work on at 6am when nobody's watching.",
      },
      {
        type: "mindset",
        label: "Think this",
        body: "Every day you're not building is a day your 'ideas' are just daydreams. Pick one. Ship something ugly. Learn from real customers, not from your imagination.",
      },
    ],
    mfmSearches: [
      { label: "Idea validation", query: "idea validation" },
      { label: "First customers", query: "first customers" },
      { label: "Newsletter business", query: "newsletter business" },
    ],
  },

  "overthink-er": {
    id: "overthink-er",
    name: "The Overthink-er",
    tagline: "You need one more piece of info before you start.",
    diagnosis:
      "You've read 40 books on entrepreneurship. You've watched every MFM episode. You've built a Notion database tracking competitors in a market you haven't entered yet. You call it research. Sam calls it fear in a lab coat. The truth is you know enough. You've known enough for six months. The information you're seeking is only available on the other side of doing it — not before.",
    prescriptions: [
      {
        type: "action",
        label: "Do this now",
        body: "Set a 48-hour deadline to do ONE thing that's scary: email a potential customer, post about your idea publicly, or buy the domain. Not plan it. Do it. Fear goes away when motion starts — never before.",
      },
      {
        type: "quote",
        contentId: "hustle-origin-1",
        label: "What Sam says",
        body: "I started The Hustle with $0 and no clue what I was doing. I figured it out as I went. That's the only way you figure it out.",
      },
      {
        type: "mindset",
        label: "Think this",
        body: "More information will not make you more ready. You are procrastinating in the language of preparation. The only cure is a small, irreversible action. Take one today.",
      },
    ],
    mfmSearches: [
      { label: "Boring business", query: "boring business" },
      { label: "Ramen profitable", query: "ramen profitable" },
      { label: "Just start", query: "just start first step" },
    ],
  },

  "boring-biz-skeptic": {
    id: "boring-biz-skeptic",
    name: "The Boring Biz Skeptic",
    tagline: "You keep waiting for a 'real' idea.",
    diagnosis:
      "You want to build something impressive — something you can brag about. An app. A platform. A startup. The boring stuff — laundromats, pressure washing, newsletter businesses, B2B SaaS for niche industries — doesn't feel like a 'real' business. Sam built his fortune on The Hustle, a newsletter. A newsletter. While you're waiting for the perfect tech idea, unglamorous businesses are printing money for people with less talent and more action.",
    prescriptions: [
      {
        type: "quote",
        contentId: "boring-biz-2",
        label: "What Sam says",
        body: "The most boring business idea in the room is usually the best one. Boring means proven demand. Boring means less competition. Boring means you can win.",
      },
      {
        type: "action",
        label: "Do this now",
        body: "Find a local service business or B2B niche that makes $500K–$5M/year doing something 'boring.' Now ask: could I build a modern version of this for a specific niche? That's your idea. Not the flashy one. That one.",
      },
      {
        type: "mindset",
        label: "Think this",
        body: "Impressive to whom? Your friends who also aren't building anything? Boring businesses pay boring-sized mortgages, boring family vacations, boring financial freedom. That boring freedom is actually pretty exciting.",
      },
    ],
    mfmSearches: [
      { label: "Boring business", query: "boring business" },
      { label: "Acquisition entrepreneur", query: "acquisition entrepreneur" },
      { label: "B2B ideas", query: "b2b business ideas" },
    ],
  },

  "almost-operator": {
    id: "almost-operator",
    name: "The Almost Operator",
    tagline: "You're 90% there. The 10% is just fear.",
    diagnosis:
      "You have a plan. You know the market. You've validated the idea with real conversations. You might even have a waitlist. But you keep finding reasons to delay the launch. One more thing to fix. One more feature to build. One more week. Sam knows exactly what this is — he's been here. The launch is scary because it makes failure real. Right now failure is still theoretical. Launching makes it count. That's the point.",
    prescriptions: [
      {
        type: "action",
        label: "Do this now",
        body: "Pick a date — not a goal, a date. Tell three people who'll hold you accountable. Then make the thing live on that date regardless of whether it's perfect. Done beats perfect. Shipped beats polished.",
      },
      {
        type: "quote",
        contentId: "first-dollar-1",
        label: "What Sam says",
        body: "Your first dollar is the hardest dollar you'll ever make. It's also the most important one. Because after the first dollar, you know it's real.",
      },
      {
        type: "mindset",
        label: "Think this",
        body: "The version 1 that ships is infinitely better than the version 2 that doesn't. Your customers will tell you what to fix — but only after you let them in. Stop optimizing in private. Launch.",
      },
    ],
    mfmSearches: [
      { label: "First customers", query: "first customers revenue" },
      { label: "Launch strategy", query: "product launch" },
      { label: "Newsletter business", query: "newsletter business" },
    ],
  },
};

// ─────────────────────────────────────────────
// Mapping logic — quiz answers → archetype
// ─────────────────────────────────────────────

type Answers = {
  ideas: string;
  blocker: string;
  success: string;
  boring: string;
  situation: string;
};

export function getArchetype(answers: Answers): Archetype {
  const { ideas, blocker, boring, situation } = answers;

  // Has tons of ideas and no launch → Idea Hoarder
  if (ideas === "lost-count" || ideas === "five-twenty") {
    return ARCHETYPES["idea-hoarder"];
  }

  // Already building with a plan → Almost Operator
  if (situation === "building") {
    return ARCHETYPES["almost-operator"];
  }

  // Actively dismisses boring businesses → Boring Biz Skeptic
  if (boring === "boring-bad") {
    return ARCHETYPES["boring-biz-skeptic"];
  }

  // Needs more info / scared → Overthink-er
  if (blocker === "skills" || blocker === "right-idea") {
    return ARCHETYPES["overthink-er"];
  }

  // Has 1-5 ideas, just scared → Overthink-er
  if (ideas === "one-five" && blocker === "scared") {
    return ARCHETYPES["overthink-er"];
  }

  // Has money blockers → Almost Operator
  if (blocker === "money") {
    return ARCHETYPES["almost-operator"];
  }

  // Default
  return ARCHETYPES["idea-hoarder"];
}
