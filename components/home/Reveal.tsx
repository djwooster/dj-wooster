"use client"

import { motion } from "framer-motion"
import { EASE } from "@/lib/motion"

// Fade-and-rise on mount (above the fold) or on scroll (whileInView)
export default function Reveal({
  children,
  delay = 0,
  onScroll = false,
  className,
  as = "div",
}: {
  children: React.ReactNode
  delay?: number
  onScroll?: boolean
  className?: string
  /** "li" when the reveal is itself a list item */
  as?: "div" | "li"
}) {
  const target = { opacity: 1, y: 0 }
  const Tag = as === "li" ? motion.li : motion.div
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 14 }}
      {...(onScroll ? { whileInView: target, viewport: { once: true, margin: "-80px" } } : { animate: target })}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}
