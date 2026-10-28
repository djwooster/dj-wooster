"use client"

import { motion } from "framer-motion"
import { SPRING, SPRING_SOFT } from "@/lib/motion"
import { Counter, Delta, DemoFrame, Panel, PanelLabel, useStarted } from "@/components/demos/shared"

// Last 30 days. Revenue / spend = ROAS (186.4 / 42.3 ≈ 4.4×)
// Bar widths are relative stage sizes, capped so the value label always fits beside the bar
const funnel = [
  { stage: "Ad spend", value: 42300, money: true, width: 74 },
  { stage: "Leads", value: 1284, width: 58 },
  { stage: "Qualified", value: 412, width: 40 },
  { stage: "Pipeline", value: 618000, money: true, width: 28 },
  { stage: "Revenue", value: 186400, money: true, width: 18 },
]

const channels = [
  { name: "Google Ads", spend: 18200, leads: 562, roas: 5.1 },
  { name: "Meta", spend: 14600, leads: 448, roas: 3.6 },
  { name: "LinkedIn", spend: 9500, leads: 274, roas: 4.2 },
]

const money = (n: number) =>
  n >= 100000 ? `$${Math.round(n / 1000)}K` : `$${Math.round(n).toLocaleString("en-US")}`

export default function SourceIqDemo() {
  const [ref, started] = useStarted<HTMLDivElement>()

  return (
    <DemoFrame title="SourceIQ — Attribution">
      <div ref={ref} className="grid gap-3 @xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <Panel>
          <PanelLabel right={<span className="label-mono text-[11px] text-ink-2">Last 30 days</span>}>
            Spend to revenue
          </PanelLabel>
          <ol className="flex flex-col gap-2.5">
            {funnel.map((f, i) => (
              <li key={f.stage} className="grid grid-cols-[84px_minmax(0,1fr)] items-center gap-3 @sm:grid-cols-[96px_minmax(0,1fr)]">
                <span className="text-12 text-ink-2">{f.stage}</span>
                <div className="relative h-8">
                  <motion.div
                    className={i === funnel.length - 1 ? "h-full rounded-[6px] bg-ink" : "h-full rounded-[6px] bg-ink/12"}
                    initial={{ width: 0 }}
                    animate={started ? { width: `${f.width}%` } : {}}
                    transition={{ ...SPRING_SOFT, delay: 0.08 * i }}
                  />
                  <motion.span
                    className="absolute inset-y-0 flex items-center font-mono text-12 text-ink tabular-nums"
                    initial={{ opacity: 0 }}
                    animate={started ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3 + 0.08 * i }}
                    style={{ left: `calc(${f.width}% + 8px)` }}
                  >
                    {f.money ? money(f.value) : f.value.toLocaleString("en-US")}
                  </motion.span>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-inner border border-line bg-line">
            {[
              { label: "Cost per lead", value: "$32.94" },
              { label: "Lead → qualified", value: "32.1%" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1 bg-surface px-3 py-2.5">
                <span className="text-12 text-ink-2">{s.label}</span>
                <span className="font-mono text-14 text-ink tabular-nums">{s.value}</span>
              </div>
            ))}
          </div>
        </Panel>

        <div className="flex flex-col gap-3">
          <Panel>
            <PanelLabel right={<Delta value="+0.6×" good />}>Blended ROAS</PanelLabel>
            <div className="flex items-baseline gap-1">
              <Counter value={4.4} format={(n) => n.toFixed(1)} className="headline text-64 leading-none text-ink" />
              <span className="headline text-28 text-ink-2">×</span>
            </div>
          </Panel>

          <Panel className="p-0">
            <div className="px-4 pt-4">
              <PanelLabel>By channel</PanelLabel>
            </div>
            <table className="w-full text-left">
              <thead className="label-mono text-[11px] text-ink-2">
                <tr className="border-b border-line">
                  <th className="px-4 pb-2 font-normal">Channel</th>
                  <th className="px-2 pb-2 text-right font-normal">Spend</th>
                  <th className="px-4 pb-2 text-right font-normal">ROAS</th>
                </tr>
              </thead>
              <tbody>
                {channels.map((c, i) => (
                  <motion.tr
                    key={c.name}
                    initial={{ opacity: 0, y: 6 }}
                    animate={started ? { opacity: 1, y: 0 } : {}}
                    transition={{ ...SPRING, delay: 0.5 + 0.08 * i }}
                    className="border-b border-line last:border-0"
                  >
                    <td className="px-4 py-2.5 text-14 text-ink">{c.name}</td>
                    <td className="px-2 py-2.5 text-right font-mono text-12 text-ink-2 tabular-nums">{money(c.spend)}</td>
                    <td className="px-4 py-2.5 text-right">
                      {i === 0 ? (
                        <Delta value={`${c.roas.toFixed(1)}×`} good />
                      ) : (
                        <span className="font-mono text-12 text-ink tabular-nums">{c.roas.toFixed(1)}×</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </Panel>
        </div>
      </div>
    </DemoFrame>
  )
}
