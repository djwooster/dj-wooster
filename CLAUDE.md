# DJ Wooster — Brand Site — Claude Instructions

## Themes
This repo holds multiple site "themes". The active one lives at the root (`app/`, `components/`, `lib/`, `CLAUDE.md`); inactive ones are parked intact in `themes/<name>/`.
- `npm run theme` — show active theme
- `npm run theme <name>` — switch (e.g. `npm run theme portfolio` restores the product design portfolio)
- `public/`, `package.json`, and configs are shared across themes. Put brand-only assets in `public/brand/`.
- Never edit files inside `themes/` unless asked — they're the parked themes.

## Project Overview
Home of the DJ Wooster brand: a software creator who builds and ships products (RE-IQ, SourceIQ, FocusMode) and teaches others to do the same with Claude Code.
**Full spec:** `docs/brand-build-prompt.md` — positioning, voice, tokens, motifs, components, site map, funnels, acceptance criteria. Read it before building anything new.

**Stack:** Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion
**Fonts:** Geist (sans), Geist Mono (labels, metadata, all numbers), Doto (dot-matrix display, rare hero moments only)
**Email:** Resend, configured later — `EmailCapture` posts to a stub `/api/subscribe` until then
**Analytics:** Vercel Analytics, custom events on every signup and CTA click

## Decisions (override the spec where they differ)
- **Corners:** iOS-style — 12–16px on cards and panels (not the spec's 8px), fully rounded pills for labels and buttons
- **Product visuals:** coded, animated React recreations of each product's key screens on the homepage and in feature explainers; real screenshots on product pages
- **UI quality bar:** everything looks production-grade, even explainer animations — real UI, not illustrations
- **Motion:** iOS-quality spring animations (Framer Motion springs), product-demo style; respect `prefers-reduced-motion`
- **Tactile object:** the Teenage Engineering-style FocusMode device lives on `/products/focusmode` only; the homepage uses pictograms and node lines
- **/work:** portfolio case studies copied from `themes/portfolio/` with content unchanged, restyled to this site's tokens
- **Influences:** Teenage Engineering, Dieter Rams, Linear, Vercel, Supabase, Notion
- Placeholder copy is always marked `[TODO: …]`
