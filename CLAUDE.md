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
- **Section headings:** `text-3xl font-bold tracking-[-.03em] uppercase`
- **Act headings:** `text-4xl md:text-5xl font-black tracking-tight leading-none`
- **Outcome stats:** `text-3xl md:text-4xl font-black tracking-tight leading-[1.1]`
- **Body text:** `text-base md:text-lg leading-relaxed text-black/65`
- **Small uppercase labels:** `text-xs tracking-[0.3em] uppercase text-black/35` — bumped from `text-[10px]` in a recent pass; never go below `text-xs` for labels
- **Nav/footer links:** `text-sm tracking-widest uppercase`

### Borders & surfaces
- Section dividers: `border-b border-black/10`
- Cards/artifacts: `border border-black/10 bg-black/[0.02]`
- Standard section padding: `px-6 md:px-12 py-20`

### TL;DR block (ProjectHero)
- Sits below the tag pills in the hero section
- `relative bg-black/[0.02] px-12 py-7` with four corner brackets (not a full border)
- Corner brackets: `absolute w-8 h-8 border-t-2 border-l-2 border-black/50` (each corner gets its own div)
- Label: `text-xs tracking-[0.25em] uppercase text-black/40 font-medium`
- Body: `text-base md:text-lg leading-relaxed text-black/75 max-w-3xl`

### Animations
- All scroll-triggered sections use `sectionVariants` (`opacity: 0→1, y: 40→0, duration: 0.8`)
- Use `EASE` from `lib/motion.ts` for all cubic bezier easing
- Viewport margin: `margin: "-80px"`, `once: true`

---

## Data Model (`lib/projects.ts`)

### Project interface (key optional fields)
```ts
tldr?: string           // 2-3 sentence summary for the hero block
context?: ProjectContext // role, timeline, team, scope — shown as metadata grid
problem?: string        // strong problem statement (one paragraph)
acts?: ProjectAct[]     // enables three-act layout in ProjectContent
systemsNote?: string    // design system thread, rendered before Outcome
```

### ProjectAct interface
```ts
number: string          // "01"
name: string            // "Liaison"
surface: string         // "Salesforce App · Care Liaison"
outcome: string         // punchy result — the skimmable hook (rendered large)
decision: string        // "I designed X to solve Y" — one tight paragraph
researchInsights?: string[]  // 2-4 numbered bullets, insight-led not method-led
images?: string[]       // 1-2 images; shows placeholder if omitted
```

### ProjectContent rendering logic
- If `project.acts` exists → renders **acts layout**: hero image → context grid → problem → Act 01 → Act 02 → Act 03 → systems note → outcome
- Otherwise → renders **standard layout**: overview → hero image → challenge → process → prototype gif → final images → outcome

---

## Copy Conventions (from case study brief)

- **Lead with outcomes**, not feature descriptions
- Sentence structure: "I designed X to solve Y, which resulted in Z"
- **Never** use: "leveraged", "human-centered", "intuitive", "seamless"
- Problem framing: specific, named, quantified where possible
- Research: lead with the **insight**, not the methodology
- Curate images ruthlessly — 1-2 per section max
- Don't inflate outcomes or claim credit for things not directly attributable to design

---

## Current Work in Progress

**Branch:** `inbound-health-visualization`
**Status:** Committed and pushed, not yet merged to `main`

**What's on the branch:**
Rebuilt the Inbound Health case study from a single-surface patient iOS story into a three-act narrative spanning all three product surfaces (Liaison Salesforce app, Biometric Nurse Salesforce dashboard, custom iOS patient app).

**What still needs doing:**
- Drop in real screenshots for Act 01 (Liaison) and Act 02 (Biometric Nurse) — placeholders currently shown
- Review copy in all three acts with DJ and refine as needed
- Decide whether to merge to `main` or keep iterating on the branch

**To resume:** `git checkout inbound-health-visualization`

---

## Projects

| Slug | Title | Status |
|---|---|---|
| `inbound-health` | Hospital at Home | Active — three-act layout on branch |
| `workforce-mobile` | Workforce Mobile | Live on main — standard layout |
| `commerce-elevated` | Redesigned Clinical Systems | `comingSoon: true` — placeholder |
