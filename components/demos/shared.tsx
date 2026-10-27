"use client"

import { useEffect, useRef, useState } from "react"
import { animate, useInView, useReducedMotion } from "framer-motion"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"

/* ─── App window chrome ──────────────────────────────────────────────────── */

export function DemoFrame({
  title,
  className,
  children,
}: {
  title: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("overflow-hidden rounded-panel border border-line bg-surface", className)}>
      <div className="flex h-10 items-center justify-between gap-4 border-b border-line px-4">
        <div className="flex shrink-0 gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2.5 rounded-full border border-line bg-bg" />
          ))}
        </div>
        <span className="label-mono min-w-0 truncate text-[11px] text-ink-2">{title}</span>
        <span className="label-mono shrink-0 text-[11px] whitespace-nowrap text-ink-2">Demo data</span>
      </div>
      {/* Container queries: demos respond to their column, not the viewport */}
      <div className="@container bg-bg p-3 sm:p-5">{children}</div>
    </div>
  )
}

/* ─── Panel inside the app ───────────────────────────────────────────────── */

export function Panel({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-card border border-line bg-surface p-4", className)}>{children}</div>
}

export function PanelLabel({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <span className="label-mono text-[11px] text-ink-2">{children}</span>
      {right}
    </div>
  )
}

/* ─── Delta pill: color only because it carries meaning ──────────────────── */

export function Delta({ value, good }: { value: string; good: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center rounded-full px-1.5 font-mono text-[11px] tabular-nums",
        good ? "bg-positive/10 text-positive" : "bg-negative/10 text-negative",
      )}
    >
      {value}
    </span>
  )
}

/* ─── Counter: counts up when scrolled into view ─────────────────────────── */

export function Counter({
  value,
  format = (n) => Math.round(n).toLocaleString("en-US"),
  duration = 1.1,
  className,
}: {
  value: number
  format?: (n: number) => string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reduced = useReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setN(value)
      return
    }
    const controls = animate(0, value, { duration, ease: EASE, onUpdate: setN })
    return () => controls.stop()
  }, [inView, reduced, value, duration])

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {format(n)}
    </span>
  )
}

/** True once the element has been on screen — used to start demo animations */
export function useStarted<T extends Element>() {
  const ref = useRef<T>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  return [ref, inView] as const
}
