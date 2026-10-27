"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion"
import { SPRING, SPRING_SOFT } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { IPhone, iosFont } from "@/components/landing/IPhone"

/*
  Vibe coding, for real: a prompt typed into Claude Code, the tool calls landing one by one,
  and the iPhone app beside it assembling screen part by screen part. Then someone taps Book.
  The terminal and the app use their own real-world palettes, not this site's tokens.
*/

const PROMPT =
  "Build the home screen: a map of walkers nearby, a list with ratings and prices, and a big Book a walk button."

type Line =
  | { kind: "say"; text: string }
  | { kind: "tool"; name: string; target: string; result: string }

const LINES: Line[] = [
  { kind: "say", text: "I'll build the home screen with a live map, a walker list and a booking button." },
  { kind: "tool", name: "Write", target: "app/(tabs)/index.tsx", result: "Wrote 118 lines to app/(tabs)/index.tsx" },
  { kind: "tool", name: "Write", target: "components/WalkerCard.tsx", result: "Wrote 52 lines to components/WalkerCard.tsx" },
  { kind: "tool", name: "Update", target: "app/(tabs)/_layout.tsx", result: "Updated app/(tabs)/_layout.tsx with 9 additions" },
  { kind: "say", text: "Done. The home screen is live in the simulator — try booking a walk." },
]

// Steps: 0 typing · 1 thinking · 2..6 one terminal line each · 7 touch · 8 sheet · 9 hold
const STEP_MS = [0, 1300, 900, 1000, 1000, 1000, 1100, 900, 2400, 1200]
const TYPE_MS = 24

const terminal = {
  bg: "#1a1918",
  bar: "#242322",
  text: "#e8e6df",
  dim: "#8f8b82",
  claude: "#d97757",
  green: "#7bc47f",
  line: "rgba(255,255,255,0.08)",
}

const SPINNER = ["·", "✢", "✳", "✶", "✻", "✽"]

export default function BuildLive() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-120px" })
  const reduced = useReducedMotion()
  const [state, setState] = useState({ step: 0, typed: 0 })
  const [spin, setSpin] = useState(0)

  const step = reduced ? 7 : state.step
  const typed = reduced ? PROMPT.length : state.typed

  useEffect(() => {
    if (!inView || reduced) return
    let t: ReturnType<typeof setTimeout>
    if (state.step === 0) {
      t =
        state.typed < PROMPT.length
          ? setTimeout(() => setState((s) => ({ ...s, typed: s.typed + 1 })), PROMPT[state.typed] === " " ? TYPE_MS * 2 : TYPE_MS)
          : setTimeout(() => setState((s) => ({ ...s, step: 1 })), 500)
    } else {
      t = setTimeout(
        () => setState((s) => (s.step < STEP_MS.length - 1 ? { ...s, step: s.step + 1 } : { step: 0, typed: 0 })),
        STEP_MS[state.step],
      )
    }
    return () => clearTimeout(t)
  }, [state, inView, reduced])

  // Claude's spinner glyph while it works
  const working = step >= 1 && step <= 5
  useEffect(() => {
    if (!working || reduced) return
    const id = setInterval(() => setSpin((n) => (n + 1) % SPINNER.length), 120)
    return () => clearInterval(id)
  }, [working, reduced])

  const shown = Math.max(0, Math.min(LINES.length, step - 1))
  // App build stages follow the tool calls
  const app = {
    header: step >= 3,
    map: step >= 3,
    list: step >= 4,
    chrome: step >= 5,
    touch: step === 7,
    sheet: step >= 8,
  }

  return (
    <div ref={ref} className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,1.25fr)_auto] lg:gap-0">
      {/* Terminal */}
      <div
        className="relative overflow-hidden rounded-[14px] border shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)] lg:-mr-10"
        style={{ background: terminal.bg, borderColor: terminal.line, color: terminal.text }}
      >
        <div className="flex h-9 items-center gap-2 px-3.5" style={{ background: terminal.bar }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} className="size-3 rounded-full" style={{ background: c }} />
          ))}
          <span className="flex-1 text-center font-mono text-[11px]" style={{ color: terminal.dim }}>
            walkies — claude — 92×28
          </span>
          <span className="w-12" />
        </div>

        <div className="flex h-[400px] flex-col gap-3 p-4 font-mono text-[12px] leading-[1.6] sm:h-[440px] sm:p-5 sm:text-[13px]">
          {/* Welcome box */}
          <div className="w-fit max-w-full rounded-[6px] border px-3 py-2" style={{ borderColor: terminal.claude }}>
            <span style={{ color: terminal.claude }}>✻</span> Welcome to <span className="font-semibold">Claude Code</span>!
            <div style={{ color: terminal.dim }}>&nbsp;&nbsp;cwd: ~/walkies</div>
          </div>

          {/* Prompt */}
          <div className="flex gap-2">
            <span style={{ color: terminal.dim }}>&gt;</span>
            <span className="min-w-0">
              {PROMPT.slice(0, typed)}
              {step === 0 && <span className="ml-px inline-block h-[1.1em] w-[7px] translate-y-[0.2em] animate-caret" style={{ background: terminal.text }} />}
            </span>
          </div>

          {/* Output */}
          <div className="flex min-h-0 flex-col gap-2">
            {LINES.slice(0, shown).map((line, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                {line.kind === "say" ? (
                  <div className="flex gap-2">
                    <span>⏺</span>
                    <span>{line.text}</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <span style={{ color: terminal.green }}>⏺</span>
                      <span>
                        <span className="font-semibold">{line.name}</span>({line.target})
                      </span>
                    </div>
                    <div className="flex gap-2 pl-1" style={{ color: terminal.dim }}>
                      <span>&nbsp;⎿</span>
                      <span>{line.result}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
            {working && (
              <div className="flex gap-2" style={{ color: terminal.claude }}>
                <span className="inline-block w-3">{SPINNER[spin]}</span>
                <span>
                  {step === 1 ? "Thinking…" : "Building…"} <span style={{ color: terminal.dim }}>(esc to interrupt)</span>
                </span>
              </div>
            )}
          </div>

          {/* Input box */}
          <div className="mt-auto rounded-[6px] border px-3 py-2" style={{ borderColor: terminal.line, color: terminal.dim }}>
            &gt; <span className="opacity-60">Try &ldquo;add a tip screen after the walk&rdquo;</span>
          </div>
        </div>
      </div>

      {/* The app it builds */}
      <div className="relative z-10 mx-auto">
        <IPhone>
          <WalkiesHome app={app} />
        </IPhone>
      </div>
    </div>
  )
}

/* ─── Walkies: the app being built ───────────────────────────────────────── */

const walkers = [
  { name: "Jess M.", initials: "JM", rating: "4.9", dist: "0.3 mi", price: "$22", tone: "#d9d4ca" },
  { name: "Andre P.", initials: "AP", rating: "4.8", dist: "0.6 mi", price: "$20", tone: "#cfd6d9" },
  { name: "Priya K.", initials: "PK", rating: "5.0", dist: "0.9 mi", price: "$25", tone: "#d8d2dc" },
]

function Appear({ show, i = 0, className, children }: { show: boolean; i?: number; className?: string; children: React.ReactNode }) {
  return (
    <motion.div
      className={className}
      initial={false}
      animate={show ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.98 }}
      transition={{ ...SPRING, delay: show ? i * 0.12 : 0 }}
    >
      {children}
    </motion.div>
  )
}

function WalkiesHome({ app }: { app: Record<"header" | "map" | "list" | "chrome" | "touch" | "sheet", boolean> }) {
  return (
    <div className="relative flex h-full flex-col bg-[#f2f2f7] text-black" style={{ fontFamily: iosFont }}>
      {/* Empty launch state before the first write */}
      <AnimatePresence>
        {!app.header && (
          <motion.div exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center">
            <span className="size-5 animate-spin rounded-full border-2 border-black/10 border-t-black/50" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-1 flex-col gap-3 px-4 pt-[58px]">
        <Appear show={app.header}>
          <span className="block text-[13px] text-black/50">Good afternoon, Sam</span>
          <span className="block text-[28px] leading-tight font-bold tracking-[-0.02em]">Walkies</span>
        </Appear>

        <Appear show={app.map} i={1} className="relative h-[132px] overflow-hidden rounded-[16px] bg-[#e8e6e1]">
          <MapArt />
          {[
            [28, 40],
            [62, 64],
            [80, 30],
          ].map(([x, y], i) => (
            <motion.span
              key={i}
              className="absolute flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-black text-[8px] font-semibold text-white shadow"
              style={{ left: `${x}%`, top: `${y}%` }}
              initial={false}
              animate={app.map ? { scale: 1 } : { scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 20, delay: app.map ? 0.4 + i * 0.1 : 0 }}
            >
              {walkers[i].initials}
            </motion.span>
          ))}
          <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium">3 walkers nearby</span>
        </Appear>

        <div className="flex flex-col overflow-hidden rounded-[16px] bg-white">
          {walkers.map((w, i) => (
            <Appear key={w.name} show={app.list} i={i} className={cn("flex items-center gap-3 px-3 py-2.5", i > 0 && "border-t border-black/5")}>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold" style={{ background: w.tone }}>
                {w.initials}
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-[14px] font-semibold">{w.name}</span>
                <span className="text-[11px] text-black/50">
                  ★ {w.rating} · {w.dist}
                </span>
              </span>
              <span className="text-[14px] font-semibold">{w.price}</span>
            </Appear>
          ))}
        </div>

        <Appear show={app.chrome} className="relative mt-auto">
          <motion.span
            animate={app.touch ? { scale: [1, 0.96, 1] } : { scale: 1 }}
            transition={{ duration: 0.3, delay: 0.35 }}
            className="flex h-[48px] items-center justify-center rounded-[14px] bg-black text-[16px] font-semibold text-white"
          >
            Book a walk
          </motion.span>
          {/* Touch indicator */}
          <AnimatePresence>
            {app.touch && (
              <motion.span
                aria-hidden
                className="absolute top-1/2 left-1/2 -mt-5 -ml-5 size-10 rounded-full border border-black/20 bg-black/15"
                initial={{ opacity: 0, x: 50, y: 60 }}
                animate={{ opacity: [0, 1, 1, 0], x: 0, y: 0, scale: [1, 1, 0.75, 1.3] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, times: [0, 0.35, 0.55, 1] }}
              />
            )}
          </AnimatePresence>
        </Appear>
      </div>

      <Appear show={app.chrome} i={1} className="mt-3 flex h-[78px] items-start justify-around border-t border-black/10 bg-white/90 pt-2 backdrop-blur">
        {["Home", "Walks", "Messages", "Profile"].map((t, i) => (
          <span key={t} className={cn("flex flex-col items-center gap-1 text-[10px]", i === 0 ? "text-black" : "text-black/40")}>
            <span className={cn("size-[22px] rounded-[7px] border-[1.5px]", i === 0 ? "border-black bg-black" : "border-black/40")} />
            {t}
          </span>
        ))}
      </Appear>

      {/* Booking sheet */}
      <AnimatePresence>
        {app.sheet && (
          <>
            <motion.div
              className="absolute inset-0 bg-black/25"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="absolute inset-x-0 bottom-0 rounded-t-[22px] bg-white px-5 pt-2 pb-9"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={SPRING_SOFT}
            >
              <span className="mx-auto mb-4 block h-[5px] w-9 rounded-full bg-black/15" />
              <div className="flex flex-col items-center gap-2 text-center">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18, delay: 0.25 }}
                  className="flex size-12 items-center justify-center rounded-full bg-[#34c759] text-white"
                >
                  <svg viewBox="0 0 16 16" fill="none" className="size-6" aria-hidden>
                    <motion.path
                      d="m3.5 8.5 3 3 6-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3, delay: 0.45 }}
                    />
                  </svg>
                </motion.span>
                <span className="text-[18px] font-semibold">Walk booked</span>
                <span className="text-[13px] text-black/50">Jess M. · Today, 3:00 PM · $22</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function MapArt() {
  return (
    <svg viewBox="0 0 300 132" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
      <rect width="300" height="132" fill="#e9e6df" />
      <path d="M0 92 Q90 70 160 88 T300 70" stroke="#fff" strokeWidth="10" fill="none" />
      <path d="M110 0 Q120 60 100 132" stroke="#fff" strokeWidth="8" fill="none" />
      <path d="M210 0 L230 132" stroke="#fff" strokeWidth="6" fill="none" />
      <path d="M0 30 L300 44" stroke="#fff" strokeWidth="4" fill="none" />
      <rect x="140" y="8" width="56" height="34" rx="6" fill="#d7e3cf" />
      <path d="M250 100 q20 -10 40 0 v32 h-40z" fill="#cfdde6" />
    </svg>
  )
}
