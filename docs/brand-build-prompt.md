# djwooster.com — Claude Code Build Prompt

Oct 22, 2026 · @DJ Wooster

## How to use this prompt

Paste everything below this section into Claude Code, run from the root of the live djwooster.com project. The stack is already set up, so this prompt covers what to build and how it should look, not which tools to use.

- Everything is scaffolded: real structure, real components, placeholder copy where content does not exist yet.
- Placeholder copy is marked `[TODO: …]` so it is easy to find and replace.
- The current UX/UI portfolio content should be preserved and migrated into the new Work section, not deleted.

## Context and goals

Rebuild djwooster.com from a UX/UI design portfolio into the home of the DJ Wooster brand: a software creator who builds and ships products, and teaches others to do the same.

**Who I am.** DJ Wooster, a software creator. I build and ship SaaS and mobile products with Claude Code. Current products:

- **RE-IQ** — real-estate portfolio intelligence. Tracks NOI, occupancy and delinquency against budget, and surfaces what needs attention.
- **SourceIQ** — marketing and sales analytics. Ties ad spend, funnels and pipelines to revenue and ROAS.
- **FocusMode** — a focus timer with sessions, tags and stats, on the web and as a React Native iOS app (App Store review in progress).

**What the site must do, in priority order:**

1. Capture emails. There is no audience yet, so every page offers a way onto the list.
2. Sell courses. First: *Ship Your App with Claude Code* ($495), in waitlist mode now. Next: *Claude Code for UX Designers*.
3. Show the products as proof of expertise.
4. Get discovered through the blog, by search engines and LLMs.
5. Route people to YouTube, the Skool community, and light consulting.

**What it is not.** Not a job-seeking portfolio, and not an MRR dashboard. The design work stays, framed as craft and credibility.

## Positioning and voice

Position DJ Wooster as a software expert: thoughtful, intentional design that solves real problems. Design quality shows in the work itself; it is never the headline label.

**Hero (working draft):**

- Display line (dot-matrix): `DESIGN. BUILD. SHIP.`
- Headline: *Software, built with intention.*
- Subline: *I build products like FocusMode, RE-IQ and SourceIQ, and teach others to build and ship their own with Claude Code.*

**Voice:**

- Calm, confident and precise, like Linear or Vercel copy. Short sentences, concrete nouns.
- Show, don't claim: real product names, real screenshots, real numbers where they exist.
- No hype words ("revolutionary", "10x", "game-changing"), no exclamation marks, no emoji.
- Two-tone headlines: the first clause in ink, the continuation in gray. Example: *Software, built with intention.* **/** *Designed to solve real problems.*

## Design direction: Rams-grade software

The aesthetic is industrial Swiss design applied to software, guided by Dieter Rams's "less, but better." It should feel calm, precise, engineered and warm: never cold and corporate, never retro cosplay. Every element exists for a reason.

**Influences and what to take from each:**

| Reference | Take this |
| --- | --- |
| Linear, Vercel, Supabase, Notion | Restraint, hairline borders, neutral surfaces, precise spacing, excellent dark mode |
| shadcn/ui | Component structure and accessibility. Restyle it; never ship the default look |
| Dieter Rams / Braun | Numbered principle grids, pictograms built from circles and rectangles, a single accent dot |
| Swiss editorial decks | Huge numerals (`01`), two-tone headlines, pill labels with circle-arrow icons, footer metadata like `P.01` |
| PlayerZero | Dot-matrix display type, node-line diagrams with mono pill labels, dithered dot-cloud imagery |
| Generative geometry (dark) | White hairline wireframes, isometric cubes, dot fields, crosshair marks on true black |
| Teenage Engineering | One tactile object per page at most, like the FocusMode device. Not a full hardware skin |
| DJ's own products | Small uppercase mono labels with wide tracking, tabular numbers, color only for meaning |

**Rules:**

1. Grayscale first. Color appears only when it means something.
2. One accent moment per viewport, at most.
3. Show the grid: hairline dividers, numbered sections, crosshair marks at key intersections.
4. Numbers and data are heroes; captions stay small.
5. Geometry and dot fields instead of stock photography or 3D blobs.
6. Generous whitespace. When in doubt, remove.

## Design tokens

Light mode is the default; dark mode is a toggle that also respects the system setting. Define everything as CSS variables (or theme tokens) so both modes share one system.

**Color:**

| Token | Light (default) | Dark | Use |
| --- | --- | --- | --- |
| `--bg` | `#F2F1EE` warm paper | `#000000` | Page background |
| `--surface` | `#FAFAF8` | `#0B0B0B` | Cards, panels |
| `--surface-inverse` | `#111111` | `#F2F1EE` | Alternating black/light cards |
| `--ink` | `#111111` | `#F2F1EE` | Primary text |
| `--ink-2` | `#6B6A66` | `#8A8A86` | Secondary text, headline continuations |
| `--ink-3` | `#A3A29E` | `#55554F` | Captions, metadata |
| `--line` | `#DCDAD5` | `#1F1F1D` | Hairlines, borders, grid |
| `--accent` | `#2E74AE` | `#2E74AE` | Fills: primary button, active dot, node |
| `--accent-text` | `#2E74AE` | `#5A9BD4` | Accent links and small text (contrast-safe on black) |
| `--positive` | `#15803D` | `#4ADE80` | Data only |
| `--negative` | `#B42318` | `#F87171` | Data only |

**Type:**

- Sans: Geist (or Inter Display). Headlines tight (`-0.03em`), weight 500.
- Mono: Geist Mono. Small uppercase labels at 11–12px with `0.12em` tracking, metadata, and all numbers (`font-variant-numeric: tabular-nums`).
- Display: a dot-matrix face such as Doto, used only for rare hero moments and big stats.
- Scale: 12 / 14 / 16 / 20 / 28 / 40 / 64 / 96px. Body 16px at 1.6 line height.

**Space and shape:**

- 4px base unit; section padding 96–160px on desktop, 64px on mobile.
- 12-column grid, max width 1200px, visible hairline dividers between major sections.
- Radius: 8px on cards, fully rounded pills for labels and buttons. No drop shadows; depth comes from borders and surface contrast.
- Motion: 150–250ms ease-out. Subtle reveals and hover states only; respect `prefers-reduced-motion`.

## Motifs and components

Build these as reusable components, with a small internal page at `/design` that shows each one in both modes.

**Signature motifs:**

- **Product pictograms.** One Braun-style SVG mark per product, built only from circles, rectangles and lines, with a single accent dot. FocusMode is a dial, RE-IQ a building grid, SourceIQ a funnel of dots. Future products get a new mark in the same family.
- **Node-line diagrams.** Thin lines with dot nodes and small mono pill labels, used to connect the hero statement to the products and to explain processes.
- **Dot fields.** Generated SVG or canvas dot patterns (halftone circles, dithered clouds) as section art. Static by default; gentle motion only on the hero.
- **Wireframe geometry.** In dark mode, white hairline isometric cubes and grids as background art.
- **Crosshair marks.** Small `+` marks at grid intersections and section corners.

**Components:**

- `SectionLabel` — pill with a circle-arrow icon and uppercase mono text, e.g. `↘ 01 · PRODUCTS`.
- `TwoToneHeading` — ink phrase plus gray continuation.
- `Stat` — big dot-matrix or sans numeral with a small mono caption.
- `ProductCard` — pictogram, name, one-line problem it solves, status chip (`LIVE`, `IN REVIEW`, `BETA`), link.
- `PrinciplesGrid` — numbered grid in the Rams poster style.
- `EmailCapture` — inline and full-width variants, one field plus one accent button, with a success state.
- `CourseCard` — title, price or status, outcome line, CTA.
- `PostCard` — title, date, reading time, category in mono.
- `ThemeToggle` — small, tactile, labeled `LIGHT / DARK` in mono.
- Header: wordmark `DJ WOOSTER` in mono, nav (Products, Courses, Writing, About), primary CTA *Join the waitlist*.
- Footer: page metadata in the deck style (`DJWOOSTER.COM · P.01`), newsletter capture, social links (YouTube, Skool, X, LinkedIn, GitHub).

## Site map and page specs

| Route | Purpose | Key sections |
| --- | --- | --- |
| `/` | Positioning, proof, capture | Hero · products · principles · course callout · latest writing · email capture |
| `/products` | Product index | Product cards in a Braun-catalog grid |
| `/products/[slug]` | One product | Problem, solution, screenshots, build story, status, link to app |
| `/courses` | Course index | Course cards: Ship Your App (waitlist), Claude Code for UX Designers (coming next) |
| `/courses/ship-your-app` | Waitlist page, later the sales page | Promise · who it's for · curriculum outline · FAQ · waitlist form |
| `/courses/claude-code-for-ux-designers` | Interest list | Teaser · what you'll learn · interest form |
| `/free/app-store-checklist` | Lead magnet | Opt-in page with instant delivery |
| `/writing` and `/writing/[slug]` | Blog | Index with categories; article template |
| `/work` | Design case studies | Migrated portfolio content, framed as craft |
| `/work-with-me` | Consulting | Short offer, what I help with, contact or booking form |
| `/community` | Skool | What it is, link out |
| `/videos` | YouTube hub | Latest videos grid, subscribe link |
| `/about` | Story | Bio, principles, products, contact |
| `/design` | Internal | Component and token reference |

**Home page, top to bottom:**

1. **Hero.** Dot-matrix `DESIGN. BUILD. SHIP.`, the headline and subline, primary CTA *Join the waitlist*, secondary *See the products*. Node lines connect the hero to the three product pictograms.
2. **01 · Products.** Three product cards in a hairline grid, with status chips. FocusMode shows `IN REVIEW` for iOS.
3. **02 · Principles.** Five to ten numbered principles in the Rams grid. Use `[TODO: principle]` placeholders.
4. **03 · Course.** A full-width inverse (black) block for *Ship Your App with Claude Code*: outcome, $495, and the waitlist form.
5. **04 · Writing.** The latest three posts.
6. **05 · Elsewhere.** YouTube, Skool, and consulting as three quiet cards.
7. **Footer** with newsletter capture.

**Course page (`/courses/ship-your-app`) in waitlist mode:**

- Hero: *Get your app into the App Store with Claude Code.* $495, waitlist form above the fold.
- Who it's for, and who it's not for.
- Curriculum as numbered modules: `[TODO: module titles]`.
- Proof: the FocusMode iOS build story, with a slot for screenshots of the App Store approval.
- FAQ placeholders, plus a closing waitlist form.
- Built so that switching from waitlist to sales mode means changing one config flag and adding a checkout link.

## Funnels and email capture

Every page has at least one way onto the list. Each signup records its source so the funnels can be compared.

**Funnel 1, course waitlist:**

1. A visitor arrives from YouTube, the blog or social.
2. They join the *Ship Your App* waitlist, or grab the free App Store checklist.
3. The checklist is delivered instantly on the confirmation page and by email.
4. A short email sequence (scaffold the content slots only) tells the FocusMode shipping story.
5. At launch, waitlist members get early-bird pricing.

**Funnel 2, next-course interest:** the *Claude Code for UX Designers* interest list, tagged separately so demand can be compared with the first course.

**Funnel 3, consulting:** the work-with-me form, which captures name, email, company, what they need and budget range.

**Implementation requirements:**

- One `EmailCapture` component with props for `source`, `tag`, `headline` and `variant`.
- Tags: `waitlist-ship-your-app`, `interest-ux-designers`, `lead-checklist`, `newsletter`, `consulting`.
- Success states that set expectations ("Check your inbox for the checklist").
- Courses are driven by a config file (title, price, status: `waitlist` | `open` | `closed`, checkout URL, tag), so launching is a config change.
- Analytics events on every signup and every CTA click, labeled by page and source.

## Blog and LLM discoverability

Scaffold the blog fully but write no articles: three placeholder posts are enough to prove the templates.

**Blog:**

- MDX (or the project's existing content system) with frontmatter: title, description, date, updated, category, tags, cover, canonical, `draft`.
- Categories: Building, Shipping, Claude Code, Design, Products.
- Article template: title, two-tone dek, date and reading time in mono, table of contents, code blocks styled to the system, an optional FAQ block, an email capture at the end, and related posts.

**Discoverability:**

- Server-rendered, semantic HTML: one `h1` per page, logical heading order, descriptive alt text.
- JSON-LD on the relevant pages: `Person` (site-wide), `Article`, `Course`, `SoftwareApplication` (each product), `FAQPage`, `BreadcrumbList`.
- `/llms.txt` (plus `/llms-full.txt` if easy) summarizing who DJ Wooster is, the products, the courses and key pages.
- `sitemap.xml`, `robots.txt` that allows AI crawlers, and an RSS feed at `/writing/rss.xml`.
- Per-page metadata and generated Open Graph images in the site's style (mono label, two-tone title, pictogram).
- Canonical URLs, plus redirects from any old portfolio URLs to their new locations.

## Build instructions and acceptance criteria

**Work in this order, and pause for review after steps 1 and 3:**

1. Audit the current project and list what exists, what moves to `/work`, and what gets replaced. Propose the plan before changing anything.
2. Implement the tokens, both color modes, fonts and the theme toggle.
3. Build the components and the `/design` reference page. Stop for review.
4. Build the home page.
5. Build the course, product, lead-magnet and consulting pages.
6. Build the blog, the discoverability layer and the redirects.
7. Wire up email capture and analytics with the existing stack.

**Done means:**

- [ ] Light is the default; dark looks intentional, not inverted. Both pass WCAG AA contrast.
- [ ] At most one accent moment per viewport.
- [ ] Every page has an email capture, and every signup carries a source and a tag.
- [ ] Course status is controlled by config; flipping to `open` shows the checkout CTA.
- [ ] Lighthouse scores of 95+ for performance, accessibility, best practices and SEO on home, course and article pages.
- [ ] Layouts work from 360px wide upward, with no horizontal scroll.
- [ ] Structured data validates; `llms.txt`, the sitemap and RSS all resolve.
- [ ] All placeholder copy is marked `[TODO: …]`, and no existing portfolio content is lost.

**Avoid:** default shadcn styling, gradients, drop shadows, glassmorphism, stock photos, emoji, and more than one accent color.
