export const site = {
  name: "DJ Wooster",
  domain: "djwooster.com",
  url: "https://djwooster.com",
  email: "contact@djwooster.com",
  description:
    "Custom websites, web apps and iOS apps, designed and engineered end to end by DJ Wooster. Shipped in weeks. Projects from $15K.",
}

// Homepage sections, plus the closing CTA. Writing joins once it has three real posts.
export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
]

export const primaryCta = { label: "Start a project", href: "/start" }

// Shown in small mono next to every Start a project button so leads arrive pre-qualified
export const priceNote = "Projects from $15K"

/** The /start link, tagged with where it was clicked so every inquiry records its source */
export function startHref(from: string) {
  return `${primaryCta.href}?from=${encodeURIComponent(from)}`
}

export const social = [
  { label: "YouTube", href: "[TODO: YouTube URL]" },
  { label: "Skool", href: "[TODO: Skool URL]" },
  { label: "X", href: "[TODO: X URL]" },
  { label: "LinkedIn", href: "[TODO: LinkedIn URL]" },
  { label: "GitHub", href: "[TODO: GitHub URL]" },
]

export const footerNav = [
  {
    title: "Studio",
    links: [
      { label: "Work", href: "/#work" },
      { label: "Services", href: "/#services" },
      { label: "Process", href: "/#process" },
      { label: "Start a project", href: "/start?from=footer" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Writing", href: "/writing" },
      { label: "YouTube", href: "/videos" },
      { label: "Skool", href: "/community" },
      { label: "Ship Your App with Claude Code", href: "/courses/ship-your-app" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "About", href: "/#about" },
      { label: site.email, href: `mailto:${site.email}` },
    ],
  },
]

// Page codes for the deck-style footer metadata ("DJWOOSTER.COM · P.01")
const pageCodes: [string, string][] = [
  ["/work", "P.02"],
  ["/start", "P.03"],
  ["/products", "P.04"],
  ["/writing", "P.05"],
  ["/courses", "P.06"],
  ["/videos", "P.07"],
  ["/community", "P.08"],
  ["/free", "P.09"],
  ["/about", "P.10"],
  ["/design", "P.00"],
]

export function pageCode(pathname: string) {
  if (pathname === "/") return "P.01"
  return pageCodes.find(([prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`))?.[1] ?? "P.—"
}

// Ad landing pages: unlisted, noindex, and the header drops its nav so visitors stay on the page
export const landingRoutes = ["/vibe-code-a-mobile-app"]

export function isLanding(pathname: string) {
  return landingRoutes.includes(pathname)
}

export function isExternal(href: string) {
  return /^(https?:|mailto:)/.test(href)
}
