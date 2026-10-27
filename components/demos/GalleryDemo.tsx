"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { SPRING, SPRING_SOFT } from "@/lib/motion"
import { DemoFrame, Panel, PanelLabel, useStarted } from "@/components/demos/shared"

// The client's palette, not this site's tokens: indigo-black, sand text
const coast = { bg: "#0e1020", sand: "#ece4d4", sand2: "#a49c8c", line: "rgba(236,228,212,0.14)" }

const sources = [
  { label: "QR scan in the gallery", share: 64 },
  { label: "Follow-up email", share: 22 },
  { label: "Direct", share: 14 },
]

const activity = [
  { event: "Saved", detail: "Tide Line", source: "QR", when: "2m" },
  { event: "Call booked", detail: "Sat 11:00 AM", source: "Email", when: "1h" },
  { event: "Saved", detail: "Salt Line", source: "Direct", when: "3h" },
]

type SaveState = "idle" | "email" | "saved"

function PiecePage() {
  const [state, setState] = useState<SaveState>("idle")

  return (
    <div className="mx-auto w-full max-w-[272px] rounded-[44px] border border-line bg-bg p-2">
      <div className="flex flex-col overflow-hidden rounded-[36px] px-4 pt-3 pb-5" style={{ background: coast.bg, color: coast.sand }}>
        <div className="mb-4 flex items-center justify-between font-mono text-12 tabular-nums">
          <span>9:41</span>
          <span className="h-5 w-[72px] rounded-full" style={{ background: "#000" }} aria-hidden />
          <span className="flex items-end gap-0.5" aria-hidden>
            {[3, 5, 7, 9].map((h) => (
              <span key={h} className="w-[3px] rounded-full" style={{ height: h, background: coast.sand }} />
            ))}
          </span>
        </div>
        <span className="mb-3 text-center text-[10px] font-medium tracking-[0.3em]">COAST GALLERY</span>

        {/* A coded stand-in for a raised, layered painting: no real artwork is shown */}
        <div
          className="relative mb-4 aspect-[4/5] overflow-hidden rounded-[6px]"
          style={{
            background: [
              "radial-gradient(60% 40% at 30% 30%, rgba(236,228,212,0.85), transparent 70%)",
              "radial-gradient(50% 45% at 70% 65%, #3e7fb3, transparent 70%)",
              "radial-gradient(40% 30% at 35% 80%, #c9b48a, transparent 70%)",
              "linear-gradient(160deg, #22304f, #0b1a2c 60%, #13263a)",
            ].join(","),
          }}
        >
          <div
            className="absolute inset-0 opacity-40 mix-blend-overlay"
            style={{ backgroundImage: "repeating-linear-gradient(115deg, rgba(255,255,255,0.25) 0 1px, transparent 1px 7px)" }}
          />
          <span
            className="absolute top-2.5 left-2.5 rounded-full px-2 py-1 font-mono text-[10px] tracking-wider uppercase"
            style={{ background: "rgba(14,16,32,0.7)" }}
          >
            Scanned in gallery
          </span>
        </div>

        <span className="text-20 leading-tight italic">Tide Line</span>
        <span className="mb-4 font-mono text-[11px]" style={{ color: coast.sand2 }}>
          Oil and resin on panel · 48 × 60 in
        </span>

        <AnimatePresence mode="wait" initial={false}>
          {state === "idle" && (
            <motion.button
              key="idle"
              type="button"
              onClick={() => setState("email")}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={SPRING}
              className="flex h-10 items-center justify-center rounded-full text-14 font-medium transition-transform active:scale-[0.97]"
              style={{ background: coast.sand, color: coast.bg }}
            >
              Save this piece
            </motion.button>
          )}
          {state === "email" && (
            <motion.form
              key="email"
              onSubmit={(e) => {
                e.preventDefault()
                setState("saved")
              }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={SPRING}
              className="flex h-10 items-center gap-1 rounded-full border p-1 pl-3.5"
              style={{ borderColor: coast.line }}
            >
              <span className="min-w-0 flex-1 truncate text-12" style={{ color: coast.sand2 }}>
                you@example.com
              </span>
              <button
                type="submit"
                className="h-full rounded-full px-3 text-12 font-medium transition-transform active:scale-[0.97]"
                style={{ background: coast.sand, color: coast.bg }}
              >
                Save
              </button>
            </motion.form>
          )}
          {state === "saved" && (
            <motion.button
              key="saved"
              type="button"
              onClick={() => setState("idle")}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={SPRING}
              aria-label="Saved. Tap to reset the demo"
              className="flex h-10 items-center justify-center gap-2 rounded-full border text-14"
              style={{ borderColor: coast.sand }}
            >
              <svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-3.5">
                <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Saved. We&apos;ll be in touch.
            </motion.button>
          )}
        </AnimatePresence>
        <span className="mt-2 text-center text-[11px]" style={{ color: coast.sand2 }}>
          Book a call with the gallery
        </span>
      </div>
    </div>
  )
}

export default function GalleryDemo() {
  const [ref, started] = useStarted<HTMLDivElement>()

  return (
    <DemoFrame title="Coast Gallery — Piece page">
      <div ref={ref} className="grid items-center gap-4 @lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <PiecePage />

        <div className="flex flex-col gap-3">
          <Panel>
            <PanelLabel right={<span className="label-mono text-[11px] text-ink-2">Last 30 days</span>}>
              Saves by source
            </PanelLabel>
            <ul className="flex flex-col gap-3">
              {sources.map((s, i) => (
                <li key={s.label} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-3 text-14">
                    <span className="text-ink">{s.label}</span>
                    <span className="font-mono text-12 text-ink-2 tabular-nums">{s.share}%</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-line">
                    <motion.div
                      className="h-full rounded-full bg-ink"
                      initial={{ width: 0 }}
                      animate={started ? { width: `${s.share}%` } : {}}
                      transition={{ ...SPRING_SOFT, delay: 0.1 + 0.08 * i }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel className="p-0">
            <div className="px-4 pt-4">
              <PanelLabel>Collector activity</PanelLabel>
            </div>
            <ul>
              {activity.map((a, i) => (
                <motion.li
                  key={a.event + a.detail}
                  initial={{ opacity: 0, y: 6 }}
                  animate={started ? { opacity: 1, y: 0 } : {}}
                  transition={{ ...SPRING, delay: 0.4 + 0.08 * i }}
                  className="flex items-center justify-between gap-3 border-t border-line px-4 py-2.5"
                >
                  <span className="min-w-0 truncate text-14 text-ink">
                    {a.event} <span className="text-ink-2">· {a.detail}</span>
                  </span>
                  <span className="label-mono shrink-0 text-[11px] text-ink-2">
                    {a.source} · {a.when}
                  </span>
                </motion.li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </DemoFrame>
  )
}
