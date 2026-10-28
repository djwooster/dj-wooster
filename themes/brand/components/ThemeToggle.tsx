"use client"

import { useId, useSyncExternalStore } from "react"
import { motion } from "framer-motion"
import { SPRING } from "@/lib/motion"
import { cn } from "@/lib/utils"

type Theme = "light" | "dark"

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })
  return () => observer.disconnect()
}

const getTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light")

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem("theme", theme)
  } catch {}
}

// Tactile two-position switch, labeled LIGHT / DARK in mono
export default function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme)
  const id = useId()

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className={cn("relative inline-flex rounded-full border border-line bg-surface p-[3px]", className)}
    >
      {(["light", "dark"] as const).map((option) => {
        const active = theme === option
        return (
          <button
            key={option}
            role="radio"
            aria-checked={active}
            onClick={() => setTheme(option)}
            className={cn(
              "label-mono relative z-10 h-7 rounded-full px-3 text-[11px] transition-colors duration-200",
              active ? "text-bg" : "text-ink-2 hover:text-ink",
            )}
          >
            {active && (
              <motion.span
                layoutId={`${id}-knob`}
                transition={SPRING}
                className="absolute inset-0 -z-10 rounded-full bg-ink"
              />
            )}
            {option}
          </button>
        )
      })}
    </div>
  )
}
