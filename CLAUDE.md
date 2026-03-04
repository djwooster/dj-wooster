# DJ Wooster Portfolio — Claude Instructions

## Project Overview
UX/UI portfolio for DJ Wooster. Built for recruiters — short, imagery-forward, and outcome-led. Creative digital agency aesthetic.

**Stack:** Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion
**Font:** Geist
**Colors:** Pure black & white only, no dark mode
**Style:** 0px border radius everywhere, large bold type, editorial feel

---

## Architecture

- No `src/` directory — components, lib, app all at root
- `app/layout.tsx` — wraps everything with `<Navigation />`
- `app/page.tsx` — Home: Hero, FeaturedProjects, Marquee, Skills, Footer
- `app/projects/[slug]/page.tsx` — SSG project pages via `generateStaticParams`
- `lib/projects.ts` — **single source of truth** for all project data and types
- `lib/motion.ts` — shared `EASE` constant (`[number, number, number, number]`) required for Framer Motion TypeScript compatibility — never use raw `number[]`

---

## Design Conventions

### Typography scale
- **Hero titles:** `text-[12vw] md:text-[6vw] font-black tracking-tight`
- **Section headings:** `text-3xl font-bold tracking-[-.03em] uppercase text-black` — used for ALL named sections: Business Goals, Process, What We Heard, Key Insights, What We Tested, Solution, Design System, Outcome, Overview, The Challenge, The Problem, Problem Statement, Root Causes, Qualitative Research, Key Insight. **Never use the small label style (`text-xs tracking-[0.3em] uppercase text-black/35`) for section titles** — reserve that only for sub-labels and metadata.
- **Act headings:** `text-4xl md:text-5xl font-black tracking-tight leading-none`
- **Act outcome stats:** `text-3xl font-bold tracking-[-.03em] uppercase text-black`
- **Body text:** `text-base md:text-lg leading-relaxed text-black/65`
- **Small uppercase labels:** `text-xs tracking-[0.3em] uppercase text-black/35` — never go below `text-xs`
- **Nav/footer links:** `text-sm tracking-widest uppercase`

### Borders & surfaces
- Section dividers: `border-b border-black/10`
- Cards/artifacts: `border border-black/10 bg-black/[0.02]`
- Standard section padding: `px-6 md:px-12 py-20`

### TL;DR block (ProjectHero)
- Sits below the tag pills in the hero section
- `relative bg-black/[0.02] px-12 py-7` with four corner brackets (not a full border)
- Corner brackets: `absolute w-8 h-8 border-t-2 border-l-2 border-black/50` (each corner gets its own div)

### Animations
- All scroll-triggered sections use `sectionVariants` (`opacity: 0→1, y: 40→0, duration: 0.8`)
- Use `EASE` from `lib/motion.ts` for all cubic bezier easing
- Viewport margin: `margin: "-80px"`, `once: true`

---

## Data Model (`lib/projects.ts`)

### Project interface — key fields
All text content fields (`overview`, `challenge`, `process`, `outcome`) are **optional** — omit them for `comingSoon` projects rather than setting to `""`.

```ts
// Layout selector
acts?: ProjectAct[]       // if present → acts layout; otherwise → standard layout

// Acts layout fields
context?: ProjectContext   // role, timeline, team, scope
problem?: string
businessGoals?: BusinessGoal[]
processPhases?: ProcessPhase[]
researchQuote?: ResearchQuote
systemsNote?: string

// Standard layout fields
overview?: string
challenge?: string
process?: string
outcome?: string

// Standard layout widgets (replaces slug-based conditionals)
challengeWidget?: ProjectWidget          // full-width override for challenge artifacts
challengeLeftWidget?: ProjectWidget      // left cell in 2-col challenge grid
challengeRightWidget?: ProjectWidget     // right cell in 2-col challenge grid
processWidget?: ProjectWidget            // full-width override for process artifacts
```

### ProjectWidget type
```ts
type ProjectWidget =
  | "heuristicEvaluation"   // MSK — full-width audit table
  | "constructionPersona"   // Workforce — left cell
  | "workforceFlowDiagram"  // Workforce — right cell
  | "workforceWireframes"   // Workforce — full-width process
```
To add a new custom component: add its name to `ProjectWidget`, create the component, add a case to the `Widget()` function in `ProjectContent.tsx`, then set the appropriate field in the project data. No slug checks needed.

### ProjectAct interface
```ts
number: string
name: string
surface: string           // "Salesforce App · Care Liaison" — first part used in act header label
outcome: string           // punchy result (rendered as section heading)
decision: string          // one tight paragraph
researchInsights?: string[]
iterations?: ActIteration[]   // "What We Tested" section — title, description, image
solutionText?: string         // "Solution" section — rendered between iterations and images
images?: string[]             // ordered as you want them displayed (no reversal flag needed)
```

### ProjectContent rendering logic
- **Acts layout** (if `project.acts`): hero image → context grid → problem → business goals → process phases → qualitative research → Act 01 → Act 02 → Act 03 → design system → outcome
- **Standard layout**: overview → hero image (if set) → context grid → challenge → process → prototype gif → final images → outcome

---

## Copy Conventions

- **Lead with outcomes**, not feature descriptions
- Sentence structure: "I designed X to solve Y, which resulted in Z"
- **Never** use: "leveraged", "human-centered", "intuitive", "seamless"
- Problem framing: specific, named, quantified where possible
- Research: lead with the **insight**, not the methodology
- Curate images ruthlessly — 1-2 per section max

---

## Projects

| Slug | Title | Layout | Status |
|---|---|---|---|
| `inbound-health` | Hospital at Home | Acts | Live on main |
| `msk-portal` | Oncology Portal Redesign | Standard | Live on main |
| `msk-data-abstraction` | Patient Data Abstraction | Standard | In progress — copy + images TBD |
| `national-grid` | National Grid | — | `comingSoon: true` |
