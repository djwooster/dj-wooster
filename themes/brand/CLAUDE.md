# DJ Wooster — Brand Site — Claude Instructions

## Themes
This repo holds multiple site "themes". The active one lives at the root (`app/`, `components/`, `lib/`, `CLAUDE.md`); inactive ones are parked intact in `themes/<name>/`.
- `npm run theme` — show active theme
- `npm run theme <name>` — switch (e.g. `npm run theme portfolio` restores the product design portfolio)
- `public/`, `package.json`, and configs are shared across themes. Put brand-only assets in `public/brand/`.
- Never edit files inside `themes/` unless asked — they're the parked themes.

## Project Overview
DJ Wooster designs and builds custom websites, web apps and iOS apps for established businesses (from $15K). DJ's own live products (FocusMode, RE-IQ, SourceIQ) are the proof. Courses, YouTube and Skool are secondary and live off the homepage.
**Strategy (wins over everything else):** `docs/site-brief.md` — the homepage turns leads into "Start a project" inquiries for custom websites and apps from $15K. Amendments from DJ (Oct 26): traffic also comes from ads, not only warm leads, so the homepage must sell to strangers too; the work should show range (any web or mobile app), at expert level.
**Design spec:** `docs/brand-build-prompt.md` — voice, tokens, motifs and components still apply. Its goals, site map and funnels are superseded by the brief.

**Stack:** Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion
**Fonts:** Geist (sans), Geist Mono (labels, metadata, all numbers), Doto (dot-matrix display, rare hero moments only)
**Email:** Resend, configured later — `EmailCapture` posts to a stub `/api/subscribe` until then
**Analytics:** Vercel Analytics, custom events on every signup and CTA click

## Decisions (override the spec where they differ)
- **Corners:** iOS-style — 12–16px on cards and panels (not the spec's 8px), fully rounded pills for labels and buttons
- **Product visuals:** coded, animated React recreations of each product's key screens on the homepage and in feature explainers; real screenshots on product pages
- **UI quality bar:** everything looks production-grade, even explainer animations — real UI, not illustrations
- **Motion:** iOS-quality spring animations (Framer Motion springs), product-demo style; respect `prefers-reduced-motion`
- **Tactile object:** the Teenage Engineering-style FocusMode device lives on `/products/focusmode` only
- **Hero:** headline option C ("Built for your business. *Shipped in weeks.*"). The visual is `HeroBuild`: a typed client need springs open into the finished product (browser or phone), which then does its job. It cycles website (Coast Gallery), web app (RE-IQ), iOS app (FocusMode). No "AI generates it" framing, and no money or results claims
- **Selected work:** one section per project (highlights on one side, coded demo on the other, sides alternate), data in `lib/work.ts`. Client work leads. Coast Gallery (client, approved to show) is recreated with coded stand-in art; its real site uses other artists' images and invented works, so never screenshot it
- **Old design work** (the portfolio case studies: MSK, Inbound Health, National Grid, etc.) stays off this site. It lives only in `themes/portfolio/`
- **Inquiries:** every Start a project link goes through `startHref(from)` so `/start` records the source; form choices live in `lib/inquiry.ts`
- **Influences:** Teenage Engineering, Dieter Rams, Linear, Vercel, Supabase, Notion
- **Ad landing pages** (e.g. `/vibe-code-a-mobile-app` for the Ship Your App cohort): noindex, listed in `landingRoutes` in `lib/site.ts` so the header drops its nav. CTAs go through `CourseCta`, which follows the course config (waitlist until `status: "open"` + `checkoutUrl`, a Stripe payment link). Ship Your App is self-paced with live calls 3× a week; $495, $249 early bird, payment plan available. Goal: 1,000 sales by Dec 31, 2026. Its animations (`components/landing/`) recreate real UI as closely as possible (Claude Code terminal, iPhone, App Store, call app) in those products' own palettes
- Placeholder copy is always marked `[TODO: …]`
