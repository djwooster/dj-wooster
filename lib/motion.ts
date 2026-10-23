import type { Transition } from "framer-motion"

// Cubic bezier tuple — framer-motion needs the fixed-length type, never number[]
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// iOS-feel springs
export const SPRING: Transition = { type: "spring", stiffness: 420, damping: 34, mass: 0.8 }
export const SPRING_SOFT: Transition = { type: "spring", stiffness: 260, damping: 30 }
export const SPRING_SNAPPY: Transition = { type: "spring", stiffness: 600, damping: 38 }

// 150–250ms ease-out for hover and small state changes
export const FAST: Transition = { duration: 0.2, ease: EASE }

// Scroll reveal
export const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: EASE },
}
