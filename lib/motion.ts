// Typed cubic bezier for consistent easing across all components
export const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

// Smooth-scroll to a hash section. If already on '/', scrolls in place.
// If on another page, stores the target in sessionStorage and navigates home —
// ScrollRestorer picks it up on arrival and smooth-scrolls after render.
export function scrollToSection(e: React.MouseEvent, href: string) {
  if (!href.startsWith("/#")) return
  e.preventDefault()
  const id = href.slice(2)

  if (window.location.pathname === "/") {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  } else {
    sessionStorage.setItem("scrollTarget", id)
    window.location.href = "/"
  }
}
