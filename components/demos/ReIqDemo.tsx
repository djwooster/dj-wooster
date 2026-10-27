"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SPRING, SPRING_SOFT } from "@/lib/motion"
import { Counter, Delta, DemoFrame, Panel, PanelLabel, useStarted } from "@/components/demos/shared"
import { cn } from "@/lib/utils"

// NOI by month, actual vs budget ($K)
const months = [
  { m: "Jan", actual: 118, budget: 120 },
  { m: "Feb", actual: 121, budget: 120 },
  { m: "Mar", actual: 126, budget: 122 },
  { m: "Apr", actual: 124, budget: 124 },
  { m: "May", actual: 131, budget: 125 },
  { m: "Jun", actual: 129, budget: 126 },
  { m: "Jul", actual: 136, budget: 128 },
  { m: "Aug", actual: 138, budget: 130 },
  { m: "Sep", actual: 141, budget: 132 },
]

const attention = [
  { property: "Maple Court", metric: "Occupancy", value: "88.0%", delta: "−6.0 pts" },
  { property: "Harbor Point", metric: "Delinquency", value: "5.1%", delta: "+2.4 pts" },
  { property: "Elm Street Lofts", metric: "NOI", value: "$84.2K", delta: "−8.1%" },
]

const ranges = ["MTD", "QTD", "YTD"] as const

export default function ReIqDemo() {
  const [ref, started] = useStarted<HTMLDivElement>()
  const [range, setRange] = useState<(typeof ranges)[number]>("YTD")
  // Truncated axis ($100K–$145K) so month-to-month movement is visible
  const scale = (v: number) => ((v - 100) / 45) * 100

  return (
    <DemoFrame title="RE-IQ — Portfolio overview">
      <div ref={ref} className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3 px-1">
          <div className="flex items-baseline gap-3">
            <span className="headline text-20 text-ink">Portfolio</span>
            <span className="label-mono text-[11px] text-ink-2">12 properties · 1,486 units</span>
          </div>
          <div className="relative flex rounded-full border border-line bg-surface p-0.5" role="tablist" aria-label="Range">
            {ranges.map((r) => (
              <button
                key={r}
                type="button"
                role="tab"
                aria-selected={range === r}
                onClick={() => setRange(r)}
                className={cn(
                  "label-mono relative z-10 h-6 rounded-full px-2.5 text-[11px] transition-colors",
                  range === r ? "text-bg" : "text-ink-2 hover:text-ink",
                )}
              >
                {range === r && (
                  <motion.span layoutId="reiq-range" transition={SPRING} className="absolute inset-0 -z-10 rounded-full bg-ink" />
                )}
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 @md:grid-cols-3">
          <Panel>
            <PanelLabel right={<Delta value="+4.2%" good />}>NOI vs budget</PanelLabel>
            <Counter value={1.284} format={(n) => `$${n.toFixed(2)}M`} className="headline text-28 text-ink" />
          </Panel>
          <Panel>
            <PanelLabel right={<Delta value="−1.1 pts" good={false} />}>Occupancy</PanelLabel>
            <Counter value={94.6} format={(n) => `${n.toFixed(1)}%`} className="headline text-28 text-ink" />
          </Panel>
          <Panel>
            <PanelLabel right={<Delta value="+0.4 pts" good={false} />}>Delinquency</PanelLabel>
            <Counter value={2.3} format={(n) => `${n.toFixed(1)}%`} className="headline text-28 text-ink" />
          </Panel>
        </div>

        <div className="grid gap-3 @2xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <Panel>
            <PanelLabel
              right={
                <span className="label-mono flex items-center gap-3 text-[11px] text-ink-2">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-[2px] bg-ink" /> Actual
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-px w-3 bg-ink-2" /> Budget
                  </span>
                </span>
              }
            >
              NOI by month
            </PanelLabel>
            <div className="flex h-40 items-end gap-1.5 @sm:gap-2">
              {months.map((d, i) => (
                <div key={d.m} className="flex flex-1 flex-col items-center gap-2">
                  <div className="relative h-32 w-full">
                    <motion.div
                      className={cn("absolute bottom-0 w-full rounded-[4px]", i === months.length - 1 ? "bg-ink" : "bg-ink/15")}
                      initial={{ height: 0 }}
                      animate={started ? { height: `${scale(d.actual)}%` } : {}}
                      transition={{ ...SPRING_SOFT, delay: 0.04 * i }}
                    />
                    <motion.div
                      className="absolute h-px w-[calc(100%+4px)] -translate-x-[2px] bg-ink-2"
                      initial={{ opacity: 0 }}
                      animate={started ? { opacity: 1 } : {}}
                      transition={{ delay: 0.5 + 0.04 * i }}
                      style={{ bottom: `${scale(d.budget)}%` }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-ink-2 @sm:text-[11px]">{d.m}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelLabel right={<span className="font-mono text-[11px] text-ink-2 tabular-nums">3</span>}>Needs attention</PanelLabel>
            <ul className="flex flex-col">
              {attention.map((a, i) => (
                <motion.li
                  key={a.property}
                  initial={{ opacity: 0, x: 12 }}
                  animate={started ? { opacity: 1, x: 0 } : {}}
                  transition={{ ...SPRING, delay: 0.6 + 0.1 * i }}
                  className="flex items-center justify-between gap-3 border-b border-line py-2.5 last:border-0"
                >
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-14 text-ink">{a.property}</span>
                    <span className="text-12 text-ink-2">
                      {a.metric} · <span className="font-mono tabular-nums">{a.value}</span>
                    </span>
                  </div>
                  <Delta value={a.delta} good={false} />
                </motion.li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </DemoFrame>
  )
}
