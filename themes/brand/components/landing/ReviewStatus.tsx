"use client"

import { AnimatePresence, motion } from "framer-motion"
import { SPRING } from "@/lib/motion"
import { cn } from "@/lib/utils"

// An App Store Connect-style version card. Controlled: `stage` walks 0 → 3, where 3 is
// "Ready for Distribution" with its notification and a small burst of dots.
export const reviewStages = ["Prepare for Submission", "Waiting for Review", "In Review", "Ready for Distribution"]

const BURST = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2
  return { x: Math.cos(a) * (18 + (i % 3) * 6), y: Math.sin(a) * (18 + (i % 3) * 6) }
})

export default function ReviewStatus({ stage }: { stage: number }) {
  const done = stage >= reviewStages.length - 1

  return (
    <div className="relative mx-auto w-full max-w-[420px] pt-[84px]">
      <AnimatePresence>
        {done && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: -18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 380, damping: 26, delay: 0.35 }}
            className="absolute inset-x-2 top-0 z-10 flex items-start gap-3 rounded-[22px] border border-white/10 bg-[#2c2c2e]/90 p-3.5 text-white shadow-[0_16px_40px_-16px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", var(--font-sans), sans-serif' }}
          >
            <span className="flex size-[38px] shrink-0 items-center justify-center rounded-[9px] bg-gradient-to-b from-[#1e9bff] to-[#0a6cff]">
              <svg viewBox="0 0 20 20" className="size-5" aria-hidden>
                <path d="M7 15.5 12.5 5M13 15.5 7.5 5M4.5 12.5h11" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              </svg>
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="flex items-center justify-between gap-3 text-[13px]">
                <span className="font-semibold">App Store Connect</span>
                <span className="text-white/50">now</span>
              </span>
              <span className="text-[13px] leading-snug text-white/80">
                The status of Walkies for iOS 1.0 has changed to Ready for Distribution.
              </span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="rounded-panel border border-line bg-surface">
        <div className="flex items-center gap-4 border-b border-line p-5">
          <WalkiesIcon className="size-14" />
          <span className="flex min-w-0 flex-col gap-1">
            <span className="headline text-20 text-ink">Walkies</span>
            <span className="font-mono text-12 text-ink-2">iOS App · Version 1.0 (4)</span>
          </span>
        </div>
        <ol className="flex flex-col p-2">
          {reviewStages.map((s, i) => {
            const state = i < stage ? "past" : i === stage ? "now" : "next"
            return (
              <li key={s} className="flex items-center gap-3 rounded-inner px-3 py-2.5">
                <span className="relative flex size-4 items-center justify-center">
                  {state === "now" && !done && <span className="absolute inset-0 animate-ping rounded-full bg-ink-2 opacity-40" />}
                  <motion.span
                    layout
                    transition={SPRING}
                    className={cn(
                      "relative rounded-full",
                      state === "next" && "size-2 border border-ink-3",
                      state === "past" && "size-2 bg-ink-2",
                      state === "now" && (done ? "size-3 bg-positive" : "size-2.5 bg-ink"),
                    )}
                  />
                  {state === "now" && done && (
                    <span aria-hidden className="absolute inset-0">
                      {BURST.map((b, k) => (
                        <motion.span
                          key={k}
                          className="absolute top-1/2 left-1/2 -mt-[2px] -ml-[2px] size-[4px] rounded-full bg-positive"
                          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                          animate={{ x: b.x, y: b.y, opacity: 0, scale: 0.4 }}
                          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                        />
                      ))}
                    </span>
                  )}
                </span>
                <span
                  className={cn(
                    "text-14 transition-colors duration-300",
                    state === "now" ? (done ? "font-medium text-positive" : "font-medium text-ink") : "text-ink-2",
                  )}
                >
                  {s}
                </span>
                {state === "now" && (
                  <motion.span key={s} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} className="label-mono ml-auto text-[11px] text-ink-2">
                    {done ? "Live" : "Current"}
                  </motion.span>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

/** The demo app's icon: a paw on a warm gradient, drawn with the iOS icon squircle radius */
export function WalkiesIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn("flex shrink-0 items-center justify-center rounded-[22.5%] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.1)]", className)}
      style={{ background: "linear-gradient(160deg, #2b2b2e, #0d0d0f)" }}
    >
      <svg viewBox="0 0 24 24" className="size-[55%]" aria-hidden>
        <ellipse cx="12" cy="15.5" rx="4.6" ry="3.8" fill="#f5f1e8" />
        {[
          [6.4, 10.2],
          [9.6, 7],
          [14.4, 7],
          [17.6, 10.2],
        ].map(([cx, cy]) => (
          <ellipse key={cx} cx={cx} cy={cy} rx="1.9" ry="2.3" fill="#f5f1e8" />
        ))}
      </svg>
    </span>
  )
}
