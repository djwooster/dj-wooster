"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { SPRING_SOFT } from "@/lib/motion"
import { Counter, DemoFrame, Panel, PanelLabel, useStarted } from "@/components/demos/shared"
import { cn } from "@/lib/utils"

const SESSION = 25 * 60
const week = [
  { day: "M", min: 110 },
  { day: "T", min: 145 },
  { day: "W", min: 90 },
  { day: "T", min: 160 },
  { day: "F", min: 125 },
  { day: "S", min: 40 },
  { day: "S", min: 30 },
]
const tags = [
  { name: "Deep work", min: 370 },
  { name: "Writing", min: 185 },
  { name: "Admin", min: 145 },
]

const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`
const hm = (min: number) => `${Math.floor(min / 60)}h ${String(Math.round(min % 60)).padStart(2, "0")}m`

function Timer() {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, { margin: "-40px" })
  const [remaining, setRemaining] = useState(18 * 60 + 42)
  const [running, setRunning] = useState(true)

  // Ticks only while on screen and running
  useEffect(() => {
    if (!visible || !running) return
    const id = setInterval(() => setRemaining((r) => (r <= 1 ? SESSION : r - 1)), 1000)
    return () => clearInterval(id)
  }, [visible, running])

  const progress = 1 - remaining / SESSION
  const R = 88
  const C = 2 * Math.PI * R
  const angle = progress * 2 * Math.PI - Math.PI / 2

  return (
    <div ref={ref} className="flex flex-col items-center gap-5">
      <span className="label-mono inline-flex h-6 items-center gap-1.5 rounded-full border border-line bg-bg px-2.5 text-[11px] text-ink-2">
        <span className="size-1.5 rounded-full bg-ink" />
        Deep work
      </span>

      <div className="relative size-[200px]">
        <svg viewBox="0 0 200 200" className="size-full -rotate-90" aria-hidden>
          <circle cx="100" cy="100" r={R} fill="none" strokeWidth="2" className="stroke-line" />
          <motion.circle
            cx="100"
            cy="100"
            r={R}
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            className="stroke-ink"
            strokeDasharray={C}
            animate={{ strokeDashoffset: C * (1 - progress) }}
            transition={{ duration: 0.9, ease: "linear" }}
          />
        </svg>
        {/* Progress tip: the demo's single accent */}
        <motion.span
          className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
          animate={{ left: 100 + R * Math.cos(angle), top: 100 + R * Math.sin(angle) }}
          transition={{ duration: 0.9, ease: "linear" }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <span className="font-mono text-40 leading-none text-ink tabular-nums">{fmt(remaining)}</span>
          <span className="label-mono text-[11px] text-ink-2">{running ? "Focusing" : "Paused"}</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5" aria-label="Session 2 of 4">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={cn("h-1 rounded-full", i < 1 ? "w-4 bg-ink" : i === 1 ? "w-4 bg-ink-2" : "w-1.5 bg-line")} />
        ))}
      </div>

      <div className="flex w-full gap-2">
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className="h-10 flex-1 rounded-full bg-ink text-14 font-medium text-bg transition-transform duration-150 active:scale-[0.97]"
        >
          {running ? "Pause" : "Resume"}
        </button>
        <button
          type="button"
          onClick={() => setRemaining(SESSION)}
          className="h-10 flex-1 rounded-full border border-line bg-bg text-14 font-medium text-ink transition-transform duration-150 active:scale-[0.97]"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[280px] rounded-[44px] border border-line bg-bg p-2">
      <div className="rounded-[36px] border border-line bg-surface px-5 pt-3 pb-6">
        <div className="mb-6 flex items-center justify-between font-mono text-12 text-ink tabular-nums">
          <span>9:41</span>
          <span className="h-5 w-20 rounded-full bg-ink" aria-hidden />
          <span className="flex gap-0.5" aria-hidden>
            {[3, 5, 7, 9].map((h) => (
              <span key={h} className="w-[3px] rounded-full bg-ink" style={{ height: h }} />
            ))}
          </span>
        </div>
        <div className="mb-6 flex items-baseline justify-between">
          <span className="headline text-20 text-ink">Focus</span>
          <span className="label-mono text-[11px] text-ink-2">2 / 4</span>
        </div>
        {children}
      </div>
    </div>
  )
}

export default function FocusModeDemo() {
  const [ref, started] = useStarted<HTMLDivElement>()
  const max = Math.max(...week.map((d) => d.min))
  const total = week.reduce((s, d) => s + d.min, 0)

  return (
    <DemoFrame title="FocusMode — iOS + Web">
      <div ref={ref} className="grid items-center gap-4 @lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Phone>
          <Timer />
        </Phone>

        <div className="flex flex-col gap-3">
          <Panel>
            <PanelLabel right={<span className="label-mono text-[11px] text-ink-2">Oct 14–20</span>}>This week</PanelLabel>
            <div className="mb-4 flex items-baseline gap-3">
              <Counter value={total} format={hm} className="headline text-28 text-ink" />
              <span className="text-12 text-ink-2">focused</span>
            </div>
            <div className="flex h-28 items-end gap-2">
              {week.map((d, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <div className="relative flex h-24 w-full items-end">
                    <motion.div
                      className={cn("w-full rounded-[4px]", i === 3 ? "bg-ink" : "bg-ink/15")}
                      initial={{ height: 0 }}
                      animate={started ? { height: `${(d.min / max) * 100}%` } : {}}
                      transition={{ ...SPRING_SOFT, delay: 0.05 * i }}
                    />
                  </div>
                  <span className="font-mono text-[11px] text-ink-2">{d.day}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelLabel>Tags</PanelLabel>
            <ul className="flex flex-col gap-3">
              {tags.map((t, i) => (
                <li key={t.name} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-14">
                    <span className="text-ink">{t.name}</span>
                    <span className="font-mono text-12 text-ink-2 tabular-nums">{hm(t.min)}</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-line">
                    <motion.div
                      className="h-full rounded-full bg-ink"
                      initial={{ width: 0 }}
                      animate={started ? { width: `${(t.min / tags[0].min) * 100}%` } : {}}
                      transition={{ ...SPRING_SOFT, delay: 0.2 + 0.08 * i }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </DemoFrame>
  )
}
