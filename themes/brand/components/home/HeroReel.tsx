"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "framer-motion"
import { SPRING, SPRING_SOFT } from "@/lib/motion"
import { cn } from "@/lib/utils"

/*
  A motion-graphic reel of real UI. Each scene plays one interaction (a touch
  lands, the screen responds), then the frame morphs into the next scene:
  a focus tracker on iPhone → an appointment app on iPhone → a revenue card.
*/

type SceneId = "focus" | "today" | "revenue"

const scenes: { id: SceneId; label: string }[] = [
  { id: "focus", label: "iOS app · focus tracker" },
  { id: "today", label: "iOS app · appointment booking" },
  { id: "revenue", label: "Web app · revenue reporting" },
]

// Beats within a scene: 0 morph in, 1 touch moves in, 2 tap + response, 3 hold
const BEATS = [900, 900, 2300, 1100]
const STAGE_H = 540
const PHONE = { width: 264, height: 528, borderRadius: 46 }

export default function HeroReel() {
  const stageRef = useRef<HTMLDivElement>(null)
  const inView = useInView(stageRef, { margin: "-80px" })
  const reduced = useReducedMotion()
  const [stageW, setStageW] = useState(560)
  const [pos, setPos] = useState({ scene: 0, beat: 0 })

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setStageW(Math.round(entry.contentRect.width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!inView || reduced) return
    const t = setTimeout(
      () =>
        setPos((p) =>
          p.beat < BEATS.length - 1 ? { ...p, beat: p.beat + 1 } : { scene: (p.scene + 1) % scenes.length, beat: 0 },
        ),
      BEATS[pos.beat],
    )
    return () => clearTimeout(t)
  }, [pos, inView, reduced])

  const scene = scenes[pos.scene]
  // Reduced motion: each scene shows its finished state, nothing plays on its own
  const beat = reduced ? 3 : pos.beat
  const tapped = beat >= 2
  const cardW = Math.min(stageW, 560)
  const size = scene.id === "revenue" ? { width: cardW, height: 320, borderRadius: 28 } : PHONE

  return (
    <div className="flex flex-col gap-4">
      <div ref={stageRef} className="relative flex items-center justify-center" style={{ height: STAGE_H }}>
        <motion.div
          initial={false}
          animate={size}
          transition={SPRING_SOFT}
          className="relative overflow-hidden border border-line bg-surface shadow-[0_1px_0_rgba(0,0,0,0.02),0_32px_64px_-40px_rgba(0,0,0,0.35)]"
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={scene.id}
              initial={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.45, delay: 0.25 } }}
              exit={{ opacity: 0, scale: 1.02, filter: "blur(6px)", transition: { duration: 0.2 } }}
              // Fixed at the final size and centered, so the morphing frame reveals it like a mask
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ width: size.width, height: size.height }}
            >
              {scene.id === "focus" && <FocusScene tapped={tapped} />}
              {scene.id === "today" && <TodayScene tapped={tapped} />}
              {scene.id === "revenue" && <RevenueScene tapped={tapped} width={cardW} />}
              {!reduced && <Touch scene={scene.id} beat={beat} />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="label-mono text-[11px] text-ink-2">
          {scene.label} <span aria-hidden>·</span> Demo data
        </p>
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Scenes">
          {scenes.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={pos.scene === i}
              aria-label={s.label}
              onClick={() => setPos({ scene: i, beat: 0 })}
              className="flex h-6 items-center px-0.5"
            >
              <span className={cn("block h-1.5 rounded-full transition-all duration-300", pos.scene === i ? "w-5 bg-ink" : "w-1.5 bg-ink-3")} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── The touch: an iOS-style touch indicator that moves in and taps ─────── */

// Where each scene's touch lands, in that scene's own coordinates
const targets: Record<SceneId, React.CSSProperties> = {
  focus: { right: 42, top: 157 },
  today: { right: 34, top: 314 },
  revenue: { right: 52, top: 28 },
}

function Touch({ scene, beat }: { scene: SceneId; beat: number }) {
  const visible = beat === 1 || beat === 2
  return (
    <AnimatePresence>
      {visible && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute z-20 -mt-[18px] -mr-[18px] size-9 rounded-full border border-ink/20 bg-ink/15 backdrop-blur-[2px]"
          style={targets[scene]}
          initial={{ opacity: 0, x: 40, y: 60, scale: 1.2 }}
          animate={beat === 2 ? { opacity: [1, 1, 0], x: 0, y: 0, scale: [1, 0.72, 1.3] } : { opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={beat === 2 ? { duration: 0.7, times: [0, 0.3, 1] } : SPRING_SOFT}
        />
      )}
    </AnimatePresence>
  )
}

function useCount(to: number, from: number, run: boolean, duration = 1.1) {
  const [n, setN] = useState(from)
  useEffect(() => {
    if (!run) return
    const c = animate(from, to, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [run, from, to, duration])
  return run ? n : from
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3.5 font-mono text-[11px] text-ink tabular-nums">
      <span>9:41</span>
      <span className="h-[22px] w-[76px] rounded-full bg-ink" aria-hidden />
      <span className="flex items-end gap-0.5" aria-hidden>
        {[3, 5, 7, 9].map((h) => (
          <span key={h} className="w-[3px] rounded-full bg-ink" style={{ height: h }} />
        ))}
      </span>
    </div>
  )
}

/* ─── 01 · Focus tracker: tap + to log a session ─────────────────────────── */

// Thin line chart, steepening toward now
const LINES = 64
const lineHeights = Array.from({ length: LINES }, (_, i) => 4 + Math.pow(i / (LINES - 1), 3.2) * 92)

function FocusScene({ tapped }: { tapped: boolean }) {
  const minutes = useCount(42, 17, tapped, 1.2)
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <div className="flex flex-1 flex-col px-5 pt-5 pb-5">
        <div className="flex items-start justify-between text-12 leading-tight">
          <span className="flex flex-col">
            <span className="text-ink">focusmode</span>
            <span className="text-ink-2">tue. 27 oct.</span>
          </span>
          <span className="text-ink-2" aria-hidden>
            •••
          </span>
        </div>

        <div className="mt-5 flex items-start justify-between">
          <span className="flex items-start gap-1.5">
            <span className="font-display text-[88px] leading-[0.8] font-bold text-ink tabular-nums">{minutes}</span>
            <span className="mt-1 size-2.5 rounded-full bg-ink" />
          </span>
          <span className="flex flex-col items-end gap-4">
            <span className="text-12 text-ink-2">min today</span>
            <motion.span
              animate={tapped ? { scale: [1, 0.88, 1] } : { scale: 1 }}
              transition={{ duration: 0.35 }}
              className="flex size-12 items-center justify-center rounded-full bg-ink text-bg"
            >
              <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
                <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1" />
              </svg>
            </motion.span>
          </span>
        </div>

        <div className="mt-6 flex h-[124px] items-end justify-between">
          {lineHeights.map((h, i) => {
            const fresh = i >= LINES - 14
            return (
              <motion.span
                key={i}
                className={cn("w-px", fresh && tapped ? "bg-ink" : "bg-ink/25")}
                initial={false}
                animate={{ height: `${fresh && tapped ? Math.min(100, h + 30 - (LINES - i) * 0.6) : h}%` }}
                transition={{ ...SPRING_SOFT, delay: fresh && tapped ? (i - (LINES - 14)) * 0.025 : 0 }}
              />
            )
          })}
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] text-ink-2">
          {["6a", "9a", "12p", "3p", "6p"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2">
          {[
            { pill: "streak", unit: "days", value: tapped ? "13" : "12", up: true },
            { pill: "quality", unit: "%", value: "94", up: false },
          ].map((t) => (
            <div key={t.pill} className="flex flex-col gap-1.5">
              <span className="rounded-full bg-bg px-3 py-1.5 text-[11px] text-ink-2">{t.pill}</span>
              <span className="flex h-[76px] flex-col justify-between rounded-[14px] bg-bg p-3">
                <span className="text-[11px] text-ink-2">{t.unit}</span>
                <span className="flex items-end justify-between">
                  <span className="font-display text-[34px] leading-none font-bold text-ink tabular-nums">{t.value}</span>
                  <span className={cn("mb-1 text-[9px] text-ink", !t.up && "rotate-180")} aria-hidden>
                    ▲
                  </span>
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── 02 · Appointment app: check the next patient in ────────────────────── */

const appointments = [
  { name: "Cleaning · Maya R.", tags: "New patient", time: "12:45" },
  { name: "Whitening consult", tags: "Returning", time: "1:30" },
  { name: "Crown fitting · Leo K.", tags: "Insurance", time: "2:15" },
]

function TodayScene({ tapped }: { tapped: boolean }) {
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <div className="flex items-start justify-between px-5 pt-5">
        <span className="flex flex-col leading-tight">
          <span className="headline text-20 text-ink">Tuesday</span>
          <span className="text-16 text-ink-2">27 October</span>
        </span>
        <svg viewBox="0 0 16 16" className="mt-1 size-4 text-ink" aria-hidden>
          <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.25" fill="none" />
        </svg>
      </div>

      <div className="mt-3 text-center text-[56px] leading-none font-light tracking-[-0.04em] text-ink tabular-nums">
        {tapped ? "12:45" : "12:31"}
      </div>

      {/* Day timeline: booked, buffer, booked, then the rest of the day */}
      <div className="relative mt-5 h-12">
        <div className="absolute inset-x-0 top-3 flex h-4">
          <span className="w-[16%] bg-ink" />
          <span className="w-[12%] border-x border-ink bg-[repeating-linear-gradient(115deg,var(--ink)_0_1px,transparent_1px_4px)]" />
          <span className="ml-[3px] w-[5%] bg-ink" />
          <span className="ml-[3px] w-[20%] bg-ink" />
          <span className="flex-1 bg-[repeating-linear-gradient(90deg,color-mix(in_oklab,var(--ink)_10%,transparent)_0_9px,transparent_9px_11px)]" />
        </div>
        <motion.div
          className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
          initial={false}
          animate={{ left: tapped ? "62%" : "56%" }}
          transition={SPRING_SOFT}
        >
          <span className="h-7 w-px bg-ink" />
          <span className="mt-1 rounded-full bg-ink px-2 py-0.5 font-mono text-[9px] text-bg">NOW</span>
        </motion.div>
      </div>

      <div className="mt-2 flex items-center justify-between border-b border-line px-5 pb-3">
        <span className="headline text-16 text-ink">Today</span>
        <span className="text-20 leading-none font-light text-ink">+</span>
      </div>
      <ul>
        {appointments.map((a, i) => {
          const done = tapped && i === 0
          return (
            <li key={a.name} className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
              <span className="flex min-w-0 flex-col gap-1.5">
                <span className={cn("truncate text-14 transition-colors duration-300", done ? "text-ink-2" : "text-ink")}>{a.name}</span>
                <span className="flex items-center gap-1.5">
                  <span className="rounded-full border border-ink-2 px-2 py-px text-[10px] text-ink-2">{done ? "Checked in" : a.tags}</span>
                  <span className="font-mono text-[10px] text-ink-2">{a.time}</span>
                </span>
              </span>
              <motion.span
                className={cn("flex size-7 shrink-0 items-center justify-center rounded-[8px]", done ? "bg-ink text-bg" : "bg-bg")}
                animate={done ? { scale: [1, 0.85, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {done && (
                  <svg viewBox="0 0 16 16" fill="none" className="size-3.5" aria-hidden>
                    <motion.path
                      d="m3.5 8.5 3 3 6-7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    />
                  </svg>
                )}
              </motion.span>
            </li>
          )
        })}
      </ul>

      <div className="mx-auto mt-auto mb-4 flex w-[200px] rounded-full bg-ink p-1">
        <span className="flex h-9 flex-1 items-center justify-center rounded-full bg-surface text-12 text-ink">Today</span>
        <span className="flex h-9 flex-1 items-center justify-center text-12 text-bg">Patients</span>
      </div>
    </div>
  )
}

/* ─── 03 · Revenue card: switch to monthly, the dots re-flow ─────────────── */

const ROWS = 11
// Deterministic column heights; the second half is the newer period
const weekly = (i: number) => 2 + ((i * 7 + 3) % 5) + (i % 9 === 4 ? 2 : 0)
const monthly = (i: number, half: number) =>
  i < half ? 2 + ((i * 5 + 1) % 4) + (i % 7 === 3 ? 2 : 0) : Math.max(2, Math.round(10.5 - (i - half) * 0.32 + ((i * 3) % 4) - 1))

function RevenueScene({ tapped, width }: { tapped: boolean; width: number }) {
  const cols = Math.max(20, Math.floor((width - 48) / 11))
  const half = Math.floor(cols * 0.48)
  const pct = useCount(326, 48, tapped, 1.3)
  const tabs = ["Daily", "Weekly", "Monthly"]
  const active = tapped ? "Monthly" : "Weekly"

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between px-6 pt-6 pb-5">
        <span className="flex flex-col gap-2">
          <span className="label-mono text-ink">Revenue</span>
          <span className="text-[44px] leading-none font-light tracking-[-0.03em] text-ink tabular-nums">
            +{pct}
            <span className="ml-1 text-28">%</span>
          </span>
        </span>
        <span className="flex gap-3 sm:gap-5">
          {tabs.map((t) => (
            <span
              key={t}
              className={cn("label-mono transition-colors duration-300", t === active ? "text-ink" : "text-ink-2", t === "Daily" && "max-sm:hidden")}
            >
              {t}
            </span>
          ))}
        </span>
      </div>
      <div className="border-t border-line" />
      <div className="flex flex-1 flex-col justify-end px-6 pb-5">
        <div className="flex items-end justify-between">
          {Array.from({ length: cols }, (_, i) => {
            const h = tapped ? monthly(i, half) : weekly(i)
            const recent = i >= half
            return (
              <span key={i} className="flex flex-col-reverse gap-[5px]">
                {Array.from({ length: ROWS }, (_, r) => (
                  <motion.span
                    key={r}
                    className={cn("size-[6px] rounded-full", recent ? "bg-ink/75" : "bg-ink/25")}
                    initial={false}
                    animate={{ opacity: r < h ? 1 : 0, scale: r < h ? 1 : 0.4 }}
                    transition={{ ...SPRING, delay: tapped ? i * 0.012 + r * 0.01 : 0 }}
                  />
                ))}
              </span>
            )
          })}
        </div>
        <div className="mt-4 flex font-mono text-14 tabular-nums">
          <span className="text-ink-2" style={{ width: `${(half / cols) * 100}%` }}>
            {tapped ? "MAY $3,250" : "WK 1 $812"}
          </span>
          <span className="text-ink">{tapped ? "JUN $12,392" : "WK 2 $1,203"}</span>
        </div>
      </div>
    </div>
  )
}
