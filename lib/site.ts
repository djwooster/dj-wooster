export const site = {
  name: "DJ Wooster",
  domain: "djwooster.com",
  url: "https://djwooster.com",
  email: "contact@djwooster.com",
  description:
    "DJ Wooster builds software products like FocusMode, RE-IQ and SourceIQ, and teaches others to build and ship their own with Claude Code.",
}

export const nav = [
  { label: "Products", href: "/products" },
  { label: "Courses", href: "/courses" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
]

export const primaryCta = { label: "Join the waitlist", href: "/courses/ship-your-app" }

export const social = [
  { label: "YouTube", href: "[TODO: YouTube URL]" },
  { label: "Skool", href: "[TODO: Skool URL]" },
  { label: "X", href: "[TODO: X URL]" },
  { label: "LinkedIn", href: "[TODO: LinkedIn URL]" },
  { label: "GitHub", href: "[TODO: GitHub URL]" },
]

export const footerNav = [
  {
    title: "Build",
    links: [
      { label: "Products", href: "/products" },
      { label: "Work", href: "/work" },
      { label: "Work with me", href: "/work-with-me" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Courses", href: "/courses" },
      { label: "Writing", href: "/writing" },
      { label: "Videos", href: "/videos" },
      { label: "Community", href: "/community" },
      { label: "Free checklist", href: "/free/app-store-checklist" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "mailto:contact@djwooster.com" },
    ],
  },
]

// Page codes for the deck-style footer metadata ("DJWOOSTER.COM · P.01")
const pageCodes: [string, string][] = [
  ["/products", "P.02"],
  ["/courses", "P.03"],
  ["/writing", "P.04"],
  ["/work-with-me", "P.06"],
  ["/work", "P.05"],
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

export function isExternal(href: string) {
  return /^(https?:|mailto:)/.test(href)
}
