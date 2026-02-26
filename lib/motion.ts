// Typed cubic bezier for consistent easing across all components
export const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

// Smooth-scroll to a same-page hash section, bypassing Next.js router interception
export function scrollToSection(e: React.MouseEvent, href: string) {
  if (!href.startsWith("/#")) return
  e.preventDefault()
  const id = href.slice(2)
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: "smooth" })
}
